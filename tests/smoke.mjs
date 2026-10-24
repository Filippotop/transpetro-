/* Elétrica de Ouro: teste de fumaça (adaptado do Humanas de Ouro). Abre o app num navegador de verdade e falha se algo que já funcionava quebrar.
   Rodar: npm install && npm test   (usa o Chromium do Playwright) */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const TABS = ['linhas', 'provas', 'bancada', 'biblioteca', 'arena', 'treino', 'plano', 'painel'];
const LINE_IDS = ['E', 'M', 'I', 'A', 'N', 'X'];
const KEY = 'eletrica-de-ouro-v1';
const ONLY = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null; /* ONLY=storage,home roda só esses testes */
const VIEWPORTS = { '320': { width: 320, height: 640 }, '375': { width: 375, height: 780 }, '1280': { width: 1280, height: 850 } };
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.webp': 'image/webp' };

const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

/* Servidor estático mínimo na raiz do repositório. */
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const f = p.endsWith(path.sep) ? path.join(p, 'index.html') : p;
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const URL_ = `http://127.0.0.1:${server.address().port}/`;

/* Os dados vivem em data/*.js, na ordem em que o index.html os carrega. */
const DATA_FILES = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m => m[1]);
function loadData() {
  const ctx = vm.createContext({ window: {} });
  for (const f of DATA_FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  return ctx.window.DATA;
}

/* Dados: gabaritos válidos e uma imagem para cada questão. */
function testData() {
  check(DATA_FILES[0] === 'data/base.js', `dados: o index.html deveria carregar data/base.js primeiro (carrega: ${DATA_FILES.join(', ') || 'nada'})`);
  if (!DATA_FILES.length) return;
  const DATA = loadData();
  for (const [id, e] of Object.entries(DATA.exams)) {
    const nums = Object.keys(e.key).map(Number);
    check(nums.length === e.last - e.first + 1, `${id}: gabarito com ${nums.length} questões`);
    for (const [n, k] of Object.entries(e.key)) check(k === null || /^[A-E]$/.test(k), `${id} q${n}: gabarito inválido "${k}"`);
    for (const [n, { f }] of Object.entries({ ...e.img, ...e.shared })) check(fs.existsSync(path.join(ROOT, "provas", id, f)), `${id} q${n}: imagem ${f} não existe`);
  }
}

/* Integridade do conteúdo: ids únicos, toda questão completa e todo módulo apontando para questões que existem. */
function testIntegrity() {
  if (!DATA_FILES.length) return;
  const DATA = loadData();
  const deepQs = Object.values(DATA.deep || {}).flatMap(d => d.questions || []);
  const qs = [...DATA.questions, ...deepQs];
  const ids = new Set();
  for (const q of qs) {
    check(!ids.has(q.id), `questão ${q.id}: id repetido`); ids.add(q.id);
    check(/^[A-E]$/.test(q.ans), `questão ${q.id}: gabarito "${q.ans}"`);
    check(Array.isArray(q.alts) && q.alts.length === 5, `questão ${q.id}: precisa de 5 alternativas`);
    check(Object.keys(q.ex || {}).sort().join('') === 'ABCDE', `questão ${q.id}: falta explicação para alguma alternativa`);
  }
  const mids = new Set();
  for (const m of DATA.modules) {
    check(!mids.has(m.id), `módulo ${m.id}: id repetido`); mids.add(m.id);
    check(m.html && m.html.trim().length > 0, `módulo ${m.id}: sem teoria`);
    check(Array.isArray(m.resumo) && m.resumo.length > 0, `módulo ${m.id}: sem resumo`);
    for (const q of m.qs) check(ids.has(q), `módulo ${m.id}: questão ${q} não existe`);
    /* Esquema da estação (spec, seção 2): vol, linha, itens do edital, faixa e peso em 2023. */
    check(m.vol === (m.line === 'X' ? 'MT' : 'EL'), `estação ${m.id}: vol "${m.vol}" não combina com a linha ${m.line}`);
    check(LINE_IDS.includes(m.line), `estação ${m.id}: linha "${m.line}" fora de E, M, I, A, N, X`);
    check(typeof m.itens === 'string' && m.itens.trim().length > 0, `estação ${m.id}: sem itens do edital`);
    check(['A', 'B', 'C'].includes(m.faixa), `estação ${m.id}: faixa "${m.faixa}"`);
    check(typeof m.peso2023 === 'number', `estação ${m.id}: peso2023 não é número`);
  }
  for (const k of ['modules', 'questions', 'cards', 'vf', 'plan', 'exams', 'tl', 'fichas', 'rep', 'con', 'quem', 'opostos', 'recal', 'opening', 'red', 'enemMap', 'deep', 'formulas'])
    check(DATA[k] != null, `dados: falta a chave DATA.${k}`);
  const txt = DATA_FILES.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join(' ');
  for (const w of ['ENEM', 'Enem', 'Inep', 'Kant', 'Humanas']) check(!txt.includes(w), `dados: conteúdo do Humanas ("${w}") em data/*.js`);
  for (const id of Object.keys(DATA.deep || {})) check(mids.has(id), `aprofundamento: módulo ${id} não existe`);
}


/* Acrescenta código ao fim de data/base.js só neste teste (estações extras, tabelas largas etc.). */
const withExtra = (page, js) => page.route('**/data/base.js', async r => { const res = await r.fetch(); r.fulfill({ response: res, body: (await res.text()) + '\n' + js }); });

/* O aprofundamento (DATA.deep) entra no módulo: teoria no fim e questões novas na contagem. */
async function testDeep(browser) {
  if (!DATA_FILES.length) return check(false, 'aprofundamento: sem data/*.js');
  const ctx = await browser.newContext({ viewport: VIEWPORTS['1280'], serviceWorkers: 'block' });
  const page = await ctx.newPage();
  const extra = { id: 'D-TESTE.1', vol: 'EL', mod: 'E1', tag: 'teste', base: ['Texto.'], src: 'Teste.', cmd: 'Comando de teste', alts: ['a', 'b', 'c', 'd', 'e'], ans: 'A', ex: { A: 'a', B: 'b', C: 'c', D: 'd', E: 'e' }, hab: '2.1', dif: 'fácil', traps: {}, kind: 'fixacao' };
  await withExtra(page, `window.DATA.deep=Object.assign(window.DATA.deep||{},{E1:{html:'<h4>Aprofundamento de teste</h4>',questions:[${JSON.stringify(extra)}]}});`);
  await page.goto(URL_); await page.waitForTimeout(300);
  await page.evaluate(() => go('mod', { id: 'E1', tab: 'teoria' })); await page.waitForTimeout(250);
  check(await page.locator('#prose h4', { hasText: 'Aprofundamento de teste' }).count() === 1, 'aprofundamento: a teoria extra não apareceu no módulo');
  const qtab = await page.locator('.subtabs button[data-t="q"]').textContent();
  const n = Number((qtab.match(/\/(\d+)/) || [])[1]);
  check(n === loadData().modules.find(m => m.id === 'E1').qs.length + 1, `aprofundamento: contagem de questões "${qtab}"`);
  await ctx.close();
}

/* Progresso isolado (Review Focus 1): o app grava só em eletrica-de-ouro-v1 (e em chaves edo-*), nunca lê nem grava
   o progresso da Bancada (bancada-transpetro-v1) nem as chaves do Humanas de Ouro, que vive na mesma origem (github.io). */
async function testStorage(browser) {
  const FOREIGN = { 'bancada-transpetro-v1': '{"v":3,"bancada":"intocado"}', 'humanas-de-ouro-v1': '{"v":1,"ans":{"HG-1":{"first":"A","ok":true,"t":1}},"updated":1}',
    'humanas-prefs': '{"scale":1.25,"theme":"light","goal":60}', 'humanas-last': '{"id":"H1","tab":"q","t":1}', 'humanas-sim': '{"running":false}', 'humanas-pomo': '{"running":false}',
    'humanas-min': '{}', 'hdo-gist': '{"token":"x","gistId":"y"}', 'pwa-install-seen': '1', 'pwa-warm-ok': '1', 'bancada-fonte': '2', 'bancada-zoom': '1' };
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  await ctx.addInitScript(seed => {
    if (!sessionStorage.getItem('seeded')) { for (const [k, v] of Object.entries(seed)) localStorage.setItem(k, v); sessionStorage.setItem('seeded', '1'); }
    const touched = window.__touched = [];
    const P = Storage.prototype;
    for (const fn of ['getItem', 'setItem', 'removeItem']) { const orig = P[fn]; P[fn] = function (k, ...rest) { if (this === localStorage) touched.push(fn + ':' + k); return orig.call(this, k, ...rest); }; }
  }, FOREIGN);
  const page = await ctx.newPage(); const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(URL_); await page.waitForTimeout(400);
  /* Mexe em tudo que grava: questão, leitura, V ou F, anotação, preferências, foco, meta. */
  await page.evaluate(() => go('mod', { id: 'E1', tab: 'q' })); await page.waitForTimeout(150);
  await page.locator('.alt[data-k="C"]').first().click(); await page.waitForTimeout(100);
  await page.evaluate(() => go('mod', { id: 'E1', tab: 'resumo' })); await page.waitForTimeout(100);
  await page.evaluate(() => go('mod', { id: 'E1', tab: 'vf' })); await page.waitForTimeout(100);
  await page.locator('.vfi button[data-a="0"]').first().click(); await page.waitForTimeout(100);
  await page.evaluate(() => go('mod', { id: 'E1', tab: 'notas' })); await page.waitForTimeout(100);
  await page.fill('#snote', 'anotação de teste'); await page.waitForTimeout(900);
  await page.click('#prefsBtn'); await page.click('[data-seg="scale"] button[data-v="1.12"]'); await page.waitForTimeout(100);
  await page.evaluate(() => closePop()); await page.click('#pomoBtn'); await page.click('#p25'); await page.waitForTimeout(100);
  await page.reload(); await page.waitForTimeout(400);
  const r = await page.evaluate(k => ({ touched: window.__touched.slice(), mine: JSON.parse(localStorage.getItem(k) || 'null'), all: Object.fromEntries(Object.keys(localStorage).map(x => [x, localStorage.getItem(x)])) }), KEY);
  check(r.mine && r.mine.ans && r.mine.ans['E1-T1'] && r.mine.ans['E1-T1'].first === 'C', `progresso: a resposta não foi salva em ${KEY}`);
  check(r.mine && r.mine.read && r.mine.read.E1 && r.mine.vf && r.mine.vf['vf-E1-T1'] && r.mine.snotes && r.mine.snotes.E1, `progresso: leitura, V ou F ou anotação fora de ${KEY}`);
  check(r.mine && !(r.mine.ans || {})['HG-1'], 'progresso: o Elétrica de Ouro leu o progresso do Humanas de Ouro');
  const bad = [...new Set(r.touched.map(t => t.split(':').slice(1).join(':')))].filter(k => k !== KEY && !k.startsWith('edo-'));
  check(!bad.length, `progresso: o app mexeu em chaves que não são dele: ${bad.join(', ')}`);
  for (const [k, v] of Object.entries(FOREIGN)) check(r.all[k] === v, `progresso: a chave ${k} (de outro app) mudou`);
  check(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--scale').trim()) === '1.12', 'progresso: a preferência de texto não ficou salva (edo-prefs)');
  for (const e of errs) check(false, `progresso: erro de JS: ${e}`);
  await ctx.close();
}

/* Offline: os arquivos do app e da Bancada ficam no cache do service worker da raiz; os dois abrem sem internet. */
async function testOfflineShell(browser) {
  check(DATA_FILES.length > 0, 'offline: nenhum data/*.js para conferir no cache');
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'] });
  const page = await ctx.newPage(); await page.goto(URL_);
  await page.evaluate(() => navigator.serviceWorker.ready); await page.waitForTimeout(1500);
  const scripts = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/<script src="([^":]+)"/g)].map(m => m[1]);
  for (const f of scripts) check(await page.evaluate(f => caches.match(f).then(r => !!r), f), `offline: ${f} não está no cache`);
  for (const f of ['bancada/index.html', 'bancada/css/app.css', 'bancada/js/app.js', 'bancada/js/missions/dr.js'])
    check(await page.evaluate(f => caches.match(f).then(r => !!r), f), `offline: ${f} (Bancada) não está no cache`);
  await ctx.setOffline(true); await page.reload(); await page.waitForTimeout(800);
  check(await page.evaluate(() => document.querySelectorAll('#app .st').length) > 0, 'offline: o app abriu sem as estações');
  await page.goto(URL_ + 'bancada/'); 
  check(await page.waitForSelector('.item-edital', { timeout: 5000 }).then(() => true, () => false), 'offline: a Bancada não abriu sem internet depois da visita ao app');
  await page.goto(URL_ + 'bancada/#bancada');
  if (await page.waitForSelector('.mcard', { timeout: 5000 }).then(() => true, () => false)) {
    await page.click('[data-nav="start:dr"]'); check(await page.isVisible('#scheme svg'), 'offline: a OS 4 da Bancada não abriu sem internet');
  } else check(false, 'offline: a aba Bancada (OS) não abriu sem internet');
  await page.goto(URL_); await page.waitForTimeout(500);
  check(await page.evaluate(() => !!document.querySelector('#app .st')), 'offline: voltar da Bancada ao app sem internet não abriu o Elétrica de Ouro');
  await ctx.close();
}

/* Cache antigo da Bancada (quando ela morava na raiz, o SW dela guardava index.html, manifest e ícones da raiz em
   bancada-shell-*): o app não pode abrir a Bancada velha offline nem servir o manifest velho, e esse cache some. */
async function testStaleCache(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'] });
  const page = await ctx.newPage();
  await page.goto(URL_ + 'icons/icon.svg'); /* página da mesma origem que não registra o SW: dá para semear o cache antes */
  await page.evaluate(async base => {
    const c = await caches.open('bancada-shell-x');
    const html = new Response('<!doctype html><title>Bancada antiga</title><body>Bancada antiga</body>', { headers: { 'content-type': 'text/html' } });
    await c.put(base + 'index.html', html.clone()); await c.put(base, html);
    await c.put(base + 'manifest.webmanifest', new Response(JSON.stringify({ name: 'Bancada Virtual de Manutenção' }), { headers: { 'content-type': 'application/manifest+json' } }));
    /* Cache só com URLs de uma bancada/ (como a cópia do Humanas, em /humanas-de-ouro/bancada/): não é deste app, fica. */
    await (await caches.open('bancada-shell-y')).put(base + 'bancada/index.html', new Response('outra Bancada'));
  }, URL_);
  await page.goto(URL_);
  await page.evaluate(() => navigator.serviceWorker.ready); await page.waitForTimeout(1500);
  await page.reload(); await page.waitForTimeout(500);
  await ctx.setOffline(true); await page.reload(); await page.waitForTimeout(800);
  const r = await page.evaluate(async () => ({ title: document.title, app: typeof go === 'function', man: await fetch('manifest.webmanifest').then(x => x.json()).then(j => j.name, () => null), keys: await caches.keys() }));
  check(r.title === 'Elétrica de Ouro' && r.app, `cache antigo: offline a raiz abriu "${r.title}" em vez do Elétrica de Ouro`);
  check(r.man === 'Elétrica de Ouro', `cache antigo: o manifest servido é o velho ("${r.man}")`);
  check(!r.keys.includes('bancada-shell-x'), `cache antigo: bancada-shell-x (da raiz) não foi apagado (${r.keys.join(', ')})`);
  check(r.keys.includes('bancada-shell-y'), 'cache antigo: apagou um cache bancada-shell-* que só tinha URLs de bancada/ (a cópia do Humanas de Ouro usaria esse)');
  await ctx.close();
}

/* Cada aba, em cada tamanho e tema: sem erro de JS, sem rolagem lateral, sem falha séria de acessibilidade. */
async function testTabs(browser) {
  for (const [vpName, viewport] of Object.entries(VIEWPORTS)) for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport, colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await page.goto(URL_); await page.waitForTimeout(400);
    for (const t of TABS) {
      const where = `${vpName}px/${colorScheme}/${t}`;
      await page.click(`#tabs button[data-v="${t}"]`); await page.waitForTimeout(250);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${where}: rolagem horizontal`);
      await page.addScriptTag({ content: AXE });
      const v = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] })).violations
        .filter(x => x.impact === 'serious' || x.impact === 'critical').map(x => `${x.id} em ${x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(', ')}`));
      for (const x of v) check(false, `${where}: acessibilidade: ${x}`);
    }
    if (vpName === '375') for (const id of ['E1']) for (const tab of ['teoria', 'resumo', 'vf', 'q', 'notas']) {
      await page.evaluate(([id, tab]) => go('mod', { id, tab }), [id, tab]); await page.waitForTimeout(150);
      await page.addScriptTag({ content: AXE });
      const v = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] })).violations.filter(x => x.impact === 'serious' || x.impact === 'critical').map(x => x.id));
      for (const x of v) check(false, `${vpName}px/${colorScheme}/estação ${id} ${tab}: acessibilidade: ${x}`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${vpName}px/${colorScheme}/estação ${id} ${tab}: rolagem horizontal`);
    }
    for (const e of errs) check(false, `${vpName}px/${colorScheme}: erro de JS: ${e}`);
    await ctx.close();
  }
}

/* Navegação: todo ícone é desenhado (SVG) e, no celular, nenhum rótulo invade o vizinho. */
async function testNav(browser) {
  for (const vpName of ['320', '375']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS[vpName], serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
    for (const active of ['linhas', 'biblioteca', 'bancada']) {
    await page.click(`#tabs button[data-v="${active}"]`); await page.waitForTimeout(200);
    const r = await page.evaluate(() => [...document.querySelectorAll('#tabs button')].map(b => {
      const svg = b.querySelector('.ni svg'), lr = b.querySelector('.nl').getBoundingClientRect(), br = b.getBoundingClientRect();
      const shown = lr.width > 2; /* no celular só a aba ativa mostra o rótulo; as outras o escondem só da vista */
      return { v: b.dataset.v, svg: !!svg && svg.getBoundingClientRect().width > 0, tap: br.width >= 30 && br.height >= 44,
        over: shown && (lr.left < br.left + 2 || lr.right > br.right - 2), activeHidden: b.getAttribute('aria-current') === 'true' && !shown,
        left: br.left, right: br.right, out: br.left < 0 || br.right > innerWidth };
    }));
    r.forEach((b, i) => {
      check(b.svg, `${vpName}px: ícone da aba ${b.v} não é SVG visível`);
      check(!b.over, `${vpName}px: rótulo da aba ${b.v} não cabe`);
      check(!b.activeHidden, `${vpName}px: a aba ativa ${b.v} está sem rótulo`);
      check(b.tap, `${vpName}px: aba ${b.v} pequena demais para o toque`);
      check(!b.out, `${vpName}px: aba ${b.v} sai da tela`);
      if (i) check(b.left >= r[i - 1].right - 0.5, `${vpName}px: aba ${b.v} encosta na anterior`);
    });
    }
    await ctx.close();
  }
}

/* Questões respondidas: as cores de certo e errado também precisam ser legíveis nos dois temas. */
async function testAnswered(browser) {
  for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
    await page.evaluate(() => go('mod', { id: 'E1', tab: 'q' })); await page.waitForTimeout(200);
    for (const k of ['A', 'B']) { const alt = page.locator(`.alt[data-k="${k}"]:not([disabled])`).first(); if (await alt.count()) { await alt.click(); await page.waitForTimeout(150); } }
    check(await page.locator('.alt.right').count() > 0 && await page.locator('.alt.wrong').count() > 0, `${colorScheme}: a questão não marcou certo e errado`);
    /* O axe pula botões desabilitados, e as alternativas viram desabilitadas depois da resposta: o contraste é medido aqui. */
    await page.evaluate(() => go('linhas')); await page.waitForTimeout(150);
    await page.evaluate(() => go('mod', { id: 'E1', tab: 'q' })); await page.waitForTimeout(150);
    const v = await page.evaluate(() => {
      const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      const out = [];
      for (const e of document.querySelectorAll('.alt.right .L, .alt.wrong .L')) { const cs = getComputedStyle(e); const a = lum(cs.color), b = lum(cs.backgroundColor); out.push([e.className + ' em ' + e.parentElement.className, (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)]); }
      return out.filter(([, r]) => r < 4.5).map(([w, r]) => `${w} (${r.toFixed(2)}:1)`);
    });
    for (const x of v) check(false, `${colorScheme}/respondida: contraste em ${x}`);
    await ctx.close();
  }
}

/* Linhas: as 6 linhas do edital aparecem no mapa, com selo legível nos dois temas; linha sem estação diz "em breve". */
async function testLines(browser) {
  for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
    const r = await page.evaluate(ids => {
      const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      return ids.map(L => { const line = document.querySelector('.line.lc-' + L); if (!line) return { L, missing: true };
        const b = line.querySelector('.line-head .badge'), cs = getComputedStyle(b), x = lum(cs.color), y = lum(cs.backgroundColor);
        return { L, name: line.querySelector('h3').textContent, ratio: (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05), n: line.querySelectorAll('.st').length, txt: line.textContent }; });
    }, LINE_IDS);
    const names = { E: 'Eletricidade', M: 'Máquinas e Comandos', I: 'Instalações e Medidas', A: 'Automação e Eletrônica', N: 'Segurança e Normas', X: 'Matemática' };
    for (const x of r) {
      check(!x.missing, `linhas/${colorScheme}: a linha ${x.L} não aparece no mapa`); if (x.missing) continue;
      check(x.name === names[x.L], `linhas: a linha ${x.L} se chama "${x.name}" (esperado "${names[x.L]}")`);
      check(x.ratio >= 4.5, `linhas/${colorScheme}: selo da linha ${x.L} com contraste ${x.ratio.toFixed(2)}`);
      if (!x.n) check(/em breve/i.test(x.txt), `linhas: a linha ${x.L} está vazia e não diz "em breve"`);
    }
    await ctx.close();
  }
  /* Estação marcada emBreve: aparece, mas não abre. */
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  const page = await ctx.newPage();
  await withExtra(page, "window.DATA.modules.push({id:'M3',vol:'EL',line:'M',title:'Máquinas rotativas',itens:'5.2',faixa:'B',peso2023:0,note:'',html:'',resumo:[],formulas:[],qs:[],emBreve:true});");
  await page.goto(URL_); await page.waitForTimeout(300);
  const st = page.locator('.st[data-m="M3"]');
  check(await st.count() === 1 && /em breve/i.test(await st.textContent()), 'linhas: a estação emBreve não aparece como "em breve"');
  if (await st.count()) { await st.click(); await page.waitForTimeout(150); check(await page.evaluate(() => view) === 'linhas', 'linhas: tocar numa estação "em breve" abriu a estação vazia'); }
  await ctx.close();
}

/* Aba Bancada: as 4 OS do simulador e o botão que abre a Bancada (bancada/), na mesma aba. */
async function testBancadaTab(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
  await page.click('#tabs button[data-v="bancada"]'); await page.waitForTimeout(200);
  const r = await page.evaluate(() => ({ os: [...document.querySelectorAll('.oscard h3')].map(h => h.textContent),
    open: [...document.querySelectorAll('a.btn.gold')].filter(a => /Abrir a Bancada/.test(a.textContent)).map(a => [a.getAttribute('href'), a.getAttribute('target')]) }));
  check(r.os.length === 4, `bancada: a aba mostra ${r.os.length} OS (esperado 4)`);
  for (const t of ['A bomba que não parte', 'O DR que não para ligado']) check(r.os.some(x => x.includes(t)), `bancada: falta a OS "${t}"`);
  check(r.open.length === 1 && r.open[0][0] === 'bancada/' && !r.open[0][1], `bancada: botão "Abrir a Bancada" errado (${JSON.stringify(r.open)})`);
  if (r.open.length) { await page.click('a.btn.gold:has-text("Abrir a Bancada")'); await page.waitForSelector('.item-edital', { timeout: 5000 }).catch(() => {});
    check(new URL(page.url()).pathname === '/bancada/', `bancada: o botão levou a ${page.url()}`);
    await page.click('a.voltar-edo'); await page.waitForTimeout(400);
    check(new URL(page.url()).pathname === '/' && await page.evaluate(() => typeof go === 'function'), 'bancada: o link "← Elétrica de Ouro" não voltou ao app'); }
  await ctx.close();
}

/* Links diretos e voltar: #E1 abre a estação, #bancada abre a aba; nada de ENEM, Humanas ou Redação na tela. */
async function testDeepLinks(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  for (const [h, want] of [['#E1', 'mod'], ['#bancada', 'bancada'], ['#plano', 'plano'], ['#erros', 'treino'], ['#formulas', 'biblioteca']]) {
    const p = await ctx.newPage(); await p.goto(URL_ + h); await p.waitForTimeout(250);
    const got = await p.evaluate(() => view); await p.close();
    check(got === want, `link direto: ${h} abriu "${got}" (esperado ${want})`);
  }
  const page = await ctx.newPage();
  await page.goto(URL_); await page.waitForTimeout(300);
  const seen = [];
  for (const t of TABS) { await page.click(`#tabs button[data-v="${t}"]`); await page.waitForTimeout(150); seen.push(await page.evaluate(() => document.body.innerText)); }
  for (const sub of ['sim', 'recal', 'erros', 'refazer', 'marcadas']) { await page.evaluate(s => go('treino', { s }), sub); await page.waitForTimeout(120); seen.push(await page.evaluate(() => document.body.innerText)); }
  for (const sub of ['tl', 'fichas', 'con', 'formulas', 'glos', 'metodo']) { await page.evaluate(s => go('biblioteca', { s }), sub); await page.waitForTimeout(120); seen.push(await page.evaluate(() => document.body.innerText)); }
  for (const pop of ['prefs', 'goal', 'pomo', 'keys', 'sync']) { await page.evaluate(k => { closePop(); openPop(k); }, pop); await page.waitForTimeout(120); seen.push(await page.evaluate(() => document.body.innerText)); }
  const all = seen.join('\n');
  for (const w of ['ENEM', 'Enem', 'Humanas', 'Inep', 'Redação', 'redação', 'TRI', 'Linguagens', 'Filosofia', '2025', 'dia 2', 'Dia 1']) { const re = new RegExp('(^|[^A-Za-zÀ-ÿ])' + w + '([^A-Za-zÀ-ÿ]|$)'); check(!re.test(all), `textos: a tela ainda fala em "${w}" (${(all.match(new RegExp('.{0,40}' + w + '.{0,40}')) || [''])[0].replace(/\n/g, ' ')})`); }
  check(await page.title() === 'Elétrica de Ouro', `textos: título da página "${await page.title()}"`);
  await ctx.close();
}

/* Detalhes: plural no simulado; o Formulário mostra as fórmulas gerais (DATA.formulas), além das de cada estação. */
async function testFormSim(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  const page = await ctx.newPage();
  await withExtra(page, "window.DATA.formulas={ohm:{titulo:'Lei de Ohm (geral)',html:'<p>V = R · I</p>'}};");
  await page.goto(URL_); await page.waitForTimeout(300);
  await page.evaluate(() => go('treino', { s: 'sim' })); await page.waitForTimeout(150);
  const av = await page.textContent('#avail');
  check(av === '1 questão disponível nesse foco', `simulado: "${av}" (esperado "1 questão disponível nesse foco")`);
  await page.evaluate(() => go('biblioteca', { s: 'formulas' })); await page.waitForTimeout(150);
  const t = await page.evaluate(() => document.querySelector('#host').innerText);
  check(t.includes('Lei de Ohm (geral)') && t.includes('V = R · I'), `formulário: DATA.formulas não aparece na Biblioteca ("${t.slice(0, 80)}")`);
  await ctx.close();
}

/* Plano e Painel vazios: mensagens amigáveis, sem erro. */
async function testEmpty(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(URL_); await page.waitForTimeout(300);
  for (const v of ['plano', 'painel', 'provas']) { await page.evaluate(v => go(v), v); await page.waitForTimeout(150);
    check(await page.locator('#app .empty').count() > 0, `vazio: ${v} sem mensagem de "ainda vazio"`); }
  for (const e of errs) check(false, `vazio: erro de JS: ${e}`);
  await ctx.close();
}

/* Sincronização por Gist: o que um aparelho faz aparece no outro; chave ruim avisa; a chave nunca vai no código de exportação. */
const GIST_DESC = 'eletrica-de-ouro-progresso', GIST_FILE = 'eletrica-de-ouro-progresso.json';
async function testGistSync(browser) {
  const TOKEN = 'tok_bom_teste_123', gists = {}; let seq = 0, slow = false;
  const api = async route => {
    const req = route.request(), url = new URL(req.url()), auth = req.headers()['authorization'];
    if (auth !== 'Bearer ' + TOKEN) return route.fulfill({ status: 401, contentType: 'application/json', body: '{"message":"Bad credentials"}' });
    const json = o => route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(o) });
    const m = url.pathname.match(/^\/gists\/(\w+)$/);
    if (url.pathname === '/gists' && req.method() === 'GET') return json(Object.values(gists));
    if (url.pathname === '/gists' && req.method() === 'POST') { const b = req.postDataJSON(), id = 'g' + (++seq); gists[id] = { id, description: b.description, public: b.public, files: Object.fromEntries(Object.entries(b.files).map(([k, f]) => [k, { content: f.content, truncated: false }])) }; return json(gists[id]); }
    if (m && req.method() === 'GET') return gists[m[1]] ? json(gists[m[1]]) : route.fulfill({ status: 404, body: '{}' });
    if (m && req.method() === 'PATCH' && slow) await new Promise(r => setTimeout(r, 800));
    if (m && req.method() === 'PATCH') { for (const [k, f] of Object.entries(req.postDataJSON().files)) gists[m[1]].files[k] = { content: f.content, truncated: false }; return json(gists[m[1]]); }
    return route.fulfill({ status: 404, body: '{}' });
  };
  const device = async () => { const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' }); await ctx.route('https://api.github.com/**', api);
    const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(500); return { ctx, page }; };

  const A = await device();
  check(await A.page.evaluate(() => typeof window.GistSync === 'object'), 'sync: GistSync não existe no app instalado');
  if (await A.page.evaluate(() => typeof window.GistSync !== 'object')) { await A.ctx.close(); return; }
  check(await A.page.evaluate(t => GistSync.connect(t), TOKEN) === 'ok', 'sync: não conectou com a chave boa');
  const gist = Object.values(gists)[0];
  check(gist && gist.description === GIST_DESC && gist.public === false && gist.files[GIST_FILE], `sync: não criou o Gist secreto ${GIST_DESC} com ${GIST_FILE}`);
  const inGist = id => !!(gist && gist.files[GIST_FILE] && JSON.parse(gist.files[GIST_FILE].content).ans[id]);
  await A.page.evaluate(() => { S.ans['E1-T1'] = { first: 'C', ok: true, t: Date.now(), src: 'teste' }; save(); });
  await A.page.waitForTimeout(4500);
  check(inGist('E1-T1'), 'sync: a resposta não chegou ao Gist 3 s depois de salvar');
  const leaked = await A.page.evaluate(async t => JSON.stringify(await unpackS(await packS())).includes(t) || location.hash.includes(t), TOKEN);
  check(!leaked, 'sync: a chave apareceu no código de exportação');
  check(/sincronizado/.test(await A.page.locator('#sync').textContent()), 'sync: o selo não mostra "sincronizado"');

  const B = await device();
  check(await B.page.evaluate(t => GistSync.connect(t), TOKEN) === 'ok', 'sync: o segundo aparelho não conectou');
  check(Object.keys(gists).length === 1, `sync: o segundo aparelho criou outro Gist (${Object.keys(gists).length})`);
  check(await B.page.evaluate(() => !!S.ans['E1-T1']), 'sync: a resposta do aparelho A não apareceu no aparelho B');
  check((await B.page.locator('.stats .stat .n').first().textContent()).trim().startsWith('1'), 'sync: a tela do aparelho B não foi atualizada');
  await B.page.evaluate(() => { S.ans['X-2'] = { first: 'B', ok: false, t: Date.now(), src: 'teste' }; save(); });
  await B.page.waitForTimeout(4500);
  await A.page.evaluate(() => GistSync.pull());
  check(await A.page.evaluate(() => !!S.ans['E1-T1'] && !!S.ans['X-2']), 'sync: depois da volta, o aparelho A não tem as duas respostas');
  const put = id => `S.ans['${id}'] = { first: 'C', ok: true, t: Date.now(), src: 'teste' };`;
  /* B envia depois da última leitura de A; o envio rápido de A ao sair não pode apagar o que B mandou. */
  await B.page.evaluate(new Function(put('X-3') + ' return GistSync.push();'));
  await A.page.evaluate(new Function(put('X-4') + ' return GistSync.push({ quick: true });'));
  check(inGist('X-3') && inGist('X-4'), `sync: o envio rápido ao sair apagou do Gist o trabalho do outro aparelho (X-3 ${inGist('X-3')}, X-4 ${inGist('X-4')})`);
  /* Estudo feito sem internet: ao abrir de novo, a leitura do Gist também envia o que só existe aqui. */
  await A.page.evaluate(new Function(put('X-5') + " localStorage.setItem(KEY, JSON.stringify(S)); return GistSync.pull();"));
  await A.page.waitForTimeout(600);
  check(inGist('X-5'), 'sync: o que foi feito sem internet não sobe ao abrir o app de novo');
  /* Um envio pedido enquanto outro está em andamento não pode se perder. */
  slow = true; const patching = A.page.waitForRequest(r => r.method() === 'PATCH');
  await A.page.evaluate(new Function(put('X-7') + ' window.__p = GistSync.push();')); await patching;
  await A.page.evaluate(new Function(put('X-6') + ' return GistSync.push().then(() => window.__p);'));
  slow = false;
  check(inGist('X-6'), 'sync: o envio pedido durante outro envio se perdeu');
  check(await A.page.evaluate(() => localStorage.getItem('edo-gist') !== null && localStorage.getItem('hdo-gist') === null), 'sync: a chave do Gist não está em edo-gist');
  await A.ctx.close(); await B.ctx.close();

  const C = await device();
  check(await C.page.evaluate(() => GistSync.connect('chave_ruim')) === 'auth', 'sync: chave ruim deveria responder "auth"');
  check(/reconecte/.test(await C.page.locator('#sync').textContent()), 'sync: com chave ruim o selo deveria pedir para reconectar');
  await C.ctx.close();
}

/* Com a sincronização ligada, a junção com a cópia antiga do Gist não pode desfazer o "Zerar progresso". */
async function testDeletesSync(browser) {
  const old = { v: 1, ans: { q1: { first: 'A', ok: true, t: 5 } }, snotes: { E1: 'nota antiga' }, updated: 10 };
  const ctx = await browser.newContext({ viewport: VIEWPORTS['1280'], serviceWorkers: 'block' });
  await ctx.addInitScript(([k, s]) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(k, s); sessionStorage.setItem('seeded', '1'); } }, [KEY, JSON.stringify(old)]);
  const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(300);
  await page.evaluate(() => go('mod', { id: 'E1', tab: 'notas' })); await page.waitForTimeout(150);
  await page.fill('#snote', ''); await page.waitForTimeout(900);
  check(await page.evaluate(o => !(mergeS(S, o).snotes || {}).E1, old), 'exclusão: a anotação apagada volta ao juntar com o Gist antigo');
  await page.evaluate(() => go('painel')); await page.waitForTimeout(200);
  await page.click('#reset'); await page.click('#reset'); await page.waitForTimeout(150);
  const after = await page.evaluate(o => Object.keys(mergeS(S, o).ans || {}).length, old);
  check(after === 0, 'exclusão: depois de "Zerar progresso", a junção com o Gist antigo traz tudo de volta');
  await ctx.close();
}

/* Design: tokens, campos e links com estilo, cabeçalho compacto no celular e movimento reduzido. */
async function testDesign(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], serviceWorkers: 'block' });
  const page = await ctx.newPage(); await page.goto(URL_); await page.waitForTimeout(400);
  const tok = await page.evaluate(ids => { const cs = getComputedStyle(document.documentElement); const g = n => cs.getPropertyValue(n).trim();
    return { fs: [1, 2, 3, 4, 5, 6, 7].map(i => g('--fs-' + i)), sp: [1, 2, 3, 4, 5, 6, 7, 8].map(i => g('--sp-' + i)), lines: ids.map(L => g('--' + L.toLowerCase())) }; }, LINE_IDS);
  check(tok.fs.join(' ') === '12px 14px 16px 18px 22px 28px 36px', `design: escala tipográfica --fs-1..7 = "${tok.fs.join(' ')}"`);
  check(tok.sp.every(v => /^\d+px$/.test(v) && parseInt(v) % 4 === 0), `design: espaçamentos --sp-1..8 fora de múltiplos de 4 ("${tok.sp.join(' ')}")`);
  check(tok.lines.every(Boolean) && new Set(tok.lines).size === LINE_IDS.length, `design: cores das linhas --e..--x ausentes ou repetidas (${tok.lines.join(' ')})`);
  for (const w of [320, 375]) { await page.setViewportSize({ width: w, height: 700 }); await page.waitForTimeout(100);
    const h = await page.evaluate(() => { const r = document.querySelector('header.top').getBoundingClientRect(); return { hh: r.height, left: r.left, width: r.width }; });
    check(h.hh <= 84, `design: cabeçalho em ${w} px com ${Math.round(h.hh)} px de altura (máximo 84)`);
    check(h.left === 0 && h.width === w, `design: cabeçalho em ${w} px não ocupa a largura toda (x=${h.left}, largura ${h.width})`); }
  await page.setViewportSize(VIEWPORTS['375']);
  await page.evaluate(() => openPop('sync')); await page.waitForTimeout(200);
  const f = await page.evaluate(() => { const i = document.querySelector('#gsTok, #spTxt'); const a = document.querySelector('#pop a[href^="https://github.com"]'); const ci = getComputedStyle(i);
    return { r: parseFloat(ci.borderRadius), pad: parseFloat(ci.paddingLeft), font: ci.fontFamily, link: a ? getComputedStyle(a).color : null }; });
  check(f.r >= 8 && f.pad >= 10, `design: campo de texto sem estilo (raio ${f.r}, padding ${f.pad})`);
  check(f.link && f.link !== 'rgb(0, 0, 238)', `design: link com o azul padrão do navegador (${f.link})`);
  await ctx.close();
  const rm = await browser.newContext({ viewport: VIEWPORTS['1280'], serviceWorkers: 'block', reducedMotion: 'reduce' });
  const p2 = await rm.newPage(); await p2.goto(URL_); await p2.waitForTimeout(300);
  const moving = await p2.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { const cs = getComputedStyle(e); return cs.transitionDuration.split(',').some(d => parseFloat(d) > 0) || (cs.animationName !== 'none' && parseFloat(cs.animationDuration) > 0); }).slice(0, 3).map(e => e.className || e.tagName));
  check(!moving.length, `design: com movimento reduzido ainda há animação (${moving.join(', ')})`);
  await rm.close();
}

/* Leitura da estação: sumário também no celular, metadados numa linha só e quadros didáticos legíveis nos dois temas. */
const BOX_TYPES = ['conceito', 'exemplo', 'banca', 'pegadinha', 'conexao'];
async function testReading(browser) {
  for (const colorScheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS['375'], colorScheme, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    await withExtra(page, "window.DATA.deep=Object.assign(window.DATA.deep||{},{E1:{html:'<h4>Tabela larga</h4><div class=\"tw\"><table><thead><tr>'+Array.from({length:9},(_,i)=>'<th>Coluna larga '+i+'</th>').join('')+'</tr></thead><tbody><tr>'+Array.from({length:9},(_,i)=>'<td>valor '+i+' em ohms</td>').join('')+'</tr></tbody></table></div>'}});");
    await page.goto(URL_); await page.waitForTimeout(300);
    await page.evaluate(() => go('mod', { id: 'E1', tab: 'teoria' })); await page.waitForTimeout(250);
    if (colorScheme === 'light') {
      const t = await page.evaluate(() => ({ h: document.querySelectorAll('#prose h4').length, links: document.querySelectorAll('details.toc-m a').length, vis: !!document.querySelector('details.toc-m') && getComputedStyle(document.querySelector('details.toc-m')).display !== 'none' }));
      check(t.vis && t.links === t.h && t.h > 0, `leitura: sumário no celular com ${t.links} links para ${t.h} seções`);
      const over = await page.evaluate(() => { const w = innerWidth; return [...document.querySelectorAll('#prose > *')].filter(e => !e.classList.contains('tw')).map(e => Math.round(e.getBoundingClientRect().right)).filter(r => r > w); });
      check(!over.length, `leitura: em E1 o texto passa da borda direita da tela (${over.slice(0, 3).join(', ')} px > 375)`);
      const hint = await page.evaluate(() => { const t = document.querySelector('#prose .tw'); return t && t.scrollWidth > t.clientWidth ? t.classList.contains('scrolls') && getComputedStyle(t, '::before').content.includes('deslize') : 'sem tabela larga'; });
      check(hint === true, `leitura: tabela larga no celular sem o aviso "deslize" (${hint})`);
      const tops = await page.evaluate(() => [...document.querySelectorAll('.mod-head .chip')].map(c => c.offsetTop));
      check(new Set(tops).size === 1, `leitura: metadados da estação quebram em ${new Set(tops).size} linhas no celular`);
      const meta = await page.evaluate(() => document.querySelector('.mod-head').innerText);
      check(/Itens 2\.1, 2\.5 do edital/.test(meta) && /7 questões em 2023/.test(meta), `leitura: cabeçalho sem "Itens … do edital" ou sem o peso de 2023 ("${meta.replace(/\n/g, ' ')}")`);
    }
    const r = await page.evaluate(types => {
      const prose = document.querySelector('#prose');
      prose.insertAdjacentHTML('afterbegin', types.map(k => `<div class="box ${k}"><b class="box-t">Título ${k}</b><p>Texto de exemplo do quadro ${k}.</p></div>`).join(''));
      const lum = c => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
      return types.map(k => { const box = prose.querySelector('.box.' + k), cs = getComputedStyle(box);
        const bg = cs.backgroundColor === 'rgba(0, 0, 0, 0)' ? getComputedStyle(document.body).backgroundColor : cs.backgroundColor;
        return { k, edge: cs.borderLeftColor, padded: parseFloat(cs.paddingLeft) >= 12, title: ratio(getComputedStyle(box.querySelector('.box-t')).color, bg), text: ratio(getComputedStyle(box.querySelector('p')).color, bg) }; });
    }, BOX_TYPES);
    for (const b of r) {
      check(b.padded, `leitura/${colorScheme}: quadro .${b.k} sem estilo`);
      check(b.title >= 4.5 && b.text >= 4.5, `leitura/${colorScheme}: quadro .${b.k} com contraste ${b.title.toFixed(2)} / ${b.text.toFixed(2)}`);
    }
    check(new Set(r.map(b => b.edge)).size === BOX_TYPES.length, `leitura/${colorScheme}: os 5 tipos de quadro não se distinguem pela cor`);
    await ctx.close();
  }
}

/* Tela inicial: contagem até 29/11, anéis por bloco, próximo passo em destaque, regra de corte, ícones desenhados e estatísticas sem esticar. */
async function testHome(browser) {
  for (const vp of ['375', '1280']) {
    const ctx = await browser.newContext({ viewport: VIEWPORTS[vp], serviceWorkers: 'block' });
    const page = await ctx.newPage(); await page.clock.setFixedTime(new Date('2026-10-24T09:00:00-03:00')); await page.goto(URL_); await page.waitForTimeout(400);
    const h = await page.evaluate(() => ({
      count: (document.querySelector('.hero .countdown') || {}).textContent || '', days: String(daysLeft()), chip: document.querySelector('#count').textContent,
      rings: [...document.querySelectorAll('.hero .rings [data-area]')].map(r => [r.dataset.area, r.getAttribute('aria-label') || '']),
      next: ((document.querySelector('.hero .next b') || {}).textContent || '').trim(),
      corte: (document.querySelector('.hero .corte') || {}).textContent || '',
      icons: [...document.querySelectorAll('.task .ic')].map(i => i.querySelector('svg') ? 'svg' : i.textContent.trim()),
      statH: Math.max(0, ...[...document.querySelectorAll('.hero .stat')].map(s => s.getBoundingClientRect().height)),
    }));
    check(h.days === '36', `início/${vp}: em 24/10 faltam ${h.days} dias para 29/11 (esperado 36)`);
    check(h.count.includes(h.days) && /29\/11/.test(h.count), `início/${vp}: contagem regressiva sem os ${h.days} dias até 29/11 ("${h.count.trim().slice(0, 80)}")`);
    check(/retifica/i.test(h.count), `início/${vp}: a contagem não avisa para conferir a retificação ("${h.count.trim().slice(0, 120)}")`);
    check(/36 dias · 29\/11/.test(h.chip), `início/${vp}: chip do topo "${h.chip}"`);
    check(h.rings.map(r => r[0]).join(',') === 'ESP,MAT,CRD', `início/${vp}: anéis = "${h.rings.map(r => r[0]).join(',')}"`);
    for (const [a, l] of h.rings) check(/\d+%/.test(l), `início/${vp}: anel ${a} sem porcentagem no aria-label ("${l}")`);
    check(h.next.length > 0, `início/${vp}: falta o bloco "Próximo passo"`);
    check(/50%/.test(h.corte), `início/${vp}: falta a regra de corte (50% em cada bloco) ("${h.corte.trim().slice(0, 60)}")`);
    const bad = h.icons.filter(i => i !== 'svg' && !/^[A-Z]\d+$/.test(i));
    check(!bad.length, `início/${vp}: ícones de tarefa que não são desenhos (${bad.join(' ')})`);
    if (vp === '1280') check(h.statH <= 200, `início/${vp}: cartão de estatística esticado (${Math.round(h.statH)} px)`);
    if (h.next) { await page.click('.hero .next'); await page.waitForTimeout(200);
      check(await page.evaluate(() => view !== 'linhas' || !!document.querySelector('#pop:not([hidden])')), `início/${vp}: o "Próximo passo" não leva a lugar nenhum`); }
    const dots = await page.evaluate(() => [...document.querySelectorAll('.aring')].filter(r => r.querySelectorAll('circle').length > 1 && r.getAttribute('aria-label').includes(' 0%')).length);
    check(!dots, `início: ${dots} anel(is) em 0% desenham um arco (pontinho solto)`);
    await ctx.close();
  }
}

/* Offline: sem imagens de prova para baixar, o app não pergunta nem baixa nada (a prova de 2023 chega na Task 5). */
async function testOfflineConsent(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORTS['375'] });
  const page = await ctx.newPage(); await page.goto(URL_);
  await page.waitForFunction(() => navigator.serviceWorker.controller || navigator.serviceWorker.ready, null, { timeout: 10000 });
  await page.waitForTimeout(2500);
  const count = () => page.evaluate(async () => (await (await caches.open('edo-provas-v1')).keys()).length);
  check(await count() === 0, 'offline: baixou imagens de prova sem perguntar');
  check(!(await page.locator('#pwaWarm').isVisible().catch(() => false)), 'offline: perguntou para baixar provas que ainda não existem');
  check(await page.evaluate(async () => (await caches.keys()).every(k => k.startsWith('edo-'))), 'offline: cache com nome fora do prefixo edo- (o Humanas usa hdo- na mesma origem)');
  await ctx.close();
}

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const run = async (name, fn) => { if (!ONLY || ONLY.has(name)) await fn(browser); };
try {
  await run('data', () => { testData(); testIntegrity(); });
  await run('storage', testStorage);
  await run('deep', testDeep);
  await run('offline', testOfflineShell);
  await run('stale', testStaleCache);
  await run('gist', testGistSync);
  await run('deletes', testDeletesSync);
  await run('design', testDesign);
  await run('reading', testReading);
  await run('home', testHome);
  await run('lines', testLines);
  await run('bancada', testBancadaTab);
  await run('links', testDeepLinks);
  await run('empty', testEmpty);
  await run('formsim', testFormSim);
  await run('nav', testNav);
  await run('tabs', testTabs);
  await run('answered', testAnswered);
  await run('consent', testOfflineConsent);
} finally { await browser.close(); server.close(); }

if (fails.length) { console.error(`FALHOU (${fails.length}):\n- ` + fails.join('\n- ')); process.exit(1); }
console.log(`OK${ONLY ? ' (' + [...ONLY].join(', ') + ')' : ''}: dados, progresso isolado, offline com a Bancada, Gist, navegação, 8 abas × 3 tamanhos × 2 temas.`);

/* Bancada: teste de fumaça num Chromium de verdade. Estuda um módulo da apostila e joga uma OS inteira pela interface; falha se aparecer
   erro de JavaScript, rolagem lateral, falha séria de acessibilidade (WCAG AA) ou se o app não abrir offline.
   Rodar (na raiz do repositório): npm install && npm test */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import MOD from '../js/apostila/potencia-trifasicos.js';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.json': 'application/json' };
const VIEWPORTS = { 320: { width: 320, height: 640 }, 375: { width: 375, height: 780 }, 1280: { width: 1280, height: 850 } };

const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  const f = p.endsWith(path.sep) ? path.join(p, 'index.html') : p;
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const URL_ = `http://127.0.0.1:${server.address().port}/`;

async function axe(page, where) {
  await page.addScriptTag({ content: AXE });
  const r = await page.evaluate(() => window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }));
  for (const v of r.violations.filter(v => v.impact === 'serious' || v.impact === 'critical'))
    fails.push(`${where}: acessibilidade "${v.id}" (${v.help}) em ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
}
async function noHScroll(page, where) {
  const w = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
  check(w[0] <= w[1], `${where}: rolagem lateral na página (${w[0]} > ${w[1]})`);
}

const visible = (page, sel) => page.$$eval(sel, els => els.length > 0 && els.every(e => e.checkVisibility()));
const hidden = (page, sel) => page.$$eval(sel, els => els.length > 0 && els.every(e => !e.checkVisibility()));
const glyph = async (page, n) => (await page.textContent(`.item-edital[data-n="${n}"] .ie-st`)).trim();
const tab = (page, id) => page.click(`.tabs a[href="#${id}"]`);

/** Apostila: mapa → leitor → só o essencial → checagem → mapa; link da bancada; rota inválida; letra grande. */
async function apostila(page, where, vw) {
  const ax = where === '1280 claro' || where === '320 escuro';
  await page.waitForSelector('.item-edital');
  check(await page.evaluate(() => location.hash) === '#estudar', `${where}: o app não abriu em #estudar`);
  check(/Estudar/.test(await page.textContent('.tabs a[aria-current="page"]') || ''), `${where}: a aba Estudar não está marcada como atual`);
  check((await page.$$('.item-edital')).length === 10, `${where}: o mapa não tem as 10 linhas do edital`);
  check(await glyph(page, 3) === '○', `${where}: item 3 não começa como ○ (“${await glyph(page, 3)}”)`);
  check(/em breve/i.test(await page.textContent('.item-edital[data-n="1"]')), `${where}: item sem módulo não aparece como "em breve"`);
  check(/5 questões em 2023/.test(await page.textContent('.item-edital[data-n="3"]')), `${where}: item 3 sem o peso de 2023`);
  check(!!(await page.$('.proximo a[href="#mod/potencia-trifasicos"]')), `${where}: o próximo passo não aponta para potencia-trifasicos`);
  if (vw !== '1280') {
    const r = await page.$eval('.tabs', e => e.getBoundingClientRect().bottom);
    check(Math.abs(r - (await page.evaluate(() => innerHeight))) <= 1, `${where}: abas não estão fixas embaixo`);
  }
  await noHScroll(page, `${where} · mapa`);
  if (ax) await axe(page, `${where} · mapa`);

  // leitor: cada sentinela entra na tela, uma por vez (Ruling 5)
  await page.click('.proximo a[href="#mod/potencia-trifasicos"]');
  await page.waitForSelector('.leitor [data-fim]');
  check((await page.$$('.leitor section[id^="s-"]')).length === MOD.secoes.length, `${where}: o leitor não mostra as ${MOD.secoes.length} seções`);
  check((await page.$$('.sumario a[href^="#s-"]')).length === MOD.secoes.length, `${where}: sumário incompleto`);
  for (const s of await page.$$('.leitor [data-fim]')) { await s.scrollIntoViewIfNeeded(); await page.waitForTimeout(120); }
  await page.waitForTimeout(150);
  check(new RegExp(`${MOD.secoes.length} de ${MOD.secoes.length}`).test(await page.textContent('.lprog')), `${where}: progresso de leitura não chegou ao fim (“${await page.textContent('.lprog')}”)`);
  await noHScroll(page, `${where} · leitor`);
  if (ax) await axe(page, `${where} · leitor`);
  await page.goBack(); await page.waitForSelector('.item-edital');
  check(await glyph(page, 3) === '◐', `${where}: item 3 não virou ◐ depois da leitura (“${await glyph(page, 3)}”)`);

  // só o essencial (Ruling 13: fórmulas e tabelas .tw ficam)
  await page.click('.item-edital[data-n="3"] a[href="#mod/potencia-trifasicos"]');
  await page.waitForSelector('.leitor');
  await page.click('[data-nav="essencial"]');
  check(await hidden(page, '.leitor .texto > p:not(.tw), .leitor .texto > ul'), `${where}: "Só o essencial" não escondeu o texto corrido`);
  for (const c of ['.cai', '.pega', '.exres', '.essencial', '.tw']) check(await visible(page, `.leitor ${c}`), `${where}: "Só o essencial" escondeu ${c}`);
  check(await page.getAttribute('[data-nav="essencial"]', 'aria-pressed') === 'true', `${where}: botão "Só o essencial" sem aria-pressed`);
  // impressão: sem abas, texto completo mesmo no modo essencial
  await page.emulateMedia({ media: 'print' });
  check(!(await page.isVisible('.tabs')), `${where}: as abas aparecem na impressão`);
  check(await visible(page, '.leitor .texto > p'), `${where}: a impressão não expandiu o texto no modo essencial`);
  await page.emulateMedia({ media: 'screen' });
  await page.click('[data-nav="essencial"]');
  check(await visible(page, '.leitor .texto > p'), `${where}: desligar "Só o essencial" não trouxe o texto de volta`);
  if (vw === '320') {
    for (let i = 0; i < 2; i++) await page.click('[data-nav="fonte"]');
    check(await page.getAttribute('.leitor', 'data-fonte') === '2', `${where}: o botão de letra não chegou ao maior tamanho`);
    check(await page.evaluate(() => localStorage.getItem('bancada-fonte')) === '2', `${where}: tamanho da letra não foi gravado`);
    await noHScroll(page, `${where} · leitor com letra grande`);
    await page.click('[data-nav="fonte"]');
  }

  // checagem com o gabarito
  await page.click('.leitor a[href="#mod/potencia-trifasicos/checagem"]');
  await page.waitForSelector('.checagem .q');
  check((await page.$$('.checagem .q')).length === 4, `${where}: a checagem não tem 4 questões`);
  for (const [i, q] of MOD.checagem.entries()) {
    const sel = `.q[data-q="ap/potencia-trifasicos/${i}"]`;
    await page.click(`${sel} [data-opt="${q.a}"]`);
    check(await page.isVisible(`${sel} .fbk`), `${where}: questão ${i + 1} da checagem sem correção`);
  }
  check(/4 de 4/.test(await page.textContent('.chk-res')), `${where}: resultado da checagem não mostra 4 de 4`);
  await noHScroll(page, `${where} · checagem`);
  if (ax) await axe(page, `${where} · checagem`);
  await tab(page, 'estudar'); await page.waitForSelector('.item-edital');
  check(await glyph(page, 3) === '●' && await glyph(page, 4) === '●', `${where}: itens 3 e 4 não viraram ● depois da checagem (“${await glyph(page, 3)}”, “${await glyph(page, 4)}”)`);

  // rota inválida volta ao mapa
  await page.evaluate(() => { location.hash = '#mod/nao-existe'; });
  await page.waitForFunction(() => location.hash === '#estudar');
  check(!!(await page.$('.item-edital')), `${where}: #mod/nao-existe não voltou ao mapa`);
  await page.reload(); await page.waitForSelector('.item-edital');

  // bancada: "Antes de atender, leia"
  await tab(page, 'bancada'); await page.waitForSelector('.mcard');
  const os2 = page.locator('.mcard', { hasText: 'OS 2' });
  check(/Antes de atender, leia/.test(await os2.textContent()), `${where}: OS 2 sem "Antes de atender, leia"`);
  await os2.locator('a[href="#mod/potencia-trifasicos"]').click();
  check(await page.waitForSelector('.leitor').then(() => true, () => false), `${where}: o link da OS 2 não abriu o módulo`);
  await tab(page, 'bancada'); await page.waitForSelector('.mcard');
}

/** Joga a OS 1 até o relatório usando só a interface. */
async function playOS1(page, where) {
  await page.click('[data-nav="start:cmd"]');
  await page.waitForSelector('#scheme svg');
  // voltímetro TP1 → TPN
  await page.click('[data-k="tp:TP1"]'); await page.click('[data-k="tp:TPN"]');
  const lcd = await page.textContent('#lcd');
  check(/V/.test(lcd) && /\d/.test(lcd), `${where}: visor não mostrou a leitura de tensão (“${lcd}”)`);
  // ohmímetro energizado: violação
  await page.click('[data-nav="instr:O"]'); await page.click('[data-k="c:F21"]');
  check((await page.textContent('#lcd')).includes('BLOQ'), `${where}: ohmímetro energizado não foi bloqueado`);
  // NR-10: ordenar as etapas na ordem certa
  await page.click('[data-nav="desen"]'); await page.waitForSelector('#nsrc');
  if (where === '1280 claro') await axe(page, `${where} · modal NR-10`);
  for (let i = 0; i < 6; i++) await page.click(`#nsrc .ordit[data-i="${i}"]`);
  await page.click('#nok'); await page.click('#ngo');
  check(await page.isVisible('.pill.de'), `${where}: não desenergizou depois da NR-10 correta`);
  await page.click('[data-k="c:F21"]');
  check(/Ω/.test(await page.textContent('#lcd')), `${where}: ohmímetro desenergizado não mediu`);
  if (where === '1280 claro') await axe(page, `${where} · bancada`);
  await noHScroll(page, `${where} · bancada`);
  // diagnóstico
  await page.click('[data-nav="diag"]');
  await page.click('#dok');
  check((await page.textContent('#dmsg')).length > 0, `${where}: diagnóstico vazio não foi barrado`);
  await page.check('input[name=dg][value=fuse]'); await page.check('input[name=ac][value=fuse]');
  if (where === '1280 claro') await axe(page, `${where} · modal de diagnóstico`);
  await page.click('#dok');
  await page.waitForSelector('.result .big');
  if (where === '1280 claro') await axe(page, `${where} · relatório`);
  await noHScroll(page, `${where} · relatório`);
  await page.click('.q .opts button[data-opt="0"]');
  check(await page.isVisible('.q .fbk'), `${where}: questão não mostrou correção`);
}

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
try {
  for (const [vw, size] of Object.entries(VIEWPORTS)) for (const scheme of ['light', 'dark']) {
    const where = `${vw} ${scheme === 'light' ? 'claro' : 'escuro'}`;
    const ctx = await browser.newContext({ viewport: size, colorScheme: scheme, serviceWorkers: 'block' });
    const page = await ctx.newPage(); const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text()) && !/ERR_(NAME|INTERNET|CONNECTION)/.test(m.text())) errs.push(m.text()); });
    page.on('dialog', d => d.accept());
    await page.goto(URL_);
    await apostila(page, where, vw);
    check((await page.$$('.mcard')).length === 4, `${where}: painel sem as 4 OS`);
    await noHScroll(page, `${where} · painel`);
    if (vw === '1280' || vw === '320') await axe(page, `${where} · painel`);
    await playOS1(page, where);
    // revisão espaçada: as questões respondidas (OS e checagem) entraram no baralho
    await page.click('[data-nav="bancada"]'); await page.waitForSelector('.mcard');
    await tab(page, 'revisar');
    const rev = await page.textContent('[data-nav="review"]');
    check(/revis/i.test(rev) && !(await page.isDisabled('[data-nav="review"]')), `${where}: revisão não foi liberada (“${rev}”)`);
    await page.click('[data-nav="review"]'); await page.waitForSelector('.q');
    await page.click('.q .opts button[data-opt="0"]');
    check(await page.isVisible('.q .fbk'), `${where}: questão da revisão sem correção`);
    if (where === '1280 claro') await axe(page, `${where} · revisão`);
    // progresso persiste após recarregar
    await page.reload(); await page.waitForSelector('.tabs a[aria-current="page"][href="#revisar"]');
    await tab(page, 'bancada'); await page.waitForSelector('.mcard');
    check(/1 atendimento/.test(await page.textContent('.mcard:first-child .mfoot')), `${where}: progresso não persistiu após recarregar`);
    // modo prova: sem botão de dica, com contagem regressiva
    await page.click('[data-nav="prova"]'); await page.waitForSelector('#clock');
    check(!(await page.$('[data-nav="hint"]')), `${where}: modo prova mostra dicas`);
    check(/^[78]:\d\d$/.test(await page.textContent('#clock')), `${where}: modo prova sem contagem regressiva`);
    await noHScroll(page, `${where} · modo prova`);
    // botão voltar no meio da OS pede confirmação em vez de sair
    await page.goBack(); await page.waitForTimeout(150);
    check(await page.isVisible('#ab'), `${where}: “voltar” no meio da OS não pediu confirmação`);
    await page.click('#ab'); await page.waitForSelector('.mcard');
    check(!errs.length, `${where}: erros de JavaScript: ${errs.join(' | ')}`);
    await ctx.close();
  }

  // offline: depois da primeira visita, o app abre sem rede
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(URL_); await page.waitForSelector('.item-edital');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload(); await page.waitForSelector('.item-edital');
  await ctx.setOffline(true);
  await page.reload();
  const ok = await page.waitForSelector('.item-edital', { timeout: 5000 }).then(() => true, () => false);
  check(ok, 'offline: o app não abriu sem internet depois da primeira visita');
  if (ok) {
    await page.evaluate(() => { location.hash = '#mod/potencia-trifasicos'; });
    check(await page.waitForSelector('.leitor [data-fim]', { timeout: 5000 }).then(() => true, () => false), 'offline: o módulo da apostila não abriu sem internet');
    await page.goto(URL_ + '#mod/potencia-trifasicos/checagem');
    check(await page.waitForSelector('.checagem .q', { timeout: 5000 }).then(() => true, () => false), 'offline: a checagem não abriu sem internet (recarregando)');
    await tab(page, 'bancada'); await page.waitForSelector('.mcard');
    await page.click('[data-nav="start:dr"]'); check(await page.isVisible('#scheme svg'), 'offline: a OS 4 não abriu sem internet');
  }
  await ctx.close();
} finally {
  await browser.close(); server.close();
}
if (fails.length) { console.error('bancada: FALHOU\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('bancada OK: apostila (mapa, leitor, essencial, checagem) e OS de ponta a ponta em 3 tamanhos × 2 temas, acessibilidade, revisão, modo prova e offline.');

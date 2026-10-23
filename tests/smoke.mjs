/* Bancada: teste de fumaça num Chromium de verdade. Joga uma OS inteira pela interface e falha se aparecer
   erro de JavaScript, rolagem lateral, falha séria de acessibilidade (WCAG AA) ou se o app não abrir offline.
   Rodar (na raiz do repositório): npm install && npm run test:bancada */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
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
const URL_ = `http://127.0.0.1:${server.address().port}/bancada/`;

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
    await page.waitForSelector('.mcard');
    check((await page.$$('.mcard')).length === 4, `${where}: painel sem as 4 OS`);
    await noHScroll(page, `${where} · painel`);
    if (vw === '1280' || vw === '320') await axe(page, `${where} · painel`);
    await playOS1(page, where);
    // revisão espaçada: a questão respondida entrou no baralho
    await page.click('[data-nav="home"]');
    const rev = await page.textContent('[data-nav="review"]');
    check(/Revisão/.test(rev) && !(await page.isDisabled('[data-nav="review"]')), `${where}: revisão não foi liberada (“${rev}”)`);
    await page.click('[data-nav="review"]'); await page.waitForSelector('.q');
    if (where === '1280 claro') await axe(page, `${where} · revisão`);
    // progresso persiste após recarregar
    await page.reload(); await page.waitForSelector('.mcard');
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
  await page.goto(URL_); await page.waitForSelector('.mcard');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload(); await page.waitForSelector('.mcard');
  await ctx.setOffline(true);
  await page.reload();
  const ok = await page.waitForSelector('.mcard', { timeout: 5000 }).then(() => true, () => false);
  check(ok, 'offline: o app não abriu sem internet depois da primeira visita');
  if (ok) { await page.click('[data-nav="start:dr"]'); check(await page.isVisible('#scheme svg'), 'offline: a OS 4 não abriu sem internet'); }
  await ctx.close();
} finally {
  await browser.close(); server.close();
}
if (fails.length) { console.error('bancada: FALHOU\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('bancada OK: OS jogada de ponta a ponta em 3 tamanhos × 2 temas, acessibilidade, revisão, modo prova e offline.');

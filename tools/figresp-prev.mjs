/* Folha de contato das figuras de resposta, para conferir a olho: node tools/figresp-prev.mjs [prefixo-do-id] [--claro]
   Grava $TMPDIR/figresp-prev-<n>.png (várias páginas) e imprime os caminhos. Usa o Chrome de CHROMIUM ou o do Windows. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TMP = process.env.TMPDIR || process.env.TEMP || '.';
const ctx = vm.createContext({ window: { DATA: {} } });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data/figresp.js'), 'utf8'), ctx);
const Q = {};
{
  const c2 = vm.createContext({ window: { DATA: {} } });
  for (const f of ['data/base.js', ...fs.readdirSync(path.join(ROOT, 'data/estacoes')).map(f => 'data/estacoes/' + f), 'data/embreve.js', 'data/questoes.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), c2);
  for (const q of c2.window.DATA.questions) Q[q.id] = q;
}
const pref = process.argv.find(a => !a.startsWith('--') && !a.endsWith('.mjs') && !a.includes('node')) || '';
const claro = process.argv.includes('--claro');
const ids = Object.keys(ctx.window.DATA.figResp).filter(id => (Q[id]?.n || id).startsWith(pref));
const css = ['tema.css', 'polish.css', 'estacao.css'].map(f => fs.readFileSync(path.join(ROOT, 'css', f), 'utf8')).join('\n');
const cards = ids.map(id => `<section><h4>${Q[id]?.n || '?'} · ${id}</h4><div class="estacao qfig"><figure>${ctx.window.DATA.figResp[id]}</figure></div></section>`).join('');
const html = `<!doctype html><meta charset=utf-8><html data-theme="${claro ? 'light' : 'dark'}"><style>${css}
body{margin:0;padding:12px;background:var(--bg,#111);color:var(--ink);font-family:system-ui}
.g{display:grid;grid-template-columns:repeat(2,minmax(0,640px));gap:14px}h4{margin:0 0 4px;font:12px monospace;color:var(--muted)}section{min-width:0}</style><body><div class="g">${cards}</div>`;
const exe = process.env.CHROMIUM || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const br = await chromium.launch({ executablePath: exe });
const pg = await br.newPage({ viewport: { width: 1340, height: 900 } });
await pg.setContent(html);
const per = 8, pages = Math.ceil(ids.length / per);
const n = await pg.evaluate(() => document.querySelectorAll('section').length);
for (let p = 0; p < pages; p++) {
  await pg.evaluate(([a, b]) => document.querySelectorAll('section').forEach((s, i) => { s.style.display = i >= a && i < b ? '' : 'none'; }), [p * per, (p + 1) * per]);
  const f = path.join(TMP, `figresp-prev-${p + 1}.png`);
  await pg.screenshot({ path: f, fullPage: true }); console.log(f);
}
await br.close();
console.log(n, 'figuras');

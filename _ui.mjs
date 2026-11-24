import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd(), TMP = process.env.TMPDIR || process.env.TEMP;
const T = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
const srv = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)); const f = p.endsWith(path.sep) || p.endsWith('/') ? path.join(p, 'index.html') : p;
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const port = srv.address().port;
const br = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const [tema, vp] of [['dark', { width: 390, height: 900 }], ['light', { width: 1100, height: 900 }]]) {
  const pg = await br.newPage({ viewport: vp });
  const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await pg.addInitScript(t => { try { localStorage.setItem('edo-prefs', JSON.stringify({ theme: t })); } catch {} }, tema);
  await pg.goto(`http://localhost:${port}/index.html#e1`);
  await pg.waitForTimeout(800);
  await pg.evaluate(() => document.documentElement.setAttribute('data-theme', window.__t || document.documentElement.getAttribute('data-theme')));
  const tab = pg.locator('button, a, [role=tab]').filter({ hasText: /^Questões/ }).first();
  await tab.click(); await pg.waitForTimeout(600);
  const card = pg.locator('.q').filter({ hasText: 'Duas lâmpadas incandescentes' }).first();
  await card.scrollIntoViewIfNeeded();
  const before = await card.locator('.qresp').count();
  await card.locator('.alt[data-k="E"]').click(); await pg.waitForTimeout(500);
  const after = await card.locator('.qresp svg').count();
  console.log(tema, 'antes:', before, 'depois:', after, 'erros:', errs.slice(0, 3));
  await card.screenshot({ path: path.join(TMP, `ui-${tema}.png`) });
  await pg.close();
}
await br.close(); srv.close();

/* Figuras no modo TREINAR (resultado oculto): node tools/fig-treino.mjs [ids]. PNGs em scratch/figs-treino/<id>.png (390 px, tema claro).
   Serve para conferir a olho que nenhuma forma (barra, ângulo, ponteiro, triângulo) deixa ler o resultado pedido. */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
const out = process.env.LOCALAPPDATA + '/hermes/cache/scratch/figs-treino'; fs.mkdirSync(out, { recursive: true });
const url = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 900 }, serviceWorkers: 'block', colorScheme: 'light', reducedMotion: 'reduce' });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(url); await p.waitForTimeout(600);
let ids = process.argv.slice(2); if (!ids.length) ids = await p.evaluate(() => CONTASFIG.ids());
for (const id of ids) {
  await p.evaluate(i => go('biblioteca', { s: 'contas', r: i }), id); await p.waitForTimeout(300);
  await p.locator('.ct-modo button[data-m="treino"]').click(); await p.waitForTimeout(400);
  await p.locator('#ctfig').screenshot({ path: `${out}/${id}.png` });
}
console.log('erros:', errs.join('|') || 'nenhum', ids.length, 'figuras');
await b.close();

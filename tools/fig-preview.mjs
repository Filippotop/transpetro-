/* Pré-visualização das figuras das contas: node tools/fig-preview.mjs id1 id2 ...   (sem ids: todas as que têm figura)
   Para cada id: abre a conta no Chromium, mostra todos os passos (resultado na figura), tira um PNG da figura em 390 px escuro e 900 px claro,
   e mais um com valores sorteados. Imprime erros de página e elementos de texto que se sobrepõem. PNGs em $LOCALAPPDATA/hermes/cache/scratch/figs. */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
const out = process.env.LOCALAPPDATA + '/hermes/cache/scratch/figs'; fs.mkdirSync(out, { recursive: true });
const url = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const b = await chromium.launch();
let ids = process.argv.slice(2);
for (const [w, h, th] of [[390, 900, 'dark'], [900, 900, 'light']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block', colorScheme: th });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(t => { if (!localStorage.getItem('edo-prefs')) localStorage.setItem('edo-prefs', JSON.stringify({ theme: t })); }, th);
  await p.goto(url); await p.waitForTimeout(700);
  if (!ids.length) ids = await p.evaluate(() => CONTASFIG.ids());
  for (const id of ids) for (const modo of ['ex', 'sorteio']) {
    await p.evaluate(i => go('biblioteca', { s: 'contas', r: i }), id); await p.waitForTimeout(350);
    if (modo === 'sorteio') await p.evaluate(i => { const r = CONTAS.receita(i), v = CONTAS.sortear(r); document.querySelectorAll('#ctc input[data-k],#ctc select[data-k]').forEach(el => { el.value = String(v[el.dataset.k]).replace('.', ','); el.dispatchEvent(new Event('input', { bubbles: true })); }); }, id);
    await p.waitForTimeout(200);
    const cta = p.locator('#cta'); if (await cta.count() && await cta.isVisible()) await cta.click();
    await p.waitForTimeout(700);
    const fig = p.locator('#ctfig');
    if (!await fig.count() || await fig.isHidden()) { console.log(w, id, modo, 'SEM FIGURA'); continue; }
    await fig.screenshot({ path: `${out}/${id}-${modo}-${w}.png` });
    const bad = await p.evaluate(() => {
      const ts = [...document.querySelectorAll('#ctfig text')].map(e => ({ t: e.textContent, r: e.getBoundingClientRect() })).filter(x => x.r.width > 0);
      const o = []; for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) { const a = ts[i].r, c = ts[j].r; const ox = Math.min(a.right, c.right) - Math.max(a.left, c.left), oy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top); if (ox > 3 && oy > 3) o.push(`"${ts[i].t}" × "${ts[j].t}"`); }
      const s = document.querySelector('#ctfig svg'), sr = s.getBoundingClientRect(), fora = ts.filter(x => x.r.left < sr.left - 1 || x.r.right > sr.right + 1 || x.r.top < sr.top - 1 || x.r.bottom > sr.bottom + 1).map(x => x.t);
      return { o, fora };
    });
    if (bad.o.length || bad.fora.length) console.log(w, th, id, modo, 'TEXTOS SOBREPOSTOS:', bad.o.join('; '), '| FORA DA FIGURA:', bad.fora.join('; '));
  }
  console.log(w, th, 'erros de página:', errs.join(' | ') || 'nenhum');
  await ctx.close();
}
await b.close();

/* Gera data/figresp.js: o circuito resolvido de cada questão, mostrado só na resposta (index.html, DATA.figResp[id]).
   Uso: node tools/figresp.mjs [--saida arquivo]   (determinístico; não edite data/figresp.js à mão)
   As figuras ficam em tools/figresp/<estação>.mjs (uma por estação, chave = id da questão); a biblioteca de desenho
   é tools/figresp/lib.mjs. Todas usam só classes s-* (css/estacao.css), sem cor fixa. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(ROOT, 'tools/figresp');
const out = process.argv.includes('--saida') ? process.argv[process.argv.indexOf('--saida') + 1] : path.join(ROOT, 'data/figresp.js');
const all = {};
for (const f of fs.readdirSync(dir).filter(f => /^[A-Z]\d\w*\.mjs$/.test(f)).sort()) {
  const mod = (await import(pathToFileURL(path.join(dir, f)).href)).default;
  for (const [id, svg] of Object.entries(mod)) {
    if (all[id]) throw new Error(`figura repetida: ${id} (${f})`);
    all[id] = svg.replace(/\n/g, '');
  }
}
const ids = Object.keys(all).sort();
const body = ids.map(id => `${JSON.stringify(id)}:${JSON.stringify(all[id])}`).join(',\n');
fs.writeFileSync(out, `/* Elétrica de Ouro: circuito resolvido de cada questão, mostrado só na resposta.
   Gerado por tools/figresp.mjs a partir de tools/figresp/*.mjs. Não edite à mão: mude a figura e gere de novo (node tools/figresp.mjs). */
window.DATA.figResp = {\n${body}\n};\n`);
console.log(`${ids.length} figuras → ${path.relative(ROOT, out)}`);

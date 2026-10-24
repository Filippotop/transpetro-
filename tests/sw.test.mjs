/* Service worker: todo arquivo que o app carrega precisa estar em FILES, senão o app não abre offline.
   Rodar: node --test tests/*.test.mjs */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SW = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const FILES = new Set([...SW.match(/const FILES = \[([\s\S]*?)\];/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]));

/** Arquivos .js alcançáveis a partir de js/app.js pelos imports estáticos. */
function alcancaveis(rel, seen = new Set()) {
  if (seen.has(rel)) return seen;
  seen.add(rel);
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const m of src.matchAll(/^\s*(?:import|export)\b[^'"]*?from\s*['"](\.[^'"]+)['"]/gm)) {
    alcancaveis(path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1])), seen);
  }
  return seen;
}

test('sw.js: FILES traz todos os módulos JS que o app importa', () => {
  const js = [...alcancaveis('js/app.js')];
  assert.ok(js.includes('js/apostila/index.js') && js.includes('js/mastery.js'), 'o app deveria importar a apostila e o domínio');
  for (const f of js) assert.ok(FILES.has(f), `${f} falta em FILES do sw.js`);
  for (const f of FILES) if (f !== './') assert.ok(fs.existsSync(path.join(ROOT, f)), `FILES cita ${f}, que não existe`);
});

test('sw.js: VER no formato data.n', () => {
  assert.match(SW, /const VER = '\d{4}-\d{2}-\d{2}\.\d+';/);
});

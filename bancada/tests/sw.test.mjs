/* Bancada offline: quem a guarda é o service worker da raiz (../../sw.js). Todo arquivo que a Bancada carrega precisa
   estar em BANCADA_FILES de lá, senão ela não abre offline. A Bancada não registra service worker próprio.
   Rodar: node --test bancada/tests/*.test.mjs */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SW = fs.readFileSync(path.join(ROOT, '..', 'sw.js'), 'utf8');
const FILES = new Set([...SW.match(/const BANCADA_FILES=\[([\s\S]*?)\];/)[1].matchAll(/'([^']+)'/g)].map(m => m[1].replace(/^bancada\//, '')));

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

test('sw.js da raiz: BANCADA_FILES traz todos os módulos JS que a Bancada importa', () => {
  const js = [...alcancaveis('js/app.js')];
  assert.ok(js.includes('js/apostila/index.js') && js.includes('js/mastery.js'), 'o app deveria importar a apostila e o domínio');
  for (const f of js) assert.ok(FILES.has(f), `bancada/${f} falta em BANCADA_FILES do sw.js da raiz`);
  for (const f of ['', 'index.html', 'css/app.css', 'manifest.webmanifest']) assert.ok(FILES.has(f), `bancada/${f} falta em BANCADA_FILES`);
  for (const f of FILES) if (f !== '') assert.ok(fs.existsSync(path.join(ROOT, f)), `BANCADA_FILES cita bancada/${f}, que não existe`);
});

test('a Bancada não registra service worker próprio', () => {
  assert.ok(!fs.existsSync(path.join(ROOT, 'sw.js')), 'bancada/sw.js não deveria existir');
  assert.doesNotMatch(fs.readFileSync(path.join(ROOT, 'js/app.js'), 'utf8'), /serviceWorker\.register/);
});

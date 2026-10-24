/* Elétrica de Ouro: service worker da raiz. Nunca responde a API do GitHub com cache; cuida da Bancada (bancada/) e
   devolve, sem internet, a página certa de cada navegação. Rodar: node tests/sw.test.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const handlers = {}, matched = [];
const self = { addEventListener: (t, f) => { handlers[t] = f; }, location: { origin: 'https://filippotop.github.io' }, clients: { claim() {}, matchAll: async () => [] }, skipWaiting() {} };
const ctx = vm.createContext({ self, location: self.location, URL, caches: { match: async () => 'cache:de-outro-app', open: async name => ({ put() {}, match: async k => { matched.push([name, k]); return name.startsWith('edo-shell-') ? 'cache:' + k : null; }, keys: async () => [], addAll: async () => {} }), keys: async () => [] }, fetch: async () => { throw new Error('offline'); }, Promise });
vm.runInContext(SRC, ctx, { filename: 'sw.js' });

const fails = [];
const fire = (url, mode = 'cors') => { let p = null; handlers.fetch({ request: { method: 'GET', url, mode }, respondWith(x) { p = x; Promise.resolve(x).catch(() => {}); /* sem rede no teste: a busca pode falhar */ }, waitUntil() {} }); return p; };
for (const url of ['https://api.github.com/gists?per_page=100', 'https://api.github.com/gists/abc123'])
  if (fire(url)) fails.push(`o service worker interceptou ${url}: a sincronização leria dados velhos do cache`);
if (!fire('https://filippotop.github.io/transpetro-/bancada/js/app.js')) fails.push('o service worker da raiz não cuida da Bancada (ela não tem mais service worker próprio)');
if (!fire('https://fonts.googleapis.com/css2?family=X')) fails.push('o service worker deixou de cuidar das fontes (teste de sanidade)');
/* Sem internet, cada navegação recebe a sua página. */
for (const [url, want] of [['https://filippotop.github.io/transpetro-/bancada/', 'bancada/index.html'], ['https://filippotop.github.io/transpetro-/bancada/#bancada', 'bancada/index.html'], ['https://filippotop.github.io/transpetro-/', 'index.html'], ['https://filippotop.github.io/transpetro-/?x=1', 'index.html']]) {
  const got = await fire(url, 'navigate');
  if (got !== 'cache:' + want) fails.push(`offline: ${url} devolveu "${got}" (esperado ${want})`);
}
/* Só os caches deste app: caches.match() acharia também os da Bancada antiga e os do Humanas de Ouro (mesma origem). */
if (/caches\.match\(/.test(SRC.replace(/\/\*[\s\S]*?\*\//g, ''))) fails.push('sw.js usa caches.match(), que procura em todos os caches da origem');
/* Arquivos citados existem; caches com prefixo edo- (o Humanas de Ouro, na mesma origem, usa hdo-). */
const list = name => [...SRC.match(new RegExp(`const ${name}=\\[([\\s\\S]*?)\\];`))[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
for (const f of [...list('SHELL_FILES'), ...list('BANCADA_FILES')]) if (!f.endsWith('/') && !fs.existsSync(path.join(ROOT, f))) fails.push(`sw.js cita ${f}, que não existe`);
for (const f of [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/<script src="([^":]+)"/g)].map(m => m[1])) if (!list('SHELL_FILES').includes(f)) fails.push(`sw.js: ${f} (carregado pelo index.html) falta em SHELL_FILES`);
for (const m of SRC.matchAll(/'((?:hdo|edo)-[a-z-]*)'/g)) if (!m[1].startsWith('edo-')) fails.push(`sw.js: cache "${m[1]}" fora do prefixo edo-`);
if (!/const VER='\d{4}-\d{2}-\d{2}\.\d+';/.test(SRC)) fails.push('sw.js: VER fora do formato data.n');
if (fs.existsSync(path.join(ROOT, 'bancada', 'sw.js'))) fails.push('bancada/sw.js voltou: dois service workers disputariam o mesmo escopo');
if (fails.length) { console.error('sw: FALHOU\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('sw: API do GitHub fora do cache, Bancada coberta e offline com a página certa');

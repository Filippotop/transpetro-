/* Diagramas de comando (partida direta com selo e reversão), os mesmos desenhados em fontes/banco-de-questoes.html
   (CMD1 e CMD2) e usados nas questões M1.36 a M1.38. Aqui entram completos (com todos os rótulos), para a resposta. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SRC = fs.readFileSync(path.join(ROOT, 'fontes/banco-de-questoes.html'), 'utf8');
const ini = SRC.indexOf('<script>\nconst FIG'), fim = SRC.indexOf('const TK=');
if (ini < 0 || fim < 0) throw new Error('banco: não achei o bloco de dados do <script>');
const B = vm.createContext({});
vm.runInContext(SRC.slice(ini + 8, fim).replace(/^const /gm, 'var ').replace(/^let /gm, 'var '), B);
const svgClasses = svg => svg.replace(/\sclass="([^"]*)"/g, (_, c) => ` class="${c.split(/\s+/).filter(Boolean).map(x => 's-' + x).join(' ')}"`);
const DEFS = svgClasses(B.DEFS).match(/<defs>[\s\S]*<\/defs>/)[0];

export function cmd(key, qid) {
  let svg = svgClasses(key === 'CMD1' ? B.CMD1() : B.CMD2());
  const pre = 'fr' + qid.replace(/[^\w]/g, '') + '-';
  const usa = [...new Set([...svg.matchAll(/url\(#([\w-]+)\)/g)].map(m => m[1]))];
  if (usa.length) {
    const defs = DEFS.replace(/<marker id="([\w-]+)"[\s\S]*?<\/marker>/g, (m, id) => usa.includes(id) ? m.replace(`id="${id}"`, `id="${pre}${id}"`) : '');
    svg = svg.replace(/url\(#([\w-]+)\)/g, (_, id) => `url(#${pre}${id})`).replace(/(<svg[^>]*>)/, `$1${defs}`);
  }
  return svg.replace(/\n/g, '');
}

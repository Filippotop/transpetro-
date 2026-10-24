/* Converte um aprofundamento HTML de fontes/ numa estação do app (data/estacoes/<id>.js).
   Uso: node tools/estacao.mjs <fonte.html> <id> [--secoes 1-5]
   - html: as seções "bN" escolhidas (<h2> vira <h4>, <h3> vira <h5>), com figuras, quadros .eq e caixas no estilo do
     app; depois "Antes de começar" (renomeável) e "Fontes". Os <script> saem: cada calculadora (.lab) vira
     <div data-calc="nome" data-cfg='{…}'>, montada por js/calc.js, e cada bloco de exercícios vira uma lista com
     gabarito comentado (data-calc="exercicios").
   - formulas: o "Formulário-resumo", uma fórmula por quadro.
   - O resto (título, itens, resumo, cartões, V ou F, contas, trocas de texto) vem de tools/estacoes/<id>.mjs. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const [fonte, id] = args.filter(a => !a.startsWith('--') && !/^\d+(-\d+)?$/.test(a));
const si = args.indexOf('--secoes');
if (!fonte || !id) { console.error('uso: node tools/estacao.mjs <fonte.html> <id> [--secoes 1-5]'); process.exit(2); }
const metaFile = path.join(ROOT, 'tools', 'estacoes', id + '.mjs');
const M = (await import(pathToFileURL(metaFile))).default;

/* Calculadoras conhecidas: id do .lab na apostila → widget de js/calc.js. Cada estação pode acrescentar as suas
   (campo labs do arquivo de metadados), porque apostilas diferentes repetem ids como lab1. */
const LABS = { labk: 'kirchhoff-2-malhas', labt: 'thevenin-carga', ...(M.labs || {}) };

let src = fs.readFileSync(path.resolve(ROOT, fonte), 'utf8');
/* Trocas (correções e contexto): cada uma precisa existir exatamente uma vez na fonte. */
for (const t of M.trocas || []) {
  const n = src.split(t.de).length - 1;
  if (n !== 1) throw new Error(`troca${t.errata ? ' ' + t.errata : ''}: "${t.de.slice(0, 70)}…" aparece ${n} vezes na fonte`);
  src = src.replace(t.de, () => t.para);
}

/* Exercícios: o objeto QUIZ do <script> da apostila. */
const qm = src.match(/const QUIZ\s*=\s*(\{[\s\S]*?\});\s*\n\s*const L\b/);
const QUIZ = qm ? vm.runInNewContext('(' + qm[1] + ')') : {};
/* Exercícios de seções novas, escritas para a estação (campo quiz dos metadados). */
Object.assign(QUIZ, M.quiz || {});
const LET = 'ABCDE';

/* Seções <section id="…" class="block">. */
const secs = {};
for (const m of src.matchAll(/<section id="([^"]+)" class="block">([\s\S]*?)<\/section>/g)) secs[m[1]] = m[2];
/* Seções novas, escritas para a estação no mesmo formato da apostila (campo secoes dos metadados: {b7: '…'}). */
for (const [k, v] of Object.entries(M.secoes || {})) { if (secs[k]) throw new Error('seção nova com id já usado: ' + k); secs[k] = v; }
const range = si >= 0 ? args[si + 1].split('-').map(Number) : [1, Object.keys(secs).filter(k => /^b\d+$/.test(k)).length];
const blocos = []; for (let i = range[0]; i <= (range[1] || range[0]); i++) blocos.push('b' + i);

/* Corta o elemento que começa em i (contando aberturas e fechamentos da mesma tag). */
function balanced(html, i, tag) {
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g'); re.lastIndex = i; let d = 0, m;
  while ((m = re.exec(html))) { d += m[1] ? -1 : 1; if (!d) return re.lastIndex; }
  throw new Error('elemento sem fechamento em ' + i);
}
const attr = s => s.replace(/&/g, '&amp;').replace(/'/g, '&#39;');
const strip = s => s.replace(/<[^>]+>/g, '').trim();

/* Classes do SVG ganham o prefixo s- (o app já usa .tl, .fc, .ar, .cell, .grid… para outras coisas). */
const svgClasses = svg => svg.replace(/\sclass="([^"]*)"/g, (_, c) => ` class="${c.split(/\s+/).filter(Boolean).map(x => 's-' + x).join(' ')}"`);

function exercicios(set, n) {
  const qs = QUIZ[set] || [];
  if (!qs.length) return '';
  return `<div class="exs" data-calc="exercicios">\n<p class="exs-t">Exercícios de fixação da seção ${n}</p>\n<p class="exs-h">No estilo da banca, com gabarito comentado. Toque numa alternativa para conferir.</p>\n<ol class="exs-l">\n` +
    qs.map(q => `<li class="exq" data-a="${q.a}"><p class="exq-s">${q.s}</p>\n<ol class="exq-o">${q.o.map((o, k) => `<li><span class="exq-l">(${LET[k]})</span> <span>${o}</span></li>`).join('')}</ol>\n<details class="exq-g"><summary>Ver o gabarito comentado</summary><p><b>Resposta: (${LET[q.a]})</b> ${q.c}</p></details></li>`).join('\n') +
    `\n</ol>\n</div>`;
}

/* num: o número da seção dentro da estação (1, 2, 3…), que pode ser outro que o da apostila (a E3 começa no bloco 5). */
function converte(key, body, titulo, num) {
  let h = body.replace(/<!--[\s\S]*?-->/g, '');
  /* Cabeçalho do bloco. */
  h = h.replace(/<div class="block-head">(?:<span class="block-num">(\d+)<\/span>)?<h2>([\s\S]*?)<\/h2><\/div>/, (_, n, t) => `<h4>${n ? (num || n) + '. ' : ''}${titulo || t}</h4>`);
  h = h.replace(/<h3>/g, '<h5>').replace(/<\/h3>/g, '</h5>');
  /* Calculadoras. */
  let i;
  while ((i = h.search(/<div class="lab" id="/)) >= 0) {
    const end = balanced(h, i, 'div'), lab = h.slice(i, end), lid = lab.match(/id="(\w+)"/)[1];
    if (!LABS[lid]) throw new Error('calculadora desconhecida: ' + lid);
    const valores = {}; for (const m of lab.matchAll(/<input id="(\w+)"[^>]*value="([^"]*)"/g)) valores[m[1]] = Number(m[2]);
    /* <select>: a opção marcada (selected) ou a primeira. */
    for (const m of lab.matchAll(/<select id="(\w+)">([\s\S]*?)<\/select>/g)) valores[m[1]] = (m[2].match(/<option value="([^"]*)" selected/) || m[2].match(/<option value="([^"]*)"/))[1];
    const cfg = { titulo: strip(lab.match(/<h4>([\s\S]*?)<\/h4>/)[1]), dica: strip(lab.match(/<p class="hint">([\s\S]*?)<\/p>/)[1]), valores };
    h = h.slice(0, i) + `<div class="lab" data-calc="${LABS[lid]}" data-cfg='${attr(JSON.stringify(cfg))}'></div>` + h.slice(end);
  }
  /* Exercícios. */
  h = h.replace(/<div class="quiz" data-set="(\w+)"><\/div>/g, (_, s) => exercicios(s, num || s.slice(1)));
  /* Caixas no estilo do app: Exemplo, Pegadinha, Como a banca cobra. */
  const BOX = { ex: 'exemplo', trap: 'pegadinha', cesg: 'banca', alert: 'pegadinha' };
  h = h.replace(/<div class="box ([\w ]+)">/g, (_, c) => `<div class="box ${c.split(' ').map(x => BOX[x] || x).join(' ')}">`);
  h = h.replace(/<p class="box-title">([\s\S]*?)<\/p>/g, '<b class="box-t">$1</b>');
  /* Equações com mais de uma fórmula: cada uma num bloco que quebra de linha no celular. */
  h = h.replace(/<div class="eq-main">([\s\S]*?)<\/div>/g, (_, e) => `<div class="eq-main">${e.split(/(?:\s*&nbsp;){3,}\s*/).map(x => `<span class="eq-part">${x.trim()}</span>`).join('')}</div>`);
  /* SVG. */
  h = h.replace(/<svg\b[\s\S]*?<\/svg>/g, svgClasses);
  h = h.replace(/<ul class="sources">/g, '<ul class="fontes">').replace(/<footer>([\s\S]*?)<\/footer>/g, '<p class="nota">$1</p>');
  /* Recuo: cada linha sem os espaços da apostila. */
  return h.split('\n').map(l => l.trim()).filter(Boolean).join('\n');
}

const defs = (src.match(/<svg width="0" height="0"[\s\S]*?<\/svg>/) || [''])[0];
const ren = M.renomear || {};
const partes = [svgClasses(defs).replace('<svg ', '<svg class="defs" ')];
blocos.forEach((b, k) => { if (!secs[b]) throw new Error('seção ausente: ' + b); partes.push(converte(b, secs[b], null, k + 1)); });
if (secs.antes) partes.push(converte('antes', secs.antes, ren.antes));
if (secs.fontes) partes.push(converte('fontes', secs.fontes, ren.fontes));
let html = partes.join('\n');
/* Figuras numeradas na ordem em que aparecem na estação (a apostila da E3 começa na figura 6 e põe a 9 antes da 8);
   as referências no texto ("figura 8") seguem a nova numeração. */
const figNum = {}; let nf = 0;
for (const m of html.matchAll(/<figcaption>Figura (\d+)\./g)) { if (figNum[m[1]]) throw new Error('figura repetida: ' + m[1]); figNum[m[1]] = String(++nf); }
html = html.replace(/\b([Ff]igura|[Ff]iguras) (\d+)\b/g, (x, w, n) => { if (!figNum[n]) throw new Error(`"${x}": a estação não tem essa figura`); return `${w} ${figNum[n]}`; });

/* Formulário-resumo: uma fórmula por quadro. */
/* A fonte de duas estações (E2 e E3) divide o formulário por assunto: M.formulario lista, na ordem, o nome de cada
   linha da apostila que fica ou uma linha nova [nome, fórmula em HTML, observação]. Sem M.formulario, ficam todas. */
const linhas = {};
for (const r of (secs.form || '').matchAll(/<tr><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><td>([\s\S]*?)<\/td><\/tr>/g)) linhas[r[1]] = [r[2], r[3]];
const nomes = M.formulario || Object.keys(linhas);
const formulas = [];
for (const nome of nomes) {
  if (Array.isArray(nome)) { const [n, main, obs] = nome; formulas.push(`<div class="eq eq-f"><p class="eq-name">${n}</p><div class="eq-main">${main}</div><p class="eq-obs">${obs}</p></div>`); continue; }
  if (!linhas[nome]) throw new Error('linha do formulário-resumo não encontrada: ' + nome);
  const [f, obs] = linhas[nome];
  const main = (M.formulaHtml || {})[nome] || `<span class="eq-part">${f}</span>`;
  formulas.push(`<div class="eq eq-f"><p class="eq-name">${nome}</p><div class="eq-main">${main}</div><p class="eq-obs">${obs}</p></div>`);
}
if (!formulas.length) throw new Error('formulário-resumo não encontrado');

/* O verso do cartão-resumo é um flex: o texto vai num <span> só, senão cada <sub> vira uma linha. */
const resumo = M.resumo.map(([t, d]) => [t, `<span>${d}</span>`]);
const mod = { ...M.meta, html, resumo, formulas, qs: M.qs || [],
  contas: M.contas.map(([expr, valor, onde]) => ({ expr, valor, onde })) };
const cards = M.cards.map(([q, a], k) => ({ id: `${id}-c${k + 1}`, vol: M.meta.vol, q, a }));
const vf = M.vf.map(([s, v, why], k) => ({ id: `vf-${id}-${k + 1}`, mod: id, s, v, why }));

const out = `/* ${id} · ${M.meta.title}
   Gerado por tools/estacao.mjs a partir de ${M.fonte || fonte} e tools/estacoes/${id}.mjs. Não edite à mão: mude a fonte
   ou o arquivo de metadados e gere de novo (node tools/estacao.mjs ${fonte} ${id}${si >= 0 ? ' --secoes ' + args[si + 1] : ''}). */
(function (D) {
  var m = ${JSON.stringify(mod)};
  var i = D.modules.findIndex(function (x) { return x.id === m.id; });
  if (i >= 0) D.modules[i] = m; else D.modules.push(m);
  D.cards = D.cards.filter(function (c) { return c.id.indexOf(m.id + '-c') !== 0; }).concat(${JSON.stringify(cards)});
  D.vf = D.vf.filter(function (v) { return v.mod !== m.id; }).concat(${JSON.stringify(vf)});
})(window.DATA);
`;
const dest = path.join(ROOT, 'data', 'estacoes', id + '.js');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, out);
console.log(`${dest}: ${blocos.length} seções, ${formulas.length} fórmulas, ${(html.match(/<figure/g) || []).length} figuras, ${(html.match(/data-calc="(?!exercicios)/g) || []).length} calculadoras, ${Object.values(QUIZ).flat().length} exercícios, ${cards.length} cartões, ${vf.length} V ou F, ${mod.contas.length} contas`);

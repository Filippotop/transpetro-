/* Converte o banco de questões do estudante (fontes/banco-de-questoes.html) em data/questoes.js, no formato de questões
   do app: {id, vol, n, mod, kind:'banco', tag, base, cmd, fig?, alts[5], ans:'A'–'E', ex:{A..E}, traps, erros, hab, dif,
   conta?, origem}.
   Uso: node tools/banco.mjs [--saida arquivo]   (determinístico; não edite data/questoes.js à mão)

   - As 158 questões "das apostilas" (APOST) são os exercícios do fim de cada seção das apostilas. Elas são lidas da
     apostila com as trocas da estação aplicadas (tools/estacoes/<id>.mjs), para que as correções já feitas nas estações
     (fontes/ERRATA.md) valham também aqui. As 47 do BANK vêm do banco como estão.
   - A revisão de cada questão fica em tools/banco/T1.mjs … T5.mjs (uma entrada por id do banco):
       mod   estação (padrão: a dona da seção da apostila; no BANK, obrigatório)
       d     dificuldade: 'f' fácil, 'm' média, 'd' difícil
       h     item do edital (padrão: o da seção)
       tag   assunto (padrão: o título da seção da estação, ou o "sub" do banco)
       w     explicação de cada alternativa errada, pela letra. Um prefixo [a,b] dá a armadilha (TRAPS do app: oposto,
             unidade, formula, detalhe, exagero) e/ou o tipo de erro (tools/banco/erros.mjs). Sem texto, usa o do tipo.
       conta expressão (ou lista) que o teste recalcula: o número tem de aparecer na alternativa correta (1%).
       fix   correção do enunciado, das alternativas, do gabarito ou do comentário: {s, o, a, c, errata} (errata = id da
             entrada de fontes/ERRATA.md) ou, para ajuste só de redação, {…, ed: 'motivo'}
       figTira/figTroca  rótulos da figura que entregariam a resposta: tirados (texto exato do <text>) ou trocados
       conv  questão de clique no diagrama (hot) ou de ordenação (ord) refeita como múltipla escolha: {s, o, a, c, errata?}
             (o app não tem questão de clicar na figura nem de ordenar; a figura continua junto da questão)
   - As figuras vêm das estações (as mesmas, já revisadas, com classes s-*); as do comando de partida direta e de
     reversão são desenhadas pelo próprio banco. Os marcadores de seta de cada figura ganham ids próprios da questão. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const LET = 'ABCDE';
const TRAP_KEYS = new Set(['oposto', 'unidade', 'formula', 'detalhe', 'exagero']);
const ERROS = (await import(pathToFileURL(path.join(ROOT, 'tools/banco/erros.mjs')))).default;

/* ---- o banco: a parte de dados do <script>, antes da interface (const TK) ---- */
const SRC = read('fontes/banco-de-questoes.html');
const ini = SRC.indexOf('<script>\nconst FIG'), fim = SRC.indexOf('const TK=');
if (ini < 0 || fim < 0) throw new Error('banco: não achei o bloco de dados do <script>');
const BCTX = vm.createContext({});
vm.runInContext(SRC.slice(ini + 8, fim).replace(/^const /gm, 'var ').replace(/^let /gm, 'var '), BCTX);
const { APOST, BANK, ERR, FIG } = BCTX;
if (APOST.length + BANK.length !== 205) throw new Error(`banco: esperava 205 questões, achei ${APOST.length + BANK.length}`);
for (const k of Object.keys(ERR)) if (!ERROS[k]) throw new Error('erros.mjs: falta o tipo do banco ' + k);

/* ---- as estações: módulos gerados (figuras, títulos) e as apostilas com as trocas aplicadas (exercícios) ---- */
const SCTX = vm.createContext({ window: { DATA: { modules: [], cards: [], vf: [] } } });
const ESTACOES = ['E1', 'E2', 'E3', 'M1', 'M2', 'I1'];
for (const id of ESTACOES) vm.runInContext(read(`data/estacoes/${id}.js`), SCTX);
vm.runInContext(read('data/embreve.js'), SCTX);
const MODS = Object.fromEntries(SCTX.window.DATA.modules.map(m => [m.id, m]));
/* Tema do banco + bloco da apostila → estação, seção da estação e item do edital. */
const BLOCO = {
  T4: { b1: ['E1', 1, '2.1'], b2: ['E1', 2, '2.1'], b3: ['E1', 3, '2.1'], b4: ['E1', 4, '2.5'], b5: ['E1', 5, '2.5'] },
  T1: { b1: ['E2', 1, '2.2'], b2: ['E2', 2, '2.4'], b3: ['E2', 3, '2.3'], b4: ['E2', 4, '2.2'], b5: ['E3', 1, '3.2'], b6: ['E3', 2, '4.2'] },
  T3: { b1: ['M1', 1, '1.1'], b2: ['M1', 2, '1.1'], b3: ['M1', 3, '1.2'], b4: ['M1', 4, '1.2'], b5: ['M1', 5, '1.2'] },
  T2: { b1: ['M2', 1, '5.1'], b2: ['M2', 2, '5.1'], b3: ['M2', 3, '5.1'], b4: ['M2', 4, '5.1'], b5: ['M2', 5, '5.3'], b6: ['M2', 6, '5.3'], b7: ['M2', 7, '5.3'] },
  T5: { b1: ['I1', 1, '8.1'], b2: ['I1', 2, '8.1'], b3: ['I1', 3, '8.1'], b4: ['I1', 4, '8.1'], b5: ['I1', 5, '8.3'] },
};
/* Item do edital padrão de cada estação (questões do BANK, que não têm bloco). */
const HAB = { E1: '2.1', E2: '2.2', E3: '3.2', M1: '1.2', M2: '5.3', I1: '8.1', M3: '5.2', I2: '8.2', I3: '7.1', A1: '9.1', A2: '9.3', N1: '10' };
const secTitulo = (mod, n) => { const h = [...MODS[mod].html.matchAll(/<h4>(\d+)\. ([^<]*)<\/h4>/g)].find(x => +x[1] === n); if (!h) throw new Error(`${mod}: sem seção ${n}`); return h[2]; };

const QUIZ = {};
for (const id of ESTACOES) {
  const M = (await import(pathToFileURL(path.join(ROOT, 'tools/estacoes', id + '.mjs')))).default;
  let src = read(M.fonte);
  for (const t of M.trocas || []) { if (src.split(t.de).length !== 2) throw new Error(`${id}: troca que não bate uma vez`); src = src.replace(t.de, () => t.para); }
  QUIZ[id] = vm.runInNewContext('(' + src.match(/const QUIZ\s*=\s*(\{[\s\S]*?\});\s*\n\s*const L\b/)[1] + ')');
}

/* ---- figuras ---- */
const svgClasses = svg => svg.replace(/\sclass="([^"]*)"/g, (_, c) => ` class="${c.split(/\s+/).filter(Boolean).map(x => 's-' + x).join(' ')}"`);
const allHtml = Object.values(MODS).map(m => m.html || '').join('\n');
function figuraDaEstacao(key) {
  const label = FIG[key].match(/aria-label="([^"]*)"/)[1];
  const i = allHtml.indexOf(`aria-label="${label}"`);
  if (i < 0) throw new Error('figura não encontrada nas estações: ' + key);
  return allHtml.slice(allHtml.lastIndexOf('<svg', i), allHtml.indexOf('</svg>', i) + 6);
}
const DEFS = svgClasses(BCTX.DEFS).match(/<defs>[\s\S]*<\/defs>/)[0];
function figura(key, qid) {
  let svg = key === 'CMD1' ? svgClasses(BCTX.CMD1()) : key === 'CMD2' ? svgClasses(BCTX.CMD2()) : figuraDaEstacao(key);
  const pre = 'q' + qid.replace(/[^\w]/g, '-') + '-';
  const usa = [...new Set([...svg.matchAll(/url\(#([\w-]+)\)/g)].map(m => m[1]))];
  if (usa.length) {
    const defs = DEFS.replace(/<marker id="([\w-]+)"[\s\S]*?<\/marker>/g, (m, id) => usa.includes(id) ? m.replace(`id="${id}"`, `id="${pre}${id}"`) : '');
    svg = svg.replace(/url\(#([\w-]+)\)/g, (_, id) => `url(#${pre}${id})`).replace(/(<svg[^>]*>)/, `$1${defs}`);
  }
  return svg.replace(/\n/g, '');
}

/* Rótulos da figura que entregariam a resposta da questão: figTira tira os <text> com esse texto (sem tags);
   figTroca troca um trecho. Cada um tem de achar o que procura. */
function ajustaFigura(svg, r, qid) {
  for (const t of r.figTira || []) {
    let n = 0;
    svg = svg.replace(/<text\b[^>]*>([\s\S]*?)<\/text>/g, (m, inner) => inner.replace(/<[^>]+>/g, '').trim() === t ? (n++, '') : m);
    if (!n) throw new Error(`${qid}: figTira não achou o rótulo "${t}"`);
  }
  for (const [de, para] of r.figTroca || []) { if (!svg.includes(de)) throw new Error(`${qid}: figTroca não achou "${de}"`); svg = svg.split(de).join(para); }
  return svg;
}

/* ---- revisão ---- */
const REV = {};
for (const t of ['T1', 'T2', 'T3', 'T4', 'T5']) {
  const f = path.join(ROOT, 'tools/banco', t + '.mjs');
  if (!fs.existsSync(f)) continue;
  Object.assign(REV, (await import(pathToFileURL(f))).default);
}

/* Explicação de uma alternativa errada: "[tag,tag] texto". */
function alternativaErrada(spec, eTag, onde) {
  let txt = spec || '', trap = null, erro = eTag || null;
  const m = txt.match(/^\[([\w,\s]+)\]\s*/);
  if (m) {
    txt = txt.slice(m[0].length);
    for (const t of m[1].split(',').map(s => s.trim()).filter(Boolean)) {
      if (TRAP_KEYS.has(t)) trap = t;
      else if (ERROS[t]) erro = t;
      else throw new Error(`${onde}: tipo de erro desconhecido "${t}"`);
    }
  }
  if (!txt) { if (!erro) throw new Error(`${onde}: alternativa errada sem explicação`); txt = ERROS[erro].d; }
  if (!trap && erro) trap = ERROS[erro].t;
  return { txt, trap, erro };
}

const out = [], faltam = [], usados = new Set(), FIXES = [];
const todas = [...APOST.map(q => ({ ...q, fonte: 'APOST' })), ...BANK.map(q => ({ ...q, fonte: 'BANK' }))];
for (const q0 of todas) {
  const r = REV[q0.id];
  if (!r) { faltam.push(q0.id); continue; }
  usados.add(q0.id);
  let q = q0, mod = r.mod, hab = r.h, tag = r.tag;
  if (q0.fonte === 'APOST') {
    const [, t, b, i] = q0.id.split(':');
    const [est, sec, h] = BLOCO[t][b];
    const ex = QUIZ[est][b] && QUIZ[est][b][+i];
    if (!ex) throw new Error(`${q0.id}: exercício não encontrado na apostila da ${est}`);
    q = { ...q0, s: ex.s, o: ex.o, a: ex.a, c: ex.c };
    mod = mod || est; hab = hab || h; tag = tag || secTitulo(est, sec);
  } else {
    if (!mod) throw new Error(`${q0.id}: falta mod`);
    hab = hab || HAB[mod]; tag = tag || q0.sub;
  }
  if (r.conv) { if (q.kind === 'mc') throw new Error(`${q0.id}: conv numa questão que já é de múltipla escolha`); const { errata, ...cv } = r.conv; q = { ...q, ...cv, kind: 'mc', e: null }; }
  if (r.fix) {
    if (!r.fix.errata && !r.fix.ed) throw new Error(`${q0.id}: fix sem errata (correção) nem ed (redação)`);
    const { errata, ed, ...fx } = r.fix;
    if (fx.o && !r.fix.a && r.fix.a !== 0 && fx.o[q.a] !== q.o[q.a] && !r.conv) { /* alternativas trocadas sem mexer no gabarito: a correta tem de continuar no lugar */
      if (q.o[q.a].replace(/\s/g, '') !== fx.o[q.a].replace(/\s/g, '')) throw new Error(`${q0.id}: fix.o mudou a alternativa correta sem dar o novo gabarito (fix.a)`); }
    q = { ...q, ...fx }; FIXES.push({ id: q0.id, errata: errata || null, ed: ed || null, campos: Object.keys(fx) });
  }
  if (q.kind !== 'mc') throw new Error(`${q0.id}: questão ${q.kind} sem conversão para múltipla escolha`);
  if (!MODS[mod]) throw new Error(`${q0.id}: estação ${mod} não existe`);
  if (!q.o || q.o.length !== 5) throw new Error(`${q0.id}: precisa de 5 alternativas`);
  const ans = LET[q.a];
  const ex = {}, traps = {}, erros = {};
  ex[ans] = q.c;
  for (let k = 0; k < 5; k++) {
    if (k === q.a) { if (r.w && r.w[LET[k]]) throw new Error(`${q0.id}: explicação de errada na alternativa correta ${LET[k]}`); continue; }
    const L = LET[k];
    const a = alternativaErrada(r.w && r.w[L], q.e && q.e[k], `${q0.id} (${L})`);
    ex[L] = a.txt; if (a.trap) traps[L] = a.trap; if (a.erro) erros[L] = a.erro;
  }
  if (!['f', 'm', 'd'].includes(r.d)) throw new Error(`${q0.id}: dificuldade "${r.d}"`);
  out.push({
    id: 'BQ-' + q0.id.replace(/:/g, '-'), vol: 'EL', mod, kind: 'banco', tag, base: [], cmd: q.s,
    ...(q.fig ? { fig: ajustaFigura(figura(q.fig, q0.id), r, q0.id) } : {}),
    alts: q.o, ans, ex, traps, erros, hab, dif: { f: 'fácil', m: 'média', d: 'difícil' }[r.d],
    ...(r.conta ? { conta: [].concat(r.conta) } : {}), src: '', origem: q0.id,
  });
}
for (const id of Object.keys(REV)) if (!usados.has(id)) throw new Error('revisão para questão que não existe: ' + id);
if (faltam.length) { console.error(`sem revisão (${faltam.length}): ${faltam.join(' ')}`); if (!process.argv.includes('--parcial')) process.exit(1); }

/* Numeração por estação, na ordem do banco: E1.1, E1.2… */
const cont = {};
for (const q of out) q.n = `${q.mod}.${(cont[q.mod] = (cont[q.mod] || 0) + 1)}`;
/* Todos os tipos de erro vão para o app (DATA.erros): os das questões do banco e os dos geradores de js/gerador.js. */
const tipos = { ...ERROS };

const js = `/* Banco de questões do estudante (fontes/banco-de-questoes.html), revisado e convertido para o formato do app.
   Gerado por tools/banco.mjs a partir do banco, das apostilas com as trocas das estações e de tools/banco/*.mjs.
   Não edite à mão: mude a revisão e gere de novo (node tools/banco.mjs).
   Carregado depois das estações e de data/embreve.js: cada questão entra na aba Questões da sua estação. As de estações
   que ainda estão "em breve" ficam em DATA.questoesEmBreve e aparecem sozinhas quando a estação for construída. */
(function (D) {
  var Q = ${JSON.stringify(out)};
  D.erros = Object.assign(D.erros || {}, ${JSON.stringify(tipos)});
  var mods = {};
  D.modules.forEach(function (m) { mods[m.id] = m; m.qs = m.qs.filter(function (id) { return id.indexOf('BQ-') !== 0; }); });
  D.questions = D.questions.filter(function (q) { return q.kind !== 'banco'; });
  D.questoesEmBreve = [];
  Q.forEach(function (q) {
    var m = mods[q.mod];
    if (!m || m.emBreve) { D.questoesEmBreve.push(q); return; }
    D.questions.push(q); m.qs.push(q.id);
  });
})(window.DATA);
`;
/* --saida <arquivo>: grava em outro lugar (o teste compara sem tocar no arquivo do repositório). */
const si = process.argv.indexOf('--saida');
fs.writeFileSync(si > 0 ? path.resolve(process.argv[si + 1]) : path.join(ROOT, 'data/questoes.js'), js);
const porMod = {}; for (const q of out) porMod[q.mod] = (porMod[q.mod] || 0) + 1;
console.log(`data/questoes.js: ${out.length} questões (${Object.entries(porMod).map(([k, v]) => k + ' ' + v).join(', ')}), ${out.filter(q => q.conta).length} com conta, ${out.filter(q => q.fig).length} com figura`);

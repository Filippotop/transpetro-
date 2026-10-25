/* Elétrica de Ouro: testes do banco de questões (data/questoes.js, gerado por tools/banco.mjs) e dos geradores de
   questões com números novos (js/gerador.js), sem navegador.
   Confere: 5 alternativas distintas, gabarito válido, explicação própria para cada alternativa, estação existente,
   tipos de erro e armadilhas conhecidos, HTML bem formado, figuras sem cor fixa, contas recalculadas (1%) e presentes
   só na alternativa correta, erratas citadas, e 100 sorteios válidos por gerador. Rodar: node tests/questoes.test.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };
const LET = 'ABCDE';

const INDEX = read('index.html');
const DATA_FILES = [...INDEX.matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m => m[1]);
check(DATA_FILES.includes('data/questoes.js'), 'index.html não carrega data/questoes.js');
check(DATA_FILES.indexOf('data/questoes.js') > DATA_FILES.indexOf('data/embreve.js'), 'data/questoes.js precisa vir depois de data/embreve.js (as questões entram nas estações já registradas)');
const COM_GERADOR = fs.existsSync(path.join(ROOT, 'js/gerador.js'));
check(COM_GERADOR, 'falta js/gerador.js');
check(/<script src="js\/gerador\.js"><\/script>/.test(INDEX), 'index.html não carrega js/gerador.js');
const SW = read('sw.js');
for (const f of ['data/questoes.js', ...(COM_GERADOR ? ['js/gerador.js'] : [])]) check(SW.includes(`'${f}'`), `offline: ${f} fora da lista de arquivos do sw.js`);

const ctx = vm.createContext({ window: {} });
for (const f of DATA_FILES) vm.runInContext(read(f), ctx, { filename: f });
const DATA = ctx.window.DATA;
const MODS = Object.fromEntries(DATA.modules.map(m => [m.id, m]));
const TRAPS = Object.keys(vm.runInNewContext('(' + INDEX.match(/const TRAPS = (\{[\s\S]*?\n\});/)[1] + ')'));

/* HTML bem formado (o mesmo critério de tests/estacoes.test.mjs). */
const VOID = new Set(['br', 'hr', 'img', 'wbr']);
function wellFormed(html) {
  const st = [], re = /<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[2].toLowerCase();
    if (m[1]) { const top = st.pop(); if (top !== tag) return `fecha </${tag}> mas o aberto é <${top || 'nada'}>`; }
    else if (!m[4] && !VOID.has(tag)) st.push(tag);
  }
  if (/<(?![a-zA-Z\/!])/.test(html)) return 'tem "<" solto (use &lt;)';
  return st.length ? `ficou aberto: <${st.join('> <')}>` : null;
}
const text = h => String(h).replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const FIXED = /(?:fill|stroke)\s*(?:=\s*["']?|:\s*)\s*(?:#000\b|#000000\b|black\b|#fff\b|#ffffff\b|white\b|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\))/i;
/* Números de uma alternativa: "1.320 var", "2,06 mWb", "4 × 10⁻⁵ T", "10∠53,13°". */
const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '−': '-' };
function numeros(h) {
  let t = text(h).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, s => '^' + [...s].map(c => SUP[c]).join(''));
  t = t.replace(/(\d[\d.]*(?:,\d+)?)\s*×\s*10\^(-?\d+)/g, (_, a, e) => `${a.replace(/\./g, '').replace(',', '.')}e${e}`);
  return [...t.matchAll(/\d+(?:\.\d+)?e-?\d+|\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g)].map(m => /e/.test(m[0]) ? Number(m[0]) : Number(m[0].replace(/\./g, '').replace(',', '.')));
}
const soNumero = h => /^[\d.,]+(\s*×\s*10\S+)?(∠[−-]?[\d,]+°)?\s*[A-Za-zΩµ%°/·²³()]*(\s*da nominal)?$/.test(text(h));
const perto = (a, b) => Math.abs(a - b) <= 0.01 * Math.max(Math.abs(a), Math.abs(b), 1e-12);

/* ---------- banco ---------- */
const BANCO = [...DATA.questions.filter(q => q.kind === 'banco'), ...(DATA.questoesEmBreve || [])];
check(BANCO.length === 205, `banco: ${BANCO.length} questões (esperado 205: 158 das apostilas + 47 do banco)`);
const ids = new Set(), origens = new Set(), markerIds = new Map();
const ERRATA = read('fontes/ERRATA.md');
function validaQuestao(q, where, { banco = true } = {}) {
  check(/^[A-E]$/.test(q.ans), `${where}: gabarito "${q.ans}"`);
  check(Array.isArray(q.alts) && q.alts.length === 5, `${where}: precisa de 5 alternativas`);
  const norm = (q.alts || []).map(a => text(a).toLowerCase());
  check(new Set(norm).size === 5, `${where}: alternativas repetidas (${norm.join(' | ')})`);
  check(norm.every(Boolean), `${where}: alternativa vazia`);
  check(Object.keys(q.ex || {}).sort().join('') === LET, `${where}: falta explicação para alguma alternativa`);
  const exs = LET.split('').map(k => text((q.ex || {})[k] || ''));
  check(exs.every(e => e.length >= 12), `${where}: explicação vazia ou curta demais`);
  check(new Set(exs).size === 5, `${where}: duas alternativas com a mesma explicação`);
  for (const [k, t] of Object.entries(q.traps || {})) { check(TRAPS.includes(t), `${where}: armadilha "${t}" desconhecida`); check(k !== q.ans, `${where}: armadilha na alternativa correta`); }
  for (const [k, e] of Object.entries(q.erros || {})) { check(!!(DATA.erros || {})[e], `${where}: tipo de erro "${e}" fora de DATA.erros`); check(k !== q.ans, `${where}: tipo de erro na alternativa correta`); }
  check(['fácil', 'média', 'difícil'].includes(q.dif), `${where}: dificuldade "${q.dif}"`);
  check(typeof q.hab === 'string' && /^\d+(\.\d+)?$/.test(q.hab), `${where}: item do edital "${q.hab}"`);
  check(typeof q.tag === 'string' && q.tag.trim(), `${where}: sem assunto (tag)`);
  check(Array.isArray(q.base) && typeof q.cmd === 'string' && q.cmd.trim(), `${where}: sem enunciado`);
  for (const [k, h] of [['cmd', q.cmd], ...q.alts.map((a, i) => ['alts.' + LET[i], a]), ...Object.entries(q.ex).map(([k, v]) => ['ex.' + k, v])]) {
    const e = wellFormed(h); check(!e, `${where}: ${k} mal formado: ${e}`);
    check(!/<script|<style|\son\w+\s*=/i.test(h), `${where}: ${k} com script ou evento`);
  }
  if (banco) check(!/\b[Ff]igura \d|\bBloco \d|Exemplo resolvido \d/.test(q.cmd + JSON.stringify(q.ex) + q.alts.join(' ')), `${where}: cita figura, bloco ou exemplo da apostila, que não existe fora da Teoria`);
  /* Contas: o número de cada expressão aparece na alternativa correta (1%) e em nenhuma errada. */
  for (const expr of q.conta || []) {
    let v; try { v = Function('"use strict"; return (' + expr + ');')(); } catch (e) { check(false, `${where}: conta "${expr}" não roda`); continue; }
    check(Number.isFinite(v), `${where}: conta "${expr}" = ${v}`);
    const ok = numeros(q.alts[LET.indexOf(q.ans)]);
    check(ok.some(n => perto(n, v)), `${where}: conta ${expr} = ${+v.toPrecision(5)}, mas a alternativa correta (${text(q.alts[LET.indexOf(q.ans)])}) não traz esse número`);
    /* Alternativas só numéricas (número e unidade): nenhuma errada pode ter o mesmo valor (0,3%). */
    if ((q.conta || []).length === 1 && q.alts.every(soNumero)) LET.split('').filter(k => k !== q.ans).forEach(k => check(!numeros(q.alts[LET.indexOf(k)]).some(n => Math.abs(n - v) <= 0.003 * Math.abs(v)), `${where}: a alternativa errada ${k} (${text(q.alts[LET.indexOf(k)])}) também dá ${+v.toPrecision(5)}`));
  }
}
for (const q of BANCO) {
  const where = `questão ${q.id} (${q.origem})`;
  check(!ids.has(q.id), `${where}: id repetido`); ids.add(q.id); origens.add(q.origem);
  validaQuestao(q, where);
  check(q.vol === 'EL', `${where}: vol "${q.vol}"`);
  const m = MODS[q.mod];
  check(!!m, `${where}: estação ${q.mod} não existe`);
  if (m) {
    const naEstacao = !m.emBreve;
    check(naEstacao ? m.qs.includes(q.id) && DATA.questions.includes(q) : (DATA.questoesEmBreve || []).includes(q), `${where}: não entrou ${naEstacao ? 'na aba Questões da ' + q.mod : 'na lista de questões em breve'}`);
    check(typeof q.n === 'string' && q.n.startsWith(q.mod + '.'), `${where}: número "${q.n}" fora do padrão ${q.mod}.N`);
  }
  if (q.fig) {
    const b = q.fig.match(FIXED); check(!b, `${where}: figura com cor fixa "${b && b[0]}"`);
    check(/^<svg[\s\S]*<\/svg>$/.test(q.fig) && /role="img"/.test(q.fig) && /aria-label="[^"]+"/.test(q.fig), `${where}: figura sem <svg role="img" aria-label>`);
    check(!/class="(?!s-)[^"]*"/.test(q.fig.replace(/class="s-[^"]*"/g, '')), `${where}: figura com classe sem o prefixo s-`);
    for (const [, id] of q.fig.matchAll(/\sid="([^"]+)"/g)) { check(!markerIds.has(id), `${where}: id "${id}" da figura repetido em ${markerIds.get(id)}`); markerIds.set(id, q.id); }
    for (const [, id] of q.fig.matchAll(/url\(#([^)]+)\)/g)) check(new RegExp(`id="${id}"`).test(q.fig), `${where}: a figura usa url(#${id}), que não está dentro dela`);
  }
}
/* As questões das apostilas são também os exercícios da Teoria: alternativas e gabarito iguais nos dois lugares. */
let semExercicio = 0;
for (const q of BANCO.filter(q => q.origem.startsWith('a:'))) {
  const m = MODS[q.mod]; if (!m || !m.html) continue;
  const ex = [...m.html.matchAll(/<li class="exq" data-a="(\d)"><p class="exq-s">([\s\S]*?)<\/p>\n<ol class="exq-o">([\s\S]*?)<\/ol>/g)].find(x => text(x[2]) === text(q.cmd));
  if (!ex) { semExercicio++; continue; } /* enunciado ajustado só na aba Questões (fix.s) */
  const alts = [...ex[3].matchAll(/<span class="exq-l">\([A-E]\)<\/span> <span>([\s\S]*?)<\/span><\/li>/g)].map(x => text(x[1]));
  check(JSON.stringify(alts) === JSON.stringify(q.alts.map(text)) && LET[+ex[1]] === q.ans, `questão ${q.id} (${q.origem}): alternativas ou gabarito diferentes do exercício da Teoria da ${q.mod}`);
}
check(semExercicio <= 3, `${semExercicio} questões das apostilas sem o exercício correspondente na Teoria`);
check(origens.size === 205, `banco: ${origens.size} questões de origem distintas (esperado 205)`);
/* Cada questão tem a sua revisão, e cada correção cita uma errata que existe. */
for (const t of ['T1', 'T2', 'T3', 'T4', 'T5']) {
  const REV = (await import(pathToFileURL(path.join(ROOT, 'tools/banco', t + '.mjs')))).default;
  for (const [id, r] of Object.entries(REV)) {
    for (const e of [r.fix && r.fix.errata, r.conv && r.conv.errata].filter(Boolean)) check(new RegExp(`\\|\\s*${e}\\s*\\|`).test(ERRATA), `revisão ${id}: errata ${e} não está em fontes/ERRATA.md`);
    if (r.fix) check(r.fix.errata || r.fix.ed, `revisão ${id}: fix sem errata nem motivo (ed)`);
  }
}
check(/^## Banco de questões/m.test(ERRATA), 'fontes/ERRATA.md sem a seção "Banco de questões"');
/* Tipos de erro: nome curto, descrição e armadilha do app. */
for (const [k, e] of Object.entries(DATA.erros || {})) { check(e.n && e.d && TRAPS.includes(e.t), `tipo de erro ${k}: precisa de n, d e t (armadilha conhecida)`); check(!/[<_]/.test(e.n), `tipo de erro ${k}: o nome "${e.n}" aparece como texto puro (sem HTML nem _)`); }
/* Distribuição: toda estação construída tem questões. */
for (const m of DATA.modules.filter(m => !m.emBreve)) check(m.qs.length > 0, `estação ${m.id} sem questões na aba Questões`);
/* O id do arquivo não pode ter conteúdo do Humanas. */
const QTXT = read('data/questoes.js');
for (const w of ['ENEM', 'Enem', 'Inep', 'Humanas']) check(!QTXT.includes(w), `data/questoes.js: "${w}"`);
/* data/questoes.js está em dia com tools/banco.mjs (o gerador é determinístico): gera numa pasta temporária e compara,
   sem tocar no arquivo do repositório. */
{
  const os = await import('node:os'), { execFileSync } = await import('node:child_process');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'banco-'));
  try {
    execFileSync(process.execPath, [path.join(ROOT, 'tools/banco.mjs'), '--saida', path.join(tmp, 'questoes.js')], { cwd: ROOT, stdio: 'pipe' });
    check(fs.readFileSync(path.join(tmp, 'questoes.js'), 'utf8') === QTXT, 'data/questoes.js desatualizado: rode node tools/banco.mjs e faça commit do resultado');
  } catch (e) { check(false, 'tools/banco.mjs falhou: ' + String(e.stderr || e.message).slice(0, 300)); }
  finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

/* ---------- geradores (js/gerador.js) ---------- */
/* Exceções documentadas (task-4-report.md, rodada 3 de correções): deslizes reais valem mais que o equilíbrio das
   letras. Quando um gerador não tem 4 deslizes reais de um lado da resposta, a letra fica restrita às posições viáveis
   (q.letras em js/gerador.js), e o teste exige cada letra viável em ≥ 8% dos sorteios e nenhuma fora delas.
   - eta (ABC): abaixo da resposta só há P_Cu linear, P_Cu nominal, kVA no lugar de kW e 1 − perdas/saída, e os dois
     últimos somem quando FP = 1 ou quando ficam a menos de 0,1% da correta; D e E ficariam em ~3% e 0%.
   - force (ABCD): acima de B·I·L·sen θ há quatro deslizes, abaixo em geral só três (sen 30° trocado, cm/1000, sem I);
     E ficaria em ~4%.
   - tc (BCDE): acima da corrente primária só há I_nominal, leitura × primário (ou × (primário + 5)) e 5·primário/leitura;
     A ficaria em ~6%.
   - ilum (ABCD): abaixo da carga certa só há 100 VA, 60 VA × blocos e 60 VA × área sem os 6 m²; E fica em 0%.
   - neutro (BCDE): acima da tensão na carga menor só há 220 V, 254 V e 380 V; A fica em 0%.
   - disj (BCD): só valores entre I_B/2 e 2·I_z; nenhum I_z tabelado tem 4 correntes nominais em (I_z, 2·I_z], e só
     I_B em (25, 26] ou (63, 64] tem 4 abaixo; A fica em 0% e E em ~7%.
   - pe (CDE): nenhuma opção maior que a fase; entre a seção mínima e a fase cabem no máximo 2 seções padronizadas.
   Os três com menos de 4 letras (eta, disj, pe) ficam abaixo da regra de 4 letras viáveis: inventar distrator
   para cumpri-la seria enchimento. */
const EXCECAO_LETRA = { eta: 'ABC', force: 'ABCD', tc: 'BCDE', ilum: 'ABCD', neutro: 'BCDE', disj: 'BCD', pe: 'CDE' };
const MENOS_DE_4_LETRAS = ['eta', 'disj', 'pe'];
const SEP = { eta: 0.001, bat: 0.003 };
/* Ids antigos (G:, antes da revisão da T4) não reconstroem questão. */
/* Respostas refeitas sem olhar o código dos geradores: fórmulas da teoria aplicadas às entradas (q.vars). Número para
   as questões de conta (1%), texto exato para as de alternativas de texto. */
const S3 = Math.sqrt(3), br = (x, d = 0) => x.toLocaleString('pt-BR', { maximumFractionDigits: d });
const RESPOSTA = {
  rms: v => v.Vpp / 2 / Math.SQRT2,
  rl: v => { const Z = Math.hypot(v.R, v.X), I = v.V / Z; return v.pede === 'I' ? I : I * v.R; },
  res: v => 1 / (2 * Math.PI * Math.sqrt(v.L / 1000 * v.C / 1e6)),
  pot: v => v.V * v.I * (v.pede === 'P' ? v.fp : Math.sin(Math.acos(v.fp))),
  fpcorr: v => v.P * Math.tan(Math.acos(v.fp)),
  triI: v => v.lig === 'Y' ? v.VL / S3 / v.R : S3 * v.VL / v.R,
  triP: v => S3 * v.VL * v.IL * v.fp / 1000,
  trV: v => v.V1 * v.N2 / v.N1,
  trI: v => v.S * 1000 / v.V,
  trZ: v => (v.V1 / v.V2) ** 2 * v.Z,
  I3f: v => v.S * 1000 / (S3 * v.VL),
  eta: v => { const Ps = v.x * v.S * v.fp * 1000; return 100 * Ps / (Ps + v.Pfe + v.x * v.x * v.Pc); },
  etamax: v => 100 * Math.sqrt(v.Pfe / v.Pc),
  force: v => v.B * v.I * v.L * Math.sin(v.th * Math.PI / 180),
  faraday: v => v.N * (v.F1 - v.F2) / 1000 / (v.dt / 1000),
  tc: v => v.rd * v.p / 5,
  idx: v => { const a = (30 * v.h) % 360; return a === 0 ? 'em fase' : a === 180 ? 'em oposição de fase (180°)' : a < 180 ? `atrasada ${a}°` : `adiantada ${360 - a}°`; },
  mista: v => { const Rp = v.A * v.B / (v.A + v.B), It = v.E / (v.R1 + Rp); return It * Rp / v.X; },
  bat: v => { const r = (v.V1 - v.V2) / (v.I2 - v.I1); return v.pede === 'r' ? r : v.V1 + r * v.I1; },
  thev: v => { const Vth = v.E * v.B / (v.A + v.B), Rth = 1 / (1 / v.A + 1 / v.B) + v.R3; return v.pede === 'Rth' ? Rth : Vth / (Rth + v.RL); },
  pmax: v => v.V * v.V / (4 * v.R),
  nodal: v => { const VA = (v.E1 / v.R1 + v.E2 / v.R2) / (1 / v.R1 + 1 / v.R2 + 1 / v.R3); return VA / v.R3; },
  wheat: v => v.R2 * v.R3 / v.R1,
  ilum: v => { const A = v.a * v.b; return A <= 6 ? 100 : 100 + 60 * Math.floor((A - 6) / 4 + 1e-9); },
  tugcoz: v => { const n = Math.ceil(2 * (v.a + v.b) / 3.5 - 1e-9); return 600 * Math.min(n, 3) + 100 * Math.max(0, n - 3); },
  tugsala: v => { const n = Math.ceil(2 * (v.a + v.b) / 5 - 1e-9); return `${n} pontos e ${br(100 * n)} VA`; },
  queda: v => { const I = v.S / v.V; return v.lim / 100 * v.V / (v.du * I) * 1000; },
  disj: v => ({ faixa: [v.IB, v.Iz] }),
  neutro: v => { const R1 = 127 ** 2 / v.p1, R2 = 127 ** 2 / v.p2; return 220 * R1 / (R1 + R2); },
  pe: v => `${br(v.S <= 16 ? v.S : v.S <= 35 ? 16 : v.S / 2, 1)} mm²`,
};
let nGer = 0;
if (fs.existsSync(path.join(ROOT, 'js/gerador.js'))) {
  const gctx = vm.createContext({ window: { DATA }, Math, console });
  vm.runInContext(read('js/gerador.js'), gctx, { filename: 'js/gerador.js' });
  const G = gctx.window.GERADOR;
  check(G && typeof G.lista === 'function' && typeof G.gerar === 'function' && typeof G.porId === 'function', 'js/gerador.js não expõe window.GERADOR {lista, gerar, porId}');
  if (G) {
    const lista = G.lista();
    nGer = lista.length;
    check(G.porId('G:rms:12345') === null && G.porId('G:qualquer') === null, 'GERADOR.porId deveria ignorar ids antigos (G:)');
    check(G.porId('G2:rms:12345') && G.porId('G2:rms:12345').id === 'G2:rms:12345', 'GERADOR.porId não reconstrói um id G2:');
    check(G.porId('G2:naoexiste:1') === null, 'GERADOR.porId deveria devolver null para gerador desconhecido');
    check(lista.length === 30, `geradores: ${lista.length} (esperado 30)`);
    for (const g of lista) {
      check(MODS[g.mod] && !MODS[g.mod].emBreve, `gerador ${g.id}: estação ${g.mod} inexistente ou em breve`);
      check(!!RESPOSTA[g.id], `gerador ${g.id}: sem conferência independente da resposta neste teste`);
      const vistos = new Set(), letras = new Set();
      for (let s = 1; s <= 100; s++) {
        const seed = s * 7919 + g.id.length;
        const q = G.gerar(g.id, seed);
        const where = `gerador ${g.id}, sorteio ${seed}`;
        validaQuestao(q, where, { banco: false });
        check(q.mod === g.mod && q.kind === 'gerada' && q.id === `G2:${g.id}:${seed}`, `${where}: id/mod/kind errados (${q.id}, ${q.mod}, ${q.kind})`);
        check(JSON.stringify(G.porId(q.id)) === JSON.stringify(q), `${where}: porId não reconstrói a mesma questão`);
        /* Toda alternativa errada tem tipo de erro ou explicação própria (nunca o texto genérico de preenchimento). */
        for (const k of LET) if (k !== q.ans) check(!/sem relação com|valor aleatório|chute/i.test(q.ex[k]), `${where}: alternativa ${k} sem erro identificado`);
        /* A resolução (explicação da correta) chega ao mesmo número que a alternativa correta mostra. */
        const nsol = numeros(q.ex[q.ans]);
        for (const n of numeros(q.alts[LET.indexOf(q.ans)])) check(nsol.some(x => perto(x, n)), `${where}: a resolução não chega a ${n} (alternativa correta: ${text(q.alts[LET.indexOf(q.ans)])})`);
        vistos.add(q.cmd + q.alts.join()); letras.add(q.ans);
        /* Alternativas numéricas: os 5 valores exibidos a pelo menos 3% uns dos outros, dois a dois. Exceções: eta e a fem
           da bateria, em que os deslizes reais caem a décimos de ponto percentual uns dos outros; nelas só se exige a
           distância própria (SEP) em relação à correta. */
        const vc = numeros(q.alts[LET.indexOf(q.ans)])[0], lim = SEP[g.id] == null ? 0.03 : SEP[g.id];
        if (q.alts.every(soNumero)) {
          if (SEP[g.id] != null) LET.split('').filter(k => k !== q.ans).forEach(k => { const v = numeros(q.alts[LET.indexOf(k)])[0]; check(Math.abs(v - vc) >= lim * vc * 0.99, `${where}: a alternativa ${k} (${text(q.alts[LET.indexOf(k)])}) fica a menos de ${lim * 100}% da correta (${text(q.alts[LET.indexOf(q.ans)])})`); });
          else for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) {
            const a = numeros(q.alts[i])[0], b = numeros(q.alts[j])[0];
            check(Math.abs(a - b) >= 0.03 * Math.max(Math.abs(a), Math.abs(b)) * 0.99, `${where}: ${LET[i]} (${text(q.alts[i])}) e ${LET[j]} (${text(q.alts[j])}) ficam a menos de 3% um do outro`);
          }
        }
        /* Conferência independente: a resposta refeita aqui, a partir das entradas da questão (q.vars). */
        const certa = text(q.alts[LET.indexOf(q.ans)]), esp = RESPOSTA[g.id] && RESPOSTA[g.id](q.vars || {});
        if (typeof esp === 'number') check(numeros(certa).some(n => Math.abs(n - esp) <= Math.max(0.01 * Math.abs(esp), 0.051)), `${where}: alternativa correta "${certa}", mas a conta independente dá ${+esp.toPrecision(5)}`);
        else if (esp && esp.faixa) q.alts.forEach((a, i) => { const x = numeros(a)[0], dentro = x >= esp.faixa[0] && x <= esp.faixa[1]; check(dentro === (LET[i] === q.ans), `${where}: ${text(a)} ${dentro ? 'atende' : 'não atende'} a I_B ≤ I_n ≤ I_z, mas está marcada como ${LET[i] === q.ans ? 'certa' : 'errada'}`); });
        else if (typeof esp === 'string') check(certa === esp, `${where}: alternativa correta "${certa}", mas a conferência independente dá "${esp}"`);
      }
      check(vistos.size >= 3, `gerador ${g.id}: só ${vistos.size} questões diferentes em 100 sorteios`);
      /* Letra da correta: cada uma de A a E em pelo menos 8% de 500 sorteios (as alternativas ficam em ordem crescente,
         mas a posição da correta é sorteada). */
      {
        const viaveis = EXCECAO_LETRA[g.id] || LET, cont = { A: 0, B: 0, C: 0, D: 0, E: 0 };
        for (let s = 1; s <= 500; s++) cont[G.gerar(g.id, s * 104729 + 7).ans]++;
        const dist = LET.split('').map(x => x + ' ' + cont[x]).join(', ');
        for (const k of LET) {
          if (viaveis.includes(k)) check(cont[k] >= 40, `gerador ${g.id}: a correta cai na letra ${k} em só ${cont[k]} de 500 sorteios (${dist})`);
          else check(cont[k] === 0, `gerador ${g.id}: a letra ${k} está fora das viáveis (${viaveis}), mas aparece ${cont[k]} vezes (${dist})`);
        }
        check(viaveis.length >= 4 || MENOS_DE_4_LETRAS.includes(g.id), `gerador ${g.id}: só ${viaveis.length} letras viáveis (${viaveis}) sem exceção documentada`);
      }
    }
  }
}

if (fails.length) { console.error(`questões FALHOU (${fails.length}):\n- ` + fails.slice(0, 80).join('\n- ') + (fails.length > 80 ? `\n… e mais ${fails.length - 80}` : '')); process.exit(1); }
const porMod = {}; for (const q of BANCO) porMod[q.mod] = (porMod[q.mod] || 0) + 1;
console.log(`questões OK: ${BANCO.length} do banco (${Object.entries(porMod).map(([k, v]) => k + ' ' + v).join(', ')}), ${BANCO.filter(q => q.conta).length} com conta recalculada, ${BANCO.filter(q => q.fig).length} com figura; ${nGer} geradores × 100 sorteios válidos`);

#!/usr/bin/env node
/* Gera um app de estudo novo a partir do MOTOR deste repo (PWA estático, sem build).
   Uso:
     node tools/novo-app.mjs --nome "Química de Ouro" --slug quimica-de-ouro --prefixo qdo \
       --dest C:/caminho/quimica-de-ouro --prova 2027-03-10 --banca X --cargo Y \
       [--concurso "Petrobras"] [--curto Química] [--url https://usuario.github.io/quimica-de-ouro/]

   O que sai: o motor (index.html, sw.js, pwa.js, merge.js, gist-sync.js, js/ genéricos, css/, vendor/, icons/),
   a identidade trocada (nome, slug, prefixo de cache/storage, manifest, título, data da prova, banca, cargo, URL),
   e conteúdo mínimo (uma estação de exemplo EX1 com 3 questões). NÃO copia conteúdo de Elétrica, Transpetro,
   NR-10, Humanas, provas, fontes, aulas, Bancada nem os geradores de questões/contas (ver docs/BASE-REUTILIZAVEL.md).

   Idempotente: se --dest já tem um app gerado com estes mesmos argumentos, não faz nada (exit 0). Se o --dest
   existe e não é esse app, falha sem tocar em nada. Mesmos argumentos em outro --dest dão arquivos idênticos.
   Os trechos que este gerador conhece (ver REMOVER e TROCAS abaixo) têm de bater exatamente como esperado; se o motor
   mudar e um trecho sumir, o gerador falha dizendo qual. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const USO = 'uso: node tools/novo-app.mjs --nome "Química de Ouro" --slug quimica-de-ouro --prefixo qdo --dest C:/caminho --prova 2027-03-10 --banca X --cargo Y [--concurso "Petrobras"] [--curto Química] [--url https://...]';
const die = msg => { console.error('novo-app: ' + msg); process.exit(1); };

function parseArgs(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) die(`argumento inesperado: ${a}\n${USO}`);
    const v = argv[i + 1];
    if (v === undefined || v.startsWith('--')) die(`falta valor para ${a}\n${USO}`);
    o[a.slice(2)] = v; i++;
  }
  return o;
}

const a = parseArgs(process.argv.slice(2));
const obrig = ['nome', 'slug', 'prefixo', 'dest', 'prova', 'banca', 'cargo'];
const falt = obrig.filter(k => !a[k]);
if (falt.length) die(`faltam: ${falt.map(k => '--' + k).join(', ')}\n${USO}`);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) die('--slug: minúsculas, números e hífen (ex.: quimica-de-ouro)');
if (!/^[a-z]{2,8}$/.test(a.prefixo)) die('--prefixo: de 2 a 8 letras minúsculas (ex.: qdo)');
if (['edo', 'hdo'].includes(a.prefixo)) die('--prefixo: edo e hdo são dos apps Elétrica de Ouro e Humanas de Ouro');
if (!/^\d{4}-\d{2}-\d{2}$/.test(a.prova) || Number.isNaN(Date.parse(a.prova + 'T00:00:00Z'))) die('--prova: data AAAA-MM-DD válida (ex.: 2027-03-10)');
if (a.slug === 'eletrica-de-ouro' || a.slug === 'humanas-de-ouro') die('--slug: já é o de outro app');

/* ---------- valores derivados ---------- */
const DEST = path.resolve(a.dest);
const NOME = a.nome.trim();
const SLUG = a.slug;
const PRE = a.prefixo + '-';
const PRIMEIRA = NOME.split(/\s+/)[0];
const CURTO = a.curto || PRIMEIRA;
const RESTO = NOME.slice(PRIMEIRA.length).trim();
const BRAND_HTML = RESTO ? `${CURTO} <em>${RESTO}</em>` : CURTO;
const BANCA = a.banca.trim();
const CARGO = a.cargo.trim();
const CONC = (a.concurso || 'concurso público').trim();
/* "prova da Petrobras" / "prova do concurso público": artigo pelo gênero aproximado do nome. */
const ART = /a$/i.test(CONC) ? 'da' : 'do';
const URL_APP = a.url || `https://seu-usuario.github.io/${SLUG}/`;
const [Y, M, D] = a.prova.split('-');
const PROVA_BR = `${D}/${M}/${Y}`, PROVA_DM = `${D}/${M}`;
const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const PROVA_DIA = `${DIAS[new Date(a.prova + 'T12:00:00Z').getUTCDay()]} ${PROVA_DM}`;
const SPEC = { nome: NOME, slug: SLUG, prefixo: a.prefixo, prova: a.prova, banca: BANCA, cargo: CARGO, concurso: CONC, curto: CURTO, url: URL_APP };

/* Idempotência: mesmo gerador, mesmos argumentos → nada a fazer. Outro app no lugar → erro. */
const MARCA = path.join(DEST, '.novo-app.json');
if (fs.existsSync(DEST)) {
  if (fs.existsSync(MARCA)) {
    const antes = JSON.parse(fs.readFileSync(MARCA, 'utf8'));
    if (JSON.stringify(antes) === JSON.stringify(SPEC)) { console.log(`novo-app: ${DEST} já está gerado com estes argumentos: nada a fazer.`); process.exit(0); }
  }
  die(`o destino ${DEST} já existe e não é este app gerado com estes argumentos. Escolha outro --dest ou apague a pasta.`);
}

/* ---------- trocas de identidade (texto), na ordem: o mais específico primeiro ---------- */
const TROCAS = [
  ['Elétrica <em>de Ouro</em>', BRAND_HTML],
  ['ELÉTRICA DE OURO', NOME.toUpperCase()],
  ['Elétrica de Ouro', NOME],
  ['https://filippotop.github.io/transpetro-/', URL_APP],
  ['filippotop.github.io/transpetro-/', URL_APP.replace(/^https?:\/\//, '')],
  ['Ênfase 8: Manutenção – Elétrica', CARGO],
  ['Manutenção – Elétrica', CARGO],
  ['da Transpetro', `${ART} ${CONC}`],
  ['Transpetro', CONC],
  ['transpetro', SLUG],
  ['Cesgranrio', BANCA],
  ['Humanas de Ouro', 'o app de origem'],
  ['humanas-de-ouro', 'outro-app'],
  ['Humanas', 'outro app'],
  ['06/12/2026', PROVA_BR],
  ['dom 06/12', PROVA_DIA],
  ['06/12', PROVA_DM],
  ['2026-12-06', a.prova],
  ['eletrica-de-ouro', SLUG],
  ['Elétrica', CURTO],
];
/* Prefixo de storage e de cache: edo- (Elétrica) vira o do app novo. Palavra inteira, para não pegar outras. */
const TROCA_PREFIXO = [/\bedo-/g, PRE];

/* ---------- remoções por âncora: cada uma tem de bater o número de vezes indicado, senão o gerador falha ---------- */
const REMOVER = [
  { f: 'index.html', re: /<button data-v="bancada">[\s\S]*?<\/button>\n/, n: 1, o: 'botão Bancada da barra' },
  { f: 'index.html', re: /\/\* =+ Bancada: o simulador[\s\S]*?(?=\/\* =+ v4: provas oficiais)/, n: 1, o: 'Bancada e Aulas (funções)' },
  { f: 'index.html', re: /<button class="at" data-at="aul">[\s\S]*?<\/button>/, n: 1, o: 'atalho Aulas em vídeo' },
  { f: 'index.html', re: /<button class="at" data-at="ban[\s\S]*?<\/button>/, n: 1, o: 'atalho Bancada' },
  { f: 'index.html', re: /,\s*bancada:vBancada,aulas:vAulas(?=\}\[view\])/, n: 1, o: 'rota Bancada/Aulas na tela' },
  { f: 'index.html', re: /bancada:'bancada',|aulas:'aulas',/g, n: 2, o: 'rotas de link direto Bancada/Aulas' },
  { f: 'index.html', re: /  if\(t\.k==='bancada'\) return \(\)=>go\('bancada'\);\n/, n: 1, o: 'tarefa do plano que abre a Bancada' },
  { f: 'index.html', re: /,ban:\(\)=>go\('bancada'\)/, n: 1, o: 'atalho do painel que abre a Bancada' },
  { f: 'index.html', re: /,aul:\(\)=>go\('aulas'\)/, n: 1, o: 'atalho do painel que abre as Aulas' },
  { f: 'index.html', re: /  \{g:'nr10',[^\n]*\n/, n: 1, o: 'jogo Ordene a NR-10 (lista da Arena)' },
  { f: 'index.html', re: /\/\* Ordene a NR-10[\s\S]*?\n\}\n/, n: 1, o: 'jogo Ordene a NR-10 (função)' },
  { f: 'index.html', re: /\['nr10','NR-10 lado a lado'\],/, n: 1, o: 'subaba NR-10 da Biblioteca' },
  { f: 'index.html', re: /nr10:bNR10,/, n: 1, o: 'subaba NR-10 (rota)' },
  { f: 'index.html', re: /\/\* NR-10 lado a lado[\s\S]*?\n\}\n/, n: 1, o: 'subaba NR-10 (função)' },
  { f: 'index.html', re: /<details style="margin-top:10px"><summary><b>Provas reais anteriores[\s\S]*?<\/details>/, n: 1, o: 'links de provas reais de outra banca' },
  { f: 'index.html', re: /^  const prova=.*$/m, n: 1, o: 'linha da prova no plano', subst: `  const prova=\`<div class="day"><div class="dl">${PROVA_DIA}<small>prova</small></div><div><b style="font-size:16px">${BANCA} · ${CONC}</b><p class="muted" style="font-family:var(--read);margin:4px 0 0">${CARGO}. Data da prova: ${PROVA_BR}.</p></div></div>\`;` },
  { f: 'index.html', re: /^const LINES = .*$/m, n: 1, o: 'linhas do mapa (só a EX1)', subst: `const LINES = {E:{name:'Conteúdo',vol:'EL'}};` },
  { f: 'index.html', re: /^const STUDY_LINES = .*$/m, n: 1, o: 'linhas de estudo', subst: `const STUDY_LINES = ['E'];` },
  { f: 'index.html', re: /^const EXAM_NOTE = .*$/m, n: 1, o: 'nota da data da prova', subst: `const EXAM_NOTE = 'data informada na criação do app; confira o edital e o comprovante de inscrição';` },
  { f: 'index.html', re: /^\/\* \d\d\/\d\d\/\d{4}:.*$/m, n: 1, o: 'comentário da data da prova', subst: '/* Data da prova: EXAM, abaixo. */' },
  { f: 'index.html', re: /Buscar: Thévenin, fator de potência, NR-10…/, n: 1, o: 'exemplo de busca', subst: 'Buscar no material…' },
  { f: 'index.html', re: / diz o que muda com a NR-10 de 2027\. \*\//, n: 1, o: 'comentário dos números-âncora', subst: ' diz o que muda com a validade. */' },
  { f: 'index.html', re: /\(S\.sims\|\|\[\]\)\.length\+allRuns\('t23'\)\.filter\(runReal\)\.length/, n: 1, o: 'contagem de provas reais no Painel (sem prova 2023)', subst: "(S.sims||[]).length+(EX.t23?allRuns('t23'):[]).filter(runReal).length" },
  { f: 'data/base.js', re: /"enemMap": \{\}, /, n: 1, o: 'chave de outra matéria em base.js' },
];

/* ---------- arquivos do motor ---------- */
const COPIAR_ARQUIVOS = ['index.html', 'sw.js', 'pwa.js', 'merge.js', 'gist-sync.js', 'js/calc.js', 'js/motion.js',
  'css/estacao.css', 'css/tema.css', 'css/motion.css', 'css/polish.css',
  'vendor/gsap.min.js', 'vendor/lenis.min.js', 'vendor/confetti.browser.min.js',
  'data/base.js', 'tests/merge.test.mjs', 'tools/estacao.mjs'];
const COPIAR_DIRS = ['icons'];
const TEXTO = /\.(html|js|mjs|css|json|webmanifest|svg|md)$/;

function escreve(rel, conteudo) {
  const p = path.join(DEST, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, conteudo);
}

function trocaIdentidade(txt) {
  for (const [de, para] of TROCAS) txt = txt.split(de).join(para);
  return txt.replace(TROCA_PREFIXO[0], TROCA_PREFIXO[1]);
}

function aplicaRemocoes(rel, txt) {
  for (const r of REMOVER.filter(x => x.f === rel)) {
    const achados = txt.match(new RegExp(r.re.source, r.re.flags.includes('g') ? r.re.flags : r.re.flags + 'g')) || [];
    if (achados.length !== r.n) die(`${rel}: "${r.o}" deveria bater ${r.n}x e bateu ${achados.length}x. O motor mudou: atualize REMOVER em tools/novo-app.mjs.`);
    txt = txt.replace(new RegExp(r.re.source, r.re.flags.includes('g') ? r.re.flags : r.re.flags + 'g'), r.subst ?? '');
  }
  return txt;
}

/* ---------- conteúdo mínimo: EX1 ---------- */
const QUESTOES = [
  { cmd: 'Uma prova tem 20 questões e você acertou 15. Qual é o percentual de acerto?', alts: ['65%', '70%', '75%', '80%', '85%'], ans: 'C',
    ex: { A: '65% seria 13 acertos em 20, não 15.', B: '70% seria 14 acertos em 20: um a menos que o informado.', C: '15 ÷ 20 = 0,75 = 75%. Esta é a correta.', D: '80% seria 16 acertos em 20.', E: '85% seria 17 acertos em 20.' },
    traps: { A: 'formula', B: 'formula', D: 'formula', E: 'formula' } },
  { cmd: 'Um insumo custa R$ 12,00 por unidade. Quanto custam 7 unidades?', alts: ['74', '80', '84', '88', '96'], ans: 'C',
    ex: { A: '74 não é múltiplo de 12: a conta é 12 × 7.', B: '80 não sai de 12 × 7; é um valor que não corresponde a nenhuma multiplicação do enunciado.', C: '12 × 7 = 84 reais. Esta é a correta.', D: '88 = 11 × 8: troca o preço e a quantidade.', E: '96 = 12 × 8: usou 8 unidades em vez de 7.' },
    traps: { A: 'formula', B: 'formula', D: 'formula', E: 'detalhe' } },
  { cmd: 'Qual é o valor de 3 + 4 × 2?', alts: ['14', '11', '10', '9', '13'], ans: 'B',
    ex: { A: '14 = (3 + 4) × 2: somar antes de multiplicar; a ordem correta faz a multiplicação primeiro.', B: '4 × 2 = 8 e 3 + 8 = 11. Esta é a correta.', C: '10 = 11 − 1: subtraiu 1 sem motivo.', D: '9 = (3 + 4) + 2: somou o 2 em vez de multiplicar.', E: '13 = 3 + 4 + 2 + 4: somou o 4 duas vezes.' },
    traps: { A: 'formula', C: 'conteudo', D: 'formula', E: 'formula' } },
];
const IDS = QUESTOES.map((_, i) => `EX1-q${i + 1}`);
const qObjs = QUESTOES.map((q, i) => ({ id: IDS[i], n: i + 1, vol: 'EL', mod: 'EX1', tag: 'Exemplo', base: [], cmd: q.cmd, alts: q.alts, ans: q.ans, ex: q.ex, traps: q.traps }));
const estacao = {
  id: 'EX1', vol: 'EL', line: 'E', title: 'Estação de exemplo', itens: '—', faixa: 'A', peso2023: 0,
  note: 'Estação de exemplo criada pelo gerador. Apague-a e escreva o conteúdo da sua matéria.',
  html: '<section class="block"><h2>Estação de exemplo</h2><p>Esta estação só existe para o app abrir sem erro. Troque este texto pelo conteúdo da matéria e apague as questões de exemplo.</p></section>',
  resumo: [], formulas: [], qs: IDS, contas: [], cartoes: [],
};
const estacaoJs = `/* EX1 · Estação de exemplo (gerada por tools/novo-app.mjs). Substitua pelo conteúdo da matéria. */
(function (D) {
  var m = ${JSON.stringify(estacao)};
  var i = D.modules.findIndex(function (x) { return x.id === m.id; });
  if (i >= 0) D.modules[i] = m; else D.modules.push(m);
  var qs = ${JSON.stringify(qObjs)};
  D.questions = D.questions.filter(function (q) { return qs.every(function (n) { return n.id !== q.id; }); }).concat(qs);
})(window.DATA);
`;
const bibliotecaJs = `/* Biblioteca vazia: preencha com as fórmulas, unidades e glossário da matéria (formato em docs/BASE-REUTILIZAVEL.md). */
window.DATA = window.DATA || {};
window.DATA.bib = { formulas: [], unidades: [], glos: [], ancoras: [] };
window.DATA.edital = [];
`;

function manifesto() {
  return JSON.stringify({
    name: NOME, short_name: CURTO, description: `Estudo interativo: ${NOME}. Prova em ${PROVA_BR}.`, lang: 'pt-BR',
    start_url: './', scope: './', id: './', display: 'standalone', orientation: 'any',
    background_color: '#0E1120', theme_color: '#0E1120', categories: ['education'],
    icons: [
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }, null, 2) + '\n';
}

const LEIA = `# ${NOME}

App de estudo (PWA estático, sem build, pt-BR). Gerado por \`tools/novo-app.mjs\` a partir do motor de estudo.
Prova: ${PROVA_BR} · Banca: ${BANCA} · Cargo: ${CARGO}.

- \`index.html\`, \`sw.js\`, \`pwa.js\`, \`merge.js\`, \`gist-sync.js\`: o app.
- \`data/base.js\`: a estrutura vazia de \`window.DATA\`. \`data/estacoes/*.js\`: o conteúdo (uma estação por arquivo).
- Progresso no aparelho com a chave \`${SLUG}-v1\` e prefixo \`${PRE}\`.

## Rodar

    npm test
    npx serve .        # ou: python -m http.server, e abra o endereço

Ao acrescentar um arquivo de runtime, inclua-o em \`SHELL_FILES\` no \`sw.js\` e mude \`VER\`.
`;
const AGENTS = `# Instruções para agentes

Leia este arquivo e \`PRODUCT.md\` antes de mexer.

- Conteúdo sem erro técnico: fórmula, número e afirmação conferidos em fonte confiável. O que não der para confirmar leva \`<span class="confira">…</span>\`.
- Toda conta de exemplo resolvido entra em \`contas\` e é recalculada por teste.
- Questões: 5 alternativas (A–E), uma correta, explicação de cada alternativa dizendo qual erro leva a ela. Nunca inventar gabarito oficial.
- Revisão independente antes de dar uma tarefa por concluída; \`npm test\` verde antes de cada commit.
- Chaves de localStorage deste app: \`${SLUG}-v1\` e \`${PRE}*\`. Não ler nem gravar as de outro app.
`;
const PRODUTO = `# Produto

${NOME}: app de estudo para a prova de ${BANCA} (${CARGO}), em ${PROVA_BR}. Conteúdo a definir por estação (\`data/estacoes/\`).
Princípios: correção técnica acima de tudo; celular primeiro (390 px); funciona offline depois do primeiro acesso.
`;
const PACKAGE = JSON.stringify({ name: SLUG, private: true, type: 'module', scripts: { test: 'node tests/merge.test.mjs' } }, null, 2) + '\n';

/* ---------- geração ---------- */
function listaRecursiva(dir, base = dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listaRecursiva(p, base));
    else out.push(path.relative(base, p).split(path.sep).join('/'));
  }
  return out.sort();
}

fs.mkdirSync(DEST, { recursive: true });
const copiados = [];
for (const rel of COPIAR_ARQUIVOS) {
  const src = path.join(ROOT, rel);
  if (!fs.existsSync(src)) die(`o motor não tem ${rel}`);
  if (TEXTO.test(rel)) {
    let txt = trocaIdentidade(fs.readFileSync(src, 'utf8'));
    txt = aplicaRemocoes(rel, txt);
    escreve(rel, txt);
  } else escreve(rel, fs.readFileSync(src));
  copiados.push(rel);
}
for (const dir of COPIAR_DIRS) for (const rel of listaRecursiva(path.join(ROOT, dir))) {
  const bruto = fs.readFileSync(path.join(ROOT, dir, rel));
  escreve(dir + '/' + rel, rel.endsWith('.svg') ? trocaIdentidade(bruto.toString('utf8')) : bruto);
  copiados.push(dir + '/' + rel);
}

/* Conteúdo e arquivos gerados primeiro: o passo de index.html só tira o que não existe no destino. */
escreve('data/estacoes/EX1.js', estacaoJs);
escreve('data/biblioteca.js', bibliotecaJs);
escreve('manifest.webmanifest', manifesto());

/* index.html: tira <script>/<link> de arquivos que não foram copiados (conteúdo e geradores de Elétrica) e
   põe a estação EX1 logo depois da base. */
let html = fs.readFileSync(path.join(DEST, 'index.html'), 'utf8');
let tiradas = [];
html = html.replace(/^[ \t]*<(script|link)\b[^>]*?\b(?:src|href)="([^"]+)"[^>]*>(?:<\/script>)?[ \t]*\n/gm, (linha, tag, ref) => {
  if (/^(https?:|#|\/\/|data:)/.test(ref)) return linha;
  if (fs.existsSync(path.join(DEST, ref))) return linha;
  tiradas.push(ref); return '';
});
const baseTag = '<script src="data/base.js"></script>\n';
if (!html.includes(baseTag)) die('index.html não tem a linha de data/base.js');
html = html.replace(baseTag, baseTag + '<script src="data/estacoes/EX1.js"></script>\n');
fs.writeFileSync(path.join(DEST, 'index.html'), html);
escreve('README.md', LEIA);
escreve('AGENTS.md', AGENTS);
escreve('PRODUCT.md', PRODUTO);
escreve('package.json', PACKAGE);
escreve('.novo-app.json', JSON.stringify(SPEC, null, 2) + '\n');

/* sw.js: lista de arquivos do shell = o que de fato existe no destino; sem Bancada nem fotos de prova. */
const shellFiles = ['./', ...listaRecursiva(DEST).filter(f => !/^(tests|tools|node_modules|docs)\//.test(f) && !/^(sw\.js|\.novo-app\.json|package(-lock)?\.json|README\.md|AGENTS\.md|PRODUCT\.md)$/.test(f) && !/^\./.test(f))];
let sw = fs.readFileSync(path.join(DEST, 'sw.js'), 'utf8');
const fixa = (nome, valor) => { const re = new RegExp(`const ${nome}=\\[[\\s\\S]*?\\];`); if (!re.test(sw)) die(`sw.js: ${nome} não encontrado`); sw = sw.replace(re, `const ${nome}=${valor};`); };
fixa('SHELL_FILES', JSON.stringify(shellFiles));
fixa('BANCADA_FILES', '[]');
fixa('IMAGES', '[]');
sw = sw.replace(/const VER='[^']*';/, "const VER='1';");
fs.writeFileSync(path.join(DEST, 'sw.js'), sw);

/* Sanidade: nenhuma das palavras de outra matéria pode ter sobrado nos arquivos gerados. */
const PROIBIDAS = /Elétrica|Eletrica|Transpetro|NR-10|Humanas|ENEM|edo-|eletrica-de-ouro|Cesgranrio/i;
const sobras = [];
for (const f of listaRecursiva(DEST)) {
  if (!TEXTO.test(f) || f === '.novo-app.json') continue;
  fs.readFileSync(path.join(DEST, f), 'utf8').split('\n').forEach((l, i) => { if (PROIBIDAS.test(l) && !/^\s*$/.test(l)) sobras.push(`${f}:${i + 1}: ${l.trim().slice(0, 140)}`); });
}
if (sobras.length) { console.error(`novo-app: ${sobras.length} trecho(s) de outra matéria sobraram (corrija TROCAS/REMOVER):\n` + sobras.join('\n')); process.exit(2); }

console.log(`novo-app: ${DEST}`);
console.log(`  motor: ${copiados.length} arquivos copiados, ${tiradas.length} referências de conteúdo/geradores removidas (${tiradas.join(', ') || '—'})`);
console.log(`  conteúdo mínimo: EX1 (${QUESTOES.length} questões), biblioteca vazia, sem plano nem provas`);
console.log(`  próximo passo: cd "${DEST}" && npx serve .   (ver README.md; trocar icons/ e escrever o conteúdo)`);

/* Elétrica de Ouro: testes das estações (data/estacoes/*.js) e dos widgets (js/calc.js), sem navegador.
   Confere campos, HTML bem formado, contas dos exemplos resolvidos, calculadoras registradas, SVG legível nos dois
   temas, cartões e V ou F. Rodar: node tests/estacoes.test.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

const INDEX = read('index.html');
const DATA_FILES = [...INDEX.matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m => m[1]);
const ST_DIR = path.join(ROOT, 'data', 'estacoes');
const ST_FILES = fs.existsSync(ST_DIR) ? fs.readdirSync(ST_DIR).filter(f => f.endsWith('.js')).map(f => 'data/estacoes/' + f) : [];
check(ST_FILES.length > 0, 'estações: nenhum arquivo em data/estacoes/');
for (const f of ST_FILES) check(DATA_FILES.includes(f), `estações: o index.html não carrega ${f}`);
const SW = read('sw.js');
for (const f of [...ST_FILES, 'js/calc.js', 'css/estacao.css']) check(SW.includes(`'${f}'`), `offline: ${f} fora da lista de arquivos do sw.js`);
check(/<script src="js\/calc\.js"><\/script>/.test(INDEX), 'widgets: o index.html não carrega js/calc.js');
check(/<link rel="stylesheet" href="css\/estacao\.css">/.test(INDEX), 'estilo: o index.html não carrega css/estacao.css');

const ctx = vm.createContext({ window: {} });
for (const f of DATA_FILES) vm.runInContext(read(f), ctx, { filename: f });
const DATA = ctx.window.DATA;

/* Widgets registrados em js/calc.js (rodado com um window mínimo, sem DOM). */
let WIDGETS = [];
if (fs.existsSync(path.join(ROOT, 'js/calc.js'))) {
  const wctx = vm.createContext({ window: {}, document: undefined });
  vm.runInContext(read('js/calc.js'), wctx, { filename: 'js/calc.js' });
  check(typeof wctx.window.montarCalculadoras === 'function', 'widgets: js/calc.js não expõe montarCalculadoras(raiz)');
  WIDGETS = Object.keys(wctx.window.CALC_WIDGETS || {});
} else check(false, 'widgets: falta js/calc.js');

/* HTML bem formado: pilha de tags (elementos vazios e SVG com "/>" são aceitos). */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
function wellFormed(html) {
  const st = [], re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    if (!m[2]) continue;
    const tag = m[2].toLowerCase();
    if (m[1]) { const top = st.pop(); if (top !== tag) return `fecha </${tag}> mas o aberto é <${top || 'nada'}> (perto de "${html.slice(Math.max(0, m.index - 60), m.index + 10).replace(/\s+/g, ' ')}")`; }
    else if (!m[4] && !VOID.has(tag)) st.push(tag);
  }
  if (/<(?![a-zA-Z\/!])/.test(html.replace(/<!--[\s\S]*?-->/g, ''))) return 'tem "<" solto (use &lt;)';
  return st.length ? `ficou aberto: <${st.join('> <')}>` : null;
}
const text = h => h.replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
/* "1.234,5 Ω" -> 1234.5 */
const num = s => { const t = String(s).replace(/−/g, '-').match(/-?[\d.]*\d(?:,\d+)?/); return t ? Number(t[0].replace(/\./g, '').replace(',', '.')) : NaN; };
/* Cor fixa que some num dos temas: preto (no escuro) ou branco (no claro). */
const FIXED = /(?:fill|stroke)\s*(?:=\s*["']?|:\s*)\s*(?:#000\b|#000000\b|black\b|#fff\b|#ffffff\b|white\b|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\))/i;

const ST_IDS = [];
for (const f of ST_FILES) {
  const src = read(f);
  const id = path.basename(f, '.js');
  ST_IDS.push(id);
  const m = (DATA.modules || []).find(x => x.id === id);
  check(!!m, `${id}: ${f} não registra a estação ${id} em DATA.modules`);
  if (!m) continue;
  const where = `estação ${id}`;
  /* Campos obrigatórios. */
  for (const k of ['id', 'vol', 'line', 'title', 'itens', 'faixa', 'note', 'html']) check(typeof m[k] === 'string' && m[k].trim(), `${where}: campo ${k} vazio`);
  check(typeof m.peso2023 === 'number', `${where}: peso2023 não é número`);
  check(Array.isArray(m.resumo) && m.resumo.length >= 5 && m.resumo.length <= 7 && m.resumo.every(r => Array.isArray(r) && r.length === 2 && r.every(x => typeof x === 'string' && x.trim())), `${where}: resumo precisa de 5 a 7 pares [termo, definição] (tem ${(m.resumo || []).length})`);
  for (const [t, d] of m.resumo || []) check(text(d).trim().length <= 110, `${where}: cartão-resumo "${t}" com ${text(d).trim().length} caracteres (o verso tem altura fixa: até 110)`);
  for (const [t, d] of m.resumo || []) check(!/</.test(d) || /^<span>[\s\S]*<\/span>$/.test(d), `${where}: cartão-resumo "${t}" com HTML fora de um <span> (o verso é flex e quebra cada <sub> numa linha)`);
  check(Array.isArray(m.formulas) && m.formulas.length > 0, `${where}: sem formulas`);
  check(Array.isArray(m.qs), `${where}: qs não é lista`);
  check(Array.isArray(m.contas) && m.contas.length > 0, `${where}: sem contas dos exemplos resolvidos`);
  check(!m.emBreve, `${where}: tem conteúdo e está marcada emBreve`);
  check(!/Estação de teste|provisóri/i.test(m.title + m.note + m.html), `${where}: ainda tem texto provisório`);
  /* HTML bem formado (teoria, fórmulas e resumo). */
  const pieces = [['html', m.html], ...(m.formulas || []).map((x, i) => [`formulas[${i}]`, typeof x === 'string' ? x : (x.html || '')]), ...(m.resumo || []).map((r, i) => [`resumo[${i}]`, r.join(' ')])];
  for (const [k, h] of pieces) { const e = wellFormed(h); check(!e, `${where}: ${k} mal formado: ${e}`); }
  check(/<h4[\s>]/.test(m.html), `${where}: teoria sem seções <h4>`);
  check(!/<h[123][\s>]/.test(m.html), `${where}: teoria com <h1>, <h2> ou <h3> (o app usa <h4> para o sumário)`);
  check(!/<script|<style|\son\w+\s*=/i.test(m.html + JSON.stringify(m.formulas)), `${where}: teoria com <script>, <style> ou on…= (não rodam por innerHTML)`);
  check(/class="eq"/.test(m.html) && /<figure/.test(m.html), `${where}: teoria sem quadros de fórmula (.eq) ou sem figuras`);
  /* Contas: cada número de exemplo resolvido é recalculado (1%) e aparece no HTML, depois do lugar indicado. */
  const T = text(m.html);
  for (const c of m.contas || []) {
    let got;
    try { got = Function('"use strict"; return (' + c.expr + ');')(); } catch (e) { check(false, `${where}: conta "${c.expr}" não roda (${e.message})`); continue; }
    const want = num(c.valor);
    check(Number.isFinite(got) && Number.isFinite(want), `${where}: conta "${c.expr}" = ${got}, valor "${c.valor}" ilegível`);
    check(Math.abs(got - want) <= 0.01 * Math.max(Math.abs(got), 1e-9), `${where}: ${c.onde}: ${c.expr} = ${+got.toFixed(4)}, mas o texto diz ${c.valor}`);
    const at = T.indexOf(c.onde);
    check(at >= 0, `${where}: conta em "${c.onde}", que não existe na teoria`);
    check(at >= 0 && T.indexOf(c.valor, at) >= 0, `${where}: o valor "${c.valor}" não aparece na teoria depois de "${c.onde}"`);
  }
  /* Calculadoras: todo data-calc tem widget, e o data-cfg é JSON. */
  const calcs = [...m.html.matchAll(/data-calc="([^"]+)"/g)].map(x => x[1]);
  for (const c of calcs) check(WIDGETS.includes(c), `${where}: data-calc="${c}" sem widget registrado em js/calc.js (há: ${WIDGETS.join(', ') || 'nenhum'})`);
  for (const [, cfg] of m.html.matchAll(/data-cfg='([^']*)'/g)) { try { JSON.parse(cfg.replace(/&#39;/g, "'").replace(/&amp;/g, '&')); } catch (e) { check(false, `${where}: data-cfg não é JSON: ${cfg.slice(0, 60)}`); } }
  /* SVG: sem cor fixa que suma num dos temas. */
  for (const s of m.html.match(/<svg[\s\S]*?<\/svg>/g) || []) { const b = s.match(FIXED); check(!b, `${where}: SVG com cor fixa "${b && b[0]}" (use as classes que seguem o tema)`); }
  /* Cartões de véspera (formato {id, vol, q, a}) e V ou F ({id, mod, s, v, why}) desta estação. */
  const cards = (DATA.cards || []).filter(c => c.id.startsWith(id + '-c'));
  check(cards.length >= 12 && cards.length <= 20, `${where}: ${cards.length} cartões (esperado 12 a 20)`);
  for (const c of cards) {
    check(Object.keys(c).sort().join() === 'a,id,q,vol' && c.vol === m.vol && c.q.trim() && c.a.trim(), `${where}: cartão ${c.id} fora do formato {id, vol, q, a}`);
    for (const k of ['q', 'a']) { const e = wellFormed(c[k]); check(!e, `${where}: cartão ${c.id}.${k} mal formado: ${e}`); }
  }
  const vf = (DATA.vf || []).filter(v => v.mod === id);
  check(vf.length >= 10 && vf.length <= 15, `${where}: ${vf.length} afirmações V ou F (esperado 10 a 15)`);
  check(vf.some(v => v.v === true) && vf.some(v => v.v === false), `${where}: V ou F só com verdadeiras ou só com falsas`);
  for (const v of vf) {
    check(Object.keys(v).sort().join() === 'id,mod,s,v,why' && typeof v.v === 'boolean' && v.s.trim() && v.why.trim(), `${where}: V ou F ${v.id} fora do formato {id, mod, s, v, why}`);
    for (const k of ['s', 'why']) { const e = wellFormed(v[k]); check(!e, `${where}: V ou F ${v.id}.${k} mal formado: ${e}`); }
  }
}
/* Ids únicos entre estações. */
const seen = new Set();
for (const x of [...(DATA.cards || []), ...(DATA.vf || [])]) { check(!seen.has(x.id), `id repetido: ${x.id}`); seen.add(x.id); }
/* A calculadora também não pode desenhar com cor fixa. */
if (fs.existsSync(path.join(ROOT, 'js/calc.js'))) { const b = read('js/calc.js').match(FIXED); check(!b, `widgets: js/calc.js desenha com cor fixa "${b && b[0]}"`); }

if (fails.length) { console.error(`estações FALHOU (${fails.length}):\n- ` + fails.join('\n- ')); process.exit(1); }
console.log(`estações OK: ${ST_IDS.join(', ')} (campos, HTML, contas, widgets ${WIDGETS.join('/')}, SVG nos dois temas, cartões e V ou F)`);

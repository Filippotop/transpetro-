/* Elétrica de Ouro: testes das "Contas passo a passo" (js/contas.js). Rodar: node tests/contas.test.mjs
   - cada receita: campos, fórmula, passos e armadilhas presentes; ids únicos; estação conhecida;
   - o resultado com os valores de exemplo bate com o valor calculado à parte aqui (conferência independente);
   - 300 sorteios por receita: resultado finito e positivo, passos sem "NaN" e sem "undefined";
   - confere(): vírgula, ponto e milhar. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = vm.createContext({ console }); ctx.window = ctx;
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/contas.js'), 'utf8'), ctx, { filename: 'contas.js' });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/contas-fig.js'), 'utf8'), ctx, { filename: 'contas-fig.js' });
for (const n of [2, 3, 4]) vm.runInContext(fs.readFileSync(path.join(ROOT, `js/contas-fig${n}.js`), 'utf8'), ctx, { filename: `contas-fig${n}.js` });
const CT = ctx.CONTAS, FIG = ctx.CONTASFIG;
const L = CT.lista();

/* valor esperado do 1º resultado com os valores de exemplo (calculado aqui, à parte) */
const R3 = Math.sqrt(3);
const ESPERADO = {
  ohm: 5, 'pot-resistor': 2200, chuveiro: 5500 * (127 / 220) ** 2, fio: 0.0172 * 100 / 2.5, paralelo: 4, divisor: 8,
  custo: 5.5 * 15, impedancia: 220 / Math.hypot(30, 2 * Math.PI * 60 * 0.1), rc: 1, triangulo: 1760,
  fp: 40 * (Math.tan(Math.acos(0.8)) - Math.tan(Math.acos(0.95))), trifasica: R3 * 380 * 10 * 0.8, ligacao: 380 / R3,
  wattimetros: 4000, trafo: 1, rendimento: 9000 / 9500 * 100, escorregamento: 1800, 'motor-corrente': 7500 / (R3 * 380 * 0.9 * 0.85),
  conjugado: 7500 / (2 * Math.PI * 1740 / 60), 'estrela-triangulo': 20, projeto: 12.5, queda: 2 * 0.0172 * 30 * 20 / 4, ma420: 5,
  juros: 1000 * 1.02 ** 12, desconto: 144, regra3: 2 * 0 + 4 * 12 / 6, bhaskara: 3, combinacao: 56, prefixos: 0.047
};

const tests = {
  'ids únicos, estação e campos': () => {
    const ids = new Set();
    for (const r of L) {
      assert.ok(!ids.has(r.id), 'id repetido ' + r.id); ids.add(r.id);
      assert.ok(CT.mods.includes(r.mod), r.id + ': estação ' + r.mod);
      assert.ok(r.nome.length > 10 && r.f.length > 8 && r.lembrar.length > 40, r.id + ': textos curtos');
      assert.ok(r.arm.length >= 1 && r.campos.length >= 1, r.id);
      for (const c of r.campos) assert.ok(c.sel ? c.sel.some(o => o[0] === c.v) : (typeof c.v === 'number' && c.s.length >= 1), r.id + ' campo ' + c.k);
    }
    assert.ok(L.length >= 28, 'receitas: ' + L.length);
    for (const id of Object.keys(ESPERADO)) assert.ok(L.some(r => r.id === id), 'falta ' + id);
    for (const r of L) assert.ok(r.id in ESPERADO, 'sem valor esperado para ' + r.id);
  },
  'valores de exemplo batem com a conta feita à parte': () => {
    for (const r of L) {
      const res = CT.calcular(r, CT.exemplo(r)), x = res.r[0][1], e = ESPERADO[r.id];
      assert.ok(Math.abs(x - e) <= 1e-9 * Math.max(1, Math.abs(e)) + 1e-9, `${r.id}: deu ${x}, esperado ${e}`);
    }
  },
  '300 sorteios por receita: finito, positivo, sem NaN/undefined nos passos': () => {
    for (const r of L) for (let i = 0; i < 300; i++) {
      const v = CT.sortear(r), res = CT.calcular(r, v);
      assert.ok(res.p.length >= 2 && res.r.length >= 1, r.id);
      assert.ok(res.r.every(x => Number.isFinite(x[1])), `${r.id}: resultado não finito com ${JSON.stringify(v)}`);
      assert.ok(res.r[0][1] > 0, `${r.id}: primeiro resultado não positivo com ${JSON.stringify(v)}`);
      if (r.valido) assert.ok(r.valido(v), `${r.id}: sorteio inválido ${JSON.stringify(v)}`);
      const txt = res.p.map(p => p.t + p.e).join(' ');
      assert.ok(!/NaN|undefined|Infinity/.test(txt), `${r.id}: texto ruim com ${JSON.stringify(v)}: ${txt.slice(0, 120)}`);
    }
  },
  'confere aceita vírgula, ponto e milhar, com 1% de folga': () => {
    const r = L.find(x => x.id === 'pot-resistor'), v = CT.exemplo(r); /* 2200 W */
    for (const t of ['2200', '2.200', '2.200,0', '2 200', '2205', '2 200 W']) assert.equal(CT.confere(r, v, t), true, t);
    for (const t of ['2300', '220', '22000']) assert.equal(CT.confere(r, v, t), false, t);
    assert.equal(CT.confere(r, v, 'abc'), null);
    const o = L.find(x => x.id === 'ohm'); assert.equal(CT.confere(o, CT.exemplo(o), '5,0'), true); assert.equal(CT.confere(o, CT.exemplo(o), '5.0'), true);
  },
  'numero(): decimais abaixo de 1 com ponto ou vírgula, milhar e notação científica': () => {
    const c = [['0,047', 0.047], ['0.047', 0.047], ['0.688', 0.688], ['1.268,24', 1268.24], ['1.268', 1268], ['12.345.678', 12345678], ['4,7e-9', 4.7e-9], ['-5', -5], ['16,85 kvar', 16.85]];
    for (const [s, x] of c) assert.ok(Math.abs(CT.numero(s) - x) <= 1e-12 * Math.max(1, Math.abs(x)), `${s} deu ${CT.numero(s)}`);
    assert.ok(Number.isNaN(CT.numero('abc')));
  },
  'sorteio nunca repete o exemplo (quando há alternativa)': () => {
    const r = L.find(x => x.id === 'ohm'); let igual = 0;
    for (let i = 0; i < 200; i++) if (JSON.stringify(CT.sortear(r)) === JSON.stringify(CT.exemplo(r))) igual++;
    assert.equal(igual, 0);
  }
};

const vazou = (txt, alvo) => { let i = txt.indexOf(alvo); while (i >= 0) { const a = txt[i - 1] || ' ', b = txt[i + alvo.length] || ' '; if (!/[0-9,.]/.test(a) && !/[0-9,]/.test(b)) return true; i = txt.indexOf(alvo, i + 1); } return false; };
tests['toda conta tem figura; 200 sorteios × (resultado visível ou não): SVG bem formado, sem NaN, sem vazar o resultado no Treinar'] = () => {
  for (const r of L) {
    assert.ok(FIG.tem(r.id), 'sem figura: ' + r.id);
    for (let i = 0; i < 200; i++) {
      const v = i ? CT.sortear(r) : CT.exemplo(r), res = CT.calcular(r, v);
      for (const ver of [true, false]) {
        const s = FIG.html(r.id, v, { r: res, ver, anim: i % 2 === 0 });
        assert.ok(s.startsWith('<svg') && s.endsWith('</svg>'), r.id + ': não é um SVG');
        assert.ok(!/NaN|undefined|Infinity/.test(s), `${r.id}: NaN/undefined com ${JSON.stringify(v)} ver=${ver}`);
        assert.ok(/aria-label="[^"]{20,}/.test(s), r.id + ': sem descrição');
        const o = (s.match(/<(?!\/)[a-zA-Z]+/g) || []).length, c = (s.match(/<\/[a-zA-Z]+>/g) || []).length, sc = (s.match(/\/>/g) || []).length;
        assert.equal(o, c + sc, `${r.id}: tags desbalanceadas`);
        if (!ver) { /* o resultado numérico não pode aparecer: nenhum texto contém o valor do 1º resultado formatado */
          const alvo = CT.fmt(res.r[0][1]); const textos = (s.match(/>[^<]+</g) || []).join(' ');
          if (alvo.length >= 3 && !Object.values(v).some(x => CT.fmt(Number(x)) === alvo)) assert.ok(!vazou(textos, alvo), `${r.id}: vazou o resultado ${alvo} no Treinar (${JSON.stringify(v)})`);
        }
      }
    }
  }
};
let failed = 0;
for (const [name, fn] of Object.entries(tests)) { try { fn(); } catch (e) { failed++; console.error(`✗ ${name}\n  ${e.message.split('\n')[0]}`); } }
if (failed) { console.error(`contas: ${failed} de ${Object.keys(tests).length} falharam`); process.exit(1); }
console.log(`contas: ${Object.keys(tests).length} testes OK (${L.length} receitas)`);

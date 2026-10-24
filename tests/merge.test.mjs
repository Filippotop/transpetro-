/* Elétrica de Ouro: testes da junção de progresso entre aparelhos (merge.js). Rodar: node tests/merge.test.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(ROOT, 'merge.js'), 'utf8'), ctx, { filename: 'merge.js' });
const mergeS = (a, b) => JSON.parse(JSON.stringify(ctx.mergeS(a, b)));
const base = o => ({ v: 1, ans: {}, cards: {}, read: {}, best: {}, sims: [], recal: {}, vf: {}, notes: {}, plan: {}, rep: {}, marks: {}, chute: {}, redo: {}, snotes: {}, act: {}, pv: {}, updated: 0, ...o });

const tests = {
  'ans: fica a primeira tentativa (menor t)': () => {
    const r = mergeS(base({ ans: { q1: { first: 'B', ok: false, t: 20 } } }), base({ ans: { q1: { first: 'A', ok: true, t: 10 }, q2: { first: 'C', ok: true, t: 5 } } }));
    assert.equal(r.ans.q1.t, 10); assert.equal(r.ans.q1.first, 'A'); assert.ok(r.ans.q2);
  },
  'vf, recal e redo: fica o mais recente (maior t)': () => {
    const r = mergeS(base({ vf: { v1: { ok: false, t: 1 } }, recal: { k: { ok: true, t: 9 } }, redo: { q: { ok: false, t: 3 } } }),
      base({ vf: { v1: { ok: true, t: 2 } }, recal: { k: { ok: false, t: 4 } }, redo: { q: { ok: true, t: 8 } } }));
    assert.equal(r.vf.v1.ok, true); assert.equal(r.recal.k.ok, true); assert.equal(r.redo.q.ok, true);
  },
  'read, best e act: maior valor': () => {
    const r = mergeS(base({ read: { F1: 5 }, best: { g: 7 }, act: { '2026-10-23': 4 } }), base({ read: { F1: 9, F2: 1 }, best: { g: 3 }, act: { '2026-10-23': 6, '2026-10-22': 2 } }));
    assert.deepEqual(r.read, { F1: 9, F2: 1 }); assert.equal(r.best.g, 7); assert.deepEqual(r.act, { '2026-10-23': 6, '2026-10-22': 2 });
  },
  'cards: maior due; empate, maior box': () => {
    const r = mergeS(base({ cards: { c1: { box: 2, due: '2026-11-01' }, c2: { box: 1, due: '2026-10-30' } } }), base({ cards: { c1: { box: 4, due: '2026-10-30' }, c2: { box: 3, due: '2026-10-30' } } }));
    assert.equal(r.cards.c1.due, '2026-11-01'); assert.equal(r.cards.c2.box, 3);
  },
  'sims: união por t': () => {
    const r = mergeS(base({ sims: [{ t: 1, n: 20 }, { t: 2, n: 20 }] }), base({ sims: [{ t: 2, n: 20 }, { t: 3, n: 30 }] }));
    assert.deepEqual(r.sims.map(x => x.t).sort(), [1, 2, 3]);
  },
  'pv: união de tentativas por id; entregue vence': () => {
    const r = mergeS(base({ pv: { '24d1': { runs: [{ id: 'x', done: false, ans: { 1: 'A' } }, { id: 'y', done: true, ans: {} }], notes: { 3: 'a' } } } }),
      base({ pv: { '24d1': { runs: [{ id: 'x', done: true, ans: { 1: 'A', 2: 'B' } }, { id: 'z', done: false, ans: {} }], notes: {} } } }));
    const runs = r.pv['24d1'].runs; assert.deepEqual(runs.map(x => x.id).sort(), ['x', 'y', 'z']);
    assert.equal(runs.find(x => x.id === 'x').done, true); assert.equal(r.pv['24d1'].notes[3], 'a');
  },
  'pv: entre não entregues, vence a com mais respostas': () => {
    const r = mergeS(base({ pv: { '25d1': { runs: [{ id: 'x', done: false, ans: { 1: 'A', 2: 'B', 3: 'C' } }], notes: {} } } }), base({ pv: { '25d1': { runs: [{ id: 'x', done: false, ans: { 1: 'A' } }], notes: {} } } }));
    assert.equal(Object.keys(r.pv['25d1'].runs[0].ans).length, 3);
  },
  'red.drafts: união por id; concluída vence, depois maior secs': () => {
    const r = mergeS(base({ red: { drafts: [{ id: 'd1', done: false, secs: 900 }, { id: 'd2', done: false, secs: 10 }], plans: { a: 1 }, check: {} } }),
      base({ red: { drafts: [{ id: 'd1', done: true, secs: 100 }, { id: 'd2', done: false, secs: 50 }, { id: 'd3', done: false, secs: 1 }], plans: { b: 2 }, check: {} } }));
    const d = Object.fromEntries(r.red.drafts.map(x => [x.id, x])); assert.equal(d.d1.done, true); assert.equal(d.d2.secs, 50); assert.ok(d.d3); assert.deepEqual(r.red.plans, { a: 1, b: 2 });
  },
  'campos sem data: no conflito vence o lado com updated maior; o resto é união': () => {
    const r = mergeS(base({ updated: 100, notes: { n: 'velha' }, marks: { q1: true } }), base({ updated: 200, notes: { n: 'nova', m: 'x' }, marks: { q2: true } }));
    assert.equal(r.notes.n, 'nova'); assert.equal(r.notes.m, 'x'); assert.deepEqual(r.marks, { q1: true, q2: true }); assert.equal(r.updated, 200);
  },
  'dia2: o que existir': () => {
    assert.equal(mergeS(base({}), base({ dia2: { t: 5, via: 'manual' } })).dia2.via, 'manual');
    assert.equal(mergeS(base({ dia2: { t: 5, via: 'manual' } }), base({})).dia2.via, 'manual');
  },
  'não altera os argumentos': () => {
    const a = base({ ans: { q1: { t: 2 } } }), b = base({ ans: { q1: { t: 1 } } }); const sa = JSON.stringify(a), sb = JSON.stringify(b);
    ctx.mergeS(a, b); assert.equal(JSON.stringify(a), sa); assert.equal(JSON.stringify(b), sb);
  },
  'juntar consigo mesmo não muda nada': () => {
    const x = base({ ans: { q: { t: 1 } }, pv: { '24d1': { runs: [{ id: 'a', done: true, ans: {} }], notes: {} } }, red: { drafts: [{ id: 'd', done: true, secs: 1 }], plans: {}, check: {} }, updated: 7 });
    assert.deepEqual(mergeS(x, x), JSON.parse(JSON.stringify(x)));
  },
  'juntar com vazio mantém tudo': () => {
    const a = base({ ans: { q: { t: 1 } }, notes: { n: 'a' }, updated: 3 });
    const r = mergeS(a, {}); assert.deepEqual(r.ans, a.ans); assert.deepEqual(r.notes, a.notes); assert.equal(r.updated, 3);
  },
  /* Exclusões: S.del guarda a última operação por caminho (t>0 apagado em t; t<0 recriado em -t). */
  'del: tentativa descartada não volta pela junção com o Gist': () => {
    const run = { id: 'k1', done: false, ans: { 46: 'A' } };
    const local = base({ pv: { '24d1': { runs: [], notes: {} } }, del: { '["pv","24d1","runs","k1"]': 50 }, updated: 50 });
    const gist = base({ pv: { '24d1': { runs: [run], notes: {} } }, updated: 40 });
    assert.deepEqual(mergeS(local, gist).pv['24d1'].runs, []); assert.deepEqual(mergeS(gist, local).pv['24d1'].runs, []);
  },
  'del: redação apagada, marca e anotação desfeitas não voltam': () => {
    const local = base({ red: { drafts: [] }, del: { '["red","drafts","d1"]': 9, '["marks","q1"]': 9, '["snotes","F1"]': 9, '["pv","25d1","notes","50"]': 9 }, updated: 9 });
    const gist = base({ red: { drafts: [{ id: 'd1', text: 'x' }] }, marks: { q1: 3 }, snotes: { F1: 'velha' }, pv: { '25d1': { runs: [], notes: { 50: 'n' } } }, updated: 5 });
    const r = mergeS(gist, local);
    assert.deepEqual(r.red.drafts, []); assert.equal(r.marks.q1, undefined); assert.equal(r.snotes.F1, undefined); assert.equal(r.pv['25d1'].notes['50'], undefined);
  },
  'del: marcar de novo depois de desmarcar vence a exclusão mais antiga': () => {
    const a = base({ marks: {}, del: { '["marks","q1"]': 10 }, updated: 10 });
    const b = base({ marks: { q1: 20 }, del: { '["marks","q1"]': -20 }, updated: 20 });
    assert.equal(mergeS(a, b).marks.q1, 20); assert.equal(mergeS(b, a).marks.q1, 20); assert.equal(mergeS(a, b).del['["marks","q1"]'], -20);
  },
  'reset: "Zerar progresso" vence o Gist antigo, nos dois sentidos': () => {
    const zerado = base({ reset: 100, updated: 100 });
    const gist = base({ ans: { q1: { ok: true, t: 5 } }, pv: { '24d1': { runs: [{ id: 'x', done: true }], notes: {} } }, updated: 90 });
    for (const r of [mergeS(zerado, gist), mergeS(gist, zerado)]) { assert.deepEqual(r.ans, {}); assert.equal(r.reset, 100); assert.ok(!r.pv['24d1'] || !r.pv['24d1'].runs.length); }
    const depois = base({ reset: 100, ans: { q2: { ok: true, t: 150 } }, updated: 150 });
    assert.ok(mergeS(zerado, depois).ans.q2, 'o que foi feito depois do reset continua');
  },
};

let failed = 0;
for (const [name, fn] of Object.entries(tests)) { try { fn(); } catch (e) { failed++; console.error(`✗ ${name}\n  ${e.message.split('\n')[0]}`); } }
if (failed) { console.error(`merge: ${failed} de ${Object.keys(tests).length} falharam`); process.exit(1); }
console.log(`merge: ${Object.keys(tests).length} testes OK`);

import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../js/engine.js';
import * as S from '../js/store.js';
import { answer, dueIds, boxes, INTERVAL_DAYS } from '../js/review.js';
import { MISSIONS, missionById, allQuestions } from '../js/missions/index.js';
import { setSeed, cabs, csub } from '../js/util.js';

setSeed(42);
const run = (mid, fid, mode) => E.createRun(missionById(mid), fid, { mode });

test('pontuação segue a tabela documentada', () => {
  assert.deepEqual(E.score({ okD: true, okA: true, viol: 0, meas: 3, ideal: 3, hints: 0 }).score, 100);
  assert.equal(E.score({ okD: true, okA: true, viol: 0, meas: 6, ideal: 3, hints: 0 }).score, 95);
  assert.equal(E.score({ okD: true, okA: true, viol: 0, meas: 7, ideal: 3, hints: 0 }).score, 90);
  assert.equal(E.score({ okD: false, okA: true, viol: 0, meas: 1, ideal: 3, hints: 0 }).score, 40, 'eficiência só conta com diagnóstico certo');
  assert.equal(E.score({ okD: true, okA: false, viol: 3, meas: 2, ideal: 3, hints: 2 }).score, 50);
  assert.equal(E.score({ okD: false, okA: false, viol: 5, meas: 9, ideal: 3, hints: 3 }).score, 0, 'nunca negativa');
  assert.deepEqual([85, 84, 65, 40, 39].map(E.starsOf), [3, 2, 2, 1, 0]);
});

test('ohmímetro em circuito energizado é violação e não conta como medição', () => {
  const R = run('cmd', 'fuse'); E.selectInstr(R, 'O');
  const r = E.probe(R, 'c:F21');
  assert.equal(r.txt, 'BLOQ'); assert.equal(R.viol, 1); assert.equal(R.meas, 0);
  E.desenergize(R); E.probe(R, 'c:F21');
  assert.equal(R.meas, 1); assert.ok(R.keys.has('O:F21=OL'));
});

test('voltímetro: duas pontas, depois leitura; componente direto também mede', () => {
  const R = run('cmd', 'fuse');
  assert.equal(E.probe(R, 'tp:TP1'), null); assert.equal(R.red, 'TP1');
  const r = E.probe(R, 'tp:TPN'); assert.equal(r.unit, 'V'); assert.ok(R.keys.has('V:TP1-TPN=hi'));
  E.probe(R, 'c:F21'); assert.ok(R.keys.has('V:F21=hi')); assert.equal(R.red, null);
});

test('alvo errado para o instrumento só orienta, sem contar medição', () => {
  const R = run('qd', 'neutro'); E.selectInstr(R, 'A');
  assert.ok(E.probe(R, 'tp:Q1').info); assert.ok(E.probe(R, 'c:DG').info); assert.equal(R.meas, 0);
});

test('modo prova não dá dicas', () => {
  const R = run('cmd', 'selo', 'prova'); assert.equal(E.useHint(R), null); assert.equal(R.hints, 0);
  const T = run('cmd', 'selo'); assert.ok(E.useHint(T)); assert.equal(T.hints, 1);
});

test('NR-10: só a ordem da norma é aceita', () => {
  assert.ok(E.nr10Correct([0, 1, 2, 3, 4, 5]));
  assert.ok(!E.nr10Correct([1, 0, 2, 3, 4, 5]));
  assert.ok(!E.nr10Correct([0, 1, 2, 3, 4]));
});

test('closeRun registra acerto, tempo e falta de resposta', () => {
  const R = run('dr', 'def'); const res = E.closeRun(R, 'def', 'def');
  assert.ok(res.okD && res.okA); assert.equal(res.timeout, false);
  const P = S.fresh(); S.record(P, R);
  assert.equal(P.res.dr.faults.def, res.score); assert.equal(P.exams.length, 0);
  const X = run('dr', 'np', 'prova'); E.closeRun(X, 'soma', 'soma'); S.record(P, X);
  assert.equal(P.exams.length, 1); assert.equal(P.res.dr.faults.np, undefined, 'diagnóstico errado não “descobre” o defeito');
});

test('selo: soltar S1 derruba K1 e gera a evidência', () => {
  const R = run('cmd', 'selo'); const M = R.M;
  E.doAction(R, 's1'); assert.ok(M.solve(R).k1);
  E.doAction(R, 's1'); assert.ok(!M.solve(R).k1); assert.ok(R.keys.has('E:selo'));
  const ok = run('cmd', 'fuse'); E.doAction(ok, 's1'); E.doAction(ok, 's1'); assert.ok(!ok.keys.has('E:selo'));
});

test('quadro: neutro rompido reproduz a questão da lâmpada (≈ 200 V)', () => {
  const R = run('qd', 'neutro'); R.params.P = [100, 1000, 0];
  const S2 = R.M.solve(R); const v = cabs(csub(S2.pot.Q1, S2.pot.QN));
  assert.ok(Math.abs(v - 200) < 3, `lâmpada com ${v.toFixed(1)} V`);
  assert.equal(S2.IN, 0);
});

test('quadro: sem defeito o neutro fica no potencial de terra', () => {
  const R = run('qd', 'low'); const S2 = R.M.solve(R);
  assert.ok(cabs(S2.pot.QN) < 1e-9);
  assert.ok(Math.abs(cabs(csub(S2.pot.Q1, S2.pot.Q2)) - 110 * Math.sqrt(3)) < 0.01);
});

test('motor: desequilíbrio dá ~380/363/363 V', () => {
  const R = run('mot', 'deseq'); const L2 = R.M.lines(R);
  const v = [[0, 1], [1, 2], [0, 2]].map(([a, b]) => Math.round(cabs(csub(L2[a], L2[b]))));
  assert.deepEqual(v, [380, 363, 363]);
});

test('motor: relé desarma no tempo do defeito', () => {
  const R = run('mot', 'ajuste'); E.doAction(R, 'start');
  for (let i = 0; i < 19; i++) E.tick(R); assert.ok(R.params.run);
  E.tick(R); assert.ok(!R.params.run); assert.ok(R.params.trip);
});

test('DR: limiar 19 mA (normal) e 9 mA (defeituoso); testador sem carga mede o limiar', () => {
  for (const [f, th] of [['soma', 19], ['def', 9]]) {
    const R = run('dr', f); for (const c of ['C1', 'C2', 'C3', 'C4']) E.doAction(R, c);
    E.doAction(R, 'rearm'); assert.ok(R.params.dr, 'arma sem carga');
    E.selectInstr(R, 'T'); const r = E.probe(R, 'c:DR');
    assert.equal(r.txt, String(th) + ',0');
  }
});

test('persistência: migra dados antigos e rejeita lixo', () => {
  const old = { v: 1, res: { cmd: { best: 80, n: 2, faults: { fuse: 80, x: 'abc' } } }, nr10ok: true, instrutor: false };
  const P = S.migrate(old);
  assert.equal(P.v, 2); assert.equal(P.res.cmd.faults.fuse, 80); assert.equal(P.res.cmd.faults.x, undefined);
  assert.equal(P.instrutor, false); assert.deepEqual(P.exams, []); assert.deepEqual(P.srs, {});
  assert.deepEqual(S.migrate('lixo'), S.fresh());
  const mem = new Map(); const st = { getItem: k => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) };
  assert.ok(S.save(P, st)); assert.deepEqual(S.load(st), P);
  assert.equal(S.save(P, { setItem() { throw new Error('cheio'); } }), false);
});

test('revisão espaçada (Leitner)', () => {
  const srs = {}, now = 1_000_000_000_000, DAY = 86400000;
  answer(srs, 'a', false, now); assert.equal(srs.a.box, 1); assert.deepEqual(dueIds(srs, now), ['a']);
  answer(srs, 'a', true, now); assert.equal(srs.a.box, 2); assert.equal(srs.a.due, now + INTERVAL_DAYS[2] * DAY);
  assert.deepEqual(dueIds(srs, now), []);
  answer(srs, 'b', true, now); assert.equal(srs.b.box, 2);
  for (let i = 0; i < 10; i++) answer(srs, 'b', true, now); assert.equal(srs.b.box, 5);
  answer(srs, 'b', false, now); assert.equal(srs.b.box, 1);
  assert.deepEqual(boxes(srs), [1, 1, 0, 0, 0]);
});

test('ids das questões são únicos e estáveis', () => {
  const qs = allQuestions(); assert.equal(new Set(qs.map(q => q.id)).size, qs.length);
  assert.equal(qs.length, MISSIONS.reduce((s, m) => s + m.faults.reduce((t, f) => t + f.questoes.length, 0), 0));
});

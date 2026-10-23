import test from 'node:test';
import assert from 'node:assert/strict';
import { moduleStatus, itemStatus, nextStep } from '../js/mastery.js';

const secs = n => Array.from({ length: n }, (_, i) => ({ id: 's' + i, titulo: 'S' + i, html: '' }));
const mkMod = (id, o = {}) => ({ id, titulo: 'Módulo ' + id, itens: ['1.1'], faixa: 'A', secoes: secs(10), checagem: [0, 1, 2, 3].map(i => ({ s: 'q' + i, o: [], a: 0, porque: '' })), missoes: [], ...o });
const vistas = (n) => ({ vistas: secs(n).map(s => s.id), ultima: null, em: 1000 });
const cards = (id, specs) => Object.fromEntries(specs.map((s, i) => [`ap/${id}/${i}`, { box: 1, due: 9e15, seen: 1, wrong: 0, ...s }]));
const P = (o = {}) => ({ v: 3, res: {}, nr10ok: false, instrutor: true, exams: [], srs: {}, leitura: {}, ...o });

test('leitura 9/10 seções vistas é "lido"', () => {
  const m = mkMod('m');
  const r = moduleStatus(m, P({ leitura: { m: vistas(9) } }));
  assert.equal(r.status, 'lido'); assert.equal(r.leitura, 0.9); assert.equal(r.acerto, null);
  assert.equal(moduleStatus(m, P({ leitura: { m: vistas(8) } })).status, 'nao-lido');
  assert.equal(moduleStatus(m, P()).status, 'nao-lido');
});

test('vistas com ids inexistentes ou duplicados não contam', () => {
  const m = mkMod('m');
  const r = moduleStatus(m, P({ leitura: { m: { vistas: ['s0', 'x', 'y', 'z', 'w', 'v', 'u', 't', 'r', 'q'], ultima: null, em: 1 } } }));
  assert.equal(r.leitura, 0.1);
});

test('checagem: 3 de 4 acertos é "checado"; 2 de 4 não é', () => {
  const m = mkMod('m');
  const a = moduleStatus(m, P({ srs: cards('m', [{ last: true }, { last: true }, { last: true }, { last: false }]) }));
  assert.equal(a.status, 'checado'); assert.equal(a.acerto, 0.75);
  const b = moduleStatus(m, P({ srs: cards('m', [{ last: true }, { last: true }, { last: false }, { last: false }]) }));
  assert.notEqual(b.status, 'checado'); assert.equal(b.acerto, 0.5);
});

test('domínio exige os 4 cartões na caixa 3+ e 3+ acertos', () => {
  const m = mkMod('m');
  const c = moduleStatus(m, P({ srs: cards('m', [{ last: true }, { last: true, box: 2 }, { last: true }, { last: false }]) }));
  assert.equal(c.status, 'checado');
  const d = moduleStatus(m, P({ srs: cards('m', [{ last: true, box: 3 }, { last: true, box: 4 }, { last: true, box: 5 }, { last: false, box: 3 }]) }));
  assert.equal(d.status, 'dominado');
  const e = moduleStatus(m, P({ srs: cards('m', [{ last: true, box: 3 }, { last: true, box: 3 }, { last: true, box: 3 }]) }));
  assert.equal(e.status, 'checado', 'cartão que falta impede o domínio');
});

test('cartão v2 sem "last" conta como não respondido', () => {
  const m = mkMod('m');
  const r = moduleStatus(m, P({ srs: cards('m', [{ box: 4 }, { box: 4 }, { box: 4 }, { box: 4 }]) }));
  assert.equal(r.acerto, null); assert.equal(r.status, 'nao-lido');
});

test('itemStatus: em-breve sem módulo; pior status entre os módulos que cobrem', () => {
  const item = { n: 1, titulo: 'X', peso2023: 3, faixa: 'A', sub: [{ id: '1.1', t: 'a' }, { id: '1.2', t: 'b' }] };
  assert.deepEqual(itemStatus(item, [mkMod('z', { itens: ['9.9'] })], P()), { status: 'em-breve', pct: 0 });
  assert.equal(itemStatus(item, [], P()).status, 'em-breve');
  const m1 = mkMod('m1', { itens: ['1.1'] }), m2 = mkMod('m2', { itens: ['1.2', '5.5'] });
  const p = P({ leitura: { m1: vistas(10), m2: vistas(9) }, srs: cards('m1', [{ last: true, box: 3 }, { last: true, box: 3 }, { last: true, box: 3 }, { last: true, box: 3 }]) });
  const r = itemStatus(item, [m1, m2], p);
  assert.equal(r.status, 'lido');
  assert.ok(Math.abs(r.pct - (1 + 0.45) / 2) < 1e-9, 'm1: 0,5+0,5 = 1; m2: 0,45 → média');
});

test('nextStep: revisão vencida, módulo A de menor domínio, missão do último lido', () => {
  const a = mkMod('a'), b = mkMod('b'), c = mkMod('c', { faixa: 'B' });
  const now = 5000;
  const due = nextStep(P({ srs: { x: { box: 1, due: now, seen: 1, wrong: 0 }, y: { box: 1, due: now - 1, seen: 1, wrong: 0 } } }), [a, b], [], now);
  assert.equal(due.kind, 'revisar'); assert.equal(due.id, 'revisar'); assert.equal(due.label, 'Revisar 2 questão(ões) vencida(s)');
  const p = P({ leitura: { a: vistas(10) } });
  const n = nextStep(p, [a, b, c], [], now);
  assert.deepEqual(n, { kind: 'modulo', id: 'b', label: 'Estudar: Módulo b' });
  const t = nextStep(P(), [c, a, b], [], now);
  assert.equal(t.id, 'a', 'empate: ordem em mods; faixa B ignorada');
  const lo = nextStep(P({ leitura: { a: { vistas: ['s0'], ultima: null, em: 1 } } }), [a, b], [], now);
  assert.equal(lo.id, 'b', 'mesmo status: menor leitura primeiro');
  const full = [{ last: true, box: 3 }, { last: true, box: 3 }, { last: true, box: 3 }, { last: true, box: 3 }];
  const d1 = mkMod('d1', { missoes: ['cmd'] }), d2 = mkMod('d2', { missoes: ['dr', 'cmd'] }), d3 = mkMod('d3', { missoes: ['zz'], faixa: 'B' });
  const all = P({ srs: { ...cards('d1', full), ...cards('d2', full) }, leitura: { d1: { vistas: [], ultima: null, em: 10 }, d2: { vistas: [], ultima: null, em: 20 }, d3: { vistas: [], ultima: null, em: 5 } } });
  const os = nextStep(all, [d1, d2, d3], [], now);
  assert.deepEqual(os, { kind: 'os', id: 'dr', label: 'Praticar na bancada' });
  const none = nextStep(P({ srs: { ...cards('a', full) } }), [mkMod('a')], [], now);
  assert.deepEqual(none, { kind: 'modulo', id: 'a', label: 'Estudar: Módulo a' });
});

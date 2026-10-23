/* Integridade das missões: cada falha tem dados completos e TODA prova listada no relatório
   pode ser obtida por alguma sequência de ações e medições. Rodar: node --test bancada/tests */
import test from 'node:test';
import assert from 'node:assert/strict';
import { MISSIONS } from '../js/missions/index.js';
import * as E from '../js/engine.js';
import { INSTR } from '../js/instruments.js';
import { explore, replay } from './explore.mjs';

for (const M of MISSIONS) {
  test(`${M.id}: estrutura da missão`, () => {
    for (const k of ['id', 'n', 'titulo', 'area', 'edital', 'local', 'equip', 'sintoma']) assert.ok(M[k], `falta ${k}`);
    const dids = new Set(M.diag.map(d => d.id)), aids = new Set(M.acts.map(a => a.id));
    assert.equal(dids.size, M.diag.length, 'ids de diagnóstico repetidos');
    assert.ok(M.instr.every(k => INSTR[k]), 'instrumento desconhecido');
    for (const F of M.faults) {
      assert.ok(dids.has(F.diag), `${F.id}: diagnóstico ${F.diag} não está na lista`);
      assert.ok(aids.has(F.act), `${F.id}: ação ${F.act} não está na lista`);
      assert.equal(F.hints.length, 3, `${F.id}: deveria ter 3 dicas`);
      assert.ok(F.provas.length >= 2 && F.explica && F.teoria && F.cesg, `${F.id}: relatório incompleto`);
      assert.ok(F.ideal >= 1, `${F.id}: referência de medições`);
      for (const q of F.questoes) {
        assert.equal(q.o.length, 5, `${F.id}: questão sem 5 alternativas`);
        assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < 5, `${F.id}: gabarito inválido`);
        assert.equal(new Set(q.o).size, 5, `${F.id}: alternativas repetidas`);
        assert.ok(q.c, `${F.id}: questão sem comentário`);
      }
    }
  });
  for (const F of M.faults) {
    test(`${M.id}/${F.id}: toda prova do relatório é mensurável`, () => {
      const seeds = M.id === 'qd' ? [1, 2, 3, 4, 5, 6, 7, 8] : [1];
      for (const seed of seeds) {
        const keys = explore(M, F.id, seed);
        for (const pv of F.provas) assert.ok(E.provaOK(keys, pv), `semente ${seed}: ninguém consegue obter "${pv.txt}" (${pv.any.join(', ')})`);
      }
    });
  }
}

test('provas não são obtidas por leituras enganosas em outras falhas (amostra)', () => {
  const mot = MISSIONS.find(m => m.id === 'mot');
  // Medir com o motor parado não pode “provar” correntes desiguais nem tensão baixa.
  const R = replay(mot, 'deseq', 1, ['desen']);
  E.selectInstr(R, 'V'); E.probe(R, 'tp:B2'); E.probe(R, 'tp:B3');
  assert.ok(!R.keys.has('V:B2-B3=baixo'), 'circuito desenergizado classificado como tensão baixa');
  const R2 = replay(mot, 'deseq', 1, []);
  E.selectInstr(R2, 'A'); E.probe(R2, 'cl:1');
  assert.ok([...R2.keys].every(k => !/^A:1=(alta|baixa|nom)$/.test(k)), 'motor parado classificado como corrente');
});

test('com o circuito desenergizado, voltímetro e alicates não produzem provas', () => {
  for (const M of MISSIONS) for (const F of M.faults) {
    const keys = new Set();
    for (const ins of M.instr.filter(k => INSTR[k].energ)) {
      const R0 = replay(M, F.id, 1, ['desen']);
      const tg = [...M.svg(R0).matchAll(/data-k="([^"]+)"/g)].map(m => m[1]); const tps = tg.filter(k => k.startsWith('tp:'));
      const probes = ins === 'V' ? [...tg.map(k => [k]), ...tps.flatMap(a => tps.filter(b => b !== a).map(b => [a, b]))] : tg.map(k => [k]);
      for (const pr of probes) { const R = replay(M, F.id, 1, ['desen']); E.selectInstr(R, ins); pr.forEach(k => E.probe(R, k)); R.keys.forEach(k => keys.add(k)); }
    }
    for (const G of M.faults) for (const pv of G.provas) assert.ok(!E.provaOK(keys, pv), `${M.id}/${F.id}: leitura sem tensão “prova” ${G.id}: ${pv.txt}`);
  }
});

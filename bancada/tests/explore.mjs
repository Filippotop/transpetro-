/* Explorador de estados das missões (usado pelos testes). */
import * as E from '../js/engine.js';
import { setSeed } from '../js/util.js';
import { INSTR } from '../js/instruments.js';

const targetsOf = svg => [...svg.matchAll(/data-k="([^"]+)"/g)].map(m => m[1]);
const actsOf = html => [...new Set([...html.matchAll(/data-act="([^"]+)"/g)].map(m => m[1]))];

/** Recria o estado aplicando a sequência de operações a partir do zero (determinístico). */
export function replay(M, fid, seed, seq) {
  setSeed(seed); let t = 0;
  const R = E.createRun(M, fid, { now: () => t * 1000 });
  for (const op of seq) {
    if (op === 'desen') E.desenergize(R);
    else if (op === 'reen') E.reenergize(R);
    else if (op === 'tick') { t++; E.tick(R); }
    else if (op === 'tick*') for (let i = 0; i < 45; i++) { t++; E.tick(R); }
    else E.doAction(R, op);
  }
  return R;
}

/** Busca em largura nos estados alcançáveis; mede tudo em cada estado novo. */
export function explore(M, fid, seed, maxDepth = 6) {
  const keys = new Set(); const seen = new Set(); let queue = [[]];
  for (let d = 0; d <= maxDepth && queue.length; d++) {
    const next = [];
    for (const seq of queue) {
      const R = replay(M, fid, seed, seq);
      R.keys.forEach(k => keys.add(k));
      const sig = JSON.stringify([R.params, R.ctl, R.energ]);
      if (seen.has(sig)) continue; seen.add(sig);
      const tg = targetsOf(M.svg(R)), tps = tg.filter(k => k.startsWith('tp:'));
      for (const ins of M.instr) {
        if (INSTR[ins].desen && R.energ) continue;
        const probes = ins === 'V' ? [...tg.filter(k => !k.startsWith('tp:')).map(k => [k]), ...tps.flatMap(a => tps.filter(b => b !== a).map(b => [a, b]))] : tg.map(k => [k]);
        for (const pr of probes) {
          const Rm = replay(M, fid, seed, seq); E.selectInstr(Rm, ins);
          for (const k of pr) E.probe(Rm, k);
          Rm.keys.forEach(k => keys.add(k));
        }
      }
      const ops = [...actsOf(M.controls(R)), R.energ ? 'desen' : 'reen', 'tick', 'tick*'];
      for (const op of ops) next.push([...seq, op]);
    }
    queue = next;
  }
  return keys;
}


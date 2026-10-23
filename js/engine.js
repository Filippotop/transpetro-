/* =====================================================================
   Motor da bancada (sem DOM). Não sabe eletricidade: só chama os membros
   do contrato de missão (ver ARQUITETURA.md) e cuida de estado, regras de
   segurança, NR-10, dicas, pontuação e provas.
   ===================================================================== */
import { INSTR } from './instruments.js';
import { pick } from './util.js';

/** Tempo-limite do modo prova, em segundos. */
export const EXAM_LIMIT = 8 * 60;

/**
 * Cria um atendimento.
 * @param {object} M missão
 * @param {string} [fid] id da falha; sorteada quando omitida
 * @param {{mode?:'treino'|'prova', now?:()=>number}} [opts]
 */
export function createRun(M, fid, opts = {}) {
  const F = fid ? M.faults.find(f => f.id === fid) : pick(M.faults);
  if (!F) throw new Error(`Falha "${fid}" não existe na missão ${M.id}`);
  const now = opts.now || Date.now;
  const R = {
    M, F, mode: opts.mode || 'treino', now,
    energ: true, ctl: structuredClone(M.ctl0 || {}), instr: M.instr[0],
    red: null, black: null, log: [], keys: new Set(), viol: 0, hints: 0, meas: 0,
    t0: now(), nr10: false, reading: null, result: null,
    logAdd(txt, cls) { R.log.unshift({ t: Math.round((now() - R.t0) / 1000), txt, cls }); }
  };
  R.params = M.setup ? M.setup(F) : {};
  if (M.onStart) M.onStart(R);
  return R;
}

export const elapsed = R => (R.now() - R.t0) / 1000;
export const remaining = R => Math.max(0, EXAM_LIMIT - elapsed(R));
export const isExam = R => R.mode === 'prova';

export function selectInstr(R, k) {
  if (!R.M.instr.includes(k)) return;
  R.instr = k; R.red = R.black = null; R.reading = null;
}

/** Leitura que não conta como medição (alvo errado para o instrumento etc.). */
const info = interp => ({ txt: '—', unit: '', interp, info: true });

/**
 * O aluno tocou um alvo do diagrama.
 * @param {object} R atendimento
 * @param {string} k chave do alvo: "tp:ID", "c:ID" ou "cl:ID"
 * @returns {object|null} leitura exibida no visor (ou null se só moveu a ponta de prova)
 */
export function probe(R, k) {
  const [type, id] = k.split(':'); const ins = R.instr, I = INSTR[ins];
  if (type === 'tp' && ins !== 'V') return show(R, info('Pontos de teste servem para o voltímetro. Para este instrumento, toque num componente ou cabo.'));
  if (type === 'cl' && ins !== 'A' && ins !== 'L') return show(R, info('Os anéis marcam onde abraçar um condutor com o alicate.'));
  if (type === 'c' && (ins === 'A' || ins === 'L')) return show(R, info('O alicate abraça um condutor: toque num dos anéis.'));
  if (I.desen && R.energ) {
    R.viol++;
    R.logAdd(`Violação de segurança: tentativa de usar ${I.nome.toLowerCase()} com o circuito energizado. Desenergize seguindo a NR-10.`, 'bad');
    return show(R, { txt: 'BLOQ', unit: '', interp: 'Ohmímetro e megôhmetro nunca são usados em circuito energizado: risco ao técnico e ao instrumento, e a leitura seria falsa.', info: true });
  }
  if (type === 'tp') {
    if (!R.red || R.black) { R.red = id; R.black = null; return null; }
    if (id === R.red) return null;
    R.black = id;
    return finish(R, R.M.measure(R, 'V', { a: R.red, b: R.black }));
  }
  R.red = R.black = null;
  return finish(R, R.M.measure(R, ins, type === 'cl' ? { cl: id } : { c: id }));
}

function show(R, r) { R.reading = r; return r; }
function finish(R, r) {
  if (!r) return null;
  if (r.na) return show(R, info(r.na));
  R.meas++;
  for (const k of [].concat(r.key || [])) R.keys.add(k);
  R.logAdd(`${INSTR[R.instr].curto} · ${r.where}: <b>${r.txt} ${r.unit || ''}</b>`);
  return show(R, r);
}

export function doAction(R, a) { if (R.M.action) R.M.action(R, a); }

export function desenergize(R) {
  if (!R.energ) return;
  R.energ = false; R.red = R.black = null;
  if (R.M.onDesen) R.M.onDesen(R);
  R.logAdd('Circuito desenergizado, bloqueado e sinalizado conforme a NR-10 (10.5.1).', 'ok');
}
export function reenergize(R) {
  if (R.energ) return;
  R.energ = true;
  if (R.M.onReen) R.M.onReen(R);
  R.logAdd('Circuito reenergizado após a sequência de reenergização (10.5.2).', 'ok');
}
/** A ordem informada (índices de NR10) está correta? */
export const nr10Correct = ord => ord.length === 6 && ord.every((v, k) => v === k);

/** Avança um segundo de simulação. Devolve true quando o desenho precisa mudar. */
export const tick = R => !!(R.M.tick && R.M.tick(R));

export function useHint(R) {
  if (isExam(R)) return null;
  const h = R.F.hints;
  if (R.hints >= h.length) { R.logAdd('Não há mais dicas para este atendimento.'); return null; }
  R.logAdd(`<b>Dica do supervisor:</b> ${h[R.hints]}`, 'hint');
  return h[R.hints++];
}

/**
 * Pontuação: diagnóstico 50 + ação 20 + segurança 20 (−10 por violação)
 * + eficiência 10 (só com diagnóstico certo) − 5 por dica.
 */
export function score({ okD, okA, viol, meas, ideal = 4, hints }) {
  const seg = Math.max(0, 20 - 10 * viol);
  const ef = !okD ? 0 : meas <= ideal ? 10 : meas <= 2 * ideal ? 5 : 0;
  const total = Math.max(0, (okD ? 50 : 0) + (okA ? 20 : 0) + seg + ef - 5 * hints);
  return { seg, ef, score: total, stars: starsOf(total) };
}
export const starsOf = sc => sc >= 85 ? 3 : sc >= 65 ? 2 : sc >= 40 ? 1 : 0;

/** Fecha a OS. `dg`/`ac` podem ser null (tempo esgotado no modo prova). */
export function closeRun(R, dg, ac) {
  const okD = dg === R.F.diag, okA = ac === R.F.act;
  const s = score({ okD, okA, viol: R.viol, meas: R.meas, ideal: R.F.ideal, hints: R.hints });
  R.result = { dg, ac, okD, okA, ...s, secs: Math.round(elapsed(R)), timeout: dg == null };
  return R.result;
}

/** A prova `pv` ({any:[etiquetas]}) foi observada? Etiqueta terminada em * é prefixo. */
export const provaOK = (keys, pv) => pv.any.some(k => k.endsWith('*') ? [...keys].some(x => x.startsWith(k.slice(0, -1))) : keys.has(k));

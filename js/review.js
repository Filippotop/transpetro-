/* Revisão espaçada (sistema de Leitner) das questões do relatório.
   Caixa 1 = revisar já; acertou, sobe uma caixa; errou, volta para a 1. */
export const INTERVAL_DAYS = [0, 0, 1, 3, 7, 16]; // índice = caixa
const DAY = 86400000;

/** Atualiza o cartão `id` depois de uma resposta. */
export function answer(srs, id, correct, now = Date.now()) {
  const c = srs[id] || { box: 1, due: now, seen: 0, wrong: 0 };
  c.seen++;
  if (correct) c.box = Math.min(5, c.box + 1); else { c.box = 1; c.wrong++; }
  c.due = now + INTERVAL_DAYS[c.box] * DAY;
  srs[id] = c;
  return c;
}
/** Ids que vencem até `now`, os mais atrasados primeiro. */
export const dueIds = (srs, now = Date.now()) => Object.entries(srs).filter(([, c]) => c.due <= now).sort((a, b) => a[1].due - b[1].due).map(([id]) => id);
/** Quantos cartões estão em cada caixa (1..5). */
export function boxes(srs) { const b = [0, 0, 0, 0, 0, 0]; for (const c of Object.values(srs)) b[c.box]++; return b.slice(1); }

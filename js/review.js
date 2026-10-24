/* Revisão espaçada (sistema de Leitner) das questões do relatório.
   Caixa 1 = revisar já; acertou, sobe uma caixa; errou, volta para a 1.
   O intervalo nunca passa de 20% do tempo que falta para a prova (mínimo de 1 dia). */
import { EXAM_DATE } from './instruments.js';
export const INTERVAL_DAYS = [0, 0, 1, 3, 7, 16]; // índice = caixa
const DAY = 86400000;

/** Atualiza o cartão `id` depois de uma resposta; `examDate` limita o intervalo.
    Acerto antes do vencimento (checagem refeita, revisão extra) não sobe de caixa nem adia o cartão:
    subir exige acertar de novo em outro dia. Erro vale sempre. */
export function answer(srs, id, correct, now = Date.now(), examDate = EXAM_DATE) {
  const early = id in srs && now < srs[id].due;
  const c = srs[id] || { box: 1, due: now, seen: 0, wrong: 0 };
  c.seen++;
  if (correct && early) { c.last = true; return c; }
  if (correct) c.box = Math.min(5, c.box + 1); else { c.box = 1; c.wrong++; }
  c.last = !!correct;
  const left = (new Date(examDate) - now) / DAY, cap = Number.isFinite(left) ? Math.max(1, Math.floor(0.2 * left)) : Infinity;
  c.due = now + Math.min(INTERVAL_DAYS[c.box], cap) * DAY;
  srs[id] = c;
  return c;
}
/** Ids que vencem até `now`, os mais atrasados primeiro. */
export const dueIds = (srs, now = Date.now()) => Object.entries(srs).filter(([, c]) => c.due <= now).sort((a, b) => a[1].due - b[1].due).map(([id]) => id);
/** Quantos cartões estão em cada caixa (1..5). */
export function boxes(srs) { const b = [0, 0, 0, 0, 0, 0]; for (const c of Object.values(srs)) b[c.box]++; return b.slice(1); }

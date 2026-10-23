/* Persistência do progresso no aparelho (localStorage), com migração e cópia de segurança. */
export const LSK = 'bancada-transpetro-v1';

/** Estado inicial. `res`: resultados por missão; `exams`: histórico do modo prova; `srs`: revisão espaçada. */
export const fresh = () => ({ v: 2, res: {}, nr10ok: false, instrutor: true, exams: [], srs: {} });

/** Aceita qualquer coisa vinda do armazenamento ou de um arquivo e devolve um estado válido. */
export function migrate(raw) {
  const P = fresh();
  if (!raw || typeof raw !== 'object') return P;
  if (raw.res && typeof raw.res === 'object') {
    for (const [id, r] of Object.entries(raw.res)) {
      if (!r || typeof r !== 'object') continue;
      P.res[id] = { best: +r.best || 0, n: +r.n || 0, faults: {} };
      for (const [f, sc] of Object.entries(r.faults || {})) if (Number.isFinite(+sc)) P.res[id].faults[f] = +sc;
    }
  }
  P.nr10ok = !!raw.nr10ok;
  P.instrutor = raw.instrutor !== false;
  if (Array.isArray(raw.exams)) P.exams = raw.exams.filter(e => e && Number.isFinite(+e.score)).slice(-200);
  if (raw.srs && typeof raw.srs === 'object') for (const [id, c] of Object.entries(raw.srs)) if (c && Number.isFinite(+c.box)) P.srs[id] = { box: Math.min(5, Math.max(1, +c.box)), due: +c.due || 0, seen: +c.seen || 0, wrong: +c.wrong || 0 };
  return P;
}

export function load(storage = globalThis.localStorage) {
  try { const t = storage && storage.getItem(LSK); return migrate(t ? JSON.parse(t) : null); } catch { return fresh(); }
}
/** Devolve false quando o aparelho não deixou salvar (aba anônima, armazenamento cheio). */
export function save(P, storage = globalThis.localStorage) {
  try { storage.setItem(LSK, JSON.stringify(P)); return true; } catch { return false; }
}

/** Registra o resultado de uma OS. */
export function record(P, R) {
  const { M, F, result: res } = R;
  const r = P.res[M.id] || (P.res[M.id] = { best: 0, faults: {}, n: 0 });
  r.n++; r.best = Math.max(r.best, res.score);
  if (res.okD) r.faults[F.id] = Math.max(r.faults[F.id] || 0, res.score);
  if (R.mode === 'prova') P.exams.push({ at: Date.now(), m: M.id, f: F.id, score: res.score, secs: res.secs, ok: res.okD });
}
export const foundFaults = (P, missions) => missions.reduce((s, m) => s + Object.keys((P.res[m.id] || {}).faults || {}).length, 0);

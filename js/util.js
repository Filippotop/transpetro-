/* Utilidades sem DOM: formatação, sorteio (com semente para os testes) e números complexos. */
let seed = null;
/** Fixa a semente do sorteio (testes). `null` volta para Math.random. */
export function setSeed(s) { seed = s == null ? null : s >>> 0; }
/** Número em [0,1): mulberry32 quando há semente, senão Math.random. */
export function rand() {
  if (seed == null) return Math.random();
  seed = (seed + 0x6D2B79F5) >>> 0; let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export const pick = a => a[Math.floor(rand() * a.length)];
export const fmt = (x, d = 1) => Number(x).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
/** Ruído de leitura relativo (±p/2), para o instrumento não parecer uma tabela. */
export const noise = (x, p = 0.004) => x * (1 + (rand() - 0.5) * p);
export function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
export const mmss = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- números complexos (fasores) ---------- */
export const Cx = (re, im = 0) => ({ re, im });
export const cadd = (a, b) => Cx(a.re + b.re, a.im + b.im);
export const csub = (a, b) => Cx(a.re - b.re, a.im - b.im);
export const cmul = (a, k) => Cx(a.re * k, a.im * k);
export const cdiv = (a, k) => Cx(a.re / k, a.im / k);
export const cabs = a => Math.hypot(a.re, a.im);
export const polar = (m, deg) => Cx(m * Math.cos(deg * Math.PI / 180), m * Math.sin(deg * Math.PI / 180));

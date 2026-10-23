/* Primitivas SVG compartilhadas pelas missões. Os contatos são SEMPRE desenhados em repouso (convenção dos diagramas). */
export const W = (x1, y1, x2, y2, c = 'wire') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
export const T = (x, y, s, c = 'ts', a = 'start') => `<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${s}</text>`;

/** Contato vertical. o.kind: "na" | "nf"; o.act: "push" | "therm"; o.mark: "k" (contato principal de contator). */
export function C(x, y1, y2, o = {}) {
  const kind = o.kind || 'na'; let s = W(x, y1, x, y1 + 12) + W(x, y2 - 12, x, y2); const py = y2 - 12; let tip;
  if (kind === 'na') tip = [x - 13, y1 + 14]; else { s += W(x, y1 + 12, x + 10, y1 + 12); tip = [x + 10, y1 + 12]; }
  s += W(x, py, tip[0], tip[1]); const ym = (py + tip[1]) / 2, xm = (x + tip[0]) / 2;
  if (o.act === 'push') s += `<line x1="${xm - 2}" y1="${ym}" x2="${x - 28}" y2="${ym}" class="wire dsh"/><path d="M${x - 24} ${ym - 7} H${x - 30} V${ym + 7} H${x - 24}" class="wire"/>`;
  if (o.act === 'therm') s += `<line x1="${xm - 2}" y1="${ym}" x2="${x - 26}" y2="${ym}" class="wire dsh"/>`;
  if (o.mark === 'k') s += `<path d="M${x - 5} ${y1 + 12} A5 5 0 0 0 ${x + 5} ${y1 + 12}" class="wire"/>`;
  if (o.t1) s += T(x + 8, y1 + 9, o.t1, 'tn'); if (o.t2) s += T(x + 8, y2 - 2, o.t2, 'tn');
  if (o.label) s += T(x - 36, (y1 + y2) / 2 + 5, o.label, 'ts', 'end');
  return s;
}
export const coil = (x, y1, y2, lab, on) => W(x, y1, x, y1 + 8) + W(x, y2 - 8, x, y2) + `<rect x="${x - 16}" y="${y1 + 8}" width="32" height="${y2 - y1 - 16}" class="${on ? 'coil-on' : 'coilr'}"/>` + T(x - 22, (y1 + y2) / 2 + 5, lab, 'ts', 'end') + T(x + 20, y1 + 12, 'A1', 'tn') + T(x + 20, y2 - 2, 'A2', 'tn');
export function lamp(x, y1, y2, lab, on) {
  const c = (y1 + y2) / 2, r = 13, d = r * 0.707;
  return W(x, y1, x, c - r) + W(x, c + r, x, y2) + (on ? `<circle cx="${x}" cy="${c}" r="${r + 9}" class="glow"/>` : '') + `<circle cx="${x}" cy="${c}" r="${r}" class="${on ? 'lamp-on' : 'comp'}"/>` + W(x - d, c - d, x + d, c + d) + W(x + d, c - d, x - d, c + d) + T(x - 20, c + 5, lab, 'ts', 'end');
}
export const fuseH = (x1, x2, y) => W(x1, y, x2, y) + `<rect x="${x1 + 12}" y="${y - 7}" width="${x2 - x1 - 24}" height="14" class="comp"/>` + W(x1 + 12, y, x2 - 12, y);
export const fuseV = (x, y1, y2) => W(x, y1, x, y2) + `<rect x="${x - 7}" y="${y1 + 10}" width="14" height="${y2 - y1 - 20}" class="comp"/>` + W(x, y1 + 10, x, y2 - 10);
export const earth = (x, y) => W(x, y, x, y + 12) + W(x - 11, y + 12, x + 11, y + 12) + W(x - 7, y + 17, x + 7, y + 17) + W(x - 3, y + 22, x + 3, y + 22);
export function therm(x, y1, y2) { const ym = (y1 + y2) / 2; return W(x, y1, x, y1 + 8) + W(x, y2 - 8, x, y2) + `<rect x="${x - 11}" y="${y1 + 8}" width="22" height="${y2 - y1 - 16}" class="comp"/><path d="M${x} ${y1 + 8} V${ym - 6} H${x - 6} V${ym + 6} H${x} V${y2 - 8}" class="wire"/>`; }

/* ---------- alvos clicáveis (todos focáveis por teclado) ---------- */
/** Ponto de teste do voltímetro. */
export const TPt = (R, id, x, y, lab, lx = 12, ly = -10) => `<g class="tgt tp ${R.red === id ? 'red' : ''} ${R.black === id ? 'blk' : ''}" data-k="tp:${id}" tabindex="0" role="button" aria-label="Ponto de teste ${lab}${R.red === id ? ' (ponta vermelha)' : R.black === id ? ' (ponta preta)' : ''}"><circle cx="${x}" cy="${y}" r="14" class="tp-hit"/><circle cx="${x}" cy="${y}" r="6" class="tp-dot"/><text x="${x + lx}" y="${y + ly}" class="tpl">${lab}</text></g>`;
/** Componente (multímetro nos terminais, ohmímetro, megôhmetro, inspeção). */
export const HIT = (id, x, y, w, h, lab) => `<rect class="tgt hit" data-k="c:${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" tabindex="0" role="button" aria-label="${lab}"><title>${lab}</title></rect>`;
/** Anel do alicate sobre um condutor. */
export const RING = (id, x, y, rx, ry, lab) => `<ellipse class="tgt ring" data-k="cl:${id}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" tabindex="0" role="button" aria-label="${lab}"><title>${lab}</title></ellipse>`;

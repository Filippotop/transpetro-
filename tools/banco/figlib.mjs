/* Biblioteca mínima de figuras para questões extras (campo `figSvg` do item em tools/banco/<ID>z.mjs).
   Cada função devolve um trecho de SVG com as classes das figuras das estações SEM o prefixo s- (o banco põe o prefixo).
   Classes usadas: wire (traço), thick (traço grosso), comp (ponto de nó), ts (texto pequeno), tl (texto normal), ar (seta).
   Não use cores fixas nem ids: o teste do repositório rejeita. Larguras recomendadas: viewBox 0 0 680 H (como as das estações). */
const f1 = n => (Math.round(n * 100) / 100).toString();
export const wire = (x1, y1, x2, y2, c = '') => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" class="wire${c ? ' ' + c : ''}"/>`;
export const poly = (pts, c = '') => `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" class="wire${c ? ' ' + c : ''}"/>`;
export const node = (x, y) => `<circle cx="${x}" cy="${y}" r="4" class="comp"/>`;
export const text = (x, y, t, a = 'middle', c = 'ts') => `<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${t}</text>`;
/* resistor (zigue-zague) com 60 px de comprimento: (x,y) é o centro; o = 'h' ou 'v' */
export const res = (x, y, o = 'h', rot = '', nome = '') => {
  const p = [[-30, 0], [-22, 0], [-18, -8], [-10, 8], [-2, -8], [6, 8], [14, -8], [18, 0], [30, 0]];
  const pts = p.map(([a, b]) => o === 'h' ? [x + a, y + b] : [x + b, y + a]);
  const lab = o === 'h' ? text(x, y - 16, rot) + (nome ? text(x, y + 24, nome) : '') : text(x + 16, y + 4, rot, 'start') + (nome ? text(x + 16, y + 20, nome, 'start') : '');
  return poly(pts) + lab;
};
/* fonte CC vertical: + em cima; (x,y) é o centro */
export const bat = (x, y, rot = '') => wire(x, y - 40, x, y - 8) + wire(x - 14, y - 8, x + 14, y - 8, 'thick') + wire(x - 8, y + 4, x + 8, y + 4, 'thick') + wire(x, y + 4, x, y + 40)
  + text(x + 20, y - 12, '+', 'start') + text(x + 20, y + 14, '−', 'start') + (rot ? text(x - 20, y + 4, rot, 'end') : '');
/* fonte CA (círculo com ~) ; r = 18 */
export const ac = (x, y, rot = '') => `<circle cx="${x}" cy="${y}" r="18" fill="none" class="wire"/><path d="M${x - 10},${y} q5,-10 10,0 t10,0" fill="none" class="wire"/>` + (rot ? text(x - 24, y + 4, rot, 'end') : '');
/* instrumento: círculo com a letra (A, V, W) */
export const meter = (x, y, letra, rot = '') => `<circle cx="${x}" cy="${y}" r="15" fill="none" class="wire"/>` + text(x, y + 5, letra, 'middle', 'tl') + (rot ? text(x, y - 22, rot) : '');
/* caixa de carga (impedância Z): retângulo 56×34 centrado em (x,y) */
export const zbox = (x, y, rot = 'Z', nome = '') => `<rect x="${x - 28}" y="${y - 17}" width="56" height="34" rx="3" fill="none" class="wire"/>` + text(x, y + 5, rot, 'middle', 'tl') + (nome ? text(x, y + 34, nome) : '');
/* capacitor horizontal (placas verticais) e indutor horizontal (arcos) */
export const cap = (x, y, rot = '') => wire(x - 30, y, x - 5, y) + wire(x - 5, y - 14, x - 5, y + 14, 'thick') + wire(x + 5, y - 14, x + 5, y + 14, 'thick') + wire(x + 5, y, x + 30, y) + (rot ? text(x, y - 22, rot) : '');
export const ind = (x, y, rot = '') => wire(x - 30, y, x - 24, y) + [0, 1, 2, 3].map(i => `<path d="M${x - 24 + i * 12},${y} a6,6 0 0 1 12,0" fill="none" class="wire"/>`).join('') + wire(x + 24, y, x + 30, y) + (rot ? text(x, y - 18, rot) : '');
/* seta com ponta cheia (sem marcador): de (x1,y1) a (x2,y2) */
export const seta = (x1, y1, x2, y2, c = '') => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 9, W = 4, bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  const p = [[x2, y2], [bx - W * Math.sin(a), by + W * Math.cos(a)], [bx + W * Math.sin(a), by - W * Math.cos(a)]].map(q => q.map(f1).join(',')).join(' ');
  return wire(x1, y1, bx, by, c ? 'ar ' + c : 'ar') + `<polygon points="${p}" class="ink"/>`;
};
export const svg = (w, h, corpo, aria) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${aria}">${corpo}</svg>`;

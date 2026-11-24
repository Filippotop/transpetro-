/* Figuras de resposta: o circuito da questão, desenhado já resolvido (valores, correntes e tensões), para a resposta.
   Biblioteca de desenho em SVG, só com classes s-* (as mesmas das estações, css/estacao.css): nenhuma cor fixa.

   Elemento: { t, l, v, i, u, n, rev, dir, ls }
     t    tipo: R L C V (bateria) AC I (fonte de corrente) lamp M G volt amp Z sw swc fuse Vd Id W
     l, v nome e valor (R₁ / 12 Ω → "R₁ = 12 Ω")
     i, u corrente e tensão, escritas em cores diferentes ("I = 1 A", "U = 12 V")
     n    linhas extras (lista de textos)
     rev  inverte a polaridade da fonte
     dir  -1 inverte a seta da corrente
     ls   lado do texto num elemento vertical: 'r' (padrão) ou 'l'
   Escada (ladder): fonte à esquerda, itens ao longo do trilho de cima, ramos verticais (shunts) entre os trilhos:
     { s: el }   elemento em série no trilho de cima
     { p: [el…] } ramo vertical (cadeia de elementos)
     { w: el }   elemento vertical na parede da direita (fecha o laço)
     { term: ['a','b', 'texto'] } terminais abertos à direita
     n: 'N'      em qualquer item: marca o nó à esquerda dele */

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const f = x => +x.toFixed(1);
const rot = (x, y, deg) => { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [x * c - y * s, x * s + y * c]; };

export class Canvas {
  constructor() { this.b = []; this.minX = 1e9; this.minY = 1e9; this.maxX = -1e9; this.maxY = -1e9; }
  grow(x, y, m = 0) { this.minX = Math.min(this.minX, x - m); this.maxX = Math.max(this.maxX, x + m); this.minY = Math.min(this.minY, y - m); this.maxY = Math.max(this.maxY, y + m); }
  raw(s) { this.b.push(s); }
  wire(pts, cls = 's-wire s-ink') {
    pts.forEach(p => this.grow(p[0], p[1], 3));
    this.b.push(`<path class="${cls}" d="M${pts.map(p => f(p[0]) + ' ' + f(p[1])).join(' L')}"/>`);
  }
  dot(x, y) { this.grow(x, y, 4); this.b.push(`<circle class="s-f-ink" cx="${f(x)}" cy="${f(y)}" r="3.6"/>`); }
  open(x, y) { this.grow(x, y, 5); this.b.push(`<circle class="s-comp" cx="${f(x)}" cy="${f(y)}" r="4.5"/>`); }
  /* texto: a = start|middle|end; c = classe extra (s-ts, s-tm, s-tn, s-fa, s-fb, s-fc) */
  text(x, y, s, c = 's-ts', a = 'middle') {
    const w = String(s).length * (c.includes('s-tn') ? 6 : 7.3);
    this.grow(a === 'middle' ? x - w / 2 : a === 'start' ? x : x - w, y - 12); this.grow(a === 'middle' ? x + w / 2 : a === 'start' ? x + w : x, y + 5);
    this.b.push(`<text class="${c}" x="${f(x)}" y="${f(y)}" text-anchor="${a}">${esc(s)}</text>`);
  }
  /* seta pequena em (x,y) apontando para o ângulo deg (0 = direita, 90 = baixo) */
  arrow(x, y, deg, cls = 's-f-pa') {
    const pts = [[7, 0], [-5, -5], [-5, 5]].map(p => rot(p[0], p[1], deg)).map(p => (f(x + p[0]) + ',' + f(y + p[1]))).join(' ');
    this.grow(x, y, 8); this.b.push(`<polygon class="${cls}" points="${pts}"/>`);
  }
  ground(x, y) {
    this.wire([[x, y], [x, y + 10]]); this.wire([[x - 11, y + 10], [x + 11, y + 10]]); this.wire([[x - 7, y + 15], [x + 7, y + 15]]); this.wire([[x - 3, y + 20], [x + 3, y + 20]]);
  }
  /* símbolo no centro (cx,cy), eixo girado de deg graus (0 = horizontal; 90 = vertical, + em cima) */
  sym(e, cx, cy, deg = 0) {
    const t = e.t, g = [];
    const P = d => g.push(`<path class="s-wire s-ink" d="${d}"/>`);
    const circ = (r = 15) => g.push(`<circle class="s-comp" cx="0" cy="0" r="${r}"/>`);
    const txt = (s, dy = 5) => g.push(`<text class="s-ts" x="0" y="${dy}" text-anchor="middle" transform="rotate(${-deg})">${esc(s)}</text>`);
    switch (t) {
      case 'R': P('M-28 0 H-21 L-17 -8 L-9 8 L-1 -8 L7 8 L15 -8 L21 0 H28'); break;
      case 'L': P('M-28 0 H-22 a5.5 5.5 0 0 1 11 0 a5.5 5.5 0 0 1 11 0 a5.5 5.5 0 0 1 11 0 a5.5 5.5 0 0 1 11 0 H28'); break;
      case 'C': P('M-28 0 H-4 M-4 -13 V13 M4 -13 V13 M4 0 H28'); break;
      case 'V': P('M-28 0 H-5 M5 0 H28'); P(e.rev ? 'M-5 -7 V7 M5 -14 V14' : 'M-5 -14 V14 M5 -7 V7'); break;
      case 'AC': P('M-28 0 H-15 M15 0 H28'); circ(); P('M-9 0 q4.5 -9 9 0 t9 0'); break;
      case 'I': P('M-28 0 H-15 M15 0 H28'); circ(); P(e.rev ? 'M9 0 H-9 M-9 0 l5 -4 M-9 0 l5 4' : 'M-9 0 H9 M9 0 l-5 -4 M9 0 l-5 4'); break;
      case 'lamp': P('M-28 0 H-15 M15 0 H28'); circ(); P('M-10.6 -10.6 L10.6 10.6 M-10.6 10.6 L10.6 -10.6'); break;
      case 'M': case 'G': case 'volt': case 'amp': case 'wat': P('M-28 0 H-15 M15 0 H28'); circ(); txt({ M: 'M', G: 'G', volt: 'V', amp: 'A', wat: 'W' }[t]); break;
      case 'Z': P('M-28 0 H-20 M20 0 H28'); g.push('<rect class="s-comp" x="-20" y="-9" width="40" height="18"/>'); break;
      case 'sw': P('M-28 0 H-13 M13 0 H28 M-13 0 L11 -14'); g.push('<circle class="s-f-ink" cx="-13" cy="0" r="2.6"/><circle class="s-f-ink" cx="13" cy="0" r="2.6"/>'); break;
      case 'swc': P('M-28 0 H28'); g.push('<circle class="s-f-ink" cx="-13" cy="0" r="2.6"/><circle class="s-f-ink" cx="13" cy="0" r="2.6"/>'); break;
      case 'fuse': P('M-28 0 H-12 M12 0 H28'); g.push('<rect class="s-comp" x="-12" y="-6" width="24" height="12"/>'); P('M-12 0 H12'); break;
      case 'Vd': P('M-28 0 H-17 M17 0 H28'); g.push('<path class="s-comp" d="M0 -17 L17 0 L0 17 L-17 0 Z"/>'); g.push(`<text class="s-tn" x="-9" y="3" transform="rotate(${-deg} -9 0)">+</text><text class="s-tn" x="5" y="3" transform="rotate(${-deg} 6 0)">−</text>`); break;
      case 'Id': P('M-28 0 H-17 M17 0 H28'); g.push('<path class="s-comp" d="M0 -17 L17 0 L0 17 L-17 0 Z"/>'); P('M-8 0 H8 M8 0 l-5 -4 M8 0 l-5 4'); break;
      case 'D': case 'ZD': case 'LED': {
        const r = e.rev ? -1 : 1;
        P('M-28 0 H-8 M8 0 H28');
        g.push(`<path class="s-comp" d="M${-8 * r} -10 L${-8 * r} 10 L${8 * r} 0 Z"/>`);
        P(t === 'ZD' ? `M${8 * r + 4} -14 L${8 * r + 4} -10 L${8 * r} -10 L${8 * r} 10 L${8 * r - 4} 10 L${8 * r - 4} 14` : `M${8 * r} -10 V10`);
        if (t === 'LED') P(`M-4 -16 l8 -8 m-3 0 h3 v3 M4 -16 l8 -8 m-3 0 h3 v3`);
        break;
      }
      case 'W': P('M-28 0 H28'); break;
      default: throw new Error('símbolo desconhecido: ' + t);
    }
    this.grow(cx, cy, 30);
    this.b.push(`<g transform="translate(${f(cx)} ${f(cy)}) rotate(${deg})">${g.join('')}</g>`);
    if (t === 'V') { /* sinais + e − nas placas */
      const s = e.rev ? -1 : 1;
      const p1 = rot(-12 * s, -20, deg), p2 = rot(12 * s, -18, deg);
      this.b.push(`<text class="s-tn" x="${f(cx + p1[0])}" y="${f(cy + p1[1] + 4)}" text-anchor="middle">+</text><text class="s-tn" x="${f(cx + p2[0])}" y="${f(cy + p2[1] + 4)}" text-anchor="middle">−</text>`);
    }
  }
  /* texto do elemento: horizontal (acima e abaixo) ou vertical (ao lado). */
  label(e, cx, cy, vert, side = 'r') {
    const nm = e.l && e.v ? `${e.l} = ${e.v}` : (e.l || e.v || '');
    const lines = [];
    if (nm) lines.push([nm, 's-ts']);
    if (e.i) lines.push([`I = ${e.i}`, 's-fa']);
    if (e.u) lines.push([`U = ${e.u}`, 's-fb']);
    (e.n || []).forEach(s => lines.push([s, 's-tm']));
    if (!lines.length) return;
    if (!vert) {
      let y = cy - 24;
      if (nm) { this.text(cx, y, nm, 's-ts'); lines.shift(); }
      lines.forEach((l, k) => this.text(cx, cy + 30 + 16 * k, l[0], l[1]));
    } else {
      const x = side === 'r' ? cx + 22 : cx - 22, a = side === 'r' ? 'start' : 'end';
      const y0 = cy - 8 * (lines.length - 1) + 4;
      lines.forEach((l, k) => this.text(x, y0 + 16 * k, l[0], l[1], a));
    }
  }
  svg(aria, pad = 10) {
    let x0 = Math.floor(this.minX - pad), w = Math.ceil(this.maxX - this.minX + 2 * pad);
    const y0 = Math.floor(this.minY - pad), h = Math.ceil(this.maxY - this.minY + 2 * pad);
    if (w < 560) { x0 -= Math.floor((560 - w) / 2); w = 560; } /* figuras pequenas não crescem além do tamanho do texto */
    return `<svg viewBox="${x0} ${y0} ${w} ${h}" role="img" aria-label="${esc(aria)}">${this.b.join('')}</svg>`;
  }
}

/* ----- fábricas de elementos ----- */
const mk = t => (l, v, o = {}) => ({ t, l, v, ...o });
export const R = mk('R'), L = mk('L'), C = mk('C'), V = mk('V'), AC = mk('AC'), I = mk('I'), lamp = mk('lamp'), M = mk('M'), G = mk('G'),
  wat = mk('wat'), D = mk('D'), ZD = mk('ZD'), LED = mk('LED'), volt = mk('volt'), amp = mk('amp'), Z = mk('Z'), sw = mk('sw'), swc = mk('swc'), fuse = mk('fuse'), Vd = mk('Vd'), Id = mk('Id'), W = mk('W');

/* ----- escada ----- */
export function ladder(o) { return ladderC(o).svg(o.aria); }
export function ladderC({ src, items, note, ref = false, bl = null, H: Hmin = 130 }) {
  const c = new Canvas();
  const X0 = 70, T = 0;
  let H = Hmin;
  for (const it of items) if (it.p) H = Math.max(H, it.p.length * 90 + 20);
  const B = T + H, MID = H / 2;
  /* largura estimada do texto de um elemento (para espaçar os itens sem sobrepor rótulos) */
  const wlab = e => {
    const nm = e.l && e.v ? `${e.l} = ${e.v}` : (e.l || e.v || '');
    const ls = [nm, e.i ? `I = ${e.i}` : '', e.u ? `U = ${e.u}` : '', ...(e.n || [])];
    return Math.max(0, ...ls.map(t => t.length)) * 7.3;
  };
  let x = X0, last = null, edge = X0 + 6;
  if (src) {
    c.wire([[X0, T], [X0, MID - 28]]); c.wire([[X0, MID + 28], [X0, B]]);
    c.sym(src, X0, MID, 90); c.label(src, X0, MID, true, 'l');
    if (src.i) c.arrow(X0, MID - 44, src.dir === -1 ? 90 : -90, 's-f-pa');
  } else c.wire([[X0, T], [X0, B]]);
  c.dot(X0, T); c.dot(X0, B);
  const seg = (x1, x2) => { c.wire([[x1, T], [x2, T]]); };
  for (const it of items) {
    if (it.s) {
      const half = Math.max(wlab(it.s) / 2, 34), cx = Math.max(x + 72, edge + 14 + half);
      seg(x, cx - 28);
      c.sym(it.s, cx, T, 0); c.label(it.s, cx, T, false);
      if (it.s.i) c.arrow(cx - 40, T, it.s.dir === -1 ? 180 : 0, 's-f-pa');
      x = cx + 28; edge = cx + half; last = 's';
    } else if (it.p) {
      const xs = Math.max(x + 60, edge + 16), W = Math.max(...it.p.map(wlab), 30);
      seg(x, xs); c.dot(xs, T); c.dot(xs, B);
      const n = it.p.length, step = (H - 20) / n;
      it.p.forEach((e, k) => {
        const cy = T + 10 + step * (k + 0.5);
        c.wire([[xs, k === 0 ? T : T + 10 + step * k], [xs, cy - 28]]);
        c.sym(e, xs, cy, 90); c.label(e, xs, cy, true, e.ls || 'r');
        if (e.i) c.arrow(xs, cy - 44, e.dir === -1 ? -90 : 90, 's-f-pa');
        c.wire([[xs, cy + 28], [xs, k === n - 1 ? B : T + 10 + step * (k + 1)]]);
      });
      if (it.n) c.text(xs - 6, T - 10, it.n, 's-ts', 'end');
      x = xs; edge = xs + 22 + W; last = 'p';
    } else if (it.w) {
      const xw = Math.max(x + 40, edge + 16), W = wlab(it.w);
      seg(x, xw); c.wire([[xw, T], [xw, MID - 28]]); c.wire([[xw, MID + 28], [xw, B]]);
      c.sym(it.w, xw, MID, 90); c.label(it.w, xw, MID, true, it.w.ls || 'r');
      if (it.w.i) c.arrow(xw, MID - 44, 90, 's-f-pa');
      c.dot(xw, T); c.dot(xw, B);
      x = xw; edge = xw + 22 + W; last = 'w';
    } else if (it.term) {
      const xt = Math.max(x + 50, edge + 16);
      seg(x, xt); c.wire([[X0, B], [xt, B]]);
      c.open(xt, T); c.open(xt, B);
      c.text(xt + 12, T + 4, it.term[0], 's-ts', 'start'); c.text(xt + 12, B + 4, it.term[1], 's-ts', 'start');
      if (it.term[2]) c.text(xt + 12, MID + 4, it.term[2], 's-fb', 'start');
      x = xt; last = 't';
    }
    if (it.n && !it.p) c.text(x - 20, T - 12, it.n, 's-tm', 'end');
  }
  if (last === 's') { c.wire([[x, T], [x + 30, T], [x + 30, B]]); c.dot(x + 30, B); x += 30; }
  if (last !== 't') c.wire([[X0, B], [x, B]]);
  if (ref) c.ground(X0, B);
  if (bl) c.text(X0 + 8, B + 20, bl, 's-ts', 'start');
  [].concat(note || []).forEach((n, k) => c.text(X0 - 40, B + (ref ? 42 : 34) + 18 * k, n, 's-tm', 'start'));
  return c;
}

export const fig = { ladder, Canvas };

/* ----- peças livres (coordenadas absolutas) ----- */
/* ramo de p1 a p2 com o elemento no meio; o texto fica ao lado (side: 1 ou -1 = lado da normal à esquerda/direita) */
export function branch(c, p1, p2, e, side = 1) {
  const dx = p2[0] - p1[0], dy = p2[1] - p1[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
  const cx = (p1[0] + p2[0]) / 2, cy = (p1[1] + p2[1]) / 2, deg = Math.atan2(dy, dx) * 180 / Math.PI;
  c.wire([p1, [cx - 28 * ux, cy - 28 * uy]]); c.wire([[cx + 28 * ux, cy + 28 * uy], p2]);
  c.sym(e, cx, cy, deg);
  const nx = -uy * side, ny = ux * side;
  const nm = e.l && e.v ? `${e.l} = ${e.v}` : (e.l || e.v || '');
  const lines = [];
  if (nm) lines.push([nm, 's-ts']);
  if (e.i) lines.push([`I = ${e.i}`, 's-fa']);
  if (e.u) lines.push([`U = ${e.u}`, 's-fb']);
  (e.n || []).forEach(s => lines.push([s, 's-tm']));
  const a = nx > 0.3 ? 'start' : nx < -0.3 ? 'end' : 'middle';
  const dd = Math.abs(nx) > 0.9 ? 24 : 38;
  const bx = cx + nx * (a === 'middle' ? 0 : dd), by = cy + ny * (a === 'middle' ? 30 : (Math.abs(nx) > 0.9 ? 6 : dd));
  lines.forEach((l, k) => c.text(bx, by + 16 * k + (a === 'middle' ? (ny < 0 ? -16 * (lines.length - 1) : 0) : -8 * (lines.length - 1)), l[0], l[1], a));
  if (e.i) { const ax = cx - ux * 42, ay = cy - uy * 42; c.arrow(ax, ay, deg + (e.dir === -1 ? 180 : 0), 's-f-pa'); }
}

/* duas colunas entre os trilhos (ponte de Wheatstone, divisores em paralelo), com elemento opcional entre os pontos médios */
export function bridge({ src, left, right, mid, aria, note, midY = null }) {
  const c = new Canvas();
  const X0 = 70, XL = 230, XR = 430, H = 190 + (Math.max(left.length, right.length) - 2) * 90, T = 0, B = H;
  if (src) { c.wire([[X0, T], [X0, H / 2 - 28]]); c.wire([[X0, H / 2 + 28], [X0, B]]); c.sym(src, X0, H / 2, 90); c.label(src, X0, H / 2, true, 'l'); if (src.i) c.arrow(X0, H / 2 - 44, -90, 's-f-pa'); }
  else c.wire([[X0, T], [X0, B]]);
  c.dot(X0, T); c.dot(X0, B);
  c.wire([[X0, T], [XR, T]]); c.wire([[X0, B], [XR, B]]); c.dot(XL, T); c.dot(XL, B);
  const col = (x, els, side) => {
    const n = els.length, step = H / n, ys = [];
    els.forEach((e, k) => {
      const y1 = step * k, y2 = step * (k + 1);
      branch(c, [x, y1], [x, y2], e, side);
      ys.push(y2);
    });
    return ys;
  };
  const yl = col(XL, left, 1), yr = col(XR, right, -1);
  if (mid) {
    const y = yl[0]; /* ponto médio da primeira divisão */
    c.dot(XL, y); c.dot(XR, y);
    const xa = (XL + XR) / 2;
    c.wire([[XL, y], [xa - 28, y]]); c.wire([[xa + 28, y], [XR, y]]); c.sym(mid, xa, y, 0);
    const nm = mid.l && mid.v ? `${mid.l} = ${mid.v}` : (mid.l || mid.v || '');
    if (nm) c.text(xa, y - 24, nm, 's-ts');
    if (mid.u) c.text(xa, y + 36, `U = ${mid.u}`, 's-fb');
    if (mid.i) c.text(xa, y + 52, `I = ${mid.i}`, 's-fa');
  }
  if (note) c.text(X0 - 40, B + 34, note, 's-tm', 'start');
  return c.svg(aria);
}

/* empilha figuras (canvases) na vertical com um título pequeno opcional */
export function embed(parent, child, ox, oy) {
  parent.b.push(`<g transform="translate(${f(ox)} ${f(oy)})">${child.b.join('')}</g>`);
  parent.grow(child.minX + ox, child.minY + oy); parent.grow(child.maxX + ox, child.maxY + oy);
}
export function stack(parts, aria, gap = 40) {
  const c = new Canvas();
  let y = 0;
  for (const p of parts) {
    if (p.title) { c.text(0, y, p.title, 's-tm', 'start'); y += 22; }
    const ch = p.c; embed(c, ch, -ch.minX + (p.dx || 0), y - ch.minY);
    y += ch.maxY - ch.minY + gap;
  }
  return c.svg(aria);
}
export function side(parts, aria, gap = 40) {
  const c = new Canvas();
  let x = 0;
  for (const p of parts) {
    if (p.title) c.text(x, -6, p.title, 's-tm', 'start');
    const ch = p.c; embed(c, ch, x - ch.minX, 12 - ch.minY);
    x += ch.maxX - ch.minX + gap;
  }
  return c.svg(aria);
}

/* ----- trifásico: três linhas horizontais (A, B, C e, se houver, N) e a carga em estrela (Y), triângulo (D) ou motor (M) -----
   o: { load: 'Y'|'D'|'M', Z: [el, el, el] (Y: A, B, C; D: AB, BC, CA; M: [el] caixa), neutral: { i }|null, Il: [3 correntes de linha]|null,
        vl: texto acima das linhas (tensão de linha), note } */
export function threePhaseC({ load = 'Y', Z, neutral = null, Il = null, vl = null, note = null }) {
  const c = new Canvas(), ys = [0, 100, 200], YN = 290, X0 = 0, names = ['A', 'B', 'C'];
  ys.forEach((y, k) => { c.open(X0, y); c.text(X0 - 10, y + 4, names[k], 's-ts', 'end'); });
  if (neutral) { c.open(X0, YN); c.text(X0 - 10, YN + 4, 'N', 's-ts', 'end'); }
  if (vl) c.text(X0 - 4, -52, vl, 's-fb', 'start');
  const stub = (y, x1) => { c.wire([[X0, y], [x1, y]]); };
  const iL = y => { return 0; };
  if (load === 'Y') {
    ys.forEach((y, k) => { stub(y, 150); branch(c, [150, y], [330, y], Z[k], -1); });
    c.wire([[330, 0], [330, 200]]); c.dot(330, 100);
    if (neutral) { c.wire([[330, 100], [330, YN]]); c.wire([[X0, YN], [330, YN]]); c.dot(330, YN); c.text(60, YN - 12, neutral.i ? `IN = ${neutral.i}` : 'neutro', 's-fa', 'start'); if (neutral.i) c.arrow(150, YN, 180, 's-f-pa'); }
  } else if (load === 'D') {
    const xs = [260, 370, 480];
    c.wire([[X0, 0], [xs[2], 0]]); c.wire([[X0, 100], [xs[1], 100]]); c.wire([[X0, 200], [xs[2], 200]]);
    branch(c, [xs[0], 0], [xs[0], 100], Z[0], 1); branch(c, [xs[1], 100], [xs[1], 200], Z[1], -1); branch(c, [xs[2], 200], [xs[2], 0], Z[2], 1);
    [[xs[0], 0], [xs[0], 100], [xs[1], 100], [xs[1], 200], [xs[2], 200], [xs[2], 0]].forEach(p => c.dot(p[0], p[1]));
  } else {
    ys.forEach(y => stub(y, 190));
    c.raw('<rect class="s-comp" x="190" y="-20" width="100" height="240"/>'); c.grow(190, -20); c.grow(290, 220);
    c.text(240, 108, 'M 3~', 's-tl'); (Z[0].n || []).forEach((t, k) => c.text(240, 134 + 16 * k, t, 's-tm'));
    if (Z[0].l) c.text(240, 88, Z[0].l, 's-ts');
  }
  if (Il) ys.forEach((y, k) => { if (Il[k]) { c.text(66, y - 14, `I${names[k]} = ${Il[k]}`, 's-fa', 'start'); c.arrow(40, y, 0, 's-f-pa'); } });
  if (note) c.text(X0 - 20, (neutral ? YN : 200) + 40, note, 's-tm', 'start');
  return c;
}
export const threePhase = (o, aria) => threePhaseC(o).svg(aria);

/* ----- método dos dois wattímetros (carga trifásica a três fios): W1 na linha A, W2 na linha B, bobinas de tensão na linha C ----- */
export function twoWatt({ W1, W2, vl, motor = ['M 3~'], notes = [], aria }) {
  const c = new Canvas(), ys = [0, 100, 200], N = ['A', 'B', 'C'];
  ys.forEach((y, k) => { c.open(0, y); c.text(-10, y + 4, N[k], 's-ts', 'end'); });
  if (vl) c.text(-4, -52, vl, 's-fb', 'start');
  c.wire([[0, 0], [72, 0]]); c.sym({ t: 'wat' }, 100, 0, 0); c.wire([[128, 0], [250, 0]]);
  c.wire([[0, 100], [132, 100]]); c.sym({ t: 'wat' }, 160, 100, 0); c.wire([[188, 100], [250, 100]]);
  c.wire([[0, 200], [250, 200]]);
  c.wire([[100, 15], [100, 200]], 's-dash s-mut'); c.wire([[160, 115], [160, 200]], 's-dash s-mut'); c.dot(100, 200); c.dot(160, 200);
  c.text(100, -24, `W₁ = ${W1}`, 's-fa'); c.text(160, 76, `W₂ = ${W2}`, 's-fa');
  c.raw('<rect class="s-comp" x="250" y="-20" width="90" height="240"/>'); c.grow(250, -20); c.grow(340, 220);
  motor.forEach((t, k) => c.text(295, 100 + 20 * k, t, k ? 's-tm' : 's-tl'));
  notes.forEach((t, k) => c.text(-20, 262 + 20 * k, t, 's-tm', 'start'));
  return c.svg(aria);
}

/* ----- transformador de dois enrolamentos: bobinas primária (esquerda) e secundária (direita) com o núcleo entre elas.
   Liga os terminais de y0 a y1 e devolve {px, sx} (x do primário e do secundário). Não desenha fios além das bobinas. ----- */
export function xfmr(c, cx, y0, y1, { p = '', s = '' } = {}) {
  const px = cx - 30, sx = cx + 30, ym = (y0 + y1) / 2;
  [px, sx].forEach(x => { c.wire([[x, y0], [x, ym - 28]]); c.sym({ t: 'L' }, x, ym, 90); c.wire([[x, ym + 28], [x, y1]]); });
  c.wire([[cx - 4, ym - 36], [cx - 4, ym + 36]]); c.wire([[cx + 4, ym - 36], [cx + 4, ym + 36]]);
  if (p) c.text(px - 22, ym + 4, p, 's-tm', 'end');
  if (s) c.text(sx + 22, ym + 4, s, 's-tm', 'start');
  return { px, sx, ym };
}

/* ----- ponte retificadora a diodos (monofásica ou trifásica) com as cargas em paralelo entre os trilhos ----- */
export function rectBridge({ phases = 3, src = null, loads = [], notes = [], aria }) {
  const c = new Canvas(), YT = 0, YB = 200;
  const legs = phases === 3 ? [[150, 70], [230, 100], [310, 130]] : [[150, 70], [230, 130]];
  const xEnd = legs[legs.length - 1][0] + 60 + 90 * loads.length;
  c.wire([[legs[0][0] - 10, YT], [xEnd, YT]]); c.wire([[legs[0][0] - 10, YB], [xEnd, YB]]);
  c.text(legs[0][0] - 16, YT - 10, '+', 's-ts', 'end'); c.text(legs[0][0] - 16, YB + 16, '−', 's-ts', 'end');
  legs.forEach(([x, ym], k) => {
    c.sym({ t: 'D' }, x, (YT + ym) / 2, -90); c.wire([[x, YT], [x, YT + (ym - YT) / 2 - 28]]); c.wire([[x, (YT + ym) / 2 + 28], [x, ym]]);
    c.sym({ t: 'D' }, x, (ym + YB) / 2, -90); c.wire([[x, (ym + YB) / 2 - 28], [x, ym]]); c.wire([[x, (ym + YB) / 2 + 28], [x, YB]]);
    c.dot(x, YT); c.dot(x, YB); c.dot(x, ym);
  });
  if (phases === 3) { ['A', 'B', 'C'].forEach((n, k) => { c.open(0, legs[k][1]); c.text(-10, legs[k][1] + 4, n, 's-ts', 'end'); c.wire([[0, legs[k][1]], [legs[k][0], legs[k][1]]]); }); }
  else {
    c.sym(src || { t: 'AC' }, 40, 100, 90); c.label(src || { t: 'AC' }, 40, 100, true, 'l');
    c.wire([[40, 72], [40, 70], [legs[0][0], 70]]); c.wire([[40, 128], [40, 130], [legs[1][0], 130]]);
  }
  let x = legs[legs.length - 1][0] + 70;
  loads.forEach(e => {
    x += 20; c.wire([[x, YT], [x, 100 - 28]]); c.sym(e, x, 100, 90); c.label(e, x, 100, true, 'r'); c.wire([[x, 128], [x, YB]]); c.dot(x, YT); c.dot(x, YB);
    const ls = [e.l && e.v ? `${e.l} = ${e.v}` : (e.l || e.v || ''), e.i ? `I = ${e.i}` : '', e.u ? `U = ${e.u}` : '', ...(e.n || [])];
    x += Math.max(70, 40 + 7.3 * Math.max(...ls.map(t => t.length)));
    if (x > xEnd) { c.wire([[xEnd, YT], [x, YT]]); c.wire([[xEnd, YB], [x, YB]]); }
  });
  notes.forEach((n, k) => c.text(-20, YB + 44 + 18 * k, n, 's-tm', 'start'));
  return c.svg(aria);
}


/* ----- amplificador operacional: triângulo com entradas − (em cima) e + (embaixo); devolve os pontos dos pinos ----- */
export function opamp(c, cx, cy) {
  c.raw(`<path class="s-comp" d="M${cx - 40} ${cy - 44} L${cx - 40} ${cy + 44} L${cx + 40} ${cy} Z"/>`); c.grow(cx - 40, cy - 44); c.grow(cx + 40, cy + 44);
  c.text(cx - 31, cy - 15, '−', 's-ts', 'start'); c.text(cx - 31, cy + 29, '+', 's-ts', 'start');
  return { inv: [cx - 40, cy - 22], non: [cx - 40, cy + 22], out: [cx + 40, cy] };
}
/* ----- transistor bipolar NPN: base à esquerda, coletor em cima, emissor embaixo (com seta) ----- */
export function npn(c, cx, cy) {
  c.raw(`<circle class="s-comp" cx="${cx + 4}" cy="${cy}" r="30"/>`); c.grow(cx - 30, cy - 34); c.grow(cx + 34, cy + 34);
  c.wire([[cx - 34, cy], [cx - 8, cy]]); c.wire([[cx - 8, cy - 18], [cx - 8, cy + 18]], 's-wire s-ink s-thick');
  c.wire([[cx - 8, cy - 8], [cx + 14, cy - 28], [cx + 14, cy - 40]]); c.wire([[cx - 8, cy + 8], [cx + 14, cy + 28], [cx + 14, cy + 40]]);
  c.arrow(cx + 7, cy + 21, 40, 's-f-ink');
  return { b: [cx - 34, cy], c: [cx + 14, cy - 40], e: [cx + 14, cy + 40] };
}

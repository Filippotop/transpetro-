/* Figuras das contas (parte 7): contas vindas de provas reais (queda-unit, soma-senoides, bateria, pico-eficaz); ver js/contas-fig.js e js/contas-fig5.js */
(function (W) {
  'use strict';
  var H = W.CONTASFIG.H, reg = W.CONTASFIG.reg, reg2 = W.CONTASFIG.reg2, g = H.g;
  var A = function (s) { return s ? ' data-s="' + s + '"' : ''; };
  var f1 = function (x) { return Number(x).toFixed(1); };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  function rect(x, y, w, h, cls, s, st) {
    return '<rect class="' + cls + '" x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(Math.max(0, w)) + '" height="' + f1(Math.max(0, h)) + '" rx="3"' + (st ? ' style="' + st + '"' : '') + A(s) + '/>';
  }
  /* Treinar: contorno tracejado de tamanho FIXO, com texto opcional (nunca o resultado) */
  function ph(x, y, w, h, s, txt) {
    return '<rect x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(w) + '" height="' + f1(h) + '" rx="3" stroke-dasharray="4 3"' + A(s) + ' style="fill:none;stroke:var(--muted);stroke-width:1.5"/>'
      + (txt ? H.t(x + w / 2, y + h / 2 + 4, txt, { c: 'tm', s: s }) : '');
  }
  var aviso = function (x, y, s, txt, a) { return '<text x="' + x + '" y="' + y + '" text-anchor="' + (a || 'middle') + '" class="tm"' + A(s) + ' style="fill:var(--bad)">' + txt + '</text>'; };

  /* ---------- queda de tensão unitária (Transpetro 2023, q. 45) ---------- */
  reg('queda-unit', function (v, k) {
    var B = H, I = v.S / v.V, dm = v.pc / 100 * v.V, Lkm = dm / (v.dVu * I), Lm = Lkm * 1000, out = '';
    var xS = 70, xC = 300, yT = 40, yB = 132;
    out += B.w([[xS, 64], [xS, yT], [xC, yT], [xC, 58]], { c: 'hot', s: '1' }) + B.w([[xC, 102], [xC, yB], [xS, yB], [xS, 96]], { c: 'hot', s: '1' });
    out += B.ac(xS, 80, 'V', g(v.V) + ' V', '2');
    out += B.res(xC, 80, 'v', '', '', '1');
    out += B.t(284, 100, 'equipamento', { a: 'end', s: '1' }) + B.t(284, 118, 'S = ' + g(v.S) + ' VA', { a: 'end', c: 'tm', s: '1' });
    out += B.t(92, 62, 'cabo de ida e volta', { a: 'start', c: 'tm', s: '3' }) + B.t(92, 80, 'ΔV_u = ' + g(v.dVu) + ' V/(A·km)', { a: 'start', c: 'tm', s: '3' });
    out += B.arrow(130, 28, 190, 28, { s: '1' }) + B.t(160, 20, 'I = ' + B.ans(k, g(I) + ' A'), { c: 'tg', s: '1' });
    /* cota do comprimento L (do cabo) */
    out += B.line(xS, 138, xS, 172, { d: '3 3', c: 'dim' }) + B.line(xC, 138, xC, 172, { d: '3 3', c: 'dim' });
    out += B.arrow(150, 162, xS, 162, { s: '3' }) + B.arrow(222, 162, xC, 162, { s: '3' }) + B.t(186, 166, 'L', { c: 'tg', s: '3' });
    /* régua de conversão km → m */
    if (k.ver) {
      out += rect(30, 184, 120, 28, 'bar', '3', '') + rect(210, 184, 120, 28, 'bar ok', '4', '');
      out += B.t(90, 203, g(Lkm) + ' km', { c: 'tg', s: '3' }) + B.t(270, 203, g(Lm) + ' m', { c: 'tg', s: '4' });
    } else {
      out += ph(30, 184, 120, 28, '3', 'L = ? km') + ph(210, 184, 120, 28, '4', 'L = ? m');
    }
    out += B.arrow(156, 204, 204, 204, { s: '4' }) + B.t(180, 196, '× 1000', { c: 'tm', s: '4' });
    out += aviso(180, 236, '4', '⚠ queda unitária é por km: converta km → m');
    /* barras de tensão: a faixa de queda máxima é dado (pc %), pode ser à escala */
    var x0 = 30, Wd = 300, seg = clamp(Wd * v.pc / 100, 5, 150);
    out += B.t(x0, 262, 'tensão da fonte: ' + g(v.V) + ' V', { a: 'start', c: 'tm', s: '2' }) + B.bar(x0, 268, Wd, 12, 1, '', '2');
    out += B.t(x0, 304, 'tensão na carga', { a: 'start', c: 'tm', s: '2' }) + B.t(x0 + Wd, 304, 'queda máx. ' + g(v.pc) + ' %', { a: 'end', c: 'tm', s: '2' });
    out += rect(x0, 310, Wd - seg, 12, 'bar ok', '2') + rect(x0 + Wd - seg, 310, seg, 12, 'bar bad', '2');
    out += B.t(x0 + Wd, 342, 'ΔV_máx = ' + g(v.pc) + ' % de ' + g(v.V) + ' V = ' + B.ans(k, g(dm) + ' V'), { a: 'end', c: 'tg', s: '2' });
    out += B.flow('M' + xS + ',64 V' + yT + ' H' + xC + ' V' + yB + ' H' + xS + ' V96', B.rate(I, 30), k.anim, 5);
    return B.svg(360, 358, out, 'Fonte de ' + g(v.V) + ' volts alimenta por um cabo de ida e volta um equipamento monofásico de ' + g(v.S) + ' volt-ampères. O cabo tem queda unitária de ' + g(v.dVu) + ' volts por ampère e por quilômetro, e a queda máxima admitida é ' + g(v.pc) + ' por cento. O comprimento sai em quilômetros e depois é multiplicado por mil para dar metros. A queda unitária é por quilômetro: converta.');
  });

  /* ---------- soma de duas senóides (Transpetro 2023, q. 48) ---------- */
  function somaDados(v) {
    var r = v.d * Math.PI / 180, c = Math.round(Math.cos(r) * 1e9) / 1e9, s = Math.round(Math.sin(r) * 1e9) / 1e9;
    var x = v.A + v.B * c, y = v.B * s;
    return { x: x, y: y, Vp: Math.sqrt(x * x + y * y), ph: Math.atan2(y, x) * 180 / Math.PI, c: c, s: s };
  }
  reg('soma-senoides', function (v, k) {
    var B = H, D = somaDados(v), tot = v.A + v.B, sc = 46 / tot, x0 = 64, w = 280, y1 = 64, y2 = 238, out = '';
    out += B.eixos(x0, y1, w, 46, '');
    out += B.onda(x0, y1, w, v.A * sc, 0, 2, 'hot', k.anim, { s: '1' }) + B.onda(x0, y1, w, v.B * sc, -v.d, 2, 'b', k.anim, { s: '1' });
    out += B.leg(24, 126, 'hot', 'v_1 = ' + g(v.A) + '·sen(ωt)', '1') + B.leg(24, 144, 'b', 'v_2 = ' + g(v.B) + '·sen(ωt + ' + g(v.d) + '°)', '1');
    out += B.leg(24, 166, 'c', 'v_1 + v_2: pico = ' + B.ans(k, g(D.Vp) + ' V'), '3');
    if (k.ver) {
      out += B.eixos(x0, y2, w, 46, '');
      var am = D.Vp * sc;
      out += B.onda(x0, y2, w, am, -D.ph, 2, 'c', k.anim, { s: '3' });
      out += B.line(x0, y2 - am, x0 + w, y2 - am, { d: '4 4', c: 'dim', s: '3' }) + B.t(x0 - 4, y2 - am + 4, 'V_p', { a: 'end', c: 'tm', s: '3' });
    } else {
      out += ph(x0, y2 - 46, w, 92, '3', 'v_1 + v_2 = ?  (fora de escala)');
    }
    return B.svg(360, 298, out, 'Duas tensões senoidais de mesma frequência: v1 com pico de ' + g(v.A) + ' volts e v2 com pico de ' + g(v.B) + ' volts adiantada de ' + g(v.d) + ' graus, e abaixo a onda da soma. O pico da soma não é a soma dos picos: depende da defasagem.');
  });
  reg2('soma-senoides', function (v, k) {
    var B = H, D = somaDados(v), tot = v.A + v.B, cx = 90, cy = 112, R = 70, l1 = R * v.A / tot, l2 = R * v.B / tot, out = '';
    var ex = cx + l1 + l2 * D.c, ey = cy - l2 * D.s;
    out += B.t(180, 18, 'Fasores: soma ponta com cauda', { c: 'tg' });
    out += '<circle class="w dim" cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none"/>' + B.line(cx - R - 4, cy, cx + R + 4, cy, { c: 'dim' }) + B.line(cx, cy - R - 4, cx, cy + R + 4, { c: 'dim' });
    out += '<g>' + B.arrow(cx, cy, cx + l1, cy, { s: '1' }) + B.arrow(cx + l1, cy, ex, ey, { c: 'b', s: '1' });
    if (k.ver) out += B.arrow(cx, cy, ex, ey, { c: 'c', s: '3' });
    if (k.anim) out += '<animateTransform attributeName="transform" type="rotate" from="0 ' + cx + ' ' + cy + '" to="-360 ' + cx + ' ' + cy + '" dur="' + B.T + 's" repeatCount="indefinite"/>';
    out += '</g>';
    if (v.d === 90) {
      var sc2 = 80 / Math.max(v.A, v.B), a = Math.max(6, v.A * sc2), b = Math.max(6, v.B * sc2), p0 = 222, p1 = p0 + a, yb = 150;
      out += B.arrow(p0, yb, p1, yb, { s: '2' }) + B.arrow(p1, yb, p1, yb - b, { c: 'b', s: '2' });
      out += '<path class="w dim" d="M' + (p1 - 8) + ' ' + yb + ' v-8 h8"/>';
      out += B.t(p0 + a / 2, 168, 'V_1 = ' + g(v.A) + ' V', { c: 'tm', s: '2' }) + B.t(p1, yb - b - 8, 'V_2 = ' + g(v.B) + ' V', { c: 'tm', s: '2' });
      if (k.ver) out += B.arrow(p0, yb, p1, yb - b, { c: 'c', s: '3' }) + B.t(p0 + a / 2 - 6, yb - b / 2 - 4, 'V_p = ' + g(D.Vp) + ' V', { a: 'end', c: 'tm', s: '3' });
      else out += B.t(285, 44, 'hipotenusa: V_p = ?', { c: 'tm', s: '3' });
    } else {
      out += B.t(268, 80, 'lei dos cossenos:', { c: 'tm' }) + B.t(268, 100, 'V_p² = A² + B²', { c: 'tm', s: '3' }) + B.t(268, 118, '+ 2·A·B·cos δ', { c: 'tm', s: '3' });
      out += B.t(268, 140, 'δ = ' + g(v.d) + '°', { c: 'tm', s: '1' });
    }
    out += B.leg(14, 206, '', 'V_1 = ' + g(v.A) + ' ∠ 0°', '1') + B.leg(124, 206, 'b', 'V_2 = ' + g(v.B) + ' ∠ ' + g(v.d) + '°', '1') + B.leg(248, 206, 'c', 'soma: ' + B.ans(k, g(D.Vp) + ' V'), '3');
    return B.svg(360, 220, out, 'Fasores: V1 de ' + g(v.A) + ' volts na referência e V2 de ' + g(v.B) + ' volts a ' + g(v.d) + ' graus, desenhados ponta com cauda girando juntos. O fasor soma é o pico da tensão somada. Com 90 graus formam um triângulo retângulo.');
  });

  /* ---------- resistência interna de uma bateria (Transpetro 2023, q. 49) ---------- */
  reg('bateria', function (v, k) {
    var B = H, r = (v.V1 - v.V2) / (v.I2 - v.I1), E0 = v.V1 + r * v.I1; v = { E: E0, V: v.V1, I: v.I1, V2: v.V2, I2: v.I2 }; /* mostra a 1ª leitura; E sai das duas */
    var qd = v.E - v.V, out = '', yT = 72, yB = 178;
    /* bateria real: E em série com r, dentro de um retângulo tracejado */
    out += '<rect x="12" y="36" width="158" height="170" rx="6" fill="none" stroke-dasharray="5 4" style="stroke:var(--muted);stroke-width:1.5"/>';
    out += B.t(91, 198, 'bateria real', { c: 'tm' });
    out += B.w([[80, 118], [80, yT], [96, yT]], { c: 'hot', s: '1' }) + B.w([[140, yT], [170, yT]], { c: 'hot', s: '1' });
    out += B.w([[80, 132], [80, yB], [170, yB]], { c: 'hot', s: '1' });
    out += B.bat(80, 125, 'E', k.ver ? g(v.E) + ' V' : '?', '1');
    out += B.res(118, yT, 'h', 'r = ' + B.ans(k, g(r) + ' Ω'), 'E − V = ' + B.ans(k, g(qd) + ' V'), '1 2');
    /* circuito externo: voltímetro nos terminais, amperímetro em série, resistor variável */
    out += B.w([[170, yT], [228, yT]], { c: 'hot' }) + B.w([[252, yT], [280, yT], [280, 93]], { c: 'hot', s: '2' });
    out += B.w([[280, 137], [280, yB], [170, yB]], { c: 'hot' });
    out += B.w([[190, yT], [190, 113]], { c: 'hot', s: '3' }) + B.w([[190, 137], [190, yB]], { c: 'hot', s: '3' }) + B.node(190, yT) + B.node(190, yB);
    out += '<circle class="sh" cx="190" cy="125" r="12"/>' + B.t(190, 130, 'V') + B.t(203, 122, 'V = ' + g(v.V) + ' V', { a: 'start', c: 'tm', s: '3' }) + B.t(203, 140, 'terminais', { a: 'start', c: 'tm' });
    out += '<circle class="sh" cx="240" cy="' + yT + '" r="12"/>' + B.t(240, yT + 5, 'A') + B.t(240, 50, 'I = ' + g(v.I) + ' A', { c: 'tg', s: '2' }) + B.arrow(256, yT - 12, 274, yT - 12, { s: '2' });
    out += B.res(280, 115, 'v', 'R', 'variável', '3') + B.arrow(266, 146, 294, 84, { c: 'k' });
    out += B.flow('M80,118 V' + yT + ' H280 V' + yB + ' H80 V132', B.rate(v.I, 6), k.anim, 6);
    var h = 214;
    if (k.ver) {
      var x0 = 30, Wd = 300, seg = clamp(Wd * qd / v.E, 5, Wd), wv = Wd - seg;
      out += B.t(x0, 232, 'E, sem carga: ' + B.ans(k, g(v.E) + ' V'), { a: 'start', c: 'tm', s: '1' }) + B.bar(x0, 238, Wd, 12, 1, '', '1');
      out += B.t(x0, 272, 'V nos terminais: ' + g(v.V) + ' V', { a: 'start', c: 'tm', s: '3' });
      out += rect(x0, 278, wv, 12, 'bar ok', '3') + rect(x0 + wv, 278, seg, 12, 'bar bad', '1 2');
      out += B.t(x0 + Wd, 310, 'queda interna E − V = ' + g(qd) + ' V', { a: 'end', c: 'tg', s: '1 2' });
      h = 326;
    }
    return B.svg(360, h, out, 'Bateria real: fonte ideal E em série com a resistência interna r, dentro de um retângulo tracejado. Ligada a um resistor variável, com um amperímetro em série e um voltímetro nos terminais (mostra a 1ª leitura: ' + g(v.I) + ' ampères e ' + g(v.V) + ' volts). A tensão que falta, E menos V, cai dentro da bateria, em r.');
  });

  /* ---------- valor eficaz, de pico e pico a pico ---------- */
  reg('pico-eficaz', function (v, k) {
    var B = H, Vp = Math.SQRT2 * v.Vef, x0 = 100, w = 216, y0 = 110, amp = 72, out = '';
    var yef = y0 - amp * (k.ver ? Math.SQRT1_2 : 0.6);
    out += B.t(180, 18, 'Tensão senoidal: eficaz, pico, pico a pico', { c: 'tg' });
    out += B.eixos(x0, y0, w, amp, '');
    out += B.line(x0, y0 - amp, x0 + w, y0 - amp, { d: '4 4', c: 'dim', s: '2' }) + B.line(x0, y0 + amp, x0 + w, y0 + amp, { d: '4 4', c: 'dim', s: '2' });
    out += B.line(x0, yef, x0 + w, yef, { d: '6 3', c: 'hot', s: '1' });
    out += B.onda(x0, y0, w, amp, 0, 2, 'hot', k.anim, { s: '2' });
    out += B.t(96, y0 - amp + 4, 'V_p = ' + B.ans(k, g(Vp) + ' V'), { a: 'end', c: 'tm', s: '2' });
    out += B.t(96, yef + 4, 'V_ef = ' + g(v.Vef) + ' V', { a: 'end', c: 'tg', s: '1' });
    out += B.t(96, y0 + amp + 4, '−V_p', { a: 'end', c: 'tm', s: '2' });
    /* cota pico a pico */
    out += B.arrow(328, y0, 328, y0 - amp, { s: '3' }) + B.arrow(328, y0, 328, y0 + amp, { s: '3' }) + B.t(334, y0 + 4, 'V_pp', { a: 'start', c: 'tm', s: '3' });
    out += B.t(180, 206, 'V_pp = 2·V_p = ' + B.ans(k, g(2 * Vp) + ' V'), { c: 'tg', s: '3' });
    out += B.t(180, 230, k.ver ? 'eficaz < pico < pico a pico' : 'eficaz < pico (marcas fora de escala)', { c: 'tm', s: '1' });
    return B.svg(360, 242, out, 'Onda senoidal com valor eficaz de ' + g(v.Vef) + ' volts: o pico é √2 vezes maior, o pico a pico é o dobro do pico, e a linha tracejada do eficaz fica abaixo do pico.');
  });
})(window);

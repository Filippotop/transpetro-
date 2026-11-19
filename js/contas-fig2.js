/* Figuras das contas (parte 2): fio, chuveiro, divisor, custo, impedancia, triangulo, fp, trifasica. Ver js/contas-fig.js */
(function (W) {
  'use strict';
  var H = W.CONTASFIG.H, reg = W.CONTASFIG.reg, g = H.g;
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  var rad = Math.PI / 180;
  var rs = function (x) { return 'R$ ' + Number(x).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var f1 = function (x) { return Number(x).toLocaleString('pt-BR', { maximumFractionDigits: 1 }); };
  var P = function (a, b) { return a.toFixed(1) + ',' + b.toFixed(1); };

  /* ---------- fio: R = ρ·L/S ---------- */
  reg('fio', function (v, k) {
    var B = H, R = v.rho * v.L / v.S, out = '';
    var cy = 100, th = clamp(12 + 8 * Math.sqrt(Math.max(v.S, 0)), 14, 56), len = 70 + 210 * clamp(v.L, 0, 300) / 300;
    var x0 = 40, x1 = x0 + len, top = cy - th / 2, bot = cy + th / 2;
    out += B.w([[8, cy], [x0, cy]], { c: 'hot' }) + B.w([[x1, cy], [352, cy]], { c: 'hot' });
    out += '<g data-s="2"><rect class="sh" x="' + x0 + '" y="' + top + '" width="' + len + '" height="' + th + '"/>'
      + '<ellipse class="sh" cx="' + x0 + '" cy="' + cy + '" rx="7" ry="' + th / 2 + '"/>'
      + '<ellipse class="sh" cx="' + x1 + '" cy="' + cy + '" rx="7" ry="' + th / 2 + '" style="fill:var(--gold);fill-opacity:.45"/></g>';
    var cx = clamp(x1, 100, 325);
    out += B.line(x1, top - 2, x1, 44, { c: 'dim', s: '1' }) + B.t(cx, 36, 'seção S', { c: 'tm', s: '1' });
    var yc = bot + 20;
    out += B.arrow((x0 + x1) / 2, yc, x0, yc, { s: '1' }) + B.arrow((x0 + x1) / 2, yc, x1, yc, { s: '1' });
    out += B.line(x0, bot + 8, x0, yc + 6, { c: 'dim' }) + B.line(x1, bot + 8, x1, yc + 6, { c: 'dim' });
    out += B.t((x0 + x1) / 2, yc + 22, 'L = ' + g(v.L) + ' m', { s: '1' });
    var r = clamp(th / 2, 8, 28), cy2 = 212;
    out += '<circle class="sh" cx="48" cy="' + cy2 + '" r="' + r + '" style="fill:var(--gold);fill-opacity:.45" data-s="1"/>';
    out += B.t(86, cy2 - 4, 'S = ' + g(v.S) + ' mm²', { a: 'start', s: '1' }) + B.t(86, cy2 + 14, 'ρ = ' + g(v.rho) + ' Ω·mm²/m', { a: 'start', c: 'tm', s: '1' });
    out += B.t(180, 262, 'R = ρ·L / S = ' + B.ans(k, g(R) + ' Ω'), { c: 'tg', s: '2 3' });
    out += B.t(180, 282, 'mais longo: mais R · mais grosso: menos R', { c: 'tm' });
    var rate = 0.5, d = function (o) { return 'M' + x0 + ',' + (cy + o) + ' H' + x1; };
    out += B.flow('M8,' + cy + ' H352', rate, k.anim, 5) + (th > 30 ? B.flow(d(-th / 4), rate, k.anim, 3) + B.flow(d(th / 4), rate, k.anim, 3) : '');
    return B.svg(360, 292, out, 'Fio cilíndrico de ' + g(v.L) + ' metros de comprimento e seção de ' + g(v.S) + ' milímetros quadrados, resistividade ' + g(v.rho) + ' ohm milímetro quadrado por metro. Quanto mais comprido, maior a resistência; quanto mais grosso, menor. R = ρ·L/S.');
  });

  /* ---------- chuveiro: mesma R em V1 e V2 ---------- */
  reg('chuveiro', function (v, k) {
    var B = H, R = v.V1 * v.V1 / v.P1, P2 = v.V2 * v.V2 / R, I1 = v.V1 / R, I2 = v.V2 / R, mx = Math.max(I1, I2), out = '';
    var rz = g(R) + ' Ω', Rtxt = B.ans(k, rz);
    function col(ax, rx, tit, V, I, sub, st) {
      var s = B.w([[ax, 84], [ax, 56], [rx, 56], [rx, 78]], { c: 'hot' }) + B.w([[rx, 122], [rx, 150], [ax, 150], [ax, 116]], { c: 'hot' });
      s += B.ac(ax, 100) + B.res(rx, 100, 'v', '', '', '1');
      s += B.t((ax + rx) / 2, 16, tit + ' = ' + g(V) + ' V', { s: st }) + B.t((ax + rx) / 2, 34, sub, { c: 'tm' });
      s += B.t((ax + rx) / 2, 104, 'R = ' + Rtxt, { c: 'tm', s: '1' });
      s += B.flow('M' + ax + ',100 V56 H' + rx + ' V150 H' + ax + ' V104', B.rate(I / mx * 5, 5), k.anim, 4);
      return s;
    }
    out += col(40, 140, 'V_1', v.V1, I1, 'plaqueta', '1') + col(220, 320, 'V_2', v.V2, I2, 'ligado', '2');
    var base = 282, hm = 100, mxP = Math.max(v.P1, P2), h1 = hm * v.P1 / mxP, h2 = hm * P2 / mxP;
    function bar(cx, h, cls, s) {
      var a = k.anim ? '<animate attributeName="height" from="0" to="' + h.toFixed(1) + '" dur="0.8s" fill="freeze"/><animate attributeName="y" from="' + base + '" to="' + (base - h).toFixed(1) + '" dur="0.8s" fill="freeze"/>' : '';
      return '<rect class="bar' + (cls ? ' ' + cls : '') + '" x="' + (cx - 25) + '" y="' + (base - h).toFixed(1) + '" width="50" height="' + h.toFixed(1) + '" rx="3" data-s="' + s + '">' + a + '</rect>';
    }
    out += B.line(20, base, 340, base, { c: 'dim' });
    out += bar(85, h1, 'dim', '1') + bar(275, h2, '', '2');
    out += B.t(85, base - h1 - 8, 'P_1 = ' + g(v.P1) + ' W', { s: '1' }) + B.t(275, base - h2 - 8, 'P_2 = ' + B.ans(k, g(P2) + ' W'), { c: 'tg', s: '2' });
    out += B.t(180, 218, '(V_2/V_1)²', { c: 'tm', s: '3' }) + B.t(180, 242, '= ' + B.ans(k, g(v.V2 * v.V2 / (v.V1 * v.V1))), { s: '3' });
    out += B.arrow(125, 256, 235, 256, { s: '3' });
    return B.svg(360, 296, out, 'Dois circuitos com a mesma resistência: à esquerda ligado em ' + g(v.V1) + ' volts com ' + g(v.P1) + ' watts; à direita ligado em ' + g(v.V2) + ' volts, onde a potência muda com o quadrado da razão das tensões. A corrente é menor no circuito de menor tensão.');
  });

  /* ---------- divisor de tensão ---------- */
  reg('divisor', function (v, k) {
    var B = H, Rt = v.R1 + v.R2, I = v.V / Rt, out = '';
    out += B.w([[75, 84], [75, 40], [108, 40]], { c: 'hot' }) + B.w([[152, 40], [270, 40], [270, 78]], { c: 'hot' }) + B.w([[270, 122], [270, 160], [75, 160], [75, 112]], { c: 'hot' });
    out += B.bat(75, 98, 'V', g(v.V) + ' V', '2');
    out += B.res(130, 40, 'h', 'R_1', g(v.R1) + ' Ω', '1') + B.res(270, 100, 'v', 'R_2', g(v.R2) + ' Ω', '1');
    out += B.w([[270, 58], [215, 58], [215, 88]], { c: 'dim', s: '3' }) + B.w([[215, 112], [215, 142], [270, 142]], { c: 'dim', s: '3' });
    out += B.node(270, 58) + B.node(270, 142);
    out += '<g data-s="3"><circle class="sh" cx="215" cy="100" r="12"/>' + B.t(215, 105, 'V', { c: 'tm' }) + '</g>';
    out += B.t(199, 104, 'V_2', { a: 'end', c: 'tg', s: '3' });
    out += B.arrow(175, 26, 235, 26, { s: '2' }) + B.t(205, 16, 'I = ' + B.ans(k, g(I) + ' A'), { c: 'tg', s: '2' });
    var x0 = 40, w = 280, fw = w * v.R1 / Rt, by = 196;
    out += B.t(x0, by - 8, 'V_1 = ' + B.ans(k, g(I * v.R1) + ' V'), { a: 'start', s: '4' }) + B.t(x0 + w, by - 8, 'V_2 = ' + B.ans(k, g(I * v.R2) + ' V'), { a: 'end', c: 'tg', s: '3 4' });
    out += '<rect class="bar dim" x="' + x0 + '" y="' + by + '" width="' + fw.toFixed(1) + '" height="24" rx="3" data-s="4"/><rect class="bar" x="' + (x0 + fw).toFixed(1) + '" y="' + by + '" width="' + (w - fw).toFixed(1) + '" height="24" rx="3" data-s="3 4"/>';
    out += B.t(180, 250, 'V = ' + g(v.V) + ' V = V_1 + V_2', { c: 'tm', s: '4' });
    out += B.t(180, 270, 'a barra divide na razão ' + g(v.R1) + ' : ' + g(v.R2) + ' (R_1 : R_2)', { c: 'tm', s: '1' });
    out += B.flow('M75,98 V40 H270 V160 H75 V110', 0.5, k.anim, 5);
    return B.svg(360, 282, out, 'Divisor de tensão: fonte de ' + g(v.V) + ' volts com R1 de ' + g(v.R1) + ' ohms em série com R2 de ' + g(v.R2) + ' ohms; um voltímetro mede a tensão em R2. A mesma corrente passa pelos dois, e a tensão se divide na proporção das resistências.');
  });

  /* ---------- custo ---------- */
  reg('custo', function (v, k) {
    var B = H, kW = v.P / 1000, th = v.h * v.d, E = kW * th, custo = E * v.tar, out = '';
    function box(x, y, w, txt, cls, s) { return '<rect class="sh" x="' + x + '" y="' + y + '" width="' + w + '" height="36" rx="5"' + (s ? ' data-s="' + s + '"' : '') + '/>' + B.t(x + w / 2, y + 23, txt, { c: cls || 't', s: s }); }
    out += box(10, 8, 160, 'P = ' + g(v.P) + ' W', 't', '1') + box(190, 8, 160, g(v.h) + ' h/dia', 't', '2');
    out += B.arrow(90, 44, 90, 82, { s: '1' }) + B.t(100, 68, '÷ 1000  (W → kW)', { a: 'start', c: 'tm', s: '1' });
    out += B.arrow(270, 44, 270, 82, { s: '2' }) + B.t(280, 68, '× ' + g(v.d) + ' dias', { a: 'start', c: 'tm', s: '2' });
    out += box(10, 84, 160, 'P = ' + B.ans(k, g(kW) + ' kW'), 't', '1') + box(190, 84, 160, 't = ' + B.ans(k, g(th) + ' h'), 't', '2');
    out += B.arrow(90, 120, 150, 160, { s: '3' }) + B.arrow(270, 120, 210, 160, { s: '3' }) + B.t(180, 146, '×', { c: 't big', s: '3' });
    out += box(80, 162, 200, 'E = P·t = ' + B.ans(k, g(E) + ' kWh'), 'tg', '3');
    out += B.arrow(180, 198, 180, 238, { s: '4' }) + B.t(192, 223, '× ' + rs(v.tar) + '/kWh', { a: 'start', c: 'tm', s: '4' });
    out += box(80, 240, 200, 'Custo = ' + B.ans(k, rs(custo)), 'tg', '4');
    return B.svg(360, 292, out, 'Fluxo da conta de luz: potência de ' + g(v.P) + ' watts, que dividida por mil dá ' + g(kW) + ' quilowatts, vezes ' + g(v.h) + ' horas por dia em ' + g(v.d) + ' dias, igual a ' + g(th) + ' horas, dá a energia em quilowatts-hora; vezes a tarifa de ' + rs(v.tar) + ' por quilowatt-hora dá o custo.');
  });

  /* ---------- impedância RL série ---------- */
  reg('impedancia', function (v, k) {
    var B = H, X = 2 * Math.PI * v.f * v.L, Z = Math.sqrt(v.R * v.R + X * X), I = v.V / Z, fi = Math.atan2(X, v.R) / rad, out = '';
    out += B.w([[40, 76], [40, 44], [66, 44]], { c: 'hot' }) + B.w([[110, 44], [135, 44], [135, 164], [112, 164]], { c: 'hot' }) + B.w([[64, 164], [40, 164], [40, 108]], { c: 'hot' });
    out += B.ac(40, 92) + B.t(40, 126, g(v.V) + ' V', { s: '1' }) + B.t(40, 144, g(v.f) + ' Hz', { c: 'tm', s: '1' });
    out += B.res(88, 44, 'h', 'R', g(v.R) + ' Ω', '2') + B.ind(88, 164, 'L', g(v.L) + ' H', '1');
    out += B.arrow(135, 88, 135, 118, { s: '3' }) + B.t(143, 107, 'I', { a: 'start', c: 'tg', s: '3' });
    out += B.flow('M40,92 V44 H135 V164 H40 V100', B.rate(I, 20), k.anim, 5);
    var y0 = 200, x0 = 205, sc = Math.min(90 / v.R, 100 / X), rl = Math.max(14, v.R * sc), xl = Math.max(14, X * sc);
    var bx = x0 + rl, ty = y0 - xl, zl = Math.hypot(rl, xl), r = Math.min(26, zl * 0.5);
    out += B.line(x0, y0, bx, y0, { c: 'thick', s: '2' }) + B.line(bx, y0, bx, ty, { c: 'thick', s: '1' }) + B.line(x0, y0, bx, ty, { c: 'hot thick', s: '2' });
    out += '<path class="w" d="M' + (x0 + r) + ' ' + y0 + ' A' + r + ' ' + r + ' 0 0 0 ' + P(x0 + r * rl / zl, y0 - r * xl / zl) + '" data-s="4"/>';
    out += B.t(x0 + rl / 2, y0 + 18, 'R = ' + g(v.R) + ' Ω', { s: '2' });
    out += B.t(bx + 8, (y0 + ty) / 2 - 2, 'X_L', { a: 'start', s: '1' }) + B.t(bx + 8, (y0 + ty) / 2 + 16, B.ans(k, g(X) + ' Ω'), { a: 'start', c: 'tm', s: '1' });
    out += B.t(x0 + rl / 2 - 8, (y0 + ty) / 2 - 10, 'Z = ' + B.ans(k, g(Z) + ' Ω'), { a: 'end', c: 'tg', s: '2' });
    out += B.t(x0 + rl / 2, y0 + 38, 'φ = ' + B.ans(k, f1(fi) + '°'), { s: '4' });
    out += B.t(180, 276, 'I = V/Z = ' + (k.ver ? g(v.V) + ' / ' + g(Z) + ' Ω = ' + g(I) + ' A' : '?'), { c: 'tg', s: '3' });
    out += B.ca(298, v.f);
    return B.svg(360, 318, out, 'Circuito RL série com fonte de ' + g(v.V) + ' volts, ' + g(v.f) + ' hertz, resistor de ' + g(v.R) + ' ohms e indutor de ' + g(v.L) + ' henries. À direita, o triângulo de impedâncias: a resistência é um cateto, a reatância indutiva o outro e a impedância Z a hipotenusa, com o ângulo φ.');
  });

  /* ---------- triângulo de potências ---------- */
  reg('triangulo', function (v, k) {
    var B = H, S = v.V * v.I, Pp = S * v.fp, Q = S * Math.sqrt(Math.max(0, 1 - v.fp * v.fp)), fi = Math.acos(clamp(v.fp, 0, 1)), out = '';
    var ox = 70, y0 = 196, sc = Math.min(170 / Pp, 130 / Math.max(Q, 1e-9)), pl = Pp * sc, ql = Math.max(Q * sc, 2), ex = ox + pl, ty = y0 - ql, r = 34;
    out += B.t(180, 20, 'V = ' + g(v.V) + ' V   I = ' + g(v.I) + ' A', { s: '1' });
    out += B.line(ox, y0, ex, y0, { c: 'thick', s: '2 5' }) + B.line(ex, y0, ex, ty, { c: 'thick', s: '3 4 5' }) + B.line(ox, y0, ex, ty, { c: 'hot thick', s: '1 5' });
    out += '<path class="w" d="M' + (ex - 8) + ' ' + y0 + ' v-8 h8" data-s="5"/>';
    out += '<path class="w" d="M' + (ox + r) + ' ' + y0 + ' A' + r + ' ' + r + ' 0 0 0 ' + P(ox + r * Math.cos(fi), y0 - r * Math.sin(fi)) + '" data-s="2"/>';
    if (fi > 0.45) out += B.t(ox + 50 * Math.cos(fi / 2), y0 - 50 * Math.sin(fi / 2) + 4, 'φ', { c: 'tm', s: '2' });
    var mx = (ox + ex) / 2, my = (y0 + ty) / 2;
    out += B.t(mx - 8, my - 6, 'S = ' + B.ans(k, g(S) + ' VA'), { a: 'end', c: 'tg', s: '1' });
    out += B.t(mx, y0 + 18, 'P = ' + B.ans(k, g(Pp) + ' W'), { s: '2' });
    out += B.t(ex + 8, my + 4, 'Q = ' + B.ans(k, g(Q) + ' var'), { a: 'start', s: '4' });
    out += B.t(180, y0 + 44, 'cos φ = P / S = ' + g(v.fp), { c: 'tg', s: '2' });
    out += B.t(180, y0 + 62, 'φ = ' + f1(fi / rad) + '°   (S² = P² + Q²)', { c: 'tm', s: '3 5' });
    return B.svg(360, 270, out, 'Triângulo de potências com tensão de ' + g(v.V) + ' volts, corrente de ' + g(v.I) + ' ampères e fator de potência ' + g(v.fp) + ': a potência ativa P é o cateto horizontal, a reativa Q o vertical, a aparente S a hipotenusa, e o cosseno do ângulo φ é P sobre S.');
  });

  /* ---------- correção do fator de potência ---------- */
  reg('fp', function (v, k) {
    var B = H, f1r = Math.acos(v.fp1), f2r = Math.acos(v.fp2), t1 = Math.tan(f1r), t2 = Math.tan(f2r), Qc = v.P * (t1 - t2), out = '';
    out += B.w([[40, 20], [230, 20]], { c: 'hot' }) + B.w([[40, 80], [230, 80]], { c: 'hot' }) + B.w([[40, 20], [40, 34]], { c: 'hot' }) + B.w([[40, 66], [40, 80]], { c: 'hot' });
    out += B.w([[120, 20], [120, 28]], { c: 'hot' }) + B.w([[120, 72], [120, 80]], { c: 'hot' }) + B.w([[230, 20], [230, 45]], { c: 'hot', s: '4' }) + B.w([[230, 55], [230, 80]], { c: 'hot', s: '4' });
    out += B.node(120, 20) + B.node(120, 80) + B.ac(40, 50) + B.res(120, 50, 'v', 'carga', 'P = ' + g(v.P) + ' kW', '1') + B.cap(230, 50, 'v', 'banco', 'Q_c = ' + B.ans(k, g(Qc) + ' kvar'), '4');
    var ox = 50, y0 = 222, sc = Math.min(150 / v.P, 100 / (v.P * t1)), pl = v.P * sc, q1 = v.P * t1 * sc, q2 = v.P * t2 * sc, ex = ox + pl, r1 = 60, r2 = 40;
    var ay = y0 - q1, by = y0 - q2;
    out += B.line(ox, y0, ex, y0, { c: 'thick' }) + B.line(ox, y0, ex, ay, { c: 'thick dim', s: '1' }) + B.line(ox, y0, ex, by, { c: 'thick', s: '2' });
    out += '<line x1="' + ex + '" y1="' + y0 + '" x2="' + ex + '" y2="' + by.toFixed(1) + '" class="w thick" data-s="2"/>';
    out += '<line x1="' + ex + '" y1="' + by.toFixed(1) + '" x2="' + ex + '" y2="' + ay.toFixed(1) + '" class="w thick" style="stroke:var(--ok)" data-s="3 4"/>';
    out += '<path class="w" d="M' + (ox + r1) + ' ' + y0 + ' A' + r1 + ' ' + r1 + ' 0 0 0 ' + P(ox + r1 * Math.cos(f1r), y0 - r1 * Math.sin(f1r)) + '" data-s="1"/>';
    out += '<path class="w" d="M' + (ox + r2) + ' ' + y0 + ' A' + r2 + ' ' + r2 + ' 0 0 0 ' + P(ox + r2 * Math.cos(f2r), y0 - r2 * Math.sin(f2r)) + '" data-s="2"/>';
    out += B.t(ox + (r2 + 7) * Math.cos(f2r * 0.6), y0 - (r2 + 7) * Math.sin(f2r * 0.6) + 4, 'φ_2', { a: 'middle', c: 'tm', s: '2' }) + B.t(ox + (r1 + 7) * Math.cos(f1r * 0.6), y0 - (r1 + 7) * Math.sin(f1r * 0.6) + 4, 'φ_1', { a: 'middle', c: 'tm', s: '1' });
    out += B.t(ex + 8, (ay + by) / 2 + 4, 'Q_c = ' + B.ans(k, g(Qc) + ' kvar'), { a: 'start', c: 'tg', s: '3 4' });
    out += B.t(ex + 8, (by + y0) / 2 + 4, 'Q_2', { a: 'start', c: 'tm', s: '2' });
    out += B.t((ox + ex) / 2, y0 + 18, 'P = ' + g(v.P) + ' kW (não muda)', { s: '1' });
    out += B.t(180, y0 + 40, 'FP atual: cos φ_1 = ' + g(v.fp1) + '  →  tg φ_1 = ' + B.ans(k, g(t1)), { s: '1' });
    out += B.t(180, y0 + 62, 'FP desejado: cos φ_2 = ' + g(v.fp2) + '  →  tg φ_2 = ' + B.ans(k, g(t2)), { s: '2' });
    out += B.t(180, y0 + 84, 'Q_c = P·(tg φ_1 − tg φ_2) = ' + B.ans(k, g(Qc) + ' kvar'), { c: 'tg', s: '3 4' });
    out += B.ca(y0 + 106);
    return B.svg(360, 354, out, 'Correção do fator de potência: carga de ' + g(v.P) + ' quilowatts com fator de potência ' + g(v.fp1) + ', que se quer elevar a ' + g(v.fp2) + '. Dois triângulos de potência sobre a mesma potência ativa; o trecho de reativo entre eles é o que o banco de capacitores, ligado em paralelo com a carga, retira. Q_c = P·(tg φ1 − tg φ2).');
  });

  /* ---------- trifásica equilibrada em estrela ---------- */
  reg('trifasica', function (v, k) {
    var B = H, R3 = Math.sqrt(3), S = R3 * v.VL * v.IL, Pp = S * v.fp, out = '', ys = [50, 100, 150], nm = ['A', 'B', 'C'];
    out += B.w([[30, 50], [30, 150]]) + B.w([[320, 50], [320, 150]]) + B.node(30, 100) + B.node(320, 100);
    for (var i = 0; i < 3; i++) {
      var y = ys[i];
      out += B.w([[30, y], [46, y]], { c: 'hot' }) + B.w([[78, y], [248, y]], { c: 'hot' }) + B.w([[292, y], [320, y]], { c: 'hot' });
      out += B.ac(62, y) + B.res(270, y, 'h', '', '', '2');
      out += B.t(104, y - 7, nm[i], { c: 'tm' });
    }
    out += B.t(270, 34, 'Z', { c: 'tm', s: '2' }) + B.t(270, 72, 'cos φ = ' + g(v.fp), { c: 'tm', s: '3' });
    out += B.arrow(150, 54, 150, 96, { s: '1' }) + B.arrow(150, 96, 150, 54, { s: '1' }) + B.t(158, 80, 'V_L = ' + g(v.VL) + ' V', { a: 'start', s: '1' });
    out += B.arrow(176, 38, 226, 38, { s: '1' }) + B.t(201, 26, 'I_L = ' + g(v.IL) + ' A', { c: 'tg', s: '1' });
    out += B.flow('M30,50 H320', B.rate(v.IL, 30), k.anim, 4) + B.flow('M320,100 H30', B.rate(v.IL / 2, 30), k.anim, 3) + B.flow('M320,150 H30', B.rate(v.IL / 2, 30), k.anim, 3);
    out += B.t(180, 182, 'V_L: entre duas fases · I_L: no condutor', { c: 'tm', s: '1' });
    out += B.t(180, 214, 'S = √3 · ' + g(v.VL) + ' · ' + g(v.IL) + ' = ' + B.ans(k, g(S) + ' VA'), { s: '2' });
    out += B.t(180, 234, 'P = S·cos φ = ' + B.ans(k, g(Pp) + ' W'), { c: 'tg', s: '3' });
    out += B.t(180, 256, 'a corrente sai por uma fase e volta pelas outras', { c: 'tm' });
    out += B.ca(278);
    return B.svg(360, 302, out, 'Fonte trifásica em estrela (fases A, B e C) alimentando uma carga equilibrada. A tensão de linha entre duas fases é ' + g(v.VL) + ' volts e a corrente de linha nos condutores é ' + g(v.IL) + ' ampères, com fator de potência ' + g(v.fp) + '. P = √3·VL·IL·cos φ.');
  });
})(window);

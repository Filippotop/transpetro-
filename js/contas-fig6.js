/* Figuras das contas (parte 6): painéis "em CA" e outros painéis que se mexem; ver js/contas-fig5.js (helpers) */
(function (W) {
  'use strict';
  var H = W.CONTASFIG.H, reg2 = W.CONTASFIG.reg2, g = H.g, u6 = 0, R3 = Math.sqrt(3), DEG = 180 / Math.PI;
  var S = function (s) { return s ? ' data-s="' + s + '"' : ''; };
  var INKS = 'stroke:var(--ink)', MUS = 'stroke:var(--muted)';

  /* onda rolante de forma qualquer: f(th) em [-1,1]; o valor em x0 é f(2π·t/T), como H.onda.
     o = {fill: área positiva suave e negativa em vermelho; s: passo} */
  function roll(x0, y0, w, amp, per, f, cls, anim, o) {
    o = o || {}; var pw = w / per, id = 'cf6' + (++u6), n = Math.round(per * 40) + 40, d = '', dp = '', dn = '', i, x, y, th, X;
    for (i = 0; i <= n + 40; i++) {
      x = (i / (n + 40)) * (w + pw); th = 2 * Math.PI * x / pw; y = -amp * f(th); X = (x0 + x).toFixed(1);
      d += (i ? 'L' : 'M') + X + ' ' + (y0 + y).toFixed(1);
      dp += 'L' + X + ' ' + (y0 + Math.min(0, y)).toFixed(1);
      dn += 'L' + X + ' ' + (y0 + Math.max(0, y)).toFixed(1);
    }
    var xe = (x0 + w + pw).toFixed(1), xs = x0.toFixed(1);
    var area = o.fill ? '<path d="M' + xs + ' ' + y0 + dp + ' L' + xe + ' ' + y0 + ' Z" class="area"/><path d="M' + xs + ' ' + y0 + dn + ' L' + xe + ' ' + y0 + ' Z" style="fill:color-mix(in srgb,var(--bad) 40%,transparent);stroke:none"/>' : '';
    var mover = anim ? '<animateTransform attributeName="transform" type="translate" from="0 0" to="' + (-pw).toFixed(1) + ' 0" dur="' + H.T + 's" repeatCount="indefinite"/>' : '';
    return '<clipPath id="' + id + '"><rect x="' + x0 + '" y="' + (y0 - (o.up || amp) - 6) + '" width="' + w + '" height="' + ((o.up || amp) + (o.dn || amp) + 12) + '"/></clipPath>'
      + '<g clip-path="url(#' + id + ')"' + S(o.s) + '><g>' + area + '<path class="w' + (cls ? ' ' + cls : '') + '" d="' + d + '"/>' + mover + '</g></g>';
  }
  /* seta entre pontos absolutos */
  function mk(cls, st) { cls = cls || (st === INKS || st === MUS ? 'k' : ''); return 'url(#cfa' + (/^(b|c|k)$/.test(cls) ? '-' + cls : '') + ')'; }
  function seta(x1, y1, x2, y2, cls, st, s) { return '<line class="ar' + (cls ? ' ' + cls : '') + '"' + (st ? ' style="' + st + '"' : '') + S(s) + ' x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" marker-end="' + mk(cls, st) + '"/>'; }
  /* fasores girando juntos: list = [{a, len, cls, st, s}]; extra = SVG rígido que gira junto */
  function fas(cx, cy, R, list, anim, extra) {
    var out = '<circle class="w dim" cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none"/>' + H.line(cx - R - 4, cy, cx + R + 4, cy, { c: 'dim' }) + H.line(cx, cy - R - 4, cx, cy + R + 4, { c: 'dim' });
    var gs = list.map(function (f) {
      return '<g transform="rotate(' + (-f.a) + ' ' + cx + ' ' + cy + ')"' + S(f.s) + '><line class="ar' + (f.cls ? ' ' + f.cls : '') + '"' + (f.st ? ' style="' + f.st + '"' : '') + ' x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R * f.len).toFixed(1) + '" y2="' + cy + '" marker-end="' + mk(f.cls, f.st) + '"/></g>';
    }).join('');
    var giro = anim ? '<animateTransform attributeName="transform" type="rotate" from="0 ' + cx + ' ' + cy + '" to="-360 ' + cx + ' ' + cy + '" dur="' + H.T + 's" repeatCount="indefinite"/>' : '';
    return out + '<g>' + gs + (extra || '') + giro + '</g>';
  }
/* rótulo que fica de pé dentro de um grupo que gira: gira ao contrário em torno de si mesmo */
  function rl(x, y, texto, o, anim, s) {
    o = o || {}; var t = H.t(x.toFixed(1), y.toFixed(1), texto, { a: o.a, c: o.c || 'tm', s: s });
    if (!anim) return t;
    return '<g>' + t + '<animateTransform attributeName="transform" type="rotate" from="0 ' + x.toFixed(1) + ' ' + y.toFixed(1) + '" to="360 ' + x.toFixed(1) + ' ' + y.toFixed(1) + '" dur="' + H.T + 's" repeatCount="indefinite"/></g>';
  }
  var pt = function (cx, cy, R, deg) { return [cx + R * Math.cos(deg / DEG), cy - R * Math.sin(deg / DEG)]; };
  var legSt = function (x, y, st, texto, s) { return H.leg(x, y, '', texto, s).replace('class="w thick"', 'class="w thick" style="' + st + '"'); };

  /* ================= triângulo de potências: p(t) = v·i ================= */
  reg2('triangulo', function (v, k) {
    var ph = Math.acos(v.fp), phi, P = v.V * v.I * v.fp, out = '';
    if (!k.ver && v.fp < 0.999) ph = 40 / DEG; /* Treinar: sen φ e Q são resultados; defasagem genérica, fora de escala */
    phi = ph * DEG;
    var fpv = Math.cos(ph);
    var Ai = 16 + 20 * Math.min(1, v.I / 25), y0 = 216, A = 32, ym = y0 - A * fpv, up = A * (fpv + 1), dn = Math.max(0, A * (1 - fpv));
    out += H.t(180, 16, 'Em CA: tensão, corrente e potência', { c: 'tg' });
    out += H.eixos(190, 74, 150, 36, '') + H.onda(190, 74, 150, 36, 0, 2, 'hot', k.anim, { s: '1' }) + H.onda(190, 74, 150, Ai, phi, 2, 'b', k.anim, { s: '1' });
    out += fas(78, 74, 36, [{ a: 0, len: 1, s: '1' }, { a: -phi, len: Ai / 36, cls: 'b', s: '1' }], k.anim);
    out += H.leg(24, 136, 'hot', 'tensão v', '1') + H.leg(120, 136, 'b', (k.ver ? 'corrente i (atrasada ' + H.f1(phi) + '°)' : 'corrente i (φ fora de escala)'), '1');
    /* eixos de p(t): a caixa vai do pico ao vale reais de p(t), sem invadir o texto de baixo */
    out += H.line(190, y0, 340, y0, { c: 'dim' }) + H.line(190, y0 - up - 4, 190, y0 + dn + 8, { c: 'dim' }) + H.t(186, y0 - up + 4, 'p', { a: 'end', c: 'tm' }) + H.t(340, y0 + 14 + dn, 't', { a: 'end', c: 'tm' });
    out += roll(190, y0, 150, A, 2, function (th) { return fpv - Math.cos(2 * th - ph); }, '', k.anim, { fill: true, s: '2', up: up, dn: dn });
    out += H.line(190, ym, 340, ym, { d: '5 4', c: 'hot', s: '2' });
    out += H.t(10, 180, 'p(t) = v·i', { a: 'start' }) + H.t(10, 198, 'tracejada = média', { a: 'start', c: 'tm', s: '2' }) + H.t(10, 216, 'P = ' + H.ans(k, g(P) + ' W'), { a: 'start', c: 'tg', s: '2' });
    out += v.fp >= 0.999 ? H.t(180, 252, 'fp = 1: p(t) nunca é negativa', { c: 'tm', s: '4' }) + H.t(180, 268, 'toda a energia é aproveitada', { c: 'tm', s: '4' })
      : H.t(180, 252, 'p(t) é negativa em parte do ciclo (vermelho):', { c: 'tm', s: '4' }) + H.t(180, 268, 'a energia volta à fonte (potência reativa)', { c: 'tm', s: '4' });
    return H.svg(360, 278, out, 'Painel em corrente alternada: a corrente está atrasada ' + (k.ver ? 'de ' + g(phi) + ' graus' : 'de phi') + ' da tensão. A potência instantânea p de t oscila com o dobro da frequência, tem valor médio igual à potência ativa e fica negativa em parte do ciclo, quando a energia volta à fonte.');
  });

  /* ================= correção do fator de potência: corrente cai, P igual ================= */
  reg2('fp', function (v, k) {
    var p1 = Math.acos(v.fp1), p2 = Math.acos(v.fp2), a1, a2, r2, out = '', L1 = 0.85;
    if (!k.ver) { p1 = 40 / DEG; p2 = 18 / DEG; } /* Treinar: tg φ e Q_c são resultados; ângulos genéricos, fora de escala */
    a1 = p1 * DEG; a2 = p2 * DEG; r2 = k.ver ? v.fp1 / v.fp2 : Math.cos(p1) / Math.cos(p2);
    var t1 = Math.tan(p1), t2 = Math.tan(p2), La = Math.min(110, 70 / t1), ox = 30, oy = 240;
    out += H.t(180, 16, 'Em CA: a corrente antes e depois do banco', { c: 'tg' });
    out += H.eixos(190, 78, 150, 34, '') + H.onda(190, 78, 150, 34, 0, 2, 'hot', k.anim, { s: '1' }) + H.onda(190, 78, 150, 34 * L1, a1, 2, 'b', k.anim, { s: '1' }) + H.onda(190, 78, 150, 34 * L1 * r2, a2, 2, 'c', k.anim, { s: '2' });
    out += fas(78, 78, 34, [{ a: 0, len: 1, s: '1' }, { a: -a1, len: L1, cls: 'b', s: '1' }, { a: -a2, len: L1 * r2, cls: 'c', s: '2' }], k.anim);
    out += H.leg(4, 142, 'hot', 'tensão') + H.leg(84, 142, 'b', 'I_1 antes', '1') + H.leg(180, 142, 'c', 'I_2 depois', '2');
    out += H.t(180, 164, k.ver ? 'triângulo da corrente, em escala' : 'triângulo da corrente, fora de escala', { c: 'tm' });
    var x1 = ox + La, ya = oy - La * t1, yb = oy - La * t2;
    out += H.line(ox, oy, x1, oy, { c: 'dim' }) + H.line(x1, oy, x1, ya, { c: 'dim' });
    out += seta(ox, oy, x1, ya, 'b', '', '1') + seta(ox, oy, x1, yb, 'c', '', '2');
    out += '<line class="w thick hot" x1="' + (x1 + 6) + '" y1="' + yb.toFixed(1) + '" x2="' + (x1 + 6) + '" y2="' + ya.toFixed(1) + '"' + S('3 4') + '/>';
    out += H.t(x1 + 12, (ya + yb) / 2 + 4, 'banco', { a: 'start', c: 'tm', s: '3 4' });
    out += H.t(ox - 12, oy + 16, 'ativa: igual nos dois', { a: 'start', c: 'tm' });
    out += H.t(204, 192, 'vertical = reativa', { a: 'start', c: 'tm' }) + H.t(204, 212, 'horizontal = ativa', { a: 'start', c: 'tm' }) + H.t(204, 232, 'dourado = banco tira', { a: 'start', c: 'tm' });
    out += H.t(180, 278, 'a corrente cai, a potência ativa é a mesma', { c: 'tg' });
    return H.svg(360, 292, out, 'Painel em corrente alternada: a tensão e duas correntes que giram juntas. A corrente antes do banco, atrasada ' + (k.ver ? g(a1) + ' graus' : 'de phi 1') + ', e a corrente depois, atrasada ' + (k.ver ? g(a2) + ' graus' : 'de phi 2') + ' e menor, têm a mesma componente ativa; o capacitor corta só a componente reativa. A corrente cai e a potência ativa é a mesma.');
  });

  /* ================= trifásica: três fases e a tensão de linha ================= */
  reg2('trifasica', function (v, k) {
    var Vf = v.VL / R3, out = '', cx = 70, cy = 214, R = 40, A = pt(cx, cy, R, 0), B = pt(cx, cy, R, -120), ca = Math.acos(Math.min(1, v.fp)) * DEG;
    out += H.t(180, 16, 'Em CA: as três fases defasadas de 120°', { c: 'tg' });
    out += H.eixos(190, 68, 150, 34, '');
    out += H.onda(190, 68, 150, 34, 0, 2, 'hot', k.anim, { s: '1' }) + H.onda(190, 68, 150, 34, 120, 2, 'b', k.anim, { s: '1' }) + H.onda(190, 68, 150, 34, 240, 2, 'c', k.anim, { s: '1' });
    out += fas(78, 68, 34, [{ a: 0, len: 1, s: '1' }, { a: -120, len: 1, cls: 'b', s: '1' }, { a: -240, len: 1, cls: 'c', s: '1' }, { a: -ca, len: 0.7, st: INKS, s: '3' }], k.anim);
    out += H.leg(6, 128, 'hot', 'fase A', '1') + H.leg(76, 128, 'b', 'fase B', '1') + H.leg(146, 128, 'c', 'fase C', '1') + legSt(216, 128, INKS, 'I_a (atrasada φ)', '3');
    out += H.t(180, 148, 'v_a + v_b + v_c = 0 a todo instante', { c: 'tm' });
    out += H.t(180, 172, 'tensão de linha = diferença de duas fases', { c: 'tm' });
    out += seta(cx, cy, A[0], A[1], '', '', '1') + seta(cx, cy, B[0], B[1], 'b', '', '1') + seta(B[0], B[1], A[0], A[1], '', INKS, '2');
    out += '<path class="w dim" d="M' + (A[0] - 12) + ' ' + A[1] + ' A12 12 0 0 0 ' + (A[0] - 10.4).toFixed(1) + ' ' + (A[1] + 6).toFixed(1) + '"' + S('2') + '/>' + H.t(A[0] - 26, A[1] + 11, '30°', { c: 'tm', s: '2' });
    out += H.t(A[0] + 6, A[1] + 4, 'V_an', { a: 'start', c: 'tm' }) + H.t(B[0] - 4, B[1] + 18, 'V_bn', { c: 'tm' }) + H.t(cx + 24, cy + 38, 'V_ab', { a: 'start', c: 'tm' });
    out += H.t(160, 192, 'V_L = ' + g(v.VL) + ' V', { a: 'start', s: '1' }) + H.t(160, 214, 'V_f = V_L/√3 = ' + g(Vf) + ' V', { a: 'start', c: 'tm', s: '2' });
    out += H.t(160, 236, 'V_ab = V_an − V_bn', { a: 'start', c: 'tm' }) + H.t(160, 258, '|V_ab| = √3·V_f = V_L', { a: 'start', c: 'tg', s: '2' }) + H.t(160, 280, 'I_L = ' + g(v.IL) + ' A (linha)', { a: 'start', c: 'tm', s: '1' });
    out += H.t(180, 302, 'P = 3·V_f·I_f·cos φ = √3·V_L·I_L·cos φ', { c: 'tg', s: '3' });
    return H.svg(360, 312, out, 'Painel em corrente alternada: três tensões de fase de ' + g(Vf) + ' volts defasadas de 120 graus, cuja soma é zero a todo instante, e a corrente da fase A atrasada de phi (cosseno de phi igual ao fator de potência ' + g(v.fp) + '). A tensão de linha é a diferença de dois fasores de fase e vale raiz de três vezes a de fase, ' + g(v.VL) + ' volts, com 30 graus de avanço sobre Van. A potência é P igual a raiz de três vezes VL vezes IL vezes cosseno de phi.');
  });

  /* ================= ligação estrela e triângulo ================= */
  reg2('ligacao', function (v, k) {
    var vY = v.VL / R3, iD = v.IL / R3, out = '', R = 44, cy = 98, a = 90, b = 270;
    var YA = pt(a, cy, R, 0), YB = pt(a, cy, R, -120), DA = pt(b, cy, R, 0), DB = pt(b, cy, R, -120), DC = pt(b, cy, R, 120);
    var arco = '<path class="w dim" d="M' + (YA[0] - 12) + ' ' + YA[1] + ' A12 12 0 0 0 ' + (YA[0] - 10.4).toFixed(1) + ' ' + (YA[1] + 6).toFixed(1) + '"/>' + rl(YA[0] - 26, YA[1] + 11, '30°', { c: 'tm' }, k.anim, '1');
    var GOLD = 'stroke:var(--gold)';
    out += H.t(a, 16, 'estrela (Y)', { c: 'tg', s: '1' }) + H.t(b, 16, 'triângulo (Δ)', { c: 'tg', s: '2' });
    out += fas(a, cy, R, [], k.anim, seta(a, cy, YA[0], YA[1], '', '', '1') + seta(a, cy, YB[0], YB[1], 'b', '', '1') + seta(YB[0], YB[1], YA[0], YA[1], '', INKS, '1') + arco);
    out += fas(b, cy, R, [], k.anim, seta(b, cy, DA[0], DA[1], '', '', '2') + seta(b, cy, DB[0], DB[1], 'b', '', '2') + seta(b, cy, DC[0], DC[1], 'c', '', '2') + seta(DC[0], DC[1], DA[0], DA[1], '', INKS, '2'));
    out += legSt(4, 166, GOLD, 'V_an', '1') + H.leg(58, 166, 'b', 'V_bn', '1') + legSt(4, 184, INKS, 'V_ab = V_an − V_bn', '1');
    out += legSt(190, 166, GOLD, 'I_ab', '2') + H.leg(244, 166, 'b', 'I_bc', '2') + H.leg(298, 166, 'c', 'I_ca', '2') + legSt(190, 184, INKS, 'I_a = I_ab − I_ca', '2');
    out += H.t(a, 212, 'V_f = V_L/√3', { s: '1' }) + H.t(a, 234, '= ' + H.ans(k, g(vY) + ' V'), { c: 'tg', s: '1' }) + H.t(a, 256, 'I_f = I_L = ' + g(v.IL) + ' A', { c: 'tm', s: '1' });
    out += H.t(b, 212, 'V_f = V_L = ' + g(v.VL) + ' V', { c: 'tm', s: '2' }) + H.t(b, 234, 'I_f = I_L/√3 =', { s: '2' }) + H.t(b, 256, H.ans(k, g(iD) + ' A'), { c: 'tg', s: '2' });
    out += H.t(180, 284, 'o √3 divide a TENSÃO na estrela', { c: 'tm' }) + H.t(180, 304, 'e a CORRENTE no triângulo', { c: 'tm' });
    return H.svg(360, 314, out, 'Painel em corrente alternada: fasores girando juntos. Na estrela, a tensão de linha é a diferença das tensões de fase e vale raiz de três vezes a de fase, com ângulo de 30 graus entre Van e Vab. No triângulo, a corrente de linha é a diferença de duas correntes de fase e vale raiz de três vezes a de fase.');
  });

  /* ================= transformador: v1, v2, i1, i2 e fluxo ================= */
  reg2('trafo', function (v, k) {
    var a = v.V1 / v.V2, I1 = v.I2 / a, out = '', x0 = 40, w = 300, Av = 30, Ai = 24;
    var v1 = a >= 1 ? Av : Math.max(5, Av * a), v2 = a >= 1 ? Math.max(5, Av / a) : Av;
    var i2 = a >= 1 ? Ai : Math.max(4, Ai * a), i1 = a >= 1 ? Math.max(4, Ai / a) : Ai;
    if (!k.ver) { v1 = Av; v2 = Av * 0.45; i2 = Ai; } /* Treinar: a e I_1 são resultados; amplitudes genéricas, fora de escala */
    out += H.t(180, 16, 'Em CA: tensão, corrente e fluxo no tempo', { c: 'tg' });
    out += H.eixos(x0, 54, w, Av, 'v') + H.onda(x0, 54, w, v1, 0, 2, '', k.anim, { s: '1' }) + H.onda(x0, 54, w, v2, 0, 2, 'c', k.anim, { s: '1' });
    out += H.leg(14, 108, '', 'v_1 = ' + g(v.V1) + ' V', '1') + H.leg(176, 108, 'c', 'v_2 = ' + g(v.V2) + ' V', '1');
    out += H.eixos(x0, 152, w, Ai, 'i') + (k.ver ? H.onda(x0, 152, w, i1, 0, 2, 'b', k.anim, { s: '2' }) : '<rect x="' + x0 + '" y="' + (152 - Ai) + '" width="' + w + '" height="' + 2 * Ai + '" rx="3" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="5 4" data-s="2"/>') + '<g' + (k.ver ? '' : ' opacity=".45"') + '>' + H.onda(x0, 152, w, i2, 0, 2, 'c', k.anim, { s: '2' }) + '</g>' + (k.ver ? '' : H.t(x0 + 112, 148, '?', { c: 't big', s: '2' }));
    out += H.leg(14, 202, 'b', 'i_1 = ' + H.ans(k, g(I1) + ' A'), '2') + H.leg(176, 202, 'c', 'i_2 = ' + g(v.I2) + ' A', '2');
    out += H.eixos(x0, 236, w, 12, 'φ') + H.onda(x0, 236, w, 12, 90, 2, 'dim', k.anim, {});
    out += H.t(180, 270, 'fluxo no núcleo: 90° atrás da tensão', { c: 'tm' });
    out += H.t(180, 292, 'tensão alta ↔ corrente baixa:', { c: 'tg', s: '3' }) + H.t(180, 310, 'V_1·I_1 = V_2·I_2 = ' + H.ans(k, g(v.V2 * v.I2) + ' VA'), { c: 'tm', s: '3' });
    out += H.t(180, 328, k.ver ? 'amplitudes em escala limitada' : 'amplitudes fora de escala', { c: 'tm' });
    return H.svg(360, 338, out, 'Painel em corrente alternada do transformador: tensão do primário de ' + g(v.V1) + ' volts e do secundário de ' + g(v.V2) + ' volts em fase, com amplitudes na razão a; correntes em fase com razão inversa: onde a tensão é maior a corrente é menor; o fluxo no núcleo está 90 graus atrás da tensão. Os produtos V vezes I são iguais nos dois lados.');
  });

  /* ================= RC: carga do capacitor no tempo ================= */
  reg2('rc', function (v, k) {
    var tau = v.R * v.C * 1e-6, vc = v.V * (1 - Math.exp(-1)), I0 = v.V / v.R, out = '', x0 = 48, y0 = 144, w = 190, h = 100, N = 40, dur = '5s', i, t;
    var pv = [], pi = [], yv = [], yi = [], xs = [];
    for (i = 0; i <= N; i++) { t = 5 * i / N; xs.push((x0 + w * i / N).toFixed(1)); yv.push((y0 - h * (1 - Math.exp(-t))).toFixed(1)); yi.push((y0 - h * Math.exp(-t)).toFixed(1)); pv.push(xs[i] + ',' + yv[i]); pi.push(xs[i] + ',' + yi[i]); }
    var xt = x0 + w / 5, yt = y0 - h * (1 - Math.exp(-1)), tx = 298, tw = 56, ty = y0 - h, B = 'fill:var(--cf-b);stroke:var(--surface);stroke-width:2';
    var an = function (attr, vals) { return '<animate attributeName="' + attr + '" values="' + vals.join(';') + '" dur="' + dur + '" repeatCount="indefinite"/>'; };
    out += H.t(180, 16, 'Carga do capacitor no tempo', { c: 'tg' });
    out += H.line(x0, y0, x0 + w + 6, y0) + H.line(x0, y0, x0, y0 - h - 8);
    out += H.line(x0, ty, x0 + w, ty, { d: '4 4', c: 'dim' }) + H.t(x0 - 6, ty + 4, g(v.V) + ' V', { a: 'end', c: 'tm' });
    out += H.t(x0 - 6, ty + 18, 'V/R', { a: 'end', c: 'tm' }).replace('class="tm"', 'class="tm" style="fill:var(--cf-b)"');
    out += '<polyline class="curva" points="' + pv.join(' ') + '"' + S('3') + '/><polyline class="w thick b" points="' + pi.join(' ') + '"' + S('3') + '/>';
    out += H.line(xt, y0, xt, yt, { d: '3 3', c: 'dim', s: '2' }) + H.line(x0, yt, xt, yt, { d: '3 3', c: 'dim', s: '3' });
    out += '<circle class="pt" cx="' + xt.toFixed(1) + '" cy="' + yt.toFixed(1) + '" r="4"' + S('3') + '/>';
    out += H.t(xt + 10, yt + 16, '63,2 %', { a: 'start', c: 'tm', s: '3' });
    out += H.line(x0 + w, y0, x0 + w, y0 + 5) + H.t(xt, y0 + 16, 'τ', { c: 'tm', s: '2' }) + H.t(x0 + w, y0 + 16, '5τ', { c: 'tm', s: '4' }) + H.t(x0 + 4, y0 + 16, '0', { a: 'start', c: 'tm' });
    /* cursor + pontos + nível de carga: tudo em 5 s = 0 a 5τ, em sincronia (amostras igualmente espaçadas no tempo) */
    out += '<line class="w dim" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + ty + '"' + (k.anim ? '>' : ' transform="translate(' + (w / 5).toFixed(1) + ' 0)">') + (k.anim ? '<animateTransform attributeName="transform" type="translate" from="0 0" to="' + w + ' 0" dur="' + dur + '" repeatCount="indefinite"/>' : '') + '</line>';
    out += k.anim ? '<circle class="pt" r="4.5" cx="' + x0 + '" cy="' + y0 + '">' + an('cx', xs) + an('cy', yv) + '</circle><circle r="4.5" style="' + B + '" cx="' + x0 + '" cy="' + ty + '">' + an('cx', xs) + an('cy', yi) + '</circle>'
      : '<circle r="4" style="' + B + '" cx="' + xt.toFixed(1) + '" cy="' + (y0 - h * Math.exp(-1)).toFixed(1) + '"/>';
    out += '<rect class="sh" x="' + tx + '" y="' + ty + '" width="' + tw + '" height="' + h + '" rx="3"' + S('3') + '/>';
    out += '<rect class="bar" x="' + (tx + 2) + '" y="' + (k.anim ? y0 : yt.toFixed(1)) + '" width="' + (tw - 4) + '" height="' + (k.anim ? 0 : (y0 - yt - 2).toFixed(1)) + '"' + S('3') + '>'
      + (k.anim ? an('y', yv) + an('height', yv.map(function (y) { return Math.max(0, y0 - parseFloat(y) - 2).toFixed(1); })) : '') + '</rect>';
    out += H.t(tx + tw / 2, ty - 8, 'C = ' + g(v.C) + ' µF', { c: 'tm' }) + H.t(tx + tw / 2, y0 + 16, 'carga', { c: 'tm' });
    out += H.leg(10, 190, '', 'v_C sobe', '3') + H.leg(120, 190, 'b', 'i cai (começa em ' + (I0 < 1 ? g(I0 * 1000) + ' mA' : g(I0) + ' A') + ')', '3');
    out += H.t(180, 218, 'τ = R·C = ' + H.ans(k, g(tau) + ' s'), { c: 'tg', s: '2' });
    out += H.t(180, 236, 'em 1τ: v_C = ' + H.ans(k, g(vc) + ' V'), { c: 'tm', s: '3' });
    out += H.t(180, 254, '5τ = ' + H.ans(k, g(5 * tau) + ' s') + ': carregado (≈ 99 %)', { c: 'tm', s: '4' });
    return H.svg(360, 264, out, 'Painel da carga do capacitor no tempo, de zero a cinco tau: a tensão do capacitor sobe até ' + g(v.V) + ' volts, passando por 63,2 por cento em um tau, e a corrente cai a zero; o nível de carga do capacitor de ' + g(v.C) + ' microfarads cresce no mesmo ritmo.');
  });

  /* ================= dois wattímetros: fasores e φ ================= */
  reg2('wattimetros', function (v, k) {
    var P = v.W1 + v.W2, phi = Math.atan(R3 * (v.W1 - v.W2) / P) * DEG, out = '', cx = 80, cy = 96, R = 52;
    if (!k.ver) phi = 15; /* Treinar: φ é resultado; ângulo genérico, fora de escala (arcos sem número) */
    var GRN = 'stroke:var(--cf-c)', DSH = ';stroke-dasharray:5 3';
    /* V_ab = V_an − V_bn: módulo √3·V_f, a +30° de V_an; V_cb = V_cn − V_bn: a +90° (sequência ABC). Fases a 0,58·R, linhas a R (√3·0,58 ≈ 1).
       Arcos: de I_a a V_ab (30° + φ, verde cheio = W_2) e de I_c a V_cb (30° − φ, verde tracejado = W_1) */
    var arc = function (r, a1, a2, st, s) { var p1 = pt(cx, cy, r, a1), p2 = pt(cx, cy, r, a2); return '<path class="w" style="' + st + '" d="M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 0 ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + '"' + S(s) + '/>'; };
    var lab = function (r, ang, txt) { var p = pt(cx, cy, r, ang); return rl(p[0], p[1] + 4, txt, { c: 'tm' }, k.anim, '2 3'); };
    var ex = seta(cx, cy, pt(cx, cy, R, 30)[0], pt(cx, cy, R, 30)[1], 'c', '', '2 3') + seta(cx, cy, pt(cx, cy, R, 90)[0], pt(cx, cy, R, 90)[1], 'c', 'stroke-dasharray:5 3', '2 3')
      + arc(26, -phi, 30, GRN, '2 3') + arc(26, Math.min(90, 120 - phi), Math.max(90, 120 - phi), GRN + DSH, '2 3')
      + lab(R + 10, 30, 'V_ab') + lab(R + 10, 90, 'V_cb');
    out += H.t(180, 16, 'Em CA: tensões de fase e a corrente', { c: 'tg' });
    out += fas(cx, cy, R, [{ a: 0, len: 0.58, s: '1' }, { a: -120, len: 0.58, st: MUS, s: '1' }, { a: -240, len: 0.58, st: MUS, s: '1' }, { a: -phi, len: 0.8, cls: 'b', s: '2 3' }, { a: 120 - phi, len: 0.8, cls: 'b', st: 'stroke-dasharray:5 3', s: '2 3' }], k.anim, ex);
    out += legSt(146, 44, GRN, '', '2 3').replace(/<text.*<\/text>/, '') + H.t(172, 44, 'W_2 (linha A) =', { a: 'start', c: 'tm', s: '2 3' }) + H.t(172, 62, 'V_L·I·cos(30° + φ)', { a: 'start', c: 'tm', s: '2 3' });
    out += legSt(146, 88, GRN + DSH, '', '2 3').replace(/<text.*<\/text>/, '') + H.t(172, 88, 'W_1 (linha C) =', { a: 'start', c: 'tm', s: '2 3' }) + H.t(172, 106, 'V_L·I·cos(30° − φ)', { a: 'start', c: 'tm', s: '2 3' });
    out += H.t(172, 134, 'W_1 = ' + g(v.W1) + ' W', { a: 'start', s: '1' }) + H.t(172, 158, 'W_2 = ' + g(v.W2) + ' W', { a: 'start', s: '1' });
    out += H.t(172, 184, 'φ = ' + H.ans(k, g(phi) + '°'), { a: 'start', c: 'tg', s: '3' });
    out += legSt(6, 208, 'stroke:var(--gold)', 'V_an', '1') + legSt(64, 208, MUS, 'V_bn, V_cn', '1') + H.leg(176, 208, 'b', k.ver ? 'I_a (atrasada φ)' : 'I_a (φ fora de escala)', '2 3');
    out += legSt(6, 228, GRN, 'V_ab (W₂)', '2 3') + legSt(100, 228, GRN + DSH, 'V_cb (W₁)', '2 3') + legSt(176, 228, 'stroke:var(--cf-b)' + DSH, 'I_c (liga o W₁)', '2 3');
    out += H.t(180, 256, 'as duas leituras diferem por causa de φ', { c: 'tm' }) + H.t(180, 276, 'se W_1 = W_2, então φ = 0', { c: 'tm', s: '3' });
    return H.svg(360, 288, out, 'Painel em corrente alternada do método de Aron: fasores das tensões de fase Van, Vbn e Vcn girando junto com a corrente da fase A, atrasada do ângulo phi, e as tensões de linha Vab, a 30 graus de Van, e Vcb, a 90 graus, medidas pelos wattímetros. O ângulo entre Vab e a corrente Ia é 30 graus mais phi; entre Vcb e a corrente Ic, 30 graus menos phi. As duas leituras, ' + g(v.W1) + ' e ' + g(v.W2) + ' watts, diferem por causa de phi; se forem iguais, phi é zero.');
  });
})(window);

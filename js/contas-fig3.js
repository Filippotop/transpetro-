/* Figuras das contas (parte 3): ver js/contas-fig.js */
(function (W) {
  'use strict';
  var H = W.CONTASFIG.H, reg = W.CONTASFIG.reg, g = H.g, R3 = Math.sqrt(3);
  var A = function (s) { return s ? ' data-s="' + s + '"' : ''; };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  var f1 = function (x) { return (+x).toFixed(1); };
  /* resistor rotacionado sobre o segmento P→Q (fio + retângulo no meio) */
  function rr(p, q, s, hot) {
    var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI;
    return H.w([p, q], { c: hot ? 'hot' : '', s: s }) + '<rect class="sh" x="-22" y="-8" width="44" height="16" rx="2" transform="translate(' + f1(mx) + ',' + f1(my) + ') rotate(' + f1(ang) + ')"' + A(s) + '/>';
  }
  /* Treinar: contorno tracejado de tamanho FIXO com "?" no lugar de uma grandeza que é resultado */
  function ph(x, y, w, h, s, q) {
    return '<rect x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(w) + '" height="' + f1(h) + '" rx="3" stroke-dasharray="4 3"' + A(s)
      + ' style="fill:none;stroke:var(--muted);stroke-width:1.5"/>' + (q === false ? '' : H.t(x + w / 2, y + h / 2 + 4, '?', { c: 'tm', s: s }));
  }
  function rect3(x, y, w, h, cls, s) { return '<rect class="' + cls + '" x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(Math.max(1, w)) + '" height="' + h + '" rx="3"' + A(s) + '/>'; }
  /* rótulo de duas linhas: símbolo em cima, valor embaixo */
  function lab2(x, y, sym, val, a, s, c) {
    return H.t(x, y, sym, { a: a, s: s, c: c || 't' }) + H.t(x, y + 20, val, { a: a, s: s, c: c || 't' });
  }

  /* ---------- ligação estrela × triângulo ---------- */
  reg('ligacao', function (v, k) {
    var VL = v.VL, IL = v.IL, vY = VL / R3, iD = IL / R3, S = R3 * VL * IL, out = '';
    var N = [90, 134], a1 = [90, 54], b1 = [21, 174], c1 = [159, 174];
    /* estrela */
    out += rr(a1, N, '1', true) + rr(b1, N, '1', true) + rr(c1, N, '1', true) + H.node(N[0], N[1]);
    out += H.t(98, N[1] + 4, 'N', { a: 'start', c: 'tm' });
    out += H.w([[90, 14], a1], { c: 'hot' }) + H.w([[21, 174], [21, 198]], { c: 'dim' }) + H.w([[159, 174], [159, 198]], { c: 'dim' });
    out += H.arrow(90, 14, 90, 44, { s: '1' }) + lab2(98, 24, 'I_L', g(IL) + ' A', 'start', '1');
    out += H.t(82, 32, 'A', { a: 'end' }) + H.t(10, 170, 'B', { a: 'end' }) + H.t(163, 190, 'C', { a: 'start' });
    out += H.arrow(74, 72, 74, 116, { s: '1' }) + lab2(68, 88, 'I_f', g(IL) + ' A', 'end', '1');
    out += lab2(104, 88, 'V_f', H.ans(k, g(vY) + ' V'), 'start', '1', 't');
    out += H.arrow(90, 198, 21, 198, { s: '' }).replace('class="ar"', 'class="ar dim"') + H.arrow(90, 198, 159, 198, {}).replace('class="ar"', 'class="ar dim"');
    out += H.t(90, 216, 'V_L = ' + g(VL) + ' V', { c: 't' });
    /* triângulo */
    var A2 = [270, 54], B2 = [201, 174], C2 = [339, 174];
    out += rr(A2, B2, '2', true) + rr(A2, C2, '2', true) + rr(B2, C2, '2', true);
    out += H.node(A2[0], A2[1]) + H.node(B2[0], B2[1]) + H.node(C2[0], C2[1]);
    out += H.w([[270, 14], A2], { c: 'hot' }) + H.w([B2, [201, 198]], { c: 'dim' }) + H.w([C2, [339, 198]], { c: 'dim' });
    out += H.arrow(270, 14, 270, 44, { s: '2' }) + lab2(262, 24, 'I_L', g(IL) + ' A', 'end', '2');
    out += H.t(278, 32, 'A', { a: 'start' }) + H.t(197, 190, 'B', { a: 'end' }) + H.t(348, 170, 'C', { a: 'start' });
    /* seta da corrente de fase no lado AB, por fora */
    var ux = (B2[0] - A2[0]) / 138, uy = (B2[1] - A2[1]) / 138, ox = -uy * 15, oy = ux * 15;
    out += H.arrow(A2[0] + ux * 30 + ox, A2[1] + uy * 30 + oy, A2[0] + ux * 108 + ox, A2[1] + uy * 108 + oy, { s: '2' });
    out += lab2(222, 96, 'I_f', H.ans(k, g(iD) + ' A'), 'end', '2');
    out += lab2(270, 128, 'V_f', g(VL) + ' V', 'middle', '2');
    out += H.arrow(270, 198, 201, 198, {}).replace('class="ar"', 'class="ar dim"') + H.arrow(270, 198, 339, 198, {}).replace('class="ar"', 'class="ar dim"');
    out += H.t(270, 216, 'V_L = ' + g(VL) + ' V', { c: 't' });
    /* rodapé: onde o √3 aparece */
    out += H.t(90, 240, 'Y: √3 divide a tensão', { c: 'tm', s: '1' }) + H.t(270, 240, 'Δ: √3 divide a corrente', { c: 'tm', s: '2' });
    out += H.t(180, 262, 'S = 3·V_f·I_f = ' + H.ans(k, g(S) + ' VA') + ' nas duas', { c: 'tm', s: '3' });
    out += H.t(180, 280, 'mas em Δ cada fase recebe √3 vezes mais tensão', { c: 'tm', s: '3' });
    out += H.flow('M90,14 L90,134', H.rate(IL, 60), k.anim, 4) + H.flow('M270,54 L201,174', H.rate(iD, 60), k.anim, 3);
    return H.svg(360, 292, out, 'Duas ligações da mesma carga trifásica com tensão de linha de ' + g(VL) + ' volts e corrente de linha de ' + g(IL) + ' ampères. Estrela: a tensão de fase é a de linha dividida por raiz de três e a corrente de fase é a de linha. Triângulo: a tensão de fase é a de linha e a corrente de fase é a de linha dividida por raiz de três.');
  });

  /* ---------- dois wattímetros (Aron) ---------- */
  reg('wattimetros', function (v, k) {
    var W1 = v.W1, W2 = v.W2, P = W1 + W2, t = R3 * (W1 - W2) / P, fi = Math.atan(t), fp = Math.cos(fi), out = '';
    var yA = 44, yB = 100, yC = 156, x0 = 30, xe = 232;
    /* linhas */
    out += H.w([[x0, yA], [xe, yA]], { c: 'hot' }) + H.w([[x0, yB], [xe, yB]], { c: 'hot' }) + H.w([[x0, yC], [xe, yC]], { c: 'hot' });
    out += H.t(18, yA + 4, 'A', { a: 'end' }) + H.t(18, yB + 4, 'B', { a: 'end' }) + H.t(18, yC + 4, 'C', { a: 'end' });
    /* carga trifásica em estrela */
    var xr = 268, xn = 314;
    out += H.w([[xe, yA], [xr - 22, yA]], { c: 'hot' }) + H.w([[xe, yB], [xr - 22, yB]], { c: 'hot' }) + H.w([[xe, yC], [xr - 22, yC]], { c: 'hot' });
    out += H.w([[xr + 22, yA], [xn, yA], [xn, yC]]) + H.w([[xr + 22, yB], [xn, yB]]) + H.node(xn, yB);
    out += H.res(xr, yA, 'h', '', '') + H.res(xr, yB, 'h', '', '') + H.res(xr, yC, 'h', '', '');
    out += H.t(xr + 10, yC + 30, 'carga trifásica', { c: 'tm' });
    /* wattímetros: bobina de corrente em série (fio grosso), bobina de tensão (fio fino) até a fase B */
    var x1 = 96, x2 = 156;
    out += '<g' + A('1') + '><circle class="sh" cx="' + x1 + '" cy="' + yA + '" r="17"/><line class="w thick" x1="' + (x1 - 17) + '" y1="' + yA + '" x2="' + (x1 + 17) + '" y2="' + yA + '"/>'
      + H.t(x1, yA - 5, 'W', { c: 'tm' }) + H.w([[x1, yA], [x1, yB]], { d: '4 3' }) + H.node(x1, yB) + '</g>';
    out += '<g' + A('1') + '><circle class="sh" cx="' + x2 + '" cy="' + yC + '" r="17"/><line class="w thick" x1="' + (x2 - 17) + '" y1="' + yC + '" x2="' + (x2 + 17) + '" y2="' + yC + '"/>'
      + H.t(x2, yC + 15, 'W', { c: 'tm' }) + H.w([[x2, yC], [x2, yB]], { d: '4 3' }) + H.node(x2, yB) + '</g>';
    out += H.t(x1, yA - 24, 'W_2 = ' + g(W2) + ' W', { s: '1' }) + H.t(x2, yC + 32, 'W_1 = ' + g(W1) + ' W', { s: '1' });
    out += H.t(x1 + 8, yA + 40, 'bobina de tensão', { a: 'start', c: 'tm' });
    out += H.t(x2 + 8, yC - 34, 'ligada à fase B', { a: 'start', c: 'tm' });
    out += H.t(30, 214, 'traço grosso = bobina de corrente (em série)', { a: 'start', c: 'tm' });
    /* barra: W1 + W2 */
    var by = 226, bx = 30, bw = 300, tot = W1 + Math.max(W2, 0), sc = bw / tot, w1 = W1 * sc;
    if (!k.ver) {
      /* Treinar: só os dados (cada leitura em escala comum, em linhas separadas); a soma P fica oculta */
      var sc2 = 190 / Math.max(Math.abs(W1), Math.abs(W2), 1e-9);
      out += rect3(bx, 220, Math.abs(W1) * sc2, 10, 'bar', '1') + H.t(bx + Math.abs(W1) * sc2 + 6, 229, 'W_1', { a: 'start', c: 'tm' });
      out += rect3(bx, 234, Math.abs(W2) * sc2, 10, W2 >= 0 ? 'bar ok' : 'bar bad', '1') + H.t(bx + Math.abs(W2) * sc2 + 6, 243, W2 >= 0 ? 'W_2' : 'W_2 (negativa)', { a: 'start', c: 'tm' });
      out += ph(bx, 250, 300, 12, '1');
    } else {
    out += '<g' + A('1') + '><rect class="bar" x="' + bx + '" y="' + by + '" width="' + f1(w1) + '" height="14" rx="3"/>';
    if (W2 >= 0) out += '<rect class="bar ok" x="' + f1(bx + w1) + '" y="' + by + '" width="' + f1(W2 * sc) + '" height="14" rx="3"/>';
    else out += '<rect class="bar bad" x="' + f1(bx + w1 + W2 * sc) + '" y="' + by + '" width="' + f1(-W2 * sc) + '" height="14" rx="3"/>';
    out += '</g>';
    if (W2 >= 0) out += H.t(bx + w1 / 2, by + 32, 'W_1', { c: 'tm' }) + H.t(bx + w1 + W2 * sc / 2, by + 32, 'W_2', { c: 'tm' });
    else out += H.t(bx, by + 32, 'W_2 < 0: a parte vermelha é subtraída de W_1', { a: 'start', c: 'tm' });
    }
    out += H.t(180, 282, 'P = W_1 + W_2 = ' + H.ans(k, g(P) + ' W'), { c: 'tg', s: '1' });
    out += H.t(180, 302, 'tg φ = √3·(W_1 − W_2)/P = ' + H.ans(k, g(t)), { c: 'tm', s: '2' });
    out += H.t(180, 322, 'φ = ' + H.ans(k, g(fi * 180 / Math.PI) + '°') + '   cos φ = ' + H.ans(k, g(fp)), { c: 'tg', s: '3' });
    return H.svg(360, 332, out, 'Três linhas A, B e C alimentam uma carga trifásica. Dois wattímetros ficam nas linhas A e C, com a bobina de corrente em série e a bobina de tensão ligada à linha B. W1 lê ' + g(W1) + ' watts e W2 lê ' + g(W2) + ' watts; a potência ativa é a soma das duas leituras.');
  });

  /* ---------- rendimento (Sankey) ---------- */
  reg('rendimento', function (v, k) {
    var Ps = v.Ps, Pfe = v.Pfe, Pcu = v.Pcu, perd = Pfe + Pcu, Pe = Ps + perd, eta = Ps / Pe * 100, out = '';
    var Hin = 104, y0 = 34, xa = 76, xb = 136, xc = 240;
    var hfe = Math.max(Hin * Pfe / Pe, 4), hcu = Math.max(Hin * Pcu / Pe, 4), hs = Hin - hfe - hcu;
    if (!k.ver) { hs = 60; hfe = 22; hcu = 22; }   /* Treinar: proporções neutras, fora de escala */
    var ys = y0, yfe = y0 + hs, ycu = yfe + hfe;                 /* segmentos na entrada */
    var ts = y0, tfe = y0 + hs + 24, tcu = tfe + hfe + 22;        /* destinos à direita */
    function band(a, h, b, cor, s) {
      return '<path d="M' + xb + ',' + a + ' C' + ((xb + xc) / 2) + ',' + a + ' ' + ((xb + xc) / 2) + ',' + b + ' ' + xc + ',' + b + ' L' + xc + ',' + (b + h) + ' C' + ((xb + xc) / 2) + ',' + (b + h) + ' ' + ((xb + xc) / 2) + ',' + (a + h) + ' ' + xb + ',' + (a + h) + ' Z" style="fill:' + cor + ';opacity:.6;stroke:' + cor + '"' + A(s) + '/>';
    }
    function seg(a, h, cor, s) { return '<rect x="' + xa + '" y="' + a + '" width="' + (xb - xa) + '" height="' + h + '" style="fill:' + cor + ';opacity:.85;stroke:var(--ink)"' + A(s) + '/>'; }
    out += band(ys, hs, ts, 'var(--ok)', '3') + band(yfe, hfe, tfe, 'var(--bad)', '1') + band(ycu, hcu, tcu, 'var(--bad)', '1');
    out += seg(ys, hs, 'var(--ok)', '2 3') + seg(yfe, hfe, 'var(--bad)', '1 2') + seg(ycu, hcu, 'var(--bad)', '1 2');
    out += H.t(xa - 8, y0 + Hin / 2 - 6, 'P_ent', { a: 'end', s: '2' }) + H.t(xa - 8, y0 + Hin / 2 + 14, H.ans(k, g(Pe) + ' W'), { a: 'end', s: '2' });
    out += H.t(xc + 8, ts + hs / 2 - 4, 'Saída útil', { a: 'start', s: '3' }) + H.t(xc + 8, ts + hs / 2 + 14, 'P_s = ' + g(Ps) + ' W', { a: 'start', s: '3' });
    out += H.t(xc + 8, tfe + hfe / 2 + 4, 'Ferro ' + g(Pfe) + ' W', { a: 'start', s: '1' });
    out += H.t(xc + 8, tcu + hcu / 2 + 4, 'Cobre ' + g(Pcu) + ' W', { a: 'start', s: '1' });
    var cy = function (a, h, b) { return 'M' + xa + ',' + (a + h / 2) + ' H' + xb + ' C' + ((xb + xc) / 2) + ',' + (a + h / 2) + ' ' + ((xb + xc) / 2) + ',' + (b + h / 2) + ' ' + xc + ',' + (b + h / 2); };
    out += H.flow(cy(ys, hs, ts), 0.6, k.anim, 4) + H.flow(cy(yfe, hfe, tfe), 0.35, k.anim, 2) + H.flow(cy(ycu, hcu, tcu), 0.35, k.anim, 2);
    /* η: barra de 100 % com a parte útil */
    var by = 224, bw = 300, ew = bw * eta / 100;
    out += '<rect class="bar dim" x="30" y="' + by + '" width="' + bw + '" height="14" rx="3"/>';
    if (k.ver) out += '<rect class="bar ok" x="30" y="' + by + '" width="' + f1(ew) + '" height="14" rx="3"' + A('3') + '>' + (k.anim ? '<animate attributeName="width" from="0" to="' + f1(ew) + '" dur="1.1s" fill="freeze"/>' : '') + '</rect>';
    else out += ph(30, by, bw, 14, '3') + H.t(330, 212, 'fluxo fora de escala', { a: 'end', c: 'tm' });
    out += H.t(30, by + 32, '0', { a: 'start', c: 'tm' }) + H.t(330, by + 32, '100 %', { a: 'end', c: 'tm' });
    out += H.t(180, 282, 'η = P_s / P_ent = ' + H.ans(k, g(eta) + ' %'), { c: 'tg', s: '3' });
    out += H.t(180, 302, 'perdas = ' + H.ans(k, g(perd) + ' W') + ' (ferro + cobre)', { c: 'tm', s: '1' });
    return H.svg(360, 312, out, 'Diagrama de fluxo de potência: entra potência, sai ' + g(Ps) + ' watts úteis e se perdem ' + g(Pfe) + ' watts no ferro e ' + g(Pcu) + ' watts no cobre. O rendimento é a saída dividida pela entrada.');
  });

  /* ---------- velocidade síncrona e escorregamento ---------- */
  reg('escorregamento', function (v, k) {
    var ns = 120 * v.f / v.p, n = v.n, s = (ns - n) / ns * 100, out = '', cx = 92, cy = 104, i;
    /* estator com p polos */
    out += '<circle class="sh" cx="' + cx + '" cy="' + cy + '" r="64"/><circle class="sh" cx="' + cx + '" cy="' + cy + '" r="48" style="fill:var(--sunk)"/>';
    for (i = 0; i < v.p; i++) {
      var an = i * 360 / v.p - 90, a = an * Math.PI / 180;
      out += '<rect x="' + f1(cx + 56 * Math.cos(a) - 6) + '" y="' + f1(cy + 56 * Math.sin(a) - 6) + '" width="12" height="12" rx="2" transform="rotate(' + f1(an + 90) + ' ' + f1(cx + 56 * Math.cos(a)) + ' ' + f1(cy + 56 * Math.sin(a)) + ')" style="fill:' + (i % 2 ? 'var(--ink)' : 'var(--gold)') + '"/>';
    }
    var ps = clamp(2.6 * 1800 / ns, 1.4, 6), pr = ps * ns / n;
    if (!k.ver) { ps = 3; pr = 3.4; }   /* Treinar: rotor só "um pouco mais lento", sem razão de períodos real */
    var anim = function (T) { return k.anim ? '<animateTransform attributeName="transform" type="rotate" from="0 ' + cx + ' ' + cy + '" to="360 ' + cx + ' ' + cy + '" dur="' + T.toFixed(2) + 's" repeatCount="indefinite"/>' : ''; };
    /* campo girante (seta dourada) */
    out += '<g' + A('1') + '><line class="ar hot" x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - 46) + '" marker-end="url(#cfa)" style="stroke:var(--gold)"/>' + anim(ps) + '</g>';
    /* rotor */
    out += '<g' + A('2 3') + '><circle class="sh" cx="' + cx + '" cy="' + cy + '" r="30"/><line class="w thick" x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - 30) + '"/><circle class="nd" cx="' + cx + '" cy="' + (cy - 22) + '" r="4"/><circle class="nd" cx="' + cx + '" cy="' + cy + '" r="4"/>' + anim(pr) + '</g>';
    out += H.t(188, 64, 'Campo girante', { a: 'start', s: '1' }) + H.t(188, 84, 'n_s = ' + H.ans(k, g(ns) + ' rpm'), { a: 'start', s: '1' });
    out += H.t(188, 124, 'Rotor (eixo)', { a: 'start', s: '2' }) + H.t(188, 144, 'n = ' + g(n) + ' rpm', { a: 'start', s: '2' });
    out += H.t(188, 176, g(v.p) + ' polos, ' + g(v.f) + ' Hz', { a: 'start', c: 'tm', s: '1' });
    /* barras de rotação */
    var bx = 30, bw = 300, rw = bw * n / ns;
    if (!k.ver) {
      out += H.t(bx, 198, 'n_s (síncrona)', { a: 'start', c: 'tm', s: '1' }) + ph(bx, 204, bw, 14, '1');
      out += H.t(bx, 238, 'n (rotor)', { a: 'start', c: 'tm', s: '2' }) + ph(bx, 244, bw, 14, '2');
      out += H.t(bx + bw, 238, 'fora de escala', { a: 'end', c: 'tm' });
    } else {
    out += H.t(bx, 198, 'n_s (síncrona)', { a: 'start', c: 'tm', s: '1' }) + '<rect class="bar" x="' + bx + '" y="204" width="' + bw + '" height="14" rx="3" style="fill:var(--gold)"' + A('1') + '/>';
    out += H.t(bx, 238, 'n (rotor)', { a: 'start', c: 'tm', s: '2' });
    out += '<rect class="bar ok" x="' + bx + '" y="244" width="' + f1(rw) + '" height="14" rx="3"' + A('2') + '/><rect class="bar bad" x="' + f1(bx + rw) + '" y="244" width="' + f1(bw - rw) + '" height="14" rx="3"' + A('2 3') + '/>';
    out += H.t(bx + bw, 238, 'n_s − n', { a: 'end', c: 'tm', s: '2' });
    }
    out += H.t(180, 288, 'n_s − n = ' + H.ans(k, g(ns - n) + ' rpm'), { c: 't', s: '2' });
    out += H.t(180, 310, 's = (n_s − n)/n_s = ' + H.ans(k, g(s) + ' %'), { c: 'tg', s: '3' });
    return H.svg(360, 322, out, 'Motor de indução de ' + g(v.p) + ' polos em ' + g(v.f) + ' hertz: o campo girante do estator gira a ' + g(ns) + ' rpm e o rotor a ' + g(n) + ' rpm, um pouco mais devagar. A diferença entre as duas, em proporção da síncrona, é o escorregamento: ' + g(s) + ' por cento.');
  });

  /* ---------- corrente nominal do motor ---------- */
  reg('motor-corrente', function (v, k) {
    var Pw = v.Pu * 1000, Pe = Pw / v.eta, Sa = Pe / v.fp, den = R3 * v.V * v.eta * v.fp, I = Pw / den, out = '', i;
    var ys = [30, 56, 82], bw = 300;
    for (i = 0; i < 3; i++) out += H.w([[20, ys[i]], [250, ys[i]]], { c: 'hot', s: '4' });
    out += H.t(12, ys[0] + 4, 'A', { a: 'end', c: 'tm' }) + H.t(12, ys[1] + 4, 'B', { a: 'end', c: 'tm' }) + H.t(12, ys[2] + 4, 'C', { a: 'end', c: 'tm' });
    out += H.motor(284, 56, 34, 'M3~', '1').replace('class="t big"', 'class="t"');
    out += H.arrow(60, 12, 110, 12, { s: '4' }) + H.t(118, 16, 'I = ' + H.ans(k, g(I) + ' A'), { a: 'start', c: 'tg', s: '4' });
    out += H.t(150, 104, 'V = ' + g(v.V) + ' V entre linhas', { c: 'tm', s: '3' });
    out += H.flow('M20,' + ys[0] + ' H250', H.rate(I, 80), k.anim, 4);
    /* barras de potência: S ⊃ P_ent ⊃ P_u */
    var wS = bw, wP = bw * v.fp, wU = wP * v.eta, bx = 30;
    if (!k.ver) { wS = 300; wP = 250; wU = 200; }   /* Treinar: larguras fixas; S e P_ent só em contorno tracejado */
    function barra(y, wt, wa, ca, cb, s) {
      var gr = function (w) { return k.anim ? '<animate attributeName="width" from="0" to="' + f1(w) + '" dur="0.9s" fill="freeze"/>' : ''; };
      return '<rect class="bar ' + cb + '" x="' + bx + '" y="' + y + '" width="' + f1(wt) + '" height="14" rx="3"' + A(s) + '/><rect class="bar ' + ca + '" x="' + bx + '" y="' + y + '" width="' + f1(wa) + '" height="14" rx="3"' + A(s) + '>' + gr(wa) + '</rect>';
    }
    var phb = function (y, w, s) { return '<rect x="' + bx + '" y="' + y + '" width="' + w + '" height="14" rx="3" stroke-dasharray="4 3"' + A(s) + ' style="fill:none;stroke:var(--muted);stroke-width:1.5"/>' + H.t(bx + w / 2, y + 11, '?', { c: 'tm', s: s }); };
    out += H.t(bx, 134, 'S = ' + H.ans(k, g(Sa) + ' VA'), { a: 'start', s: '4' }) + (k.ver ? barra(140, wS, wP, '', 'dim', '4') : phb(140, wS, '4'));
    if (k.ver) out += H.t(bx + bw, 134, 'cinza: S − P (não é Q)', { a: 'end', c: 'tm', s: '4' });
    else out += H.t(bx + bw, 134, 'fora de escala', { a: 'end', c: 'tm' });
    out += H.t(bx, 180, 'P_ent = S·cos φ = ' + H.ans(k, g(Pe) + ' W'), { a: 'start', s: '2' }) + (k.ver ? barra(186, wP, wU, 'ok', 'bad', '2') : phb(186, wP, '2'));
    out += H.t(bx, 226, 'P_u = ' + g(v.Pu) + ' kW = ' + g(Pw) + ' W (eixo)', { a: 'start', s: '1' }) + barra(232, wU, wU, 'ok', 'ok', '1');
    out += H.t(180, 270, 'cos φ = ' + g(v.fp) + '   η = ' + g(v.eta) + '   √3·V·η·cos φ = ' + H.ans(k, g(den)), { c: 'tm', s: '3' });
    out += H.t(180, 292, 'I = S / (√3·V) = ' + H.ans(k, g(I) + ' A'), { c: 'tg', s: '4' });
    return H.svg(360, 304, out, 'Motor trifásico de ' + g(v.Pu) + ' quilowatts no eixo, ligado a ' + g(v.V) + ' volts, com rendimento ' + g(v.eta) + ' e fator de potência ' + g(v.fp) + '. Da rede entra mais potência do que sai no eixo: perdas e reativo. A corrente é a potência aparente dividida por raiz de três vezes a tensão.');
  });

  /* ---------- conjugado no eixo ---------- */
  reg('conjugado', function (v, k) {
    var w = 2 * Math.PI * v.n / 60, T = v.P * 1000 / w, out = '', cx = 92, cy = 100, i;
    var per = clamp(2.2 * 1740 / v.n, 1, 7), rot = k.anim ? '<animateTransform attributeName="transform" type="rotate" from="0 ' + cx + ' ' + cy + '" to="360 ' + cx + ' ' + cy + '" dur="' + per.toFixed(2) + 's" repeatCount="indefinite"/>' : '';
    out += '<g' + A('1') + '><circle class="sh" cx="' + cx + '" cy="' + cy + '" r="46"/>';
    for (i = 0; i < 4; i++) { var a = i * Math.PI / 2 + Math.PI / 4; out += '<line class="w dim" x1="' + cx + '" y1="' + cy + '" x2="' + f1(cx + 40 * Math.cos(a)) + '" y2="' + f1(cy + 40 * Math.sin(a)) + '"/>'; }
    out += '<circle class="nd" cx="' + cx + '" cy="' + cy + '" r="6"/><circle cx="' + cx + '" cy="' + (cy - 38) + '" r="5" style="fill:var(--gold)"/>' + rot + '</g>';
    /* seta tangencial do torque, em volta do eixo, no sentido da rotação */
    var r2 = 64, p1 = [cx + r2 * Math.cos(-0.7), cy + r2 * Math.sin(-0.7)], p2 = [cx + r2 * Math.cos(0.7), cy + r2 * Math.sin(0.7)];
    out += '<path class="ar" d="M' + f1(p1[0]) + ' ' + f1(p1[1]) + ' A' + r2 + ' ' + r2 + ' 0 0 1 ' + f1(p2[0]) + ' ' + f1(p2[1]) + '" fill="none" marker-end="url(#cfa)" style="stroke-width:3"' + A('2') + '/>';
    out += H.t(cx + r2 + 8, cy + 4, 'T', { a: 'start', c: 'tg', s: '2' });
    out += H.t(190, 48, 'P = ' + g(v.P) + ' kW', { a: 'start' }) + H.t(190, 70, 'n = ' + g(v.n) + ' rpm', { a: 'start', s: '1' });
    out += H.t(190, 92, 'ω = ' + H.ans(k, g(w) + ' rad/s'), { a: 'start', s: '1' });
    out += H.t(190, 128, 'T = P/ω', { a: 'start', c: 'tm', s: '2' }) + H.t(190, 150, 'T = ' + H.ans(k, g(T) + ' N·m'), { a: 'start', c: 'tg', s: '2' });
    out += H.t(190, 176, 'atalho: 9550·P/n', { a: 'start', c: 'tm', s: '3' });
    /* mesma potência, metade da rotação: o dobro de torque */
    var bx = 30, bw = 140, bar = function (y, wd, cls, sd) { return '<rect class="bar ' + cls + '" x="' + bx + '" y="' + y + '" width="' + f1(wd) + '" height="14" rx="3"' + A('2') + '>' + (k.anim ? '<animate attributeName="width" from="0" to="' + f1(wd) + '" dur="0.9s" fill="freeze"/>' : '') + '</rect>'; };
    out += H.t(180, 204, 'Mesma potência, outra rotação', { c: 'tm' });
    out += H.t(bx, 226, 'n = ' + g(v.n) + ' rpm: T = ' + H.ans(k, g(T) + ' N·m'), { a: 'start', s: '2' }) + bar(232, bw, 'ok');
    out += H.t(bx, 270, 'n/2 = ' + g(v.n / 2) + ' rpm: T = ' + H.ans(k, g(2 * T) + ' N·m'), { a: 'start', s: '2' }) + bar(276, 2 * bw, '');
    return H.svg(360, 300, out, 'Eixo de motor com ' + g(v.P) + ' quilowatts a ' + g(v.n) + ' rotações por minuto, gerando um conjugado de ' + g(T) + ' newtons-metro. A seta curva mostra o torque no sentido da rotação. Com a mesma potência e metade da rotação, o torque seria o dobro.');
  });

  /* ---------- partida estrela-triângulo ---------- */
  reg('estrela-triangulo', function (v, k) {
    var out = '', Ip = v.Ip, Tp = v.Tp;
    function rs(p, q, s, len) {
      var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI;
      return H.w([p, q], { c: 'hot', s: s }) + '<rect class="sh" x="' + (-len / 2) + '" y="-6" width="' + len + '" height="12" rx="2" transform="translate(' + f1(mx) + ',' + f1(my) + ') rotate(' + f1(ang) + ')"' + A(s) + '/>';
    }
    out += H.t(90, 18, 'Partida direta (Δ)', { s: '1' }) + H.t(270, 18, 'Partida em estrela (Y)', { s: '1' });
    out += '<line class="w dim" x1="180" y1="6" x2="180" y2="250" stroke-dasharray="3 4"/>';
    var tA = [90, 38], tB = [57, 95], tC = [123, 95];
    out += rs(tA, tB, '3', 32) + rs(tA, tC, '3', 32) + rs(tB, tC, '3', 32) + H.node(tA[0], tA[1]) + H.node(tB[0], tB[1]) + H.node(tC[0], tC[1]);
    var N = [270, 78], yA = [270, 36], yB = [234, 99], yC = [306, 99];
    out += rs(yA, N, '3', 26) + rs(yB, N, '3', 26) + rs(yC, N, '3', 26) + H.node(N[0], N[1]);
    out += H.t(90, 120, 'cada fase: V_L', { c: 'tm', s: '3' }) + H.t(270, 120, 'cada fase: V_L/√3', { c: 'tm', s: '3' });
    var bw = 150, x1 = 14, x2 = 194, gr = function (w) { return k.anim ? '<animate attributeName="width" from="0" to="' + f1(w) + '" dur="0.9s" fill="freeze"/>' : ''; };
    function barra(x, y, frac, cls, s) { return '<rect class="bar dim" x="' + x + '" y="' + y + '" width="' + bw + '" height="14" rx="3"/><rect class="bar ' + cls + '" x="' + x + '" y="' + y + '" width="' + f1(bw * frac) + '" height="14" rx="3"' + A(s) + '>' + gr(bw * frac) + '</rect>'; }
    out += H.t(x1, 146, 'corrente de linha', { a: 'start', c: 'tm', s: '1' }) + H.t(x2, 146, 'corrente de linha', { a: 'start', c: 'tm', s: '1' });
    out += H.t(x1, 166, 'I_{Δ} = ' + g(Ip) + ' A', { a: 'start', s: '1' }) + H.t(x2, 166, 'I_Y = ' + H.ans(k, g(Ip / 3) + ' A'), { a: 'start', s: '1' });
    out += k.ver ? barra(x1, 172, 1, 'bad', '1') + barra(x2, 172, 1 / 3, 'ok', '1') + H.t(x2 + bw - 6, 183, '÷ 3', { a: 'end', c: 'tm', s: '1' })
      : barra(x1, 172, 1, 'bad', '1') + ph(x2, 172, bw, 14, '1');
    out += H.t(x1, 210, 'conjugado de partida', { a: 'start', c: 'tm', s: '2' }) + H.t(x2, 210, 'conjugado de partida', { a: 'start', c: 'tm', s: '2' });
    out += H.t(x1, 230, 'T_{Δ} = ' + g(Tp) + ' N·m', { a: 'start', s: '2' }) + H.t(x2, 230, 'T_Y = ' + H.ans(k, g(Tp / 3) + ' N·m'), { a: 'start', s: '2' });
    out += k.ver ? barra(x1, 236, 1, 'ok', '2') + barra(x2, 236, 1 / 3, 'bad', '2') + H.t(x2 + bw - 6, 247, '÷ 3', { a: 'end', c: 'tm', s: '2' })
      : barra(x1, 236, 1, 'ok', '2') + ph(x2, 236, bw, 14, '2');
    if (k.ver) {
      out += H.t(180, 280, 'tensão na fase ÷ √3  →  (1/√3)² = 1/3', { c: 'tm', s: '3' });
      out += H.t(180, 298, 'corrente e conjugado caem a 1/3 (não a 1/√3)', { c: 'tm', s: '3' });
    }
    return H.svg(360, 308, out, 'Comparação da partida direta em triângulo e da partida em estrela. Em triângulo a corrente de linha é ' + g(Ip) + ' ampères e o conjugado ' + g(Tp) + ' newtons-metro. Em estrela cada fase recebe a tensão de linha dividida por raiz de três' + (k.ver ? ', e tanto a corrente de linha quanto o conjugado caem a um terço: ' + g(Ip / 3) + ' ampères e ' + g(Tp / 3) + ' newtons-metro.' : '. Calcule a corrente e o conjugado na partida em estrela.'));
  });

  /* ---------- corrente de projeto e disjuntor ---------- */
  reg('projeto', function (v, k) {
    var PAD = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200], Ib = v.P / (v.V * v.fp), In = PAD.filter(function (x) { return x >= Ib; })[0] || Math.ceil(Ib), out = '';
    /* circuito simplificado: fonte → disjuntor → cabo → carga */
    out += H.w([[64, 46], [64, 34], [100, 34]], { c: 'hot', s: '1' }) + H.w([[130, 34], [145, 34]], { c: 'hot', s: '1' }) + H.w([[145, 34], [310, 34], [310, 40]], { c: 'hot thick', s: '3' });
    out += H.w([[64, 78], [64, 90], [310, 90], [310, 84]], { c: 'hot', s: '1' });
    out += H.ac(64, 62, g(v.V) + ' V', '', '1') + H.res(310, 62, 'v', '', '', '1');
    out += '<g' + A('2') + '><rect class="sh" x="100" y="26" width="30" height="16" rx="2"/><line class="w" x1="106" y1="38" x2="124" y2="30"/></g>';
    out += H.t(115, 16, 'Disjuntor I_n = ' + H.ans(k, g(In) + ' A'), { s: '2' }) + H.t(268, 16, 'cabo: I_z ≥ I_n', { c: 'tm', s: '3' });
    out += H.arrow(150, 50, 224, 50, { s: '1' }) + H.t(187, 76, 'I_b = ' + H.ans(k, g(Ib) + ' A'), { c: 'tg', s: '1' });
    out += H.t(187, 108, 'carga: ' + g(v.P) + ' W · cos φ ' + g(v.fp), { c: 'tm', s: '1' });
    out += H.flow('M64,50 V34 H310 V90 H64 V74', H.rate(Ib, 60), k.anim, 5);
    /* régua de correntes */
    var x0 = 20, imax = In * 1.4, sc = 300 / imax, xb = x0 + Ib * sc, xn = x0 + In * sc, yr = 190;
    var grow = function (x, w, cls, s) { return '<rect class="bar ' + cls + '" x="' + f1(x) + '" y="' + yr + '" width="' + f1(Math.max(w, 0)) + '" height="14" rx="3"' + A(s) + '/>'; };
    if (k.ver) {
      out += grow(x0, xb - x0, '', '1') + grow(xb, xn - xb, 'ok', '2') + grow(xn, x0 + 300 - xn, 'dim', '3');
      out += H.arrow(x0 + 300, yr + 7, 342, yr + 7, { s: '3' });
      out += H.line(xb, 160, xb, yr, { d: '3 3', c: 'dim', s: '1' }) + H.node(xb, yr);
      out += H.t(clamp(xb, 50, 292), 154, 'I_b = ' + g(Ib) + ' A', { s: '1' });
      out += H.line(xn, yr + 14, xn, yr + 24, { c: 'dim', s: '2' });
      out += H.t(clamp(xn, 50, 292), yr + 40, 'I_n = ' + g(In) + ' A', { s: '2' });
    } else {
      /* Treinar: régua sem marcadores de I_b e I_n (posições dependem do resultado) */
      out += ph(x0, yr, 300, 14, '1', false) + H.arrow(x0 + 300, yr + 7, 342, yr + 7, { s: '3' });
      out += H.t(90, 154, 'I_b = ?', { s: '1' }) + H.t(190, yr + 40, 'I_n = ?', { s: '2' }) + H.t(340, yr + 40, 'fora de escala', { a: 'end', c: 'tm' });
    }
    out += H.t(302, 176, 'I_z ≥ I_n', { c: 'tm', s: '3' });
    out += H.t(x0, yr + 40, '0', { a: 'start', c: 'tm' });
    out += H.t(180, 254, 'I_b ≤ I_n ≤ I_z', { c: 'tg', s: '3' });
    if (k.ver) out += H.t(180, 276, 'verde: folga do disjuntor · cinza: o cabo aguenta', { c: 'tm', s: '3' });
    out += H.t(180, 296, 'se I_n < I_b o disjuntor desarma sem defeito', { c: 'tm' }).replace('class="tm"', 'class="tm" style="fill:var(--bad)"');
    return H.svg(360, 306, out, 'Circuito monofásico de ' + g(v.V) + ' volts com carga de ' + g(v.P) + ' watts e fator de potência ' + g(v.fp) + ': fonte, disjuntor, cabo e carga. A régua de correntes mostra que a corrente de projeto Ib fica abaixo ou igual à corrente do disjuntor In, que fica abaixo ou igual à capacidade do cabo Iz.');
  });
})(window);

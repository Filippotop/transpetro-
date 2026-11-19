/* Figuras das contas (parte 4): queda, ma420, juros, desconto, regra3, bhaskara, combinacao, prefixos. Ver js/contas-fig.js */
(function (W) {
  'use strict';
  var H = W.CONTASFIG.H, reg = W.CONTASFIG.reg, g = H.g;
  var A = function (s) { return s ? ' data-s="' + s + '"' : ''; };
  var f1 = function (x) { return Number(x).toFixed(1); };
  var clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  /* retângulo simples (cls: classe; st: style opcional) */
  function rect(x, y, w, h, cls, s, st, rx) {
    return '<rect class="' + cls + '" x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(Math.max(0, w)) + '" height="' + f1(Math.max(0, h)) + '" rx="' + (rx == null ? 3 : rx) + '"' + (st ? ' style="' + st + '"' : '') + A(s) + '/>';
  }
  /* coluna que cresce de baixo para cima (só anima com anim) */
  function vbar(x, yb, w, h, cls, s, anim, delay) {
    if (!anim || h <= 0) return rect(x, yb - h, w, h, cls, s);
    return '<rect class="' + cls + '" x="' + f1(x) + '" y="' + f1(yb) + '" width="' + f1(w) + '" height="0" rx="3"' + A(s) + '>'
      + '<animate attributeName="height" from="0" to="' + f1(h) + '" dur="0.5s" begin="' + (delay || 0).toFixed(2) + 's" fill="freeze"/>'
      + '<animate attributeName="y" from="' + f1(yb) + '" to="' + f1(yb - h) + '" dur="0.5s" begin="' + (delay || 0).toFixed(2) + 's" fill="freeze"/></rect>';
  }
  /* Treinar: contorno tracejado de tamanho FIXO com "?" no lugar de uma grandeza que é resultado */
  function ph(x, y, w, h, s, q) {
    return '<rect x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(w) + '" height="' + f1(h) + '" rx="3" stroke-dasharray="4 3"' + A(s)
      + ' style="fill:none;stroke:var(--muted);stroke-width:1.5"/>' + (q === false ? '' : H.t(x + w / 2, y + h / 2 + 4, '?', { c: 'tm', s: s }));
  }
  var rs = function (x) { return 'R$\u00a0' + Number(x).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var sup = function (n) { return String(n).replace(/-/g, '⁻').replace(/[0-9]/g, function (d) { return '⁰¹²³⁴⁵⁶⁷⁸⁹'.charAt(+d); }); };

  /* ---------- queda de tensão: ida e volta ---------- */
  reg('queda', function (v, k) {
    var B = H, Rw = v.rho * v.L / v.S, dV = 2 * Rw * v.I, pc = dV / v.V * 100, Vc = v.V - dV, out = '';
    var xS = 80, xC = 290, yT = 56, yB = 130, yM = 93;
    out += B.w([[xS, 77], [xS, yT], [128, yT]], { c: 'hot', s: '1' }) + B.w([[172, yT], [xC, yT], [xC, 71]], { c: 'hot', s: '1' });
    out += B.w([[xC, 115], [xC, yB], [172, yB]], { c: 'hot', s: '1' }) + B.w([[128, yB], [xS, yB], [xS, 109]], { c: 'hot', s: '1' });
    out += B.ac(xS, yM, 'V', g(v.V) + ' V', '3');
    out += B.res(150, yT, 'h', 'ida: ' + B.ans(k, g(Rw) + ' Ω'), '', '1') + B.res(150, yB, 'h', '', 'volta: ' + B.ans(k, g(Rw) + ' Ω'), '1');
    out += B.res(xC, yM, 'v', 'carga', '', '2');
    out += B.arrow(228, 46, 276, 46, { s: '2' }) + B.t(252, 38, 'I = ' + g(v.I) + ' A', { s: '2' });
    /* cota do comprimento L (cada condutor tem L) */
    out += B.line(xS, 140, xS, 182, { d: '3 3', c: 'dim' }) + B.line(xC, 140, xC, 182, { d: '3 3', c: 'dim' });
    out += B.arrow(150, 172, xS, 172, { s: '1' }) + B.arrow(220, 172, xC, 172, { s: '1' }) + B.t(185, 176, 'L = ' + g(v.L) + ' m');
    out += B.t(185, 194, 'ρ = ' + g(v.rho) + ' Ω·mm²/m   S = ' + g(v.S) + ' mm²', { c: 'tm', s: '1' });
    out += B.flow('M' + xS + ',77 V56 H' + xC + ' V93 V130 H' + xS + ' V109', B.rate(v.I, 40), k.anim, 5);
    /* perfil de tensão (barras em escala real) */
    var x0 = 30, Wd = 300, seg = Math.max(5, Wd * dV / v.V), wOk = Wd - seg;
    out += B.t(x0, 220, 'Na fonte: ' + g(v.V) + ' V', { a: 'start', s: '3' });
    out += B.bar(x0, 226, Wd, 14, 1, '', '3');
    if (k.ver) {
      out += B.t(x0, 262, 'Na carga: ' + g(Vc) + ' V', { a: 'start', s: '2 3' });
      out += B.bar(x0, 268, wOk, 14, 1, 'ok', '2 3') + rect(x0 + wOk, 268, seg, 14, 'bar bad', '2 3');
      out += B.line(x0 + Wd - seg / 2, 284, x0 + Wd - seg / 2, 290, { c: 'dim', s: '2 3' });
    } else {
      out += B.t(x0, 262, 'Na carga: ?', { a: 'start', s: '2 3' }) + ph(x0, 268, Wd, 14, '2 3') + B.t(x0 + Wd, 262, 'fora de escala', { a: 'end', c: 'tm' });
    }
    out += B.t(x0 + Wd, 304, 'queda ΔV = ' + B.ans(k, g(dV) + ' V (' + g(pc) + ' %)'), { a: 'end', c: 'tg', s: '2 3 4' });
    out += B.ca(324);
    return B.svg(360, 346, out, 'Circuito monofásico: fonte de ' + g(v.V) + ' volts, dois condutores (ida e volta) de ' + g(v.L) + ' metros e seção de ' + g(v.S) + ' mm², cada um com resistência de ' + g(Rw) + ' ohms, alimentando uma carga de ' + g(v.I) + ' ampères. A tensão na carga é menor que a da fonte; a diferença é a queda de tensão, que conta a ida e a volta.');
  });

  /* ---------- 4–20 mA ---------- */
  reg('ma420', function (v, k) {
    var B = H, fr = (v.I - 4) / 16, x = v.mn + fr * (v.mx - v.mn), out = '';
    var yTop = 44, yBot = 194, hh = 150, fc = clamp(fr, -0.1, 1.1), yP = yBot - fc * hh, tL = 40, tR = 230, tw = 20;
    out += B.t(50, 18, 'Processo', { c: 'tm' }) + B.t(240, 18, 'Sinal (mA)', { c: 'tm' });
    out += rect(tL, yTop, tw, hh, 'bar dim', '') + rect(tR, yTop, tw, hh, 'bar dim', '');
    var fh = clamp(fc, 0, 1) * hh;
    if (fh > 0) {
      var fill = function (xx) {
        if (!k.anim) return rect(xx, yBot - fh, tw, fh, 'bar', '1 2');
        return '<rect class="bar" x="' + xx + '" y="' + yBot + '" width="' + tw + '" height="0" rx="3" data-s="1 2"><animate attributeName="height" from="0" to="' + f1(fh) + '" dur="0.6s" fill="freeze"/><animate attributeName="y" from="' + yBot + '" to="' + f1(yBot - fh) + '" dur="0.6s" fill="freeze"/></rect>';
      };
      out += k.ver ? fill(tL) + fill(tR) : '';
    }
    if (!k.ver) out += ph(tR, yTop, tw, hh, '1 2', false);
    /* marcas de ¼, ½ e ¾ só depois da resposta: antes, dariam a leitura direta */
    if (k.ver) [0.25, 0.5, 0.75].forEach(function (f) { var y = yBot - f * hh; out += B.line(tL - 5, y, tL, y, { c: 'dim' }) + B.line(tR + tw, y, tR + tw + 5, y, { c: 'dim' }); });
    out += B.line(tL + tw, yTop, tR, yTop, { d: '2 4', c: 'dim' }) + B.line(tL + tw, yBot, tR, yBot, { d: '2 4', c: 'dim' });
    out += B.t(34, yBot + 4, g(v.mn), { a: 'end', c: 'tm' }) + B.t(34, yTop + 4, g(v.mx), { a: 'end', c: 'tm' }) + (k.ver ? B.t(34, yBot - hh / 2 + 4, g((v.mn + v.mx) / 2), { a: 'end', c: 'tm' }) : '');
    out += B.t(258, yBot + 4, '4 mA = zero', { a: 'start', c: 'tg', s: '1' }) + B.t(256, yTop + 4, '20 mA = fundo', { a: 'start', c: 'tm' });
    out += B.line(352, yTop, 352, yBot, { c: 'dim', s: '2' }) + B.line(347, yTop, 352, yTop, { c: 'dim' }) + B.line(347, yBot, 352, yBot, { c: 'dim' });
    out += B.t(346, 107, 'faixa útil', { a: 'end', c: 'tm', s: '2' }) + B.t(346, 125, '16 mA', { a: 'end', c: 'tm', s: '2' });
    /* ponteiro */
    var yL = k.ver ? yP : yTop + 60;   /* Treinar: textos em altura fixa (a posição seria a resposta) */
    if (k.ver) out += B.line(tL + tw, yP, tR, yP, { c: 'hot', s: '2 3' }) + '<circle class="pt" cx="' + (tL + tw) + '" cy="' + f1(yP) + '" r="4" data-s="3"/><circle class="pt" cx="' + tR + '" cy="' + f1(yP) + '" r="4" data-s="2"/>';
    out += B.t(145, yL - 8, 'I = ' + g(v.I) + ' mA', { s: '1 2' }) + B.t(145, yL + 14, 'x = ' + B.ans(k, g(x)), { c: 'tg', s: '3' });
    if (!k.ver) out += B.t(145, yL + 32, 'fora de escala', { c: 'tm' });
    /* laço transmissor → CLP */
    out += rect(14, 230, 126, 46, 'sh', '', '', 4) + B.t(77, 257, 'Transmissor') + rect(220, 230, 126, 46, 'sh', '', '', 4) + B.t(283, 257, 'CLP');
    out += B.w([[140, 240], [220, 240]], { c: 'hot' }) + B.w([[220, 266], [140, 266]], { c: 'hot' });
    out += B.arrow(165, 240, 195, 240) + B.t(180, 258, 'laço', { c: 'tm' });
    out += B.flow('M140,240 H220 V266 H140', B.rate(v.I, 20), k.anim, 4);
    out += B.t(180, 300, '0 mA = laço aberto (cabo rompido)', { c: 'tm' });
    return B.svg(360, 310, out, 'Medidor vertical: o processo vai de ' + g(v.mn) + ' a ' + g(v.mx) + ', correspondendo a 4 mA (zero) e 20 mA (fundo de escala), uma faixa de 16 mA. A corrente lida é ' + g(v.I) + ' mA' + (k.ver ? ', que corresponde a ' + g(fr * 100) + ' por cento da faixa' : '') + '. O transmissor envia a corrente ao CLP por um laço de dois fios.');
  });

  /* ---------- juros compostos ---------- */
  reg('juros', function (v, k) {
    var B = H, n = Math.max(1, Math.round(v.n)), i = v.i / 100, f = Math.pow(1 + i, n), M = v.C * f, out = '';
    var x0 = 40, Wd = 300, yb = 190, hh = 120, many = n > 12;
    var val = function (t) { return Math.pow(1 + i, t); };
    var X = function (t) { return x0 + Wd * t / n; };
    var Y = function (r) { return yb - hh * r / f; };
    if (!k.ver) {
      /* Treinar: só C (barra fixa) e um contorno "?" para M; nada à escala do fator (1+i)^n */
      var hc = 36, yc = yb - hc;
      out += B.line(x0 - 4, yb, x0 + Wd + 6, yb) + B.line(x0, yc, x0 + Wd, yc, { d: '4 4', c: 'dim', s: '1' });
      out += rect(x0, yc, 30, hc, 'bar dim', '2') + ph(x0 + Wd - 30, yb - 100, 30, 100, '3 4');
      out += B.t(x0 + 15, yb + 16, '0', { c: 'tm' }) + B.t(x0 + Wd, yb + 16, n + (n === 1 ? ' período' : ' períodos'), { a: 'end', c: 'tm' });
      out += B.t(x0 + 36, yc - 7, 'C = ' + rs(v.C), { a: 'start', c: 'tg', s: '3' });
      out += B.t(x0 + Wd - 36, yb - 100 + 14, 'M = ?', { a: 'end', c: 'tg', s: '3' }) + B.t(180, yb - 60, 'fora de escala', { c: 'tm' });
    } else {
    /* linha de referência no nível de C e eixo */
    out += B.line(x0, Y(1), x0 + Wd, Y(1), { d: '4 4', c: 'dim', s: '1' }) + B.line(x0 - 4, yb, x0 + Wd + 6, yb);
    if (!many) {
      var slot = Wd / (n + 1), bw = Math.min(slot * 0.72, 30);
      for (var t = 0; t <= n; t++) {
        var bx = x0 + t * slot + (slot - bw) / 2, h = hh * val(t) / f;
        if (t === n && n > 0) {
          var hC = hh / f;
          out += vbar(bx, yb, bw, hC, 'bar', '2', k.anim, t * 0.03) + vbar(bx, yb - hC, bw, h - hC, 'bar ok', '3 4', k.anim, t * 0.03);
        } else out += vbar(bx, yb, bw, h, t === 0 ? 'bar dim' : 'bar', '2', k.anim, t * 0.03);
      }
      /* juros simples: pontos apagados */
      var pts = [];
      for (var u = 0; u <= n; u++) pts.push(f1(x0 + u * slot + slot / 2) + ',' + f1(Y(1 + i * u)));
      out += '<polyline class="w dim" points="' + pts.join(' ') + '" stroke-dasharray="3 3"/>';
      out += B.t(x0, yb + 16, '0', { a: 'start', c: 'tm' });
    } else {
      var cp = [], sp = [], N = 48;
      for (var j = 0; j <= N; j++) { var tt = n * j / N; cp.push(f1(X(tt)) + ',' + f1(Y(val(tt)))); sp.push(f1(X(tt)) + ',' + f1(Y(1 + i * tt))); }
      out += '<polyline class="w dim" points="' + sp.join(' ') + '" stroke-dasharray="3 3"/>';
      out += '<polyline class="curva' + (k.anim ? ' draw' : '') + '" points="' + cp.join(' ') + '" data-s="2"/>';
      out += '<circle class="pt" cx="' + f1(X(n)) + '" cy="' + f1(Y(f)) + '" r="4" data-s="3"/>';
      out += B.t(x0, yb + 16, '0', { a: 'start', c: 'tm' });
    }
    out += B.t(x0 + Wd, yb + 16, n + (n === 1 ? ' período' : ' períodos'), { a: 'end', c: 'tm' });
    out += B.t(x0, Y(1) - 7, 'C = ' + rs(v.C), { a: 'start', c: 'tg', s: '3' });
    out += B.t(x0 + Wd, Y(f) - 8, 'M = ' + rs(M), { a: 'end', c: 'tg', s: '3' });
    }
    out += B.t(180, 232, 'fator (1 + i)<tspan baseline-shift="super" font-size="72%">n</tspan> = (1 + ' + g(i) + ')<tspan baseline-shift="super" font-size="72%">' + n + '</tspan> = ' + B.ans(k, g(f)), { c: 't', s: '2' });
    out += B.t(180, 252, 'juros J = M − C = ' + B.ans(k, rs(M - v.C)), { c: 'tg', s: '4' });
    if (k.ver) {
    out += rect(36, 268, 14, 8, 'bar', '', '', 2) + B.t(56, 277, 'compostos (taxa sobre o montante)', { a: 'start', c: 'tm' });
    out += '<line class="w dim" x1="36" y1="292" x2="50" y2="292" stroke-dasharray="3 3"/>' + B.t(56, 296, 'juros simples (linha reta, menor)', { a: 'start', c: 'tm' });
    }
    return B.svg(360, 306, out, 'Gráfico do capital de R$ ' + g(v.C) + ' a ' + g(v.i) + ' por cento por período durante ' + n + ' períodos. A cada período a taxa incide sobre o montante anterior e o crescimento acelera; os juros simples, em linha reta, ficariam abaixo.');
  });

  /* ---------- descontos sucessivos ---------- */
  reg('desconto', function (v, k) {
    var B = H, a = 1 - v.d1 / 100, b2 = 1 - v.d2 / 100, f = a * b2, P1 = v.P * a, P2 = v.P * f, out = '';
    var yb = 150, hm = 110, bw = 60, xs = [30, 150, 270];
    var hs = [hm, hm * a, hm * f].map(function (h) { return Math.max(2, h); });
    var tr = !k.ver;   /* Treinar: só o preço inicial à escala; os demais em contorno fixo */

    out += B.line(10, yb, 350, yb);
    if (tr) out += vbar(xs[0], yb, bw, hs[0], 'bar dim', '1', k.anim, 0) + ph(xs[1], yb - 90, bw, 90, '1 2') + ph(xs[2], yb - 70, bw, 70, '2 3');
    else out += vbar(xs[0], yb, bw, hs[0], 'bar dim', '1', k.anim, 0) + vbar(xs[1], yb, bw, hs[1], 'bar', '1 2', k.anim, 0.2) + vbar(xs[2], yb, bw, hs[2], 'bar ok', '2 3', k.anim, 0.4);
    var yl = tr ? [yb - hs[0] - 7, yb - 97, yb - 77] : [yb - hs[0] - 7, yb - hs[1] - 7, yb - hs[2] - 7];
    out += B.t(xs[0] + bw / 2, yl[0], rs(v.P), { c: 't' }) + (tr ? '' : B.t(xs[1] + bw / 2, yl[1], rs(P1), { s: '1' }) + B.t(xs[2] + bw / 2, yl[2], rs(P2), { c: 'tg', s: '3' }));
    out += B.t(xs[0] + bw / 2, yb + 16, 'inicial', { c: 'tm' }) + B.t(xs[1] + bw / 2, yb + 16, 'após 1º', { c: 'tm' }) + B.t(xs[2] + bw / 2, yb + 16, 'após 2º', { c: 'tm' });
    out += B.arrow(94, 100, 146, 100, { s: '1' }) + B.t(120, 92, '× ' + g(a), { s: '1' }) + B.t(120, 118, '−' + g(v.d1) + ' %', { c: 'tm', s: '1' });
    out += B.arrow(214, 100, 266, 100, { s: '1' }) + B.t(240, 92, '× ' + g(b2), { s: '1' }) + B.t(240, 118, '−' + g(v.d2) + ' %', { c: 'tm', s: '1' });
    out += B.t(180, 186, 'fator total = ' + g(a) + ' · ' + g(b2) + ' = ' + B.ans(k, g(f)), { c: 'tg', s: '2' });
    /* comparação: desconto total real × soma ingênua */
    var Wd = 300, real = (1 - f) * 100, soma = v.d1 + v.d2, sc = Wd / (Math.max(soma, real) * 1.08);
    if (tr) sc = 230 / soma;
    out += B.t(30, 214, 'Desconto total certo' + (tr ? '' : ': ' + B.ans(k, g(real) + ' %')), { a: 'start', c: 't', s: '4' });
    out += tr ? ph(30, 220, 170, 14, '4') : rect(30, 220, Math.max(2, real * sc), 14, 'bar ok', '4');
    out += B.t(30, 256, 'Soma ingênua (errado): ' + g(soma) + ' %', { a: 'start', c: 't', s: '4' });
    out += rect(30, 262, Math.max(2, soma * sc), 14, 'bar bad', '4');
    if (!tr) out += B.line(30 + real * sc, 234, 30 + real * sc, 270, { d: '3 3', c: 'dim', s: '4' });
    return B.svg(360, 290, out, 'Preço inicial de R$ ' + g(v.P) + ' com descontos sucessivos de ' + g(v.d1) + ' por cento e depois ' + g(v.d2) + ' por cento. O segundo desconto incide sobre o preço já reduzido, por isso o desconto total não é a soma ' + g(soma) + ' por cento.');
  });

  /* ---------- regra de três ---------- */
  reg('regra3', function (v, k) {
    var B = H, dir = v.tipo === 'd', x = dir ? v.b * v.c / v.a : v.a * v.b / v.c, out = '';
    var fa = v.c / v.a, sobe = v.c >= v.a, sobeX = dir ? sobe : !sobe, fb = dir ? fa : 1 / fa;
    var cx = [125, 275], cy = [60, 130], cw = 80, ch = 40;
    var cell = function (i, j, txt, s, cls) {
      return rect(cx[j] - cw / 2, cy[i] - ch / 2, cw, ch, 'sh', s, 'fill:var(--surface)', 4) + B.t(cx[j], cy[i] + 5, txt, { c: cls || 't', s: s });
    };
    out += B.t(125, 18, 'caso conhecido', { c: 'tm' }) + B.t(275, 18, 'caso novo', { c: 'tm' });
    out += B.t(8, 64, 'grandeza 1', { a: 'start', c: 'tm' }) + B.t(8, 134, 'grandeza 2', { a: 'start', c: 'tm' });
    out += cell(0, 0, 'a = ' + g(v.a), '2') + cell(0, 1, 'c = ' + g(v.c), '2') + cell(1, 0, 'b = ' + g(v.b), '2') + cell(1, 1, 'x = ' + B.ans(k, g(x)), '3', 'tg');
    out += B.arrow(169, 60, 231, 60, { s: '1' }) + B.t(200, 50, '× ' + g(v.c) + '/' + g(v.a), { s: '1' }) + B.t(200, 76, sobe ? 'sobe' : 'desce', { c: 'tm', s: '1' });
    out += B.arrow(169, 130, 231, 130, { s: '1' }) + B.t(200, 120, k.ver ? '× ' + (dir ? g(v.c) + '/' + g(v.a) : g(v.a) + '/' + g(v.c)) : '× ?', { s: '1' }) + B.t(200, 146, sobeX ? 'sobe' : 'desce', { c: 'tm', s: '1' });
    if (dir) {
      out += B.line(150, 84, 250, 106, { d: '4 3', c: 'hot', s: '2' }) + B.line(150, 106, 250, 84, { d: '4 3', c: 'hot', s: '2' });
    } else {
      out += B.line(125, 82, 125, 108, { c: 'hot', s: '2' }) + B.line(275, 82, 275, 108, { c: 'hot', s: '2' });
      out += B.t(131, 99, 'a·b', { a: 'start', c: 'tm', s: '2' }) + B.t(281, 99, 'c·x', { a: 'start', c: 'tm', s: '2' });
    }
    out += B.t(180, 182, dir ? 'DIRETA: as duas sobem (ou descem) juntas' : 'INVERSA: uma sobe, a outra desce', { c: 'tg', s: '1' });
    out += B.t(180, 202, dir ? 'a / b = c / x   (produtos cruzados: b·c = a·x)' : 'a · b = c · x   (o produto não muda)', { s: '2' });
    out += B.t(180, 224, k.ver ? 'x = ' + (dir ? 'b·c / a = ' + g(v.b) + ' · ' + g(v.c) + ' / ' + g(v.a) : 'a·b / c = ' + g(v.a) + ' · ' + g(v.b) + ' / ' + g(v.c)) + ' = ' + B.ans(k, g(x)) : 'x = ?', { c: 'tg', s: '3' });
    return B.svg(360, 238, out, 'Regra de três ' + (dir ? 'direta' : 'inversa') + ': na grandeza 1, de ' + g(v.a) + ' para ' + g(v.c) + '; na grandeza 2, de ' + g(v.b) + ' para x. ' + (dir ? 'As duas grandezas variam no mesmo sentido: x = b·c/a.' : 'Quando uma sobe a outra desce e o produto se mantém: x = a·b/c.'));
  });

  /* ---------- Bhaskara ---------- */
  reg('bhaskara', function (v, k) {
    var B = H, a = v.a, b = v.b, c = v.c, out = '';
    if (!a) return B.svg(360, 60, B.t(180, 34, 'a = 0: não é equação do 2º grau', { c: 'tg' }), 'Com a igual a zero a equação deixa de ser do segundo grau.');
    var D = b * b - 4 * a * c, xv = -b / (2 * a), yv = c - b * b / (4 * a), r1, r2, lo, hi;
    if (D >= 0) { r1 = (-b + Math.sqrt(D)) / (2 * a); r2 = (-b - Math.sqrt(D)) / (2 * a); }
    var xs = [0, xv]; if (D >= 0) xs.push(r1, r2);
    lo = Math.min.apply(null, xs); hi = Math.max.apply(null, xs);
    var span = Math.max(hi - lo, 2); lo -= span * 0.3; hi += span * 0.3;
    var F = function (t) { return a * t * t + b * t + c; };
    var ys = [0, yv, F(lo), F(hi)], ylo = Math.min.apply(null, ys), yhi = Math.max.apply(null, ys), yp = (yhi - ylo) * 0.08 || 1; ylo -= yp; yhi += yp;
    var px0 = 20, px1 = 340, py0 = 46, py1 = 205;
    var X = function (t) { return px0 + (px1 - px0) * (t - lo) / (hi - lo); }, Y = function (y) { return py1 - (py1 - py0) * (y - ylo) / (yhi - ylo); };
    var sg = function (t, first) { return (t < 0 ? ' − ' : first ? '' : ' + ') + (Math.abs(t) === 1 && first !== 2 ? '' : g(Math.abs(t))); };
    var eq = 'y = ' + (a < 0 ? '−' : '') + (Math.abs(a) === 1 ? '' : g(Math.abs(a))) + 'x²' + (b ? (b < 0 ? ' − ' : ' + ') + (Math.abs(b) === 1 ? '' : g(Math.abs(b))) + 'x' : '') + (c ? (c < 0 ? ' − ' : ' + ') + g(Math.abs(c)) : '');
    out += B.t(px0, 16, eq, { a: 'start', c: 't' }) + B.t(px1, 16, a > 0 ? 'a > 0: abre para cima' : 'a < 0: abre para baixo', { a: 'end', c: 'tm' });
    if (!k.ver) {
      /* Treinar: forma genérica (só o sentido de a); sem eixo x, sem raízes, sem vértice à escala */
      var gp = [], gs = a > 0 ? 1 : -1;
      for (var gi = 0; gi <= 60; gi++) { var gt = -1 + 2 * gi / 60; gp.push(f1(180 + 90 * gt) + ',' + f1(125 + gs * (-70 + 70 * gt * gt) * -1)); }
      out += B.line(180, py0, 180, py1, { d: '3 4', c: 'dim', s: '4' });
      out += '<polyline class="curva' + (k.anim ? ' draw' : '') + '" points="' + gp.join(' ') + '" data-s="1 3"/>';
      out += B.t(180, 232, 'forma genérica, fora de escala', { c: 'tm' });
      out += B.t(180, 258, 'Δ = b² − 4ac = ' + (b < 0 ? '(' + g(b) + ')' : g(b)) + '² − 4 · ' + g(a) + ' · ' + g(c) + ' = ?', { c: 'tg', s: '1' });
      out += B.t(180, 278, '?', { c: 't', s: '1 2' });
      return B.svg(360, 290, out, 'Parábola ' + eq + ', ' + (a > 0 ? 'aberta para cima' : 'aberta para baixo') + ', desenhada fora de escala. Calcule o discriminante e as raízes.');
    }
    var cid = 'cfbh';
    out += '<clipPath id="' + cid + '"><rect x="' + px0 + '" y="' + (py0 - 4) + '" width="' + (px1 - px0) + '" height="' + (py1 - py0 + 8) + '"/></clipPath>';
    /* eixos */
    out += B.arrow(px0 - 4, f1(Y(0)), px1 + 4, f1(Y(0)), { c: 'dim' }) + B.arrow(f1(X(0)), py1 + 4, f1(X(0)), py0 - 8, { c: 'dim' });
    out += B.t(px1 + 8, Y(0) + 4, 'x', { a: 'start', c: 'tm' }) + B.t(X(0) + 8, py0 - 2, 'y', { a: 'start', c: 'tm' });
    /* eixo de simetria */
    out += B.line(X(xv), py0, X(xv), py1, { d: '3 4', c: 'dim', s: '4' });
    var pts = [], N = 90;
    for (var i = 0; i <= N; i++) { var t = lo + (hi - lo) * i / N; pts.push(f1(X(t)) + ',' + f1(Y(F(t)))); }
    out += '<g clip-path="url(#' + cid + ')"><polyline class="curva' + (k.anim ? ' draw' : '') + '" points="' + pts.join(' ') + '" data-s="1 3"/></g>';
    /* c: ponto onde a curva corta o eixo y */
    out += '<circle class="pt" cx="' + f1(X(0)) + '" cy="' + f1(Y(c)) + '" r="3.5" style="opacity:.75"/>' + (c ? B.t(X(0) + 8, Y(c) + (a > 0 ? -6 : 14), 'c = ' + g(c), { a: 'start', c: 'tm' }) : '');
    /* vértice e raízes */
    var ty = a > 0 ? Math.max(Y(yv) + 18, Y(0) + 36) : Math.min(Y(yv) - 10, Y(0) - 28);
    if (D > 0) {
      out += '<circle class="pt" cx="' + f1(X(yv === 0 ? xv : xv)) + '" cy="' + f1(Y(yv)) + '" r="4" data-s="4"/>' + B.t(X(xv), ty, 'vértice', { c: 'tm', s: '4' });
      var rl = Math.min(r1, r2), rr = Math.max(r1, r2);
      out += '<circle class="pt" cx="' + f1(X(rl)) + '" cy="' + f1(Y(0)) + '" r="4.5" data-s="3"/><circle class="pt" cx="' + f1(X(rr)) + '" cy="' + f1(Y(0)) + '" r="4.5" data-s="3"/>';
      out += B.t(X(rl) - 4, Y(0) + (a > 0 ? 18 : -10), 'x = ' + B.ans(k, g(rl)), { a: 'end', c: 'tg', s: '3' }) + B.t(X(rr) + 4, Y(0) + (a > 0 ? 18 : -10), 'x = ' + B.ans(k, g(rr)), { a: 'start', c: 'tg', s: '3' });
    } else if (D === 0) {
      out += '<circle class="pt" cx="' + f1(X(xv)) + '" cy="' + f1(Y(0)) + '" r="5" data-s="3 4"/>' + B.t(X(xv), Y(0) + (a > 0 ? 20 : -12), 'raiz dupla x = ' + B.ans(k, g(xv)), { c: 'tg', s: '3' });
    } else {
      out += '<circle class="pt" cx="' + f1(X(xv)) + '" cy="' + f1(Y(yv)) + '" r="4" data-s="4"/>' + B.t(X(xv), ty, 'vértice', { c: 'tm', s: '4' });
    }
    out += B.t(180, 258, 'Δ = b² − 4ac = ' + (b < 0 ? '(' + g(b) + ')' : g(b)) + '² − 4 · ' + g(a) + ' · ' + g(c) + ' = ' + B.ans(k, g(D)), { c: 'tg', s: '1' });
    out += B.t(180, 278, B.ans(k, D > 0 ? 'Δ > 0: a curva corta o eixo x em 2 pontos' : D === 0 ? 'Δ = 0: a curva só toca o eixo x (1 raiz)' : 'Δ < 0: a curva não toca o eixo x'), { c: 't', s: '1 2' });
    return B.svg(360, 290, out, 'Gráfico da parábola ' + eq + '. O discriminante é ' + g(D) + (D > 0 ? ': a parábola corta o eixo x em duas raízes, ' + g(Math.min(r1, r2)) + ' e ' + g(Math.max(r1, r2)) + '.' : D === 0 ? ': a parábola toca o eixo x em uma raiz dupla, ' + g(xv) + '.' : ': a parábola não toca o eixo x, sem raízes reais.'));
  });

  /* ---------- combinação e arranjo ---------- */
  reg('combinacao', function (v, k) {
    var B = H, n = Math.max(1, Math.round(v.n)), p = Math.max(0, Math.round(v.p)), out = '';
    var fat = function (m) { var r = 1; for (var q = 2; q <= m; q++) r *= q; return r; };
    var Ar = fat(n) / fat(n - p), Cb = Ar / fat(p), pf = fat(p);
    var lab = function (q) { return n <= 26 ? String.fromCharCode(65 + q) : String(q + 1); };
    out += B.t(180, 16, 'n = ' + g(n) + ' elementos; escolher p = ' + g(p), { c: 't', s: '1' });
    var r = clamp(Math.floor(320 / n / 2) - 2, 5, 15), step = Math.min(2 * r + 6, 330 / n), x0 = 180 - step * (n - 1) / 2;
    for (var q = 0; q < n; q++) {
      var cx = x0 + q * step, on = q < p;
      out += '<circle class="sh" cx="' + f1(cx) + '" cy="50" r="' + r + '" style="fill:' + (on ? 'var(--gold)' : 'var(--surface)') + '"' + A(on ? '1' : '') + '/>';
      if (r >= 9) out += H.t(cx, 55, lab(q), { c: 'tm', s: on ? '1' : '' });
    }
    if (p > 0) {
      var xa = x0 - r, xb = x0 + (p - 1) * step + r;
      out += B.line(xa, 74, xb, 74, { c: 'hot', s: '1' }) + B.t((xa + xb) / 2, 92, 'p = ' + g(p), { c: 'tm', s: '1' });
    }
    if (p < n) {
      var xc = x0 + p * step - r, xd = x0 + (n - 1) * step + r;
      out += B.line(xc, 74, xd, 74, { c: 'dim' }) + B.t((xc + xd) / 2, 92, 'ficam fora: ' + g(n - p), { c: 'tm' });
    }
    out += B.line(180, 108, 180, 188, { c: 'dim' });
    var chip = function (x, y, txt, s) { return rect(x, y, 24, 22, 'sh', s, 'fill:var(--gold)', 4) + B.t(x + 12, y + 16, txt, { c: 'tm', s: s }); };
    out += B.t(92, 120, 'Arranjo: com ordem', { c: 'tm', s: '1' }) + B.t(270, 120, 'Combinação: sem ordem', { c: 'tm', s: '2' });
    if (p >= 2) {
      var l0 = lab(0), l1 = lab(1);
      out += chip(30, 132, l0, '1') + chip(56, 132, l1, '1') + B.t(92, 149, '≠', { c: 't big', s: '1' }) + chip(106, 132, l1, '1') + chip(132, 132, l0, '1');
      out += chip(200, 132, l0, '2') + chip(226, 132, l1, '2') + B.t(262, 149, '=', { c: 't big', s: '2' }) + chip(276, 132, l1, '2') + chip(302, 132, l0, '2');
      out += B.t(92, 176, l0 + l1 + ' ≠ ' + l1 + l0 + (k.ver ? ': 2 arranjos' : ''), { c: 'tm', s: '1' }) + B.t(270, 176, l0 + l1 + ' = ' + l1 + l0 + (k.ver ? ': 1 combinação' : ''), { c: 'tm', s: '2' });
    } else {
      out += B.t(92, 150, 'com p = ' + g(p) + ' a ordem', { c: 'tm' }) + B.t(92, 168, 'não muda nada', { c: 'tm' }) + B.t(270, 150, 'arranjo = combinação', { c: 'tm' });
    }
    var prod = []; for (var m = 0; m < p; m++) prod.push(n - m);
    var ptxt = p > 5 ? prod.slice(0, 3).join(' · ') + ' · … · ' + prod[p - 1] : prod.join(' · ');
    out += B.t(180, 208, k.ver ? 'A = ' + ptxt + ' = ' + g(Ar) : 'A = arranjo = ?', { c: 'tg', s: '1' });
    out += B.t(180, 228, 'C = A / p! = ' + B.ans(k, 'A / ' + g(pf) + ' = ' + g(Cb)), { c: 'tg', s: '2' });
    out += B.t(180, 248, 'cada grupo de p vale p! = ' + B.ans(k, g(pf)) + ' ordens', { c: 'tm', s: '2' });
    return B.svg(360, 260, out, 'De ' + g(n) + ' elementos, escolher ' + g(p) + '. No arranjo a ordem conta (AB é diferente de BA); na combinação não conta (AB é igual a BA), então divide-se o arranjo por p fatorial, que é ' + g(pf) + '.');
  });

  /* ---------- prefixos ---------- */
  reg('prefixos', function (v, k) {
    var B = H, out = '';
    var T = [['M', 6], ['k', 3], ['', 0], ['m', -3], ['µ', -6], ['n', -9]];
    var key = { M: 0, k: 1, m: 3, u: 4, n: 5 }[v.pf], ci = key == null ? 3 : key, exp = T[ci][1], sym = T[ci][0], val = v.x * Math.pow(10, exp);
    var pnome = { M: 'mega', k: 'quilo', m: 'mili', 'µ': 'micro', n: 'nano' }[sym] || '';
    var bw = 54, gap = 4, x0 = 8, yb = 170, top = function (i) { return 62 + i * 12; };
    var cxs = T.map(function (_, i) { return x0 + i * (bw + gap) + bw / 2; });
    T.forEach(function (t, i) {
      var sel = i === ci, un = i === 2;
      out += rect(x0 + i * (bw + gap), top(i), bw, yb - top(i), 'sh', sel ? '1' : un ? '3' : '', 'fill:' + (sel ? 'var(--gold)' : un ? 'var(--sunk)' : 'var(--surface)'), 4);
      out += B.t(cxs[i], top(i) + 22, un ? 'unid.' : t[0], { c: un ? 'tm' : 't big', s: sel ? '1' : '' });
      out += B.t(cxs[i], top(i) + 42, '10' + sup(t[1]), { c: 'tm', s: sel ? '1 2' : '' });
    });
    out += B.t(cxs[ci], top(ci) - 8, g(v.x) + ' ' + pnome, { c: 'tg', s: '1' });
    /* seta: a vírgula anda ci → unidade */
    var ya = 192, xa = cxs[ci], xu = cxs[2], casas = Math.abs(exp), dirt = xu > xa ? 1 : -1;
    if (k.ver) {
      out += B.line(xa, yb, xa, ya, { d: '2 3', c: 'dim', s: '3' }) + B.line(xu, yb, xu, ya, { d: '2 3', c: 'dim', s: '3' });
      out += B.arrow(xa, ya, xu - dirt * 6, ya, { s: '3' });
      for (var d = 1; d <= casas; d++) out += '<circle cx="' + f1(xa + (xu - xa) * (d - 0.5) / casas) + '" cy="' + ya + '" r="2.6" style="fill:var(--gold)" data-s="3"/>';
      if (k.anim) out += '<circle r="5" class="dot" style="fill:var(--bad)"><animateMotion dur="3s" repeatCount="indefinite" path="M' + f1(xa) + ',' + (ya - 10) + ' L' + f1(xu) + ',' + (ya - 10) + '"/></circle>';
    }
    out += B.t(180, 214, k.ver ? 'a vírgula anda ' + casas + ' casas para a ' + (exp < 0 ? 'ESQUERDA' : 'DIREITA') : 'a vírgula anda ? casas', { c: 'tg', s: '3' });
    out += B.t(180, 240, k.ver ? g(v.x) + ' ' + pnome + ' = ' + g(v.x) + ' · 10' + sup(exp) + ' = ' + B.ans(k, g(val)) : g(v.x) + ' ' + (pnome || 'unidade') + ' = ? (unidade base)', { c: 't', s: '2' });
    out += B.t(180, 258, exp < 0 ? 'prefixo pequeno: o número fica menor' : 'prefixo grande: o número fica maior', { c: 'tm', s: '3' });
    return B.svg(360, 270, out, 'Escada de prefixos: mega 10 elevado a 6, quilo 10 elevado a 3, unidade, mili 10 elevado a menos 3, micro 10 elevado a menos 6 e nano 10 elevado a menos 9. O valor ' + g(v.x) + ' está no degrau ' + (sym || 'unidade') + (k.ver ? '; para chegar à unidade base a vírgula anda ' + casas + ' casas para a ' + (exp < 0 ? 'esquerda' : 'direita') : '; converta para a unidade base') + '.');
  });
})(window);

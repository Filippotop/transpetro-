/* Elétrica de Ouro: figuras das "Contas passo a passo" (js/contas.js).
   Cada conta tem uma figura em SVG que usa os MESMOS números dos campos (muda quando o aluno muda o valor) e, se o aparelho
   permite, se mexe: pontos de corrente que correm no circuito (mais corrente = mais rápido), curvas que se desenham, eixos que giram.
   API: CONTASFIG.reg(id, function (v, k) { return H.svg(w, h, corpo, 'descrição para leitor de tela'); })
     v = valores dos campos; k = { r: resultado de calc(v) (r.r[i] = [rótulo, valor, unidade]), ver: mostra o resultado na figura
     (no Treinar, antes de responder, é false: a figura mostra "?" no lugar da resposta), anim: pode animar }.
   Um elemento com data-s="2" ou data-s="2 3" acende (classe .hl) quando o passo 2 ou 3 é o último aberto.
   Movimento: pontos usam SMIL animateMotion só quando k.anim; sem anim a figura fica completa e parada.
   Estilos em css/contas.css (.cf ...). Convenção do circuito: corrente convencional, do + da fonte para a carga. */
(function (W) {
  'use strict';
  var REG = {}, REG2 = {};
  var g = function (x) { return W.CONTAS ? W.CONTAS.fmt(x) : String(x); };
  var ATTR = function (s) { return s ? ' data-s="' + s + '"' : ''; };
  var CLS = function (c) { return c ? ' ' + c : ''; };
  /* ponta de seta: cfa (dourada), cfa-b, cfa-c, cfa-k (corrente, terceira fase, tinta) */
  var MK = function (c) { return '<marker id="cfa' + (c ? '-' + c : '') + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9z" class="ah' + (c ? ' ' + c : '') + '"/></marker>'; };
  var MKU = function (c) { return 'url(#cfa' + (/^(b|c|k)$/.test(c || '') ? '-' + c : '') + ')'; };
  /* texto com subscrito: "V_L" → V com L baixo; "V_{ab}" → V com ab baixo. */
  function tx(s) {
    return String(s).replace(/_\{([^}]+)\}/g, '<tspan baseline-shift="sub" font-size="72%">$1</tspan>').replace(/_(\w+)/g, '<tspan baseline-shift="sub" font-size="72%">$1</tspan>');
  }
  var H = {
    g: g,
    /* moldura: largura, altura do viewBox, corpo, descrição */
    svg: function (w, h, body, alt) {
      return '<svg class="cf-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + String(alt || '').replace(/"/g, '&quot;') + '" xmlns="http://www.w3.org/2000/svg">'
        + '<defs>' + MK('') + MK('b') + MK('c') + MK('k') + '</defs>' + body + '</svg>';
    },
    /* texto: opts {a: 'start'|'middle'|'end', c: classe (t, tm, tg), s: passo} */
    t: function (x, y, s, o) { o = o || {}; return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'middle') + '" class="' + (o.c || 't') + '"' + ATTR(o.s) + '>' + tx(s) + '</text>'; },
    /* fio: lista de pontos [[x,y],…]; o = {c: classe extra ('hot' = dourado), s: passo, d: tracejado} */
    w: function (pts, o) { o = o || {}; return '<polyline class="w' + CLS(o.c) + '" points="' + pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ') + '"' + (o.d ? ' stroke-dasharray="' + o.d + '"' : '') + ATTR(o.s) + '/>'; },
    line: function (x1, y1, x2, y2, o) { o = o || {}; return '<line class="w' + CLS(o.c) + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"' + (o.d ? ' stroke-dasharray="' + o.d + '"' : '') + ATTR(o.s) + '/>'; },
    /* seta (corrente, grandeza): do ponto 1 ao 2 */
    arrow: function (x1, y1, x2, y2, o) { o = o || {}; return '<line class="ar' + CLS(o.c) + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" marker-end="' + MKU(o.c) + '"' + ATTR(o.s) + '/>'; },
    node: function (x, y) { return '<circle class="nd" cx="' + x + '" cy="' + y + '" r="3.2"/>'; },
    /* resistor (retângulo) centrado em (x,y); o = 'h' | 'v'; rótulo ao lado */
    res: function (x, y, o, lab, sub, s) {
      var hz = o !== 'v', r = hz ? '<rect class="sh" x="' + (x - 22) + '" y="' + (y - 8) + '" width="44" height="16" rx="2"/>' : '<rect class="sh" x="' + (x - 8) + '" y="' + (y - 22) + '" width="16" height="44" rx="2"/>';
      var t = '';
      if (lab) t += hz ? H.t(x, y - 15, lab, { c: 't' }) : H.t(x + 16, y - 4, lab, { a: 'start' });
      if (sub) t += hz ? H.t(x, y + 25, sub, { c: 'tm' }) : H.t(x + 16, y + 15, sub, { a: 'start', c: 'tm' });
      return '<g' + ATTR(s) + '>' + r + t + '</g>';
    },
    /* fonte CC (bateria) vertical em (x,y): + em cima */
    bat: function (x, y, lab, sub, s) {
      return '<g' + ATTR(s) + '><line class="w" x1="' + (x - 14) + '" y1="' + (y - 7) + '" x2="' + (x + 14) + '" y2="' + (y - 7) + '"/><line class="w thick" x1="' + (x - 8) + '" y1="' + (y + 7) + '" x2="' + (x + 8) + '" y2="' + (y + 7) + '"/>'
        + H.t(x + 22, y - 9, '+', { a: 'start', c: 'tm' }) + H.t(x + 22, y + 13, '−', { a: 'start', c: 'tm' })
        + (lab ? H.t(x - 22, y - 4, lab, { a: 'end' }) : '') + (sub ? H.t(x - 22, y + 15, sub, { a: 'end', c: 'tm' }) : '') + '</g>';
    },
    /* fonte CA (círculo com senóide) centrada */
    ac: function (x, y, lab, sub, s) {
      return '<g' + ATTR(s) + '><circle class="sh" cx="' + x + '" cy="' + y + '" r="16"/><path class="w" d="M' + (x - 9) + ' ' + y + ' q4.5 -9 9 0 t9 0"/>'
        + (lab ? H.t(x - 22, y - 4, lab, { a: 'end' }) : '') + (sub ? H.t(x - 22, y + 15, sub, { a: 'end', c: 'tm' }) : '') + '</g>';
    },
    /* capacitor vertical (placas horizontais) ou horizontal */
    cap: function (x, y, o, lab, sub, s) {
      var hz = o === 'h', d = hz ? '<line class="w thick" x1="' + (x - 5) + '" y1="' + (y - 14) + '" x2="' + (x - 5) + '" y2="' + (y + 14) + '"/><line class="w thick" x1="' + (x + 5) + '" y1="' + (y - 14) + '" x2="' + (x + 5) + '" y2="' + (y + 14) + '"/>'
        : '<line class="w thick" x1="' + (x - 14) + '" y1="' + (y - 5) + '" x2="' + (x + 14) + '" y2="' + (y - 5) + '"/><line class="w thick" x1="' + (x - 14) + '" y1="' + (y + 5) + '" x2="' + (x + 14) + '" y2="' + (y + 5) + '"/>';
      return '<g' + ATTR(s) + '>' + d + (lab ? H.t(hz ? x : x + 22, hz ? y - 20 : y - 4, lab, { a: hz ? 'middle' : 'start' }) : '') + (sub ? H.t(hz ? x : x + 22, hz ? y + 30 : y + 15, sub, { a: hz ? 'middle' : 'start', c: 'tm' }) : '') + '</g>';
    },
    /* indutor horizontal: 4 meias-voltas, 48 de largura */
    ind: function (x, y, lab, sub, s) {
      var d = 'M' + (x - 24) + ' ' + y; for (var i = 0; i < 4; i++) d += ' a6 6 0 0 1 12 0';
      return '<g' + ATTR(s) + '><path class="w" d="' + d + '"/>' + (lab ? H.t(x, y - 14, lab) : '') + (sub ? H.t(x, y + 24, sub, { c: 'tm' }) : '') + '</g>';
    },
    /* motor: círculo com letra */
    motor: function (x, y, r, letra, s) { return '<g' + ATTR(s) + '><circle class="sh" cx="' + x + '" cy="' + y + '" r="' + r + '"/>' + H.t(x, y + 5, letra || 'M', { c: 't big' }) + '</g>'; },
    /* chave fechada/aberta horizontal em (x,y) */
    sw: function (x, y, fechada) { return '<g><circle class="nd" cx="' + (x - 14) + '" cy="' + y + '" r="3"/><circle class="nd" cx="' + (x + 14) + '" cy="' + y + '" r="3"/><line class="w" x1="' + (x - 14) + '" y1="' + y + '" x2="' + (x + 14) + '" y2="' + (fechada ? y : y - 14) + '"/></g>'; },
    /* velocidade relativa (0..1) a partir de um valor e do máximo que a figura considera */
    rate: function (x, ref) { return Math.max(0.08, Math.min(1, Math.log(1 + Math.abs(x)) / Math.log(1 + ref))); },
    /* pontos de corrente correndo no caminho d (comandos de path). rate 0..1 define a velocidade; sem anim, nada */
    flow: function (d, rate, anim, n, cls) {
      if (!anim) return '';
      n = n || 5; var dur = (7 - 5.2 * Math.max(0, Math.min(1, rate))).toFixed(2), out = '';
      for (var i = 0; i < n; i++) out += '<circle r="3.4" class="dot' + CLS(cls) + '"><animateMotion dur="' + dur + 's" begin="-' + (i * dur / n).toFixed(2) + 's" repeatCount="indefinite" path="' + d + '"/></circle>';
      return '<g class="flow">' + out + '</g>';
    },
    /* barra horizontal de x0 a x0+w·frac, altura h */
    bar: function (x, y, w, h, frac, cls, s) { return '<rect class="bar' + CLS(cls) + '" x="' + x + '" y="' + y + '" width="' + Math.max(0, w * frac).toFixed(1) + '" height="' + h + '" rx="3"' + ATTR(s) + '/>'; },
    /* resultado ou interrogação, conforme k.ver */
    ans: function (k, texto) { return k && k.ver ? texto : '?'; },
    /* legenda de duas linhas para figuras de CA (a seta/pontos mostram só o sentido de referência) */
    ca: function (y, f) { return H.t(180, y, 'sentido de referência;', { c: 'tm' }) + H.t(180, y + 16, 'em CA a corrente inverte ' + g(2 * (f || 60)) + ' vezes por segundo', { c: 'tm' }); }
  };
  W.CONTASFIG = {
    H: H,
    reg: function (id, fn) { REG[id] = fn; },
    /* segundo painel da conta (ondas, fasores, gráficos que se mexem): mesma assinatura de reg; vem abaixo da figura principal */
    reg2: function (id, fn) { REG2[id] = fn; },
    tem: function (id) { return !!REG[id]; },
    ids: function () { return Object.keys(REG); },
    html: function (id, v, k) { return REG[id] ? REG[id](v, k || {}) + (REG2[id] ? REG2[id](v, k || {}) : '') : ''; }
  };

  /* ================= figuras de referência ================= */
  /* Lei de Ohm / potência: fonte + resistor em malha; a corrente corre e a velocidade segue a corrente. */
  function malha(v, k, alt, rotP) {
    var I = v.V / v.R, B = H, rate = B.rate(I, 30), out = '';
    out += B.w([[60, 82], [60, 40], [300, 40], [300, 78]], { c: 'hot' }) + B.w([[300, 122], [300, 160], [60, 160], [60, 114]], { c: 'hot' });
    out += B.bat(60, 98, 'V', g(v.V) + ' V', '1');
    out += B.res(300, 100, 'v', 'R', g(v.R) + ' Ω', '1');
    out += B.arrow(150, 28, 210, 28, { s: rotP ? '2' : '3' }) + B.t(180, 20, 'I = ' + B.ans(k, g(I) + ' A'), { c: 'tg', s: rotP ? '2' : '3' });
    if (rotP) out += B.t(320, 196, 'P = V·I = ' + B.ans(k, g(v.V * I) + ' W'), { a: 'end', c: 'tg', s: '3' });
    out += B.flow('M60,86 V40 H300 V160 H60 V112', rate, k.anim);
    return B.svg(360, 204, out, alt);
  }
  REG['ohm'] = function (v, k) { return malha(v, k, 'Circuito com uma fonte de ' + g(v.V) + ' volts e um resistor de ' + g(v.R) + ' ohms. A corrente sai do positivo da fonte, passa pelo resistor e volta.', false); };
  REG['pot-resistor'] = function (v, k) { return malha(v, k, 'Circuito com uma fonte de ' + g(v.V) + ' volts e um resistor de ' + g(v.R) + ' ohms, que dissipa calor.', true); };

  /* Dois resistores em paralelo: a corrente maior passa pelo resistor menor. */
  REG['paralelo'] = function (v, k) {
    var B = H, V = 1, i1 = V / v.R1, i2 = V / v.R2, Re = v.R1 * v.R2 / (v.R1 + v.R2), mx = Math.max(i1, i2);
    var r1 = B.rate(i1 / mx * 5, 5), r2 = B.rate(i2 / mx * 5, 5), rt = B.rate((i1 + i2) / mx * 5, 5), out = '';
    out += B.w([[50, 90], [50, 40], [250, 40]], { c: 'hot' }) + B.w([[50, 130], [50, 170], [250, 170]], { c: 'hot' });
    out += B.w([[150, 40], [150, 78]], { c: 'hot' }) + B.w([[150, 122], [150, 170]], { c: 'hot' }) + B.w([[250, 40], [250, 78]], { c: 'hot' }) + B.w([[250, 122], [250, 170]], { c: 'hot' });
    out += B.node(150, 40) + B.node(250, 40) + B.node(150, 170) + B.node(250, 170);
    out += B.bat(50, 110, 'V', '', '1');
    out += B.res(150, 100, 'v', 'R_1', g(v.R1) + ' Ω', '1') + B.res(250, 100, 'v', 'R_2', g(v.R2) + ' Ω', '1');
    out += B.t(150, 142, v.R1 < v.R2 ? 'I maior' : v.R1 > v.R2 ? 'I menor' : 'I igual', { c: 'tm', s: '3' }) + B.t(250, 142, v.R2 < v.R1 ? 'I maior' : v.R2 > v.R1 ? 'I menor' : 'I igual', { c: 'tm', s: '3' });
    out += B.t(180, 195, 'R_eq = ' + B.ans(k, g(Re) + ' Ω') + '  (menor que ' + g(Math.min(v.R1, v.R2)) + ' Ω)', { a: 'middle', c: 'tg', s: '3 4' });
    /* tronco com a corrente total; cada ramo com a sua (os dois ramos somam o tronco) */
    out += B.flow('M50,100 V40 H150', rt, k.anim, 2) + B.flow('M150,40 V170', r1, k.anim, 3) + B.flow('M150,40 H250 V170 H150', r2, k.anim, 4) + B.flow('M150,170 H50 V120', rt, k.anim, 2);
    return B.svg(360, 204, out, 'Fonte ligada a dois resistores em paralelo, de ' + g(v.R1) + ' e ' + g(v.R2) + ' ohms. A corrente é maior no resistor de menor valor, e a resistência equivalente é menor que a menor das duas.');
  };

  /* Carga do capacitor: circuito + curva da tensão com marcas em 1τ e 5τ. */
  REG['rc'] = function (v, k) {
    var B = H, tau = v.R * v.C * 1e-6, out = '', x0 = 52, y0 = 244, w = 270, h = 92, N = 40, pts = [];
    for (var i = 0; i <= N; i++) { var t = 5.4 * i / N; pts.push((x0 + w * t / 5.4).toFixed(1) + ',' + (y0 - h * (1 - Math.exp(-t))).toFixed(1)); }
    out += B.w([[70, 48], [70, 30], [280, 30], [280, 50]], { c: 'hot' }) + B.w([[280, 90], [280, 108], [70, 108], [70, 88]], { c: 'hot' });
    out += B.bat(70, 68, 'V', g(v.V) + ' V', '1') + B.res(175, 30, 'h', '', '', '2');
    out += B.t(175, 16, 'R = ' + g(v.R) + ' Ω', { s: '2' }) + B.cap(280, 70, 'v', 'C', g(v.C) + ' µF', '1');
    out += (k.anim ? '<g><animate attributeName="opacity" values="1;0.37;0.14;0.05;0.02;0" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="5s" repeatCount="indefinite"/>' : '')
      + B.flow('M70,66 V30 H280 V60', B.rate(1, 4), k.anim, 4) + B.flow('M280,82 V108 H70 V80', B.rate(1, 4), k.anim, 4)
      + (k.anim ? '</g>' : '');
    out += B.t(175, 124, 'a corrente começa em V/R e cai a zero', { c: 'tm', s: '3 4' });
    out += B.line(x0, y0, x0 + w + 8, y0) + B.line(x0, y0, x0, y0 - h - 12);
    out += B.line(x0, y0 - h, x0 + w, y0 - h, { d: '4 4', c: 'dim' }) + B.t(x0 - 6, y0 - h + 4, 'V', { a: 'end', c: 'tm' });
    out += '<polyline class="curva' + (k.anim ? ' draw' : '') + '" points="' + pts.join(' ') + '" data-s="3 4"/>';
    var xt = x0 + w / 5.4;
    out += B.line(xt, y0, xt, y0 - h * 0.632, { d: '3 3', c: 'dim' }) + B.line(x0, y0 - h * 0.632, xt, y0 - h * 0.632, { d: '3 3', c: 'dim' });
    out += '<circle class="pt" cx="' + xt.toFixed(1) + '" cy="' + (y0 - h * 0.632).toFixed(1) + '" r="4" data-s="3"/>';
    var x5 = x0 + w * 5 / 5.4;
    out += B.t(xt, y0 + 16, 'τ = ' + B.ans(k, g(tau) + ' s'), { c: 'tg', s: '2' }) + B.t(xt + 10, y0 - h * 0.632 + 14, '63,2 %', { a: 'start', c: 'tm', s: '3' });
    out += B.line(x5, y0, x5, y0 + 5) + B.t(x5, y0 + 16, '5τ = ' + B.ans(k, g(5 * tau) + ' s'), { c: 'tm', s: '4' });
    return B.svg(360, 268, out, 'Circuito RC com fonte de ' + g(v.V) + ' volts, resistor de ' + g(v.R) + ' ohms e capacitor de ' + g(v.C) + ' microfarads, e a curva de carga do capacitor: chega a 63,2 por cento da tensão em um tau e a cerca de 99 por cento em cinco tau.');
  };

  /* Transformador ideal: bobinas no mesmo núcleo, tensão e corrente em sentidos opostos de grandeza. */
  REG['trafo'] = function (v, k) {
    var B = H, a = v.V1 / v.V2, I1 = v.I2 / a, out = '', coil = function (x, n) { var d = 'M' + x + ' 56'; for (var i = 0; i < n; i++) d += ' a8 8 0 0 ' + (x < 180 ? 1 : 0) + ' 0 16'; return '<path class="w thick" d="' + d + '"/>'; };
    out += '<rect class="nucleo" x="150" y="46" width="60" height="120" rx="3"/><rect class="nucleo vazio" x="168" y="64" width="24" height="84"/>';
    out += coil(150, 6).replace(/M150 56/, 'M150 56') + coil(210, 6);
    out += B.w([[150, 56], [100, 56], [60, 56], [60, 78]], { c: 'hot' }) + B.w([[150, 152], [100, 152], [60, 152], [60, 134]], { c: 'hot' });
    out += B.w([[210, 56], [240, 56], [280, 56], [280, 78]], { c: 'hot' }) + B.w([[210, 152], [240, 152], [280, 152], [280, 134]], { c: 'hot' });
    out += B.ac(60, 106, '', '', '1') + B.t(84, 102, 'V_1', { a: 'start' }) + B.t(84, 121, g(v.V1) + ' V', { a: 'start', c: 'tm' }) + B.res(280, 106, 'v', 'carga', '', '1') + B.t(346, 172, 'V_2 = ' + g(v.V2) + ' V', { a: 'end', s: '1' });
    out += B.t(100, 38, 'I_1 = ' + B.ans(k, g(I1) + ' A'), { c: 'tg', s: '2' }) + B.t(248, 38, 'I_2 = ' + g(v.I2) + ' A', { c: 'tg', s: '2' });
    out += B.t(180, 186, 'a = V_1/V_2 = ' + B.ans(k, g(a)) + (a > 1 ? '  abaixador' : a < 1 ? '  elevador' : ''), { c: 'tm', s: '1' });
    out += B.ca(206);
    out += B.flow('M60,106 V56 H150', B.rate(I1, 30), k.anim, 3) + B.flow('M210,56 H280 V106', B.rate(v.I2, 30), k.anim, 3);
    return B.svg(360, 232, out, 'Transformador: primário de ' + g(v.V1) + ' volts, secundário de ' + g(v.V2) + ' volts alimentando uma carga de ' + g(v.I2) + ' ampères. A corrente do primário é ' + g(I1) + ' ampères: onde a tensão é maior, a corrente é menor.');
  };
})(window);

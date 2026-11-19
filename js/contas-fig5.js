/* Elétrica de Ouro: auxiliares de movimento para as figuras das contas (ondas que rolam, fasores que giram) e o painel
   "em CA" das contas de corrente alternada. Registrados com CONTASFIG.reg2(id, ...): o painel vem abaixo da figura principal.
   Sincronia: uma volta do fasor = um período da onda (mesmo T). A onda rola para a ESQUERDA e o valor no eixo vertical
   (x = x0) em cada instante é a projeção vertical do fasor, que gira no sentido anti-horário (como na teoria).
   Sem k.anim, tudo fica parado em θ = 0 (fasor de referência na horizontal). */
(function (W) {
  'use strict';
  var H = W.CONTASFIG.H, reg2 = W.CONTASFIG.reg2, g = H.g, uid = 0;
  var T = 4; /* segundos por período, na tela */

  /* Onda senoidal rolante dentro da caixa (x0,y0 = centro do eixo; w x (2·amp) de área).
     amp em px; fase = atraso em graus (positivo = atrasada); per = períodos visíveis; cls = classe do traço ('', 'b', 'c').
     o = {fill: true → área sob a curva em tom suave; sq: valores 2·θ (potência: frequência dobrada, sempre ≥ 0); s: passo} */
  H.onda = function (x0, y0, w, amp, fase, per, cls, anim, o) {
    o = o || {}; var pw = w / per, id = 'cfc' + (++uid), n = Math.round(per * 40) + 40, d = '', i, th, y, x;
    for (i = 0; i <= n + 40; i++) {
      x = (i / (n + 40)) * (w + pw);
      th = 2 * Math.PI * x / pw - fase * Math.PI / 180;
      y = o.sq ? -amp * (1 - Math.cos(2 * th)) / 2 : -amp * Math.sin(th);
      d += (i ? 'L' : 'M') + (x0 + x).toFixed(1) + ' ' + (y0 + y).toFixed(1);
    }
    var mover = anim ? '<animateTransform attributeName="transform" type="translate" from="0 0" to="' + (-pw).toFixed(1) + ' 0" dur="' + T + 's" repeatCount="indefinite"/>' : '';
    var area = o.fill ? '<path d="' + d + ' L' + (x0 + w + pw) + ' ' + y0 + ' L' + x0 + ' ' + y0 + ' Z" class="area"/>' : '';
    return '<clipPath id="' + id + '"><rect x="' + x0 + '" y="' + (y0 - amp - 6) + '" width="' + w + '" height="' + (2 * amp + 12) + '"/></clipPath>'
      + '<g clip-path="url(#' + id + ')"' + (o.s ? ' data-s="' + o.s + '"' : '') + '><g>' + area + '<path class="w' + (cls ? ' ' + cls : '') + '" d="' + d + '"/>' + mover + '</g></g>';
  };
  /* Eixos de uma caixa de ondas: eixo horizontal no meio e eixo vertical (cursor) com o rótulo do eixo. */
  H.eixos = function (x0, y0, w, amp, rotV) {
    return H.line(x0, y0, x0 + w, y0, { c: 'dim' }) + H.line(x0, y0 - amp - 4, x0, y0 + amp + 4, { c: 'dim' }) + (rotV ? H.t(x0 - 4, y0 - amp + 4, rotV, { a: 'end', c: 'tm' }) : '') + H.t(x0 + w, y0 + 14, 't', { a: 'end', c: 'tm' });
  };
  /* Fasores girantes em (cx,cy), raio R. list = [{a: ângulo inicial em graus (anti-horário), len: 0..1, cls: '', s: passo}].
     Círculo de referência; o conjunto gira à velocidade da onda (T). Sem anim, ficam em a. */
  H.fasores = function (cx, cy, R, list, anim) {
    var out = '<circle class="w dim" cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none"/>' + H.line(cx - R - 4, cy, cx + R + 4, cy, { c: 'dim' }) + H.line(cx, cy - R - 4, cx, cy + R + 4, { c: 'dim' });
    var gs = list.map(function (f) {
      var L = R * f.len;
      return '<g transform="rotate(' + (-f.a) + ' ' + cx + ' ' + cy + ')"' + (f.s ? ' data-s="' + f.s + '"' : '') + '><line class="ar' + (f.cls ? ' ' + f.cls : '') + '" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + L).toFixed(1) + '" y2="' + cy + '" marker-end="url(#cfa' + (/^(b|c|k)$/.test(f.cls || '') ? '-' + f.cls : '') + ')"/></g>';
    }).join('');
    var giro = anim ? '<animateTransform attributeName="transform" type="rotate" from="0 ' + cx + ' ' + cy + '" to="-360 ' + cx + ' ' + cy + '" dur="' + T + 's" repeatCount="indefinite"/>' : '';
    return out + '<g>' + gs + giro + '</g>';
  };
  /* Legenda com bolinha colorida: cor = classe do traço */
  H.leg = function (x, y, cor, texto, s) { return '<line class="w thick' + (cor ? ' ' + cor : '') + '" x1="' + x + '" y1="' + (y - 4) + '" x2="' + (x + 16) + '" y2="' + (y - 4) + '"/>' + H.t(x + 22, y, texto, { a: 'start', c: 'tm', s: s }); };
  H.T = T;
  H.f1 = function (x) { return Number(x).toLocaleString('pt-BR', { maximumFractionDigits: 1 }); }; /* mesmo critério dos ângulos nas figuras */

  /* ================= painel de referência: impedância RL ================= */
  reg2('impedancia', function (v, k) {
    var X = 2 * Math.PI * v.f * v.L, phi = Math.atan2(X, v.R) * 180 / Math.PI, out = '';
    if (!k.ver) phi = 40; /* Treinar: o ângulo é resultado; defasagem genérica, fora de escala */
    out += H.t(180, 16, 'Em CA: corrente e tensão no tempo', { c: 'tg' });
    out += H.eixos(190, 96, 150, 40, '') + H.onda(190, 96, 150, 40, 0, 2, 'hot', k.anim, { s: '1' }) + H.onda(190, 96, 150, 28, phi, 2, 'b', k.anim, { s: '4' });
    out += H.fasores(78, 96, 40, [{ a: 0, len: 1, s: '1' }, { a: -phi, len: 0.7, cls: 'b', s: '4' }], k.anim);
    out += H.leg(30, 170, 'hot', 'tensão V') + H.leg(130, 170, 'b', 'corrente I (atrasada ' + H.ans(k, H.f1(phi) + '°') + ')', '4');
    out += H.t(180, 196, k.ver ? 'carga indutiva: a corrente atrasa da tensão' : 'a corrente atrasa da tensão (ângulo fora de escala)', { c: 'tm', s: '4' });
    return H.svg(360, 206, out, 'Fasores e formas de onda do circuito RL: a corrente fica atrasada em relação à tensão pelo ângulo phi.');
  });
})(window);

/* Elétrica de Ouro: widgets das estações. A teoria entra por innerHTML (os <script> dela não rodam), então cada
   calculadora vem como <div data-calc="nome" data-cfg='{…}'> e é montada aqui por montarCalculadoras(raiz), que o
   vMod chama sempre que põe a aba Teoria na tela (também ao voltar de outra aba). Montar duas vezes não duplica nada.
   Também: figuras largas ganham o botão "ampliar" (no celular, o desenho inteiro fica pequeno demais para ler). */
(function (g) {
  var W = {};
  var seq = 0;
  function fmt(x, d) { d = d == null ? 2 : d; return x.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function cell(t, v) { return '<div><span>' + t + '</span><b>' + v + '</b></div>'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function campo(id, rotulo, valor, extra) {
    return '<label for="' + id + '"><span>' + rotulo + '</span><input id="' + id + '" type="number" inputmode="decimal" step="any" value="' + valor + '"' + (extra || '') + '></label>';
  }
  function cabeca(cfg) { return '<p class="lab-t">' + esc(cfg.titulo || '') + '</p>' + (cfg.dica ? '<p class="lab-hint">' + esc(cfg.dica) + '</p>' : ''); }

  /* Figura 7: duas fontes e três resistores; análise nodal com um nó (A), sentidos reais e balanço de potência. */
  W['kirchhoff-2-malhas'] = function (el, cfg) {
    var v = cfg.valores || {}, p = 'k' + (++seq) + '-';
    var val = function (k, d) { return v[k] != null ? v[k] : d; };
    el.innerHTML = cabeca(cfg) +
      '<div class="lab-in">' + campo(p + 'E1', 'E₁ (V)', val('kE1', 20)) + campo(p + 'R1', 'R₁ (Ω)', val('kR1', 4), ' min="0.001"') +
      campo(p + 'R3', 'R₃ (Ω)', val('kR3', 4), ' min="0.001"') + campo(p + 'R2', 'R₂ (Ω)', val('kR2', 2), ' min="0.001"') + campo(p + 'E2', 'E₂ (V)', val('kE2', 4)) + '</div>' +
      '<div class="lab-out" aria-live="polite"></div><p class="lab-txt"></p>';
    var q = function (k) { return el.querySelector('#' + p + k); }, out = el.querySelector('.lab-out'), txt = el.querySelector('.lab-txt');
    function lk() {
      var E1 = +q('E1').value, R1 = +q('R1').value, R2 = +q('R2').value, R3 = +q('R3').value, E2 = +q('E2').value;
      if (!(R1 > 0 && R2 > 0 && R3 > 0) || isNaN(E1) || isNaN(E2)) { out.innerHTML = cell('Aviso', 'Resistências devem ser positivas.'); txt.textContent = ''; return; }
      var VA = (E1 / R1 + E2 / R2) / (1 / R1 + 1 / R2 + 1 / R3), I1 = (E1 - VA) / R1, I3 = VA / R3, I2 = (VA - E2) / R2;
      var PR = I1 * I1 * R1 + I2 * I2 * R2 + I3 * I3 * R3, P1 = E1 * I1, P2 = E2 * I2;
      var Vth = (E1 / R1 + E2 / R2) / (1 / R1 + 1 / R2), Rth = R1 * R2 / (R1 + R2);
      out.innerHTML = cell('V<sub>A</sub>', fmt(VA) + ' V') + cell('I em R₁', fmt(Math.abs(I1)) + ' A') + cell('I em R₃', fmt(Math.abs(I3)) + ' A') + cell('I em R₂', fmt(Math.abs(I2)) + ' A') +
        cell('Potência nos resistores', fmt(PR) + ' W') + cell('Thévenin visto por R₃', fmt(Vth) + ' V; ' + fmt(Rth) + ' Ω');
      var d1 = I1 >= 0 ? 'de E₁ para o nó A (E₁ fornece ' + fmt(P1) + ' W)' : 'do nó A para E₁ (E₁ absorve ' + fmt(-P1) + ' W)';
      var d2 = I2 >= 0 ? 'do nó A para E₂ (E₂ absorve ' + fmt(P2) + ' W)' : 'de E₂ para o nó A (E₂ fornece ' + fmt(-P2) + ' W)';
      var d3 = I3 >= 0 ? 'de cima para baixo' : 'de baixo para cima';
      var forn = Math.max(P1, 0) + Math.max(-P2, 0), abs = PR + Math.max(-P1, 0) + Math.max(P2, 0);
      txt.textContent = 'Sentidos reais: em R₁, ' + d1 + '; em R₂, ' + d2 + '; em R₃, ' + d3 + '. Balanço: fornecido ' + fmt(forn) + ' W = absorvido ' + fmt(abs) + ' W.';
    }
    ['E1', 'R1', 'R2', 'R3', 'E2'].forEach(function (k) { q(k).addEventListener('input', lk); });
    lk();
  };

  /* Carga ligada a um equivalente de Thévenin: potência e rendimento em função de R_L. */
  W['thevenin-carga'] = function (el, cfg) {
    var v = cfg.valores || {}, p = 't' + (++seq) + '-';
    var val = function (k, d) { return v[k] != null ? v[k] : d; };
    var RL0 = val('tRL', 10);
    el.innerHTML = cabeca(cfg) +
      '<div class="lab-in">' + campo(p + 'V', 'V<sub>th</sub> (V)', val('tVth', 20), ' min="0"') + campo(p + 'R', 'R<sub>th</sub> (Ω)', val('tRth', 5), ' min="0.01"') + '</div>' +
      '<div class="lab-ctrl"><label for="' + p + 'RL">Carga R<sub>L</sub> (Ω)</label><input id="' + p + 'RL" type="range" min="0.5" max="40" step="0.5" value="' + RL0 + '"><output for="' + p + 'RL">' + fmt(RL0, 1) + '</output></div>' +
      '<svg viewBox="0 0 620 230" role="img" aria-label="Potência na carga e rendimento em função da resistência de carga"></svg>' +
      '<div class="lab-out" aria-live="polite"></div>';
    var q = function (k) { return el.querySelector('#' + p + k); }, out = el.querySelector('.lab-out'), svg = el.querySelector('svg'), o = el.querySelector('output');
    function lt() {
      var V = +q('V').value, R = +q('R').value, RL = +q('RL').value; o.textContent = fmt(RL, 1);
      if (!(V >= 0 && R > 0)) { out.innerHTML = cell('Aviso', 'Use V<sub>th</sub> ≥ 0 e R<sub>th</sub> &gt; 0.'); svg.innerHTML = ''; return; }
      var P = function (r) { return V * V * r / ((R + r) * (R + r)); }, Pm = V * V / (4 * R);
      var X0 = 60, X1 = 560, Y0 = 195, Y1 = 20, rmax = 40;
      var px = function (r) { return X0 + (X1 - X0) * r / rmax; }, py = function (pp) { return Y0 - (Y0 - Y1) * pp / (Pm * 1.1 || 1); }, pe = function (e) { return Y0 - (Y0 - Y1) * e / 100; };
      var d = '', de = '';
      for (var k = 1; k <= 400; k++) { var r = k * rmax / 400; d += (k > 1 ? 'L' : 'M') + px(r).toFixed(1) + ',' + py(P(r)).toFixed(1); de += (k > 1 ? 'L' : 'M') + px(r).toFixed(1) + ',' + pe(100 * r / (r + R)).toFixed(1); }
      var s = '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" class="s-ax"/><line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X0 + '" y2="' + Y1 + '" class="s-ax"/><line x1="' + X1 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y1 + '" class="s-ax"/>';
      [0, 10, 20, 30, 40].forEach(function (r) { s += '<text x="' + px(r) + '" y="' + (Y0 + 18) + '" class="s-tm" text-anchor="middle">' + r + ' Ω</text>'; });
      [50, 100].forEach(function (e) { s += '<text x="' + (X1 + 6) + '" y="' + (pe(e) + 4) + '" class="s-tm">' + e + '%</text>'; });
      s += '<text x="' + (X0 - 6) + '" y="' + (py(Pm) + 4) + '" class="s-tm" text-anchor="end">' + fmt(Pm, 1) + ' W</text>';
      if (R <= rmax) s += '<line x1="' + px(R) + '" y1="' + py(Pm) + '" x2="' + px(R) + '" y2="' + Y0 + '" class="s-dash s-pa"/>';
      s += '<path d="' + d + '" class="s-w s-pc"/><path d="' + de + '" class="s-dash s-pb" style="stroke-width:2.2"/>';
      s += '<circle cx="' + px(RL) + '" cy="' + py(P(RL)) + '" r="6" class="s-f-pa"/>';
      s += '<text x="' + (X0 + 8) + '" y="' + (Y1 + 4) + '" class="s-ts s-fc">potência na carga</text><text x="' + (X1 - 8) + '" y="' + (Y1 + 4) + '" class="s-ts s-fb" text-anchor="end">rendimento (tracejado)</text>';
      svg.innerHTML = s;
      var I = V / (R + RL);
      out.innerHTML = cell('Corrente', fmt(I) + ' A') + cell('Tensão na carga', fmt(I * RL) + ' V') + cell('Potência na carga', fmt(P(RL)) + ' W') + cell('Perda em R<sub>th</sub>', fmt(I * I * R) + ' W') +
        cell('Rendimento', fmt(100 * RL / (R + RL), 1) + '%') + cell('P máx (R<sub>L</sub> = R<sub>th</sub>)', fmt(Pm) + ' W');
    }
    ['V', 'R', 'RL'].forEach(function (k) { q(k).addEventListener('input', lt); });
    lt();
  };

  /* Faixa (range) com rótulo e valor ao lado, no padrão .lab-ctrl. */
  function faixa(id, rotulo, min, max, step, valor) {
    return '<label for="' + id + '">' + rotulo + '</label><input id="' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + valor + '"><output for="' + id + '"></output>';
  }
  function sinal(x, d) { return (x < 0 ? '−' : '') + fmt(Math.abs(x), d); }

  /* E3, seção 1: tensão, corrente e o triângulo de potências de uma carga monofásica (φ > 0: indutiva). */
  W['potencia-ca'] = function (el, cfg) {
    var v = cfg.valores || {}, p = 'pca' + (++seq) + '-';
    var val = function (k, d) { return v[k] != null ? v[k] : d; };
    el.innerHTML = cabeca(cfg) +
      '<div class="lab-ctrl">' + faixa(p + 'V', 'Tensão eficaz (V)', 50, 400, 1, val('lv', 220)) + faixa(p + 'I', 'Corrente eficaz (A)', 1, 30, 0.5, val('li', 10)) + faixa(p + 'F', 'Ângulo φ (°)', -90, 90, 1, val('lf', 37)) + '</div>' +
      '<div class="lab-figs"><svg class="lab-ondas" viewBox="0 0 400 200" role="img" aria-label="Tensão e corrente no tempo"></svg><svg class="lab-tri" viewBox="0 0 300 175" role="img" aria-label="Triângulo de potências"></svg></div>' +
      '<div class="lab-out" aria-live="polite"></div>';
    var q = function (k) { return el.querySelector('#' + p + k); }, out = el.querySelector('.lab-out'), ondas = el.querySelector('.lab-ondas'), tri = el.querySelector('.lab-tri');
    function calc() {
      var V = +q('V').value, I = +q('I').value, f = +q('F').value, r = f * Math.PI / 180;
      q('V').nextElementSibling.textContent = fmt(V, 0); q('I').nextElementSibling.textContent = fmt(I, 1); q('F').nextElementSibling.textContent = sinal(f, 0) + '°';
      var S = V * I, P = S * Math.cos(r), Q = S * Math.sin(r);
      /* Ondas: dois ciclos; a corrente desloca φ para a direita (atrasada) quando φ > 0. */
      var x0 = 16, x1 = 390, yc = 92, n = 160, pv = '', pi = '';
      for (var k = 0; k <= n; k++) { var x = x0 + (x1 - x0) * k / n, a = 4 * Math.PI * k / n;
        pv += (k ? 'L' : 'M') + x.toFixed(1) + ',' + (yc - 72 * Math.sin(a)).toFixed(1); pi += (k ? 'L' : 'M') + x.toFixed(1) + ',' + (yc - 48 * Math.sin(a - r)).toFixed(1); }
      ondas.innerHTML = '<line x1="' + x0 + '" y1="' + yc + '" x2="' + x1 + '" y2="' + yc + '" class="s-ax"/><path d="' + pv + '" class="s-w s-ink"/><path d="' + pi + '" class="s-w s-pc"/>' +
        '<line x1="' + x0 + '" y1="186" x2="' + (x0 + 22) + '" y2="186" class="s-w s-ink"/><text x="' + (x0 + 28) + '" y="192" class="s-ts">v(t)</text>' +
        '<line x1="' + (x0 + 100) + '" y1="186" x2="' + (x0 + 122) + '" y2="186" class="s-w s-pc"/><text x="' + (x0 + 128) + '" y="192" class="s-ts s-fc">i(t)</text>' +
        '<text x="' + x1 + '" y="192" class="s-tm" text-anchor="end">' + (f > 0 ? 'i atrasada' : f < 0 ? 'i adiantada' : 'em fase') + '</text>';
      /* Triângulo: hipotenusa sempre do mesmo tamanho (escala por S); Q para cima se indutiva, para baixo se capacitiva. */
      var ox = 34, oy = f >= 0 ? 150 : 30, sc = 122 / Math.max(S, 1e-9), px = P * sc, qy = Q * sc, s = '';
      s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + (ox + 170) + '" y2="' + oy + '" class="s-guide"/>';
      s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + (ox + px) + '" y2="' + oy + '" class="s-wire s-thick"/>';
      s += '<line x1="' + (ox + px) + '" y1="' + oy + '" x2="' + (ox + px) + '" y2="' + (oy - qy) + '" class="s-wire s-thick s-pa-s"/>';
      s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + (ox + px) + '" y2="' + (oy - qy) + '" class="s-wire s-thick s-pc-s"/>';
      if (Math.abs(f) >= 4) { var ra = 34, ex = ox + ra * Math.cos(r), ey = oy - ra * Math.sin(r);
        s += '<path d="M ' + (ox + ra) + ' ' + oy + ' A ' + ra + ' ' + ra + ' 0 0 ' + (f > 0 ? 0 : 1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + '" class="s-arc"/>'; }
      var pyl = f >= 0 ? oy + 22 : oy - 10;
      s += '<text x="' + (ox + Math.max(px, 30) / 2) + '" y="' + pyl + '" class="s-ts" text-anchor="middle">P</text>';
      if (Math.abs(qy) > 14) s += '<text x="' + (ox + px + 8) + '" y="' + (oy - qy / 2 + 6) + '" class="s-ts s-fa">Q' + (Q < 0 ? ' (cap.)' : '') + '</text>';
      var k = f >= 0 ? -1 : 1, nx = k * Math.sin(r), ny = k * Math.cos(r); /* normal à hipotenusa, para fora do triângulo */
      s += '<text x="' + (ox + px / 2 + 18 * nx).toFixed(1) + '" y="' + (oy - qy / 2 + 18 * ny + 5).toFixed(1) + '" class="s-ts s-fc" text-anchor="middle">S</text>';
      if (Math.abs(f) >= 12) s += '<text x="' + (ox + 46 * Math.cos(r / 2)).toFixed(1) + '" y="' + (oy - 46 * Math.sin(r / 2) + 5).toFixed(1) + '" class="s-tm">φ</text>';
      tri.innerHTML = s;
      /* O SVG acompanha o triângulo (sem faixa vazia em cima ou embaixo), com altura mínima para não pular tanto. */
      var y0 = Math.min(oy, oy - qy) - 26, y1 = Math.max(oy, oy - qy) + 30, hh = Math.max(y1 - y0, 96);
      y0 = (y0 + y1 - hh) / 2; tri.setAttribute('viewBox', '0 ' + y0.toFixed(1) + ' 300 ' + hh.toFixed(1));
      out.innerHTML = cell('Ativa P', fmt(P, 0) + ' W') + cell('Reativa Q', sinal(Q, 0) + ' var') + cell('Aparente S', fmt(S, 0) + ' VA') +
        cell('Fator de potência', fmt(Math.cos(r), 2) + (f > 0 ? ' indutivo' : f < 0 ? ' capacitivo' : ' (resistivo)'));
    }
    ['V', 'I', 'F'].forEach(function (k) { q(k).addEventListener('input', calc); });
    calc();
  };

  /* E3, seção 2: carga trifásica equilibrada em Y ou Δ, a partir de V_L e de Z = R + jX por fase. */
  W['trifasica-equilibrada'] = function (el, cfg) {
    var v = cfg.valores || {}, p = 'tri' + (++seq) + '-';
    var val = function (k, d) { return v[k] != null ? v[k] : d; };
    var lig = val('cL', 'D') === 'Y' ? 'Y' : 'D';
    el.innerHTML = cabeca(cfg) +
      '<div class="lab-in">' + campo(p + 'VL', 'Tensão de linha V<sub>L</sub> (V)', val('cVL', 380), ' min="0"') + campo(p + 'R', 'R por fase (Ω)', val('cR', 30)) + campo(p + 'X', 'X por fase (Ω)', val('cX', 40)) +
      '<label for="' + p + 'L"><span>Ligação</span><select id="' + p + 'L"><option value="D"' + (lig === 'D' ? ' selected' : '') + '>Triângulo (Δ)</option><option value="Y"' + (lig === 'Y' ? ' selected' : '') + '>Estrela (Y)</option></select></label></div>' +
      '<div class="lab-out" aria-live="polite"></div><p class="lab-txt"></p>';
    var q = function (k) { return el.querySelector('#' + p + k); }, out = el.querySelector('.lab-out'), txt = el.querySelector('.lab-txt');
    function calc() {
      var VL = +q('VL').value, R = +q('R').value, X = +q('X').value, Y = q('L').value === 'Y', Z = Math.hypot(R, X);
      if (!(VL > 0) || !(Z > 0) || !(R >= 0) || isNaN(X)) { out.innerHTML = cell('Aviso', 'Informe V<sub>L</sub> &gt; 0, R ≥ 0 e impedância diferente de zero.'); txt.textContent = ''; return; }
      var VF = Y ? VL / Math.sqrt(3) : VL, IF = VF / Z, IL = Y ? IF : Math.sqrt(3) * IF;
      var P = 3 * IF * IF * R, Q = 3 * IF * IF * X, S = 3 * VF * IF, fp = R / Z;
      out.innerHTML = cell('|Z| por fase', fmt(Z) + ' Ω') + cell('V<sub>F</sub>', fmt(VF, 1) + ' V') + cell('I<sub>F</sub>', fmt(IF) + ' A') + cell('I<sub>L</sub>', fmt(IL) + ' A') +
        cell('P total', fmt(P, 0) + ' W') + cell('Q total', sinal(Q, 0) + ' var') + cell('S total', fmt(S, 0) + ' VA') + cell('FP', fmt(fp, 3) + (X > 0 ? ' ind.' : X < 0 ? ' cap.' : ''));
      txt.innerHTML = Y ? 'Estrela: cada Z recebe V<sub>L</sub>/√3 = ' + fmt(VF, 1) + ' V, e a corrente de linha é a própria corrente de fase.'
        : 'Triângulo: cada Z recebe a tensão de linha inteira, e I<sub>L</sub> = √3·I<sub>F</sub> = ' + fmt(IL) + ' A.';
    }
    ['VL', 'R', 'X', 'L'].forEach(function (k) { q(k).addEventListener('input', calc); q(k).addEventListener('change', calc); });
    calc();
  };

  /* E3, seção 3: método dos dois wattímetros numa carga equilibrada. W1 = V_L·I_L·cos(φ − 30°), W2 = V_L·I_L·cos(φ + 30°). */
  W['dois-wattimetros'] = function (el, cfg) {
    var v = cfg.valores || {}, p = 'w' + (++seq) + '-';
    var val = function (k, d) { return v[k] != null ? v[k] : d; };
    el.innerHTML = cabeca(cfg) +
      '<div class="lab-in">' + campo(p + 'VL', 'V<sub>L</sub> (V)', val('wVL', 380), ' min="0"') + campo(p + 'IL', 'I<sub>L</sub> (A)', val('wIL', 10), ' min="0"') + '</div>' +
      '<div class="lab-ctrl">' + faixa(p + 'F', 'Ângulo φ da carga (°)', -90, 90, 1, val('wF', 37)) + '</div>' +
      '<svg viewBox="0 0 640 300" role="img" aria-label="Leituras dos dois wattímetros em função do ângulo da carga"></svg>' +
      '<div class="lab-out" aria-live="polite"></div><p class="lab-txt"></p>';
    var q = function (k) { return el.querySelector('#' + p + k); }, out = el.querySelector('.lab-out'), txt = el.querySelector('.lab-txt'), svg = el.querySelector('svg');
    var D = Math.PI / 180;
    function calc() {
      var VL = +q('VL').value, IL = +q('IL').value, f = +q('F').value;
      q('F').nextElementSibling.textContent = sinal(f, 0) + '°';
      if (!(VL > 0) || !(IL > 0)) { out.innerHTML = cell('Aviso', 'Informe V<sub>L</sub> e I<sub>L</sub> maiores que zero.'); txt.textContent = ''; svg.innerHTML = ''; return; }
      var K = VL * IL, W1 = K * Math.cos((f - 30) * D), W2 = K * Math.cos((f + 30) * D), P = W1 + W2, Q = Math.sqrt(3) * (W1 - W2);
      /* Gráfico em por unidade de V_L·I_L: x = φ de −90° a 90°, y de −0,6 a 1,8. */
      var X0 = 70, X1 = 570, px = function (a) { return X0 + (X1 - X0) * (a + 90) / 180; }, py = function (u) { return 210 - 100 * u; };
      var c1 = '', c2 = '', cp = '';
      for (var a = -90; a <= 90; a += 2) { var L = a > -90 ? 'L' : 'M';
        c1 += L + px(a).toFixed(1) + ',' + py(Math.cos((a - 30) * D)).toFixed(1); c2 += L + px(a).toFixed(1) + ',' + py(Math.cos((a + 30) * D)).toFixed(1); cp += L + px(a).toFixed(1) + ',' + py(Math.sqrt(3) * Math.cos(a * D)).toFixed(1); }
      var s = '<line x1="' + X0 + '" y1="' + py(0) + '" x2="' + X1 + '" y2="' + py(0) + '" class="s-ax"/><line x1="' + px(0) + '" y1="' + py(1.8) + '" x2="' + px(0) + '" y2="' + py(-0.6) + '" class="s-ax"/>';
      [-60, 60].forEach(function (a) { s += '<line x1="' + px(a) + '" y1="' + py(1.8) + '" x2="' + px(a) + '" y2="' + py(-0.6) + '" class="s-guide"/>'; });
      [-90, -60, 0, 60, 90].forEach(function (a) { s += '<text x="' + px(a) + '" y="' + (py(-0.6) + 22) + '" class="s-tm" text-anchor="middle">' + sinal(a, 0) + '°</text>'; });
      s += '<text x="' + (X0 - 8) + '" y="' + (py(0) + 6) + '" class="s-tm" text-anchor="end">0</text><text x="' + (X0 - 8) + '" y="' + (py(1) + 6) + '" class="s-tm" text-anchor="end">1</text>';
      s += '<text x="' + px(-60) + '" y="' + (py(1.8) - 6) + '" class="s-tm" text-anchor="middle">FP 0,5</text><text x="' + px(60) + '" y="' + (py(1.8) - 6) + '" class="s-tm" text-anchor="middle">FP 0,5</text>';
      s += '<text x="' + (X0 + 4) + '" y="' + (py(-0.6) + 46) + '" class="s-tm">← capacitiva</text><text x="' + (X1 - 4) + '" y="' + (py(-0.6) + 46) + '" class="s-tm" text-anchor="end">indutiva →</text>';
      s += '<path d="' + cp + '" class="s-dash s-ink"/><path d="' + c1 + '" class="s-w s-pc"/><path d="' + c2 + '" class="s-w s-pa"/>';
      s += '<text x="' + (px(-45) - 14) + '" y="' + (py(Math.sqrt(3) * Math.cos(45 * D)) - 12) + '" class="s-ts" text-anchor="end">P</text>';
      s += '<text x="' + px(30) + '" y="' + (py(1) - 12) + '" class="s-ts s-fc" text-anchor="middle">W1</text><text x="' + px(-30) + '" y="' + (py(1) - 12) + '" class="s-ts s-fa" text-anchor="middle">W2</text>';
      s += '<line x1="' + px(f) + '" y1="' + py(1.8) + '" x2="' + px(f) + '" y2="' + py(-0.6) + '" class="s-mut" style="stroke-width:1.5"/>';
      s += '<circle cx="' + px(f) + '" cy="' + py(W1 / K) + '" r="6" class="s-f-pc"/><circle cx="' + px(f) + '" cy="' + py(W2 / K) + '" r="6" class="s-f-pa"/>';
      svg.innerHTML = s;
      out.innerHTML = cell('W1', sinal(W1, 0) + ' W') + cell('W2', sinal(W2, 0) + ' W') + cell('P = W1 + W2', sinal(P, 0) + ' W') + cell('Q = √3·(W1 − W2)', sinal(Q, 0) + ' var') +
        cell('FP', fmt(Math.cos(f * D), 2) + (f > 0 ? ' indutivo' : f < 0 ? ' capacitivo' : ''));
      var neg = W1 < -0.5 ? 'W1' : W2 < -0.5 ? 'W2' : '';
      txt.textContent = Math.abs(Math.abs(f) - 60) < 0.5 ? 'FP = 0,5: um dos wattímetros marca zero, e o outro mede a potência total.'
        : neg ? neg + ' ficou negativo: o FP está abaixo de 0,5. Na prática, inverte-se a bobina de tensão (ou a de corrente) desse wattímetro para ler, e a leitura entra com sinal negativo na soma.'
        : f === 0 ? 'FP = 1: as duas leituras são iguais, cada uma com metade da potência total.'
        : 'Leituras positivas e diferentes: FP entre 0,5 e 1. A maior é a do wattímetro com cos(φ − 30°) se a carga é indutiva.';
    }
    ['VL', 'IL', 'F'].forEach(function (k) { q(k).addEventListener('input', calc); });
    calc();
  };

  /* ---- M1: simuladores de comando (partida direta e reversão), desenhados como na apostila. Trechos com tensão da
     fase ficam em azul e grossos (s-on); S0, S1 e S2 são pulsadores (ficam 0,55 s pressionados e voltam). ---- */
  function cmdDesenho() {
    var Wl = function (x1, y1, x2, y2, on) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="s-wire' + (on ? ' s-on' : '') + '"/>'; };
    var T = function (x, y, s, c, a) { return '<text x="' + x + '" y="' + y + '" class="' + (c || 's-ts') + '" text-anchor="' + (a || 'start') + '">' + s + '</text>'; };
    /* Contato entre y1 e y2: NA ou NF, fechado ou aberto, com acionamento por botão (push) ou térmico (therm). */
    var C = function (x, y1, y2, o) {
      var s = Wl(x, y1, x, y1 + 12, o.onTop) + Wl(x, y2 - 12, x, y2, o.onBot), py = y2 - 12, tip;
      if ((o.kind || 'na') === 'na') tip = o.closed ? [x, y1 + 12] : [x - 13, y1 + 14];
      else { s += Wl(x, y1 + 12, x + 10, y1 + 12, o.onTop); tip = o.closed ? [x + 10, y1 + 12] : [x - 12, y1 + 16]; }
      s += Wl(x, py, tip[0], tip[1], o.onBot);
      var ym = (py + tip[1]) / 2, xm = (x + tip[0]) / 2;
      if (o.act === 'push') s += '<line x1="' + (xm - 2) + '" y1="' + ym + '" x2="' + (x - 28) + '" y2="' + ym + '" class="s-wire s-dsh"/><path d="M' + (x - 24) + ' ' + (ym - 7) + ' H' + (x - 30) + ' V' + (ym + 7) + ' H' + (x - 24) + '" class="s-wire"/>';
      if (o.act === 'therm') s += '<line x1="' + (xm - 2) + '" y1="' + ym + '" x2="' + (x - 26) + '" y2="' + ym + '" class="s-wire s-dsh"/>';
      if (o.t1) s += T(x + 8, y1 + 9, o.t1, 's-tn'); if (o.t2) s += T(x + 8, y2 - 2, o.t2, 's-tn');
      if (o.label) s += T(x - 36, (y1 + y2) / 2 + 5, o.label, 's-ts', 'end');
      return s;
    };
    var K = function (x, y1, y2, label, on) { return Wl(x, y1, x, y1 + 8, on) + Wl(x, y2 - 8, x, y2, false) + '<rect x="' + (x - 16) + '" y="' + (y1 + 8) + '" width="32" height="' + (y2 - y1 - 16) + '" class="' + (on ? 's-lampon' : 's-coilr') + '"/>' + T(x - 22, (y1 + y2) / 2 + 5, label, 's-ts', 'end') + T(x + 20, y1 + 12, 'A1', 's-tn') + T(x + 20, y2 - 2, 'A2', 's-tn'); };
    var H = function (x, y1, y2, label, on) { var c = (y1 + y2) / 2, r = 13, d = r * 0.707; return Wl(x, y1, x, c - r, on) + Wl(x, c + r, x, y2, false) + '<circle cx="' + x + '" cy="' + c + '" r="' + r + '" class="' + (on ? 's-lampon' : 's-comp') + '"/>' + Wl(x - d, c - d, x + d, c + d) + Wl(x + d, c - d, x - d, c + d) + T(x - 20, c + 5, label, 's-ts', 'end'); };
    var rails = function (w) { return Wl(40, 40, w - 20, 40, true) + Wl(40, 440, w - 20, 440, false) + T(28, 45, 'L', 's-ts s-fa', 'end') + T(28, 445, 'N', 's-ts s-fc', 'end'); };
    return { W: Wl, T: T, C: C, K: K, H: H, rails: rails };
  }
  function cmdBotoes(p, lista) { return '<div class="lab-btns">' + lista.map(function (b) { return '<button type="button" class="btn" id="' + p + b[0] + '">' + b[1] + '</button>'; }).join('') + '</div>'; }
  function pulso(st, k, desenha) { st[k] = true; desenha(); setTimeout(function () { st[k] = false; desenha(); }, 550); }

  W['partida-direta'] = function (el, cfg) {
    var p = 'pd' + (++seq) + '-', D = cmdDesenho(), S = { s1: false, s0: false, trip: false, k1: false };
    el.innerHTML = cabeca(cfg) + '<svg viewBox="0 0 540 470" role="img" aria-label="Diagrama de comando da partida direta com selo e sinalização"></svg>' +
      cmdBotoes(p, [['on', 'Pressionar S1 (liga)'], ['off', 'Pressionar S0 (desliga)'], ['trip', 'Simular sobrecarga'], ['reset', 'Rearmar F7']]) +
      '<p class="lab-txt" aria-live="polite"></p>';
    var svg = el.querySelector('svg'), txt = el.querySelector('.lab-txt');
    function r() {
      var f7 = !S.trip, s0c = !S.s0;
      for (var i = 0; i < 3; i++) S.k1 = f7 && s0c && (S.s1 || S.k1);
      var A = f7 && s0c, B = A && (S.s1 || S.k1), s = D.rails(540);
      s += D.W(140, 40, 140, 60, true) + D.C(140, 60, 110, { kind: 'nf', closed: f7, act: 'therm', t1: '95', t2: '96', label: 'F7', onTop: true, onBot: f7 });
      s += D.W(140, 110, 140, 130, f7) + D.C(140, 130, 180, { kind: 'nf', closed: s0c, act: 'push', label: 'S0', onTop: f7, onBot: A });
      s += D.W(140, 180, 140, 205, A) + D.W(140, 205, 240, 205, A) + D.W(140, 205, 140, 215, A) + D.W(240, 205, 240, 215, A);
      s += D.C(140, 215, 265, { kind: 'na', closed: S.s1, act: 'push', label: 'S1', onTop: A, onBot: B });
      s += D.C(240, 215, 265, { kind: 'na', closed: S.k1, t1: '13', t2: '14', onTop: A, onBot: B }) + D.T(222, 244, 'K1', 's-ts', 'end');
      s += D.W(140, 265, 140, 285, B) + D.W(240, 265, 240, 285, B) + D.W(140, 285, 240, 285, B) + D.W(140, 285, 140, 330, B);
      s += D.K(140, 330, 390, 'K1', S.k1) + D.W(140, 390, 140, 440, false);
      s += D.W(340, 40, 340, 215, true) + D.C(340, 215, 265, { kind: 'na', closed: S.k1, t1: '23', t2: '24', onTop: true, onBot: S.k1 }) + D.T(322, 244, 'K1', 's-ts', 'end');
      s += D.W(340, 265, 340, 330, S.k1) + D.H(340, 330, 390, 'H1', S.k1) + D.W(340, 390, 340, 440, false) + D.T(354, 414, 'ligado', 's-tm');
      s += D.W(460, 40, 460, 215, true) + D.C(460, 215, 265, { kind: 'na', closed: S.trip, act: 'therm', t1: '97', t2: '98', onTop: true, onBot: S.trip }) + D.T(430, 244, 'F7', 's-ts', 'end');
      s += D.W(460, 265, 460, 330, S.trip) + D.H(460, 330, 390, 'H2', S.trip) + D.W(460, 390, 460, 440, false) + D.T(474, 414, 'falha', 's-tm');
      svg.innerHTML = s;
      txt.textContent = 'Contator K1: ' + (S.k1 ? 'energizado, motor funcionando' : 'desenergizado, motor parado') + (S.trip ? '. Relé de sobrecarga atuado: 95-96 aberto e 97-98 fechado; rearme antes de religar.' : S.k1 && !S.s1 ? '. A bobina se mantém pelo selo (13-14).' : '.');
    }
    var q = function (k) { return el.querySelector('#' + p + k); };
    q('on').addEventListener('click', function () { pulso(S, 's1', r); });
    q('off').addEventListener('click', function () { pulso(S, 's0', r); });
    q('trip').addEventListener('click', function () { S.trip = true; r(); });
    q('reset').addEventListener('click', function () { S.trip = false; r(); });
    r();
  };

  W['reversao'] = function (el, cfg) {
    var p = 'rv' + (++seq) + '-', D = cmdDesenho(), S = { s1: false, s2: false, s0: false, trip: false, k1: false, k2: false };
    el.innerHTML = cabeca(cfg) + '<svg viewBox="0 0 560 480" role="img" aria-label="Diagrama de comando da reversão com intertravamento elétrico"></svg>' +
      cmdBotoes(p, [['a', 'Pressionar S1 (sentido 1)'], ['b', 'Pressionar S2 (sentido 2)'], ['off', 'Pressionar S0 (desliga)'], ['trip', 'Simular sobrecarga'], ['reset', 'Rearmar F7']]) +
      '<p class="lab-txt" aria-live="polite"></p>';
    var svg = el.querySelector('svg'), txt = el.querySelector('.lab-txt'), bloq = '';
    function r() {
      var f7 = !S.trip, s0c = !S.s0, A = f7 && s0c;
      for (var i = 0; i < 3; i++) { var n1 = A && (S.s1 || S.k1) && !S.k2, n2 = A && (S.s2 || S.k2) && !n1; S.k1 = n1; S.k2 = n2; }
      var B1 = A && (S.s1 || S.k1), B2 = A && (S.s2 || S.k2), s = D.rails(560);
      s += D.W(120, 40, 120, 55, true) + D.C(120, 55, 105, { kind: 'nf', closed: f7, act: 'therm', t1: '95', t2: '96', label: 'F7', onTop: true, onBot: f7 });
      s += D.W(120, 105, 120, 120, f7) + D.C(120, 120, 170, { kind: 'nf', closed: s0c, act: 'push', label: 'S0', onTop: f7, onBot: A });
      s += D.W(120, 170, 120, 188, A) + D.W(120, 188, 420, 188, A);
      s += D.W(120, 188, 120, 198, A) + D.W(200, 188, 200, 198, A);
      s += D.C(120, 198, 248, { kind: 'na', closed: S.s1, act: 'push', label: 'S1', onTop: A, onBot: B1 });
      s += D.C(200, 198, 248, { kind: 'na', closed: S.k1, t1: '13', t2: '14', onTop: A, onBot: B1 }) + D.T(184, 228, 'K1', 's-ts', 'end');
      s += D.W(120, 248, 120, 262, B1) + D.W(200, 248, 200, 262, B1) + D.W(120, 262, 200, 262, B1) + D.W(120, 262, 120, 280, B1);
      var c1 = !S.k2; s += D.C(120, 280, 330, { kind: 'nf', closed: c1, t1: '21', t2: '22', onTop: B1, onBot: B1 && c1 }) + D.T(104, 310, 'K2', 's-ts', 'end');
      s += D.W(120, 330, 120, 345, B1 && c1) + D.K(120, 345, 405, 'K1', S.k1) + D.W(120, 405, 120, 440, false);
      s += D.W(340, 188, 340, 198, A) + D.W(420, 188, 420, 198, A);
      s += D.C(340, 198, 248, { kind: 'na', closed: S.s2, act: 'push', label: 'S2', onTop: A, onBot: B2 });
      s += D.C(420, 198, 248, { kind: 'na', closed: S.k2, t1: '13', t2: '14', onTop: A, onBot: B2 }) + D.T(404, 228, 'K2', 's-ts', 'end');
      s += D.W(340, 248, 340, 262, B2) + D.W(420, 248, 420, 262, B2) + D.W(340, 262, 420, 262, B2) + D.W(340, 262, 340, 280, B2);
      var c2 = !S.k1; s += D.C(340, 280, 330, { kind: 'nf', closed: c2, t1: '21', t2: '22', onTop: B2, onBot: B2 && c2 }) + D.T(324, 310, 'K1', 's-ts', 'end');
      s += D.W(340, 330, 340, 345, B2 && c2) + D.K(340, 345, 405, 'K2', S.k2) + D.W(340, 405, 340, 440, false);
      s += D.T(150, 470, 'NF de K2 trava K1', 's-tm', 'middle') + D.T(390, 470, 'NF de K1 trava K2', 's-tm', 'middle');
      svg.innerHTML = s;
      txt.textContent = 'Motor: ' + (S.k1 ? 'girando no sentido 1 (K1)' : S.k2 ? 'girando no sentido 2 (K2)' : 'parado') + (S.trip ? '. Relé de sobrecarga atuado.' : bloq ? '. ' + bloq : '.');
    }
    var q = function (k) { return el.querySelector('#' + p + k); };
    /* Tentar o outro sentido com um contator ligado: o NF dele está aberto, e nada acontece. */
    var tenta = function (k, outro, nome) { return function () { bloq = S[outro] ? nome + ' não liga: o NF de ' + (outro === 'k1' ? 'K1' : 'K2') + ' está aberto (intertravamento). Desligue em S0 primeiro.' : ''; pulso(S, k, r); }; };
    q('a').addEventListener('click', tenta('s1', 'k2', 'K1'));
    q('b').addEventListener('click', tenta('s2', 'k1', 'K2'));
    q('off').addEventListener('click', function () { bloq = ''; pulso(S, 's0', r); });
    q('trip').addEventListener('click', function () { bloq = ''; S.trip = true; r(); });
    q('reset').addEventListener('click', function () { S.trip = false; r(); });
    r();
  };

  /* ---- M2: transformador ideal (carga resistiva) e rendimento em função da carga. ---- */
  W['transformador-ideal'] = function (el, cfg) {
    var v = cfg.valores || {}, p = 'ti' + (++seq) + '-';
    var val = function (k, d) { return v[k] != null ? v[k] : d; };
    el.innerHTML = cabeca(cfg) +
      '<div class="lab-in">' + campo(p + 'V1', 'V<sub>1</sub> (V)', val('tV1', 2200), ' min="0"') + campo(p + 'N1', 'Espiras N<sub>1</sub>', val('tN1', 1000), ' min="1"') +
      campo(p + 'N2', 'Espiras N<sub>2</sub>', val('tN2', 100), ' min="1"') + campo(p + 'R2', 'Carga R<sub>2</sub> (Ω)', val('tR2', 4), ' min="0"') + campo(p + 'F', 'f (Hz)', val('tF', 60), ' min="1"') + '</div>' +
      '<div class="lab-out" aria-live="polite"></div><p class="lab-txt"></p>';
    var q = function (k) { return el.querySelector('#' + p + k); }, out = el.querySelector('.lab-out'), txt = el.querySelector('.lab-txt');
    function calc() {
      var V1 = +q('V1').value, N1 = +q('N1').value, N2 = +q('N2').value, R2 = +q('R2').value, f = +q('F').value;
      if (!(V1 > 0 && N1 > 0 && N2 > 0 && f > 0) || !(R2 >= 0)) { out.innerHTML = cell('Aviso', 'Use valores positivos (R<sub>2</sub> = 0 é a vazio).'); txt.textContent = ''; return; }
      var a = N1 / N2, V2 = V1 / a, I2 = R2 > 0 ? V2 / R2 : 0, I1 = I2 / a, S = V2 * I2, Z = a * a * R2, phi = V1 / (4.44 * f * N1);
      var tipo = a > 1 ? 'abaixador' : a < 1 ? 'elevador' : 'isolador';
      out.innerHTML = cell('Relação a', fmt(a, 3) + ' (' + tipo + ')') + cell('V<sub>2</sub>', fmt(V2, 1) + ' V') + cell('I<sub>2</sub>', R2 > 0 ? fmt(I2) + ' A' : 'a vazio') +
        cell('I<sub>1</sub>', R2 > 0 ? fmt(I1) + ' A' : 'a vazio') + cell('Potência S', S >= 1000 ? fmt(S / 1000) + ' kVA' : fmt(S, 1) + ' VA') +
        cell('Z′ no primário', R2 > 0 ? fmt(Z) + ' Ω' : '—') + cell('Φ<sub>máx</sub>', fmt(phi * 1000, 3) + ' mWb');
      txt.innerHTML = R2 > 0 ? 'Confira: V<sub>1</sub>·I<sub>1</sub> = ' + fmt(V1 * I1, 0) + ' VA = V<sub>2</sub>·I<sub>2</sub>, e a fonte “vê” a carga de ' + fmt(R2) + ' Ω como ' + fmt(Z) + ' Ω (a² vezes).'
        : 'A vazio, o transformador ideal não puxa corrente; o real puxa só a de magnetização.';
    }
    ['V1', 'N1', 'N2', 'R2', 'F'].forEach(function (k) { q(k).addEventListener('input', calc); });
    calc();
  };

  W['rendimento-trafo'] = function (el, cfg) {
    var v = cfg.valores || {}, p = 'rt' + (++seq) + '-';
    var val = function (k, d) { return v[k] != null ? v[k] : d; };
    el.innerHTML = cabeca(cfg) +
      '<div class="lab-in">' + campo(p + 'S', 'S nominal (kVA)', val('rS', 50), ' min="0.1"') + campo(p + 'Fe', 'P<sub>Fe</sub> (W)', val('rFe', 300), ' min="0"') +
      campo(p + 'Cu', 'P<sub>Cu,nom</sub> (W)', val('rCu', 1200), ' min="0"') + campo(p + 'FP', 'Fator de potência', val('rFP', 0.8), ' min="0.05" max="1" step="0.05"') + '</div>' +
      '<div class="lab-ctrl">' + faixa(p + 'X', 'Carga (% da nominal)', 5, 125, 1, val('rX', 75)) + '</div>' +
      '<svg viewBox="0 0 620 250" role="img" aria-label="Rendimento do transformador em função da carga"></svg>' +
      '<div class="lab-out" aria-live="polite"></div>';
    var q = function (k) { return el.querySelector('#' + p + k); }, out = el.querySelector('.lab-out'), svg = el.querySelector('svg');
    function calc() {
      var S = +q('S').value, Fe = +q('Fe').value, Cu = +q('Cu').value, fp = +q('FP').value, x = +q('X').value / 100;
      q('X').nextElementSibling.textContent = Math.round(x * 100) + '%';
      if (!(S > 0 && Fe >= 0 && Cu >= 0 && fp > 0 && fp <= 1) || !(Fe + Cu > 0)) { out.innerHTML = cell('Aviso', 'Confira os dados: S &gt; 0, perdas ≥ 0 (não as duas nulas) e FP entre 0 e 1.'); svg.innerHTML = ''; return; }
      var eta = function (c) { var P = c * S * fp * 1000; return 100 * P / (P + Fe + c * c * Cu); };
      var xm = Cu > 0 ? Math.sqrt(Fe / Cu) : null, xs = [];
      for (var k = 5; k <= 125; k++) xs.push(k / 100);
      var ys = xs.map(eta), lo = Math.floor(Math.min.apply(null, ys)), hi = Math.ceil(Math.max.apply(null, ys) + 0.2);
      var X0 = 78, X1 = 600, Y0 = 200, Y1 = 22;
      var px = function (c) { return X0 + (X1 - X0) * (c - 0.05) / 1.2; }, py = function (e) { return Y0 - (Y0 - Y1) * (e - lo) / Math.max(hi - lo, 0.5); };
      var s = '', d = '', step = Math.max(1, Math.ceil((hi - lo) / 5));
      for (var e = lo; e <= hi; e += step) s += '<line x1="' + X0 + '" y1="' + py(e).toFixed(1) + '" x2="' + X1 + '" y2="' + py(e).toFixed(1) + '" class="s-grid"/><text x="' + (X0 - 8) + '" y="' + (py(e) + 6).toFixed(1) + '" class="s-tm" text-anchor="end">' + e + '%</text>';
      [0.25, 0.5, 0.75, 1, 1.25].forEach(function (c) { s += '<text x="' + px(c).toFixed(1) + '" y="' + (Y0 + 22) + '" class="s-tm" text-anchor="middle">' + Math.round(c * 100) + '%</text>'; });
      s += '<text x="' + X1 + '" y="' + (Y0 + 46) + '" class="s-tm" text-anchor="end">carga, em % da nominal</text>';
      xs.forEach(function (c, i) { d += (i ? 'L' : 'M') + px(c).toFixed(1) + ',' + py(ys[i]).toFixed(1); });
      s += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" class="s-ax"/><path d="' + d + '" class="s-w s-pc"/>';
      if (xm && xm >= 0.05 && xm <= 1.25) s += '<line x1="' + px(xm).toFixed(1) + '" y1="' + py(eta(xm)).toFixed(1) + '" x2="' + px(xm).toFixed(1) + '" y2="' + Y0 + '" class="s-dash s-pa"/>';
      var xc = Math.max(x, 0.05);
      s += '<circle cx="' + px(xc).toFixed(1) + '" cy="' + py(eta(xc)).toFixed(1) + '" r="7" class="s-f-pa"/>';
      svg.innerHTML = s;
      var P = x * S * fp * 1000, pc = x * x * Cu;
      out.innerHTML = cell('Potência de saída', fmt(P / 1000) + ' kW') + cell('Perdas no cobre', fmt(pc, 0) + ' W') + cell('Perdas totais', fmt(pc + Fe, 0) + ' W') +
        cell('Rendimento', fmt(eta(Math.max(x, 0.0001))) + '%') + cell('η máximo em', xm ? fmt(xm * 100, 0) + '% da carga' : '—') + cell('η máximo', xm ? fmt(eta(xm)) + '%' : '—');
    }
    ['S', 'Fe', 'Cu', 'FP', 'X'].forEach(function (k) { q(k).addEventListener('input', calc); });
    calc();
  };

  /* Exercícios comentados: a lista estática (com <details> de gabarito) vira alternativas clicáveis com placar. */
  W['exercicios'] = function (el) {
    var qs = el.querySelectorAll('.exq'), n = qs.length;
    var placar = document.createElement('p'); placar.className = 'exs-score'; placar.setAttribute('aria-live', 'polite');
    el.querySelector('.exs-h').after(placar);
    function upd() {
      var feitas = el.querySelectorAll('.exq.feita').length, certas = el.querySelectorAll('.exq.certa').length;
      placar.textContent = feitas + ' de ' + n + ' respondidas · ' + certas + ' ' + (certas === 1 ? 'acerto' : 'acertos');
    }
    qs.forEach(function (qe) {
      var a = +qe.dataset.a, det = qe.querySelector('details'), sum = det.querySelector('summary');
      var lis = qe.querySelectorAll('.exq-o > li');
      lis.forEach(function (li, k) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'exq-b'; b.dataset.k = k;
        while (li.firstChild) b.appendChild(li.firstChild);
        li.appendChild(b);
        b.addEventListener('click', function () {
          if (qe.classList.contains('feita')) return;
          qe.classList.add('feita'); if (k === a) qe.classList.add('certa');
          qe.querySelectorAll('.exq-b').forEach(function (x, j) { x.disabled = true; if (j === a) x.classList.add('right'); else if (j === k) x.classList.add('wrong'); });
          sum.textContent = k === a ? 'Correto. Gabarito comentado' : 'Incorreto. Gabarito comentado';
          det.open = true; upd();
        });
      });
    });
    var reset = document.createElement('button'); reset.type = 'button'; reset.className = 'btn exs-reset'; reset.textContent = 'Refazer os exercícios';
    reset.addEventListener('click', function () {
      qs.forEach(function (qe) {
        qe.classList.remove('feita', 'certa');
        qe.querySelectorAll('.exq-b').forEach(function (x) { x.disabled = false; x.classList.remove('right', 'wrong'); });
        var det = qe.querySelector('details'); det.open = false; det.querySelector('summary').textContent = 'Ver o gabarito comentado';
      });
      upd();
    });
    el.appendChild(reset);
    upd();
  };

  /* Figura larga: botão para ampliar (rolagem lateral dentro da figura, nunca da página). */
  function figuras(raiz) {
    raiz.querySelectorAll('.estacao figure:not([data-zoom])').forEach(function (f) {
      var s = f.querySelector('svg'); if (!s) return;
      var vb = (s.getAttribute('viewBox') || '').split(/\s+/).map(Number);
      f.setAttribute('data-zoom', '');
      if (!(vb[2] > 480)) return;
      var box = document.createElement('div'); box.className = 'fig-box'; s.before(box); box.appendChild(s);
      var b = document.createElement('button'); b.type = 'button'; b.className = 'fig-zoom'; b.setAttribute('aria-pressed', 'false'); b.textContent = 'Ampliar a figura';
      b.addEventListener('click', function () {
        var on = f.classList.toggle('zoom'); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Ajustar à tela' : 'Ampliar a figura';
        /* Ampliada, a figura rola de lado: a área de rolagem precisa receber foco pelo teclado. */
        if (on) { box.tabIndex = 0; box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Figura ampliada: deslize para o lado'); }
        else { box.removeAttribute('tabindex'); box.removeAttribute('role'); box.removeAttribute('aria-label'); }
      });
      f.appendChild(b);
    });
  }

  function montarCalculadoras(raiz) {
    raiz = raiz || document;
    raiz.querySelectorAll('[data-calc]').forEach(function (el) {
      if (el.hasAttribute('data-montado')) return;
      var f = W[el.getAttribute('data-calc')]; if (!f) return;
      var cfg = {}; try { cfg = JSON.parse(el.getAttribute('data-cfg') || '{}'); } catch (e) { }
      try { f(el, cfg); el.setAttribute('data-montado', ''); } catch (e) { el.setAttribute('data-erro', String(e && e.message || e)); }
    });
    figuras(raiz);
  }

  g.CALC_WIDGETS = W;
  g.montarCalculadoras = montarCalculadoras;
})(typeof window !== 'undefined' ? window : globalThis);

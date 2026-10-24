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

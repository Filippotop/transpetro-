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

/* Elétrica de Ouro: "Contas passo a passo" (Biblioteca → Contas).
   Cada receita é uma conta que cai na prova: fórmula, jeito de lembrar, campos com valores de exemplo, o passo a passo
   com os números e as armadilhas de unidade. Dois modos: "Ver os passos" (muda os números e os passos se recalculam) e
   "Treinar" (sorteia números, você faz a conta, confere e só então vê os passos).
   window.CONTAS = {lista, receita(id), calcular(r, v), sortear(r), montar(host, {r}), confere(r, v, texto)}.
   O que o aluno acerta fica em S.ct[id] = {s: acertos seguidos, n: tentativas, b: caixa 0-4, due: próxima revisão, t}, pela ponte window.EDO_CT do index.html.
   Teste: tests/contas.test.mjs (cada receita com os valores de exemplo e com 300 sorteios). */
(function (W) {
  'use strict';
  /* ---------- números em pt-BR ---------- */
  var g = function (x) {
    if (!isFinite(x)) return '—';
    var d = Math.abs(x) >= 10000 ? 5 : 4;
    return Number(x).toLocaleString('pt-BR', { maximumSignificantDigits: d });
  };
  var u = function (x, un) { return g(x) + (un ? '\u00a0' + un : ''); };
  var b = function (x, un) { return '<b>' + u(x, un) + '</b>'; };
  var S = function (t, e) { return { t: t, e: e }; };
  var rs = function (x) { return 'R$\u00a0' + Number(x).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var rad = Math.PI / 180, R3 = Math.sqrt(3);
  var graus = function (x) { return x / rad; };
  var acos = function (x) { return Math.acos(x); };
  var PADRAO = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];

  /* campo: {k, rot, un, v (exemplo), s: [valores sorteáveis]}; seleção: {k, rot, sel: [[chave, rótulo]], v} */
  var L = [];
  var C = function (o) { L.push(o); };

  /* ================= E1 · circuitos CC ================= */
  C({ id: 'ohm', mod: 'E1', nome: 'Lei de Ohm: corrente num resistor',
    f: '<var>I</var> = <var>V</var> / <var>R</var>',
    lembrar: 'Triângulo com <var>V</var> em cima e <var>I</var>·<var>R</var> embaixo: tape a letra que procura e o que sobra é a conta. Tape <var>I</var>: <var>V</var>/<var>R</var>.',
    campos: [{ k: 'V', rot: 'Tensão', un: 'V', v: 220, s: [12, 24, 127, 220, 380] }, { k: 'R', rot: 'Resistência', un: 'Ω', v: 44, s: [4, 8, 10, 20, 22, 44, 55] }],
    calc: function (v) {
      var I = v.V / v.R;
      return { p: [
        S('Anote o que a questão dá e o que pede', 'Dados: <var>V</var> = ' + u(v.V, 'V') + ' e <var>R</var> = ' + u(v.R, 'Ω') + '. Pede: <var>I</var> em ampères.'),
        S('Escolha a fórmula', '<var>I</var> = <var>V</var> / <var>R</var>'),
        S('Substitua e calcule', '<var>I</var> = ' + g(v.V) + ' / ' + g(v.R) + ' = ' + b(I, 'A'))
      ], r: [['Corrente', I, 'A']] };
    },
    arm: ['kΩ e mA: converta antes (2 kΩ = 2000 Ω; 50 mA = 0,05 A).', 'Se deu um número enorme (220 · 44 = 9680), você multiplicou em vez de dividir.'] });

  C({ id: 'pot-resistor', mod: 'E1', nome: 'Potência dissipada num resistor',
    f: '<var>P</var> = <var>V</var>·<var>I</var> = <var>R</var>·<var>I</var>² = <var>V</var>² / <var>R</var>',
    lembrar: 'Três formas da mesma conta. Com <var>V</var> e <var>R</var> use <var>V</var>²/<var>R</var>; com <var>I</var> e <var>R</var> use <var>R</var>·<var>I</var>²; com <var>V</var> e <var>I</var> use <var>V</var>·<var>I</var>. O quadrado fica na grandeza que a questão dá junto com <var>R</var>.',
    campos: [{ k: 'V', rot: 'Tensão', un: 'V', v: 220, s: [12, 24, 127, 220] }, { k: 'R', rot: 'Resistência', un: 'Ω', v: 22, s: [4, 8, 10, 11, 22, 44] }],
    calc: function (v) {
      var I = v.V / v.R, P = v.V * I;
      return { p: [
        S('Veja o que falta', 'Tem <var>V</var> e <var>R</var>; falta <var>I</var> (ou use direto <var>V</var>²/<var>R</var>).'),
        S('Ache a corrente', '<var>I</var> = <var>V</var>/<var>R</var> = ' + g(v.V) + ' / ' + g(v.R) + ' = ' + u(I, 'A')),
        S('Calcule a potência', '<var>P</var> = <var>V</var>·<var>I</var> = ' + g(v.V) + ' · ' + g(I) + ' = ' + b(P, 'W')),
        S('Confira pela outra forma', '<var>V</var>² / <var>R</var> = ' + g(v.V * v.V) + ' / ' + g(v.R) + ' = ' + u(v.V * v.V / v.R, 'W'))
      ], r: [['Potência', P, 'W']] };
    },
    arm: ['Dobrar a tensão (mesma resistência) multiplica a potência por 4, e não por 2.', 'Potência em kW: divida os watts por 1000.'] });

  C({ id: 'chuveiro', mod: 'E1', nome: 'Potência em outra tensão (mesma resistência)',
    f: '<var>P</var><sub>2</sub> = <var>P</var><sub>1</sub>·(<var>V</var><sub>2</sub> / <var>V</var><sub>1</sub>)²',
    lembrar: 'A resistência é a mesma, só a tensão muda. Ache <var>R</var> = <var>V</var>²/<var>P</var> com os dados da plaqueta e use de novo na tensão nova. Ou direto: a potência muda com o quadrado da razão das tensões.',
    campos: [{ k: 'P1', rot: 'Potência da plaqueta', un: 'W', v: 5500, s: [4400, 5500, 6800] }, { k: 'V1', rot: 'Tensão da plaqueta', un: 'V', v: 220, s: [220] }, { k: 'V2', rot: 'Tensão ligada', un: 'V', v: 127, s: [110, 127] }],
    calc: function (v) {
      var R = v.V1 * v.V1 / v.P1, P2 = v.V2 * v.V2 / R, razao = v.V2 / v.V1;
      return { p: [
        S('A plaqueta dá a resistência', '<var>R</var> = <var>V</var><sub>1</sub>² / <var>P</var><sub>1</sub> = ' + g(v.V1 * v.V1) + ' / ' + g(v.P1) + ' = ' + u(R, 'Ω')),
        S('Use a mesma <var>R</var> na tensão nova', '<var>P</var><sub>2</sub> = <var>V</var><sub>2</sub>² / <var>R</var> = ' + g(v.V2 * v.V2) + ' / ' + g(R) + ' = ' + b(P2, 'W')),
        S('Confira pelo atalho', '<var>P</var><sub>1</sub>·(<var>V</var><sub>2</sub>/<var>V</var><sub>1</sub>)² = ' + g(v.P1) + ' · ' + g(razao * razao) + ' = ' + u(v.P1 * razao * razao, 'W') + ' (a razão ' + g(razao) + ' ao quadrado vale ' + g(razao * razao) + ').')
      ], r: [['Potência na tensão nova', P2, 'W']] };
    },
    arm: ['Erro clássico: usar a razão das tensões sem elevar ao quadrado.', 'A resistência não muda com a tensão (nas questões, o chuveiro é um resistor fixo).'],
    valido: function (v) { return v.V2 !== v.V1; } });

  C({ id: 'fio', mod: 'E1', nome: 'Resistência de um condutor',
    f: '<var>R</var> = <var>ρ</var>·<var>L</var> / <var>S</var>',
    lembrar: 'Fio mais comprido resiste mais (<var>L</var> em cima), fio mais grosso resiste menos (<var>S</var> embaixo). Com ρ em Ω·mm²/m: <var>L</var> em metros e <var>S</var> em mm², e o resultado sai em ohms.',
    campos: [{ k: 'rho', rot: 'Resistividade ρ', un: 'Ω·mm²/m', v: 0.0172, s: [0.0172] }, { k: 'L', rot: 'Comprimento', un: 'm', v: 100, s: [50, 100, 200, 300] }, { k: 'S', rot: 'Seção', un: 'mm²', v: 2.5, s: [1.5, 2.5, 4, 6, 10] }],
    calc: function (v) {
      var R = v.rho * v.L / v.S;
      return { p: [
        S('Confira as unidades', '<var>ρ</var> em Ω·mm²/m pede <var>L</var> em m e <var>S</var> em mm². Aqui: ' + g(v.rho) + ', ' + g(v.L) + ' m e ' + g(v.S) + ' mm².'),
        S('Substitua na fórmula', '<var>R</var> = ' + g(v.rho) + ' · ' + g(v.L) + ' / ' + g(v.S)),
        S('Calcule', '<var>R</var> = ' + g(v.rho * v.L) + ' / ' + g(v.S) + ' = ' + b(R, 'Ω'))
      ], r: [['Resistência do condutor', R, 'Ω']] };
    },
    arm: ['Ida e volta: num circuito de 2 condutores o comprimento total é o dobro do trecho (queda de tensão).', 'Seção em mm²: não converta para m² se ρ está em Ω·mm²/m.'] });

  C({ id: 'paralelo', mod: 'E1', nome: 'Resistência equivalente de dois resistores em paralelo',
    f: '<var>R</var><sub>eq</sub> = <var>R</var><sub>1</sub>·<var>R</var><sub>2</sub> / (<var>R</var><sub>1</sub> + <var>R</var><sub>2</sub>)',
    lembrar: 'Produto sobre soma, só para dois resistores. O resultado é sempre menor que o menor dos dois: use isso para conferir.',
    campos: [{ k: 'R1', rot: 'Primeiro resistor', un: 'Ω', v: 12, s: [6, 10, 12, 20, 30] }, { k: 'R2', rot: 'Segundo resistor', un: 'Ω', v: 6, s: [3, 6, 12, 15, 60] }],
    calc: function (v) {
      var Re = v.R1 * v.R2 / (v.R1 + v.R2), m = Math.min(v.R1, v.R2);
      return { p: [
        S('Produto', '<var>R</var><sub>1</sub>·<var>R</var><sub>2</sub> = ' + g(v.R1) + ' · ' + g(v.R2) + ' = ' + g(v.R1 * v.R2)),
        S('Soma', '<var>R</var><sub>1</sub> + <var>R</var><sub>2</sub> = ' + g(v.R1) + ' + ' + g(v.R2) + ' = ' + g(v.R1 + v.R2)),
        S('Divida', '<var>R</var><sub>eq</sub> = ' + g(v.R1 * v.R2) + ' / ' + g(v.R1 + v.R2) + ' = ' + b(Re, 'Ω')),
        S('Confira', 'Tem de ser menor que o menor resistor (' + g(m) + ' Ω): ' + g(Re) + ' < ' + g(m) + ' ✓')
      ], r: [['Resistência equivalente', Re, 'Ω']] };
    },
    arm: ['Somar os dois (série) dá um valor MAIOR que o maior: se deu isso, você usou a conta errada.', 'Resistores iguais em paralelo: <var>R</var>/<var>n</var>.'] });

  C({ id: 'divisor', mod: 'E1', nome: 'Divisor de tensão',
    f: '<var>V</var><sub>2</sub> = <var>V</var>·<var>R</var><sub>2</sub> / (<var>R</var><sub>1</sub> + <var>R</var><sub>2</sub>)',
    lembrar: 'A tensão se divide na proporção das resistências: quem tem mais resistência fica com mais tensão. Corrente única da série: <var>I</var> = <var>V</var>/(<var>R</var><sub>1</sub>+<var>R</var><sub>2</sub>).',
    campos: [{ k: 'V', rot: 'Tensão da fonte', un: 'V', v: 12, s: [5, 9, 12, 24, 48] }, { k: 'R1', rot: 'R1 (em série)', un: 'Ω', v: 100, s: [100, 200, 470, 1000] }, { k: 'R2', rot: 'R2 (onde mede)', un: 'Ω', v: 200, s: [100, 200, 330, 1000] }],
    calc: function (v) {
      var Rt = v.R1 + v.R2, I = v.V / Rt, V2 = I * v.R2;
      return { p: [
        S('Resistência total da série', '<var>R</var><sub>t</sub> = ' + g(v.R1) + ' + ' + g(v.R2) + ' = ' + u(Rt, 'Ω')),
        S('Corrente única', '<var>I</var> = <var>V</var>/<var>R</var><sub>t</sub> = ' + g(v.V) + ' / ' + g(Rt) + ' = ' + u(I, 'A')),
        S('Tensão em R2', '<var>V</var><sub>2</sub> = <var>I</var>·<var>R</var><sub>2</sub> = ' + g(I) + ' · ' + g(v.R2) + ' = ' + b(V2, 'V')),
        S('Confira', 'As duas tensões somam a da fonte: ' + g(I * v.R1) + ' + ' + g(V2) + ' = ' + g(I * v.R1 + V2) + ' V ✓')
      ], r: [['Tensão em R2', V2, 'V']] };
    },
    arm: ['Trocar R1 por R2 na fórmula dá a tensão do outro resistor.', 'Só vale sem carga ligada em R2; uma carga em paralelo muda R2.'] });

  C({ id: 'custo', mod: 'E1', nome: 'Energia e custo na conta de luz',
    f: '<var>E</var> = <var>P</var>(kW)·<var>t</var>(h)  e  custo = <var>E</var>·tarifa',
    lembrar: 'kWh = kW × horas. Potência em watts: divida por 1000 antes. Depois multiplique pelas horas do mês e pela tarifa.',
    campos: [{ k: 'P', rot: 'Potência', un: 'W', v: 5500, s: [1500, 2200, 4400, 5500] }, { k: 'h', rot: 'Horas por dia', un: 'h', v: 0.5, s: [0.5, 1, 2, 4, 8] }, { k: 'd', rot: 'Dias', un: 'dias', v: 30, s: [30] }, { k: 'tar', rot: 'Tarifa', un: 'R$/kWh', v: 0.8, s: [0.6, 0.8, 0.9, 1] }],
    calc: function (v) {
      var kW = v.P / 1000, th = v.h * v.d, E = kW * th, custo = E * v.tar;
      return { p: [
        S('Potência em quilowatts', '<var>P</var> = ' + g(v.P) + ' W / 1000 = ' + u(kW, 'kW')),
        S('Horas no período', '<var>t</var> = ' + g(v.h) + ' h/dia · ' + g(v.d) + ' dias = ' + u(th, 'h')),
        S('Energia consumida', '<var>E</var> = ' + g(kW) + ' · ' + g(th) + ' = ' + u(E, 'kWh')),
        S('Custo', 'custo = ' + g(E) + ' · ' + rs(v.tar) + ' = <b>' + rs(custo) + '</b>')
      ], r: [['Energia', E, 'kWh'], ['Custo', Math.round(custo * 100) / 100, 'R$']] };
    },
    arm: ['Watt-hora e quilowatt-hora diferem por 1000: é a armadilha mais usada.', 'Tarifa em R$/kWh: o consumo tem de estar em kWh.'] });

  /* ================= E2 · corrente alternada ================= */
  C({ id: 'impedancia', mod: 'E2', nome: 'Circuito RL série: reatância, impedância e corrente',
    f: '<var>X</var><sub>L</sub> = 2π·<var>f</var>·<var>L</var>;  <var>Z</var> = √(<var>R</var>² + <var>X</var><sub>L</sub>²);  <var>I</var> = <var>V</var>/<var>Z</var>',
    lembrar: '<var>R</var> e <var>X</var> são catetos de um triângulo e <var>Z</var> é a hipotenusa: Pitágoras, e não soma. A corrente atrasa da tensão de φ = arctan(<var>X</var><sub>L</sub>/<var>R</var>).',
    campos: [{ k: 'V', rot: 'Tensão', un: 'V', v: 220, s: [127, 220] }, { k: 'f', rot: 'Frequência', un: 'Hz', v: 60, s: [50, 60] }, { k: 'L', rot: 'Indutância', un: 'H', v: 0.1, s: [0.05, 0.1, 0.2] }, { k: 'R', rot: 'Resistência', un: 'Ω', v: 30, s: [10, 20, 30, 40] }],
    calc: function (v) {
      var X = 2 * Math.PI * v.f * v.L, Z = Math.sqrt(v.R * v.R + X * X), I = v.V / Z, fi = graus(Math.atan2(X, v.R));
      return { p: [
        S('Reatância indutiva', '<var>X</var><sub>L</sub> = 2π · ' + g(v.f) + ' · ' + g(v.L) + ' = ' + u(X, 'Ω')),
        S('Impedância (Pitágoras)', '<var>Z</var> = √(' + g(v.R) + '² + ' + g(X) + '²) = √' + g(v.R * v.R + X * X) + ' = ' + u(Z, 'Ω')),
        S('Corrente', '<var>I</var> = <var>V</var>/<var>Z</var> = ' + g(v.V) + ' / ' + g(Z) + ' = ' + b(I, 'A')),
        S('Ângulo da corrente (atrasada)', 'φ = arctan(' + g(X) + ' / ' + g(v.R) + ') = ' + u(fi, '°') + '; cos φ = <var>R</var>/<var>Z</var> = ' + g(v.R / Z))
      ], r: [['Corrente', I, 'A'], ['Impedância', Z, 'Ω']] };
    },
    arm: ['<var>Z</var> ≠ <var>R</var> + <var>X</var><sub>L</sub>: a soma é vetorial (fasorial) e o módulo sai por Pitágoras.', 'Em kHz ou mH, converta antes (10 mH = 0,01 H).'] });

  C({ id: 'rc', mod: 'E2', nome: 'Carga do capacitor: constante de tempo RC',
    f: 'τ = <var>R</var>·<var>C</var>;  <var>v</var><sub>C</sub>(<var>t</var>) = <var>V</var>·(1 − e<sup>−<var>t</var>/τ</sup>)',
    lembrar: '(Capacitor partindo descarregado, <var>v</var><sub>C</sub>(0) = 0.) Em 1τ o capacitor chega a 63,2 % da fonte; em 5τ, a 99,3 % (considera-se carregado). Descarga: em 1τ sobra 36,8 %.',
    campos: [{ k: 'R', rot: 'Resistência', un: 'Ω', v: 10000, s: [1000, 4700, 10000, 22000] }, { k: 'C', rot: 'Capacitância', un: 'µF', v: 100, s: [10, 47, 100, 220] }, { k: 'V', rot: 'Tensão da fonte', un: 'V', v: 12, s: [5, 12, 24] }],
    calc: function (v) {
      var Cf = v.C * 1e-6, tau = v.R * Cf, vc = v.V * (1 - Math.exp(-1));
      return { p: [
        S('Capacitância em farads', '<var>C</var> = ' + g(v.C) + ' µF = ' + g(Cf) + ' F (1 µF = 10⁻⁶ F)'),
        S('Constante de tempo', 'τ = <var>R</var>·<var>C</var> = ' + g(v.R) + ' · ' + g(Cf) + ' = ' + b(tau, 's')),
        S('Tensão depois de 1τ', '<var>v</var><sub>C</sub> = ' + g(v.V) + ' · (1 − e⁻¹) = ' + g(v.V) + ' · 0,632 = ' + u(vc, 'V')),
        S('Quando está carregado', '5τ = ' + u(5 * tau, 's') + ' (≈ 99 % da tensão da fonte)')
      ], r: [['Constante de tempo τ', tau, 's'], ['Tensão em 1τ', vc, 'V']] };
    },
    arm: ['µF → F: multiplique por 10⁻⁶ (não por 10⁻³).', 'τ não é o tempo de carga completa: são cerca de 5τ.'] });

  /* ================= E3 · potência e trifásicos ================= */
  C({ id: 'triangulo', mod: 'E3', nome: 'Triângulo de potências (monofásico)',
    f: '<var>S</var> = <var>V</var>·<var>I</var>;  <var>P</var> = <var>S</var>·cos φ;  <var>Q</var> = <var>S</var>·sen φ',
    lembrar: 'Hipotenusa <var>S</var> (VA), cateto horizontal <var>P</var> (W), cateto vertical <var>Q</var> (var). cos φ é o fator de potência: <var>P</var>/<var>S</var>. Confira com <var>S</var>² = <var>P</var>² + <var>Q</var>².',
    campos: [{ k: 'V', rot: 'Tensão', un: 'V', v: 220, s: [127, 220] }, { k: 'I', rot: 'Corrente', un: 'A', v: 10, s: [5, 10, 15, 20, 25] }, { k: 'fp', rot: 'Fator de potência', un: '', v: 0.8, s: [0.6, 0.8, 0.9] }],
    calc: function (v) {
      var Sv = v.V * v.I, P = Sv * v.fp, sen = Math.sqrt(1 - v.fp * v.fp), Q = Sv * sen;
      return { p: [
        S('Potência aparente', '<var>S</var> = <var>V</var>·<var>I</var> = ' + g(v.V) + ' · ' + g(v.I) + ' = ' + u(Sv, 'VA')),
        S('Potência ativa', '<var>P</var> = <var>S</var>·cos φ = ' + g(Sv) + ' · ' + g(v.fp) + ' = ' + b(P, 'W')),
        S('Seno a partir do cosseno', 'sen φ = √(1 − cos²φ) = √(1 − ' + g(v.fp * v.fp) + ') = ' + g(sen)),
        S('Potência reativa', '<var>Q</var> = <var>S</var>·sen φ = ' + g(Sv) + ' · ' + g(sen) + ' = ' + b(Q, 'var')),
        S('Confira', '√(' + g(P) + '² + ' + g(Q) + '²) = ' + u(Math.sqrt(P * P + Q * Q), 'VA') + ' = <var>S</var> ✓')
      ], r: [['Potência ativa P', P, 'W'], ['Potência reativa Q', Q, 'var'], ['Potência aparente S', Sv, 'VA']] };
    },
    arm: ['Watt, VA e var são unidades diferentes: <var>P</var> não é <var>V</var>·<var>I</var> quando cos φ < 1.', 'sen φ não é 1 − cos φ.'] });

  C({ id: 'fp', mod: 'E3', nome: 'Correção do fator de potência (banco de capacitores)',
    f: '<var>Q</var><sub>c</sub> = <var>P</var>·(tg φ<sub>1</sub> − tg φ<sub>2</sub>)',
    lembrar: 'A potência ativa <var>P</var> não muda; o capacitor só tira reativo. Ache cada ângulo pelo arco cosseno, depois a tangente, e subtraia. O resultado sai em kvar se <var>P</var> estiver em kW.',
    campos: [{ k: 'P', rot: 'Potência ativa', un: 'kW', v: 40, s: [20, 30, 40, 60, 100] }, { k: 'fp1', rot: 'FP atual', un: '', v: 0.8, s: [0.6, 0.7, 0.75, 0.8] }, { k: 'fp2', rot: 'FP desejado', un: '', v: 0.95, s: [0.92, 0.95, 0.98] }],
    calc: function (v) {
      var f1 = acos(v.fp1), f2 = acos(v.fp2), t1 = Math.tan(f1), t2 = Math.tan(f2), Qc = v.P * (t1 - t2);
      return { p: [
        S('Ângulo e tangente do FP atual', 'φ<sub>1</sub> = arccos ' + g(v.fp1) + ' = ' + u(graus(f1), '°') + ';  tg φ<sub>1</sub> = ' + g(t1)),
        S('Ângulo e tangente do FP desejado', 'φ<sub>2</sub> = arccos ' + g(v.fp2) + ' = ' + u(graus(f2), '°') + ';  tg φ<sub>2</sub> = ' + g(t2)),
        S('Diferença de tangentes', 'tg φ<sub>1</sub> − tg φ<sub>2</sub> = ' + g(t1) + ' − ' + g(t2) + ' = ' + g(t1 - t2)),
        S('Reativo do banco', '<var>Q</var><sub>c</sub> = ' + g(v.P) + ' · ' + g(t1 - t2) + ' = ' + b(Qc, 'kvar'))
      ], r: [['Banco de capacitores', Qc, 'kvar']] };
    },
    arm: ['O banco sai em kvar, e não em kW.', 'Não use a diferença de cossenos (0,95 − 0,8): a conta é com as tangentes.'],
    valido: function (v) { return v.fp2 > v.fp1; } });

  C({ id: 'trifasica', mod: 'E3', nome: 'Potência de carga trifásica equilibrada',
    f: '<var>P</var> = √3·<var>V</var><sub>L</sub>·<var>I</var><sub>L</sub>·cos φ;  <var>S</var> = √3·<var>V</var><sub>L</sub>·<var>I</var><sub>L</sub>',
    lembrar: 'Com tensão e corrente DE LINHA, a fórmula leva √3 ≈ 1,73 (e vale para estrela ou triângulo). Com valores de FASE, é 3·<var>V</var><sub>f</sub>·<var>I</var><sub>f</sub>·cos φ.',
    campos: [{ k: 'VL', rot: 'Tensão de linha', un: 'V', v: 380, s: [220, 380, 440] }, { k: 'IL', rot: 'Corrente de linha', un: 'A', v: 10, s: [5, 10, 15, 20, 30] }, { k: 'fp', rot: 'Fator de potência', un: '', v: 0.8, s: [0.7, 0.8, 0.85, 0.9] }],
    calc: function (v) {
      var Sv = R3 * v.VL * v.IL, P = Sv * v.fp;
      return { p: [
        S('Confirme que são valores de linha', '<var>V</var><sub>L</sub> = ' + g(v.VL) + ' V e <var>I</var><sub>L</sub> = ' + g(v.IL) + ' A (entre fases e nos condutores de alimentação).'),
        S('Potência aparente', '<var>S</var> = √3 · ' + g(v.VL) + ' · ' + g(v.IL) + ' = 1,732 · ' + g(v.VL * v.IL) + ' = ' + u(Sv, 'VA')),
        S('Potência ativa', '<var>P</var> = <var>S</var>·cos φ = ' + g(Sv) + ' · ' + g(v.fp) + ' = ' + b(P, 'W'))
      ], r: [['Potência ativa', P, 'W'], ['Potência aparente', Sv, 'VA']] };
    },
    arm: ['Esquecer o √3 dá um valor 1,73 vezes menor.', 'Usar √3 junto com tensão e corrente de fase dá resultado errado: confira se são de linha.'] });

  C({ id: 'ligacao', mod: 'E3', nome: 'Ligação estrela e triângulo: tensões e correntes',
    f: 'Estrela: <var>V</var><sub>f</sub> = <var>V</var><sub>L</sub>/√3 e <var>I</var><sub>f</sub> = <var>I</var><sub>L</sub>.  Triângulo: <var>V</var><sub>f</sub> = <var>V</var><sub>L</sub> e <var>I</var><sub>f</sub> = <var>I</var><sub>L</sub>/√3.',
    lembrar: 'Na estrela o √3 divide a TENSÃO (fase tem menos tensão que a linha); no triângulo o √3 divide a CORRENTE. Rede 380 V de linha dá 220 V de fase na estrela.',
    campos: [{ k: 'VL', rot: 'Tensão de linha', un: 'V', v: 380, s: [220, 380, 440, 660] }, { k: 'IL', rot: 'Corrente de linha', un: 'A', v: 17.3, s: [10, 17.3, 20, 30] }],
    calc: function (v) {
      var vY = v.VL / R3, iD = v.IL / R3;
      return { p: [
        S('Estrela: tensão de fase', '<var>V</var><sub>f</sub> = ' + g(v.VL) + ' / √3 = ' + b(vY, 'V') + '; a corrente de fase é a de linha: ' + u(v.IL, 'A')),
        S('Triângulo: corrente de fase', '<var>I</var><sub>f</sub> = ' + g(v.IL) + ' / √3 = ' + b(iD, 'A') + '; a tensão de fase é a de linha: ' + u(v.VL, 'V')),
        S('Confira com a potência', 'Com os mesmos <var>V</var><sub>L</sub> e <var>I</var><sub>L</sub>: <var>S</var> = √3·<var>V</var><sub>L</sub>·<var>I</var><sub>L</sub> = 3·<var>V</var><sub>f</sub>·<var>I</var><sub>f</sub>. Estrela: 3 · ' + g(vY) + ' · ' + g(v.IL) + ' = ' + u(R3 * v.VL * v.IL, 'VA') + '. Triângulo: 3 · ' + g(v.VL) + ' · ' + g(iD) + ' = ' + u(R3 * v.VL * v.IL, 'VA') + '. (Atenção: a mesma carga ligada em triângulo consome 3 vezes o que consome em estrela.)')
      ], r: [['Estrela: tensão de fase', vY, 'V'], ['Triângulo: corrente de fase', iD, 'A']] };
    },
    arm: ['Trocar quem recebe o √3 (tensão na estrela, corrente no triângulo) é o erro mais comum.', 'O motor 220/380 V na rede de 380 V liga em estrela; na de 220 V, em triângulo.'] });

  C({ id: 'wattimetros', mod: 'E3', nome: 'Dois wattímetros (método de Aron)',
    f: '<var>P</var> = <var>W</var><sub>1</sub> + <var>W</var><sub>2</sub>;  tg φ = √3·(<var>W</var><sub>1</sub> − <var>W</var><sub>2</sub>) / (<var>W</var><sub>1</sub> + <var>W</var><sub>2</sub>)  (tg φ: só carga equilibrada)',
    lembrar: 'A potência ativa total é a SOMA das duas leituras (com sinal). A diferença entre elas carrega a informação do reativo. Se cos φ < 0,5 uma das leituras fica negativa: some mesmo assim, com o sinal.',
    campos: [{ k: 'W1', rot: 'Leitura W1', un: 'W', v: 3000, s: [2000, 3000, 4000] }, { k: 'W2', rot: 'Leitura W2', un: 'W', v: 1000, s: [-500, 500, 1000, 1500] }],
    calc: function (v) {
      var P = v.W1 + v.W2, t = R3 * (v.W1 - v.W2) / P, fi = Math.atan(t), fp = Math.cos(fi);
      return { p: [
        S('Potência ativa total', '<var>P</var> = <var>W</var><sub>1</sub> + <var>W</var><sub>2</sub> = ' + g(v.W1) + ' + ' + g(v.W2) + ' = ' + b(P, 'W')),
        S('Tangente do ângulo', 'tg φ = √3 · (' + g(v.W1) + ' − ' + g(v.W2) + ') / ' + g(P) + ' = ' + g(t)),
        S('Ângulo e fator de potência', 'φ = arctan ' + g(t) + ' = ' + u(graus(fi), '°') + ';  cos φ = ' + b(fp))
      ], r: [['Potência ativa', P, 'W'], ['Fator de potência', fp, '']] };
    },
    arm: ['Subtrair em vez de somar para achar <var>P</var> é o erro típico.', 'Leitura negativa existe: carga com φ > 60° (cos φ < 0,5), indutiva ou capacitiva.'],
    valido: function (v) { return v.W1 + v.W2 > 0 && v.W1 >= v.W2; } });

  /* ================= M2 · transformadores ================= */
  C({ id: 'trafo', mod: 'M2', nome: 'Transformador ideal: relação de transformação',
    f: '<var>a</var> = <var>V</var><sub>1</sub>/<var>V</var><sub>2</sub> = <var>N</var><sub>1</sub>/<var>N</var><sub>2</sub> = <var>I</var><sub>2</sub>/<var>I</var><sub>1</sub>',
    lembrar: 'Tensão e espiras andam juntas; a corrente anda ao contrário (a potência se conserva: <var>V</var><sub>1</sub>·<var>I</var><sub>1</sub> = <var>V</var><sub>2</sub>·<var>I</var><sub>2</sub>). Quem tem MAIS tensão tem MENOS corrente.',
    campos: [{ k: 'V1', rot: 'Tensão do primário', un: 'V', v: 220, s: [220, 380, 440, 13800] }, { k: 'V2', rot: 'Tensão do secundário', un: 'V', v: 22, s: [12, 24, 110, 127, 220] }, { k: 'I2', rot: 'Corrente do secundário', un: 'A', v: 10, s: [5, 10, 20, 50] }],
    calc: function (v) {
      var a = v.V1 / v.V2, I1 = v.I2 / a;
      return { p: [
        S('Relação de transformação', '<var>a</var> = <var>V</var><sub>1</sub>/<var>V</var><sub>2</sub> = ' + g(v.V1) + ' / ' + g(v.V2) + ' = ' + u(a)),
        S('Corrente no primário', '<var>I</var><sub>1</sub> = <var>I</var><sub>2</sub>/<var>a</var> = ' + g(v.I2) + ' / ' + g(a) + ' = ' + b(I1, 'A')),
        S('Confira a potência', '<var>V</var><sub>1</sub>·<var>I</var><sub>1</sub> = ' + g(v.V1 * I1) + ' VA = <var>V</var><sub>2</sub>·<var>I</var><sub>2</sub> = ' + g(v.V2 * v.I2) + ' VA ✓')
      ], r: [['Corrente no primário', I1, 'A'], ['Relação a', a, '']] };
    },
    arm: ['Para a corrente, a relação se inverte: <var>I</var><sub>1</sub> = <var>I</var><sub>2</sub>/<var>a</var>.', 'Trafo real tem perdas: potência de entrada > de saída.'],
    valido: function (v) { return v.V1 > v.V2 && (v.V1 < 1000 || v.V2 >= 110); } });

  C({ id: 'rendimento', mod: 'M2', nome: 'Rendimento de transformador ou motor',
    f: 'η = <var>P</var><sub>saída</sub> / (<var>P</var><sub>saída</sub> + perdas)',
    lembrar: 'Rendimento = o que sai ÷ o que entra, e o que entra é o que sai mais as perdas (no trafo: ferro + cobre; no motor somam-se atrito e ventilação). Nunca passa de 100 %.',
    campos: [{ k: 'Ps', rot: 'Potência de saída', un: 'W', v: 9000, s: [4500, 9000, 18000] }, { k: 'Pfe', rot: 'Perdas no ferro', un: 'W', v: 200, s: [100, 200, 300] }, { k: 'Pcu', rot: 'Perdas no cobre', un: 'W', v: 300, s: [150, 300, 450] }],
    calc: function (v) {
      var perd = v.Pfe + v.Pcu, Pe = v.Ps + perd, eta = v.Ps / Pe * 100;
      return { p: [
        S('Perdas totais', 'perdas = <var>P</var><sub>fe</sub> + <var>P</var><sub>cu</sub> = ' + g(v.Pfe) + ' + ' + g(v.Pcu) + ' = ' + u(perd, 'W')),
        S('Potência de entrada', '<var>P</var><sub>ent</sub> = <var>P</var><sub>saída</sub> + perdas = ' + g(v.Ps) + ' + ' + g(perd) + ' = ' + u(Pe, 'W')),
        S('Rendimento', 'η = ' + g(v.Ps) + ' / ' + g(Pe) + ' = ' + g(eta / 100) + ' = ' + b(eta, '%'))
      ], r: [['Rendimento', eta, '%']] };
    },
    arm: ['Divida pela entrada (saída + perdas). Esquecer as perdas dá 100 %; dividir a entrada pela saída dá mais de 100 %.', 'Perda no ferro não depende da carga (com tensão e frequência constantes); no cobre cresce com o quadrado da corrente.'] });

  /* ================= M3 · máquinas ================= */
  C({ id: 'escorregamento', mod: 'M3', nome: 'Velocidade síncrona e escorregamento do motor de indução',
    f: '<var>n</var><sub>s</sub> = 120·<var>f</var> / <var>p</var>;  <var>s</var> = (<var>n</var><sub>s</sub> − <var>n</var>) / <var>n</var><sub>s</sub>',
    lembrar: 'Pólos pares: 2, 4, 6, 8. 4 polos em 60 Hz = 1800 rpm. O rotor gira SEMPRE abaixo da síncrona; <var>s</var> típico de 2 % a 6 %.',
    campos: [{ k: 'f', rot: 'Frequência', un: 'Hz', v: 60, s: [50, 60] }, { k: 'p', rot: 'Número de polos', un: '', v: 4, s: [2, 4, 6, 8] }, { k: 'n', rot: 'Rotação medida', un: 'rpm', v: 1740, s: [870, 960, 1140, 1170, 1450, 1740, 1760, 2940, 3500] }],
    calc: function (v) {
      var ns = 120 * v.f / v.p, s = (ns - v.n) / ns * 100;
      return { p: [
        S('Velocidade síncrona', '<var>n</var><sub>s</sub> = 120 · ' + g(v.f) + ' / ' + g(v.p) + ' = ' + u(ns, 'rpm')),
        S('Diferença para o rotor', '<var>n</var><sub>s</sub> − <var>n</var> = ' + g(ns) + ' − ' + g(v.n) + ' = ' + u(ns - v.n, 'rpm')),
        S('Escorregamento', '<var>s</var> = ' + g(ns - v.n) + ' / ' + g(ns) + ' = ' + g((ns - v.n) / ns) + ' = ' + b(s, '%'))
      ], r: [['Velocidade síncrona', ns, 'rpm'], ['Escorregamento', s, '%']] };
    },
    arm: ['p é o número de POLOS (não de pares). Com pares, a fórmula é 60·<var>f</var>/pares.', 'Se a rotação passa da síncrona, não é motor de indução funcionando como motor.'],
    valido: function (v) { var ns = 120 * v.f / v.p; return v.n < ns && v.n > 0.9 * ns; } });

  C({ id: 'motor-corrente', mod: 'M3', nome: 'Corrente nominal de um motor trifásico',
    f: '<var>I</var> = <var>P</var><sub>u</sub> / (√3·<var>V</var>·η·cos φ)',
    lembrar: 'A plaqueta dá a potência ÚTIL (mecânica) no eixo. A rede entrega mais: dividir por η dá a potência elétrica de entrada (W); dividir também por cos φ dá a aparente <var>S</var> (VA), e <var>I</var> = <var>S</var>/(√3·<var>V</var>). 1 cv = 736 W.',
    campos: [{ k: 'Pu', rot: 'Potência no eixo', un: 'kW', v: 7.5, s: [2.2, 3.7, 5.5, 7.5, 11, 15] }, { k: 'V', rot: 'Tensão de linha', un: 'V', v: 380, s: [220, 380, 440] }, { k: 'eta', rot: 'Rendimento', un: '', v: 0.9, s: [0.85, 0.88, 0.9, 0.92] }, { k: 'fp', rot: 'Fator de potência', un: '', v: 0.85, s: [0.8, 0.85, 0.88] }],
    calc: function (v) {
      var Pw = v.Pu * 1000, Pe = Pw / v.eta, I = Pw / (R3 * v.V * v.eta * v.fp);
      return { p: [
        S('Potência em watts', '<var>P</var><sub>u</sub> = ' + g(v.Pu) + ' kW = ' + u(Pw, 'W')),
        S('Potência elétrica de entrada', '<var>P</var><sub>ent</sub> = <var>P</var><sub>u</sub>/η = ' + g(Pw) + ' / ' + g(v.eta) + ' = ' + u(Pe, 'W')),
        S('Denominador', '√3 · <var>V</var> · η · cos φ = 1,732 · ' + g(v.V) + ' · ' + g(v.eta) + ' · ' + g(v.fp) + ' = ' + g(R3 * v.V * v.eta * v.fp)),
        S('Corrente', '<var>I</var> = ' + g(Pw) + ' / ' + g(R3 * v.V * v.eta * v.fp) + ' = ' + b(I, 'A'))
      ], r: [['Corrente nominal', I, 'A']] };
    },
    arm: ['Esquecer η e cos φ dá uma corrente menor do que a real.', 'cv → W: 1 cv = 736 W; 1 HP = 746 W.'] });

  C({ id: 'conjugado', mod: 'M3', nome: 'Conjugado (torque) no eixo do motor',
    f: '<var>T</var> = 9550·<var>P</var>(kW) / <var>n</var>(rpm)   [N·m]',
    lembrar: '9550 vem de 60·1000/(2π). Se a potência estiver em W, use <var>T</var> = <var>P</var>/ω com ω = 2π·<var>n</var>/60 em rad/s.',
    campos: [{ k: 'P', rot: 'Potência no eixo', un: 'kW', v: 7.5, s: [1.5, 3, 5.5, 7.5, 11] }, { k: 'n', rot: 'Rotação', un: 'rpm', v: 1740, s: [1140, 1170, 1740, 1760] }],
    calc: function (v) {
      var w = 2 * Math.PI * v.n / 60, T = v.P * 1000 / w;
      return { p: [
        S('Velocidade angular', 'ω = 2π · ' + g(v.n) + ' / 60 = ' + u(w, 'rad/s')),
        S('Torque pela definição', '<var>T</var> = <var>P</var>/ω = ' + g(v.P * 1000) + ' / ' + g(w) + ' = ' + b(T, 'N·m')),
        S('Atalho para conferir', '9550 · ' + g(v.P) + ' / ' + g(v.n) + ' = ' + u(9550 * v.P / v.n, 'N·m'))
      ], r: [['Conjugado', T, 'N·m']] };
    },
    arm: ['A constante 9550 só serve com kW e rpm.', 'Mesma potência em rotação menor dá torque maior.'] });

  C({ id: 'estrela-triangulo', mod: 'M3', nome: 'Partida estrela-triângulo: corrente e conjugado',
    f: '<var>I</var><sub>Y</sub> = <var>I</var><sub>Δ</sub> / 3;  <var>T</var><sub>Y</sub> = <var>T</var><sub>Δ</sub> / 3',
    lembrar: 'Ligado em estrela, cada fase recebe 1/√3 da tensão: a corrente de linha cai a 1/3 e o conjugado também (cai com o quadrado da tensão). Valores ideais: na prática ficam perto de 1/3. Serve para partida a vazio ou com conjugado resistente baixo.',
    campos: [{ k: 'Ip', rot: 'Corrente de partida direta (triângulo)', un: 'A', v: 60, s: [30, 45, 60, 90, 120] }, { k: 'Tp', rot: 'Conjugado de partida direta', un: 'N·m', v: 90, s: [30, 60, 90, 120] }],
    calc: function (v) {
      return { p: [
        S('Corrente na partida em estrela', '<var>I</var><sub>Y</sub> = <var>I</var><sub>Δ</sub>/3 = ' + g(v.Ip) + ' / 3 = ' + b(v.Ip / 3, 'A')),
        S('Conjugado na partida em estrela', '<var>T</var><sub>Y</sub> = <var>T</var><sub>Δ</sub>/3 = ' + g(v.Tp) + ' / 3 = ' + b(v.Tp / 3, 'N·m')),
        S('Por que 3', 'A tensão na fase cai por 1/√3; a corrente de fase cai igual e a de linha cai ainda 1/√3 pela ligação: (1/√3)² = 1/3.')
      ], r: [['Corrente de partida em estrela', v.Ip / 3, 'A'], ['Conjugado de partida em estrela', v.Tp / 3, 'N·m']] };
    },
    arm: ['A corrente de LINHA cai a 1/3 (e não a 1/√3).', 'A chave exige motor com 6 terminais e tensão de triângulo igual à da rede.'] });

  /* ================= I1 · instalações ================= */
  C({ id: 'projeto', mod: 'I1', nome: 'Corrente de projeto e escolha do disjuntor (monofásico)',
    f: '<var>I</var><sub>b</sub> = <var>P</var> / (<var>V</var>·cos φ);  <var>I</var><sub>b</sub> ≤ <var>I</var><sub>n</sub> ≤ <var>I</var><sub>z</sub>',
    lembrar: 'Ib é a corrente que o circuito realmente puxa. Trifásico: Ib = P/(√3·V·cos φ). O disjuntor (In) fica no valor padronizado igual ou logo acima de Ib e abaixo da capacidade do condutor (Iz): Ib ≤ In ≤ Iz. Valores padrão: 10, 16, 20, 25, 32, 40, 50, 63 A…',
    campos: [{ k: 'P', rot: 'Potência', un: 'W', v: 2200, s: [1500, 2200, 3300, 4400, 5500] }, { k: 'V', rot: 'Tensão', un: 'V', v: 220, s: [127, 220] }, { k: 'fp', rot: 'Fator de potência', un: '', v: 0.8, s: [0.7, 0.8, 0.9] }],
    calc: function (v) {
      var Ib = v.P / (v.V * v.fp), In = PADRAO.filter(function (x) { return x >= Ib; })[0];
      return { p: [
        S('Corrente de projeto', '<var>I</var><sub>b</sub> = <var>P</var>/(<var>V</var>·cos φ) = ' + g(v.P) + ' / (' + g(v.V) + ' · ' + g(v.fp) + ') = ' + b(Ib, 'A')),
        S('Menor disjuntor padronizado igual ou acima de Ib', 'Padrões: ' + PADRAO.slice(0, 8).join(', ') + ' A. O primeiro ≥ ' + g(Ib) + ' A é <b>' + In + ' A</b>.'),
        S('Verifique o condutor', 'O cabo escolhido precisa ter <var>I</var><sub>z</sub> ≥ ' + In + ' A (tabela de capacidade de condução), para fechar <var>I</var><sub>b</sub> ≤ <var>I</var><sub>n</sub> ≤ <var>I</var><sub>z</sub>.')
      ], r: [['Corrente de projeto', Ib, 'A'], ['Disjuntor padrão', In, 'A']] };
    },
    arm: ['Resistivo puro (chuveiro, lâmpada incandescente): cos φ = 1.', 'Disjuntor menor que Ib desarma em operação normal.'] });

  C({ id: 'queda', mod: 'I1', nome: 'Queda de tensão em circuito monofásico',
    f: 'Δ<var>V</var> = 2·ρ·<var>L</var>·<var>I</var> / <var>S</var>;  Δ<var>V</var>% = Δ<var>V</var> / <var>V</var> · 100',
    lembrar: 'O 2 conta ida e volta (os dois condutores do circuito). Quanto mais longe (<var>L</var>) e mais corrente, mais queda; quanto mais grossa a seção (<var>S</var>), menos. Aproximação sem a reatância do cabo; trifásico: troque o 2 por √3. Compare o % com o limite que a questão ou a norma der (a NBR 5410 admite 4 % nos circuitos terminais).',
    campos: [{ k: 'rho', rot: 'Resistividade ρ', un: 'Ω·mm²/m', v: 0.0172, s: [0.0172] }, { k: 'L', rot: 'Comprimento do trecho', un: 'm', v: 30, s: [15, 20, 30, 40, 50] }, { k: 'I', rot: 'Corrente', un: 'A', v: 20, s: [10, 16, 20, 25, 32] }, { k: 'S', rot: 'Seção', un: 'mm²', v: 4, s: [2.5, 4, 6, 10] }, { k: 'V', rot: 'Tensão do circuito', un: 'V', v: 220, s: [127, 220] }],
    calc: function (v) {
      var dV = 2 * v.rho * v.L * v.I / v.S, pc = dV / v.V * 100;
      return { p: [
        S('Resistência dos dois condutores', '<var>R</var> = 2·ρ·<var>L</var>/<var>S</var> = 2 · ' + g(v.rho) + ' · ' + g(v.L) + ' / ' + g(v.S) + ' = ' + u(2 * v.rho * v.L / v.S, 'Ω')),
        S('Queda em volts', 'Δ<var>V</var> = <var>R</var>·<var>I</var> = ' + g(2 * v.rho * v.L / v.S) + ' · ' + g(v.I) + ' = ' + b(dV, 'V')),
        S('Queda em porcentagem', 'Δ<var>V</var>% = ' + g(dV) + ' / ' + g(v.V) + ' · 100 = ' + b(pc, '%')),
        S('Compare com o limite', 'Se o limite for 4 %: ' + (pc <= 4 ? 'dentro do limite.' : 'passou; aumente a seção.'))
      ], r: [['Queda de tensão', dV, 'V'], ['Queda percentual', pc, '%']] };
    },
    arm: ['Esquecer o 2 (ida e volta) dá metade da queda.', 'ρ do cobre muda com a temperatura: use o do enunciado.'],
    valido: function (v) { return v.I <= ({ 2.5: 24, 4: 32, 6: 41, 10: 57 })[v.S]; } });

  /* ================= A2 · automação ================= */
  C({ id: 'ma420', mod: 'A2', nome: 'Sinal 4–20 mA para a grandeza medida',
    f: '<var>x</var> = <var>x</var><sub>mín</sub> + (<var>I</var> − 4)/16 · (<var>x</var><sub>máx</sub> − <var>x</var><sub>mín</sub>)',
    lembrar: 'O 4 mA é o ZERO da escala e 20 mA é o fundo de escala: são 16 mA de faixa útil. Por isso 12 mA é exatamente o meio. 0 mA indica laço aberto (cabo rompido); abaixo de cerca de 3,6 a 3,8 mA o transmissor sinaliza falha (NAMUR NE 43).',
    campos: [{ k: 'I', rot: 'Corrente lida', un: 'mA', v: 12, s: [6, 8, 10, 12, 14, 16, 18] }, { k: 'mn', rot: 'Início da escala', un: '', v: 0, s: [0] }, { k: 'mx', rot: 'Fim da escala', un: '', v: 10, s: [10, 16, 100, 200] }],
    calc: function (v) {
      var fr = (v.I - 4) / 16, x = v.mn + fr * (v.mx - v.mn);
      return { p: [
        S('Tire o zero vivo', '<var>I</var> − 4 = ' + g(v.I) + ' − 4 = ' + u(v.I - 4, 'mA')),
        S('Fração da faixa', '(<var>I</var> − 4)/16 = ' + g(v.I - 4) + ' / 16 = ' + g(fr) + ' (' + g(fr * 100) + ' % da escala)'),
        S('Valor na escala', '<var>x</var> = ' + g(v.mn) + ' + ' + g(fr) + ' · (' + g(v.mx) + ' − ' + g(v.mn) + ') = ' + b(x))
      ], r: [['Grandeza medida', x, '']] };
    },
    arm: ['Dividir por 20 (e não por 16) é o erro clássico: o zero é 4 mA.', 'Com escala 0–10, 12 mA = 5, e não 6.'] });

  /* ================= Matemática ================= */
  C({ id: 'juros', mod: 'X1', nome: 'Juros compostos',
    f: '<var>M</var> = <var>C</var>·(1 + <var>i</var>)<sup><var>n</var></sup>',
    lembrar: 'Compostos: a taxa incide sobre o montante do mês anterior. Taxa e tempo têm de usar a mesma unidade (2 % a.m. com <var>n</var> em meses). Juros = <var>M</var> − <var>C</var>.',
    campos: [{ k: 'C', rot: 'Capital', un: 'R$', v: 1000, s: [1000, 2000, 5000] }, { k: 'i', rot: 'Taxa', un: '% por período', v: 2, s: [1, 2, 3, 5] }, { k: 'n', rot: 'Períodos', un: '', v: 12, s: [2, 3, 6, 12] }],
    bom: function (v) { return v.i * v.n >= 24; }, /* só no sorteio do Treinar: com taxa e prazo pequenos, juros simples e compostos quase coincidem */
    calc: function (v) {
      var f = Math.pow(1 + v.i / 100, v.n), M = v.C * f;
      return { p: [
        S('Taxa em forma decimal', '<var>i</var> = ' + g(v.i) + ' % = ' + g(v.i / 100)),
        S('Fator de capitalização', '(1 + <var>i</var>)<sup><var>n</var></sup> = ' + g(1 + v.i / 100) + '<sup>' + g(v.n) + '</sup> = ' + g(f)),
        S('Montante', '<var>M</var> = ' + g(v.C) + ' · ' + g(f) + ' = <b>' + rs(M) + '</b>'),
        S('Juros', '<var>J</var> = <var>M</var> − <var>C</var> = ' + g(M) + ' − ' + g(v.C) + ' = ' + rs(M - v.C))
      ], r: [['Montante', M, 'R$'], ['Juros', M - v.C, 'R$']] };
    },
    arm: ['Juros simples seriam C·(1 + i·n): cresce em linha reta e fica menor (para n > 1).', 'Taxa anual com prazo em meses: converta (taxa equivalente, não ÷ 12 nem × 12 nos compostos).'] });

  C({ id: 'desconto', mod: 'X1', nome: 'Descontos sucessivos',
    f: 'fator = (1 − <var>d</var><sub>1</sub>)·(1 − <var>d</var><sub>2</sub>);  variação = fator − 1',
    lembrar: 'Descontos de 10 % e 20 % NÃO somam 30 %: o segundo incide sobre o preço já reduzido. Multiplique os fatores (0,90 · 0,80 = 0,72).',
    campos: [{ k: 'P', rot: 'Preço inicial', un: 'R$', v: 200, s: [100, 200, 500, 800] }, { k: 'd1', rot: 'Primeiro desconto', un: '%', v: 10, s: [10, 15, 20, 25] }, { k: 'd2', rot: 'Segundo desconto', un: '%', v: 20, s: [10, 20, 30] }],
    calc: function (v) {
      var f1 = 1 - v.d1 / 100, f2 = 1 - v.d2 / 100, f = f1 * f2, P2 = v.P * f;
      return { p: [
        S('Fator de cada desconto', '1 − ' + g(v.d1 / 100) + ' = ' + g(f1) + ';  1 − ' + g(v.d2 / 100) + ' = ' + g(f2)),
        S('Fator total', '<var>f</var> = ' + g(f1) + ' · ' + g(f2) + ' = ' + g(f)),
        S('Preço final', g(v.P) + ' · ' + g(f) + ' = <b>' + rs(P2) + '</b>'),
        S('Desconto total', '1 − ' + g(f) + ' = ' + b((1 - f) * 100, '%') + ' (e não ' + g(v.d1 + v.d2) + ' %)')
      ], r: [['Preço final', P2, 'R$'], ['Desconto total', (1 - f) * 100, '%']] };
    },
    arm: ['Somar os descontos (10 + 20) é a armadilha de toda prova.', 'Aumento de 20 % seguido de queda de 20 % NÃO volta ao preço inicial.'] });

  C({ id: 'regra3', mod: 'X1', nome: 'Regra de três: direta ou inversa',
    f: 'Direta: <var>x</var> = <var>b</var>·<var>c</var> / <var>a</var>.  Inversa: <var>x</var> = <var>a</var>·<var>b</var> / <var>c</var>',
    lembrar: 'Pergunte: se uma grandeza AUMENTA, a outra aumenta (direta) ou diminui (inversa)? Mais máquinas, MENOS dias: inversa. Mais horas, mais energia: direta.',
    campos: [{ k: 'tipo', rot: 'Tipo', sel: [['d', 'Direta'], ['i', 'Inversa']], v: 'i' }, { k: 'a', rot: 'a (grandeza 1, caso conhecido)', un: '', v: 4, s: [3, 4, 6, 8] }, { k: 'b', rot: 'b (grandeza 2, caso conhecido)', un: '', v: 12, s: [6, 10, 12, 15] }, { k: 'c', rot: 'c (grandeza 1, caso novo)', un: '', v: 6, s: [2, 5, 6, 9, 12] }],
    calc: function (v) {
      var dir = v.tipo === 'd', x = dir ? v.b * v.c / v.a : v.a * v.b / v.c;
      return { p: [
        S('Decida o tipo', dir ? 'As duas crescem juntas: <b>direta</b>.' : 'Uma cresce e a outra diminui: <b>inversa</b>.'),
        S('Monte a conta', dir ? '<var>a</var> está para <var>b</var> como <var>c</var> está para <var>x</var>: <var>x</var> = <var>b</var>·<var>c</var>/<var>a</var>' : 'O produto se mantém: <var>a</var>·<var>b</var> = <var>c</var>·<var>x</var>, logo <var>x</var> = <var>a</var>·<var>b</var>/<var>c</var>'),
        S('Calcule', '<var>x</var> = ' + (dir ? g(v.b) + ' · ' + g(v.c) + ' / ' + g(v.a) : g(v.a) + ' · ' + g(v.b) + ' / ' + g(v.c)) + ' = ' + b(x))
      ], r: [['x', x, '']] };
    },
    arm: ['Usar regra direta numa questão inversa é o erro de sempre: leia o enunciado perguntando "aumenta ou diminui?".'],
    valido: function (v) { return v.a !== v.c; } });

  C({ id: 'bhaskara', mod: 'X2', nome: 'Equação do 2º grau (Bhaskara)',
    f: 'Δ = <var>b</var>² − 4<var>a</var><var>c</var>;  <var>x</var> = (−<var>b</var> ± √Δ) / (2<var>a</var>)',
    lembrar: 'Primeiro o Δ: se for negativo não há raiz real; se for zero, uma raiz; se for positivo, duas. Soma das raízes = −<var>b</var>/<var>a</var>; produto = <var>c</var>/<var>a</var> (para conferir).',
    campos: [{ k: 'a', rot: 'a', un: '', v: 1, s: [1, 2] }, { k: 'b', rot: 'b', un: '', v: -5, s: [-9, -7, -5, -3] }, { k: 'c', rot: 'c', un: '', v: 6, s: [2, 3, 4, 6, 10] }],
    calc: function (v) {
      var D = v.b * v.b - 4 * v.a * v.c, p;
      if (D < 0) return { p: [S('Calcule o discriminante', 'Δ = ' + (v.b < 0 ? '(' + g(v.b) + ')' : g(v.b)) + '² − 4 · ' + g(v.a) + ' · ' + g(v.c) + ' = ' + g(D)), S('Conclusão', 'Δ negativo: não há raiz real.')], r: [['Discriminante Δ', D, '']] };
      var x1 = (-v.b + Math.sqrt(D)) / (2 * v.a), x2 = (-v.b - Math.sqrt(D)) / (2 * v.a);
      p = [
        S('Discriminante', 'Δ = <var>b</var>² − 4<var>a</var><var>c</var> = ' + g(v.b * v.b) + ' − ' + g(4 * v.a * v.c) + ' = ' + g(D)),
        S('Raiz do discriminante', '√Δ = ' + g(Math.sqrt(D))),
        S(D === 0 ? 'Raiz dupla' : 'Duas raízes', '<var>x</var> = (' + g(-v.b) + ' ± ' + g(Math.sqrt(D)) + ') / ' + g(2 * v.a) + ' → <b>' + g(x1) + '</b> e <b>' + g(x2) + '</b>'),
        S('Confira por soma e produto', 'soma = ' + g(x1 + x2) + ' = −<var>b</var>/<var>a</var> = ' + g(-v.b / v.a) + ';  produto = ' + g(x1 * x2) + ' = <var>c</var>/<var>a</var> = ' + g(v.c / v.a))
      ];
      return { p: p, r: [['Maior raiz', x1, ''], ['Menor raiz', x2, '']] };
    },
    arm: ['O sinal de −<var>b</var>: se <var>b</var> = −5, então −<var>b</var> = +5.', 'O denominador é 2<var>a</var> (e não só 2).'],
    valido: function (v) { var D = v.b * v.b - 4 * v.a * v.c; return D >= 0 && Math.sqrt(D) % 1 === 0; } });

  C({ id: 'combinacao', mod: 'X3', nome: 'Combinação e arranjo',
    f: '<var>C</var>(<var>n</var>,<var>p</var>) = <var>n</var>! / (<var>p</var>!·(<var>n</var>−<var>p</var>)!);  <var>A</var>(<var>n</var>,<var>p</var>) = <var>n</var>! / (<var>n</var>−<var>p</var>)!',
    lembrar: 'A ordem importa? Sim (fila, senha, pódio): arranjo. Não (comissão, time, mão de cartas): combinação. Combinação = arranjo ÷ <var>p</var>!.',
    campos: [{ k: 'n', rot: 'Total de elementos', un: '', v: 8, s: [5, 6, 7, 8, 10] }, { k: 'p', rot: 'Elementos escolhidos', un: '', v: 3, s: [2, 3, 4] }],
    calc: function (v) {
      var fat = function (k) { var r = 1; for (var i = 2; i <= k; i++) r *= i; return r; };
      var A = fat(v.n) / fat(v.n - v.p), Cb = A / fat(v.p);
      var prod = []; for (var i = 0; i < v.p; i++) prod.push(v.n - i);
      return { p: [
        S('Arranjo (a ordem conta)', '<var>A</var> = ' + prod.join(' · ') + ' = ' + u(A)),
        S('Divida por <var>p</var>! para tirar a ordem', '<var>p</var>! = ' + g(fat(v.p)) + ';  <var>C</var> = ' + g(A) + ' / ' + g(fat(v.p)) + ' = ' + b(Cb)),
        S('Confira', 'Pela fórmula: ' + g(fat(v.n)) + ' / (' + g(fat(v.p)) + ' · ' + g(fat(v.n - v.p)) + ') = ' + g(Cb))
      ], r: [['Combinação', Cb, ''], ['Arranjo', A, '']] };
    },
    arm: ['Escolher 3 de 8 NÃO é 8·7·6 quando a ordem não importa: divida por 3!.', 'C(n,p) = C(n,n−p): escolher 3 é o mesmo que deixar 5 de fora.'],
    valido: function (v) { return v.p < v.n; } });

  /* ---------- Prefixos (unidades) ---------- */
  C({ id: 'prefixos', mod: 'E1', nome: 'Prefixos: mili, micro, nano, quilo e mega',
    f: 'valor na unidade base = valor · 10<sup>expoente</sup>',
    lembrar: 'mega (M) = 10⁶; quilo (k) = 10³; mili (m) = 10⁻³; micro (µ) = 10⁻⁶; nano (n) = 10⁻⁹. Para ir à unidade MENOR (A → mA), o número cresce; para o maior, diminui.',
    campos: [{ k: 'x', rot: 'Valor', un: '', v: 47, s: [4.7, 47, 220, 330, 470] }, { k: 'pf', rot: 'Prefixo', sel: [['M', 'mega (M) 10⁶'], ['k', 'quilo (k) 10³'], ['m', 'mili (m) 10⁻³'], ['u', 'micro (µ) 10⁻⁶'], ['n', 'nano (n) 10⁻⁹']], v: 'm' }],
    calc: function (v) {
      var T = { M: [6, 'M'], k: [3, 'k'], m: [-3, 'm'], u: [-6, 'µ'], n: [-9, 'n'] }[v.pf], val = v.x * Math.pow(10, T[0]);
      return { p: [
        S('Identifique o prefixo', 'Prefixo <b>' + T[1] + '</b> = 10<sup>' + T[0] + '</sup>.'),
        S('Multiplique pela potência de dez', g(v.x) + ' · 10<sup>' + T[0] + '</sup> = ' + b(val, '(unidade base)')),
        S('Ande com a vírgula', (T[0] < 0 ? 'Prefixo pequeno: a vírgula anda ' + (-T[0]) + ' casas para a ESQUERDA.' : 'Prefixo grande: a vírgula anda ' + T[0] + ' casas para a DIREITA.'))
      ], r: [['Na unidade base', val, '']] };
    },
    arm: ['mA → A: divide por 1000, e não por 100.', 'µF → F: 10⁻⁶; confundir com 10⁻³ erra por mil vezes.'] });

  var MODS = ['E1', 'E2', 'E3', 'M2', 'M3', 'I1', 'A2', 'X1', 'X2', 'X3'];
  var porId = {}; L.forEach(function (r) { porId[r.id] = r; });
  function exemplo(r) { var v = {}; r.campos.forEach(function (c) { v[c.k] = c.v; }); return v; }
  function sortear(r) {
    for (var t = 0; t < 60; t++) {
      var v = {};
      r.campos.forEach(function (c) {
        if (c.sel) v[c.k] = c.sel[Math.floor(Math.random() * c.sel.length)][0];
        else v[c.k] = c.s ? c.s[Math.floor(Math.random() * c.s.length)] : c.v;
      });
      var res = r.calc(v);
      if ((!r.valido || r.valido(v)) && (!r.bom || r.bom(v)) && isFinite(res.r[0][1]) && res.r[0][1] > 0 && JSON.stringify(v) !== JSON.stringify(exemplo(r))) return v;
    }
    return exemplo(r);
  }
  function numero(t) {
    t = String(t).trim().replace(/\s/g, '').replace(/[^\d.,eE+-]/g, '');
    if (/^-?[\d.,]+e[+-]?\d+$/i.test(t)) return parseFloat(t.replace(',', '.'));
    t = t.replace(/[eE+]/g, '');
    if (t.indexOf(',') >= 0) t = t.replace(/\./g, '').replace(',', '.');
    else if (/^-?[1-9]\d{0,2}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
    var x = parseFloat(t); return isFinite(x) ? x : NaN;
  }
  function confere(r, v, texto) {
    var x = numero(texto), alvo = r.calc(v).r[0][1];
    if (!isFinite(x)) return null;
    return Math.abs(x - alvo) <= Math.max(0.01 * Math.abs(alvo), 1e-9);
  }
  W.CONTAS = { lista: function () { return L.slice(); }, receita: function (id) { return porId[id] || null; }, calcular: function (r, v) { return r.calc(v); }, exemplo: exemplo, sortear: sortear, confere: confere, numero: numero, mods: MODS, fmt: g };
  /* receitas extras (js/contas-extra.js) e erros típicos de cada conta */
  var ERR = {};
  W.CONTAS.add = function (r) { L.push(r); porId[r.id] = r; };
  W.CONTAS.erros = function (m) { for (var k in m) ERR[k] = m[k]; };
  W.CONTAS.listaErros = function (r, v) { var f = ERR[r.id]; if (!f) return []; var ok = r.calc(v).r[0][1]; return f(v).filter(function (e) { return isFinite(e[1]) && Math.abs(e[1] - ok) > 0.015 * Math.abs(ok); }); };
  /* Que erro foi? Compara a resposta digitada com as respostas erradas típicas (±1,5 %) e com erros de potência de dez. */
  W.CONTAS.diagnostico = function (r, v, texto) {
    var x = numero(texto), alvo = r.calc(v).r[0][1]; if (!isFinite(x)) return null;
    var l = W.CONTAS.listaErros(r, v);
    for (var i = 0; i < l.length; i++) if (Math.abs(x - l[i][1]) <= Math.max(0.015 * Math.abs(l[i][1]), 1e-9)) return { tipo: 'erro', rot: l[i][0] };
    var q = Math.abs(x / alvo), f = [1000, 100, 10];
    if (alvo) for (var j = 0; j < f.length; j++) if (Math.abs(q - f[j]) <= 0.02 * f[j] || Math.abs(q - 1 / f[j]) <= 0.02 / f[j]) return { tipo: 'potencia', fator: f[j] };
    return { tipo: 'nenhum' };
  };

  /* ================= interface ================= */
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ct = function () { return W.EDO_CT || { get: function () { return null; }, set: function () {}, todos: function () { return {}; } }; };
  var dominada = function (id) { var x = ct().get(id); return !!(x && x.s >= 3); };
  var nomeMod = function (m) { var M = W.M || {}; return (M[m] && M[m].title) ? m + ' · ' + M[m].title.split(/[:(]/)[0] : m; };

  var animOk = function () { return !matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.dataset.motion !== 'off'; };
  /* Figura da conta (js/contas-fig.js): refaz o SVG quando mudam os valores ou o "mostrar resultado"; a cada passo só acende o que ele usa. */
  function figura(el, r, v, res, ver, passo) {
    if (!el) return;
    if (!W.CONTASFIG || !W.CONTASFIG.tem(r.id)) { el.hidden = true; return; }
    el.hidden = false;
    var chave = JSON.stringify(v) + '|' + ver;
    if (el.dataset.k !== chave) { el.dataset.k = chave; el.innerHTML = W.CONTASFIG.html(r.id, v, { r: res, ver: ver, anim: animOk() }); controle(el); }
    if (!ver) el.querySelectorAll('svg').forEach(function (sv) { sv.setAttribute('aria-label', 'Figura desta conta. O resultado fica oculto até você conferir a resposta.'); });
    el.querySelectorAll('[data-s]').forEach(function (e) {
      var n = String(passo), era = e.classList.contains('hl'), agora = passo > 0 && (' ' + e.getAttribute('data-s') + ' ').indexOf(' ' + n + ' ') >= 0;
      e.classList.toggle('hl', agora);
      if (agora && !era && animOk()) { e.classList.remove('pop'); void e.getBoundingClientRect(); e.classList.add('pop'); } /* o que o passo acabou de acender dá um pulso */
    });
  }
  /* Botão pausar/retomar o movimento da figura (preferência da tela: vale para as próximas figuras). */
  var PAUSA = false;
  function controle(el) {
    var velho = el.querySelector('.cf-pp'); if (velho) velho.remove();
    var movendo = el.querySelector('animateMotion,animateTransform,animate');
    if (PAUSA) el.querySelectorAll('svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
    if (!movendo) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'cf-pp'; b.setAttribute('aria-pressed', PAUSA);
    var rot = function () { b.textContent = PAUSA ? '▶ Retomar o movimento' : '⏸ Pausar o movimento'; b.setAttribute('aria-pressed', PAUSA); };
    b.onclick = function () { PAUSA = !PAUSA; rot(); el.querySelectorAll('svg').forEach(function (s) { if (PAUSA) { if (s.pauseAnimations) s.pauseAnimations(); } else if (s.unpauseAnimations) s.unpauseAnimations(); }); };
    rot(); el.appendChild(b);
  }
  /* O resultado "sobe" até o valor (0,5 s), só com movimento permitido; o texto final é sempre o valor exato. */
  function contar(raiz) {
    if (!raiz || !animOk()) return;
    raiz.querySelectorAll('.ct-res b[data-v]').forEach(function (b) {
      var to = +b.dataset.v, din = b.dataset.r === '1', t0 = performance.now(), no = b.firstChild, pq = b.querySelector('small');
      if (!no || no.nodeType !== 3) return;
      var fmt = function (x) { return din ? rs(x) : g(x); };
      var passo = function (agora) {
        var p = Math.min(1, (agora - t0) / 480), val = p < 1 ? to * (1 - Math.pow(1 - p, 3)) : to;
        no.nodeValue = fmt(val) + (pq ? ' ' : '');
        if (p < 1 && b.isConnected) requestAnimationFrame(passo); else no.nodeValue = fmt(to) + (pq ? ' ' : '');
      };
      requestAnimationFrame(passo);
    });
  }
  /* ---------- revisão espaçada (Leitner) e treino misto ---------- */
  var DIA = 864e5, INT = [0, 1, 3, 7, 14]; /* dias até a próxima revisão por "caixa" 0..4 */
  var dueDe = function (x) { return x.due != null ? x.due : (x.t || 0) + DIA; };
  var devida = function (id) { var x = ct().get(id); return !!(x && x.n && dueDe(x) <= Date.now()); };
  W.CONTAS.devida = devida;
  W.CONTAS.devidas = function () { return L.filter(function (r) { return devida(r.id); }); };
  /* n contas para uma sessão: primeiro as que venceram a revisão (mais atrasadas antes), depois as nunca treinadas (embaralhadas),
     depois as de caixa mais baixa. A ordem final evita duas contas seguidas da mesma estação (treino intercalado). */
  W.CONTAS.misto = function (n) {
    var venc = [], novas = [], resto = [];
    L.forEach(function (r) { var x = ct().get(r.id); if (!x || !x.n) novas.push(r); else if (devida(r.id)) venc.push([dueDe(x), r]); else resto.push([x.b || 0, r]); });
    venc.sort(function (a, b) { return a[0] - b[0]; }); resto.sort(function (a, b) { return a[0] - b[0]; });
    for (var q = novas.length - 1; q > 0; q--) { var w = Math.floor(Math.random() * (q + 1)), tmp = novas[q]; novas[q] = novas[w]; novas[w] = tmp; }
    var ord = venc.map(function (a) { return a[1]; }).concat(novas, resto.map(function (a) { return a[1]; })), pool = [], cont = {}, out = [];
    ord.forEach(function (r) { if (pool.length < n && (cont[r.mod] || 0) < 2) { pool.push(r); cont[r.mod] = (cont[r.mod] || 0) + 1; } }); /* no máximo 2 por estação */
    ord.forEach(function (r) { if (pool.length < n && pool.indexOf(r) < 0) pool.push(r); }); /* ord já põe as vencidas antes das novas */
    while (pool.length) {
      var ult = out.length ? out[out.length - 1].mod : null, resta = {}, i = -1, melhor = -1;
      pool.forEach(function (r) { resta[r.mod] = (resta[r.mod] || 0) + 1; });
      pool.forEach(function (r, j) { if (r.mod !== ult && resta[r.mod] > melhor) { melhor = resta[r.mod]; i = j; } }); /* a estação que mais sobra, diferente da última */
      out.push(pool.splice(i < 0 ? 0 : i, 1)[0]);
    }
    return out;
  };
  /* dias até a próxima revisão na caixa b, no máximo 20 % do tempo que falta para a prova (a revisão cabe antes dela) */
  var diasMax = function (b) {
    var d = INT[b]; if (typeof EXAM === 'undefined' || !EXAM) return d;
    var falta = (EXAM.getTime() - Date.now()) / DIA; return Math.max(1, Math.min(d, Math.floor(0.2 * falta)));
  };
  var diasTxt = function (b) { var d = diasMax(b); return d <= 0 ? 'hoje' : d === 1 ? 'amanhã' : 'em ' + d + ' dias'; };
  /* Texto de apoio vaza o resultado? (para as dicas do Treinar) */
  function vazaTexto(html, alvo) {
    var d = document.createElement('div'); d.innerHTML = html; var txt = d.textContent, a = g(alvo), i = txt.indexOf(a);
    if (a.length < 2) return false;
    while (i >= 0) { var p = txt[i - 1] || ' ', q = txt[i + a.length] || ' '; if (!/[0-9,.]/.test(p) && !/[0-9,]/.test(q)) return true; i = txt.indexOf(a, i + 1); }
    return false;
  }

  /* ---------- Cálculo mental: valores para decorar e treino rápido (as contas da prova fecham sem calculadora) ---------- */
  var MENTAL_TAB = [
    ['√2', '1,41', 'pico = 1,41 × eficaz'], ['√3', '1,73', 'trifásico: 380 ÷ 220 = 1,73'], ['1/√3', '0,577', '380 V ÷ √3 = 220 V'],
    ['√3/2', '0,866', 'cos 30° e sen 60°'], ['1/√2', '0,707', 'cos 45° e sen 45°'], ['π', '3,14', '2π = 6,28; ω = 2π·60 ≈ 377 rad/s'],
    ['e⁻¹', '0,368', 'RC: em 1τ carregou 63,2 % e sobram 36,8 %'], ['1 cv', '736 W', '1 HP = 746 W'], ['1 kWh', '3,6 MJ', '1 kW durante 3600 s'], ['9550', '≈ 9549 (60·1000 / 2π)', 'T (N·m) = 9550 · P (kW) / n (rpm)']
  ];
  var MENTAL_FP = [[0.6, '1,33'], [0.7, '1,02'], [0.8, '0,75'], [0.85, '0,62'], [0.9, '0,48'], [0.92, '0,43'], [0.95, '0,33'], [1, '0']];
  var MENTAL_ANG = [['30°', '0,5', '0,866', '0,577'], ['45°', '0,707', '0,707', '1'], ['60°', '0,866', '0,5', '1,73']];
  var MENTAL_Q = [[11, 121], [12, 144], [13, 169], [14, 196], [15, 225], [16, 256], [20, 400], [22, 484], [25, 625]];
  var MENTAL_DRILL = [
    function () { var k = [100, 200, 380, 440][Math.floor(Math.random() * 4)]; return ['√3 · ' + k + ' ≈', R3 * k]; },
    function () { var k = [220, 380, 440, 660][Math.floor(Math.random() * 4)]; return [k + ' ÷ √3 ≈', k / R3]; },
    function () { var k = [100, 127, 220][Math.floor(Math.random() * 3)]; return ['√2 · ' + k + ' ≈', Math.SQRT2 * k]; },
    function () { var f = [50, 60][Math.floor(Math.random() * 2)]; return ['2π · ' + f + ' (rad/s) ≈', 2 * Math.PI * f]; },
    function () { var q = MENTAL_FP[Math.floor(Math.random() * 7)]; return ['tg φ quando cos φ = ' + String(q[0]).replace('.', ',') + ' ≈', numero(q[1])]; },
    function () { var k = [5, 12, 24][Math.floor(Math.random() * 3)]; return ['63,2 % de ' + k + ' V ≈', 0.632 * k]; },
    function () { var q = MENTAL_Q[Math.floor(Math.random() * MENTAL_Q.length)]; return [q[0] + '² =', q[1], 0]; },
    function () { var k = [2, 5, 10][Math.floor(Math.random() * 3)]; return [k + ' cv em watts ≈', 736 * k, 0.004]; },
    function () { var f = [50, 60][Math.floor(Math.random() * 2)], p = [2, 4, 6, 8][Math.floor(Math.random() * 4)]; return ['velocidade síncrona com ' + f + ' Hz e ' + p + ' polos (rpm) =', 120 * f / p, 0]; }
  ];

  var norm = function (s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };
  var plain = function (h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; };

  function montar(host, opt) {
    opt = opt || {};
    var filtro = opt.mod || 'todas', aberto = opt.r || null, busca = '', ses = null;
    var CH = [['todas', 'Todas'], ['revisar', 'Para revisar'], ['prova', 'Caiu em prova'], ['mental', 'Cálculo mental']].concat(MODS.map(function (m) { return [m, m]; }));
    function passa(r) {
      if (filtro === 'revisar' && !devida(r.id)) return false;
      if (filtro === 'prova' && !r.prova) return false;
      if (MODS.indexOf(filtro) >= 0 && r.mod !== filtro) return false;
      if (busca && norm(r.nome + ' ' + plain(r.f) + ' ' + r.mod + ' ' + (r.prova || '')).indexOf(norm(busca)) < 0) return false;
      return true;
    }
    function cartao(r) {
      var x = ct().get(r.id), dv = devida(r.id);
      return '<button type="button" class="ct-card' + (dominada(r.id) ? ' dom' : '') + (dv ? ' rev' : '') + '" data-r="' + r.id + '"><span class="ct-tag">' + r.mod + (r.prova ? ' · <i class="ct-badge">★ caiu em prova</i>' : '') + '</span><b>' + esc(r.nome) + '</b><span class="ct-fm">' + r.f + '</span>'
        + '<span class="ct-st">' + (dominada(r.id) ? 'Dominada' : x && x.n ? x.s + ' de 3 seguidas' : 'Ainda não treinada') + (dv ? ' · revisar hoje' : '') + '</span></button>';
    }
    function pintaGrid() {
      var its = L.filter(passa), gr = $('#ctgrid', host);
      gr.innerHTML = its.length ? its.map(cartao).join('') : '<p class="ct-vazio">' + (filtro === 'revisar' ? 'Nada para revisar hoje. Treine uma conta nova ou faça o treino misto.' : 'Nenhuma conta com esse filtro ou busca.') + '</p>';
      gr.querySelectorAll('.ct-card').forEach(function (b) { b.onclick = function () { aberto = b.dataset.r; detalhe(); window.scrollTo({ top: 0 }); }; });
    }
    function lista() {
      if (filtro === 'mental') return mental();
      var dom = L.filter(function (r) { return dominada(r.id); }).length, dev = W.CONTAS.devidas().length;
      host.innerHTML = '<div class="ct">'
        + '<p class="ct-lede">Cada conta com a fórmula, o jeito de lembrar, a figura, o passo a passo com os números e as armadilhas. Abra uma, mude os números e veja a conta se refazer. Depois use <b>Treinar</b>: você faz a conta antes de ver os passos, e o app diz que erro foi, se você errou de um jeito comum. Três acertos seguidos e a conta fica dominada. Cada acerto adia a próxima revisão (1, 3, 7 e depois 14 dias, sempre antes da prova); errou, volta hoje.</p>'
        + '<div class="ct-prog"><span class="eyebrow">dominadas</span><b>' + dom + '<small>/' + L.length + '</small></b><i><u style="width:' + Math.round(dom / L.length * 100) + '%"></u></i></div>'
        + '<div class="ct-bar"><button type="button" class="btn primary" id="ctm">Treino misto de 5 contas' + (dev ? ' · ' + dev + ' para revisar' : '') + '</button><input type="search" id="cts" class="ct-busca" placeholder="Buscar conta (ex.: √3, trafo, queda)" aria-label="Buscar conta" value="' + esc(busca) + '" autocomplete="off"></div>'
        + '<div class="ct-chips" role="group" aria-label="Filtrar">' + CH.map(function (m) { return '<button type="button" class="ct-chip' + (m[0] === filtro ? ' on' : '') + '" data-f="' + m[0] + '" aria-pressed="' + (m[0] === filtro) + '">' + m[1] + (m[0] === 'revisar' && dev ? ' (' + dev + ')' : '') + '</button>'; }).join('') + '</div>'
        + '<div class="ct-grid" id="ctgrid"></div></div>';
      host.querySelectorAll('.ct-chip').forEach(function (b) { b.onclick = function () { filtro = b.dataset.f; lista(); }; });
      $('#cts', host).oninput = function () { busca = this.value; pintaGrid(); };
      $('#ctm', host).onclick = iniciarSessao;
      pintaGrid();
    }
    /* ----- Cálculo mental ----- */
    function mental() {
      var acertos = 0, tot = 0, cur = null;
      host.innerHTML = '<div class="ct"><button type="button" class="ct-back" id="ctb">← Todas as contas</button>'
        + '<div class="ct-head"><span class="ct-tag">sem calculadora</span><h3>Cálculo mental: valores para decorar</h3></div>'
        + '<p class="ct-lede">Muitas contas das provas reais da banca fecham com números redondos: a Transpetro 2023, por exemplo, tem questões de queda de tensão e de soma de senóides que se resolvem de cabeça com os valores abaixo. Pelo Edital 03/2026 (item 8.21, IV), é proibido portar aparelhos eletrônicos "ou similares", relógios e lápis/borracha, e só se anota no caderno de questões: na prática, <b>sem calculadora</b>. Por isso este treino aceita só contas de cabeça.</p>'
        + '<div class="ct-mt"><table class="ct-tab"><caption>Raízes, π e constantes</caption><tbody>' + MENTAL_TAB.map(function (t) { return '<tr><th scope="row">' + t[0] + '</th><td>' + t[1] + '</td><td>' + t[2] + '</td></tr>'; }).join('') + '</tbody></table>'
        + '<table class="ct-tab"><caption>Fator de potência → tg φ</caption><thead><tr><th>cos φ</th><th>tg φ</th></tr></thead><tbody>' + MENTAL_FP.map(function (t) { return '<tr><td>' + String(t[0]).replace('.', ',') + '</td><td>' + t[1] + '</td></tr>'; }).join('') + '</tbody></table>'
        + '<table class="ct-tab"><caption>Ângulos notáveis</caption><thead><tr><th>φ</th><th>sen</th><th>cos</th><th>tg</th></tr></thead><tbody>' + MENTAL_ANG.map(function (t) { return '<tr><td>' + t[0] + '</td><td>' + t[1] + '</td><td>' + t[2] + '</td><td>' + t[3] + '</td></tr>'; }).join('') + '</tbody></table>'
        + '<table class="ct-tab"><caption>Quadrados que aparecem</caption><tbody>' + MENTAL_Q.map(function (t) { return '<tr><td>' + t[0] + '²</td><td>' + t[1] + '</td></tr>'; }).join('') + '</tbody></table></div>'
        + '<div class="ct-treino"><span class="eyebrow">treino rápido (aceita 2 % de erro nas aproximações; contas exatas, só o valor exato)</span><p class="ct-enun" id="ctq"></p><form class="ct-resp" id="ctf"><label><span>Sua resposta</span><input type="text" inputmode="decimal" autocomplete="off" id="cti" placeholder="ex.: 173"></label><button class="btn primary" type="submit">Conferir</button></form><div id="ctv" aria-live="polite"></div><p class="ct-placar" id="ctp"></p></div></div>';
      $('#ctb', host).onclick = function () { filtro = 'todas'; lista(); window.scrollTo({ top: 0 }); };
      function nova() { cur = MENTAL_DRILL[Math.floor(Math.random() * MENTAL_DRILL.length)](); $('#ctq', host).textContent = cur[0]; $('#cti', host).value = ''; $('#cti', host).readOnly = false; $('#ctv', host).innerHTML = ''; $('#cti', host).focus(); cur.feito = false; }
      $('#ctf', host).onsubmit = function (e) {
        e.preventDefault();
        if (cur.feito) { nova(); return; }
        var x = numero($('#cti', host).value); if (!isFinite(x)) { $('#ctv', host).innerHTML = '<p class="ct-aviso">Digite um número.</p>'; return; }
        var tol = cur[2] == null ? 0.02 : cur[2], ok = Math.abs(x - cur[1]) <= tol * Math.abs(cur[1]) + 1e-9; cur.feito = true; tot++; if (ok) acertos++;
        $('#cti', host).readOnly = true;
        $('#ctv', host).innerHTML = '<div class="ct-vered ' + (ok ? 'ok' : 'no') + ' novo" role="status"><b>' + (ok ? 'Certo.' : 'Não bateu.') + '</b> ' + (ok ? 'Valor: ' : 'Era cerca de ') + g(cur[1]) + '.</div>';
        $('#ctp', host).textContent = acertos + ' de ' + tot + ' certas nesta sessão. Aperte Conferir de novo ou Enter para a próxima.';
      };
      nova();
    }
    /* ----- Treino misto ----- */
    function iniciarSessao() {
      var fila = W.CONTAS.misto(5); if (!fila.length) return;
      ses = { fila: fila.map(function (r) { return r.id; }), i: 0, res: [] }; aberto = ses.fila[0]; detalhe(); window.scrollTo({ top: 0 });
    }
    function resumo() {
      var n = ses.res.length, ok = ses.res.filter(function (x) { return x.ok; }).length, erradas = ses.res.filter(function (x) { return x.q === 'errado'; }).length, comDica = ses.res.filter(function (x) { return x.q === 'certo com dicas'; }).length;
      host.innerHTML = '<div class="ct"><div class="ct-head"><span class="ct-tag">treino misto</span><h3>Resultado: ' + ok + ' de ' + n + '</h3></div>'
        + '<div class="ct-res" id="ctres0"><div><span>Acertos de primeira</span><b>' + ok + ' <small>de ' + n + '</small></b></div></div>'
        + '<ul class="ct-sum">' + ses.res.map(function (x) { var r = porId[x.id]; return '<li class="' + (x.ok ? 'ok' : 'no') + '"><b>' + (x.ok ? '✓' : '✗') + '</b> ' + esc(r.nome) + ' <small>(' + x.q + ')</small></li>'; }).join('') + '</ul>'
        + (erradas || comDica ? '<p class="ct-lede">' + (erradas ? 'As que você errou voltam hoje em "Para revisar". ' : '') + (comDica ? 'As que você acertou com 2 ou mais dicas voltam amanhã. ' : '') + 'Abra cada uma no modo <b>Ver os passos</b> antes de tentar de novo.</p>' : '<p class="ct-lede">Tudo certo de primeira. Cada conta volta para revisão mais adiante (1, 3, 7 ou 14 dias, sempre antes da prova).</p>')
        + '<div class="ct-bt"><button type="button" class="btn primary" id="cto">Outra sessão de 5</button><button type="button" class="btn" id="ctl">Voltar à lista</button></div></div>';
      $('#cto', host).onclick = iniciarSessao; $('#ctl', host).onclick = function () { ses = null; aberto = null; lista(); window.scrollTo({ top: 0 }); };
      if (ok === n && n >= 3) document.dispatchEvent(new CustomEvent('edo:celebrate', { detail: $('#ctres0', host) }));
    }
    function detalhe() {
      var r = porId[aberto]; if (!r) { aberto = null; ses = null; return lista(); }
      var v = exemplo(r), modo = ses ? 'treino' : 'ver', vistos = 1, tento = ses ? { v: sortear(r), feito: false, dicas: 0 } : null, jaContou = false;
      host.innerHTML = '<div class="ct ct-det" data-r="' + r.id + '">'
        + '<button type="button" class="ct-back" id="ctb">' + (ses ? '← Encerrar o treino misto' : '← Todas as contas') + '</button>'
        + (ses ? '<p class="ct-sess">Treino misto · conta ' + (ses.i + 1) + ' de ' + ses.fila.length + '</p>' : '')
        + '<div class="ct-head"><span class="ct-tag">' + esc(nomeMod(r.mod)) + (r.prova ? ' · <i class="ct-badge">★ ' + esc(r.prova) + '</i>' : '') + '</span><h3>' + esc(r.nome) + '</h3></div>'
        + '<div class="ct-formula" aria-label="Fórmula">' + r.f + '</div>'
        + (ses ? '' : '<div class="ct-lembrar"><span class="eyebrow">como lembrar</span><p>' + r.lembrar + '</p></div>')
        + (ses ? '' : '<div class="ct-modo" role="tablist"><button type="button" role="tab" class="on" data-m="ver">Ver os passos</button><button type="button" role="tab" data-m="treino">Treinar</button></div>')
        + '<div id="ctc"></div></div>';
      $('#ctb', host).onclick = function () { aberto = null; ses = null; lista(); window.scrollTo({ top: 0 }); };
      host.querySelectorAll('.ct-modo button').forEach(function (b) { b.onclick = function () { modo = b.dataset.m; host.querySelectorAll('.ct-modo button').forEach(function (x) { x.classList.toggle('on', x === b); }); if (modo === 'treino') { tento = { v: sortear(r), feito: false, dicas: 0 }; } corpo(); }; });
      function campos(vv, trava) {
        return '<div class="ct-campos">' + r.campos.map(function (c) {
          if (c.sel) return '<label class="ct-c"><span>' + esc(c.rot) + '</span><select data-k="' + c.k + '"' + (trava ? ' disabled' : '') + '>' + c.sel.map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === vv[c.k] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select></label>';
          var nud = trava || !c.s || c.s.length < 2 ? '' : '<button type="button" class="ct-nud" data-k="' + c.k + '" data-d="-1" aria-label="Valor anterior de ' + esc(c.rot) + '">−</button><button type="button" class="ct-nud" data-k="' + c.k + '" data-d="1" aria-label="Próximo valor de ' + esc(c.rot) + '">+</button>';
          return '<div class="ct-c"><label for="ci-' + c.k + '">' + esc(c.rot) + '</label><span class="ct-in"><input type="text" id="ci-' + c.k + '" inputmode="decimal" autocomplete="off" data-k="' + c.k + '" value="' + String(vv[c.k]).replace('.', ',') + '"' + (trava ? ' readonly' : '') + '>' + (c.un ? '<em>' + esc(c.un) + '</em>' : '') + nud + '</span></div>';
        }).join('') + '</div>';
      }
      function passos(res, n) {
        return '<ol class="ct-passos">' + res.p.map(function (p, i) { return '<li class="' + (i < n ? 'on' : '') + '"' + (i < n ? '' : ' hidden') + '><span class="ct-n">' + (i + 1) + '</span><div><b>' + p.t + '</b><p>' + p.e + '</p></div></li>'; }).join('') + '</ol>';
      }
      function resultado(res) { return '<div class="ct-res">' + res.r.map(function (x) { return '<div><span>' + esc(x[0]) + '</span><b data-v="' + x[1] + '" data-r="' + (x[2] === 'R$' ? 1 : 0) + '">' + (x[2] === 'R$' ? rs(x[1]) : g(x[1]) + (x[2] ? ' <small>' + esc(x[2]) + '</small>' : '')) + '</b></div>'; }).join('') + '</div>'; }
      function arm() { return '<div class="ct-arm"><span class="eyebrow">cuidado</span><ul>' + r.arm.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ul></div>'; }
      function corpo() {
        var c = $('#ctc', host);
        if (modo === 'ver') {
          var res = r.calc(v);
          c.innerHTML = '<div class="cf" id="ctfig" role="group" aria-label="Figura do circuito"></div>' + campos(v) + '<div id="ctr"></div>';
          var pintar = function () {
            var res2; try { res2 = r.calc(v); } catch (e) { res2 = null; }
            var ok = res2 && res2.r.every(function (x) { return isFinite(x[1]); }) && (!r.valido || r.valido(v));
            if (ok) figura($('#ctfig', host), r, v, res2, vistos >= res2.p.length, Math.min(vistos, res2.p.length)); else $('#ctfig', host).hidden = true;
            $('#ctr', host).innerHTML = ok ? passos(res2, vistos) + '<div class="ct-bt"><button type="button" class="btn" id="ctn"' + (vistos >= res2.p.length ? ' hidden' : '') + '>Próximo passo (' + Math.min(vistos + 1, res2.p.length) + ' de ' + res2.p.length + ')</button><button type="button" class="btn" id="cta"' + (vistos >= res2.p.length ? ' hidden' : '') + '>Mostrar tudo</button></div>' + (vistos >= res2.p.length ? resultado(res2) + arm() : '') : '<p class="ct-aviso">Esses valores não formam um caso válido para esta conta (confira os campos). Volte a um exemplo: ' + '<button type="button" class="btn" id="ctx">Restaurar o exemplo</button></p>';
            if (ok && vistos >= res2.p.length && !jaContou) { jaContou = true; contar($('#ctr', host)); }
            var n = $('#ctn', host), a = $('#cta', host), x = $('#ctx', host);
            if (n) n.onclick = function () { vistos++; pintar(); revela(); }; if (a) a.onclick = function () { vistos = 99; pintar(); revela(true); };
            if (x) x.onclick = function () { v = exemplo(r); corpo(); };
          };
          var revela = function (tudo) { var ls = host.querySelectorAll('.ct-passos li.on'); var last = ls[ls.length - 1]; if (last && !tudo) last.classList.add('novo'); if (tudo) ls.forEach(function (l, i) { l.style.animationDelay = (i * 70) + 'ms'; l.classList.add('novo'); }); var rs = $('.ct-res', host); if (rs) rs.classList.add('novo'); };
          c.querySelectorAll('input,select').forEach(function (el) { el.oninput = el.onchange = function () { var k = el.dataset.k, cmp = r.campos.filter(function (x) { return x.k === k; })[0]; if (cmp.sel) v[k] = el.value; else { var x = numero(el.value); if (isFinite(x)) v[k] = x; } pintar(); }; });
          /* − e + andam pelos valores típicos da conta */
          c.querySelectorAll('.ct-nud').forEach(function (bt) {
            bt.onclick = function () {
              var k = bt.dataset.k, cmp = r.campos.filter(function (x) { return x.k === k; })[0], d = +bt.dataset.d;
              var lv = cmp.s.concat([cmp.v]).filter(function (x, i, a) { return a.indexOf(x) === i; }).sort(function (a, b) { return a - b; });
              var nx = d > 0 ? lv.filter(function (x) { return x > v[k]; })[0] : lv.filter(function (x) { return x < v[k]; }).pop();
              if (nx == null) return;
              v[k] = nx; c.querySelector('input[data-k="' + k + '"]').value = String(nx).replace('.', ','); pintar();
            };
          });
          pintar(); revela();
        } else {
          var t = tento, res = r.calc(t.v), un = res.r[0][2];
          var dicas = [['A fórmula', r.f], ['Como lembrar', r.lembrar], ['Cuidado', '<ul>' + r.arm.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ul>']];
          c.innerHTML = '<div class="cf" id="ctfig" role="group" aria-label="Figura do circuito"></div><p class="ct-enun">Sorteei estes valores. Faça a conta no papel e digite o primeiro resultado (<b>' + esc(res.r[0][0]) + '</b>' + (un ? ', em ' + esc(un) : '') + ').</p>' + campos(t.v, true)
            + '<form class="ct-resp" id="ctf"><label><span>Sua resposta</span><input type="text" inputmode="decimal" autocomplete="off" id="cti" placeholder="ex.: 12,5"></label><button class="btn primary" type="submit">Conferir</button></form>'
            + '<div class="ct-dicas"><button type="button" class="btn" id="ctd">Dica (1 de 3)</button><div id="ctdt" aria-live="polite"></div></div><div id="ctv"></div>';
          figura($('#ctfig', host), r, t.v, res, false, 0);
          var mostraDicas = function () {
            var h = ''; for (var i = 0; i < t.dicas; i++) { var d = dicas[i]; h += '<div class="ct-dica"><span class="eyebrow">dica ' + (i + 1) + ' · ' + d[0] + '</span>' + (vazaTexto(d[1], res.r[0][1]) ? '<p>Esta dica daria a resposta de bandeja com esses números: pule.</p>' : '<p>' + d[1] + '</p>') + '</div>'; }
            if (t.dicas >= 2) h += '<p class="ct-nota">Com 2 ou mais dicas, o acerto não conta para dominar a conta.</p>';
            $('#ctdt', host).innerHTML = h;
            var bd = $('#ctd', host); if (t.dicas >= 3 || t.feito) bd.hidden = true; else bd.textContent = 'Dica (' + (t.dicas + 1) + ' de 3)';
          };
          $('#ctd', host).onclick = function () { if (t.feito || t.dicas >= 3) return; t.dicas++; mostraDicas(); };
          $('#ctf', host).onsubmit = function (e) {
            e.preventDefault(); if (t.feito) return;
            var txt = $('#cti', host).value, ok = confere(r, t.v, txt);
            if (ok === null) { $('#ctv', host).innerHTML = '<p class="ct-aviso">Digite um número (use vírgula ou ponto para decimais).</p>'; return; }
            t.feito = true; $('#cti', host).readOnly = true; $('#ctd', host).hidden = true; figura($('#ctfig', host), r, t.v, res, true, 0);
            var ant = ct().get(r.id) || { s: 0, n: 0, b: 0 }, ajuda = t.dicas >= 2, now = Date.now();
            var cedo = !!(ant.n && dueDe(ant) > now), d0 = new Date(now); d0.setHours(0, 0, 0, 0);
            var s = ok ? (ajuda ? ant.s : ant.s + 1) : 0, ja = ant.s >= 3, bx = ok ? (ajuda ? (ant.b || 0) : Math.min(4, (ant.b || 0) + 1)) : 0, due = ok ? d0.getTime() + (ajuda ? 1 : diasMax(bx)) * DIA : now;
            if (ok && cedo && !ajuda) { s = ant.s; bx = ant.b || 0; due = dueDe(ant); } /* acerto antes de a revisão vencer: pratica, mas não sobe de caixa nem adia */
            ct().set(r.id, { s: s, n: ant.n + 1, b: bx, due: due });
            if (ses) ses.res.push({ id: r.id, ok: ok && !ajuda, q: ok ? (ajuda ? 'certo com dicas' : 'certo') : 'errado' });
            var alvoTxt = un === 'R$' ? rs(res.r[0][1]) : g(res.r[0][1]) + (un ? ' ' + esc(un) : ''), msg;
            if (ok) msg = ajuda ? 'Certo, mas com 2 ou mais dicas: não conta para dominar. Volta amanhã.' : (s >= 3 ? 'Conta dominada: 3 acertos seguidos. Revisão ' + diasTxt(bx) + '.' : (cedo ? s + ' de 3 acertos seguidos (a revisão ainda não tinha vencido: vale como prática, a data não muda).' : s + ' de 3 acertos seguidos. Revisão ' + diasTxt(bx) + '.'));
            else {
              var dg = W.CONTAS.diagnostico(r, t.v, txt), det = '';
              if (dg && dg.tipo === 'erro') det = ' <span class="ct-diag">Sua resposta (<b>' + esc(txt.trim()) + '</b>) bate com o que dá quando você <b>' + esc(dg.rot) + '</b>.</span>';
              else if (dg && dg.tipo === 'potencia') det = ' <span class="ct-diag">Sua resposta difere da certa por um fator de ' + dg.fator + ' (ou 1/' + dg.fator + '): confira o prefixo (mili, quilo, mega) e a unidade.</span>';
              else det = ' <span class="ct-diag">Não bate com os erros mais comuns desta conta: refaça pelos passos abaixo.</span>';
              msg = 'A resposta era ' + alvoTxt + '.' + det + ' A sequência volta a zero; a conta volta hoje em "Para revisar".';
            }
            var prox = ses ? (ses.i + 1 < ses.fila.length ? 'Próxima conta (' + (ses.i + 2) + ' de ' + ses.fila.length + ')' : 'Ver o resultado') : 'Sortear outro';
            $('#ctv', host).innerHTML = '<div class="ct-vered ' + (ok ? 'ok' : 'no') + '" role="status"><b>' + (ok ? 'Certo.' : 'Não bateu.') + '</b> ' + msg + '</div>'
              + passos(res, 99) + resultado(res) + arm() + '<div class="ct-bt"><button type="button" class="btn primary" id="ctp">' + prox + '</button></div>';
            host.querySelectorAll('.ct-passos li').forEach(function (l, i) { l.style.animationDelay = (i * 80) + 'ms'; l.classList.add('novo'); });
            var vd = $('.ct-vered', host); if (vd) vd.classList.add('novo'); contar($('#ctv', host));
            if (ok && !ajuda && s >= 3 && !ja && !ses) document.dispatchEvent(new CustomEvent('edo:celebrate', { detail: vd }));
            $('#ctp', host).onclick = function () {
              if (ses) { ses.i++; if (ses.i >= ses.fila.length) { resumo(); window.scrollTo({ top: 0 }); return; } aberto = ses.fila[ses.i]; detalhe(); window.scrollTo({ top: 0 }); return; }
              tento = { v: sortear(r), feito: false, dicas: 0 }; corpo();
            };
          };
          var inp = $('#cti', host); if (inp && matchMedia('(hover:hover)').matches) inp.focus();
        }
      }
      corpo();
    }
    if (aberto && porId[aberto]) detalhe(); else lista();
  }
  W.CONTAS.montar = montar;
})(window);

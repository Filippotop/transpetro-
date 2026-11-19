/* Elétrica de Ouro: contas que caíram em prova real, e os erros típicos de cada conta (para o diagnóstico do Treinar).
   - CONTAS.add(receita): receitas novas, no mesmo formato de js/contas.js, com `prova` = de onde vem (prova e questão).
   - CONTAS.erros({id: function (v) { return [[descrição do erro, valor que ele dá]]; }}): respostas erradas que um aluno desatento dá.
     No Treinar, se a resposta errada bate (±1,5 %) com uma delas, o app diz que erro foi ("é o que dá quando você esqueceu o √3").
   Fonte das questões reais: Cesgranrio, Transpetro 2023.1, Manutenção Elétrica (prova 6), questões 45 (queda de tensão unitária), 48 (soma de
   tensões senoidais) e 49 (resistência interna de bateria); a prova original traz os números dela, as contas daqui usam os mesmos métodos. */
(function (W) {
  'use strict';
  var C = W.CONTAS, g = C.fmt, R3 = Math.sqrt(3);
  var S = function (t, e) { return { t: t, e: e }; };
  var b = function (x, un) { return '<b>' + g(x) + (un ? '\u00a0' + un : '') + '</b>'; };
  var u = function (x, un) { return g(x) + (un ? '\u00a0' + un : ''); };
  var graus = function (x) { return x * 180 / Math.PI; };

  /* ---------- receitas vindas de provas reais ---------- */
  C.add({ id: 'queda-unit', mod: 'I1', prova: 'Transpetro 2023, questão 45', nome: 'Comprimento máximo pela queda de tensão unitária (V/A·km), monofásico',
    f: 'Δ<var>V</var><sub>máx</sub> = % · <var>V</var>;  <var>I</var> = <var>S</var>/<var>V</var>;  <var>L</var> = Δ<var>V</var><sub>máx</sub> / (Δ<var>V</var><sub>u</sub> · <var>I</var>)',
    lembrar: 'A tabela do fabricante dá a queda por ampère e por quilômetro de circuito (V/A·km). Multiplicada pela corrente e pelo comprimento em km, dá a queda em volts. Então: queda permitida em volts ÷ (queda unitária × corrente) = quilômetros. Depois, × 1000 para metros.',
    campos: [{ k: 'S', rot: 'Potência aparente', un: 'VA', v: 3520, s: [2200, 3520, 4400] }, { k: 'V', rot: 'Tensão', un: 'V', v: 220, s: [220] }, { k: 'dVu', rot: 'Queda unitária', un: 'V/(A·km)', v: 10, s: [5, 8, 10, 20] }, { k: 'pc', rot: 'Queda máxima', un: '%', v: 2, s: [2, 3, 4] }],
    calc: function (v) {
      var I = v.S / v.V, dm = v.pc / 100 * v.V, Lkm = dm / (v.dVu * I), Lm = Lkm * 1000;
      return { p: [
        S('Corrente do equipamento', '<var>I</var> = <var>S</var>/<var>V</var> = ' + g(v.S) + ' / ' + g(v.V) + ' = ' + u(I, 'A')),
        S('Queda permitida em volts', 'Δ<var>V</var><sub>máx</sub> = ' + g(v.pc) + ' % · ' + g(v.V) + ' = ' + u(dm, 'V')),
        S('Comprimento em quilômetros', '<var>L</var> = Δ<var>V</var><sub>máx</sub> / (Δ<var>V</var><sub>u</sub>·<var>I</var>) = ' + g(dm) + ' / (' + g(v.dVu) + ' · ' + g(I) + ') = ' + g(dm) + ' / ' + g(v.dVu * I) + ' = ' + u(Lkm, 'km')),
        S('Converta para metros', '<var>L</var> = ' + g(Lkm) + ' km · 1000 = ' + b(Lm, 'm'))
      ], r: [['Comprimento máximo', Lm, 'm'], ['Corrente', I, 'A']] };
    },
    arm: ['A queda unitária é por QUILÔMETRO: o resultado sai em km; converta para metros (×1000) antes de olhar as alternativas.', 'Em VA ÷ V sai ampère; não use a potência em kW nem divida pela tensão duas vezes.', 'O valor da tabela já é do circuito inteiro (ida e volta): não multiplique por 2. Trifásico: use a coluna trifásica e I = S/(√3·V).'] });

  C.add({ id: 'soma-senoides', mod: 'E2', prova: 'Transpetro 2023, questão 48', nome: 'Soma de duas tensões senoidais (tensão de pico)',
    f: '<var>V</var><sub>p</sub> = √(<var>A</var>² + <var>B</var>² + 2<var>A</var><var>B</var>·cos δ)',
    lembrar: 'Senóides de mesma frequência somam como fasores, e não pelo valor de pico. Com defasagem de 90° os dois fasores são catetos de um triângulo retângulo: pico = √(A² + B²) (3-4-5: 30 e 40 dão 50). Com 0° (em fase) soma direto; com 180° subtrai.',
    campos: [{ k: 'A', rot: 'Pico da primeira', un: 'V', v: 30, s: [30, 40, 60] }, { k: 'B', rot: 'Pico da segunda', un: 'V', v: 40, s: [40, 30, 80] }, { k: 'd', rot: 'Defasagem δ', un: '°', v: 90, s: [0, 60, 90, 120] }],
    calc: function (v) {
      var c = Math.round(Math.cos(v.d * Math.PI / 180) * 1e9) / 1e9, s = Math.round(Math.sin(v.d * Math.PI / 180) * 1e9) / 1e9;
      var x = v.A + v.B * c, y = v.B * s, Vp = Math.sqrt(x * x + y * y);
      return { p: [
        S('Escreva as duas como fasores', '<var>V</var><sub>1</sub> = ' + g(v.A) + ' ∠ 0°  e  <var>V</var><sub>2</sub> = ' + g(v.B) + ' ∠ ' + g(v.d) + '°'),
        S('Componentes do fasor soma', 'horizontal: ' + g(v.A) + ' + ' + g(v.B) + ' · cos ' + g(v.d) + '° = ' + g(x) + ';  vertical: ' + g(v.B) + ' · sen ' + g(v.d) + '° = ' + g(y)),
        S('Módulo (Pitágoras)', '<var>V</var><sub>p</sub> = √(' + g(x) + '² + ' + g(y) + '²) = √' + g(x * x + y * y) + ' = ' + b(Vp, 'V')),
        S('Ângulo do resultado', 'φ = arctan(' + g(y) + ' / ' + g(x) + ') = ' + u(graus(Math.atan2(y, x)), '°') + (x < 0 ? ' (x negativo: o ângulo está no 2º quadrante, some 180° ao arctan)' : '') + '. A soma tem a mesma frequência; só mudam o pico e a fase.')
      ], r: [['Tensão de pico da soma', Vp, 'V']] };
    },
    arm: ['Somar os picos (30 + 40 = 70) só vale se estiverem em fase (δ = 0°).', 'π/2 rad = 90°: os fasores ficam em quadratura (cos = 0, sen = 1).'] });

  C.add({ id: 'bateria', mod: 'E1', prova: 'Transpetro 2023, questão 49', nome: 'Resistência interna de uma bateria',
    f: '<var>r</var> = (<var>E</var> − <var>V</var>) / <var>I</var>',
    lembrar: 'A bateria real é uma fonte ideal <var>E</var> em série com uma resistência interna <var>r</var>. Com carga, parte da tensão cai dentro dela: <var>V</var> = <var>E</var> − <var>r</var>·<var>I</var>. O voltímetro nos terminais mede <var>V</var>; o amperímetro mede <var>I</var> (instrumentos considerados ideais).',
    campos: [{ k: 'E', rot: 'Tensão em aberto E (sem carga)', un: 'V', v: 12, s: [12, 24] }, { k: 'V', rot: 'Tensão nos terminais com carga', un: 'V', v: 11.4, s: [11.4, 11.5, 11.2, 23] }, { k: 'I', rot: 'Corrente medida', un: 'A', v: 3, s: [2, 3, 4, 5] }],
    calc: function (v) {
      var qd = v.E - v.V, r = qd / v.I, Rc = v.V / v.I;
      return { p: [
        S('Quanto a tensão caiu dentro da bateria', '<var>E</var> − <var>V</var> = ' + g(v.E) + ' − ' + g(v.V) + ' = ' + u(qd, 'V')),
        S('Resistência interna', '<var>r</var> = (<var>E</var> − <var>V</var>) / <var>I</var> = ' + g(qd) + ' / ' + g(v.I) + ' = ' + b(r, 'Ω')),
        S('Resistência da carga (confira)', '<var>R</var> = <var>V</var>/<var>I</var> = ' + g(v.V) + ' / ' + g(v.I) + ' = ' + u(Rc, 'Ω') + ', bem maior que <var>r</var> = ' + g(r) + ' Ω')
      ], r: [['Resistência interna', r, 'Ω'], ['Resistência da carga', Rc, 'Ω']] };
    },
    arm: ['V/I dá a resistência da CARGA, e não a interna.', 'E é a tensão medida com o circuito aberto, e não a nominal (12 V é o nome da bateria). Com duas leituras do resistor variável, (V₁, I₁) e (V₂, I₂): r = (V₁ − V₂)/(I₂ − I₁).'],
    valido: function (v) { return v.V < v.E && (v.E - v.V) / v.I < 1; } });

  C.add({ id: 'pico-eficaz', mod: 'E2', nome: 'Valor eficaz, de pico e pico a pico',
    f: '<var>V</var><sub>p</sub> = √2 · <var>V</var><sub>ef</sub>;  <var>V</var><sub>pp</sub> = 2 · <var>V</var><sub>p</sub>',
    lembrar: 'O valor eficaz é o que aparece na tomada e nos multímetros (127 V, 220 V). O pico é √2 ≈ 1,41 vezes maior. Pico a pico é do ponto mais alto ao mais baixo: o dobro do pico. (O √2 vale para onda senoidal; outras formas de onda têm outro fator de crista.)',
    campos: [{ k: 'Vef', rot: 'Valor eficaz', un: 'V', v: 127, s: [110, 127, 220, 380] }],
    calc: function (v) {
      var Vp = Math.SQRT2 * v.Vef;
      return { p: [
        S('Diga qual valor a questão dá', 'A tensão da rede (' + g(v.Vef) + ' V) é o valor EFICAZ.'),
        S('Valor de pico', '<var>V</var><sub>p</sub> = √2 · <var>V</var><sub>ef</sub> = 1,414 · ' + g(v.Vef) + ' = ' + b(Vp, 'V')),
        S('Valor pico a pico', '<var>V</var><sub>pp</sub> = 2 · ' + g(Vp) + ' = ' + u(2 * Vp, 'V')),
        S('Sentido inverso', 'Do pico ao eficaz: <var>V</var><sub>ef</sub> = <var>V</var><sub>p</sub>/√2 = ' + g(Vp) + ' / 1,414 = ' + u(v.Vef, 'V'))
      ], r: [['Tensão de pico', Vp, 'V'], ['Pico a pico', 2 * Vp, 'V']] };
    },
    arm: ['Multiplicar por √2 vai do eficaz para o pico; dividir vai do pico para o eficaz. Inverter dá o valor errado.', 'Pico a pico é o dobro do pico, e não o dobro do eficaz.'] });

  /* ---------- erros típicos (diagnóstico do Treinar) ---------- */
  var tg = function (fp) { return Math.tan(Math.acos(fp)); };
  var E = {
    ohm: function (v) { return [['multiplicou V·R em vez de dividir', v.V * v.R], ['inverteu a divisão (R/V)', v.R / v.V]]; },
    'pot-resistor': function (v) { return [['parou na corrente (V/R)', v.V / v.R], ['esqueceu de dividir por R (V²)', v.V * v.V]]; },
    chuveiro: function (v) { return [['usou a razão das tensões sem elevar ao quadrado', v.P1 * v.V2 / v.V1], ['inverteu a razão: (V₁/V₂)²', v.P1 * Math.pow(v.V1 / v.V2, 2)]]; },
    fio: function (v) { return [['trocou L por S (ρ·S/L)', v.rho * v.S / v.L], ['multiplicou por S em vez de dividir', v.rho * v.L * v.S]]; },
    paralelo: function (v) { return [['somou os resistores (série)', v.R1 + v.R2], ['fez só o produto, sem dividir pela soma', v.R1 * v.R2]]; },
    divisor: function (v) { return [['calculou a tensão de R1 em vez da de R2', v.V * v.R1 / (v.R1 + v.R2)], ['dividiu só por R1', v.V * v.R2 / v.R1]]; },
    custo: function (v) { return [['não converteu W em kW', v.P * v.h * v.d], ['contou só um dia', v.P / 1000 * v.h]]; },
    impedancia: function (v) { var X = 2 * Math.PI * v.f * v.L; return [['somou R + X_L em vez de Pitágoras', v.V / (v.R + X)], ['usou só a resistência (Z = R)', v.V / v.R], ['esqueceu o 2π na reatância', v.V / Math.hypot(v.R, v.f * v.L)]]; },
    rc: function (v) { return [['usou C em µF sem converter', v.R * v.C], ['converteu µF por 10⁻³', v.R * v.C * 1e-3]]; },
    triangulo: function (v) { return [['esqueceu o cos φ (P = V·I)', v.V * v.I], ['usou sen φ no lugar de cos φ', v.V * v.I * Math.sqrt(1 - v.fp * v.fp)]]; },
    fp: function (v) { var t1 = tg(v.fp1), t2 = tg(v.fp2); return [['subtraiu os cossenos em vez das tangentes', v.P * (v.fp2 - v.fp1)], ['usou só tg φ₁ (não subtraiu)', v.P * t1], ['somou as tangentes', v.P * (t1 + t2)]]; },
    trifasica: function (v) { return [['esqueceu o √3', v.VL * v.IL * v.fp], ['usou 3 no lugar de √3', 3 * v.VL * v.IL * v.fp]]; },
    ligacao: function (v) { return [['dividiu por 3 em vez de √3', v.VL / 3], ['multiplicou por √3 em vez de dividir', v.VL * R3]]; },
    wattimetros: function (v) { return [['subtraiu as leituras (W₁ − W₂)', v.W1 - v.W2], ['multiplicou a soma por √3', R3 * (v.W1 + v.W2)]]; },
    trafo: function (v) { return [['multiplicou pela relação (I₂·a)', v.I2 * v.V1 / v.V2], ['igualou as correntes (I₁ = I₂)', v.I2]]; },
    rendimento: function (v) { return [['esqueceu as perdas no ferro', v.Ps / (v.Ps + v.Pcu) * 100], ['dividiu a entrada pela saída (deu mais de 100 %)', (v.Ps + v.Pfe + v.Pcu) / v.Ps * 100]]; },
    escorregamento: function (v) { return [['usou 60 no lugar de 120', 60 * v.f / v.p], ['dividiu os polos por 2 e usou a fórmula de polos (120·f/pares)', 240 * v.f / v.p], ['deu em rotações por segundo (2·f/p)', 2 * v.f / v.p]]; },
    'motor-corrente': function (v) { return [['esqueceu η e cos φ', v.Pu * 1000 / (R3 * v.V)], ['esqueceu o √3', v.Pu * 1000 / (v.V * v.eta * v.fp)]]; },
    conjugado: function (v) { return [['usou a potência em W com a constante 9550', 9550 * v.P * 1000 / v.n], ['dividiu P/n sem a constante', v.P / v.n]]; },
    'estrela-triangulo': function (v) { return [['dividiu por √3', v.Ip / R3], ['multiplicou por 3 (inverteu a conta)', 3 * v.Ip]]; },
    projeto: function (v) { return [['esqueceu o cos φ (P/V)', v.P / v.V], ['multiplicou pelo cos φ em vez de dividir', v.P * v.fp / v.V]]; },
    queda: function (v) { return [['esqueceu o 2 (ida e volta)', v.rho * v.L * v.I / v.S], ['multiplicou pela seção em vez de dividir', 2 * v.rho * v.L * v.I * v.S]]; },
    ma420: function (v) { return [['dividiu por 20 (tratou 0 mA como zero)', v.mn + v.I / 20 * (v.mx - v.mn)], ['usou I/16 sem tirar os 4 mA', v.mn + v.I / 16 * (v.mx - v.mn)]]; },
    juros: function (v) { return [['usou juros simples', v.C * (1 + v.i / 100 * v.n)], ['deu só os juros (M − C) em vez do montante', v.C * (Math.pow(1 + v.i / 100, v.n) - 1)]]; },
    desconto: function (v) { return [['somou os descontos', v.P * (1 - (v.d1 + v.d2) / 100)], ['deu o valor do desconto, e não o preço final', v.P - v.P * (1 - v.d1 / 100) * (1 - v.d2 / 100)]]; },
    regra3: function (v) { return [['usou o tipo contrário (direta no lugar de inversa, ou o oposto)', v.tipo === 'd' ? v.a * v.b / v.c : v.b * v.c / v.a]]; },
    bhaskara: function (v) { var s = Math.sqrt(v.b * v.b - 4 * v.a * v.c); return [['esqueceu o sinal de −b (usou +b)', (v.b + s) / (2 * v.a)], ['dividiu só por a (sem o 2)', (-v.b + s) / v.a]]; },
    combinacao: function (v) { var A = 1; for (var i = 0; i < v.p; i++) A *= v.n - i; return [['deu o arranjo (não dividiu por p!)', A], ['dividiu o arranjo só por p', A / v.p]]; },
    prefixos: function (v) { var e = { M: 6, k: 3, m: -3, u: -6, n: -9 }[v.pf], e2 = { M: 3, k: 6, m: -6, u: -3, n: -6 }[v.pf]; return [['andou a vírgula para o lado errado', v.x * Math.pow(10, -e)], ['confundiu com o prefixo vizinho (mili↔micro, quilo↔mega…)', v.x * Math.pow(10, e2)]]; },
    'queda-unit': function (v) { var I = v.S / v.V, km = v.pc / 100 * v.V / (v.dVu * I); return [['deixou em km (esqueceu o ×1000)', km], ['multiplicou por 2 (ida e volta), que a tabela já inclui', km * 1000 / 2], ['usou o % como se fossem volts (ΔV = ' + v.pc + ' V)', v.pc / (v.dVu * I) * 1000]]; },
    'soma-senoides': function (v) { var c = Math.cos(v.d * Math.PI / 180), Vp = Math.sqrt(v.A * v.A + v.B * v.B + 2 * v.A * v.B * c); return [['somou os picos (A + B), como se estivessem em fase', v.A + v.B], ['usou Pitágoras como se fossem 90° (só vale em quadratura)', Math.sqrt(v.A * v.A + v.B * v.B)], ['subtraiu os picos', Math.abs(v.A - v.B)], ['deu o valor eficaz (pico/√2)', Vp / Math.SQRT2], ['trocou o sinal do termo 2AB·cos δ na lei dos cossenos', Math.sqrt(Math.abs(v.A * v.A + v.B * v.B - 2 * v.A * v.B * c))]]; },
    bateria: function (v) { return [['calculou a resistência da carga (V/I)', v.V / v.I], ['dividiu E pela corrente (resistência total r + R)', v.E / v.I], ['multiplicou em vez de dividir: (E − V)·I', (v.E - v.V) * v.I]]; },
    'pico-eficaz': function (v) { return [['dividiu por √2 em vez de multiplicar', v.Vef / Math.SQRT2], ['multiplicou por 2 em vez de √2', 2 * v.Vef], ['deu o pico a pico (2√2·V)', 2 * Math.SQRT2 * v.Vef], ['usou √3 no lugar de √2', R3 * v.Vef]]; }
  };
  /* erros adicionais (revisão independente): somam-se aos acima */
  var MAIS = {
    trifasica: function (v) { return [['esqueceu o cos φ (deu S)', R3 * v.VL * v.IL]]; },
    ligacao: function (v) { return [['usou a regra do triângulo (V_f = V_L)', v.VL]]; },
    wattimetros: function (v) { return [['ignorou o sinal da leitura negativa', v.W1 + Math.abs(v.W2)]]; },
    'motor-corrente': function (v) { return [['esqueceu só o η', v.Pu * 1000 / (R3 * v.V * v.fp)]]; },
    conjugado: function (v) { return [['usou n em rpm como se fosse ω (P/n)', v.P * 1000 / v.n], ['esqueceu o /60 em ω', v.P * 1000 / (2 * Math.PI * v.n)]]; },
    paralelo: function (v) { return [['parou em 1/R_eq (não inverteu)', (v.R1 + v.R2) / (v.R1 * v.R2)]]; },
    fio: function (v) { return [['dobrou o comprimento (ida e volta)', 2 * v.rho * v.L / v.S], ['converteu mm² para m²', v.rho * v.L / (v.S * 1e-6)]]; },
    queda: function (v) { var dV = 2 * v.rho * v.L * v.I / v.S; return [['deu a queda em %', dV / v.V * 100], ['usou √3 (trifásico)', R3 * v.rho * v.L * v.I / v.S]]; },
    ma420: function (v) { return [['tirou os 4 mA mas dividiu por 20', v.mn + (v.I - 4) / 20 * (v.mx - v.mn)]]; },
    rendimento: function (v) { return [['tirou as perdas da saída: (Ps − perdas)/Ps', (v.Ps - v.Pfe - v.Pcu) / v.Ps * 100]]; },
    chuveiro: function (v) { return [['supôs que a potência não muda', v.P1]]; },
    projeto: function (v) { var Ib = v.P / (v.V * v.fp), pad = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200].filter(function (x) { return x >= Ib; })[0]; return [['deu o disjuntor, e não a corrente de projeto', pad]]; },
    custo: function (v) { return [['multiplicou pela tarifa (deu o custo, não a energia)', v.P / 1000 * v.h * v.d * v.tar]]; },
    divisor: function (v) { return [['parou na corrente', v.V / (v.R1 + v.R2)]]; }
  };
  Object.keys(MAIS).forEach(function (k) { var a = E[k], b = MAIS[k]; E[k] = function (v) { return a(v).concat(b(v)); }; });
  C.erros(E);
})(window);

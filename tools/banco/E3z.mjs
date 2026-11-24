/* Questões extras (nível prova) da estação E3, lote z: potência, FP e trifásicos (itens 3.1, 3.2, 3.3, 4.1 e 4.2). 12 delas com figura própria (figSvg). */
import { svg, wire, poly, node, text, res, ac, meter, zbox, cap, ind, seta } from './figlib.mjs';

/* ---------- figuras reutilizáveis ---------- */
/* circuito monofásico com amperímetro, wattímetro (bobina de corrente em série, de potencial em paralelo) e voltímetro sobre a carga */
const medFig = (v, a, w) => svg(680, 210,
  poly([[90, 102], [90, 60], [165, 60]]) + meter(180, 60, 'A') + text(180, 36, a)
  + wire(195, 60, 270, 60) + meter(285, 60, 'W') + text(285, 36, w) + wire(300, 60, 600, 60)
  + wire(285, 75, 285, 180) + node(285, 180) + node(520, 60) + node(520, 180)
  + ac(90, 120) + poly([[90, 138], [90, 180], [600, 180]])
  + wire(520, 60, 520, 103) + zbox(520, 120, 'Z', 'Carga') + wire(520, 137, 520, 180)
  + wire(600, 60, 600, 105) + meter(600, 120, 'V') + text(622, 124, v, 'start') + wire(600, 135, 600, 180),
  'Fonte senoidal alimentando uma carga monofásica Z, com amperímetro em série, wattímetro com a bobina de corrente em série e a de potencial em paralelo e voltímetro sobre a carga; as leituras dos três instrumentos estão escritas ao lado deles.');

/* carga trifásica em estrela: três impedâncias com ponto comum */
const yFig = (inner, acima, rede, aria) => {
  let c = '';
  [['A', 50], ['B', 130], ['C', 210]].forEach(([l, y]) => {
    c += text(70, y - 6, l, 'end', 'tl') + wire(80, y, 252, y) + zbox(280, y, inner) + wire(308, y, 440, y)
      + (acima ? text(280, y - 26, acima) : '');
  });
  return svg(680, 250, c + wire(440, 50, 440, 210) + node(440, 130) + text(160, 95, rede, 'middle'), aria);
};

/* carga trifásica em triângulo: rab na aresta A-B, rca em A-C, rbc em B-C */
const dFig = (rab, rbc, rca, rede, aria) => svg(680, 250,
  text(60, 44, 'A', 'middle', 'tl') + wire(80, 50, 200, 50) + node(200, 50)
  + wire(200, 50, 312, 50) + zbox(340, 50, rab) + wire(368, 50, 480, 50) + node(480, 50)
  + wire(480, 50, 600, 50) + text(620, 44, 'B', 'middle', 'tl')
  + wire(200, 50, 254, 108) + zbox(270, 125, rca) + wire(286, 142, 340, 200)
  + wire(480, 50, 426, 108) + zbox(410, 125, rbc) + wire(394, 142, 340, 200)
  + node(340, 200) + wire(340, 200, 340, 232) + text(340, 246, 'C', 'middle', 'tl')
  + text(130, 190, rede, 'middle'), aria);

export default {
  erros: {
    e3zPnoQ: { n: 'Potência ativa no lugar da reativa', d: 'Respondeu a potência ativa (W), que é a parte do triângulo de potências na horizontal, e não a potência reativa (var) pedida.', t: 'formula' },
    e3zAparente: { n: 'Potência aparente no lugar da pedida', d: 'Respondeu a potência aparente (V·I, em VA), que é a hipotenusa do triângulo de potências, e não a grandeza pedida.', t: 'formula' },
    e3zVSobreX: { n: 'Tensão total sobre a reatância', d: 'Aplicou a tensão da fonte inteira sobre a reatância (V²/X); em série, a reatância recebe só parte da tensão, e a corrente é a mesma em R e em X.', t: 'formula' },
    e3zSomaPQ: { n: 'Soma aritmética de P e Q', d: 'Somou as potências ativa e reativa como números comuns; elas estão defasadas de 90° e se combinam por S² = P² + Q².', t: 'formula' },
    e3zSubtrai: { n: 'Subtração de S e P', d: 'Fez Q = S − P, subtraindo aritmeticamente potências que formam um triângulo retângulo.', t: 'formula' },
    e3zSomaQuad: { n: 'Soma dos quadrados', d: 'Fez √(S² + P²) em vez de √(S² − P²): a potência aparente é a hipotenusa, e não um cateto.', t: 'formula' },
    e3zAfirmVerd: { n: 'Afirmativa verdadeira julgada falsa', d: 'Descartou uma afirmativa verdadeira (ou aceitou uma falsa) na combinação das afirmativas.', t: 'detalhe' },
    e3zSomaAritm: { n: 'S como soma aritmética', d: 'Aceitou que a potência aparente é a soma aritmética de P e Q; na verdade S² = P² + Q² (triângulo de potências).', t: 'formula' },
    e3zFpMultiplica: { n: 'Fator de potência multiplicando', d: 'Multiplicou pelo fator de potência em vez de dividir: a corrente é I = P/(V·cos φ).', t: 'formula' },
    e3zSemFP: { n: 'Fator de potência ignorado', d: 'Calculou I = P/V, como se a carga fosse puramente resistiva, esquecendo de dividir por cos φ.', t: 'formula' },
    e3zTgNoFp: { n: 'tg φ no lugar de cos φ', d: 'Usou a tangente (ou a razão Q/P) onde se pedia o fator de potência cos φ = P/S.', t: 'formula' },
    e3zSenNoFp: { n: 'sen φ no lugar de cos φ', d: 'Usou sen φ = Q/S onde se pedia o fator de potência cos φ = P/S.', t: 'formula' },
    e3zSubtraiPQ: { n: 'Diferença aritmética de P e Q', d: 'Subtraiu a parte reativa da ativa (ou vice-versa) como números comuns, em vez de usar S = √(P² + Q²).', t: 'formula' },
    e3zSoPcarga: { n: 'Só a carga ativa', d: 'Calculou a corrente apenas da carga resistiva, esquecendo a corrente reativa do reator em paralelo.', t: 'detalhe' },
    e3zSoQcarga: { n: 'Só a carga reativa', d: 'Calculou a corrente apenas do reator indutivo, esquecendo a corrente do aquecedor em paralelo.', t: 'detalhe' },
    e3zRsobreX: { n: 'R/X no lugar de R/Z', d: 'Dividiu a resistência pela reatância (R/X), e não pela impedância (R/Z, com Z = √(R² + X²)).', t: 'formula' },
    e3zCapComoInd: { n: 'Carga capacitiva tomada como indutiva', d: 'Disse que a corrente atrasa da tensão num circuito RC; em carga capacitiva a corrente adianta (avanço).', t: 'oposto' },
    e3zFpQuadrado: { n: 'Razão de potências ao quadrado', d: 'Elevou a razão P/S ao quadrado; o fator de potência é a razão P/S sem expoente.', t: 'formula' },
    e3zInverteRazao: { n: 'Razão invertida', d: 'Inverteu a razão que define o fator de potência (usou o inverso ou a razão de duas grandezas erradas).', t: 'formula' },
    e3zSemDias: { n: 'Dias esquecidos', d: 'Calculou só a energia de um dia, sem multiplicar pelos 20 dias de trabalho.', t: 'detalhe' },
    e3zSoForno: { n: 'Só um equipamento', d: 'Calculou a energia apenas do forno, esquecendo a estufa.', t: 'detalhe' },
    e3zSoEstufa: { n: 'Só um equipamento', d: 'Calculou a energia apenas da estufa, esquecendo o forno.', t: 'detalhe' },
    e3zMinComoHora: { n: 'Minutos tratados como horas', d: 'Usou 45 (minutos) como se fossem horas ao multiplicar pela potência do forno.', t: 'detalhe' },
    e3zAtrasoAvanco: { n: 'Atraso e avanço invertidos', d: 'Leu a figura ao contrário: se a corrente passa por zero depois da tensão, ela está atrasada e a carga é indutiva.', t: 'oposto' },
    e3zSemDefasagem: { n: 'Defasagem ignorada', d: 'Tomou as curvas como em fase; na figura a corrente cruza o zero um pouco depois da tensão, e isso dá o ângulo φ.', t: 'detalhe' },
    e3zBobinasTrocadas: { n: 'Bobinas do wattímetro trocadas', d: 'Aceitou a afirmativa sobre as bobinas ao contrário: a de corrente vai em série com a carga e a de potencial, em paralelo.', t: 'oposto' },
    e3zRnoX: { n: 'Resistência no lugar da reatância', d: 'Respondeu R = P/I², a resistência da carga, e não a reatância X = Q/I².', t: 'formula' },
    e3zZnoX: { n: 'Impedância no lugar da reatância', d: 'Respondeu |Z| = V/I, a impedância, e não a reatância (que é só a parte reativa de Z).', t: 'formula' },
    e3zQsobreI: { n: 'Q dividida por I', d: 'Dividiu a potência reativa pela corrente (Q/I), quando a reatância é Q/I².', t: 'formula' },
    e3zPsobreI: { n: 'P dividida por I', d: 'Dividiu a potência ativa pela corrente (P/I) e ainda a tomou como reatância; P/I² seria a resistência.', t: 'formula' },
    e3zPerdaSobreEixo: { n: 'Perda calculada sobre a potência do eixo', d: 'Aplicou os 25% de perdas à potência do eixo; o rendimento é referido à potência absorvida da rede (perda = 25% de 1.600 W).', t: 'formula' },
    e3zPotUtil: { n: 'Potência útil no lugar da perda', d: 'Respondeu a potência no eixo (η·P absorvida), e não a perda (P absorvida − P no eixo).', t: 'detalhe' },
    e3zPotAbs: { n: 'Potência absorvida no lugar da perda', d: 'Respondeu a potência ativa absorvida da rede, e não a diferença entre ela e a do eixo.', t: 'detalhe' },
    e3zDifFp: { n: 'Diferença de FP no lugar da de tg φ', d: 'Multiplicou P pela diferença dos fatores de potência (0,8 − 0,6); o banco depende da diferença das tangentes de φ.', t: 'formula' },
    e3zResidual: { n: 'Reativo residual no lugar do banco', d: 'Respondeu o reativo que sobra após a correção (Q2), e não o do banco (Q1 − Q2).', t: 'detalhe' },
    e3zParaFpUnit: { n: 'Corrigiu para FP 1', d: 'Dimensionou o banco para eliminar todo o reativo (FP unitário), e não para o FP pedido.', t: 'detalhe' },
    e3zSomaTg: { n: 'Soma das tangentes', d: 'Somou tg φ1 e tg φ2 em vez de subtrair: Q<sub>C</sub> = P(tg φ1 − tg φ2).', t: 'formula' },
    e3zSubtraiI: { n: 'Subtração aritmética de correntes', d: 'Subtraiu 8 A de 10 A como números comuns; só a componente reativa (8 A) é cancelada pelo capacitor, e a ativa (6 A) permanece.', t: 'formula' },
    e3zIcSo: { n: 'Corrente do capacitor ou reativa residual', d: 'Respondeu 8 A, valor da corrente do capacitor (e da componente reativa da carga), e não a corrente que resta na linha.', t: 'detalhe' },
    e3zSemEfeito: { n: 'Capacitor sem efeito', d: 'Considerou que o capacitor não altera a corrente da fonte, mas ele cancela a componente reativa e a corrente cai.', t: 'oposto' },
    e3zSomaI: { n: 'Soma aritmética de correntes', d: 'Somou 10 A e 8 A como números comuns; a corrente do capacitor está em quadratura com a ativa e se opõe à reativa indutiva.', t: 'formula' },
    e3zSemCorrecao: { n: 'Banco sem efeito', d: 'Manteve o fator de potência original, como se o banco de 35 kvar não alterasse o reativo da instalação.', t: 'oposto' },
    e3zQcComoResidual: { n: 'Banco tomado como reativo restante', d: 'Usou a potência do banco como se fosse o reativo que resta na instalação; o reativo restante é Q1 − QC.', t: 'detalhe' },
    e3zBancoZera: { n: 'Banco tomado como eliminador do reativo', d: 'Supôs que o banco zera todo o reativo; ele cancela só 35 dos 80 kvar, e restam 45 kvar indutivos.', t: 'detalhe' },
    e3zUmaFase: { n: 'Valor de uma fase só', d: 'Respondeu a grandeza de uma única fase, esquecendo de multiplicar por 3 para obter o total trifásico.', t: 'detalhe' },
    e3zSemRaiz3: { n: 'Fator √3 esquecido', d: 'Omitiu o √3 da relação trifásica P = √3·V<sub>L</sub>·I<sub>L</sub>·cos φ (ou da relação entre tensão de linha e de fase).', t: 'formula' },
    e3zTresVL: { n: 'Fator 3 com tensão de linha', d: 'Usou 3·V<sub>L</sub>·I<sub>L</sub>, misturando as fórmulas: 3·V<sub>f</sub>·I<sub>f</sub> ou √3·V<sub>L</sub>·I<sub>L</sub>.', t: 'formula' },
    e3zYcomoDelta: { n: 'Estrela tratada como triângulo', d: 'Aplicou a tensão de linha sobre cada impedância, como se a carga estivesse em triângulo; em estrela cada uma recebe V<sub>L</sub>/√3.', t: 'oposto' },
    e3zIlIgualIf: { n: 'Corrente de linha igual à de fase', d: 'Tomou a corrente de linha igual à de fase, que vale apenas na estrela; no triângulo equilibrado I<sub>L</sub> = √3·I<sub>f</sub>.', t: 'oposto' },
    e3zDeltaComoY: { n: 'Triângulo tratado como estrela', d: 'Dividiu a corrente de fase por √3, relação que vale para a tensão de fase da estrela, e não para a corrente de linha do triângulo.', t: 'oposto' },
    e3zSoma3: { n: 'Soma aritmética das três fases', d: 'Multiplicou a corrente de fase por 3, como se as correntes das fases somassem aritmeticamente na linha.', t: 'formula' },
    e3zRaiz3Tres: { n: 'Dois fatores aplicados', d: 'Aplicou √3 e depois 3 à corrente de fase; só o fator √3 liga a corrente de linha à de fase no triângulo.', t: 'formula' },
    e3zSeqInvertida: { n: 'Sequência de fases invertida', d: 'Usou o ângulo da sequência CBA (V<sub>AB</sub> atrasado de 30° em relação a V<sub>AN</sub>); na sequência ABC, V<sub>AB</sub> adianta 30°.', t: 'oposto' },
    e3zFaseCA: { n: 'Tensão de outra linha', d: 'Respondeu o fasor V<sub>CA</sub> (220∠150°) no lugar do V<sub>AB</sub> pedido.', t: 'detalhe' },
    e3zLinhaEmFase: { n: 'Linha em fase com a fase', d: 'Supôs que a tensão de linha está em fase com a tensão de fase, esquecendo a defasagem de 30°.', t: 'detalhe' },
    e3zAng120: { n: 'Defasagem entre fases usada', d: 'Usou os 120° entre as fases como se fosse a defasagem entre a tensão de linha e a de fase.', t: 'detalhe' },
    e3zNeutroZero: { n: 'Neutro nulo por hábito', d: 'Considerou nula a corrente no neutro (vale só para a fundamental equilibrada); as harmônicas de 3ª ordem estão em fase e se somam.', t: 'oposto' },
    e3zNeutroUmaFase: { n: 'Neutro igual à corrente de uma fase', d: 'Tomou a corrente do neutro igual à de uma fase, sem somar as três contribuições em fase.', t: 'formula' },
    e3zRaiz3Neutro: { n: 'Fator √3 aplicado ao neutro', d: 'Multiplicou a corrente de uma fase por √3, fator da relação entre grandezas de linha e de fase; no neutro as correntes se somam fasorialmente: três iguais a 120° dão zero e três em fase (3ª harmônica) dão 3 vezes a de uma fase.', t: 'formula' },
    e3zRaiz3Soma: { n: 'Raiz de 3 após a soma', d: 'Somou as três harmônicas em fase (12 A) e ainda multiplicou por √3.', t: 'formula' },
    e3zQnoP: { n: 'Reativa no lugar da ativa', d: 'Calculou a potência reativa (var) no lugar da potência ativa (W) pedida.', t: 'formula' },
    e3zRazaoW: { n: 'Razão das leituras tomada como FP', d: 'Usou a fração de uma leitura no total, W/(W1 + W2), como fator de potência; o ângulo sai de tg φ = √3·|W1 − W2|/(W1 + W2).', t: 'formula' },
    e3zSemTg: { n: 'FP unitário suposto', d: 'Supôs FP unitário porque a soma W1 + W2 dá a potência ativa total, sem calcular tg φ.', t: 'detalhe' },
    e3zFpInv: { n: 'Tangente invertida', d: 'Tomou 1/√3 ≈ 0,58 (tg 30°) como fator de potência; com um dos wattímetros em zero, tg φ = √3 e φ = 60°.', t: 'formula' },
    e3zFp30: { n: '30° no lugar de 60°', d: 'Tomou φ = 30°, o ângulo do caso W1 = 2·W2; com um wattímetro indicando zero, φ = 60° e cos φ = 0,5.', t: 'detalhe' },
    e3zSemP3: { n: 'Outra corrente de fase tomada na linha', d: 'Tomou a corrente de um só ramo do triângulo como corrente de linha, esquecendo que a linha A recebe a diferença fasorial de dois ramos.', t: 'detalhe' },
    e3zFase90: { n: 'Defasagem de 90° suposta', d: 'Combinou as duas correntes como se estivessem defasadas de 90° (10√2); entre ramos de um triângulo a defasagem é 120°.', t: 'formula' },
    e3zSomaArit: { n: 'Soma aritmética de correntes', d: 'Somou 10 A + 10 A como números comuns; correntes defasadas de 120° se combinam fasorialmente.', t: 'formula' },
    e3zDivRaiz3: { n: 'Divisão por √3 no triângulo', d: 'Dividiu 10 A por √3; no triângulo a linha tem √3 vezes a corrente de fase (ou o módulo da diferença de dois ramos), e não um valor menor.', t: 'oposto' },
  },
  extra: [
    { id: 'z1', h: '3.1', tag: 'Potência reativa de circuito RL série', d: 'm', conta: '(200/Math.hypot(12,16))**2*16',
      s: 'No circuito da figura, a potência reativa absorvida da fonte, em var, é',
      figSvg: () => svg(680, 210,
        ac(100, 120, '200 V') + poly([[100, 102], [100, 60], [230, 60]]) + res(260, 60, 'h', 'R = 12 Ω')
        + wire(290, 60, 380, 60) + ind(410, 60, 'XL = 16 Ω') + poly([[440, 60], [560, 60], [560, 180], [100, 180], [100, 138]]),
        'Circuito série com fonte senoidal de 200 V, um resistor de 12 ohms e um indutor de reatância 16 ohms.'),
      o: ['1.200', '1.600', '2.000', '2.500', '2.800'], a: 1,
      c: 'Em série, |Z| = √(12² + 16²) = 20 Ω e I = 200/20 = 10 A. Então Q = I²·X = 100·16 = 1.600 var (P = I²R = 1.200 W e S = V·I = 2.000 VA: triângulo 3-4-5).',
      w: { A: '[e3zPnoQ] 1.200 é a potência ativa (I²R = 100·12), não a reativa.', C: '[e3zAparente] 2.000 VA é a potência aparente V·I = 200·10.', D: '[e3zVSobreX] 200²/16 = 2.500 aplica os 200 V inteiros sobre a reatância, que só recebe 160 V.', E: '[e3zSomaPQ] 2.800 soma P e Q aritmeticamente (1.200 + 1.600).' } },

    { id: 'z2', h: '3.1', tag: 'Triângulo de potências: reativa', d: 'm', conta: 'Math.sqrt(20**2-12**2)',
      s: 'A figura mostra o triângulo de potências de uma carga monofásica indutiva. A potência reativa da carga, em kvar, é',
      figSvg: () => svg(680, 260,
        wire(350, 220, 470, 220) + wire(470, 220, 470, 60) + wire(350, 220, 470, 60)
        + poly([[460, 220], [460, 210], [470, 210]])
        + text(410, 242, 'P = 12 kW') + text(405, 128, 'S = 20 kVA', 'end') + text(485, 145, 'Q = ?', 'start')
        + text(382, 208, 'φ', 'middle', 'tl'),
        'Triângulo retângulo de potências de uma carga indutiva: cateto horizontal P igual a 12 quilowatts, cateto vertical Q a determinar e hipotenusa S igual a 20 quilovoltampères.'),
      o: ['8', '16', '20', '23,3', '32'], a: 1,
      c: 'Q = √(S² − P²) = √(20² − 12²) = √256 = 16 kvar. É o triângulo 3-4-5 multiplicado por 4 (12-16-20).',
      w: { A: '[e3zSubtrai] 8 é S − P = 20 − 12, subtração aritmética dos lados.', C: '[e3zAparente] 20 é a potência aparente S, a hipotenusa.', D: '[e3zSomaQuad] √(20² + 12²) ≈ 23,3 soma os quadrados em vez de subtraí-los.', E: '[e3zSomaPQ] 32 é S + P = 20 + 12, soma aritmética dos lados do triângulo.' } },

    { id: 'z3', h: '3.1', tag: 'Afirmativas sobre P, Q e S', d: 'm',
      s: 'Sobre as potências em circuitos monofásicos de corrente alternada senoidal, considere as afirmações a seguir. I – Em um resistor ideal, a potência reativa é nula e a potência aparente é igual à potência ativa. II – Em um circuito RL série, a potência aparente é a soma aritmética das potências ativa e reativa. III – Em um indutor ideal, a potência ativa média é nula, embora a potência instantânea assuma valores positivos e negativos ao longo do ciclo. Está(ão) correta(s) APENAS a(s) afirmação(ões)',
      o: ['I e III', 'I', 'III', 'I e II', 'II e III'], a: 0,
      c: 'I é verdadeira: no resistor φ = 0, Q = 0 e S = P. II é falsa: S² = P² + Q², e não S = P + Q. III é verdadeira: no indutor ideal a corrente está 90° atrás da tensão, p(t) oscila em torno de zero e P = 0. Corretas: I e III.',
      w: { B: '[e3zAfirmVerd] I é verdadeira, mas a III também é.', C: '[e3zAfirmVerd] III é verdadeira, mas a I também é.', D: '[e3zSomaAritm] Aceitou a II, que é falsa: a soma é geométrica, S² = P² + Q².', E: '[e3zSomaAritm] Inclui a II, falsa, e deixa de fora a I, verdadeira.' } },

    { id: 'z4', h: '3.1', tag: 'Corrente de carga monofásica com FP', d: 'm', conta: '2200/(220*0.8)',
      s: 'Uma carga monofásica que absorve 2,2 kW, com fator de potência 0,8 indutivo, é ligado a uma rede de 220 V. Dado: sen φ = 0,6 e tg φ = 0,75. A corrente absorvida da rede, em ampères, é',
      o: ['8', '10', '12,5', '13,3', '16,7'], a: 2,
      c: 'I = P/(V·cos φ) = 2.200/(220·0,8) = 10/0,8 = 12,5 A (S = 2.750 VA).',
      w: { A: '[e3zFpMultiplica] 8 A é P·fp/V = 10·0,8: multiplicou pelo fator de potência em vez de dividir.', B: '[e3zSemFP] 10 A é P/V, que ignora o fator de potência.', D: '[e3zTgNoFp] 13,3 A é 10/0,75: usou tg φ no lugar de cos φ.', E: '[e3zSenNoFp] 16,7 A é 10/0,6: usou sen φ no lugar de cos φ.' } },

    { id: 'z5', h: '3.1', tag: 'Corrente total de cargas R e L em paralelo', d: 'm', conta: 'Math.hypot(3000,4000)/200',
      s: 'Uma instalação monofásica de 200 V alimenta, em paralelo, um aquecedor resistivo de 3 kW e um reator indutivo ideal de 4 kvar. A corrente total fornecida pela rede, em ampères, é',
      o: ['5', '15', '20', '25', '35'], a: 3,
      c: 'P = 3 kW e Q = 4 kvar, logo S = √(3² + 4²) = 5 kVA (triângulo 3-4-5). I = S/V = 5.000/200 = 25 A.',
      w: { A: '[e3zSubtraiPQ] 5 A é (4.000 − 3.000)/200: subtraiu P de Q aritmeticamente.', B: '[e3zSoPcarga] 15 A é 3.000/200: só o aquecedor.', C: '[e3zSoQcarga] 20 A é 4.000/200: só o reator.', E: '[e3zSomaPQ] 35 A é (3.000 + 4.000)/200: somou P e Q aritmeticamente.' } },

    { id: 'z6', h: '3.1', tag: 'Fator de potência de circuito RC série', d: 'm', conta: '3/Math.hypot(3,4)',
      s: 'No circuito da figura, o fator de potência visto pela fonte é',
      figSvg: () => svg(680, 210,
        ac(100, 120, '50 V') + poly([[100, 102], [100, 60], [230, 60]]) + res(260, 60, 'h', 'R = 3 Ω')
        + wire(290, 60, 370, 60) + cap(400, 60, 'XC = 4 Ω') + poly([[430, 60], [540, 60], [540, 180], [100, 180], [100, 138]]),
        'Circuito série com fonte senoidal de 50 volts, um resistor de 3 ohms e um capacitor de reatância 4 ohms.'),
      o: ['0,75 em avanço', '0,80 em atraso', '0,80 em avanço', '0,60 em atraso', '0,60 em avanço'], a: 4,
      c: '|Z| = √(3² + 4²) = 5 Ω e cos φ = R/|Z| = 3/5 = 0,6. A carga é capacitiva, então a corrente adianta da tensão: fator de potência 0,6 em avanço.',
      w: { A: '[e3zRsobreX] 0,75 é R/X = 3/4, e não R/|Z| = 3/5.', B: '[e3zSenNoFp] 0,80 é sen φ = X/|Z| (e ainda trata o circuito como indutivo).', C: '[e3zSenNoFp] 0,80 é sen φ = X/|Z|, e não cos φ = R/|Z|.', D: '[e3zCapComoInd] 0,6 está certo, mas em circuito capacitivo a corrente adianta; não atrasa.' } },

    { id: 'z7', h: '3.2', tag: 'FP por V, A e W medidos', d: 'm', conta: '1760/(220*10)',
      s: 'Os instrumentos da figura medem uma carga monofásica. Com as leituras indicadas, o fator de potência da carga é',
      figSvg: () => medFig('220 V', '10 A', '1.760 W'),
      o: ['0,60', '0,64', '0,75', '0,80', '1,25'], a: 3,
      c: 'S = V·I = 220·10 = 2.200 VA e P = 1.760 W (leitura do wattímetro). cos φ = P/S = 1.760/2.200 = 0,8.',
      w: { A: '[e3zSenNoFp] 0,60 é sen φ = Q/S, e não cos φ = P/S.', B: '[e3zFpQuadrado] 0,64 é (P/S)²: elevou a razão ao quadrado.', C: '[e3zTgNoFp] 0,75 é tg φ = Q/P, e não cos φ.', E: '[e3zInverteRazao] 1,25 é S/P, a razão invertida (FP nunca passa de 1).' } },

    { id: 'z8', h: '3.2', tag: 'Energia de forno e estufa', d: 'm', conta: '(4*0.75+2*6)*20',
      s: 'Em uma oficina, um forno resistivo de 4 kW funciona 45 minutos por dia e uma estufa de 2 kW funciona 6 horas por dia. Em 20 dias de trabalho, a energia consumida pelos dois equipamentos, em kWh, é',
      o: ['15', '60', '240', '300', '3.840'], a: 3,
      c: 'Forno: 4·0,75 = 3 kWh/dia. Estufa: 2·6 = 12 kWh/dia. Total diário 15 kWh; em 20 dias, 15·20 = 300 kWh.',
      w: { A: '[e3zSemDias] 15 kWh é a energia de um dia; faltou multiplicar por 20.', B: '[e3zSoForno] 60 kWh é só o forno (3·20).', C: '[e3zSoEstufa] 240 kWh é só a estufa (12·20).', E: '[e3zMinComoHora] 3.840 = 4·45·20 + 2·6·20: usou 45 min como 45 h no forno.' } },

    { id: 'z9', h: '3.2', tag: 'Defasagem entre v(t) e i(t) no gráfico', d: 'd', conta: 'Math.cos(2*Math.PI/12)',
      s: 'A figura mostra, ao longo de um período T, a tensão v(t) e a corrente i(t) de uma carga monofásica em regime permanente. Dado: cos 30° ≈ 0,87 e cos 60° = 0,5. O fator de potência e a natureza da carga são',
      figSvg: () => {
        const T = 480, x0 = 60, pts = (A, lag) => { const p = []; for (let x = 0; x <= T; x += 6) p.push([x0 + x, Math.round((130 - A * Math.sin(2 * Math.PI * (x - lag) / T)) * 10) / 10]); return p; };
        return svg(680, 272,
          wire(40, 130, 600, 130) + text(612, 134, 't', 'start') + poly(pts(80, 0)) + poly(pts(55, 40), 'dash')
          + wire(470, 28, 500, 28) + text(510, 32, 'v(t)', 'start') + wire(470, 48, 500, 48, 'dash') + text(510, 52, 'i(t)', 'start')
          + wire(60, 130, 60, 176) + wire(100, 130, 100, 176) + seta(80, 170, 60, 170) + seta(80, 170, 100, 170) + text(80, 192, 'T/12')
          + wire(60, 228, 60, 248) + wire(540, 228, 540, 248) + seta(300, 238, 60, 238) + seta(300, 238, 540, 238) + text(300, 262, 'T'),
          'Gráfico de duas senoides ao longo de um período T: a tensão v(t), em linha contínua e de maior amplitude, e a corrente i(t), tracejada, com a corrente cruzando o zero um intervalo T/12 depois da tensão.');
      },
      o: ['0,50 capacitiva', '0,50 indutiva', '0,87 capacitiva', '1,00 resistiva', '0,87 indutiva'], a: 4,
      c: 'A corrente cruza o zero (no sentido crescente) T/12 depois da tensão, isto é, 360°/12 = 30° depois. Corrente atrasada da tensão é carga indutiva, com cos φ = cos 30° ≈ 0,87.',
      w: { A: '[e3zSenNoFp] 0,50 é sen 30°, e não cos 30°; além disso, a corrente atrasada indica carga indutiva.', B: '[e3zSenNoFp] 0,50 é sen 30°, e não cos 30° (o fator de potência é cos φ).', C: '[e3zAtrasoAvanco] 0,87 está certo, mas a corrente que cruza o zero depois da tensão está atrasada, e a carga é indutiva.', D: '[e3zSemDefasagem] Ignorou o deslocamento de T/12 entre as curvas: com φ = 30° o fator de potência não é 1.' } },

    { id: 'z10', h: '3.2', tag: 'Afirmativas sobre medição com wattímetro', d: 'm',
      s: 'Sobre a medição de potência e do fator de potência em corrente alternada monofásica, considere as afirmações a seguir. I – No wattímetro, a bobina de corrente é ligada em paralelo com a carga e a bobina de potencial, em série. II – A potência aparente pode ser obtida pelo produto das leituras de um voltímetro e de um amperímetro, e o fator de potência, pela razão entre a leitura do wattímetro e essa potência aparente. III – Um wattímetro ideal ligado a uma carga puramente indutiva indica zero, embora haja tensão e corrente na carga. Está(ão) correta(s) APENAS a(s) afirmação(ões)',
      o: ['I', 'II', 'I e III', 'I, II e III', 'II e III'], a: 4,
      c: 'I é falsa: a bobina de corrente vai em série com a carga e a de potencial, em paralelo. II é verdadeira: S = V·I e cos φ = P/S. III é verdadeira: com φ = 90°, P = V·I·cos 90° = 0. Corretas: II e III.',
      w: { A: '[e3zBobinasTrocadas] I é justamente a falsa: as bobinas estão trocadas.', B: '[e3zAfirmVerd] II é verdadeira, mas a III também é.', C: '[e3zBobinasTrocadas] Inclui a I, falsa, e deixa de fora a II, verdadeira.', D: '[e3zBobinasTrocadas] Inclui a I, falsa, junto com II e III, verdadeiras.' } },

    { id: 'z11', h: '3.2', tag: 'Reatância a partir de V, A e W', d: 'd', conta: 'Math.sqrt((100*5)**2-400**2)/5**2',
      s: 'Os instrumentos da figura medem uma carga monofásica indutiva. Com as leituras indicadas, a reatância da carga, em ohms, é',
      figSvg: () => medFig('100 V', '5 A', '400 W'),
      o: ['12', '16', '20', '60', '80'], a: 0,
      c: 'S = V·I = 100·5 = 500 VA e P = 400 W, logo Q = √(500² − 400²) = 300 var. A reatância é X = Q/I² = 300/25 = 12 Ω (R = P/I² = 16 Ω e |Z| = 100/5 = 20 Ω: triângulo 12-16-20).',
      w: { B: '[e3zRnoX] 16 Ω é R = P/I², a resistência da carga.', C: '[e3zZnoX] 20 Ω é |Z| = V/I, a impedância.', D: '[e3zQsobreI] 60 Ω é Q/I = 300/5; faltou dividir por I².', E: '[e3zPsobreI] 80 Ω é P/I = 400/5; nem é a reatância nem a resistência.' } },

    { id: 'z12', h: '3.2', tag: 'FP médio por energia ativa e reativa', d: 'm', conta: '3600/Math.hypot(3600,4800)',
      s: 'Num mês, o medidor de energia de uma unidade registrou 3.600 kWh de energia ativa e 4.800 kvarh de energia reativa indutiva. O fator de potência médio da unidade nesse mês foi',
      o: ['0,60', '0,75', '0,80', '1,25', '1,33'], a: 0,
      c: 'cos φ = kWh/√(kWh² + kvarh²) = 3.600/√(3.600² + 4.800²) = 3.600/6.000 = 0,6 (triângulo 3-4-5).',
      w: { B: '[e3zInverteRazao] 0,75 é kWh/kvarh = 3.600/4.800, razão entre ativa e reativa, e não entre ativa e aparente.', C: '[e3zSenNoFp] 0,80 é kvarh/kVAh = sen φ, e não cos φ.', D: '[e3zInverteRazao] 1,25 é kVAh/kvarh, razão invertida; FP não passa de 1.', E: '[e3zTgNoFp] 1,33 é kvarh/kWh = tg φ, e não cos φ.' } },

    { id: 'z13', h: '3.2', tag: 'Perda em motor monofásico por medidas', d: 'm', conta: '200*10*0.8*(1-0.75)',
      s: 'Um motor monofásico de 200 V absorve 10 A da rede, com fator de potência 0,8 e rendimento de 75%. A potência perdida no motor, em watts, é',
      o: ['300', '400', '1.200', '1.600', '2.000'], a: 1,
      c: 'Potência absorvida: P = 200·10·0,8 = 1.600 W. Potência no eixo: 0,75·1.600 = 1.200 W. Perdas: 1.600 − 1.200 = 400 W (25% da potência absorvida).',
      w: { A: '[e3zPerdaSobreEixo] 300 W é 25% de 1.200 W; o rendimento se refere à potência absorvida da rede.', C: '[e3zPotUtil] 1.200 W é a potência no eixo, e não a perdida.', D: '[e3zPotAbs] 1.600 W é a potência ativa absorvida da rede.', E: '[e3zAparente] 2.000 VA é a potência aparente V·I, e não a perda.' } },

    { id: 'z14', h: '3.3', tag: 'Banco de capacitores para FP 0,8', d: 'd', conta: '12*(4/3-3/4)',
      s: 'Na instalação monofásica da figura, um banco de capacitores em paralelo com a carga deve elevar o fator de potência para 0,8 indutivo. Dado: para fator de potência 0,6, tg φ = 4/3; para 0,8, tg φ = 3/4. A potência reativa do banco, em kvar, é',
      figSvg: () => svg(680, 232,
        ac(100, 120) + wire(100, 102, 100, 50) + wire(100, 138, 100, 190) + wire(100, 50, 480, 50) + wire(100, 190, 480, 190)
        + wire(300, 50, 300, 103) + zbox(300, 120, 'Z') + wire(300, 137, 300, 190)
        + text(340, 114, '12 kW', 'start') + text(340, 132, 'fp 0,6 ind.', 'start')
        + wire(480, 50, 480, 116) + wire(464, 116, 496, 116, 'thick') + wire(464, 126, 496, 126, 'thick') + wire(480, 126, 480, 190)
        + text(516, 114, 'Banco', 'start') + text(516, 132, 'Qc = ?', 'start')
        + node(300, 50) + node(300, 190) + node(480, 50) + node(480, 190),
        'Fonte monofásica alimentando, em paralelo, uma carga de 12 quilowatts com fator de potência 0,6 indutivo e um banco de capacitores de potência reativa a determinar.'),
      o: ['2,4', '7', '9', '16', '25'], a: 1,
      c: 'Q<sub>1</sub> = 12·4/3 = 16 kvar (antes) e Q<sub>2</sub> = 12·3/4 = 9 kvar (depois). Banco: Q<sub>C</sub> = 16 − 9 = 7 kvar, ou 12·(4/3 − 3/4) = 12·7/12 = 7 kvar.',
      w: { A: '[e3zDifFp] 2,4 é 12·(0,8 − 0,6): usou a diferença dos fatores de potência no lugar da de tg φ.', C: '[e3zResidual] 9 kvar é o reativo que sobra (Q<sub>2</sub>), e não o do banco.', D: '[e3zParaFpUnit] 16 kvar leva o fator de potência a 1; o pedido é 0,8.', E: '[e3zSomaTg] 25 = 12·(4/3 + 3/4): somou as tangentes em vez de subtrair.' } },

    { id: 'z15', h: '3.3', tag: 'Corrente de linha após capacitor em paralelo', d: 'd', conta: 'Math.hypot(10*0.6,10*0.8-8)',
      s: 'Uma carga monofásica ligada a 220 V absorve 10 A, com fator de potência 0,6 indutivo. Dado: sen φ = 0,8. Em paralelo com ela é ligado um capacitor que absorve 8 A. A corrente fornecida pela fonte passa a ser, em ampères,',
      o: ['2', '6', '8', '10', '18'], a: 1,
      c: 'Corrente da carga: componente em fase 10·0,6 = 6 A e componente reativa indutiva 10·0,8 = 8 A. O capacitor fornece 8 A de sentido oposto à reativa: sobra só a componente em fase, I = 6 A.',
      w: { A: '[e3zSubtraiI] 2 A é 10 − 8: subtraiu as correntes aritmeticamente.', C: '[e3zIcSo] 8 A é a corrente do capacitor (igual à componente reativa da carga), e não a que resta na linha.', D: '[e3zSemEfeito] 10 A é a corrente original: ignorou o efeito do capacitor.', E: '[e3zSomaI] 18 A é 10 + 8: somou as correntes aritmeticamente.' } },

    { id: 'z16', h: '3.3', tag: 'FP final após banco de 35 kvar', d: 'm', conta: '60/Math.hypot(60,60*4/3-35)',
      s: 'Uma carga de 60 kW, com fator de potência 0,6 indutivo, recebe em paralelo um banco de capacitores de 35 kvar. Dado: para fator de potência 0,6, tg φ = 4/3. O fator de potência da instalação passa a ser',
      o: ['0,60', '0,75', '0,80', '0,86', '1,00'], a: 2,
      c: 'Q<sub>1</sub> = 60·4/3 = 80 kvar; com o banco, Q<sub>2</sub> = 80 − 35 = 45 kvar. S = √(60² + 45²) = 75 kVA e cos φ = 60/75 = 0,8.',
      w: { A: '[e3zSemCorrecao] 0,60 é o valor original: ignorou o efeito do banco.', B: '[e3zTgNoFp] 0,75 é tg φ = 45/60 = Q<sub>2</sub>/P, e não cos φ.', D: '[e3zQcComoResidual] 0,86 é 60/√(60² + 35²): tomou os 35 kvar do banco como o reativo que sobra; o que sobra é 80 − 35 = 45 kvar.', E: '[e3zBancoZera] 1,00 supõe que o banco elimina todo o reativo; restam 45 kvar.' } },

    { id: 'z17', h: '4.1', tag: 'Potência de carga resistiva em estrela', d: 'm', conta: '3*(380/1.73)**2/22',
      s: 'Na carga trifásica da figura, três resistores iguais são ligados em estrela a uma rede de 380 V entre fases. Dado: √3 ≈ 1,73. A potência ativa total absorvida, em watts, é, aproximadamente,',
      figSvg: () => yFig('22 Ω', '', '380 V entre fases', 'Três resistores de 22 ohms ligados em estrela, com ponto comum, alimentados por uma rede trifásica de 380 volts entre fases.'),
      o: ['2.200', '3.800', '6.600', '11.400', '19.700'], a: 2,
      c: 'Em estrela V<sub>f</sub> = 380/√3 ≈ 220 V. Cada resistor: I = 220/22 = 10 A. Potência total: 3·220·10 = 6.600 W (ou √3·380·10 ≈ 6.570 W).',
      w: { A: '[e3zUmaFase] 2.200 W é a potência de uma fase (220·10), sem multiplicar por 3.', B: '[e3zSemRaiz3] 3.800 W é V<sub>L</sub>·I<sub>L</sub> = 380·10, sem o √3 da fórmula trifásica.', D: '[e3zTresVL] 11.400 W é 3·380·10: usou a tensão de linha com o fator 3, que é de tensão de fase.', E: '[e3zYcomoDelta] 19.700 W é 3·380²/22: aplicou 380 V sobre cada resistor, como se estivesse em triângulo.' } },

    { id: 'z18', h: '4.1', tag: 'Corrente de linha em triângulo equilibrado', d: 'm', conta: '1.73*220/22',
      s: 'A carga da figura, formada por três resistores iguais ligados em triângulo, é alimentada por rede trifásica de 220 V entre fases. Dado: √3 ≈ 1,73. A corrente em cada linha, em ampères, é, aproximadamente,',
      figSvg: () => dFig('22 Ω', '22 Ω', '22 Ω', '220 V entre fases', 'Três resistores de 22 ohms ligados em triângulo entre as linhas A, B e C, alimentados por uma rede trifásica de 220 volts entre fases.'),
      o: ['5,8', '10', '17,3', '30', '51,9'], a: 2,
      c: 'No triângulo cada resistor recebe a tensão de linha: I<sub>f</sub> = 220/22 = 10 A. A corrente de linha vale I<sub>L</sub> = √3·I<sub>f</sub> ≈ 1,73·10 = 17,3 A.',
      w: { A: '[e3zDeltaComoY] 5,8 A é 10/√3: dividiu por √3 em vez de multiplicar (relação de tensão da estrela).', B: '[e3zIlIgualIf] 10 A é a corrente de fase, e não a de linha.', D: '[e3zSoma3] 30 A é 3·10: somou as três correntes de fase aritmeticamente.', E: '[e3zRaiz3Tres] 51,9 A é 3·√3·10: aplicou dois fatores ao mesmo tempo.' } },

    { id: 'z19', h: '4.1', tag: 'Fase da tensão de linha V_AB em sequência ABC', d: 'm',
      s: 'Em um sistema trifásico simétrico a quatro fios, em estrela, com sequência de fases ABC, a tensão fase-neutro V<sub>AN</sub> vale 127∠0° V. A tensão de linha V<sub>AB</sub> tem módulo de aproximadamente 220 V (√3 · 127). Em relação a V<sub>AN</sub>, a fase de V<sub>AB</sub> vale, em graus,',
      o: ['−30°', '0°', '+30°', '+120°', '+150°'], a: 2,
      c: 'V<sub>AB</sub> = V<sub>AN</sub> − V<sub>BN</sub>, com V<sub>BN</sub> = 127∠−120°. O módulo é √3·127 ≈ 220 V e, na sequência ABC, V<sub>AB</sub> adianta 30° de V<sub>AN</sub>: 220∠+30° V.',
      w: { A: '[e3zSeqInvertida] −30° é o ângulo da sequência CBA, e não da ABC.', B: '[e3zLinhaEmFase] 0° supõe que a tensão de linha está em fase com a de fase; ela adianta 30°.', D: '[e3zAng120] +120° é a defasagem entre as fases, e não entre a tensão de linha e a de fase.', E: '[e3zFaseCA] +150° é a fase de V<sub>CA</sub>, e não a de V<sub>AB</sub>.' } },

    { id: 'z20', h: '4.1', tag: 'Neutro com 3ª harmônica', d: 'm', conta: '3*4',
      s: 'Em uma instalação trifásica a quatro fios, cargas não lineares iguais nas três fases produzem, em cada condutor de fase, uma componente de 3ª harmônica de 4 A, com as três componentes em fase entre si. Desprezando as demais componentes, a corrente de 3ª harmônica no condutor neutro, em ampères, é',
      o: ['0', '4', '6,9', '12', '20,8'], a: 3,
      c: 'As harmônicas de ordem 3 (e múltiplas) têm a mesma fase nos três condutores, são de sequência zero e não se cancelam no neutro: elas se somam. I<sub>N</sub> = 3·4 = 12 A.',
      w: { A: '[e3zNeutroZero] 0 vale para a fundamental equilibrada, não para a 3ª harmônica.', B: '[e3zNeutroUmaFase] 4 A é a corrente de uma fase; o neutro recebe as três.', C: '[e3zRaiz3Neutro] 6,9 A é √3·4: aplicou o fator √3 da relação entre grandezas de linha e de fase, que não vale para o neutro. Três correntes iguais a 120° somariam zero; em fase, somam 3·4 = 12 A.', E: '[e3zRaiz3Soma] 20,8 A é √3·12: somou em fase e depois multiplicou por √3.' } },

    { id: 'z21', h: '4.1', tag: 'Potência ativa de motor trifásico', d: 'm', conta: '1.73*220*20*0.8',
      s: 'Um motor trifásico de 220 V entre fases absorve 20 A em cada linha, com fator de potência 0,8. Dado: √3 ≈ 1,73. A potência ativa absorvida, em watts, é, aproximadamente,',
      o: ['3.520', '4.560', '6.080', '7.600', '10.560'], a: 2,
      c: 'P = √3·V<sub>L</sub>·I<sub>L</sub>·cos φ ≈ 1,73·220·20·0,8 ≈ 380·16 = 6.080 W (S ≈ 7.600 VA).',
      w: { A: '[e3zSemRaiz3] 3.520 W é 220·20·0,8, sem o √3.', B: '[e3zSenNoFp] 4.560 W é √3·220·20·0,6: usou sen φ no lugar de cos φ.', D: '[e3zAparente] 7.600 VA é a potência aparente (sem o fator de potência).', E: '[e3zTresVL] 10.560 W é 3·220·20·0,8: usou 3 no lugar de √3.' } },

    { id: 'z22', h: '4.1', tag: 'Potência reativa trifásica em estrela', d: 'm', conta: '3*(100/5)**2*4',
      s: 'Uma carga trifásica equilibrada, ligada em estrela, tem impedância Z = 3 + j4 Ω por fase e é alimentada por rede de 173 V entre fases (aproximadamente √3·100 V). A potência reativa total absorvida, em var, é',
      o: ['1.600', '3.600', '4.800', '6.000', '14.400'], a: 2,
      c: 'V<sub>f</sub> = 100 V e |Z| = 5 Ω, logo I = 20 A. Q = 3·I²·X = 3·400·4 = 4.800 var (P = 3.600 W e S = 6.000 VA).',
      w: { A: '[e3zUmaFase] 1.600 var é a potência reativa de uma só fase (400·4).', B: '[e3zPnoQ] 3.600 W é a potência ativa total (3·400·3), e não a reativa.', D: '[e3zAparente] 6.000 VA é a potência aparente total.', E: '[e3zYcomoDelta] 14.400 var vem de aplicar 173 V sobre cada impedância, como em triângulo.' } },

    { id: 'z23', h: '4.1', tag: 'Potência ativa em estrela com Z = R + jX', d: 'm', conta: '3*(100/50)**2*30',
      s: 'A figura mostra uma carga trifásica equilibrada em estrela, alimentada por uma rede de 173 V entre fases (aproximadamente √3·100 V). A potência ativa total absorvida, em watts, é',
      figSvg: () => yFig('Z', '30 + j40 Ω', '173 V entre fases', 'Carga trifásica equilibrada em estrela, com impedância de 30 mais j40 ohms em cada fase, alimentada por uma rede de 173 volts entre fases.'),
      o: ['120', '360', '480', '600', '1.080'], a: 1,
      c: 'V<sub>f</sub> = 100 V e |Z| = √(30² + 40²) = 50 Ω, logo I = 2 A. P = 3·I²·R = 3·4·30 = 360 W.',
      w: { A: '[e3zUmaFase] 120 W é a potência ativa de uma fase (4·30).', C: '[e3zQnoP] 480 var é a potência reativa total (3·4·40), e não a ativa.', D: '[e3zAparente] 600 VA é a potência aparente total (3·100·2).', E: '[e3zYcomoDelta] 1.080 W vem de aplicar 173 V sobre cada impedância, como em triângulo.' } },

    { id: 'z24', h: '4.2', tag: 'FP por dois wattímetros (Aron)', d: 'm', conta: 'Math.cos(Math.atan(Math.sqrt(3)*(4-2)/(4+2)))',
      s: 'Em um sistema trifásico simétrico a três fios, com sequência de fases ABC, a potência de uma carga equilibrada e indutiva é medida pelo método dos dois wattímetros, com as leituras indicadas na figura. Dado: √3 ≈ 1,73 e cos 30° ≈ 0,87. O fator de potência da carga é',
      figSvg: () => svg(680, 264,
        text(56, 54, 'A', 'end', 'tl') + text(56, 134, 'B', 'end', 'tl') + text(56, 214, 'C', 'end', 'tl')
        + wire(70, 50, 215, 50) + meter(230, 50, 'W') + wire(245, 50, 450, 50)
        + wire(70, 130, 450, 130) + wire(70, 210, 215, 210) + meter(230, 210, 'W') + wire(245, 210, 450, 210)
        + wire(230, 65, 230, 130) + wire(230, 195, 230, 130) + node(230, 130)
        + text(230, 26, 'W1 = 2 kW') + text(230, 250, 'W2 = 4 kW')
        + '<rect x="450" y="30" width="150" height="200" rx="3" fill="none" class="wire"/>'
        + text(525, 120, 'Carga', 'middle', 'tl') + text(525, 142, 'trifásica', 'middle', 'tl') + text(525, 164, 'equilibrada', 'middle', 'tl'),
        'Três linhas A, B e C alimentando uma carga trifásica equilibrada; um wattímetro na linha A e outro na linha C, com as bobinas de potencial ligadas à linha B; as leituras são 2 quilowatts na linha A e 4 quilowatts na linha C.'),
      o: ['0,50', '0,58', '0,67', '0,87', '1,00'], a: 3,
      c: 'P = W<sub>1</sub> + W<sub>2</sub> = 6 kW. tg φ = √3·(W<sub>2</sub> − W<sub>1</sub>)/(W<sub>1</sub> + W<sub>2</sub>) = 1,73·2/6 ≈ 0,58 = 1/√3, logo φ = 30° e cos φ ≈ 0,87. Coerente com a figura: em sequência ABC e carga indutiva, o wattímetro da linha C (V<sub>L</sub>·I<sub>L</sub>·cos(30° − φ)) indica mais que o da linha A (V<sub>L</sub>·I<sub>L</sub>·cos(30° + φ)); com φ = 30°, um lê o dobro do outro.',
      w: { A: '[e3zSenNoFp] 0,50 é sen 30° (ou W<sub>1</sub>/W<sub>2</sub>), e não cos 30°.', B: '[e3zTgNoFp] 0,58 é tg φ, que vale √3·2/6; o fator de potência é cos φ.', C: '[e3zRazaoW] 0,67 é W<sub>2</sub>/(W<sub>1</sub> + W<sub>2</sub>), razão das leituras sem significado de FP.', E: '[e3zSemTg] 1,00 supõe que a soma das leituras já dá S, sem calcular tg φ; as leituras diferentes indicam carga reativa.' } },

    { id: 'z25', h: '4.2', tag: 'Aron com uma leitura nula', d: 'd', conta: 'Math.cos(Math.atan(Math.sqrt(3)*(3-0)/3))',
      s: 'Em um sistema trifásico simétrico a três fios, a potência de uma carga equilibrada é medida pelo método dos dois wattímetros. Um dos wattímetros indica 3 kW e o outro indica zero. Dado: √3 ≈ 1,73. O fator de potência da carga é',
      o: ['0,50', '0,58', '0,87', '1,00', '1,73'], a: 0,
      c: 'P = 3 + 0 = 3 kW. tg φ = √3·(3 − 0)/(3 + 0) = √3, logo φ = 60° e cos φ = 0,5.',
      w: { B: '[e3zFpInv] 0,58 é 1/√3 = tg 30°, o inverso da tangente obtida.', C: '[e3zFp30] 0,87 é cos 30°: confundiu φ = 60° com 30°.', D: '[e3zSemTg] 1,00 supõe carga resistiva só porque W<sub>1</sub> + W<sub>2</sub> dá a potência ativa; com FP 1 as duas leituras seriam iguais (1,5 kW cada), e uma leitura nula indica φ = 60°.', E: '[e3zTgNoFp] 1,73 é tg φ = √3, e não cos φ (FP nunca passa de 1).' } },

    { id: 'z26', h: '4.2', tag: 'Corrente de linha em triângulo desequilibrado', d: 'd', conta: 'Math.hypot(10+5,10*Math.sin(2*Math.PI/3))',
      s: 'Três resistores são ligados em triângulo, como na figura, a uma rede trifásica simétrica de 220 V entre fases. Dado: √3 ≈ 1,73. O módulo da corrente na linha A, em ampères, é, aproximadamente,',
      figSvg: () => dFig('22 Ω', '11 Ω', '22 Ω', '220 V entre fases', 'Três resistores em triângulo entre as linhas A, B e C: 22 ohms entre A e B, 11 ohms entre B e C e 22 ohms entre C e A, alimentados por uma rede trifásica simétrica de 220 volts entre fases.'),
      o: ['5,8', '10', '14,1', '17,3', '20'], a: 3,
      c: 'Cada resistor recebe 220 V: I<sub>AB</sub> = 220/22 = 10 A e I<sub>CA</sub> = 10 A (I<sub>BC</sub> = 20 A não passa pela linha A). I<sub>A</sub> = I<sub>AB</sub> − I<sub>CA</sub>, com defasagem de 120° entre os dois: módulo √3·10 ≈ 17,3 A.',
      w: { A: '[e3zDivRaiz3] 5,8 A é 10/√3: dividiu em vez de multiplicar por √3.', B: '[e3zSemP3] 10 A é a corrente de um só ramo (I<sub>AB</sub>); a linha A recebe a diferença de dois ramos.', C: '[e3zFase90] 14,1 A é 10√2: supôs defasagem de 90° entre I<sub>AB</sub> e I<sub>CA</sub>.', E: '[e3zSomaArit] 20 A é 10 + 10: somou os dois ramos aritmeticamente (20 A é também I<sub>BC</sub>, do resistor de 11 Ω, que não passa pela linha A).' } },
  ],
};

/* Questões extras (nível prova) da estação E2. Revisão independente: ver fontes/ERRATA.md. */
export default {
  erros: {
    afirmErrada2: { n: 'Julgou falsa uma afirmativa verdadeira', d: 'Marcou como errada uma afirmativa que é verdadeira (ou como certa uma falsa), sem refazer o raciocínio da afirmativa.', t: 'detalhe' },
    soUmaParcela: { n: 'Só uma parcela da tensão', d: 'Considerou só a componente CC ou só a CA de uma tensão composta; as potências (ou os quadrados dos valores eficazes) se somam.', t: 'detalhe' },
    vmedPot: { n: 'Potência com o valor médio', d: 'Calculou a potência com o valor médio da tensão (V²/R) em vez do valor eficaz.', t: 'formula' },
    ciclo2x: { n: 'Ciclo de trabalho aplicado duas vezes', d: 'Aplicou o ciclo de trabalho (ou o fator 1/2 da senoide) de novo sobre uma grandeza que já o incluía.', t: 'formula' },
    qSoma: { n: 'Soma de reatâncias em módulo', d: 'Somou R, X<sub>L</sub> e X<sub>C</sub> aritmeticamente, ou trocou a relação X/R pela inversa, no cálculo da corrente e das tensões na ressonância.', t: 'formula' },
    semEscala: { n: 'Reatância não ajustada à frequência', d: 'Usou a reatância medida em 60 Hz sem ajustar à nova frequência, ou ajustou no sentido oposto.', t: 'formula' },
    correnteRamo: { n: 'Correntes de ramo mal combinadas', d: 'Combinou as correntes dos ramos R, L e C aritmeticamente, ou somou IL e IC em vez de subtraí-las (estão em oposição de fase).', t: 'formula' },
    fase120: { n: 'Defasagem de 120° ignorada', d: 'Tratou duas tensões de fase de um sistema trifásico como em fase, em oposição ou defasadas de outro ângulo que não 120°.', t: 'formula' },
  },
  extra: [
    { id: 'y1', h: '2.4', tag: 'Eficaz de tensão CC + CA em resistor', d: 'm', conta: '(30**2+40**2)/10',
      s: 'Um resistor de 10 Ω é submetido à tensão v(t) = 30 + 40√2·sen(ωt) V, composta de uma componente contínua e uma senoidal. A potência média dissipada no resistor, em watts, é',
      o: ['90', '160', '250', '490', '750'], a: 2,
      c: 'A parte CA tem valor eficaz 40 V (pico 40√2). Eficaz total: V² = 30² + 40² = 2.500, então V = 50 V e P = 50²/10 = 250 W. Equivale a somar as potências: 900/10 + 1.600/10 = 90 + 160.',
      w: { A: '[soUmaParcela] 30²/10 = 90 W é só a parcela CC.', B: '[soUmaParcela] 40²/10 = 160 W é só a parcela CA.', D: '[somaArit] Somou os valores (30 + 40 = 70 V) antes de elevar ao quadrado: 70²/10 = 490 W.', E: '[pico] Usou o valor de pico máximo da tensão, 30 + 56,6 = 86,6 V: 86,6²/10 ≈ 750 W.' } },

    { id: 'y2', h: '2.4', tag: 'Retificação de meia onda: potência', d: 'm', conta: '(200/2)**2/20',
      s: 'Uma fonte senoidal de 200 V de pico alimenta, por meio de um diodo ideal, um resistor de 20 Ω (retificação de meia onda). A potência média dissipada no resistor, em watts, é de, aproximadamente,',
      o: ['203', '500', '1.000', '2.000', '8.000'], a: 1,
      c: 'Na meia onda, V<sub>ef</sub> = V<sub>p</sub>/2 = 100 V. P = 100²/20 = 500 W. (Metade da potência de 1.000 W que a senoide completa de 200 V de pico daria.)',
      w: { A: '[vmedPot] Usou o valor médio V<sub>p</sub>/π ≈ 63,7 V: 63,7²/20 ≈ 203 W.', C: '[raiz2] Usou V<sub>p</sub>/√2 = 141 V (senoide completa): 141²/20 = 1.000 W.', D: '[pico] Usou o valor de pico: 200²/20 = 2.000 W.', E: '[pp] Usou o valor pico a pico, 400 V: 400²/20 = 8.000 W.' } },

    { id: 'y3', h: '2.2', tag: 'Tensão no capacitor na ressonância série', d: 'd', conta: '200/20*100',
      s: 'Em um circuito RLC série com R = 20 Ω, L = 0,1 H e C = 10 µF, aplica-se uma tensão senoidal de 200 V (valor eficaz) na frequência de ressonância. A tensão eficaz sobre o capacitor, em volts, é',
      o: ['40', '91', '200', '707', '1.000'], a: 4,
      c: 'ω<sub>0</sub> = 1/√(LC) = 1/√(0,1·10<sup>−5</sup>) = 1.000 rad/s. X<sub>L</sub> = X<sub>C</sub> = 100 Ω, Z = R = 20 Ω e I = 200/20 = 10 A. V<sub>C</sub> = I·X<sub>C</sub> = 1.000 V: cinco vezes a tensão da fonte (Q = X/R = 5).',
      w: { A: '[qSoma] 200·20/100 = 40 V: usou a relação R/X no lugar de X/R.', B: '[qSoma] Somou R + X<sub>L</sub> + X<sub>C</sub> = 220 Ω: I = 0,91 A e V<sub>C</sub> ≈ 91 V.', C: '[semX] 200 V é a tensão da fonte (e do resistor); o capacitor tem tensão maior que a fonte na ressonância.', D: '[raiz2] 1.000/√2 ≈ 707 V: tratou os 200 V eficazes como valor de pico.' } },

    { id: 'y4', h: '2.2', tag: 'Ressonância: afirmativas I, II e III', d: 'd',
      s: 'Sobre circuitos RLC alimentados por fonte senoidal de frequência variável, considere as afirmativas a seguir.<br>I — Num circuito RLC série, acima da frequência de ressonância, predomina a reatância capacitiva, e a corrente fica adiantada em relação à tensão da fonte.<br>II — Num circuito RLC paralelo ideal, na frequência de ressonância, a corrente fornecida pela fonte é mínima.<br>III — Num circuito RLC série em ressonância, as tensões sobre o indutor e sobre o capacitor têm o mesmo módulo e estão em oposição de fase.<br>Está correto APENAS o que se afirma em',
      o: ['I', 'II', 'I e II', 'II e III', 'I, II e III'], a: 3,
      c: 'I é falsa: acima da ressonância X<sub>L</sub> = ωL supera X<sub>C</sub> = 1/(ωC); o circuito é indutivo e a corrente fica atrasada. II é verdadeira: as correntes de L e C se cancelam e a fonte só fornece a do resistor, o mínimo. III é verdadeira: I·X<sub>L</sub> = I·X<sub>C</sub> com defasagem de 180°.',
      w: { A: '[xlxc] Marcou só a I, justamente a falsa: acima da ressonância o circuito é indutivo.', B: '[afirmErrada2] Deixou de fora a III, verdadeira: em ressonância V<sub>L</sub> e V<sub>C</sub> têm igual módulo e se anulam.', C: '[xlxc] Incluiu a I, falsa, e esqueceu a III, verdadeira.', E: '[xlxc] Aceitou a I, mas acima da ressonância a reatância indutiva domina, e a corrente se atrasa.' } },

    { id: 'y5', h: '2.3', tag: 'Corrente total em ramos R, L e C', d: 'm', conta: 'Math.hypot(24,12-5)',
      s: 'Três ramos são ligados em paralelo a uma fonte de 120 V (eficaz), 60 Hz: um resistor de 5 Ω, um indutor com reatância de 10 Ω e um capacitor com reatância de 24 Ω. A corrente eficaz fornecida pela fonte, em ampères, é',
      o: ['24', '25', '29,4', '31', '41'], a: 1,
      c: 'I<sub>R</sub> = 120/5 = 24 A; I<sub>L</sub> = 120/10 = 12 A (atrasada 90°); I<sub>C</sub> = 120/24 = 5 A (adiantada 90°). A parte reativa é 12 − 5 = 7 A. I = √(24² + 7²) = 25 A.',
      w: { A: '[semX] 24 A é só a corrente do resistor; ignorou os ramos reativos.', C: '[correnteRamo] √(24² + (12+5)²) = 29,4 A: somou I<sub>L</sub> e I<sub>C</sub> como se estivessem em fase, mas estão em oposição.', D: '[correnteRamo] 24 + (12 − 5) = 31 A: subtraiu certo os reativos, mas somou aritmeticamente com I<sub>R</sub>.', E: '[somaArit] 24 + 12 + 5 = 41 A: soma aritmética das três correntes.' } },

    { id: 'y6', h: '2.4', tag: 'Tensão pulsada em resistor', d: 'm', conta: '(Math.sqrt(0.25*100**2))**2/25',
      s: 'Uma tensão retangular assume o valor de 100 V durante 25% de cada período e zero no restante. Aplicada a um resistor de 25 Ω, ela dissipa uma potência média, em watts, de',
      o: ['6,25', '25', '50', '100', '400'], a: 3,
      c: 'V<sub>ef</sub>² = (1/T)∫v² dt = 0,25·100² = 2.500, então V<sub>ef</sub> = 50 V. P = 2.500/25 = 100 W. Também: P = 0,25·(100²/25) = 0,25·400.',
      w: { A: '[ciclo2x] Usou o valor médio (25 V) e ainda aplicou o ciclo de trabalho sobre a potência: 0,25·(25²/25) = 6,25 W.', B: '[vmedPot] Usou o valor médio, 25 V: 25²/25 = 25 W.', C: '[ciclo2x] 2.500/(2·25) = 50 W: dividiu por 2 como se fosse senoide.', E: '[pico] 100²/25 = 400 W é a potência durante o pulso, não a média.' } },

    { id: 'y7', h: '2.2', tag: 'Reatância de bobina em 50 Hz', d: 'm', conta: 'Math.hypot(30,48*50/60)',
      s: 'Uma bobina, em série com um resistor de 30 Ω, apresenta reatância de 48 Ω em 60 Hz. O conjunto é levado a uma plataforma onde a rede é de 50 Hz. O módulo da impedância do conjunto em 50 Hz, em ohms, é',
      o: ['50', '56,6', '65', '70', '78'], a: 0,
      c: 'X<sub>L</sub> é proporcional à frequência: X<sub>L</sub> = 48·50/60 = 40 Ω. |Z| = √(30² + 40²) = 50 Ω.',
      w: { B: '[semEscala] √(30² + 48²) = 56,6 Ω: manteve X<sub>L</sub> de 60 Hz.', C: '[semEscala] X<sub>L</sub> = 48·60/50 = 57,6 Ω (razão invertida): √(30² + 57,6²) = 65 Ω.', D: '[somaArit] 30 + 40 = 70 Ω: somou R e X aritmeticamente.', E: '[semEscala] 30 + 48 = 78 Ω: soma aritmética sem corrigir X<sub>L</sub>.' } },

    { id: 'y8', h: '2.3', tag: 'Soma de duas tensões de fase', d: 'd', conta: '127',
      s: 'Um gerador trifásico simétrico tem tensão de fase de 127 V (eficaz) em cada enrolamento. Dois enrolamentos, A e B, são ligados em série, de modo que a tensão resultante é V<sub>A</sub> + V<sub>B</sub> (e não V<sub>A</sub> − V<sub>B</sub>). O valor eficaz da tensão resultante, em volts, é',
      o: ['0', '90', '127', '220', '254'], a: 2,
      c: 'V<sub>A</sub> e V<sub>B</sub> estão defasadas de 120°. Como V<sub>A</sub> + V<sub>B</sub> + V<sub>C</sub> = 0, V<sub>A</sub> + V<sub>B</sub> = −V<sub>C</sub>, de módulo 127 V. (V<sub>A</sub> − V<sub>B</sub> daria 127√3 = 220 V.)',
      w: { A: '[fase120] 0 V só ocorreria se as tensões estivessem em oposição (180°), mas estão a 120°.', B: '[raiz2] 127/√2 ≈ 90 V: tratou 127 V como valor de pico.', D: '[fase120] 220 V é a tensão de linha, V<sub>A</sub> − V<sub>B</sub>, e não a soma pedida.', E: '[somaArit] 127 + 127 = 254 V: soma aritmética de fasores defasados de 120°.' } },
  ],
};

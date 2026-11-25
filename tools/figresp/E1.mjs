/* Figuras de resposta da estação E1 (Circuitos CC). Chave = id da questão em data/questoes.js. Cada valor é o circuito já resolvido. */
import { ladder, ladderC, bridge, stack, side, Canvas, branch, R, V, I, lamp, volt, amp, Z, sw, Vd, Id, W } from './lib.mjs';

export default {
  /* E1.2 */
  'BQ-a-T4-b1-1': ladder({ aria: 'Resistor de 20 ohms ligado a 220 volts, com corrente de 11 ampères e potência de 2.420 watts', src: V('', '220 V', { i: '11 A' }), items: [{ w: R('R', '20 Ω', { u: '220 V', n: ['P = 2.420 W'] }) }] }),
  /* E1.3 */
  'BQ-a-T4-b1-2': stack([
    { title: 'Projeto: 220 V', c: ladderC({ src: V('', '220 V', { i: '25 A' }), items: [{ w: R('R', '8,8 Ω', { n: ['P = 5.500 W'] }) }] }) },
    { title: 'Ligado em 127 V (R não muda)', c: ladderC({ src: V('', '127 V', { i: '14,4 A' }), items: [{ w: R('R', '8,8 Ω', { n: ['P ≈ 1.833 W'] }) }] }) },
  ], 'Chuveiro como resistor de 8,8 ohms: 5.500 watts em 220 volts e cerca de 1.833 watts em 127 volts'),
  /* E1.5: convenção de receptor */
  'BQ-a-T4-b1-4': ladder({ aria: 'Elemento receptor: a corrente entra pelo terminal positivo, então V·I é potência absorvida', src: V('', 'fonte', { i: 'entra no +' }), items: [{ w: Z('receptor', '', { u: 'V (+ em cima)', n: ['P = V·I > 0', 'absorve potência'] }) }] }),
  /* E1.6 */
  'BQ-a-T4-b2-0': ladder({ aria: 'Três resistores de 10, 20 e 30 ohms em série com 120 volts: corrente de 2 ampères e 60 volts sobre o de 30 ohms', src: V('', '120 V', { i: '2 A' }),
    items: [{ s: R('R₁', '10 Ω', { u: '20 V' }) }, { s: R('R₂', '20 Ω', { u: '40 V' }) }, { s: R('R₃', '30 Ω', { u: '60 V' }) }], note: 'Req = 60 Ω → I = 120/60 = 2 A' }),
  /* E1.7 */
  'BQ-a-T4-b2-1': ladder({ aria: 'Três resistores de 6, 3 e 2 ohms em paralelo: resistência equivalente de 1 ohm', src: null,
    items: [{ p: [R('R₁', '6 Ω')] }, { p: [R('R₂', '3 Ω')] }, { p: [R('R₃', '2 Ω')] }, { term: ['a', 'b', 'Req = 1 Ω'] }], note: '1/Req = 1/6 + 1/3 + 1/2 = 1' }),
  /* E1.8 */
  'BQ-a-T4-b2-2': ladder({ aria: 'Fonte de 24 volts, resistor de 4 ohms em série com 12 ohms em paralelo com 6 ohms; corrente de 1 ampère no de 12 ohms', src: V('', '24 V', { i: '3 A' }),
    items: [{ s: R('R₁', '4 Ω', { u: '12 V' }) }, { p: [R('R₂', '12 Ω', { i: '1 A', u: '12 V' })] }, { p: [R('R₃', '6 Ω', { i: '2 A', u: '12 V' })] }], note: 'Req = 4 + (12∥6) = 4 + 4 = 8 Ω → I = 3 A' }),
  /* E1.9 */
  'BQ-a-T4-b2-3': ladder({ aria: 'Fonte de corrente de 30 ampères alimentando 10 e 5 ohms em paralelo: 10 ampères no de 10 ohms e 20 no de 5 ohms', src: I('', '30 A', { rev: true }),
    items: [{ p: [R('R₁', '10 Ω', { i: '10 A', u: '100 V' })] }, { p: [R('R₂', '5 Ω', { i: '20 A', u: '100 V' })] }], note: 'divisor de corrente: I₁ = 30·5/(10+5) = 10 A' }),
  /* E1.10: ponte de Wheatstone equilibrada */
  'BQ-a-T4-b2-4': bridge({ aria: 'Ponte de Wheatstone equilibrada: R1 de 100 ohms e Rx opostos, R2 de 200 e R3 de 150 ohms opostos; Rx vale 300 ohms', src: V('', 'E'),
    left: [R('R₁', '100 Ω'), R('R₃', '150 Ω')], right: [R('R₂', '200 Ω'), R('Rₓ', '300 Ω', { ls: 'r' })], mid: { t: 'amp', l: 'detector', u: '0 V', i: '0 A' }, note: 'equilíbrio: R₁·Rₓ = R₂·R₃ → Rₓ = 200·150/100 = 300 Ω' }),
  /* E1.11 */
  'BQ-a-T4-b3-0': stack([
    { title: 'Ensaio 1: 1 A → 24,5 V', c: ladderC({ src: V('E', '25 V', { i: '1 A' }), items: [{ s: R('r', '0,5 Ω', { u: '0,5 V' }) }, { w: Z('carga', '', { u: '24,5 V' }) }] }) },
    { title: 'Ensaio 2: 3 A → 23,5 V', c: ladderC({ src: V('E', '25 V', { i: '3 A' }), items: [{ s: R('r', '0,5 Ω', { u: '1,5 V' }) }, { w: Z('carga', '', { u: '23,5 V' }) }] }) },
  ], 'Bateria de fem 25 volts e resistência interna 0,5 ohm nos dois ensaios'),
  /* E1.12 */
  'BQ-a-T4-b3-1': ladder({ aria: 'Bateria de 12 volts com resistência interna de 0,05 ohm em curto-circuito: corrente de 240 ampères', src: V('E', '12 V', { i: '240 A' }),
    items: [{ s: R('r', '0,05 Ω', { u: '12 V' }) }, { w: W('curto', '', { n: ['U = 0 V'] }) }], note: 'Icc = E/r = 12/0,05 = 240 A' }),
  /* E1.13 */
  'BQ-a-T4-b3-2': ladder({ aria: 'Fonte de 24 volts com resistência interna de 2 ohms alimentando carga de 10 ohms: 2 ampères e 20 volts nos terminais', src: V('E', '24 V', { i: '2 A' }),
    items: [{ s: R('r', '2 Ω', { u: '4 V' }) }, { w: R('carga', '10 Ω', { u: '20 V' }) }], note: 'I = 24/(2+10) = 2 A · V = 24 − 2·2 = 20 V' }),
  /* E1.14 */
  'BQ-a-T4-b3-3': ladder({ aria: 'Duas baterias idênticas em paralelo: a tensão é a de uma só e a resistência interna cai pela metade', src: null,
    items: [{ p: [V('E', '12 V'), R('r', '')] }, { p: [V('E', '12 V'), R('r', '')] }, { term: ['a', 'b', 'E · r/2'] }], note: 'em paralelo: fem = E, resistência interna = r/2' }),
  /* E1.15 */
  'BQ-a-T4-b3-4': ladder({ aria: 'Amperímetro em série com a carga e voltímetro em paralelo com a carga', src: V('', 'E'),
    items: [{ s: amp('amperímetro', '', { n: ['em série', 'R ≈ 0'] }) }, { p: [R('carga', 'R')] }, { p: [volt('voltímetro', '', { n: ['em paralelo', 'R muito alta'] })] }] }),
  /* E1.16 */
  'BQ-a-T4-b3-5': ladder({ aria: 'Dois resistores de 100 quilo-ohms em série com 20 volts e voltímetro de 100 quilo-ohms sobre o segundo: leitura de 6,67 volts', src: V('', '20 V', { i: '0,133 mA' }),
    items: [{ s: R('R₁', '100 kΩ', { u: '13,3 V' }) }, { p: [R('R₂', '100 kΩ', { u: '6,67 V' })] }, { p: [volt('Rᵥ', '100 kΩ', { u: '6,67 V', n: ['lê 6,67 V'] })] }], note: '100 kΩ ∥ 100 kΩ = 50 kΩ → 20·50/150 ≈ 6,67 V' }),
  /* E1.17: nó */
  'BQ-a-T4-b4-0': (() => {
    const c = new Canvas(), X = 0, Y = 0;
    c.wire([[X - 110, Y - 60], [X, Y]]); c.wire([[X - 110, Y + 60], [X, Y]]); c.wire([[X, Y], [X + 110, Y - 60]]); c.wire([[X, Y], [X + 110, Y + 60]]);
    c.dot(X, Y);
    c.arrow(X - 55, Y - 30, 28.6, 's-f-pa'); c.arrow(X - 55, Y + 30, -28.6, 's-f-pa');
    c.arrow(X + 55, Y - 30, -28.6, 's-f-pa'); c.arrow(X + 55, Y + 30, 28.6, 's-f-pa');
    c.text(X - 118, Y - 66, '5 A (entra)', 's-fa', 'end'); c.text(X - 118, Y + 74, '3 A (entra)', 's-fa', 'end');
    c.text(X + 118, Y - 66, '2 A (sai)', 's-fa', 'start'); c.text(X + 118, Y + 74, 'I = 6 A (sai)', 's-fb', 'start');
    c.text(X, Y + 110, 'LKC: 5 + 3 = 2 + I → I = 6 A', 's-tm');
    return c.svg('Nó com correntes de 5 e 3 ampères entrando e de 2 e 6 ampères saindo');
  })(),
  /* E1.18 */
  'BQ-a-T4-b4-1': ladder({ aria: 'Fonte de 24 volts com três resistores em série, com quedas de 8, 10 e 6 volts', src: V('', '24 V'),
    items: [{ s: R('R₁', '', { u: '8 V' }) }, { s: R('R₂', '', { u: '10 V' }) }, { s: R('R₃', '', { u: '6 V' }) }], note: 'LKT: 24 = 8 + 10 + V₃ → V₃ = 6 V' }),
  /* E1.19 */
  'BQ-a-T4-b4-3': ladder({ aria: 'Fonte de 10 volts com 2 ohms alimentando o nó N, com resistor de 4 ohms e fonte de corrente dependente de 0,5 i1; tensão no nó de 5 volts', src: V('', '10 V', { i: '2,5 A' }),
    items: [{ s: R('', '2 Ω', { i: 'i₁ = 2,5 A', u: '5 V' }), }, { p: [R('', '4 Ω', { i: '1,25 A', u: '5 V' })], n: 'N' }, { p: [Id('', '0,5·i₁', { n: ['= 1,25 A'], rev: false })] }], note: 'LKC no nó: i₁ = V/4 + 0,5·i₁ e i₁ = (10 − V)/2 → V = 5 V' }),
  /* E1.21 */
  'BQ-a-T4-b5-0': stack([
    { title: 'Tensão nos terminais do R de 20 Ω (sem carga adicional): divisor 30·20/30 = 20 V', c: ladderC({ src: V('', '30 V', { i: '1 A' }), items: [{ s: R('', '10 Ω', { u: '10 V' }) }, { p: [R('', '20 Ω', { u: '20 V' })] }, { term: ['a', 'b', 'Vth = 20 V'] }] }) },
    { title: 'Fonte de tensão em curto: 10 Ω em paralelo com 20 Ω', c: ladderC({ src: null, items: [{ p: [R('', '10 Ω')] }, { p: [R('', '20 Ω')] }, { term: ['a', 'b', 'Rth = 200/30 ≈ 6,67 Ω'] }] }) },
    { title: 'Equivalente de Thévenin', c: ladderC({ src: V('Vth', '20 V'), items: [{ s: R('Rth', '6,67 Ω') }, { term: ['a', 'b', ''] }] }) },
  ], 'Divisor com 10 ohms e 20 ohms e seu equivalente de Thévenin de 20 volts e 6,67 ohms'),
  /* E1.22 */
  'BQ-a-T4-b5-1': stack([
    { title: 'Circuito original', c: ladderC({ src: I('', '2 A'), items: [{ p: [R('', '10 Ω', { u: '20 V' })] }, { s: R('', '5 Ω', { u: '0 V' }) }, { term: ['a', 'b', 'Vth = 20 V'] }] }) },
    { title: 'Fonte de corrente zerada = aberta', c: ladderC({ src: null, items: [{ p: [R('', '10 Ω')] }, { s: R('', '5 Ω') }, { term: ['a', 'b', 'Rth = 10 + 5 = 15 Ω'] }] }) },
    { title: 'Equivalente de Thévenin', c: ladderC({ src: V('Vth', '20 V'), items: [{ s: R('Rth', '15 Ω') }, { term: ['a', 'b', ''] }] }) },
  ], 'Fonte de corrente de 2 ampères com 10 ohms em paralelo e 5 ohms em série: Thévenin de 20 volts e 15 ohms'),
  /* E1.23 */
  'BQ-a-T4-b5-2': side([
    { title: 'Thévenin', c: ladderC({ src: V('Vth', '12 V'), items: [{ s: R('Rth', '4 Ω') }, { term: ['a', 'b', ''] }] }) },
    { title: 'Norton', c: ladderC({ src: I('IN', '3 A'), items: [{ p: [R('RN', '4 Ω')] }, { term: ['a', 'b', ''] }] }) },
  ], 'Equivalente de Thévenin de 12 volts e 4 ohms e seu equivalente de Norton de 3 ampères em paralelo com 4 ohms', 30),
  /* E1.24 */
  'BQ-a-T4-b5-3': ladder({ aria: 'Thévenin de 8 volts e 4 ohms com carga de 12 ohms: corrente de 0,5 ampère', src: V('Vth', '8 V', { i: '0,5 A' }),
    items: [{ s: R('Rth', '4 Ω', { u: '2 V' }) }, { w: R('carga', '12 Ω', { u: '6 V' }) }], note: 'I = 8/(4+12) = 0,5 A' }),
  /* E1.25 */
  'BQ-a-T4-b5-4': ladder({ aria: 'Thévenin de 20 volts e 5 ohms com carga de 5 ohms: 2 ampères e 20 watts na carga', src: V('Vth', '20 V', { i: '2 A' }),
    items: [{ s: R('Rth', '5 Ω', { u: '10 V' }) }, { w: R('RL', '5 Ω', { u: '10 V', n: ['P = 20 W'] }) }], note: 'RL = Rth → Pmáx = Vth²/(4·Rth) = 400/20 = 20 W' }),
  /* E1.27 */
  'BQ-a-T4-b5-6': ladder({ aria: 'Máxima transferência de potência: carga igual à resistência de Thévenin, que recebe metade da potência da fonte', src: V('Vth', '', { i: 'I' }),
    items: [{ s: R('Rth', '', { n: ['dissipa P'] }) }, { w: R('RL', 'Rth', { n: ['recebe P (50 %)'] }) }], note: 'rendimento de 50 %: serve para casamento de impedâncias, não para potência' }),
  /* E1.28 */
  'BQ-f-t4-1': ladder({ aria: 'Lâmpadas de 60 e 100 watts em série com 127 volts: 269 e 161 ohms; 79 volts na de 60 watts e 48 volts na de 100 watts', src: V('', '127 V', { i: '0,295 A' }),
    items: [{ s: lamp('60 W', '269 Ω', { u: '79,4 V', n: ['P = 23,4 W'] }) }, { s: lamp('100 W', '161 Ω', { u: '47,6 V', n: ['P = 14,1 W'] }) }], note: 'R = V²/P · mesma corrente: maior R, maior P = R·I²' }),
  /* E1.29 */
  'BQ-f-t4-2': ladder({ aria: 'Três lâmpadas em paralelo com a fonte: uma com filamento aberto; as outras continuam com a tensão da fonte', src: V('', 'E'),
    items: [{ p: [lamp('L₁', '', { u: 'E', n: ['acesa'] })] }, { p: [lamp('L₂', '', { u: 'E', n: ['acesa'] })] }, { p: [sw('L₃', '', { n: ['filamento', 'aberto'] })] }] }),
  /* E1.30 */
  'BQ-f-t4-3': side([
    { title: 'Thévenin', c: ladderC({ src: V('Vth', ''), items: [{ s: R('Rth', '') }, { term: ['a', 'b', ''] }] }) },
    { title: 'Norton', c: ladderC({ src: I('IN', 'Vth/Rth'), items: [{ p: [R('RN', '= Rth')] }, { term: ['a', 'b', ''] }] }) },
  ], 'Thévenin e Norton equivalentes: mesmos terminais a e b; RN igual a Rth e IN igual a Vth sobre Rth', 30),
  /* E1.33 */
  'BQ-f-t4-6': ladder({ aria: 'Divisor de tensão com voltímetro de resistência baixa em paralelo com o resistor de valor alto: a leitura cai', src: V('', 'E'),
    items: [{ s: R('R₁', '') }, { p: [R('R₂', 'alto', { n: ['sem medir: a tensão real'] })] }, { p: [volt('Rᵥ', 'baixa', { n: ['lê menos que a real'] })] }], note: 'R₂ ∥ Rᵥ < R₂: a parcela de tensão do trecho diminui' }),
  /* E1.34 */
  'BQ-e-E1-y1': ladder({ aria: 'Fonte de 36 volts, 12 ohms até o nó N, 6 ohms de N à referência, 2 ohms até o terminal a e carga de 6 ohms: 1 ampère na carga', src: V('', '36 V', { i: '2,33 A' }),
    items: [{ s: R('', '12 Ω', { u: '28 V' }) }, { p: [R('', '6 Ω', { i: '1,33 A', u: '8 V' })], n: 'N' }, { s: R('', '2 Ω', { i: '1 A', u: '2 V' }) }, { p: [R('carga', '6 Ω', { i: '1 A', u: '6 V' })], n: 'a' }], note: 'VN = 8 V → I = 8/(2+6) = 1 A' }),
  /* E1.35 */
  'BQ-e-E1-y2': ladder({ aria: 'Equivalente de Thévenin de 40 volts e 10 ohms com carga de 10 ohms: 40 watts de potência máxima', src: V('Vth', '40 V', { i: '2 A' }),
    items: [{ s: R('Rth', '10 Ω', { u: '20 V' }) }, { w: R('RL', '10 Ω', { u: '20 V', n: ['P = 40 W'] }) }], note: 'Rth = 10 Ω, Vth = 40 V → Pmáx = 40²/(4·10) = 40 W' }),
  /* E1.36 */
  'BQ-e-E1-y3': ladder({ aria: 'Baterias de 24 volts com 2 ohms e de 12 volts com 4 ohms em paralelo com resistor de 4 ohms: tensão de 15 volts, 4,5 ampères na primeira bateria', src: null, ref: false, bl: 'M',
    items: [{ p: [V('', '24 V'), R('r₁', '2 Ω', { i: '4,5 A', u: '9 V', dir: -1 })], n: 'N' }, { p: [V('', '12 V'), R('r₂', '4 Ω', { i: '0,75 A', u: '3 V' })] }, { p: [R('R', '4 Ω', { i: '3,75 A', u: '15 V' })] }], note: 'VNM = 15 V · a bateria de 12 V recebe corrente (15 V > 12 V)' }),
  /* E1.37 */
  'BQ-e-E1-y4': bridge({ aria: 'Fonte de 12 volts com duas séries em paralelo, 100 e 200 ohms e 300 e 100 ohms; voltímetro entre os pontos médios lê 5 volts', src: V('', '12 V'),
    left: [R('', '100 Ω', { u: '4 V' }), R('', '200 Ω', { u: '8 V' })], right: [R('', '300 Ω', { u: '9 V' }), R('', '100 Ω', { u: '3 V' })], mid: { t: 'volt', u: '5 V', l: 'voltímetro' }, note: '8 V − 3 V = 5 V' }),
  /* E1.38 */
  'BQ-e-E1-y5': ladder({ aria: 'Fonte de 110 volts, cabos com 2 ohms ao todo e carga de 20 ohms: 5 ampères e 500 watts na carga', src: V('', '110 V', { i: '5 A' }),
    items: [{ s: R('cabos', '2 Ω', { u: '10 V', n: ['ida + volta'] }) }, { w: R('carga', '20 Ω', { u: '100 V', n: ['P = 500 W'] }) }], note: 'R cabos = 0,02·100/1 = 2 Ω · I = 110/22 = 5 A' }),
  /* E1.39 */
  'BQ-e-E1-y6': stack([
    { title: 'Frio (20 °C)', c: ladderC({ src: V('', '60 V', { i: '6 A' }), items: [{ w: R('enrolamento', '10 Ω') }] }) },
    { title: 'Quente (T = 70 °C)', c: ladderC({ src: V('', '60 V', { i: '5 A' }), items: [{ w: R('enrolamento', '12 Ω') }] }) },
  ], 'Enrolamento de motor ligado a 60 volts: 10 ohms e 6 ampères a frio, 12 ohms e 5 ampères a quente'),
  /* E1.40 */
  'BQ-e-E1-y7': ladder({ aria: 'Fonte de 12 volts com 4 ohms ligada ao nó N, resistor de 6 ohms e fonte de corrente de 3 ampères injetando no nó; tensão no nó de 14,4 volts', src: V('', '12 V', { i: '0,6 A', dir: -1 }),
    items: [{ s: R('', '4 Ω', { i: '0,6 A', u: '2,4 V', dir: -1 }) }, { p: [R('', '6 Ω', { i: '2,4 A', u: '14,4 V' })], n: 'N' }, { p: [I('', '3 A', { rev: true })] }], note: 'LKC em N: 0,6 (recebido pela fonte) + 2,4 = 3 A injetados' }),
  /* E1.42 */
  'BQ-e-E1-y9': ladder({ aria: 'Fonte de 48 volts, 6 ohms em série com 12 ohms em paralelo com 4 mais 8 ohms: 2 ampères no de 8 ohms', src: V('', '48 V', { i: '4 A' }),
    items: [{ s: R('', '6 Ω', { u: '24 V' }) }, { p: [R('', '12 Ω', { i: '2 A', u: '24 V' })] }, { p: [R('', '4 Ω', { i: '2 A', u: '8 V' }), R('', '8 Ω', { i: '2 A', u: '16 V' })] }], note: '12 ∥ (4+8) = 6 Ω · Req = 12 Ω · I = 4 A' }),
  /* E1.26: caixa preta, dois ensaios */
  'BQ-a-T4-b5-5': (() => {
    const caixa = (c, volt_, el) => {
      c.raw('<rect class="s-comp" x="0" y="0" width="130" height="110"/>');
      c.grow(0, 0); c.grow(130, 110);
      c.text(65, 50, 'rede linear', 's-ts'); c.text(65, 68, 'com fontes', 's-tm'); c.text(65, 84, 'dependentes', 's-tm');
      c.wire([[130, 25], [190, 25]]); c.wire([[130, 85], [190, 85]]);
      c.wire([[190, 25], [190, 41]]); c.wire([[190, 69], [190, 85]]); c.sym(el, 190, 55, 90);
      c.dot(190, 25); c.dot(190, 85); c.text(122, 22, 'a', 's-ts', 'end'); c.text(122, 90, 'b', 's-ts', 'end');
      c.text(210, 50, el.l, 's-ts', 'start'); c.text(210, 68, el.u ? `lê ${el.u}` : `lê ${el.i}`, el.u ? 's-fb' : 's-fa', 'start');
    };
    const a = new Canvas(), b = new Canvas();
    caixa(a, true, { t: 'volt', l: 'em aberto', u: '12 V' });
    caixa(b, false, { t: 'amp', l: 'em curto', i: '4 A' });
    return side([{ title: 'Ensaio 1: terminais abertos', c: a }, { title: 'Ensaio 2: terminais em curto', c: b }], 'Rede com fontes dependentes: 12 volts em aberto e 4 ampères em curto, logo Rth = 3 ohms', 50)
      ;
  })(),
  /* E1.43: triângulo de 30 Ω com fonte entre A e B */
  'BQ-e-E1-y10': (() => {
    const c = new Canvas(), T = 0, B = 180, A = [330, T], Bn = [330, B], Cn = [480, 90];
    c.wire([[70, T], [70, 62]]); c.wire([[70, 118], [70, B]]); c.sym(V('', '60 V', { i: '2 A' }), 70, 90, 90); c.label(V('', '60 V', { i: '2 A' }), 70, 90, true, 'l');
    c.arrow(70, 46, -90, 's-f-pa');
    branch(c, [70, T], A, R('R', '10 Ω', { u: '20 V' }), -1);
    c.wire([[70, B], Bn]);
    branch(c, A, Bn, R('AB', '30 Ω', { i: '1,33 A', u: '40 V' }), 1);
    branch(c, A, Cn, R('AC', '30 Ω', { i: '0,67 A', u: '20 V' }), -1);
    branch(c, Cn, Bn, R('CB', '30 Ω', { i: '0,67 A', u: '20 V' }), -1);
    c.dot(70, T); c.dot(70, B); c.dot(A[0], A[1]); c.dot(Bn[0], Bn[1]); c.open(Cn[0], Cn[1]);
    c.text(A[0] - 8, A[1] - 12, 'A', 's-ts', 'end'); c.text(Bn[0] - 8, Bn[1] + 22, 'B', 's-ts', 'end'); c.text(Cn[0] + 12, Cn[1] + 4, 'C (sem ligação)', 's-tm', 'start');
    c.text(40, B + 56, 'AB ∥ (AC+CB) = 30 ∥ 60 = 20 Ω · Req = 10 + 20 = 30 Ω · I = 2 A', 's-tm', 'start');
    return c.svg('Fonte de 60 volts com 10 ohms em série ligada aos vértices A e B de um triângulo de 30 ohms: 20 ohms equivalentes e corrente de 2 ampères');
  })(),
};

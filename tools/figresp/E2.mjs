/* Figuras de resposta da estação E2 (CA, fasores, impedância). Chave = id da questão. */
import { ladder, ladderC, stack, side, R, L, C, V, AC, D, Z, amp, volt } from './lib.mjs';

export default {
  /* E2.3 */
  'BQ-a-T1-b1-2': ladder({ aria: 'Carga alimentada em corrente alternada com tensão 100 sen(ωt + 40°) e corrente 5 sen(ωt − 20°): tensão adiantada 60°, carga indutiva', src: AC('v', '100·sen(ωt + 40°)'),
    items: [{ w: Z('carga', '', { i: '5·sen(ωt − 20°)', n: ['φ = 40° − (−20°) = 60°', 'tensão adiantada: indutiva'] }) }] }),
  /* E2.10 */
  'BQ-a-T1-b2-4': ladder({ aria: 'Resistor de 10 ohms com fonte senoidal de pico 141,4 volts: 100 volts eficazes, 10 ampères e 1.000 watts', src: AC('', '141,4 V pico', { n: ['100 V eficaz'], i: '10 A ef.' }),
    items: [{ w: R('R', '10 Ω', { u: '100 V', n: ['P = 1.000 W'] }) }], note: 'P = Vef²/R = 100²/10 = 1.000 W' }),
  /* E2.13 */
  'BQ-a-T1-b3-2': ladder({ aria: 'Duas cargas em paralelo com correntes 3∠0° e 4∠90° ampères: o amperímetro da alimentação indica 5 ampères', src: AC('', ''),
    items: [{ s: amp('A', '', { i: '5 A', n: ['3 + j4 = 5∠53,13°'] }) }, { p: [Z('carga 1', '', { i: '3∠0° A' })] }, { p: [Z('carga 2', '', { i: '4∠90° A' })] }], note: 'LKC fasorial: I = 3 + j4 → |I| = 5 A' }),
  /* E2.18 */
  'BQ-a-T1-b4-2': ladder({ aria: 'Circuito RL série com 30 ohms e reatância de 40 ohms em 100 volts: corrente de 2 ampères, 60 volts no resistor e 80 volts no indutor', src: AC('', '100 V', { i: '2 A' }),
    items: [{ s: R('R', '30 Ω', { u: '60 V' }) }, { s: L('XL', '40 Ω', { u: '80 V' }) }], note: '|Z| = √(30² + 40²) = 50 Ω · I = 100/50 = 2 A' }),
  /* E2.19 */
  'BQ-a-T1-b4-3': ladder({ aria: 'Circuito RLC série em ressonância com 10 ohms e reatâncias de 30 ohms em 50 volts: 5 ampères e 150 volts no indutor', src: AC('', '50 V', { i: '5 A' }),
    items: [{ s: R('R', '10 Ω', { u: '50 V' }) }, { s: L('XL', '30 Ω', { u: '150 V' }) }, { s: C('XC', '30 Ω', { u: '150 V' }) }], note: 'XL = XC → Z = R = 10 Ω · VL = 5·30 = 150 V (VL e VC em oposição)' }),
  /* E2.21 */
  'BQ-a-T1-b4-5': ladder({ aria: 'Circuito LC série com 10 milihenrys e 10 microfarads: ressonância em 503 hertz', src: AC('', 'f₀ ≈ 503 Hz'),
    items: [{ s: L('L', '10 mH') }, { s: C('C', '10 µF') }], note: 'f₀ = 1/(2π√LC) = 1/(2π·√(10⁻⁷)) ≈ 503 Hz' }),
  /* E2.25 */
  'BQ-e-E2-y1': ladder({ aria: 'Resistor de 10 ohms com fonte contínua de 30 volts em série com fonte alternada de 40 volts eficazes: 50 volts eficazes e 250 watts', src: AC('', '40 V ef.', { n: ['(40√2 pico)'] }),
    items: [{ s: V('', '30 V CC') }, { w: R('R', '10 Ω', { u: '50 V ef.', n: ['P = 250 W'] }) }], note: 'V² = 30² + 40² = 2.500 → V = 50 V · P = 50²/10 = 250 W' }),
  /* E2.26 */
  'BQ-e-E2-y2': ladder({ aria: 'Fonte senoidal de 200 volts de pico com diodo ideal e resistor de 20 ohms: retificação de meia onda e 500 watts', src: AC('', '200 V pico'),
    items: [{ s: D('diodo', 'ideal') }, { w: R('R', '20 Ω', { u: '100 V ef.', n: ['P = 500 W'] }) }], note: 'meia onda: Vef = Vp/2 = 100 V → P = 100²/20 = 500 W' }),
  /* E2.27 */
  'BQ-e-E2-y3': ladder({ aria: 'RLC série em ressonância: 20 ohms, 0,1 henry e 10 microfarads em 200 volts; 10 ampères e 1.000 volts no capacitor', src: AC('', '200 V', { i: '10 A' }),
    items: [{ s: R('R', '20 Ω', { u: '200 V' }) }, { s: L('L', '0,1 H', { n: ['XL = 100 Ω'], u: '1.000 V' }) }, { s: C('C', '10 µF', { n: ['XC = 100 Ω'], u: '1.000 V' }) }], note: 'ω₀ = 1/√(LC) = 1.000 rad/s · I = 200/20 = 10 A · VC = 10·100 = 1.000 V' }),
  /* E2.29 */
  'BQ-e-E2-y5': ladder({ aria: 'Fonte de 120 volts com resistor de 5 ohms, reatância indutiva de 10 ohms e capacitiva de 24 ohms em paralelo: 24, 12 e 5 ampères e corrente total de 25 ampères', src: AC('', '120 V', { i: '25 A' }),
    items: [{ p: [R('R', '5 Ω', { i: '24 A' })] }, { p: [L('XL', '10 Ω', { i: '12 A', n: ['atrasada 90°'] })] }, { p: [C('XC', '24 Ω', { i: '5 A', n: ['adiantada 90°'] })] }], note: 'I = √(24² + (12 − 5)²) = √(576 + 49) = 25 A' }),
  /* E2.31 */
  'BQ-e-E2-y7': ladder({ aria: 'Bobina em série com 30 ohms: em 50 hertz a reatância cai para 40 ohms e a impedância vale 50 ohms', src: AC('', '50 Hz'),
    items: [{ s: R('R', '30 Ω') }, { s: L('XL', '40 Ω', { n: ['48·50/60'] }) }], note: '|Z| = √(30² + 40²) = 50 Ω' }),
  /* E2.32 */
  'BQ-e-E2-y8': ladder({ aria: 'Dois enrolamentos de 127 volts defasados de 120 graus ligados em série: tensão resultante de 127 volts', src: AC('VA', '127 V ∠0°'),
    items: [{ s: AC('VB', '127 V ∠−120°') }, { term: ['a', 'b', '|VA + VB| = 127 V'] }], note: 'VA + VB = −VC → módulo 127 V (VA − VB daria 220 V)' }),
};

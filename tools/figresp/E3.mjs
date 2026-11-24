/* Figuras de resposta da estação E3 (potência, fator de potência, trifásicos, medidor, dois wattímetros). Chave = id da questão. */
import { ladder, ladderC, stack, side, threePhase, threePhaseC, twoWatt, Canvas, branch, R, L, C, V, AC, M, Z, amp, volt, wat, sw } from './lib.mjs';

export default {
  /* E3.2 */
  'BQ-a-T1-b5-1': ladder({ aria: 'Motor monofásico de 220 volts e 10 ampères com fator de potência 0,8: 2.200 volt-ampères, 1.760 watts e 1.320 var', src: AC('', '220 V', { i: '10 A' }),
    items: [{ w: M('motor', '', { n: ['FP = 0,8 indutivo', 'S = 2.200 VA', 'P = 1.760 W', 'Q = 1.320 var'] }) }] }),
  /* E3.3 */
  'BQ-a-T1-b5-2': ladder({ aria: 'Carga de 40 quilowatts com fator de potência 0,8 e banco de capacitores de 30 kvar em paralelo: reativo líquido nulo e fator de potência 1', src: AC('', ''),
    items: [{ p: [Z('carga', '40 kW', { n: ['FP 0,8 ind.', 'Q = 30 kvar'] })] }, { p: [C('banco', '30 kvar', { n: ['capacitivo'] })] }], note: 'Qc = 40·(tg φ₁ − tg φ₂) = 40·(0,75 − 0) = 30 kvar → FP = 1' }),
  /* E3.4 */
  'BQ-a-T1-b5-3': ladder({ aria: 'Carga indutiva com banco de capacitores em paralelo: o banco fornece o reativo, a corrente da fonte cai e a potência ativa não muda', src: AC('', '', { n: ['I da fonte cai', 'P não muda'] }),
    items: [{ p: [Z('carga indutiva', '', { n: ['P e Q (ind.)'] })] }, { p: [C('banco', '', { n: ['fornece Q'] })] }], note: 'S = √(P² + Q²): Q menor → S menor → I menor' }),
  /* E3.5 */
  'BQ-a-T1-b5-4': ladder({ aria: 'Carga série com 8 ohms e reatância de 6 ohms em 100 volts: 10 ampères e 800 watts', src: AC('', '100 V', { i: '10 A' }),
    items: [{ s: R('R', '8 Ω', { u: '80 V', n: ['P = 800 W'] }) }, { s: L('XL', '6 Ω', { u: '60 V', n: ['Q = 600 var'] }) }], note: '|Z| = 10 Ω · I = 10 A · P = I²R = 100·8 = 800 W' }),
  /* E3.6 */
  'BQ-a-T1-b6-0': threePhase({ load: 'Y', Z: [R('R', '12,7 Ω', { u: '127 V', i: '10 A' }), R('R', '12,7 Ω', { u: '127 V', i: '10 A' }), R('R', '12,7 Ω', { u: '127 V', i: '10 A' })], vl: 'rede 220 V (linha)', Il: ['10 A', '10 A', '10 A'], note: 'estrela: VF = 220/√3 ≈ 127 V · IL = IF = 127/12,7 = 10 A' },
    'Carga trifásica em estrela com 12,7 ohms por fase em rede de 220 volts: 127 volts por fase e 10 ampères de corrente de linha'),
  /* E3.7 */
  'BQ-a-T1-b6-2': threePhase({ load: 'M', Z: [M('motor', '', { n: ['FP = 0,85', 'P ≈ 11,2 kW'] })], vl: 'rede 380 V (linha)', Il: ['20 A', '20 A', '20 A'], note: 'P = √3·V·I·cos φ = 1,73·380·20·0,85 ≈ 11,2 kW' },
    'Motor trifásico em rede de 380 volts com 20 ampères e fator de potência 0,85: 11,2 quilowatts'),
  /* E3.8 */
  'BQ-a-T1-b6-3': threePhase({ load: 'Y', Z: [Z('enrol.', '220 V', { u: '220 V' }), Z('enrol.', '220 V', { u: '220 V' }), Z('enrol.', '220 V', { u: '220 V' })], vl: 'rede 380 V (linha)', note: 'motor 220/380 V em 380 V → estrela: cada enrolamento recebe 380/√3 ≈ 220 V' },
    'Motor de enrolamentos de 220 volts ligado em estrela a uma rede de 380 volts: cada enrolamento recebe 220 volts'),
  /* E3.9 */
  'BQ-a-T1-b6-4': threePhase({ load: 'Y', Z: [Z('Z', '16 + j12 Ω', { u: '200 V', i: '10 A' }), Z('Z', '16 + j12 Ω', { u: '200 V', i: '10 A' }), Z('Z', '16 + j12 Ω', { u: '200 V', i: '10 A' })], vl: 'rede 200√3 V ≈ 346 V (linha)', note: 'IF = 200/20 = 10 A · P = 3·10²·16 = 4.800 W' },
    'Carga trifásica em estrela com 16 mais j12 ohms por fase em rede de 346 volts: 200 volts por fase, 10 ampères e 4.800 watts'),
  /* E3.11 */
  'BQ-a-T1-b6-6': stack([
    { title: 'Triângulo: 60 Ω por fase', c: threePhaseC({ load: 'D', Z: [R('', '60 Ω'), R('', '60 Ω'), R('', '60 Ω')] }) },
    { title: 'Estrela equivalente: 60/3 = 20 Ω por fase', c: threePhaseC({ load: 'Y', Z: [R('', '20 Ω'), R('', '20 Ω'), R('', '20 Ω')] }) },
  ], 'Triângulo de 60 ohms por fase e estrela equivalente de 20 ohms por fase'),
  /* E3.12 */
  'BQ-a-T1-b6-7': threePhase({ load: 'Y', Z: [Z('Z', ''), Z('Z', ''), Z('Z', '')], neutral: { i: '0 (carga equilibrada)' }, note: 'equilibrado: IA + IB + IC = 0 → neutro sem corrente · neutro rompido sob desequilíbrio: sobretensão nas fases leves' },
    'Carga trifásica equilibrada em estrela com neutro: a corrente no neutro é nula'),
  /* E3.13 */
  'BQ-f-t1-2': ladder({ aria: 'Capacitor ideal em corrente alternada: corrente adiantada 90 graus, potência ativa nula', src: AC('', ''), items: [{ w: C('C', 'ideal', { n: ['i adiantada 90°', 'P = 0', 'só reativa'] }) }] }),
  /* E3.16 */
  'BQ-f-t1-7': threePhase({ load: 'D', Z: [Z('ZAB', '', { i: 'IF' }), Z('ZBC', ''), Z('ZCA', '')], Il: ['√3·IF ∠−30°', '', ''], note: 'I_A = I_AB − I_CA: módulo √3·IF, atrasada 30° (sequência ABC)' },
    'Carga equilibrada em triângulo: a corrente de linha IA tem módulo raiz de 3 vezes a de fase e está atrasada 30 graus'),
  /* E3.24 */
  'BQ-e-C1-x6': ladder({ aria: 'Carga monofásica de 4,4 quilowatts em 220 volts com fator de potência 0,8: 25 ampères', src: AC('', '220 V', { i: '25 A' }),
    items: [{ w: Z('carga', '4,4 kW', { n: ['FP = 0,8 ind.'] }) }], note: 'I = P/(V·cos φ) = 4.400/(220·0,8) = 25 A' }),
  /* E3.25 */
  'BQ-e-E3-y1': ladder({ aria: 'Barramento de 440 volts com carga A de 50 quilovolt-ampères, carga B de 25 e banco de capacitores de 27,5 kvar: fator de potência 0,96', src: AC('', '440 V', { n: ['trifásico'] }),
    items: [{ p: [Z('carga A', '50 kVA', { n: ['40 kW', '30 kvar'] })] }, { p: [Z('carga B', '25 kVA', { n: ['20 kW', '15 kvar'] })] }, { p: [C('banco', '27,5 kvar')] }], note: 'P = 60 kW · Q = 45 − 27,5 = 17,5 kvar → FP = 0,96' }),
  /* E3.26 */
  'BQ-e-E3-y2': stack([
    { title: 'Triângulo: IF = 5 A · P = 2.250 W', c: threePhaseC({ load: 'D', Z: [Z('Z', '30 + j40', { i: '5 A' }), Z('Z', '30 + j40'), Z('Z', '30 + j40')], vl: '250 V' }) },
    { title: 'Estrela: P = 750 W', c: threePhaseC({ load: 'Y', Z: [Z('Z', '30 + j40'), Z('Z', '30 + j40'), Z('Z', '30 + j40')], vl: '250 V' }) },
  ], 'Carga de 30 mais j40 ohms por fase em triângulo (2.250 watts) e religada em estrela (750 watts) em rede de 250 volts'),
  /* E3.27 */
  'BQ-e-E3-y3': twoWatt({ W1: '4.000 W', W2: '2.000 W', vl: 'rede 400 V (linha)', motor: ['M 3~', 'I = 10 A', 'FP = 0,87'], notes: ['P = W₁ + W₂ = 6.000 W · tg φ = √3·2.000/6.000 → φ = 30°', 'I = P/(√3·V·FP) = 6.000/(1,73·400·0,87) = 10 A'],
    aria: 'Método dos dois wattímetros em motor trifásico de 400 volts: 4.000 e 2.000 watts, potência de 6.000 watts, fator de potência 0,87 e corrente de 10 ampères' }),
  /* E3.30 */
  'BQ-e-E3-y6': threePhase({ load: 'Y', Z: [R('R', '22 Ω', { u: '220 V' }), R('R', '11 Ω', { u: '220 V' }), R('R', '22 Ω', { u: '220 V' })], neutral: { i: '10 A' }, Il: ['10 A', '20 A', '10 A'], note: 'IN = 10∠0° + 20∠−120° + 10∠120° = −5 − j8,66 → |IN| = 10 A' },
    'Quadro trifásico a quatro fios com cargas resistivas de 22, 11 e 22 ohms: correntes de 10, 20 e 10 ampères e 10 ampères no neutro'),
  /* E3.32 */
  'BQ-e-E3-y8': ladder({ aria: 'Motor trifásico de 380 volts com 100 ampères e fator de potência 0,6 e banco de capacitores: a corrente da linha cai para 75 ampères', src: AC('', '380 V', { n: ['trifásico'] }),
    items: [{ s: amp('A', '', { n: ['antes: 100 A', 'depois: 75 A'] }) }, { p: [M('motor', '', { n: ['P constante', 'FP 0,6'] })] }, { p: [C('banco', '', { n: ['FP → 0,8'] })] }], note: 'P = √3·V·I·FP constante → I₂ = 100·0,6/0,8 = 75 A' }),
  /* E3.33 */
  'BQ-e-E3-y9': threePhase({ load: 'Y', Z: [Z('enrol.', '', { u: 'V/√3' }), Z('enrol.', '', { u: 'V/√3' }), Z('enrol.', '', { u: 'V/√3' })], vl: 'rede 380 V', Il: ['30 A', '30 A', '30 A'], note: 'partida em estrela: IL = 90/3 = 30 A (em triângulo seriam 90 A)' },
    'Partida estrela-triângulo de motor de 380 volts: em estrela a corrente de linha é 30 ampères, um terço dos 90 ampères da partida direta'),
  /* E3.34 */
  'BQ-e-E3-y10': threePhase({ load: 'Y', Z: [C('C', '3,33 Ω', { u: '231 V', n: ['16 kvar'] }), C('C', '3,33 Ω', { u: '231 V', n: ['16 kvar'] }), C('C', '3,33 Ω', { u: '231 V', n: ['16 kvar'] })], vl: 'rede 400 V (linha)', note: 'em Y: XC = VL²/Q = 400²/48.000 = 3,33 Ω (16 kvar por capacitor)' },
    'Banco trifásico de 48 quilovar em estrela, rede de 400 volts: três capacitores com 3,33 ohms de reatância'),
  /* E3.36 */
  'BQ-e-E3-y12': ladder({ aria: 'Alimentador de 0,05 ohm por condutor e motor trifásico: com a correção do fator de potência a corrente cai de 40 para 30 ampères e as perdas de 240 para 135 watts', src: AC('', '', { n: ['trifásico'] }),
    items: [{ s: R('alimentador', '0,05 Ω', { n: ['por condutor', 'perdas 3·R·I²:', '240 W → 135 W'] }) }, { p: [M('motor', '', { n: ['40 A, FP 0,6', '→ 30 A, FP 0,8'] })] }], note: 'redução = 240 − 135 = 105 W' }),
  /* E3.37 */
  'BQ-e-E3-y13': threePhase({ load: 'D', Z: [sw('AB', 'rompido', { n: ['aberto'] }), R('BC', '30 Ω', { i: '10 A' }), R('CA', '30 Ω', { i: '10 A' })], vl: '300 V (linha)', Il: ['10 A', '10 A', '17,3 A'], note: 'IA = IAB − ICA = 0 − ICA → 10 A · linha C: √3·10 = 17,3 A' },
    'Carga em triângulo de 30 ohms com o resistor AB rompido, em rede de 300 volts: 10 ampères na linha A e 17,3 na linha C'),
  /* E3.38 */
  'BQ-e-E3-y14': ladder({ aria: 'Motor monofásico com voltímetro de 120 volts, amperímetro de 25 ampères e wattímetro de 2.400 watts: potência reativa de 1.800 var', src: AC('', '120 V'),
    items: [{ s: wat('W', '', { n: ['2.400 W'] }) }, { s: amp('A', '', { n: ['25 A'] }) }, { p: [volt('V', '', { n: ['120 V'] })] }, { w: M('motor', '', { n: ['S = 3.000 VA', 'Q = 1.800 var'] }) }], note: 'Q = √(3.000² − 2.400²) = 1.800 var' }),
};

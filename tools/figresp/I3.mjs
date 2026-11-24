/* Figuras de resposta da estação I3 (medidas, retificadores, baterias e no-breaks). Chave = id da questão. */
import { ladder, bridge, twoWatt, rectBridge, Canvas, R, C, V, AC, I, Z, D, amp, volt, sw } from './lib.mjs';

export default {
  /* I3.3: shunt */
  'BQ-e-I3-b1-2': ladder({ aria: 'Galvanômetro de 5 miliampères e 40 ohms com shunt em paralelo de 4,44 ohms para medir até 50 miliampères', src: I('', '50 mA', { n: ['fundo de escala'] }),
    items: [{ p: [Z('galvanômetro', '40 Ω', { i: '5 mA', u: '0,2 V' })] }, { p: [R('shunt', '4,44 Ω', { i: '45 mA', u: '0,2 V' })] }], note: 'Rsh = 0,2 V / 45 mA ≈ 4,44 Ω (a mesma tensão nos dois)' }),
  /* I3.4 */
  'BQ-e-I3-b1-3': ladder({ aria: 'Divisor de 60 e 40 quilo-ohms em 24 volts com voltímetro de 60 quilo-ohms sobre o de 40: leitura de 6,86 volts', src: V('', '24 V'),
    items: [{ s: R('R₁', '60 kΩ', { u: '17,14 V' }) }, { p: [R('R₂', '40 kΩ', { u: '6,86 V' })] }, { p: [volt('Rᵥ', '60 kΩ', { u: '6,86 V' })] }], note: '40k ∥ 60k = 24 kΩ → 24·24/(60 + 24) ≈ 6,86 V (sem o voltímetro: 9,6 V)' }),
  /* I3.9: ponte, Rx no braço superior esquerdo */
  'BQ-e-I3-b3-0': bridge({ aria: 'Ponte de Wheatstone equilibrada com R1 de 600 ohms em cima à direita, R2 de 150 embaixo à direita e R3 de 220 embaixo à esquerda: Rx vale 880 ohms', src: V('', 'E'),
    left: [R('Rₓ', '880 Ω'), R('R₃', '220 Ω')], right: [R('R₁', '600 Ω'), R('R₂', '150 Ω')], mid: { t: 'amp', l: 'detector', u: '0 V', i: '0 A' }, note: 'equilíbrio: Rₓ·R₂ = R₃·R₁ → Rₓ = 220·600/150 = 880 Ω' }),
  /* I3.13 */
  'BQ-e-I3-b4-0': ladder({ aria: 'Retificador de meia onda com diodo ideal alimentado por 24 volts eficazes: valor médio de 10,8 volts na carga', src: AC('', '24 V ef.', { n: ['Vp = 33,9 V'] }),
    items: [{ s: D('diodo', '') }, { w: R('carga', '', { u: 'Vméd ≈ 10,8 V' }) }], note: 'Vméd = Vp/π = 33,9/π ≈ 10,8 V' }),
  /* I3.14: ponte trifásica, frequência do ripple */
  'BQ-e-I3-b4-1': rectBridge({ phases: 3, loads: [R('carga', '')], notes: ['6 pulsos por ciclo da rede: 6·60 = 360 Hz de ondulação (sem filtro)'], aria: 'Ponte trifásica de seis diodos em rede de 60 hertz: ondulação de 360 hertz' }),
  /* I3.15 */
  'BQ-e-I3-b4-2': rectBridge({ phases: 1, src: AC('', '60 Hz'), loads: [C('C', '10.000 µF'), R('carga', '', { i: '2 A' })], notes: ['ponte: ondulação em 120 Hz → Vr = I/(f·C) = 2/(120·0,01) ≈ 1,67 V pico a pico'], aria: 'Ponte retificadora monofásica com filtro capacitivo de 10.000 microfarads e carga de 2 ampères: ondulação de 1,67 volt' }),
  /* I3.16 */
  'BQ-e-I3-b4-3': ladder({ aria: 'Regulador linear com 24 volts na entrada e 9 volts na carga de 0,4 ampère: 6 watts dissipados no regulador', src: V('', '24 V', { i: '0,4 A' }),
    items: [{ s: Z('regulador', 'linear', { u: '15 V', n: ['P = 15·0,4 = 6 W'] }) }, { w: Z('carga', '', { u: '9 V', n: ['P = 3,6 W'] }) }], note: 'o elemento em série absorve (24 − 9)·0,4 = 6,0 W em calor' }),
  /* I3.17 */
  'BQ-e-I3-b5-0': (() => {
    const c = new Canvas(), ys = [0, 90], xs = [110, 200, 290, 380];
    ys.forEach(y => { c.wire([[40, y], [xs[0] - 28, y]]); xs.forEach((x, k) => { c.sym(V('', ''), x, y, 0); if (k < 3) c.wire([[x + 28, y], [xs[k + 1] - 28, y]]); }); c.wire([[xs[3] + 28, y], [450, y]]); });
    c.wire([[40, 0], [40, 90]]); c.wire([[450, 0], [450, 90]]); c.dot(40, 0); c.dot(40, 90); c.dot(450, 0); c.dot(450, 90);
    c.wire([[40, 45], [10, 45]]); c.wire([[450, 45], [480, 45]]);
    c.text(245, -26, '4 em série: 4·12 V = 48 V (cada fileira: 150 Ah)', 's-ts'); c.text(245, 62, '2ª fileira em paralelo: 2·150 Ah = 300 Ah', 's-tm');
    c.text(245, 130, 'baterias de 12 V · 150 Ah: 4 × 2 = 8', 's-fa');
    return c.svg('Banco de 48 volts e 300 ampères-hora com oito baterias de 12 volts e 150 ampères-hora: duas fileiras em paralelo, cada uma com quatro em série');
  })(),
  /* I3.27 */
  'BQ-e-I3-x1': twoWatt({ W1: '3.000 W', W2: '1.000 W', motor: ['carga', 'equilibrada', 'FP ≈ 0,76'], notes: ['tg φ = √3·(3.000 − 1.000)/(3.000 + 1.000) ≈ 0,866', 'φ ≈ 40,9° → FP = cos φ ≈ 0,76'], aria: 'Método de Aron com wattímetros de 3.000 e 1.000 watts: fator de potência 0,76' }),
  /* I3.33 */
  'BQ-e-I3-y1': ladder({ aria: 'Amperímetro de 2 ohms em série com resistor de 6 ohms e fonte de 12 volts: corrente de 1,5 ampère em vez de 2 ampères, erro de menos 25 por cento', src: V('', '12 V', { i: '1,5 A' }),
    items: [{ s: amp('A', '', { n: ['Rᵢ = 2 Ω', 'lê 1,5 A'] }) }, { w: R('R', '6 Ω', { u: '9 V' }) }], note: 'sem o amperímetro: 12/6 = 2 A · com ele: 12/8 = 1,5 A → erro de −25 %' }),
  /* I3.34 */
  'BQ-e-I3-y2': twoWatt({ W1: '4.000 W', W2: '2.000 W', motor: ['carga', 'equilibrada', 'Q ≈ 3,46 kvar'], notes: ['P = W₁ + W₂ = 6 kW', 'Q = √3·(W₁ − W₂) = 1,73·2.000 = 3.460 var ≈ 3,46 kvar'], aria: 'Método de Aron com 4.000 e 2.000 watts: potência reativa trifásica de 3,46 quilovar' }),
  /* I3.37 */
  'BQ-e-I3-y5': rectBridge({ phases: 3, loads: [R('carga', '9,9 Ω', { u: '297 V', i: '30 A' })], notes: ['Vméd = 1,35·220 = 297 V → I = 297/9,9 = 30 A', 'cada diodo conduz 1/3 do período: 30/3 = 10 A'], aria: 'Ponte trifásica de seis diodos em rede de 220 volts com carga de 9,9 ohms: 297 volts, 30 ampères na carga e 10 ampères médios por diodo' }),
};

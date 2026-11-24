/* Figuras de resposta da estação C1 (complementos de elétrica). Chave = id da questão. */
import { ladder, ladderC, stack, side, threePhase, twoWatt, Canvas, R, L, C, V, AC, I, M, Z, amp, volt, sw, swc } from './lib.mjs';

export default {
  /* C1.1 */
  'BQ-e-C1-b1-0': ladder({ aria: 'Capacitor de 100 microfarads carregado por fonte de 12 volts através de 10 quilo-ohms: constante de tempo de 1 segundo e 7,6 volts em 1 segundo', src: V('', '12 V'),
    items: [{ s: sw('chave', 'fecha em t = 0') }, { s: R('R', '10 kΩ') }, { w: C('C', '100 µF', { u: '7,6 V em t = 1 s', n: ['τ = R·C = 1 s'] }) }], note: 'vC = 12·(1 − e⁻¹) = 12·0,63 ≈ 7,6 V' }),
  /* C1.2 */
  'BQ-e-C1-b1-1': ladder({ aria: 'Capacitor de 220 microfarads carregado por resistor de 47 quilo-ohms: constante de tempo de 10,34 segundos e regime em 51,7 segundos', src: V('', 'E'),
    items: [{ s: R('R', '47 kΩ') }, { w: C('C', '220 µF', { n: ['τ = R·C = 10,34 s', '5τ ≈ 51,7 s'] }) }] }),
  /* C1.3 */
  'BQ-e-C1-b1-2': ladder({ aria: 'Bobina de 200 milihenrys com 50 ohms ligada a 24 volts: constante de tempo de 4 milissegundos e 0,303 ampère em 4 milissegundos', src: V('', '24 V'),
    items: [{ s: sw('chave', 'fecha em t = 0') }, { s: R('R', '50 Ω', { n: ['I final = 0,48 A'] }) }, { w: L('L', '200 mH', { n: ['τ = L/R = 4 ms', 'i(4 ms) ≈ 0,303 A'] }) }], note: 'i = 0,48·(1 − e⁻¹) ≈ 0,303 A' }),
  /* C1.4 */
  'BQ-e-C1-b1-3': ladder({ aria: 'Capacitores de 6 e 3 microfarads em série com 12 volts: equivalente de 2 microfarads, 4 e 8 volts e energia de 144 microjoules', src: V('', '12 V'),
    items: [{ s: C('C₁', '6 µF', { u: '4 V' }) }, { s: C('C₂', '3 µF', { u: '8 V' }) }], note: 'Ceq = 6·3/9 = 2 µF · W = ½·2·10⁻⁶·12² = 144 µJ' }),
  /* C1.12 */
  'BQ-e-C1-b3-3': ladder({ aria: 'Motor monofásico com capacitor de partida em série com o enrolamento auxiliar, ambos em paralelo com o enrolamento principal', src: AC('', 'rede'),
    items: [{ p: [Z('principal', '', { n: ['campo pulsante'] })] }, { p: [C('capacitor', '', { n: ['defasa a corrente'] }), Z('auxiliar', '')] }], note: 'a corrente do auxiliar adianta → o campo gira na partida' }),
  /* C1.13 */
  'BQ-e-C1-b4-0': ladder({ aria: 'Transformador de corrente 400 para 5 com amperímetro indicando 3,5 ampères: corrente no primário de 280 ampères', src: I('TC 400-5', '', { i: '3,5 A', n: ['secundário', 'primário: 280 A'] }),
    items: [{ s: amp('A', '', { n: ['3,5 A'] }) }], note: 'relação 400/5 = 80 → I₁ = 3,5·80 = 280 A' }),
  /* C1.14 */
  'BQ-e-C1-b4-1': ladder({ aria: 'Secundário de 5 ampères de um TC com relé e cabos de 0,3 ohm: carga de 7,5 volt-ampères', src: I('TC', '', { i: '5 A', n: ['secundário 5 A'] }),
    items: [{ s: Z('relé + cabos', '0,3 Ω', { u: '1,5 V', n: ['S = 7,5 VA'] }) }], note: 'S = I²·Z = 5²·0,3 = 7,5 VA → classe C12,5' }),
  /* C1.15 */
  'BQ-e-C1-b4-2': ladder({ aria: 'Troca do amperímetro no secundário de um TC energizado: o secundário é curto-circuitado antes de retirar o instrumento', src: I('TC', '', { i: '5 A', n: ['primário energizado'] }),
    items: [{ s: amp('A', '', { n: ['instrumento a trocar'] }) }, { p: [swc('curto', '', { n: ['fechado ANTES', 'de retirar o A'] })] }], note: 'secundário aberto com o primário energizado: tensão perigosa e saturação' }),
  /* C1.21 */
  'BQ-e-C1-b6-0': ladder({ aria: 'Carga resistiva monofásica de 3.810 watts entre fase e neutro em 127 volts: 30 ampères', src: AC('fase–neutro', '127 V', { i: '30 A' }),
    items: [{ w: R('carga', '4,23 Ω', { n: ['P = 3.810 W'] }) }], note: 'I = P/V = 3.810/127 = 30 A' }),
  /* C1.22 */
  'BQ-e-C1-b6-1': threePhase({ load: 'Y', Z: [R('R', '6,35 Ω', { i: '20 A' }), R('R', '6,35 Ω', { i: '20 A' }), sw('C', 'sem carga', { n: ['aberta'] })], neutral: { i: '20 A' }, Il: ['20 A', '20 A', '0'], vl: '127/220 V', note: 'IN = 20∠0° + 20∠−120° → |IN| = 2·20·cos 60° = 20 A' },
    'Quadro de 127 e 220 volts com cargas de 20 ampères nas fases A e B e a fase C sem carga: 20 ampères no neutro'),
  /* C1.23 */
  'BQ-e-C1-b6-2': twoWatt({ W1: '5.000 W', W2: '3.000 W', motor: ['carga', 'trifásica', 'equilibrada', 'FP ≈ 0,918'], notes: ['tg φ = √3·(5.000 − 3.000)/(5.000 + 3.000) = 0,433', 'φ ≈ 23,4° → FP = cos φ ≈ 0,918'],
    aria: 'Dois wattímetros indicando 5.000 e 3.000 watts em carga trifásica equilibrada: fator de potência 0,918' }),
  /* C1.24 */
  'BQ-e-C1-b6-3': twoWatt({ W1: '5.000 W', W2: '−1.000 W', motor: ['carga', 'trifásica', 'equilibrada', 'P = 4.000 W'], notes: ['P = W₁ + W₂ = 5.000 + (−1.000) = 4.000 W', 'leitura negativa: FP < 0,5'],
    aria: 'Dois wattímetros indicando 5.000 e menos 1.000 watts: potência ativa total de 4.000 watts' }),
  /* C1.29 */
  'BQ-e-C1-b8-0': ladder({ aria: 'Lâmpadas fluorescentes com reator de 96 watts em 220 volts e fator de potência 0,5: corrente de 0,873 ampère', src: AC('', '220 V', { i: '0,873 A' }),
    items: [{ w: Z('lâmpadas + reator', '96 W', { n: ['FP = 0,5 ind.'] }) }], note: 'I = P/(V·FP) = 96/(220·0,5) ≈ 0,873 A' }),
  /* C1.30 */
  'BQ-e-C1-b8-1': ladder({ aria: 'Luminária de 96 watts com fator de potência 0,5 e capacitor de 6,9 microfarads em paralelo para elevar o fator de potência a 0,92', src: AC('', '220 V · 60 Hz'),
    items: [{ p: [Z('luminária', '96 W', { n: ['FP = 0,5 ind.'] })] }, { p: [C('C', '6,9 µF', { n: ['Qc ≈ 125 var', 'FP → 0,92'] })] }], note: 'C = Qc/(2π·f·V²) = 125,4/(377·220²) ≈ 6,9 µF' }),
  /* C1.31 */
  'BQ-e-C1-b8-2': (() => {
    const c = new Canvas(), ys = [0, 90], xs = [110, 200, 290, 380];
    ys.forEach(y => { c.wire([[40, y], [xs[0] - 28, y]]); xs.forEach((x, k) => { c.sym(V('', ''), x, y, 0); if (k < 3) c.wire([[x + 28, y], [xs[k + 1] - 28, y]]); }); c.wire([[xs[3] + 28, y], [450, y]]); });
    c.wire([[40, 0], [40, 90]]); c.wire([[450, 0], [450, 90]]); c.dot(40, 0); c.dot(40, 90); c.dot(450, 0); c.dot(450, 90);
    c.wire([[40, 45], [10, 45]]); c.wire([[450, 45], [480, 45]]);
    c.text(245, -26, '4 módulos em série: 4·31 = 124 V', 's-ts'); c.text(245, 62, '4 módulos em série (2ª string)', 's-tm');
    c.text(245, 130, 'cada módulo: 31 V × 8,4 A = 260,4 W', 's-fa');
    c.text(245, 150, '8 módulos → 8·260,4 ≈ 2.083 W (corrente: 2·8,4 = 16,8 A)', 's-tm');
    return c.svg('Arranjo fotovoltaico de duas strings em paralelo, cada uma com quatro módulos em série: potência máxima de 2.083 watts');
  })(),
};

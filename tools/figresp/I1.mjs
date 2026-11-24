/* Figuras de resposta da estação I1 (instalações prediais e NBR 5410). Chave = id da questão. */
import { ladder, threePhase, Canvas, R, V, AC, Z, W, fuse, lamp } from './lib.mjs';

export default {
  /* I1.14 */
  'BQ-a-T5-b3-3': ladder({ aria: 'Equipamento de 2.540 volt-ampères em 127 volts alimentado por circuito com queda unitária de 20 volts por ampère-quilômetro: 20 ampères, queda máxima de 5,08 volts e 12,7 metros', src: AC('', '127 V', { i: '20 A' }),
    items: [{ s: R('circuito', '0,254 Ω', { u: '5,08 V (4 %)', n: ['L = 12,7 m'] }) }, { w: Z('equipamento', '2.540 VA', { u: '121,9 V' }) }], note: ['I = 2.540/127 = 20 A · ΔV = 0,04·127 = 5,08 V', 'L = 5,08/(20·20) = 0,0127 km = 12,7 m'] }),
  /* I1.30: comando de iluminação de três pontos */
  'BQ-f-t3-5': (() => {
    const c = new Canvas(), X0 = 40, YB = 160, bx = [110, 250, 390], w = 90, h = 70, yc = 40;
    c.sym(AC('', 'fase–neutro'), X0, 80, 90); c.label(AC('', 'fase–neutro'), X0, 80, true, 'l');
    c.wire([[X0, 52], [X0, yc], [bx[0], yc]]); c.wire([[X0, 108], [X0, YB], [bx[2] + w + 130, YB]]);
    const nome = ['paralelo', 'intermediário', 'paralelo'], tipo = ['three-way', 'four-way', 'three-way'];
    bx.forEach((x, k) => { c.raw(`<rect class="s-comp" x="${x}" y="${yc - h / 2}" width="${w}" height="${h}"/>`); c.grow(x, yc - h / 2); c.grow(x + w, yc + h / 2); c.text(x + w / 2, yc - 2, nome[k], 's-ts'); c.text(x + w / 2, yc + 16, tipo[k], 's-tm'); });
    [0, 1].forEach(k => { const x1 = bx[k] + w, x2 = bx[k + 1]; [-18, 18].forEach(d => { c.wire([[x1, yc + d], [x2, yc + d]]); c.dot(x1, yc + d); c.dot(x2, yc + d); }); });
    c.wire([[bx[2] + w, yc], [bx[2] + w + 50, yc]]); c.sym(lamp('', ''), bx[2] + w + 78, yc, 0); c.wire([[bx[2] + w + 106, yc], [bx[2] + w + 130, yc], [bx[2] + w + 130, YB]]); c.dot(bx[2] + w + 130, YB);
    c.text(X0 - 20, YB + 34, 'dois retornos ligam os três interruptores; a lâmpada fica entre o último e o neutro', 's-tm', 'start');
    c.text(X0 - 20, YB + 52, 'dois paralelos (three-way) nas pontas e um intermediário (four-way) no meio', 's-tm', 'start');
    return c.svg('Comando de um ponto de luz por três locais: interruptor paralelo, interruptor intermediário e outro paralelo, ligados por dois retornos');
  })(),
  /* I1.36 */
  'BQ-f-t5-6': ladder({ aria: 'Forno elétrico de 3.000 watts em 220 volts: 13,6 ampères, acima de 10 ampères, exige circuito independente', src: AC('', '220 V', { i: '13,6 A' }),
    items: [{ s: fuse('disjuntor', '') }, { w: R('forno', '16,1 Ω', { n: ['3.000 W'] }) }], note: 'I = 3.000/220 ≈ 13,6 A > 10 A → circuito independente' }),
  /* I1.40 */
  'BQ-e-I1-y1': ladder({ aria: 'Forno de 4,4 quilowatts em 220 volts por circuito de 50 metros com queda unitária de 8 volts por ampère-quilômetro: 20 ampères e queda de 8 volts, ou 3,64 por cento', src: AC('', '220 V', { i: '20 A' }),
    items: [{ s: R('cabo', '0,4 Ω', { u: '8 V (3,64 %)', n: ['50 m · ida e volta'] }) }, { w: Z('forno', '4,4 kW', { u: '212 V' }) }], note: 'ΔV = 8,0·20·0,05 = 8 V → 8/220 = 3,64 %' }),
  /* I1.41 */
  'BQ-e-I1-y2': ladder({ aria: 'Carga de 6.160 watts em 220 volts: corrente de projeto de 28 ampères, capacidade corrigida de 36 ampères e disjuntor de 32 ampères', src: AC('', '220 V', { i: 'IB = 28 A' }),
    items: [{ s: fuse('disjuntor', '32 A', { n: ['28 ≤ 32 ≤ 36'] }) }, { w: R('carga', '', { n: ['6.160 W'] }) }], note: 'Iz = 50·0,80·0,90 = 36 A → IB ≤ In ≤ Iz → disjuntor de 32 A' }),
  /* I1.43: esquema TT, falta direta */
  'BQ-e-I1-y4': ladder({ aria: 'Esquema TT com 127 volts, resistência de aterramento do neutro de 2,7 ohms e das massas de 10 ohms: falta de 10 ampères, 100 volts nas massas, a corrente retorna pela terra', src: AC('fase–neutro', '127 V', { i: '10 A' }),
    items: [{ s: W('falta', 'direta', { n: ['fase → massa'] }) }, { s: R('RA', '10 Ω', { u: '100 V', n: ['massas → terra'] }) }, { w: R('RB', '2,7 Ω', { u: '27 V', n: ['terra → fonte'] }) }], note: ['I = 127/(2,7 + 10) = 10 A · V das massas = 10·10 = 100 V', 'o disjuntor não atua: o seccionamento exige DR'] }),
  /* I1.44: TN-S, laço de falta */
  'BQ-e-I1-y5': ladder({ aria: 'Esquema TN-S de 127 volts fase-neutro com laço de falta de 0,5 ohm: corrente de falta de 254 ampères', src: AC('fase–PE', '127 V', { i: '254 A' }),
    items: [{ w: R('laço de falta', '0,5 Ω', { u: '127 V', n: ['fase + PE'] }) }], note: 'Ifalta = 127/0,5 = 254 A' }),
  /* I1.70 */
  'BQ-e-I1-z19': threePhase({ load: 'Y', Z: [Z('carga', '', { i: '45 A' }), Z('carga', '', { i: '30 A' }), Z('carga', '', { i: '5 A' })], neutral: { i: '35 A' }, Il: ['45 A', '30 A', '5 A'], note: 'IN = √(2.950 − 1.725) = √1.225 = 35 A' },
    'Circuito trifásico a quatro condutores com cargas resistivas de 45, 30 e 5 ampères: 35 ampères no neutro'),
};

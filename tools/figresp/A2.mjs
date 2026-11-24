/* Figuras de resposta da estação A2 (automação, CLP e controle). Chave = id da questão. */
import { ladder, R, V, I, Z, sw } from './lib.mjs';

export default {
  /* A2.7: pull-up de entrada digital */
  'BQ-e-A2-b2-2': ladder({ aria: 'Entrada digital de 24 volts com resistência interna de 8 quilo-ohms e resistor de pull-up de 1,5 quilo-ohm: com a chave aberta a entrada lê 20,2 volts, nível alto; com a chave fechada, 0 volt', src: V('', '24 V'),
    items: [{ s: R('pull-up', '1,5 kΩ', { u: '3,8 V' }) }, { p: [Z('entrada do CLP', '8 kΩ', { u: '20,2 V (≥ 20 V: ALTO)' })] }, { p: [sw('chave do campo', '', { n: ['aberta: ALTO', 'fechada (0 V): BAIXO'] })] }], note: 'chave aberta: R ≤ 8.000·(24 − 20)/20 = 1.600 Ω → 1,5 kΩ serve' }),
  /* A2.36: laço 4–20 mA com resistor de 250 Ω */
  'BQ-e-A2-y2': ladder({ aria: 'Laço de 4 a 20 miliampères de transmissor de pressão com resistor de 250 ohms em entrada de 0 a 5 volts: leitura 2.048 corresponde a 2,5 volts, 10 miliampères e 3,75 bar', src: I('transmissor', '10 mA', { n: ['0–10 bar'] }),
    items: [{ w: R('resistor', '250 Ω', { u: '2,5 V', n: ['entrada A/D 0–5 V', 'leitura: 2.048'] }) }], note: ['2.048/4.096·5 = 2,5 V → 2,5/250 = 10 mA', 'P = (10 − 4)/16·10 bar = 3,75 bar'] }),
};

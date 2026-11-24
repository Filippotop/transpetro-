/* Figuras de resposta da estação M3 (máquinas rotativas, proteção e partidas). Chave = id da questão. */
import { ladder, R, L, V, AC, I, M, Z, sw } from './lib.mjs';

export default {
  /* M3.16: motor CC shunt */
  'BQ-e-M3-b4-0': ladder({ aria: 'Motor de corrente contínua shunt em 250 volts: 2 ampères no campo de 125 ohms, 60 ampères na armadura de 0,2 ohm, força contraeletromotriz de 238 volts', src: V('', '250 V', { i: '62 A' }),
    items: [{ p: [R('campo', '125 Ω', { i: '2 A', u: '250 V' })] }, { p: [R('Ra', '0,2 Ω', { i: '60 A', u: '12 V' }), M('E', '238 V', { n: ['fcem'] })] }], note: ['If = 250/125 = 2 A · Ia = 62 − 2 = 60 A · E = 250 − 0,2·60 = 238 V', 'Pd = 238·60 = 14.280 W → eixo = 14.280 − 600 = 13,7 kW'] }),
  /* M3.17: partida do motor CC com reostato */
  'BQ-e-M3-b4-1': ladder({ aria: 'Partida de motor de corrente contínua de 220 volts com armadura de 0,4 ohm e reostato de 4 ohms: resistência total de 4,4 ohms e 50 ampères', src: V('', '220 V', { i: '50 A' }),
    items: [{ s: R('reostato', '4,0 Ω', { u: '200 V' }) }, { s: R('Ra', '0,4 Ω', { u: '20 V' }) }, { s: M('M', '', { n: ['E = 0 (parado)'] }) }], note: 'na partida não há fcem: Rtotal = 220/50 = 4,4 Ω → reostato = 4,4 − 0,4 = 4,0 Ω' }),
  /* M3.35: gerador síncrono por fase */
  'BQ-e-M3-y1': ladder({ aria: 'Gerador síncrono por fase com reatância síncrona de 4 ohms, tensão nos terminais de 180 volts e corrente de 50 ampères com fator de potência 0,8 indutivo: fem de 340 volts', src: AC('E', '340 V', { i: '50 A' }),
    items: [{ s: L('Xs', '4 Ω', { u: '200 V' }) }, { w: Z('carga', '', { u: '180 V', n: ['FP = 0,8 ind.'] }) }], note: ['I = 50∠−36,9° = 40 − j30 A (atrasada 36,9°)', 'E = V + jXs·I = 180 + j4·(40 − j30) = 300 + j160 → |E| = 340 V'] }),
};

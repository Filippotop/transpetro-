/* Figuras de resposta da estação I2 (média tensão e SPDA). Chave = id da questão. */
import { ladder, R, L, AC, I, Z, amp, swc } from './lib.mjs';

export default {
  /* I2.10 */
  'BQ-e-I2-b3-2': ladder({ aria: 'Transformador de corrente 300 para 5 com amperímetro indicando 2,4 ampères: 144 ampères no primário', src: I('TC 300/5', '', { i: '2,4 A', n: ['secundário', 'primário: 144 A'] }),
    items: [{ s: amp('A', '', { n: ['2,4 A'] }) }], note: 'relação 300/5 = 60 → I₁ = 2,4·60 = 144 A' }),
  /* I2.11 */
  'BQ-e-I2-b3-3': ladder({ aria: 'Troca de medidor no secundário de um TC energizado: o secundário é curto-circuitado por bloco de teste antes de retirar o medidor', src: I('TC', '', { i: 'I₂', n: ['primário energizado'] }),
    items: [{ s: Z('medidor', '', { n: ['a substituir'] }) }, { p: [swc('curto', '', { n: ['bloco de teste', 'fechado ANTES'] })] }], note: 'secundário aberto com o primário energizado: tensão perigosa nos terminais' }),
  /* I2.33 */
  'BQ-e-I2-y3': ladder({ aria: 'Secundário de TC de 600 para 5 com medidor de 2,5 volt-ampères, relé de 5 e cabos de 0,6 ohm: carga de 22,5 volt-ampères', src: I('TC 600/5', '', { i: '5 A' }),
    items: [{ s: Z('medidor', '2,5 VA') }, { s: Z('relé', '5 VA') }, { s: R('cabos', '0,6 Ω', { n: ['5²·0,6 = 15 VA'] }) }], note: 'total: 2,5 + 5 + 15 = 22,5 VA → carga nominal de 22,5 VA' }),
  /* I2.35 */
  'BQ-e-I2-y5': ladder({ aria: 'Alimentador de 13,8 quilovolts com impedância de 1 mais j0,8 ohm por fase e carga de 2,4 megawatts com fator de potência 0,8: queda de 2 por cento', src: AC('', '13,8 kV', { n: ['trifásico'] }),
    items: [{ s: Z('trecho', '1,0 + j0,8 Ω', { u: '≈ 278 V (2,0 %)' }) }, { w: Z('carga', '2,4 MW', { n: ['FP = 0,8 ind.', 'Q = 1,8 Mvar'] }) }], note: ['S = 2,4/0,8 = 3 MVA · Q = 3·0,6 = 1,8 Mvar', 'ΔV ≈ (2,4·1,0 + 1,8·0,8)/13,8 = 0,278 kV ≈ 2,0 %'] }),
};

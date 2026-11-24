/* Figuras de resposta da estação M1 (simbologia e diagramas): o diagrama de comando completo, reaproveitado do banco. */
import { cmd } from './cmd.mjs';

const D = id => cmd('CMD1', id), R = id => cmd('CMD2', id);

export default {
  'BQ-a-T3-b3-2': D('BQ-a-T3-b3-2'), /* M1.14: 95-96 em série com a bobina */
  'BQ-a-T3-b4-0': D('BQ-a-T3-b4-0'), /* M1.18: selo em paralelo com a botoeira de liga */
  'BQ-a-T3-b4-4': D('BQ-a-T3-b4-4'), /* M1.22: K1 = /F7 · /S0 · (S1 + K1) */
  'BQ-a-T3-b4-6': D('BQ-a-T3-b4-6'), /* M1.24: sinaleiros por 13-14 de K1 e 97-98 de F7 */
  'BQ-a-T3-b5-4': D('BQ-a-T3-b5-4'), /* M1.29: selo com defeito */
  'BQ-a-T3-b5-5': D('BQ-a-T3-b5-5'), /* M1.30: relé atuado */
  'BQ-a-T3-b4-2': R('BQ-a-T3-b4-2'), /* M1.20: intertravamento */
  'BQ-a-T3-b5-1': R('BQ-a-T3-b5-1'), /* M1.26: K1 e K2 juntos = curto entre fases */
};

/* Instrumentos da bancada e sequências da NR-10 (redação vigente na data da prova, 06/12/2026). */
export const INSTR = {
  V: { nome: 'Multímetro: tensão CA', curto: 'V~', dica: 'Toque em dois pontos de teste (ponta vermelha e ponta preta) ou diretamente num componente para medir entre seus terminais.', energ: true },
  O: { nome: 'Multímetro: resistência', curto: 'Ω', dica: 'Só com o circuito desenergizado. Toque num componente para medir entre seus terminais.', desen: true },
  A: { nome: 'Alicate amperímetro', curto: 'A', dica: 'Toque num dos anéis sobre os condutores para abraçar o cabo.', energ: true },
  M: { nome: 'Megôhmetro 500 V CC', curto: 'MΩ', dica: 'Só com o circuito desenergizado. Toque no equipamento ou circuito a ensaiar.', desen: true },
  L: { nome: 'Alicate de fuga (mA)', curto: 'mA', dica: 'Abrace fase e neutro juntos: o alicate lê a diferença, isto é, a corrente que escapa para a terra.', energ: true },
  T: { nome: 'Testador de DR (rampa)', curto: 'IΔ', dica: 'Toque no DR: o testador injeta uma corrente de fuga crescente e registra o valor em que ele atua.', energ: true },
  I: { nome: 'Inspeção visual', curto: 'Olhar', dica: 'Toque num componente para examiná-lo.' }
};

/** NR-10, item 10.5.1 (desenergização), na ordem da norma. */
export const NR10 = [
  'Seccionamento',
  'Impedimento de reenergização',
  'Constatação da ausência de tensão',
  'Instalação de aterramento temporário com equipotencialização dos condutores dos circuitos',
  'Proteção dos elementos energizados existentes na zona controlada',
  'Instalação da sinalização de impedimento de reenergização'
];
/** NR-10, item 10.5.2 (reenergização). */
export const NR10RE = [
  'Retirada das ferramentas, utensílios e equipamentos',
  'Retirada da zona controlada de todos os trabalhadores não envolvidos no processo de reenergização',
  'Remoção do aterramento temporário, da equipotencialização e das proteções adicionais',
  'Remoção da sinalização de impedimento de reenergização',
  'Destravamento, se houver, e religação dos dispositivos de seccionamento'
];
export const EXAM_DATE = '2026-12-06T08:00:00-03:00';

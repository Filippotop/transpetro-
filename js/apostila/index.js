/* Catálogo da apostila. Para criar um módulo, siga o formato de potencia-trifasicos.js e acrescente-o aqui
   (e tire o id de PLANEJADOS em tests/apostila.test.mjs). */
import potenciaTrifasicos from './potencia-trifasicos.js';

export { EDITAL } from './edital.js';

export const MODULOS = [potenciaTrifasicos];
export const moduloById = id => MODULOS.find(m => m.id === id);
/** Subitem do edital → id do módulo que o cobre. */
export const cobre = Object.fromEntries(MODULOS.flatMap(m => m.itens.map(s => [s, m.id])));

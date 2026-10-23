/* Catálogo de missões. Para criar uma nova OS, siga o contrato descrito em ARQUITETURA.md e acrescente-a aqui. */
import cmd from './cmd.js';
import qd from './qd.js';
import mot from './mot.js';
import dr from './dr.js';

export const MISSIONS = [cmd, qd, mot, dr];
export const missionById = id => MISSIONS.find(m => m.id === id);
export const totalFaults = () => MISSIONS.reduce((s, m) => s + m.faults.length, 0);
/** Todas as questões, com id estável "missão/falha/índice". */
export const allQuestions = () => MISSIONS.flatMap(m => m.faults.flatMap(f => f.questoes.map((q, i) => ({ ...q, id: `${m.id}/${f.id}/${i}`, mission: m, fault: f }))));

/* =====================================================================
   MISSÃO 2 — Quadro com tensões anormais (neutro, fase, fornecimento)
   Edital: 4.1/4.2 (trifásicos), 8.1 (BT), 10.1 (NBR 5410), 7.3
   Modelo: fonte Y 220/127 V, cargas resistivas monofásicas; o potencial
   do neutro do quadro é calculado pelo teorema de Millman.
   ===================================================================== */
import { fmt, noise, rand, pick, shuffle, Cx, cadd, csub, cmul, cdiv, cabs, polar } from '../util.js';
import { W, T, earth, TPt, HIT, RING } from '../draw.js';

const PTS = ['P1', 'P2', 'P3', 'PN', 'Q1', 'Q2', 'Q3', 'QN', 'QPE'];

export default {
  id: 'qd', n: 2, titulo: 'Lâmpadas queimando no prédio administrativo', area: 'Instalações e trifásicos',
  edital: 'Itens 4.1, 4.2, 7.3, 8.1 e 10.1', local: 'Prédio administrativo · QD-ADM',
  equip: 'Quadro de distribuição QD-ADM, alimentado em 220/127 V a partir do padrão de entrada',
  sintoma: 'Reclamações de mau funcionamento nos equipamentos ligados ao QD-ADM: lâmpadas queimando ou fracas e aparelhos desligando sozinhos.',
  instr: ['V', 'A', 'O', 'I'], needsNR10: true, ctl0: {},
  setup(F) {
    const sets = [[2000, 200, 1000], [2500, 300, 800], [1500, 150, 1200], [2000, 300, 1200]];
    return { P: shuffle(pick(sets)), Vf: F.id === 'low' ? 110 : 127, Rn: 1.5 };
  },
  /** Potenciais (fasores) de cada ponto de teste e correntes do ramal. */
  solve(R) {
    const f = R.F.id, p = R.params; const z = Cx(0, 0);
    if (!R.energ) { const o = {}; PTS.forEach(k => o[k] = z); return { pot: o, I: [0, 0, 0], IN: 0 }; }
    const Vs = [polar(p.Vf, 0), polar(p.Vf, -120), polar(p.Vf, 120)], Y = p.P.map(P => P / (127 * 127));
    const con = [true, true, f !== 'fase']; let Nq = z;
    if (f === 'neutro' || f === 'mau') {
      // Millman: V_N = Σ(V_i·Y_i) / (ΣY_i + Y_neutro)
      let num = z, den = 0;
      Vs.forEach((v, i) => { if (con[i]) { num = cadd(num, cmul(v, Y[i])); den += Y[i]; } });
      if (f === 'mau') den += 1 / p.Rn;
      Nq = cdiv(num, den);
    }
    const QL = Vs.map((v, i) => con[i] ? v : Nq); const Ic = QL.map((v, i) => cmul(csub(v, Nq), Y[i]));
    const IN = f === 'neutro' ? 0 : cabs(Ic.reduce((a, b) => cadd(a, b), z));
    return { pot: { P1: Vs[0], P2: Vs[1], P3: Vs[2], PN: z, Q1: QL[0], Q2: QL[1], Q3: QL[2], QN: Nq, QPE: z }, I: Ic.map(cabs), IN };
  },
  measure(R, ins, t) {
    const S = this.solve(R), f = R.F.id;
    if (ins === 'V') {
      if (t.c) return { na: 'Aqui, meça entre os pontos de teste (toque em dois deles).' };
      const a = t.a, b = t.b, v = cabs(csub(S.pot[a], S.pot[b])); const val = v < 0.3 ? rand() * 0.2 : noise(v, 0.006);
      const isN = x => x === 'QN' || x === 'PN' || x === 'QPE', isPh = x => /^[PQ][123]$/.test(x); let kind, cls, it;
      if (isPh(a) && isPh(b)) { kind = 'LL'; cls = val < 205 ? 'baixo' : val > 232 ? 'alto' : 'ok'; it = cls === 'ok' ? 'Tensão de linha normal (220 V).' : cls === 'baixo' ? 'Tensão de linha abaixo de 220 V.' : 'Tensão de linha acima do nominal.'; }
      else if ((isPh(a) && isN(b)) || (isPh(b) && isN(a))) {
        kind = 'FN'; cls = val < 118 ? 'baixo' : val > 135 ? 'alto' : 'ok';
        it = cls === 'ok' ? 'Tensão fase-neutro (ou fase-terra) dentro do esperado: 127 V.' : cls === 'alto' ? 'Acima de 127 V: sobretensão. Num sistema com cargas monofásicas, isso costuma indicar deslocamento do neutro.' : (val < 5 ? 'Praticamente zero: a fase não chega a este ponto.' : 'Abaixo de 127 V: subtensão.');
      } else { kind = 'NN'; cls = val > 1.5 ? 'desl' : '0'; it = cls === '0' ? 'Praticamente 0 V entre neutro e terra: o neutro está no potencial de terra, como deve ser.' : 'Tensão entre neutro e terra (ou entre o neutro do quadro e o do padrão): o neutro do quadro “flutuou”. Suspeite do condutor neutro entre os dois pontos.'; }
      if (!R.energ) { it = 'Circuito desenergizado: sem tensão.'; cls = 'desen'; }
      if (R.energ && f === 'low' && kind !== 'NN' && cls === 'baixo' && (a[0] === 'P' || b[0] === 'P')) it += ' Repare: a tensão já está baixa no padrão de entrada, antes do quadro.';
      return { txt: fmt(val, 1), unit: 'V', where: `${a}–${b}`, interp: it, key: `V:${[a, b].sort().join('-')}=${cls}` };
    }
    if (ins === 'A') {
      const c = t.cl; if (!c) return { na: 'Toque num dos anéis sobre os condutores do ramal.' };
      let v = c === 'N' ? S.IN : S.I[+c[1] - 1]; v = v < 0.05 ? rand() * 0.03 : noise(v, 0.01);
      let it;
      if (c === 'N') {
        const unb = Math.max(...S.I) - Math.min(...S.I) > 2;
        it = v < 0.1 ? (R.energ && unb ? 'Corrente praticamente nula no neutro, embora as fases tenham correntes bem diferentes. Com cargas desequilibradas, o neutro deveria conduzir a diferença: ele está interrompido.' : 'Corrente nula no neutro.') : 'O neutro conduz a corrente de desequilíbrio das fases, como esperado. Ele não está interrompido.';
      } else it = v < 0.1 ? 'Corrente nula nesta fase: nenhuma carga dela está sendo alimentada.' : 'Corrente desta fase (depende da carga ligada a ela).';
      if (!R.energ) it = 'Circuito desenergizado: não há corrente em nenhum condutor. Meça com o quadro energizado.';
      return { txt: fmt(v, 2), unit: 'A', where: 'condutor ' + (c === 'N' ? 'neutro' : 'L' + c[1]) + ' do ramal', interp: it, key: `A:${c}=${!R.energ ? 'desen' : v < 0.1 ? '0' : 'x'}` };
    }
    if (ins === 'O') {
      if (t.c !== 'RN') return { na: 'Com o ohmímetro, toque no condutor neutro do ramal (trecho entre o padrão e o quadro).' };
      const val = f === 'neutro' ? 'OL' : f === 'mau' ? fmt(noise(1.5, 0.02), 2) : '0,08';
      const it = val === 'OL' ? 'Sem continuidade: o neutro do ramal está interrompido.' : f === 'mau' ? 'Mais de um ohm num condutor curto de neutro: há uma conexão com resistência elevada (oxidada ou frouxa).' : 'Continuidade normal do neutro do ramal.';
      return { txt: val, unit: 'Ω', where: 'neutro do ramal (padrão → QD)', interp: it, key: `O:RN=${val === 'OL' ? 'OL' : f === 'mau' ? 'r' : 'ok'}` };
    }
    if (ins === 'I') {
      const c = t.c;
      const txt = {
        BN: (f === 'neutro' || f === 'mau') ? 'Terminal do neutro do ramal escurecido, com sinais de aquecimento. A inspeção levanta a suspeita, mas só as medições dizem o que está acontecendo.' : 'Barramento de neutro limpo e com conexões firmes.',
        DG: 'Disjuntor geral tripolar na posição ligada. A falha interna de um polo não é visível: só a medição confirma.',
        PAD: 'Padrão de entrada da distribuidora, lacrado. Medidor funcionando.',
        RN: 'Condutor neutro do ramal, isolação azul-clara, sem danos visíveis no trecho aparente.'
      }[c];
      if (!txt) return { na: 'Toque no padrão, no disjuntor geral, no barramento de neutro ou no ramal.' };
      return { txt: 'OK', unit: '', where: { BN: 'barramento de neutro', DG: 'disjuntor geral', PAD: 'padrão de entrada', RN: 'ramal' }[c], interp: txt, key: `I:${c}` };
    }
  },
  controls(R) { const p = R.params; return `<div class="stat">Cargas ligadas no QD: <b>L1</b> ${fmt(p.P[0], 0)} W · <b>L2</b> ${fmt(p.P[1], 0)} W · <b>L3</b> ${fmt(p.P[2], 0)} W (nominais em 127 V)</div>`; },
  svg(R) {
    let s = ''; const ys = [90, 140, 190, 240], cls = ['pa-s', 'pb-s', 'pc-s', 'nn-s'], lab = ['L1', 'L2', 'L3', 'N'];
    s += `<rect x="20" y="50" width="130" height="230" class="box"/>` + T(85, 40, 'Padrão de entrada', 'ts', 'middle') + T(85, 322, 'ponto de entrega', 'tm', 'middle');
    s += `<rect x="40" y="120" width="70" height="50" class="core"/>` + T(75, 150, 'medidor', 'tm', 'middle') + earth(85, 280);
    ys.forEach((y, i) => { s += W(150, y, 440, y, 'wire ' + cls[i]) + T(160, y - 6, lab[i], 'tn'); });
    s += `<rect x="420" y="50" width="130" height="300" class="box"/>` + T(485, 40, 'QD-ADM', 'ts', 'middle');
    [90, 140, 190].forEach(y => { s += W(372, y - 8, 388, y + 8) + W(388, y - 8, 372, y + 8); });
    s += `<line x1="380" y1="75" x2="380" y2="205" class="wire dsh"/>` + T(380, 222, 'disjuntor geral', 'tm', 'middle');
    s += W(440, 300, 540, 300, 'wire pe-s') + T(530, 318, 'PE', 'tn') + W(470, 300, 470, 330) + earth(470, 330) + T(490, 346, 'ao BEP', 'tm');
    ys.forEach((y, i) => { s += W(440, y, 540, y, 'wire thick ' + cls[i]); });
    [0, 1, 2].forEach(i => { const y = ys[i]; s += W(540, y, 575, y) + `<rect x="575" y="${y - 14}" width="70" height="28" class="load"/>` + T(610, y + 5, 'carga ' + lab[i], 'tm', 'middle') + W(645, y, 662, y); });
    s += W(662, 90, 662, 240) + W(540, 240, 662, 240, 'wire nn-s');
    s += HIT('PAD', 22, 52, 126, 226, 'Padrão de entrada') + HIT('DG', 362, 72, 36, 140, 'Disjuntor geral') + HIT('BN', 432, 228, 112, 26, 'Barramento de neutro do QD') + HIT('RN', 200, 231, 90, 18, 'Condutor neutro do ramal');
    lab.forEach((l, i) => { s += RING(i < 3 ? 'L' + (i + 1) : 'N', 310, ys[i], 12, 18, 'Alicate no condutor ' + l); });
    s += TPt(R, 'P1', 150, 90, 'P1', -22, -8) + TPt(R, 'P2', 150, 140, 'P2', -22, -8) + TPt(R, 'P3', 150, 190, 'P3', -22, -8) + TPt(R, 'PN', 150, 240, 'PN', -24, -8);
    s += TPt(R, 'Q1', 460, 90, 'Q1', 8, -10) + TPt(R, 'Q2', 460, 140, 'Q2', 8, -10) + TPt(R, 'Q3', 460, 190, 'Q3', 8, -10) + TPt(R, 'QN', 460, 240, 'QN', 8, -10) + TPt(R, 'QPE', 510, 300, 'QPE', 8, -10);
    return `<svg viewBox="0 0 680 380" role="group" aria-label="Padrão de entrada, ramal e quadro de distribuição">${s}</svg>`;
  },
  diag: [{ id: 'neutro', t: 'Neutro interrompido no ramal entre o padrão e o quadro' }, { id: 'mau', t: 'Conexão do neutro com resistência elevada (mau contato)' }, { id: 'fase', t: 'Falta de uma fase no quadro (polo do disjuntor geral aberto)' }, { id: 'low', t: 'Tensão de fornecimento baixa, vinda da rede da distribuidora' }, { id: 'sobre', t: 'Sobrecarga no circuito da fase mais carregada' }],
  acts: [{ id: 'neutro', t: 'Restabelecer a continuidade do neutro (substituir terminal ou trecho rompido) e verificar os equipamentos expostos à sobretensão' }, { id: 'mau', t: 'Limpar, refazer e reapertar a conexão do neutro (substituir o terminal oxidado) e acompanhar a temperatura' }, { id: 'fase', t: 'Substituir o disjuntor geral (polo defeituoso)' }, { id: 'low', t: 'Registrar as medições no ponto de entrega e acionar a distribuidora' }, { id: 'dps', t: 'Instalar um DPS no quadro para eliminar a sobretensão permanente' }],
  faults: [
    { id: 'neutro', nome: 'Neutro interrompido', diag: 'neutro', act: 'neutro', ideal: 4,
      hints: ['Meça as três tensões fase-neutro no quadro. Estão iguais?', 'Uma fase alta e outra baixa, com cargas desiguais: isso lembra o quê? Meça a tensão entre o neutro e o PE no quadro.', 'Use o alicate no condutor neutro do ramal. Com cargas desequilibradas, quanto ele deveria conduzir?'],
      provas: [{ any: ['V:Q1-QN=alto', 'V:Q2-QN=alto', 'V:Q3-QN=alto'], txt: 'Uma tensão fase-neutro muito acima de 127 V no quadro (e outra muito abaixo).' }, { any: ['V:QN-QPE=desl', 'V:PN-QN=desl'], txt: 'Tensão entre o neutro do quadro e a terra (ou o neutro do padrão).' }, { any: ['A:N=0'], txt: 'Corrente nula no neutro, apesar das correntes desiguais nas fases: ele está interrompido.' }, { any: ['O:RN=OL'], txt: 'Ohmímetro no neutro do ramal desenergizado: OL.' }],
      explica: 'O neutro do ramal se rompeu. Sem ele, as cargas de fases diferentes ficam em série entre as fases, e a tensão de 220 V se divide na proporção das impedâncias. A fase com menos carga (maior impedância) recebe tensão muito acima de 127 V: é aí que as lâmpadas queimam.',
      teoria: 'O potencial do neutro “flutuante” é a média das tensões de fase ponderada pelas admitâncias das cargas (teorema de Millman). A corrente nula no neutro, com fases desequilibradas, é a assinatura do neutro rompido. Por isso o neutro nunca tem fusível ou disjuntor isolado e as cargas devem ser distribuídas entre as fases.',
      cesg: 'Sobretensão numa fase do quadro com cargas monofásicas desequilibradas é a situação típica em que a banca espera a resposta “rompimento do neutro”.',
      questoes: [{ s: 'Em rede 220/127 V, com o neutro rompido, uma lâmpada de 100 W/127 V entre L1 e o neutro e um aquecedor de 1.000 W/127 V entre L2 e o neutro ficam em série. A tensão na lâmpada é de, aproximadamente,', o: ['20 V', '110 V', '127 V', '200 V', '220 V'], a: 3, c: 'R<sub>lâmpada</sub> ≈ 161 Ω e R<sub>aquecedor</sub> ≈ 16,1 Ω. Em série sob 220 V: V = 220 × 161/177 ≈ 200 V.' },
        { s: 'Num quadro com cargas monofásicas desequilibradas, o alicate amperímetro indica corrente nula no condutor neutro do ramal, enquanto as correntes das fases são diferentes entre si. Isso indica', o: ['funcionamento normal', 'neutro interrompido', 'falta de fase', 'sobrecarga', 'curto entre fases'], a: 1, c: 'Com desequilíbrio, a soma das correntes das fases não é zero e deveria voltar pelo neutro. Se ele não conduz nada, está aberto.' }] },
    { id: 'mau', nome: 'Neutro com mau contato', diag: 'mau', act: 'mau', ideal: 4,
      hints: ['Meça as tensões fase-neutro no quadro e compare com as do padrão.', 'Há desequilíbrio, mas menor do que num neutro aberto. O neutro ainda conduz? Use o alicate.', 'Meça a tensão entre o neutro do quadro e o neutro do padrão: ela mostra a queda no próprio neutro.'],
      provas: [{ any: ['V:Q1-QN=alto', 'V:Q2-QN=alto', 'V:Q3-QN=alto', 'V:Q1-QN=baixo', 'V:Q2-QN=baixo', 'V:Q3-QN=baixo'], txt: 'Tensões fase-neutro desiguais no quadro, com tensões normais no padrão.' }, { any: ['A:N=x'], txt: 'O neutro ainda conduz corrente: não está totalmente interrompido.' }, { any: ['V:PN-QN=desl', 'V:QN-QPE=desl'], txt: 'Alguns volts entre o neutro do quadro e a terra: há queda de tensão no próprio neutro.' }, { any: ['O:RN=r'], txt: 'Desenergizado, o neutro do ramal tem cerca de 1,5 Ω: resistência elevada.' }],
      explica: 'A conexão do neutro está oxidada ou frouxa, com resistência de cerca de 1,5 Ω. A corrente de desequilíbrio que passa por ela provoca uma queda de tensão no neutro e desloca seu potencial: as tensões fase-neutro ficam desiguais, e a conexão aquece.',
      teoria: 'É o caso intermediário entre o neutro perfeito (potencial de terra) e o neutro aberto (potencial flutuante). Quanto maior a resistência da conexão, maior o deslocamento. Uma conexão assim tende a piorar com o aquecimento e pode evoluir para a interrupção total.',
      cesg: 'A tensão entre neutro e terra no quadro é um indicador rápido de problema no neutro; em condições normais ela fica próxima de zero.',
      questoes: [{ s: 'Uma conexão de neutro oxidada, com resistência de alguns ohms, numa instalação com cargas desequilibradas, provoca', o: ['nenhum efeito, pois o neutro não conduz', 'deslocamento parcial do potencial do neutro, com tensões fase-neutro desiguais e aquecimento da conexão', 'interrupção total das fases', 'aumento da frequência', 'atuação obrigatória do DPS'], a: 1, c: 'A corrente de desequilíbrio produz queda de tensão na resistência da conexão, deslocando o neutro; a potência I²R aquece o ponto.' },
        { s: 'Ao medir a tensão entre o neutro e o condutor de proteção (PE) num quadro de distribuição em esquema TN-C-S, em condições normais, o valor esperado é', o: ['próximo de 0 V', '127 V', '220 V', '380 V', 'igual à tensão de fase dividida por √3'], a: 0, c: 'No TN, neutro e PE vêm do mesmo ponto aterrado; entre eles só aparece a pequena queda de tensão no neutro.' }] },
    { id: 'fase', nome: 'Falta de fase no quadro', diag: 'fase', act: 'fase', ideal: 3,
      hints: ['Meça as três tensões fase-neutro no quadro.', 'Uma delas é zero. E no padrão de entrada, a mesma fase tem tensão?', 'Se a fase existe no padrão e some no quadro, o defeito está entre os dois. O que existe nesse trecho?'],
      provas: [{ any: ['V:Q3-QN=baixo'], txt: '0 V entre L3 e o neutro no quadro.' }, { any: ['V:P3-PN=ok'], txt: '127 V entre L3 e o neutro no padrão: a fase chega ao ponto de entrega.' }, { any: ['A:L3=0'], txt: 'Corrente nula na fase L3 do ramal.' }],
      explica: 'Um polo do disjuntor geral abriu internamente (a alavanca continua em “ligado”). A fase L3 existe no padrão, mas não chega ao quadro: as cargas de L3 ficam sem energia, e as demais funcionam normalmente.',
      teoria: 'Comparar a mesma grandeza em dois pontos do caminho localiza o defeito no trecho entre eles. Aqui o neutro está íntegro, por isso as fases L1 e L2 continuam com 127 V.',
      cesg: 'Questões de localização de defeito comparam leituras “antes” e “depois” de um elemento.',
      questoes: [{ s: 'No quadro de uma instalação 220/127 V, mede-se 127 V entre L1 e N, 127 V entre L2 e N e 0 V entre L3 e N, enquanto no padrão de entrada as três fases estão normais. O defeito está', o: ['na rede da distribuidora', 'entre o padrão de entrada e o quadro, na fase L3', 'no neutro', 'nas cargas de L1', 'no aterramento'], a: 1, c: 'A fase existe no padrão e não chega ao quadro: a interrupção está no trecho entre eles (disjuntor geral, conexões ou condutor).' },
        { s: 'A tensão de linha entre L1 e L2 numa rede 220/127 V equilibrada é', o: ['127 V', '180 V', '220 V', '254 V', '380 V'], a: 2, c: 'Em estrela, V<sub>L</sub> = √3 · V<sub>F</sub> = 1,732 × 127 ≈ 220 V.' }] },
    { id: 'low', nome: 'Tensão baixa da distribuidora', diag: 'low', act: 'low', ideal: 3,
      hints: ['Meça as tensões fase-neutro no quadro.', 'Todas estão baixas e iguais. O problema é do quadro ou já vem de antes?', 'Meça as mesmas tensões no padrão de entrada.'],
      provas: [{ any: ['V:Q1-QN=baixo', 'V:Q2-QN=baixo', 'V:Q3-QN=baixo'], txt: 'As três tensões fase-neutro baixas no quadro, mas iguais entre si.' }, { any: ['V:P1-PN=baixo', 'V:P2-PN=baixo', 'V:P3-PN=baixo', 'V:P1-P2=baixo', 'V:P2-P3=baixo', 'V:P1-P3=baixo'], txt: 'As tensões já estão baixas no padrão de entrada, antes da instalação interna.' }, { any: ['V:QN-QPE=0'], txt: 'Neutro no potencial de terra: o neutro está bom.' }],
      explica: 'A tensão está baixa (cerca de 110/190 V) já no ponto de entrega. O problema não é da instalação interna: vem da rede da distribuidora.',
      teoria: 'O ponto de entrega separa as responsabilidades. Medir no padrão de entrada antes de mexer no quadro evita trocar componentes bons. Tensões baixas e equilibradas, com neutro no potencial de terra, indicam problema de fornecimento.',
      cesg: 'Conhecer o limite de responsabilidade (ponto de entrega) é conteúdo de instalações em BT.',
      questoes: [{ s: 'Numa unidade consumidora em baixa tensão, as tensões estão baixas tanto no quadro quanto nos terminais do padrão de entrada. A conduta adequada é', o: ['trocar os condutores do ramal interno', 'registrar as medições e acionar a distribuidora, pois o problema está antes do ponto de entrega', 'trocar o disjuntor geral', 'instalar capacitores', 'reapertar o neutro do quadro'], a: 1, c: 'Se a tensão já chega baixa ao ponto de entrega, a causa está na rede da distribuidora.' },
        { s: 'Ponto de entrega é', o: ['o quadro de distribuição principal', 'o limite entre as instalações da distribuidora e as do consumidor', 'o ponto de luz mais distante', 'o barramento de equipotencialização', 'o primeiro disjuntor terminal'], a: 1, c: 'Até o ponto de entrega, a responsabilidade é da distribuidora; dali para dentro, do consumidor.' }] }
  ]
};

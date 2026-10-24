/* =====================================================================
   MISSÃO 4 — DR que desarma (vestiário e oficina)
   Edital: 8.1 (BT), 8.3 (aterramento), 10.1 (NBR 5410), 7.3 (isolação)
   Regra usada: um DR de IΔn = 30 mA deve atuar entre 50% e 100% de
   IΔn (15 a 30 mA). Modelo: soma das fugas dos circuitos ligados
   comparada ao limiar de atuação (19 mA normal; 9 mA no DR defeituoso).
   ===================================================================== */
import { fmt, noise } from '../util.js';
import { W, T, earth, HIT, RING } from '../draw.js';

export default {
  id: 'dr', modulos: ['instalacoes', 'normas-seguranca'], n: 4, titulo: 'O DR que não para ligado', area: 'Instalações e proteção',
  edital: 'Itens 7.3, 8.1, 8.3 e 10.1', local: 'Vestiário e oficina · QD-VO',
  equip: 'Quadro QD-VO com DR geral de 30 mA alimentando quatro circuitos terminais',
  sintoma: 'O DR geral do QD-VO desarma várias vezes ao dia. A equipe já pediu para “retirar esse DR que só dá problema”. Descubra a causa.',
  instr: ['L', 'T', 'M', 'I'], needsNR10: true, ctl0: {},
  C: { C1: 'Iluminação', C2: 'Tomadas da copa', C3: 'Chuveiro do vestiário', C4: 'Tomadas da oficina' },
  setup(F) {
    return { dr: false, on: { C1: true, C2: true, C3: true, C4: true }, th: F.id === 'def' ? 9 : 19,
      base: F.id === 'soma' ? { C1: 3, C2: 6, C3: 5, C4: 7 } : { C1: 1, C2: 4, C3: 3, C4: 5 } };
  },
  /** Fuga (mA) de um circuito ligado. */
  leak(R, c) { const p = R.params, f = R.F.id; let v = p.base[c]; if (f === 'np' && c === 'C2') v += 1800; if (f === 'chuv' && c === 'C3') v += 24; return v; },
  /** Corrente diferencial total vista pelo DR. */
  resid(R) { const p = R.params; return Object.keys(p.on).filter(c => p.on[c]).reduce((s, c) => s + this.leak(R, c), 0); },
  check(R) {
    const p = R.params;
    if (p.dr && R.energ && this.resid(R) >= p.th) {
      p.dr = false; const on = Object.keys(p.on).filter(c => p.on[c]);
      R.logAdd('O DR desarmou.', 'bad');
      if (on.length === 1) R.keys.add('E:only:' + on[0]);
      R.keys.add('E:trip:' + on.length);
      return true;
    }
    return false;
  },
  measure(R, ins, t) {
    const p = R.params, f = R.F.id;
    if (ins === 'L') {
      const c = t.cl; if (!c) return { na: 'Abrace com o alicate de fuga o par fase-neutro de um circuito (anel) ou a entrada geral.' };
      const where = c === 'G' ? 'entrada geral (F + N)' : 'circuito ' + c + ' (F + N)';
      if (!p.dr || !R.energ) return { txt: '0,0', unit: 'mA', where, interp: 'O DR está desarmado (ou o quadro desenergizado): não há tensão nem corrente. Rearme e meça.', key: 'L:x' };
      let v = c === 'G' ? this.resid(R) : (p.on[c] ? this.leak(R, c) : 0); v = v ? noise(v, 0.04) : 0;
      const it = c === 'G' ? 'Fuga total da instalação neste momento. Lembre: um DR de 30 mA pode atuar a partir de 15 mA.' : (p.on[c] ? 'Fuga deste circuito: a diferença entre a corrente que vai pela fase e a que volta pelo neutro.' : 'Circuito desligado: sem corrente.');
      return { txt: fmt(v, 1), unit: 'mA', where, interp: it, key: `L:${c}=${v > 0 ? 'x' : '0'}` };
    }
    if (ins === 'T') {
      if (t.c !== 'DR') return { na: 'Com o testador, toque no DR.' };
      if (!p.dr) return { na: 'Rearme o DR antes do teste.' };
      const res = this.resid(R), v = Math.max(0.5, p.th - res); p.dr = false; R.logAdd('O testador provocou a atuação do DR.');
      const cls = v < 15 ? 'low' : v > 30 ? 'high' : 'ok';
      const it = (res > 0.5 ? 'Atenção: há circuitos ligados, e a fuga deles se soma à corrente do teste; o valor medido fica menor que o real. Para um resultado confiável, desligue os circuitos. ' : '') + (cls === 'ok' ? 'Atuação entre 15 e 30 mA (50% a 100% de IΔn): o DR está dentro da faixa.' : cls === 'low' ? 'Atuação abaixo de 15 mA, isto é, abaixo de 50% de IΔn: se os circuitos estavam desligados, o DR atua cedo demais.' : 'Acima de 30 mA: o DR não protege como deveria.');
      return { txt: fmt(v, 1), unit: 'mA', where: 'DR geral (rampa de corrente diferencial)', interp: it, key: `T:DR=${res > 0.5 ? 'carga' : cls}` };
    }
    if (ins === 'M') {
      const c = t.c; if (!this.C[c]) return { na: 'Com o megôhmetro, toque na fiação de um circuito (desconecta-se o neutro do barramento para o ensaio).' };
      let fpe = '> 200', npe = '> 200', k = 'ok';
      if (f === 'np' && c === 'C2') { npe = '0,00'; k = 'NPE0'; }
      if (f === 'chuv' && c === 'C3') { fpe = '0,12'; k = 'FPElow'; }
      const it = k === 'ok' ? 'Isolação alta entre os condutores do circuito e o PE: em bom estado.' : k === 'NPE0' ? 'N–PE em praticamente zero: o neutro deste circuito está ligado ou encostado no condutor de proteção em algum ponto depois do DR.' : 'Isolação fase–PE muito baixa: há falha de isolação no circuito ou no equipamento.';
      return { txt: `${fpe} | ${npe}`, unit: 'MΩ', where: `circuito ${c}: F–PE | N–PE (500 V CC)`, interp: it, key: `M:${c}=${k}` };
    }
    if (ins === 'I') {
      const c = t.c; let txt;
      if (c === 'DR') txt = 'Interruptor DR, IΔn = 30 mA, In = 40 A. O botão de teste faz o DR atuar normalmente.';
      else if (c === 'LD3') txt = f === 'chuv' ? 'Chuveiro com a resistência de aspecto envelhecido. Não é conclusivo: meça.' : 'Chuveiro sem anomalias visíveis.';
      else if (/^LD/.test(c)) txt = 'Carga sem anomalias visíveis.';
      else if (this.C[c]) txt = 'Fiação do circuito no quadro sem anomalias visíveis. Ligações em caixas a jusante não são visíveis daqui.';
      else return { na: 'Toque num componente.' };
      return { txt: 'OK', unit: '', where: c === 'DR' ? 'DR geral' : c, interp: txt, key: 'I:' + c };
    }
  },
  action(R, a) {
    const p = R.params;
    if (a === 'rearm') {
      if (!R.energ) { R.logAdd('Circuito desenergizado: reenergize antes de rearmar.', 'bad'); return; }
      if (p.dr) { R.logAdd('O DR já está armado.'); return; }
      p.dr = true; R.logAdd('DR rearmado.');
      if (this.check(R)) R.logAdd('Desarmou imediatamente ao ser rearmado.', 'bad');
    }
    if (/^C\d$/.test(a)) { p.on[a] = !p.on[a]; R.logAdd(`Disjuntor de ${a} (${this.C[a]}) ${p.on[a] ? 'ligado' : 'desligado'}.`); this.check(R); }
  },
  onDesen(R) { R.params.dr = false; },
  controls(R) {
    const p = R.params;
    return `<div class="ctlrow">${Object.keys(this.C).map(c => `<button class="btn ${p.on[c] ? 'pressed' : ''}" data-act="${c}" aria-pressed="${p.on[c]}">${c}: ${p.on[c] ? 'ligado' : 'desligado'}</button>`).join('')}<button class="btn primary" data-act="rearm">Rearmar DR</button></div>
  <div class="stat"><span class="dot ${p.dr && R.energ ? 'on' : ''}"></span>DR geral: <b>${p.dr ? 'armado' : 'desarmado'}</b>${p.dr ? '' : ' · os circuitos estão sem tensão'}</div>`;
  },
  svg(R) {
    const p = R.params; let s = ''; const xs = [120, 250, 380, 510], ids = ['C1', 'C2', 'C3', 'C4'], labs = ['iluminação', 'copa', 'chuveiro', 'oficina'];
    s += W(300, 14, 300, 70, 'wire pa-s') + W(330, 14, 330, 70, 'wire nn-s') + T(292, 24, 'F', 'tn', 'end') + T(338, 24, 'N', 'tn');
    s += `<rect x="270" y="70" width="90" height="50" class="${p.dr && R.energ ? 'dr-on' : 'dr-off'}"/>` + T(315, 92, 'DR', 'ts', 'middle') + T(315, 110, '30 mA', 'tm', 'middle');
    s += W(300, 120, 300, 140, 'wire pa-s') + W(330, 120, 330, 160, 'wire nn-s') + W(80, 140, 560, 140, 'wire thick pa-s') + W(80, 160, 560, 160, 'wire thick nn-s');
    xs.forEach((x, i) => {
      s += W(x, 140, x, 180, 'wire pa-s') + W(x, 180 - 8, x + 16, 180 + 8) + W(x + 16, 180 - 8, x, 180 + 8);
      s += W(x, 180, x, 300, 'wire pa-s') + W(x + 24, 160, x + 24, 300, 'wire nn-s');
      s += `<rect x="${x - 23}" y="300" width="70" height="48" class="${p.on[ids[i]] && p.dr && R.energ ? 'load-on' : 'load'}"/>` + T(x + 12, 320, ids[i], 'ts', 'middle') + T(x + 12, 338, labs[i], 'tm', 'middle');
      s += W(x + 12, 348, x + 12, 392, 'wire pe-s dsh');
    });
    s += W(80, 392, 560, 392, 'wire thick pe-s') + T(566, 396, 'PE', 'tn') + earth(320, 392);
    s += HIT('DR', 268, 68, 94, 54, 'DR geral');
    xs.forEach((x, i) => { s += HIT(ids[i], x - 16, 190, 56, 96, 'Fiação do circuito ' + ids[i]) + HIT('LD' + (i + 1), x - 23, 300, 70, 48, 'Carga de ' + ids[i]); });
    s += RING('G', 315, 44, 30, 10, 'Alicate de fuga na entrada geral');
    xs.forEach((x, i) => { s += RING(ids[i], x + 12, 250, 22, 9, 'Alicate de fuga no circuito ' + ids[i]); });
    return `<svg viewBox="0 0 640 420" role="group" aria-label="Quadro com DR geral e quatro circuitos">${s}</svg>`;
  },
  diag: [{ id: 'np', t: 'Neutro do circuito C2 em contato com o PE depois do DR' }, { id: 'chuv', t: 'Falha de isolação no chuveiro (C3)' }, { id: 'soma', t: 'Soma das fugas naturais dos circuitos próxima do limiar de atuação do DR' }, { id: 'def', t: 'DR com defeito, atuando abaixo de 50% de IΔn' }, { id: 'disj', t: 'Disjuntor do chuveiro subdimensionado' }],
  acts: [{ id: 'np', t: 'Separar o neutro e o PE no circuito C2, corrigindo a ligação a jusante do DR' }, { id: 'chuv', t: 'Substituir a resistência (ou o chuveiro) e repetir o ensaio de isolação' }, { id: 'soma', t: 'Dividir os circuitos entre mais de um DR, reduzindo a fuga somada em cada dispositivo' }, { id: 'def', t: 'Substituir o DR e repetir o teste de atuação' }, { id: 'tirar', t: 'Retirar o DR, já que os disjuntores protegem a instalação' }],
  faults: [
    { id: 'np', nome: 'Neutro ligado ao PE', diag: 'np', act: 'np', ideal: 4,
      hints: ['Rearme o DR com tudo ligado. Depois descubra qual circuito, sozinho, faz o DR desarmar.', 'Ligue um circuito de cada vez. Quando só um faz o DR atuar, ensaie a fiação dele.', 'Desenergize e use o megôhmetro nesse circuito, olhando também o par N–PE.'],
      provas: [{ any: ['E:only:C2'], txt: 'O DR desarma sempre que C2 é ligado, mesmo sozinho.' }, { any: ['M:C2=NPE0'], txt: 'Megôhmetro: N–PE de C2 em 0 MΩ (neutro em contato com o PE).' }, { any: ['T:DR=ok'], txt: 'O próprio DR atua dentro da faixa.' }],
      explica: 'Numa caixa do circuito C2, alguém ligou o neutro ao condutor de proteção. Parte da corrente de retorno passa a voltar pelo PE, por fora do toróide do DR. Ele enxerga isso como fuga de centenas de miliampères e desarma sempre que C2 tem carga.',
      teoria: 'O toróide do DR deve envolver todos os condutores vivos (fases e neutro) e nunca o PE. Depois do DR, neutro e PE não podem se encontrar. O DR está fazendo o que deve: o erro é de montagem.',
      cesg: 'A NBR 5410 é cobrada de forma conceitual (item 10.1): esquemas de aterramento, corrente de falta no TN e uso do DR são recorrentes.',
      questoes: [{ s: 'Num circuito protegido por DR, o neutro foi ligado ao condutor de proteção numa caixa a jusante do dispositivo. O efeito esperado é', o: ['nenhum, pois neutro e PE estão no mesmo potencial', 'o DR desarma sempre que houver carga, pois parte da corrente de retorno passa pelo PE, fora do toróide', 'o DR deixa de proteger contra sobrecarga', 'a tensão do circuito dobra', 'o disjuntor do circuito atua'], a: 1, c: 'A corrente que volta pelo PE não passa pelo toróide; a soma no DR deixa de ser zero.' },
        { s: 'O circuito magnético (toróide) do DR deve envolver', o: ['somente o condutor de fase', 'todos os condutores vivos do circuito, inclusive o neutro, e não o PE', 'a fase e o PE', 'somente o PE', 'o neutro e o PE'], a: 1, c: 'O DR compara as correntes dos condutores vivos. O PE fica de fora, senão a corrente de fuga voltaria por dentro do toróide e não seria detectada.' }] },
    { id: 'chuv', nome: 'Chuveiro com fuga', diag: 'chuv', act: 'chuv', ideal: 4,
      hints: ['Descubra qual circuito, sozinho, faz o DR desarmar.', 'É o do chuveiro. Ele tem fuga de verdade, ou o problema é de ligação?', 'Desenergize e use o megôhmetro no circuito do chuveiro: olhe o par F–PE.'],
      provas: [{ any: ['E:only:C3'], txt: 'O DR desarma ao ligar C3 (chuveiro).' }, { any: ['M:C3=FPElow'], txt: 'Isolação F–PE de C3 muito baixa (0,12 MΩ).' }, { any: ['L:C1=x', 'L:C2=x', 'L:C4=x'], txt: 'Os outros circuitos têm fugas pequenas, de poucos mA.' }],
      explica: 'A resistência blindada do chuveiro está com a isolação danificada e deixa escapar para a terra uma corrente de mais de 20 mA. Somada às fugas normais, ela passa do limiar de atuação do DR.',
      teoria: 'O megôhmetro aplica uma tensão contínua de ensaio (aqui, 500 V) com o circuito desenergizado e mede resistências de isolação de centenas de megohms. Um valor de décimos de megohm, comparado aos demais, aponta a falha.',
      cesg: 'Medição de isolação é do item 7.3 (instrumentos e testes elétricos).',
      questoes: [{ s: 'No ensaio com megôhmetro, o circuito de um chuveiro apresentou 0,12 MΩ entre fase e PE, enquanto os demais circuitos ficaram acima de 200 MΩ. Conclui-se que', o: ['o circuito está normal', 'há falha de isolação no circuito do chuveiro, compatível com o desarme do DR ao ligá-lo', 'o DR está defeituoso', 'o neutro está rompido', 'o megôhmetro está descalibrado'], a: 1, c: 'Isolação muito menor que a dos demais circuitos indica caminho de fuga para a terra.' },
        { s: 'O megôhmetro deve ser usado', o: ['com o circuito energizado, para medir a isolação real', 'com o circuito desenergizado, pois aplica uma tensão contínua de ensaio e mede resistências de isolação muito altas', 'somente em corrente alternada de 60 Hz', 'para medir a corrente de fuga em funcionamento', 'em série com a carga'], a: 1, c: 'Ensaio de isolação só com o circuito desenergizado; para medir fuga em funcionamento usa-se o alicate de fuga.' }] },
    { id: 'soma', nome: 'Soma de fugas', diag: 'soma', act: 'soma', ideal: 5,
      hints: ['Tente ligar os circuitos um a um. Algum, sozinho, faz o DR desarmar?', 'Nenhum sozinho. Meça a fuga de cada circuito e a da entrada geral.', 'Some as fugas e compare com a faixa em que um DR de 30 mA pode atuar.'],
      provas: [{ any: ['L:G=x'], txt: 'Fuga total da entrada na casa dos 15 a 20 mA com quase tudo ligado.' }, { any: ['L:C1=x', 'L:C2=x', 'L:C3=x', 'L:C4=x'], txt: 'Cada circuito, isolado, tem fuga de poucos mA.' }, { any: ['M:C1=ok', 'M:C2=ok', 'M:C3=ok', 'M:C4=ok'], txt: 'Isolação boa em todos os circuitos.' }, { any: ['T:DR=ok'], txt: 'O DR atua dentro da faixa de 15 a 30 mA.' }],
      explica: 'Nenhum circuito tem defeito: cada um tem uma fuga natural pequena (filtros de equipamentos, capacitâncias dos cabos). Somadas no mesmo DR, elas chegam perto de 20 mA, dentro da faixa em que um DR de 30 mA pode atuar. Com tudo ligado, ele desarma.',
      teoria: 'Um DR de IΔn = 30 mA atua entre 15 e 30 mA (50% a 100% de IΔn). Concentrar muitos circuitos num único DR soma as fugas e causa desarmes intempestivos. A solução é dividir os circuitos entre mais de um DR, nunca retirá-lo.',
      cesg: 'A faixa de 50% a 100% de IΔn costuma aparecer em questões sobre DR.',
      questoes: [{ s: 'Um DR de 30 mA desarma de forma aleatória numa instalação com muitos equipamentos eletrônicos. Cada circuito tem fuga de poucos miliampères e a isolação está boa. Uma solução adequada é', o: ['retirar o DR', 'trocar por um DR de 300 mA no circuito das tomadas da copa', 'dividir os circuitos entre mais de um DR, reduzindo a fuga somada em cada dispositivo', 'ligar o neutro ao PE', 'aumentar o disjuntor geral'], a: 2, c: 'A fuga de cada DR passa a ser a soma de menos circuitos. Retirar o DR ou usar 300 mA onde a NBR 5410 exige 30 mA não é aceitável.' },
        { s: 'Segundo a norma de dispositivos DR, um DR de IΔn = 30 mA deve atuar', o: ['somente acima de 30 mA', 'entre 15 mA e 30 mA (de 50% a 100% de IΔn)', 'abaixo de 15 mA', 'exatamente em 30 mA', 'entre 30 mA e 60 mA'], a: 1, c: 'A faixa de atuação vai de 50% a 100% da corrente diferencial nominal.' }] },
    { id: 'def', nome: 'DR com defeito', diag: 'def', act: 'def', ideal: 3,
      hints: ['Rearme o DR e ligue os circuitos aos poucos. Ele desarma com quais combinações?', 'As fugas são pequenas e a isolação está boa. E o próprio DR, atua no valor certo?', 'Desligue os circuitos e use o testador de DR.'],
      provas: [{ any: ['T:DR=low'], txt: 'Com os circuitos desligados, o testador mostra atuação abaixo de 15 mA.' }, { any: ['M:C1=ok', 'M:C2=ok', 'M:C3=ok', 'M:C4=ok'], txt: 'Isolação boa nos circuitos.' }, { any: ['L:G=x'], txt: 'Fuga total baixa quando o DR desarma.' }],
      explica: 'O DR atua com cerca de 9 mA, abaixo do mínimo de 15 mA (50% de IΔn). Com dois ou três circuitos ligados, as fugas normais já bastam para desarmá-lo.',
      teoria: 'O botão de teste só verifica o mecanismo; não diz em que corrente o DR atua. O testador de rampa mede esse valor. Faça o teste com as cargas desligadas, senão as fugas delas se somam à corrente do teste.',
      cesg: 'A diferença entre botão de teste e teste de atuação com instrumento é uma boa pegadinha conceitual.',
      questoes: [{ s: 'Com todos os circuitos desligados, o testador registra a atuação de um DR de 30 mA em 9 mA. Conclui-se que o DR', o: ['está dentro da faixa normal', 'atua abaixo de 50% de IΔn e deve ser substituído', 'está mais seguro, pois atua antes', 'precisa de ajuste no parafuso de sensibilidade', 'está com o toróide desconectado'], a: 1, c: 'A faixa normal é de 15 a 30 mA. Abaixo dela, o DR causa desarmes indevidos.' },
        { s: 'O botão de teste do DR serve para', o: ['medir a corrente de fuga da instalação', 'verificar o funcionamento do mecanismo de disparo, simulando uma corrente diferencial', 'ajustar a sensibilidade', 'rearmar o disjuntor geral', 'medir a resistência de aterramento'], a: 1, c: 'O botão cria uma corrente diferencial interna para provar que o mecanismo funciona; não mede o valor de atuação.' }] }
  ]
};

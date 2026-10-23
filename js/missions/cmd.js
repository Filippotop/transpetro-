/* =====================================================================
   MISSÃO 1 — Comando de partida direta (bomba P-101)
   Edital: 1.2 (esquemas de comando), 5.6/5.7 (proteção e acionamento),
   7.3 (instrumentos), 10.4 (NR-10)
   Modelo: conectividade booleana do ramo da bobina
   L → F21 → 95-96 → S0 → (S1 ‖ selo) → bobina → N, iterada para o selo.
   ===================================================================== */
import { fmt, noise, rand } from '../util.js';
import { W, T, C, coil, lamp, fuseH, TPt, HIT } from '../draw.js';

export default {
  id: 'cmd', n: 1, titulo: 'A bomba que não parte', area: 'Comandos elétricos',
  edital: 'Itens 1.2, 5.6, 5.7, 7.3 e 10.4', local: 'Casa de bombas · CCM-02',
  equip: 'Partida direta da bomba de transferência P-101 · comando em 220 V',
  sintoma: 'O operador relata que a bomba P-101 “não funciona normalmente”. Verifique o circuito de comando e descubra a causa.',
  instr: ['V', 'O', 'I'], needsNR10: true, ctl0: { s1: false, s0p: false, man: false },
  setup(F) { return { k1: false, trip: F.id === 'trip', run: 0 }; },
  solve(R) {
    const f = R.F.id, p = R.params; const fuse = f !== 'fuse', s0 = f !== 's0', selo = f !== 'selo', coilOk = f !== 'coil';
    if (!R.energ) { p.k1 = false; return { pot: { TP1: 0, TP2: 0, TP3: 0, TP4: 0, TP5: 0, TPN: 0 }, k1: false, h1: false, h2: false }; }
    const t2 = fuse, t3 = t2 && !p.trip, t4 = t3 && s0 && !R.ctl.s0p; let k1 = p.k1, d = false;
    for (let i = 0; i < 3; i++) { d = t4 && (R.ctl.s1 || (k1 && selo)); k1 = d && coilOk; }
    p.k1 = k1;
    return { pot: { TP1: 1, TP2: t2 ? 1 : 0, TP3: t3 ? 1 : 0, TP4: t4 ? 1 : 0, TP5: d ? 1 : 0, TPN: 0 }, k1, h1: t2 && k1, h2: t2 && p.trip };
  },
  compPair: { F21: ['TP1', 'TP2'], F7: ['TP2', 'TP3'], S0: ['TP3', 'TP4'], S1: ['TP4', 'TP5'], K13: ['TP4', 'TP5'], KB: ['TP5', 'TPN'] },
  names: { F21: 'fusível F21', F7: 'contato 95-96 de F7', S0: 'botão S0', S1: 'botão S1', K13: 'contato 13-14 de K1', KB: 'bobina de K1', H1: 'sinaleiro H1', H2: 'sinaleiro H2', K1: 'contator K1' },
  measure(R, ins, t) {
    const S = this.solve(R), f = R.F.id, p = R.params;
    if (ins === 'V') {
      let a, b, where, comp = null;
      if (t.c) { if (!this.compPair[t.c]) return { na: 'Meça entre os pontos de teste ou nos terminais de fusível, contatos e bobina.' }; [a, b] = this.compPair[t.c]; comp = t.c; where = 'sobre ' + this.names[t.c]; }
      else { a = t.a; b = t.b; where = `${a}–${b}`; }
      const diff = Math.abs(S.pot[a] - S.pot[b]), v = diff ? noise(220, 0.01) : rand() * 0.3;
      const cls = !R.energ ? 'desen' : diff ? 'hi' : '0';
      const key = comp ? `V:${comp}=${cls}` : `V:${[a, b].sort().join('-')}=${cls}`;
      let it;
      if (!R.energ) it = 'Circuito desenergizado: nenhuma tensão. É assim que se constata a ausência de tensão antes de trabalhar.';
      else if (comp === 'KB' && diff && !S.k1) it = 'A bobina recebe 220 V, mas o contator não atraca: a bobina está interrompida.';
      else if (comp && diff) it = 'Toda a tensão aparece sobre este elemento: ele está aberto, enquanto o resto do caminho até o neutro está fechado.';
      else if (comp) it = 'Mesma tensão dos dois lados: o elemento está fechado, ou não chega tensão a nenhum dos lados. Combine com outra medição.';
      else if (diff && (a === 'TPN' || b === 'TPN')) it = 'Há tensão da fase neste ponto: tudo o que está antes dele está fechado.';
      else if (a === 'TPN' || b === 'TPN') it = 'Não chega tensão a este ponto: há uma interrupção antes dele (ou o trecho está isolado por um contato aberto).';
      else it = diff ? 'Há diferença de potencial entre os pontos: existe um elemento aberto entre eles.' : 'Mesmo potencial: o trecho entre os pontos está fechado (ou ambos sem tensão).';
      return { txt: fmt(v, 1), unit: 'V', where, interp: it, key };
    }
    if (ins === 'O') {
      if (!t.c || !this.compPair[t.c]) return { na: 'Com o ohmímetro, toque num fusível, contato ou bobina.' };
      let val; const c = t.c;
      if (c === 'F21') val = f !== 'fuse' ? '0,1' : 'OL';
      else if (c === 'F7') val = p.trip ? 'OL' : '0,0';
      else if (c === 'S0') val = f !== 's0' ? '0,1' : 'OL';
      else if (c === 'S1') val = R.ctl.s1 ? '0,1' : 'OL';
      else if (c === 'K13') val = R.ctl.man ? (f !== 'selo' ? '0,1' : 'OL') : 'OL';
      else val = f !== 'coil' ? fmt(noise(418, 0.01), 0) : 'OL';
      const na = (c === 'S1' && !R.ctl.s1) || (c === 'K13' && !R.ctl.man);
      let it;
      if (na) it = `OL num contato NA em repouso é normal: ele está aberto. Para testá-lo, ${c === 'S1' ? 'pressione S1 durante a medição' : 'acione manualmente o contator (botão de teste)'}.`;
      else if (val === 'OL') it = 'Resistência infinita: o componente está interrompido.';
      else if (c === 'KB') it = 'Algumas centenas de ohms: valor típico de bobina íntegra.';
      else it = 'Continuidade: contato fechado ou fusível íntegro.';
      return { txt: val, unit: 'Ω', where: this.names[c], interp: it, key: `O:${c}=${val === 'OL' ? (na ? 'na' : 'OL') : 'ok'}` };
    }
    if (ins === 'I') {
      const c = t.c; if (!c) return { na: 'Toque num componente para examiná-lo.' };
      const txt = {
        F21: 'Fusível de cartucho. Pela aparência não dá para saber se está íntegro: é preciso medir.',
        F7: p.trip ? 'Indicador do relé de sobrecarga na posição de disparo (trip). Ajuste: 10,5 A.' : 'Relé de sobrecarga armado. Ajuste: 10,5 A.',
        S0: 'Botão sem danos aparentes. Um contato interno pode estar com defeito sem nenhum sinal externo.', S1: 'Botão sem danos aparentes.',
        K13: 'Bloco de contatos auxiliares sem marcas de queima visíveis.', KB: 'Bobina sem sinais de aquecimento. Uma bobina interrompida pode não mostrar nada por fora.',
        K1: 'Contator fixo, sem marcas de arco.',
        H1: S.h1 ? 'Sinaleiro verde, “ligado”: aceso.' : 'Sinaleiro verde, “ligado”: apagado.',
        H2: S.h2 ? 'Sinaleiro amarelo, “falha”, ligado ao 97-98 de F7: <b>aceso</b>.' : 'Sinaleiro amarelo, “falha”, ligado ao 97-98 de F7: apagado.'
      }[c] || 'Nada de anormal.';
      const key = c === 'H2' ? `I:H2=${S.h2 ? 'on' : 'off'}` : `I:${c}`;
      return { txt: 'OK', unit: '', where: this.names[c] || c, interp: txt, key };
    }
  },
  action(R, a) {
    const p = R.params;
    if (a === 's1') {
      const before = this.solve(R).k1; R.ctl.s1 = !R.ctl.s1; const after = this.solve(R).k1;
      R.logAdd(R.ctl.s1 ? 'S1 pressionado e mantido.' : 'S1 solto.');
      if (R.ctl.s1 && !before && after) R.logAdd('K1 atracou.');
      if (!R.ctl.s1 && before && !after) { R.logAdd('K1 soltou assim que S1 foi liberado.', 'bad'); R.keys.add('E:selo'); }
    }
    if (a === 's0') {
      const before = this.solve(R).k1; R.ctl.s0p = true; this.solve(R); R.ctl.s0p = false;
      R.logAdd(before ? 'S0 pulsado: K1 soltou.' : 'S0 pulsado.');
    }
    if (a === 'rearm') { if (!p.trip) R.logAdd('O relé já está armado.'); else { p.trip = false; p.run = 0; R.logAdd('Relé de sobrecarga F7 rearmado.'); } }
    if (a === 'man') {
      if (R.energ) R.logAdd('O acionamento manual do contator só é feito com o circuito desenergizado.', 'bad');
      else { R.ctl.man = !R.ctl.man; R.logAdd(R.ctl.man ? 'Contator K1 acionado manualmente (botão de teste), para ensaiar os contatos.' : 'Contator K1 liberado.'); }
    }
  },
  onDesen(R) { R.ctl.s1 = false; }, onReen(R) { R.ctl.man = false; },
  tick(R) {
    const p = R.params; const S = this.solve(R);
    if (R.F.id === 'trip' && !p.trip && S.k1) { p.run++; if (p.run >= 15) { p.trip = true; p.run = 0; R.logAdd('O relé de sobrecarga desarmou de novo depois de uns 15 s de funcionamento.', 'bad'); R.keys.add('E:retrip'); return true; } }
    return false;
  },
  controls(R) {
    const S = this.solve(R);
    return `<div class="ctlrow">
   <button class="btn ${R.ctl.s1 ? 'pressed' : ''}" data-act="s1" aria-pressed="${R.ctl.s1}">${R.ctl.s1 ? 'Soltar S1' : 'Pressionar e manter S1'}</button>
   <button class="btn" data-act="s0">Pulsar S0</button>
   <button class="btn" data-act="rearm">Rearmar F7</button>
   <button class="btn ${R.ctl.man ? 'pressed' : ''}" ${R.energ ? 'disabled' : ''} data-act="man" aria-pressed="${R.ctl.man}">${R.ctl.man ? 'Liberar K1' : 'Acionar K1 manualmente'}</button></div>
   <div class="stat"><span class="dot ${S.k1 ? 'on' : ''}"></span>Contator K1: <b>${S.k1 ? 'atracado' : 'solto'}</b> · Motor: <b>${S.k1 ? 'girando' : 'parado'}</b></div>`;
  },
  svg(R) {
    const S = this.solve(R); let s = '';
    s += W(60, 40, 80, 40) + fuseH(80, 150, 40) + T(115, 25, 'F21', 'ts', 'middle') + W(150, 40, 560, 40) + W(60, 470, 560, 470) + T(42, 45, 'L', 'ts fa', 'end') + T(42, 475, 'N', 'ts fc', 'end');
    s += W(200, 40, 200, 60) + C(200, 60, 110, { kind: 'nf', act: 'therm', t1: '95', t2: '96', label: 'F7' }) + W(200, 110, 200, 140) + C(200, 140, 190, { kind: 'nf', act: 'push', label: 'S0' }) + W(200, 190, 200, 210);
    s += W(200, 210, 300, 210) + W(200, 210, 200, 220) + W(300, 210, 300, 220) + C(200, 220, 270, { act: 'push', label: 'S1' }) + C(300, 220, 270, { t1: '13', t2: '14' }) + T(284, 250, 'K1', 'ts', 'end');
    s += W(200, 270, 200, 280) + W(300, 270, 300, 280) + W(200, 280, 300, 280) + W(200, 280, 200, 320) + coil(200, 320, 380, 'K1', S.k1) + W(200, 380, 200, 470);
    s += W(420, 40, 420, 220) + C(420, 220, 270, { t1: '23', t2: '24' }) + T(402, 250, 'K1', 'ts', 'end') + W(420, 270, 420, 320) + lamp(420, 320, 380, 'H1', S.h1) + W(420, 380, 420, 470) + T(442, 355, 'ligado', 'tm');
    s += W(520, 40, 520, 220) + C(520, 220, 270, { act: 'therm', t1: '97', t2: '98' }) + T(492, 250, 'F7', 'ts', 'end') + W(520, 270, 520, 320) + lamp(520, 320, 380, 'H2', S.h2) + W(520, 380, 520, 470) + T(542, 355, 'falha', 'tm');
    s += HIT('F21', 82, 28, 66, 24, 'Fusível F21') + HIT('F7', 166, 56, 64, 58, 'Contato 95-96 de F7') + HIT('S0', 162, 136, 68, 58, 'Botão S0') + HIT('S1', 160, 216, 58, 58, 'Botão S1') + HIT('K13', 278, 216, 52, 58, 'Contato 13-14 de K1') + HIT('KB', 174, 318, 52, 64, 'Bobina de K1') + HIT('H1', 398, 324, 46, 52, 'Sinaleiro H1') + HIT('H2', 498, 324, 46, 52, 'Sinaleiro H2');
    s += TPt(R, 'TP1', 60, 40, 'TP1', -10, -14) + TPt(R, 'TP2', 168, 40, 'TP2', -6, -14) + TPt(R, 'TP3', 200, 125, 'TP3', 14, 5) + TPt(R, 'TP4', 200, 200, 'TP4', 14, 5) + TPt(R, 'TP5', 200, 300, 'TP5', 14, 5) + TPt(R, 'TPN', 90, 470, 'TPN', -12, 22);
    return `<svg viewBox="0 0 600 500" role="group" aria-label="Diagrama de comando da partida direta">${s}</svg>`;
  },
  diag: [{ id: 'fuse', t: 'Fusível de comando F21 queimado' }, { id: 'trip', t: 'Relé de sobrecarga F7 atuado (contato 95-96 aberto) por sobrecarga persistente' }, { id: 's0', t: 'Contato NF do botão S0 aberto (botão defeituoso)' }, { id: 'selo', t: 'Contato de selo 13-14 de K1 não fecha' }, { id: 'coil', t: 'Bobina do contator K1 interrompida' }, { id: 'mot', t: 'Enrolamento do motor queimado' }],
  acts: [{ id: 'fuse', t: 'Investigar a causa e substituir F21 por fusível de mesma especificação' }, { id: 'trip', t: 'Investigar a causa da sobrecarga no motor ou na bomba antes de rearmar e religar' }, { id: 's0', t: 'Substituir o botão S0 (ou seu bloco de contato NF)' }, { id: 'selo', t: 'Substituir o bloco de contatos auxiliares (13-14) de K1' }, { id: 'coil', t: 'Substituir a bobina de K1 (ou o contator)' }, { id: 'up', t: 'Aumentar o ajuste do relé de sobrecarga para que ele não desarme' }],
  faults: [
    { id: 'fuse', nome: 'Fusível de comando queimado', diag: 'fuse', act: 'fuse', ideal: 3,
      hints: ['Comece observando: ao pressionar S1, alguma coisa acontece? Algum sinaleiro acende?', 'Nada acende, nem com S1 pressionado. Será que a tensão chega ao trilho do comando? Meça antes e depois do primeiro elemento.', 'Compare TP1–TPN com TP2–TPN, ou meça diretamente sobre F21.'],
      provas: [{ any: ['V:TP1-TPN=hi'], txt: '220 V entre TP1 e o neutro: a alimentação chega ao painel.' }, { any: ['V:F21=hi', 'V:TP2-TPN=0', 'O:F21=OL'], txt: 'Tensão sobre F21 (ou 0 V depois dele, ou OL com ele desenergizado): o fusível está aberto.' }],
      explica: 'O fusível F21 abriu. Sem ele, nada depois do trilho tem tensão: nem a bobina, nem os sinaleiros. Por isso nenhuma lâmpada acende e S1 não faz efeito.',
      teoria: 'Num elemento em série aberto aparece toda a tensão da fonte, desde que o resto do caminho até o neutro esteja fechado. Com o circuito desenergizado, o ohmímetro confirma: OL. Fusível não se “conserta” com um de maior corrente: antes de trocar, investigue por que ele queimou.',
      cesg: 'A Cesgranrio gosta de cobrar o raciocínio de medição: “onde aparece a tensão?”. Em provas de manutenção da banca, é comum pedir a interpretação de leituras, não só fórmulas.',
      questoes: [{ s: 'Num circuito de comando energizado, o voltímetro indica 220 V entre os terminais de um fusível. Considerando que o restante do caminho até o neutro está íntegro, conclui-se que o fusível está', o: ['íntegro', 'aberto (queimado)', 'em curto-circuito', 'com resistência baixa, mas conduzindo', 'sobrecarregado'], a: 1, c: 'Um fusível íntegro tem resistência quase nula, e a tensão sobre ele é praticamente zero. Se toda a tensão aparece entre seus terminais, ele está aberto.' },
        { s: 'Antes de substituir o fusível queimado de um circuito de comando, o técnico deve', o: ['instalar um fusível de corrente maior, para evitar nova queima', 'investigar a causa da queima e usar outro de mesma especificação', 'substituí-lo por um fio de cobre', 'rearmar o relé de sobrecarga', 'religar o circuito para ver se queima de novo'], a: 1, c: 'O fusível protege o circuito. Aumentar sua corrente ou jampeá-lo tira a proteção. A queima tem uma causa (curto, bobina em curto, fiação danificada) que precisa ser encontrada.' }] },
    { id: 'trip', nome: 'Relé de sobrecarga atuado', diag: 'trip', act: 'trip', ideal: 2,
      hints: ['Observe os sinaleiros antes de medir qualquer coisa.', 'O sinaleiro de falha (H2) está ligado ao 97-98 de F7. Se ele acende, o que isso diz sobre o 95-96?', 'Rearme F7, parta o motor com S1 e acompanhe por alguns segundos.'],
      provas: [{ any: ['I:F7', 'V:F7=hi', 'O:F7=OL'], txt: 'F7 está na posição de disparo: o 95-96 está aberto (tensão sobre ele ou OL).' }, { any: ['I:H2=on'], txt: 'O sinaleiro H2 (97-98) aceso confirma a atuação do relé.' }, { any: ['E:retrip'], txt: 'Rearmado, o relé desarma de novo depois de alguns segundos: a sobrecarga continua.' }],
      explica: 'O relé de sobrecarga F7 atuou: o contato 95-96 abriu e cortou a bobina, e o 97-98 fechou e acendeu H2. Rearmado, ele desarma de novo porque a causa (a sobrecarga) continua.',
      teoria: 'O relé de sobrecarga protege o motor contra correntes moderadas e prolongadas. Ele não é a causa do problema, é o mensageiro: rearmar e aumentar o ajuste sem investigar é a pior conduta possível.',
      cesg: 'Questões de comando costumam trazer o 95-96 e o 97-98 juntos. Lembre: 95-96 é NF (em série com a bobina) e 97-98 é NA (sinalização).',
      questoes: [{ s: 'Num comando de partida direta, o sinaleiro ligado ao contato 97-98 do relé de sobrecarga está aceso e o motor não parte. O contato que impede a energização da bobina é o', o: ['13-14 do contator', '95-96 do relé de sobrecarga, que abriu', 'A1-A2 da bobina', '21-22 do contator', '97-98, que fechou em série com a bobina'], a: 1, c: 'Quando o relé atua, os dois contatos mudam juntos: o 95-96 (NF, em série com a bobina) abre, e o 97-98 (NA, da sinalização) fecha.' },
        { s: 'O relé de sobrecarga de um motor desarma novamente poucos segundos após ser rearmado. A conduta correta é', o: ['aumentar o ajuste do relé até que pare de desarmar', 'investigar a causa da sobrecarga antes de religar', 'jampear o contato 95-96', 'trocar os fusíveis por outros maiores', 'rearmar repetidamente até o motor aquecer'], a: 1, c: 'O desarme é consequência. A causa pode ser carga mecânica excessiva, falta de fase, tensão anormal ou ajuste errado, e precisa ser encontrada.' }] },
    { id: 's0', nome: 'Botão S0 com contato aberto', diag: 's0', act: 's0', ideal: 3,
      hints: ['Pressione S1: algum sinaleiro acende? E o contator?', 'Os sinaleiros não indicam falha. Siga o caminho da bobina com o voltímetro, ponto a ponto, a partir do trilho.', 'Onde a tensão some entre TP3 e TP4?'],
      provas: [{ any: ['V:TP3-TPN=hi'], txt: 'Há tensão em TP3: fusível e F7 estão fechados.' }, { any: ['V:S0=hi', 'V:TP4-TPN=0', 'O:S0=OL'], txt: 'Não há tensão depois de S0 (ou OL no ohmímetro): o contato NF de S0 está aberto.' }],
      explica: 'O contato NF do botão S0 está aberto, mesmo com o botão solto. A tensão chega até a entrada de S0 e para ali.',
      teoria: 'Botões de desligar e de emergência são NF e ficam em série: qualquer um deles aberto, por acionamento ou por defeito, desliga o circuito. Isso faz do comando um sistema à prova de falhas: um fio rompido também desliga, em vez de impedir o desligamento.',
      cesg: 'Pergunta clássica: por que desligar é em série com NF? Porque o desligamento tem prioridade e porque um defeito no próprio circuito leva ao estado seguro.',
      questoes: [{ s: 'Num comando com S0 (NF) em série com a bobina, o voltímetro mede 220 V entre o neutro e o borne de entrada de S0, e 0 V entre o neutro e o borne de saída, com S0 solto. Conclui-se que', o: ['S0 está fechado e o problema está na bobina', 'o contato NF de S0 está aberto', 'a bobina está em curto', 'o selo está defeituoso', 'o fusível está queimado'], a: 1, c: 'Com S0 solto, o NF deveria conduzir e a saída teria 220 V. A tensão some exatamente ali.' },
        { s: 'Botões de desligamento e de emergência são ligados em série com a bobina e usam contatos NF porque', o: ['consomem menos energia', 'qualquer um deles, ao ser acionado ou ao falhar aberto, interrompe o circuito, dando prioridade ao desligamento', 'contatos NA não existem em botoeiras', 'precisam ficar em paralelo com o selo', 'o NF reduz a corrente de partida'], a: 1, c: 'Em série, basta um deles abrir para desligar (função E). E um defeito que abre o circuito leva ao estado seguro.' }] },
    { id: 'selo', nome: 'Contato de selo defeituoso', diag: 'selo', act: 'selo', ideal: 2,
      hints: ['Pressione e mantenha S1. Depois solte. O que acontece com o contator?', 'Liga enquanto S1 está pressionado e cai ao soltar: qual contato deveria manter a bobina energizada?', 'Desenergize, acione o contator manualmente e meça o 13-14 com o ohmímetro.'],
      provas: [{ any: ['E:selo'], txt: 'K1 atraca com S1 pressionado e solta assim que S1 é liberado.' }, { any: ['O:K13=OL'], txt: 'Com K1 acionado manualmente, o 13-14 continua em OL: o contato não fecha.' }],
      explica: 'O contato auxiliar 13-14 de K1, que deveria fechar quando a bobina energiza e “segurar” o contator, não fecha. Por isso o motor só funciona enquanto alguém mantém S1 pressionado.',
      teoria: 'O selo é um contato NA do próprio contator em paralelo com o botão de liga. Para ensaiar um NA com ohmímetro é preciso acioná-lo: em repouso, OL é a leitura correta.',
      cesg: 'Este é um dos defeitos mais cobrados em diagnóstico de comandos: “liga enquanto o botão está pressionado e desliga ao soltar”.',
      questoes: [{ s: 'Numa partida direta, o motor liga enquanto S1 é mantido pressionado, mas para assim que o botão é solto. O defeito mais provável está no', o: ['relé de sobrecarga', 'contato de selo 13-14 do contator, em paralelo com S1', 'fusível de força', 'botão S0', 'enrolamento do motor'], a: 1, c: 'Se a bobina energiza com S1, o caminho em série está bom. Falta o caminho alternativo que a mantém: o selo.' },
        { s: 'Para ensaiar com ohmímetro um contato auxiliar NA de um contator desenergizado, é necessário', o: ['medir com o contator energizado', 'acionar mecanicamente o contator (ou seu botão de teste), pois em repouso o NA está aberto', 'medir entre A1 e A2', 'usar o megôhmetro', 'curto-circuitar a bobina'], a: 1, c: 'Ohmímetro só com o circuito desenergizado. Em repouso o NA está aberto (OL); acionado, deve mostrar continuidade.' }] },
    { id: 'coil', nome: 'Bobina do contator interrompida', diag: 'coil', act: 'coil', ideal: 2,
      hints: ['Pressione S1 e observe o contator.', 'Nada acontece. A tensão chega até a bobina?', 'Meça sobre a bobina com S1 pressionado, ou desenergize e meça a resistência dela.'],
      provas: [{ any: ['V:KB=hi', 'V:TP5-TPN=hi'], txt: 'Com S1 pressionado, há 220 V na bobina e o contator não atraca.' }, { any: ['O:KB=OL'], txt: 'Ohmímetro na bobina desenergizada: OL (interrompida).' }],
      explica: 'A bobina de K1 está interrompida. A tensão chega a ela com S1 pressionado, mas não circula corrente, não há campo e o contator não atraca.',
      teoria: 'Bobina íntegra tem resistência de algumas centenas de ohms (depende do modelo). OL indica fio rompido; resistência muito baixa indicaria espiras em curto.',
      cesg: 'A combinação “tensão presente + equipamento não atua” aponta para o próprio equipamento; “tensão ausente” aponta para o caminho até ele.',
      questoes: [{ s: 'Com S1 pressionado, mede-se 220 V entre A1 e A2, mas o contator não atraca. A causa provável é', o: ['fusível de comando queimado', 'bobina interrompida', 'relé de sobrecarga desarmado', 'S0 aberto', 'falta de tensão no comando'], a: 1, c: 'Se a tensão chegou à bobina, todo o caminho até ela está fechado. O defeito está na própria bobina.' },
        { s: 'A bobina de um contator de 220 V CA, desenergizada, apresenta no ohmímetro o valor OL. Isso indica', o: ['bobina íntegra', 'bobina em curto-circuito', 'bobina interrompida', 'contato principal colado', 'indutância muito alta'], a: 2, c: 'OL é resistência fora da escala: circuito aberto.' }] }
  ]
};

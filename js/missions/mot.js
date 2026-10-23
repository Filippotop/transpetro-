/* =====================================================================
   MISSÃO 3 — Motor que aquece e desarma (CCM)
   Edital: 5.5/5.6/5.7 (motores, proteção, acionamento), 4.1, 7.3, 10.4
   Modelo: valores tabelados por falha; o relé de sobrecarga desarma
   depois de um tempo de funcionamento (tick).
   ===================================================================== */
import { fmt, noise, rand, csub, cabs, polar } from '../util.js';
import { W, T, C, fuseV, therm, TPt, HIT, RING } from '../draw.js';

export default {
  id: 'mot', n: 3, titulo: 'O motor que desarma sozinho', area: 'Máquinas e proteção',
  edital: 'Itens 4.1, 5.5, 5.6, 5.7, 7.3 e 10.4', local: 'Estação de bombeamento · CCM-05',
  equip: 'Motor de indução trifásico da bomba P-201 · 380 V · placa: 10,2 A',
  sintoma: 'O motor da P-201 parte, funciona por algum tempo e é desligado pelo relé de sobrecarga. A operação já rearmou várias vezes. Descubra a causa antes de liberar.',
  instr: ['V', 'A', 'O', 'M', 'I'], needsNR10: true, ctl0: {},
  setup(F) { return { run: false, trip: false, t: 0, tripT: { fase: 25, carga: 30, ajuste: 20, deseq: 40 }[F.id] }; },
  lines(R) { return R.F.id === 'deseq' ? [polar(219.4, 0), polar(219.4, -120), polar(200, 120)] : [polar(219.4, 0), polar(219.4, -120), polar(219.4, 120)]; },
  cur(R) { if (!R.params.run || !R.energ) return [0, 0, 0]; return { fase: [17.6, 0, 17.4], carga: [12.6, 12.4, 12.7], ajuste: [9.9, 10.1, 9.8], deseq: [11.4, 9.2, 10.6] }[R.F.id]; },
  measure(R, ins, t) {
    const f = R.F.id, p = R.params;
    if (ins === 'V') {
      if (t.c && /^F[123]$/.test(t.c)) {
        const i = +t.c[1] - 1; let v = 0.1;
        if (R.energ && f === 'fase' && i === 1) v = p.run ? noise(150, 0.06) : noise(3, 0.5);
        const hi = v > 20;
        const it = !R.energ ? 'Circuito desenergizado: sem tensão.' : hi ? 'Um fusível íntegro mostra praticamente 0 V. Uma tensão apreciável sobre ele indica que está aberto. O valor exato depende da tensão que o próprio motor, girando, induz no terminal da fase perdida.' : (f === 'fase' && i === 1 && !p.run && R.energ ? 'Leitura baixa e instável: com o motor parado e o contator aberto, o lado de baixo do fusível fica isolado, e a medição não é conclusiva.' : 'Praticamente 0 V sobre o fusível: ele está conduzindo (ou o circuito está sem carga). Repita com o motor funcionando.');
        return { txt: fmt(v, 1), unit: 'V', where: 'sobre o fusível ' + t.c, interp: it, key: `V:${t.c}=${hi ? 'hi' : '0'}` };
      }
      if (t.c) return { na: 'Meça tensões de linha entre os pontos B1, B2 e B3, ou sobre os fusíveis.' };
      const L = this.lines(R), ix = { B1: 0, B2: 1, B3: 2 }; const a = t.a, b = t.b;
      const v = R.energ ? noise(cabs(csub(L[ix[a]], L[ix[b]])), 0.004) : rand() * 0.2;
      const cls = !R.energ ? '0' : v < 370 ? 'baixo' : 'ok';
      const it = !R.energ ? 'Circuito desenergizado: sem tensão.' : cls === 'ok' ? 'Tensão de linha normal: 380 V.' : 'Tensão de linha abaixo de 380 V. Compare com as outras duas: se forem diferentes entre si, há desequilíbrio na alimentação.';
      return { txt: fmt(v, 1), unit: 'V', where: `${a}–${b}`, interp: it, key: `V:${[a, b].sort().join('-')}=${cls}` };
    }
    if (ins === 'A') {
      if (!t.cl) return { na: 'Toque num dos anéis sobre os cabos do motor.' };
      const i = +t.cl - 1; const I = this.cur(R); const v = I[i] ? noise(I[i], 0.01) : rand() * 0.02;
      const run = p.run && R.energ;
      const cls = !run ? 'parado' : v < 0.2 ? '0' : v > 11 ? 'alta' : v < 9.5 ? 'baixa' : 'nom';
      let it;
      if (!run) it = 'Motor parado: corrente nula. Parta o motor para medir.';
      else if (cls === '0') it = 'Corrente nula nesta linha com o motor girando: o motor está funcionando com duas fases (falta de fase).';
      else if (cls === 'alta') it = 'Acima da corrente nominal da placa (10,2 A). Compare as três linhas: se todas estiverem altas e iguais, suspeite de carga; se forem desiguais, de alimentação.';
      else if (cls === 'baixa') it = 'Abaixo da corrente nominal. Compare com as outras linhas.';
      else it = 'Dentro da corrente nominal da placa (10,2 A).';
      return { txt: fmt(v, 1), unit: 'A', where: 'cabo da linha L' + (i + 1), interp: it, key: `A:${i + 1}=${cls}` };
    }
    if (ins === 'O') {
      const c = t.c;
      if (/^F[123]$/.test(c)) { const v = (f === 'fase' && c === 'F2') ? 'OL' : '0,0'; return { txt: v, unit: 'Ω', where: 'fusível ' + c, interp: v === 'OL' ? 'Fusível aberto.' : 'Fusível íntegro.', key: `O:${c}=${v === 'OL' ? 'OL' : 'ok'}` }; }
      if (c === 'MOT') return { txt: '2,4 | 2,4 | 2,4', unit: 'Ω', where: 'enrolamentos U–V, V–W, W–U', interp: 'Resistências iguais entre os três pares de terminais: enrolamentos equilibrados, sem interrupção nem curto entre espiras detectável.', key: 'O:MOT=ok' };
      return { na: 'Com o ohmímetro, toque num fusível ou no motor.' };
    }
    if (ins === 'M') {
      if (t.c !== 'MOT') return { na: 'Com o megôhmetro, toque no motor (ensaio dos enrolamentos contra a carcaça).' };
      return { txt: '> 500', unit: 'MΩ', where: 'enrolamentos U, V e W contra a carcaça', interp: 'Resistência de isolação muito alta nas três fases (850, 870 e 860 MΩ): a isolação está boa e não explica o defeito.', key: 'M:MOT=ok' };
    }
    if (ins === 'I') {
      const c = t.c; let txt;
      if (c === 'F7') txt = `Relé de sobrecarga ${p.trip ? 'DESARMADO (indicador de trip)' : 'armado'}. Dial de ajuste em <b>${f === 'ajuste' ? '7,0' : '10,5'} A</b>.`;
      else if (c === 'PLACA') txt = 'Placa do motor: 380 V · 10,2 A · 60 Hz · ligação conforme a tensão da rede.';
      else if (c === 'BOMBA') txt = R.energ ? 'Para girar o eixo à mão é preciso desenergizar e bloquear o circuito (NR-10).' : (f === 'carga' ? 'Com o circuito bloqueado, ao girar o eixo à mão: <b>eixo pesado e ruído de rolamento</b>.' : 'Com o circuito bloqueado, ao girar o eixo à mão: gira livremente, sem ruídos.');
      else if (/^F[123]$/.test(c)) txt = 'Fusível NH. Pela aparência não dá para saber se está íntegro: meça.';
      else if (c === 'K1') txt = 'Contator principal sem marcas de arco nos contatos visíveis.';
      else if (c === 'MOT') txt = p.run ? 'Motor funcionando, carcaça bem aquecida ao toque com as costas da mão.' : 'Motor parado, carcaça morna.';
      else return { na: 'Toque num componente.' };
      const key = c === 'BOMBA' ? `I:BOMBA=${R.energ ? 'x' : (f === 'carga' ? 'pesado' : 'livre')}` : `I:${c}`;
      return { txt: 'OK', unit: '', where: { F7: 'relé de sobrecarga F7', PLACA: 'placa do motor', BOMBA: 'bomba P-201', K1: 'contator K1', MOT: 'motor' }[c] || c, interp: txt, key };
    }
  },
  action(R, a) {
    const p = R.params;
    if (a === 'start') {
      if (!R.energ) { R.logAdd('Circuito desenergizado e bloqueado: não é possível partir.', 'bad'); return; }
      if (p.trip) { R.logAdd('F7 está desarmado: rearme antes de partir.', 'bad'); return; }
      if (p.run) return; p.run = true; p.t = 0; R.logAdd('Motor partido.');
    }
    if (a === 'stop' && p.run) { p.run = false; R.logAdd('Motor desligado por S0.'); }
    if (a === 'rearm') { if (p.trip) { p.trip = false; R.logAdd('Relé de sobrecarga rearmado.'); } else R.logAdd('O relé já está armado.'); }
  },
  onDesen(R) { R.params.run = false; },
  tick(R) {
    const p = R.params;
    if (p.run && R.energ) {
      p.t++;
      if (p.t >= p.tripT) { p.run = false; p.trip = true; p.t = 0; R.logAdd(`O relé de sobrecarga desarmou o motor depois de ${p.tripT} s de funcionamento.`, 'bad'); }
      return true;
    }
    return false;
  },
  controls(R) {
    const p = R.params;
    return `<div class="ctlrow"><button class="btn" ${p.run || !R.energ ? 'disabled' : ''} data-act="start">Partir o motor (S1)</button><button class="btn" ${p.run ? '' : 'disabled'} data-act="stop">Parar (S0)</button><button class="btn" data-act="rearm">Rearmar F7</button></div>
   <div class="stat"><span class="dot ${p.run ? 'on' : ''}"></span>Motor: <b>${p.run ? `girando há ${p.t} s` : 'parado'}</b> · F7: <b>${p.trip ? 'desarmado' : 'armado'}</b>${p.run ? ' <span class="tm">(meça enquanto ele gira)</span>' : ''}</div>`;
  },
  svg(R) {
    const p = R.params; const xs = [180, 240, 300], cl = ['pa-s', 'pb-s', 'pc-s']; let s = '';
    xs.forEach((x, i) => { s += T(x, 22, 'L' + (i + 1), 'ts ' + ['fa', 'fb', 'fc'][i], 'middle') + W(x, 28, x, 62, 'wire ' + cl[i]) + fuseV(x, 62, 122) + W(x, 122, x, 150) + C(x, 150, 210, { mark: 'k' }) + W(x, 210, x, 235) + therm(x, 235, 290) + W(x, 290, x, 320); });
    s += W(120, 40, 360, 40, 'wire thick') + T(372, 45, 'barramento', 'tm');
    s += T(150, 96, 'F1 F2 F3', 'tn', 'end') + `<line x1="167" y1="186" x2="294" y2="186" class="wire dsh"/>` + T(150, 186, 'K1', 'ts', 'end') + `<line x1="169" y1="262" x2="289" y2="262" class="wire dsh"/>` + T(150, 266, 'F7', 'ts', 'end');
    s += `<path d="M180 320 V345 L220 372 M240 320 V362 M300 320 V345 L260 372" class="wire"/>`;
    s += `<circle cx="240" cy="400" r="32" class="${p.run ? 'mot-on' : 'comp'}"/>` + T(240, 399, 'M', 'tl', 'middle') + T(240, 415, '3~', 'tn', 'middle');
    s += W(272, 400, 340, 400, 'wire thick') + `<rect x="340" y="372" width="96" height="56" class="load"/>` + T(388, 398, 'bomba', 'ts', 'middle') + T(388, 414, 'P-201', 'tm', 'middle');
    s += `<rect x="460" y="300" width="160" height="70" class="plate"/>` + T(540, 322, 'placa do motor', 'tm', 'middle') + T(540, 342, '380 V · 10,2 A', 'ts', 'middle') + T(540, 360, '60 Hz', 'tm', 'middle');
    s += HIT('F1', 168, 64, 24, 56, 'Fusível F1') + HIT('F2', 228, 64, 24, 56, 'Fusível F2') + HIT('F3', 288, 64, 24, 56, 'Fusível F3') + HIT('K1', 160, 148, 160, 64, 'Contator K1') + HIT('F7', 160, 236, 160, 54, 'Relé de sobrecarga F7') + HIT('MOT', 206, 366, 68, 68, 'Motor') + HIT('BOMBA', 340, 372, 96, 56, 'Bomba P-201') + HIT('PLACA', 460, 300, 160, 70, 'Placa do motor');
    xs.forEach((x, i) => { s += RING(String(i + 1), x, 330, 16, 9, 'Alicate no cabo da linha L' + (i + 1)); });
    s += TPt(R, 'B1', 180, 48, 'B1', -30, 4) + TPt(R, 'B2', 240, 48, 'B2', 8, -8) + TPt(R, 'B3', 300, 48, 'B3', 10, 4);
    return `<svg viewBox="0 0 640 450" role="group" aria-label="Circuito de força do motor da bomba P-201">${s}</svg>`;
  },
  diag: [{ id: 'fase', t: 'Falta de fase: fusível F2 aberto' }, { id: 'carga', t: 'Sobrecarga mecânica na bomba (rolamento)' }, { id: 'ajuste', t: 'Relé de sobrecarga ajustado abaixo da corrente nominal do motor' }, { id: 'deseq', t: 'Desequilíbrio de tensão na alimentação' }, { id: 'iso', t: 'Isolação dos enrolamentos deteriorada' }],
  acts: [{ id: 'fase', t: 'Substituir F2 por fusível de mesma especificação, investigar a causa e verificar os demais' }, { id: 'carga', t: 'Encaminhar a bomba para manutenção mecânica (rolamento) antes de religar' }, { id: 'ajuste', t: 'Ajustar o relé de sobrecarga de acordo com a corrente nominal da placa' }, { id: 'deseq', t: 'Investigar a origem do desequilíbrio na alimentação (conexões, cargas, fornecimento)' }, { id: 'up', t: 'Aumentar o ajuste do relé para 15 A' }],
  faults: [
    { id: 'fase', nome: 'Falta de fase', diag: 'fase', act: 'fase', ideal: 3,
      hints: ['Parta o motor e meça a corrente nas três linhas enquanto ele gira.', 'Uma das linhas não conduz. Onde, no caminho dessa linha, algo pode ter aberto?', 'Meça sobre os fusíveis com o motor girando, ou desenergize e meça a resistência deles.'],
      provas: [{ any: ['A:2=0'], txt: 'Corrente nula na linha L2 com o motor girando, e as outras duas bem acima da nominal.' }, { any: ['O:F2=OL', 'V:F2=hi'], txt: 'Fusível F2 aberto (OL desenergizado, ou tensão sobre ele com o motor girando).' }, { any: ['V:B1-B2=ok', 'V:B2-B3=ok', 'V:B1-B3=ok'], txt: 'Tensões normais no barramento: a fase chega ao CCM.' }],
      explica: 'O fusível F2 abriu e o motor passou a funcionar com duas fases. Para entregar a mesma potência à bomba, as duas linhas restantes passam a conduzir bem mais que a nominal (aqui, cerca de 1,7 vez), e o relé de sobrecarga atua.',
      teoria: 'Um motor de indução girando não para necessariamente ao perder uma fase: continua girando, mas sobrecarregado, e aquece. Medir a tensão nos terminais do motor girando pode enganar, porque o próprio motor induz tensão no terminal da fase perdida. Corrente nas três linhas e teste dos fusíveis desenergizados são as provas seguras.',
      cesg: 'Falta de fase e corrente de partida aparecem com frequência em questões de motores, inclusive cálculos de partida estrela-triângulo.',
      questoes: [{ s: 'Um motor de indução trifásico em funcionamento perde uma fase por queima de fusível. Mantida a carga, espera-se que', o: ['o motor pare imediatamente em qualquer situação', 'o motor continue girando, com corrente nas linhas restantes bem acima da nominal, aquecendo os enrolamentos', 'as correntes caiam pela metade', 'o sentido de rotação se inverta', 'a tensão nas fases restantes dobre'], a: 1, c: 'Com duas fases, o motor ainda produz conjugado se já estiver girando, mas a corrente nas linhas restantes sobe muito para manter a potência.' },
        { s: 'Na manutenção, a falta de fase num motor em funcionamento deve ser confirmada medindo a corrente nas três linhas ou testando os fusíveis desenergizados, e não apenas a tensão nos terminais do motor, porque', o: ['o voltímetro não mede tensão trifásica', 'o motor girando induz tensão no terminal da fase perdida, e a leitura pode parecer quase normal', 'a tensão nos terminais é sempre zero', 'o alicate mede tensão', 'a norma proíbe medir tensão'], a: 1, c: 'O motor funciona como um gerador para a fase perdida; a tensão no terminal aberto engana. A corrente nula naquela linha não engana.' }] },
    { id: 'carga', nome: 'Sobrecarga mecânica', diag: 'carga', act: 'carga', ideal: 3,
      hints: ['Parta o motor e meça as correntes. Compare com a placa.', 'Correntes iguais entre si e altas. As tensões de alimentação estão normais?', 'Se a alimentação está boa e as correntes estão equilibradas e altas, olhe para a carga. Como examinar a bomba com segurança?'],
      provas: [{ any: ['A:1=alta', 'A:2=alta', 'A:3=alta'], txt: 'Correntes equilibradas e acima da nominal da placa (10,2 A).' }, { any: ['V:B1-B2=ok', 'V:B2-B3=ok', 'V:B1-B3=ok'], txt: 'Tensões de alimentação normais.' }, { any: ['I:BOMBA=pesado'], txt: 'Eixo pesado e ruído de rolamento ao girar à mão, com o circuito bloqueado.' }],
      explica: 'O rolamento da bomba está se degradando e aumentando o conjugado resistente. O motor, saudável, absorve mais corrente para acioná-la, de forma equilibrada nas três fases, e o relé atua corretamente.',
      teoria: 'Correntes equilibradas e altas, com tensões normais e isolação boa, apontam para a carga mecânica. O relé de sobrecarga estava fazendo exatamente o trabalho dele.',
      cesg: 'Questões de manutenção pedem a relação entre sintoma e causa provável: o padrão das três correntes é a chave.',
      questoes: [{ s: 'Correntes equilibradas e acima da nominal nas três fases de um motor, com tensões de alimentação normais, indicam mais provavelmente', o: ['falta de fase', 'sobrecarga mecânica', 'neutro rompido', 'isolação baixa', 'relé ajustado abaixo do nominal'], a: 1, c: 'O motor pede mais corrente de forma igual nas três fases porque a carga exige mais conjugado.' },
        { s: 'Para verificar a condição mecânica de uma bomba acoplada, girando o eixo à mão, o técnico deve antes', o: ['apenas pressionar o botão S0', 'desenergizar o circuito seguindo a sequência da NR-10, com impedimento de reenergização', 'manter o motor energizado para comparar', 'retirar o relé de sobrecarga', 'medir a isolação com o motor ligado'], a: 1, c: 'Desligar pelo botão não impede a religação. É preciso seccionar, impedir a reenergização, constatar a ausência de tensão e seguir as demais etapas.' }] },
    { id: 'ajuste', nome: 'Relé ajustado errado', diag: 'ajuste', act: 'ajuste', ideal: 3,
      hints: ['Parta o motor e meça as correntes. Compare com a placa.', 'As correntes estão normais e mesmo assim o relé atua. O que o relé usa como referência?', 'Examine o relé de sobrecarga e compare com a placa do motor.'],
      provas: [{ any: ['A:1=nom', 'A:2=nom', 'A:3=nom'], txt: 'Correntes equilibradas e dentro da nominal (cerca de 10 A).' }, { any: ['I:F7'], txt: 'Dial do relé em 7,0 A.' }, { any: ['I:PLACA'], txt: 'Placa do motor: 10,2 A.' }],
      explica: 'Depois de uma troca do relé, o dial ficou em 7,0 A, abaixo da corrente nominal de 10,2 A. O motor funciona normalmente, mas o relé “enxerga” uma sobrecarga que não existe e desliga.',
      teoria: 'O ajuste do relé de sobrecarga se baseia na corrente nominal da placa do motor. Abaixo dela, há desligamentos indevidos; muito acima, o motor fica sem proteção.',
      cesg: 'Ajuste de proteção de motores é tema do item 5.6.',
      questoes: [{ s: 'O relé de sobrecarga de um motor de corrente nominal 10,2 A está ajustado em 7 A. Com o motor operando normalmente, com cerca de 10 A, espera-se que', o: ['o relé nunca atue', 'o relé atue indevidamente após algum tempo, desligando o motor sem sobrecarga real', 'o motor queime', 'a corrente caia para 7 A', 'os fusíveis queimem'], a: 1, c: 'O relé compara a corrente com o ajuste. Com 10 A contra 7 A de ajuste, ele interpreta como sobrecarga.' },
        { s: 'O ajuste do relé de sobrecarga de um motor deve ser feito, como regra geral, com base', o: ['na corrente de partida do motor', 'na corrente nominal indicada na placa do motor', 'na corrente dos fusíveis', 'na tensão de comando', 'no dobro da corrente nominal'], a: 1, c: 'A referência é a corrente nominal do motor, que vem na placa.' }] },
    { id: 'deseq', nome: 'Desequilíbrio de tensão', diag: 'deseq', act: 'deseq', ideal: 4,
      hints: ['Parta o motor e meça as correntes nas três linhas.', 'As correntes são desiguais. O problema é do motor ou da alimentação?', 'Meça as três tensões de linha no barramento.'],
      provas: [{ any: ['V:B2-B3=baixo', 'V:B1-B3=baixo'], txt: 'Tensões de linha desiguais no barramento (cerca de 380, 363 e 363 V).' }, { any: ['A:1=alta', 'A:2=baixa', 'A:3=nom'], txt: 'Correntes desiguais nas três linhas, com o motor girando.' }, { any: ['M:MOT=ok', 'O:MOT=ok'], txt: 'Isolação e enrolamentos do motor em bom estado.' }],
      explica: 'A alimentação está desequilibrada: uma fase com tensão menor. O motor responde com correntes desiguais, e o desequilíbrio das correntes é proporcionalmente bem maior que o das tensões. A linha mais carregada passa da nominal, e o relé atua.',
      teoria: 'Pequenos desequilíbrios de tensão produzem desequilíbrios de corrente várias vezes maiores e aquecimento adicional nos enrolamentos. A solução está na alimentação, não no motor.',
      cesg: 'Sistemas trifásicos simétricos e equilibrados (item 4) aparecem em questões conceituais; o desequilíbrio é a aplicação prática.',
      questoes: [{ s: 'Tensões de linha de 380 V, 363 V e 363 V na alimentação de um motor trifásico caracterizam', o: ['sistema equilibrado', 'desequilíbrio de tensão, que provoca correntes desiguais e aquecimento adicional do motor', 'falta de fase', 'sobretensão', 'inversão de sequência'], a: 1, c: 'As três tensões de linha deveriam ser iguais. A diferença caracteriza desequilíbrio.' },
        { s: 'Num motor alimentado por tensões desequilibradas, as correntes de linha', o: ['permanecem iguais', 'tornam-se desequilibradas, em geral em proporção maior que o desequilíbrio das tensões', 'anulam-se', 'dobram igualmente', 'tornam-se contínuas'], a: 1, c: 'A impedância do motor à componente de sequência negativa é baixa; por isso um pequeno desequilíbrio de tensão gera um desequilíbrio de corrente bem maior.' }] }
  ]
};

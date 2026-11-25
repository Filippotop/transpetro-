/* Elétrica de Ouro: Plano de 10/11 a 05/12/2026 (DATA.plan). A prova é em 06/12/2026 (domingo): a Transpetro adiou de 29/11 para 06/12
   (DOU de 10/09/2026; cartão de confirmação em 01/12).
   10 a 15/11: o plano original (já em curso). 16/11 em diante, o plano de estudo pesado, em quatro fases:
   (1) 16 a 24/11, primeira passada pelas estações que faltam, na ordem do peso na prova de 2023 (DATA.mapa2023: E3 8, I1 5, E1 4, M2 4, A2 4, N1 4,
       X1 4, X2 4, E2 3, M3 2, X3 2, A1 2, I3 2, I2 2, M1 0; P1 e C1 não têm peso);
   (2) 25 a 27/11, simulado completo e pontos fracos;
   (3) 28/11 a 04/12, provas reais (2018 fora do app, 2023 no app), segunda passada pelas estações de maior peso, simulados e erros;
   (4) 05/12, véspera: só reler.
   Tarefa: {k, a, t}. k = mod (estação a, marca sozinha quando concluída), rev (reabrir a estação a na aba Questões; só se marca à mão),
   game (jogo a), bib (aba a), sim (foco a), prova ('t23:PME'), provares, erros, refazer, novos, painel, bancada ou out (fora do app, marcada à mão).
   Conferido por tests/biblioteca.test.mjs. */
(function (D) {
  var M = function (a) { return { k: 'mod', a: a }; };
  var R = function (a, t) { return { k: 'rev', a: a, t: t }; };
  var T = function (k, a, t) { return { k: k, a: a, t: t }; };
  var O = function (t) { return { k: 'out', t: t }; };
  var MAT = 'Matemática, 40 min de ';
  /* md = 'MM-DD'; o rótulo (dia da semana + DD/MM) vem de l + data */
  var dia = function (md, l, foco, tasks) { return { d: '2026-' + md, l: l + ' ' + md.slice(3) + '/' + md.slice(0, 2), foco: foco, tasks: tasks }; };
  D.plan = [
    dia('11-10', 'ter', 'Potência e trifásicos (8 questões em 2023)', [M('E3'), T('game', 'formula', 'Arena: Qual é a fórmula? (10 rodadas)'), O(MAT + 'razão, proporção, regra de três e porcentagem (Mat 2)')]),
    dia('11-11', 'qua', 'Instalações e NBR 5410 (5 questões em 2023)', [M('I1'), T('bib', 'anc', 'Biblioteca: números-âncora de proteção, condutores e instalações'), T('game', 'vf', 'Arena: V ou F relâmpago (inclui as regras de Português da P1)')]),
    dia('11-12', 'qui', 'Circuitos CC (4 questões em 2023)', [M('E1'), T('game', 'unid', 'Arena: Grandeza e unidade'), O(MAT + 'equações do 1º e do 2º grau e sistemas lineares (Mat 4)')]),
    dia('11-13', 'sex', 'Eletromagnetismo e transformadores (4 questões em 2023)', [M('M2'), M('P1'), T('novos', null, 'Treino: 10 questões de números novos')]),
    dia('11-14', 'sáb', 'Prova de 2023 inteira, com relógio', [T('prova', 't23:PME', 'Prova Transpetro 2023 completa (60 questões, 4 horas), em modo prova'), O('Faça de uma vez só, sem consulta e sem celular por perto, como no dia')]),
    dia('11-15', 'dom', 'Corrigir a prova de 2023', [T('provares', 't23', 'Resultado da prova de 2023: veja o corte por bloco e abra cada questão errada'), T('erros', null, 'Caderno de erros: escreva a regra de cada erro em uma frase'), T('painel', null, 'Painel: compare o acerto por item do edital com a marca da prova de 2023')]),

    /* ---- Fase 1: primeira passada (16 a 24/11) ---- */
    dia('11-16', 'seg', 'Automação, CLP e controle (4 questões em 2023)', [
      T('painel', null, 'Painel: se E3, I1, E1, M2 ou P1 (dias 10 a 13) ainda não estão concluídas, faça-as antes de seguir; hoje o dia é da A2, e o plano continua daqui'),
      M('A2'), T('game', 'formula', 'Arena: Qual é a fórmula? (10 rodadas)')]),
    dia('11-17', 'ter', 'Segurança, NR-10 e manutenção (4 questões em 2023)', [
      M('N1'), T('bib', 'nr10', 'Biblioteca: NR-10 lado a lado (leia o texto em vigor, o de 2019, e as pegadinhas)'),
      T('game', 'nr10', 'Arena: Ordene a NR-10, até acertar as duas sequências sem errar'), T('sim', 'PT', 'Simulado de Português: 20 questões, 40 minutos')]),
    dia('11-18', 'qua', 'Matemática 1: números, proporções, porcentagem e juros (4 em 2023)', [
      M('X1'), T('novos', null, 'Treino: 10 questões de números novos (as de Matemática, se aparecerem)'), T('game', 'vf', 'Arena: V ou F relâmpago')]),
    dia('11-19', 'qui', 'Matemática 2: funções, equações e geometria (4 em 2023)', [
      M('X2'), T('sim', 'MT', 'Simulado de Matemática: 20 questões, 40 minutos (zerar Matemática elimina; o corte é de 50% somando Matemática e Português, 10 de 20)'), T('game', 'unid', 'Arena: Grandeza e unidade')]),
    dia('11-20', 'sex', 'CA, fasores e impedância (3 questões em 2023)', [
      M('E2'), T('sim', 'PT', 'Simulado de Português: 20 questões, 40 minutos (zerar Português elimina; o corte é de 50% somando Português e Matemática, 10 de 20)'), T('game', 'formula', 'Arena: Qual é a fórmula?')]),
    dia('11-21', 'sáb', 'Motores e proteção (M3) e probabilidade e estatística (X3), 2 questões cada em 2023', [
      M('M3'), M('X3'), T('bancada', null, 'Bancada: uma ordem de serviço de motor ou de comando')]),
    dia('11-22', 'dom', 'Eletrônica (A1) e medidas, retificadores e baterias (I3), 2 questões cada em 2023', [
      M('A1'), M('I3'), T('game', 'unid', 'Arena: Grandeza e unidade')]),
    dia('11-23', 'seg', 'Média tensão e SPDA (I2), simbologia e diagramas (M1)', [
      M('I2'), M('M1'), T('game', 'formula', 'Arena: Qual é a fórmula?')]),
    dia('11-24', 'ter', 'Complementos de elétrica e fechamento da primeira passada', [
      M('C1'), T('painel', null, 'Painel: veja o acerto por item do edital e anote as 3 estações mais fracas de cada bloco'),
      T('novos', null, 'Treino: 15 questões de números novos, todas as estações')]),

    /* ---- Fase 2: simulado e pontos fracos (25 a 27/11) ---- */
    dia('11-25', 'qua', 'Simulado completo e correção', [
      T('sim', 'tudo', 'Simulado de 30 questões (2 horas), todas as linhas; pode fazer em dois blocos de 15 questões, com pausa'), T('erros', null, 'Caderno de erros: a regra de cada erro do simulado'),
      T('painel', null, 'Painel: abra as estações de "Reabra primeiro"')]),
    dia('11-26', 'qui', 'Pontos fracos 1: o que mais pesa (potência e trifásicos)', [
      R('E3', 'Reabra a E3 (8 questões em 2023) na aba Questões e refaça as que errou; releia só as seções dessas questões'),
      T('sim', 'fracos', 'Simulado de 20 questões, foco em pontos fracos'), T('game', 'formula', 'Arena: Qual é a fórmula?')]),
    dia('11-27', 'sex', 'Pontos fracos 2: instalações e circuitos CC', [
      R('I1', 'Reabra a I1 (5 questões em 2023): refaça as erradas e releia a NBR 5410 só nos pontos que errou'),
      R('E1', 'Reabra a E1 (4 questões em 2023): refaça as erradas; Kirchhoff, Thévenin e Norton à mão, sem olhar'),
      T('sim', 'MT', 'Simulado de Matemática: 20 questões, 40 minutos')]),

    /* ---- Fase 3: provas reais e segunda passada (28/11 a 04/12) ---- */
    dia('11-28', 'sáb', 'Prova real de 2018, com relógio', [
      O('Prova Transpetro 2018, Técnico de Manutenção Júnior Elétrica (a "Prova 6", 60 questões, 4 horas), baixada pelos links na página do Plano. Sem consulta e sem celular; marque as dúvidas'),
      O('Só depois, confira no gabarito de 2018 (procure a Prova 6) e escreva o assunto de cada erro')]),
    dia('11-29', 'dom', 'Corrigir 2018 e refazer 2023', [
      T('erros', null, 'Caderno de erros: a regra de cada erro da prova de 2018 e do simulado'),
      T('prova', 't23:PME', 'Prova de 2023 outra vez, no app, em modo prova (se já fez no dia 14, vale como repetição com relógio)'),
      T('provares', 't23', 'Resultado: corte por bloco (20 de 40 nas específicas e 10 de 20 nas gerais) e as questões erradas')]),
    dia('11-30', 'seg', 'Segunda passada 1: máquinas e automação', [
      R('M2', 'Reabra a M2 (4 questões em 2023): transformadores, refaça as erradas'),
      R('A2', 'Reabra a A2 (4 questões em 2023): CLP, ladder e controle, refaça as erradas'),
      T('novos', null, 'Treino: 15 questões de números novos')]),
    dia('12-01', 'ter', 'Segunda passada 2: segurança e CA. Cartão de confirmação sai hoje', [
      R('N1', 'Reabra a N1 (4 questões em 2023): NR-10 e manutenção, refaça as erradas'),
      R('E2', 'Reabra a E2 (3 questões em 2023): fasores e impedância, refaça as erradas'),
      O('Abra o cartão de confirmação no site da Fundação Cesgranrio (sai em 01/12): confira o local, o horário e o que levar, e planeje o trajeto até o novo endereço'),
      T('sim', 'PT', 'Simulado de Português: 20 questões, 40 minutos')]),
    dia('12-02', 'qua', 'Segunda passada 3: Matemática e Português', [
      R('X1', 'Reabra a X1: juros, porcentagem e proporção, refaça as erradas'),
      R('P1', 'Reabra a P1: crase, concordância, pontuação e coesão, refaça as erradas'),
      T('sim', 'MT', 'Simulado de Matemática: 20 questões, 40 minutos'),
      R('X3', 'Reabra a X3 (estatística, probabilidade e logaritmo): refaça só as que errou, 10 minutos')]),
    dia('12-03', 'qui', 'Último simulado completo', [
      T('sim', 'tudo', 'Simulado de 30 questões (2 horas), todas as linhas, com relógio'), T('erros', null, 'Caderno de erros: a regra de cada erro'),
      T('bib', 'nr10', 'Biblioteca: NR-10 lado a lado, de novo'),
      R('X2', 'Reabra a X2 (Matemática) na aba Questões: refaça só as que errou, 10 minutos')]),
    dia('12-04', 'sex', 'Fechar as contas', [
      T('refazer', null, 'Treino: refazer os erros'), T('bib', 'formulas', 'Biblioteca: formulário inteiro, dizendo o nome e a unidade de cada símbolo'),
      T('bib', 'anc', 'Biblioteca: números-âncora, tampando a coluna da direita'), T('game', 'cards', 'Arena: cartões de véspera')]),

    /* ---- Fase 4: véspera ---- */
    dia('12-05', 'sáb', 'Véspera: só reler', [
      T('erros', null, 'Caderno de erros: releia "Suas regras"'), T('game', 'cards', 'Arena: cartões de véspera'),
      O('Sem simulado hoje. Separe documento com foto, caneta preta transparente e o cartão de confirmação; confira o trajeto e durma cedo')])
  ];
})(window.DATA);

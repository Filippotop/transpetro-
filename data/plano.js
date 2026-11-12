/* Elétrica de Ouro: Plano de 10/11 a 28/11/2026 (DATA.plan). A prova é em 29/11.
   Ordem: estações prontas pelo peso na prova de 2023 (DATA.mapa2023: E3 8, I1 5, E1 4, M2 4, A2 4, N1 4, X1 4, X2 4, E2 3, M3 2, X3 2, A1 2, I3 2, M1 0), prova de
   2023 inteira no primeiro sábado, depois o que ainda não tem estação (redes de média tensão e SPDA,
   Matemática e Português fora do app) e a segunda passada pelos erros.
   Tarefa: {k, a, t}. k = mod (estação a), game (jogo a), bib (aba a), sim (foco a), prova ('t23:PME'), provares, erros,
   refazer, novos, painel, bancada ou out (fora do app, marcada à mão). Conferido por tests/biblioteca.test.mjs. */
(function (D) {
  var M = function (a) { return { k: 'mod', a: a }; };
  var T = function (k, a, t) { return { k: k, a: a, t: t }; };
  var O = function (t) { return { k: 'out', t: t }; };
  var MAT = 'Matemática fora do app (o app ainda não tem estação de Matemática): 40 min de ';
  var dia = function (d, l, foco, tasks) { return { d: '2026-11-' + d, l: l + ' ' + d + '/11', foco: foco, tasks: tasks }; };
  D.plan = [
    dia('10', 'ter', 'Potência e trifásicos (8 questões em 2023)', [M('E3'), T('game', 'formula', 'Arena: Qual é a fórmula? (10 rodadas)'), O(MAT + 'razão, proporção, regra de três e porcentagem (Mat 2)')]),
    dia('11', 'qua', 'Instalações e NBR 5410 (5 questões em 2023)', [M('I1'), T('bib', 'anc', 'Biblioteca: números-âncora de proteção, condutores e instalações'), O('Português fora do app: as 10 questões de uma prova recente da Cesgranrio de nível médio, com correção')]),
    dia('12', 'qui', 'Circuitos CC (4 questões em 2023)', [M('E1'), T('game', 'unid', 'Arena: Grandeza e unidade'), O(MAT + 'equações do 1º e do 2º grau e sistemas lineares (Mat 4)')]),
    dia('13', 'sex', 'Eletromagnetismo e transformadores (4 questões em 2023)', [M('M2'), T('game', 'cards', 'Arena: cartões de véspera vencidos'), T('novos', null, 'Treino: 10 questões de números novos')]),
    dia('14', 'sáb', 'Prova de 2023 inteira, com relógio', [T('prova', 't23:PME', 'Prova Transpetro 2023 completa (60 questões, 4 horas), em modo prova'), O('Faça de uma vez só, sem consulta e sem celular por perto, como no dia')]),
    dia('15', 'dom', 'Corrigir a prova de 2023', [T('provares', 't23', 'Resultado da prova de 2023: veja o corte por bloco e abra cada questão errada'), T('erros', null, 'Caderno de erros: escreva a regra de cada erro em uma frase'), T('painel', null, 'Painel: compare o acerto por item do edital com a marca da prova de 2023')]),
    dia('16', 'seg', 'Automação, CLP e controle (4 questões em 2023)', [M('A2'), T('game', 'formula', 'Arena: Qual é a fórmula?'), O(MAT + 'funções e geometria plana: triângulo retângulo, perímetros e áreas (Mat 3 e 9)')]),
    dia('17', 'ter', 'Segurança, NR-10 e manutenção (4 questões em 2023)', [M('N1'), T('bib', 'nr10', 'Biblioteca: NR-10 lado a lado (leia o texto em vigor, de 2019, e as pegadinhas)'), T('game', 'nr10', 'Arena: Ordene a NR-10, até acertar as duas sequências sem errar'), O('Português fora do app: interpretação de texto de uma prova da Cesgranrio')]),
    dia('18', 'qua', 'Matemática: números, proporções, juros, funções e geometria (8 questões em 2023)', [M('X1'), M('X2'), T('novos', null, 'Treino: 10 questões de números novos')]),
    dia('19', 'qui', 'CA, fasores e impedância (3 questões em 2023)', [M('E2'), T('game', 'unid', 'Arena: Grandeza e unidade'), O('Português fora do app: interpretação de texto de uma prova da Cesgranrio')]),
    dia('20', 'sex', 'Motores, contagem e eletrônica (2 questões de eletrônica em 2023)', [M('M3'), M('X3'), M('A1'), T('bancada', null, 'Bancada: uma ordem de serviço de motor ou de comando')]),
    dia('21', 'sáb', 'Simulado e correção', [T('sim', 'tudo', 'Simulado de 30 questões (2 horas), todas as linhas'), T('erros', null, 'Caderno de erros: a regra de cada erro do simulado'), O(MAT + 'só as questões de Matemática que você errou até aqui')]),
    dia('22', 'dom', 'Medidas, simbologia e refazer o que errou', [M('I3'), M('M1'), T('refazer', null, 'Treino: refazer os erros'), O('Redes de 1,0 a 17,5 kV e SPDA (8.2 e 8.4) pela sua apostila: ainda sem estação no app')]),
    dia('23', 'seg', 'Segunda passada: seus pontos fracos', [T('painel', null, 'Painel: abra as estações de "Reabra primeiro" e releia só o que errou'), T('sim', 'fracos', 'Simulado de 20 questões, foco em pontos fracos'), T('provares', 't23', 'Provas: reveja as questões de Matemática e de Português da prova de 2023 que você errou')]),
    dia('24', 'ter', 'Contas com números novos', [T('novos', null, 'Treino: 15 questões de números novos, todas as estações'), T('game', 'formula', 'Arena: Qual é a fórmula?'), O('Eletrônica e automação (item 9): revisão pelas estações A1 e A2')]),
    dia('25', 'qua', 'Normas e números', [T('bib', 'nr10', 'Biblioteca: NR-10 lado a lado, de novo'), T('bib', 'anc', 'Biblioteca: números-âncora, tampando a coluna da direita'), T('game', 'nr10', 'Arena: Ordene a NR-10')]),
    dia('26', 'qui', 'Último simulado', [T('sim', 'tudo', 'Simulado de 30 questões (2 horas), todas as linhas'), T('erros', null, 'Caderno de erros: a regra de cada erro'), O('Português fora do app: 10 questões da Cesgranrio, com relógio (40 minutos)')]),
    dia('27', 'sex', 'Fechar as contas', [T('refazer', null, 'Treino: refazer os erros'), T('bib', 'formulas', 'Biblioteca: formulário inteiro, dizendo o nome e a unidade de cada símbolo'), O(MAT + 'só as questões que você errou nesta semana')]),
    dia('28', 'sáb', 'Véspera: só reler', [T('erros', null, 'Caderno de erros: releia "Suas regras"'), T('bib', 'anc', 'Biblioteca: números-âncora e NR-10, uma leitura'), T('game', 'cards', 'Arena: cartões de véspera'), O('Sem simulado hoje. Confira no cartão de confirmação da Cesgranrio o local, o horário e o que levar, e durma cedo')])
  ];
})(window.DATA);

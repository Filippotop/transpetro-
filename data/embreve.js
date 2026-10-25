/* Estações "em breve" (spec, seção 1): aparecem no mapa, com título, itens do edital, faixa e peso em 2023, mas ainda
   sem conteúdo (não abrem). Carregado depois das estações de data/estacoes/, para que cada uma fique no fim da sua
   linha. Quando uma estação ganhar conteúdo, ela sai daqui e vira data/estacoes/<id>.js.
   Pesos de 2023 (questões 21 a 60 das específicas e 11 a 20 de Matemática), pela classificação da spec. */
(function (D) {
  var stub = function (id, line, title, itens, faixa, peso2023, note) {
    return { id: id, vol: line === 'X' ? 'MT' : 'EL', line: line, title: title, itens: itens, faixa: faixa, peso2023: peso2023, note: note,
      html: '', resumo: [], formulas: [], qs: [], contas: [], emBreve: true };
  };
  [
    stub('M3', 'M', 'Máquinas rotativas, proteção e partidas', '5.2, 5.4–5.7', 'A', 5, 'Motores de indução, síncronas, máquinas CC e partidas; o peso de 5 é o do item 5 inteiro, dividido com a M2.'),
    stub('I2', 'I', 'Média tensão e SPDA', '8.2, 8.4', 'A', 6, 'Redes aéreas de 1,0 a 17,5 kV e proteção contra descargas atmosféricas; o peso de 6 é o do item 8 inteiro, dividido com a I1.'),
    stub('I3', 'I', 'Medidas, retificadores, baterias e no-breaks', '7.1, 7.3, 7.4', 'B', 3, 'Instrumentos, megômetro, retificadores, baterias e tipos de no-break (questões 43, 44 e 57 de 2023 no item 7).'),
    stub('A1', 'A', 'Eletrônica analógica e digital', '9.1, 9.2', 'A', 6, 'Diodos, transistores, portas lógicas e diagramas lógicos; o peso de 6 é o do item 9 inteiro, dividido com a A2.'),
    stub('A2', 'A', 'Automação, CLP e controle', '9.3–9.5', 'A', 6, 'Automação industrial, CLP e Ladder, malha fechada; o peso de 6 é o do item 9 inteiro, dividido com a A1.'),
    stub('N1', 'N', 'Segurança, NR-10 e manutenção', '6, 10.2–10.4', 'B', 5, 'Segurança e higiene do trabalho, EPI e EPC, manutenção, materiais e NR-10. Peso 5 = 2 questões do item 6 (39 e 41) + 3 do item 10 (40, 47 e 55); a 55, de NBR 5410, é ensinada na I1.'),
    stub('X1', 'X', 'Números, proporções e matemática financeira', 'Mat 1, 2, 8', 'B', 4, 'Conjuntos numéricos, razão e proporção, regras de três, porcentagem, juros simples e compostos (questões 11, 12, 14 e 17 de 2023).'),
    stub('X2', 'X', 'Funções, equações e geometria', 'Mat 3, 4, 9, 10', 'B', 4, 'Funções, equações e sistemas lineares, triângulo retângulo, áreas e volumes (questões 16, 18, 19 e 20 de 2023).'),
    stub('X3', 'X', 'Contagem, probabilidade e estatística', 'Mat 5, 6, 7', 'B', 2, 'Princípio da contagem, arranjos e combinações, probabilidade, média, mediana, moda e desvio padrão (questões 13 e 15 de 2023).'),
  ].forEach(function (m) {
    var i = D.modules.findIndex(function (x) { return x.id === m.id; });
    if (i < 0) D.modules.push(m);
  });
})(window.DATA);

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
    stub('I2', 'I', 'Média tensão e SPDA', '8.2, 8.4', 'A', 6, 'Redes aéreas de 1,0 a 17,5 kV e proteção contra descargas atmosféricas; o peso de 6 é o do item 8 inteiro, dividido com a I1.'),
  ].forEach(function (m) {
    var i = D.modules.findIndex(function (x) { return x.id === m.id; });
    if (i < 0) D.modules.push(m);
  });
})(window.DATA);

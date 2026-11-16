/* Questões extras (nível prova) da estação X3 (contagem, probabilidade, estatística). Revisão independente: ver fontes/ERRATA.md. */
export default {
  erros: {
    x3complemento: { n: 'Respondeu o complemento', d: 'Calculou o número de casos do evento oposto (senhas sem repetição) e o deu como resposta, em vez de subtraí-lo do total.', t: 'detalhe' },
    x3total: { n: 'Respondeu o total', d: 'Respondeu o total de casos possíveis, sem tirar os que não pertencem ao evento pedido.', t: 'detalhe' },
    x3combArr: { n: 'Combinação no lugar de arranjo', d: 'Contou conjuntos (combinação) onde a ordem dos algarismos importa, ou o contrário.', t: 'formula' },
    x3zeroInicial: { n: 'Zero inicial excluído', d: 'Impôs que o primeiro algarismo não seja zero, restrição que o enunciado não faz.', t: 'detalhe' },
    x3priori: { n: 'Probabilidade a priori', d: 'Respondeu a fração da produção da máquina, sem condicionar ao fato de a peça ser defeituosa.', t: 'detalhe' },
    x3taxaPropria: { n: 'Taxa de defeito da máquina', d: 'Respondeu a taxa de defeito da máquina C, que é P(defeito | C), e não P(C | defeito).', t: 'oposto' },
    x3semPeso: { n: 'Razão de taxas sem os pesos', d: 'Comparou só as taxas de defeito (4/(2 + 2 + 4)), esquecendo a fração de produção de cada máquina.', t: 'formula' },
    x3conjunta: { n: 'Probabilidade conjunta no lugar da condicional', d: 'Respondeu P(C e defeito) = 0,8%, sem dividir por P(defeito) = 2,4%.', t: 'formula' },
    x3binomEvento: { n: 'Evento binomial errado', d: 'Calculou outro evento do modelo binomial (exatamente 1, exatamente 2, pelo menos 1, nenhum) em vez do pedido.', t: 'detalhe' },
    x3mediaRetira: { n: 'Média após retirada mal usada', d: 'Respondeu uma das médias (ou a soma delas), em vez de trabalhar com as somas de valores antes e depois.', t: 'formula' },
    x3classes: { n: 'Dados agrupados sem ponderar', d: 'Calculou a média dos pontos médios sem pesar pelas frequências, ou usou extremo da classe em vez do ponto médio.', t: 'formula' },
    x3restricao: { n: 'Restrição mal contada', d: 'Aplicou mal a restrição de comissão (juntos ou separados): somou, em vez de subtrair os casos proibidos, ou contou os que incluem uma só pessoa.', t: 'detalhe' },
  },
  extra: [
    { id: 'y1', h: 'Mat 5', tag: 'Senhas com algarismo repetido', d: 'm', conta: '10**4-10*9*8*7',
      s: 'A senha de um cofre de ferramentas tem 4 algarismos, de 0 a 9, e pode começar por 0. O número de senhas possíveis que têm pelo menos um algarismo repetido é',
      o: ['210', '4.960', '5.040', '9.000', '10.000'], a: 1,
      c: 'Total de senhas: 10<sup>4</sup> = 10.000. Senhas com os quatro algarismos diferentes: 10 · 9 · 8 · 7 = 5.040. Com pelo menos um repetido: 10.000 − 5.040 = 4.960.',
      w: { A: '[x3combArr] C(10, 4) = 210: contou conjuntos de 4 algarismos, mas a ordem importa numa senha.', C: '[x3complemento] 5.040 são as senhas sem nenhuma repetição, o evento oposto.', D: '[x3zeroInicial] 9.000 = 9 · 10<sup>3</sup>: impôs que o primeiro algarismo não fosse 0 e não subtraiu as sem repetição.', E: '[x3total] 10.000 é o total de senhas, com ou sem repetição.' } },

    { id: 'y2', h: 'Mat 6', tag: 'Probabilidade condicional (Bayes)', d: 'd', conta: '100*0.008/0.024',
      s: 'Três máquinas, A, B e C, produzem, respectivamente, 50%, 30% e 20% das peças de uma linha. As taxas de peças defeituosas de A, B e C são, respectivamente, 2%, 2% e 4%. Uma peça é escolhida ao acaso na produção total e verifica-se que é defeituosa. A probabilidade, em porcentagem, de que ela tenha sido produzida pela máquina C é',
      o: ['0,8', '4', '20', '33,3', '50'], a: 3,
      c: 'P(defeituosa) = 0,5 · 0,02 + 0,3 · 0,02 + 0,2 · 0,04 = 0,010 + 0,006 + 0,008 = 0,024. P(C | defeituosa) = 0,008/0,024 = 1/3 ≈ 33,3%.',
      w: { A: '[x3conjunta] 0,8% = P(C e defeituosa); faltou dividir por P(defeituosa) = 2,4%.', B: '[x3taxaPropria] 4% é a taxa de defeito da máquina C, P(defeituosa | C), e não P(C | defeituosa).', C: '[x3priori] 20% é a fração da produção que vem de C, sem considerar que a peça é defeituosa.', E: '[x3semPeso] 4/(2 + 2 + 4) = 50%: comparou só as taxas, ignorando a produção de cada máquina.' } },

    { id: 'y3', h: 'Mat 6', tag: 'Binomial: falha de redundância', d: 'd', conta: '100*(1-(3*0.01*0.9+0.001))',
      s: 'Um sistema de proteção tem 3 sensores independentes, cada um com probabilidade de 10% de falhar em um acionamento. O sistema só deixa de proteger se pelo menos 2 dos 3 sensores falharem. A probabilidade, em porcentagem, de o sistema proteger em um acionamento é',
      o: ['2,8', '27,1', '72,9', '90', '97,2'], a: 4,
      c: 'Falha do sistema: exatamente 2 falhas, 3 · (0,1)<sup>2</sup> · 0,9 = 0,027, ou 3 falhas, (0,1)<sup>3</sup> = 0,001; total 0,028. Proteger é o complementar: 1 − 0,028 = 0,972, ou 97,2%.',
      w: { A: '[x3binomEvento] 2,8% é a probabilidade de o sistema falhar, e não a de proteger.', B: '[x3binomEvento] 27,1% = 1 − 0,9<sup>3</sup> é a probabilidade de pelo menos um sensor falhar.', C: '[x3binomEvento] 72,9% = 0,9<sup>3</sup> é a probabilidade de nenhum sensor falhar; o sistema também protege com 1 falha.', D: '[x3binomEvento] 90% é a probabilidade de um único sensor funcionar.' } },

    { id: 'y4', h: 'Mat 7', tag: 'Média após retirada de um valor', d: 'm', conta: '5*12-4*10',
      s: 'A média aritmética de cinco medições de resistência é 12 Ω. Ao se descartar uma das medições, a média das quatro restantes passa a ser 10 Ω. O valor, em ohms, da medição descartada é',
      o: ['10', '12', '20', '22', '40'], a: 2,
      c: 'Soma das cinco: 5 · 12 = 60. Soma das quatro restantes: 4 · 10 = 40. Valor descartado: 60 − 40 = 20 Ω.',
      w: { A: '[x3mediaRetira] 10 é a média das quatro restantes.', B: '[x3mediaRetira] 12 é a média original das cinco.', D: '[x3mediaRetira] 12 + 10 = 22: somou as duas médias.', E: '[x3mediaRetira] 40 é a soma das quatro medições que ficaram, e não o valor descartado.' } },

    { id: 'y5', h: 'Mat 7', tag: 'Média de dados agrupados em classes', d: 'm', conta: '(2*6+6*10+10*4)/20',
      s: 'As potências de 20 motores, agrupadas em classes, em kW, são: de 0 a 4 (exclusive), 6 motores; de 4 a 8 (exclusive), 10 motores; de 8 a 12 (exclusive), 4 motores. Tomando o ponto médio de cada classe, a potência média, em kW, é',
      o: ['5,6', '6', '7,6', '10', '37,3'], a: 0,
      c: 'Pontos médios: 2, 6 e 10. Média = (2 · 6 + 6 · 10 + 10 · 4)/20 = (12 + 60 + 40)/20 = 112/20 = 5,6 kW.',
      w: { B: '[x3classes] (2 + 6 + 10)/3 = 6: média dos pontos médios sem pesar pelas frequências.', C: '[x3classes] (4 · 6 + 8 · 10 + 12 · 4)/20 = 7,6: usou o limite superior de cada classe, e não o ponto médio.', D: '[x3classes] 10 é o maior ponto médio, e não a média.', E: '[x3classes] 112/3 ≈ 37,3: dividiu a soma ponderada pelo número de classes, e não pelo de motores.' } },

    { id: 'y6', h: 'Mat 5', tag: 'Comissão com restrição', d: 'm', conta: '210-28',
      s: 'Em um setor de manutenção com 10 técnicos, será formada uma comissão de 4 pessoas, sem funções distintas. Dois dos técnicos, Ana e Bruno, não podem integrar a mesma comissão. O número de comissões que podem ser formadas é',
      o: ['28', '154', '182', '210', '238'], a: 2,
      c: 'Total sem restrição: C(10, 4) = 210. Comissões com Ana e Bruno juntos: escolhem-se os outros 2 entre os 8 restantes, C(8, 2) = 28. Permitidas: 210 − 28 = 182.',
      w: { A: '[x3restricao] 28 é o número de comissões com Ana e Bruno juntos, justamente as que são proibidas.', B: '[x3restricao] 210 − C(8, 3) = 154: subtraiu as comissões que incluem Ana (ou Bruno) com 3 dos outros 8, e não as que incluem os dois.', D: '[x3total] 210 é o total sem restrição.', E: '[x3restricao] 210 + 28 = 238: somou os casos proibidos, em vez de subtraí-los.' } },
  ],
};

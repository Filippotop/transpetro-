/* Revisão das questões da estação X3 (contagem, probabilidade e estatística), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/matematica-contagem-probabilidade-estatistica.html), pela chave "bN:i";
   extra: questões só da aba Questões (nesta estação não há). Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual conta errada leva a ela. Os tipos de erro novos desta estação estão no fim de tools/banco/erros.mjs
   (a lista de chave, n, d e t está no relatório da estação X3; ainda não foram acrescentados ao arquivo).
   conta: em respostas negativas, a expressão leva Math.abs (o teste lê o número da alternativa sem o sinal; aqui não há). */
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: 'Mat 5', b2: 'Mat 5', b3: 'Mat 5', b4: 'Mat 6', b5: 'Mat 6', b6: 'Mat 7', b7: 'Mat 7', b8: 'Mat 7' },
  q: {
    /* ---------- seção 1 ---------- */
    'b1:0': { d: 'f', conta: '10*9*8', w: {
      A: '[pfcSoma] 27 soma as opções (10 + 9 + 8); as etapas são seguidas, e então se multiplica.',
      B: '[etapa] 90 multiplica só as duas primeiras etapas (10 × 9); falta a terceira escolha.',
      D: '[repeticao] 1.000 permite repetir algarismo (10 × 10 × 10); o enunciado pede todos diferentes.',
      E: '[fatorial] 3.628.800 calcula 10!, a ordem de todos os 10 algarismos; são escolhidos só 3.' } },
    'b1:1': { d: 'm', conta: '3*5*4', w: {
      A: '[pfcSoma] 12 soma as opções das etapas (3 + 5 + 4).',
      C: '[repeticao] 75 3 × 5 × 5 não desconta o algarismo da centena na escolha da dezena.',
      D: '[restricao] 120 6 × 5 × 4 ignora que o número deve ser ímpar.',
      E: '[repeticao] 216 6 × 6 × 6 ignora as duas condições: ímpar e sem repetir algarismo.' } },
    'b1:2': { d: 'm', conta: '(3+2)*(3+2)', w: {
      A: '[etapa] 5 conta só a ida (3 + 2); falta a volta.',
      B: '[pfcSoma] 6 multiplica 3 por 2, mas rodovia e balsa são alternativas que se excluem, e então se somam.',
      C: '[pfcSoma] 10 soma ida e volta (5 + 5); as duas viagens são etapas seguidas e se multiplicam.',
      D: '[repeticao] 20 5 × 4 tira da volta o meio usado na ida; o enunciado permite repetir.' } },
    'b1:3': { d: 'd', conta: '26*25*10*9', w: {
      B: '[restricao] 60.840 26 × 26 × 10 × 9 permite repetir a letra, mas o enunciado pede letras diferentes.',
      C: '[restricao] 65.000 26 × 25 × 10 × 10 permite repetir o algarismo, mas o enunciado pede algarismos diferentes.',
      D: '[restricao] 67.600 26 × 26 × 10 × 10 ignora as duas restrições.',
      E: '[etapa] 468.000 26 × 25 × 10 × 9 × 8 inclui um terceiro algarismo, que a placa não tem.' } },
    /* ---------- seção 2 ---------- */
    'b2:0': { d: 'f', conta: '5*4*3*2*1', w: {
      A: '[pfcSoma] 15 soma 5 + 4 + 3 + 2 + 1 em vez de multiplicar.',
      B: '[fatorial] 24 calcula 4!, como se um dos painéis já tivesse dia certo.',
      C: '[fatorial] 25 toma 5! como 5 × 5.',
      E: '[repeticao] 3.125 calcula 5<sup>5</sup>, permitindo repetir o painel; cada painel é inspecionado uma vez só.' } },
    'b2:1': { d: 'm', conta: '40320/(2*2)', w: {
      B: '[permRep] 20.160 8!/2! divide só pela repetição de uma das letras; o R e o S se repetem.',
      C: '[permRep] 40.320 8! ignora as letras repetidas.',
      D: '[permRep] 80.640 8! × 2! multiplica pela repetição, em vez de dividir.',
      E: '[permRep] 161.280 8! × 2! × 2! multiplica pelas duas repetições, em vez de dividir.' } },
    'b2:2': { d: 'm', conta: '24*2', w: {
      A: '[permRep] 12 4!/2 divide pelo 2! do bloco, como se fossem letras repetidas; a troca interna multiplica.',
      B: '[juntos] 24 esquece a ordem dentro do bloco (Ana-Bia ou Bia-Ana).',
      D: '[juntos] 120 5! ignora que Ana e Bia devem ficar juntas.',
      E: '[juntos] 240 5! × 2! aplica a troca interna ao total de 5 elementos, sem formar o bloco.' } },
    'b2:3': { d: 'f', conta: '9*8', w: {
      A: '[fatorial] 2 subtrai os números (9 − 7); o fatorial é produto, e não diferença.',
      B: '[pfcSoma] 17 soma os dois fatores que sobram (9 + 8) em vez de multiplicar.',
      C: '[fatorial] 56 8 × 7 começa o produto um fator abaixo; o primeiro fator que sobra é o 9.',
      D: '[fatorial] 63 9 × 7 pula o fator 8.' } },
    /* ---------- seção 3 ---------- */
    'b3:0': { d: 'm', conta: '8*7*6/6', w: {
      A: '[pfcSoma] 11 soma 8 + 3.',
      C: '[ordemImporta] 168 divide o arranjo por 2 (336/2), e não por 3! = 6.',
      D: '[ordemImporta] 336 é o arranjo A(8, 3); conta cada equipe 6 vezes, uma por ordem dos três técnicos.',
      E: '[repeticao] 512 calcula 8<sup>3</sup>, permitindo repetir o técnico.' } },
    'b3:1': { d: 'm', conta: '7*6*5', w: {
      A: '[pfcSoma] 10 soma 7 + 3.',
      B: '[ordemImporta] 21 multiplica 7 por 3, em vez de usar três fatores decrescentes a partir de 7.',
      C: '[ordemImporta] 35 é a combinação C(7, 3); ignora que as funções distinguem os escalados.',
      E: '[repeticao] 343 calcula 7<sup>3</sup>, permitindo que o mesmo eletricista receba duas funções.' } },
    'b3:2': { d: 'd', conta: '(5*4/2)*(4*3/2)', w: {
      B: '[ordemImporta] 120 usa o arranjo A(5, 2) = 20 para os eletricistas (20 × 6); numa comissão a ordem não importa.',
      C: '[restricao] 126 é C(9, 4): escolhe 4 entre as 9 pessoas e ignora que devem ser exatamente 2 auxiliares.',
      D: '[ordemImporta] 240 usa arranjo nos dois grupos (20 × 12).',
      E: '[ordemImporta] 3.024 é o arranjo A(9, 4): conta a ordem e ignora a condição dos auxiliares.' } },
    'b3:3': { d: 'm', conta: '8*7/2', w: {
      A: '[etapa] 7 conta os apertos de uma pessoa só; falta multiplicar por 8 e dividir por 2.',
      B: '[ordemImporta] 16 multiplica 8 por 2, em vez de usar o produto 8 × 7 dividido por 2.',
      D: '[ordemImporta] 56 é o arranjo A(8, 2); conta cada aperto duas vezes (de A para B e de B para A).',
      E: '[repeticao] 64 calcula 8<sup>2</sup>, incluindo pares da pessoa com ela mesma.' } },
    /* ---------- seção 4 ---------- */
    'b4:0': { d: 'f', conta: '42/50*100', w: {
      A: '[valorPct] 8% lê o número de defeituosas, 8, como se fosse 8%.',
      B: '[complemento] 16% é a probabilidade de a lâmpada ser defeituosa (8/50); a pergunta é sobre ser boa.',
      C: '[probRazao] 19% 8/42 divide defeituosas por boas, em vez de dividir pelo total de 50.',
      D: '[valorPct] 42% lê o número de lâmpadas boas, 42, como se fosse 42%.' } },
    'b4:1': { d: 'm', conta: '6/36*100', w: {
      A: '[espacoAmostral] 8,3% 3/36 conta só (1, 6), (2, 5) e (3, 4), sem os pares invertidos; (1, 6) e (6, 1) são resultados diferentes.',
      B: '[espacoAmostral] 9,1% 1/11 toma as 11 somas possíveis (de 2 a 12) como igualmente prováveis; os equiprováveis são os 36 pares.',
      D: '[espacoAmostral] 19,4% 7/36 usa o valor da soma, 7, como número de casos favoráveis; são 6.',
      E: '[espacoAmostral] 50% raciocina que a soma "dá 7 ou não dá", dois resultados que não são equiprováveis.' } },
    'b4:2': { d: 'm', conta: '36/80*100', w: {
      A: '[valorPct] 36% lê o número de questionários, 36, como se fosse 36%.',
      C: '[complemento] 55% é a probabilidade de o questionário não ser de quem aprovou (44/80).',
      D: '[espacoAmostral] 60% 36/60 divide só pelos que usaram o sistema; o sorteio é entre os 80.',
      E: '[probRazao] 81,8% 36/44 divide aprovações por não aprovações, em vez de pelo total.' } },
    'b4:3': { d: 'm', conta: '15/25*100', w: {
      A: '[ouE] 8% 2/25 conta só os múltiplos de 2 e de 5 ao mesmo tempo (10 e 20); o pedido é "ou".',
      B: '[ouE] 20% 5/25 conta só os múltiplos de 5.',
      C: '[ouE] 48% 12/25 conta só os múltiplos de 2.',
      E: '[ouE] 68% 17/25 soma 12 + 5 sem descontar os 2 múltiplos comuns.' } },
    /* ---------- seção 5 ---------- */
    'b5:0': { d: 'm', conta: '0.1*0.2*100', w: {
      B: '[complemento] 18% 0,90 × 0,20 é a probabilidade de só o segundo falhar (o primeiro funciona).',
      C: '[complemento] 28% 1 − 0,90 × 0,80 é a probabilidade de pelo menos um falhar.',
      D: '[ouE] 30% soma as probabilidades (10% + 20%); "os dois" pede o produto.',
      E: '[complemento] 72% 0,90 × 0,80 é a probabilidade de nenhum falhar.' } },
    'b5:1': { d: 'd', conta: '(1-6/10*5/9)*100', w: {
      A: '[complemento] 13,3% 4/10 × 3/9 é a probabilidade de os dois estarem queimados.',
      B: '[complemento] 33,3% 6/10 × 5/9 é a probabilidade de nenhum estar queimado; falta o 1 −.',
      C: '[semReposicao] 36% 0,6 × 0,6 mantém 10 fusíveis na segunda retirada (com reposição); e ainda falta o 1 −.',
      D: '[semReposicao] 64% 1 − 0,6 × 0,6 mantém 10 fusíveis na segunda retirada; sem reposição, sobram 9, com 5 bons.' } },
    'b5:2': { d: 'd', conta: '36/120*100', w: {
      A: '[outra] 3,3% 4/120 é a probabilidade de as três sorteadas serem mulheres (C(4, 3)/C(10, 3)).',
      B: '[semReposicao] 10% 4/10 × 3/9 × 6/8 é a probabilidade de uma ordem só (mulher, mulher, homem); são 3 ordens possíveis.',
      C: '[semReposicao] 28,8% 3 × 0,4 × 0,4 × 0,6 mantém 10 pessoas em cada sorteio (com reposição); sem reposição, o total cai.',
      E: '[outra] 40% 4/10 é só a probabilidade de a primeira pessoa sorteada ser mulher.' } },
    'b5:3': { d: 'm', conta: '(1-0.95**3)*100', w: {
      A: '[complemento] 0,0125% 0,05<sup>3</sup> é a probabilidade de as três pararem.',
      C: '[ouE] 15% soma 5% + 5% + 5%; nos eventos independentes, não se soma, e a soma ainda superestima.',
      D: '[complemento] 85,7% 0,95<sup>3</sup> é a probabilidade de nenhuma parar.',
      E: '[complemento] 99,99% 1 − 0,05<sup>3</sup> é a probabilidade de pelo menos uma <b>não</b> parar.' } },
    /* ---------- seção 6 ---------- */
    'b6:0': { d: 'm', conta: '40/200*360', w: {
      A: '[anguloSetor] 20° usa a porcentagem, 20%, como se fosse o ângulo.',
      B: '[anguloSetor] 40° usa a frequência, 40, como se fosse o ângulo.',
      D: '[anguloSetor] 90° divide o círculo em 4 setores iguais (360°/4), sem olhar as frequências.',
      E: '[outra] 144° é o ângulo do setor da elétrica (80/200 × 360°).' } },
    'b6:1': { d: 'm', conta: '6/50*100', w: {
      B: '[espacoAmostral] 17,6% 6/34 divide pelos valores da faixa; o total é 50.',
      C: '[outra] 20% 10/50 é a frequência relativa das medições abaixo da faixa.',
      D: '[outra] 32% 16/50 junta as medições abaixo e acima da faixa.',
      E: '[outra] 68% 34/50 é a frequência relativa das medições dentro da faixa.' } },
    'b6:2': { d: 'm', conta: '12+15', w: {
      A: '[freqAcum] 15 é só a linha de 1 falha; "no máximo 1" inclui também os turnos sem falha.',
      C: '[freqAcum] 28 15 + 9 + 4 conta "pelo menos 1 falha", o lado errado.',
      D: '[etapa] 40 é o total de turnos.',
      E: '[outra] 45 é o total de falhas (15 + 2 × 9 + 3 × 4), e não o de turnos.' } },
    'b6:3': { d: 'm', conta: '(12+20)/40*100', w: {
      A: '[freqAcum] 20% 8/40 é só a classe de 4.000 em diante, o lado oposto do pedido.',
      B: '[freqAcum] 30% 12/40 é só a primeira classe.',
      C: '[freqAcum] 50% 20/40 é só a segunda classe; falta somar a primeira.',
      D: '[freqAcum] 70% 28/40 soma as duas classes de cima (20 + 8), as de salário igual ou maior que 3.000.' } },
    /* ---------- seção 7 ---------- */
    'b7:0': { d: 'm', conta: '24/20', w: {
      A: '[pesos] 0,9 (8 + 10)/20 deixa de fora a linha das 3 paradas (6).',
      B: '[modaMed] 1,0 é a mediana (e também a moda); a pergunta é a média.',
      D: '[mediaSimples] 1,5 (0 + 1 + 2 + 3)/4 trata as 4 linhas como 4 dados, sem ponderar pelas frequências.',
      E: '[mediaSimples] 6,0 24/4 divide pelo número de linhas da tabela, em vez do total de 20 turnos.' } },
    'b7:1': { d: 'm', conta: '(22+25)/2', w: {
      A: '[medianaPos] 22 toma só o 4º valor ordenado; com número par de dados, a mediana é a média dos dois centrais.',
      C: '[medianaPos] 25 toma só o 5º valor ordenado, sem a média com o 4º.',
      D: '[medianaPos] 27,5 (30 + 25)/2 é a média do 4º e do 5º valores na ordem de registro; falta ordenar.',
      E: '[modaMed] 28,75 230/8 é a média dos tempos; a pergunta é a mediana.' } },
    'b7:2': { d: 'm', conta: '25000/5', w: {
      A: '[etapa] R$ 2.480,00 12.400/5 divide só o último salário; faltam os outros quatro na soma.',
      B: '[modaMed] R$ 3.000,00 é a moda (o valor que mais se repete).',
      C: '[outra] R$ 3.150,00 12.600/4 é a média sem o maior salário, que também faz parte do grupo.',
      D: '[modaMed] R$ 3.200,00 é a mediana (o valor central).' } },
    'b7:3': { d: 'd', conta: '(9*5+7*3+5*2)/10', w: {
      A: '[pesos] 4,0 (9 + 7 × 3 + 5 × 2)/10 esquece de multiplicar a primeira nota pelo peso 5.',
      B: '[pesos] 6,4 9 × 2 + 7 × 3 + 5 × 5, dividido por 10, troca os pesos da prova técnica e do currículo.',
      C: '[mediaSimples] 7,0 (9 + 7 + 5)/3 ignora os pesos.',
      E: '[pesos] 25,3 76/3 divide pelo número de notas, em vez da soma dos pesos (10).' } },
    /* ---------- seção 8 ---------- */
    'b8:0': { d: 'f', conta: '0', w: {
      B: '[dpRaiz] 2,17 é √4,7, a raiz do valor medido, e não a raiz da variância.',
      C: '[dpMedia] 4,7 dá a média (ou o valor medido) como desvio padrão.',
      D: '[dpMedia] 18,8 é a soma das quatro medições (4 × 4,7), que nada tem a ver com dispersão.',
      E: '[dpQuad] 22,09 é 4,7<sup>2</sup>: eleva o valor ao quadrado sem subtrair a média.' } },
    'b8:1': { d: 'm', conta: 'Math.sqrt(8)', w: {
      A: '[dpQuad] 0 soma os desvios sem elevar ao quadrado: −4 − 2 + 0 + 2 + 4 = 0.',
      B: '[dispDiv] 1,6 8/5 divide a variância por 5 uma segunda vez.',
      C: '[dpMedia] 2,4 12/5 é o desvio médio (média dos módulos dos desvios), e não o desvio padrão.',
      E: '[dpRaiz] 8 é a variância; falta tirar a raiz quadrada.' } },
    'b8:2': { d: 'd', conta: 'Math.sqrt((2*(4-6)**2+5*(5-6)**2+3*(9-6)**2)/10)', w: {
      A: '[dispDiv] 0,4 4/10 divide a variância por 10 uma segunda vez.',
      B: '[dpMedia] 1,8 é o desvio médio, (2 × 2 + 5 × 1 + 3 × 3)/10, e não o desvio padrão.',
      D: '[mediaSimples] 2,2 trata as três linhas como três dados, sem pesar pelas frequências: √(14/3) ≈ 2,16.',
      E: '[dpRaiz] 4,0 é a variância; falta tirar a raiz quadrada.' } },
    'b8:3': { d: 'm', conta: '200*1.1', w: {
      A: '[dpProp] R$ 200,00 supõe que o reajuste de 10% não muda o desvio padrão; multiplicar os dados por k multiplica o desvio padrão por k.',
      C: '[dpProp] R$ 300,00 soma os R$ 100,00 ao desvio padrão e ignora o reajuste de 10%.',
      D: '[dpProp] R$ 320,00 200 × 1,10 + 100 soma a constante ao desvio padrão; a soma de uma constante não o altera.',
      E: '[dpProp] R$ 2.200,00 200 × 11 usa 11 no lugar de 1,10.' } },
  },
  extra: [
    { id: 'x1', h: 'Mat 7', tag: 'Tabelas e gráficos', d: 'm', conta: '(8+4)/40*100',
      s: 'Num histograma dos tempos de reparo de 40 intervenções, as barras das classes [0, 10), [10, 20), [20, 30), [30, 40) e [40, 50), em minutos, têm alturas 4, 10, 14, 8 e 4 intervenções, respectivamente. A porcentagem das intervenções que levaram 30 minutos ou mais é de',
      o: ['10%', '12%', '20%', '30%', '70%'], a: 3,
      c: 'Trinta minutos ou mais são as duas últimas classes: 8 + 4 = 12 intervenções. 12 ÷ 40 = 0,30, isto é, 30%.',
      w: { A: '[freqAcum] 10% considera só a última classe (4 ÷ 40); faltou somar a classe [30, 40).',
        B: '[pctValor] 12% é a frequência 12 lida como se fosse porcentagem; falta dividir por 40.',
        C: '[freqAcum] 20% considera só a classe [30, 40) (8 ÷ 40); faltou somar a última.',
        E: '[freqAcum] 70% é a porcentagem das que levaram menos de 30 minutos (28 ÷ 40), o lado contrário do pedido.' } },
    { id: 'x2', h: 'Mat 7', tag: 'Tabelas e gráficos', d: 'm', conta: '28-14',
      s: 'Numa ogiva (frequência acumulada) dos tempos de reparo de 40 intervenções, o ponto sobre 20 min tem altura 14 e o ponto sobre 30 min tem altura 28. O número de intervenções que levaram 20 minutos ou mais e menos de 30 minutos é',
      o: ['14', '28', '42', '2', '20'], a: 0,
      c: 'A frequência de uma classe é a diferença entre duas alturas seguidas da ogiva: 28 − 14 = 14 intervenções.',
      w: { B: '[freqAcum] 28 é a altura acumulada (tudo até 30 minutos), e não só a classe pedida.',
        C: '[freqAcum] 42 soma as duas alturas (14 + 28); as alturas já são acumuladas, e a classe sai pela diferença.',
        D: '[outra] 2 é a razão entre as alturas (28 ÷ 14), e não a diferença.',
        E: '[outra] 20 é N ÷ 2, a posição da mediana, e não a frequência da classe.' } },
    { id: 'x3', h: 'Mat 7', tag: 'Tabelas e gráficos', d: 'd',
      s: 'Os tempos de casa de 50 funcionários foram agrupados em classes de 5 anos: [0, 5) com 12 funcionários, [5, 10) com 6, [10, 15) com 10, [15, 20) com 14 e [20, 25) com 8. A classe que contém a mediana é',
      o: ['[0, 5)', '[5, 10)', '[15, 20)', '[20, 25)', '[10, 15)'], a: 4,
      c: 'A mediana está na posição 50 ÷ 2 = 25. As frequências acumuladas são 12, 18, 28, 42 e 50. A primeira que chega a 25 é a 28, da classe [10, 15).',
      w: { A: '[freqAcum] [0, 5) acumula só 12, abaixo de 25; a mediana fica mais adiante.',
        B: '[freqAcum] [5, 10) para na acumulada 18, ainda abaixo de 25.',
        C: '[modaMed] [15, 20) é a classe de maior frequência (14), a classe modal, e não a da mediana.',
        D: '[freqAcum] [20, 25) é a última classe; a mediana é o valor central, e não está no fim da distribuição.' } },
    { id: 'x4', h: 'Mat 7', tag: 'Variância e desvio padrão', d: 'f', conta: '12-2',
      s: 'Em 20 lotes inspecionados, 6 lotes tiveram 2 peças defeituosas, 9 tiveram 4, 3 tiveram 7 e 2 tiveram 12. A amplitude do número de peças defeituosas por lote é',
      o: ['10', '7', '9', '12', '20'], a: 0,
      c: 'Amplitude = maior valor − menor valor = 12 − 2 = 10 peças. As frequências não entram na conta.',
      w: { B: '[outra] 7 é o ponto médio entre os extremos ((2 + 12) ÷ 2), e não a diferença.',
        C: '[outra] 9 é a maior frequência (lotes com 4 peças defeituosas), e não um valor da amplitude.',
        D: '[etapa] 12 é o maior valor; falta subtrair o menor.',
        E: '[outra] 20 é a soma das frequências (o número de lotes).' } },
    { id: 'x5', h: 'Mat 7', tag: 'Variância e desvio padrão', d: 'd', conta: '4990/40',
      s: 'Os tempos de reparo de 40 intervenções foram agrupados em classes de 10 minutos: [0, 10) com 4, [10, 20) com 10, [20, 30) com 14, [30, 40) com 8 e [40, 50) com 4. Usando o ponto médio de cada classe como valor dos seus dados, a variância desses tempos, em min<sup>2</sup>, é de',
      o: ['11,2', '24,5', '200,25', '124,75', '4.990'], a: 3,
      c: 'Pontos médios 5, 15, 25, 35 e 45. Média = (20 + 150 + 350 + 280 + 180) ÷ 40 = 980 ÷ 40 = 24,5. Σf(x − 24,5)<sup>2</sup> = 1.521 + 902,5 + 3,5 + 882 + 1.681 = 4.990. Variância = 4.990 ÷ 40 = 124,75.',
      w: { A: '[outra] 11,2 é o desvio padrão (raiz de 124,75), e a pergunta é pela variância.',
        B: '[modaMed] 24,5 é a média dos tempos, e não a variância.',
        C: '[mediaSimples] 200,25 ignora as frequências: soma os cinco desvios ao quadrado (1.001,25) e divide por 5 classes.',
        E: '[etapa] 4.990 é Σf(x − média)<sup>2</sup>; falta dividir por Σf = 40.' } },
  ],
};

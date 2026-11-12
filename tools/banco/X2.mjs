/* Revisão das questões da estação X2 (funções, equações e geometria), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/matematica-funcoes-equacoes-geometria.html), pela chave "bN:i";
   extra: questões só da aba Questões (nesta estação não há). Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual conta errada leva a ela. Os tipos de erro novos desta estação estão no fim de tools/banco/erros.mjs.
   conta: em respostas negativas, a expressão leva Math.abs (o teste lê o número da alternativa sem o sinal). */
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: 'Mat 3', b2: 'Mat 4', b3: 'Mat 4', b4: 'Mat 3', b5: 'Mat 3', b6: 'Mat 3', b7: 'Mat 9', b8: 'Mat 10' },
  q: {
    /* ---------- seção 1: funções e equações do 1º grau ---------- */
    'b1:0': { d: 'f', conta: '(440-120)/40', w: {
      A: '[outra] 3 horas é o número de horas que a taxa fixa pagaria (120 ÷ 40), e não o tempo de serviço.',
      C: '[fixoFunc] 11 horas divide o custo total por 40 sem descontar a taxa fixa de R$ 120,00.',
      D: '[sinal] 14 horas soma a taxa fixa de R$ 120,00 em vez de subtraí-la.',
      E: '[etapa] 320 horas para em 440 − 120 = 320 e esquece de dividir por 40.' } },
    'b1:1': { d: 'm', conta: '5*10+20', w: {
      A: '[coefAng] 190 toma a = 50 − 30 = 20 sem dividir por 6 − 2 (e então b = 30 − 20·2 = −10).',
      B: '[propFunc] 150 trata f como proporcional a x (30 por 2 unidades, logo 30 · 10 ÷ 2) e ignora o termo b.',
      C: '[fixoFunc] 100 usa b = 50, que é o valor de f(6), e não o de f(0).',
      D: '[fixoFunc] 80 usa b = 30, que é o valor de f(2), e não o de f(0).' } },
    'b1:2': { d: 'm', conta: '(7-2)/(3-2)', w: {
      A: '[distSinal] −15 não distribui o sinal de menos em −2(x − 5): fica 4x − 12 − 2x − 10 = 3x − 7 e dá x = −15.',
      B: '[sinal] −5 chega a −x = −5 e responde −5, sem inverter o sinal dos dois lados.',
      D: '[sinal] 9 troca o sinal do 2 ao passá-lo para o outro lado (2x − 3x = −7 − 2).',
      E: '[distSinal] 14 distribui o 4 só no x (4x − 3), sem multiplicar o −3.' } },
    'b1:3': { d: 'm', conta: '2100/5', w: {
      A: '[partesProp] 380 m divide o total por 3, como se os três dias fossem iguais.',
      C: '[enunciado] 432 m toma o terceiro dia como metade do primeiro (x + x + 60 + x/2 = 1.140).',
      D: '[outra] 480 m é o que se instalou no segundo dia (420 + 60).',
      E: '[etapa] 540 m esquece o terceiro dia (x + x + 60 = 1.140).' } },
    /* ---------- seção 2: sistemas de equações lineares ---------- */
    'b2:0': { d: 'f', conta: '23-(55-46)', w: {
      A: '[sisSub] R$ 32,00 subtrai as duas compras (55 − 23) sem eliminar uma incógnita.',
      B: '[sisSub] R$ 27,50 divide 55 por 2 e ignora as tomadas.',
      C: '[outra] R$ 23,00 é o preço de um disjuntor mais uma tomada.',
      D: '[sisSub] R$ 18,33 divide 55 por 3 e ignora os disjuntores.' } },
    'b2:1': { d: 'm', conta: '70+40', w: {
      A: '[sisIncog] R$ 40,00 é só o valor de y; a pergunta é x + y.',
      B: '[sisIncog] R$ 70,00 é só o valor de x; a pergunta é x + y.',
      D: '[sisSub] R$ 140,00 dobra o valor de x (2 · 70), sem calcular y.',
      E: '[sisIncog] R$ 2.800,00 multiplica x por y (70 · 40) em vez de somar.' } },
    'b2:2': { d: 'm', conta: '33-14', w: {
      A: '[sisSub] R$ 47,00 soma as duas compras.',
      B: '[outra] R$ 33,00 é o preço da segunda compra (3 m de A e 2 m de B).',
      C: '[sisSub] R$ 28,00 dobra o preço do par A + B (2 · 14), sem separar A de B.',
      D: '[sisIncog] R$ 23,00 troca os preços: usa A = 9 e B = 5 (2 · 9 + 5).' } },
    'b2:3': { d: 'm', conta: '9/3', w: {
      B: '[sisClass] 4,5 divide 9 por 2, em vez de dividir pelo fator 3 que liga as equações.',
      C: '[sisClass] 6 copia o coeficiente de x da segunda equação.',
      D: '[sisClass] 7 copia o termo independente da primeira equação.',
      E: '[sisClass] 9 copia o coeficiente de y da segunda equação, sem dividir por 3.' } },
    /* ---------- seção 3: equação e função do 2º grau ---------- */
    'b3:0': { d: 'f', conta: '(9+Math.sqrt(81-56))/2', w: {
      A: '[bhaskara] −2 usa b = −9 no lugar de −b: (−9 + 5)/2 = −2.',
      B: '[outra] 2 é a menor raiz; a pergunta é a maior.',
      D: '[somaProd] 9 é a soma das raízes (−b/a), e não uma raiz.',
      E: '[somaProd] 14 é o produto das raízes (c/a), e não uma raiz.' } },
    'b3:1': { d: 'm', conta: '-(256-156)/(4*-1)', w: {
      B: '[vertice] R$ 39 mil é o termo independente, isto é, o prejuízo com nenhum contrato (L(0) = −39).',
      C: '[vertice] R$ 64 mil é x<sub>v</sub>² = 8², um número sem relação com o lucro máximo.',
      D: '[vertice] R$ 100 mil é o discriminante Δ = 256 − 156, sem dividir por −4a.',
      E: '[sinalPot] R$ 153 mil calcula 8² com sinal positivo em L(8): +64 + 128 − 39.' } },
    'b3:2': { d: 'm', conta: '2*(5+8)', w: {
      A: '[etapa] 13 m é o semiperímetro (5 + 8); falta dobrar.',
      B: '[outra] 16 m é só o dobro do comprimento.',
      D: '[areaPerim] 32 m trata a sala como um quadrado de lado 8.',
      E: '[areaPerim] 40 m é a área da sala, e não o perímetro.' } },
    'b3:3': { d: 'd', conta: '36/4', w: {
      A: '[deltaErr] 3 é a metade de |b| (e a raiz que resulta), mas não vem da condição Δ = 0.',
      C: '[deltaErr] 12 calcula 36 ÷ 3, sem usar o 4 de 4ac.',
      D: '[deltaErr] 18 resolve 36 − 2k = 0, como se 4ac fosse 2k.',
      E: '[deltaErr] 36 é b²; esquece de subtrair 4 · 1 · k e de igualar a zero.' } },
    /* ---------- seção 4: função e equação exponencial ---------- */
    'b4:0': { d: 'f', conta: '60000*0.9**2', w: {
      A: '[expBase] R$ 108.000,00 multiplica a base pelo expoente (0,9 · 2) em vez de elevar.',
      B: '[taxaFator] R$ 72.600,00 usa o fator 1,1 (alta de 10%) no lugar de 0,9.',
      C: '[expBase] R$ 60.000,00 ignora o expoente: V(2) igual ao valor inicial.',
      D: '[periodosJc] R$ 54.000,00 calcula só 1 ano (0,9<sup>1</sup>); o expoente é 2.' } },
    'b4:1': { d: 'm', conta: '6-3', w: {
      B: '[expBase] 6 esquece o 3 do expoente e responde o expoente de 64.',
      C: '[sinal] 9 soma 3 em vez de subtrair: x = 6 + 3.',
      D: '[expBase] 29 divide 64 por 2 e subtrai 3, em vez de escrever 64 como potência de 2.',
      E: '[expBase] 61 iguala o expoente ao próprio 64 (x + 3 = 64).' } },
    'b4:2': { d: 'm', conta: '5/2', w: {
      A: '[expProp] x = 1,25 divide o expoente 5 por 4 (a base), e não por 2 (o expoente de 4 = 2<sup>2</sup>).',
      C: '[expProp] x = 5 iguala x ao expoente de 32 sem mudar a base: 4<sup>5</sup> não é 32.',
      D: '[expBase] x = 8 divide 32 por 4, como se a equação fosse 4x = 32.',
      E: '[expBase] x = 28 subtrai 4 de 32, como se a equação fosse x + 4 = 32.' } },
    'b4:3': { d: 'd', conta: '2+0', w: {
      A: '[expProp] 0 fica só com a solução x = 0 e esquece x = 2.',
      B: '[expProp] 1 para em y = 1, o menor valor de y.',
      D: '[expProp] 4 para em y = 4, o maior valor de y.',
      E: '[expProp] 5 soma os valores de y (1 + 4), sem voltar a x = log<sub>2</sub> y.' } },
    /* ---------- seção 5: logaritmos ---------- */
    'b5:0': { d: 'f', conta: 'Math.log(81)/Math.log(3)', w: {
      A: '[logDef] 243 multiplica o logaritmando pela base.',
      B: '[logDef] 78 subtrai a base do logaritmando.',
      C: '[logDef] 27 divide o logaritmando pela base.',
      E: '[logDef] 3 repete a base do logaritmo.' } },
    'b5:1': { d: 'm', conta: '0.30+2*0.48', w: {
      A: '[logProp] 0,29 multiplica os logaritmos (0,30 · 0,96) em vez de somá-los.',
      B: '[logProp] 0,78 esquece que o 3 aparece ao quadrado (18 = 2 · 3²) e soma log 2 com log 3.',
      D: '[fatores] 1,74 fatora 18 como 2 · 3³ (0,30 + 3 · 0,48).',
      E: '[logProp] 2,78 soma o expoente 2 como parcela (0,30 + 2 + 0,48), em vez de multiplicar log 3 por 2.' } },
    'b5:2': { d: 'm', conta: '2**5-4', w: {
      A: '[logDef] x = 1 iguala o logaritmando ao valor do logaritmo (x + 4 = 5).',
      B: '[logDef] x = 6 multiplica a base pelo resultado (x + 4 = 2 · 5 = 10).',
      C: '[logDef] x = 21 troca base e expoente (x + 4 = 5<sup>2</sup> = 25).',
      E: '[etapa] x = 32 para em 2<sup>5</sup> = 32 e esquece de subtrair 4.' } },
    'b5:3': { d: 'd', conta: '0.48/0.08', w: {
      B: '[logProp] 2,5 anos divide 3 por 1,2, em vez de usar logaritmos.',
      C: '[logProp] 2,4 anos usa 0,20, a taxa, no lugar de log 1,2.',
      D: '[logProp] 1,6 anos usa log 2 = 0,30 como se fosse log 1,2.',
      E: '[logProp] 0,44 anos usa log 12 = 1,08 como se fosse log 1,2.' } },
    /* ---------- seção 6: trigonometria ---------- */
    'b6:0': { d: 'f', conta: '10*0.5', w: {
      A: '[trigLado] 20 m divide 10 por sen 30°, como se a rampa fosse o cateto oposto.',
      B: '[trigValor] 17,3 m multiplica 10 por √3, sem dividir por 2.',
      C: '[trigRazao] 8,65 m usa o cosseno (10 · √3/2): calcula o cateto adjacente, o comprimento na horizontal.',
      D: '[trigRazao] 5,77 m usa a tangente (10 · √3/3), que liga o cateto oposto ao adjacente, e não à hipotenusa.' } },
    'b6:1': { d: 'm', conta: '6/0.5', w: {
      B: '[trigRazao] 10,4 m usa a tangente (6 ÷ √3/3): obtém a distância do pé do poste até onde o cabo toca o solo, e não o cabo.',
      C: '[trigRazao] 6,94 m usa o cosseno (6 ÷ √3/2): relaciona o cateto adjacente, e não o oposto, à hipotenusa.',
      D: '[trigLado] 6 m toma o cabo igual ao poste, como se o ângulo fosse de 90°.',
      E: '[trigLado] 3 m multiplica 6 por sen 30° em vez de dividir: a hipotenusa é maior que o cateto.' } },
    'b6:2': { d: 'm', conta: '2*Math.PI/(Math.PI/12)', w: {
      A: '[trigFunc] 31 é a temperatura máxima (25 + 6), e não o período.',
      C: '[trigFunc] 12 lê o 12 do denominador como se fosse o período.',
      D: '[trigFunc] 6,28 é o período de sen t, sem considerar o fator π/12 dentro do seno.',
      E: '[trigFunc] 6 é a amplitude da oscilação (o fator 6 antes do seno), e não o período.' } },
    'b6:3': { d: 'd', conta: '0.6/0.8', w: {
      A: '[trigValor] 1,50 calcula cos θ como 1 − 0,6 = 0,4, em vez de usar sen² + cos² = 1, e divide 0,6 ÷ 0,4.',
      B: '[trigRazao] 1,33 inverte a razão: cos θ ÷ sen θ (a cotangente).',
      C: '[trigRazao] 0,80 é o cosseno de θ, e não a tangente.',
      E: '[trigRazao] 0,60 repete o valor do seno.' } },
    /* ---------- seção 7: geometria plana ---------- */
    'b7:0': { d: 'f', conta: '7*24/2', w: {
      A: '[areaFig] 175 cm² multiplica hipotenusa por cateto, sem dividir por 2.',
      B: '[areaFig] 168 cm² esquece de dividir por 2 (7 · 24).',
      C: '[pitagoras] 90,87 cm² soma os quadrados (625 + 49) para achar o outro cateto, em vez de subtrair.',
      D: '[areaFig] 87,5 cm² usa a hipotenusa como base (25 · 7 ÷ 2); a base e a altura são os catetos.' } },
    'b7:1': { d: 'm', conta: '144/9', w: {
      A: '[relMetrica] 135 subtrai 9 de 12² (144 − 9) em vez de dividir 144 por 9.',
      B: '[relMetrica] 108 multiplica a altura pelo segmento (12 · 9), em vez de usar h² = m · n.',
      C: '[relMetrica] 21 soma as medidas (12 + 9).',
      E: '[relMetrica] 3 subtrai as medidas (12 − 9), sem usar h² = m · n.' } },
    'b7:2': { d: 'm', conta: '3.14*(100-9)', w: {
      A: '[semQuad] 304,58 esquece de elevar o raio do furo ao quadrado (100 − 3).',
      C: '[raioDiam] 200,96 usa o diâmetro 6 como raio do furo (100 − 36).',
      D: '[areaFig] 153,86 subtrai os raios antes de elevar ao quadrado: π(10 − 3)².',
      E: '[semFator] 91 esquece de multiplicar por π.' } },
    'b7:3': { d: 'd', conta: '6*4.5/0.25', w: {
      A: '[areaPerim] 21 soma as placas de um lado e do outro (12 + 9) em vez de multiplicar.',
      B: '[areaPerim] 42 conta as placas ao longo do perímetro da sala.',
      C: '[areaFig] 54 divide a área pela medida do lado da placa (0,5), e não pela área dela (0,25).',
      E: '[unidArea] 1.080 usa 0,025 m² como área da placa (errou ao elevar 0,5 ao quadrado).' } },
    /* ---------- seção 8: geometria espacial ---------- */
    'b8:0': { d: 'f', conta: '2.5*1.2*0.8*1000', w: {
      B: '[etapa] 3.000 L usa só a área da base (2,5 · 1,2 = 3 m²) e esquece a altura.',
      C: '[volSolido] 4.500 L soma as arestas (2,5 + 1,2 + 0,8 = 4,5) em vez de multiplicá-las.',
      D: '[volSolido] 11.920 L calcula a área total (11,92 m²) e a converte como se fosse volume.',
      E: '[unidArea] 24.000 L converte com 1 m³ = 10.000 L.' } },
    'b8:1': { d: 'm', conta: '3.14*1.5**2*4', w: {
      A: '[etapa] 7,07 m³ calcula só a área da base (πr²) e esquece a altura.',
      B: '[volSolido] 9,42 m³ divide por 3, que é a fórmula do cone, e não a do cilindro.',
      C: '[semQuad] 18,84 m³ esquece de elevar o raio ao quadrado (π · r · h).',
      E: '[raioDiam] 113,04 m³ usa o diâmetro 3 como raio (3,14 · 3² · 4).' } },
    'b8:2': { d: 'm', conta: '3.14*9*4/3', w: {
      A: '[semFator] 12 m³ esquece de multiplicar por π.',
      C: '[volSolido] 47,1 m³ usa a geratriz 5 no lugar da altura 4.',
      D: '[volSolido] 113,04 m³ esquece o fator 1/3 do cone.',
      E: '[volSolido] 141,3 m³ usa a geratriz no lugar da altura e esquece o fator 1/3.' } },
    'b8:3': { d: 'd', conta: '4*3.14*36', w: {
      A: '[semQuad] 75,36 m² esquece de elevar o raio ao quadrado (4 · π · r).',
      B: '[areaSolido] 113,04 m² usa a área do círculo máximo (πr²), sem o fator 4.',
      C: '[areaSolido] 226,08 m² usa 2πr², que é só uma parte da fórmula.',
      E: '[volSolido] 904,32 m² calcula o volume da esfera (4πr³/3), e não a área da superfície.' } },
  },
  extra: [],
};

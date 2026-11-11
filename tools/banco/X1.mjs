/* Revisão das questões da estação X1 (números, proporções e matemática financeira), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/matematica-numeros-proporcoes-juros.html), pela chave "bN:i";
   extra: questões só da aba Questões (nesta estação não há). Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual conta errada leva a ela. Os tipos de erro novos desta estação estão no fim de tools/banco/erros.mjs.
   conta: em respostas negativas, a expressão leva Math.abs (o teste lê o número da alternativa sem o sinal). */
const mdc = (...n) => `((g)=>[${n}].reduce((a,b)=>g(a,b)))(function g(a,b){return b?g(b,a%b):a})`;
const mmc = (...n) => `((g)=>[${n}].reduce((a,b)=>a*b/g(a,b)))(function g(a,b){return b?g(b,a%b):a})`;
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: 'Mat 1', b2: 'Mat 1', b3: 'Mat 1', b4: 'Mat 1', b5: 'Mat 2', b6: 'Mat 2', b7: 'Mat 2', b8: 'Mat 8' },
  q: {
    /* ---------- seção 1: conjuntos numéricos, ordem e sinais ---------- */
    'b1:0': { d: 'f', conta: '[-7,0,1/3,Math.sqrt(16)].length', w: {
      A: '[conjNum] 2 conta só −7 e 0, e deixa de fora 0,333… (que é 1/3) e √16 (que é 4): ambos são racionais.',
      B: '[conjNum] 3 deixa √16 de fora, como se toda raiz fosse irracional; mas √16 = 4, inteiro.',
      D: '[conjNum] 5 inclui √5, que é raiz não exata e, portanto, irracional.',
      E: '[conjNum] 6 trata todo número real como racional; √5 e π não se escrevem como fração de inteiros.' } },
    'b1:1': { d: 'm', w: {
      B: '[quadEntre01] 1² = 1: o quadrado é igual ao número, e não menor.',
      C: '[sinal] (−3/4)² = 9/16 é positivo, logo maior que −3/4; elevar ao quadrado tira o sinal negativo.',
      D: '[quadEntre01] (4/3)² = 16/9 ≈ 1,78, maior que 4/3 ≈ 1,33: acima de 1 o quadrado cresce.',
      E: '[quadEntre01] 0² = 0: o quadrado é igual ao número.' } },
    'b1:2': { d: 'm', conta: 'Math.abs(-(3**2)+(-2)**3-(-5))', w: {
      A: '[sinalPot] 22 faz todos os termos positivos (9 + 8 + 5): −3² e (−2)³ são negativos.',
      B: '[sinalPot] 6 lê −3² como (−3)² = 9 e fica 9 − 8 + 5; sem parênteses, o quadrado pega só o 3.',
      C: '[sinalPot] 4 dá sinal positivo a (−2)³ (−9 + 8 + 5); expoente ímpar mantém o negativo: −8.',
      D: '[potMult] −7 multiplica cada base pelo expoente (−6 − 6 + 5), em vez de multiplicar a base por ela mesma.' } },
    'b1:3': { d: 'm', w: {
      A: '[ordemNeg] a &lt; b &lt; c compara 1,25 com 1,3 como se 25 fosse maior que 3: sem o sinal, 1,25 &lt; 1,30.',
      C: '[ordemNeg] c &lt; a &lt; b é a ordem dos números sem o sinal (1,20 &lt; 1,25 &lt; 1,30); com o sinal negativo, a ordem inverte.',
      D: '[ordemNeg] c &lt; b &lt; a ordena os módulos comparando as casas como inteiros (2 &lt; 3 &lt; 25) e esquece de inverter.',
      E: '[invertida] b &lt; c &lt; a inverte a fração e toma −5/4 como −4/5 = −0,8, que é maior que os outros dois.' } },
    /* ---------- seção 2: frações, decimais e dízimas ---------- */
    'b2:0': { d: 'm', conta: '15-6-5', w: {
      A: '[outra] 11/15 é a fração retirada (2/5 + 1/3 = 6/15 + 5/15); a pergunta é o que restou.',
      B: '[fracSoma] 5/8 soma numeradores e denominadores (2/5 + 1/3 = 3/8) e tira de 1.',
      C: '[fracResto] 2/5 lê a retirada de terça-feira como 1/3 do que restava: 3/5 − 3/5 × 1/3 = 2/5, mas eram 1/3 do total.',
      E: '[formula] 2/15 multiplica as frações (2/5 × 1/3), operação que não representa o que foi retirado.' } },
    'b2:1': { d: 'f', conta: '45/9', w: {
      A: '[dizima] 9/20 é 45/100 = 0,45, um decimal que termina; a dízima repete o 45 sem parar.',
      C: '[dizima] 1/2 põe o período sobre 90 (45/90); o denominador deve ter dois noves, 99.',
      D: '[dizima] 4/9 é 0,444…, que repete só o primeiro algarismo do período.',
      E: '[dizima] 5/111 vem de 45/999: três noves para um período de dois algarismos.' } },
    'b2:2': { d: 'm', conta: '240*(1-3/8)*2/5', w: {
      B: '[outra] 90 é o número de lâmpadas do galpão A (3/8 de 240), e não o do galpão B.',
      C: '[fracResto] 96 é 2/5 de 240, isto é, do lote inteiro; os 2/5 incidem só sobre as 150 que restaram.',
      D: '[etapa] 150 é o que restou depois do galpão A; falta aplicar os 2/5.',
      E: '[formula] 186 soma 90 e 96, duas partes tomadas sobre o lote inteiro.' } },
    'b2:3': { d: 'm', conta: '5*4/2', w: {
      A: '[fracDiv] 5/24 multiplica 5/6 por 1/4 em vez de dividir; dividir por 1/4 é multiplicar por 4.',
      B: '[etapa] 5/6 é só o resultado dos parênteses (1/2 + 1/3); falta dividir por 1/4.',
      C: '[fracSoma] 8/5 soma numeradores e denominadores (2/5) e multiplica por 4.',
      D: '[ordemOp] 11/6 ignora os parênteses: 1/2 + (1/3 ÷ 1/4) = 1/2 + 4/3.' } },
    /* ---------- seção 3: potências, raízes e ordem das operações ---------- */
    'b3:0': { d: 'd', w: {
      B: '[comparaPot] 5<sup>20</sup> e 2<sup>60</sup> olha só os expoentes (20 &lt; 40 &lt; 60); mas 2<sup>60</sup> = 8<sup>20</sup> é menor que 3<sup>40</sup> = 9<sup>20</sup>.',
      C: '[comparaPot] 2<sup>60</sup> e 3<sup>40</sup> acerta o maior, mas escolhe 2<sup>60</sup> como menor só por ter a menor base; 2<sup>60</sup> = 8<sup>20</sup> é maior que 5<sup>20</sup>.',
      D: '[comparaPot] 2<sup>60</sup> e 5<sup>20</sup> olha só as bases (2 &lt; 3 &lt; 5); igualados os expoentes, ficam 8<sup>20</sup>, 9<sup>20</sup> e 5<sup>20</sup>.',
      E: '[comparaPot] 3<sup>40</sup> e 5<sup>20</sup> troca o maior pelo menor: com expoente 20, as bases são 9, 8 e 5, e 5<sup>20</sup> é o menor.' } },
    'b3:1': { d: 'f', conta: '20-12/4+2*3**2', w: {
      A: '[ordemOp] −1 soma 3 + 18 antes de subtrair de 20 (20 − 21); soma e subtração vão da esquerda para a direita.',
      B: '[ordemOp] 20 subtrai antes de dividir: (20 − 12) ÷ 4 + 18 = 2 + 18.',
      C: '[potMult] 29 calcula 3² como 3 × 2 = 6 e fica 20 − 3 + 12.',
      E: '[ordemOp] 53 multiplica antes da potência: (2 × 3)² = 36 e fica 20 − 3 + 36.' } },
    'b3:2': { d: 'm', conta: '2**8/4**2+Math.sqrt(9+16)', w: {
      A: '[potMult] 6 calcula 2<sup>8</sup> como 2 × 8 = 16 e fica 16 ÷ 16 + 5.',
      B: '[etapa] 16 é só 256 ÷ 16; falta somar a raiz, √25 = 5.',
      D: '[raizSoma] 23 distribui a raiz na soma: √9 + √16 = 7, e 16 + 7 = 23; mas √(9 + 16) = √25 = 5.',
      E: '[potMult] 37 calcula 4<sup>2</sup> como 4 × 2 = 8 e fica 256 ÷ 8 + 5.' } },
    'b3:3': { d: 'm', conta: '2**3+Math.cbrt(27)+5**0', w: {
      A: '[expEspecial] −4 toma o expoente negativo como sinal da potência (−8 + 3 + 1); ele inverte a base.',
      B: '[potMult] 2,5 multiplica a base pelo expoente: (1/2) × (−3) = −1,5, e fica −1,5 + 3 + 1.',
      C: '[expEspecial] 4,125 ignora o sinal do expoente: (1/2)<sup>3</sup> = 0,125, e fica 0,125 + 3 + 1.',
      D: '[expEspecial] 11 toma 5<sup>0</sup> como 0 (8 + 3 + 0); qualquer base diferente de zero elevada a 0 vale 1.' } },
    /* ---------- seção 4: MMC e MDC ---------- */
    'b4:0': { d: 'f', conta: mmc(12, 18, 30), w: {
      A: '[somaMult] 60 soma os intervalos (12 + 18 + 30); e 60 nem é múltiplo de 18.',
      C: '[fatores] 360 = 12 × 30 é múltiplo comum dos três, mas não o menor: 180 também é.',
      D: '[fatores] 540 = 18 × 30 é múltiplo comum, mas não o menor: 180 também é.',
      E: '[somaMult] 6.480 multiplica os três intervalos (12 × 18 × 30), em vez de achar o MMC.' } },
    'b4:1': { d: 'f', conta: mdc(72, 108, 180), w: {
      A: '[fatores] 6 usa cada primo comum uma vez só (2 · 3); no MDC fica o menor expoente de cada um: 2<sup>2</sup> · 3<sup>2</sup>.',
      B: '[outra] 10 é o número de pedaços (2 + 3 + 5), e não o comprimento de cada um.',
      C: '[fatores] 12 = 2<sup>2</sup> · 3 deixa de fora um fator 3: o menor expoente do 3 é 2.',
      D: '[fatores] 18 = 2 · 3<sup>2</sup> deixa de fora um fator 2: o menor expoente do 2 é 2.' } },
    'b4:2': { d: 'm', conta: '7+' + mmc(40, 75) + '/60', w: {
      A: '[mmcMdc] 7h05 usa o MDC (5 min); "tocar juntas de novo" pede o MMC.',
      B: '[somaMult] 8h55 soma os intervalos: 40 + 75 = 115 min.',
      C: '[fatores] 9h00 usa o 5 com o menor expoente (2<sup>3</sup> · 3 · 5 = 120 min), que não é múltiplo de 75; no MMC vale o maior expoente: 5<sup>2</sup>.',
      E: '[tempoHM] 22h20 lê 1 h 15 min como 115 min: MMC de 40 e 115 = 920 min = 15 h 20 min.' } },
    'b4:3': { d: 'f', w: {
      B: '[fatores] 2<sup>2</sup> · 3<sup>2</sup> · 10 também dá 360, mas 10 não é primo (10 = 2 · 5).',
      C: '[fatores] 2<sup>3</sup> · 3 · 15 também dá 360, mas 15 não é primo (15 = 3 · 5).',
      D: '[fatores] 2<sup>2</sup> · 3<sup>2</sup> · 5 vale 180: falta um fator 2.',
      E: '[fatores] 2<sup>3</sup> · 3<sup>2</sup> · 5<sup>2</sup> vale 1.800: um fator 5 a mais.' } },
    /* ---------- seção 5: razão, proporção e divisão proporcional ---------- */
    'b5:0': { d: 'f', conta: '1260/(7+3)*7', w: {
      A: '[outra] 126 é o valor de uma parte (1.260 ÷ 10), e não o de 7 partes.',
      B: '[outra] 378 são os reprovados (3 × 126), e não os aprovados.',
      C: '[razaoParte] 540 = 1.260 × 3/7 toma a razão entre as partes (7 para 3) como fração do total; o total tem 7 + 3 = 10 partes.',
      D: '[razaoParte] 720 = 1.260 − 540 desconta do lote o resultado da conta errada anterior (3/7 do total).' } },
    'b5:1': { d: 'f', conta: '5400/(3+5+10)*5', w: {
      A: '[outra] R$ 900,00 é a parte de quem tem 3 anos (3 × 300).',
      B: '[partesProp] R$ 1.080,00 divide o total pelo tempo de serviço dele (5.400 ÷ 5); o divisor é a soma 3 + 5 + 10 = 18.',
      D: '[partesProp] R$ 1.800,00 divide em três partes iguais (5.400 ÷ 3), sem considerar o tempo de serviço.',
      E: '[outra] R$ 3.000,00 é a parte de quem tem 10 anos (10 × 300).' } },
    'b5:2': { d: 'd', conta: '3300/(6+3+2)*2', w: {
      A: '[outra] R$ 300,00 é o valor de uma parte (3.300 ÷ 11), e não o de duas.',
      C: '[outra] R$ 900,00 é o prêmio de quem teve 2 faltas (3 partes de R$ 300,00).',
      D: '[partesProp] R$ 1.100,00 divide o prêmio em três partes iguais (3.300 ÷ 3).',
      E: '[propInversa] R$ 1.650,00 faz a divisão direta (3.300 × 3/6), dando mais a quem faltou mais.' } },
    'b5:3': { d: 'f', conta: '6*250/100', w: {
      A: '[escala] 0,024 cm divide 6 por 250; a escala 1 : 250 manda multiplicar o desenho por 250.',
      B: '[unidade] 1,5 m converte 1.500 cm dividindo por 1.000, e não por 100.',
      C: '[escala] 2,5 m converte só os 250 da escala (250 cm), sem multiplicar pelos 6 cm do desenho.',
      E: '[unidade] 150 m converte 1.500 cm dividindo por 10, e não por 100.' } },
    /* ---------- seção 6: regra de três ---------- */
    'b6:0': { d: 'f', conta: '6*15/9', w: {
      B: '[aditivo] 12 dias tira um dia para cada técnico a mais (15 − 3); proporção não se resolve com subtração.',
      C: '[aditivo] 18 dias soma os 3 técnicos a mais (15 + 3), e mais gente levaria mais tempo, o que não faz sentido.',
      D: '[regra3Dir] 22,5 dias multiplica em cruz (9 × 15 ÷ 6), como se fosse direta; mais técnicos, menos dias.',
      E: '[etapa] 90 dias é o produto 6 × 15, o tempo de um técnico sozinho; falta dividir por 9.' } },
    'b6:1': { d: 'm', conta: '27/2.25*5', w: {
      A: '[etapa] 12,0 L é o consumo de uma hora (27 ÷ 2,25); falta multiplicar por 5 horas.',
      B: '[tempoHM] 37,7 L conta 2 h 15 min como 215 minutos: 27 × 300 ÷ 215.',
      C: '[tempoHM] 54,0 L conta 15 minutos como meia hora (2,5 h): 27 ÷ 2,5 × 5.',
      E: '[tempoHM] 67,5 L despreza os 15 minutos (27 ÷ 2 × 5).' } },
    'b6:2': { d: 'd', conta: '10*8*6*1200/(8*6*5)', w: {
      A: '[regra3Comp] 600 inverte as três razões: 1.200 × 8/10 × 6/8 × 5/6.',
      B: '[regra3Comp] 1.350 trata as horas por dia como inversas: 1.200 × 10/8 × 6/8 × 6/5.',
      C: '[regra3Comp] 1.536 trata o número de operários como inverso: 1.200 × 8/10 × 8/6 × 6/5.',
      D: '[regra3Comp] 2.000 esquece a mudança no número de dias: 1.200 × 10/8 × 8/6.' } },
    'b6:3': { d: 'd', conta: '600/(4*5)*6', w: {
      A: '[regra3Comp] x/30 usa a produção de uma máquina só (600 ÷ 20 = 30 peças por hora); são 6 máquinas.',
      B: '[regra3Comp] x/80 trata o número de máquinas como inverso da produção (120 × 4/6 = 80 peças por hora).',
      D: '[regra3Comp] x/120 esquece que o número de máquinas mudou (600 ÷ 5 = 120 peças por hora, das quatro máquinas).',
      E: '[regra3Comp] x/720 multiplica por 6 as 120 peças por hora das quatro máquinas (120 × 6 = 720).' } },
    /* ---------- seção 7: porcentagem ---------- */
    'b7:0': { d: 'm', conta: '800*1.2*0.85', w: {
      A: '[fatorTroc] R$ 736,00 troca os fatores: desconto de 20% e aumento de 15% (800 × 0,80 × 1,15).',
      B: '[pctValor] R$ 805,00 trata as porcentagens como reais (800 + 20 − 15).',
      D: '[pctSoma] R$ 840,00 soma as porcentagens (20% − 15% = 5%) em vez de multiplicar os fatores.',
      E: '[etapa] R$ 960,00 é o preço depois do aumento; falta aplicar o desconto de 15%.' } },
    'b7:1': { d: 'f', conta: '(2900-2500)/2500*100', w: {
      A: '[baseVar] 13,8% divide a diferença pelo salário novo (400 ÷ 2.900); a base é o valor antigo.',
      C: '[baseVar] 86,2% é 2.500 ÷ 2.900, a razão entre os salários, e não a variação.',
      D: '[baseVar] 116,0% é 2.900 ÷ 2.500, o salário novo como porcentagem do antigo, e não o aumento.',
      E: '[pctValor] 400,0% lê a diferença em reais (R$ 400,00) como se fosse porcentagem.' } },
    'b7:2': { d: 'm', conta: '360/0.8', w: {
      A: '[fatorInverso] R$ 288,00 aplica o desconto de novo (360 × 0,80), em vez de desfazê-lo.',
      B: '[pctValor] R$ 380,00 soma 20 reais a 360, e não 20% do preço original.',
      C: '[fatorInverso] R$ 432,00 soma 20% de 360 (360 × 1,20), mas os 20% eram do preço antigo.',
      E: '[fatorInverso] R$ 1.800,00 divide por 0,20, tratando os R$ 360,00 como o valor do desconto.' } },
    'b7:3': { d: 'f', conta: '0.25*0.4*100', w: {
      B: '[pctDePct] 15% subtrai as porcentagens (40 − 25); porcentagem de porcentagem multiplica.',
      C: '[pctDePct] 25% é a parte dos eletricistas dentro da manutenção, e não do total da empresa.',
      D: '[pctDePct] 62,5% divide 25 por 40; falta multiplicar as taxas.',
      E: '[pctDePct] 65% soma as porcentagens (40 + 25), em vez de multiplicá-las.' } },
    /* ---------- seção 8: juros simples e compostos ---------- */
    'b8:0': { d: 'm', conta: '4000*0.18/12*8', w: {
      A: '[jurosTempo] R$ 60,00 são os juros de um mês só (4.000 × 0,015); falta multiplicar por 8 meses.',
      C: '[jurosTempo] R$ 720,00 são os juros de um ano inteiro (4.000 × 0,18); o prazo é de 8 meses.',
      D: '[outra] R$ 4.480,00 é o montante (4.000 + 480), e não os juros.',
      E: '[taxaUnid] R$ 5.760,00 usa a taxa anual com o tempo em meses (4.000 × 0,18 × 8).' } },
    'b8:1': { d: 'f', conta: '5000*1.1**3', w: {
      A: '[simplesComp] R$ 1.500,00 são os juros simples (5.000 × 0,10 × 3), e não o montante a juros compostos.',
      B: '[outra] R$ 1.655,00 são os juros compostos (M − C), e não o montante.',
      C: '[periodosJc] R$ 6.050,00 capitaliza só dois meses (5.000 × 1,1<sup>2</sup>); são três.',
      D: '[simplesComp] R$ 6.500,00 é o montante a juros simples (5.000 + 1.500).' } },
    'b8:2': { d: 'd', w: {
      B: '[taxaExp] 2<sup>6</sup> − 1 eleva o fator a 6 em vez de tirar a raiz sexta; o expoente é 1/6.',
      C: '[simplesComp] 1/6 é a taxa a juros simples (100% divididos por 6 anos); nos compostos a taxa não se divide.',
      D: '[taxaExp] 1 − (1/2)<sup>1/6</sup> usa C/M no lugar de M/C (como (1/2)<sup>1/6</sup>) e subtrai ao contrário, 1 − …, em vez de … − 1.',
      E: '[taxaExp] 2<sup>1/6</sup> é o fator anual 1 + i; falta subtrair 1 para achar a taxa.' } },
    'b8:3': { d: 'd', conta: '10000*(1+0.12*2)-10000*1.11**2', w: {
      A: '[simplesComp] R$ 79,00 menor inverte a comparação, supondo que juros compostos sempre rendem mais.',
      B: '[periodosJc] R$ 21,00 menor compara só os juros do segundo ano (1.200 contra 1.221).',
      D: '[simplesComp] R$ 200,00 maior calcula a opção II a juros simples (12.200 em vez de 12.321).',
      E: '[simplesComp] R$ 223,00 maior calcula a opção I a juros compostos (12.544 em vez de 12.400).' } },
  },
  extra: [],
};

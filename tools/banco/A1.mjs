/* Revisão das questões da estação A1 (eletrônica analógica e digital, itens 9.1 e 9.2), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/eletronica-analogica-digital.html), pela chave "bN:i";
   extra: questões só da aba Questões. Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual erro leva a ela. */
const ov = s => { const multi = /[·+⊕ ]/.test(s.replace(/<[^>]+>/g, '')); const h = x => `<span style="position:absolute;left:-9999px">${x}</span>`; return `<span style="text-decoration:overline">${h(multi ? 'não (' : 'não ')}${s}${multi ? h(')') : ''}</span>`; };
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: '9.1', b2: '9.1', b3: '9.1', b4: '9.1', b5: '9.1', b6: '9.1', b7: '9.1', b8: '9.2' },
  q: {
    /* ---------- seção 1: diodo, retificação e fonte linear ---------- */
    'b1:0': { d: 'f', conta: '2*60', w: {
      A: '[invertida] 30 Hz divide a frequência da rede por 2, quando a onda completa a multiplica por 2.',
      B: '[freqRet] 60 Hz é a frequência da ondulação da meia onda; a ponte aproveita os dois semiciclos.',
      D: '[freqRet] 180 Hz é 3 × 60, a frequência da ondulação de um retificador trifásico de meia onda, e não a da ponte monofásica.',
      E: '[freqRet] 240 Hz dobra a frequência duas vezes: a ponte tem quatro diodos, mas só dobra a frequência uma vez.' } },
    'b1:1': { d: 'm', conta: '24*Math.SQRT2-1.4', w: {
      A: '[pico] 22,6 V usa o valor eficaz do secundário (24 V) no lugar do pico: 24 − 1,4.',
      C: '[quedaDiodo] 33,2 V desconta só um diodo (0,7 V); na ponte conduzem dois em série.',
      D: '[quedaDiodo] 33,9 V é o pico do secundário, sem descontar a queda dos diodos.',
      E: '[raiz2] 46,6 V aplica o fator √2 duas vezes (24 · 2 − 1,4).' } },
    'b1:2': { d: 'm', conta: '0.2/(120*0.001)', w: {
      A: '[freqRet] 0,83 V usa f<sub>r</sub> = 240 Hz: a frequência da ondulação da ponte é 2f = 120 Hz.',
      C: '[freqRet] 3,33 V usa 60 Hz, a frequência da ondulação de uma meia onda.',
      D: '[unidade] 16,7 V lê 1.000 µF como 100 µF (erro de potência de dez).',
      E: '[unidade] 33,3 V combina 60 Hz e 100 µF.' } },
    'b1:3': { d: 'f', w: {
      A: '[detalhe] O diodo fica polarizado ao contrário em operação normal e não conduz: não transforma a tensão em CA.',
      B: '[detalhe] O diodo não eleva a tensão da bobina: ele limita o pico depois do desligamento.',
      C: '[detalhe] Com a fonte invertida, um diodo em paralelo conduziria e poria a fonte em curto; a proteção contra inversão usa um diodo em série.',
      E: '[detalhe] Quem limita a corrente é a resistência da própria bobina; o diodo só conduz no desligamento.' } },
    /* ---------- seção 2: Zener e LED ---------- */
    'b2:0': { d: 'f', w: {
      A: '[detalhe] No sentido direto o Zener é um diodo comum, com 0,7 V, e não regula em V<sub>Z</sub>.',
      B: '[zener] Sem resistor, a corrente na ruptura não seria limitada; e em série com a carga o Zener não a regula.',
      C: '[zener] Abaixo da tensão Zener o componente bloqueia e não regula: a regulação acontece na ruptura.',
      D: '[zener] Em paralelo, mas no sentido direto, a carga ficaria com 0,7 V, e não com V<sub>Z</sub>.' } },
    'b2:1': { d: 'm', conta: '(15-9.1)/180*1000-9.1/910*1000', w: {
      A: '[outra] 10,0 mA é a corrente da carga (9,1/910), e não a do Zener.',
      C: '[etapa] 32,8 mA é a corrente do resistor em série (I<sub>S</sub>); falta subtrair a corrente da carga.',
      D: '[sinal] 42,8 mA soma a corrente da carga a I<sub>S</sub>, em vez de subtrair.',
      E: '[formula] 83,3 mA divide os 15 V inteiros pelo resistor, esquecendo que o Zener segura 9,1 V.' } },
    'b2:2': { d: 'm', conta: '(24-2)/0.01', w: {
      A: '[ledR] 200 Ω divide a tensão do LED (2 V), e não a que sobra para o resistor, pela corrente.',
      B: '[unidade] 220 Ω lê 10 mA como 100 mA.',
      D: '[ledR] 2.400 Ω usa a tensão da fonte inteira, sem descontar a queda do LED.',
      E: '[sinal] 2.600 Ω soma os 2 V do LED à tensão da fonte, em vez de subtrair.' } },
    'b2:3': { d: 'm', w: {
      B: '[zener] A corrente do resistor continua a existir; sem a carga, ela passa toda pelo Zener, e não cai a zero.',
      C: '[zener] O Zener fixa a tensão, e a corrente nele varia com a da carga: I<sub>Z</sub> = I<sub>S</sub> − I<sub>L</sub>.',
      D: '[detalhe] A corrente do resistor continua no mesmo sentido, atravessando o Zener; ela não inverte.',
      E: '[serieTudo] Sem a carga, o resistor e o Zener ficam em série: é a mesma corrente nos dois, e não metade em cada um.' } },
    /* ---------- seção 3: transistor bipolar ---------- */
    'b3:0': { d: 'm', w: {
      A: '[regiaoTBJ] Essa é a descrição do corte (chave aberta), e não a da saturação.',
      B: '[regiaoTBJ] Mistura o corte (V<sub>CE</sub> ≈ V<sub>CC</sub>) com a região ativa (I<sub>C</sub> = β · I<sub>B</sub>); na saturação, V<sub>CE</sub> é baixa e I<sub>C</sub> &lt; β · I<sub>B</sub>.',
      C: '[regiaoTBJ] Sem corrente de base não há condução: é o corte, com I<sub>C</sub> ≈ 0 (e não máxima).',
      E: '[regiaoTBJ] O ganho não é infinito, e o transistor saturado dissipa pouco, porque V<sub>CE</sub> é muito pequena.' } },
    'b3:1': { d: 'm', conta: '15-100*40e-6*1500', w: {
      A: '[regiaoTBJ] 0,2 V supõe saturação, mas 4 mA não saturam este circuito (a saturação pediria cerca de 10 mA).',
      B: '[etapa] 6,0 V é a queda no resistor de coletor (I<sub>C</sub> · R<sub>C</sub>), e não V<sub>CE</sub>.',
      C: '[formula] 8,3 V desconta V<sub>BE</sub> (0,7 V) da malha do coletor, onde ele não aparece.',
      E: '[regiaoTBJ] 15 V supõe corte, com I<sub>C</sub> = 0, mas há corrente de base de 40 µA.' } },
    'b3:2': { d: 'd', conta: '(5-0.7)/0.006', w: {
      B: '[formula] 833 Ω esquece a queda V<sub>BE</sub>: usa 5 V sobre o resistor de base.',
      C: '[sinal] 950 Ω soma o V<sub>BE</sub> (5 + 0,7) em vez de subtrair.',
      D: '[formula] 2.000 Ω usa os 12 V da carga como se estivessem sobre o resistor de base (12/6 mA).',
      E: '[etapa] 4.300 Ω usa I<sub>B</sub> = I<sub>C</sub>/β = 1 mA, no limite da saturação, sem a folga de 1/10 que o enunciado pede.' } },
    'b3:3': { d: 'f', w: {
      A: '[regiaoTBJ] Na saturação, I<sub>C</sub> é menor que β · I<sub>B</sub>; a relação vale na região ativa.',
      B: '[regiaoTBJ] No corte as duas correntes são praticamente nulas: I<sub>C</sub> = 0, e não máxima.',
      C: '[outra] É o contrário: com β bem maior que 1, a corrente de coletor é muito maior que a de base.',
      D: '[detalhe] β varia entre exemplares do mesmo modelo, com a temperatura e com o ponto de operação; por isso a chave se projeta com folga.' } },
    /* ---------- seção 4: amplificador operacional ---------- */
    'b4:0': { d: 'f', conta: '(20/4)*0.6', w: {
      A: '[ganhoOpamp] −3,6 V aplica o ganho do não inversor (1 + R<sub>f</sub>/R<sub>i</sub> = 6) à entrada de −0,6 V.',
      B: '[sinal] −3,0 V esquece que o inversor troca o sinal.',
      C: '[invertida] −0,12 V usa a razão R<sub>i</sub>/R<sub>f</sub>, no lugar de R<sub>f</sub>/R<sub>i</sub>, e esquece a inversão.',
      D: '[invertida] +0,12 V usa a razão R<sub>i</sub>/R<sub>f</sub> no lugar de R<sub>f</sub>/R<sub>i</sub>.' } },
    'b4:1': { d: 'f', conta: '(1+13.5/1.5)*0.3', w: {
      A: '[ganhoOpamp] −2,7 V usa a fórmula do inversor (−R<sub>f</sub>/R<sub>1</sub> = −9).',
      B: '[invertida] 0,033 V usa a razão R<sub>1</sub>/R<sub>f</sub>, no lugar de R<sub>f</sub>/R<sub>1</sub>, e esquece o 1.',
      C: '[invertida] 0,33 V troca R<sub>1</sub> e R<sub>f</sub> no ganho: 1 + R<sub>1</sub>/R<sub>f</sub> = 1,11.',
      D: '[ganhoOpamp] 2,7 V esquece o 1 do ganho do não inversor (R<sub>f</sub>/R<sub>1</sub> = 9, sem somar 1).' } },
    'b4:2': { d: 'm', conta: '60*(0.5/10+1.5/30)', w: {
      A: '[ganhoOpamp] −12,0 V aplica o ganho R<sub>f</sub>/R<sub>1</sub> = 6 à soma das duas tensões (2 V).',
      C: '[ganhoOpamp] −4,0 V aplica o ganho R<sub>f</sub>/R<sub>2</sub> = 2 à soma das duas tensões.',
      D: '[ganhoOpamp] −2,0 V soma as tensões e só inverte, sem aplicar o ganho.',
      E: '[sinal] +6,0 V esquece que o somador é inversor.' } },
    'b4:3': { d: 'd', conta: '10*4/(6+4)*(1+4/2)/2', w: {
      A: '[sinal] "Menor que 6 V" inverte o sentido da desigualdade: com V<sub>i</sub> &lt; 6 V, V<sub>o</sub> = 12 − 2V<sub>i</sub> é positiva.',
      B: '[ganhoOpamp] "Maior que 2 V" usa V<sub>+</sub> = 4 V sem o ganho 3 do não inversor (4 − 2V<sub>i</sub> &lt; 0).',
      D: '[curtoVirtual] "Maior que 0 V" trata a entrada não inversora como terra (V<sub>o</sub> = −2V<sub>i</sub>), ignorando os 4 V do divisor.',
      E: '[tensaoTotal] "Maior que 15 V" põe os 10 V da fonte direto na entrada +, sem o divisor (V<sub>o</sub> = 30 − 2V<sub>i</sub>).' } },
    /* ---------- seção 5: filtros RC e tiristores ---------- */
    'b5:0': { d: 'm', conta: '1/(2*Math.PI*4700*22e-9)', w: {
      A: '[unidade] 154 Hz lê 22 nF como 220 nF (erro de potência de dez no capacitor).',
      C: '[fcRC] 3.080 Hz usa π no lugar de 2π: 1/(π · R · C).',
      D: '[fcRC] 9.670 Hz é 1/(R · C), que esquece o 2π (é a frequência angular, em rad/s, e não a frequência em Hz).',
      E: '[unidade] 15.400 Hz lê 22 nF como 2,2 nF.' } },
    'b5:1': { d: 'm', w: {
      B: '[xlxc] A reatância do capacitor cai com a frequência e desvia as altas frequências: passa-altas é o circuito com a saída no resistor.',
      C: '[detalhe] Um circuito RC passivo não amplifica: o ganho nunca passa de 1.',
      D: '[xlxc] A componente contínua (f = 0) passa no passa-baixas, porque o capacitor é um circuito aberto em CC.',
      E: '[fcRC] Os 3 dB de atenuação são os da frequência de corte; acima dela, a queda continua, 20 dB por década.' } },
    'b5:2': { d: 'm', w: {
      A: '[tiristor] Depois de disparado, o SCR mantém a condução sem o gate (retenção).',
      B: '[tiristor] O SCR conduz num sentido só (anodo para catodo); quem conduz nos dois sentidos é o TRIAC.',
      C: '[tiristor] O gate de um SCR comum só dispara: nem um pulso de polaridade contrária o desliga.',
      E: '[tiristor] O SCR é uma chave de potência e não regula tensão como o Zener.' } },
    'b5:3': { d: 'd', conta: '100*(1+Math.cos(Math.PI/2))/(2*Math.PI)', w: {
      B: '[formula] 31,8 V é V<sub>p</sub>/π, o valor da meia onda sem atraso (α = 0).',
      C: '[semFator] 50,0 V esquece o π do denominador: 100 · (1 + cos α)/2.',
      D: '[formula] 63,7 V é 2V<sub>p</sub>/π, a média da onda completa sem controle.',
      E: '[pico] 100 V é o pico, e não a média.' } },
    /* ---------- seção 6: sistemas de numeração ---------- */
    'b6:0': { d: 'f', conta: '128+32+16+4+2', w: {
      A: '[baseConv] 5 é a quantidade de bits em 1, e não o valor do número.',
      B: '[baseConv] 91 descarta o bit menos significativo (lê 1011011), o que divide o valor por 2.',
      C: '[baseConv] 109 lê o número da direita para a esquerda (0110 1101).',
      E: '[baseConv] 364 começa os pesos em 2<sup>1</sup>, em vez de 2<sup>0</sup>, e dobra o resultado.' } },
    'b6:1': { d: 'm', w: {
      A: '[baseConv] BC (188) inverte a ordem dos algarismos: o quociente é o mais significativo.',
      B: '[baseConv] C11 deixa o resto 11 em decimal; em hexadecimal, 11 é a letra B.',
      C: '[baseConv] DB (219) arredonda o quociente 12,69 para cima, em vez de usar a parte inteira, 12.',
      D: '[baseConv] 313 é o resultado da divisão por 8: é o número em octal.' } },
    'b6:2': { d: 'm', w: {
      B: '[baseConv] 647 agrupa os bits de 3 em 3: é o valor em octal.',
      C: '[baseConv] D38 agrupa os bits a partir da esquerda, completando o último grupo com zeros à direita.',
      D: '[baseConv] A7 ignora o bit isolado da esquerda, que é o grupo incompleto.',
      E: '[baseConv] 423 é o valor em decimal, e não em hexadecimal.' } },
    'b6:3': { d: 'f', conta: '2**10-1', w: {
      A: '[faixaBits] 511 é o maior positivo com sinal (2<sup>9</sup> − 1), e não o maior sem sinal.',
      B: '[faixaBits] 1.000 é uma potência de dez: o registrador é binário, e o limite é uma potência de dois menos 1.',
      D: '[faixaBits] 2.047 é 2<sup>11</sup> − 1, o maior valor de 11 bits.',
      E: '[faixaBits] 1.111.111.111 lê os dez bits 1 como se fossem algarismos decimais: o valor é 2<sup>10</sup> − 1.' } },
    /* ---------- seção 7: portas lógicas e álgebra booleana ---------- */
    'b7:0': { d: 'f', w: {
      A: '[portaTroca] A AND vale 1 só com as duas entradas em 1.',
      B: '[portaTroca] A NOR vale 1 só com as duas entradas em 0.',
      C: '[portaTroca] A XNOR é o contrário da XOR: vale 1 quando as entradas são iguais.',
      E: '[portaTroca] A NAND vale 1 com as entradas diferentes, mas também com as duas em 0; só vale 0 com as duas em 1.' } },
    'b7:1': { d: 'm', w: {
      A: `[deMorgan] ${ov('A')}·B + ${ov('C')} inverte as variáveis, mas mantém as operações: De Morgan também troca E por OU e OU por E.`,
      B: `[deMorgan] ${ov('A')} + B + ${ov('C')} deixa o OU externo, que deveria virar E, e converte só o E interno.`,
      D: '[deMorgan] (A + ' + ov('B') + ')·C troca as operações, mas esquece de inverter as variáveis.',
      E: `[deMorgan] ${ov('A')}·B·${ov('C')} troca o OU externo por E, mas mantém o E interno, que deveria virar OU.` } },
    'b7:2': { d: 'm', w: {
      A: '[simpBool] A·B vale 1 só com A = B = 1; os outros dois termos também colocam S em 1.',
      B: `[simpBool] A esquece o termo ${ov('A')}·B: com A = 0 e B = 1, S vale 1, e a expressão A vale 0.`,
      C: '[portaTroca] A ⊕ B vale 0 com A = B = 1, e nessa linha S vale 1 (termo A·B).',
      D: `[portaTroca] A NAND, ${ov('A·B')}, vale 1 com A = B = 0, e nessa linha S vale 0.` } },
    'b7:3': { d: 'm', w: {
      A: '[portaTroca] 1 conta só a combinação 111, como numa AND.',
      B: '[portaTroca] 3 conta só as combinações com um único 1 e esquece a 111 (três uns, número ímpar).',
      D: '[portaTroca] 7 é o número de combinações em que uma OR vale 1 (todas, menos 000).',
      E: '[etapa] 8 é o total de combinações (2<sup>3</sup>), e não as que deixam a saída em 1.' } },
    /* ---------- seção 8: diagramas lógicos, flip-flops e contadores ---------- */
    'b8:0': { d: 'd', w: {
      B: `[deMorgan] ${ov('P')}·${ov('Q')}·${ov('R')} inverte P e Q de novo: a negação da NOR cancela a da NAND, e P e Q ficam sem barra.`,
      C: `[lerDiagrama] ${ov('P')} + ${ov('Q')} + ${ov('R')} é a expressão de uma NAND de três entradas, e não a do circuito.`,
      D: `[lerDiagrama] (${ov('P')} + ${ov('Q')})·${ov('R')} esquece de cancelar a dupla negação: a NOR nega a saída da NAND.`,
      E: `[lerDiagrama] P + Q + ${ov('R')} troca o E de P e Q por OU, sem motivo: o E da NAND volta a E depois da negação da NOR.` } },
    'b8:1': { d: 'm', w: {
      A: '[lerDiagrama] Com A = B = 1, a NAND vale 0, e a AND final zera S.',
      B: '[lerDiagrama] Com B = C = 0, a OR vale 0, e a AND final zera S, apesar de a NAND valer 1.',
      D: '[lerDiagrama] Com tudo em 0, a OR vale 0; a NAND vale 1, e a AND final dá 0.',
      E: '[lerDiagrama] Com tudo em 1, a OR vale 1, mas a NAND vale 0 e a AND final dá 0.' } },
    'b8:2': { d: 'm', h: '9.1', conta: '8/2**3', w: {
      B: '[contMod] 2 kHz é a saída do segundo flip-flop (divisão por 4), e não a do terceiro.',
      C: '[contMod] 2,67 kHz divide por 3 (o número de flip-flops), e não por 2<sup>3</sup>.',
      D: '[contMod] 4 kHz é a saída do primeiro flip-flop (divisão por 2).',
      E: '[invertida] 64 kHz multiplica a frequência por 8, em vez de dividir.' } },
    'b8:3': { d: 'm', h: '9.1', w: {
      A: '[contMod] Y2 lê só os dois bits menos significativos (10).',
      B: '[contMod] Y3 lê o código de trás para a frente (011).',
      C: '[contMod] Y5 troca os bits B e C (101).',
      E: '[contMod] Y4 considera só o bit mais significativo (100).' } },
  },
  extra: [
    { id: 'x1', h: '9.2', tag: 'Diagramas lógicos: leitura e tabela-verdade', d: 'm',
      s: 'Num circuito, uma porta XOR com entradas A e B alimenta, junto com C, uma porta NAND, cuja saída é S. Para qual combinação (A, B, C) a saída S vale 0?',
      o: ['(1, 1, 0)', '(1, 1, 1)', '(0, 0, 1)', '(1, 0, 0)', '(1, 0, 1)'], a: 4,
      c: 'S = ' + ov('(A ⊕ B)·C') + '. S vale 0 quando a entrada da NAND é 1·1: A ⊕ B = 1 (entradas diferentes) e C = 1. Só (1, 0, 1) cumpre as duas condições.',
      w: { A: '[lerDiagrama] Com C = 0, a NAND recebe 0 em uma entrada, e a saída S vale 1.',
        B: '[portaTroca] Com A = B = 1, a XOR vale 0, e S vale 1; quem lê a XOR como OR encontra 1 e marca esta.',
        C: '[lerDiagrama] Com A = B = 0, a XOR vale 0, e S vale 1.',
        D: '[lerDiagrama] Com C = 0, S vale 1, apesar de a XOR valer 1.' } },
    { id: 'x2', h: '9.1', tag: 'Diodo, retificação e fonte linear', d: 'm', conta: '(12-5)*0.5',
      s: 'Um regulador linear de 5 V (série 78xx) recebe 12 V na entrada e alimenta uma carga de 0,5 A. A potência dissipada em calor no regulador, desprezando a corrente de repouso, é de',
      o: ['2,5 W', '3,5 W', '6,0 W', '7,0 W', '8,5 W'], a: 1,
      c: 'P = (V<sub>entrada</sub> − V<sub>saída</sub>) · I = (12 − 5) · 0,5 = 3,5 W. 2,5 W é a potência entregue à carga (5 · 0,5); 6,0 W é a potência de entrada (12 · 0,5); 7,0 W é a queda de tensão (7 V) tratada como potência; 8,5 W soma as tensões (12 + 5) em vez de subtrair.',
      w: { A: '[outra] 2,5 W é a potência útil, entregue à carga (5 V · 0,5 A).',
        C: '[outra] 6,0 W é a potência de entrada (12 V · 0,5 A), e não a dissipada no regulador.',
        D: '[unidade] 7,0 W é a queda de tensão (7 V) tratada como potência, sem multiplicar pela corrente.',
        E: '[sinal] 8,5 W soma as tensões (12 + 5) em vez de subtrair.' } },
  ],
};

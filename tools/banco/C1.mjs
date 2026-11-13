/* Revisão das questões da estação C1 (complementos de elétrica), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/complementos-eletrica.html), pela chave "bN:i";
   extra: questões só da aba Questões (nesta estação não há). Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual erro leva a ela. Os tipos de erro novos desta estação estão no fim de tools/banco/erros.mjs.
   As questões de texto (motor de 12 terminais, capacitor de partida, TC, LVDT, Karnaugh, starter) não têm conta. */
export default {
  /* item do edital de cada seção da estação (h de uma questão muda o item dela) */
  secoes: { b1: '2.1', b2: '2.1', b3: '5.5', b4: '7.1', b5: '9.3', b6: '4.1', b7: '9.2', b8: '8.1' },
  q: {
    /* ---------- seção 1: transitório RC e RL ---------- */
    'b1:0': { d: 'm', conta: '12*(1-Math.exp(-1))', w: {
      A: '[regimeTau] 12 V toma 1τ como o fim do transitório, mas em 1τ a tensão está em 63% do valor final.',
      C: '[regimeTau] 6 V toma a metade da fonte; em 1τ a carga chega a 63%, e não a 50%.',
      D: '[rcDescarga] 4,4 V usa a fórmula da descarga (12·e<sup>−1</sup>), mas o capacitor está sendo carregado.',
      E: '[tauCalc] 1,1 V erra uma casa decimal no produto R·C (acha τ = 10 s, e não 1 s) e calcula a tensão em t = 0,1τ: 12 × (1 − e<sup>−0,1</sup>) ≈ 1,1 V.' } },
    'b1:1': { d: 'm', conta: '5*47e3*220e-6', w: {
      A: '[unidade] 0,052 s esquece o prefixo quilo: toma 47 kΩ como 47 Ω.',
      B: '[regimeTau] 10,3 s calcula só 1τ e para aí: o regime só chega em 5τ.',
      D: '[regimeTau] 103,4 s usa 10τ no lugar dos 5τ pedidos.',
      E: '[unidade] 51.700 s esquece o prefixo micro: toma 220 µF como 220 F.' } },
    'b1:2': { d: 'd', h: '2.2', conta: '24/50*(1-Math.exp(-1))', w: {
      A: '[invertida] 0,759 A divide a corrente final por 0,632 em vez de multiplicar.',
      B: '[regimeTau] 0,48 A é a corrente final (24 ÷ 50), que só é atingida no regime, depois de 5τ.',
      C: '[tauCalc] 0,471 A usa o expoente −4, isto é, o tempo em ms sem dividir por τ.',
      E: '[rcDescarga] 0,177 A aplica a forma e<sup>−t/τ</sup> da descarga ao crescimento da corrente.' } },
    'b1:3': { d: 'm', conta: '0.5*2e-6*12**2*1e6', w: {
      B: '[semMeio] 288 µJ esquece o fator ½ da energia (usa C·V²).',
      C: '[capAssoc] 432 µJ usa só o capacitor de 6 µF, como se o outro não contasse.',
      D: '[capAssoc] 648 µJ soma as capacitâncias (9 µF), como se estivessem em paralelo.',
      E: '[capAssoc] 1.296 µJ soma as capacitâncias (9 µF) e ainda esquece o ½.' } },
    /* ---------- seção 2: eletrostática ---------- */
    'b2:0': { d: 'f', conta: '9e9*2e-6*3e-6/0.3**2', w: {
      A: '[unidade] 60 N toma 30 cm como 3 cm (0,03 m).',
      B: '[coulombR] 5,4 N usa r = 10 cm.',
      C: '[coulombR] 2,4 N usa r = 15 cm, isto é, a metade da distância.',
      E: '[coulombR] 0,18 N esquece de elevar a distância ao quadrado (usa r no lugar de r²).' } },
    'b2:1': { d: 'm', conta: '9e9*4e-9/0.6**2', w: {
      A: '[etapa] 36 N/C para em k·Q = 36 e esquece de dividir por r².',
      B: '[campoPot] 60 N/C é o potencial (kQ/r = 60 V), e não o campo: o campo leva r².',
      D: '[coulombR] 166,7 N/C usa r³ no denominador.',
      E: '[unidade] 100.000 N/C toma 4 nC como 4 µC.' } },
    'b2:2': { d: 'm', conta: '500*0.04', w: {
      B: '[unidade] 125 V divide E por 4 (cm) em vez de multiplicar por 0,04 m.',
      C: '[etapa] 500 V responde o próprio valor do campo, sem multiplicar pela distância.',
      D: '[unidade] 2.000 V multiplica por 4 sem converter 4 cm em 0,04 m.',
      E: '[invertida] 12.500 V divide o campo pela distância, em vez de multiplicar.' } },
    'b2:3': { d: 'd', conta: '200*0.5*Math.cos(Math.PI/3)', w: {
      A: '[cosAng] 0 V·m supõe que nenhuma linha de campo atravessa a superfície inclinada; o fluxo só se anula quando a normal faz 90° com o campo, e aqui ela faz 60°.',
      B: '[cosAng] 25 V·m usa cos²60° = 0,25 no lugar de cos 60° = 0,5.',
      D: '[cosAng] 86,6 V·m usa sen 60° (0,866) no lugar de cos 60° (0,5).',
      E: '[cosAng] 100 V·m esquece o cosseno do ângulo (supõe a normal alinhada com o campo).' } },
    /* ---------- seção 3: motor de 12 terminais, monofásico e universal ---------- */
    'b3:0': { d: 'm', w: {
      A: '[fechamento12] triângulo paralelo: as duas metades de cada fase em paralelo, numa fase de 220 V: é o fechamento de 220 V: em 440 V cada metade de bobina receberia o dobro da tensão que suporta.',
      B: '[fechamento12] estrela paralela: as duas metades de cada fase em paralelo, ligadas em estrela: é o fechamento de 380 V: ligada em 440 V a fase receberia 254 V, acima dos 220 V que cada metade suporta.',
      C: '[fechamento12] estrela série, o fechamento de 760 V: os 760 V da placa são só a posição de partida do motor que trabalha em 440 V; em regime, 440 V em estrela série daria só 254 V por fase.',
      E: '[fechamento12] qualquer fechamento, porque o motor é de tensão múltipla: a tensão da rede decide o fechamento: cada tensão da placa tem uma ligação própria.' } },
    'b3:1': { d: 'm', conta: '380/Math.sqrt(3)', w: {
      A: '[linhaFase] 127 V divide por √3 a tensão de 220 V, que não é a da rede (380 V).',
      B: '[fechamento12] 190 V divide 380 por 2, como se as metades de cada fase estivessem em série.',
      D: '[linhaFase] 380 V toma a tensão de linha como a tensão da bobina (vale só no triângulo).',
      E: '[fechamento12] 440 V soma as duas metades (série), mas o fechamento em 380 V tem as metades em paralelo.' } },
    'b3:2': { d: 'f', conta: '120/3', w: {
      B: '[umTerco] 60 A divide por 2, como se a estrela pusesse metade da tensão em cada bobina; o fator da tensão é 1/√3, e a corrente de linha cai a 1/3.',
      C: '[umTerco] 69,3 A divide por √3, o fator da tensão na bobina, e não o da corrente de linha.',
      D: '[raiz3inv] 207,8 A multiplica por √3 em vez de dividir por 3.',
      E: '[invertida] 360 A multiplica por 3 em vez de dividir.' } },
    'b3:3': { d: 'f', h: '5.2', w: {
      A: '[capPartida] corrigir o fator de potência em regime, permanecendo ligado o tempo todo: essa é a função do capacitor permanente; o de partida é desligado depois que o motor acelera.',
      B: '[capPartida] limitar a corrente de partida, como um reator em série com o motor: o capacitor defasa a corrente do auxiliar; quem limita a corrente é a impedância dos enrolamentos.',
      C: '[capPartida] converter a corrente alternada em contínua no enrolamento principal: o capacitor não retifica: ele só defasa a corrente do enrolamento auxiliar.',
      D: '[capPartida] inverter o sentido de giro do motor, trocando a polaridade do enrolamento principal: inverter o giro é trocar as ligações de um dos enrolamentos (auxiliar ou principal); o capacitor só defasa a corrente do auxiliar e não decide o sentido.' } },
    /* ---------- seção 4: TC e TP ---------- */
    'b4:0': { d: 'f', conta: '3.5*400/5', w: {
      A: '[relInv] 0,04 A divide a leitura pela relação em vez de multiplicar.',
      B: '[rtc] 17,5 A multiplica a leitura pela corrente nominal do secundário (5 A).',
      C: '[formula] 83,5 A soma a relação à leitura em vez de multiplicar.',
      E: '[rtc] 350 A usa a relação 100:1 (400 ÷ 4), em vez de 400 ÷ 5 = 80.' } },
    'b4:1': { d: 'm', conta: '5**2*0.3', w: {
      A: '[invertida] 0,012 VA divide a impedância por I² em vez de multiplicar.',
      B: '[semQuad] 1,5 VA faz I·Z (1,5 V) sem elevar a corrente ao quadrado.',
      D: '[etapa] 25 VA calcula só I² = 25 e esquece de multiplicar pela impedância.',
      E: '[formula] 37,5 VA usa I³·Z.' } },
    'b4:2': { d: 'm', w: {
      A: '[tcSec] abrir o circuito do secundário e trocar o instrumento, pois a corrente de 5 A é pequena e não oferece risco: o secundário nunca é aberto com o primário energizado: a tensão induzida no secundário aberto pode chegar a quilovolts.',
      B: '[tcSec] desligar o primário só depois de abrir o secundário, para não danificar o núcleo: inverte a ordem: abrir o secundário com o primário energizado é justamente o que danifica o TC e fere quem o toca.',
      C: '[tcTp] deixar o secundário em aberto, como se faz com o TP, porque o TC nunca pode ter carga: confunde o TC com o TP: o TP é que pode ficar com o secundário aberto, e o TC trabalha com o secundário em carga ou em curto.',
      D: '[tcSec] ligar um fusível em série no secundário, que protege o TC e permite abri-lo: o fusível em série abre o circuito do secundário ao queimar, que é a condição perigosa; o TC não leva fusível no secundário.' } },
    'b4:3': { d: 'm', conta: '20*300', w: {
      B: '[tcFator] 1.500 A toma o 5 (o erro em %) como o fator limite de exatidão.',
      C: '[etapa] 300 A responde a própria corrente nominal primária, sem aplicar o fator limite.',
      D: '[tcFator] 100 A multiplica o fator pela corrente do secundário (5 A).',
      E: '[invertida] 15 A divide a corrente nominal pelo fator, em vez de multiplicar.' } },
    /* ---------- seção 5: sensores e transmissor 4–20 mA ---------- */
    'b5:0': { d: 'm', conta: '(14-4)/16*10', w: {
      A: '[etapa] 14 bar responde a própria corrente (14), sem converter para bar.',
      B: '[etapa] 10 bar para em 14 − 4 = 10 mA e responde esse valor, sem converter para bar.',
      C: '[offsetFaixa] 8,75 bar usa a largura da faixa (16 mA), mas esquece de descontar os 4 mA do início.',
      D: '[zeroVivo] 7 bar divide 14 por 20 sem descontar os 4 mA do zero.' } },
    'b5:1': { d: 'm', conta: '(119.4-100)/(100*0.00385)', w: {
      A: '[outra] 119,4 °C é a própria resistência lida, e não a temperatura.',
      C: '[rtdCoef] 42,2 °C usa a resistência medida no lugar de R<sub>0</sub> no denominador.',
      D: '[etapa] 19,4 °C para em R − R<sub>0</sub> = 19,4 e responde esse valor, sem dividir por α·R<sub>0</sub> = 0,385 Ω/°C.',
      E: '[rtdCoef] 5,04 °C usa α = 0,0385, com uma casa decimal a menos.' } },
    'b5:2': { d: 'f', w: {
      A: '[sensorTipo] extensômetro, cuja resistência varia com a deformação da peça: o extensômetro é uma resistência que muda com o alongamento; não tem núcleo móvel nem enrolamentos acoplados.',
      B: '[sensorTipo] termopar, que gera uma tensão pela diferença de temperatura entre duas junções: o termopar mede temperatura pelo efeito Seebeck, e não deslocamento.',
      C: '[sensorTipo] sensor piezoelétrico, que gera carga elétrica quando o cristal é deformado: o piezoelétrico usa um cristal, sem enrolamentos nem núcleo móvel.',
      D: '[sensorTipo] PT100, cuja resistência de platina cresce com a temperatura: o PT100 mede temperatura por variação de resistência, e não por acoplamento magnético.' } },
    'b5:3': { d: 'm', conta: '350*2*500e-6', w: {
      A: '[semFator] 0,175 Ω esquece o fator GF = 2 da fórmula.',
      C: '[formula] 0,7 Ω conta o dobro da deformação (usa 1.000 µε).',
      D: '[unidade] 350 Ω toma 500 µε como 0,5, em vez de 0,0005.',
      E: '[etapa] 700 Ω multiplica só R·GF e esquece a deformação.' } },
    /* ---------- seção 6: cargas em rede 127/220 V e dois wattímetros ---------- */
    'b6:0': { d: 'f', conta: '3810/127', w: {
      A: '[unidade] 3,81 A toma a potência em kW (3,81) como se fosse a corrente.',
      B: '[etapa] 10 A divide a corrente entre as três fases, mas a carga está ligada numa fase só.',
      C: '[linhaFase] 17,32 A usa 220 V, a tensão entre fases, no lugar dos 127 V em que a carga está ligada.',
      E: '[raiz3Mono] 51,96 A divide por 127/√3, aplicando o √3 a um circuito monofásico.' } },
    'b6:1': { d: 'm', conta: '2*20*Math.cos(Math.PI/3)', w: {
      A: '[neutroNada] 0 A supõe que o neutro nunca conduz, mas isso só vale com as três cargas iguais.',
      C: '[formula] 28,3 A supõe as correntes defasadas de 90°.',
      D: '[raiz3Mono] 34,6 A multiplica por √3, fator da tensão entre fases, e não da soma de correntes.',
      E: '[somaArit] 40 A soma as correntes aritmeticamente, mas elas estão defasadas de 120°.' } },
    'b6:2': { d: 'm', h: '3.1', conta: 'Math.cos(Math.atan(Math.sqrt(3)*(5000-3000)/(5000+3000)))', w: {
      A: '[aron] 0,25 usa (W<sub>1</sub> − W<sub>2</sub>)/(W<sub>1</sub> + W<sub>2</sub>) como se fosse o fator de potência.',
      B: '[aron] 0,433 é tan φ, e não cos φ: falta tirar o cosseno do ângulo.',
      C: '[aron] 0,6 divide a menor leitura pela maior (W<sub>2</sub>/W<sub>1</sub>), que não é o fator de potência.',
      E: '[semRaiz3] 0,97 esquece o √3 em tan φ.' } },
    'b6:3': { d: 'm', h: '3.1', conta: '5000-1000', w: {
      A: '[aron] 1.000 W toma só a leitura negativa, em módulo.',
      C: '[aron] 5.000 W ignora o wattímetro que marcou negativo.',
      D: '[aron] 6.000 W soma os módulos das leituras, ignorando o sinal negativo.',
      E: '[raiz3Total] 6.928 W multiplica por √3 uma potência que já é a total.' } },
    /* ---------- seção 7: mapa de Karnaugh ---------- */
    'b7:0': { d: 'm', w: {
      B: '[karnLeitura] B·D: toma B e D como 1, mas nos cantos eles valem 0 e devem entrar negados.',
      C: '[karnLeitura] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>A</span>·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>C</span>: mantém A e C, que são as variáveis que mudam dentro do grupo, em vez das que ficam fixas.',
      D: '[karnGrupo] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span> + <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span>: soma <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span> e <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span>, o que juntaria grupos maiores, com células que valem 0.',
      E: '[karnLeitura] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span>·D: troca <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span> por D e cobre as linhas 1, 3, 9 e 11, que valem 0.' } },
    'b7:1': { d: 'm', w: {
      A: '[karnGrupo] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>A</span>·C + B·C: deixa a linha 0 (000) de fora: <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>A</span>·C cobre as linhas 1 e 3, e nenhum termo cobre a 0.',
      B: '[karnLeitura] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>A</span>·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span> + A·C: A·C cobre a linha 5 (101), que vale 0 (o grupo certo da linha 7 é B·C).',
      C: '[karnGrupo] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span> + C: forma grupos grandes demais, que incluem linhas que valem 0 (4 e 5).',
      D: '[karnGrupo] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>A</span> + C: cobre também as linhas 2 e 5, que valem 0.' } },
    'b7:2': { d: 'f', w: {
      A: '[karnGrupo] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>A</span>·B: agrupa só as linhas 4 a 7 (grupo de 4) e deixa as linhas 12 a 15 de fora.',
      C: '[karnGrupo] B·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>C</span>: forma só um grupo de 4 (linhas 4, 5, 12 e 13) e deixa de fora as linhas 6, 7, 14 e 15.',
      D: '[karnGrupo] A·B: agrupa só as linhas 12 a 15.',
      E: '[karnGrupo] B·D: cobre só as linhas 5, 7, 13 e 15, que são metade das que valem 1.' } },
    'b7:3': { d: 'd', w: {
      B: '[karnGrupo] B·D + A·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span>: A·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span> cobre também as linhas 12 e 14, que valem 0.',
      C: '[karnGrupo] B·D + <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span>·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span>: <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span>·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span> cobre os quatro cantos, mas as linhas 0 e 2 valem 0.',
      D: '[karnGrupo] B·D + A·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span>: A·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span> cobre também as linhas 9 e 11, que valem 0.',
      E: '[karnGrupo] <span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>A</span>·B·D + A·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>B</span>·<span style="text-decoration:overline"><span style="position:absolute;left:-9999px">não </span>D</span>: trata o centro como se tivesse A = 0 e deixa de fora as linhas 13 e 15.' } },
    /* ---------- seção 8: iluminação, reatores e módulos fotovoltaicos ---------- */
    'b8:0': { d: 'm', conta: '96/(220*0.5)', w: {
      A: '[divFP] 0,218 A multiplica pelo fator de potência, em vez de dividir.',
      B: '[divFP] 0,436 A ignora o fator de potência (I = P/V).',
      D: '[raiz3Mono] 1,512 A aplica √3 a uma carga monofásica.',
      E: '[divFP] 1,745 A usa o quadrado do fator de potência (0,25).' } },
    'b8:1': { d: 'd', conta: '96*(Math.tan(Math.acos(0.5))-Math.tan(Math.acos(0.92)))/(2*Math.PI*60*220**2)*1e6', w: {
      A: '[sem2pi] 43,2 µF usa ω = 60 no lugar de 2π·60.',
      B: '[linhaFase] 20,6 µF usa 127 V no lugar dos 220 V da rede.',
      C: '[alvo] 9,1 µF corrige para fator de potência 1 (tan φ<sub>2</sub> = 0), e não para 0,92.',
      E: '[senCos] 2,2 µF usa a diferença dos cossenos, em vez da das tangentes.' } },
    'b8:2': { d: 'm', h: '2.1', conta: '8*31*8.4', w: {
      A: '[fvPotencia] 2.664 W usa V<sub>oc</sub> × I<sub>sc</sub> (o teto teórico), e não V<sub>mp</sub> × I<sub>mp</sub>.',
      C: '[fvAssoc] 1.042 W é a potência de um string de 4 módulos: esquece de somar o segundo string, em paralelo.',
      D: '[fvPotencia] 333 W é V<sub>oc</sub> × I<sub>sc</sub> de um módulo só, e não a potência do arranjo.',
      E: '[fvAssoc] 260 W é a potência de um módulo só.' } },
    'b8:3': { d: 'f', w: {
      A: '[starterFuncao] limitar a corrente da lâmpada depois de acesa, como um resistor em série: quem limita a corrente é o reator, em série com o tubo; o starter fica aberto depois da partida.',
      B: '[starterFuncao] corrigir o fator de potência do conjunto, em paralelo com a rede: essa é a função do capacitor; o starter fica em paralelo com a lâmpada e só atua na partida.',
      C: '[starterFuncao] converter a tensão da rede em alta frequência para acender a lâmpada: essa é a função do reator eletrônico, que dispensa o starter.',
      D: '[starterFuncao] manter a lâmpada acesa, fechando o circuito durante todo o funcionamento: depois de acesa o starter fica aberto: fechado, ele curto-circuitaria o tubo e a lâmpada apagaria.' } },
  },
  extra: [],
};

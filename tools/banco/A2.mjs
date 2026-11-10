/* Revisão das questões da estação A2 (automação, CLP e controle), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/automacao-clp-controle.html), pela chave "bN:i";
   extra: questões só da aba Questões. Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual erro leva a ela. */
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: '9.3', b2: '9.3', b3: '9.3', b4: '9.4', b5: '9.4', b6: '9.4', b7: '9.5', b8: '9.5' },
  q: {
    /* ---------- seção 1: níveis, redes e supervisão ---------- */
    'b1:0': { d: 'f', w: {
      A: '[redeInd] O ERP é o topo da pirâmide, de gestão da empresa (custos, vendas, planejamento).',
      B: '[redeInd] O MES gerencia a produção (ordens, rastreabilidade), acima da supervisão.',
      C: '[redeInd] O SCADA supervisiona vários controladores, mas não executa a lógica da máquina.',
      E: '[redeInd] O nível de campo é o dos sensores, transmissores e atuadores, abaixo do CLP.' } },
    'b1:1': { d: 'f', w: {
      A: '[exagero] O SCADA não substitui os CLPs: se o computador cair, o controle continua no CLP.',
      C: '[detalhe] A conversão A/D é feita pelo cartão de entrada analógica do CLP.',
      D: '[detalhe] Quem alimenta os transmissores de dois fios é a fonte da malha de 4 a 20 mA.',
      E: '[detalhe] A proteção contra sobrecarga é do relé de sobrecarga, no circuito de força.' } },
    'b1:2': { d: 'm', w: {
      A: '[redeInd] O Profibus DP é serial (RS-485); a Ethernet industrial da família é o PROFINET.',
      C: '[redeInd] O HART sobrepõe o sinal digital ao de 4 a 20 mA; a medição analógica continua.',
      D: '[redeInd] O Modbus TCP é justamente o Modbus sobre Ethernet.',
      E: '[redeInd] A AS-Interface é a rede mais simples, de sensores e atuadores binários, no nível de campo.' } },
    'b1:3': { d: 'f', w: {
      A: '[exagero] A IHM é a interface do operador; o controle continua no CLP.',
      B: '[detalhe] A IHM costuma ser um terminal dedicado, e não um PC de escritório.',
      C: '[oposto] A IHM também envia comandos e escreve parâmetros (tempos, setpoints) no CLP.',
      E: '[redeInd] A IHM é supervisão local, e não um dispositivo de campo.' } },
    /* ---------- seção 2: sensores, entradas e saídas ---------- */
    'b2:0': { d: 'f', w: {
      A: '[detalhe] O sensor indutivo só detecta metais.',
      C: '[detalhe] O fim de curso precisa de contato físico com o objeto.',
      D: '[detalhe] O reed responde ao campo de um ímã, e não a grãos.',
      E: '[detalhe] O encoder mede posição e velocidade de um eixo.' } },
    'b2:1': { d: 'm', w: {
      A: '[pnpNpn] É a ligação do NPN, que leva a saída ao 0 V quando acionado.',
      C: '[detalhe] O sensor de três fios tem alimentação própria; quem se alimenta pela malha é o de dois fios.',
      D: '[exagero] Ligar a saída direto ao +24 V curto-circuitaria o transistor de saída quando acionado.',
      E: '[pnpNpn] PNP e NPN não são intercambiáveis: cada um casa com um tipo de entrada.' } },
    'b2:2': { d: 'm', h: '9.4', w: {
      A: '[pullup] 820 Ω deixa a entrada em ALTO, mas com a chave fechada dissiparia 24²/820 ≈ 0,70 W, acima de 0,5 W.',
      B: '[pullup] 1,0 kΩ dissiparia 24²/1.000 ≈ 0,58 W com a chave fechada, acima de 0,5 W.',
      D: '[pullup] 2,2 kΩ respeita a potência, mas a entrada ficaria com 24 × 8/10,2 ≈ 18,8 V, abaixo dos 20 V do ALTO.',
      E: '[pullup] 3,3 kΩ deixaria a entrada com cerca de 17,0 V, abaixo dos 20 V do ALTO.' } },
    'b2:3': { d: 'm', h: '9.4', w: {
      A: '[saidaClp] Inverteu as duas: o transistor não chaveia 220 V CA, e o relé não aguenta pulsos rápidos.',
      B: '[saidaClp] O triac só chaveia corrente alternada; não comanda os pulsos de 24 Vcc.',
      D: '[saidaClp] A saída a transistor só chaveia CC; não comanda a válvula de 220 V CA.',
      E: '[detalhe] A saída analógica dá um sinal proporcional, não liga e desliga cargas.' } },
    /* ---------- seção 3: sinais analógicos ---------- */
    'b3:0': { d: 'f', conta: '(14-4)/16*8', w: {
      A: '[sinal] 3,0 m mede a fração a partir do topo: (20 − 14)/16 × 8.',
      B: '[zeroVivo] 4,0 m divide 14 − 4 por 20, em vez de 16.',
      D: '[zeroVivo] 5,6 m trata o sinal como 0 a 20 mA: 14/20 × 8.',
      E: '[zeroVivo] 7,0 m divide 14 por 16 sem descontar os 4 mA.' } },
    'b3:1': { d: 'm', conta: '-20+6.5/10*100', w: {
      A: '[offsetFaixa] 32 °C multiplica a fração pelo fim da faixa (0,65 × 80) e só depois desconta 20.',
      C: '[offsetFaixa] 52 °C é 0,65 × 80: usou o fim da faixa no lugar da largura e esqueceu o início.',
      D: '[offsetFaixa] 65 °C esquece o início da faixa (−20 °C).',
      E: '[sinal] 85 °C soma 20 em vez de subtrair.' } },
    'b3:2': { d: 'm', conta: '10/4096*1000', w: {
      B: '[bitsAD] 4,88 mV usa 2<sup>11</sup> níveis, como se o conversor tivesse 11 bits.',
      C: '[bitsAD] 9,77 mV é a resolução de um conversor de 10 bits (1.024 níveis).',
      D: '[bitsAD] 39,1 mV é a resolução de um conversor de 8 bits (256 níveis).',
      E: '[bitsAD] 0,83 V divide a faixa pelo número de bits (10/12), e não pelo número de níveis.' } },
    'b3:3': { d: 'f', w: {
      A: '[exagero] Em ambiente ruidoso, a blindagem continua recomendada também para o sinal de corrente.',
      B: '[detalhe] 20 mA é um sinal de medição; não aciona uma válvula solenoide.',
      D: '[exagero] O CLP continua precisando do conversor A/D, com resolução finita.',
      E: '[detalhe] A faixa de medição é a calibração do transmissor; os 4 mA não a aumentam.' } },
    /* ---------- seção 4: CLP ---------- */
    'b4:0': { d: 'f', w: {
      A: '[varredura] As entradas são lidas antes de executar o programa, e não depois.',
      C: '[varredura] A atualização das saídas vem depois da execução do programa.',
      D: '[varredura] O programa usa a tabela-imagem lida no início do ciclo, e não o terminal a cada instrução.',
      E: '[varredura] O ciclo é contínuo; não é disparado por mudanças de entrada.' } },
    'b4:1': { d: 'f', w: {
      A: '[detalhe] Ladder (LD) é uma das linguagens gráficas da IEC 61131-3.',
      B: '[detalhe] FBD (diagrama de blocos de funções) é linguagem gráfica da norma.',
      C: '[detalhe] ST (texto estruturado) é a linguagem textual de alto nível da norma.',
      D: '[detalhe] SFC (sequenciamento gráfico de funções) é a linguagem de etapas e transições da norma.' } },
    'b4:2': { d: 'm', w: {
      A: '[varredura] O CLP só vê a entrada no início de cada ciclo, e não continuamente.',
      C: '[detalhe] O CTD conta para baixo, mas depende das mesmas leituras da entrada.',
      D: '[oposto] Varredura mais longa aumenta a chance de perder o pulso.',
      E: '[pnpNpn] O tipo de saída do sensor não muda a duração do pulso.' } },
    'b4:3': { d: 'f', w: {
      A: '[detalhe] Converter digital em analógico é papel do conversor D/A, num cartão de saída analógica.',
      B: '[detalhe] O acoplador óptico isola; não eleva a tensão.',
      D: '[exagero] A tensão de campo admitida é a do cartão; o acoplador não dispensa a fonte adequada.',
      E: '[detalhe] O acoplador óptico não guarda estados; isso é papel da memória retentiva.' } },
    /* ---------- seção 5: Ladder ---------- */
    'b5:0': { d: 'm', w: {
      A: '[naNf] Copiou o tipo do botão: com NF no programa, o motor só ligaria com o botão de parada pressionado.',
      C: '[naNf] O contato NF passa quando o bit vale 0, e não 1.',
      D: '[detalhe] A parada é uma condição em série, e não uma bobina de memória.',
      E: '[detalhe] O botão vai à entrada do CLP; não está no circuito da bobina do contator.' } },
    'b5:1': { d: 'f', w: {
      A: '[detalhe] Intertravamento é um contato NF da outra saída em série com a bobina.',
      B: '[detalhe] Temporizar exige um bloco temporizador.',
      D: '[detalhe] Quem impede a partida com o térmico atuado é o contato do relé térmico em série.',
      E: '[detalhe] O sentido de rotação depende de qual contator fecha, e não do selo.' } },
    'b5:2': { d: 'm', w: {
      A: '[detalhe] Um contato em paralelo com a bobina não bloqueia a bobina.',
      C: '[naNf] Com NA, a bobina Q0.1 só ligaria se Q0.0 estivesse ligada: o contrário do intertravamento.',
      D: '[exagero] Bobinas no mesmo degrau ligariam juntas, causando o curto entre fases.',
      E: '[temporizador] O temporizador dá um atraso, e não um bloqueio entre as saídas.' } },
    'b5:3': { d: 'd', w: {
      A: '[varredura] Não há prioridade fixa do set: vale a ordem dos degraus.',
      C: '[varredura] O resultado é o mesmo a cada varredura, sem oscilação.',
      D: '[exagero] Set e reset no mesmo bit não geram falha no CLP.',
      E: '[oposto] O bit setado é desligado pelo reset; é para isso que existe a bobina R.' } },
    /* ---------- seção 6: temporizadores e contadores ---------- */
    'b6:0': { d: 'm', w: {
      A: '[temporizador] Acumulou os tempos, como um temporizador retentivo (RTO); o TON zera quando a entrada cai.',
      B: '[temporizador] Somou os 11 s ligados; o TON precisa dos 8 s seguidos.',
      D: '[temporizador] Ligar na hora e desligar depois de um tempo fixo é o pulso do TP; o TON atrasa o ligamento.',
      E: '[temporizador] Nenhum bloco padrão liga a saída depois que a entrada cai; o TOF liga junto com a entrada e desliga PT depois da queda.' } },
    'b6:1': { d: 'f', w: {
      A: '[temporizador] O TON atrasa o ligamento, e não o desligamento.',
      C: '[temporizador] O TP dá um pulso de duração fixa a cada subida da entrada.',
      D: '[detalhe] O CTU é contador, e não temporizador.',
      E: '[detalhe] O CTD é contador decrescente, e não temporizador.' } },
    'b6:2': { d: 'm', conta: '24/(120/60)', w: {
      A: '[unidade] 24/120 = 0,2 min; 0,2 s é esse número lido como se fossem segundos.',
      B: '[invertida] 5 s é 120/24: inverteu a conta.',
      D: '[detalhe] 24 s supõe uma peça por segundo; a esteira traz 120 por minuto, ou seja, 2 por segundo.',
      E: '[invertida] 2.880 s multiplica 24 por 120.' } },
    'b6:3': { d: 'f', conta: '250*0.01', w: {
      A: '[unidade] 0,25 s usa base de 1 ms.',
      C: '[unidade] 25 s usa base de 100 ms.',
      D: '[unidade] 250 s trata o valor programado como segundos.',
      E: '[unidade] 2.500 s multiplica 250 por 10 sem converter os milissegundos.' } },
    /* ---------- seção 7: controle ---------- */
    'b7:0': { d: 'f', w: {
      A: '[malhaAberta] Ação definida só por tempo é malha aberta.',
      C: '[exagero] A malha fechada sofre perturbações; ela as corrige.',
      D: '[exagero] O controlador de malha fechada precisa de sintonia.',
      E: '[malhaAberta] Ganho excessivo pode desestabilizar uma malha fechada.' } },
    'b7:1': { d: 'f', conta: '60-6/2', w: {
      A: '[formula] 54 °C aplica os 6 °C inteiros abaixo do setpoint.',
      C: '[detalhe] 60 °C ignora a histerese.',
      D: '[oposto] 63 °C é o ponto de desligamento.',
      E: '[sinal] 66 °C soma os 6 °C ao setpoint.' } },
    'b7:2': { d: 'm', w: {
      A: '[acaoPid] Mais ganho proporcional reduz o offset, mas não o zera, e traz a oscilação descrita.',
      C: '[acaoPid] A derivativa não age sobre erro constante.',
      D: '[detalhe] O liga-desliga oscila em torno do setpoint; não elimina a diferença.',
      E: '[exagero] Sem ganho, não há ação de controle.' } },
    'b7:3': { d: 'm', w: {
      A: '[acaoPid] Erro acumulado e eliminação do erro em regime são da ação integral.',
      C: '[acaoPid] Com erro constante, a derivada é zero: a derivativa não age.',
      D: '[acaoPid] A derivativa sozinha não controla: não age sobre erro parado.',
      E: '[acaoPid] A reação proporcional ao erro atual é a ação P.' } },
    /* ---------- seção 8: modelagem ---------- */
    'b8:0': { d: 'd', w: {
      A: '[outra] 1/(RCs + 1) é a tensão no capacitor sobre a da fonte, e não a corrente.',
      B: '[formula] Escreveu a impedância do capacitor como Cs; ela é 1/(Cs).',
      D: '[invertida] (RCs + 1)/(Cs) é a impedância V/I: a razão invertida.',
      E: '[outra] RCs/(RCs + 1) é a tensão no resistor sobre a da fonte.' } },
    'b8:1': { d: 'd', conta: '8*17', w: {
      A: '[outra] 4,1 é √17, a frequência da oscilação em rad/s, e não o ganho.',
      B: '[estabilidade] 8 é só o coeficiente de s²; o limite é o produto a·b.',
      C: '[estabilidade] 17 é só o coeficiente de s; o limite é o produto a·b.',
      D: '[estabilidade] 25 soma os coeficientes em vez de multiplicá-los.' } },
    'b8:2': { d: 'm', w: {
      B: '[estabilidade] O polo em +2 está no semiplano direito: a resposta cresce sem limite.',
      C: '[estabilidade] 1 ± j1 tem parte real positiva: oscilação crescente.',
      D: '[estabilidade] ± j4 está sobre o eixo imaginário: oscilação mantida, o limite, e não estabilidade.',
      E: '[estabilidade] O polo em +0,5 está no semiplano direito.' } },
    'b8:3': { d: 'd', conta: '1/(1+4*2)*100', w: {
      A: '[acaoPid] 0% supõe que a ação proporcional zera o erro; só a integral faz isso.',
      C: '[formula] 12,5% é 1/L, sem o 1 do denominador: o erro é 1/(1 + L).',
      D: '[semFator] 20% é 1/(1 + K<sub>p</sub>): esqueceu o ganho da planta.',
      E: '[outra] 88,9% é o valor final da saída, e não o erro.' } },
  },
  extra: [
    { id: 'x1', h: '9.3', tag: 'Sinais analógicos: 4 a 20 mA, 0 a 10 V e conversão A/D', d: 'm', conta: '4+16*175/250',
      s: 'Um transmissor de temperatura está calibrado de 0 a 250 °C, com saída de 4 a 20 mA. Quando o processo está a 175 °C, a corrente na malha é de',
      o: ['8,8 mA', '11,2 mA', '14,0 mA', '15,2 mA', '18,0 mA'], a: 3,
      c: 'I = 4 + 16 × 175/250 = 4 + 16 × 0,7 = 15,2 mA.',
      w: { A: '[sinal] 8,8 mA mede a partir do topo: 20 − 16 × 0,7.',
        B: '[zeroVivo] 11,2 mA é 16 × 0,7, sem somar os 4 mA do início da faixa.',
        C: '[zeroVivo] 14,0 mA trata o sinal como 0 a 20 mA: 20 × 0,7.',
        E: '[zeroVivo] 18,0 mA soma 4 mA a 20 × 0,7, usando 20 mA como largura do sinal, e não 16.' } },
    { id: 'x2', h: '9.4', tag: 'Ladder: contatos, selo e intertravamento', d: 'm',
      s: 'Um comando de partida direta foi passado do painel de relés para um CLP. O contato NF do relé de sobrecarga (F7) foi ligado à entrada I0.2. No degrau da bobina do motor, o contato de I0.2 deve ser',
      o: ['NF em série com a bobina, porque o contato do relé no campo é NF', 'NA em série com a bobina, porque em condição normal a entrada vale 1 e, quando o relé atua, vai a 0', 'NA em paralelo com o botão de liga, como um selo', 'NF em paralelo com o selo', 'dispensado, porque o relé de sobrecarga atua direto no motor'], a: 1,
      c: 'Em condição normal o contato NF de F7 conduz e a entrada vale 1; o contato NA no programa passa. Quando o relé atua, a entrada vai a 0 e o NA abre, desligando a saída. É a mesma regra do botão de parada NF.',
      w: { A: '[naNf] Copiou o tipo do contato do campo: com NF no programa, o motor só ligaria com o relé atuado.',
        C: '[detalhe] Em paralelo com o botão de liga, o térmico ligaria o motor em vez de protegê-lo.',
        D: '[detalhe] Um contato em paralelo com o selo não interrompe a bobina.',
        E: '[detalhe] O relé de sobrecarga não interrompe o motor sozinho: abre o seu contato no comando, que aqui é lido pelo CLP.' } },
  ],
};

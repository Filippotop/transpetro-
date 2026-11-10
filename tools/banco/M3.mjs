/* Revisão das questões da estação M3 (máquinas rotativas, proteção e partidas), escrita para o app: não vem do banco do
   estudante. q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/maquinas-rotativas-protecao-partidas.html),
   pela chave "bN:i"; extra: questões só da aba Questões. Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual erro leva a ela. */
const R3 = 'Math.sqrt(3)';
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: '5.2', b2: '5.5', b3: '5.4', b4: '5.5', b5: '5.6', b6: '5.7' },
  q: {
    /* ---------- seção 1: princípio, perdas e placa ---------- */
    'b1:0': { d: 'f', conta: `15000/(${R3}*380*0.9*0.84)`, w: {
      A: '[tres] 17,4 A usa 3 no lugar de √3 no denominador.',
      B: '[divFP] 25,3 A esquece o fator de potência: P = √3·V·I·η·cos φ.',
      C: '[semRend] 27,1 A esquece o rendimento: trata os 15 kW do eixo como potência absorvida da rede.',
      E: '[raiz3Mono] 52,2 A esquece o √3, como se o motor fosse monofásico.' } },
    'b1:1': { d: 'f', w: {
      A: '[detalhe] A potência absorvida é maior que a de placa: P<sub>a</sub> = P<sub>u</sub>/η.',
      C: '[aparente] A potência aparente, em kVA, não é a de placa do motor; a placa dá a potência mecânica no eixo.',
      D: '[detalhe] Na partida, a placa informa a relação I<sub>p</sub>/I<sub>n</sub>, e não uma potência.',
      E: '[outra] As perdas são a diferença entre a potência absorvida e a útil, não a potência de placa.' } },
    'b1:2': { d: 'm', conta: '11000/(2*Math.PI*1750/60)', w: {
      A: '[rpmRad] 6,3 N·m divide a potência em W pela rotação em rpm, sem converter para rad/s.',
      B: '[sincInd] 58,4 N·m usa a rotação síncrona (1.800 rpm) no lugar da rotação real do eixo.',
      D: '[cvKw] 81,6 N·m põe a potência em cv (14,9 cv) na fórmula que pede kW.',
      E: '[sem2pi] 377 N·m converte rpm em rotações por segundo, mas esquece o 2π.' } },
    'b1:3': { d: 'f', conta: '75*0.736/0.92', w: {
      A: '[invertida] 50,8 kW multiplica pelo rendimento em vez de dividir.',
      B: '[semRend] 55,2 kW é a potência útil, no eixo; a absorvida inclui as perdas.',
      D: '[cvKw] 75,0 kW trata cv como se fosse kW.',
      E: '[cvKw] 81,5 kW divide 75 por 0,92 sem converter cv em kW.' } },
    'b1:4': { d: 'f', w: {
      A: '[valorNorma] 105 °C é a classe A.', B: '[valorNorma] 120 °C é a classe E.',
      C: '[valorNorma] 130 °C é a classe B.', D: '[valorNorma] 155 °C é a classe F.' } },
    /* ---------- seção 2: motor de indução ---------- */
    'b2:0': { d: 'f', conta: '(900-873)/900*100', w: {
      B: '[formula] 3,1% divide a diferença pela rotação do rotor (27/873), e não pela síncrona.',
      C: '[unidade] 27% é a diferença em rpm escrita como porcentagem.',
      D: '[polos] 51,5% põe o número de pares de polos (4) na fórmula 120·f/p, que pede o número de polos (n<sub>s</sub> = 1.800 rpm).',
      E: '[outra] 97% é a razão n/n<sub>s</sub>, e não o escorregamento.' } },
    'b2:1': { d: 'm', conta: '(1800-1746)/1800*60', w: {
      A: '[etapa] 0,03 é o escorregamento: faltou multiplicar pela frequência da rede.',
      C: '[outra] 29,1 Hz é a rotação mecânica em rotações por segundo (1.746/60).',
      D: '[formula] 58,2 Hz é (1 − s)·f; a frequência do rotor é s·f.',
      E: '[detalhe] 60 Hz é a frequência do rotor parado, na partida (s = 1).' } },
    'b2:2': { d: 'f', w: {
      A: '[detalhe] A frequência da rede fixa a velocidade do campo, não a do rotor.',
      B: '[exagero] O atrito existe, mas a vazio o motor chega bem perto da síncrona; não é ele que impede a velocidade síncrona.',
      C: '[oposto] Não ter ligação à rede é justamente o que faz a gaiola depender da tensão induzida pelo movimento relativo.',
      D: '[detalhe] As perdas no ferro não explicam o escorregamento.' } },
    'b2:3': { d: 'm', w: {
      A: '[sincInd] Com 2 polos (3.600 rpm), o escorregamento seria de 68%: absurdo em carga nominal.',
      B: '[sincInd] Com 4 polos (1.800 rpm), o escorregamento seria de 35%: absurdo em carga nominal.',
      D: '[sincInd] Com 8 polos (900 rpm), o rotor giraria acima do campo, e o motor de indução não funciona assim.',
      E: '[sincInd] Com 12 polos (600 rpm), o rotor giraria muito acima do campo.' } },
    'b2:4': { d: 'f', w: {
      A: '[detalhe] Mudar a ligação Y/Δ muda a tensão em cada bobina, não o sentido de giro.',
      B: '[detalhe] Reduzir a tensão só reduz o conjugado; o sentido continua o mesmo.',
      C: '[sinal] Rodar as três fases (L2, L3, L1) mantém a sequência e, portanto, o sentido.',
      E: '[detalhe] O condutor de proteção não leva corrente em serviço normal e não interfere no sentido de giro.' } },
    /* ---------- seção 3: máquinas síncronas ---------- */
    'b3:0': { d: 'f', conta: '120*60/6', w: {
      A: '[formula] 360 rpm multiplica polos por frequência (6 × 60).',
      B: '[polos] 600 rpm usa 6 como número de pares de polos.',
      C: '[sincInd] 1.164 rpm desconta um escorregamento de 3%, que só existe no motor de indução.',
      E: '[polos] 3.600 rpm é a velocidade de uma máquina de 2 polos.' } },
    'b3:1': { d: 'm', conta: `300000/(${R3}*480)/${R3}`, w: {
      A: '[tres] 120,3 A divide a corrente de linha por 3, e não por √3.',
      B: '[divFP] 166,7 A usa a potência ativa com FP 0,8; a corrente nominal vem dos kVA.',
      D: '[faseLinhaI] 360,8 A é a corrente de linha, nos cabos, e não a de cada enrolamento em Δ.',
      E: '[raiz3inv] 625,0 A divide os kVA só pela tensão: é o mesmo que multiplicar a corrente de linha por √3.' } },
    'b3:2': { d: 'm', w: {
      A: '[oposto] Quem absorve reativo é o motor subexcitado.',
      C: '[detalhe] A velocidade do motor síncrono depende só da frequência e dos polos, não da excitação.',
      D: '[sincInd] O escorregamento só aparece na partida assíncrona, pelo enrolamento amortecedor.',
      E: '[detalhe] O FP unitário corresponde a uma excitação específica, o fundo da curva V; sobre-excitado, o FP é capacitivo.' } },
    'b3:3': { d: 'f', w: {
      A: '[detalhe] Tensões iguais são condição do paralelismo.', B: '[detalhe] Frequências iguais são condição do paralelismo.',
      C: '[detalhe] A mesma sequência de fases é condição do paralelismo.', D: '[detalhe] O mesmo ângulo de fase no fechamento é condição do paralelismo.' } },
    'b3:4': { d: 'm', w: {
      B: '[detalhe] A excitação do rotor é em corrente contínua, não em alternada.',
      C: '[detalhe] Mudar as ligações não cria conjugado de partida.',
      D: '[oposto] Corrente contínua no estator não cria campo girante.',
      E: '[exagero] Inverter fases a cada meio ciclo não tem sentido físico nem cria conjugado médio.' } },
    /* ---------- seção 4: máquinas CC ---------- */
    'b4:0': { d: 'd', conta: '(238*60-600)/1000', w: {
      A: '[formula] 13,2 kW desconta de novo a perda no campo (500 W), que já ficou fora de E·I<sub>a</sub>.',
      C: '[perdaRot] 14,3 kW esquece as perdas rotacionais.',
      D: '[campoShunt] 14,9 kW desconta só as perdas rotacionais da potência de entrada, sem tirar as perdas no cobre.',
      E: '[outra] 15,5 kW é a potência de entrada, V·I<sub>L</sub>.' } },
    'b4:1': { d: 'm', conta: '220/50', w: {
      A: '[detalhe] 0,4 Ω é só a da armadura: deixaria passar 550 A.',
      B: '[outra] 4,0 Ω é a resistência externa do reostato; o enunciado pede a total.',
      D: '[formula] 4,8 Ω soma a da armadura à total, contando-a duas vezes.',
      E: '[outra] 5,1 Ω usa a corrente nominal (40 A) no lugar do limite de 50 A e ainda desconta R<sub>a</sub>.' } },
    'b4:2': { d: 'f', w: {
      A: '[oposto] É o contrário: o motor série trabalha sempre com carga.',
      B: '[detalhe] Campo por fonte separada é a excitação independente, outro tipo de motor.',
      C: '[detalhe] No motor série, a corrente de campo é a própria corrente de armadura: não há ajuste independente.',
      E: '[partidaMetodo] Estrela-triângulo é partida de motor trifásico de corrente alternada.' } },
    'b4:3': { d: 'm', w: {
      A: '[oposto] Aumentar a corrente de campo aumenta o fluxo e reduz a rotação.',
      B: '[oposto] Reduzir a tensão de armadura reduz a rotação; ela é usada abaixo da velocidade base.',
      C: '[oposto] Resistência em série com a armadura também reduz a velocidade (e desperdiça energia).',
      D: '[detalhe] Inverter a armadura inverte o sentido de giro, não aumenta a rotação.' } },
    'b4:4': { d: 'f', w: {
      B: '[sinal] Invertendo armadura e campo ao mesmo tempo, o sinal de Φ·I<sub>a</sub> não muda, e o sentido também não.',
      C: '[detalhe] Trocar duas fases vale para motores trifásicos de corrente alternada.',
      D: '[detalhe] Girar as escovas prejudica a comutação e não é forma de inverter o sentido.',
      E: '[detalhe] Mudar o tipo de excitação muda o comportamento do motor, não o sentido.' } },
    /* ---------- seção 5: proteção de baixa tensão ---------- */
    'b5:0': { d: 'f', w: {
      A: '[funcaoDisp] Curto-circuito é com o fusível ou o disjuntor a montante; o relé não tem capacidade de interrupção para isso.',
      C: '[funcaoDisp] Choque por contato indireto é com o DR (e o seccionamento automático).',
      D: '[funcaoDisp] Sobretensões atmosféricas são com o DPS.',
      E: '[funcaoDisp] Fuga à terra de 30 mA é com o DR.' } },
    'b5:1': { d: 'f', w: {
      A: '[valorNorma] AC-1 é para cargas resistivas (pouco indutivas).',
      B: '[valorNorma] AC-2 é para motores de anéis (rotor bobinado).',
      C: '[valorNorma] AC-15 é para cargas eletromagnéticas em circuitos de comando, como bobinas de contatores (categoria da IEC 60947-5-1).',
      E: '[valorNorma] DC-1 é para cargas resistivas em corrente contínua.' } },
    'b5:2': { d: 'm', conta: '45/3', w: {
      B: '[umTerco] 26 A (0,58 × 45) é a corrente de K1, de K2 e do relé, no ramo das bobinas.',
      C: '[detalhe] 45 A é a corrente de linha nominal, com o motor em triângulo.',
      D: '[raiz3inv] 78 A multiplica a nominal por √3 em vez de dividir.',
      E: '[invertida] 135 A multiplica por 3 em vez de dividir.' } },
    'b5:3': { d: 'f', w: {
      A: '[funcaoDisp] Sobrecargas são com o disparador térmico (bimetálico), de tempo inverso.',
      B: '[funcaoDisp] Subtensão pede bobina de subtensão ou relé 27.',
      D: '[funcaoDisp] Falta de fase é com o relé térmico ou o relé de falta de fase.',
      E: '[funcaoDisp] Fuga à terra é com o DR.' } },
    'b5:4': { d: 'm', w: {
      A: '[detalhe] O fusível que atuou sempre é trocado.',
      B: '[oposto] Essa é a coordenação do tipo 1.',
      C: '[detalhe] Coordenação entre fusível, contator e relé não é seletividade com o disjuntor a montante.',
      D: '[exagero] Depois do curto, o circuito do motor fica desligado até a troca do fusível.' } },
    /* ---------- seção 6: partidas ---------- */
    'b6:0': { d: 'm', conta: `7*19000/(${R3}*380)/3`, w: {
      A: '[umTerco] 9,6 A divide a corrente nominal por 3, e não a de partida.',
      B: '[etapa] 28,9 A é a corrente nominal.',
      D: '[umTerco] 116,7 A divide a partida direta por √3 em vez de 3.',
      E: '[etapa] 202,1 A é a corrente de partida direta, sem a redução da estrela-triângulo.' } },
    'b6:1': { d: 'm', conta: '0.8**2*300', w: {
      A: '[partidaMetodo] 100 A é a redução a 1/3 da estrela-triângulo.',
      C: '[tapQuad] 240 A (0,8 × 300) é a corrente no motor, e não na linha.',
      D: '[etapa] 300 A é a partida direta.',
      E: '[invertida] 375 A divide por 0,8 em vez de multiplicar.' } },
    'b6:2': { d: 'm', w: {
      A: '[detalhe] A redução a 1/3 vale quando a rede tem a tensão de triângulo do motor; aqui não tem.',
      B: '[umTerco] A redução nunca é a 1/√3, e a partida não é aplicável nesta rede.',
      C: '[oposto] Em estrela, o conjugado é menor (1/3), não maior.',
      D: '[partidaMetodo] Compensadora é outro método de partida, não um requisito da estrela-triângulo.' } },
    'b6:3': { d: 'm', w: {
      B: '[oposto] A rotação varia com a frequência: é para isso que se usa o inversor.',
      C: '[detalhe] A relação V/f não elimina harmônicos.',
      D: '[exagero] O circuito continua precisando de proteção contra curto-circuito.',
      E: '[exagero] Como motor, a máquina de indução não passa da velocidade síncrona.' } },
    'b6:4': { d: 'f', w: {
      A: '[partidaMetodo] Quem varia a frequência é o inversor.',
      B: '[partidaMetodo] Autotransformador com taps é a chave compensadora.',
      C: '[partidaMetodo] A mudança de ligação Y/Δ é a chave estrela-triângulo.',
      E: '[detalhe] O escorregamento nominal é do motor e não muda com o método de partida.' } },
  },
  extra: [
    { id: 'x1', h: '5.7', tag: 'Partida estrela-triângulo', d: 'm', conta: `45/${R3}`,
      s: 'Um motor de indução de 220/380 V, corrente nominal de 45 A em 220 V, parte com chave estrela-triângulo numa rede de 220 V. O relé de sobrecarga está instalado no ramo das bobinas, depois do contator principal. A corrente de ajuste do relé deve ser de, aproximadamente,',
      o: ['15,0 A', '26,0 A', '45,0 A', '51,8 A', '77,9 A'], a: 1,
      c: 'No ramo das bobinas, com o motor em triângulo, passa a corrente de fase: 45/√3 ≈ 26,0 A (0,58 × I<sub>n</sub>). O relé se ajusta na corrente que passa por ele.',
      w: { A: '[umTerco] 15,0 A (I<sub>n</sub>/3) é a corrente do contator de estrela, K3, só na partida.',
        C: '[detalhe] 45,0 A seria o ajuste com o relé na linha, antes da divisão entre as bobinas.',
        D: '[exagero] 51,8 A aplica uma margem de 1,15 à corrente de linha; o ajuste é a corrente que passa pelo relé.',
        E: '[raiz3inv] 77,9 A multiplica por √3 em vez de dividir.' } },
    { id: 'x2', h: '5.5', tag: 'Potência no rotor', d: 'm', conta: '0.04*15000',
      s: 'Um motor de indução trifásico recebe 15 kW através do entreferro e opera com escorregamento de 4%. As perdas no cobre do rotor são de',
      o: ['60 W', '600 W', '625 W', '14.400 W', '15.600 W'], a: 1,
      c: 'P<sub>Cu2</sub> = s·P<sub>g</sub> = 0,04 × 15.000 = 600 W; os outros 14.400 W viram potência mecânica.',
      w: { A: '[unidade] 60 W usa 0,4% em vez de 4%.',
        C: '[formula] 625 W = s/(1 − s) × 15.000: aplicou a relação P<sub>Cu2</sub> = s/(1 − s)·P<sub>mec</sub>, que vale para a potência mecânica, à potência do entreferro.',
        D: '[outra] 14.400 W é a potência mecânica desenvolvida, (1 − s)·P<sub>g</sub>.',
        E: '[sinal] 15.600 W soma a perda em vez de subtraí-la.' } },
    { id: 'x3', h: '5.4', tag: 'Gerador síncrono', d: 'f', conta: '120*60/180',
      s: 'Numa pequena central hidrelétrica, a turbina gira a 180 rpm e aciona diretamente um gerador síncrono que alimenta uma rede de 60 Hz. O número de polos do gerador é',
      o: ['20', '33', '40', '60', '90'], a: 2,
      c: 'p = 120·f/n = 120 × 60/180 = 40 polos (20 pares). Rotação baixa pede muitos polos: é o rotor de polos salientes.',
      w: { A: '[polos] 20 é o número de pares de polos.',
        B: '[freq] 33 usa 50 Hz (120 × 50/180 ≈ 33), e a rede é de 60 Hz; além disso, o número de polos tem de ser par.',
        D: '[outra] 60 é a frequência, e não o número de polos.',
        E: '[invertida] 90 = n·f/120: inverteu a fórmula.' } },
    { id: 'x4', h: '5.7', tag: 'Partida estrela-triângulo', d: 'd',
      s: 'Um motor de indução tem conjugado de partida igual a 2,4 vezes o nominal com tensão plena. Ele aciona uma carga que exige, na partida, um conjugado igual ao nominal do motor. Sobre a partida estrela-triângulo desse conjunto, verifica-se que',
      o: ['o motor parte normalmente, porque 2,4 vezes o nominal supera a carga', 'o motor parte, porque em estrela o conjugado cai só a 1/√3, cerca de 1,4 vez o nominal', 'o motor não parte em estrela, porque o conjugado cai a 0,8 vez o nominal, abaixo do exigido pela carga', 'o motor parte com o dobro do conjugado, porque a corrente em estrela é menor', 'a partida é indiferente, porque o conjugado não depende da tensão'], a: 2,
      c: 'Em estrela, o conjugado cai a 1/3: 2,4/3 = 0,8·C<sub>n</sub>, menor que o 1,0·C<sub>n</sub> da carga. O motor não acelera: seria preciso partir com outro método (compensadora num tap alto, inversor) ou aliviar a carga.',
      w: { A: '[detalhe] 2,4·C<sub>n</sub> é o conjugado com tensão plena; em estrela ele cai a 1/3.',
        B: '[umTerco] O conjugado cai a 1/3 (o quadrado de 1/√3), e não a 1/√3.',
        D: '[oposto] Corrente menor vem junto com conjugado menor, não maior.',
        E: '[oposto] O conjugado é proporcional ao quadrado da tensão na bobina.' } },
  ],
};

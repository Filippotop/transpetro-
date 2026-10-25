/* Revisão do banco, tema T5 (instalações e NBR 5410) → I1.
   Formato: ver o comentário do topo de tools/banco.mjs. Cada alternativa errada diz qual erro leva a ela. */
const ESQ = ['TN-S', 'TN-C', 'TN-C-S', 'TT', 'IT'];
/* Rótulos da figura que diriam a resposta (a questão pede para reconhecer o esquema pelo desenho dos condutores). */
const ESQ_TIRA = ['N e PE no mesmo condutor', 'separados daqui em diante', 'eletrodo próprio', 'isolada ou por Z'];
export default {
  /* ---------- seção 1: princípios e conceitos ---------- */
  'a:T5:b1:0': { d: 'f', h: '10.1', w: {
    A: '[valorNorma] 220 V é só uma tensão de uso comum; o limite da baixa tensão na NBR 5410 é 1.000 V CA.',
    B: '[valorNorma] 380 V e 600 V não são os limites da norma: são 1.000 V CA e 1.500 V CC.',
    D: '[valorNorma] 13,8 kV é média tensão, coberta pela NBR 14039.',
    E: '[valorNorma] 36,2 kV é o limite superior da NBR 14039 (média tensão), não da NBR 5410.' } },
  'a:T5:b1:1': { d: 'f', w: {
    A: '[detalhe] Parte viva é o condutor energizado em serviço normal; a carcaça é massa, energizada só por causa da falha.',
    C: '[detalhe] Tocar o neutro seria contato direto; aqui a pessoa tocou a carcaça.',
    D: '[detalhe] Em funcionamento normal o condutor de proteção não tem tensão; o risco vem da falha de isolamento.',
    E: '[oposto] A massa energizada por falha é justamente o risco do contato indireto.' } },
  'a:T5:b1:2': { d: 'm', h: '10.1', w: {
    B: '[funcaoDisp] Troca o disjuntor e o DR: o DR não vê sobrecarga nem curto entre fase e neutro.',
    C: '[funcaoDisp] Troca o DPS e o disjuntor: o disjuntor não limita surtos, e o DPS não atua em sobrecorrentes.',
    D: '[funcaoDisp] Põe o DR contra sobretensões, que é função do DPS.',
    E: '[funcaoDisp] Põe o DR contra sobrecorrentes e o DPS contra choques; as funções deles são outras.' } },
  'a:T5:b1:3': { d: 'f', w: {
    A: '[detalhe] O circuito de distribuição alimenta quadros, não pontos de utilização.',
    C: '[detalhe] Alimentador principal leva energia da entrada ao quadro geral.',
    D: '[detalhe] A entrada de serviço liga a rede da distribuidora à medição.',
    E: '[detalhe] O serviço da concessionária é a rede externa, antes do ponto de entrega.' } },
  'a:T5:b1:4': { d: 'm', w: {
    A: '[oposto] O PE não conduz corrente em serviço normal; conduz na falta.',
    C: '[oposto] A seção do PE é tabelada pela norma justamente para suportar a corrente de falta.',
    D: '[esquemaTerra] Ligar o PE ao neutro depois do DR desvia parte da corrente de retorno por fora do toróide e provoca desarmes; é proibido.',
    E: '[valorNorma] O PE tem cor própria: verde-amarelo (ou verde).' } },
  /* ---------- seção 2: previsão de cargas e circuitos ---------- */
  'a:T5:b2:0': { d: 'f', conta: '100+60*Math.floor((4*4.5-6)/4)', w: {
    A: '[regra6] 160 VA = 100 + 60: contou só um bloco de 4 m².',
    B: '[regra6] 220 VA = 100 + 2 × 60: contou dois blocos de 4 m², mas os 12 m² restantes têm três.',
    D: '[regra6] 300 VA = 100 VA a cada 6 m² (18/6 × 100): aplicou os 100 VA à área inteira.',
    E: '[regra6] 340 VA = 100 + 4 × 60: contou um bloco a mais; 12 m² têm exatamente três blocos de 4 m².' } },
  'a:T5:b2:1': { d: 'f', conta: 'Math.ceil(18/5)', w: {
    A: '[semFator] 2 pontos: somou só dois lados (5 + 4 = 9 m), e não o perímetro inteiro (18 m).',
    B: '[arredBaixo] 3 pontos: arredondou 3,6 para baixo; a fração conta como mais um ponto.',
    D: '[comoSala] 5 pontos: usou o critério de cozinha (1 a cada 3,5 m) e ainda arredondou para baixo.',
    E: '[comoSala] 6 pontos: usou o critério de cozinha (1 a cada 3,5 m), que não vale para salas.' } },
  'a:T5:b2:2': { d: 'm', conta: '3*600+100', w: { /* distrator 1.300 → 1.400 VA trocado na estação (BQ-1) */
    A: '[comoSala] 400 VA = 4 × 100: usou os 100 VA por ponto das salas; na cozinha os três primeiros pontos têm 600 VA.',
    B: '[semFator] 1.400 VA = 2 × 600 + 2 × 100: deu 600 VA a só dois pontos; na cozinha são até três pontos de 600 VA.',
    D: '[pontosTug] 2.000 VA = 3 × 600 + 2 × 100: contou cinco pontos; 13/3,5 = 3,7 dá quatro.',
    E: '[seiscentos] 2.400 VA = 4 × 600: deu 600 VA aos quatro pontos; só os três primeiros têm 600 VA.' } },
  'a:T5:b2:3': { d: 'f', w: {
    A: '[valorNorma] Equipamento com corrente nominal acima de 10 A (aqui, 11,4 A) exige circuito independente.',
    C: '[detalhe] O circuito de iluminação não serve para o ar-condicionado, que precisa de circuito próprio.',
    D: '[detalhe] Tomadas de cozinha têm circuito exclusivo, e o ar-condicionado precisa do seu.',
    E: '[detalhe] Extensão não é solução de projeto; o equipamento de mais de 10 A tem circuito próprio.' } },
  'a:T5:b2:4': { d: 'm', w: {
    A: '[detalhe] As tomadas de cozinha exigem circuito exclusivo, com qualquer corrente.',
    B: '[exagero] Não é preciso um circuito por tomada; várias TUG podem ficar no mesmo circuito.',
    D: '[exagero] A norma pede que iluminação e tomadas sejam distribuídas em circuitos, não concentradas num só.',
    E: '[oposto] Lavanderias estão entre os locais com circuito exclusivo de tomadas.' } },
  /* ---------- seção 3: condutores, proteção e queda de tensão ---------- */
  'a:T5:b3:0': { d: 'f', w: {
    A: '[valorNorma] 0,5 mm² é para sinalização e controle; iluminação pede 1,5 mm².',
    B: '[valorNorma] 1,0 mm² não é o mínimo de nenhum desses circuitos.',
    D: '[valorNorma] 2,5 mm² e 4 mm² estão acima dos mínimos; iluminação é 1,5 mm² e força, 2,5 mm².',
    E: '[valorNorma] Força tem mínimo de 2,5 mm², não 4 mm².' } },
  'a:T5:b3:1': { d: 'f', w: {
    A: '[abaixoIB] 16 A é menor que a corrente de projeto (18 A): desarmaria em serviço normal.',
    C: '[acimaIz] 25 A é maior que os 24 A do condutor: não protege o cabo.',
    D: '[acimaIz] 32 A é maior que os 24 A do condutor: não protege o cabo.',
    E: '[acimaIz] 40 A é maior que os 24 A do condutor: não protege o cabo.' } },
  'a:T5:b3:2': { d: 'f', conta: '24*0.7', w: {
    A: '[formula] 8,4 A = 16,8/2: dividiu ainda pelos dois condutores carregados; o fator de agrupamento já é o único ajuste.',
    C: '[formula] 21 A = 24 − 3: descontou 1 A por circuito, em vez de aplicar o fator de 0,70.',
    D: '[semFator] 24 A é a capacidade sem agrupamento: esqueceu o fator de 0,70.',
    E: '[invertida] 34,3 A = 24/0,70: dividiu pelo fator, o que aumentaria a capacidade.' } },
  'a:T5:b3:3': { d: 'm', conta: '0.04*127/(20*20)*1000', w: { /* distratores e gabarito (B → C) trocados na estação (BQ-1) */
    A: '[idaVolta] 6,4 m divide ainda por 2 para ida e volta, mas a queda unitária em V/(A·km) já considera os dois condutores.',
    B: '[percVolt] 10 m usa 4 V como queda máxima: tratou os 4% como volts (4% de 127 V são 5,08 V).',
    D: '[outraTensao] 22 m usa 4% de 220 V; o equipamento é de 127 V.',
    E: '[semFator] 254 m = 5,08/20 km: esqueceu de multiplicar a queda unitária pela corrente de 20 A.' } },
  'a:T5:b3:4': { d: 'm', w: {
    A: '[ordem] Inverteu os papéis: 7% é o limite total a partir do transformador próprio, e 4% é o dos circuitos terminais.',
    C: '[valorNorma] 5% é o limite do fornecimento em baixa tensão pela distribuidora, contado do ponto de entrega; não é o caso de quem tem transformador próprio.',
    D: '[valorNorma] 10% não é limite da NBR 5410.',
    E: '[valorNorma] Esquece o limite próprio dos circuitos terminais, que em nenhum caso passa de 4%.' } },
  'a:T5:b3:5': { d: 'm', h: '5.6', w: {
    A: '[abaixoIB] A curva B pode disparar no magnético a partir de 3 × I<sub>n</sub>: desarmaria nas partidas, com 4 × I<sub>n</sub>.',
    C: '[exagero] A curva D aguenta a partida, mas só garante o disparo instantâneo com 20 × I<sub>n</sub>, corrente que um curto no fim do circuito pode não atingir; é para partidas mais severas.',
    D: '[oposto] Ser mais sensível é justamente o problema: a curva B desarmaria na partida do motor.',
    E: '[detalhe] A curva define a faixa do disparo magnético (curto-circuito), não a da sobrecarga.' } },
  /* ---------- seção 4: dispositivos de proteção ---------- */
  'a:T5:b4:0': { d: 'f', h: '5.6', w: {
    A: '[funcaoDisp] Sobrecorrente no condutor é com o disjuntor; o DR compara as correntes que vão e voltam.',
    B: '[funcaoDisp] No curto entre fase e neutro a corrente vai e volta pelo toróide: a soma continua nula, e o DR não atua.',
    D: '[funcaoDisp] Sobretensão é com o DPS.',
    E: '[detalhe] Desligar o neutro não cria diferença entre ida e volta; o DR não atua por isso.' } },
  'a:T5:b4:1': { d: 'm', h: '5.6', w: {
    A: '[valorNorma] A iluminação de dormitório não está entre os circuitos com DR obrigatório na NBR 5410:2004.',
    B: '[valorNorma] As tomadas de dormitório não estão na lista obrigatória da versão vigente (<span class="confira">a revisão em andamento da norma discute ampliá-la</span>).',
    D: '[valorNorma] A iluminação da sala não está entre os circuitos com DR obrigatório.',
    E: '[valorNorma] A campainha, circuito de sinalização, não está entre os locais com DR obrigatório.' } },
  'a:T5:b4:2': { d: 'm', h: '5.6', w: {
    A: '[detalhe] O DR não mede a corrente que passa pela pessoa: mede a diferença entre ida e volta, que aqui é zero.',
    C: '[funcaoDisp] A corrente pela pessoa (miliampères) é pequena demais para o disjuntor.',
    D: '[funcaoDisp] O DPS atua em sobretensões transitórias, não em choques.',
    E: '[esquemaTerra] Aterrar o neutro depois do DR provoca desarmes indevidos; não faz o DR enxergar uma corrente que não vai para a terra.' } },
  'a:T5:b4:3': { d: 'f', w: {
    A: '[valorNorma] Preto é cor de fase; o neutro é azul-claro e a proteção, verde-amarelo.',
    C: '[valorNorma] O neutro é azul-claro, não branco.',
    D: '[valorNorma] Preto é cor de fase, não de proteção.',
    E: '[valorNorma] Vermelho é cor de fase; o neutro é azul-claro.' } },
  'a:T5:b4:4': { d: 'f', h: '5.6', w: {
    A: '[funcaoDisp] Proteção contra contato indireto é do seccionamento automático (DR ou disjuntor, conforme o esquema).',
    B: '[funcaoDisp] Proteção contra sobrecarga é do disjuntor.',
    D: '[funcaoDisp] Falha de isolamento no IT é sinalizada pelo DSI (supervisor de isolamento).',
    E: '[exagero] O DPS depende do aterramento para escoar o surto; não o substitui.' } },
  'a:T5:b4:5': { d: 'f', h: '5.6', w: {
    A: '[ordem] Inverteu: o térmico é para sobrecarga e o magnético, para curto.',
    C: '[funcaoDisp] Choque é com o DR, e surto, com o DPS; o disjuntor termomagnético atua em sobrecorrentes.',
    D: '[funcaoDisp] Fuga à terra é com o DR, e sobretensão, com o DPS.',
    E: '[funcaoDisp] O térmico atua em sobrecargas, com atraso; só o magnético é para curto.' } },
  /* ---------- seção 5: aterramento ---------- */
  'a:T5:b5:0': { d: 'f', w: {
    A: '[esquemaTerra] Alimentação isolada da terra é o esquema IT.',
    C: '[esquemaTerra] PEN em toda a instalação é o TN-C.',
    D: '[esquemaTerra] Massas num eletrodo independente do da alimentação é o TT.',
    E: '[esquemaTerra] Todos os esquemas TN têm condutor de proteção (separado no TN-S).' } },
  'a:T5:b5:1': { d: 'm', w: {
    A: '[esquemaTerra] Corrente de falta alta, que faz o disjuntor atuar, é o caso do TN, em que a falta vira curto pelo PE.',
    C: '[esquemaTerra] O TT não é isolado: a alimentação é aterrada, e a corrente de falta volta pela terra.',
    D: '[esquemaTerra] O DSI é o dispositivo típico do IT, não do TT.',
    E: '[esquemaTerra] No TT não há PEN; o PEN é do TN-C.' } },
  'a:T5:b5:2': { d: 'm', w: {
    A: '[exagero] O IT exige proteções: o DSI sinaliza a primeira falta, e a segunda tem de ser desligada.',
    C: '[oposto] Na primeira falta a corrente é muito pequena, não máxima.',
    D: '[esquemaTerra] PEN é do TN-C; no IT a alimentação é isolada (ou aterrada por alta impedância).',
    E: '[detalhe] O IT tem massas, aterradas como em qualquer instalação.' } },
  'a:T5:b5:3': { d: 'm', w: {
    A: '[oposto] O PEN não pode ser seccionado: as massas ligadas a ele ficariam sem proteção.',
    B: '[oposto] O PEN não pode passar pelo DR: o DR não distinguiria a corrente de retorno da de falta.',
    D: '[valorNorma] O PEN tem identificação própria: azul-claro com anilhas verde-amarelas, se identificado por cor.',
    E: '[esquemaTerra] O PEN é do esquema TN-C; no TT, neutro e proteção são separados.' } },
  'a:T5:b5:4': { d: 'f', conta: '50/2', w: {
    A: '[peTab] 10 mm² não sai da tabela: acima de 35 mm², o PE é a metade da fase.',
    B: '[peTab] 16 mm² é o valor da faixa de 16 a 35 mm²; 50 mm² está acima dela.',
    D: '[peTab] 35 mm² não é a metade de 50 mm²; é o limite superior da faixa intermediária.',
    E: '[peTab] Igual à fase só até 16 mm².' } },
  'a:T5:b5:5': { d: 'm', w: {
    A: '[oposto] A norma proíbe canalizações metálicas como eletrodo: a tubulação pode ser trocada por plástico, e o aterramento sumiria sem aviso.',
    C: '[oposto] A tubulação não pode ser o eletrodo, mas deve continuar ligada ao BEP (equipotencialização).',
    D: '[detalhe] O material do tubo não muda a regra: nenhuma canalização metálica serve de eletrodo.',
    E: '[oposto] A tubulação de gás também não pode ser eletrodo.' } },
  'a:T5:b5:6': { d: 'd', conta: '220*(127**2/100)/(127**2/100+127**2/1000)', w: {
    A: '[cargaErrada] 20 V é a tensão no aquecedor, a carga de menor resistência.',
    B: '[divIgual] 110 V divide os 220 V igualmente, o que só vale para cargas iguais.',
    C: '[neutroNada] 127 V supõe que o rompimento do neutro não muda nada.',
    E: '[exagero] 220 V supõe que a lâmpada fica com toda a tensão; o aquecedor continua em série e fica com cerca de 20 V.' } },

  /* ---------- banco (BANK) ---------- */
  'f:t5:1': { mod: 'I1', h: '8.3', d: 'm', w: {
    A: '[esquemaTerra] Religar N e PE depois da separação recria um PEN a jusante e é proibido.',
    C: '[oposto] O PE nunca pode ser seccionado.',
    D: '[valorNorma] Verde-amarelo é a cor do PE; o neutro é azul-claro.',
    E: '[esquemaTerra] O DR não pode ficar no trecho com PEN; ele vai depois da separação, no trecho TN-S.' } },
  'f:t5:2': { mod: 'I1', h: '5.6', d: 'm', w: {
    A: '[funcaoDisp] A curva do disjuntor define o disparo magnético; não faz o DR desarmar.',
    C: '[detalhe] Verde-amarelo é a cor correta do PE; não causa desarme.',
    D: '[detalhe] 2,5 mm² é a seção usual de tomadas; não faz o DR desarmar.',
    E: '[detalhe] A tensão de 220 V não provoca fuga à terra.' } },
  'f:t5:3': { mod: 'I1', h: '5.6', d: 'm', w: {
    A: '[seriePar] Em série, o DPS levaria a corrente de carga; ele fica em paralelo, entre os condutores vivos e o PE.',
    C: '[exagero] Não “apenas” entre fase e neutro: a ligação típica é entre os condutores vivos e o barramento de proteção.',
    D: '[seriePar] Em série com o PE ele não teria por onde desviar o surto.',
    E: '[funcaoDisp] O DPS não serve para evitar desarmes do DR.' } },
  'f:t5:4': { mod: 'I1', d: 'm', w: {
    A: '[semFator] 1,00 é o fator de um circuito sozinho; com quatro agrupados a capacidade cai.',
    B: '[valorNorma] 0,80 é o fator para 2 circuitos.',
    C: '[valorNorma] 0,70 é o fator para 3 circuitos.',
    E: '[valorNorma] 0,60 é o fator para 5 circuitos.' } },
  'f:t5:5': { mod: 'I1', d: 'f', w: {
    A: '[valorNorma] A norma fixa no máximo 1,5 m, não 0,5 m.',
    C: '[valorNorma] 3,0 m é o dobro do limite da norma.',
    D: '[valorNorma] A distância é medida até o local do equipamento, não até o quadro.',
    E: '[valorNorma] Ser circuito exclusivo não dispensa a distância máxima de 1,5 m.' } },
  'f:t5:6': { mod: 'I1', d: 'f', w: {
    A: '[valorNorma] Com 13,6 A, acima de 10 A, o forno exige circuito independente.',
    C: '[detalhe] O circuito de iluminação não serve para equipamento de mais de 10 A.',
    D: '[exagero] Não basta qualquer circuito com disjuntor de 32 A: o circuito tem de ser independente e dimensionado para ele.',
    E: '[detalhe] Extensão não é solução de projeto.' } },
  'h:t5:tncs': { mod: 'I1', h: '8.3', d: 'f', figTira: ESQ_TIRA, conv: {
    s: 'A figura mostra os esquemas de aterramento da NBR 5410. O esquema em que o neutro e a proteção chegam da fonte combinados num único condutor (PEN) e são separados em N e PE num ponto da instalação é o',
    o: ESQ, a: 2,
    c: 'TN-C-S: o trecho inicial é TN-C (PEN) e, a partir da separação, TN-S. Depois dela, N e PE nunca mais se religam.' }, w: {
    A: '[esquemaTerra] No TN-S, N e PE são separados desde a fonte.',
    B: '[esquemaTerra] No TN-C, o PEN segue combinado em toda a instalação, sem separação.',
    D: '[esquemaTerra] No TT as massas vão a um eletrodo próprio; não há PEN.',
    E: '[esquemaTerra] No IT a alimentação é isolada da terra (ou aterrada por alta impedância); não há PEN.' } },
  'h:t5:tt': { mod: 'I1', h: '8.3', d: 'm', figTira: ESQ_TIRA, conv: {
    s: 'Na figura dos esquemas de aterramento da NBR 5410, o esquema em que a corrente de uma falta fase-massa retorna à fonte pela terra, passando por dois eletrodos, o que costuma torná-la baixa demais para o disjuntor e exige DR, é o',
    o: ESQ, a: 3,
    c: 'No TT, as massas têm eletrodo próprio, independente do aterramento da fonte; a corrente de falta passa pelas duas resistências de terra, que a limitam. Por isso o DR é praticamente indispensável.' }, w: {
    A: '[esquemaTerra] No TN-S a falta volta pelo PE, como um curto franco, e o disjuntor atua.',
    B: '[esquemaTerra] No TN-C a falta volta pelo PEN, também como curto.',
    C: '[esquemaTerra] No TN-C-S a falta volta pelo PE e pelo PEN, sem passar pela terra.',
    E: '[esquemaTerra] No IT a primeira falta quase não tem corrente, porque a alimentação é isolada.' } },
  'o:t5:dim': { mod: 'I1', d: 'm', conv: {
    s: 'Considere as etapas do dimensionamento de um circuito terminal:<br>I. Escolher o disjuntor com I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub>.<br>II. Prever a carga e calcular a corrente de projeto I<sub>B</sub>.<br>III. Verificar a queda de tensão e aumentar a seção, se necessário.<br>IV. Definir o método de instalação e os fatores de correção.<br>V. Escolher a seção pela capacidade de condução (I<sub>z</sub> corrigida ≥ I<sub>B</sub>).<br>A ordem correta é',
    o: ['II, I, IV, V, III', 'II, IV, V, III, I', 'II, V, IV, III, I', 'II, IV, III, V, I', 'V, II, IV, III, I'], a: 1,
    c: 'Primeiro a corrente de projeto (II); depois o método de instalação e os fatores (IV), que corrigem a capacidade de condução; a seção pela capacidade corrigida (V); a verificação da queda de tensão, que pode aumentar a seção (III); e, por último, o disjuntor (I), que depende do I<sub>z</sub> do condutor que ficou definido.' }, w: {
    A: '[ordem] Escolhe o disjuntor antes do condutor, quando ainda não existe I<sub>z</sub> para limitar o I<sub>n</sub>.',
    C: '[ordem] Escolhe a seção antes de conhecer os fatores de correção, sem os quais a capacidade de condução não pode ser corrigida.',
    D: '[ordem] Verifica a queda de tensão antes de escolher a seção, e a queda depende da seção.',
    E: '[ordem] Escolhe a seção antes de calcular a corrente de projeto.' } },
};

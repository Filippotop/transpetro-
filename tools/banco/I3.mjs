/* Revisão das questões da estação I3 (medidas, retificadores, baterias e no-breaks), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/medidas-retificadores-baterias-nobreaks.html), pela chave "bN:i";
   extra: questões só da aba Questões. Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual erro leva a ela. Tipos de erro novos desta estação (para tools/banco/erros.mjs): classeLeitura,
   escalaMedida, shuntForm, efeitoCarga, alicate, catMed, megger, ipErr, terra62, retMed, ripple, pulsos, regLinear, tiristor,
   bancoBat, peukert, flutua, tempBat, segBat, tipoUps, dimUps, autonUps, bypass, aron, hipot, normaIso. */
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: '7.1', b2: '7.3', b3: '7.3', b4: '7.4', b5: '7.4', b6: '7.4' },
  q: {
    /* ---------- seção 1: erro, exatidão, shunt e multiplicador ---------- */
    'b1:0': { d: 'f', h: '7.1', conta: '0.02*150', w: {
      A: '[classeLeitura] 1,2 V aplica a classe à leitura (2% de 60 V); ela vale para o fundo de escala.',
      B: '[classeLeitura] 2,0 V toma a classe como se fosse volts.',
      D: '[unidade] 5,0 V é o erro relativo (3/60 = 5%) lido como se fosse volts.',
      E: '[classeLeitura] 6,0 V soma o desvio de ±3 V nos dois sentidos, como se o erro fosse a faixa inteira.' } },
    'b1:1': { d: 'm', h: '7.1', w: {
      A: '[escalaMedida] A escala de 300 V tem o maior erro absoluto (4,5 V) e, para 25 V, o maior erro relativo (18%).',
      B: '[classeLeitura] O erro é de 1,5% do fundo de escala, e não da leitura: em 100 V seria de 1,5 V, ou 6% de 25 V.',
      C: '[classeLeitura] A classe é a mesma, mas o erro máximo em volts depende do fundo de escala: 0,45 V, 1,5 V ou 4,5 V.',
      D: '[escalaMedida] Não existe regra do dobro: escolhe-se a menor escala que comporta a leitura.' } },
    'b1:2': { d: 'm', h: '7.1', conta: '40*0.005/(0.05-0.005)', w: {
      A: '[shuntForm] 4,0 Ω usa os 50 mA no denominador, como se o galvanômetro não levasse corrente; o shunt leva só 50 − 5 = 45 mA.',
      C: '[shuntForm] 40 Ω iguala o shunt a R<sub>m</sub>, o que dividiria a corrente por igual e só dobraria a faixa.',
      D: '[invertida] 360 Ω é R<sub>m</sub>·(I − I<sub>m</sub>)/I<sub>m</sub>, a razão invertida; o shunt é um valor pequeno.',
      E: '[invertida] 400 Ω multiplica R<sub>m</sub> pela razão I/I<sub>m</sub>, em vez de dividir.' } },
    'b1:3': { d: 'm', h: '7.1', conta: '24*(40*60/100)/(60+40*60/100)', w: {
      B: '[efeitoCarga] 9,6 V é a tensão sem o voltímetro (24 × 40/100), que supõe um instrumento ideal.',
      C: '[efeitoCarga] 10,3 V é a tensão sobre R<sub>1</sub> quando o voltímetro é ligado em paralelo com ele, o resistor errado.',
      D: '[efeitoCarga] 12,0 V toma a metade da fonte, sem calcular o divisor.',
      E: '[efeitoCarga] 14,4 V é a tensão em R<sub>1</sub> sem o instrumento (24 × 60/100), e não a de R<sub>2</sub> com ele.' } },
    /* ---------- seção 2: multímetro, alicate, osciloscópio e potência ---------- */
    'b2:0': { d: 'f', h: '7.3', conta: '45/5', w: {
      A: '[alicate] 1,8 A divide a leitura pelo quadrado do número de voltas (5²); a leitura é N vezes a corrente, e não N².',
      C: '[alicate] 11,25 A divide por 4, contando uma volta a menos do que as 5 que atravessam o núcleo.',
      D: '[alicate] 45 A é a leitura do alicate, sem descontar as voltas.',
      E: '[invertida] 225 A multiplica a leitura pelo número de voltas, em vez de dividir.' } },
    'b2:1': { d: 'f', h: '7.3', w: {
      B: '[alicate] 6 A seria a média das correntes; o alicate soma vetorialmente as duas, que se anulam.',
      C: '[alicate] 12 A seria a leitura abraçando só a fase; com fase e neutro juntos, as correntes se anulam.',
      D: '[alicate] 17 A (12√2) soma as correntes como se estivessem defasadas de 90°, mas elas são opostas.',
      E: '[alicate] 24 A soma os módulos, como se as correntes tivessem o mesmo sentido; elas se opõem.' } },
    'b2:2': { d: 'm', h: '7.1', conta: '5*2/2/Math.sqrt(2)', w: {
      B: '[pico] 5,00 V é o valor de pico lido como se fosse o eficaz.',
      C: '[ppEf] 7,07 V divide o pico a pico por √2, sem dividir antes por 2.',
      D: '[pp] 10,0 V é o valor de pico a pico lido como se fosse o eficaz.',
      E: '[formula] 14,1 V multiplica o pico a pico por √2, em vez de dividir.' } },
    'b2:3': { d: 'm', h: '7.3', w: {
      B: '[catMed] CAT II é a categoria das tomadas; a tensão de 1.000 V não compensa a categoria menor que a do quadro (CAT III).',
      C: '[catMed] CAT I é a categoria de circuitos eletrônicos protegidos; a tensão de 1.000 V não substitui a categoria.',
      D: '[catMed] CAT II 600 V cobre a tensão, mas a categoria é a de tomadas, abaixo da do quadro de distribuição.',
      E: '[catMed] Sem categoria marcada, o instrumento não é seguro para o quadro; a entrada de até 1.000 V é tensão, e não categoria.' } },
    /* ---------- seção 3: resistência, isolação e aterramento ---------- */
    'b3:0': { d: 'm', h: '7.1', conta: '220*600/150', w: {
      A: '[ladosPonte] 55 Ω é R<sub>2</sub>·R<sub>3</sub>/R<sub>1</sub>: multiplicou lados que não são opostos.',
      B: '[formula] 220 Ω supõe ponte simétrica (R<sub>x</sub> = R<sub>3</sub>), mas R<sub>1</sub> e R<sub>2</sub> são diferentes.',
      C: '[ladosPonte] 409 Ω é R<sub>1</sub>·R<sub>2</sub>/R<sub>3</sub>: multiplicou os dois resistores da direita.',
      E: '[formula] 970 Ω soma as três resistências; a ponte equilibrada não é uma associação em série.' } },
    'b3:1': { d: 'm', h: '7.3', w: {
      A: '[megger] Medir energizado é perigoso para quem mede e destrói o instrumento: a isolação se mede desenergizada.',
      B: '[megger] Com 12 V, o ensaio não revela as falhas de isolação, que só aparecem sob tensão alta.',
      C: '[megger] Só abrir o disjuntor deixa os reatores e módulos eletrônicos sob a tensão de ensaio, que os danifica.',
      D: '[megger] O ôhmetro usa tensão baixa e não mede a resistência de isolação, que exige tensão alta.' } },
    'b3:2': { d: 'm', h: '7.3', conta: '280/175', w: {
      A: '[ipErr] 0,63 inverte a razão (175/280): o IP é R<sub>10 min</sub>/R<sub>1 min</sub>, e a isolação em curto não é o que isso indica.',
      B: '[ipErr] 1,25 é a razão de absorção dielétrica (175/140), e não o IP; o IP usa as leituras de 10 e de 1 minuto.',
      C: '[ipErr] 2,0 usa a leitura de 30 s no denominador (280/140), em vez da de 1 minuto.',
      E: '[ipErr] 1,5 é o mínimo da classe A; para a classe F, o mínimo recomendado é 2,0, e 1,6 não atende.' } },
    'b3:3': { d: 'f', h: '7.3', conta: '0.62*80', w: {
      A: '[terra62] 30,6 m é 38,2% da distância, o complemento dos 62%.',
      B: '[terra62] 40 m é a metade da distância; o eletrodo de potencial vai a cerca de 62%.',
      D: '[unidade] 62 m lê os 62% como se fossem metros.',
      E: '[terra62] 64 m é 80% da distância, perto demais do eletrodo de corrente.' } },
    /* ---------- seção 4: retificadores ---------- */
    'b4:0': { d: 'm', h: '7.4', conta: '24*Math.sqrt(2)/Math.PI', w: {
      A: '[retMed] 7,6 V aplica 0,318 ao valor eficaz (24); o fator vale para o pico.',
      C: '[retMed] 15,3 V aplica 0,637 ao valor eficaz; além disso, 0,637 é fator da onda completa.',
      D: '[retMed] 21,6 V é o valor médio da onda completa (2V<sub>p</sub>/π), e não o da meia onda.',
      E: '[pico] 33,9 V é o pico (24√2), e não o valor médio.' } },
    'b4:1': { d: 'f', h: '7.4', conta: '6*60', w: {
      A: '[pulsos] 60 Hz é a frequência da rede; a ponte trifásica dá 6 pulsos por ciclo.',
      B: '[pulsos] 120 Hz é a ondulação da ponte monofásica (2 pulsos por ciclo).',
      C: '[pulsos] 180 Hz é a do retificador trifásico de meia onda, com 3 pulsos por ciclo.',
      E: '[pulsos] 720 Hz seria a de uma ponte de 12 pulsos.' } },
    'b4:2': { d: 'm', h: '7.4', conta: '2/(120*0.01)', w: {
      A: '[ripple] 0,83 V divide o resultado por dois, confundindo a ondulação pico a pico com a semiamplitude.',
      C: '[ripple] 2,40 V multiplica I·f·C em vez de dividir.',
      D: '[ripple] 3,33 V usa 60 Hz, como se o retificador fosse de meia onda; na ponte a ondulação é de 120 Hz.',
      E: '[unidade] 16,7 V usa 1.000 µF no lugar de 10.000 µF, um erro de potência de dez na conversão.' } },
    'b4:3': { d: 'm', h: '7.4', conta: '(24-9)*0.4', w: {
      A: '[regLinear] 3,6 W é a potência útil entregue à carga (9 × 0,4), e não a dissipada no regulador.',
      C: '[regLinear] 9,6 W é a potência de entrada (24 × 0,4), e não a dissipada.',
      D: '[regLinear] 13,2 W soma as tensões (24 + 9) em vez de subtrair.',
      E: '[unidade] 15,0 W toma a queda de tensão (15 V) como se fosse potência, sem multiplicar pela corrente.' } },
    /* ---------- seção 5: baterias ---------- */
    'b5:0': { d: 'f', h: '7.4', conta: '(48/12)*(300/150)', w: {
      A: '[bancoBat] 2 considera só o paralelo (300/150) e esquece a série para chegar a 48 V.',
      B: '[bancoBat] 4 considera só a série (48/12) e esquece o paralelo para chegar a 300 Ah.',
      C: '[bancoBat] 6 soma 4 + 2 em vez de multiplicar a série pelo paralelo.',
      E: '[bancoBat] 16 usa 48/12 = 4 também para o paralelo (4 × 4), em vez de 300/150 = 2.' } },
    'b5:1': { d: 'd', h: '7.4', conta: '10*(150/(30*10))**1.3', w: {
      A: '[peukert] 3,85 h divide as 5 h ideais por k, em vez de aplicar o expoente à razão C/(I·H).',
      C: '[peukert] 5,00 h é C/I, sem a correção de Peukert.',
      D: '[peukert] 5,87 h usa o expoente 1/k, o que daria autonomia maior que a ideal: o efeito Peukert reduz a autonomia.',
      E: '[peukert] 6,50 h multiplica as 5 h por k, aumentando a autonomia em vez de reduzi-la.' } },
    'b5:2': { d: 'f', h: '7.4', conta: '12*2.25', w: {
      A: '[flutua] 21,0 V é o fim de descarga (12 × 1,75), e não a flutuação.',
      B: '[flutua] 24,0 V é a tensão nominal (12 × 2); a flutuação fica acima dela.',
      D: '[flutua] 28,2 V (12 × 2,35) é tensão de carga de reforço, acima da flutuação.',
      E: '[flutua] 28,8 V (12 × 2,40) é nível de reforço ou de equalização de bateria ventilada, acima da flutuação.' } },
    'b5:3': { d: 'm', h: '7.4', w: {
      A: '[segBat] A água é que se perde na carga; repõe-se água desmineralizada ou destilada, nunca ácido.',
      B: '[segBat] O banco é uma fonte de corrente contínua que não se desliga: os terminais continuam energizados.',
      C: '[segBat] Cada célula tem 2 V, mas o banco soma as tensões, e um curto com a ferramenta tem corrente enorme.',
      D: '[segBat] O ácido derramado se neutraliza com bicarbonato de sódio; o ácido fraco é o que se usa no álcali do níquel-cádmio.' } },
    /* ---------- seção 6: no-breaks ---------- */
    'b6:0': { d: 'f', h: '7.4', w: {
      A: '[tipoUps] O off-line alimenta a carga pela rede e tem transferência de alguns milissegundos; a frequência segue a rede.',
      B: '[tipoUps] O line-interactive corrige a tensão, mas a frequência segue a rede e ainda há transferência.',
      D: '[tipoUps] O estabilizador com bateria corrige a tensão, mas tem as limitações do off-line: transferência e frequência da rede.',
      E: '[tipoUps] O grupo gerador leva dezenas de segundos para assumir a carga e não é um no-break.' } },
    'b6:1': { d: 'f', h: '7.4', conta: '18/0.9', w: {
      A: '[dimUps] 16,2 kVA multiplica por 0,9 em vez de dividir.',
      B: '[dimUps] 18,0 kVA iguala kVA a kW, esquecendo o fator de potência.',
      D: '[dimUps] 22,5 kVA divide por 0,8, um fator de potência que não é o do enunciado.',
      E: '[dimUps] 25,0 kVA já aplica 25% de margem (20 × 1,25), que o enunciado exclui.' } },
    'b6:2': { d: 'm', h: '7.4', conta: '40*192*0.9/5000*60', w: {
      B: '[autonUps] 92 min esquece o rendimento do inversor.',
      C: '[unidade] 98 min lê 1,38 h como 1 h 38 min, tratando a parte decimal da hora como minutos.',
      D: '[autonUps] 102 min divide por 0,9, em vez de multiplicar pelo rendimento.',
      E: '[autonUps] 480 min divide 40 Ah por 5 kW, sem considerar a tensão do banco.' } },
    'b6:3': { d: 'm', h: '7.4', w: {
      A: '[bypass] O on-line tem caminho alternativo: a chave estática transfere a carga para o bypass.',
      B: '[bypass] A bateria alimenta o inversor, e não a saída; sem o inversor, não há corrente alternada da bateria.',
      C: '[bypass] O bypass manual é uma chave de manutenção, operada pelo técnico; quem transfere a carga é a chave estática.',
      D: '[bypass] A carga é de corrente alternada; o retificador entrega corrente contínua e não alimenta a saída.' } },
  },
  extra: [
    { id: 'x1', h: '7.3', tag: 'Multímetro, alicate, osciloscópio e potência', d: 'd', conta: 'Math.cos(Math.atan(Math.sqrt(3)*(3000-1000)/(3000+1000)))',
      s: 'Num circuito trifásico a três fios com carga equilibrada, os dois wattímetros do método de Aron indicam 3.000 W e 1.000 W. O fator de potência da carga é, aproximadamente,',
      o: ['0,33', '0,50', '0,65', '0,76', '0,87'], a: 3,
      c: 'tan φ = √3 × (3.000 − 1.000)/(3.000 + 1.000) ≈ 0,866; φ ≈ 40,9° e cos φ ≈ 0,76. 0,33 é W<sub>2</sub>/W<sub>1</sub>; 0,50 é (W<sub>1</sub> − W<sub>2</sub>)/(W<sub>1</sub> + W<sub>2</sub>), sem o √3; 0,65 é o seno de φ; 0,87 é o valor da tangente tomado como fator de potência.',
      w: { A: '[aron] 0,33 é a razão W<sub>2</sub>/W<sub>1</sub>, e não o fator de potência.',
        B: '[aron] 0,50 é (W<sub>1</sub> − W<sub>2</sub>)/(W<sub>1</sub> + W<sub>2</sub>), sem o √3 da tangente.',
        C: '[senCos] 0,65 é o seno de φ (40,9°), e não o cosseno.',
        E: '[aron] 0,87 é o valor da tangente de φ, tomado como se fosse o fator de potência.' } },
    { id: 'x2', h: '7.3', tag: 'Resistência, isolação e aterramento: ponte, megôhmetro, hipot e terrômetro', d: 'm',
      s: 'O ensaio de tensão aplicada (hipot) difere da medição da resistência de isolação com megôhmetro porque o hipot',
      o: ['usa tensão menor que a nominal e dá o valor da resistência em megohms, sendo o menos agressivo dos dois',
          'mede a continuidade dos condutores de proteção com corrente alta',
          'só pode ser feito em corrente contínua e com o equipamento energizado',
          'submete a isolação a uma tensão acima da nominal, por tempo definido, para verificar se ela suporta, com risco de dano a uma isolação envelhecida',
          'mede a resistência de aterramento com corrente alternada injetada na terra'], a: 3,
      c: 'O hipot é um ensaio de aprova ou reprova: aplica tensão alternada ou contínua acima da nominal por tempo definido (1 minuto, na NBR 5410), mede a corrente de fuga e verifica se a isolação suporta. É mais severo que o megôhmetro e pode danificar uma isolação envelhecida. O megôhmetro é que usa tensão moderada e dá a resistência; a continuidade e o aterramento são outros ensaios; o hipot exige o equipamento desenergizado da rede.',
      w: { A: '[hipot] Descreve o megôhmetro: tensão moderada e valor de resistência. O hipot usa tensão acima da nominal.',
        B: '[hipot] A continuidade dos condutores de proteção é outro ensaio, feito com ôhmetro de baixa tensão.',
        C: '[hipot] O hipot pode ser CA ou CC, e o equipamento fica desenergizado da rede e isolado; energizado, o ensaio é perigoso.',
        E: '[hipot] A resistência de aterramento é medida pelo terrômetro, e não pelo hipot.' } },
    { id: 'x3', h: '7.4', tag: 'Retificadores, filtros e fontes de corrente contínua', d: 'd', conta: '2*127*Math.sqrt(2)/Math.PI*Math.cos(Math.PI/3)',
      s: 'Uma ponte monofásica totalmente controlada, com carga muito indutiva (corrente contínua), é alimentada por 127 V eficazes. Com ângulo de disparo de 60°, a tensão média na carga é de, aproximadamente,',
      o: ['57,2 V', '85,8 V', '99,0 V', '114,3 V', '179,6 V'], a: 0,
      c: 'V<sub>p</sub> = 127√2 ≈ 179,6 V; V<sub>méd</sub> = (2V<sub>p</sub>/π)·cos α = 114,3 × 0,5 ≈ 57,2 V. 85,8 V usa a fórmula da ponte semicontrolada, (V<sub>p</sub>/π)(1 + cos α); 99,0 V usa cos 30°, o complemento do ângulo; 114,3 V é o valor com α = 0°; 179,6 V é o pico.',
      w: { B: '[tiristor] 85,8 V usa a fórmula da ponte semicontrolada, (V<sub>p</sub>/π)·(1 + cos α), e não a da totalmente controlada.',
        C: '[tiristor] 99,0 V usa cos 30°, o complemento do ângulo de 60°.',
        D: '[tiristor] 114,3 V é o valor com α = 0° (equivale a diodos); falta multiplicar por cos 60°.',
        E: '[pico] 179,6 V é o pico da tensão (127√2), e não o valor médio.' } },
    { id: 'x4', h: '7.4', tag: 'Baterias e carregadores', d: 'm', conta: '24*(2.25-0.003*10)',
      s: 'Um banco VRLA tem 24 células (48 V nominais), com flutuação de 2,25 V por célula a 25 °C e compensação de temperatura de −3 mV/°C por célula. Com o banco a 35 °C, a tensão do carregador deve ser de',
      o: ['51,48 V', '52,56 V', '53,28 V', '54,00 V', '54,72 V'], a: 2,
      c: 'A correção é 3 mV × (35 − 25) = 30 mV por célula: 24 × (2,25 − 0,03) = 53,28 V. 51,48 V aplica o coeficiente à temperatura absoluta de 35 °C (3 mV × 35); 52,56 V dobra o coeficiente; 54,00 V não compensa a temperatura; 54,72 V soma a correção em vez de subtrair.',
      w: { A: '[tempBat] 51,48 V aplica 3 mV a cada grau de 35 °C, e não da diferença de 10 °C para os 25 °C.',
        B: '[tempBat] 52,56 V dobra o coeficiente (6 mV/°C), em vez de 3 mV/°C.',
        D: '[tempBat] 54,00 V é a tensão a 25 °C, sem a compensação.',
        E: '[sinal] 54,72 V soma a correção, quando o banco mais quente pede tensão menor.' } },
    { id: 'x5', h: '7.4', tag: 'No-breaks (UPS)', d: 'f',
      s: 'A função do regulador automático de tensão (AVR) de um no-break line-interactive é',
      o: ['carregar a bateria com corrente constante e depois com tensão constante',
          'alimentar a carga a partir da bateria na falta de rede, no lugar do inversor',
          'isolar a carga da rede por dupla conversão, regulando também a frequência',
          'converter a tensão da bateria em corrente alternada senoidal',
          'corrigir subtensões e sobretensões da rede sem recorrer à bateria'], a: 4,
      c: 'No line-interactive, o AVR (um autotransformador com taps) ajusta a tensão entregue à carga quando a rede está fora do nível, sem usar a bateria; a bateria só entra na falta de rede. Carregar a bateria é função do carregador; converter CC em CA é do inversor; a dupla conversão é do on-line.',
      w: { A: '[tipoUps] Carregar a bateria é função do carregador (retificador), e não do AVR.',
        B: '[tipoUps] Na falta de rede quem alimenta a carga é o inversor com a bateria; o AVR só regula a tensão da rede.',
        C: '[tipoUps] Isolar a carga e regular a frequência por dupla conversão é do on-line; o AVR não regula a frequência.',
        D: '[tipoUps] Converter a tensão da bateria em CA é função do inversor, e não do AVR.' } },
    { id: 'x6', h: '7.3', tag: 'Resistência, isolação e aterramento: ponte, megôhmetro, hipot e terrômetro', d: 'm',
      s: 'Segundo a tabela 60 da NBR 5410, na verificação final de uma instalação, o circuito de 220 V (até 500 V, exceto SELV) é ensaiado com uma tensão de ensaio e deve ter uma resistência de isolação mínima de, respectivamente,',
      o: ['250 V e 0,25 MΩ', '500 V em corrente alternada e 0,5 MΩ', '1.000 V e 1,0 MΩ', '250 V e 0,5 MΩ', '500 V em corrente contínua e 0,5 MΩ'], a: 4,
      c: 'Para circuitos até 500 V (exceto SELV), a tabela 60 pede ensaio em 500 V de corrente contínua, com resistência mínima de 0,5 MΩ. 250 V e 0,25 MΩ valem para SELV; 1.000 V e 1,0 MΩ, para circuitos acima de 500 V; o ensaio de resistência de isolação é em corrente contínua, e não alternada; 250 V com 0,5 MΩ mistura a tensão do SELV com o mínimo dos circuitos de 500 V.',
      w: { A: '[normaIso] 250 V e 0,25 MΩ é o par do SELV, e não o dos circuitos de até 500 V.',
        B: '[normaIso] O ensaio de resistência de isolação é feito em corrente contínua, e não em alternada.',
        C: '[normaIso] 1.000 V e 1,0 MΩ é o par dos circuitos acima de 500 V.',
        D: '[normaIso] 250 V é a tensão de ensaio do SELV; com 0,5 MΩ, mistura os valores de duas linhas da tabela.' } },
  ],
};

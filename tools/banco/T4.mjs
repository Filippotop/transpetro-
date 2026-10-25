/* Revisão do banco, tema T4 (circuitos CC, Kirchhoff, Thévenin e Norton) → E1.
   Formato: ver o comentário do topo de tools/banco.mjs. Cada alternativa errada diz qual erro leva a ela. */
export default {
  /* ---------- seção 1: grandezas, resistência e potência ---------- */
  'a:T4:b1:0': { d: 'f', conta: '0.0172*100/2.5', w: {
    A: '[unidade] 0,0688 Ω seria com 10 m: errou a vírgula do comprimento.',
    B: '[formula] 0,172 Ω = 0,0172 × 100/10: dividiu por 10 no lugar da seção de 2,5 mm².',
    D: '[unidade] 6,88 Ω seria com 1.000 m: tratou os 100 m como 1 km.',
    E: '[unidade] 68,8 Ω seria com 10.000 m: errou a conversão do comprimento em duas casas.' } },
  'a:T4:b1:1': { d: 'f', conta: '220*11', w: {
    A: '[outra] 20 é a resistência (220/11), em ohms, não a potência.',
    B: '[unidade] 242 W: errou a vírgula (220 × 11 = 2.420).',
    C: '[formula] 1.210 W = 220 × 11/2: dividiu por 2 como se fossem valores de pico; 220 V e 11 A já são os valores que entram na conta.',
    E: '[formula] 4.840 W = 220 × 22: dobrou a corrente.' } },
  'a:T4:b1:2': { d: 'm', conta: '127**2/(220**2/5500)', w: {
    B: '[quadLinear] 2.750 W supõe que a potência cai à metade. Com R constante, P = V²/R cai com o quadrado da tensão: (127/220)² ≈ 0,33.',
    C: '[quadLinear] 3.175 W = 5.500 × 127/220: reduziu a potência na mesma proporção da tensão, mas P = V²/R.',
    D: '[oposto] A potência nominal só vale na tensão nominal; com 127 V, ela cai.',
    E: '[invertida] 9.527 W = 5.500 × 220/127: inverteu a proporção, e ainda linear.' } },
  'a:T4:b1:3': { d: 'f', conta: '10*(1+0.004*(70-20))', w: {
    A: '[semFator] 10,2 Ω = 10 + 0,004 × 50: esqueceu de multiplicar α·ΔT pela resistência inicial.',
    C: '[deltaT] 12,8 Ω = 10 × (1 + 0,004 × 70): usou a temperatura final no lugar da variação (50 °C).',
    D: '[deltaT] 14 Ω = 10 × (1 + 0,004 × 100): usou ΔT = 100 °C, o dobro da variação real.',
    E: '[exagero] 20 Ω supõe que a resistência dobra; o acréscimo é α·ΔT = 0,2, isto é, 20%.' } },
  'a:T4:b1:4': { d: 'm', w: {
    A: '[oposto] Fornece potência o elemento em que a corrente sai pelo terminal +, como uma fonte.',
    C: '[detalhe] Com tensão e corrente diferentes de zero, há troca de potência: V·I.',
    D: '[detalhe] O sentido da corrente não diz se o elemento é fonte de corrente; um resistor também se comporta assim.',
    E: '[exagero] Absorver potência é o comportamento normal de um resistor comum; não tem relação com resistência negativa.' } },
  /* ---------- seção 2: associações e divisores ---------- */
  'a:T4:b2:0': { d: 'f', conta: '120/60*30', w: {
    A: '[etapa] 2 é a corrente, em ampères (120/60); falta multiplicar por 30 Ω.',
    B: '[divisorTroca] 20 V é a tensão no resistor de 10 Ω.',
    C: '[divisorTroca] 40 V é a tensão no resistor de 20 Ω.',
    E: '[tensaoTotal] 120 V é a tensão da fonte, dividida entre os três resistores.' } },
  'a:T4:b2:1': { d: 'f', conta: '1/(1/6+1/3+1/2)', w: {
    A: '[etapa] 0,5 é 1/2, uma das parcelas da soma dos inversos; a soma das três dá 1, e R<sub>eq</sub> é o inverso dela.',
    C: '[formula] 2 Ω é o menor resistor; em paralelo, o equivalente é sempre menor que o menor deles.',
    D: '[formula] 3,67 Ω = 11/3 é a média aritmética dos três, não o equivalente em paralelo.',
    E: '[seriePar] 11 Ω = 6 + 3 + 2 é a associação em série.' } },
  'a:T4:b2:2': { d: 'm', conta: '24/(4+12*6/18)*6/18',
    w: { /* distrator 0,5 A → 1,5 A e gabarito B → A trocados na estação (BQ-1) */
    B: '[ignorouFonte] 1,5 A = 24/(4 + 12): ignorou o ramo de 6 Ω, como se ele estivesse aberto.',
    C: '[divisorTroca] 2 A é a corrente no resistor de 6 Ω: trocou os resistores no divisor de corrente.',
    D: '[total] 3 A é a corrente total, que se divide entre os dois ramos.',
    E: '[tensaoTotal] 6 A = 24/4: aplicou a tensão da fonte inteira ao resistor de 4 Ω.' } },
  'a:T4:b2:3': { d: 'f', conta: '30*5/15', w: {
    A: '[unidade] 6 A = 30/5: tratou os 30 A como se fossem 30 V sobre o resistor de 5 Ω (lei de Ohm com a grandeza trocada).',
    C: '[divIgual] 15 A divide a corrente igualmente, o que só vale para resistores iguais.',
    D: '[divisorTroca] 20 A é a corrente no resistor de 5 Ω: no divisor de corrente, o numerador é o outro resistor.',
    E: '[total] 30 A é a corrente total.' } },
  'a:T4:b2:4': { d: 'f', conta: '200*150/100', w: {
    A: '[ladosPonte] 75 Ω = 100 × 150/200: multiplicou lados adjacentes. O produto é dos lados opostos.',
    B: '[ladosPonte] 133 Ω = 100 × 200/150: trocou os lados da ponte.',
    C: '[detalhe] 150 Ω supõe R<sub>x</sub> igual a R<sub>3</sub>, o que só valeria com R<sub>1</sub> = R<sub>2</sub>.',
    E: '[formula] 450 Ω = 100 + 200 + 150: somou os resistores, como se estivessem em série.' } },
  /* ---------- seção 3: fontes reais e instrumentos ---------- */
  'a:T4:b3:0': { d: 'm', conta: '24.5+(24.5-23.5)/(3-1)*1', w: {
    A: '[fem] 23,5 V é a tensão nos terminais com 3 A; a fem é maior que qualquer tensão medida com carga.',
    B: '[formula] 24 V é a média das duas leituras; a fem é a tensão com corrente zero.',
    C: '[fem] 24,5 V é a tensão nos terminais com 1 A; ainda há queda interna de 0,5 V.',
    E: '[rintSoma] 26 V = 24,5 + 0,5 × 3: somou à leitura de 1 A a queda calculada com a corrente do outro ensaio.' } },
  'a:T4:b3:1': { d: 'f', conta: '12/0.05', w: { /* distrator 600 A → 2.880 A trocado na estação (BQ-1) */
    A: '[invertida] 0,6 = 12 × 0,05: multiplicou em vez de dividir.',
    B: '[unidade] 24 A seria com r = 0,5 Ω: errou a vírgula.',
    D: '[unidade] 2.400 A seria com r = 0,005 Ω: errou a vírgula da resistência interna.',
    E: '[outra] 2.880 = E²/r = 144/0,05: calculou a potência dissipada no curto, em watts, e não a corrente.' } },
  'a:T4:b3:2': { d: 'f', conta: '24-2*24/12', w: {
    A: '[etapa] 4 V é a queda na resistência interna (2 × 2 A), não a tensão nos terminais.',
    B: '[divIgual] 12 V divide a fem ao meio, como se r e a carga fossem iguais.',
    D: '[semFator] 22 V = 24 − 2: subtraiu o valor de r, e não a queda r·I = 4 V.',
    E: '[fem] 24 V é a fem, a tensão em aberto; com carga, a tensão nos terminais cai.' } },
  'a:T4:b3:3': { d: 'f', w: {
    A: '[seriePar] Somar tensões e resistências internas é o que acontece na associação em série.',
    C: '[oposto] As baterias idênticas em paralelo mantêm a tensão de uma delas; nada se anula.',
    D: '[seriePar] O dobro da tensão é a série; em paralelo a tensão é a mesma e r fica dividido.',
    E: '[oposto] Em paralelo a capacidade de corrente aumenta.' } },
  'a:T4:b3:4': { d: 'f', h: '7.3', w: {
    A: '[seriePar] O amperímetro vai em série, com resistência muito baixa; em paralelo e com resistência alta é o voltímetro.',
    B: '[seriePar] O voltímetro vai em paralelo e precisa de resistência muito alta; com resistência nula, em paralelo, seria um curto.',
    D: '[oposto] O voltímetro ideal não consome corrente (resistência infinita).',
    E: '[seriePar] Só o amperímetro vai em série; o voltímetro vai em paralelo.' } },
  'a:T4:b3:5': { d: 'm', h: '7.3', conta: '20*50/(100+50)', w: {
    A: '[formula] 5 V é metade de 10 V: aplicou a divisão por 2 duas vezes, sem montar o paralelo do voltímetro com o resistor.',
    C: '[detalhe] 10 V é a tensão real sem o instrumento: ignorou o efeito de carga do voltímetro de 100 kΩ.',
    D: '[seriePar] 13,3 V = 20 × 200/300: somou o voltímetro ao resistor (200 kΩ), como se estivessem em série; é também a tensão no outro resistor.',
    E: '[tensaoTotal] 20 V é a tensão da fonte inteira.' } },
  /* ---------- seção 4: Kirchhoff ---------- */
  'a:T4:b4:0': { d: 'f', conta: '5+3-2', w: {
    A: '[sinal] 0 A supõe que as correntes que chegam e as que saem já se equilibram sem o quarto ramo.',
    B: '[sinal] 2 A = 5 − 3: subtraiu as duas correntes que chegam.',
    C: '[sinal] 4 A trata a corrente de 2 A como se chegasse e a de 3 A como se saísse.',
    E: '[sinal] 10 A = 5 + 3 + 2: somou todas, sem separar as que chegam das que saem.' } },
  'a:T4:b4:1': { d: 'f', conta: '24-8-10', w: {
    A: '[sinal] 2 V = 10 − 8: subtraiu as duas quedas conhecidas, sem usar a fonte.',
    C: '[divIgual] 8 V repete a tensão de um dos resistores, como se fossem iguais.',
    D: '[etapa] 18 V = 8 + 10 é a soma das duas quedas; falta subtrair da fonte.',
    E: '[sinal] 42 V = 24 + 18: somou a fonte às quedas, com o sinal trocado.' } },
  'a:T4:b4:3': { d: 'd', h: '2.5', conta: '10/(1+1)', w: { /* distrator 8 V → 7,5 V trocado na estação (BQ-1) */
    A: '[unidade] 2,5 = 10/4: dividiu a tensão da fonte pelo resistor de 4 Ω, misturando corrente e tensão.',
    C: '[ignorouFonte] 6,67 V é o divisor 10 × 4/6, com a fonte dependente ignorada.',
    D: '[sinal] 7,5 V sai de tratar a fonte dependente como se injetasse 0,5·i<sub>1</sub> no nó (i<sub>1</sub> + 0,5·i<sub>1</sub> = V/4): trocou o sentido da fonte.',
    E: '[tensaoTotal] 10 V supõe que não há queda no resistor de 2 Ω.' } },
  'a:T4:b4:5': { d: 'm', conta: ['4-1', '6-4+1'], w: {
    A: '[formula] Usou o número de nós e de ramos direto; as equações independentes são n − 1 e r − n + 1.',
    C: '[formula] 4 e 2 usa n e r − n: esqueceu o −1 das equações de nó (n − 1 = 3) e o +1 das de malha (r − n + 1 = 3).',
    D: '[formula] O número de malhas independentes é r − n + 1 = 3, não o número de ramos.',
    E: '[formula] Trocou as contas: 6 e 4 são o número de ramos e de nós, não de equações.' } },
  /* ---------- seção 5: Thévenin, Norton e máxima transferência ---------- */
  'a:T4:b5:0': { d: 'm', conta: ['30*20/30', '10*20/30'], w: {
    A: '[semRth] Tomou a fonte inteira como V<sub>th</sub> e somou os resistores: a tensão em aberto é a do divisor, e a R<sub>th</sub> é o paralelo.',
    C: '[fonteAberta] V<sub>th</sub> está certa, mas R<sub>th</sub> = 30 Ω deixou a fonte aberta; zerar a fonte de tensão é pô-la em curto.',
    D: '[divisorTroca] 10 V é a tensão no resistor de 10 Ω; a tensão em aberto é a do de 20 Ω.',
    E: '[divIgual] Dividiu a tensão e a resistência ao meio, como se os resistores fossem iguais.' } },
  'a:T4:b5:1': { d: 'm', conta: '10+5', w: {
    A: '[seriePar] 3,33 Ω = 10 ∥ 5: com a fonte de corrente aberta, os dois resistores ficam em série.',
    B: '[fonteAberta] 5 Ω sai de pôr a fonte de corrente em curto, o que elimina o resistor de 10 Ω. Fonte de corrente zerada é circuito aberto.',
    C: '[semFator] 10 Ω esqueceu o resistor de 5 Ω, em série até o terminal.',
    E: '[fonteAberta] Abrir a fonte de corrente não abre o circuito: o resistor de 10 Ω continua ligando os terminais através do de 5 Ω.' } },
  'a:T4:b5:2': { d: 'f', conta: '12/4', w: {
    B: '[seriePar] No Norton a fonte de corrente fica em paralelo com a resistência; em série, a fonte de corrente imporia 3 A a qualquer carga.',
    C: '[invertida] 48 A = 12 × 4: multiplicou em vez de dividir.',
    D: '[formula] Tomou os 12 V como se fossem ampères e mudou a resistência: R<sub>N</sub> = R<sub>th</sub> = 4 Ω.',
    E: '[invertida] 0,33 A = 4/12: inverteu a divisão.' } },
  'a:T4:b5:3': { d: 'f', conta: '8/(4+12)', w: {
    B: '[semRth] 0,67 A = 8/12: esqueceu a R<sub>th</sub> em série com a carga.',
    C: '[sinal] 1 A = 8/(12 − 4): subtraiu a R<sub>th</sub> em vez de somar.',
    D: '[semFator] 2 A = 8/4 é a corrente de curto (sem a carga).',
    E: '[invertida] 3 = 12/4: dividiu as resistências, sem usar a tensão.' } },
  'a:T4:b5:4': { d: 'm', conta: '20**2/(4*5)', w: {
    A: '[formula] 5 W = 1² × 5: usou I = V<sub>th</sub>/(4R<sub>th</sub>) = 1 A, mas com R<sub>L</sub> = R<sub>th</sub> a corrente é V<sub>th</sub>/(2R<sub>th</sub>) = 2 A.',
    B: '[formula] 10 W = V<sub>th</sub>·I/4 = 20 × 2/4: misturou as fórmulas; com 2 A em 5 Ω, a carga recebe 2² × 5 = 20 W.',
    D: '[outra] 40 W = V<sub>th</sub>²/(2R<sub>th</sub>) é a potência total da fonte equivalente, metade na carga e metade em R<sub>th</sub>.',
    E: '[sem4] 80 W = V<sub>th</sub>²/R<sub>th</sub>: esqueceu o 4 da máxima transferência.' } },
  'a:T4:b5:5': { d: 'f', conta: '12/4', w: {
    A: '[invertida] 0,33 Ω = 4/12: inverteu a divisão (I/V).',
    C: '[formula] 8 = 12 − 4: subtraiu tensão e corrente, grandezas diferentes.',
    D: '[formula] 16 = 12 + 4: somou tensão e corrente.',
    E: '[invertida] 48 = 12 × 4: multiplicou (isso daria uma potência, em watts).' } },
  'a:T4:b5:6': { d: 'f', w: {
    A: '[oposto] Nos sistemas de potência se busca rendimento alto; a máxima transferência tem rendimento de só 50%.',
    B: '[oposto] Com R<sub>L</sub> = 0 (curto), a carga não recebe potência nenhuma.',
    D: '[oposto] R<sub>L</sub> ≫ R<sub>th</sub> dá rendimento alto, mas a potência na carga fica abaixo da máxima.',
    E: '[exagero] Na máxima transferência metade da potência fica em R<sub>th</sub>.' } },

  /* ---------- banco (BANK) ---------- */
  'f:t4:1': { mod: 'E1', d: 'm', w: {
    A: '[oposto] A potência nominal só vale com 127 V em cada uma; em série, brilha mais a de maior resistência, a de 60 W.',
    C: '[detalhe] A corrente é a mesma, mas as resistências são diferentes: P = R·I² é diferente em cada uma.',
    D: '[detalhe] Cada lâmpada recebe só parte dos 127 V: nenhuma dissipa a potência nominal.',
    E: '[exagero] A de 60 W fica com a maior parte da tensão (cerca de 79 V), mas não com toda; recebe menos que a nominal e não queima.' } },
  'f:t4:2': { mod: 'E1', d: 'f', w: {
    A: '[seriePar] Apagar todas é o que acontece na ligação em série.',
    C: '[detalhe] Cada ramo continua com a tensão da fonte; as outras lâmpadas não recebem a corrente da que queimou.',
    D: '[oposto] A resistência equivalente aumenta, mas a tensão em cada lâmpada continua a mesma, e o brilho também.',
    E: '[detalhe] Com fonte ideal não há transitório que faça as lâmpadas piscarem.' } },
  'f:t4:3': { mod: 'E1', h: '2.5', d: 'm', w: {
    A: '[exagero] Os equivalentes reproduzem o que se vê nos terminais, não o que acontece dentro: em aberto, o Thévenin não dissipa nada e o Norton dissipa I<sub>N</sub>²·R<sub>N</sub>.',
    C: '[detalhe] Os teoremas valem para qualquer circuito linear, com uma ou várias fontes.',
    D: '[invertida] A resistência de Norton é igual à de Thévenin, não o inverso.',
    E: '[invertida] I<sub>N</sub> = V<sub>th</sub>/R<sub>th</sub>: divide pela resistência, não multiplica.' } },
  'f:t4:4': { mod: 'E1', d: 'm', w: {
    A: '[oposto] Curto entre espiras diminui a resistência medida, não aumenta.',
    C: '[detalhe] O aumento de 15% com o enrolamento quente é o esperado: cerca de 38 °C de elevação.',
    D: '[oposto] Um condutor rompido daria resistência infinita (circuito aberto).',
    E: '[detalhe] A seção do fio não muda entre uma medida e outra.' } },
  'f:t4:5': { mod: 'E1', h: '2.5', d: 'f', w: {
    A: '[exagero] O sentido arbitrado é só referência; um resultado negativo não é erro.',
    C: '[detalhe] O sinal da corrente não diz se a malha tem fontes.',
    D: '[detalhe] A lei das malhas vale para qualquer circuito; o sinal só indica o sentido.',
    E: '[detalhe] Um sinal negativo não indica fonte em curto.' } },
  'f:t4:6': { mod: 'E1', h: '7.3', d: 'm', w: {
    A: '[oposto] O voltímetro em paralelo reduz a resistência do trecho, e a tensão lida cai, não sobe.',
    C: '[detalhe] Só o voltímetro ideal (resistência infinita) leria a tensão real; este tem resistência baixa.',
    D: '[exagero] A leitura cai, mas não a zero: o voltímetro tem resistência finita, não nula.',
    E: '[detalhe] O voltímetro lê a tensão do trecho onde está ligado, não a da fonte.' } },
};

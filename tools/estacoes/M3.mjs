/* Estação M3: máquinas rotativas, proteção de baixa tensão e partidas (itens 5.2, 5.4, 5.5, 5.6 e 5.7 do Anexo IV).
   Aprofundamento escrito para o app (fontes/maquinas-rotativas-protecao-partidas.html), no formato das apostilas do
   estudante; aqui ficam os metadados, o resumo, os cartões, o V ou F e as contas. As questões da aba Questões são os
   exercícios do fim de cada seção mais as de tools/banco/M3.mjs (extra), com a explicação de cada alternativa.
   Gerar: node tools/estacao.mjs fontes/maquinas-rotativas-protecao-partidas.html M3 */
const R3 = 'Math.sqrt(3)';

export default {
  fonte: 'fontes/maquinas-rotativas-protecao-partidas.html',
  meta: {
    id: 'M3', vol: 'EL', line: 'M',
    title: 'Máquinas rotativas, proteção e partidas',
    itens: '5.2, 5.4–5.7', faixa: 'A', peso2023: 5,
    note: 'Motor CC shunt, corrente de fase de um gerador síncrono e partida estrela-triângulo caíram em 2023 (questões 29, 30 e 38; a 30 foi anulada). O peso de 5 é o do item 5 inteiro, dividido com a M2.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  labs: { lab1: 'motor-placa', lab2: 'escorregamento', lab3: 'partida-motor', lab4: 'motor-cc' },
  trocas: [],
  resumo: [
    ['Motor: placa e corrente', 'A placa dá a potência no eixo: I<sub>L</sub> = P<sub>u</sub>/(√3·V<sub>L</sub>·η·cos φ); C ≈ 9.550·P(kW)/n.'],
    ['Indução: campo e escorregamento', 'n<sub>s</sub> = 120·f/p (p = polos); s = (n<sub>s</sub> − n)/n<sub>s</sub>; f<sub>r</sub> = s·f; o rotor nunca chega a n<sub>s</sub>.'],
    ['Máquina síncrona', 'Gira em n<sub>s</sub>, sem escorregamento. Sobre-excitada fornece reativo; parte pelo amortecedor.'],
    ['Máquina CC', 'Motor: V = E + R<sub>a</sub>I<sub>a</sub>. Shunt: I<sub>a</sub> = I<sub>L</sub> − V/R<sub>f</sub>; P<sub>u</sub> = E·I<sub>a</sub> − perdas rotacionais.'],
    ['Proteção do motor', 'Curto: fusível ou disjuntor. Sobrecarga: relé térmico. Contator só manobra; AC-3 = motor de gaiola.'],
    ['Partidas', 'Y-Δ: I e C a 1/3, rede = tensão de Δ. Compensadora: linha e conjugado × k². Inversor: V/f.'],
  ],
  cards: [
    ['A potência na placa de um motor é a absorvida ou a do eixo?', 'A do eixo (útil, mecânica). A absorvida é P<sub>u</sub>/η.'],
    ['Motor de 22 kW, 380 V, η = 0,92, FP = 0,85: corrente de linha?', 'I = 22.000/(√3 × 380 × 0,92 × 0,85) ≈ 42,7 A.'],
    ['Como se calcula o conjugado a partir da potência e da rotação?', 'C = P/ω, com ω = 2πn/60; atalho: C ≈ 9.550·P(kW)/n(rpm).'],
    ['Quanto vale 1 cv?', '0,736 kW (o hp, unidade inglesa, vale cerca de 0,746 kW).'],
    ['O que é o fator de serviço 1,15?', 'O motor aceita 15% acima da potência nominal continuamente, nas condições especificadas.'],
    ['Classes de isolamento B, F e H: temperaturas?', 'B = 130 °C, F = 155 °C, H = 180 °C (IEC 60085).'],
    ['Velocidade síncrona de um motor de 4 polos em 60 Hz e em 50 Hz?', '1.800 rpm e 1.500 rpm (n<sub>s</sub> = 120·f/p).'],
    ['Motor de 60 Hz com 3.500 rpm na placa: quantos polos e qual o escorregamento?', '2 polos (3.600 rpm); s = 100/3.600 ≈ 2,8%.'],
    ['Por que a corrente de partida do motor de indução é tão alta?', 'Com o rotor parado (s = 1), não há rotação para reduzir a tensão induzida no rotor: só a impedância de dispersão limita a corrente.'],
    ['Como inverter o sentido de um motor de indução trifásico?', 'Trocando duas fases quaisquer da alimentação.'],
    ['Que número de polos precisa um gerador síncrono acionado a 150 rpm para dar 60 Hz?', 'p = 120 × 60/150 = 48 polos.'],
    ['Quatro condições para pôr um gerador em paralelo?', 'Mesma tensão, mesma frequência, mesma sequência de fases e mesmo ângulo de fase.'],
    ['Motor síncrono sobre-excitado: que fator de potência apresenta?', 'Capacitivo: fornece reativo à rede, como um banco de capacitores (compensador síncrono).'],
    ['Motor CC shunt de 230 V, 30 A da rede, R<sub>f</sub> = 115 Ω, R<sub>a</sub> = 0,3 Ω: fcem?', 'I<sub>f</sub> = 2 A, I<sub>a</sub> = 28 A; E = 230 − 0,3 × 28 = 221,6 V.'],
    ['Por que o motor CC série não pode trabalhar a vazio?', 'O fluxo vem da corrente de armadura; sem carga, o fluxo cai e a velocidade dispara.'],
    ['O relé térmico protege contra curto-circuito?', 'Não: só sobrecarga e falta de fase. O curto fica com o fusível ou o disjuntor a montante.'],
    ['Na estrela-triângulo, para que corrente se escolhem K1, K2, K3 e o relé?', 'K1, K2 e relé: 0,58·I<sub>n</sub> (I<sub>n</sub>/√3); K3: 0,33·I<sub>n</sub>.'],
    ['Motor 220/380 V numa rede de 380 V: dá para partir em estrela-triângulo?', 'Não: a rede precisa ter a tensão de triângulo do motor (220 V aqui). Em 380 V, ele já trabalha em estrela.'],
    ['Compensadora no tap de 65%: corrente na linha e conjugado?', 'Os dois a 0,65² ≈ 42% dos valores da partida direta.'],
    ['Soft-starter × inversor: qual controla a velocidade?', 'O inversor (varia f, com V/f constante). A soft-starter só faz uma rampa de tensão.'],
  ],
  vf: [
    ['A potência indicada na placa de um motor de indução é a potência mecânica disponível no eixo.', true, 'A placa dá a potência útil. A absorvida da rede é P<sub>u</sub>/η.'],
    ['Um motor de indução de 6 polos ligado em 60 Hz gira, a vazio, exatamente a 1.200 rpm.', false, 'O rotor do motor de indução nunca alcança a velocidade síncrona: a vazio ele fica <b>pouco abaixo</b> de 1.200 rpm.'],
    ['Na fórmula n<sub>s</sub> = 120·f/p, o p é o número de polos do motor.', true, 'É o número de polos (2, 4, 6…). Quem usa pares de polos escreve 120·f/(2p).'],
    ['Com o rotor bloqueado, a frequência das correntes no rotor de um motor de indução é igual à da rede.', true, 'f<sub>r</sub> = s·f, e com o rotor parado s = 1.'],
    ['Para inverter o sentido de rotação de um motor de indução trifásico, basta trocar a ligação de estrela para triângulo.', false, 'A ligação Y/Δ muda a tensão em cada bobina. Para inverter o sentido, trocam-se <b>duas fases</b> da alimentação.'],
    ['Uma máquina síncrona funcionando como motor gira na velocidade síncrona, qualquer que seja a carga, até o seu conjugado máximo.', true, 'Não há escorregamento; acima do conjugado máximo, ela perde o sincronismo.'],
    ['Um motor síncrono subexcitado fornece potência reativa à rede e melhora o fator de potência da instalação.', false, 'É o contrário: quem fornece reativo é o motor <b>sobre-excitado</b>. Subexcitado, ele absorve reativo.'],
    ['Num motor CC shunt, a corrente de armadura é igual à corrente absorvida da rede.', false, 'A corrente da rede se divide: I<sub>a</sub> = I<sub>L</sub> − I<sub>f</sub>, com I<sub>f</sub> = V/R<sub>f</sub>.'],
    ['Na partida de um motor CC, a corrente de armadura é limitada só pela resistência do circuito de armadura, porque ainda não há força contraeletromotriz.', true, 'Com n = 0, E = 0: I<sub>a</sub> = V/R<sub>a</sub>, por isso o reostato de partida.'],
    ['O contator de um circuito de motor protege o motor contra sobrecargas.', false, 'O contator só faz a manobra. A sobrecarga é com o relé térmico (ou o disjuntor-motor).'],
    ['Um relé de sobrecarga de classe 10 deve atuar em até 10 s com 7,2 vezes a corrente de ajuste.', true, 'É a definição da classe de disparo na IEC 60947-4-1; classes 20 e 30 servem a partidas longas.'],
    ['Na partida estrela-triângulo, a corrente de partida na linha cai a cerca de 1/√3 da corrente de partida direta.', false, 'Cai a <b>1/3</b>: a tensão na bobina cai a 1/√3, e a corrente de linha cai a (1/√3)².'],
    ['Na chave compensadora, a corrente de partida na linha cai na proporção do quadrado do tap.', true, 'No tap k: k·I<sub>p</sub> no motor e k²·I<sub>p</sub> na linha; o conjugado também cai com k².'],
    ['A soft-starter reduz a corrente de partida variando a frequência aplicada ao motor.', false, 'A soft-starter varia a <b>tensão</b>, por tiristores. Quem varia a frequência é o inversor.'],
  ],
  contas: [
    /* seção 1 */
    ['60000/(2*Math.PI)', '= 9.549', 'Conjugado no eixo'],
    ['30/0.93', '32,26 kW', 'Exemplo resolvido 1'], ['30/0.93-30', '2,26 kW', 'Exemplo resolvido 1'],
    [`30000/(${R3}*380*0.93*0.86)`, '56,99 A', 'Exemplo resolvido 1'], ['9550*30/1770', '161,9 N·m', 'Exemplo resolvido 1'], ['30/0.736', '40,8 cv', 'Exemplo resolvido 1'],
    /* seção 2 */
    ['120*60/2', '3.600', 'Velocidade síncrona (do campo girante)'], ['120*60/8', '900', 'Velocidade síncrona (do campo girante)'], ['120*50/10', '600', 'Velocidade síncrona (do campo girante)'],
    ['120*60/6', '1.200 rpm', 'Exemplo resolvido 2'], ['(1200-1164)/1200*100', '= 3%', 'Exemplo resolvido 2'], ['0.03*60', '1,8 Hz', 'Exemplo resolvido 2'],
    ['0.025*20000', '500 W', 'Exemplo resolvido 3'], ['0.975*20000', '19.500 W', 'Exemplo resolvido 3'], ['1800*(1-0.025)', '1.755 rpm', 'Exemplo resolvido 3'],
    /* seção 3 */
    ['120*60/4', '1.800 rpm', 'Exemplo resolvido 4'], ['120*60/200', '36 polos', 'Exemplo resolvido 4'],
    [`250000/(${R3}*440)`, '328,0 A', 'Exemplo resolvido 5'], [`250000/(${R3}*440)/${R3}`, '189,4 A', 'Exemplo resolvido 5'], ['250000/(3*440)', '= 189,4 A', 'Exemplo resolvido 5'],
    /* seção 4 */
    ['220/110', '2 A', 'Exemplo resolvido 6'], ['42-2', '40 A', 'Exemplo resolvido 6'], ['220-0.25*40', '210 V', 'Exemplo resolvido 6'],
    ['210*40', '8.400 W', 'Exemplo resolvido 6'], ['8400-400', '8.000 W', 'Exemplo resolvido 6'], ['220*42', '9.240 W', 'Exemplo resolvido 6'],
    ['8000/9240*100', '86,6%', 'Exemplo resolvido 6'], ['0.25*40**2', '= 400 W', 'Exemplo resolvido 6'], ['220*2', '440 W', 'Exemplo resolvido 6'], ['400+440+400', '1.240 W', 'Exemplo resolvido 6'],
    ['220/0.25', '880 A', 'Exemplo resolvido 7'], ['880/40', '22 vezes', 'Exemplo resolvido 7'], ['220/80', '2,75 Ω', 'Exemplo resolvido 7'], ['2.75-0.25', '2,5 Ω', 'Exemplo resolvido 7'],
    /* seção 5 */
    ['7.5*28', '210 A', 'Exemplo resolvido 8'], ['1.2*28', '33,6 A', 'Exemplo resolvido 8'],
    /* seção 6 */
    ['0.65**2', 'k² = 0,42', 'Chave compensadora (autotransformador)'],
    ['7*52', '364 A', 'Exemplo resolvido 9'], ['364/3', '121,3 A', 'Exemplo resolvido 9'], ['0.65*364', '236,6 A', 'Exemplo resolvido 9'],
    ['0.65**2*364', '153,8 A', 'Exemplo resolvido 9'], ['0.65**2*100', '42,25%', 'Exemplo resolvido 9'], ['0.8**2*364', '233,0 A', 'Exemplo resolvido 9'],
    ['0.58*52', '30,2 A', 'Exemplo resolvido 9'], ['0.33*52', '17,2 A', 'Exemplo resolvido 9'], [`52/${R3}`, '30,0 A', 'Exemplo resolvido 9'],
    /* exercícios */
    [`15000/(${R3}*380*0.9*0.84)`, '≈ 30,1 A', 'Exercícios de fixação da seção 1'], [`15000/(3*380*0.9*0.84)`, '17,4 A usa', 'Exercícios de fixação da seção 1'],
    [`15000/(${R3}*380*0.9)`, '25,3 A esquece', 'Exercícios de fixação da seção 1'], [`15000/(${R3}*380*0.84)`, '27,1 A esquece', 'Exercícios de fixação da seção 1'], ['15000/(380*0.9*0.84)', '52,2 A esquece', 'Exercícios de fixação da seção 1'],
    ['11000/(2*Math.PI*1750/60)', '≈ 60,0 N·m', 'Exercícios de fixação da seção 1'], ['11000/1750', '6,3 N·m divide', 'Exercícios de fixação da seção 1'], ['9549.3*11/1800', '58,4 N·m usa', 'Exercícios de fixação da seção 1'],
    ['9549.3*(11/0.736)/1750', '81,6 N·m põe', 'Exercícios de fixação da seção 1'], ['11000/(1750/60)', '377 N·m converte', 'Exercícios de fixação da seção 1'],
    ['75*0.736', '= 55,2 kW', 'Exercícios de fixação da seção 1'], ['75*0.736/0.92', '= 60,0 kW', 'Exercícios de fixação da seção 1'], ['75*0.736*0.92', '50,8 kW multiplica', 'Exercícios de fixação da seção 1'], ['75/0.92', '81,5 kW divide', 'Exercícios de fixação da seção 1'],
    ['(900-873)/900*100', '= 3,0%', 'Exercícios de fixação da seção 2'], ['27/873*100', '3,1% divide', 'Exercícios de fixação da seção 2'], ['(1800-873)/1800*100', '51,5% usa', 'Exercícios de fixação da seção 2'], ['873/900*100', '97% é', 'Exercícios de fixação da seção 2'],
    ['(1800-1746)/1800*60', '= 1,8 Hz', 'Exercícios de fixação da seção 2'], ['1746/60', '29,1 Hz é', 'Exercícios de fixação da seção 2'], ['0.97*60', '58,2 Hz é', 'Exercícios de fixação da seção 2'],
    ['(1200-1165)/1200*100', 's ≈ 2,9%', 'Exercícios de fixação da seção 2'], ['(3600-1165)/3600*100', '68%', 'Exercícios de fixação da seção 2'], ['(1800-1165)/1800*100', '35%', 'Exercícios de fixação da seção 2'],
    ['120*60/6', '= 1.200 rpm, exatamente', 'Exercícios de fixação da seção 3'], ['6*60', '360 rpm multiplica', 'Exercícios de fixação da seção 3'], ['1200*0.97', '1.164 rpm desconta', 'Exercícios de fixação da seção 3'],
    [`300000/(${R3}*480)`, '≈ 360,8 A', 'Exercícios de fixação da seção 3'], [`300000/(${R3}*480)/${R3}`, '≈ 208,3 A', 'Exercícios de fixação da seção 3'], [`300000/(${R3}*480)/3`, '120,3 A divide', 'Exercícios de fixação da seção 3'],
    [`300000*0.8/(${R3}*480)/${R3}`, '166,7 A usa', 'Exercícios de fixação da seção 3'], ['300000/480', '625,0 A divide', 'Exercícios de fixação da seção 3'],
    ['250-0.2*60', '= 238 V', 'Exercícios de fixação da seção 4'], ['238*60', '= 14.280 W', 'Exercícios de fixação da seção 4'], ['238*60-600', '13.680 W', 'Exercícios de fixação da seção 4'],
    ['250*62/1000', '15,5 kW é', 'Exercícios de fixação da seção 4'], ['(250*62-600)/1000', '14,9 kW desconta', 'Exercícios de fixação da seção 4'], ['(238*60-600-500)/1000', '13,2 kW desconta', 'Exercícios de fixação da seção 4'],
    ['220/50', '= 4,4 Ω', 'Exercícios de fixação da seção 4'], ['220/0.4', '550 A', 'Exercícios de fixação da seção 4'], ['220/40-0.4', '5,1 Ω usa', 'Exercícios de fixação da seção 4'],
    ['45/3', '≈ 15 A', 'Exercícios de fixação da seção 5'], ['0.58*45', '26 A (0,58', 'Exercícios de fixação da seção 5'],
    [`19000/(${R3}*380)`, '≈ 28,9 A', 'Exercícios de fixação da seção 6'], [`7*19000/(${R3}*380)`, '≈ 202,1 A', 'Exercícios de fixação da seção 6'], [`7*19000/(${R3}*380)/3`, '≈ 67,4 A', 'Exercícios de fixação da seção 6'],
    [`7*19000/(${R3}*380)/${R3}`, '116,7 A divide', 'Exercícios de fixação da seção 6'], [`19000/(${R3}*380)/3`, '9,6 A divide', 'Exercícios de fixação da seção 6'],
    ['0.8**2*300', '= 192 A', 'Exercícios de fixação da seção 6'], ['0.8*300', '240 A (0,8', 'Exercícios de fixação da seção 6'], ['300/0.8', '375 A divide', 'Exercícios de fixação da seção 6'],
  ],
};

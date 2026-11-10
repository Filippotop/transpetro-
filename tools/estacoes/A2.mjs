/* Estação A2: automação industrial, CLP e controle em malha fechada (itens 9.3, 9.4 e 9.5 do Anexo IV).
   Aprofundamento escrito para o app (fontes/automacao-clp-controle.html), no formato das apostilas do estudante; aqui
   ficam os metadados, o resumo, os cartões, o V ou F e as contas. As questões da aba Questões são os exercícios do fim
   de cada seção mais as de tools/banco/A2.mjs (extra), com a explicação de cada alternativa.
   Gerar: node tools/estacao.mjs fontes/automacao-clp-controle.html A2 */
export default {
  fonte: 'fontes/automacao-clp-controle.html',
  meta: {
    id: 'A2', vol: 'EL', line: 'A',
    title: 'Automação, CLP e controle',
    itens: '9.3–9.5', faixa: 'A', peso2023: 6,
    note: 'Em 2023 caíram PID pelos sintomas (35), pull-up de entrada de CLP (36), ganho crítico por Routh (50) e função de transferência de um RLC (51). O peso de 6 é o do item 9 inteiro, dividido com a A1.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  labs: { lab1: 'escala-analogica', lab2: 'pullup-clp', lab3: 'routh-3' },
  trocas: [],
  resumo: [
    ['Automação em níveis', 'Campo (sensores) → controle (CLP) → supervisão (SCADA, IHM) → MES → ERP.'],
    ['Sensores e entradas', 'Indutivo: metal. Capacitivo: qualquer material. PNP fornece +V (carga ao 0 V); NPN leva ao 0 V.'],
    ['Sinal 4 a 20 mA', 'x = L<sub>inf</sub> + (I − 4)/16·faixa. 12 mA = meio; 0 mA = falha. A/D: faixa/2<sup>n</sup>.'],
    ['CLP e Ladder', 'Varredura: lê entradas, executa, atualiza saídas. Botão NF no campo = contato NA no programa.'],
    ['Temporizadores e contadores', 'TON atrasa o ligar, TOF o desligar, TP dá pulso. CTU conta bordas até PV.'],
    ['Controle e modelagem', 'P deixa offset, I zera, D amortece. T = G/(1 + GH); 3ª ordem: K crítico = a·b.'],
  ],
  cards: [
    ['Que sensor detecta só metais, sem contato?', 'O indutivo (o capacitivo detecta também plástico, líquidos e grãos).'],
    ['Sensor PNP de três fios: onde se liga a carga ou a entrada do CLP?', 'Entre a saída e o 0 V: acionado, o PNP fornece o positivo. No NPN, a carga vai do +V à saída.'],
    ['Entrada de 24 V, R<sub>in</sub> = 5 kΩ, ALTO a partir de 18 V, pull-up de até 0,5 W: faixa de R?', 'De 24²/0,5 = 1.152 Ω até 5.000 × 6/18 ≈ 1.667 Ω.'],
    ['Transmissor de 0 a 10 bar em 4 a 20 mA: que pressão corresponde a 12 mA?', '5 bar: 12 mA é o meio da faixa ((12 − 4)/16 = 0,5).'],
    ['Por que o 4 a 20 mA começa em 4 mA?', 'Zero vivo: 0 mA indica falha (cabo rompido), e os 4 mA alimentam o transmissor de dois fios.'],
    ['Resolução de um conversor A/D de 12 bits em 0 a 10 V?', '2<sup>12</sup> = 4.096 níveis; 10 V/4.096 ≈ 2,44 mV.'],
    ['Quais as etapas do ciclo de varredura do CLP?', 'Lê as entradas (tabela-imagem), executa o programa, atualiza as saídas; depois diagnóstico e comunicação.'],
    ['Quais as cinco linguagens citadas da IEC 61131-3?', 'Ladder (LD), FBD, SFC (gráficas), ST e IL (textuais). A IL saiu da edição de 2025.'],
    ['Botão de parada NF ligado à entrada do CLP: que contato usar no programa?', 'NA: em repouso a entrada vale 1, e o NA passa; ao apertar, o bit vai a 0 e abre.'],
    ['Como se faz o selo em Ladder?', 'Contato NA da própria saída em paralelo com o botão de liga.'],
    ['Como se faz o intertravamento da reversão em Ladder?', 'Contato NF de cada saída em série com a bobina da outra; no campo, mantém-se o intertravamento com os auxiliares dos contatores.'],
    ['TON, TOF e TP: o que cada um faz?', 'TON atrasa o ligar (zera se a entrada cai); TOF atrasa o desligar; TP dá um pulso de duração PT.'],
    ['TON com base de 100 ms e preset 50: quanto tempo?', '50 × 0,1 s = 5 s.'],
    ['O que conta um CTU?', 'As bordas de subida da entrada CU; Q liga quando CV ≥ PV; R zera.'],
    ['Malha aberta × malha fechada?', 'Na fechada, a saída é medida e comparada com a referência, e o erro comanda a ação.'],
    ['Qual ação do PID elimina o erro em regime?', 'A integral. A proporcional só o reduz; a derivativa reage à variação do erro e amortece.'],
    ['Na Laplace, o que viram a derivada e a integral? E as impedâncias de L e C?', 'Derivar = × s; integrar = ÷ s. Z<sub>L</sub> = Ls; Z<sub>C</sub> = 1/(Cs).'],
    ['Malha fechada com realimentação negativa: fórmula?', 'T = G/(1 + G·H); os polos são as raízes de 1 + GH = 0.'],
    ['T(s) = K/(s³ + 6s² + 11s + K): K crítico?', 'K = 6 × 11 = 66; oscila com ω = √11 ≈ 3,32 rad/s.'],
  ],
  vf: [
    ['O sensor indutivo detecta peças de plástico e de madeira, desde que estejam próximas da face sensora.', false, 'O indutivo só detecta <b>metais</b>. Plástico e madeira pedem o sensor capacitivo ou o óptico.'],
    ['Num sensor de três fios com saída NPN, a carga é ligada entre o positivo da alimentação e o fio de saída.', true, 'Acionado, o NPN leva a saída ao 0 V, e a corrente vem do +V através da carga.'],
    ['O sistema supervisório (SCADA) substitui o CLP: se o computador de supervisão parar, o processo para de ser controlado.', false, 'O SCADA <b>supervisiona</b>; quem controla é o CLP, que continua rodando o programa sem o supervisório.'],
    ['Num transmissor de 4 a 20 mA, uma leitura de 0 mA indica que a variável está no início da faixa calibrada.', false, 'O início da faixa é <b>4 mA</b>. 0 mA é falha: cabo rompido ou transmissor sem alimentação (zero vivo).'],
    ['Um conversor A/D de 10 bits divide a faixa de entrada em 1.024 níveis.', true, '2<sup>10</sup> = 1.024.'],
    ['Durante a execução do programa, o CLP usa o estado das entradas lido no início do ciclo de varredura.', true, 'O programa usa a tabela-imagem das entradas; uma mudança no meio do ciclo só é vista no ciclo seguinte.'],
    ['Se o botão de parada for NF no campo, o contato correspondente no programa Ladder também deve ser NF.', false, 'Deve ser <b>NA</b>: com o botão em repouso a entrada vale 1, e o contato do programa examina o bit, não o botão.'],
    ['Contatos em série num degrau Ladder realizam a função lógica E; contatos em paralelo, a função OU.', true, 'Série = E (AND); paralelo = OU (OR); contato NF = NÃO (NOT).'],
    ['O temporizador TON acumula o tempo em que a entrada ficou ligada, mesmo que ela desligue no meio da contagem.', false, 'O TON <b>zera</b> quando a entrada cai. Quem acumula é o temporizador retentivo (RTO), de alguns fabricantes.'],
    ['O temporizador TOF liga a saída junto com a entrada e a mantém ligada pelo tempo programado depois que a entrada desliga.', true, 'É o retardo na desenergização (off delay).'],
    ['Com controle apenas proporcional, o aumento do ganho elimina completamente o erro em regime permanente, sem efeitos colaterais.', false, 'O ganho maior <b>reduz</b> o erro, sem zerá-lo, e tende a trazer oscilação. Quem zera o erro em regime é a ação integral.'],
    ['A ação derivativa de um PID amplifica o ruído presente no sinal de medição.', true, 'Ela responde à taxa de variação, e o ruído varia depressa.'],
    ['Um sistema linear é estável se todos os polos de malha fechada têm parte real negativa.', true, 'Todos no semiplano esquerdo do plano s. Polos sobre o eixo imaginário dão oscilação mantida (limite).'],
    ['Para T(s) = K/(s³ + a·s² + b·s + K), com a e b positivos, o sistema é estável para qualquer K positivo.', false, 'Pelo critério de Routh, só para <b>0 &lt; K &lt; a·b</b>; acima disso, instável.'],
  ],
  contas: [
    /* seção 2 */
    ['5000*(24-18)/18', '1.666,7 Ω', 'Exemplo resolvido 1'], ['24**2/0.5', '1.152 Ω', 'Exemplo resolvido 1'],
    ['24*5000/6500', '18,46 V', 'Exemplo resolvido 1'], ['24**2/1500', '0,384 W', 'Exemplo resolvido 1'],
    /* seção 3 */
    ['(12.8-4)/16', '= 0,55', 'Exemplo resolvido 2'], ['50+(12.8-4)/16*200', '160 °C', 'Exemplo resolvido 2'], ['4+16*(100-50)/200', '8 mA', 'Exemplo resolvido 2'],
    ['12.8/20*200+50', '178 °C', 'Exemplo resolvido 2'], ['0.55*250', '137,5 °C', 'Exemplo resolvido 2'],
    ['2**12', '4.096 níveis', 'Exemplo resolvido 3'], ['10/2**12*1000', '2,44 mV', 'Exemplo resolvido 3'],
    ['2500/4000*400', '250 L/min', 'Exemplo resolvido 3'], ['400/4000', '0,1 L/min', 'Exemplo resolvido 3'],
    /* seção 4 */
    ['2*20', '40 ms', 'Exemplo resolvido 4'],
    /* seção 6 */
    ['50*0.1', '5 s', 'Exemplo resolvido 6'], ['12/90*60', '8 s', 'Exemplo resolvido 6'],
    /* seção 7 */
    ['80+4/2', '82 °C', 'Exemplo resolvido 7'], ['80-4/2', '78 °C', 'Exemplo resolvido 7'], ['100/2.5', '40%', 'Exemplo resolvido 7'],
    /* seção 8 */
    ['10000*100e-6', '1 s', 'Exemplo resolvido 8'], ['(1-Math.exp(-1))*100', '63,2%', 'Exemplo resolvido 8'],
    ['2.5*4', '= 10', 'Exemplo resolvido 8'], ['10/11', '0,909', 'Exemplo resolvido 8'], ['1/11*100', '9,1%', 'Exemplo resolvido 8'],
    ['10/12', '0,833', 'Malha fechada e polos'],
    ['6*11', '= 66', 'Exemplo resolvido 9'], ['Math.sqrt(11)', '3,32 rad/s', 'Exemplo resolvido 9'],
    /* exercícios */
    ['8000*(24-20)/20', '1.600 Ω', 'Exercícios de fixação da seção 2'], ['24**2/0.5', '1.152 Ω', 'Exercícios de fixação da seção 2'],
    ['24*8/9.5', '20,2 V', 'Exercícios de fixação da seção 2'], ['24**2/820', '0,70 W', 'Exercícios de fixação da seção 2'], ['24**2/1000', '0,58 W', 'Exercícios de fixação da seção 2'],
    ['24*8/10.2', '18,8 V', 'Exercícios de fixação da seção 2'], ['24*8/11.3', '17,0 V', 'Exercícios de fixação da seção 2'],
    ['(14-4)/16*8', '= 5,0 m', 'Exercícios de fixação da seção 3'], ['(20-14)/16*8', '3,0 m mede', 'Exercícios de fixação da seção 3'], ['(14-4)/20*8', '4,0 m divide', 'Exercícios de fixação da seção 3'],
    ['14/20*8', '5,6 m trata', 'Exercícios de fixação da seção 3'], ['14/16*8', '7,0 m divide', 'Exercícios de fixação da seção 3'],
    ['-20+6.5/10*100', '= 45 °C', 'Exercícios de fixação da seção 3'], ['0.65*80-20', '32 °C multiplica', 'Exercícios de fixação da seção 3'], ['0.65*80', '52 °C é', 'Exercícios de fixação da seção 3'],
    ['10/4096*1000', '≈ 2,44 mV', 'Exercícios de fixação da seção 3'], ['10/2**11*1000', '4,88 mV usa', 'Exercícios de fixação da seção 3'], ['10/1024*1000', '9,77 mV é', 'Exercícios de fixação da seção 3'],
    ['10/256*1000', '39,1 mV,', 'Exercícios de fixação da seção 3'], ['10/12', '0,83 V divide', 'Exercícios de fixação da seção 3'],
    ['24/(120/60)', '= 12 s', 'Exercícios de fixação da seção 6'], ['24/120', '0,2 s é', 'Exercícios de fixação da seção 6'], ['250*0.01', '= 2,5 s', 'Exercícios de fixação da seção 6'],
    ['60-6/2', 'religa a 57 °C', 'Exercícios de fixação da seção 7'], ['60+6/2', 'desliga a 63 °C', 'Exercícios de fixação da seção 7'],
    ['8*17', '= 136', 'Exercícios de fixação da seção 8'], ['Math.sqrt(17)', '4,1 é', 'Exercícios de fixação da seção 8'],
    ['1/9*100', '≈ 11,1%', 'Exercícios de fixação da seção 8'], ['8/9*100', '≈ 88,9%', 'Exercícios de fixação da seção 8'], ['1/8*100', '12,5% é', 'Exercícios de fixação da seção 8'],
  ],
};

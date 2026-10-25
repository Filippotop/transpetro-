/* Revisão do banco, tema T3 (simbologia e comandos) → M1 (os comandos de iluminação de vários pontos → I1).
   Formato: ver o comentário do topo de tools/banco.mjs. Cada alternativa errada diz qual erro leva a ela. */
const CMD1_O = ['F7 (95-96), em série com S0', 'S0, o botão de desligar', 'K1 (13-14), em paralelo com S1', 'K1 (23-24), no ramo do sinaleiro H1', 'F7 (97-98), no ramo do sinaleiro H2'];
export default {
  /* ---------- seção 1: tipos de diagrama ---------- */
  'a:T3:b1:0': { d: 'f', w: {
    A: '[tipoDiagrama] O trifilar desenha cada condutor separadamente; não representa o sistema por uma linha só.',
    C: '[tipoDiagrama] O diagrama de ligações mostra a posição física dos componentes e os bornes, para a montagem.',
    D: '[tipoDiagrama] O funcional mostra a lógica do comando (botões, contatos, bobinas), não o sistema de potência.',
    E: '[tipoDiagrama] Diagrama de blocos lógicos representa funções lógicas (automação, eletrônica digital), não proteções e seções de condutores.' } },
  'a:T3:b1:1': { d: 'f', w: {
    A: '[detalhe] O desenho mostra o estado de repouso por convenção; um contato aberto no diagrama não indica defeito.',
    B: '[oposto] Os diagramas mostram tudo desenergizado e sem acionamento; se K1 estivesse energizado, o 13-14 estaria fechado.',
    D: '[naNf] Quem fecha na sobrecarga é o 97-98 do relé de sobrecarga, não um contato auxiliar do contator.',
    E: '[naNf] O NF aparece fechado no repouso; terminação 3-4 é de contato NA.' } },
  'a:T3:b1:2': { d: 'f', w: {
    A: '[tipoDiagrama] O unifilar dá a visão geral do sistema, sem posição física nem bornes.',
    B: '[tipoDiagrama] O funcional mostra a lógica do comando, sem compromisso com a posição física.',
    D: '[tipoDiagrama] O trifilar de força mostra os condutores fase a fase, mas não o percurso dos fios nem a numeração dos bornes no painel.',
    E: '[tipoDiagrama] Referência cruzada é a indicação, no próprio diagrama, de onde estão os contatos de cada bobina; não é o diagrama de montagem.' } },
  'a:T3:b1:3': { d: 'm', w: {
    A: '[funcaoDisp] K não é motor (M), F7 não é fusível, S não é sensor (B) e H não é transformador (T).',
    C: '[funcaoDisp] K é contator (disjuntor é Q), F é proteção (contator é K), S é comando (sinaleiro é H) e H é sinalização.',
    D: '[funcaoDisp] Acerta o contator, mas F7 é o relé de sobrecarga (os fusíveis costumam ser F1–F3) e troca S0 com H1.',
    E: '[funcaoDisp] K1 é contator (temporizador seria KT), F7 não é disjuntor (Q) e H1 não é motor (M).' } },
  'a:T3:b1:4': { d: 'f', w: {
    A: '[tipoDiagrama] O unifilar representa as três fases numa linha só: justamente o detalhe fase a fase fica escondido.',
    C: '[tipoDiagrama] O diagrama de blocos mostra o fluxo de energia ou de sinal entre partes, sem os condutores.',
    D: '[tipoDiagrama] A planta baixa mostra o trajeto dos eletrodutos no edifício, não a ligação de cada fase no disjuntor.',
    E: '[tipoDiagrama] O funcional mostra a lógica do comando (bobinas e contatos), não os condutores de força.' } },
  /* ---------- seção 2: unifilar, planta e ANSI ---------- */
  'a:T3:b2:0': { d: 'f', w: {
    A: '[simbolo] Os traços contam condutores, não circuitos.',
    B: '[simbolo] Os traços não indicam corrente de proteção; a corrente do disjuntor é escrita junto do símbolo dele.',
    D: '[simbolo] Os traços não indicam tensão.',
    E: '[simbolo] Os traços não indicam altura de instalação.' } },
  'a:T3:b2:1': { d: 'f', w: {
    A: '[detalhe] A corrente nominal dos disjuntores consta do unifilar: é dado de proteção.',
    B: '[detalhe] A seção dos condutores de cada circuito consta do unifilar.',
    C: '[detalhe] A identificação dos circuitos e das cargas consta do unifilar.',
    D: '[detalhe] Os circuitos protegidos por DR aparecem no unifilar.' } },
  'a:T3:b2:2': { d: 'm', w: {
    A: '[exagero] A NBR 5444 foi cancelada em 2014; não é norma vigente, embora seus símbolos continuem em uso.',
    B: '[detalhe] A NBR 5410 trata de instalações de baixa tensão, não de símbolos, e não substituiu a NBR 5444.',
    D: '[detalhe] A NBR 5444 tratava de instalações prediais, isto é, de baixa tensão.',
    E: '[detalhe] A NR-10 trata de segurança em eletricidade; não incorporou norma de simbologia.' } },
  'a:T3:b2:3': { d: 'f', w: {
    A: '[simbolo] Trocou os dois primeiros: a letra é o interruptor que comanda o ponto, e o número entre traços é o circuito.',
    C: '[simbolo] A letra não é bitola e o número entre traços não é quantidade de lâmpadas.',
    D: '[simbolo] Nenhuma dessas indicações é o quadro, o número de fases ou a tensão.',
    E: '[simbolo] A letra não é o tipo de lâmpada, e o número entre traços não é altura.' } },
  'a:T3:b2:4': { d: 'm', w: {
    A: '[ansi] Seccionadora é 89, e subtensão é 27.',
    C: '[ansi] 52 é disjuntor, mas o relé diferencial é o 87.',
    D: '[ansi] 52 não é transformador de corrente, e sobretensão é 59.',
    E: '[ansi] 52 não é fusível, e o relé de bloqueio é o 86.' } },
  'a:T3:b2:5': { d: 'm', w: {
    A: '[ansi] A proteção térmica (temperatura) é 49 ou 26.',
    B: '[ansi] Acúmulo de gases é o relé 63 (Buchholz).',
    D: '[ansi] Subtensão é o 27.',
    E: '[ansi] Sobrecarga de longa duração é proteção térmica (49) ou de sobrecorrente temporizada (51).' } },
  /* ---------- seção 3: contatos e dispositivos ---------- */
  'a:T3:b3:0': { d: 'f', w: {
    A: '[naNf] Os contatos principais de força são numerados de 1 a 6 (1-2, 3-4, 5-6).',
    B: '[naNf] A bobina é marcada A1-A2.',
    D: '[naNf] Segundo dígito 3-4 indica NA; o NF tem segundo dígito 1-2 (como 21-22).',
    E: '[naNf] O NA do relé de sobrecarga é o 97-98.' } },
  'a:T3:b3:1': { d: 'f', w: {
    A: '[naNf] O 21-22 tem segundo dígito 1-2: é NF.',
    B: '[naNf] O 13-14 tem segundo dígito 3-4: é NA.',
    D: '[naNf] Inverteu: 3-4 é NA e 1-2 é NF.',
    E: '[naNf] Os principais são numerados de 1 a 6; dois dígitos indicam contatos auxiliares.' } },
  'a:T3:b3:2': { d: 'f', w: {
    A: '[funcaoDisp] Em paralelo com a botoeira de liga fica o selo, um NA do próprio contator.',
    C: '[funcaoDisp] No circuito de força fica o elemento sensor (térmico) do relé; o 95-96 é contato de comando.',
    D: '[seriePar] Em paralelo com a bobina, abrir o contato não a desligaria. Para desligar, ele precisa estar em série.',
    E: '[naNf] Para sinalização se usa o 97-98 (NA); o 95-96 interrompe a bobina.' } },
  'a:T3:b3:3': { d: 'f', w: {
    A: '[oposto] Os auxiliares são para comando e sinalização, com correntes baixas; quem leva a corrente do motor são os principais.',
    B: '[naNf] Os principais são numerados de 1 a 6; dois dígitos (como 13-14) indicam auxiliares.',
    D: '[detalhe] Ao energizar a bobina todos os contatos mudam juntos: os NA fecham e os NF abrem.',
    E: '[naNf] Os contatos principais de um contator são NA: fecham quando a bobina energiza.' } },
  'a:T3:b3:4': { d: 'f', w: {
    A: '[naNf] O botão de emergência desliga: é NF, e vermelho. Verde e NA é o botão de ligar.',
    C: '[naNf] Um NA em paralelo com o selo ajudaria a manter o contator ligado: o contrário de uma emergência.',
    D: '[detalhe] A emergência é acionada pela pessoa, na hora; não tem temporização nem acionamento automático.',
    E: '[funcaoDisp] Fim de curso é acionado pela própria máquina numa posição; a emergência é um botão de acionamento manual.' } },
  'a:T3:b3:5': { d: 'f', h: '5.6', w: {
    A: '[funcaoDisp] Inverteu as funções: o relé protege contra sobrecarga, e os fusíveis contra curto-circuito.',
    B: '[funcaoDisp] Nenhum dos dois é proteção contra sobretensão: os dois atuam por sobrecorrente.',
    D: '[funcaoDisp] Os fusíveis de motor não protegem o enrolamento contra sobrecargas moderadas e longas; isso é do relé.',
    E: '[detalhe] O relé de sobrecarga mede a corrente do motor; não tem relação com a bobina do contator.' } },
  /* ---------- seção 4: lógica de comando ---------- */
  'a:T3:b4:0': { d: 'f', w: {
    A: '[naNf] Um NF em série com a botoeira de desliga não mantém nada: o selo é um NA em paralelo com a de liga.',
    C: '[funcaoDisp] O 95-96 é do relé de sobrecarga e fica em série; em paralelo com a bobina, nada faria.',
    D: '[seriePar] Um NA do contator em série com o desliga impediria a partida: ele só fecha depois que K1 energiza.',
    E: '[detalhe] Sem um contato do próprio contator não há retenção: ao soltar S1, a bobina desenergiza.' } },
  'a:T3:b4:1': { d: 'f', w: {
    A: '[seriePar] Inverteu: em série, seria preciso apertar os dois botões de liga ao mesmo tempo, e os de desliga em paralelo não desligariam.',
    C: '[seriePar] Os botões de liga em série exigiriam os dois apertados juntos para ligar.',
    D: '[seriePar] Os de desliga em paralelo não desligam: abrir um deixa a corrente passar pelo outro.',
    E: '[seriePar] Botoeiras em paralelo com a bobina curto-circuitariam a bobina, não a comandariam.' } },
  'a:T3:b4:2': { d: 'm', w: {
    A: '[naNf] Com NA em série, K2 só poderia ligar com K1 ligado: é lógica de sequência, não de intertravamento.',
    C: '[seriePar] Bobinas em série dividem a tensão: nenhuma receberia a tensão nominal, e as duas ligariam juntas (ou nenhuma).',
    D: '[funcaoDisp] O 95-96 é do relé de sobrecarga e não sabe qual contator está ligado.',
    E: '[seriePar] Um NF de K1 em paralelo com a própria bobina de K1 não impede K2 de ligar.' } },
  'a:T3:b4:3': { d: 'f', w: {
    A: '[naNf] Um NF de K1 em série com K2 faria o contrário: impediria K2 de ligar com K1 ligado (intertravamento).',
    C: '[detalhe] Inverteu quem condiciona quem: um NA de K2 no ramo de K1 faria K1 depender de K2.',
    D: '[funcaoDisp] O 97-98 é do relé de sobrecarga e só fecha na falha; não indica que K1 está ligado.',
    E: '[seriePar] Bobinas em paralelo ligariam sempre juntas, sem condição de sequência.' } },
  'a:T3:b4:4': { d: 'd', w: {
    A: '[formula] Tudo em OU: qualquer elemento, até o S0 ou o F7 acionados, ligaria o contator.',
    C: '[formula] Tudo em E e sem negação: só ligaria com S0 e F7 acionados e com K1 já ligado, o que é impossível.',
    D: '[formula] Põe os NF em OU (bastaria um deles fechado) e perde o selo: K1 desligaria ao soltar S1.',
    E: '[formula] K̄1 inverte o selo: assim que K1 ligasse, sua própria condição o desligaria.' } },
  'a:T3:b4:5': { d: 'd', h: '9.4', w: {
    A: '[naNf] Com o botão NF solto, I1 = 1; um contato NF de I1 no programa ficaria aberto e o motor nunca ligaria.',
    C: '[funcaoDisp] Botão é entrada do CLP; bobina de saída é para atuadores, como o contator.',
    D: '[funcaoDisp] S0 está na entrada I1; um contato da saída do contator não representa o botão.',
    E: '[exagero] O CLP executa o programa como foi escrito; não corrige a lógica sozinho.' } },
  'a:T3:b4:6': { d: 'm', w: {
    A: '[naNf] 21-22 de K1 é NF: acenderia com o motor parado; e 95-96 é NF: acenderia sem falha.',
    C: '[ordem] Inverteu os dois: o 95-96 acenderia o sinaleiro sem falha, e o 13-14 é o de motor ligado.',
    D: '[naNf] A1-A2 é a bobina, não um contato.',
    E: '[naNf] 21-22 de K1 é NF: acende com o motor desligado.' } },
  /* ---------- seção 5: partidas e defeitos ---------- */
  'a:T3:b5:0': { d: 'f', h: '5.7', w: {
    A: '[detalhe] A polaridade da bobina do contator não muda o motor; quem muda o sentido é a sequência de fases nos terminais dele.',
    C: '[detalhe] Trocar as três em rodízio mantém a sequência e o sentido.',
    D: '[detalhe] Ligar o neutro numa fase não inverte o campo girante; é ligação errada.',
    E: '[detalhe] Reduzir a tensão não inverte o sentido; só diminui o conjugado.' } },
  'a:T3:b5:1': { d: 'f', h: '5.7', w: {
    A: '[exagero] Não é uma simples parada: as duas fases trocadas ficam ligadas diretamente entre si.',
    C: '[detalhe] Não há redução de corrente: há um curto-circuito entre fases.',
    D: '[detalhe] A reversão não muda a ligação estrela/triângulo do motor.',
    E: '[detalhe] As bobinas dos contatores não são afetadas; o problema é nos contatos principais.' } },
  'a:T3:b5:2': { d: 'm', h: '5.7', w: {
    A: '[ordem] O motor parte em estrela (tensão reduzida por bobina) e passa a triângulo, não o contrário.',
    C: '[ordem] Os três juntos ligariam estrela e triângulo ao mesmo tempo: curto-circuito.',
    D: '[detalhe] O contator de estrela é o da partida; não tem papel de frenagem.',
    E: '[ordem] Estrela e triângulo fechados juntos dão curto-circuito; por isso são intertravados.' } },
  'a:T3:b5:3': { d: 'd', h: '5.7', w: {
    A: '[detalhe] Com três terminais não há como mudar a ligação: a estrela-triângulo exige seis terminais acessíveis.',
    C: '[exagero] Doze terminais não são obrigatórios; basta que a tensão de triângulo seja a da rede.',
    D: '[exagero] A partida estrela-triângulo é típica do motor de gaiola; não exige rotor bobinado.',
    E: '[linhaFase] Um motor 220/380 V em 380 V só pode ficar em estrela: em triângulo, cada bobina receberia 380 V.' } },
  'a:T3:b5:4': { d: 'm', w: {
    A: '[detalhe] Com o relé desarmado, o 95-96 fica aberto e o motor não ligaria nem com S1 pressionado.',
    B: '[detalhe] Com S0 em curto, o motor não desligaria pelo S0; não explicaria desligar ao soltar S1.',
    D: '[detalhe] Fusível de força queimado impede o motor de girar normalmente; não depende de S1 estar apertado.',
    E: '[detalhe] Com a bobina queimada o contator não fecharia, nem com S1 pressionado.' } },
  'a:T3:b5:5': { d: 'm', w: {
    A: '[detalhe] Bobina em curto queimaria o fusível de comando; não acenderia o sinaleiro do relé de sobrecarga.',
    C: '[detalhe] Um S1 defeituoso impede a partida, mas não acende o sinaleiro de falha.',
    D: '[detalhe] Sequência invertida faz o motor girar ao contrário; não impede a partida nem atua o relé.',
    E: '[detalhe] Um selo em paralelo com S0 impediria o desligamento; não acende o sinaleiro de sobrecarga.' } },

  /* ---------- banco (BANK) ---------- */
  'f:t3:1': { mod: 'M1', d: 'm', w: {
    A: '[detalhe] Fechar já na energização e abrir depois do tempo é o temporizador de impulso (intervalo), não o de retardo na energização.',
    C: '[oposto] O contato muda de estado com a bobina energizada, depois do tempo; não na desenergização.',
    D: '[naNf] O contato é NA: depois do tempo ele fecha, não abre.',
    E: '[oposto] Manter o contato por um tempo depois de desenergizar é o retardo na desenergização.' } },
  'f:t3:2': { mod: 'M1', d: 'f', w: {
    A: '[oposto] Um NF em série com a bobina desliga ao ser acionado; não liga o motor.',
    C: '[detalhe] Inverter o sentido exigiria o outro contator (o de fechamento); este fim de curso só interrompe a abertura.',
    D: '[funcaoDisp] Proteção contra sobrecarga é do relé de sobrecarga, pela corrente, não pela posição.',
    E: '[funcaoDisp] Falta de fase é detectada por relé próprio (ou pelo de sobrecarga), não por fim de curso.' } },
  'f:t3:3': { mod: 'M1', h: '1.1', d: 'f', w: {
    A: '[ansi] Sobrecorrente é 50/51.',
    C: '[ansi] Diferença entre correntes de entrada e saída é a proteção diferencial, 87.',
    D: '[ansi] Temperatura é 49 ou 26.',
    E: '[ansi] Acúmulo de gases é o relé 63 (Buchholz).' } },
  'f:t3:4': { mod: 'M1', h: '9.4', d: 'f', w: {
    A: '[detalhe] Intertravamento usa um contato NF de outra saída em série; um NA da própria saída em paralelo é retenção.',
    C: '[oposto] O arranjo não impede: ele mantém a saída ligada depois que o botão é solto.',
    D: '[funcaoDisp] Temporização exige um bloco temporizador; o contato da própria saída só retém.',
    E: '[oposto] A autorretenção é a forma clássica de selo no Ladder; é permitida.' } },
  'f:t3:5': { mod: 'I1', h: '8.1', d: 'm', w: {
    A: '[seriePar] Simples em paralelo: qualquer um liga, mas nenhum desliga se outro estiver fechado.',
    C: '[seriePar] Simples em série: só acende com os três fechados ao mesmo tempo.',
    D: '[detalhe] Os intermediários só funcionam entre dois interruptores paralelos, nas pontas; três intermediários não fecham o circuito.',
    E: '[detalhe] O bipolar interrompe dois condutores ao mesmo tempo; não faz o comando de um ponto por vários locais.' } },
  'f:t3:6': { mod: 'M1', d: 'm', w: {
    A: '[simbolo] As correntes dos contatos estão no catálogo do contator, não sob a bobina.',
    C: '[simbolo] Os bornes da bobina são A1-A2, marcados junto dela; a lista sob a bobina é outra coisa.',
    D: '[simbolo] Os contatos mudam todos juntos; a lista não é uma sequência de fechamento.',
    E: '[simbolo] Quem comanda K1 aparece no próprio ramo da bobina; a lista abaixo dela mostra onde estão os contatos de K1.' } },
  'h:t3:selo': { mod: 'M1', d: 'f', conv: {
    s: 'No diagrama de comando da partida direta mostrado na figura, o contato que mantém o contator K1 energizado depois que o botão S1 é solto é o',
    o: CMD1_O, a: 2,
    c: 'É o contato auxiliar NA 13-14 de K1, em paralelo com S1: o contato de selo (retenção). Quando K1 energiza, ele fecha e passa a conduzir no lugar de S1.' }, w: {
    A: '[funcaoDisp] O 95-96 é o NF do relé de sobrecarga, em série: abre na sobrecarga, mas não substitui o S1.',
    B: '[naNf] S0 é o NF de desligar, em série; não forma caminho paralelo ao S1.',
    D: '[detalhe] O 23-24 também é NA de K1, mas está no ramo do sinaleiro H1 (motor ligado), não em paralelo com S1.',
    E: '[naNf] O 97-98 é o NA do relé de sobrecarga: fecha na falha e acende H2.' } },
  'h:t3:falha': { mod: 'M1', d: 'f', conv: {
    s: 'No diagrama de comando da partida direta mostrado na figura, o contato que acende o sinaleiro de falha (H2) quando o relé de sobrecarga atua é o',
    o: CMD1_O, a: 4,
    c: 'O 97-98 é o contato NA do relé de sobrecarga: fecha quando ele atua e alimenta H2. Ao mesmo tempo, o 95-96 (NF) abre e desliga a bobina.' }, w: {
    A: '[naNf] O 95-96 é NF e abre na falha: desliga a bobina, não acende sinaleiro.',
    B: '[funcaoDisp] S0 é o botão de desligar; não tem relação com o relé de sobrecarga.',
    C: '[detalhe] O 13-14 de K1 é o selo, em paralelo com S1.',
    D: '[detalhe] O 23-24 de K1 acende H1 (motor ligado), não o sinaleiro de falha.' } },
  'h:t3:inter': { mod: 'M1', d: 'm', conv: {
    s: 'No comando de reversão mostrado na figura, o contato que impede K1 de ser energizado enquanto K2 estiver ligado é o',
    o: ['K1 (13-14), em paralelo com S1', 'K2 (13-14), em paralelo com S2', 'K2 (21-22), em série com a bobina de K1', 'K1 (21-22), em série com a bobina de K2', 'F7 (95-96), comum aos dois ramos'], a: 2,
    c: 'É o NF 21-22 de K2, em série no ramo da bobina de K1. Com K2 energizado, ele abre e bloqueia K1. O NF 21-22 de K1 faz o mesmo no ramo de K2: é o intertravamento elétrico.' }, w: {
    A: '[funcaoDisp] O 13-14 de K1 é o selo do próprio K1.',
    B: '[funcaoDisp] O 13-14 de K2 é o selo do K2.',
    D: '[detalhe] Esse faz o intertravamento ao contrário: impede K2 de ligar enquanto K1 estiver ligado.',
    E: '[funcaoDisp] O 95-96 desliga os dois numa sobrecarga, mas não sabe qual contator está ligado.' } },
  'h:t3:gas': { mod: 'M1', h: '1.1', d: 'f', conv: {
    s: 'No diagrama unifilar da subestação mostrado na figura, a proteção que atua pelo acúmulo de gases provocado por uma falta interna no transformador é a identificada pelo número ANSI',
    o: ['49', '50/51', '52', '63', '89'], a: 3,
    c: '63 é o relé de gás/pressão (Buchholz), que detecta os gases gerados por arcos e aquecimento dentro do tanque. 49 é a proteção térmica; 50/51, a de sobrecorrente; 52, o disjuntor; 89, a seccionadora.' }, w: {
    A: '[ansi] 49 é a proteção térmica (temperatura), não a de gases.',
    B: '[ansi] 50/51 é a proteção de sobrecorrente (instantânea e temporizada).',
    C: '[ansi] 52 é o disjuntor: interrompe a corrente, mas não detecta nada.',
    E: '[ansi] 89 é a chave seccionadora.' } },
  'h:t3:52': { mod: 'M1', h: '1.1', d: 'm', conv: {
    s: 'No diagrama unifilar da subestação mostrado na figura, quando o relé 50/51 atua, o equipamento que efetivamente interrompe a corrente de falta no lado de média tensão é o',
    o: ['seccionador 89', 'transformador de corrente (TC)', 'disjuntor 52 do lado de média tensão', 'disjuntor 52 do lado de baixa tensão', 'relé 63'], a: 2,
    c: 'O relé só decide; quem interrompe a corrente é o disjuntor 52 do lado de média tensão, que recebe dele o comando de abertura. A seccionadora 89 não é feita para abrir correntes de falta.' }, w: {
    A: '[funcaoDisp] A seccionadora 89 é para manobra sem carga e isolamento visível; não interrompe corrente de falta.',
    B: '[funcaoDisp] O TC só mede a corrente e alimenta o relé.',
    D: '[detalhe] O 52 de baixa tensão fica do outro lado do transformador: não interrompe a corrente do lado de média.',
    E: '[ansi] O 63 é o relé de gás, outra proteção; e relé não interrompe corrente.' } },
  'o:t3:yd': { mod: 'M1', h: '5.7', d: 'm', conv: {
    s: 'Considere as etapas de uma partida estrela-triângulo:<br>I. O temporizador conta o tempo ajustado.<br>II. Fecha o contator de triângulo.<br>III. Pressiona-se S1, e fecham os contatores de rede e de estrela.<br>IV. Abre o contator de estrela.<br>V. O motor acelera ligado em estrela.<br>A sequência correta é',
    o: ['III, I, V, II, IV', 'III, V, I, II, IV', 'III, V, I, IV, II', 'III, II, V, I, IV', 'V, III, I, IV, II'], a: 2,
    c: 'S1 fecha rede e estrela (III); o motor acelera em estrela (V) enquanto o temporizador conta (I); vencido o tempo, abre o contator de estrela (IV) e só então fecha o de triângulo (II). Estrela e triângulo fechados juntos seriam um curto-circuito, por isso são intertravados.' }, w: {
    A: '[ordem] Conta o tempo antes de o motor acelerar e fecha o triângulo antes de abrir a estrela: os dois juntos dão curto-circuito.',
    B: '[ordem] Fecha o triângulo antes de abrir a estrela: os dois juntos dão curto-circuito.',
    D: '[ordem] Liga o triângulo logo na partida: o motor partiria com tensão plena por bobina, sem o ganho da estrela.',
    E: '[ordem] Põe o motor acelerando antes de S1 ligar os contatores.' } },
  'o:t3:selo': { mod: 'M1', d: 'f', conv: {
    s: 'Considere as etapas do funcionamento de uma partida direta com selo:<br>I. O contato 13-14 de K1 fecha.<br>II. Pressiona-se S0: a bobina desenergiza e o selo abre.<br>III. Em repouso, há tensão até S1 e até o contato 13-14 de K1, ambos abertos.<br>IV. Solta-se S1, e a corrente passa a circular pelo selo.<br>V. Pressiona-se S1, e a bobina de K1 é energizada.<br>A ordem correta é',
    o: ['III, I, V, IV, II', 'III, V, I, IV, II', 'III, V, IV, I, II', 'V, III, I, IV, II', 'III, V, I, II, IV'], a: 1,
    c: 'Do repouso (III), S1 energiza a bobina (V), o 13-14 fecha (I), S1 é solto e a corrente segue pelo selo (IV), até que S0 desliga tudo (II). O selo só existe porque o 13-14 fecha quando a bobina energiza.' }, w: {
    A: '[ordem] O 13-14 só fecha depois que a bobina de K1 é energizada.',
    C: '[ordem] Soltar S1 antes de o selo fechar desligaria o contator.',
    D: '[ordem] O estado de repouso vem antes de qualquer comando.',
    E: '[ordem] Depois de S0 desligar, o selo está aberto; soltar S1 então não faz a corrente circular por ele.' } },
};

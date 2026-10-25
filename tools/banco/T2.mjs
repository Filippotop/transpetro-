/* Revisão do banco, tema T2 (magnetismo e transformadores) → M2.
   Formato: ver o comentário do topo de tools/banco.mjs. Cada alternativa errada diz qual erro leva a ela. */
export default {
  /* ---------- seção 1: magnetismo ---------- */
  'a:T2:b1:0': { d: 'f', w: {
    A: '[oposto] Não existe monopolo magnético: cada pedaço continua com norte e sul.',
    B: '[exagero] Partir o ímã não destrói a orientação dos domínios: cada pedaço continua magnetizado.',
    D: '[oposto] Um ímã sempre tem os dois polos; dois nortes num pedaço não existem.',
    E: '[detalhe] Ímãs atraem materiais ferromagnéticos; os diamagnéticos são fracamente repelidos.' } },
  'a:T2:b1:1': { d: 'f', conta: '0.004/(20e-4)', w: {
    A: '[unidade] 0,2 T sai de converter 20 cm² em 0,02 m²; o certo é 20 × 10<sup>−4</sup> = 0,002 m².',
    B: '[invertida] 0,5 = 0,002/0,004: dividiu a área pelo fluxo (A/Φ), e não o fluxo pela área.',
    D: '[unidade] 20 T sai de converter 20 cm² em 0,0002 m² (uma potência de 10 a mais).',
    E: '[unidade] 200 T sai de converter 20 cm² em 20 × 10<sup>−6</sup> m², como se fossem mm².' } },
  'a:T2:b1:2': { d: 'f', w: {
    A: '[oposto] Por fora do ímã, as linhas saem do polo norte e entram no sul.',
    B: '[oposto] As linhas de campo magnético são fechadas: continuam por dentro do ímã, do sul para o norte.',
    D: '[oposto] Linhas de campo nunca se cruzam: no cruzamento o campo teria duas direções ao mesmo tempo.',
    E: '[oposto] Onde o campo é mais intenso, as linhas ficam mais juntas, não mais espaçadas.' } },
  'a:T2:b1:3': { d: 'f', w: {
    A: '[detalhe] O cobre é diamagnético (μ<sub>r</sub> ≈ 1) e não concentra fluxo; baixa resistividade serve aos enrolamentos, não ao núcleo.',
    B: '[detalhe] O alumínio é paramagnético, com μ<sub>r</sub> ≈ 1: não reduz a relutância do caminho do fluxo.',
    D: '[oposto] μ<sub>r</sub> menor que 1 é o diamagnético. O núcleo precisa de μ<sub>r</sub> muito alto.',
    E: '[oposto] Com núcleo de ar (μ<sub>r</sub> = 1), a relutância é enorme e a corrente de magnetização também.' } },
  'a:T2:b1:4': { d: 'f', h: '7.2', w: {
    A: '[unidSI] Trocou as duas primeiras: o fluxo é medido em weber, e a densidade de fluxo, em tesla.',
    C: '[unidSI] O henry é a unidade de indutância, e o ampère-espira, de força magnetomotriz.',
    D: '[unidSI] O gauss não é unidade do SI (1 T = 10<sup>4</sup> G), e henry por metro é a unidade da permeabilidade.',
    E: '[unidSI] Embaralhou as três: Φ em Wb, B em T e H em A/m.' } },
  /* ---------- seção 2: campo de correntes ---------- */
  'a:T2:b2:0': { d: 'm', conta: '4*Math.PI*1e-7*10/(2*Math.PI*0.05)', w: {
    A: '[formula] 2 × 10<sup>−5</sup> T é o campo a 10 cm: dobrou a distância.',
    C: '[formula] 8 × 10<sup>−5</sup> T é o campo a 2,5 cm: tomou 5 cm como diâmetro e usou a metade.',
    D: '[sem2pi] 2,5 × 10<sup>−4</sup> T = μ<sub>0</sub>I/r: esqueceu o 2π do denominador.',
    E: '[unidade] 4 × 10<sup>−3</sup> T sai de converter 5 cm em 0,0005 m (erro de 100 vezes na distância).' } },
  'a:T2:b2:1': { d: 'm', conta: '4*Math.PI*1e-7*500*2/0.2*1000', w: {
    A: '[unidade] 0,628 mT sai de usar l = 2 m: errou a conversão de 20 cm.',
    B: '[semFator] 3,14 mT = μ<sub>0</sub>·N/l: deixou de fora a corrente de 2 A.',
    D: '[unidade] 12,6 mT sai de usar l = 0,1 m, metade do comprimento.',
    E: '[unidade] 62,8 mT sai de usar l = 0,02 m: errou a conversão de 20 cm.' } },
  'a:T2:b2:2': { d: 'm', conta: '200*3/3e5*1000', w: {
    A: '[unidade] 0,2 mWb: errou a potência de 10 ao passar de Wb para mWb (2 × 10<sup>−3</sup> Wb = 2 mWb).',
    C: '[unidade] 20 mWb: errou a potência de 10 (2 × 10<sup>−3</sup> Wb = 2 mWb).',
    D: '[invertida] 500 = ℛ/ℱ = 3 × 10<sup>5</sup>/600: inverteu a divisão. Φ = ℱ/ℛ.',
    E: '[invertida] 1,8 × 10<sup>8</sup> = ℱ × ℛ: multiplicou em vez de dividir.' } },
  'a:T2:b2:3': { d: 'f', w: {
    A: '[detalhe] Linhas radiais saindo de um ponto são do campo elétrico de uma carga. O campo magnético de um condutor forma circunferências.',
    B: '[regraMao] Sentido horário seria o da corrente entrando na página. Com o polegar para fora, os dedos giram no sentido anti-horário.',
    D: '[detalhe] O campo de um condutor retilíneo envolve o condutor em circunferências; não é paralelo a ele.',
    E: '[oposto] Todo condutor com corrente cria campo magnético em volta (experimento de Ørsted), não só as bobinas.' } },
  'a:T2:b2:4': { d: 'f', w: {
    A: '[oposto] O aço-silício diminui a relutância (μ<sub>r</sub> alto) e, por isso, aumenta B.',
    B: '[semFator] Esqueceu a permeabilidade: B = μ<sub>r</sub>·μ<sub>0</sub>·N·I/l depende também do material do núcleo.',
    D: '[oposto] O aço concentra o fluxo, não o anula; blindagem magnética desvia o campo de uma região, não o zera dentro do núcleo.',
    E: '[detalhe] A resistividade do aço influi nas perdas por correntes parasitas, não no valor de B.' } },
  /* ---------- seção 3: força magnética ---------- */
  'a:T2:b3:0': { d: 'f', conta: '0.5*15*0.4', w: {
    A: '[angulo] 1,5 N = metade da força: usou sen 30° com o condutor perpendicular ao campo (sen 90° = 1).',
    C: '[semFator] 6 N = I·L = 15 × 0,4: esqueceu de multiplicar pelo campo B = 0,5 T.',
    D: '[semFator] 7,5 N = B·I: esqueceu o comprimento.',
    E: '[unidade] 30 N sai de converter 40 cm em 4 m.' } },
  'a:T2:b3:1': { d: 'f', w: {
    A: '[angulo] A força é máxima com o condutor perpendicular ao campo (sen 90° = 1); paralelo dá sen 0° = 0.',
    C: '[angulo] Metade da máxima seria com 30° entre condutor e campo (sen 30° = 0,5).',
    D: '[angulo] B·I·L é o valor com o condutor perpendicular ao campo; paralelo, a força é nula.',
    E: '[detalhe] A força magnética é sempre perpendicular ao condutor e ao campo; e aqui ela nem existe.' } },
  'a:T2:b3:2': { d: 'm', conta: '0.8*25*0.2', w: {
    A: '[regraMao] O módulo está certo, mas o sentido não: I·L para a direita (x̂) e B para fora (ẑ) dão x̂ × ẑ = −ŷ, para baixo.',
    C: '[regraMao] A força é perpendicular ao campo; com B saindo do plano, a força fica no plano da página.',
    D: '[semFator] 20 N = B·I: esqueceu o comprimento de 0,2 m.',
    E: '[semFator] 0,16 N = B·L: esqueceu a corrente.' } },
  'a:T2:b3:3': { d: 'f', w: {
    A: '[oposto] Correntes no mesmo sentido se atraem; e a força diminui com a distância (é inversamente proporcional a ela).',
    C: '[oposto] Cada corrente cria um campo que age sobre a outra: eles interagem justamente por conduzirem correntes.',
    D: '[detalhe] Em CA as duas correntes invertem juntas, e a atração continua; ela não é exclusiva da CC.',
    E: '[oposto] Repulsão é para correntes em sentidos opostos; e a força existe em qualquer frequência, inclusive em 60 Hz e em CC.' } },
  'a:T2:b3:4': { d: 'm', conta: '2e-7*2000*2000/0.2', w: {
    A: '[unidade] 0,4 N/m sai de usar d = 2 m: errou a conversão de 20 cm.',
    B: '[formula] 2 N/m usa 10<sup>−7</sup> (μ<sub>0</sub>/4π) no lugar de 2 × 10<sup>−7</sup> (μ<sub>0</sub>/2π).',
    D: '[formula] 8 N/m usa d = 10 cm: tomou a metade da distância entre eixos.',
    E: '[unidade] 40 N/m sai de usar d = 2 cm: errou a conversão de 20 cm.' } },
  /* ---------- seção 4: indução ---------- */
  'a:T2:b4:0': { d: 'f', conta: '100*(0.05-0.01)/0.2', w: {
    A: '[semFator] 0,2 V = ΔΦ/Δt: esqueceu de multiplicar pelo número de espiras.',
    B: '[unidade] 2 V sai de usar Δt = 2 s em vez de 0,2 s.',
    D: '[fluxoTotal] 25 V = 100 × 0,05/0,2: usou o fluxo inicial no lugar da variação (0,05 − 0,01 = 0,04 Wb).',
    E: '[unidade] 200 V sai de usar Δt = 0,02 s em vez de 0,2 s.' } },
  'a:T2:b4:1': { d: 'f', conta: '0.6*0.5*10', w: {
    A: '[semFator] 0,3 V = B·L: esqueceu a velocidade.',
    C: '[semFator] 6 V = B·v: esqueceu o comprimento do condutor.',
    D: '[invertida] 12 V = B·v/L: dividiu pelo comprimento em vez de multiplicar.',
    E: '[unidade] 30 V sai de usar L = 5 m em vez de 0,5 m.' } },
  'a:T2:b4:2': { d: 'f', w: {
    A: '[oposto] Não é preciso contato: basta o fluxo pela espira variar para haver indução.',
    B: '[regraMao] Um polo sul voltado para o ímã o atrairia e ajudaria a variação. Pela lei de Lenz, a corrente induzida se opõe a ela.',
    D: '[detalhe] A resistência da espira muda a intensidade da corrente, não o sentido, que é dado pela lei de Lenz.',
    E: '[oposto] Com o ímã parado, o fluxo não varia e não há corrente induzida.' } },
  'a:T2:b4:3': { d: 'f', conta: '0.5*4/0.01', w: {
    A: '[unidade] 0,2 V sai de usar Δt = 10 s: esqueceu o prefixo mili.',
    B: '[semFator] 2 V = L·Δi: esqueceu de dividir pelo tempo.',
    C: '[unidade] 20 V sai de usar Δt = 0,1 s em vez de 0,01 s.',
    E: '[unidade] 2.000 V sai de usar Δt = 1 ms em vez de 10 ms.' } },
  'a:T2:b4:4': { d: 'f', w: {
    A: '[oposto] O núcleo deve ter baixa relutância; silício e laminação não servem para aumentá-la.',
    B: '[detalhe] Perdas no cobre são dos enrolamentos (R·I²); silício e laminação mexem no núcleo, nas perdas no ferro.',
    D: '[oposto] O objetivo é o contrário: um bom núcleo exige pouca corrente de magnetização.',
    E: '[oposto] Remanência alta interessa a ímãs permanentes, não ao núcleo de um transformador.' } },
  'a:T2:b4:5': { d: 'f', w: {
    A: '[oposto] Laço largo e alta coercitividade são o material “duro” dos ímãs permanentes; num núcleo, dariam muita perda por ciclo.',
    C: '[oposto] Laço largo aumenta a perda por histerese; não reduz a corrente de magnetização.',
    D: '[detalhe] A histerese aparece justamente com o fluxo alternado: a perda se repete a cada ciclo (60 vezes por segundo).',
    E: '[oposto] Alta remanência é desejável em ímãs, não em núcleos: no transformador o que importa é laço estreito (baixa coercitividade, pouca perda por ciclo); reter fluxo ao desligar não tem utilidade.' } },
  /* ---------- seção 5: transformador ideal ---------- */
  'a:T2:b5:0': { d: 'f', conta: '2200*50/1000', w: {
    A: '[formula] 22 V = 2.200/100: usou uma relação de 100 : 1, cinco vezes maior que a real (1.000/50 = 20).',
    B: '[formula] 55 V = 2.200/40: dobrou a relação de espiras (40 em vez de 20).',
    D: '[outra] 220 V = 2.200/10: usou de cabeça a relação 10 : 1 dos transformadores 2.200/220 V, sem fazer a conta com as espiras dadas.',
    E: '[relInv] 44.000 V = 2.200 × 1.000/50: inverteu a relação, como se fosse um elevador.' } },
  'a:T2:b5:1': { d: 'f', conta: '10000/220', w: {
    A: '[ladoTroc] 4,55 A = 10.000/2.200 é a corrente do primário.',
    B: '[formula] 22,7 A = 5.000/220: usou metade da potência nominal.',
    D: '[formula] 100 A = 10.000/100: dividiu por 100 V, uma tensão que não existe no transformador.',
    E: '[unidade] 454,5 A = 100.000/220: errou o prefixo (10 kVA = 10.000 VA).' } },
  'a:T2:b5:2': { d: 'm', conta: '(2200/220)**2*5', w: {
    A: '[relInv] 0,05 Ω = 5/a²: refletiu do primário para o secundário, ao contrário.',
    B: '[relInv] 0,5 Ω = 5/a: inverteu e ainda usou a relação sem o quadrado.',
    C: '[relSimples] 50 Ω = a·Z: impedância reflete com a², não com a.',
    E: '[unidade] 5.000 Ω = 5 × 1.000: errou o quadrado de a = 10 (10² = 100).' } },
  'a:T2:b5:3': { d: 'm', w: {
    A: '[oposto] Em CC o fluxo é constante, e sem variação de fluxo não há tensão induzida no secundário.',
    B: '[exagero] Nada é induzido em CC; o secundário fica sem tensão.',
    D: '[oposto] O transformador não funciona em CC: a corrente do primário fica alta, limitada só pela resistência do cobre.',
    E: '[oposto] O núcleo não bloqueia a CC; ao contrário, sem a reatância (que é nula em CC), a corrente sobe muito.' } },
  'a:T2:b5:4': { d: 'm', conta: '220/(4.44*60*400)*1000', w: {
    A: '[unidade] 0,206 mWb: errou a potência de 10 (2,06 × 10<sup>−3</sup> Wb = 2,06 mWb).',
    C: '[pico] 2,92 mWb usa 311 V (pico) no lugar do eficaz; o 4,44 já trata da relação entre pico e eficaz.',
    D: '[semFator] 9,17 mWb = 220/(60 × 400): esqueceu o fator 4,44.',
    E: '[unidade] 20,6 mWb: errou a potência de 10 (2,06 × 10<sup>−3</sup> Wb = 2,06 mWb).' } },
  'a:T2:b5:5': { d: 'm', conta: '220*110/440', w: {
    A: '[oposto] Ser maior que 110 V não decide nada: compare a leitura com 220 − 55 = 165 V (subtrativa) e 220 + 55 = 275 V (aditiva).',
    C: '[oposto] A soma seria 220 + 55 = 275 V (aditiva); a leitura de 165 V é a diferença.',
    D: '[sinal] A conclusão está certa, mas a razão não: na subtrativa a leitura é a diferença, não a soma.',
    E: '[detalhe] O teste é feito justamente com tensão reduzida; a relação entre as leituras não depende do valor aplicado.' } },
  /* ---------- seção 6: transformador real ---------- */
  'a:T2:b6:0': { d: 'f', w: {
    A: '[oposto] As perdas no cobre à plena carga são medidas no ensaio de curto-circuito.',
    C: '[detalhe] A vazio não há carga: o wattímetro não mede a potência nominal.',
    D: '[detalhe] A impedância percentual sai do ensaio de curto-circuito.',
    E: '[detalhe] Dispersão de fluxo é uma reatância: não dissipa potência ativa, e “à plena carga” não é a condição deste ensaio.' } },
  'a:T2:b6:1': { d: 'f', w: {
    A: '[exagero] Tensão nominal com o secundário em curto seria um curto-circuito de verdade; o ensaio usa tensão reduzida.',
    C: '[detalhe] A corrente de magnetização é medida no ensaio a vazio.',
    D: '[oposto] No ensaio de curto o wattímetro mede as perdas no cobre; as do ferro são do ensaio a vazio.',
    E: '[oposto] Com o secundário em aberto o ensaio é o a vazio, não o de curto-circuito.' } },
  'a:T2:b6:2': { d: 'm', conta: '100*40000/(40000+300+700)', w: {
    A: '[formula] 95,2% = 40.000/42.000: contou as perdas em dobro.',
    C: '[usouS] 98,0% = 50.000/51.000: usou a potência aparente (kVA) no lugar da ativa.',
    D: '[semPerda] 98,3% = 40.000/40.700: esqueceu as perdas no ferro.',
    E: '[semPerda] 99,3% = 40.000/40.300: esqueceu as perdas no cobre.' } },
  'a:T2:b6:3': { d: 'f', conta: '0.5**2*700', w: {
    A: '[formula] 87,5 W = 0,5³ × 700: elevou ao cubo; as perdas no cobre variam com o quadrado da corrente.',
    C: '[cuLinear] 350 W reduz pela metade, como se a perda fosse proporcional à carga.',
    D: '[outra] 700 W são as perdas em plena carga; elas mudam com a carga.',
    E: '[oposto] 1.400 W dobra as perdas, como se elas subissem com a carga menor.' } },
  'a:T2:b6:4': { d: 'm', conta: 'Math.sqrt(300/1200)*100', w: { /* distrator A trocado na estação (BQ-1) */
    A: '[formula] 20% = 300/(300 + 1.200): dividiu a perda no ferro pela soma das perdas, fórmula que não existe.',
    B: '[semRaiz] 25% = 300/1.200: esqueceu a raiz quadrada de x = √(P<sub>Fe</sub>/P<sub>Cu</sub>).',
    D: '[formula] 75% = 1 − 300/1.200: subtraiu a relação das perdas de 1, em vez de tirar a raiz.',
    E: '[exagero] Supôs que o rendimento máximo é sempre na carga nominal; ele ocorre quando P<sub>Cu</sub> = P<sub>Fe</sub>.' } },
  'a:T2:b6:5': { d: 'm', conta: '(230-220)/220*100', w: { /* enunciado e comentário com a referência da regulação: troca na M2 */
    A: '[formula] 1,05% vem de 230/220 = 1,045: dividiu as tensões em vez de dividir a diferença.',
    B: '[formula] 4,35% divide por V<sub>vazio</sub> (230 V); o enunciado pede a regulação em relação à plena carga, então o denominador é 220 V.',
    D: '[percVolt] 10% usa a diferença em volts (230 − 220 = 10 V) como se fosse porcentagem.',
    E: '[unidade] 45,5% erra a vírgula: 10/220 = 0,0455, que é 4,55%.' } },
  /* ---------- seção 7: trifásicos e instrumentos ---------- */
  'a:T2:b7:0': { d: 'f', conta: '380/Math.sqrt(3)', w: {
    A: '[outraTensao] 127 V é a tensão fase-neutro de uma rede 220/127 V; esta é 380/220 V.',
    C: '[linhaFase] 380 V é a tensão de linha, entre duas fases; a carga está entre fase e neutro.',
    D: '[raiz3inv] 658 V = 380 × √3: multiplicou por √3 em vez de dividir.',
    E: '[ladoTroc] 7.967 V = 13,8 kV/√3 é do lado de alta, que, além disso, está em triângulo e não tem neutro.' } },
  'a:T2:b7:1': { d: 'f', conta: '150000/(Math.sqrt(3)*380)', w: { /* distrator E (682 → 684 A) corrigido na estação (BQ-1) */
    A: '[unidade] 22,8 A: errou a potência de 10 (150 kVA = 150.000 VA).',
    B: '[tres] 131,6 A = 150.000/(3 × 380): usou 3 no lugar de √3.',
    D: '[semRaiz3] 394,7 A = 150.000/380: esqueceu o √3.',
    E: '[raiz3inv] 684 A = 150.000 × √3/380: multiplicou por √3 em vez de dividir.' } },
  'a:T2:b7:2': { d: 'm', w: {
    A: '[horaGrau] Em fase seria índice 0 (Yy0, Dd0); o índice 1 vale 30°.',
    B: '[atrAdi] Adiantada 30° é o caso Dyn11 (330° de atraso). No Dyn1, a baixa fica atrasada.',
    D: '[horaGrau] O índice é uma “hora” do relógio, e cada hora vale 30°: 1 hora = 30°, não 1°.',
    E: '[horaGrau] 60° seria o índice 2 (duas horas).' } },
  'a:T2:b7:3': { d: 'm', w: {
    A: '[detalhe] Relações diferentes produzem correntes de circulação entre os transformadores: é condição obrigatória.',
    B: '[detalhe] Defasamentos diferentes põem tensões diferentes em paralelo, o que equivale a um curto: é obrigatório.',
    C: '[detalhe] Sequências diferentes também levam a curto entre fases: é obrigatório.',
    D: '[detalhe] Sem impedâncias percentuais próximas, a carga se divide mal e um deles sobrecarrega: é exigido.' } },
  'a:T2:b7:4': { d: 'f', w: {
    A: '[oposto] Secundário de TC aberto com o primário energizado é justamente o perigo: o núcleo satura e surgem tensões altas nos terminais.',
    C: '[detalhe] O primário é o próprio circuito de força: não se abre o circuito do painel para retirar um amperímetro.',
    D: '[oposto] Um resistor de alto valor equivale a deixar o secundário quase aberto, com a mesma sobretensão.',
    E: '[oposto] Desligar um terminal deixa o secundário aberto, mesmo com o outro aterrado.' } },
  'a:T2:b7:5': { d: 'f', conta: '200/5*3.5', w: {
    A: '[rtc] 3,5 A é a corrente no secundário, a leitura do instrumento; falta multiplicar pela RTC.',
    B: '[rtc] 87,5 A = 3,5 × 25: usou uma relação errada; a RTC é 200/5 = 40.',
    D: '[rtc] 175 A = 3,5 × 50: usou uma relação errada; a RTC é 200/5 = 40.',
    E: '[rtc] 200 A é a corrente nominal do primário, não a corrente medida.' } },

  /* ---------- banco (BANK) ---------- */
  'f:t2:1': { mod: 'M2', d: 'm', w: {
    A: '[detalhe] As perdas no ferro são do núcleo, e o fluxo é o mesmo com a tensão nominal aplicada a qualquer dos lados.',
    C: '[oposto] Pelo lado de alta a corrente a vazio existe; só é menor, na razão das tensões.',
    D: '[detalhe] A impedância percentual vem do ensaio de curto-circuito.',
    E: '[oposto] O lado de alta pode ser energizado com o outro aberto; só exigiria uma fonte de tensão alta, mais cara e mais perigosa.' } },
  'f:t2:2': { mod: 'M2', d: 'm', w: {
    A: '[detalhe] Um curto entre espiras não desaparece depois de alguns ciclos; a corrente alta e passageira na energização é normal.',
    C: '[detalhe] A resistência dos enrolamentos limita a corrente; não é ela que causa o pico.',
    D: '[oposto] O fenômeno ocorre na energização, inclusive a vazio; não depende de carga.',
    E: '[detalhe] Polaridade não altera a corrente de magnetização do próprio transformador.' } },
  'f:t2:3': { mod: 'M2', d: 'd', conta: '(60/50-1)*100', w: {
    A: '[oposto] Com E fixo, Φ<sub>máx</sub> é inversamente proporcional a f: em 50 Hz o fluxo aumenta, não diminui.',
    C: '[detalhe] A relação de tensões depende só das espiras; com a mesma tensão no primário, o secundário fica igual.',
    D: '[oposto] A relação de espiras não muda, mas o fluxo muda: Φ<sub>máx</sub> = E/(4,44·f·N).',
    E: '[detalhe] A relação de transformação é a relação de espiras, que não depende da frequência.' } },
  'f:t2:4': { mod: 'M2', d: 'f', w: {
    A: '[oposto] No autotransformador, parte do enrolamento é comum aos dois lados: não há isolação elétrica.',
    C: '[detalhe] Nenhum transformador funciona em CC, nem o autotransformador.',
    D: '[oposto] O rendimento costuma ser maior, porque só parte da potência passa por indução.',
    E: '[oposto] É usado justamente na partida de motores, nas chaves compensadoras.' } },
  'f:t2:5': { mod: 'M2', h: '5.1', d: 'm', w: {
    A: '[detalhe] O alumínio é paramagnético, não ferromagnético: quase não é atraído por ímãs.',
    C: '[detalhe] Histerese é fenômeno de materiais ferromagnéticos; o alumínio não tem.',
    D: '[detalhe] O atrito com o ar é desprezível e não depende do ímã; a frenagem cresce com o campo e com a velocidade.',
    E: '[detalhe] Não há carga elétrica acumulada: a força vem das correntes induzidas, não de efeito eletrostático.' } },
  'f:t2:6': { mod: 'M2', d: 'm', conta: '1000*100/5/1000',
    fix: { o: ['1 kA', '5 kA', '20 kA', '34,6 kA', '200 kA'], errata: 'BQ-1' }, w: {
    A: '[exagero] Supôs que a corrente de curto fica limitada à nominal; no curto, só a impedância do transformador (5%) limita a corrente.',
    B: '[invertida] 5 kA = 1.000 × 5: multiplicou pela impedância percentual em vez de dividir 100 por ela.',
    D: '[raiz3inv] 34,6 kA = 20 kA × √3: pôs um √3 a mais; a corrente nominal dada já é a de linha.',
    E: '[unidade] 200 kA usa Z = 0,5%: errou a vírgula da impedância percentual.' } },
  'f:t2:7': { mod: 'M2', h: '5.1', d: 'f', w: {
    A: '[oposto] Correntes em sentidos opostos se repelem; e a força diminui com a distância.',
    C: '[oposto] As correntes não se cancelam: cada uma está no seu condutor e cria um campo que age sobre a outra.',
    D: '[oposto] Em sentidos opostos a força é de repulsão, em CC ou em CA.',
    E: '[formula] A força é inversamente proporcional à distância (F/L = μ<sub>0</sub>I<sub>1</sub>I<sub>2</sub>/(2πd)), e não ao quadrado dela.' } },
  'h:t2:hc': { mod: 'M2', h: '5.1', d: 'f',
    /* Na cópia da questão, os rótulos B_r e −H_c viram P e Q, e saem a saturação e a legenda da área (dariam a resposta). */
    figTroca: [['B<tspan class="s-sub" dy="3">r</tspan><tspan dy="-3"> remanência</tspan>', 'P'], ['−H<tspan class="s-sub" dy="3">c</tspan><tspan dy="-3"> coercitividade</tspan>', 'Q']],
    figTira: ['saturação', 'a área interna do laço é proporcional à perda por histerese em cada ciclo'], conv: {
    s: 'A figura mostra o laço de histerese B × H de um material ferromagnético. A coercitividade do material corresponde',
    o: ['ao ponto P: o valor de B que permanece quando H volta a zero',
      'ao ponto Q: o campo H, em sentido contrário, necessário para anular B',
      'ao trecho em que B quase não cresce mais, mesmo com H aumentando muito',
      'à área interna do laço',
      'à inclinação da curva inicial na origem, B/H'],
    a: 1,
    c: 'Coercitividade (H<sub>c</sub>) é o campo em sentido contrário necessário para zerar B: o ponto Q, em que o laço corta o eixo H. O ponto P, em que o laço corta o eixo B, é a remanência (B<sub>r</sub>). Núcleos de transformador usam materiais de baixa coercitividade (laço estreito); ímãs permanentes, de alta.' }, w: {
    A: '[detalhe] O ponto P é a remanência (B<sub>r</sub>), o magnetismo que sobra com H = 0.',
    C: '[detalhe] Esse trecho é a saturação: o material não aceita mais fluxo.',
    D: '[detalhe] A área do laço é a energia perdida por ciclo (perda por histerese), não a coercitividade.',
    E: '[detalhe] A relação B/H é a permeabilidade do material.' } },
  'h:t2:req': { mod: 'M2', d: 'm', figTira: ['perdas no ferro (ensaio a vazio)', 'perdas no cobre (ensaio de curto)'], conv: {
    s: 'A figura mostra o circuito equivalente aproximado de um transformador. No ensaio de curto-circuito, a potência indicada pelo wattímetro corresponde, essencialmente, às perdas no elemento',
    o: ['R<sub>c</sub>, que representa as perdas no ferro', 'X<sub>m</sub>, que representa a magnetização do núcleo', 'R<sub>eq</sub>, que representa as perdas no cobre dos enrolamentos', 'X<sub>eq</sub>, que representa a dispersão de fluxo', 'R<sub>c</sub> e X<sub>m</sub> juntos, o ramo de magnetização'],
    a: 2,
    c: 'No ensaio de curto, circula a corrente nominal com tensão reduzida: o wattímetro mede as perdas no cobre, representadas por R<sub>eq</sub>. X<sub>eq</sub> não dissipa potência ativa, e R<sub>c</sub> representa as perdas no ferro, medidas no ensaio a vazio.' }, w: {
    A: '[detalhe] R<sub>c</sub> representa as perdas no ferro, medidas no ensaio a vazio. Com tensão reduzida, o fluxo e essas perdas ficam desprezíveis.',
    B: '[detalhe] X<sub>m</sub> é uma reatância: não dissipa potência ativa, e pertence ao ramo de magnetização (ensaio a vazio).',
    D: '[detalhe] X<sub>eq</sub> é uma reatância: entra na impedância percentual, mas não dissipa potência ativa.',
    E: '[detalhe] O ramo de magnetização é o que o ensaio a vazio mede; no curto, com tensão baixa, ele quase não conduz.' } },
  'o:t2:pol': { mod: 'M2', d: 'm', conv: {
    s: 'Considere as etapas do teste de polaridade de um transformador monofásico pelo método do voltímetro:<br>I. Medir a tensão entre H2 e o outro terminal de baixa tensão.<br>II. Interligar H1 ao terminal de baixa tensão adjacente a ele, com um jumper.<br>III. Comparar a leitura com as tensões dos dois enrolamentos.<br>IV. Aplicar uma tensão reduzida entre H1 e H2 (lado de alta).<br>V. Concluir: leitura igual à diferença das tensões, polaridade subtrativa; igual à soma, aditiva.<br>A ordem correta das etapas é',
    o: ['I, II, IV, III, V', 'II, IV, I, III, V', 'II, I, IV, V, III', 'IV, II, I, III, V', 'IV, I, II, III, V'],
    a: 1,
    c: 'Primeiro, com o transformador desligado, interliga-se H1 ao terminal de baixa adjacente (II). Depois se aplica a tensão reduzida (IV), mede-se entre H2 e o outro terminal de baixa (I), compara-se com as tensões dos enrolamentos (III) e conclui-se (V): a diferença indica polaridade subtrativa (o terminal ligado a H1 é o X1); a soma, aditiva.',
    errata: 'BQ-2' }, w: {
    A: '[ordem] Mede antes de interligar e de energizar: sem o jumper e sem tensão, a leitura não diz nada.',
    C: '[ordem] Mede antes de energizar e conclui antes de comparar a leitura com as tensões.',
    D: '[ordem] Energiza antes de pôr o jumper: a ligação deve ser feita com o transformador desligado, e a medida só faz sentido com ela feita.',
    E: '[ordem] Energiza e mede antes do jumper, quando a leitura ainda não serve para nada.' } },
};

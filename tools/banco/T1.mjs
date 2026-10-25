/* Revisão do banco, tema T1 (CA e trifásicos): blocos 1–4 da apostila → E2; blocos 5–6 → E3.
   Formato: ver o comentário do topo de tools/banco.mjs. Cada alternativa errada diz qual erro leva a ela. */
export default {
  /* ---------- E2 · senoides (bloco 1) ---------- */
  'a:T1:b1:0': { d: 'f', conta: ['377/(2*Math.PI)', '311'], w: {
    B: '[omegaF] 377 é a frequência angular ω, em rad/s; a frequência é f = ω/(2π) ≈ 60 Hz.',
    C: '[pico] 220 V é o valor eficaz (311/√2). O número que multiplica o seno é o valor de pico.',
    D: '[sem2pi] 120 Hz sai de 377/π: dividiu ω só por π, esquecendo o 2 de 2π.',
    E: '[pico] Troca o pico pelo eficaz e põe 50 Hz, a frequência de outras redes; ω = 377 rad/s dá 60 Hz.' } },
  'a:T1:b1:1': { d: 'f', conta: '1000/60', w: {
    A: '[invertida] 60 é a frequência em hertz; o período é o inverso dela, T = 1/f.',
    B: '[freq] 20 ms é o período de uma rede de 50 Hz (1/50 s), não de 60 Hz.',
    D: '[etapa] 8,33 ms é meio ciclo (T/2): o tempo entre dois zeros seguidos, não o período.',
    E: '[unidade] Errou a vírgula na conversão: 1/60 s = 0,01667 s = 16,67 ms, e não 1,67 ms.' } },
  'a:T1:b1:2': { d: 'm', conta: '40-(-20)', w: {
    A: '[atrAdi] O ângulo está certo (60°), mas o sentido não: φ = θ<sub>v</sub> − θ<sub>i</sub> = +60° quer dizer tensão adiantada, carga indutiva.',
    C: '[sinal] 20° = 40° − 20°: tratou a fase da corrente, −20°, como +20°.',
    D: '[oposto] Só estariam em fase se os dois ângulos fossem iguais; aqui diferem de 60°.',
    E: '[sinal] Usou só os 40° da tensão e ainda inverteu quem está adiantado.' } },
  'a:T1:b1:3': { d: 'm', conta: '360*60*0.00278', w: {
    A: '[formula] 30° sai de usar 180° no lugar de 360° na proporção (como se meio ciclo fosse o ciclo inteiro).',
    B: '[freq] 50° = 360° × 50 × 0,00278: usou a frequência de 50 Hz, de outras redes, no lugar dos 60 Hz das senoides.',
    D: '[detalhe] 90° (quadratura) seria 1/4 do ciclo, 4,17 ms. Supor quadratura só porque as ondas estão deslocadas é o erro.',
    E: '[detalhe] 120° é a defasagem entre as fases do trifásico, 1/3 do ciclo (5,56 ms); não é o que esta medida dá.' } },
  'a:T1:b1:4': { d: 'f', conta: '170*Math.sin(Math.PI/6)', w: {
    A: '[outra] 170 V é o valor de pico, que ocorre em θ = 90°, não em 30°.',
    B: '[senCos] 147,2 V = 170·cos 30°: trocou o seno pelo cosseno.',
    C: '[outra] 120,2 V = 170/√2 é o valor eficaz, que não é o valor instantâneo pedido.',
    E: '[detalhe] 0 V é o valor em θ = 0°; em 30° o seno vale 0,5.' } },
  /* ---------- E2 · valores médio, eficaz e de pico (bloco 2) ---------- */
  'a:T1:b2:0': { d: 'f', conta: '340/2/Math.SQRT2', w: {
    A: '[pp] 340 V é a leitura de pico a pico do osciloscópio, não o eficaz.',
    B: '[ppEf] 240 V = 340/√2: aplicou o √2 direto ao pico a pico, sem antes dividir por 2.',
    C: '[pico] 170 V é o pico (V<sub>pp</sub>/2); falta dividir por √2.',
    E: '[medio] 108 V = 2·170/π é o valor médio de meio ciclo, que o multímetro true RMS não indica.' } },
  'a:T1:b2:1': { d: 'f', conta: '2*Math.SQRT2*220', w: {
    A: '[raiz2] 155 V = 220/√2: tratou 220 V como se fosse o pico e dividiu, quando 220 V já é o eficaz.',
    B: '[etapa] 311 V é o pico (√2 × 220); o pico a pico é o dobro.',
    C: '[linhaFase] 380 V = 220 × √3 é a tensão de linha de uma rede 220/380 V, outra grandeza.',
    D: '[raiz2] 440 V dobra o eficaz sem passar pelo pico: faltou o √2.' } },
  'a:T1:b2:2': { d: 'm', w: {
    B: '[medio] 0,318·V<sub>p</sub> (V<sub>p</sub>/π) é o médio da onda retificada em meia onda, não da senoide pura.',
    C: '[medio] 0,637·V<sub>p</sub> (2V<sub>p</sub>/π) é o médio de meio ciclo (ou da onda completa retificada); no ciclo inteiro os semiciclos se anulam.',
    D: '[outra] 0,707·V<sub>p</sub> é o valor eficaz, não o médio.',
    E: '[outra] V<sub>p</sub> é o valor máximo da onda, não a média.' } },
  'a:T1:b2:3': { d: 'm', conta: '200/Math.PI', w: {
    A: '[pico] 100 V é o pico, o maior valor da onda, não a média.',
    B: '[outra] 70,7 V é o eficaz (100/√2), que a retificação em onda completa não muda; o pedido é o médio.',
    D: '[formula] 50 V é metade do pico, como se a onda fosse triangular; na senoide retificada a média é 2V<sub>p</sub>/π.',
    E: '[medio] 31,8 V = V<sub>p</sub>/π é o médio da retificação em meia onda.' } },
  'a:T1:b2:4': { d: 'f', conta: '(141.4/Math.SQRT2)**2/10', w: {
    A: '[pico] 2.000 W = 141,4²/10: usou o pico no lugar do eficaz, o que dobra a potência.',
    B: '[pico] 1.414 W = 141,4 × 100/10: misturou o pico com o eficaz na mesma conta.',
    D: '[raiz2] 707 W multiplica o resultado por 0,707: aplicou o √2 de novo, depois de já ter usado o eficaz.',
    E: '[raiz2] 500 W sai de dividir o pico por 2 (70,7 V) em vez de por √2: 70,7²/10 = 500 W.' } },
  /* ---------- E2 · fasores e números complexos (bloco 3) ---------- */
  'a:T1:b3:0': { d: 'f', conta: ['Math.hypot(6,8)', 'Math.atan2(8,6)*180/Math.PI'], w: {
    A: '[somaArit] 14 = 6 + 8: somou as partes real e imaginária como números comuns; o módulo é √(6² + 8²).',
    B: '[retPolar] 36,87° = arctg(6/8): inverteu as partes no ângulo. Esse é o polar de 8 + j6.',
    D: '[semRaiz] 100 = 6² + 8²: esqueceu a raiz quadrada do módulo.',
    E: '[sinal] 2 = 8 − 6 e ângulo negativo: subtraiu as partes e trocou o sinal do ângulo.' } },
  'a:T1:b3:1': { d: 'f', conta: ['20/5', '30-(-60)'], w: {
    A: '[polar] Dividiu os módulos, mas somou os ângulos (30° − 60°), que é a regra da multiplicação.',
    B: '[polar] 100∠−30° é o produto (20 × 5, 30° + (−60°)), não a divisão.',
    D: '[polar] 15 = 20 − 5: subtraiu os módulos, que na divisão se dividem.',
    E: '[polar] Manteve o ângulo do numerador e ignorou o do denominador: 30° − (−60°) = 90°.' } },
  'a:T1:b3:2': { d: 'f', conta: 'Math.hypot(3,4)', w: {
    A: '[sinal] 1 A = 4 − 3: subtraiu como se as correntes estivessem em oposição (180°); elas estão a 90°.',
    B: '[formula] 3,5 A é a média aritmética das duas correntes; na LKC as correntes se somam (fasorialmente), não se fazem médias.',
    D: '[somaArit] 7 A = 3 + 4 só valeria com as correntes em fase.',
    E: '[formula] 12 A = 3 × 4: multiplicou as correntes, operação que não aparece na LKC.' } },
  'a:T1:b3:3': { d: 'f', conta: ['311/Math.SQRT2', '45'], w: {
    A: '[pico] 311 V é o pico; o fasor em valor eficaz usa 311/√2 ≈ 220 V.',
    B: '[sinal] O módulo está certo, mas o ângulo perdeu o sinal: a fase inicial é −45°.',
    D: '[raiz2] 155 V = 311/2: dividiu o pico por 2 em vez de por √2.',
    E: '[pico] Usa o pico e ainda troca o sinal do ângulo.' } },
  'a:T1:b3:4': { d: 'm', w: {
    A: '[sinal] Esse é o efeito de +j (1∠+90°). O −j vale 1∠−90° e gira no sentido horário.',
    C: '[formula] Girar 180° é multiplicar por −1 (j²). O −j gira só 90°.',
    D: '[detalhe] Multiplicar por −j troca as partes real e imaginária de lugar (a + jb vira b − ja); não inverte só o sinal da parte real.',
    E: '[formula] 90° é o giro, não um divisor: |−j| = 1, então o módulo fica igual.' } },
  /* ---------- E2 · reatância e impedância (bloco 4) ---------- */
  'a:T1:b4:0': { d: 'f', conta: '2*Math.PI*60*0.1', w: {
    A: '[unidade] 3,77 Ω usa L = 0,01 H: errou a conversão de 100 mH (que é 0,1 H).',
    B: '[sem2pi] 6 Ω = 60 × 0,1: esqueceu o 2π de X<sub>L</sub> = 2πfL.',
    C: '[xlxc] 26,5 Ω é a reatância de um capacitor de 100 µF, 1/(2πfC): trocou a fórmula do indutor pela do capacitor.',
    E: '[unidade] 377 Ω usa L = 1 H: esqueceu o prefixo mili.' } },
  'a:T1:b4:1': { d: 'f', conta: '1/(2*Math.PI*60*100e-6)', w: {
    A: '[xlxc] 0,0377 Ω = 2πfC: usou a fórmula da reatância indutiva com a capacitância. A capacitiva é o inverso, 1/(2πfC).',
    B: '[unidade] 2,65 Ω seria com C = 1.000 µF: errou a potência de 10 do micro (100 µF = 10<sup>−4</sup> F).',
    D: '[xlxc] 37,7 Ω = 2π × 60 × 0,1: é a reatância de um indutor de 100 mH; tratou o capacitor como indutor.',
    E: '[unidade] 265 Ω seria com C = 10 µF: errou a potência de 10 do micro.' } },
  'a:T1:b4:2': { d: 'm', conta: '100/Math.hypot(30,40)*30', w: {
    A: '[somaArit] 42,9 V = 100 × 30/70: somou R e X<sub>L</sub> como se fossem resistências (Z = 70 Ω), mas |Z| = √(30² + 40²) = 50 Ω.',
    B: '[divIgual] 50 V é metade da fonte: dividiu a tensão igualmente entre R e L.',
    D: '[divisorTroca] 80 V é a tensão no indutor (2 A × 40 Ω), não no resistor.',
    E: '[tensaoTotal] 100 V é a tensão da fonte, que se divide (fasorialmente) entre R e L.' } },
  'a:T1:b4:3': { d: 'd', conta: '50/10*30', w: {
    A: '[outra] 0 V é a soma V<sub>L</sub> + V<sub>C</sub>, que se cancelam na ressonância; cada uma, sozinha, vale 150 V.',
    B: '[etapa] 5 é a corrente, em ampères (50/10); falta multiplicar por X<sub>L</sub>.',
    C: '[unidade] 30 é a reatância X<sub>L</sub>, em ohms, não uma tensão.',
    D: '[tensaoTotal] Supôs que nenhum elemento passa da tensão da fonte. Na ressonância série, V<sub>L</sub> = I·X<sub>L</sub> pode ser várias vezes maior.' } },
  'a:T1:b4:4': { d: 'f', w: {
    A: '[xlxc] Inverteu o comportamento: X<sub>L</sub> = 2πfL cresce com f, e X<sub>C</sub> = 1/(2πfC) diminui.',
    B: '[xlxc] Só X<sub>L</sub> é proporcional a f. X<sub>C</sub> é inversamente proporcional: cai à metade.',
    D: '[detalhe] A resistência, idealmente, não depende da frequência; quem muda são as reatâncias.',
    E: '[oposto] As duas reatâncias dependem de f (2πfL e 1/(2πfC)).' } },
  'a:T1:b4:5': { d: 'm', conta: '1/(2*Math.PI*Math.sqrt(0.01*10e-6))', w: {
    A: '[unidade] 50,3 Hz: dez vezes menos, o que sai de errar o prefixo de L e de C (LC 100 vezes maior).',
    B: '[unidade] 159 Hz usa C = 100 µF (ou L = 100 mH): errou o prefixo de um dos dois.',
    D: '[unidade] 1.591 Hz usa C = 1 µF (ou L = 1 mH): errou o prefixo de um dos dois.',
    E: '[unidade] 5.033 Hz: dez vezes mais, o que sai de errar o prefixo de L e de C (LC 100 vezes menor).' } },
  /* ---------- E3 · potência e fator de potência (bloco 5) ---------- */
  'a:T1:b5:0': { d: 'm', conta: 'Math.sqrt(100**2-60**2)/100', w: {
    A: '[senCos] 0,6 = Q/S = 60/100 é o seno de φ; o fator de potência é P/S = cos φ. E não estaria adequado.',
    C: '[oposto] O FP é 0,8, mas 0,8 está abaixo de 0,92, não acima.',
    D: '[senCos] 60 é a potência reativa (kvar). A ativa é √(100² − 60²) = 80 kW.',
    E: '[oposto] FP unitário exigiria Q = 0; há 60 kvar de reativa.' } },
  'a:T1:b5:1': { d: 'f', conta: '220*10*0.6', w: { /* distrator B trocado na estação (BQ-1) */
    A: '[senCos] 440 var = 2.200 × 0,2: usou 1 − 0,8 como se fosse o seno de φ.',
    B: '[semQuad] 984 var = 2.200 × √(1 − 0,8): esqueceu de elevar o FP ao quadrado; senφ = √(1 − 0,8²) = 0,6.',
    D: '[senCos] 1.760 W = 2.200 × 0,8 é a potência ativa (cosseno), não a reativa (seno).',
    E: '[aparente] 2.200 VA = V·I é a potência aparente.' } },
  'a:T1:b5:2': { d: 'f', conta: '40*0.6/0.8', w: {
    A: '[somaArit] 10 = 50 − 40: subtraiu as potências aparente e ativa como números comuns; elas formam um triângulo retângulo.',
    B: '[senCos] 24 = 40 × 0,6: multiplicou P pelo seno. A reativa é P·tg φ = 40 × 0,75.',
    D: '[outra] 40 é a potência ativa em kW, que não muda com a correção.',
    E: '[aparente] 50 kVA é a potência aparente inicial (40/0,8).' } },
  'a:T1:b5:3': { d: 'f', w: {
    A: '[oposto] Os capacitores fornecem reativo; a potência ativa da carga continua a mesma.',
    C: '[detalhe] A tensão nominal da carga não muda; o que diminui é a corrente que vem da fonte.',
    D: '[oposto] A potência aparente diminui, porque Q diminui e P fica igual.',
    E: '[exagero] A potência mecânica depende da carga do motor, não do fator de potência da instalação.' } },
  'a:T1:b5:4': { d: 'm', conta: '(100/Math.hypot(8,6))**2*8', w: {
    A: '[senCos] 600 var = I²·X<sub>L</sub> é a potência reativa.',
    C: '[aparente] 1.000 VA = V·I é a potência aparente.',
    D: '[tensaoTotal] 1.250 W = 100²/8: aplicou a tensão total ao resistor, que só recebe parte dela (80 V).',
    E: '[tensaoTotal] 1.667 = 100²/6: aplicou a tensão total à reatância. Além disso, reatância não consome potência ativa.' } },
  /* ---------- E3 · trifásicos (bloco 6) ---------- */
  'a:T1:b6:0': { d: 'f', conta: '220/Math.sqrt(3)/12.7', w: {
    A: '[raiz3inv] 5,77 A = 10/√3: aplicou √3 entre corrente de fase e de linha, mas na estrela I<sub>L</sub> = I<sub>F</sub>.',
    C: '[unidade] 12,7 é a impedância, em ohms, e não uma corrente.',
    D: '[linhaFase] 17,3 A = 220/12,7: aplicou a tensão de linha sobre a impedância; em estrela, cada uma recebe 127 V.',
    E: '[linhaFase] 30 A = √3 × 220/12,7: tratou a carga como triângulo (cada impedância com 220 V e I<sub>L</sub> = √3·I<sub>F</sub>); em estrela, cada uma recebe 127 V e I<sub>L</sub> = I<sub>F</sub>.' } },
  'a:T1:b6:2': { d: 'f', conta: 'Math.sqrt(3)*380*20*0.85/1000', w: {
    A: '[raiz3inv] 3,7 kW = 6,5/√3: dividiu por √3 em vez de multiplicar.',
    B: '[semRaiz3] 6,5 kW = 380 × 20 × 0,85: esqueceu o √3.',
    D: '[aparente] 13,2 kVA = √3 × 380 × 20 é a potência aparente: faltou o fator de potência.',
    E: '[tres] 19,4 kW = 3 × 380 × 20 × 0,85: usou 3 no lugar de √3 com a tensão de linha.' } },
  'a:T1:b6:3': { d: 'f', w: {
    A: '[linhaFase] Os enrolamentos são de 220 V (a menor tensão da placa). Em triângulo, cada um receberia 380 V.',
    C: '[linhaFase] Em triângulo, cada enrolamento recebe a tensão de linha inteira (380 V), não 220 V.',
    D: '[linhaFase] Em estrela, cada enrolamento recebe V<sub>L</sub>/√3 = 220 V, não 380 V.',
    E: '[oposto] Motor de seis terminais liga em estrela ou triângulo; não existe ligação “em paralelo” para a tensão maior.' } },
  'a:T1:b6:4': { d: 'm', conta: '3*(200/20)**2*16', w: {
    A: '[etapa] 1.600 W é a potência de uma fase só (10² × 16); faltou multiplicar por 3.',
    B: '[senCos] 3.600 var = 3 × 10² × 12 é a potência reativa.',
    D: '[aparente] 6.000 VA = 3 × 200 × 10 é a potência aparente.',
    E: '[raiz3inv] 8.314 W = 4.800 × √3: pôs um √3 a mais numa potência que já é a trifásica.' } },
  'a:T1:b6:5': { d: 'm', fix: { c: 'V<sub>AB</sub> = V<sub>AN</sub> − V<sub>BN</sub> = √3·V<sub>AN</sub>∠+30° (veja o diagrama fasorial da estrela na Teoria). O atraso de 30° aparece na corrente de linha da ligação triângulo, não na tensão de linha da estrela.', ed: 'a referência à figura 8 da apostila não vale fora da Teoria' }, w: {
    A: '[linhaFase] Na estrela, a tensão de linha não é igual à de fase: é √3 vezes maior.',
    C: '[atrAdi] O módulo está certo, mas V<sub>AB</sub> está adiantada 30° de V<sub>AN</sub>. O atraso de 30° é da corrente de linha no triângulo.',
    D: '[tres] O fator é √3 (não 3), e o ângulo é 30° (não 120°, que é a defasagem entre as fases).',
    E: '[raiz2] √2 é a relação entre pico e eficaz, não entre tensões de linha e de fase; e o ângulo é 30°.' } },
  'a:T1:b6:6': { d: 'f', conta: '60/3', w: {
    B: '[raiz3inv] 34,6 Ω = 60/√3: o fator entre impedâncias Δ e Y é 3, não √3.',
    C: '[outra] 60 Ω é a impedância do triângulo, sem conversão.',
    D: '[raiz3inv] 103,9 Ω = 60 × √3: multiplicou, e ainda pelo fator errado.',
    E: '[invertida] 180 Ω = 60 × 3: fez a conversão ao contrário (Y → Δ multiplica por 3; Δ → Y divide).' } },
  'a:T1:b6:7': { d: 'm', w: {
    A: '[somaArit] As correntes estão defasadas de 120°: a corrente do neutro é a soma fasorial, que se anula com carga equilibrada.',
    C: '[neutroNada] Com carga desequilibrada o neutro conduz, e o rompimento desloca o ponto neutro e desequilibra as tensões.',
    D: '[detalhe] Carga em triângulo não tem ponto neutro: dispensa o condutor neutro.',
    E: '[linhaFase] O neutro dá acesso à tensão de fase; a de linha continua √3 vezes maior.' } },

  /* ---------- banco (BANK) ---------- */
  'f:t1:1': { mod: 'E2', h: '2.3', d: 'f', w: {
    B: '[somaArit] O dobro da amplitude seria a soma de duas senoides em fase (0°); em oposição, elas se cancelam.',
    C: '[detalhe] Somar senoides de mesma frequência não muda a frequência. Os 120 Hz aparecem na potência instantânea, não na soma das tensões.',
    D: '[detalhe] A soma de duas senoides de 60 Hz não tem componente contínua; o valor de pico não entra.',
    E: '[somaArit] √2 vezes a amplitude seria a soma de duas senoides em quadratura (90°), não em oposição.' } },
  'f:t1:2': { mod: 'E3', h: '3.2', d: 'f', w: {
    A: '[aparente] A potência aparente V·I não é nula, mas é toda reativa: a ativa (média) é zero.',
    C: '[senCos] A potência reativa é V·I·sen 90° = V·I; a ativa é V·I·cos 90° = 0.',
    D: '[detalhe] No capacitor ideal a potência ativa é nula em qualquer frequência.',
    E: '[senCos] V·I·cos 0° supõe tensão e corrente em fase (resistor). No capacitor, a corrente está adiantada 90°.' } },
  'f:t1:3': { mod: 'E2', h: '2.2', d: 'm', w: {
    A: '[oposto] Com f maior, X<sub>L</sub> cresce, a impedância aumenta e a corrente cai; o ângulo φ cresce, e o FP cai.',
    C: '[oposto] X<sub>L</sub> = 2πfL depende da frequência: corrente e FP mudam.',
    D: '[oposto] A corrente de fato diminui, mas o FP também: φ = arctg(X<sub>L</sub>/R) aumenta.',
    E: '[xlxc] A reatância indutiva aumenta com a frequência; quem diminui é a capacitiva.' } },
  'f:t1:4': { mod: 'E3', h: '4.1', d: 'm', w: {
    A: '[detalhe] Pulsar com 2f é o que acontece no monofásico; no trifásico equilibrado as três pulsações se compensam.',
    C: '[detalhe] Quem se anula duas vezes por ciclo é a potência instantânea de uma fase com carga resistiva; a soma das três não se anula.',
    D: '[detalhe] O monofásico tem potência pulsante; a constância é justamente a vantagem do trifásico.',
    E: '[detalhe] A sequência de fases muda o sentido do campo girante, não o valor da potência entregue.' } },
  'f:t1:5': { mod: 'E2', h: '2.4', d: 'm', w: {
    A: '[exagero] Nem todo multímetro mede valor eficaz verdadeiro: o de valor médio só acerta com senoide.',
    C: '[outra] O instrumento não mede pico: mede o médio retificado e multiplica por 1,11.',
    D: '[medio] O instrumento retifica antes de medir: o médio retificado não é zero. Zero é o médio da onda sem retificação.',
    E: '[detalhe] O erro vem da forma de onda (harmônicos), não da frequência: com 60 Hz e onda distorcida, a leitura continua errada.' } },
  'f:t1:6': { mod: 'E3', h: '4.1', d: 'f', w: {
    A: '[detalhe] Nenhuma fase foi retirada: as três continuam ligadas, só que em outra ordem.',
    C: '[detalhe] A velocidade depende da frequência e do número de polos, não da ordem das fases.',
    D: '[detalhe] Trocar duas fases não desequilibra as tensões: o módulo de cada uma continua o mesmo.',
    E: '[oposto] A sequência depende da ordem das fases: trocar duas a inverte (ABC → ACB), e o sentido do campo girante muda.' } },
  'f:t1:7': { mod: 'E3', h: '4.2', d: 'm', w: {
    A: '[faseLinhaI] Corrente de linha igual à de fase é a regra da estrela; no triângulo, I<sub>L</sub> = √3·I<sub>F</sub>.',
    C: '[atrAdi] O módulo está certo, mas na sequência ABC a corrente de linha fica atrasada 30°. O adiantamento de 30° é da tensão de linha na estrela.',
    D: '[tres] O fator é √3, não 3; e o ângulo é 30°, não 120°.',
    E: '[raiz3inv] A corrente de linha é √3 vezes maior que a de fase, não menor.' } },
  'h:t1:vab': { mod: 'E3', h: '4.2', d: 'm', figTira: ['VAB = VAN − VBN = √3·VAN ∠+30°', '30°', '−VBN'],
    /* sem a construção (−V_BN, o paralelogramo e o arco de 30°), que mostraria a resposta */
    figTroca: [['<line x1="180" y1="200" x2="240" y2="96.1" class="s-dash s-pb"/>', ''], ['<line x1="300" y1="200" x2="360" y2="96.1" class="s-guide"/>', ''], ['<line x1="240" y1="96.1" x2="360" y2="96.1" class="s-guide"/>', ''], ['<path d="M 240 200 A 60 60 0 0 0 232 170" class="s-arc"/>', '']], conv: {
    s: 'A figura mostra o diagrama fasorial de um sistema trifásico em estrela, de sequência ABC, com as tensões de fase V<sub>AN</sub>, V<sub>BN</sub> e V<sub>CN</sub>. A tensão de linha V<sub>AB</sub> é obtida por',
    o: ['V<sub>AN</sub> + V<sub>BN</sub>, com módulo igual ao de V<sub>AN</sub>',
      'V<sub>AN</sub> − V<sub>BN</sub>, com módulo √3·V<sub>AN</sub> e adiantada 30° em relação a V<sub>AN</sub>',
      'V<sub>AN</sub> − V<sub>BN</sub>, com módulo 2·V<sub>AN</sub> e adiantada 60° em relação a V<sub>AN</sub>',
      'V<sub>BN</sub> − V<sub>AN</sub>, com módulo √3·V<sub>AN</sub> e atrasada 30° em relação a V<sub>AN</sub>',
      'V<sub>AN</sub> + V<sub>CN</sub>, com módulo √3·V<sub>AN</sub> e em fase com V<sub>AN</sub>'],
    a: 1,
    c: 'V<sub>AB</sub> = V<sub>AN</sub> − V<sub>BN</sub> = V<sub>AN</sub> + (−V<sub>BN</sub>). Na figura, o fasor −V<sub>BN</sub> é somado a V<sub>AN</sub> pela regra do paralelogramo: o resultado tem módulo √3·V<sub>AN</sub> e fica 30° adiantado em relação a V<sub>AN</sub>.' }, w: {
    A: '[sinal] V<sub>AN</sub> + V<sub>BN</sub> = −V<sub>CN</sub>: somou em vez de subtrair. A tensão de linha é a diferença entre as duas fases.',
    C: '[somaArit] 2·V<sub>AN</sub> seria a soma dos módulos, como se os fasores estivessem alinhados. Com 120° entre eles, a diferença vale √3·V<sub>AN</sub>, a 30°.',
    D: '[sinal] V<sub>BN</sub> − V<sub>AN</sub> é −V<sub>AB</sub> (a tensão V<sub>BA</sub>): a ordem da subtração define o sentido do fasor.',
    E: '[sinal] V<sub>AN</sub> + V<sub>CN</sub> = −V<sub>BN</sub>, o fasor auxiliar da construção, de módulo V<sub>AN</sub>; não é a tensão de linha.' } },
  'h:t1:pot': { mod: 'E3', h: '3.3', d: 'f', figTroca: [['P (W) — não muda', 'P (W)']], conv: {
    s: 'A figura mostra o triângulo de potências de uma instalação antes (S<sub>1</sub>, Q<sub>1</sub>) e depois (S<sub>2</sub>, Q<sub>2</sub>) da instalação de um banco de capacitores de potência Q<sub>C</sub>. A grandeza que NÃO se altera com essa correção do fator de potência é',
    o: ['a potência ativa P', 'a potência reativa absorvida da rede', 'a potência aparente', 'o ângulo φ entre tensão e corrente', 'a corrente fornecida pela fonte'],
    a: 0,
    c: 'A potência ativa P é a que realiza trabalho e não muda: os capacitores só fornecem reativo localmente. Por isso, na figura, o cateto P é o mesmo antes e depois, enquanto Q, S, o ângulo φ e a corrente diminuem.' }, w: {
    B: '[oposto] A reativa absorvida da rede cai de Q<sub>1</sub> para Q<sub>2</sub> = Q<sub>1</sub> − Q<sub>C</sub>: é justamente o que a correção muda.',
    C: '[oposto] A aparente cai de S<sub>1</sub> para S<sub>2</sub>, porque Q diminui com P fixo.',
    D: '[oposto] O ângulo diminui (φ<sub>2</sub> &lt; φ<sub>1</sub>), e por isso o fator de potência sobe.',
    E: '[oposto] A corrente cai junto com a potência aparente (I = S/V): é um dos ganhos da correção.' } },
};

/* Estação E2: o que tools/estacao.mjs não tira do HTML da apostila (metadados, resumo, cartões, V ou F, contas)
   e as trocas de texto aplicadas à fonte antes da conversão. A apostila de CA (fontes/circuitos-ca-trifasicos.html)
   rende duas estações: a E2 fica com os blocos 1 a 4 e a E3 com os blocos 5 e 6 (mais uma seção nova).
   Gerar: node tools/estacao.mjs fontes/circuitos-ca-trifasicos.html E2 --secoes 1-4 */
import fs from 'node:fs';

const FONTE = 'fontes/circuitos-ca-trifasicos.html';
const SRC = fs.readFileSync(new URL('../../' + FONTE, import.meta.url), 'utf8');
/* A seção inteira, como está na apostila (a troca precisa do texto exato). */
const secao = id => SRC.match(new RegExp(`<section id="${id}" class="block">[\\s\\S]*?</section>`))[0];

const v = s => `<var>${s}</var>`;
const fr = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
const p = (...xs) => xs.map(x => `<span class="eq-part">${x}</span>`).join('');
const sub = (x, s) => `${v(x)}<sub>${s}</sub>`;
const B = x => `<b>${x}</b>`;

export default {
  fonte: FONTE,
  meta: {
    id: 'E2', vol: 'EL', line: 'E',
    title: 'Corrente alternada, fasores e impedância',
    itens: '2.2, 2.3, 2.4', faixa: 'A', peso2023: 7,
    note: 'Pico, eficaz, fasores e impedância são a língua de toda a parte de CA: potência, trifásicos, motores e transformadores. O peso de 7 questões é o do item 2 inteiro (CC e CA), dividido com a E1; em 2023, três foram de CA monofásica.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  trocas: [
    /* ---- distratores dos exercícios trocados na revisão do banco (fontes/ERRATA.md, BQ-1): a mesma questão aparece na
       aba Questões, e as alternativas precisam ser as mesmas nos dois lugares ---- */
    { errata: 'BQ-1', de: 'o:["30°","45°","60°","90°","120°"],a:2,',
      para: 'o:["30°","50°","60°","90°","120°"],a:2,' },
    /* ---- figuras: rótulos que a fonte do app (mais larga que a da apostila) punha em cima da curva ---- */
    { de: '<text x="265" y="62" class="tl fb">V<tspan class="sub" dy="4">ef</tspan>', para: '<text x="330" y="62" class="tl fb">V<tspan class="sub" dy="4">ef</tspan>' },
    { de: '<text x="236" y="84" class="tl fc">i(t)</text>', para: '<text x="222" y="60" class="tl fc">i(t)</text>' },
    /* ---- contexto do app ---- */
    { de: 'O valor eficaz é detalhado no Bloco 2.', para: 'O valor eficaz é detalhado na seção 2.' },
    /* As cores do app mudam com o tema: no escuro, o traço "preto" é claro. */
    { de: 'Figura 3. Fasores de tensão (preto) e corrente (azul)', para: 'Figura 3. Fasores de tensão (traço grosso, na cor do texto) e corrente (azul)' },
    { de: 'O ângulo φ é o mesmo do fator de potência (Bloco 5).', para: 'O ângulo φ é o mesmo do fator de potência (estação E3).' },
    { de: secao('antes'), para: `<section id="antes" class="block">
  <div class="block-head"><h2>Antes de começar</h2></div>
  <p>Esta estação cobre os seguintes itens do conteúdo programático da <b>Ênfase 8 — Manutenção – Elétrica</b> (Anexo IV do Edital nº 03), conferidos no texto oficial:</p>
  <ul>
    <li><b>2.2</b> Noções básicas de circuitos elétricos de corrente alternada (CA);</li>
    <li><b>2.3</b> Operações básicas com corrente e tensão senoidais;</li>
    <li><b>2.4</b> Medidas de valores médio, eficaz e valor de pico.</li>
  </ul>
  <p>O item 2.5 (Kirchhoff, Thévenin e Norton) fica na estação E1; aqui ele aparece só no que toca à CA (Kirchhoff com fasores, na seção 3). Potência em CA, fator de potência, trifásicos, energia e medidores ficam na estação E3, que usa tudo desta: valor eficaz, fasores, impedância e o ângulo φ. Os instrumentos da seção 2 (osciloscópio, multímetro comum e true RMS) também servem ao item <b>7.3</b> (uso de instrumentos de medição).</p>
  <div class="box cesg">
    <p class="box-title">Como a Cesgranrio tem cobrado esse assunto</p>
    <p>Na prova de 2023 da própria Transpetro (Manutenção – Elétrica), três das 40 questões específicas foram de CA monofásica: a 32 (amplitude da tensão de saída de um circuito RC alimentado por fonte senoidal, com ω dado em rad/s), a 33 (tensão eficaz a partir do pico lido num osciloscópio) e a 48 (soma de duas senoides de mesma frequência defasadas de 90°, que é uma soma de fasores). É um <b>padrão observado</b>, não garantia de repetição, mas indica o estilo: contas curtas, números “redondos”, triângulo 3-4-5 e muita conversão entre pico, eficaz e ângulo.</p>
  </div>
</section>` },
    { de: secao('fontes'), para: `<section id="fontes" class="block">
  <div class="block-head"><h2>Fontes</h2></div>
  <ul class="sources">
    <li>Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO-2026.3, Anexo IV, conteúdo programático da Ênfase 8 (Manutenção – Elétrica), itens 2.2 a 2.4 — conferido no PDF do edital.</li>
    <li>Caderno da prova Cesgranrio 2023, Transpetro, Técnico de Manutenção – Elétrica (questões 32, 33 e 48), e a listagem de questões no <a href="https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-tecnico-de-manutencao-eletrica/questoes?page=2">Qconcursos</a> (usadas apenas para identificar o estilo de cobrança).</li>
    <li>Bibliografia de apoio para aprofundar a teoria: R. L. Boylestad, <i>Introdução à Análise de Circuitos</i> (Pearson); C. K. Alexander e M. N. O. Sadiku, <i>Fundamentos de Circuitos Elétricos</i> (AMGH).</li>
    <li>Revisão técnica do app (outubro de 2026): as contas dos 4 exemplos resolvidos e dos 21 exercícios recalculadas por teste automático; conceitos conferidos em Alexander e Sadiku (senoides, fasores e análise em regime permanente senoidal), em Boylestad e em T. Kuphaldt, <i>Lessons in Electric Circuits</i>, vol. II (LibreTexts). Nenhuma correção técnica foi necessária nesta parte da apostila; a legenda da figura 3 deixou de citar uma cor que muda com o tema do app.</li>
  </ul>
  <footer>Exercícios elaborados no estilo da banca para fixação; não são questões oficiais.</footer>
</section>` },
  ],
  /* Formulário-resumo: as linhas de CA monofásica (as de potência e trifásicos ficam na E3), mais três novas. */
  formulario: [
    'Senoide', 'Período e frequência angular', 'Defasagem a partir do tempo', 'Pico a pico', 'Eficaz (senoide)', 'Médio de meio ciclo',
    ['Fasor', p(`${v('v')}(${v('t')}) → ${B('V')} = ${sub('V', 'ef')}∠${v('θ')}`), 'módulo = valor eficaz (V<sub>p</sub>/√2); ângulo = fase inicial'],
    ['Complexos na forma polar', p(`${sub('M', '1')}∠${sub('θ', '1')} · ${sub('M', '2')}∠${sub('θ', '2')} = ${sub('M', '1')}${sub('M', '2')}∠(${sub('θ', '1')} + ${sub('θ', '2')})`),
      'divisão: divide os módulos e subtrai os ângulos; soma e subtração na forma retangular; j = 1∠90°'],
    'Reatância indutiva', 'Reatância capacitiva', 'Impedância série',
    ['Lei de Ohm em CA', p(`${B('V')} = ${B('Z')} · ${B('I')}`, `${sub('V', 'ef')} = |${B('Z')}| · ${sub('I', 'ef')}`), 'Kirchhoff vale com fasores, nunca somando os valores eficazes'],
    'Ressonância série',
  ],
  formulaHtml: {
    'Senoide': p(`${v('v')}(${v('t')}) = ${sub('V', 'p')} · sen(${v('ω')}${v('t')} + ${v('θ')})`),
    'Período e frequência angular': p(`${v('T')} = ${fr('1', v('f'))}`, `${v('ω')} = 2π${v('f')}`),
    'Defasagem a partir do tempo': p(`${v('φ')} = 360° · ${v('f')} · Δ${v('t')}`),
    'Pico a pico': p(`${sub('V', 'pp')} = 2 · ${sub('V', 'p')}`),
    'Eficaz (senoide)': p(`${sub('V', 'ef')} = ${fr(sub('V', 'p'), '√2')} ≈ 0,707 · ${sub('V', 'p')}`),
    'Médio de meio ciclo': p(`${sub('V', 'méd')} = ${fr('2 · ' + sub('V', 'p'), 'π')} ≈ 0,637 · ${sub('V', 'p')}`),
    'Reatância indutiva': p(`${sub('X', 'L')} = 2π${v('f')}${v('L')}`),
    'Reatância capacitiva': p(`${sub('X', 'C')} = ${fr('1', '2π' + v('f') + v('C'))}`),
    'Impedância série': p(`${B('Z')} = ${v('R')} + j(${sub('X', 'L')} − ${sub('X', 'C')})`, `|${B('Z')}| = √(${v('R')}² + ${v('X')}²)`),
    'Ressonância série': p(`${sub('f', '0')} = ${fr('1', '2π√(' + v('L') + v('C') + ')')}`),
  },
  resumo: [
    ['Senoide', 'v(t) = V<sub>p</sub>·sen(ωt + θ). Em 60 Hz, ω ≈ 377 rad/s e T ≈ 16,67 ms.'],
    ['Pico, eficaz e médio', 'V<sub>ef</sub> = V<sub>p</sub>/√2; V<sub>pp</sub> = 2V<sub>p</sub>; médio de meio ciclo = 2V<sub>p</sub>/π ≈ 0,637V<sub>p</sub>.'],
    ['Defasagem', 'φ = θ<sub>v</sub> − θ<sub>i</sub>. φ &gt; 0: tensão adiantada, carga indutiva. Do tempo: φ = 360°·f·Δt.'],
    ['Fasores', 'Módulo = eficaz; ângulo = fase. Some na forma retangular; multiplique e divida na polar.'],
    ['Reatâncias', 'X<sub>L</sub> = 2πfL (I atrasa 90°); X<sub>C</sub> = 1/(2πfC) (I adianta 90°). ELI, o ICE-man.'],
    ['Impedância', 'Z = R + j(X<sub>L</sub> − X<sub>C</sub>), |Z| = √(R² + X²) e V = |Z|·I. Tensões somam como fasores.'],
    ['Ressonância série', 'X<sub>L</sub> = X<sub>C</sub>: Z = R mínima, I máxima e em fase; f<sub>0</sub> = 1/(2π√(LC)).'],
  ],
  cards: [
    ['v(t) = 311·sen(377t + 30°) V: qual o pico, o valor eficaz e a frequência?', 'Pico de 311 V; eficaz ≈ 220 V (311/√2); f = 377/(2π) ≈ 60 Hz.'],
    ['Em 60 Hz, quanto duram um ciclo e meio ciclo?', '16,67 ms e 8,33 ms.'],
    ['Como converter um atraso de tempo em ângulo de fase?', 'φ = 360°·f·Δt. Em 60 Hz, 1 ms corresponde a 21,6°.'],
    ['φ = θ<sub>v</sub> − θ<sub>i</sub> deu positivo. Quem está adiantada, e que carga é essa?', 'A tensão está adiantada (a corrente, atrasada): carga indutiva, como um motor.'],
    ['Rede de 220 V eficazes: quanto valem o pico e o pico a pico?', 'V<sub>p</sub> ≈ 311 V e V<sub>pp</sub> ≈ 622 V.'],
    ['Qual o valor médio de uma senoide num ciclo completo?', 'Zero. O 0,637·V<sub>p</sub> é o médio de meio ciclo (ou da onda completa retificada).'],
    ['Meia onda retificada: valor médio e valor eficaz?', 'Médio V<sub>p</sub>/π ≈ 0,318·V<sub>p</sub>; eficaz V<sub>p</sub>/2.'],
    ['Que valor o multímetro comum indica em CA, e quando ele erra?', 'O eficaz de uma senoide: mede o médio retificado e multiplica por 1,11. Com onda distorcida, erra; use um true RMS.'],
    ['Potência num resistor com a tensão dada em valor de pico?', 'Converta antes: P = V<sub>ef</sub>²/R. Com o pico, a conta dá o dobro.'],
    ['6 + j8 na forma polar?', '10∠53,13° (triângulo 3-4-5 multiplicado por 2).'],
    ['Como multiplicar e dividir complexos na forma polar?', 'Produto: multiplica os módulos e soma os ângulos. Divisão: divide os módulos e subtrai os ângulos.'],
    ['O que fazem j e −j com um fasor?', 'j gira +90° (adianta); −j gira −90° (atrasa). O módulo não muda, e 1/j = −j.'],
    ['Correntes de 3 A e 4 A, defasadas de 90°, chegam a um nó. Quanto sai?', '5 A (soma fasorial: 3 + j4). A soma aritmética, 7 A, só valeria com as duas em fase.'],
    ['Indutor e capacitor em CC, em regime?', 'O indutor é um curto (X<sub>L</sub> = 0); o capacitor carregado é um circuito aberto.'],
    ['A frequência dobra. O que acontece com X<sub>L</sub> e X<sub>C</sub>?', 'X<sub>L</sub> dobra; X<sub>C</sub> cai à metade. R não muda.'],
    ['RL série com R = 30 Ω e X<sub>L</sub> = 40 Ω: |Z| e ângulo?', '|Z| = 50 Ω e φ = 53,13°, indutivo (corrente atrasada).'],
    ['Na ressonância série, a tensão no indutor pode passar da tensão da fonte?', 'Pode: V<sub>L</sub> = V<sub>C</sub> = I·X, e as duas se cancelam por estarem a 180°.'],
    ['Num RL série, V<sub>R</sub> = 60 V e V<sub>L</sub> = 80 V. Qual a tensão da fonte?', '100 V = √(60² + 80²). Somar 60 + 80 = 140 V é o erro clássico.'],
  ],
  vf: [
    ['Em v(t) = 179·sen(377t) V, o número 179 é o valor eficaz da tensão.', false, 'É o valor de <b>pico</b>. O eficaz é 179/√2 ≈ 127 V.'],
    ['Uma tensão escrita como v(t) = V<sub>p</sub>·sen(377t) tem frequência de 60 Hz.', true, 'f = ω/(2π) = 377/6,283 ≈ 60 Hz.'],
    ['Quando a tensão está adiantada em relação à corrente, a carga tem comportamento capacitivo.', false, 'Tensão adiantada (corrente atrasada) é carga <b>indutiva</b>. No capacitor, a corrente é que se adianta.'],
    ['O valor médio de uma tensão senoidal pura, em um ciclo completo, é 0,637·V<sub>p</sub>.', false, 'Em ciclo completo, o médio é <b>zero</b>. 0,637·V<sub>p</sub> é o médio de meio ciclo.'],
    ['Na retificação em onda completa, o valor eficaz da tensão é o mesmo da senoide original.', true, 'Os semiciclos negativos só trocam de sinal; o quadrado é o mesmo, e o eficaz continua V<sub>p</sub>/√2.'],
    ['Um multímetro que mede o valor médio retificado e multiplica por 1,11 indica corretamente o eficaz de ondas distorcidas por harmônicos.', false, 'O fator 1,11 só vale para a senoide. Com harmônicos, só o <b>true RMS</b> acerta.'],
    ['Usar o valor de pico da tensão em P = V²/R dá o dobro da potência média real num resistor.', true, '(√2)² = 2. A banca costuma pôr esse dobro numa alternativa.'],
    ['Para somar dois fasores, a forma polar é a mais prática.', false, 'Soma e subtração se fazem na forma <b>retangular</b>; a polar serve para multiplicar e dividir.'],
    ['Multiplicar um fasor por −j o gira 90° no sentido horário, sem mudar o módulo.', true, '−j = 1∠−90°: soma −90° ao ângulo. É o que acontece com a tensão no capacitor, V<sub>C</sub> = −jX<sub>C</sub>·I.'],
    ['Num indutor ideal em CA, a corrente fica adiantada 90° em relação à tensão.', false, 'No indutor, a corrente fica <b>atrasada</b> 90° (ELI); adiantada é no capacitor (ICE).'],
    ['A reatância capacitiva diminui quando a frequência aumenta.', true, 'X<sub>C</sub> = 1/(2πfC): inversamente proporcional a f. Em alta frequência, o capacitor tende a um curto.'],
    ['Num RL série com V<sub>R</sub> = 60 V e V<sub>L</sub> = 80 V, a tensão da fonte é de 140 V.', false, 'As tensões estão a 90°: V = √(60² + 80²) = <b>100 V</b>.'],
    ['Na ressonância série, a impedância é mínima e igual à resistência, e o fator de potência é unitário.', true, 'Com X<sub>L</sub> = X<sub>C</sub>, a parte reativa some: Z = R, e tensão e corrente ficam em fase.'],
    ['Num RLC série com X<sub>L</sub> maior que X<sub>C</sub>, a corrente fica adiantada em relação à tensão.', false, 'X = X<sub>L</sub> − X<sub>C</sub> &gt; 0: circuito <b>indutivo</b>, corrente atrasada.'],
  ],
  /* Uma conta por número de exemplo resolvido e de exercício comentado. "onde" existe na teoria, e o "valor" aparece,
     como está escrito, depois dele. */
  contas: [
    ['377/(2*Math.PI)', '60 Hz', 'Exemplo resolvido 1'], ['1000/60', '16,67 ms', 'Exemplo resolvido 1'], ['169.7*Math.sin(Math.PI/6)', '84,9 V', 'Exemplo resolvido 1'],
    ['Math.SQRT2*127', '179,6 V', 'Exemplo resolvido 2'], ['2*179.6', '359,2 V', 'Exemplo resolvido 2'], ['2*179.6/Math.PI', '114,3 V', 'Exemplo resolvido 2'],
    ['Math.hypot(3,4)', '5∠53,13° A', 'Exemplo resolvido 3'], ['Math.atan(4/3)*180/Math.PI', '53,13°', 'Exemplo resolvido 3'], ['3+4', '7 A', 'Exemplo resolvido 3'],
    ['50-20', '30 Ω (indutivo)', 'Exemplo resolvido 4'], ['Math.hypot(40,30)', '|Z| = 50 Ω', 'Exemplo resolvido 4'], ['Math.atan(30/40)*180/Math.PI', '36,87°', 'Exemplo resolvido 4'],
    ['100/50', '2∠−36,87° A', 'Exemplo resolvido 4'], ['2*40', '80 V', 'Exemplo resolvido 4'], ['2*50', '100 V', 'Exemplo resolvido 4'], ['2*20', '40 V', 'Exemplo resolvido 4'],
    ['Math.hypot(80,100-40)', '= 100 V', 'Exemplo resolvido 4'], ['80+100+40', '220 V', 'Exemplo resolvido 4'],
    ['377/(2*Math.PI)', '60 Hz', 'Exercícios de fixação da seção 1'], ['1000/60', '16,67 ms', 'Exercícios de fixação da seção 1'], ['40-(-20)', '= 60°', 'Exercícios de fixação da seção 1'],
    ['360*60*0.00278', '≈ 60°', 'Exercícios de fixação da seção 1'], ['170*0.5', '= 85 V', 'Exercícios de fixação da seção 1'], ['170*Math.cos(Math.PI/6)', '147,2 V seria', 'Exercícios de fixação da seção 1'], ['170/Math.SQRT2', '120,2 V é', 'Exercícios de fixação da seção 1'],
    ['340/2/Math.SQRT2', '≈ 120 V', 'Exercícios de fixação da seção 2'], ['2*170/Math.PI', '108 V (2·170/π)', 'Exercícios de fixação da seção 2'], ['2*Math.SQRT2*220', '≈ 622 V', 'Exercícios de fixação da seção 2'],
    ['200/Math.PI', '≈ 63,7 V', 'Exercícios de fixação da seção 2'], ['(141.4/Math.SQRT2)**2/10', '= 1.000 W', 'Exercícios de fixação da seção 2'], ['141.4**2/10', '2.000 W: exatamente', 'Exercícios de fixação da seção 2'],
    ['Math.hypot(6,8)', '= 10 (triângulo', 'Exercícios de fixação da seção 3'], ['Math.atan(8/6)*180/Math.PI', '= 53,13°', 'Exercícios de fixação da seção 3'], ['20/5', '= 4 e 30°', 'Exercícios de fixação da seção 3'],
    ['20*5', '100∠−30° é', 'Exercícios de fixação da seção 3'], ['Math.hypot(3,4)', '5∠53,13° A; o amperímetro', 'Exercícios de fixação da seção 3'], ['311/Math.SQRT2', '≈ 220 V; ângulo', 'Exercícios de fixação da seção 3'],
    ['2*Math.PI*60*0.1', '= 37,7 Ω', 'Exercícios de fixação da seção 4'], ['1/(2*Math.PI*60*100e-6)', '≈ 26,5 Ω', 'Exercícios de fixação da seção 4'], ['100/Math.hypot(30,40)*30', '= 60 V', 'Exercícios de fixação da seção 4'],
    ['100/Math.hypot(30,40)*40', 'VL = 80 V', 'Exercícios de fixação da seção 4'], ['50/10*30', '= 150 V', 'Exercícios de fixação da seção 4'],
    ['1/(2*Math.PI*Math.sqrt(0.01*10e-6))', '≈ 503 Hz', 'Exercícios de fixação da seção 4'], ['1/Math.sqrt(0.01*10e-6)', '3.162 Hz', 'Exercícios de fixação da seção 4'],
  ],
};

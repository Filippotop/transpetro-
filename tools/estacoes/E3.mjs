/* Estação E3: os blocos 5 e 6 da apostila de CA (fontes/circuitos-ca-trifasicos.html) e uma seção nova, escrita para
   o app (tools/estacoes/E3-energia-wattimetros.html: energia, medidor de energia e método dos dois wattímetros, que
   caíram nas questões 21 e 58 de 2023 e não estavam na apostila). Aqui ficam os metadados, as trocas de texto
   (correções em fontes/ERRATA.md e ajustes de contexto), o formulário, o resumo, os cartões, o V ou F e as contas.
   Gerar: node tools/estacao.mjs fontes/circuitos-ca-trifasicos.html E3 --secoes 5-7 */
import fs from 'node:fs';

const FONTE = 'fontes/circuitos-ca-trifasicos.html';
const SRC = fs.readFileSync(new URL('../../' + FONTE, import.meta.url), 'utf8');
const secao = id => SRC.match(new RegExp(`<section id="${id}" class="block">[\\s\\S]*?</section>`))[0];
const NOVA = fs.readFileSync(new URL('./E3-energia-wattimetros.html', import.meta.url), 'utf8');

const v = s => `<var>${s}</var>`;
const fr = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
const p = (...xs) => xs.map(x => `<span class="eq-part">${x}</span>`).join('');
const sub = (x, s) => `${v(x)}<sub>${s}</sub>`;
const B = x => `<b>${x}</b>`;
const W = n => sub('W', n);

export default {
  fonte: FONTE,
  meta: {
    id: 'E3', vol: 'EL', line: 'E',
    title: 'Potência, fator de potência e trifásicos',
    itens: '3.1, 3.2, 3.3, 4.1, 4.2', faixa: 'A', peso2023: 8,
    note: 'Potência, fator de potência e ligações Y e Δ caíram em oito questões de 2023: cinco do item 3 (energia, potências, FP e wattímetros) e três do item 4. É também a conta de todo dia em motores, quadros e instalações.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  labs: { lab1: 'potencia-ca', lab2: 'trifasica-equilibrada', lab3: 'dois-wattimetros' },
  secoes: { b7: NOVA },
  trocas: [
    /* ---- correções técnicas (fontes/ERRATA.md) ---- */
    { errata: 'E3-1', de: 'Por isso a regulação da ANEEL estabelece um fator de potência de referência de 0,92, abaixo do qual o consumidor atendido nessas condições paga pelo excedente de reativos.',
      para: 'Por isso a regulação da ANEEL (Resolução Normativa nº 1.000/2021) fixa o fator de potência de referência em 0,92, indutivo ou capacitivo: as unidades consumidoras do <b>grupo A</b> (atendidas em média ou alta tensão, como indústrias) que ficam abaixo dele pagam pelo excedente de reativos. Consumidores do grupo B (baixa tensão, como residências) não têm essa cobrança.' },
    { errata: 'E3-2', de: '<dd>adimensional, entre 0 e 1; “indutivo” (atrasado) se a corrente atrasa, “capacitivo” (adiantado) se adianta</dd>',
      para: '<dd>adimensional, entre 0 e 1; “indutivo” (atrasado) se a corrente atrasa, “capacitivo” (adiantado) se adianta. FP = cos φ vale com tensão e corrente senoidais; com correntes distorcidas (harmônicos), FP = P/S continua valendo e fica ≤ cos φ, com φ medido entre as fundamentais (60 Hz) da tensão e da corrente</dd>' },
    /* ---- figuras: rótulo que a fonte do app (mais larga que a da apostila) jogava sobre o fio da linha C ---- */
    { de: '<text x="420" y="240" class="ts">cada Z fica sob V', para: '<text x="372" y="268" class="ts">cada Z fica sob V' },
    /* ---- contexto do app ---- */
    { de: 'Ponte com os itens 3.2 e 3.3 do edital: o essencial para os circuitos trifásicos', para: 'Edital, itens 3.2 e 3.3' },
    { de: 'O cálculo detalhado de bancos de capacitores pertence ao item 3.3 e fica para o material de potência.',
      para: 'Para a prova, basta a conta do quadro abaixo: quanto de reativo capacitivo instalar para levar o fator de potência de um valor a outro.' },
    /* Exemplos numerados dentro da estação (na apostila, 5 e 6; os da seção nova são o 3 e o 4). */
    { de: '<p class="box-title">Exemplo resolvido 5</p>', para: '<p class="box-title">Exemplo resolvido 1</p>' },
    { de: '<p class="box-title">Exemplo resolvido 6</p>', para: '<p class="box-title">Exemplo resolvido 2</p>' },
    { de: 'O comando e a proteção dessa partida são do item 5.7.', para: 'O comando e a proteção dessa partida são do item 5.7 (acionamentos e comando de motores).' },
    { de: secao('antes'), para: `<section id="antes" class="block">
  <div class="block-head"><h2>Antes de começar</h2></div>
  <p>Esta estação cobre os seguintes itens do conteúdo programático da <b>Ênfase 8 — Manutenção – Elétrica</b> (Anexo IV do Edital nº 03), conferidos no texto oficial:</p>
  <ul>
    <li><b>3.1</b> Conceito, cálculos e medidas de potência e energia elétrica;</li>
    <li><b>3.2</b> Potência ativa, reativa e aparente;</li>
    <li><b>3.3</b> Fator de potência e correção do fator de potência;</li>
    <li><b>4.1</b> Circuitos elétricos monofásicos e trifásicos;</li>
    <li><b>4.2</b> Tensão de linha, tensão de fase e ligações estrela e triângulo.</li>
  </ul>
  <p>Ela usa a estação E2 inteira: valor eficaz, fasores, impedância e o ângulo φ entre tensão e corrente. A seção 3 (energia, medidor de energia e método dos dois wattímetros) foi escrita para o app, porque esses assuntos caíram em 2023 e não estavam na apostila de CA. O uso do wattímetro também é do item <b>7.3</b> (instrumentos de medição de corrente, tensão, potência e isolação), e a partida estrela-triângulo volta no item 5.7.</p>
  <div class="box cesg">
    <p class="box-title">Como a Cesgranrio tem cobrado esse assunto</p>
    <p>Na prova de 2023 da própria Transpetro (Manutenção – Elétrica), oito das 40 questões específicas foram desta estação. Do item 3: a 21 (voltas do disco de um medidor de energia, com cargas ligadas por alguns minutos), a 22 (reativa vista por um quadro com dois motores e um banco de capacitores), a 23 (fator de potência a partir das leituras de reativa e de aparente), a 56 (impedância a partir das leituras de wattímetro, amperímetro e voltímetro) e a 58 (método dos dois wattímetros). Do item 4: a 24 (corrente total de duas cargas, uma em Δ e outra em Y, com a tensão de linha escrita como “200√3 V”), a 25 (razão entre as correntes de fase de cargas em Δ e em Y) e a 30 (corrente de fase de um gerador ligado em Δ, a partir dos dados de placa). É um <b>padrão observado</b>, não garantia de repetição, mas indica o estilo: contas curtas, triângulo 3-4-5, √3 embutido nos dados e muita conversão entre fase e linha.</p>
  </div>
</section>` },
    { de: secao('fontes'), para: `<section id="fontes" class="block">
  <div class="block-head"><h2>Fontes</h2></div>
  <ul class="sources">
    <li>Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO-2026.3, Anexo IV, conteúdo programático da Ênfase 8 (Manutenção – Elétrica), itens 3.1 a 3.3, 4.1 e 4.2 — conferido no PDF do edital.</li>
    <li>Caderno da prova Cesgranrio 2023, Transpetro, Técnico de Manutenção – Elétrica (questões 21 a 25, 30, 56 e 58), e a listagem de questões no <a href="https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-tecnico-de-manutencao-eletrica/questoes?page=2">Qconcursos</a> (usadas apenas para identificar o estilo de cobrança; os exemplos e exercícios desta estação têm números próprios).</li>
    <li>ANEEL, Resolução Normativa nº 1.000/2021 (fator de potência de referência de 0,92 para o grupo A; sem cobrança de reativo excedente no grupo B), conforme citada em O Setor Elétrico, <a href="https://www.osetoreletrico.com.br/?p=42765">“A Resolução 1000 da Aneel”</a>; o texto oficial da ANEEL não foi consultado nesta revisão.</li>
    <li>Bibliografia de apoio para aprofundar a teoria: R. L. Boylestad, <i>Introdução à Análise de Circuitos</i> (Pearson); C. K. Alexander e M. N. O. Sadiku, <i>Fundamentos de Circuitos Elétricos</i> (AMGH), inclusive o método dos dois wattímetros na medição de potência trifásica.</li>
    <li>Revisão técnica do app (outubro de 2026): as contas dos 4 exemplos resolvidos e dos 16 exercícios recalculadas por teste automático; conceitos conferidos em Alexander e Sadiku, em Boylestad e em T. Kuphaldt, <i>Lessons in Electric Circuits</i>, vol. II (LibreTexts). Dois trechos ganharam precisão: o fator de potência de referência da ANEEL (quem paga o excedente) e a relação entre FP e cos φ com harmônicos (seção 1). A seção 3 é nova.</li>
  </ul>
  <footer>Exercícios elaborados no estilo da banca para fixação; não são questões oficiais.</footer>
</section>` },
  ],
  /* Exercícios da seção nova, no formato do QUIZ da apostila. */
  quiz: {
    b7: [
      { s: 'Um medidor de energia monofásico de disco tem constante de 500 voltas/kWh. Uma estufa de 1,5 kW fica ligada por 40 minutos. O número de voltas que o disco dá nesse período é',
        o: ['300', '500', '750', '1.000', '30.000'], a: 1,
        c: 'E = P·Δt = 1,5 kW × (40/60) h = 1,0 kWh, e N = 1,0 kWh × 500 voltas/kWh = 500 voltas. 300 sai de tomar 40 minutos como 0,4 h; 750 esquece o tempo (seria o resultado em 1 hora); 30.000 multiplica pelos minutos sem converter; 1.000 é a energia em Wh, não o número de voltas.' },
      { s: 'Numa carga trifásica equilibrada, a três fios, o método dos dois wattímetros indicou W<sub>1</sub> = 6,0 kW e W<sub>2</sub> = 2,0 kW. As potências ativa e reativa totais da carga são, respectivamente, de aproximadamente',
        o: ['8,0 kW e 6,9 kvar', '4,0 kW e 6,9 kvar', '8,0 kW e 4,0 kvar', '13,9 kW e 6,9 kvar', '8,0 kW e 13,9 kvar'], a: 0,
        c: 'P = W<sub>1</sub> + W<sub>2</sub> = 8,0 kW; Q = √3·(W<sub>1</sub> − W<sub>2</sub>) = √3 × 4,0 ≈ 6,9 kvar. 4,0 kW usa a diferença no lugar da soma; 4,0 kvar esquece o √3; 13,9 kW multiplica a soma por √3; 13,9 kvar aplica o √3 à soma, e não à diferença.' },
      { s: 'Ao medir a potência de um motor trifásico (carga equilibrada) pelo método dos dois wattímetros, o técnico observa que um dos wattímetros indica zero. Conclui-se que o fator de potência do motor é',
        o: ['0', '0,5', '0,707', '0,866', '1'], a: 1,
        c: 'Com carga equilibrada, as leituras são V<sub>L</sub>I<sub>L</sub>·cos(φ − 30°) e V<sub>L</sub>I<sub>L</sub>·cos(φ + 30°). Uma delas zera quando φ + 30° = 90°, isto é, φ = 60° e FP = cos 60° = 0,5. Com FP = 1, as leituras são iguais; com FP = 0, iguais e opostas; com FP = 0,866 (φ = 30°), uma é a metade da outra; com 0,707 (φ = 45°), as duas são positivas e diferentes.' },
    ],
  },
  formulario: [
    'Potências monofásicas',
    ['Fator de potência', p(`FP = ${fr(v('P'), v('S'))} = cos ${v('φ')}`), 'indutivo: corrente atrasada; capacitivo: adiantada; referência da ANEEL (grupo A): 0,92'],
    'Correção de FP', 'Estrela', 'Triângulo', 'Potência trifásica', 'Equivalência Y–Δ',
    ['Energia', p(`${v('E')} = ${v('P')} · Δ${v('t')}`, '1 kWh = 3,6 × 10<sup>6</sup> J'), 'tempo em minutos: divida por 60; várias cargas: some carga a carga'],
    ['Medidor de energia', p(`${v('N')} = ${fr(v('E'), sub('K', 'd'))}`, `${v('P')} = ${fr('3.600 · ' + sub('K', 'd') + ' · ' + v('N'), 'Δ' + v('t'))}`), 'K<sub>d</sub> em Wh/volta (= 1.000 ÷ rev/kWh); Δt em segundos'],
    ['Dois wattímetros', p(`${v('P')} = ${W('1')} + ${W('2')}`, `${v('Q')} = √3 · (${W('1')} − ${W('2')})`), 'P: soma algébrica, qualquer carga a 3 fios; Q: só carga equilibrada'],
    ['Leituras (carga equilibrada)', p(`${W('1')} = ${sub('V', 'L')}${sub('I', 'L')} · cos(${v('φ')} − 30°)`, `${W('2')} = ${sub('V', 'L')}${sub('I', 'L')} · cos(${v('φ')} + 30°)`), 'FP = 0,5: uma leitura zera; FP &lt; 0,5: uma fica negativa'],
  ],
  formulaHtml: {
    'Potências monofásicas': p(`${v('P')} = ${v('V')}${v('I')} · cos ${v('φ')}`, `${v('Q')} = ${v('V')}${v('I')} · sen ${v('φ')}`, `${v('S')} = ${v('V')}${v('I')}`),
    'Correção de FP': p(`${sub('Q', 'C')} = ${v('P')} · (tg ${sub('φ', '1')} − tg ${sub('φ', '2')})`),
    'Estrela': p(`${sub('V', 'L')} = √3 · ${sub('V', 'F')}`, `${sub('I', 'L')} = ${sub('I', 'F')}`),
    'Triângulo': p(`${sub('V', 'L')} = ${sub('V', 'F')}`, `${sub('I', 'L')} = √3 · ${sub('I', 'F')}`),
    'Potência trifásica': p(`${v('P')} = √3 · ${sub('V', 'L')} · ${sub('I', 'L')} · cos ${v('φ')}`, `${v('P')} = 3 · ${sub('V', 'F')} · ${sub('I', 'F')} · cos ${v('φ')}`),
    'Equivalência Y–Δ': p(`${sub('Z', 'Y')} = ${fr(sub('Z', 'Δ'), '3')}`),
  },
  resumo: [
    ['P, Q e S', 'P = VI·cos φ (W); Q = VI·sen φ (var); S = VI (VA); S² = P² + Q². Só os resistores consomem P.'],
    ['Fator de potência', 'FP = P/S = cos φ. Indutivo: corrente atrasada. Referência da ANEEL para o grupo A: 0,92.'],
    ['Correção do FP', 'Capacitores em paralelo: Q<sub>C</sub> = P·(tg φ<sub>1</sub> − tg φ<sub>2</sub>). P não muda; S e a corrente caem.'],
    ['Estrela × triângulo', 'Y: V<sub>L</sub> = √3·V<sub>F</sub> e I<sub>L</sub> = I<sub>F</sub>. Δ: V<sub>L</sub> = V<sub>F</sub> e I<sub>L</sub> = √3·I<sub>F</sub>. Z<sub>Y</sub> = Z<sub>Δ</sub>/3.'],
    ['Potência trifásica', 'P = √3·V<sub>L</sub>·I<sub>L</sub>·cos φ = 3·V<sub>F</sub>·I<sub>F</sub>·cos φ, com φ da impedância de fase.'],
    ['Medidor de energia', 'E = P·Δt (minutos ÷ 60) e N = E/K<sub>d</sub>, com K<sub>d</sub> em Wh por volta do disco.'],
    ['Dois wattímetros', 'P = W<sub>1</sub> + W<sub>2</sub> (soma algébrica); Q = √3·(W<sub>1</sub> − W<sub>2</sub>). Leitura negativa: FP &lt; 0,5.'],
  ],
  cards: [
    ['Unidades das potências ativa, reativa e aparente?', 'W, var e VA.'],
    ['Instalação com S = 125 kVA e Q = 75 kvar indutivos: P e FP?', 'P = √(125² − 75²) = 100 kW (triângulo 3-4-5); FP = 100/125 = 0,8.'],
    ['O que é FP indutivo e FP capacitivo?', 'Indutivo (atrasado): a corrente atrasa da tensão. Capacitivo (adiantado): a corrente se adianta.'],
    ['Qual o FP de referência da ANEEL, e quem paga o excedente de reativos?', '0,92, indutivo ou capacitivo. Pagam as unidades do grupo A (média e alta tensão); o grupo B não tem essa cobrança.'],
    ['O que muda ao instalar capacitores em paralelo com um motor?', 'Caem Q, S e a corrente da fonte. A potência ativa e a potência mecânica do motor não mudam.'],
    ['Como calcular o banco de capacitores?', 'Q<sub>C</sub> = P·(tg φ<sub>1</sub> − tg φ<sub>2</sub>), com φ<sub>1</sub> antes e φ<sub>2</sub> depois da correção.'],
    ['Em estrela, que tensão recebe cada impedância?', 'A de fase: V<sub>L</sub>/√3. Rede de 380 V → cerca de 220 V por fase.'],
    ['Em triângulo, como se relacionam as correntes de linha e de fase?', 'I<sub>L</sub> = √3·I<sub>F</sub>, e, na sequência ABC, I<sub>L</sub> fica atrasada 30° da corrente de fase.'],
    ['P = √3·V<sub>L</sub>·I<sub>L</sub>·cos φ: o que é o φ?', 'O ângulo da impedância de cada fase (entre V<sub>F</sub> e I<sub>F</sub>), não o ângulo entre V<sub>L</sub> e I<sub>L</sub>.'],
    ['Mesmas três impedâncias, mesma rede: Y ou Δ consome mais, e quanto?', 'Triângulo, 3 vezes mais. A corrente de linha também triplica.'],
    ['Triângulo com 60 Ω por fase: qual a estrela equivalente?', '20 Ω por fase (Z<sub>Δ</sub>/3). Dividir por √3 é o erro comum.'],
    ['Motor 220/380 V numa rede de 380 V: estrela ou triângulo?', 'Estrela: cada bobina recebe 380/√3 ≈ 220 V. Tensão maior da placa → Y.'],
    ['O neutro de uma carga desequilibrada em estrela se rompe. O que acontece?', 'O ponto neutro da carga se desloca: as fases com pouca carga recebem sobretensão e queimam aparelhos.'],
    ['Medidor de 2 Wh/volta; carga de 900 W por 20 minutos. Quantas voltas?', 'E = 900 × 20/60 = 300 Wh; N = 300/2 = 150 voltas.'],
    ['Como converter rev/kWh em Wh/volta?', 'K<sub>d</sub> = 1.000/K<sub>r</sub>. Exemplo: 500 rev/kWh = 2 Wh/volta.'],
    ['Disco de 3 Wh/volta dá 10 voltas em 30 s. Qual a potência?', 'P = 3.600 × 3 × 10/30 = 3.600 W.'],
    ['Método dos dois wattímetros: como se obtém a potência total?', 'Pela soma algébrica W<sub>1</sub> + W<sub>2</sub>, com o sinal de cada leitura.'],
    ['Carga equilibrada: quando uma leitura dos dois wattímetros fica negativa?', 'Com FP abaixo de 0,5 (φ &gt; 60°). Em FP = 0,5, ela zera; em FP = 1, as duas são iguais.'],
    ['Quantos wattímetros para medir P a 3 fios e a 4 fios?', '2 e 3 (teorema de Blondel: n − 1 wattímetros para n fios).'],
    ['Como achar Q pelo método dos dois wattímetros?', 'Q = √3·(W<sub>1</sub> − W<sub>2</sub>), só com carga equilibrada e tensões simétricas.'],
  ],
  vf: [
    ['Ao corrigir o fator de potência com capacitores em paralelo, a potência ativa consumida pela carga diminui.', false, 'A potência ativa <b>não muda</b>; caem a reativa, a aparente e a corrente da fonte.'],
    ['Uma instalação com 200 kVA de potência aparente e 120 kvar de reativa tem fator de potência 0,6.', false, 'P = √(200² − 120²) = 160 kW e FP = 160/200 = <b>0,8</b>. 0,6 é Q/S, o seno.'],
    ['Fator de potência capacitivo indica corrente adiantada em relação à tensão.', true, 'Capacitivo = adiantado (a corrente se adianta); indutivo = atrasado.'],
    ['A ANEEL fixa o fator de potência de referência em 0,92, e as unidades do grupo A abaixo dele pagam pelo excedente de reativos.', true, 'Resolução Normativa nº 1.000/2021: 0,92, indutivo ou capacitivo, para o grupo A. O grupo B não paga reativo excedente.'],
    ['Numa carga equilibrada em estrela, a corrente de linha é √3 vezes a corrente de fase.', false, 'Em estrela, I<sub>L</sub> = I<sub>F</sub>; o √3 fica na <b>tensão</b>. A relação I<sub>L</sub> = √3·I<sub>F</sub> é do triângulo.'],
    ['Na sequência ABC, a tensão de linha V<sub>AB</sub> está adiantada 30° em relação à tensão de fase V<sub>AN</sub>.', true, 'V<sub>AB</sub> = V<sub>AN</sub> − V<sub>BN</sub> = √3·V<sub>AN</sub>∠+30°.'],
    ['Em P = √3·V<sub>L</sub>·I<sub>L</sub>·cos φ, o φ é o ângulo entre a tensão de linha e a corrente de linha.', false, 'É o ângulo da <b>impedância de cada fase</b> (entre V<sub>F</sub> e I<sub>F</sub>); entre V<sub>L</sub> e I<sub>L</sub> há mais 30°.'],
    ['As mesmas três impedâncias, na mesma rede, consomem três vezes mais potência ligadas em triângulo do que em estrela.', true, 'Em Δ, cada impedância recebe √3 vezes mais tensão; a potência vai com o quadrado: (√3)² = 3.'],
    ['A estrela equivalente a um triângulo equilibrado de 90 Ω por fase tem 30 Ω por fase.', true, 'Z<sub>Y</sub> = Z<sub>Δ</sub>/3 = 90/3 = 30 Ω.'],
    ['Com carga equilibrada, o neutro de um sistema a quatro fios conduz a soma aritmética das correntes de fase.', false, 'Com carga equilibrada, a soma <b>fasorial</b> das correntes é zero, e o neutro não conduz.'],
    ['Um medidor de 5 Wh/volta dá 100 voltas quando uma carga de 600 W funciona por 50 minutos.', true, 'E = 600 × 50/60 = 500 Wh; N = 500/5 = 100 voltas.'],
    ['No método dos dois wattímetros, a potência ativa total é o produto das duas leituras.', false, 'É a <b>soma algébrica</b>: P = W<sub>1</sub> + W<sub>2</sub>, cada leitura com o seu sinal.'],
    ['Numa carga equilibrada com fator de potência 0,4, uma das leituras do método dos dois wattímetros é negativa.', true, 'FP 0,4 → φ ≈ 66°, e cos(φ + 30°) = cos 96° &lt; 0. Abaixo de FP 0,5, uma leitura sempre fica negativa.'],
    ['A fórmula Q = √3·(W<sub>1</sub> − W<sub>2</sub>) vale para qualquer carga trifásica a três fios, equilibrada ou não.', false, 'Só com carga <b>equilibrada</b> (e tensões simétricas). O que vale sempre a três fios é P = W<sub>1</sub> + W<sub>2</sub>.'],
  ],
  contas: [
    ['220*5', '1100 VA', 'Exemplo resolvido 1'], ['1100*0.8', '880 W', 'Exemplo resolvido 1'], ['1100*0.6', '660 var', 'Exemplo resolvido 1'], ['Math.hypot(880,660)', '= 1100', 'Exemplo resolvido 1'],
    ['Math.hypot(30,40)', '= 50 Ω', 'Exemplo resolvido 2'], ['30/50', '0,6', 'Exemplo resolvido 2'], ['380/50', '7,6 A', 'Exemplo resolvido 2'], ['Math.sqrt(3)*7.6', '13,16 A', 'Exemplo resolvido 2'],
    ['3*7.6**2*30', '5198 W', 'Exemplo resolvido 2'], ['Math.sqrt(3)*380*13.16*0.6', '5197 W', 'Exemplo resolvido 2'], ['50/3', '16,67 Ω', 'Exemplo resolvido 2'],
    ['380/Math.sqrt(3)', '219,4 V', 'Exemplo resolvido 2'], ['219.4/16.67', '≈ 13,16 A ✓', 'Exemplo resolvido 2'],
    ['600*20/60', '200 Wh', 'Exemplo resolvido 3'], ['4*15*2', '120 Wh', 'Exemplo resolvido 3'], ['200+120', '320 Wh', 'Exemplo resolvido 3'], ['320/4', '80 voltas', 'Exemplo resolvido 3'],
    ['3600*4*12/60', '2.880 W', 'Exemplo resolvido 3'], ['12*4', '48 Wh', 'Exemplo resolvido 3'],
    ['Math.acos(0.8)*180/Math.PI', '36,87°', 'Exemplo resolvido 4'], ['380*10', '3.800 VA', 'Exemplo resolvido 4'],
    ['3800*Math.cos((36.87-30)*Math.PI/180)', '3.773 W', 'Exemplo resolvido 4'], ['3800*Math.cos((36.87+30)*Math.PI/180)', '1.493 W', 'Exemplo resolvido 4'],
    ['3773+1493', '5.266 W', 'Exemplo resolvido 4'], ['Math.sqrt(3)*380*10*0.8', '5.265 W', 'Exemplo resolvido 4'], ['Math.sqrt(3)*(3773-1493)', '3.949 var', 'Exemplo resolvido 4'],
    ['Math.sqrt(3)*3800*0.6', '3.949 var', 'Exemplo resolvido 4'], ['5.0+(-1.0)', '4,0 kW', 'Exemplo resolvido 4'], ['5+1', '6,0 kW', 'Exemplo resolvido 4'],
    ['Math.sqrt(3)*(5-(-1))', '10,4 kvar', 'Exemplo resolvido 4'], ['Math.sqrt(3)*6/4', '≈ 2,6', 'Exemplo resolvido 4'],
    ['Math.atan(Math.sqrt(3)*6/4)*180/Math.PI', 'φ ≈ 69°', 'Exemplo resolvido 4'], ['Math.cos(Math.atan(Math.sqrt(3)*6/4))', 'FP ≈ 0,36', 'Exemplo resolvido 4'],
    ['Math.sqrt(100**2-60**2)', '= 80 kW', 'Exercícios de fixação da seção 1'], ['80/100', 'FP = P/S = 0,8', 'Exercícios de fixação da seção 1'],
    ['220*10*0.6', '= 1.320 var', 'Exercícios de fixação da seção 1'], ['220*10*0.8', '1.760 W é', 'Exercícios de fixação da seção 1'],
    ['40*0.75', '= 30 kvar', 'Exercícios de fixação da seção 1'], ['40/0.8', '50 kVA é', 'Exercícios de fixação da seção 1'],
    ['100/Math.hypot(8,6)', 'I = 10 A', 'Exercícios de fixação da seção 1'], ['10**2*8', '= 800 W', 'Exercícios de fixação da seção 1'], ['100**2/8', '1.250 W sai', 'Exercícios de fixação da seção 1'],
    ['220/Math.sqrt(3)', '≈ 127 V', 'Exercícios de fixação da seção 2'], ['127/12.7', '= 10 A', 'Exercícios de fixação da seção 2'], ['220/12.7', '17,3 A resultaria', 'Exercícios de fixação da seção 2'],
    ['Math.sqrt(3)*220/12.7', '≈ 30 A', 'Exercícios de fixação da seção 2'], ['Math.sqrt(3)*380*20*0.85', '≈ 11.190 W', 'Exercícios de fixação da seção 2'],
    ['380*20*0.85/1000', '6,5 kW; com 3', 'Exercícios de fixação da seção 2'], ['3*380*20*0.85/1000', '19,4 kW', 'Exercícios de fixação da seção 2'],
    ['Math.sqrt(3)*380*20/1000', '13,2 kVA', 'Exercícios de fixação da seção 2'], ['380/Math.sqrt(3)', '≈ 220 V. Em Δ', 'Exercícios de fixação da seção 2'],
    ['3*10**2*16', '= 4.800 W', 'Exercícios de fixação da seção 2'], ['3*200*10', '6.000 VA', 'Exercícios de fixação da seção 2'], ['3*10**2*12', '3.600 var', 'Exercícios de fixação da seção 2'],
    ['60/3', '= 20 Ω', 'Exercícios de fixação da seção 2'], ['60/Math.sqrt(3)', '(34,6 Ω)', 'Exercícios de fixação da seção 2'],
    ['1.5*40/60*500', '= 500 voltas', 'Exercícios de fixação da seção 3'], ['1.5*0.4*500', '300 sai', 'Exercícios de fixação da seção 3'], ['1.5*500', '750 esquece', 'Exercícios de fixação da seção 3'],
    ['1.5*40*500', '30.000 multiplica', 'Exercícios de fixação da seção 3'], ['6+2', '= 8,0 kW', 'Exercícios de fixação da seção 3'], ['Math.sqrt(3)*(6-2)', '≈ 6,9 kvar', 'Exercícios de fixação da seção 3'],
    ['Math.sqrt(3)*8', '13,9 kW multiplica', 'Exercícios de fixação da seção 3'], ['Math.cos(Math.PI/3)', '= 0,5. Com FP', 'Exercícios de fixação da seção 3'],
  ],
};

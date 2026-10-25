/* Estação I1: a apostila de instalações elétricas prediais e NBR 5410 (fontes/instalacoes-nbr5410.html), blocos 1 a 5.
   Aqui ficam os metadados, as trocas de texto (correções em fontes/ERRATA.md, precisões e o que faltava para os padrões
   de 2023: esquema TN, neutro rompido, queda unitária em V/(A·km), canalizações e princípios da norma), a figura nova
   dos esquemas de aterramento, a calculadora nova de queda de tensão, o formulário, o resumo, os cartões, o V ou F e
   as contas.
   Gerar: node tools/estacao.mjs fontes/instalacoes-nbr5410.html I1 --secoes 1-5 */
import fs from 'node:fs';

const FONTE = 'fontes/instalacoes-nbr5410.html';
const SRC = fs.readFileSync(new URL('../../' + FONTE, import.meta.url), 'utf8');
const secao = id => SRC.match(new RegExp(`<section id="${id}" class="block">[\\s\\S]*?</section>`))[0];
/* A linha inteira da fonte (sem o recuo) que contém o trecho; o trecho precisa estar numa linha só. */
const linha = s => { const ls = SRC.split('\n').filter(l => l.includes(s)); if (ls.length !== 1) throw new Error(`I1: "${s.slice(0, 50)}" está em ${ls.length} linhas`); return ls[0].trim(); };
/* Um exercício do objeto QUIZ da apostila, do "{s:" até o fim do comentário. */
const exercicio = ini => { const i = SRC.indexOf('{s:"' + ini); if (i < 0) throw new Error('I1: exercício não achado: ' + ini); return SRC.slice(i, SRC.indexOf('"}', i) + 2); };
const novo = ({ s, o, a, c }) => `{s:${JSON.stringify(s)},\n  o:${JSON.stringify(o)},a:${a},\n  c:${JSON.stringify(c)}}`;

const v = s => `<var>${s}</var>`;
const fr = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
const p = (...xs) => xs.map(x => `<span class="eq-part">${x}</span>`).join('');
const sub = (x, s) => `${v(x)}<sub>${s}</sub>`;

/* ---- Figura nova dos esquemas de aterramento: 2 colunas × 3 linhas (a da apostila, com 660 de largura e rótulos de
   11 px, ficava ilegível no celular). Cada quadro: fonte (com o aterramento dela), condutores e a massa. ---- */
function esquemas() {
  const out = [];
  const t = (x, y, s, c = 'ts', a = 'start') => `<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${s}</text>`;
  const ln = (x1, y1, x2, y2, c = 'wire') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
  const terra = (x, y) => ln(x, y, x, y + 12) + ln(x - 11, y + 12, x + 11, y + 12) + ln(x - 7, y + 17, x + 7, y + 17) + ln(x - 3, y + 22, x + 3, y + 22);
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="3.5" class="f-ink"/>`;
  const quadro = (ox, oy, nome, corpo) => {
    out.push(t(ox + 125, oy + 20, nome, 'tl', 'middle'));
    out.push(`<rect x="${ox + 8}" y="${oy + 34}" width="46" height="84" class="core"/>` + t(ox + 31, oy + 81, 'fonte', 'tm', 'middle'));
    out.push(`<rect x="${ox + 172}" y="${oy + 34}" width="70" height="84" class="relay"/>` + t(ox + 207, oy + 81, 'massa', 'tm', 'middle'));
    out.push(corpo);
  };
  const Y = [46, 76, 106];
  /* TN-S */
  let ox = 0, oy = 0;
  quadro(ox, oy, 'TN-S', ln(ox + 54, oy + Y[0], ox + 172, oy + Y[0], 'wire pa-s') + ln(ox + 54, oy + Y[1], ox + 172, oy + Y[1], 'wire pc-s') + ln(ox + 54, oy + Y[2], ox + 172, oy + Y[2], 'wire pb-s') +
    t(ox + 96, oy + Y[0] - 6, 'L', 'ts fa') + t(ox + 96, oy + Y[1] - 6, 'N', 'ts fc') + t(ox + 96, oy + Y[2] - 6, 'PE', 'ts fb') +
    ln(ox + 68, oy + Y[1], ox + 68, oy + Y[2]) + dot(ox + 68, oy + Y[1]) + dot(ox + 68, oy + Y[2]) + dot(ox + 172, oy + Y[2]) + terra(ox + 31, oy + 118));
  /* TN-C */
  ox = 270;
  quadro(ox, oy, 'TN-C', ln(ox + 54, oy + Y[0], ox + 172, oy + Y[0], 'wire pa-s') + ln(ox + 54, oy + Y[1], ox + 172, oy + Y[1], 'wire pb-s') +
    t(ox + 96, oy + Y[0] - 6, 'L', 'ts fa') + t(ox + 96, oy + Y[1] - 6, 'PEN', 'ts fb') + dot(ox + 172, oy + Y[1]) + terra(ox + 31, oy + 118) +
    t(ox + 125, oy + 150, 'N e PE no mesmo condutor', 'tm', 'middle'));
  /* TN-C-S */
  ox = 0; oy = 180;
  quadro(ox, oy, 'TN-C-S', ln(ox + 54, oy + Y[0], ox + 172, oy + Y[0], 'wire pa-s') + ln(ox + 54, oy + Y[1], ox + 112, oy + Y[1], 'wire pb-s') + ln(ox + 112, oy + Y[1], ox + 172, oy + Y[1], 'wire pc-s') +
    ln(ox + 112, oy + Y[1], ox + 112, oy + Y[2]) + ln(ox + 112, oy + Y[2], ox + 172, oy + Y[2], 'wire pb-s') + dot(ox + 112, oy + Y[1]) + dot(ox + 172, oy + Y[2]) +
    t(ox + 96, oy + Y[0] - 6, 'L', 'ts fa') + t(ox + 60, oy + Y[1] - 6, 'PEN', 'ts fb') + t(ox + 132, oy + Y[1] - 6, 'N', 'ts fc') + t(ox + 132, oy + Y[2] - 6, 'PE', 'ts fb') + terra(ox + 31, oy + 118) +
    t(ox + 125, oy + 160, 'separados daqui em diante', 'tm', 'middle'));
  /* TT */
  ox = 270;
  quadro(ox, oy, 'TT', ln(ox + 54, oy + Y[0], ox + 172, oy + Y[0], 'wire pa-s') + ln(ox + 54, oy + Y[1], ox + 172, oy + Y[1], 'wire pc-s') +
    t(ox + 96, oy + Y[0] - 6, 'L', 'ts fa') + t(ox + 96, oy + Y[1] - 6, 'N', 'ts fc') + terra(ox + 31, oy + 118) + terra(ox + 207, oy + 118) +
    t(ox + 190, oy + 166, 'eletrodo próprio', 'tm', 'middle'));
  /* IT */
  ox = 0; oy = 360;
  quadro(ox, oy, 'IT', ln(ox + 54, oy + Y[0], ox + 172, oy + Y[0], 'wire pa-s') + ln(ox + 54, oy + Y[1], ox + 172, oy + Y[1], 'wire pc-s') +
    t(ox + 96, oy + Y[0] - 6, 'L', 'ts fa') + t(ox + 96, oy + Y[1] - 6, 'N', 'ts fc') +
    ln(ox + 31, oy + 118, ox + 31, oy + 124) + `<rect x="${ox + 23}" y="${oy + 124}" width="16" height="16" class="comp"/>` + t(ox + 31, oy + 137, 'Z', 'tm', 'middle') + terra(ox + 31, oy + 140) +
    terra(ox + 207, oy + 118) + t(ox + 50, oy + 140, 'isolada ou por Z', 'tm'));
  /* Legenda */
  ox = 270;
  const leg = [['L', 'fase', 'pa-s', 'fa'], ['N', 'neutro', 'pc-s', 'fc'], ['PE', 'proteção', 'pb-s', 'fb'], ['PEN', 'N e PE juntos', 'pb-s', 'fb']];
  out.push(t(ox + 125, oy + 20, 'Condutores', 'tl', 'middle'));
  leg.forEach(([a, b, c, f], i) => out.push(ln(ox + 14, oy + 44 + 28 * i, ox + 54, oy + 44 + 28 * i, 'wire ' + c) + t(ox + 64, oy + 49 + 28 * i, a, 'ts ' + f) + t(ox + 106, oy + 49 + 28 * i, b, 'ts')));
  return `<svg viewBox="0 0 520 540" role="img" aria-label="Esquemas de aterramento TN-S, TN-C, TN-C-S, TT e IT">${out.join('')}</svg>`;
}
const FIG_ESQ = SRC.match(/<figure><svg viewBox="0 0 660 520"[\s\S]*?<\/svg>/)[0];

/* ---- Calculadora nova: comprimento máximo pela queda unitária (o formato da questão 45 de 2023). ---- */
const LABQ = `<div class="lab" id="labq">
    <h4>Calculadora: comprimento máximo pela queda unitária</h4>
    <p class="hint">Informe a potência da carga, a tensão, a queda unitária da tabela do fabricante e o limite de queda. A calculadora dá a corrente, a queda máxima em volts, o comprimento máximo e a queda no comprimento real do circuito.</p>
    <div class="calc">
      <label><span>Potência (VA)</span><input id="qS" type="number" value="4400"></label>
      <label><span>Tensão (V)</span><input id="qV" type="number" value="220"></label>
      <label><span>Queda unitária (V/(A·km))</span><input id="qU" type="number" value="8"></label>
      <label><span>Limite (%)</span><input id="qLim" type="number" value="3"></label>
      <label><span>Comprimento real (m)</span><input id="qL" type="number" value="30"></label>
    </div>
  </div>`;

export default {
  fonte: FONTE,
  meta: {
    id: 'I1', vol: 'EL', line: 'I',
    title: 'Instalações prediais e NBR 5410',
    itens: '8.1, 8.3, 10.1 (e parte do 5.6)', faixa: 'A', peso2023: 6,
    note: 'Esquema TN, neutro rompido, queda de tensão em V/(A·km), canalizações e princípios da norma caíram em 2023 (questões 37, 42, 45, 55 e 59). O peso de 6 é o do item 8 inteiro, dividido com a I2; a 55 foi contada no item 10.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  labs: { labp: 'previsao-carga', labd: 'dimensiona-circuito', labq: 'queda-unitaria' },
  trocas: [
    /* ---- correções técnicas e precisões (fontes/ERRATA.md) ---- */
    { errata: 'I1-1', de: linha('A NBR 5410 limita a queda total, contada da origem'),
      para: '<p>Condutores longos ou finos derrubam a tensão que chega à carga. A NBR 5410 (6.2.7) limita a queda de tensão em qualquer ponto de utilização, em porcentagem da tensão nominal:</p>' },
    { errata: 'I1-1', de: linha('<li><b>7%</b> quando a origem'),
      para: '<li><b>7%</b>, contados a partir dos terminais secundários do transformador MT/BT de propriedade do consumidor (ou do transformador da distribuidora, quando o ponto de entrega fica nele) ou dos terminais de saída de um gerador próprio;</li>' },
    { errata: 'I1-1', de: linha('<li><b>5%</b> a partir do ponto de entrega'),
      para: '<li><b>5%</b>, contados a partir do ponto de entrega, nos demais casos de fornecimento em baixa tensão (tensão secundária de distribuição) pela rede da distribuidora;</li>' },
    { errata: 'I1-1', de: linha('<li>em nenhum caso a queda nos'),
      para: '<li>em nenhum caso a queda nos <b>circuitos terminais</b> (do quadro até o ponto de utilização) pode passar de <b>4%</b>, seja qual for a alimentação.</li>' },
    { errata: 'I1-2', de: exercicio('Numa instalação alimentada em baixa tensão pela rede da distribuidora'), para: novo({
      s: 'Uma indústria é alimentada por um transformador MT/BT próprio. Pela NBR 5410, a queda de tensão em qualquer ponto de utilização, contada a partir dos terminais secundários desse transformador, e a queda nos circuitos terminais não podem passar, respectivamente, de',
      o: ['4% e 7%', '7% e 4%', '5% e 5%', '10% e 4%', '7% e 7%'], a: 1,
      c: '7% a partir dos terminais secundários do transformador próprio (o mesmo vale para gerador próprio) e, em nenhum caso, mais de 4% nos circuitos terminais. “4% e 7%” inverte os papéis; 5% é o limite do fornecimento em baixa tensão pela rede da distribuidora, contado do ponto de entrega, e não é o caso de quem tem transformador próprio; 10% não é limite da norma; “7% e 7%” esquece o limite próprio dos circuitos terminais.' }) },
    { errata: 'I1-3', de: exercicio('Para proteger um circuito que alimenta um motor monofásico'), para: novo({
      s: 'Um circuito alimenta um motor monofásico cuja corrente de partida chega a cerca de 4 vezes a corrente nominal do disjuntor escolhido. Entre as curvas usuais, a mais adequada para esse disjuntor é a',
      o: ['B, que dispara no magnético entre 3 e 5 vezes I<sub>n</sub>', 'C, que dispara no magnético entre 5 e 10 vezes I<sub>n</sub>', 'D, que dispara no magnético entre 10 e 20 vezes I<sub>n</sub>', 'B, por ser a mais sensível e proteger melhor o motor', 'qualquer uma, porque a curva só muda a proteção contra sobrecarga'], a: 1,
      c: 'Com 4 × I<sub>n</sub> na partida, a curva B, que pode disparar a partir de 3 × I<sub>n</sub>, desarmaria nas partidas. A C só dispara no magnético acima de 5 × I<sub>n</sub>: aguenta a partida e ainda atua rápido num curto. A D também aguentaria, mas só garante o disparo instantâneo com 20 × I<sub>n</sub>, corrente que um curto no fim de um circuito longo pode não atingir; ela é para partidas bem mais severas, como a de transformadores. E a curva define justamente a faixa do disparo magnético (curto-circuito), não a da sobrecarga.' }) },
    { errata: 'I1-4', de: 'O eletrodo preferencial é a <b>armadura das fundações</b>; na falta dela, hastes, fitas ou cabos enterrados.',
      para: 'Toda edificação precisa de um eletrodo de aterramento, e a norma admite, nesta ordem: <b>de preferência, as próprias armaduras do concreto das fundações</b>; fitas, barras ou cabos metálicos imersos no concreto das fundações; malhas metálicas enterradas no nível das fundações, cobrindo a área da edificação; ou, no mínimo, um anel metálico enterrado circundando o perímetro da edificação. A malha e o anel podem ser complementados por hastes verticais e/ou cabos dispostos radialmente (“pés de galinha”).' },
    { errata: 'I1-5', de: 'disjuntores conforme as normas usuais já atendem essa segunda condição quando atendem a primeira',
      para: 'os disjuntores residenciais (NBR NM 60898) têm I<sub>2</sub> = 1,45·I<sub>n</sub>, então atendem essa segunda condição sempre que atendem a primeira' },
    /* ---- seção 1: os princípios que a banca transforma em alternativas (questão 55 de 2023) ---- */
    { de: '<h3>Vocabulário essencial</h3>', para: `<div class="box trap">
    <p class="box-title">Pegadinha clássica: o princípio com uma palavra trocada</p>
    <p>A banca costuma transcrever um princípio da norma e inverter um detalhe. Desconfie quando a alternativa diz que:</p>
    <ul>
      <li>a proteção contra choques é obrigatória só contra contato <b>direto</b> (as duas são obrigatórias: contato com parte viva e falha que ponha uma massa sob tensão);</li>
      <li>é <b>proibido</b> seccionar a instalação para manutenção (a norma <b>exige</b> meios de seccionamento);</li>
      <li>a manutenção pode ficar com pessoal <b>não qualificado</b> se o projeto for de um profissional;</li>
      <li>uma reforma <b>dispensa</b> inspeção porque a obra original já foi inspecionada.</li>
    </ul>
    <p>O princípio que costuma vir certo, quase com as palavras da norma: os condutores que não são vivos, mas escoam correntes de falta (como o PE), precisam suportá-las sem atingir temperaturas excessivas.</p>
  </div>
  <h3>Vocabulário essencial</h3>` },
    { de: exercicio('Entre os princípios fundamentais da NBR 5410, está o de que'), para: novo({
      s: 'O quadro novo de uma oficina foi especificado com disjuntores termomagnéticos em todos os circuitos, DR de 30 mA nos circuitos de tomadas da área de lavagem e DPS junto ao barramento de entrada. Associando cada dispositivo ao princípio fundamental da NBR 5410 que ele atende, tem-se, respectivamente, proteção contra',
      o: ['sobrecorrentes; choques elétricos; sobretensões', 'choques elétricos; sobrecorrentes; sobretensões', 'sobretensões; choques elétricos; sobrecorrentes', 'sobrecorrentes; sobretensões; choques elétricos', 'efeitos térmicos; sobrecorrentes; choques elétricos'], a: 0,
      c: 'O disjuntor termomagnético atua em sobrecargas e curtos (sobrecorrentes); o DR desliga quando parte da corrente foge para a terra, o que protege contra choques; o DPS limita os surtos (sobretensões transitórias). A alternativa (B) troca o disjuntor e o DR: o DR não vê sobrecarga nem curto entre fase e neutro. A (C) troca o DPS e o disjuntor. A (D) põe o DR contra sobretensões, função do DPS. A (E) até tem um fundo de verdade no primeiro item (cortar a sobrecarga evita aquecimento), mas põe o DR contra sobrecorrentes e o DPS contra choques, o que não é a função deles.' }) },
    { de: '(ver tabela de seções do Bloco 5)', para: '(ver a tabela de seções do PE, na seção 5)' },
    /* ---- seção 2 ---- */
    { de: 'rompimento de neutro (Bloco 5).</li>', para: 'rompimento de neutro (seção 5).</li>' },
    /* ---- seção 3: queda de tensão (questão 45 de 2023), a calculadora e o exemplo novos ---- */
    { de: linha('já considera ida e volta do circuito'),
      para: '<dt>Δ<var>V</var><sub>unit</sub></dt><dd>queda de tensão unitária, em V/(A·km), dada pelo fabricante para cada seção, maneira de instalar, fator de potência e tipo de circuito (monofásico ou trifásico); no monofásico, já conta a ida e a volta. Exemplo: 2,5 mm² em eletroduto não magnético, FP 0,8, monofásico: 14,3 V/(A·km)</dd>' },
    { de: linha('resistividade do cobre ≈ 0,0172'),
      para: '<dt><var>ρ</var></dt><dd>resistividade do cobre ≈ 0,0172 Ω·mm²/m (a 20 °C; com o cabo quente ela sobe, e a conta fica um pouco otimista); o fator 2 conta a ida e a volta</dd>' },
    { de: '<li>L = ΔV/(ΔV<sub>unit</sub> · I) = 6,6/(8 × 20) = 0,04125 km ≈ <b>41,3 m</b>.</li>\n    </ol>\n  </div>',
      para: `<li>L = ΔV/(ΔV<sub>unit</sub> · I) = 6,6/(8 × 20) = 0,04125 km ≈ <b>41,3 m</b>.</li>
    </ol>
  </div>
  ${LABQ}
  <div class="box ex">
    <p class="box-title">Exemplo resolvido 3</p>
    <p>Um circuito terminal de tomadas de uma oficina, em 127 V, tem corrente de projeto de 15 A e 35 m de comprimento. A tabela do fabricante dá, para condutores em eletroduto não magnético, circuito monofásico e FP 0,8, as quedas unitárias de 14,3 V/(A·km) (2,5 mm²) e 8,96 V/(A·km) (4 mm²). Qual seção atende ao limite dos circuitos terminais?</p>
    <ol class="steps">
      <li>Limite: 4% de 127 V = 5,08 V.</li>
      <li>2,5 mm²: ΔV = 14,3 × 15 × 0,035 ≈ 7,51 V, isto é, 7,51/127 ≈ 5,9%: <b>não atende</b>.</li>
      <li>4 mm²: ΔV = 8,96 × 15 × 0,035 ≈ 4,70 V, isto é, 4,70/127 ≈ 3,7%: <b>atende</b>. Fica o cabo de 4 mm², embora o de 2,5 mm² aguentasse a corrente (24 A no método B1): a queda de tensão é que manda aqui.</li>
    </ol>
  </div>
  <div class="box trap">
    <p class="box-title">Pegadinhas da queda de tensão</p>
    <ul>
      <li>O <b>4%</b> é o limite dos <b>circuitos terminais</b>. Não é “4% do ponto de entrada até o ponto mais distante”: desde o transformador próprio, o total vai até 7%.</li>
      <li>A queda unitária da tabela já conta a ida e a volta do circuito monofásico: não multiplique por 2 de novo. O fator 2 só aparece na fórmula com ρ.</li>
      <li>Com V/(A·km), o comprimento sai em <b>quilômetros</b>: 0,04125 km são 41,25 m, não 41.250 m.</li>
      <li>A porcentagem é sobre a tensão do próprio circuito: 4% de 127 V são 5,08 V; de 220 V, 8,8 V.</li>
    </ul>
  </div>` },
    { de: '<select id="dV"><option>127</option><option selected>220</option></select>', para: '<select id="dV"><option value="127">127</option><option value="220" selected>220</option></select>' },
    /* ---- seção 4: faixa de atuação do DR, alínea das edificações não residenciais e classes de DPS ---- */
    { de: '<li>O botão de teste deve ser acionado periodicamente para verificar o mecanismo.</li>',
      para: '<li>O botão de teste deve ser acionado periodicamente para verificar o mecanismo.</li>\n    <li>Pela norma do produto, o DR não pode desligar abaixo de 50% de I<sub>Δn</sub> e tem de desligar até I<sub>Δn</sub>: um DR de 30 mA atua em algum ponto entre 15 mA e 30 mA. Assim ele tolera as pequenas fugas normais de uma instalação sem desarmar à toa.</li>' },
    { de: linha('garagens</b> e demais dependências internas molhadas'),
      para: '<li>em locais de habitação, circuitos que sirvam a pontos de utilização em <b>cozinhas, copas-cozinhas, lavanderias, áreas de serviço, garagens</b> e demais dependências internas molhadas em uso normal ou sujeitas a lavagens;</li>\n      <li><span class="confira">em edificações não residenciais, circuitos de tomadas nesses mesmos locais (cozinhas, copas-cozinhas, lavanderias, áreas de serviço, garagens e áreas internas molhadas em uso normal ou sujeitas a lavagens)</span>.</li>' },
    { de: 'Não deve ser confundido com o DR (choque) nem com o disjuntor (sobrecorrente).</p>',
      para: `Não deve ser confundido com o DR (choque) nem com o disjuntor (sobrecorrente).</p>
  <p><b>Classes do DPS</b>, pelo ensaio a que o produto é submetido: <b>classe I</b>, ensaiado com impulso de corrente 10/350 µs, que imita a corrente de um raio direto, vai no ponto de entrada quando a edificação tem SPDA; <b>classe II</b>, ensaiado com 8/20 µs (surtos induzidos e de manobra), é o DPS comum dos quadros de distribuição; <b>classe III</b>, ensaiado com onda combinada, faz a proteção fina junto de equipamentos sensíveis, depois de um classe II. Para o primeiro nível de proteção, a NBR 5410 pede no mínimo 12,5 kA (I<sub>imp</sub>) no classe I e 5 kA (I<sub>n</sub>) no classe II.</p>` },
    /* ---- seção 5: figura nova, TN-C, corrente de falta no TN (questão 37) e neutro rompido (questão 42) ---- */
    { de: FIG_ESQ, para: `<figure class="narrow">${esquemas()}` },
    { de: 'Figura 6. Os cinco esquemas da NBR 5410. No TN-C-S, o PEN chega da fonte e se divide em N e PE num ponto da instalação; a partir dali, eles nunca mais podem ser religados.',
      para: 'Figura 6. Os cinco esquemas da NBR 5410. No TN-S, o neutro e o PE saem juntos do ponto aterrado da fonte e seguem separados; no TN-C, um só condutor (PEN) faz as duas funções; no TN-C-S, o PEN se divide em N e PE num ponto da instalação e, dali em diante, eles nunca mais podem ser religados. No TT, a massa tem eletrodo próprio; no IT, a fonte é isolada da terra ou aterrada por uma impedância alta.' },
    { de: linha('<p>O esquema IT é usado onde um desligamento inesperado'),
      para: `<div class="box cesg">
    <p class="box-title">Como a banca cobra: a corrente de falta no esquema TN</p>
    <p>No TN, uma falta fase-massa fecha um laço só de metal: fase, massa, condutor de proteção e volta à fonte. A impedância é baixa, a corrente de falta é <b>alta</b> (centenas de ampères num circuito comum), e o disparo magnético do disjuntor abre o circuito em frações de segundo: é o próprio disjuntor que faz o seccionamento automático. No TT, a corrente passa pela terra e pelos dois eletrodos, fica baixa, e quem desliga é o DR. Alternativas que dizem que, no TN, a corrente é “mais baixa”, “inofensiva”, ou que “só o DR a interrompe”, estão erradas; e a corrente alta não é o que obriga o DR, que no TN é proteção adicional, exigida nos locais da seção 4.</p>
  </div>
  <div class="box ex">
    <p class="box-title">Exemplo resolvido 4</p>
    <p>Um circuito de tomadas de 127 V (fase-neutro) tem 30 m de cabo de cobre de 2,5 mm² (fase e condutor de proteção) e disjuntor curva C de 16 A. A impedância da fonte e do ramal até o quadro vale 0,10 Ω. Compare uma falta fase-massa no esquema TN e no TT (valores aproximados: resistências a 20 °C, reatâncias desprezadas).</p>
    <ol class="steps">
      <li>Resistência de cada condutor: R = ρ·L/S = 0,0172 × 30/2,5 ≈ 0,206 Ω.</li>
      <li><b>TN</b>: o laço é fonte, fase e PE: Z ≈ 0,10 + 0,206 + 0,206 ≈ 0,51 Ω, e I<sub>falta</sub> ≈ 127/0,51 ≈ <b>250 A</b>. A curva C dispara no magnético com certeza a partir de 10 × 16 = 160 A: o disjuntor abre quase na hora.</li>
      <li><b>TT</b>, com R<sub>A</sub> = 20 Ω (eletrodo das massas) e R<sub>B</sub> = 10 Ω (aterramento da fonte): I<sub>falta</sub> ≈ 127/(20 + 10) ≈ <b>4,2 A</b>, abaixo dos 16 A do disjuntor, que nunca atua. Enquanto a falta durar, a massa fica a cerca de 4,2 × 20 ≈ 85 V da terra.</li>
      <li>Com um DR de 30 mA, a condição do TT é R<sub>A</sub>·I<sub>Δn</sub> ≤ U<sub>L</sub>, com U<sub>L</sub> = 50 V em ambientes comuns: 20 × 0,03 = 0,6 V, com muita folga (o R<sub>A</sub> máximo seria 50/0,03 ≈ 1.667 Ω). O DR desliga a falta de 4,2 A na hora.</li>
    </ol>
  </div>
  ${linha('<p>O esquema IT é usado onde um desligamento inesperado')}` },
    { de: linha('<p><b>Regras do condutor PEN.</b>'),
      para: '<p><b>Regras do condutor PEN e do esquema TN-C.</b> O esquema TN-C (e o condutor PEN) só pode ser usado em instalações fixas, com seção de pelo menos 10 mm² em cobre (16 mm² em alumínio), e o PEN nunca pode ser seccionado: aberto, ele desligaria o neutro e deixaria sem proteção todas as massas ligadas a ele. Também não adianta passá-lo por um DR: a corrente de uma falta fase-massa volta pelo próprio PEN, por dentro do núcleo do DR, e a soma das correntes continua zero. Por isso a norma diz que, no TN-C, não podem ser utilizados dispositivos DR: o seccionamento automático fica a cargo dos dispositivos de sobrecorrente (disjuntores e fusíveis). Onde o DR é exigido, o trecho tem de ser TN-S, com o PEN dividido em N e PE antes do DR.</p>' },
    { de: linha('<p>Por isso o neutro nunca deve ter fusível ou disjuntor isolado'),
      para: `${linha('<p>Por isso o neutro nunca deve ter fusível ou disjuntor isolado')}
  <div class="box cesg">
    <p class="box-title">Como a banca cobra: sobretensão numa fase do quadro</p>
    <p>Se uma fase do quadro mostra sobretensão (e outra, subtensão), a causa típica é o <b>rompimento do neutro</b> do alimentador com as <b>cargas mal distribuídas</b> entre as fases. Não são causas de sobretensão: o rompimento de uma fase (essa fase fica sem tensão), circuitos mistos de iluminação e tomadas, cargas trifásicas grandes (equilibradas, não deslocam o neutro) ou condutores subdimensionados (provocam queda de tensão, não elevação).</p>
    <p>O deslocamento do neutro numa carga em estrela desequilibrada está explicado na estação E3, seção 2 (“O papel do neutro”). <a href="#E3" data-ir="mod:E3">Abrir a estação E3 →</a></p>
  </div>` },
    { de: exercicio('Sobre as canalizações metálicas de água e de gás que entram'), para: novo({
      s: 'Na vistoria de uma casa antiga, o técnico encontra o condutor de aterramento ligado apenas à tubulação metálica de água, que entra enterrada no terreno. Segundo a NBR 5410, a situação',
      o: ['está adequada, porque uma tubulação metálica enterrada é um bom eletrodo', 'está inadequada: a tubulação não pode ser o eletrodo de aterramento, mas deve continuar ligada ao barramento de equipotencialização principal', 'está inadequada: a tubulação deve ser desligada de qualquer condutor de proteção e isolada', 'está adequada, desde que a tubulação seja de cobre', 'está inadequada, porque só a tubulação de gás pode servir de eletrodo'], a: 1,
      c: 'A tubulação de água pode ser trocada por tubos plásticos ou ganhar trechos isolantes numa obra, e o aterramento sumiria sem aviso; por isso canalizações metálicas não servem de eletrodo. Mas, como são condutoras e entram na edificação, devem ser ligadas ao BEP (equipotencialização principal). A de gás também não pode ser eletrodo, e o material do tubo não muda a regra. O certo é instalar um eletrodo de aterramento próprio e manter a tubulação no BEP.' }) },
    /* ---- escopo e fontes ---- */
    { de: secao('antes'), para: `<section id="antes" class="block">
  <div class="block-head"><h2>Antes de começar</h2></div>
  <p>Esta estação cobre os seguintes itens do conteúdo programático da <b>Ênfase 8 — Manutenção – Elétrica</b> (Anexo IV do Edital nº 03), conferidos no texto oficial:</p>
  <ul>
    <li><b>8.1</b> Instalações elétricas de baixa tensão;</li>
    <li><b>8.3</b> Sistemas de aterramento e uso de equipamentos especializados (aqui, a parte de baixa tensão: esquemas de aterramento e equipotencialização);</li>
    <li><b>10.1</b> Conhecimentos básicos das normas: ABNT NBR-5410 (no edital, o item aparece numerado só como “10.”);</li>
    <li>e parte do <b>5.6</b> Dispositivos de proteção de baixa tensão: disjuntor termomagnético, DR e DPS.</li>
  </ul>
  <p>Instalações prediais (residenciais e comerciais) são o caso mais comum de baixa tensão, e é nelas que a estação se concentra. Redes aéreas de 1,0 a 17,5 kV (8.2) e SPDA (8.4) ficam na estação I2; a NR-10 (10.4), na N1.</p>
  <div class="box alert">
    <p class="box-title">Qual versão da NBR 5410 estudar</p>
    <p>A versão em vigor é a <b>ABNT NBR 5410:2004, versão corrigida de 2008</b>. A revisão da norma passou pela primeira consulta nacional (novembro de 2023 a fevereiro de 2024), e a comissão de estudos previa uma segunda consulta e a publicação do texto novo até o fim de 2026. As regras desta estação seguem a edição de 2004, que vale enquanto a nova não sair; <span class="confira">até outubro de 2026, a nova edição não tinha sido publicada</span>. Mudanças discutidas na revisão ainda <b>não</b> valem.</p>
  </div>
  <div class="box cesg">
    <p class="box-title">Como a Cesgranrio tem cobrado esse assunto</p>
    <p>Na prova de 2023 da própria Transpetro (Manutenção – Elétrica), cinco das 40 questões específicas foram desta estação:</p>
    <ul>
      <li>a 37: como é a corrente de falta de um contato indireto no esquema TN, comparada à dos outros esquemas, e o que isso faz com o disjuntor (seção 5);</li>
      <li>a 42: a causa de uma sobretensão elevada numa das fases de um quadro de distribuição (seção 5);</li>
      <li>a 45: o comprimento máximo de um circuito para a queda de tensão não passar de um limite, com a queda unitária em V/(A·km) (seção 3);</li>
      <li>a 55: os princípios fundamentais da NBR 5410 (seção 1);</li>
      <li>a 59: se as canalizações metálicas de água podem ser eletrodo de aterramento e se entram na equipotencialização principal (seção 5).</li>
    </ul>
    <p>É um <b>padrão observado</b>, não garantia de repetição. O estilo mistura cálculo curto (queda de tensão, previsão de carga) com afirmações tiradas quase literalmente do texto da norma, uma delas com uma palavra trocada.</p>
  </div>
</section>` },
    { de: secao('fontes'), para: `<section id="fontes" class="block">
  <div class="block-head"><h2>Fontes</h2></div>
  <ul class="sources">
    <li>Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO-2026.3, Anexo IV, conteúdo programático da Ênfase 8 (Manutenção – Elétrica), itens 5.6, 8.1, 8.3 e 10.1 — conferido no PDF do edital.</li>
    <li>Caderno da prova Cesgranrio 2023, Transpetro, Técnico de Manutenção – Elétrica (questões 37, 42, 45, 55 e 59), conferido no PDF da prova (usado apenas para identificar o estilo de cobrança; os exemplos e exercícios desta estação têm números próprios).</li>
    <li>ABNT NBR 5410:2004 (versão corrigida de 2008), por meio de materiais que reproduzem os seus critérios: Prysmian, <a href="https://br.prysmian.com/sites/default/files/atoms/files/Guia_de_Dimensionamento-Baixa_Tensao_Rev9.pdf"><i>Guia de dimensionamento de cabos para baixa tensão</i></a> (limites de queda de tensão de 6.2.7.1, inclusive os 5% a partir do ponto de entrega no fornecimento em baixa tensão, fatores de agrupamento da tabela 42, seção do condutor de proteção); <a href="https://br.prysmian.com/sites/default/files/atoms/files/Manual_Instalacoes_Eletricas.pdf"><i>Manual Prysmian de Instalações Elétricas</i></a> (2010: limites de queda de tensão, dispositivo DR, R<sub>A</sub> máximo no TT com U<sub>L</sub> = 50 V e, no quadro dos esquemas de aterramento, “TN-C só pode ser usado em instalações fixas com S ≥ 10 mm²” e “no TN-C não podem ser utilizados dispositivos DR”); Nambei, <a href="https://api.aecweb.com.br/cls/catalogos/nambei/nambei_tabela_do_eletricista.pdf"><i>Tabela do eletricista</i></a> (capacidade de condução no método B1, seções mínimas, quedas unitárias em V/(A·km), cores); <i>Instalações elétricas residenciais</i> (Elektro, Pirelli e Procobre, revisão técnica de H. Moreno, 2003; cópia da <a href="https://www.coe.ufrj.br/~kleber/INST_ELET_RES_PARTE_01.pdf">UFRJ</a>: previsão de cargas, tomadas e DR).</li>
    <li>Opções de eletrodo de aterramento (6.4.1.1.1: armaduras das fundações; fitas, barras ou cabos imersos no concreto; malhas enterradas; no mínimo, anel enterrado no perímetro, com hastes e cabos radiais como complemento): o texto do item reproduzido numa <a href="https://questoes.grancursosonline.com.br/questoes-de-concursos/engenharia-civil-39/3495050">questão de concurso (Gran Questões)</a>.</li>
    <li>Canalizações metálicas de água e de outros serviços: não podem ser eletrodo, mas entram na equipotencialização — ABNT NBR 5410:1997, 6.4.2.2.4 (“não devem ser usados como eletrodo de aterramento canalizações metálicas de fornecimento de água e outros serviços, o que não exclui a ligação eqüipotencial”), numa <a href="https://www.brasilpostos.com.br/wp-content/uploads/2013/09/5410-ABNT.pdf">cópia do texto de 1997</a>; a regra continua na edição de 2004, segundo a <a href="https://www.normas.com.br/visualizar/genius-faq/2495/conforme-nbr5410-de-09-2004-podem-se-utilizar-as-canalizacoes-metalicas-de-agua-ou-outras-utilidades-como-eletrodo-de-aterramento">pergunta frequente da Target sobre a NBR 5410:2004</a>.</li>
    <li>Seção mínima do condutor PEN, 10 mm² em cobre ou 16 mm² em alumínio: ABNT NBR 5410:1997, 6.4.6.2.1 (“quando o condutor de proteção tiver uma seção maior ou igual a 10 mm² em cobre ou a 16 mm² em alumínio, nas instalações fixas, as funções de condutor de proteção e de condutor neutro podem ser combinadas”), na mesma <a href="https://www.brasilpostos.com.br/wp-content/uploads/2013/09/5410-ABNT.pdf">cópia do texto de 1997</a>; o Manual Prysmian (2010) confirma os 10 mm² da edição de 2004.</li>
    <li>Faixa de atuação do DR (entre 50% e 100% de I<sub>Δn</sub>): catálogo <a href="https://storage.electrika.com/flips/0170-crabtree-ind-07-a/files/assets/basic-html/page-76.html">Crabtree</a>. Classes de DPS e correntes mínimas: O Setor Elétrico, <a href="https://www.osetoreletrico.com.br/?p=13779">“Especificando minimamente um DPS”</a>.</li>
    <li>Situação da revisão da norma: O Setor Elétrico, <a href="https://www.osetoreletrico.com.br/?p=165324">“Revisão da NBR 5410 avança com ajustes técnicos e deverá passar por segunda consulta pública”</a> (setembro de 2025).</li>
    <li>Bibliografia de apoio: H. Creder, <i>Instalações Elétricas</i> (LTC); A. A. M. Cotrim, <i>Instalações Elétricas</i> (Pearson); J. Mamede Filho, <i>Instalações Elétricas Industriais</i> (LTC).</li>
    <li>Revisão técnica do app (outubro de 2026): as contas dos 4 exemplos resolvidos e dos exercícios recalculadas por teste automático; previsão de cargas, seções, capacidades, agrupamento, queda de tensão, coordenação, curvas, DR, DPS, cores, esquemas de aterramento e equipotencialização conferidos nas fontes acima. Os trechos marcados com “confira” não foram confirmados numa fonte que reproduza o texto da norma. Foram corrigidos: os limites de queda de tensão e um exercício que dependia do valor de 5%, um exercício de curva de disjuntor ambíguo, as opções de eletrodo e a condição I<sub>2</sub> ≤ 1,45·I<sub>z</sub>. São novos: a figura dos esquemas, a calculadora de queda unitária, os exemplos 3 e 4 e os quadros sobre princípios, queda de tensão, faixa do DR, classes de DPS, TN-C, corrente de falta no TN e neutro rompido.</li>
  </ul>
  <footer>Exercícios elaborados no estilo da banca para fixação; não são questões oficiais. Valores de tabela reproduzidos em trecho; para projeto real, consulte o texto completo da norma.</footer>
</section>` },
  ],
  formulario: [
    ['Campo de aplicação', p('até 1.000 V em CA (f &lt; 400 Hz)', 'até 1.500 V em CC'), 'de 1,0 a 36,2 kV: NBR 14039. Vigente: NBR 5410:2004, corrigida em 2008'],
    ['Iluminação mínima por cômodo', p(`${v('A')} ≤ 6 m² → 100 VA`, `${v('A')} &gt; 6 m² → 100 + 60 · ⌊(${v('A')} − 6)/4⌋ VA`), 'só blocos inteiros de 4 m² contam (arredonda para baixo); é carga de projeto, não potência de lâmpada'],
    ['Número mínimo de TUG', p(`cozinha, copa, área de serviço: ⌈${v('P')}/3,5⌉`, `sala e dormitório: ⌈${v('P')}/5⌉`), 'P = perímetro (m), “ou fração” arredonda para cima; banheiro: 1 junto ao lavatório; varanda: 1; acima da pia: 2 tomadas'],
    ['Potência das TUG', p('600 VA × (até 3 pontos) + 100 VA × excedentes', 'demais cômodos: 100 VA por ponto'), 'os 600 VA valem em banheiros, cozinhas, copas, áreas de serviço e lavanderias, cômodo a cômodo; com mais de 6 pontos no conjunto deles, 600 VA só nos 2 primeiros'],
    ['Divisão dos circuitos', p(`${sub('I', 'n')} &gt; 10 A → circuito independente`, `circuito misto: ${sub('I', 'B')} ≤ 16 A`), 'tomadas de cozinha, copa, área de serviço e lavanderia: circuitos só delas; TUE a até 1,5 m do equipamento'],
    ['Corrente de projeto', p(`${sub('I', 'B')} = ${fr(v('P'), v('V'))}`, `${sub('I', 'B')} = ${fr(v('P'), '√3 · ' + sub('V', 'L') + ' · cos ' + v('φ'))}`), 'monofásico com FP 1; trifásico equilibrado'],
    ['Seções mínimas (cobre)', p('iluminação 1,5 mm²', 'força e tomadas 2,5 mm²', 'sinalização e controle 0,5 mm²'), 'vale a maior seção que algum critério exigir: mínima, corrente, queda de tensão ou proteção'],
    ['Capacidade corrigida', p(`${sub('I', 'z')}′ = ${sub('I', 'z')} · ${sub('k', 'agrup')} · ${sub('k', 'temp')} ≥ ${sub('I', 'B')}`), 'B1, PVC, 2 carregados: 1,5 → 17,5 A; 2,5 → 24 A; 4 → 32 A; 6 → 41 A. Agrupamento: 2 → 0,80; 3 → 0,70; 4 → 0,65; 5 → 0,60'],
    ['Coordenação com o disjuntor', p(`${sub('I', 'B')} ≤ ${sub('I', 'n')} ≤ ${sub('I', 'z')}`, `${sub('I', '2')} ≤ 1,45 · ${sub('I', 'z')}`), 'disjuntor residencial: I<sub>2</sub> = 1,45·I<sub>n</sub>, então a 2ª condição vem junto com a 1ª'],
    ['Queda de tensão (queda unitária)', p(`Δ${v('V')} = Δ${sub('V', 'unit')} · ${v('I')} · ${v('L')}`, `Δ${v('V')}% = 100 · ${fr('Δ' + v('V'), v('V'))}`), 'ΔV<sub>unit</sub> em V/(A·km) e L em km; no monofásico, a tabela já conta ida e volta'],
    ['Queda de tensão (pela resistência)', p(`Δ${v('V')} = ${fr('2 · ' + v('ρ') + ' · ' + v('L') + ' · ' + v('I'), v('S'))}`), 'ρ ≈ 0,0172 Ω·mm²/m (cobre); L em m; S em mm²; FP 1'],
    ['Limites de queda (6.2.7)', p('7% desde o transformador (ou gerador) próprio', 'circuitos terminais: 4%'), '5% desde o ponto de entrega, no fornecimento em baixa tensão pela distribuidora'],
    ['Curvas de disjuntor', p(`B: 3 a 5 · ${sub('I', 'n')}`, `C: 5 a 10 · ${sub('I', 'n')}`, `D: 10 a 20 · ${sub('I', 'n')}`), 'faixa do disparo magnético; B: cargas resistivas; C: uso geral e motores pequenos; D: transformadores e partidas pesadas'],
    ['DR', p(`alta sensibilidade: ${sub('I', 'Δn')} ≤ 30 mA`, `atua entre 0,5 e 1 · ${sub('I', 'Δn')}`), 'não vê sobrecarga nem curto fase-neutro; obrigatório em banheiros com chuveiro, áreas externas, cozinhas, lavanderias, áreas de serviço e garagens'],
    ['DR no esquema TT', p(`${sub('R', 'A')} · ${sub('I', 'Δn')} ≤ ${sub('U', 'L')}`), 'U<sub>L</sub> = 50 V em ambientes comuns; com 30 mA, R<sub>A</sub> até ≈ 1.667 Ω'],
    ['Seção do PE (mesmo material)', p(`${v('S')} ≤ 16 → ${v('S')}`, `16 &lt; ${v('S')} ≤ 35 → 16 mm²`, `${v('S')} &gt; 35 → ${v('S')}/2`), 'S = seção da fase (mm²); PEN: só em instalação fixa e nunca seccionado'],
    ['Cores dos condutores', p('N: azul-claro', 'PE: verde-amarelo ou verde', 'PEN: azul-claro com anilhas verde-amarelas'), 'fases: qualquer outra cor'],
    ['Esquemas de aterramento', p('TN: falta = curto → disjuntor', 'TT: corrente baixa → DR', 'IT: 1ª falta não desliga → DSI'), '1ª letra: fonte (T aterrada, I isolada); 2ª: massas (T eletrodo próprio, N ligadas ao neutro); S separado, C combinado'],
    ['Neutro rompido', p(`${sub('V', '1')} = ${sub('V', 'L')} · ${fr(sub('R', '1'), sub('R', '1') + ' + ' + sub('R', '2'))}`), 'as cargas de fases diferentes ficam em série sob a tensão de linha: a de menor potência (maior R) recebe mais tensão'],
  ],
  resumo: [
    ['Campo da NBR 5410', 'Baixa tensão: até 1.000 V CA e 1.500 V CC. Vigente: a de 2004, corrigida em 2008.'],
    ['Previsão de cargas', 'Luz: 100 VA até 6 m², mais 60 VA a cada 4 m² inteiros. TUG molhada: 600 VA até 3; resto, 100 VA.'],
    ['Condutor e disjuntor', 'Mínimos: 1,5 mm² luz e 2,5 mm² força. I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub>, com I<sub>z</sub> já corrigida.'],
    ['Queda de tensão', 'ΔV = ΔV<sub>unit</sub>·I·L, com L em km. Até 7% desde o trafo próprio; 4% nos circuitos terminais.'],
    ['DR, DPS e disjuntor', 'DR (30 mA): fuga à terra. DPS: surtos. Disjuntor: sobrecarga e curto.'],
    ['TN, TT e IT', 'TN: falta vira curto e o disjuntor abre rápido. TT: corrente baixa, exige DR. IT: DSI.'],
    ['Equipotencialização', 'Canalização metálica: nunca eletrodo, sempre no BEP. Neutro rompido: sobretensão na fase leve.'],
  ],
  cards: [
    ['Até que tensão vale a NBR 5410?', 'Até 1.000 V em CA (frequência abaixo de 400 Hz) e 1.500 V em CC. De 1,0 a 36,2 kV, vale a NBR 14039.'],
    ['Contato direto × contato indireto?', 'Direto: com uma parte viva (fase ou neutro). Indireto: com uma massa que ficou energizada por falha de isolamento.'],
    ['Quarto de 3,5 m × 4 m: carga mínima de iluminação?', '14 m² = 6 + 8: dois blocos inteiros de 4 m² → 100 + 2 × 60 = 220 VA.'],
    ['Sala de 4,5 m × 3,5 m: quantas TUG, no mínimo?', 'Perímetro de 16 m; 16/5 = 3,2 → 4 pontos (“ou fração” arredonda para cima), de 100 VA cada.'],
    ['Área de serviço com 5 tomadas: potência mínima das TUG?', '3 × 600 + 2 × 100 = 2.000 VA.'],
    ['Quando um equipamento exige circuito independente?', 'Quando a corrente nominal passa de 10 A. Exemplo: ar-condicionado de 2.500 W em 220 V (≈ 11,4 A).'],
    ['Quando se admite circuito comum de iluminação e tomadas?', 'Em habitação, com I<sub>B</sub> ≤ 16 A, sem as tomadas de cozinha e área de serviço e sem pôr toda a iluminação (ou todas as tomadas) num só circuito.'],
    ['Seções mínimas de cobre para iluminação, força e controle?', '1,5 mm², 2,5 mm² e 0,5 mm².'],
    ['Cabo de 4 mm² (32 A no B1) dividindo o eletroduto com mais 3 circuitos: capacidade?', '4 circuitos → fator 0,65: 32 × 0,65 = 20,8 A.'],
    ['I<sub>B</sub> = 22 A e I<sub>z</sub> = 28 A: que disjuntor?', '25 A, porque I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub>. O de 20 A desarmaria com a carga normal; o de 32 A não protegeria o cabo.'],
    ['Carga de 2.200 VA em 220 V, cabo de 5 V/(A·km), limite de 2%: comprimento máximo?', 'I = 10 A; ΔV<sub>máx</sub> = 4,4 V; L = 4,4/(5 × 10) = 0,088 km = 88 m.'],
    ['Quais os limites de queda de tensão da NBR 5410?', '7% desde os terminais do transformador (ou gerador) próprio; 5% desde o ponto de entrega, no fornecimento em baixa tensão; e 4% nos circuitos terminais, sempre.'],
    ['Faixas de disparo magnético das curvas B, C e D?', 'B: 3 a 5·I<sub>n</sub>. C: 5 a 10·I<sub>n</sub>. D: 10 a 20·I<sub>n</sub>.'],
    ['Por que o DR não percebe um curto entre fase e neutro?', 'A corrente que vai pela fase volta inteira pelo neutro, pelo mesmo núcleo: a soma continua zero.'],
    ['Onde o DR de 30 mA é obrigatório (NBR 5410:2004)?', 'Locais com banheira ou chuveiro; tomadas em áreas externas ou que possam alimentar equipamento no exterior; cozinhas, lavanderias, áreas de serviço, garagens e áreas internas molhadas.'],
    ['Para que serve o DPS, e onde vai cada classe?', 'Limita sobretensões transitórias (raios e manobras), desviando o surto para o aterramento. Classe I na entrada de prédio com SPDA; classe II nos quadros; classe III junto ao equipamento.'],
    ['Cores do neutro, do PE e do PEN?', 'N: azul-claro. PE: verde-amarelo (ou verde). PEN: azul-claro com anilhas verde-amarelas. Fases: qualquer outra cor.'],
    ['O que significa cada letra em TN-C-S?', 'T: fonte aterrada. N: massas ligadas ao ponto aterrado da fonte. C-S: neutro e proteção num só condutor (PEN) num trecho e separados depois.'],
    ['Fase de 70 mm²: seção mínima do PE, do mesmo material?', 'Acima de 35 mm²: S/2 = 35 mm².'],
    ['Lâmpada de 60 W e ferro de 1.200 W (127 V) em fases diferentes; o neutro se rompe. O que acontece?', 'Ficam em série sob 220 V: a lâmpada (maior resistência) recebe ≈ 210 V e queima; o ferro, ≈ 10 V.'],
  ],
  vf: [
    ['A NBR 5410 se aplica a instalações de até 1.000 V em corrente alternada e 1.500 V em corrente contínua.', true, 'É o campo da baixa tensão. De 1,0 a 36,2 kV, vale a NBR 14039.'],
    ['Pela NBR 5410, a proteção contra choques é obrigatória para o contato direto e facultativa para falhas que ponham uma massa sob tensão.', false, 'As <b>duas</b> são obrigatórias: contra o contato com parte viva e contra a falha que energiza uma massa.'],
    ['Num cômodo de 10 m², a carga mínima de iluminação é de 160 VA.', true, '10 = 6 + 4: um bloco inteiro de 4 m² → 100 + 60 = 160 VA.'],
    ['Numa cozinha com 4 pontos de tomada, a potência mínima das TUG é 4 × 600 = 2.400 VA.', false, 'Os 600 VA valem até 3 pontos: 3 × 600 + 1 × 100 = <b>1.900 VA</b>.'],
    ['Um aparelho de ar-condicionado com corrente nominal de 12 A deve ter circuito independente.', true, 'Todo equipamento com corrente nominal acima de 10 A exige circuito próprio.'],
    ['Em nenhum caso a queda de tensão nos circuitos terminais pode passar de 4%.', true, 'É o limite dos circuitos terminais, qualquer que seja a alimentação.'],
    ['A NBR 5410 limita a 4% a queda de tensão total, do ponto de entrada até o ponto mais distante da instalação.', false, 'Os 4% são dos <b>circuitos terminais</b>. Desde os terminais do transformador próprio, o total pode chegar a 7%.'],
    ['Com fator de agrupamento 0,80, a capacidade de um cabo de 24 A passa a 30 A.', false, 'O fator multiplica: 24 × 0,80 = <b>19,2 A</b>. Agrupar reduz a capacidade; dividir dá um número maior, sem sentido.'],
    ['Um DR de 30 mA desarma quando uma pessoa isolada da terra toca ao mesmo tempo a fase e o neutro.', false, 'A corrente entra pela fase e volta inteira pelo neutro: a soma no núcleo do DR continua zero, e ele <b>não</b> atua.'],
    ['Um DR de 30 mA pode desligar com uma corrente de fuga de 20 mA.', true, 'Ele atua entre 50% e 100% de I<sub>Δn</sub>, isto é, entre 15 mA e 30 mA.'],
    ['O DPS protege as pessoas contra choques por contato indireto.', false, 'O DPS limita <b>sobretensões transitórias</b> (raios e manobras). Contra choque, o seccionamento automático e o DR.'],
    ['No esquema TN, uma falta fase-massa vira um curto pelo condutor de proteção, e o próprio disjuntor pode desligar o circuito rapidamente.', true, 'A impedância do laço é baixa, a corrente é alta e o disparo magnético atua.'],
    ['No esquema TT, a corrente de uma falta fase-massa costuma ser alta o bastante para o disjuntor desligar rapidamente.', false, 'No TT ela passa pela terra e pelos dois eletrodos e fica <b>baixa</b> (poucos ampères): quem desliga é o DR.'],
    ['As canalizações metálicas de água não podem ser eletrodo de aterramento, mas devem ser ligadas à equipotencialização principal.', true, 'Podem virar plástico numa reforma, então não servem de eletrodo; mas são condutoras que entram no prédio e vão ao BEP.'],
    ['Com o neutro rompido e as cargas desequilibradas, a carga de maior potência é a que recebe sobretensão.', false, 'É a de <b>menor</b> potência: tem a maior resistência e fica com a maior parte da tensão de linha.'],
  ],
  contas: [
    ['100+60*Math.floor((3*4-6)/4)', '160 VA', 'Exemplo resolvido 1'], ['2*(3+4)', '14 m', 'Exemplo resolvido 1'], ['14/3.5', '= 4', 'Exemplo resolvido 1'], ['3*600+1*100', '1.900 VA', 'Exemplo resolvido 1'],
    ['Math.ceil(14/5)', '= 3 pontos', 'Figura 2.'],
    ['4400/220', '= 20 A', 'Exemplo resolvido 2'], ['0.03*220', '6,6 V', 'Exemplo resolvido 2'], ['6.6/(8*20)', '0,04125 km', 'Exemplo resolvido 2'], ['6.6/(8*20)*1000', '41,3 m', 'Exemplo resolvido 2'],
    ['0.04*127', '5,08 V', 'Exemplo resolvido 3'], ['14.3*15*0.035', '7,51 V', 'Exemplo resolvido 3'], ['7.51/127*100', '5,9%', 'Exemplo resolvido 3'],
    ['8.96*15*0.035', '4,70 V', 'Exemplo resolvido 3'], ['4.70/127*100', '3,7%', 'Exemplo resolvido 3'], ['0.04*220', '8,8 V', 'Pegadinhas da queda de tensão'],
    ['0.0172*30/2.5', '0,206 Ω', 'Exemplo resolvido 4'], ['0.10+2*0.0172*30/2.5', '0,51 Ω', 'Exemplo resolvido 4'], ['127/(0.10+2*0.0172*30/2.5)', '250 A', 'Exemplo resolvido 4'],
    ['10*16', '160 A', 'Exemplo resolvido 4'], ['127/(20+10)', '4,2 A', 'Exemplo resolvido 4'], ['127/30*20', '85 V', 'Exemplo resolvido 4'], ['20*0.03', '0,6 V', 'Exemplo resolvido 4'], ['50/0.03', '1.667 Ω', 'Exemplo resolvido 4'],
    ['127**2/100', '161 Ω', 'Figura 8.'], ['127**2/1000', '16 Ω', 'Figura 8.'], ['220*(127**2/100)/(127**2/100+127**2/1000)', '200 V', 'Figura 8.'], ['220*(127**2/1000)/(127**2/100+127**2/1000)', '20 V', 'Figura 8.'],
    ['100+3*60', '280 VA', 'Exercícios de fixação da seção 2'], ['Math.ceil(18/5)', '→ 4 pontos', 'Exercícios de fixação da seção 2'], ['2*(3+3.5)/3.5', '3,7', 'Exercícios de fixação da seção 2'],
    ['3*600+100', '1.900 VA', 'Exercícios de fixação da seção 2'], ['4*600', '2.400 VA', 'Exercícios de fixação da seção 2'], ['2500/220', '11,4 A', 'Exercícios de fixação da seção 2'],
    ['24*0.7', '16,8 A', 'Exercícios de fixação da seção 3'], ['24/0.7', '34,3 A', 'Exercícios de fixação da seção 3'], ['2540/127', '= 20 A', 'Exercícios de fixação da seção 3'],
    ['0.04*127', '5,08 V', 'Exercícios de fixação da seção 3'], ['5.08/(20*20)*1000', '12,7 m', 'Exercícios de fixação da seção 3'],
    ['50/2', '25 mm²', 'Exercícios de fixação da seção 5'], ['127**2/1000', '16,1 Ω', 'Exercícios de fixação da seção 5'], ['220*161/177', '200 V', 'Exercícios de fixação da seção 5'],
  ],
};

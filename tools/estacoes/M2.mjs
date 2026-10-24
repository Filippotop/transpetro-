/* Estação M2: a apostila de eletromagnetismo e transformadores (fontes/eletromagnetismo-transformadores.html), blocos
   1 a 7. Aqui ficam os metadados, as trocas de texto (correções em fontes/ERRATA.md e ajustes de contexto), a figura nova
   do índice horário Dy5, o formulário, o resumo, os cartões, o V ou F e as contas.
   Gerar: node tools/estacao.mjs fontes/eletromagnetismo-transformadores.html M2 --secoes 1-7 */
import fs from 'node:fs';

const FONTE = 'fontes/eletromagnetismo-transformadores.html';
const SRC = fs.readFileSync(new URL('../../' + FONTE, import.meta.url), 'utf8');
const secao = id => SRC.match(new RegExp(`<section id="${id}" class="block">[\\s\\S]*?</section>`))[0];

const v = s => `<var>${s}</var>`;
const fr = (n, d) => `<span class="frac"><span>${n}</span><span>${d}</span></span>`;
const p = (...xs) => xs.map(x => `<span class="eq-part">${x}</span>`).join('');
const sub = (x, s) => `${v(x)}<sub>${s}</sub>`;

/* Figura nova: o mesmo relógio da figura do Dyn1, com a baixa tensão às 5 h (Dy5, 150° de atraso). */
const troca1 = (s, de, para) => { if (s.split(de).length !== 2) throw new Error('figura Dy5: não achei ' + de.slice(0, 50)); return s.replace(de, para); };
let DY5 = SRC.match(/<svg viewBox="0 0 360 330"[\s\S]*?<\/svg>/)[0];
for (const [de, para] of [
  ['aria-label="Relógio do índice horário: Dyn1"', 'aria-label="Relógio do índice horário: Dy5"'],
  ['<line x1="180" y1="168" x2="220.0" y2="98.7" class="ar pc thick" marker-end="url(#ah-pc)"/>', '<line x1="180" y1="168" x2="220.0" y2="237.3" class="ar pc thick" marker-end="url(#ah-pc)"/>'],
  ['<path d="M 180 123 A 45 45 0 0 1 202.5 129.0" class="arc"/>', '<path d="M 180 123 A 45 45 0 0 1 202.5 207.0" class="arc"/>'],
  ['<text x="184" y="116" class="ts">30°</text>', '<text x="232" y="160" class="ts">150°</text>'],
  ['<text x="226.0" y="116.7" class="ts fc">BT</text>', '<text x="200" y="258" class="ts fc" text-anchor="end">BT</text>'],
  ['<text x="180" y="228" class="tm" text-anchor="middle">cada hora = 30°</text>', '<text x="112" y="200" class="tm" text-anchor="middle">5 × 30° = 150°</text>'],
]) DY5 = troca1(DY5, de, para);

export default {
  fonte: FONTE,
  meta: {
    id: 'M2', vol: 'EL', line: 'M',
    title: 'Eletromagnetismo e transformadores',
    itens: '5.1, 5.3 (e 7.2)', faixa: 'A', peso2023: 5,
    note: 'Força num condutor, laminação do núcleo, índice horário e TC caíram em 2023 (questões 26, 27, 28 e 54). O peso de 5 é o do item 5 inteiro (máquinas), dividido com a M3; a 54 foi contada no item 8.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  labs: { lab1: 'transformador-ideal', lab2: 'rendimento-trafo' },
  trocas: [
    /* ---- correções técnicas (fontes/ERRATA.md) ---- */
    { errata: 'M2-1', de: 'Teste clássico: ligam-se H1 e X1 com um jumper, aplica-se tensão reduzida no lado de alta e mede-se entre H2 e X2. Se a leitura for a <b>diferença</b> das tensões dos dois lados, a polaridade é <b>subtrativa</b>; se for a <b>soma</b>, é <b>aditiva</b>.',
      para: 'Teste clássico (método do voltímetro): liga-se H1 ao terminal de baixa tensão que fica do mesmo lado dele no transformador, aplica-se uma tensão reduzida entre H1 e H2 e mede-se entre H2 e o outro terminal de baixa. Se a leitura for a <b>diferença</b> das tensões dos dois lados, a polaridade é <b>subtrativa</b> (o X1 fica do lado do H1); se for a <b>soma</b>, é <b>aditiva</b> (o X1 fica do lado oposto). O teste serve justamente para descobrir qual terminal de baixa é o X1: com os terminais já marcados, ligar H1 a X1 daria sempre a diferença.' },
    { errata: 'M2-1', de: 'interligam-se H1 e X1 e aplicam-se 220 V entre H1 e H2. Um voltímetro entre H2 e X2 indica 165 V',
      para: 'interliga-se H1 ao terminal de baixa tensão adjacente a ele e aplicam-se 220 V entre H1 e H2. Um voltímetro entre H2 e o outro terminal de baixa indica 165 V' },
    { errata: 'M2-2', de: '30 N, de usar 40 no lugar de 0,4 m em parte da conta', para: '30 N, de converter 40 cm em 4 m' },
    /* ---- índice horário: figura do Dy5 (o caso de 2023) e a pegadinha hora × grau ---- */
    { de: 'Figura 10. Relógio do índice horário para Dyn1: o fasor da alta tensão às 12 h e o da baixa à 1 h, isto é, 30° de atraso.</figcaption></figure>',
      para: `Figura 10. Relógio do índice horário para Dyn1: o fasor da alta tensão às 12 h e o da baixa à 1 h, isto é, 30° de atraso.</figcaption></figure>
  <figure class="narrow">${DY5}<figcaption>Figura 12. O mesmo relógio para Dy5: a baixa tensão às 5 h, isto é, 5 × 30° = 150° de atraso em relação à alta.</figcaption></figure>
  <div class="box trap">
    <p class="box-title">Pegadinha clássica</p>
    <p>O índice conta <b>horas</b>, não graus: Dy5 é 5 × 30° = <b>150°</b>, com a baixa tensão atrasada, e não “5°”. Também não é 120° (essa é a defasagem entre as fases de um sistema trifásico), e “30° adiantada” é o Dyn11.</p>
  </div>` },
    /* ---- figura 1: N e S em branco sobre o ímã colorido somem num dos temas; o ímã vira contorno colorido ---- */
    { de: '<rect x="180" y="130" width="100" height="40" class="f-pa"/><rect x="280" y="130" width="100" height="40" class="f-pc"/>\n<text x="230" y="157" class="tl tinv" text-anchor="middle">N</text><text x="330" y="157" class="tl tinv" text-anchor="middle">S</text>',
      para: '<rect x="180" y="130" width="100" height="40" class="mag pa-s"/><rect x="280" y="130" width="100" height="40" class="mag pc-s"/>\n<text x="230" y="157" class="tl fa" text-anchor="middle">N</text><text x="330" y="157" class="tl fc" text-anchor="middle">S</text>' },
    /* ---- figura 6: "curva inicial" e "−Hc" ficavam em cima das curvas (a fonte do app é mais larga) ---- */
    { de: '<text x="209" y="185" class="ts" text-anchor="end">−H', para: '<text x="196" y="190" class="ts" text-anchor="end">−H' },
    { de: '<text x="320" y="125" class="tm">curva inicial</text>', para: '<line x1="378" y1="127" x2="324" y2="93" class="guide"/><text x="382" y="134" class="tm">curva inicial</text>' },
    /* ---- contexto do app ---- */
    { de: 'o princípio do transformador (Bloco 5)', para: 'o princípio do transformador (seção 5)' },
    { de: 'que voltam a aparecer no Bloco 6', para: 'que voltam a aparecer na seção 6' },
    { de: 'chapas de aço-silício laminadas e isoladas (Bloco 4)', para: 'chapas de aço-silício laminadas e isoladas (seção 4)' },
    { de: 'detalhado nos itens 5.4 e 5.5', para: 'detalhado nos itens 5.4 e 5.5 (estação M3)' },
    { de: secao('antes'), para: `<section id="antes" class="block">
  <div class="block-head"><h2>Antes de começar</h2></div>
  <p>No Anexo IV do Edital nº 03, a <b>Ênfase 8 — Manutenção – Elétrica</b> não usa a expressão “magnetismo” isolada. O tema aparece dentro do bloco 5 (Máquinas Elétricas), nos itens conferidos no texto oficial:</p>
  <ul>
    <li><b>5.1</b> Noções básicas de Eletromagnetismo aplicado;</li>
    <li><b>5.3</b> Transformadores.</li>
  </ul>
  <p>A seção 1 também toca o item <b>7.2</b> (grandezas elétricas e magnéticas e Sistema Internacional de Unidades), porque não dá para estudar eletromagnetismo sem as unidades magnéticas. Máquinas síncronas, de corrente contínua e motores de indução (itens 5.4 e 5.5) usam estes mesmos princípios, mas ficam na estação M3.</p>
  <div class="box cesg">
    <p class="box-title">Como a Cesgranrio tem cobrado esse assunto</p>
    <p>Na prova de 2023 da própria Transpetro (Manutenção – Elétrica), quatro das 40 questões específicas foram desta estação:</p>
    <ul>
      <li>a 26: força sobre um condutor retilíneo num campo magnético, pedindo o módulo e o sentido nos eixos x e y;</li>
      <li>a 27: qual perda a laminação do núcleo de um transformador reduz;</li>
      <li>a 28: o índice horário de placa Dy5, no contexto de transformadores em paralelo. Pela regra da seção 7, a tensão de linha da baixa fica <b>150° atrasada</b>; no caderno da prova, nenhuma das alternativas impressas traz 150°, então confira o gabarito oficial antes de usar essa questão como modelo;</li>
      <li>a 54: a função de um transformador de corrente (TC) numa subestação.</li>
    </ul>
    <p>É um <b>padrão observado</b>, não garantia de repetição. Mas mostra o estilo: fórmula direta com regra de sentido, conceitos de construção e perdas, e aplicação prática em subestação.</p>
  </div>
</section>` },
    { de: secao('fontes'), para: `<section id="fontes" class="block">
  <div class="block-head"><h2>Fontes</h2></div>
  <ul class="sources">
    <li>Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO-2026.3, Anexo IV, conteúdo programático da Ênfase 8 (Manutenção – Elétrica), itens 5.1, 5.3 e 7.2 — conferido no PDF do edital.</li>
    <li>Caderno da prova Cesgranrio 2023, Transpetro, Técnico de Manutenção – Elétrica (questões 26, 27, 28 e 54), conferido no PDF da prova (usado apenas para identificar o estilo de cobrança; os exemplos e exercícios desta estação têm números próprios).</li>
    <li>Bibliografia de apoio: S. J. Chapman, <i>Fundamentos de Máquinas Elétricas</i> (AMGH); I. L. Kosow, <i>Máquinas Elétricas e Transformadores</i> (Globo); R. L. Boylestad, <i>Introdução à Análise de Circuitos</i> (Pearson).</li>
    <li>Revisão técnica do app (outubro de 2026): as contas dos 7 exemplos resolvidos e dos 39 exercícios recalculadas por teste automático; unidades, leis de Faraday e Lenz, regras de Fleming, equação do transformador, ensaios, rendimento, regulação, índice horário (IEC 60076-1), paralelismo e transformadores de instrumento conferidos em Chapman e Kosow. Dois trechos foram corrigidos: o teste de polaridade (seção 5, no texto e no exercício 6) e o comentário de um distrator (seção 3). A figura e a pegadinha do Dy5 são novas.</li>
  </ul>
  <footer>Exercícios elaborados no estilo da banca para fixação; não são questões oficiais.</footer>
</section>` },
  ],
  quizMais: {
    b7: [
      { s: 'A placa de um transformador trifásico de distribuição indica a ligação Dyn11. Em relação à tensão de linha da alta tensão, a tensão de linha da baixa tensão está',
        o: ['11° adiantada', '30° atrasada', '330° adiantada', '30° adiantada, o que equivale a 330° de atraso', '110° atrasada'], a: 3,
        c: 'Índice 11 → 11 × 30° = 330° no sentido horário, isto é, 330° de atraso, que é o mesmo que 30° de adiantamento. “11°” confunde hora com grau; 30° atrasada é o Dyn1; 330° adiantada inverte o sentido do relógio; 110° multiplica por 10.' },
    ],
  },
  formulario: [
    'Fluxo e densidade', 'Permeabilidade', 'Fio retilíneo', 'Espira / solenoide', 'Circuito magnético',
    'Força no condutor', 'Condutores paralelos', 'Faraday', 'Fem de movimento', 'Autoindução',
    'Equação do transformador', 'Transformador ideal', 'Impedância refletida', 'Perdas no cobre', 'Rendimento',
    ['Rendimento máximo', p(`${v('x')} = √(${sub('P', 'Fe')} / ${sub('P', 'Cu,nom')})`), 'é a carga em que P<sub>Cu</sub> = P<sub>Fe</sub>'],
    'Regulação',
    ['Corrente de curto nos terminais', p(`${sub('I', 'cc')} ≈ ${sub('I', 'n')} · ${fr('100', v('Z') + '%')}`), 'Z% = tensão de curto-circuito, em % da nominal (placa)'],
    'Corrente nominal trifásica', 'Índice horário', 'TC e TP',
  ],
  formulaHtml: {
    'Fluxo e densidade': p(`${v('Φ')} = ${v('B')} · ${v('A')} · cos ${v('α')}`, `${v('B')} = ${fr(v('Φ'), v('A'))}`),
    'Permeabilidade': p(`${v('B')} = ${v('μ')} · ${v('H')}`, `${v('μ')} = ${sub('μ', 'r')} · ${sub('μ', '0')}`, `${sub('μ', '0')} = 4π × 10⁻⁷ T·m/A`),
    'Fio retilíneo': p(`${v('B')} = ${fr(sub('μ', '0') + ' · ' + v('I'), '2π · ' + v('r'))} = 2 × 10⁻⁷ · ${fr(v('I'), v('r'))}`),
    'Espira / solenoide': p(`${sub('B', 'espira')} = ${fr(sub('μ', '0') + ' · ' + v('I'), '2 · ' + v('R'))}`, `${sub('B', 'sol')} = ${fr(v('μ') + ' · ' + v('N') + ' · ' + v('I'), v('l'))}`),
    'Circuito magnético': p(`ℱ = ${v('N')} · ${v('I')}`, `ℛ = ${fr(v('l'), v('μ') + ' · ' + v('A'))}`, `${v('Φ')} = ${fr('ℱ', 'ℛ')}`),
    'Força no condutor': p(`${v('F')} = ${v('B')} · ${v('I')} · ${v('L')} · sen ${v('θ')}`),
    'Condutores paralelos': p(`${fr(v('F'), v('L'))} = 2 × 10⁻⁷ · ${fr(sub('I', '1') + ' · ' + sub('I', '2'), v('d'))}`),
    'Faraday': p(`${v('e')} = −${v('N')} · ${fr('Δ' + v('Φ'), 'Δ' + v('t'))}`),
    'Fem de movimento': p(`${v('e')} = ${v('B')} · ${v('L')} · ${v('v')} · sen ${v('θ')}`),
    'Autoindução': p(`${v('e')} = −${v('L')} · ${fr('Δ' + v('i'), 'Δ' + v('t'))}`, `${v('W')} = ½ · ${v('L')} · ${v('I')}²`),
    'Equação do transformador': p(`${v('E')} = 4,44 · ${v('f')} · ${v('N')} · ${sub('Φ', 'máx')}`),
    'Transformador ideal': p(`${v('a')} = ${fr(sub('N', '1'), sub('N', '2'))} = ${fr(sub('V', '1'), sub('V', '2'))} = ${fr(sub('I', '2'), sub('I', '1'))}`),
    'Impedância refletida': p(`${v('Z')}′ = ${v('a')}² · ${sub('Z', '2')}`),
    'Perdas no cobre': p(`${sub('P', 'Cu')} = ${v('x')}² · ${sub('P', 'Cu,nom')}`),
    'Rendimento': p(`${v('η')} = ${fr(sub('P', 's'), sub('P', 's') + ' + ' + sub('P', 'Fe') + ' + ' + sub('P', 'Cu'))}`),
    'Regulação': p(`Reg = ${fr(sub('V', 'vazio') + ' − ' + sub('V', 'carga'), sub('V', 'carga'))} × 100`),
    'Corrente nominal trifásica': p(`${v('I')} = ${fr(v('S'), '√3 · ' + sub('V', 'L'))}`),
    'Índice horário': p('defasagem = índice × 30°'),
    'TC e TP': p(`${sub('I', 'prim')} = RTC · ${sub('I', 'sec')}`, `${sub('V', 'prim')} = RTP · ${sub('V', 'sec')}`),
  },
  resumo: [
    ['Grandezas', 'Φ em Wb; B = Φ/A em T (Wb/m²); H em A/m; B = μH, com μ<sub>0</sub> = 4π × 10⁻⁷.'],
    ['Força e regras', 'F = B·I·L·sen θ. Mão esquerda: força (motor). Mão direita: corrente induzida (gerador).'],
    ['Faraday e Lenz', 'e = −N·ΔΦ/Δt: só fluxo que varia induz; o sinal − é a oposição de Lenz.'],
    ['Perdas no ferro', 'Histerese: aço-silício. Correntes parasitas: núcleo laminado. Constantes com a carga.'],
    ['Transformador ideal', 'a = N<sub>1</sub>/N<sub>2</sub> = V<sub>1</sub>/V<sub>2</sub> = I<sub>2</sub>/I<sub>1</sub>; Z′ = a²·Z<sub>2</sub>; E = 4,44·f·N·Φ<sub>máx</sub>.'],
    ['Rendimento', 'P<sub>Cu</sub> = x²·P<sub>Cu,nom</sub>; η máximo com P<sub>Cu</sub> = P<sub>Fe</sub>, em x = √(P<sub>Fe</sub>/P<sub>Cu,nom</sub>).'],
    ['Índice horário, TC e TP', 'Cada hora = 30°, BT atrasada (Dy5 = 150°). TC: nunca abrir; TP: nunca curto.'],
  ],
  cards: [
    ['Unidades de Φ, B e H no SI?', 'Weber (Wb), tesla (T = Wb/m²) e ampère por metro (A/m).'],
    ['Fluxo de 2,4 mWb numa seção de 6 cm × 5 cm: quanto vale B?', 'A = 30 cm² = 0,003 m²; B = 0,0024/0,003 = 0,8 T.'],
    ['Ferro, alumínio e cobre: que tipo magnético é cada um?', 'Ferro: ferromagnético (μ<sub>r</sub> ≫ 1). Alumínio: paramagnético (μ<sub>r</sub> pouco acima de 1). Cobre: diamagnético (pouco abaixo de 1).'],
    ['Campo de um fio longo com 50 A, a 20 cm dele?', 'B = 2 × 10⁻⁷ × 50/0,2 = 5 × 10⁻⁵ T (50 µT).'],
    ['Como achar o polo norte de um solenoide?', 'Mão direita: dedos curvados no sentido da corrente nas espiras; o polegar aponta o norte.'],
    ['Por que um entreferro exige mais corrente de magnetização?', 'O ar tem μ<sub>r</sub> = 1: a relutância do trecho é enorme, e a fmm N·I tem de crescer para manter o fluxo.'],
    ['Regra da mão esquerda de Fleming: o que indica cada dedo?', 'Indicador: campo B. Médio: corrente I. Polegar: força F (motor).'],
    ['Corrente para a direita, campo entrando na página: para onde vai a força?', 'Para cima: F = I·L × B = x̂ × (−ẑ) = +ŷ.'],
    ['Condutores paralelos com correntes no mesmo sentido: atração ou repulsão?', 'Atração; sentidos opostos se repelem. F/L = 2 × 10⁻⁷·I<sub>1</sub>I<sub>2</sub>/d.'],
    ['Por que um fluxo constante, por maior que seja, não induz tensão?', 'Faraday: e = −N·ΔΦ/Δt. Sem variação de fluxo, não há fem.'],
    ['Por que surge sobretensão ao abrir a bobina de um contator?', 'e = −L·Δi/Δt: a corrente cai quase a zero num instante. Usa-se diodo de roda livre (CC) ou RC/varistor (CA).'],
    ['A laminação do núcleo reduz qual perda?', 'A por correntes parasitas (Foucault). O silício no aço ajuda nas duas: histerese e parasitas.'],
    ['Transformador 13.800/220 V com 6.000 espiras no primário: espiras do secundário?', 'N<sub>2</sub> = 6.000 × 220/13.800 ≈ 96 espiras.'],
    ['Carga de 8 Ω num transformador 480/120 V: impedância vista pelo primário?', 'a = 4; Z′ = a²·Z<sub>2</sub> = 16 × 8 = 128 Ω.'],
    ['Transformador de 60 Hz ligado em 50 Hz, com a mesma tensão: o que acontece?', 'Φ<sub>máx</sub> = E/(4,44·f·N) sobe 20%: o núcleo pode saturar, a corrente de magnetização dispara e ele aquece.'],
    ['O que medem os ensaios a vazio e de curto-circuito?', 'A vazio: perdas no ferro (e corrente de excitação). Em curto: perdas no cobre nominais e Z%.'],
    ['P<sub>Fe</sub> = 400 W e P<sub>Cu,nom</sub> = 1.600 W: em que carga o rendimento é máximo?', 'x = √(400/1.600) = 0,5, a 50% da carga, onde P<sub>Cu</sub> = 0,25 × 1.600 = 400 W = P<sub>Fe</sub>.'],
    ['Transformador de 500 kVA, 380 V, Z% = 5%: corrente de curto nos terminais?', 'I<sub>n</sub> = 500.000/(√3 × 380) ≈ 760 A; I<sub>cc</sub> ≈ 760 × 100/5 ≈ 15,2 kA.'],
    ['Dy5 e Dyn11: qual a defasagem de cada um?', 'Dy5: BT atrasada 5 × 30° = 150°. Dyn11: 330° de atraso, isto é, 30° adiantada.'],
    ['TC e TP: o que nunca fazer, e quais os secundários padronizados?', 'TC: nunca abrir o secundário energizado (5 A ou 1 A). TP: nunca curto-circuitar o secundário (115 V ou 115/√3 V).'],
  ],
  vf: [
    ['O tesla é a unidade de fluxo magnético no SI.', false, 'O tesla é de <b>densidade</b> de fluxo (B); o fluxo Φ é em weber. 1 T = 1 Wb/m².'],
    ['Partir um ímã ao meio produz dois ímãs completos, cada um com norte e sul.', true, 'Os polos são inseparáveis: não existe monopolo magnético.'],
    ['Um condutor paralelo às linhas de campo sofre a força magnética máxima.', false, 'F = B·I·L·sen θ com θ = 0°: a força é <b>nula</b>. Ela é máxima com o condutor perpendicular ao campo.'],
    ['A regra da mão esquerda de Fleming dá o sentido da força num motor, e a da mão direita, o da corrente induzida num gerador.', true, 'Mão esquerda = motor; mão direita = gerador.'],
    ['Dobrando a distância entre dois condutores paralelos, a força entre eles cai à metade.', true, 'F/L = 2 × 10⁻⁷·I<sub>1</sub>I<sub>2</sub>/d: inversamente proporcional à distância.'],
    ['A laminação do núcleo reduz principalmente as perdas por histerese.', false, 'Reduz as perdas por <b>correntes parasitas</b> (Foucault). A histerese se combate com aço-silício de laço estreito.'],
    ['As perdas no ferro de um transformador são praticamente constantes, do vazio à plena carga.', true, 'Dependem da tensão e da frequência, não da carga.'],
    ['Com metade da carga nominal, as perdas no cobre caem à metade das nominais.', false, 'Caem a <b>1/4</b>: P<sub>Cu</sub> = x²·P<sub>Cu,nom</sub> = 0,25·P<sub>Cu,nom</sub>.'],
    ['Num transformador ideal abaixador, a corrente do secundário é maior que a do primário.', true, 'I<sub>2</sub>/I<sub>1</sub> = a &gt; 1: o lado de baixa tensão tem a corrente maior.'],
    ['A impedância de uma carga no secundário é vista pelo primário multiplicada pela relação de transformação a.', false, 'É multiplicada por <b>a²</b>: Z′ = a²·Z<sub>2</sub>.'],
    ['O rendimento de um transformador é máximo na carga em que as perdas no cobre igualam as perdas no ferro.', true, 'Isso ocorre em x = √(P<sub>Fe</sub>/P<sub>Cu,nom</sub>).'],
    ['Num transformador Dy5, a tensão de linha da baixa tensão fica atrasada 5° em relação à da alta.', false, 'O índice conta horas de 30°: 5 × 30° = <b>150°</b> de atraso.'],
    ['Para operar em paralelo, dois transformadores precisam ter a mesma potência nominal.', false, 'Potências diferentes são aceitas (até cerca de 3:1). Obrigatórios: mesma relação, mesmo índice horário, mesma sequência e Z% próximas.'],
    ['O secundário de um TC energizado nunca pode ficar aberto.', true, 'Sem a carga do secundário, a corrente primária toda magnetiza o núcleo, que satura, e aparecem tensões perigosas.'],
    ['Durante a manutenção, o secundário de um TP pode ser curto-circuitado com segurança, como o de um TC.', false, 'No TP é o contrário: curto no secundário faz circular uma corrente muito alta, que o destrói.'],
  ],
  contas: [
    ['8*5', '40 cm²', 'Exemplo resolvido 1'], ['40e-4', '0,004 m²', 'Exemplo resolvido 1'], ['0.0012/0.004', '0,3 T', 'Exemplo resolvido 1'],
    ['2e-7*30/0.1*1e6', '60 µT', 'Exemplo resolvido 2'],
    ['0.5*20*0.3*0.5', '1,5 N', 'Exemplo resolvido 3'], ['0.5*20*0.3', '3 N', 'Exemplo resolvido 3'],
    ['500*0.003/0.05', '30 V', 'Exemplo resolvido 4'],
    ['440/220', '= 2 (abaixador)', 'Exemplo resolvido 5'], ['5000/440', '11,4 A', 'Exemplo resolvido 5'], ['5000/220', '22,7 A', 'Exemplo resolvido 5'],
    ['4*11', '44 Ω', 'Exemplo resolvido 5'], ['220/11', '20 A', 'Exemplo resolvido 5'], ['440/44', '10 A', 'Exemplo resolvido 5'],
    ['0.5**2*1200', '= 300 W', 'Figura 9.'],
    ['0.5*100*1', '50 kW', 'Exemplo resolvido 6'], ['0.5**2*1500', '375 W', 'Exemplo resolvido 6'], ['50000/50875*100', '98,3%', 'Exemplo resolvido 6'],
    ['5*30', '150°', 'Defasagem pelo índice horário'],
    ['225000/(Math.sqrt(3)*13800)', '9,4 A', 'Exemplo resolvido 7'], ['225000/(Math.sqrt(3)*380)', '342 A', 'Exemplo resolvido 7'], ['380/Math.sqrt(3)', '220 V', 'Exemplo resolvido 7'],
    ['0.004/0.002', '= 2 T', 'Exercícios de fixação da seção 1'], ['0.004/0.02', '0,2 T', 'Exercícios de fixação da seção 1'],
    ['2e-7*10/0.05/1e-5', '= 4 × 10⁻⁵ T', 'Exercícios de fixação da seção 2'], ['4*Math.PI*1e-7*10/0.05/1e-4', '2,5 × 10⁻⁴ T', 'Exercícios de fixação da seção 2'],
    ['2e-7*10/0.025/1e-5', '8 × 10⁻⁵ T', 'Exercícios de fixação da seção 2'], ['4*Math.PI*1e-7*500*2/0.2*1000', '6,28 mT', 'Exercícios de fixação da seção 2'],
    ['200*3', '= 600 A·e', 'Exercícios de fixação da seção 2'], ['600/3e5*1000', '2 mWb', 'Exercícios de fixação da seção 2'],
    ['600*3e5/1e8', '1,8 × 10⁸', 'Exercícios de fixação da seção 2'], ['3e5/600', 'dá 500', 'Exercícios de fixação da seção 2'],
    ['0.5*15*0.4', '= 3 N', 'Exercícios de fixação da seção 3'], ['0.5*15', '7,5 N', 'Exercícios de fixação da seção 3'], ['0.5*15*4', '30 N, de converter', 'Exercícios de fixação da seção 3'],
    ['0.8*25*0.2', '= 4 N', 'Exercícios de fixação da seção 3'], ['2e-7*2000*2000/0.2', '= 4 N/m', 'Exercícios de fixação da seção 3'],
    ['100*(0.05-0.01)/0.2', '= 20 V', 'Exercícios de fixação da seção 4'], ['100*0.05/0.2', '25 V', 'Exercícios de fixação da seção 4'],
    ['0.6*0.5*10', '= 3 V', 'Exercícios de fixação da seção 4'], ['0.5*4/0.01', '= 200 V', 'Exercícios de fixação da seção 4'],
    ['2200*50/1000', '= 110 V', 'Exercícios de fixação da seção 5'], ['2200*1000/50', '44.000 V', 'Exercícios de fixação da seção 5'],
    ['10000/220', '≈ 45,5 A', 'Exercícios de fixação da seção 5'], ['10000/2200', '≈ 4,55 A', 'Exercícios de fixação da seção 5'],
    ['100*5', '= 500 Ω', 'Exercícios de fixação da seção 5'], ['10*5', 'dá 50 Ω', 'Exercícios de fixação da seção 5'],
    ['220/(4.44*60*400)*1000', '≈ 2,06 × 10⁻³ Wb', 'Exercícios de fixação da seção 5'], ['220/(60*400)*1000', '9,17 mWb', 'Exercícios de fixação da seção 5'],
    ['311/(4.44*60*400)*1000', '2,92 mWb', 'Exercícios de fixação da seção 5'], ['220/4', '55 V', 'Exercícios de fixação da seção 5'],
    ['220-55', '= 165 V', 'Exercícios de fixação da seção 5'], ['220+55', '275 V', 'Exercícios de fixação da seção 5'],
    ['50*0.8', '40 kW', 'Exercícios de fixação da seção 6'], ['40000/41000*100', '97,6%', 'Exercícios de fixação da seção 6'],
    ['50000/51000*100', '98,0% resulta', 'Exercícios de fixação da seção 6'], ['40000/40700*100', '98,3% e', 'Exercícios de fixação da seção 6'],
    ['40000/40300*100', '99,3%, de', 'Exercícios de fixação da seção 6'], ['0.25*700', '175 W', 'Exercícios de fixação da seção 6'], ['0.5*700', '(350 W)', 'Exercícios de fixação da seção 6'],
    ['Math.sqrt(300/1200)', 'x = 0,5', 'Exercícios de fixação da seção 6'], ['(230-220)/220*100', '4,55%', 'Exercícios de fixação da seção 6'], ['10/230*100', '4,35%', 'Exercícios de fixação da seção 6'],
    ['380/Math.sqrt(3)', '≈ 220 V', 'Exercícios de fixação da seção 7'], ['13800/Math.sqrt(3)', '7.967 V seria', 'Exercícios de fixação da seção 7'],
    ['150000/(Math.sqrt(3)*380)', '≈ 228 A', 'Exercícios de fixação da seção 7'], ['150000/380', '394,7 A', 'Exercícios de fixação da seção 7'], ['150000/(3*380)', '131,6 A', 'Exercícios de fixação da seção 7'],
    ['200/5', '= 40', 'Exercícios de fixação da seção 7'], ['40*3.5', '= 140 A', 'Exercícios de fixação da seção 7'], ['11*30', '= 330°', 'Exercícios de fixação da seção 7'],
  ],
};

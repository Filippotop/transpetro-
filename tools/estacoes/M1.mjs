/* Estação M1: a apostila de simbologia e diagramas (fontes/simbologia-diagramas.html), blocos 1 a 5. Aqui ficam os
   metadados, as trocas de texto (correções em fontes/ERRATA.md e ajustes de contexto), o formulário (do quadro-resumo
   da apostila), o resumo, os cartões, o V ou F e as contas.
   Gerar: node tools/estacao.mjs fontes/simbologia-diagramas.html M1 --secoes 1-5 */
import fs from 'node:fs';

const FONTE = 'fontes/simbologia-diagramas.html';
const SRC = fs.readFileSync(new URL('../../' + FONTE, import.meta.url), 'utf8');
const secao = id => SRC.match(new RegExp(`<section id="${id}" class="block">[\\s\\S]*?</section>`))[0];

const v = s => `<var>${s}</var>`;
const p = (...xs) => xs.map(x => `<span class="eq-part">${x}</span>`).join('');
const sub = (x, s) => `${v(x)}<sub>${s}</sub>`;
const ov = s => `<span style="text-decoration:overline">${s}</span>`;

export default {
  fonte: FONTE,
  meta: {
    id: 'M1', vol: 'EL', line: 'M',
    title: 'Simbologia e diagramas elétricos',
    itens: '1.1, 1.2 (e parte do 5.7)', faixa: 'C', peso2023: 0,
    note: 'Nenhuma questão de 2023 foi do item 1, mas esta é a língua de todo comando: partida, reversão, proteção de motor e as ordens de serviço da Bancada dependem de ler o diagrama. Leia uma vez com calma e use os dois simuladores.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  labs: { sim1: 'partida-direta', sim2: 'reversao' },
  trocas: [
    /* ---- figura 5: a 390 px, dois rótulos de baixo se encavalavam com o vizinho; cada um vai em duas linhas ---- */
    { de: '<text x="80" y="301" class="tm" text-anchor="middle">(NF, cogumelo, com trava)</text>',
      para: '<text x="80" y="299" class="tm" text-anchor="middle">(NF, cogumelo,</text><text x="80" y="313" class="tm" text-anchor="middle">com trava)</text>' },
    { de: '<text x="240" y="301" class="tm" text-anchor="middle">(acionada mecanicamente)</text>',
      para: '<text x="240" y="299" class="tm" text-anchor="middle">(acionada</text><text x="240" y="313" class="tm" text-anchor="middle">mecanicamente)</text>' },
    /* ---- correções técnicas (fontes/ERRATA.md) ---- */
    { errata: 'M1-1', de: 'selo ligado em paralelo com o S0 em vez de com o S1',
      para: 'selo ligado de modo a contornar também o S0 (em paralelo com o conjunto S0 + S1, e não só com o S1)' },
    { errata: 'M1-2', de: '<text x="230" y="270" class="tm" text-anchor="start">TUG 100 VA</text>', para: '<text x="230" y="270" class="tm" text-anchor="start">600 VA</text>' },
    { errata: 'M1-2', de: 'tomada baixa do circuito 2', para: 'tomada baixa de 600 VA do circuito 2 (se fosse de 100 VA, a potência nem seria escrita)' },
    { errata: 'M1-3', de: '<tr><td>95-96 e 97-98</td><td>relé de sobrecarga: NF (95-96) e NA (97-98)</td></tr>',
      para: '<tr><td>95-96 e 97-98</td><td>relé de sobrecarga: NF (95-96) e NA (97-98)</td></tr>\n      <tr><td>x5-x6 e x7-x8</td><td>contatos de função especial: NF (5-6) e NA (7-8), como os do relé de sobrecarga e os contatos temporizados de um relé de tempo</td></tr>' },
    { errata: 'M1-3', de: 'A numeração é padronizada internacionalmente, e ler o número já diz o que o contato é:',
      para: 'A numeração é padronizada internacionalmente (regras da IEC 60947 e da antiga EN 50005, seguidas pelos catálogos dos fabricantes), e ler o número já diz o que o contato é:' },
    /* ---- figuras: rótulos que a fonte do app (mais larga) punha em cima dos fios; a porta da planta vira um vão ---- */
    { de: '<text x="190" y="222" class="tm" text-anchor="middle">sentido 1</text>', para: '<text x="146" y="214" class="tm" text-anchor="end">sentido 1</text>' },
    { de: '<text x="370" y="222" class="tm" text-anchor="middle">sentido 2</text>', para: '<text x="418" y="214" class="tm" text-anchor="start">sentido 2</text>' },
    { de: '<text x="96" y="236" class="tm" text-anchor="start">F N PE (circuito 2)</text>', para: '<text x="140" y="222" class="tm" text-anchor="start">F N PE (circuito 2)</text>' },
    { de: '<rect x="60" y="30" width="520" height="260" class="wall"/><path d="M470 290 H540" class="door"/>', para: '<path d="M470 290 H60 V30 H580 V290 H540" class="wall"/>' },
    /* ---- contexto do app ---- */
    { de: '(Bloco 5)', para: '(seção 5)' },
    /* O exemplo de diagnóstico vira o 3: o 2, novo, entra antes dele. */
    { de: '<p class="box-title">Exemplo resolvido 2</p>', para: '<p class="box-title">Exemplo resolvido 3</p>' },
    { de: 'A teoria (redução da corrente e do conjugado a cerca de 1/3) está no material de trifásicos e será aprofundada no item 5.7.</p>',
      para: `Por que a corrente cai: em estrela, cada bobina recebe V<sub>L</sub>/√3, e a corrente de linha fica em 1/3 da que o motor puxaria em triângulo; o conjugado de partida, que acompanha o quadrado da tensão na bobina, também cai a cerca de 1/3. As ligações Y e Δ estão na estação E3, e a teoria dos métodos de partida (item 5.7) fica para a estação M3.</p>
  <div class="box ex">
    <p class="box-title">Exemplo resolvido 2</p>
    <p>Um motor trifásico de placa 380/660 V, com corrente nominal de 30 A e I<sub>p</sub>/I<sub>n</sub> = 7, vai ser ligado numa rede de 380 V. Ele pode partir em estrela-triângulo? Quanto vale a corrente de partida, direta e com a chave?</p>
    <ol class="steps">
      <li>Em regime ele fica em triângulo, e cada bobina recebe a tensão da rede: 380 V, que é a tensão de triângulo da placa. Pode, e tem de ter os seis terminais acessíveis.</li>
      <li>Partida direta (em triângulo): I<sub>p</sub> = 7 × 30 = <b>210 A</b>.</li>
      <li>Partida em estrela: cada bobina recebe 380/√3 ≈ <b>219 V</b>, e a corrente de linha cai a 1/3: 210/3 = <b>70 A</b>. O conjugado de partida também fica em cerca de 1/3, por isso a chave serve para cargas que partem leves (bombas, ventiladores com registro fechado).</li>
    </ol>
  </div>` },
    { de: '<div class="quiz" data-set="b5"></div>', para: `<div class="box conexao">
    <p class="box-title">Pratique na Bancada</p>
    <p>Na aba Bancada, a <b>OS 1, “A bomba que não parte”</b>, é este comando de partida direta com um defeito escondido: você mede tensão ponto a ponto, como no exemplo 3, e decide se o problema está no fusível do comando, no relé de sobrecarga, numa botoeira, no selo ou na bobina. A <b>OS 3, “O motor que desarma sozinho”</b>, é o outro lado do relé de sobrecarga: falta de fase, sobrecarga mecânica, ajuste errado ou desequilíbrio de tensão.</p>
    <p><a href="#bancada" data-ir="bancada">Abrir a Bancada →</a></p>
  </div>

  <div class="quiz" data-set="b5"></div>` },
    { de: secao('antes'), para: `<section id="antes" class="block">
  <div class="block-head"><h2>Antes de começar</h2></div>
  <p>Esta estação cobre o primeiro bloco da <b>Ênfase 8 — Manutenção – Elétrica</b> (Anexo IV do Edital nº 03), “Simbologia e diagramas elétricos”, com os itens conferidos no texto oficial:</p>
  <ul>
    <li><b>1.1</b> Diagramas unifilares e trifilares;</li>
    <li><b>1.2</b> Esquemas de acionamento e controle em equipamentos elétricos.</li>
  </ul>
  <p>Ela também lê os esquemas de partida direta, reversão e estrela-triângulo, que são parte do item <b>5.7</b> (acionamento e comando de motores). O foco é a <b>leitura</b> dos diagramas e a <b>lógica</b> dos comandos. A teoria dos métodos de partida (correntes, conjugados, soft-starter, inversor) e o dimensionamento de fusíveis, disjuntores e relés (item 5.6) ficam na estação M3; a programação de CLP em Ladder (item 9.4), na estação A2.</p>
  <div class="box cesg">
    <p class="box-title">Como a Cesgranrio tem cobrado esse assunto</p>
    <p>Na prova de 2023 da própria Transpetro (Manutenção – Elétrica), nenhuma das 40 questões específicas foi do item 1. A mais próxima foi a 38 (corrente de partida de um motor com chave estrela-triângulo), que é do item 5.7 e se resolve com o raciocínio do exemplo resolvido 2 desta estação. Em provas da Petrobras para Técnico de Manutenção Júnior – Elétrica, a banca já pediu <span class="confira">o programa Ladder equivalente a um diagrama de comando de contator com os elementos F1, S0, S1 e K1 (2014)</span>.</p>
    <p>É um <b>padrão observado</b>, não garantia de repetição. O estilo é de interpretação: você recebe um esquema e precisa entender a lógica, e não decorar desenhos.</p>
  </div>
</section>` },
    { de: secao('fontes'), para: `<section id="fontes" class="block">
  <div class="block-head"><h2>Fontes</h2></div>
  <ul class="sources">
    <li>Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO-2026.3, Anexo IV, conteúdo programático da Ênfase 8 (Manutenção – Elétrica), itens 1.1, 1.2 e 5.7 — conferido no PDF do edital.</li>
    <li>Caderno da prova Cesgranrio 2023, Transpetro, Técnico de Manutenção – Elétrica (questão 38), conferido; questão Cesgranrio 2014, Petrobras, Técnico de Manutenção Júnior – Elétrica, citada pela apostila a partir do <a href="https://www.qconcursos.com/questoes-de-concursos/questoes/9214c529-85">Qconcursos</a> e não conferida nesta revisão (a página não abriu).</li>
    <li>ABNT NBR 5444:1989, texto da norma (cópia didática da <a href="http://ftp.demec.ufpr.br/disciplinas/TM249/Material%20de%20aula/NBR_5444-1989_Simbolos_Graficos_para_Instalacoes_Prediais.pdf">UFPR</a>) e registro do seu cancelamento em 10/11/2014, sem substituição.</li>
    <li>Numeração de bobinas e contatos (A1-A2; 1L1-2T1; x3-x4 NA, x1-x2 NF, x5-x6 e x7-x8 de função especial; 95-96 e 97-98): material didático do <a href="https://materialpublic.imd.ufrn.br/curso/disciplina/1/58/5/11">IMD/UFRN</a> e catálogos de contatores e relés de sobrecarga de fabricantes.</li>
    <li>Bibliografia de apoio: C. M. Franchi, <i>Acionamentos Elétricos</i> (Érica); H. Creder, <i>Instalações Elétricas</i> (LTC); A. A. M. Cotrim, <i>Instalações Elétricas</i> (Pearson).</li>
    <li>Revisão técnica do app (outubro de 2026): convenções, numeração, letras, ANSI e lógica de comando conferidas em Franchi e no material do IMD/UFRN; os 3 exemplos resolvidos e os 30 exercícios refeitos. Três trechos foram corrigidos ou completados: a causa “S0 não desliga” na tabela de diagnóstico, a potência da tomada na figura 3 (que contrariava a convenção da NBR 5444) e os contatos de função especial na tabela de numeração. O exemplo 2 (estrela-triângulo com números) é novo.</li>
  </ul>
  <footer>Exercícios elaborados no estilo da banca para fixação; não são questões oficiais.</footer>
</section>` },
  ],
  quizMais: {
    b5: [
      { s: 'Um motor trifásico de placa 380/660 V, ligado a uma rede de 380 V, tem corrente de partida de 150 A quando parte direto. Com chave estrela-triângulo, a corrente de partida na linha fica em cerca de',
        o: ['50 A', '86,6 A', '150 A', '260 A', '450 A'], a: 0,
        c: 'Em estrela, cada bobina recebe 380/√3 ≈ 219 V, e a corrente de linha cai a 1/3 da partida direta: 150/3 = 50 A. 86,6 A divide só por √3 (lembra a tensão de fase, mas esquece que, em triângulo, a corrente de linha já era √3 vezes a de fase); 260 A multiplica por √3; 450 A multiplica por 3; 150 A é a própria partida direta.' },
    ],
  },
  formulario: [
    ['Estado de representação', p('repouso: NA aberto · NF fechado'), 'tudo desenergizado e sem acionamento mecânico, qualquer que seja o estado real da máquina'],
    ['Unifilar × trifilar', p('unifilar: 1 linha por circuito', 'trifilar: 1 linha por condutor'), 'traços oblíquos = nº de condutores; unifilar: estrutura, proteções e dados nominais; trifilar: fase a fase, sequência e polos'],
    ['Funcional × ligações', p('funcional = lógica', 'ligações = posição física e bornes'), 'a planta baixa mostra onde ficam pontos, tomadas, quadros e eletrodutos na edificação'],
    ['Simbologia predial (NBR 5444)', p('traço · círculo · triângulo · quadrado'), 'eletroduto; ponto de luz e teto; tomada; piso ou motor. Letra minúscula = interruptor que comanda; -n- = circuito. Cancelada em 2014, sem substituta, e ainda usada'],
    ['Letras dos componentes', p('K · F · Q · S · H · M'), 'contator ou relé; proteção (F7 = relé de sobrecarga); disjuntor ou seccionador; botoeira; sinalização; motor'],
    ['Bobina e contatos principais', p(`A1-A2`, '1-2 · 3-4 · 5-6'), 'principais: ímpar do lado da rede, par do lado da carga (1L1-2T1, 3L2-4T2, 5L3-6T3)'],
    ['Contatos auxiliares', p(`${v('x')}3-${v('x')}4 = NA`, `${v('x')}1-${v('x')}2 = NF`), '2º dígito = função; 1º dígito = ordem (13-14 NA, 21-22 NF); 5-6 e 7-8: função especial'],
    ['Relé de sobrecarga', p('95-96 = NF', '97-98 = NA'), '95-96 em série com a bobina (abre na sobrecarga); 97-98 acende a sinalização de falha. Não protege contra curto'],
    ['Numeração ANSI (IEEE C37.2)', p('50 · 51 · 52 · 87 · 89'), 'sobrecorrente instantâneo e temporizado, disjuntor de CA, diferencial, seccionadora; 27/59 sub e sobretensão, 49 térmico, 63 Buchholz, 86 bloqueio; N = neutro'],
    ['Regras de comando', p('desligar e proteger: NF em série', 'ligar e selo: NA em paralelo'), 'selo = NA do próprio contator em paralelo com o botão de liga; sequência = NA de K1 em série com a bobina de K2'],
    ['Intertravamento elétrico', p('NF de K2 em série com K1', 'NF de K1 em série com K2'), 'impede que os dois liguem juntos (reversão, estrela-triângulo); nos casos críticos, também o mecânico'],
    ['Lógica de contatos', p(`${v('K1')} = ${ov('F7')} · ${ov('S0')} · (${v('S1')} + ${v('K1')})`), 'série = E; paralelo = OU; contato NF = NÃO'],
    ['Ladder com botão NF físico', p('entrada em 1 no repouso → contato NA no programa'), 'o mesmo vale para o 95-96 ligado a uma entrada do CLP'],
    ['Reversão', p('troca de duas fases'), 'K1 entrega L1-L2-L3, K2 entrega L3-L2-L1; intertravamento elétrico (e mecânico)'],
    ['Estrela-triângulo', p(`${sub('V', 'bobina')} = ${sub('V', 'L')}/√3`, `${sub('I', 'p,Y')} ≈ ${sub('I', 'p,Δ')}/3`), 'rede + estrela → tempo → abre estrela, fecha triângulo; motor de 6 terminais com tensão de Δ igual à da rede'],
  ],
  resumo: [
    ['Repouso', 'O diagrama mostra tudo desenergizado e sem acionamento: NA aberto, NF fechado.'],
    ['Unifilar × trifilar', 'Unifilar: 1 linha por circuito (traços = nº de condutores). Trifilar: 1 linha por condutor.'],
    ['Numeração', 'A1-A2 bobina; x3-x4 NA; x1-x2 NF; 95-96 NF e 97-98 NA do relé de sobrecarga.'],
    ['Selo', 'NA do próprio contator (13-14) em paralelo com o botão de liga: o contator se segura.'],
    ['Regras de comando', 'Desligar e proteger: NF em série. Ligar: NA em paralelo. Intertravamento: NF do outro.'],
    ['Reversão e Y-Δ', 'Reversão: troca duas fases. Y-Δ: estrela e triângulo intertravados; partida a ~1/3.'],
    ['Ladder', 'Botão NF físico deixa a entrada em 1 no repouso: no programa, use contato NA.'],
  ],
  cards: [
    ['Em que estado os componentes aparecem num diagrama?', 'Em repouso: desenergizados e sem acionamento. NA aberto, NF fechado, relé de sobrecarga rearmado.'],
    ['Diferença entre diagrama unifilar e trifilar?', 'Unifilar: uma linha por circuito, com traços oblíquos dando o nº de condutores (visão do sistema). Trifilar: um traço por condutor (fase a fase).'],
    ['Que diagrama mostra onde entra cada fio e o número dos bornes?', 'O de ligações (fiação ou interligação). O funcional mostra só a lógica.'],
    ['Qual a situação da NBR 5444 (símbolos de instalações prediais)?', 'Cancelada em 2014, sem substituta, mas ainda muito usada. Internacionalmente, a referência é a IEC 60617.'],
    ['Planta baixa: ponto de luz com “b”, “-3-” e “60 W”. O que significa?', 'Comandado pelo interruptor “b”, circuito 3, potência de 60 W.'],
    ['O que são K, F, Q, S e H num diagrama de comando?', 'Contator ou relé, proteção, disjuntor ou seccionador, botoeira e sinalização.'],
    ['Terminais 13-14 e 21-22 de um contator?', '13-14: 1º auxiliar, NA. 21-22: 2º auxiliar, NF. O 2º dígito dá a função; o 1º, a ordem.'],
    ['Terminais 95-96 e 97-98?', 'Do relé de sobrecarga: 95-96 é NF, em série com a bobina (abre na sobrecarga); 97-98 é NA e sinaliza a falha.'],
    ['O relé de sobrecarga protege contra curto-circuito?', 'Não: contra sobrecorrente moderada e prolongada (sobrecarga, falta de fase). Curto é com fusível ou disjuntor.'],
    ['Como se faz o selo (retenção) de um contator?', 'Com um NA do próprio contator (13-14) em paralelo com o botão de liga.'],
    ['Comando de dois locais: como ligar as botoeiras?', 'As de liga (NA) em paralelo; as de desliga (NF) em série.'],
    ['Como garantir que K2 só ligue com K1 ligado?', 'Um NA de K1 em série no ramo da bobina de K2 (condição de sequência).'],
    ['Como é o intertravamento elétrico entre K1 e K2?', 'NF de K2 em série com a bobina de K1, e NF de K1 em série com a bobina de K2.'],
    ['Expressão lógica da partida direta com selo?', `K1 = ${ov('F7')} · ${ov('S0')} · (S1 + K1): série = E, paralelo = OU, NF = NÃO.`],
    ['S0 é um botão NF ligado à entrada I1 do CLP. Que contato usar no Ladder?', 'Contato NA de I1: com o botão solto, a entrada está em 1, e o contato NA conduz.'],
    ['Como inverter o sentido de rotação de um motor trifásico?', 'Trocando duas fases quaisquer. Trocar as três em rodízio mantém a sequência e o sentido.'],
    ['Que motor serve para partida estrela-triângulo numa rede de 380 V?', 'Um de seis terminais com tensão de triângulo de 380 V, como o 380/660 V. O 220/380 V só pode ficar em estrela.'],
    ['A partida direta puxa 210 A. Com estrela-triângulo, quanto?', 'Cerca de 70 A (1/3). O conjugado de partida também cai a cerca de 1/3.'],
    ['O motor liga com S1, mas desliga ao soltar o botão. Onde está o defeito?', 'No selo: o contato 13-14 de K1 ou a fiação dele.'],
    ['Contator de CA vibrando e roncando: causas prováveis?', 'Tensão baixa na bobina, sujeira entre as peças do núcleo ou espira de sombra (anel de curto) danificada.'],
  ],
  vf: [
    ['Num diagrama de comando, o contato 13-14 de um contator que está ligado aparece desenhado fechado.', false, 'O diagrama mostra sempre o <b>repouso</b>: o 13-14 é NA e aparece aberto, qualquer que seja o estado da máquina.'],
    ['No diagrama unifilar, três traços oblíquos sobre a linha indicam três condutores.', true, 'Os traços dão o número de condutores que a linha única representa.'],
    ['O diagrama unifilar é o mais indicado para conferir em que polo do disjuntor está cada fase.', false, 'É o <b>trifilar</b>, que desenha cada condutor; o unifilar esconde justamente o detalhe fase a fase.'],
    ['A NBR 5444, de símbolos para instalações prediais, foi substituída pela NBR 5410 em 2014.', false, 'Foi cancelada em 2014 <b>sem substituta</b>. A NBR 5410 trata de instalações de baixa tensão, não de símbolos.'],
    ['Os terminais 21-22 de um contator correspondem a um contato auxiliar NF.', true, 'Segundo dígito 1-2 = NF; o primeiro (2) diz que é o segundo contato da sequência.'],
    ['O contato 97-98 do relé de sobrecarga é NF e fica em série com a bobina do contator.', false, 'O NF em série com a bobina é o <b>95-96</b>; o 97-98 é NA e serve para sinalizar a falha.'],
    ['O relé de sobrecarga protege o motor contra correntes de curto-circuito.', false, 'Protege contra <b>sobrecarga</b> (sobrecorrente moderada e prolongada). O curto é interrompido por fusíveis ou disjuntor.'],
    ['O contato de selo é um NA do próprio contator ligado em paralelo com o botão de liga.', true, 'Solto o botão, a corrente da bobina continua pelo NA (13-14), e o contator se mantém.'],
    ['Num comando de dois locais, os botões de desliga ficam em série e os de liga, em paralelo.', true, 'Qualquer desliga abre o ramo (série = E); qualquer liga fecha o caminho (paralelo = OU).'],
    ['O intertravamento elétrico usa um contato NA de cada contator em série com a bobina do outro.', false, 'Usa um <b>NF</b>. Um NA em série faria o contrário: K2 só ligaria com K1 ligado (sequência).'],
    ['Trocar as três fases em rodízio (L1 → L2, L2 → L3, L3 → L1) inverte o sentido de rotação do motor.', false, 'O rodízio mantém a sequência de fases. Para inverter, troca-se <b>duas</b> fases.'],
    ['Num CLP, um botão NF físico ligado a uma entrada deve ser programado com contato NA no Ladder.', true, 'Com o botão solto, a entrada fica em 1; o contato NA conduz e abre quando o botão é pressionado.'],
    ['Um motor de placa 220/380 V pode partir em estrela-triângulo numa rede de 380 V.', false, 'Em triângulo, cada bobina ficaria com 380 V, acima dos 220 V da placa. Em rede de 380 V, o motor tem de ser 380/660 V.'],
    ['Na partida estrela-triângulo, a corrente de partida na linha cai a cerca de 1/3 da partida direta.', true, 'Em estrela, a bobina recebe V<sub>L</sub>/√3, e a corrente de linha fica em 1/3; o conjugado também.'],
  ],
  contas: [
    ['7*30', '210 A', 'Exemplo resolvido 2'], ['380/Math.sqrt(3)', '219 V', 'Exemplo resolvido 2'], ['210/3', '70 A', 'Exemplo resolvido 2'],
    ['150/3', '= 50 A', 'Exercícios de fixação da seção 5'], ['150/Math.sqrt(3)', '86,6 A divide', 'Exercícios de fixação da seção 5'],
    ['150*Math.sqrt(3)', '260 A multiplica', 'Exercícios de fixação da seção 5'], ['150*3', '450 A multiplica', 'Exercícios de fixação da seção 5'],
  ],
};

/* Elétrica de Ouro: NR-10 em vigor (2019) × nova NR-10 (Portaria MTE nº 737/2026), lado a lado.
   Os trechos entre aspas (campo txt) são CÓPIA LITERAL do texto oficial do gov.br, a mesma de fontes/nr10-2019-x-2026.md
   (acesso em 25/10/2026), com a grafia original ("seqüência", "carácter"…). tests/biblioteca.test.mjs confere que cada
   linha de txt aparece, palavra por palavra, naquele arquivo. Os campos mudou e as pegadinhas são texto do app.
   a = texto em vigor até 31/05/2027 (o que a prova de 29/11/2026 cobra, por inferência); b = texto a partir de 01/06/2027.
   O endereço antigo …/arquivos/normas-regulamentadoras/nr-10.pdf, no gov.br, agora serve o texto de 2027: nunca o cite
   como "vigente". */
(function (D) {
  var P19 = 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-10-atualizada-2019-1.pdf';
  var P27 = 'https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/sst-portarias/2026-1/portaria-mte-no-737-nova-nr-10.pdf';
  var A = function (ref, pag, txt) { return { ref: ref, pag: pag, url: P19 + '#page=' + pag, txt: txt }; };
  var B = function (ref, pag, txt) { return { ref: ref, pag: pag, url: P27 + '#page=' + pag, txt: txt }; };
  D.nr10 = {
    acesso: '25/10/2026',
    porVigencia: [
      'Em vigor até 31/05/2027: NR-10 com a redação da Portaria MTE nº 598/2004, alterada pela Portaria MTPS nº 508/2016 e pela Portaria SEPRT nº 915/2019 (PDF compilado de 18 páginas no gov.br).',
      'Em vigor a partir de 01/06/2027: Portaria MTE nº 737, de 29/05/2026 (DOU de 01/06/2026, seção 1; retificação no DOU de 24/06/2026), que entra em vigor um ano depois de publicada (art. 5º) e revoga as Portarias 598/2004 e 508/2016 (art. 4º).'
    ],
    aviso: 'A prova é em 29/11/2026, quando vale o texto de 2019. O edital (item 10.4 da Ênfase 8) diz só "Conhecimento da Norma Regulamentadora NR-10 Segurança em Eletricidade", sem citar portaria e sem cláusula sobre norma publicada e ainda não vigente. <span class="confira">Qual versão a banca cobra não está escrito em lugar nenhum: é inferência. O mais provável é o texto de 2019, vigente no dia da prova.</span> Estude o de 2019 e saiba reconhecer o que muda em 2027.',
    linkAntigo: 'O endereço antigo do PDF da NR-10 no gov.br (…/normas-regulamentadoras/nr-10.pdf) agora serve o texto de 2027, com o aviso "Vigência a partir de 01 de junho de 2027". Quem baixar a NR-10 por esse link lê a norma nova achando que é a vigente.',
    fontes: [
      { t: 'Ministério do Trabalho e Emprego. NR-10, texto compilado até a Portaria SEPRT nº 915/2019, vigente até 31/05/2027.', url: P19 },
      { t: 'Ministério do Trabalho e Emprego. Portaria MTE nº 737, de 29 de maio de 2026 (nova NR-10, vigência em 01/06/2027).', url: P27 },
      { t: 'Transpetro/Cesgranrio. Edital nº 03 – Nível Médio – 2026.3, de 11/08/2026, Ênfase 8, item 10.4 (fontes/edital-03-2026.pdf).' }
    ],
    itens: [
      { id: 'des', titulo: 'Sequência de desenergização', a: A('10.5.1', 5, [
          '10.5.1 Somente serão consideradas desenergizadas as instalações elétricas liberadas para trabalho, mediante os procedimentos apropriados, obedecida a seqüência abaixo:',
          'a) seccionamento;',
          'b) impedimento de reenergização;',
          'c) constatação da ausência de tensão;',
          'd) instalação de aterramento temporário com equipotencialização dos condutores dos circuitos;',
          'e) proteção dos elementos energizados existentes na zona controlada (Anexo II); (Alterada pela Portaria MTPS n.º 508, de 29 de abril de 2016)',
          'f) instalação da sinalização de impedimento de reenergização.']),
        b: B('10.13.1', 12, [
          '10.13.1 Somente serão consideradas desenergizadas as instalações elétricas liberadas para trabalho, mediante os procedimentos apropriados, obedecida a sequência abaixo e prevista no projeto:',
          'a) seccionamento ou desligamento;',
          'b) constatação da ausência de tensão;',
          'c) impedimento de reenergização;',
          'd) constatação de ausência de tensão para a instalação de aterramento temporário com equipotencialização dos condutores dos circuitos;',
          'e) proteção dos elementos energizados existentes na zona controlada (Anexo II desta NR) e proteção dos trabalhadores para os efeitos do arco elétrico;',
          'f) instalação da sinalização de impedimento de reenergização; e',
          'g) delimitação e sinalização da área de trabalho.']),
        mudou: 'De 6 para 7 passos. A constatação da ausência de tensão sobe para antes do impedimento de reenergização (b e c trocam de lugar) e é repetida antes do aterramento (d); entram a proteção contra o arco elétrico (e) e a delimitação da área (g); e a sequência passa a ter de estar "prevista no projeto".' },
      { id: 'reen', titulo: 'Sequência de reenergização', a: A('10.5.2', 5, [
          '10.5.2 O estado de instalação desenergizada deve ser mantido até a autorização para reenergização, devendo ser reenergizada respeitando a seqüência de procedimentos abaixo:',
          'a) retirada das ferramentas, utensílios e equipamentos;',
          'b) retirada da zona controlada de todos os trabalhadores não envolvidos no processo de reenergização;',
          'c) remoção do aterramento temporário, da equipotencialização e das proteções adicionais;',
          'd) remoção da sinalização de impedimento de reenergização;',
          'e) destravamento, se houver, e religação dos dispositivos de seccionamento.']),
        b: B('10.13.2', 13, [
          '10.13.2 O estado de instalação desenergizada deve ser mantido até a autorização para reenergização, devendo ser reenergizada respeitando a sequência de procedimentos abaixo:',
          'a) retirada dos obstáculos de delimitação e sinalização do espaço seguro de trabalho;',
          'b) retirada das ferramentas, utensílios e equipamentos;',
          'c) retirada das imediações de todos os trabalhadores não envolvidos no processo de reenergização;',
          'd) remoção do aterramento temporário e da equipotencialização;',
          'e) retirada das proteções dos elementos energizados nas imediações;',
          'f) remoção da sinalização de impedimento de reenergização; e',
          'g) desbloqueio, se houver, e religamento dos dispositivos de seccionamento.']),
        mudou: 'De 5 para 7 passos. Começa retirando a delimitação da área (a); "zona controlada" vira "imediações" (c); a retirada das proteções vira passo próprio (e), depois do aterramento; "destravamento/religação" vira "desbloqueio/religamento". Nas duas redações a reenergização não é a ordem inversa da desenergização.' },
      { id: 'alt', titulo: 'Mudar a sequência e instalação desligada que pode ser energizada', a: A('10.5.3 e 10.5.4', 5, [
          '10.5.3 As medidas constantes das alíneas apresentadas nos itens 10.5.1 e 10.5.2 podem ser alteradas, substituídas, ampliadas ou eliminadas, em função das peculiaridades de cada situação, por profissional legalmente habilitado, autorizado e mediante justificativa técnica previamente formalizada, desde que seja mantido o mesmo nível de segurança originalmente preconizado.',
          '10.5.4 Os serviços a serem executados em instalações elétricas desligadas, mas com possibilidade de energização, por qualquer meio ou razão, devem atender ao que estabelece o disposto no item 10.6.']),
        b: B('10.13.4 e 10.5.2', 13, [
          '10.13.4 As medidas constantes das alíneas apresentadas nos itens 10.13.1 e 10.13.2 podem ser alteradas, substituídas, ampliadas ou eliminadas, em função das peculiaridades de cada situação e/ou do desenvolvimento tecnológico, por PLH, autorizado e mediante justificativa técnica previamente formalizada, desde que seja mantido o mesmo nível de segurança originalmente preconizado.',
          '10.5.2 Quando os serviços forem realizados em instalações elétricas desligadas, mas com possibilidade de energização, por qualquer meio ou razão, a organização deve atender ao que estabelece o disposto no capítulo 10.14 desta NR.']),
        mudou: 'O 10.5.3 vira 10.13.4 e ganha "e/ou do desenvolvimento tecnológico"; o 10.5.4 vira 10.5.2 e remete ao capítulo 10.14 (energizadas) em vez do item 10.6. A regra é a mesma: instalação desligada, mas que pode ser energizada, é tratada como energizada. Nenhuma das duas redações tem um item sobre "impossibilidade de instalar o aterramento": o que manda tratar como serviço energizado é a possibilidade de energização.' },
      { id: 'prio', titulo: 'Prioridade das medidas de controle', a: A('10.2.8.1, 10.2.8.2 e 10.2.8.2.1', 2, [
          '10.2.8.1 Em todos os serviços executados em instalações elétricas devem ser previstas e adotadas, prioritariamente, medidas de proteção coletiva aplicáveis, mediante procedimentos, às atividades a serem desenvolvidas, de forma a garantir a segurança e a saúde dos trabalhadores.',
          '10.2.8.2 As medidas de proteção coletiva compreendem, prioritariamente, a desenergização elétrica conforme estabelece esta NR e, na sua impossibilidade, o emprego de tensão de segurança.',
          '10.2.8.2.1 Na impossibilidade de implementação do estabelecido no subitem 10.2.8.2., devem ser utilizadas outras medidas de proteção coletiva, tais como: isolação das partes vivas, obstáculos, barreiras, sinalização, sistema de seccionamento automático de alimentação, bloqueio do religamento automático.',
          '10.2.9.1: "Nos trabalhos em instalações elétricas, quando as medidas de proteção coletiva forem tecnicamente inviáveis ou insuficientes para controlar os riscos, devem ser adotados equipamentos de proteção individual específicos e adequados às atividades desenvolvidas, em atendimento ao disposto na NR 6."']),
        b: B('10.5.1, 10.5.3 e 10.5.4', 4, [
          '10.5.1 Prioritariamente deve ser adotada a eliminação do perigo decorrente do emprego da energia elétrica por meio da desenergização das instalações elétricas, conforme estabelece o capítulo 10.13 desta NR.',
          '10.5.3 As medidas de prevenção devem obedecer à ordem de prioridade prevista na NR-1.',
          '10.5.4 Na impossibilidade de implementação do item 10.5.1 devem ser adotadas medidas de proteção coletiva, conforme capítulo 10.6, ou quando estas não forem suficientes ou encontrarem-se em fase de estudo, planejamento ou implantação, ou ainda em carácter complementar ou emergencial, deverão ser adotadas outras medidas, obedecendo-se à seguinte hierarquia:',
          'a) medidas administrativas e de organização do trabalho, conforme capítulo 10.7; e',
          'b) medidas de proteção individual, conforme capítulo 10.11.']),
        mudou: 'Em vigor, só há dois degraus com ordem (1º desenergização; 2º tensão de segurança) e depois uma lista de exemplos sem ordem ("tais como"). Na nova, a hierarquia passa a ser desenergização, depois proteção coletiva (capítulo 10.6), depois medidas administrativas, depois EPI; a "tensão de segurança" deixa de ser o 2º degrau.' },
      { id: 'energ', titulo: 'Instalações energizadas, operações elementares e trabalho em alta tensão', a: A('10.6.1, 10.6.1.2, 10.6.2, 10.7.3, 10.7.4, 10.7.7 e 10.7.8', 5, [
          '10.6.1 As intervenções em instalações elétricas com tensão igual ou superior a 50 Volts em corrente alternada ou superior a 120 Volts em corrente contínua somente podem ser realizadas por trabalhadores que atendam ao que estabelece o item 10.8 desta Norma.',
          '10.6.1.2 As operações elementares como ligar e desligar circuitos elétricos, realizadas em baixa tensão, com materiais e equipamentos elétricos em perfeito estado de conservação, adequados para operação, podem ser realizadas por qualquer pessoa não advertida.',
          '10.6.2 Os trabalhos que exigem o ingresso na zona controlada devem ser realizados mediante procedimentos específicos respeitando as distâncias previstas no Anexo II. (Alterado pela Portaria MTPS n.º 508, de 29 de abril de 2016)',
          '10.7.3 Os serviços em instalações elétricas energizadas em AT, bem como aqueles executados no Sistema Elétrico de Potência - SEP, não podem ser realizados individualmente.',
          '10.7.4 Todo trabalho em instalações elétricas energizadas em AT, bem como aquelas que interajam com o SEP, somente pode ser realizado mediante ordem de serviço específica para data e local, assinada por superior responsável pela área.',
          '10.7.7 A intervenção em instalações elétricas energizadas em AT dentro dos limites estabelecidos como zona de risco, conforme Anexo II desta NR, somente pode ser realizada mediante a desativação, também conhecida como bloqueio, dos conjuntos e dispositivos de religamento automático do circuito, sistema ou equipamento. (Alterado pela Portaria MTPS n.º 508, de 29 de abril de 2016)',
          '10.7.8 Os equipamentos, ferramentas e dispositivos isolantes ou equipados com materiais isolantes, destinados ao trabalho em alta tensão, devem ser submetidos a testes elétricos ou ensaios de laboratório periódicos, obedecendo-se as especificações do fabricante, os procedimentos da empresa e na ausência desses, anualmente.']),
        b: B('10.14.1, 10.14.1.1, 10.14.2, 10.14.3 e 10.14.4.1', 13, [
          '10.14.1 Os serviços em eletricidade com exposição à baixa, média e alta tensão e os trabalhos em proximidade com o compartilhamento de infraestruturas do Sistema Elétrico de Potência - SEP somente podem ser realizados por trabalhadores autorizados em conformidade com o capítulo 10.10 desta NR.',
          '10.14.1.1 As operações elementares como ligar e desligar circuitos, dispositivos e equipamentos elétricos, realizadas em baixa tensão em sistemas, equipamentos e dispositivos projetados, construídos, instalados e mantidos de forma a serem utilizados com segurança e adequados para operação, conforme orientações das normas técnicas oficiais, podem ser realizadas por qualquer pessoa não advertida.',
          '10.14.2 Os serviços em instalações elétricas energizadas em média e alta tensão, bem como aqueles executados no SEP, não podem ser realizados individualmente.',
          '10.14.3 A intervenção em instalações elétricas energizadas em média e alta tensão dentro dos limites estabelecidos como zona de risco, conforme Anexo II desta NR, somente pode ser realizada mediante a desativação, também conhecida como bloqueio, dos conjuntos e dispositivos de religamento automático do circuito, sistema ou equipamento.',
          '10.14.4.1 O ensaio deve ser realizado no menor intervalo previsto dentre as regulamentações existentes, as recomendações dos fabricantes, os critérios a serem desenvolvidos pelo PLH da organização, e, na ausência de previsão, anualmente.']),
        mudou: 'Os capítulos 10.6 e 10.7 viram um só (10.14); "AT" vira "média e alta tensão" (o glossário novo cria a MT); o limite "igual ou superior a 50 V CA / superior a 120 V CC" sai do texto; a "ordem de serviço" do 10.7.4 dá lugar a procedimento (rotineiro) ou permissão de trabalho (não rotineiro); o ensaio dielétrico passa a valer também para luvas, mangas e EPC isolantes de baixa tensão.' },
      { id: 'quem', titulo: 'Qualificado, habilitado, capacitado e autorizado', a: A('10.8.1 a 10.8.8', 7, [
          '10.8.1 É considerado trabalhador qualificado aquele que comprovar conclusão de curso específico na área elétrica reconhecido pelo Sistema Oficial de Ensino.',
          '10.8.2 É considerado profissional legalmente habilitado o trabalhador previamente qualificado e com registro no competente conselho de classe.',
          '10.8.3 É considerado trabalhador capacitado aquele que atenda às seguintes condições, simultaneamente:',
          'a) receba capacitação sob orientação e responsabilidade de profissional habilitado e autorizado; e',
          'b) trabalhe sob a responsabilidade de profissional habilitado e autorizado.',
          '10.8.3.1 A capacitação só terá validade para a empresa que o capacitou e nas condições estabelecidas pelo profissional habilitado e autorizado responsável pela capacitação.',
          '10.8.4 São considerados autorizados os trabalhadores qualificados ou capacitados e os profissionais habilitados, com anuência formal da empresa.',
          '10.8.5 A empresa deve estabelecer sistema de identificação que permita a qualquer tempo conhecer a abrangência da autorização de cada trabalhador, conforme o item 10.8.4.',
          '10.8.6 Os trabalhadores autorizados a trabalhar em instalações elétricas devem ter essa condição consignada no sistema de registro de empregado da empresa.',
          '10.8.7 Os trabalhadores autorizados a intervir em instalações elétricas devem ser submetidos a exame de saúde compatível com as atividades a serem desenvolvidas, realizado em conformidade com a NR 7 e registrado em seu prontuário médico.',
          '10.8.8 Os trabalhadores autorizados a intervir em instalações elétricas devem possuir treinamento específico sobre os riscos decorrentes do emprego da energia elétrica e as principais medidas de prevenção de acidentes em instalações elétricas, de acordo com o estabelecido no Anexo III desta NR. (Alterado pela Portaria MTPS n.º 508, de 29 de abril de 2016)']),
        b: B('10.8.1 a 10.8.3 e 10.10.2 a 10.10.4', 8, [
          '10.8.1 É considerado trabalhador qualificado aquele que comprovar conclusão de curso específico na área elétrica reconhecido pelo Sistema Oficial de Ensino.',
          '10.8.2 É considerado PLH o trabalhador previamente qualificado pelo Sistema Oficial de Ensino em curso específico na área elétrica e com registro no competente conselho de classe.',
          '10.8.3 É considerado trabalhador-capacitado aquele que atenda, simultaneamente, às seguintes condições:',
          'a) receba capacitação sob orientação e responsabilidade de PLH autorizado, com carga horária mínima e conteúdo conforme plano de aprendizagem; e',
          'b) trabalhe sob a responsabilidade de PLH autorizado.',
          '10.10.2 São considerados autorizados os seguintes trabalhadores:',
          'a) profissionais habilitados, qualificados e Trabalhadores-capacitados que realizam serviço nas instalações elétricas;',
          'b) que realizam trabalhos em proximidade nos termos desta NR; e',
          'c) que supervisionam o trabalho referido nas alíneas anteriores.',
          '10.10.2.1 São requisitos para a concessão da autorização por meio de anuência formal da organização:',
          'a) ser previamente apto em exame médico ocupacional, conforme item 10.7.5 desta NR; e',
          'b) ser submetido a treinamento de segurança, com avaliação e aproveitamento satisfatórios, conforme capítulo 10.9 desta NR, independentemente do cargo e escolaridade.',
          '10.10.3 A autorização deve ser consignada nos documentos funcionais do trabalhador.',
          '10.10.4 A organização deve estabelecer sistema de identificação que permita a qualquer tempo conhecer a abrangência da autorização de cada trabalhador.']),
        mudou: 'Qualificado não muda: curso reconhecido, sem registro no conselho. Habilitado (agora "PLH") continua sendo qualificado mais registro no conselho. O capacitado passa a ter plano de aprendizagem e carga horária mínima. A autorização ganha capítulo próprio (10.10) e passa a exigir, por escrito, exame médico apto e treinamento com aproveitamento.' },
      { id: 'trein', titulo: 'Treinamento e reciclagem', a: A('10.8.8.2', 8, [
          '10.8.8.2 Deve ser realizado um treinamento de reciclagem bienal e sempre que ocorrer alguma das situações a seguir:',
          'a) troca de função ou mudança de empresa;',
          'b) retorno de afastamento ao trabalho ou inatividade, por período superior a três meses;',
          'c) modificações significativas nas instalações elétricas ou troca de métodos, processos e organização do trabalho.']),
        b: B('10.9.10 e 10.9.11', 10, [
          '10.9.10 A organização deve realizar treinamento periódico bienal de segurança, definindo conteúdo programático adequado à realidade do trabalho, em especial às características construtivas das instalações elétricas, aos procedimentos de trabalho e às condições impeditivas da organização, obedecendo à carga horária mínima de treinamento de 16 horas.',
          '10.9.11 A organização deve realizar treinamento eventual, independentemente de já ter realizado o treinamento periódico bienal de segurança, nas seguintes situações:',
          'a) após retorno de afastamento ao trabalho ou inatividade, por período superior a 90 (noventa) dias;',
          'b) quando houver modificações significativas nas instalações elétricas ou troca de métodos, processos e organização do trabalho;',
          'c) quando houver mudança nos procedimentos, condições ou operações de trabalho, que impliquem em alteração dos riscos ocupacionais; e',
          'd) após ocorrência de acidente grave ou fatal, que indique a necessidade de novo treinamento.']),
        extra: 'Carga horária mínima em vigor (Anexo III de 2019): curso básico, 40 h; curso complementar do SEP, 40 h. No texto novo, o Quadro I do 10.9.2 lista: Básico 40 h; Complementar do SEP 40 h; Complementar de Média e Alta Tensão (SEC) 16 h; Complementar de Área Classificada 16 h; Específico e pontual 8 h; Específico de compartilhamento de infraestrutura do SEP 40 h.',
        mudou: '"Reciclagem" vira treinamento periódico bienal (mínimo de 16 h) mais treinamento eventual; "três meses" vira "90 dias"; "troca de função ou mudança de empresa" sai da lista e entram mudança de procedimento e acidente grave ou fatal.' },
      { id: 'pie', titulo: 'Prontuário de Instalações Elétricas', a: A('10.2.4, 10.2.5, 10.2.5.1 e 10.2.7', 1, [
          '10.2.4 Os estabelecimentos com carga instalada superior a 75 kW devem constituir e manter o Prontuário de Instalações Elétricas, contendo, além do disposto no subitem 10.2.3, no mínimo:',
          'a) conjunto de procedimentos e instruções técnicas e administrativas de segurança e saúde, implantadas e relacionadas a esta NR e descrição das medidas de controle existentes;',
          'b) documentação das inspeções e medições do sistema de proteção contra descargas atmosféricas e aterramentos elétricos;',
          'c) especificação dos equipamentos de proteção coletiva e individual e o ferramental, aplicáveis conforme determina esta NR;',
          'd) documentação comprobatória da qualificação, habilitação, capacitação, autorização dos trabalhadores e dos treinamentos realizados;',
          'e) resultados dos testes de isolação elétrica realizados em equipamentos de proteção individual e coletiva;',
          'f) certificações dos equipamentos e materiais elétricos em áreas classificadas;',
          'g) relatório técnico das inspeções atualizadas com recomendações, cronogramas de adequações, contemplando as alíneas de "a" a "f".',
          '10.2.5 As empresas que operam em instalações ou equipamentos integrantes do sistema elétrico de potência devem constituir prontuário com o conteúdo do item 10.2.4 e acrescentar ao prontuário os documentos a seguir listados:',
          'a) descrição dos procedimentos para emergências;',
          'b) certificações dos equipamentos de proteção coletiva e individual;',
          '10.2.7 Os documentos técnicos previstos no Prontuário de Instalações Elétricas devem ser elaborados por profissional legalmente habilitado.']),
        b: B('10.15.6, 10.15.6.1 e 10.15.7', 14, [
          '10.15.6 A documentação descrita nos itens 10.15.4 e 10.15.5 deve ser organizada na forma de Prontuário das Instalações Elétricas (PIE), sob responsabilidade de PLH, para as organizações que:',
          'a) integram o SEP; ou',
          'b) realizem atividades em instalações elétricas com média e alta tensão.',
          '10.15.6.1 O PIE deve conter procedimentos de resposta a emergências, considerando, além do disposto na NR-1, as técnicas apropriadas, os equipamentos pessoais e/ou coletivos específicos e o sistema de resgate disponível.',
          '10.15.7 Os documentos técnicos previstos no PIE devem ser elaborados por PLH.']),
        mudou: 'Acaba o critério de 75 kW: o PIE passa a ser obrigatório para quem integra o SEP ou trabalha em média e alta tensão, sob responsabilidade de PLH, e os procedimentos de emergência passam a ser conteúdo obrigatório do PIE.' },
      { id: 'faixas', titulo: 'Faixas de tensão e zonas de risco e controlada', a: A('Glossário 1, 5, 10, 30 e 31', 11, [
          '1. Alta Tensão (AT): tensão superior a 1000 volts em corrente alternada ou 1500 volts em corrente contínua, entre fases ou entre fase e terra.',
          '5. Baixa Tensão (BT): tensão superior a 50 volts em corrente alternada ou 120 volts em corrente contínua e igual ou inferior a 1000 volts em corrente alternada ou 1500 volts em corrente contínua, entre fases ou entre fase e terra.',
          '10. Extra-Baixa Tensão (EBT): tensão não superior a 50 volts em corrente alternada ou 120 volts em corrente contínua, entre fases ou entre fase e terra.',
          '30. Zona de Risco: entorno de parte condutora energizada, não segregada, acessível inclusive acidentalmente, de dimensões estabelecidas de acordo com o nível de tensão, cuja aproximação só é permitida a profissionais autorizados e com a adoção de técnicas e instrumentos apropriados de trabalho.',
          '31. Zona Controlada: entorno de parte condutora energizada, não segregada, acessível, de dimensões estabelecidas de acordo com o nível de tensão, cuja aproximação só é permitida a profissionais autorizados.']),
        b: B('Anexo I (glossário)', 15, [
          'Alta Tensão (AT): tensão superior a 36.200 volts em corrente alternada ou 3000 volts em corrente contínua, entre fases ou fase e terra.',
          'Média Tensão (MT): tensão superior a 1000 Volts em corrente alternada ou 1500 Volts em corrente contínua e igual ou inferior a 36.200 Volts em corrente alternada ou 3000 Volts em corrente contínua.',
          'Zona Controlada (ZC): entorno da zona de risco, não segregada, acessível, de dimensões estabelecidas de acordo com o nível de tensão, cuja aproximação só é permitida a profissionais autorizados.',
          'Zona de Risco (ZR): entorno de parte condutora energizada, não segregada, com risco de choque elétrico, acessível inclusive acidentalmente, de dimensões estabelecidas de acordo com o nível de tensão, cuja aproximação só é permitida a trabalhadores autorizados e com a adoção de técnicas e instrumentos apropriados de trabalho.',
          'Zona Livre (ZL): zona em que os trabalhadores executam atividades, na região limítrofe da zona controlada, porém sem necessidade de invadi-la para realizar serviços.']),
        extra: 'BT e EBT mantêm os mesmos limites nas duas redações (50 V CA / 120 V CC; 1000 V CA / 1500 V CC). Os raios do Anexo II (tabela abaixo) também não mudam.',
        mudou: 'A "alta tensão" de hoje (acima de 1 kV em CA) se divide em MT (acima de 1 kV até 36,2 kV em CA) e AT (acima de 36,2 kV em CA). A zona controlada passa a ser "entorno da zona de risco"; a zona livre ganha definição (em vigor ela não é definida); o Anexo II diz que a tensão considerada é a entre fases.' },
      { id: 'gro', titulo: 'Análise de risco e gerenciamento de riscos', a: A('10.2.1', 1, [
          '10.2.1 Em todas as intervenções em instalações elétricas devem ser adotadas medidas preventivas de controle do risco elétrico e de outros riscos adicionais, mediante técnicas de análise de risco, de forma a garantir a segurança e a saúde no trabalho.']),
        b: B('10.3.1', 2, [
          '10.3.1 No processo de identificação de perigos e avaliação de riscos, a organização deve levar em consideração, além do previsto na NR-1:',
          'a) as características das exposições ocupacionais quanto ao choque elétrico e arco elétrico;',
          'b) os métodos e processos de trabalho;',
          'c) a entrada em operação de novas instalações ou equipamentos elétricos; e',
          'd) as necessidades das medidas de prevenção e controle dos riscos decorrentes da exposição ao choque e/ou arco elétrico.']),
        mudou: 'A NR-10 passa a funcionar dentro do Gerenciamento de Riscos Ocupacionais (GRO) da NR-1, com choque e arco elétrico como perigos nomeados. Entram também o capítulo de grave e iminente risco (10.16) e o Anexo IV (EPI contra arco por categoria).' }
    ],
    /* Anexo II (tabela 1): os raios são os mesmos nas duas redações. Rr = zona de risco; Rc = zona controlada (m). */
    raios: {
      fonte: 'Anexo II, tabela de raios de delimitação (2019, p. 14; Portaria 737, p. 18–19). Mesmos valores nas duas redações; abaixo de 1 kV, Rc = Rr + 0,50 m; de 1 kV a 110 kV, Rc = Rr + 1,00 m; de 110 kV para cima, Rc = Rr + 2,00 m.',
      linhas: [['< 1', '0,20', '0,70'], ['≥ 1 e < 3', '0,22', '1,22'], ['≥ 3 e < 6', '0,25', '1,25'], ['≥ 6 e < 10', '0,35', '1,35'], ['≥ 10 e < 15', '0,38', '1,38'], ['≥ 15 e < 20', '0,40', '1,40'], ['≥ 20 e < 30', '0,56', '1,56'], ['≥ 30 e < 36', '0,58', '1,58'], ['≥ 70 e < 110', '1,00', '2,00'], ['≥ 110 e < 132', '1,10', '3,10'], ['≥ 480 e < 700', '5,20', '7,20']]
    },
    /* Pegadinhas da apostila do estudante (fontes/apostila-completa.md, seção 10.4): o que ela diz e o que a norma diz. */
    pegadinhas: [
      ['Qualificado × habilitado', 'A apostila diz que o qualificado tem "registro no conselho de classe".', 'O qualificado só precisa do curso reconhecido. O registro no conselho define o legalmente habilitado (qualificado mais registro). Igual nas duas redações (10.8.1 e 10.8.2).'],
      ['Ordem de prioridade das medidas', 'A apostila lista 9 medidas numeradas (desenergização, tensão de segurança, barreiras, bloqueios…).', 'Em vigor, só dois degraus têm ordem: a desenergização e, na impossibilidade dela, a tensão de segurança (10.2.8.2). O resto é lista de exemplos, "tais como", sem ordem (10.2.8.2.1).'],
      ['Reenergização', 'A apostila diz que a reenergização é a ordem inversa da desenergização.', 'Não é. A inversa começaria removendo a sinalização; a norma começa retirando ferramentas e pessoas e só remove a sinalização no 4º passo (10.5.2 em vigor). Os 5 passos que a apostila lista estão certos para o texto em vigor.'],
      ['Zona controlada e zona livre', 'A apostila diz "zona controlada: entorno da zona de risco" e "zona livre: sem restrição".', '"Entorno da zona de risco" é a redação de 2027. Em vigor: "entorno de parte condutora energizada, não segregada, acessível" (glossário 31). A zona livre só é definida na norma nova.'],
      ['75 kW e reciclagem bienal', 'A apostila trata o prontuário a partir de 75 kW e a reciclagem bienal como regras sem data.', 'Valem para o texto em vigor (10.2.4 e 10.8.8.2). A partir de 01/06/2027 não há mais o critério de 75 kW (PIE para SEP ou média e alta tensão) e a reciclagem vira periódico bienal de 16 h mais eventual. Ensine o número com a data.'],
      ['Desligada, mas pode ser energizada', 'A apostila liga "instalação desligada que pode ser energizada" à impossibilidade de aterrar.', 'O que manda tratar como serviço em instalação energizada é a possibilidade de energização, por qualquer meio ou razão (10.5.4 em vigor; 10.5.2 na nova), e não a falta de aterramento.']
    ],
    /* Sequências do jogo "Ordene a NR-10": texto em vigor (2019), uma linha por alínea, na ordem da norma. */
    seq: {
      des: { ref: '10.5.1 a–f', titulo: 'Desenergização (NR-10, 10.5.1)', passos: [
        'seccionamento',
        'impedimento de reenergização',
        'constatação da ausência de tensão',
        'instalação de aterramento temporário com equipotencialização dos condutores dos circuitos',
        'proteção dos elementos energizados existentes na zona controlada (Anexo II)',
        'instalação da sinalização de impedimento de reenergização'] },
      reen: { ref: '10.5.2 a–e', titulo: 'Reenergização (NR-10, 10.5.2)', passos: [
        'retirada das ferramentas, utensílios e equipamentos',
        'retirada da zona controlada de todos os trabalhadores não envolvidos no processo de reenergização',
        'remoção do aterramento temporário, da equipotencialização e das proteções adicionais',
        'remoção da sinalização de impedimento de reenergização',
        'destravamento, se houver, e religação dos dispositivos de seccionamento'] }
    }
  };
})(window.DATA);

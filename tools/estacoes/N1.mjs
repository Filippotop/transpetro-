/* Estação N1: segurança, NR-10 e manutenção (itens 6.1 a 6.3 e 10.2 a 10.4 do Anexo IV).
   Aprofundamento escrito para o app (fontes/seguranca-nr10-manutencao.html), no formato das apostilas do estudante; aqui
   ficam os metadados, o resumo, os cartões, o V ou F e as contas. As questões da aba Questões são os exercícios do fim
   de cada seção mais as de tools/banco/N1.mjs (extra), com a explicação de cada alternativa. O texto da NR-10 é o de
   fontes/nr10-2019-x-2026.md (em vigor até 31/05/2027); o de 2027 aparece só nos quadros "O que muda em 2027".
   Gerar: node tools/estacao.mjs fontes/seguranca-nr10-manutencao.html N1 */
export default {
  fonte: 'fontes/seguranca-nr10-manutencao.html',
  meta: {
    id: 'N1', vol: 'EL', line: 'N',
    title: 'Segurança, NR-10 e manutenção',
    itens: '6, 10.2–10.4', faixa: 'B', peso2023: 5,
    note: 'Em 2023 caíram perigo × risco (39), proteção coletiva na NR-10 (41), o Prontuário acima de 75 kW, escrito "75 kVA" no enunciado (44) e a isolação de cabo (47). O peso 5 inclui a 55, de NBR 5410, ensinada na I1.',
  },
  renomear: { fontes: 'Fontes' },
  labs: {},
  trocas: [],
  resumo: [
    ['Perigo e risco', 'Perigo é a fonte; risco combina probabilidade e severidade. A eletricidade é risco de acidentes.'],
    ['Choque e socorro', 'Quem fere é a corrente: I = U/R<sub>c</sub>. No socorro, primeiro desligue a fonte.'],
    ['Coletiva antes da individual', 'NR-10: proteção coletiva primeiro, e nela a desenergização; EPI se ela for inviável ou insuficiente.'],
    ['Manutenção', 'Preventiva segue o calendário; preditiva, a condição medida. D = MTBF/(MTBF + MTTR).'],
    ['Quem trabalha', 'Qualificado: curso. Habilitado: curso e conselho. Capacitado: sob habilitado. Autorizado: anuência.'],
    ['Desenergizar', 'Seccionar, impedir, constatar, aterrar, proteger, sinalizar. Prontuário: acima de 75 kW.'],
  ],
  cards: [
    ['Qual a diferença entre perigo e risco?', 'Perigo é a fonte ou situação com potencial de causar lesão (o barramento energizado). Risco é a combinação da probabilidade com a severidade da lesão.'],
    ['Qual a ordem de prioridade das medidas de prevenção da NR-1?', 'Eliminação do fator de risco; proteção coletiva; medidas administrativas ou de organização do trabalho; proteção individual.'],
    ['Em que grupo de riscos ambientais está a eletricidade?', 'No grupo 5, de acidentes (cor azul), junto com máquinas sem proteção e risco de incêndio ou explosão.'],
    ['Um contato entre duas fases de 220 V, com 2.000 Ω no percurso do corpo: que corrente?', 'I = 220/2.000 = 0,11 A = 110 mA. Quem fere é a corrente, que depende da tensão e da resistência do percurso.'],
    ['Qual o efeito do choque considerado a principal causa de morte?', 'A fibrilação ventricular: o coração perde o ritmo e não bombeia sangue. Só o desfibrilador a reverte.'],
    ['Alguém está preso a uma parte viva. Qual a primeira ação do socorro?', 'Desligar a fonte (ou, em baixa tensão, afastar a vítima com material isolante e seco). Tocar nela faz do socorrista a segunda vítima.'],
    ['Pela NR-10, quando entra o EPI?', 'Quando as medidas de proteção coletiva forem tecnicamente inviáveis ou insuficientes (10.2.9.1). A prioridade é da coletiva: primeiro a desenergização, depois a tensão de segurança.'],
    ['Barreira ou obstáculo: qual impede qualquer contato com a parte energizada?', 'A barreira. O obstáculo só impede o contato acidental, e não o contato deliberado.'],
    ['Qual a menor classe de luva isolante para 13,8 kV? E para 34,5 kV?', 'Classe 2 (até 17.000 V) e classe 4 (até 36.000 V). A classe 1 vai só até 7.500 V e a 3, até 26.500 V.'],
    ['Que temperatura de serviço têm o PVC e o XLPE no condutor?', 'PVC (termoplástico): 70 °C. EPR, HEPR e XLPE (termofixos): 90 °C, por isso conduzem mais corrente.'],
    ['Quem precisa de Prontuário de Instalações Elétricas? E de esquema unifilar?', 'Prontuário: estabelecimentos com carga instalada superior a 75 kW (10.2.4). Esquemas unifilares atualizados: todas as empresas (10.2.3).'],
    ['Qualificado, habilitado, capacitado e autorizado: o que cada um exige?', 'Qualificado: curso reconhecido. Habilitado: qualificado e registro no conselho. Capacitado: capacitação e trabalho sob responsabilidade de um habilitado e autorizado. Autorizado: anuência formal da empresa.'],
    ['Qual a periodicidade da reciclagem e os cursos de 40 h da NR-10 em vigor?', 'Reciclagem bienal, e também no retorno de afastamento superior a três meses. O curso básico e o do SEP têm 40 h cada.'],
    ['Quais os seis passos da desenergização (10.5.1)?', 'Seccionamento, impedimento de reenergização, constatação da ausência de tensão, aterramento temporário, proteção dos elementos energizados na zona controlada e sinalização.'],
    ['A reenergização é a ordem inversa da desenergização?', 'Não. São cinco passos: retirar ferramentas; retirar da zona controlada quem não participa; remover aterramento e proteções; remover a sinalização; destravar e religar.'],
    ['Num barramento de 13,8 kV, quais os raios da zona de risco e da controlada?', 'R<sub>r</sub> = 0,38 m e R<sub>c</sub> = 1,38 m (R<sub>c</sub> = R<sub>r</sub> + 1,00 m). Entre os dois raios, a zona é controlada.'],
    ['Como separar as manutenções preventiva, preditiva e detectiva?', 'Preventiva: intervalos predeterminados. Preditiva: condição medida (termografia, vibração, óleo). Detectiva: testa proteções para achar falhas ocultas.'],
    ['MTBF de 480 h e MTTR de 20 h: qual a disponibilidade?', 'D = 480/(480 + 20) = 0,96 = 96%. No denominador vai a soma MTBF + MTTR.'],
  ],
  vf: [
    ['Perigo é a combinação da probabilidade de uma lesão com a sua severidade.', false, 'Essa é a definição de <b>risco</b>. Perigo é a fonte ou situação com potencial de causar lesão.'],
    ['Na classificação dos riscos ambientais, a eletricidade pertence ao grupo dos riscos de acidentes.', true, 'Grupo 5, de acidentes (azul), junto com máquinas sem proteção e probabilidade de incêndio ou explosão.'],
    ['O dano do choque elétrico depende só da tensão, qualquer que seja a resistência do percurso da corrente.', false, 'O dano vem da <b>corrente</b>, que depende da tensão <b>e</b> da resistência do percurso (I = U/R).'],
    ['A luva de cobertura de couro, usada sozinha, isola o eletricista de uma parte viva.', false, 'A luva de cobertura só protege a luva isolante de borracha contra cortes e furos; <b>sozinha, não isola</b>.'],
    ['Pela NR-10 em vigor, as medidas de proteção coletiva compreendem, prioritariamente, a desenergização elétrica.', true, 'Item 10.2.8.2; na impossibilidade dela, usa-se a tensão de segurança.'],
    ['O obstáculo impede qualquer contato com as partes energizadas, inclusive o contato deliberado.', false, 'Quem impede qualquer contato é a <b>barreira</b>; o obstáculo só impede o contato acidental.'],
    ['Para ser trabalhador qualificado, a NR-10 exige curso reconhecido e registro no conselho de classe.', false, 'O qualificado só precisa do curso. O registro no conselho é o que faz dele <b>legalmente habilitado</b> (10.8.1 e 10.8.2).'],
    ['O Prontuário de Instalações Elétricas é exigido dos estabelecimentos com carga instalada superior a 75 kW.', true, 'Item 10.2.4: o critério da norma é a carga instalada em kW, e não a demanda (a questão 44 de 2023 escreveu kVA e manteve o Prontuário).'],
    ['A reciclagem dos trabalhadores autorizados é anual, pela NR-10 em vigor.', false, 'É <b>bienal</b> (a cada dois anos), e também no retorno de afastamento superior a três meses (10.8.8.2).'],
    ['A manutenção preditiva intervém em intervalos fixos de tempo, qualquer que seja a condição do equipamento.', false, 'Isso é a <b>preventiva</b>. A preditiva acompanha a condição por medições (termografia, vibração, óleo).'],
    ['A disponibilidade de um equipamento reparável é D = MTBF/(MTBF + MTTR).', true, 'É a fração do tempo em que o equipamento está apto a operar; MTBF/MTTR sem a soma no denominador está errado.'],
    ['Na sequência de desenergização do item 10.5.1, o impedimento de reenergização vem antes da constatação da ausência de tensão.', true, 'No texto em vigor: seccionamento, impedimento, constatação, aterramento, proteção e sinalização. A nova NR-10, de 2027, é que inverte esses dois passos.'],
    ['A reenergização da instalação segue a ordem inversa da desenergização.', false, 'Não: começa pela retirada das ferramentas e das pessoas, e só depois remove aterramento, sinalização e religa o seccionamento.'],
    ['As ferramentas isoladas destinam-se a até 1.000 V em corrente alternada e 1.500 V em corrente contínua.', true, 'São marcadas com 1.000 V e ensaiadas com 10.000 V; ferramenta de cabo plastificado não é ferramenta isolada.'],
  ],
  contas: [
    /* seção 2 */
    ['220/2000*1000', '110 mA', 'Exemplo resolvido 1'], ['48/2000*1000', '24 mA', 'Exemplo resolvido 1'],
    /* seção 4 */
    ['5500/220', '25 A', 'Exemplo resolvido 3'], ['4400+3900+3700', '12.000 VA', 'Exemplo resolvido 3'],
    ['12000/(Math.sqrt(3)*220)', '31,5 A', 'Exemplo resolvido 3'], ['4400-3700', '700 VA', 'Exemplo resolvido 3'],
    /* seção 5 */
    ['4+6+8', '18 h', 'Exemplo resolvido 4'], ['720-18', '702 h', 'Exemplo resolvido 4'], ['702/3', '234 h', 'Exemplo resolvido 4'],
    ['18/3', '6 h', 'Exemplo resolvido 4'], ['234/240*100', '97,5%', 'Exemplo resolvido 4'], ['(1-0.975)*100', '2,5%', 'Exemplo resolvido 4'],
    ['234/237*100', '98,7%', 'Exemplo resolvido 5'], ['0.987*0.96*100', '94,8%', 'Exemplo resolvido 5'],
    ['1/2000', '0,0005 falha', 'Exemplo resolvido 6'], ['Math.exp(-0.25)*100', '77,9%', 'Exemplo resolvido 6'], ['Math.exp(-1)*100', '36,8%', 'Exemplo resolvido 6'],
    /* seção 6 */
    ['0.0172*100/10', '0,172 Ω', 'Exemplo resolvido 7'], ['0.0282*100/10', '0,282 Ω', 'Exemplo resolvido 7'], ['10*0.0282/0.0172', '16,4 mm²', 'Exemplo resolvido 7'],
    /* seção 8 */
    ['0.38+1.00', '1,38 m', 'Exemplo resolvido 9'], ['0.20+0.50', '0,70 m', 'Exemplo resolvido 9'],
    /* exercícios */
    ['220/2500*1000', '88 mA', 'Exercícios de fixação'], ['127/2500*1000', '50,8 mA', 'Exercícios de fixação'], ['2500/220', '11,4', 'Exercícios de fixação'],
    ['6600/220', '30 A', 'Exercícios de fixação'], ['6600/(Math.sqrt(3)*220)', '17,3 A', 'Exercícios de fixação'], ['6600/127', '52 A', 'Exercícios de fixação'],
    ['480/500*100', '96,0%', 'Exercícios de fixação'], ['20/500*100', '4,0%', 'Exercícios de fixação'], ['480/520*100', '92,3%', 'Exercícios de fixação'],
    ['500/480*100', '104,2%', 'Exercícios de fixação'], ['480/20*100', '2.400%', 'Exercícios de fixação'],
    ['(1000-40)/4', '240 h', 'Exercícios de fixação'], ['40/4', '10 h', 'Exercícios de fixação'], ['1000/4', '250 h', 'Exercícios de fixação'],
    ['25/0.61', '41,0 mm²', 'Exercícios de fixação'], ['25*0.61', '15,3 mm²', 'Exercícios de fixação'], ['25/0.39', '64,1 mm²', 'Exercícios de fixação'], ['25/0.61**2', '67,2 mm²', 'Exercícios de fixação'],
    ['0.35+1.00', '1,35 m', 'Exercícios de fixação'],
  ],
};

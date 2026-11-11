/* Revisão das questões da estação N1 (segurança, NR-10 e manutenção), escrita para o app: não vem do banco do estudante.
   q: os exercícios do fim de cada seção da Teoria (QUIZ de fontes/seguranca-nr10-manutencao.html), pela chave "bN:i";
   extra: questões só da aba Questões. Formato de w, d, h e conta: o do comentário de tools/banco.mjs.
   Cada alternativa errada diz qual erro leva a ela. A NR-10 é a em vigor até 31/05/2027 (fontes/nr10-2019-x-2026.md). */
export default {
  /* item do edital de cada seção da estação */
  secoes: { b1: '6.1', b2: '6.1', b3: '6.2', b4: '6.3', b5: '10.2', b6: '10.3', b7: '10.4', b8: '10.4' },
  q: {
    /* ---------- seção 1: perigo, risco e acidente ---------- */
    'b1:0': { d: 'm', w: {
      A: '[conceitoSST] A porta fechada reduz a probabilidade, e portanto o risco, mas o perigo (o barramento energizado) continua existindo.',
      B: '[conceitoSST] Trocou as definições: o barramento energizado é o perigo, e o risco é a combinação de probabilidade e severidade.',
      D: '[conceitoSST] Os termos não são sinônimos: perigo é a fonte; risco é a medida.',
      E: '[conceitoSST] O risco depende também das barreiras e de quem tem acesso, que mudam a probabilidade da lesão.' } },
    'b1:1': { d: 'f', w: {
      B: '[conceitoSST] Os riscos físicos são formas de energia como ruído, calor, vibração e radiações; o choque é um risco de acidentes.',
      C: '[conceitoSST] Os riscos químicos são poeiras, fumos, gases e vapores.',
      D: '[conceitoSST] Os riscos ergonômicos são esforço, postura e ritmo de trabalho.',
      E: '[conceitoSST] Os riscos biológicos são vírus, bactérias, fungos e parasitas.' } },
    'b1:2': { d: 'm', w: {
      A: '[ordem] Começar pelo EPI inverte a ordem da NR-1: o EPI é o último recurso.',
      B: '[ordem] Pôs a barreira (coletiva) antes da desenergização, que é a eliminação do fator de risco.',
      C: '[ordem] Pôs o treinamento (administrativa) antes da barreira, que é proteção coletiva.',
      D: '[ordem] Pôs a medida administrativa na frente de todas, inclusive da eliminação.' } },
    'b1:3': { d: 'f', w: {
      A: '[conceitoSST] Para a lei, a doença do trabalho, adquirida em função das condições em que o trabalho é realizado, é equiparada ao acidente; não é preciso um evento súbito.',
      C: '[conceitoSST] Incidente é o evento sem lesão; aqui há perda auditiva, ou seja, lesão.',
      D: '[conceitoSST] Acidente de trajeto é o ocorrido no percurso entre a residência e o trabalho.',
      E: '[conceitoSST] A lei inclui também a redução, permanente ou temporária, da capacidade para o trabalho, e não só a morte.' } },
    /* ---------- seção 2: choque, arco e primeiros socorros ---------- */
    'b2:0': { d: 'm', conta: '220/2500*1000', w: {
      A: '[unidade] 0,088 mA é o resultado em ampères lido como se fosse em miliampères.',
      B: '[invertida] 11,4 vem da divisão invertida: 2.500/220.',
      C: '[linhaFase] 50,8 mA usa a tensão entre fase e neutro (127/2.500), mas o contato é entre duas fases.',
      E: '[invertida] 550 multiplica 220 por 2,5 em vez de dividir.' } },
    'b2:1': { d: 'f', w: {
      A: '[efeitoChoque] A tetanização é a contração dos músculos, que impede de largar o condutor.',
      C: '[efeitoChoque] A queimadura é o efeito térmico (efeito Joule) da corrente.',
      D: '[efeitoChoque] A percepção é o formigamento das correntes pequenas.',
      E: '[efeitoChoque] A parada respiratória é a contração dos músculos do tórax; é socorrida com respiração artificial, e não é a perda de ritmo do coração.' } },
    'b2:2': { d: 'f', w: {
      B: '[condutaSeg] Puxar a vítima ainda em contato com a parte viva faz do socorrista a segunda vítima.',
      C: '[condutaSeg] Iniciar as compressões com o circuito ligado expõe o socorrista ao choque; primeiro vem a segurança de quem socorre.',
      D: '[condutaSeg] A água conduz corrente e piora a situação.',
      E: '[condutaSeg] Esperar sem interromper a corrente deixa o choque continuar.' } },
    'b2:3': { d: 'm', w: {
      A: '[efeitoChoque] O arco também ocorre em baixa tensão, principalmente em painéis com corrente de curto-circuito elevada.',
      B: '[efeitoChoque] A passagem da corrente pelo corpo é o choque, e não o arco.',
      C: '[epcEpi] A luva isolante protege do choque, e não do calor do arco; contra o arco usam-se desenergização, distância e vestimenta própria.',
      D: '[efeitoChoque] O DR atua pela corrente de fuga à terra; não limita a energia de um arco entre fases.' } },
    /* ---------- seção 3: proteção coletiva e individual ---------- */
    'b3:0': { d: 'f', w: {
      B: '[epcEpi] A prioridade é da proteção coletiva (10.2.8.1), e o EPI não vem antes dela.',
      C: '[exagero] A regra vale para qualquer instalação com perigo elétrico, e não só para a alta tensão.',
      D: '[epcEpi] A habilitação do trabalhador não dispensa a desenergização, que é a primeira medida coletiva.',
      E: '[detalhe] O fornecimento do EPI adequado ao risco é obrigação da organização e não depende de pedido do trabalhador.' } },
    'b3:1': { d: 'm', w: {
      A: '[valorNorma] A classe 00 vai só até 500 V.',
      B: '[valorNorma] A classe 0 vai até 1.000 V; é de baixa tensão.',
      C: '[valorNorma] A classe 1 vai até 7.500 V, abaixo de 13.800 V.',
      E: '[epcEpi] A luva de cobertura de couro só protege a borracha contra cortes e furos; sozinha, não isola.' } },
    'b3:2': { d: 'f', w: {
      A: '[conceitoSST] A barreira impede qualquer contato com as partes energizadas.',
      B: '[conceitoSST] O invólucro é o envoltório das partes energizadas, que impede o contato com as partes internas.',
      D: '[conceitoSST] O isolamento elétrico impede a passagem de corrente por interposição de materiais isolantes.',
      E: '[conceitoSST] O travamento mantém por meios mecânicos um dispositivo de manobra fixo numa posição.' } },
    'b3:3': { d: 'm', w: {
      A: '[textoNr10] A norma manda contemplar a condutibilidade, a inflamabilidade e as influências eletromagnéticas, as três.',
      B: '[textoNr10] A vedação aos adornos pessoais não abre exceção para os não metálicos.',
      C: '[epcEpi] A vestimenta é proteção individual, que só entra quando a coletiva é inviável ou insuficiente.',
      D: '[textoNr10] A palavra do item 10.2.9.2 é eletromagnéticas, e não eletrostáticas.' } },
    /* ---------- seção 4: projetos elétricos ---------- */
    'b4:0': { d: 'm', h: '10.4', w: {
      A: '[textoNr10] O Prontuário completo só é exigido acima de 75 kW de carga instalada; com 40 kW a empresa não precisa dele.',
      C: '[textoNr10] A norma não pede diagramas trifilares de todos os circuitos, nem assinados pelos trabalhadores.',
      D: '[textoNr10] Notas fiscais não são documentação técnica da instalação.',
      E: '[textoNr10] O limite de 75 kW libera do Prontuário, mas não do esquema unifilar, exigido de todas as empresas.' } },
    'b4:1': { d: 'f', w: {
      A: '[quemNr10] O qualificado tem o curso, mas pode não ter o registro no conselho de classe.',
      B: '[quemNr10] O capacitado trabalha sob a responsabilidade de um habilitado e autorizado.',
      C: '[quemNr10] A autorização é a anuência da empresa para intervir nas instalações e não dá atribuição de projeto.',
      D: '[quemNr10] Pessoa advertida é quem tem conhecimento suficiente para evitar os perigos da eletricidade.' } },
    'b4:2': { d: 'm', conta: '6600/220', w: {
      A: '[invertida] 0,033 inverte a divisão: 220/6.600.',
      B: '[formula] 15 A divide a corrente pelos dois condutores do circuito.',
      C: '[raiz3Mono] 17,3 A aplica o √3 de circuito trifásico a um circuito bifásico.',
      E: '[outraTensao] 52 A usa 127 V no lugar de 220 V.' } },
    'b4:3': { d: 'm', w: {
      B: '[textoNr10] Circuitos de finalidades diferentes devem ser identificados e instalados separadamente (10.3.3.1).',
      C: '[textoNr10] Os dispositivos de desligamento devem ter recursos para impedimento de reenergização (10.3.1).',
      D: '[textoNr10] A indicação é verde para desligado (D) e vermelho para ligado (L); a alternativa inverte as cores.',
      E: '[textoNr10] O projeto deve ficar à disposição dos trabalhadores autorizados e ser mantido atualizado (10.3.7).' } },
    /* ---------- seção 5: manutenção ---------- */
    'b5:0': { d: 'f', w: {
      A: '[tipoManut] Intervir depois da falha é a manutenção corretiva.',
      B: '[tipoManut] Os intervalos predeterminados são da manutenção preventiva.',
      C: '[tipoManut] Trocar em intervalos fixos, sem olhar a condição, também é preventiva.',
      D: '[tipoManut] A detectiva existe porque as falhas ocultas não aparecem na operação normal: é preciso testar a proteção.' } },
    'b5:1': { d: 'm', conta: '480/500*100', w: {
      A: '[outra] 4,0% é a indisponibilidade (20/500).',
      B: '[mtbf] 92,3% é 480/520: somou o MTTR duas vezes no denominador.',
      D: '[invertida] 104,2% inverte a fração (500/480); disponibilidade não passa de 100%.',
      E: '[mtbf] 2.400% é MTBF/MTTR (480/20 = 24).' } },
    'b5:2': { d: 'm', conta: ['(1000-40)/4', '40/4'], w: {
      A: '[mtbf] 250 h divide as 1.000 h de calendário por 4, sem descontar o tempo parado.',
      C: '[mtbf] 40 h é o tempo total de reparo, e não o tempo médio por falha.',
      D: '[mtbf] 960 h é o tempo total em operação, sem dividir pelo número de falhas.',
      E: '[invertida] Trocou os dois indicadores: o MTBF é o tempo em operação por falha, e o MTTR, o de reparo.' } },
    'b5:3': { d: 'm', w: {
      A: '[tipoManut] Não há falha a corrigir nos testes; a corretiva não planejada vem depois de uma falha de surpresa.',
      B: '[tipoManut] A preditiva acompanha um parâmetro de condição (temperatura, vibração) em equipamento que está operando.',
      C: '[tipoManut] A troca programada de componentes é preventiva, feita por tempo e sem teste de funcionamento.',
      E: '[tipoManut] A corretiva planejada corrige uma falha ou desempenho baixo já conhecido, e não procura falhas ocultas.' } },
    /* ---------- seção 6: materiais, ferramentas e instrumentos ---------- */
    'b6:0': { d: 'm', conta: '25/0.61', w: {
      A: '[invertida] 15,3 mm² multiplica por 0,61 em vez de dividir.',
      B: '[formula] 25,0 mm² ignora a diferença de condutividade entre os materiais.',
      D: '[formula] 64,1 mm² divide por 0,39 (1 − 0,61).',
      E: '[formula] 67,2 mm² divide por 0,61 ao quadrado.' } },
    'b6:1': { d: 'm', w: {
      B: '[isolCabo] Inverteu as temperaturas: é o HEPR que admite 90 °C, e o PVC admite 70 °C.',
      C: '[isolCabo] Os dois não admitem a mesma temperatura; o HEPR admite 20 °C a mais e por isso conduz mais corrente.',
      D: '[isolCabo] O PVC é termoplástico, e o HEPR é termofixo.',
      E: '[isolCabo] Inverteu os limites de curto-circuito: o PVC admite 160 °C, e o HEPR, 250 °C.' } },
    'b6:2': { d: 'm', w: {
      A: '[condutaSeg] Cabo plastificado não é isolamento ensaiado; só a ferramenta isolada, marcada com 1.000 V, serve ao trabalho energizado.',
      B: '[condutaSeg] A ferramenta isolada não muda a prioridade da desenergização; é o recurso para quando o trabalho energizado é inevitável.',
      C: '[valorNorma] Trocou os limites: são 1.000 V em corrente alternada e 1.500 V em corrente contínua.',
      E: '[condutaSeg] Toda ferramenta isolada é inspecionada antes do uso, porque um corte no isolamento a inutiliza.' } },
    'b6:3': { d: 'm', h: '10.4', w: {
      A: '[condutaSeg] Medir uma fase só deixa as outras sem verificação, e o detector não foi testado antes nem depois.',
      C: '[condutaSeg] A posição da chave e a lâmpada apagada não provam a ausência de tensão.',
      D: '[condutaSeg] A escala de resistência não detecta tensão, e danifica o instrumento se o circuito estiver vivo.',
      E: '[condutaSeg] O contato com a mão é exatamente o acidente que o procedimento quer evitar.' } },
    /* ---------- seção 7: NR-10, medidas de controle e trabalhadores ---------- */
    'b7:0': { d: 'm', w: {
      A: '[quemNr10] Para ser legalmente habilitado falta o registro no conselho de classe (10.8.2).',
      B: '[quemNr10] O capacitado é capacitado por um habilitado e autorizado, sob cuja responsabilidade trabalha; o trabalhador do enunciado tem curso reconhecido, logo é qualificado, e não capacitado.',
      C: '[quemNr10] Para ser autorizado falta a anuência formal da empresa (10.8.4).',
      E: '[quemNr10] Quem tem formação na área elétrica não é pessoa não advertida.' } },
    'b7:1': { d: 'm', w: {
      A: '[textoNr10] O Prontuário é exigido dos estabelecimentos com carga instalada superior a 75 kW, e não de todos.',
      B: '[textoNr10] O critério é a carga instalada, e não a demanda contratada.',
      C: '[textoNr10] Quem o organiza e mantém atualizado é o empregador ou pessoa formalmente designada.',
      D: '[textoNr10] Os documentos técnicos do Prontuário são elaborados por profissional legalmente habilitado (10.2.7).' } },
    'b7:2': { d: 'm', w: {
      B: '[valorNorma] A reciclagem é bienal, e não anual.',
      C: '[textoNr10] A reciclagem também ocorre fora do intervalo de dois anos: troca de função, afastamento, mudanças nas instalações.',
      D: '[valorNorma] Não existe prazo de cinco anos; o intervalo é de dois anos.',
      E: '[valorNorma] O afastamento que exige reciclagem é o superior a três meses, e não a trinta dias.' } },
    'b7:3': { d: 'm', w: {
      A: '[quemNr10] Qualificado é quem tem curso reconhecido pelo Sistema Oficial de Ensino, e não o treinamento interno.',
      B: '[quemNr10] O capacitado trabalha sempre sob a responsabilidade de profissional habilitado e autorizado.',
      D: '[quemNr10] A capacitação não se transfere para outra empresa.',
      E: '[quemNr10] A autorização exige a anuência formal da empresa (10.8.4); a capacitação não a dispensa.' } },
    /* ---------- seção 8: desenergização, zonas e trabalho energizado ---------- */
    'b8:0': { d: 'm', w: {
      A: '[ordem] O impedimento de reenergização vem antes da constatação da ausência de tensão; é a nova NR-10 que põe a constatação antes do impedimento.',
      C: '[ordem] A proteção dos elementos energizados na zona controlada é o quinto passo.',
      D: '[ordem] A sinalização de impedimento de reenergização é o último passo.',
      E: '[ordem] O seccionamento é o primeiro passo.' } },
    'b8:1': { d: 'm', w: {
      A: '[zonaNr10] Confundiu R<sub>c</sub> com o limite da zona de risco, que termina em R<sub>r</sub> = 0,35 m.',
      B: '[zonaNr10] A zona livre só começa além de R<sub>c</sub> = 1,35 m.',
      D: '[zonaNr10] A zona de risco termina em R<sub>r</sub>, e não em R<sub>c</sub>.',
      E: '[zonaNr10] Toda tensão tem zonas definidas na tabela do Anexo II; 6,6 kV está na faixa de 6 a menos de 10 kV.' } },
    'b8:2': { d: 'm', w: {
      A: '[ordem] A remoção do aterramento é o terceiro passo, depois da retirada das pessoas.',
      B: '[ordem] A remoção da sinalização é o quarto passo.',
      C: '[ordem] O destravamento e a religação são o último passo.',
      E: '[ordem] A constatação da ausência de tensão não faz parte da sequência de reenergização do item 10.5.2.' } },
    'b8:3': { d: 'm', w: {
      B: '[textoNr10] Os serviços energizados em AT e no SEP não podem ser realizados individualmente (10.7.3).',
      C: '[textoNr10] Exigem ordem de serviço específica para data e local, assinada por superior responsável, e não ordem verbal (10.7.4).',
      D: '[textoNr10] Só podem ser feitos com procedimentos específicos, detalhados e assinados por profissional autorizado (10.7.6).',
      E: '[textoNr10] Deixar o religamento automático ativo é o contrário do que o item 10.7.7 exige.' } },
  },
  extra: [
    { id: 'x1', h: '10.2', tag: 'Manutenção: tipos, técnicas e indicadores', d: 'm', conta: '(1200-60)/5',
      s: 'Num período de 1.200 h de calendário, uma bomba falhou 5 vezes e ficou 60 h parada para reparo. O tempo médio entre falhas (MTBF) da bomba no período foi de',
      o: ['240 h', '228 h', '12 h', '1.140 h', '19 h'], a: 1,
      c: 'Tempo em operação: 1.200 − 60 = 1.140 h. MTBF = 1.140/5 = 228 h.',
      w: { A: '[mtbf] 240 h divide as 1.200 h de calendário por 5, sem descontar o tempo parado.',
        C: '[mtbf] 12 h é o MTTR (60/5), e não o MTBF.',
        D: '[mtbf] 1.140 h é o tempo total em operação, sem dividir pelo número de falhas.',
        E: '[invertida] 19 h divide o tempo em operação pelo tempo de reparo (1.140/60).' } },
    { id: 'x2', h: '6.1', tag: 'Choque elétrico, arco elétrico e primeiros socorros', d: 'f', conta: '220/4400*1000',
      s: 'Um trabalhador toca uma parte viva com 220 V em relação à terra. Considerando a resistência do percurso da corrente pelo corpo igual a 4,4 kΩ, a corrente no corpo é de, aproximadamente,',
      o: ['0,05 mA', '20 mA', '50 mA', '86 mA', '968 mA'], a: 2,
      c: 'I = U/R = 220/4.400 = 0,05 A = 50 mA.',
      w: { A: '[unidade] 0,05 mA é o resultado em ampères lido como se fosse em miliampères.',
        B: '[invertida] 20 mA vem da divisão invertida: 4.400/220.',
        D: '[outraTensao] 86 mA usa 380 V no lugar de 220 V.',
        E: '[invertida] 968 mA multiplica 220 por 4,4 em vez de dividir.' } },
    { id: 'x3', h: '10.3', tag: 'Materiais, ferramentas e instrumentos de teste', d: 'm', conta: '0.0172*50/16',
      s: 'Um condutor de cobre (resistividade de 0,0172 Ω·mm²/m) tem 50 m de comprimento e 16 mm² de seção. A resistência elétrica desse condutor é de, aproximadamente,',
      o: ['0,0055 Ω', '0,088 Ω', '0,86 Ω', '13,8 Ω', '0,054 Ω'], a: 4,
      c: 'R = ρ·L/S = 0,0172 × 50/16 ≈ 0,054 Ω.',
      w: { A: '[invertida] 0,0055 Ω inverte a razão: 0,0172 × 16/50.',
        B: '[formula] 0,088 Ω usa a resistividade do alumínio (0,0282), e não a do cobre.',
        C: '[semFator] 0,86 Ω esquece de dividir pela seção (0,0172 × 50).',
        D: '[invertida] 13,8 Ω multiplica pela seção, em vez de dividir (0,0172 × 50 × 16).' } },
  ],
};

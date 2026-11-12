/* Estação P1: Língua Portuguesa (itens Port 1 a 8 do edital).
   Aprofundamento escrito para o app (fontes/lingua-portuguesa.html), no formato das apostilas do estudante; aqui ficam os
   metadados, o resumo, os cartões e o V ou F. As questões da aba Questões são os exercícios do fim de cada seção, com a explicação
   de cada alternativa em tools/banco/P1.mjs. Português não tem contas: `contas` fica vazio.
   Gerar: node tools/estacao.mjs fontes/lingua-portuguesa.html P1 */

export default {
  fonte: 'fontes/lingua-portuguesa.html',
  meta: {
    id: 'P1', vol: 'PT', line: 'P',
    title: 'Língua Portuguesa',
    itens: 'Port 1-8', faixa: 'A', peso2023: 10,
    note: 'Em 2023 as questões 1 a 10 foram de Língua Portuguesa, todas sobre um texto de agrotóxicos: interpretação, referente, conectivo, sinônimo, crase, vírgula e concordância nominal. Zerar Português elimina, e o bloco de Gerais exige 10 acertos em 20.',
  },
  renomear: { antes: 'Antes de começar', fontes: 'Fontes' },
  labs: {},
  trocas: [],
  resumo: [
    ['Interpretação', 'Só vale o que o texto diz ou implica. Desconfie de sempre, nunca, apenas e de opinião alheia.'],
    ['Ortografia', 'Acentue pela sílaba tônica. Hífen: h ou vogal igual. Ideia, joia, voo e veem sem acento; têm e vêm com.'],
    ['Coesão', 'Referente: troque e releia. Oposição: mas; concessão: embora; conclusão: portanto; causa: porque.'],
    ['Concordância', 'Ache o núcleo do sujeito. Haver (existir) e fazer (tempo) ficam no singular. Meio e bastante: pela função.'],
    ['Crase', 'Preposição a + artigo a(s). Troque por masculino: se der ao(s), há crase. Sem crase: verbo, masculino.'],
    ['Vírgula', 'Nunca entre sujeito e verbo nem entre verbo e complemento. Isola aposto, vocativo e termo deslocado.'],
    ['Sentido', 'O contexto decide. Diga o sentido, troque e releia; cuidado com o antônimo disfarçado e com os parônimos.'],
  ],
  cards: [
    ['Como achar o núcleo do sujeito antes de concordar o verbo?', 'Ache o verbo, pergunte “quem?” ou “o quê?” e risque o que vem depois de de, com, em. O que sobrar é o núcleo: ele manda no verbo, e não a palavra vizinha.'],
    ['Qual o teste mecânico da crase?', 'Veja se o termo anterior pede a preposição a; depois troque a palavra feminina por uma masculina. Se aparecer ao(s), há crase: “chegamos ao prédio” → “chegamos à usina”.'],
    ['Cidade ou país: como saber se leva crase?', 'Troque o verbo por voltar. “Volto da Bahia” → vou à Bahia; “volto de Brasília” → vou a Brasília, sem crase.'],
    ['Em quais casos NÃO há crase?', 'Antes de masculino, de verbo, de pronome pessoal (ela, você), de este e esse, de quem e de plural sem artigo: “a pé”, “voltou a trabalhar”, “a ela”, “a várias pessoas”.'],
    ['Quais as vírgulas proibidas?', 'Entre sujeito e verbo, entre verbo e complemento e entre nome e adjunto. Só um par de vírgulas pode isolar um trecho intercalado.'],
    ['Explicativa × restritiva: o que muda com as vírgulas?', 'Com vírgulas, a oração vale para todos os antecedentes; sem vírgulas, delimita um grupo. “Os técnicos, que trabalham à noite, …” = todos trabalham à noite.'],
    ['Quando o “pois” é conclusão e quando é explicação?', 'Entre vírgulas, depois de um termo da oração, é conclusão (= portanto). No início da oração, é explicação (= porque).'],
    ['Como achar o referente de um pronome?', 'Troque o pronome pelo termo candidato e releia: o que mantém o sentido é o referente, mesmo que não seja o mais próximo. Este = último citado; aquele = primeiro.'],
    ['Concessão × condição: qual a diferença?', 'Concessão (embora, ainda que): o fato ocorre apesar do obstáculo. Condição (se, caso): o fato depende de algo que ainda não aconteceu.'],
    ['Como saber se “que” é relativo ou integrante?', 'Troque por “o qual”: se couber, é relativo. Se completa um verbo (“disse que…”) e a oração pode virar “isso”, é conjunção integrante.'],
    ['Mal ou mau: como decidir?', 'Troque pelo antônimo. Cabe “bom”? Então mau (adjetivo). Cabe “bem”? Então mal (advérbio). “Mau contato”, “funciona mal”.'],
    ['Haver e fazer: quando ficam no singular?', 'Haver com sentido de existir e fazer indicando tempo são impessoais: há falhas, faz dois anos. O auxiliar também: “deve haver”. Existir concorda: existem.'],
    ['Vendem-se casas × precisa-se de técnicos: como decidir o verbo?', 'A passiva com “ser” funciona? Então o verbo concorda com o sujeito paciente. Se o verbo pede preposição, fica no singular: “precisa-se de técnicos”.'],
    ['Qual o macete do hífen depois de prefixo?', 'Hífen se a palavra começa por h ou o prefixo termina na mesma vogal (micro-ondas); sempre com ex-, vice-, pós-, pré-, pró-. Vogal diferente: junto. Prefixo em vogal + r/s: dobra; inter-, hiper-, super- + r: hífen.'],
    ['Quais acentos o Acordo Ortográfico tirou?', 'O do ditongo aberto ei e oi em paroxítonas (ideia, joia, heroico) e o do hiato oo e ee (voo, enjoo, veem, leem). O trema também acabou.'],
    ['Eminente ou iminente? Ratificar ou retificar?', 'Iminente = prestes a acontecer; eminente = ilustre. Ratificar = confirmar; retificar = corrigir. Infringir = violar; infligir = aplicar pena.'],
    ['Como descobrir a função de um trecho?', 'Pergunte por que o autor escreveu aquilo ali: exemplo (como), explicação (pois), contraste (mas), conclusão (portanto) ou proposta (verbo de dever, depois do problema).'],
  ],
  vf: [
    ['Em “Os técnicos, que trabalham à noite, receberam o adicional”, todos os técnicos trabalham à noite.', true, 'As vírgulas indicam oração adjetiva <b>explicativa</b>, que vale para todos os antecedentes. Sem vírgulas (restritiva), falaria só de parte dos técnicos.'],
    ['Em “Voltamos à trabalhar na linha 2”, o acento grave está correto.', false, 'Diante de <b>verbo</b> não há artigo, logo não há crase: “voltamos a trabalhar”.'],
    ['“Haviam muitas falhas no painel” está de acordo com a norma-padrão.', false, '“Haver” com sentido de existir é <b>impessoal</b>: “Havia muitas falhas”.'],
    ['“Antirrábico” se escreve com dois r.', true, 'Prefixo terminado em vogal e palavra iniciada por r: o <b>r dobra</b> (antirrábico, antissocial).'],
    ['“Auto-estrada” é a grafia correta pelo Acordo Ortográfico.', false, 'Prefixo terminado em vogal e palavra iniciada por <b>vogal diferente</b>: sem hífen, “autoestrada”.'],
    ['Em “Ele disse que o motor queimou”, a palavra “que” é pronome relativo.', false, '“Que” completa o verbo “disse” (<b>conjunção integrante</b>) e não se troca por “o qual”.'],
    ['Em “Não há, pois, como concluir”, o “pois” tem valor de conclusão.', true, 'Entre vírgulas, depois de um termo da oração, “pois” equivale a <b>portanto</b>.'],
    ['Cidade sem artigo, como Brasília, não leva crase: “vou a Brasília”.', true, 'Teste do “voltar”: “volto <b>de</b> Brasília”, sem artigo. Já “volto <b>da</b> Bahia” pede “vou à Bahia”.'],
    ['Em “Precisa-se de técnicos”, o verbo pode ir ao plural: “Precisam-se de técnicos”.', false, '“Precisar de” pede preposição; o “se” é de indeterminação e o verbo fica no <b>singular</b>.'],
    ['Pelo Acordo Ortográfico, “ideia” e “joia” levam acento agudo.', false, 'O acento do ditongo aberto <b>ei</b> e <b>oi</b> em paroxítonas foi suprimido: ideia, joia, heroico.'],
    ['Em interpretação, uma alternativa com “sempre” ou “nunca” pede desconfiança: só vale se o texto autorizar.', true, 'Absolutos costumam ser <b>extrapolação</b>. A alternativa precisa de apoio no texto, e não no mundo.'],
    ['“A equipe, trocou os fusíveis” está correta, porque a leitura em voz alta faz pausa.', false, 'A vírgula separa o <b>sujeito do verbo</b>. Para a prova, vale a regra escrita, e não a pausa da leitura.'],
    ['“Mau” é o oposto de “bom”, e “mal” é o oposto de “bem”.', true, 'É o <b>teste do antônimo</b>: “mau contato” (bom contato), “funciona mal” (funciona bem).'],
    ['Ratificar significa corrigir, e retificar significa confirmar.', false, 'É o contrário: <b>ratificar</b> = confirmar; <b>retificar</b> = corrigir.'],
  ],
  contas: [],
};

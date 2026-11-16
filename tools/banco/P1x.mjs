/* Questões extras (nível prova) da estação P1 (Língua Portuguesa). Textos originais. Revisão independente: ver fontes/ERRATA.md. */
const TA = '<i>Durante décadas, a manutenção nas plantas industriais seguiu o calendário: trocava-se a peça na data marcada, ainda que estivesse em bom estado. Hoje, sensores de vibração e de temperatura enviam dados contínuos a uma central, que os compara com o comportamento esperado de cada máquina. Quando surge um desvio, a equipe é avisada e decide se intervém. A mudança, contudo, não dispensa o julgamento humano: um alerta só tem valor se alguém souber interpretá-lo. Por isso, as empresas que investiram apenas em equipamentos, sem treinar seus técnicos, colheram resultados modestos.</i><br><br>';
const TB = '<i>Há quem veja o procedimento escrito como burocracia que atrasa o serviço. A experiência de campo, porém, mostra o contrário: a maioria dos acidentes graves ocorre quando alguém decide improvisar, convencido de que conhece o caminho mais curto. O procedimento não existe para desconfiar do trabalhador; existe para registrar o que já se aprendeu, muitas vezes à custa de um ferimento. Ignorá-lo equivale a repetir, com a mesma ingenuidade, erros que outros já pagaram caro. Seguir a regra, portanto, não é abrir mão da experiência, mas aproveitá-la.</i><br><br>';
export default {
  erros: {
    p1inferErr: { n: 'Inferência sem apoio no texto', d: 'Escolheu uma causa que o texto não menciona ou que contradiz, em vez da que ele sugere de forma explícita.', t: 'detalhe' },
    p1refProx: { n: 'Pronome retomado pelo termo errado', d: 'Retomou o pronome por um termo mais distante ou posterior, e não pelo antecedente que o sentido e a concordância exigem.', t: 'detalhe' },
    p1conectRel: { n: 'Relação lógica trocada', d: 'Trocou o conectivo por outro de relação diferente (conclusão, adição, explicação ou conformidade) no lugar da oposição.', t: 'oposto' },
    p1sentidoLit: { n: 'Sentido literal da expressão', d: 'Tomou a expressão no sentido literal ou a deformou, sem considerar o sentido que ela tem no contexto.', t: 'detalhe' },
    p1funcaoVirg: { n: 'Função da vírgula trocada', d: 'Atribuiu às vírgulas uma função (aposto, enumeração, vocativo, oração explicativa) que elas não têm no trecho.', t: 'detalhe' },
    p1contraria: { n: 'Inverteu o comando da questão', d: 'Marcou uma ideia que o texto defende, quando o comando pedia a que não está de acordo com ele.', t: 'oposto' },
    p1regencia: { n: 'Regência ou crase incorretas', d: 'Aceitou como correta uma frase com regência verbal ou crase em desacordo com a norma-padrão.', t: 'detalhe' },
    p1concord: { n: 'Concordância verbal incorreta', d: 'Aceitou como correta uma frase com verbo impessoal flexionado, sujeito mal identificado ou partícula apassivadora mal concordada.', t: 'detalhe' },
    p1ortog: { n: 'Grafia incorreta aceita', d: 'Deixou passar uma palavra com grafia em desacordo com o Acordo Ortográfico e o uso corrente (s por ç, z por s, ç por ss).', t: 'detalhe' },
    p1paron: { n: 'Parônimos trocados', d: 'Trocou parônimos: infringir (violar) e infligir (aplicar pena), iminente (prestes a ocorrer) e eminente (elevado).', t: 'detalhe' },
  },
  extra: [
    { id: 'y1', h: 'Port 1', tag: 'Inferência sobre resultados modestos', d: 'm',
      s: TA + 'Infere-se do texto que as empresas que investiram apenas em equipamentos tiveram resultados modestos porque',
      o: ['os sensores de vibração e de temperatura fornecem dados menos confiáveis que o calendário de trocas.', 'a central de dados compara cada máquina com o comportamento de máquinas de outra planta industrial.', 'a equipe de manutenção deixou de ser avisada quando surgiram desvios no funcionamento das máquinas.', 'os alertas dos equipamentos só têm valor se houver técnicos capazes de interpretá-los corretamente.', 'a decisão de intervir passou a caber à central de dados, e não mais à equipe de manutenção.'], a: 3,
      c: 'O texto diz que a mudança "não dispensa o julgamento humano" e que "um alerta só tem valor se alguém souber interpretá-lo"; o "Por isso" liga isso ao resultado modesto de quem não treinou os técnicos. As demais alternativas afirmam o que o texto não diz ou contradiz (ele afirma que a equipe é avisada e que ela decide se intervém).',
      w: { A: '[p1inferErr] O texto não compara a confiabilidade dos sensores com a do calendário.', B: '[p1inferErr] O texto diz que a comparação é com o comportamento esperado de cada máquina, e não com o de outra planta.', C: '[p1inferErr] O texto afirma o contrário: "a equipe é avisada".', E: '[p1inferErr] O texto diz que a equipe "decide se intervém"; a decisão não passou à central.' } },

    { id: 'y2', h: 'Port 3', tag: 'Referência de pronomes', d: 'm',
      s: TA + 'No trecho “enviam dados contínuos a uma central, que os compara com o comportamento esperado de cada máquina”, o pronome relativo “que” e o pronome “os” retomam, respectivamente,',
      o: ['os sensores e os desvios.', 'a central e os dados contínuos.', 'os dados contínuos e as máquinas.', 'a central e as máquinas.', 'os sensores e os dados contínuos.'], a: 1,
      c: '“Que” é sujeito de “compara” e retoma o termo imediatamente anterior, “uma central”. “Os” é objeto direto de “compara”: o que a central compara são os “dados contínuos” (os dados são comparados com o comportamento esperado).',
      w: { A: '[p1refProx] Os sensores enviam, e quem compara é a central; “desvios” só aparece na frase seguinte.', C: '[p1refProx] “Que” retoma “central”, o antecedente mais próximo; “dados” não pode ser o sujeito de “compara”.', D: '[p1refProx] “Máquinas” é termo do complemento (“comportamento de cada máquina”), e não aquilo que é comparado.', E: '[p1refProx] Quem compara é a central, e não os sensores, que apenas enviam os dados.' } },

    { id: 'y3', h: 'Port 4', tag: 'Conectivo adversativo', d: 'm',
      s: TA + 'No trecho “A mudança, contudo, não dispensa o julgamento humano”, a palavra “contudo” pode ser substituída, sem alteração do sentido nem prejuízo da correção, por',
      o: ['portanto', 'ademais', 'porque', 'conforme', 'entretanto'], a: 4,
      c: '“Contudo” é conjunção adversativa: opõe a ideia da frase (o julgamento humano continua necessário) à anterior (a tecnologia traz dados contínuos). “Entretanto” tem o mesmo valor. As demais expressam conclusão, adição, explicação e conformidade.',
      w: { A: '[p1conectRel] “Portanto” indica conclusão, e não oposição.', B: '[p1conectRel] “Ademais” indica adição de argumento.', C: '[p1conectRel] “Porque” indica causa ou explicação.', D: '[p1conectRel] “Conforme” indica conformidade ou proporção.' } },

    { id: 'y4', h: 'Port 8', tag: 'Sentido de “à custa de”', d: 'm',
      s: TB + 'No texto, a expressão “à custa de um ferimento” indica que o conhecimento registrado no procedimento',
      o: ['foi obtido ao preço de um ferimento sofrido por alguém, no passado.', 'foi financiado por uma empresa que pagou pelo ferimento de um trabalhador.', 'foi dispensado, pois o ferimento prova que a regra escrita era inútil.', 'foi garantido pela experiência individual de quem nunca se feriu.', 'foi adquirido de modo mais rápido porque o ferimento acelerou o aprendizado.'], a: 0,
      c: '“À custa de” significa “ao preço de”, “por meio do sacrifício de”: o aprendizado resultou de acidentes. Isso se liga à ideia seguinte do texto, de repetir “erros que outros já pagaram caro”.',
      w: { B: '[p1sentidoLit] Tomou “custa” no sentido literal de dinheiro gasto por uma empresa.', C: '[p1sentidoLit] O ferimento mostra por que o procedimento é necessário, e não que ele seja inútil.', D: '[p1sentidoLit] A expressão fala de quem se feriu, e não de quem nunca se feriu.', E: '[p1sentidoLit] A expressão indica o preço do aprendizado, e não a sua rapidez.' } },

    { id: 'y5', h: 'Port 7', tag: 'Função das vírgulas', d: 'm',
      s: TB + 'No trecho “A experiência de campo, porém, mostra o contrário”, as vírgulas foram empregadas para isolar',
      o: ['um aposto, que explica o termo “experiência de campo”.', 'elementos de uma enumeração, todos com a mesma função sintática.', 'uma conjunção adversativa, deslocada para o interior da oração.', 'um vocativo, que se dirige diretamente ao leitor do texto.', 'uma oração subordinada adjetiva, de valor explicativo.'], a: 2,
      c: '“Porém” é conjunção adversativa; quando vem no meio da oração (e não no início), é isolada por vírgulas. Não há aposto, enumeração, vocativo nem oração adjetiva: “porém” é uma só palavra, que liga a ideia à frase anterior.',
      w: { A: '[p1funcaoVirg] “Porém” não explica “experiência de campo”: não é aposto.', B: '[p1funcaoVirg] Não há série de elementos de mesma função; há uma só palavra isolada.', D: '[p1funcaoVirg] “Porém” não chama ninguém: vocativo é o termo de chamamento.', E: '[p1funcaoVirg] “Porém” é uma palavra, e não uma oração com verbo.' } },

    { id: 'y6', h: 'Port 1', tag: 'Ideia que contraria o texto', d: 'm',
      s: TB + 'Assinale a afirmação que <b>NÃO</b> está de acordo com as ideias do texto.',
      o: ['A maioria dos acidentes graves ocorre quando alguém improvisa, em busca do caminho mais curto.', 'O procedimento escrito reúne aprendizados que, muitas vezes, custaram caro a outras pessoas.', 'Desconsiderar o procedimento equivale a repetir erros que outros trabalhadores já cometeram.', 'O procedimento serve, antes de tudo, para demonstrar desconfiança do trabalhador.', 'Seguir a regra é uma forma de aproveitar a experiência, e não de renunciar a ela.'], a: 3,
      c: 'O texto diz o contrário na terceira frase: “O procedimento não existe para desconfiar do trabalhador; existe para registrar o que já se aprendeu”. As outras quatro afirmações resumem trechos do texto.',
      w: { A: '[p1contraria] Está de acordo: é a segunda frase do texto.', B: '[p1contraria] Está de acordo: “registrar o que já se aprendeu, muitas vezes à custa de um ferimento”.', C: '[p1contraria] Está de acordo: “Ignorá-lo equivale a repetir [...] erros que outros já pagaram caro”.', E: '[p1contraria] Está de acordo: é a conclusão do texto (“não é abrir mão da experiência, mas aproveitá-la”).' } },

    { id: 'y7', h: 'Port 6', tag: 'Regência verbal e crase', d: 'd',
      s: 'Em qual das frases a regência verbal e o emprego do sinal indicativo de crase estão de acordo com a norma-padrão?',
      o: ['O gerente aspirava o cargo de coordenador da planta.', 'Os técnicos obedeceram às instruções do fabricante.', 'O laudo foi entregue à técnicos contratados em abril.', 'O curso será oferecido à partir de segunda-feira.', 'A equipe chegou na subestação às seis horas da manhã.'], a: 1,
      c: '“Obedecer” rege a (obedecer a alguém ou a algo); “às instruções” traz a preposição mais o artigo feminino plural: crase. Nas outras: “aspirar” no sentido de desejar exige a (aspirar ao cargo); não há crase diante de palavra masculina plural (“a técnicos”) nem em “a partir de”; e “chegar” pede a (chegou à subestação).',
      w: { A: '[p1regencia] “Aspirar”, no sentido de desejar, é transitivo indireto: “aspirava ao cargo”.', C: '[p1regencia] Não há crase diante de “técnicos”, palavra masculina no plural: “a técnicos”.', D: '[p1regencia] “A partir de” é locução em que não há crase: “a partir de segunda-feira”.', E: '[p1regencia] Na norma-padrão, “chegar” pede a: “chegou à subestação”.' } },

    { id: 'y8', h: 'Port 5', tag: 'Concordância verbal', d: 'd',
      s: 'Em qual das frases a concordância verbal está de acordo com a norma-padrão?',
      o: ['Faz dois anos que os transformadores foram substituídos.', 'Fazem dois anos que os transformadores foram substituídos.', 'Haviam muitos técnicos na sala de controle durante o ensaio.', 'Fui eu que revisou o circuito de comando antes da partida.', 'Aluga-se salas para treinamento dentro da unidade.'], a: 0,
      c: '“Fazer” indicando tempo decorrido é impessoal, fica na 3ª pessoa do singular: “Faz dois anos”. Em B o verbo foi flexionado; em C, “haver” no sentido de existir é impessoal (“Havia”); em D o verbo concorda com “eu” (“revisei”); em E, com a partícula apassivadora, o verbo concorda com o sujeito plural (“Alugam-se salas”).',
      w: { B: '[p1concord] “Fazer”, no sentido de tempo decorrido, é impessoal: não vai para o plural.', C: '[p1concord] “Haver”, no sentido de existir, é impessoal: “Havia muitos técnicos”.', D: '[p1concord] Com “Fui eu que”, o verbo da oração relativa concorda com “eu”: “revisei”.', E: '[p1concord] Com o “se” apassivador, o verbo concorda com o sujeito (“salas”): “Alugam-se”.' } },

    { id: 'y9', h: 'Port 2', tag: 'Ortografia', d: 'm',
      s: 'De acordo com o Acordo Ortográfico da Língua Portuguesa e com o uso da norma-padrão, todas as palavras estão corretamente grafadas em',
      o: ['excessão — análise — obsessão — pretensão', 'exceção — paralização — obsessão — pretensão', 'exceção — análise — obseção — pretensão', 'exceção — análize — obsessão — pretensão', 'exceção — análise — obsessão — pretensão'], a: 4,
      c: 'As grafias corretas são exceção (de exceto), análise, obsessão e pretensão. Em A, “excessão” troca ç por ss; em B, a grafia correta é “paralisação”; em C, é “obsessão”; em D, é “análise”.',
      w: { A: '[p1ortog] “Exceção” se escreve com ç.', B: '[p1ortog] A grafia correta é “paralisação”, derivada de “paralisar”, com s.', C: '[p1ortog] “Obsessão” se escreve com ss.', D: '[p1ortog] “Análise” se escreve com s.' } },

    { id: 'y10', h: 'Port 8', tag: 'Parônimos', d: 'm',
      s: 'Assinale a alternativa que completa corretamente as lacunas da frase: “O operador ___ a norma de segurança, e a empresa lhe ___ uma advertência, diante do risco ___ de acidente grave.”',
      o: ['infligiu — infringiu — eminente', 'infringiu — infringiu — iminente', 'infringiu — infligiu — iminente', 'infringiu — infligiu — eminente', 'infligiu — infligiu — iminente'], a: 2,
      c: '“Infringir” é violar, descumprir (a norma); “infligir” é aplicar (pena, advertência); “iminente” é o que está prestes a acontecer (risco de acidente), enquanto “eminente” significa elevado, notável.',
      w: { A: '[p1paron] Trocou os dois verbos: a norma é infringida, e a advertência é infligida.', B: '[p1paron] A empresa aplica a advertência: o verbo é “infligir”.', D: '[p1paron] “Eminente” é elevado; risco prestes a ocorrer é “iminente”.', E: '[p1paron] O operador violou a norma: o verbo é “infringir”.' } },
  ],
};

# Errata do material de estudo

Correções técnicas feitas ao converter o material de `fontes/` em estações do app. Os arquivos de `fontes/` ficam como
o estudante os escreveu; cada correção é uma troca de texto registrada em `tools/estacoes/<id>.mjs` (campo `errata`),
aplicada por `tools/estacao.mjs` ao gerar `data/estacoes/<id>.js`.

## E1 · Circuitos CC: Kirchhoff, Thévenin e Norton (`fontes/circuitos-cc.html`)

Revisão de 2026-10-24: os 29 exercícios e os 6 exemplos resolvidos foram refeitos à mão e as 59 contas ficaram
registradas em `contas` (o teste `tests/estacoes.test.mjs` recalcula cada uma com 1% de tolerância). Nenhuma conta
estava errada. As quatro correções abaixo são de conceito ou de precisão.

| Id | Arquivo/estação | O que dizia | O que diz agora | Fonte |
|---|---|---|---|---|
| E1-1 | `circuitos-cc.html`, seção 5, quadro "Relações entre Thévenin e Norton" → E1 | R<sub>th</sub> = V<sub>aberto</sub>/I<sub>curto</sub>: "esse caminho é **obrigatório** quando há fontes dependentes, que não podem ser zeradas" | Com fontes dependentes, use V<sub>aberto</sub>/I<sub>curto</sub> **ou** uma fonte de teste entre a e b (independentes zeradas, dependentes mantidas): R<sub>th</sub> = V<sub>teste</sub>/I<sub>teste</sub>. O caminho não é obrigatório; e, quando V<sub>th</sub> = 0, a razão nem existe e só a fonte de teste resolve. | C. K. Alexander e M. N. O. Sadiku, *Fundamentos de Circuitos Elétricos*, seção 4.5 (Teorema de Thévenin, caso 2: fonte de teste); [electrical4u, Thevenin with dependent sources](https://www.electrical4u.com/thevenin-theorem-and-thevenin-equivalent-voltage-and-resistance/); [ZyBook/Walla Walla, cap. 3.8](https://gab.wallawalla.edu/~curt.nelson/engr228/lecture/chap3_8%20zybook.pdf) |
| E1-2 | `circuitos-cc.html`, exercício 6 da seção 5 (comentário) → E1 | "Com fontes dependentes, esse caminho é **o correto**, porque elas não podem ser zeradas." | "Com fontes dependentes, que não podem ser zeradas, esse é **um dos dois caminhos válidos**; o outro é aplicar uma fonte de teste entre os terminais." | as mesmas de E1-1 |
| E1-3 | `circuitos-cc.html`, seção 4, quadro "Primeira lei (dos nós) e segunda lei (das malhas)" → E1 | LKT: "as subidas de potencial **(fontes)** igualam as quedas **(resistores)**" | "a soma das subidas de potencial é igual à soma das quedas. Uma fonte pode ser subida ou queda, conforme o sentido do percurso: no exemplo 4, E<sub>2</sub> é uma queda, porque o percurso horário a atravessa do + para o −". A versão antiga contradizia o próprio exemplo 4, em que a fonte E<sub>2</sub> absorve 6 W. (Revisão de 2026-10-24, segunda passada: a primeira redação dizia "porque está sendo carregada"; subida ou queda depende só do sentido do percurso em relação à polaridade, e não de a fonte fornecer ou absorver potência.) | Alexander e Sadiku, seção 2.4 (LKT como soma algébrica); [UFRN/IMD, Conceitos de Eletricidade, aula 3](https://hmateriais.imd.ufrn.br/materialV2/assets/download/conceitos-de-eletricidade/03-leis-de-kichhoff-e-tecnicas-de-analise-de-circuitos-CONCEITOS-DE-ELETRICIDADE-IMD.pdf) |
| E1-4 | `circuitos-cc.html`, seção 5, quadro "Condição de máxima transferência" → E1 | η = 50%: "nesse ponto, metade da potência é perdida em R<sub>th</sub>" | "metade da potência entregue pela fonte equivalente fica em R<sub>th</sub>. Numa fonte real (E com resistência interna r), é a perda dentro da própria fonte; num circuito qualquer, os 50% valem para o equivalente, e não para as perdas do circuito original". Exemplo: no circuito do exemplo 6 (24 V, 6 Ω, 3 Ω, 2 Ω) com R<sub>L</sub> = 4 Ω, a fonte de 24 V entrega 72 W e a carga recebe 4 W (5,6%), embora o equivalente diga 50%. | Alexander e Sadiku, seção 4.8 (máxima transferência) e a observação de que o equivalente só vale nos terminais; [Kuphaldt, *Lessons in Electric Circuits* I, 10.12 (LibreTexts)](https://workforce.libretexts.org/Bookshelves/Electronics_Technology/Circuitry/Book%3A_I_Direct_Current_(DC)/10%3A_DC_Network_Analysis/10.12%3A_Maximum_Power_Transfer_Theorem) |

Ajustes de contexto (não são erros técnicos, só o texto adaptado ao app): "Bloco N" virou "seção N"; "material de CA e
trifásicos" virou "estação E2"; "arquivos do projeto" saiu; a caixa "Como a Cesgranrio tem cobrado" ganhou os números
das questões de 2023 (36, 49, 52, 53 e 57), conferidos no caderno da prova; o item 7.3 (instrumentos) foi citado; e as
Fontes ganharam uma linha sobre esta revisão.

## E2 · Corrente alternada, fasores e impedância (`fontes/circuitos-ca-trifasicos.html`, blocos 1 a 4)

Revisão de 2026-10-24: os 4 exemplos resolvidos e os 21 exercícios dos blocos 1 a 4 foram refeitos à mão e as contas
ficaram registradas em `contas` (44, recalculadas por `tests/estacoes.test.mjs` com 1% de tolerância). Também foram
conferidos os desenhos com números: a linha do eficaz da figura 1 (0,707 do pico), a defasagem de 60° da figura 2, os
fasores da figura 3 (V adiantada em L, atrasada em C) e o ângulo do triângulo da figura 5. **Nenhuma conta nem
afirmação técnica estava errada**; não há correção técnica nesta estação.

Ajustes de contexto (não são erros técnicos): "Bloco 2" virou "seção 2" e "Bloco 5" virou "estação E3"; a legenda da
figura 3 dizia "tensão (preto)", e no tema escuro o traço é claro, então passou a "traço grosso, na cor do texto"; dois
rótulos das figuras 1 e 2 mudaram de lugar porque a fonte do app, mais larga, os punha em cima da curva; "Antes de
começar" virou "Escopo do edital e como a banca cobra", só com os itens 2.2 a 2.4 e com as questões de 2023 (32, 33 e
48) conferidas no caderno da prova.

## E3 · Potência, fator de potência e trifásicos (`fontes/circuitos-ca-trifasicos.html`, blocos 5 e 6, mais a seção 3 nova)

Revisão de 2026-10-24: os 2 exemplos e os 13 exercícios dos blocos 5 e 6 foram refeitos à mão; os 2 exemplos e os 3
exercícios da seção nova (energia, medidor de energia e dois wattímetros, em `tools/estacoes/E3-energia-wattimetros.html`)
foram escritos e conferidos da mesma forma. São 64 contas em `contas`. Nenhuma conta estava errada. As duas correções
abaixo são de precisão.

| Id | Arquivo/estação | O que dizia | O que diz agora | Fonte |
|---|---|---|---|---|
| E3-1 | `circuitos-ca-trifasicos.html`, bloco 5, "Por que o fator de potência baixo é um problema" → E3, seção 1 | "a regulação da ANEEL estabelece um fator de potência de referência de 0,92, abaixo do qual **o consumidor atendido nessas condições** paga pelo excedente de reativos" | "a regulação da ANEEL (Resolução Normativa nº 1.000/2021) fixa o fator de potência de referência em 0,92, **indutivo ou capacitivo**: as unidades consumidoras do **grupo A** (atendidas em média ou alta tensão, como indústrias) que ficam abaixo dele pagam pelo excedente de reativos. Consumidores do grupo B (baixa tensão, como residências) não têm essa cobrança." O texto antigo deixava a entender que a cobrança vale para qualquer consumidor. | ANEEL, REN nº 1.000/2021, seção VIII ("Do fator de potência e do reativo excedente"), arts. 302 e 303, citados em [O Setor Elétrico, "A Resolução 1000 da Aneel"](https://www.osetoreletrico.com.br/?p=42765) (fonte secundária: o texto oficial da ANEEL não abriu nesta revisão, HTTP 403; as Fontes da E3 dizem "conforme citada em O Setor Elétrico") |
| E3-2 | `circuitos-ca-trifasicos.html`, bloco 5, quadro "Fator de potência" → E3, seção 1 | FP = cos φ = P/S, sem ressalva | Acrescentado: "FP = cos φ vale com tensão e corrente senoidais; com correntes distorcidas (harmônicos), FP = P/S continua valendo e, com a tensão senoidal, fica ≤ cos φ, com φ medido entre as fundamentais (60 Hz) da tensão e da corrente". (Revisão da T3a: a primeira redação dizia "fica menor que cos φ", sem dizer de qual φ; o certo é ≤ o cos φ da fundamental, o fator de deslocamento.) (Revisão da T3c: acrescentado "com a tensão senoidal": a desigualdade FP ≤ cos φ<sub>1</sub> vale quando só a corrente é distorcida; com tensão e corrente distorcidas, potências de harmônicos podem quebrá-la.) Os instrumentos da E2 já falam de ondas distorcidas (inversores, fontes chaveadas), e o estudante não pode sair achando que as duas definições são sempre iguais. | Alexander e Sadiku, cap. 11 (potência em CA: FP = P/S); IEEE Std 1459 (fator de potência total = fator de deslocamento × fator de distorção, com tensão senoidal) |

Seção nova (escrita para o app, não é correção): energia (E = P·Δt, 1 kWh = 3,6 MJ), medidor de energia de disco
(N = E/K<sub>d</sub>, K<sub>d</sub> = 1.000/K<sub>r</sub>, P = 3.600·K<sub>d</sub>·N/Δt) e método dos dois wattímetros
(P = W<sub>1</sub> + W<sub>2</sub> algébrica, W<sub>1,2</sub> = V<sub>L</sub>I<sub>L</sub>·cos(φ ∓ 30°),
Q = √3·(W<sub>1</sub> − W<sub>2</sub>) e tg φ só com carga equilibrada; leitura zero com FP = 0,5 e negativa abaixo
disso). Conferido em Alexander e Sadiku (medição de potência trifásica, método dos dois wattímetros: P<sub>1</sub> =
V<sub>L</sub>I<sub>L</sub>cos(θ + 30°), P<sub>2</sub> = V<sub>L</sub>I<sub>L</sub>cos(θ − 30°), Q = √3(P<sub>2</sub> −
P<sub>1</sub>), com os índices trocados em relação aos daqui) e em [Electrical Engineering Portal, "Power measurement
in a three-phase system"](https://electrical-engineering-portal.com/power-measurement-in-a-three-phase-system). A
atribuição "linha A lê cos(φ − 30°)" foi recalculada com fasores para a ligação da figura 6 (bobinas de corrente em A e
B, comum em C, sequência ABC): W<sub>A</sub> = Re(V<sub>AC</sub>·I<sub>A</sub>*) com V<sub>AC</sub> = √3·V∠−30° e
I<sub>A</sub> = I∠−φ. A constante do disco em Wh/volta e em voltas/kWh está em
[EcuRed, "Metrocontadores"](https://www.ecured.cu/Metrocontadores). Os números dos exemplos e exercícios são próprios:
as questões 21 e 58 de 2023 serviram só de modelo de estilo.

Ajustes de contexto: blocos 5 e 6 viraram seções 1 e 2; figuras renumeradas na ordem em que aparecem (a apostila põe
a figura 9 antes da 8), com as referências do texto acompanhando; exemplos 5 e 6 viraram 1 e 2; a frase "o cálculo
detalhado de bancos de capacitores ... fica para o material de potência" saiu (esta estação é o material de potência);
o rótulo "cada Z fica sob V<sub>L</sub>" da figura do triângulo saiu de cima do fio da linha C.

Revisão da T3b (2026-10-24), pedida pela revisão da E3: o exemplo resolvido 3 da seção nova dizia que o medidor
"alimenta a bancada de uma oficina" durante "uma aula"; um medidor não alimenta nada, e o cenário lembrava o da questão
21 de 2023. Agora: o medidor "mede a energia consumida pela oficina de manutenção de uma base", durante "um turno"
(números iguais). As Fontes da E3 citam a REN nº 1.000/2021 "conforme citada em O Setor Elétrico", porque o texto
oficial da ANEEL não abriu (HTTP 403) e não foi lido nesta revisão.

## M1 · Simbologia e diagramas elétricos (`fontes/simbologia-diagramas.html`)

Revisão de 2026-10-24: os 2 exemplos resolvidos e os 30 exercícios da apostila foram refeitos; a apostila quase não tem
contas, então as 7 contas em `contas` são do exemplo 2 e do exercício novo (estrela-triângulo com números, escritos
para o app). Conferidos: as três convenções (repouso; força × comando; letra + número), a numeração dos terminais
(A1-A2; 1L1-2T1, 3L2-4T2, 5L3-6T3; x3-x4 NA, x1-x2 NF; 95-96 NF e 97-98 NA do relé de sobrecarga), as letras K, F, Q,
S, H, M, a numeração ANSI (27, 49, 50, 51, 52, 59, 63, 86, 87, 89; N = neutro), o selo, as regras série × paralelo, a
condição de sequência, o intertravamento elétrico e mecânico, a equação booleana, a sutileza do Ladder com botão NF
físico, a reversão (troca de duas fases; a figura 7 entrega L3-L2-L1 em K2, conferido fio a fio), a sequência e as
condições da estrela-triângulo (6 terminais, tensão de Δ = tensão da rede, corrente e conjugado a ~1/3) e a NBR 5444
(cancelada em 10/11/2014 sem substituta; a apostila já dizia isso corretamente e não a apresenta como vigente).

| Id | Arquivo/estação | O que dizia | O que diz agora | Fonte |
|---|---|---|---|---|
| M1-1 | `simbologia-diagramas.html`, bloco 5, tabela de diagnóstico → M1, seção 5 | "O motor não desliga pelo S0": "selo ligado em paralelo com o S0 em vez de com o S1" | "selo ligado de modo a contornar também o S0 (em paralelo com o conjunto S0 + S1, e não só com o S1)". Com o selo só em paralelo com o S0, o S1 (pulsador) ficaria sozinho em série com a bobina e o motor nem se manteria ligado; o defeito que impede o desligamento é o selo que contorna o S0 **e** o S1. | análise do próprio circuito (figura do simulador 1); C. M. Franchi, *Acionamentos Elétricos*, comando da partida direta |
| M1-2 | `simbologia-diagramas.html`, bloco 2, figura 3 (planta baixa) → M1, figura 3 | tomada rotulada "TUG 100 VA", logo depois de o texto dizer que a potência da tomada é dispensada quando é de 100 VA | rótulo "600 VA", e a legenda explica: "tomada baixa de 600 VA do circuito 2 (se fosse de 100 VA, a potência nem seria escrita)" | ABNT NBR 5444:1989, tabela de tomadas (potência indicada em VA ao lado do símbolo, dispensada quando é de 100 VA), cópia didática da UFPR citada nas Fontes |
| M1-3 | `simbologia-diagramas.html`, bloco 3, tabela "A numeração dos terminais" → M1, seção 3 | só x3-x4 (NA), x1-x2 (NF) e 95-96/97-98 | acrescentada a linha "x5-x6 e x7-x8: contatos de função especial, NF (5-6) e NA (7-8), como os do relé de sobrecarga e os temporizados de um relé de tempo", e citadas as regras (IEC 60947 e a antiga EN 50005). Sem ela, 95-96 e 97-98 pareciam exceção sem regra. | IEC 60947-1 (marcação de terminais) e EN 50005; [IMD/UFRN](https://materialpublic.imd.ufrn.br/curso/disciplina/1/58/5/11); catálogos de contatores |

Marcado com `confira`: a questão Cesgranrio 2014 (Petrobras, Técnico de Manutenção Júnior – Elétrica) com o diagrama
de F1, S0, S1 e K1 a converter em Ladder, que a apostila cita pelo Qconcursos; a página não abriu (HTTP 403) e uma busca
não achou o enunciado.

Ajustes de contexto: "(Bloco 5)" virou "(seção 5)"; a frase "a teoria está no material de trifásicos e será
aprofundada no item 5.7" virou a explicação curta do 1/3 (em estrela, a bobina recebe V<sub>L</sub>/√3) com as
referências às estações E3 e M3; o exemplo resolvido 2 (estrela-triângulo com números: 210 A → 70 A, 219 V por bobina)
e o exercício 7 da seção 5 são novos, e o exemplo de diagnóstico virou o 3; caixa "Pratique na Bancada" (OS 1 e OS 3)
com link para a aba Bancada; três rótulos de figura saíram de cima dos fios (figuras 3 e 7) e a porta da planta baixa
passou a ser um vão na parede (antes era um traço da cor do fundo, que some num dos temas); "Antes de começar" virou
"Escopo do edital e como a banca cobra", com a questão 38 de 2023 conferida no caderno.

## M2 · Eletromagnetismo e transformadores (`fontes/eletromagnetismo-transformadores.html`)

Revisão de 2026-10-24: os 7 exemplos resolvidos e os 39 exercícios da apostila foram refeitos à mão (mais 1 exercício
novo, Dyn11); 70 contas em `contas`, inclusive a legenda da figura 9 (0,5² × 1.200 = 300 W; η máx = 20.000/20.600 =
97,1%) e os distratores explicados. Nenhuma conta estava errada. Conferidos: unidades (Φ em Wb, B em T = Wb/m² = 10⁴ G,
H em A/m, μ em H/m, μ<sub>0</sub> = 4π × 10⁻⁷); classificação dos materiais; regra da mão direita e do saca-rolhas;
B = μ<sub>0</sub>I/(2πr), B<sub>espira</sub>, B<sub>solenoide</sub> = μNI/l; circuito magnético; F = B·I·L·sen θ e
F = I·L × B (figura 5 e exercício 3 da seção 3 recalculados com o produto vetorial); regra da mão esquerda de Fleming
(indicador = B, médio = I, polegar = F) e da mão direita (gerador); força entre condutores paralelos; Faraday-Lenz e o
sinal; fem de movimento; autoindução e W = ½LI²; histerese (B<sub>r</sub>, H<sub>c</sub>, saturação, laço da figura 6
simétrico); laminação × correntes parasitas e silício × as duas perdas; E = 4,44·f·N·Φ<sub>máx</sub> (4,44 = 2π/√2) e a
saturação com V↑ ou f↓; relações do transformador ideal e Z′ = a²·Z<sub>2</sub>; autotransformador; construção;
ensaios a vazio e de curto; P<sub>Fe</sub> constante e P<sub>Cu</sub> = x²·P<sub>Cu,nom</sub>; rendimento máximo em
x = √(P<sub>Fe</sub>/P<sub>Cu,nom</sub>); regulação (V<sub>vazio</sub> − V<sub>carga</sub>)/V<sub>carga</sub>, a
convenção de Chapman, com a outra forma citada; Z% e I<sub>cc</sub> ≈ I<sub>n</sub>·100/Z%; notação Dyn (maiúscula =
AT, n = neutro); índice horário (cada hora = 30°, BT atrasada, IEC 60076-1); condições de paralelismo (relação, índice,
sequência e polaridade, Z% próximas; potência até ~3:1); TC em série, nunca aberto, secundário 5 A ou 1 A; TP em
paralelo, nunca em curto, 115 V ou 115/√3 V.

| Id | Arquivo/estação | O que dizia | O que diz agora | Fonte |
|---|---|---|---|---|
| M2-1 | `eletromagnetismo-transformadores.html`, bloco 5, "Polaridade", e exercício 6 do bloco 5 → M2, seção 5 | "ligam-se H1 e X1 com um jumper ... mede-se entre H2 e X2. Se a leitura for a diferença, subtrativa; se for a soma, aditiva" (e o exercício: "interligam-se H1 e X1 ... voltímetro entre H2 e X2") | liga-se H1 ao terminal de **baixa tensão adjacente a ele** e mede-se entre H2 e o outro terminal de baixa; diferença → subtrativa (X1 do lado de H1), soma → aditiva (X1 do lado oposto). O teste serve para descobrir qual terminal é o X1: com os terminais já marcados, ligar H1 a X1 daria sempre a diferença, e a regra não decidiria nada. O exercício passou a "interliga-se H1 ao terminal de baixa tensão adjacente a ele ... voltímetro entre H2 e o outro terminal de baixa" (gabarito e números iguais: 220 − 55 = 165 V, subtrativa). | ensaio de polaridade pelo método da tensão alternada (IEEE Std C57.12.90, seção de polaridade); I. L. Kosow, *Máquinas Elétricas e Transformadores*, polaridade de transformadores |
| M2-2 | `eletromagnetismo-transformadores.html`, exercício 1 do bloco 3 (comentário) → M2, seção 3 | "30 N, de usar 40 no lugar de 0,4 m em parte da conta" | "30 N, de converter 40 cm em 4 m" (0,5 × 15 × 4 = 30 N; com 40 m daria 300 N) | a própria conta |

Questão 28 de 2023 (Dy5): a regra dá a tensão de linha da BT **150° atrasada**; nenhuma das alternativas impressas no
caderno (5° adiantada, 5° atrasada, 120° atrasada, 120° adiantada, 30° adiantada) traz 150°. O app ensina a regra, diz
isso na caixa "Como a Cesgranrio tem cobrado" e **não** aponta gabarito oficial (a Task 5 confere o gabarito).

Ajustes de contexto: "Bloco N" virou "seção N"; itens 5.4 e 5.5 apontam para a estação M3; "Antes de começar" virou
"Escopo do edital e como a banca cobra", com as questões 26, 27, 28 e 54 de 2023 conferidas no caderno; figura nova do
relógio para Dy5 (figura 11) e a pegadinha "o índice conta horas, não graus"; exercício novo (Dyn11) na seção 7; na
figura 1, "N" e "S" eram texto branco sobre o ímã colorido (some num dos temas) e passaram a texto colorido num ímã em
contorno; na figura 6, "curva inicial" e "−H<sub>c</sub>" saíram de cima das curvas (com linha de chamada).

M1, revisão da T3c (figura 5): a 390 px, os rótulos "(NF, cogumelo, com trava)" e "(acionada mecanicamente)" se
encavalavam com o símbolo vizinho; cada um foi quebrado em duas linhas (sem mudar o texto).

## I1 · Instalações prediais e NBR 5410 (`fontes/instalacoes-nbr5410.html`)

Revisão de 2026-10-24: os 2 exemplos resolvidos e os 29 exercícios da apostila foram refeitos à mão; mais 2 exemplos
novos (3: escolha da seção pela queda unitária; 4: corrente de falta no TN e no TT). 41 contas em `contas`, inclusive a
legenda das figuras 2 e 8 e os distratores com número. Nenhuma conta estava errada. Conferidos: campo de aplicação
(1.000 V CA, 1.500 V CC; NBR 14039 de 1,0 a 36,2 kV); princípios; previsão de cargas de 9.5 (iluminação 100 VA + 60 VA
por 4 m² inteiros; TUG por 3,5 m e 5 m de perímetro; 600 VA até 3 pontos e 100 VA os demais, com a exceção dos 6
pontos; TUE a 1,5 m; circuito independente acima de 10 A; circuito misto até 16 A; tomadas de cozinha e área de serviço
em circuitos só delas); seções mínimas (1,5 / 2,5 / 0,5 mm²); capacidade no método B1 (17,5 / 24 / 32 / 41 A e 15,5 /
21 / 28 / 36 A); fatores de agrupamento (0,80 / 0,70 / 0,65 / 0,60); I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub> e
I<sub>2</sub> ≤ 1,45·I<sub>z</sub>; curvas B, C e D; princípio do DR e as suas limitações; lista de 5.1.3.2.2; cores
(N azul-claro, PE verde-amarelo ou verde, PEN azul-claro com anilhas); esquemas TN-S, TN-C, TN-C-S, TT e IT; seção do
PE (S, 16, S/2); equipotencialização principal e BEP; canalizações × eletrodo; neutro rompido (161 Ω e 16 Ω em série
sob 220 V: 200 V e 20 V).

| Id | Arquivo/estação | O que dizia | O que diz agora | Fonte |
|---|---|---|---|---|
| I1-1 | `instalacoes-nbr5410.html`, bloco 3, "Queda de tensão" → I1, seção 3 | "limita a queda total, contada da origem"; 7% (transformador ou gerador próprio); **5% a partir do ponto de entrega** em BT; 4% nos circuitos terminais, como se os três fossem igualmente certos | 6.2.7: 7% a partir dos terminais secundários do transformador MT/BT próprio (ou do da distribuidora, quando o ponto de entrega fica nele) ou do gerador próprio; 4% nos circuitos terminais "seja qual for a alimentação"; e **5% a partir do ponto de entrega, nos demais casos de fornecimento em baixa tensão** (6.2.7.1 c). Na T3c o 5% saiu com `confira` (a spec o tratava como não confirmado); na rodada de correção da revisão, por decisão do controlador, o `confira` saiu, porque o guia Prysmian transcreve 6.2.7.1 a–d com o 5% e o Manual Prysmian 2010 dá o mesmo limite. Também na aba Fórmulas e no cartão. O resumo do estudante dizia "4% do ponto de entrada até o ponto mais distante": isso não aparece em lugar nenhum da estação, e o V ou F 7 ensina que está errado. | Prysmian, [Guia de dimensionamento de cabos para baixa tensão, Rev. 9](https://br.prysmian.com/sites/default/files/atoms/files/Guia_de_Dimensionamento-Baixa_Tensao_Rev9.pdf), 6.1 (transcreve 6.2.7.1 a–d e a nota dos 4%); [Manual Prysmian de Instalações Elétricas](https://br.prysmian.com/sites/default/files/atoms/files/Manual_Instalacoes_Eletricas.pdf) (2010), cap. VI; Nambei, [Tabela do eletricista](https://api.aecweb.com.br/cls/catalogos/nambei/nambei_tabela_do_eletricista.pdf) (4% nos terminais) |
| I1-2 | `instalacoes-nbr5410.html`, exercício 5 do bloco 3 → I1, seção 3 | "alimentada em BT pela rede da distribuidora ... a partir do ponto de entrega ... respectivamente: 5% e 4%" | o gabarito dependia do valor sem confirmação; o exercício passou a ser o do transformador próprio (7% e 4%), com o 5% como distrator explicado | as de I1-1 |
| I1-3 | `instalacoes-nbr5410.html`, exercício 6 do bloco 3 → I1, seção 3 | motor com partida "em torno de 6 vezes a corrente nominal" → curva C (5 a 10 × I<sub>n</sub>) | com 6 × I<sub>n</sub>, a curva C (faixa de 5 a 10) também pode disparar: o enunciado era ambíguo. Agora: partida de cerca de **4 vezes a corrente nominal do disjuntor** (B pode disparar acima de 3; C só acima de 5), com um comentário para cada alternativa | IEC 60898-1 (faixas B > 3 a 5, C > 5 a 10, D > 10 a 20 × I<sub>n</sub>), as mesmas da figura 4 |
| I1-4 | `instalacoes-nbr5410.html`, bloco 5, caixa das canalizações | "O eletrodo preferencial é a armadura das fundações; na falta dela, **hastes**, fitas ou cabos enterrados" | as opções de 6.4.1.1.1, na ordem: de preferência, as armaduras do concreto das fundações; fitas, barras ou cabos imersos no concreto das fundações; malhas metálicas enterradas no nível das fundações, cobrindo a área da edificação; ou, no mínimo, anel metálico enterrado circundando o perímetro; malha e anel podem ser complementados por hastes verticais e/ou cabos radiais ("pés de galinha"). Haste sozinha não é opção. (Rodada de correção: a primeira versão omitia o anel, a alínea d, e ligava as hastes só à malha.) | texto de 6.4.1.1.1 reproduzido em [Gran Questões, engenharia civil, questão 3495050](https://questoes.grancursosonline.com.br/questoes-de-concursos/engenharia-civil-39/3495050) |
| I1-5 | `instalacoes-nbr5410.html`, bloco 3, quadro "Proteção contra sobrecarga" | "disjuntores conforme as normas usuais já atendem essa segunda condição" | "os disjuntores residenciais (NBR NM 60898) têm I<sub>2</sub> = 1,45·I<sub>n</sub>, então atendem essa segunda condição sempre que atendem a primeira" (não vale, por exemplo, para fusíveis gG) | NBR NM 60898 / IEC 60898-1 (corrente convencional de atuação 1,45·I<sub>n</sub>) |

Marcado com `confira`: a alínea das edificações não residenciais na lista do DR de 30 mA; a data "até outubro de 2026,
a nova edição não tinha sido publicada" (O Setor Elétrico, setembro de 2025, previa a 2ª consulta e a publicação até o
fim de 2026). Na rodada de correção da revisão, saíram os `confira` do 5% (ver I1-1), da seção mínima do PEN e da
proibição de DR no TN-C: o [Manual Prysmian de Instalações Elétricas](https://br.prysmian.com/sites/default/files/atoms/files/Manual_Instalacoes_Eletricas.pdf)
(2010), no quadro dos esquemas de aterramento, diz "TN-C só pode ser usado em instalações fixas com S ≥ 10 mm²" e "no
TN-C não podem ser utilizados dispositivos DR"; o texto do app ficou mais próximo dessas frases (o seccionamento
automático no TN-C fica com os dispositivos de sobrecorrente). O valor de 16 mm² em alumínio continua no texto (vem da
apostila e da IEC 60364-5-54); o manual traz só o 10 mm². Fonte dos 16 mm² em alumínio (acrescentada na T4): ABNT NBR
5410:1997, 6.4.6.2.1, "seção maior ou igual a 10 mm² em cobre ou a 16 mm² em alumínio, nas instalações fixas", conferida
na [cópia do texto de 1997](https://www.brasilpostos.com.br/wp-content/uploads/2013/09/5410-ABNT.pdf) e citada nas Fontes da I1.

Regra das canalizações (questão 59), agora com fonte: ABNT NBR 5410:1997, 6.4.2.2.4, "não devem ser usados como
eletrodo de aterramento canalizações metálicas de fornecimento de água e outros serviços, o que não exclui a ligação
eqüipotencial" ([cópia do texto de 1997](https://www.brasilpostos.com.br/wp-content/uploads/2013/09/5410-ABNT.pdf),
conferida); a regra se mantém na edição de 2004, segundo a
[pergunta frequente da Target sobre a NBR 5410:2004](https://www.normas.com.br/visualizar/genius-faq/2495/conforme-nbr5410-de-09-2004-podem-se-utilizar-as-canalizacoes-metalicas-de-agua-ou-outras-utilidades-como-eletrodo-de-aterramento)
(a página exige login; citada pela indicação do revisor).

Exercícios reescritos por originalidade (não são erro técnico): o exercício 3 do bloco 1 e o 6 do bloco 5 repetiam,
quase palavra por palavra, as alternativas das questões 55 e 59 de 2023. O 6 do bloco 5 virou a vistoria de uma casa
com o aterramento ligado só à tubulação de água. O 3 do bloco 1, depois da revisão (a primeira reescrita ainda seguia
as cinco alternativas da 55, e o gabarito repetia o do exercício 5), virou outro problema: associar disjuntor, DR e
DPS de um quadro aos princípios de proteção contra sobrecorrentes, choques e sobretensões.

Acrescentado para ensinar os padrões de 2023 (não são correções): caixa "o princípio com uma palavra trocada" (questão
55); quadro da queda unitária mais preciso (o valor de 14,3 V/(A·km) da tabela Nambei), a calculadora de comprimento
máximo, o exemplo 3 e a caixa de pegadinhas da queda (questão 45); faixa de atuação do DR (50% a 100% de
I<sub>Δn</sub>; catálogo [Crabtree](https://storage.electrika.com/flips/0170-crabtree-ind-07-a/files/assets/basic-html/page-76.html));
classes I, II e III de DPS e as correntes mínimas de 12,5 kA e 5 kA (O Setor Elétrico,
["Especificando minimamente um DPS"](https://www.osetoreletrico.com.br/?p=13779)); regras do PEN e do TN-C; caixa e
exemplo 4 sobre a corrente de falta no TN e no TT, com R<sub>A</sub>·I<sub>Δn</sub> ≤ U<sub>L</sub> = 50 V (questão 37;
tabela de R<sub>A</sub> máximo do Manual Prysmian, 1.667 Ω com 30 mA); caixa da sobretensão numa fase, com link para a
E3 (questão 42); exercício novo para a canalização (questão 59).

Ajustes de contexto: "Bloco 5" virou "seção 5"; "Antes de começar" virou "Escopo do edital e como a banca cobra", com
os itens 5.6, 8.1, 8.3 e 10.1, a situação da revisão da norma e as questões 37, 42, 45, 55 e 59 de 2023 conferidas no
caderno; a figura 6 (esquemas de aterramento) foi redesenhada em duas colunas, com rótulos de 14 px e legenda dos
condutores (a original, com 660 de largura e rótulos de 11 px, ficava ilegível a 390 px); a figura 3 usava a classe
`hl` sem estilo no app (preenchimento preto no tema escuro): agora é um fundo decorativo; o `<select>` de tensão da
calculadora de dimensionamento ganhou `value` nas opções.

## M3 · Máquinas rotativas, proteção e partidas (`fontes/maquinas-rotativas-protecao-partidas.html`, escrita para o app)

Onda 2 (2026-11-07). Estação nova, sem apostila do estudante: o aprofundamento foi escrito para o app no formato dos
outros, e **nenhuma fonte foi corrigida** (não há troca em `tools/estacoes/M3.mjs`). As 96 contas dos 9 exemplos
resolvidos, das figuras e dos 30 exercícios estão em `contas`; as 34 questões da aba Questões (30 exercícios + 4 extras,
revisão em `tools/banco/M3.mjs`) e os geradores `escorr`, `imotor` e `ydelta` (`js/gerador.js`) são conferidos por
`tests/questoes.test.mjs`. Fontes: guia de especificação de motores da WEG (velocidade síncrona e escorregamento,
rendimento, conjugado com 9.555, classes térmicas, fator de serviço, categorias N/H/D, estrela-triângulo com 25% a 33% e
comutação a 90%, taps de 50/65/80%, soft-starter, V/f e IGBT/PWM), notas de aula da UDESC (corrente na linha da
compensadora = k²·I<sub>p</sub>; K1/K2/relé = 0,58·I<sub>n</sub>, K3 = 0,33·I<sub>n</sub>; I<sub>F</sub> ≥ 1,2·I<sub>n</sub>;
coordenação tipos 1 e 2) e Chapman (máquinas síncronas e CC).

Decisões registradas (não são erros de fonte):
- Conjugado: o app ensina C ≈ 9.550·P(kW)/n, que é 60.000/(2π) = 9.549; o guia da WEG escreve 9.555. A diferença é de
  0,06% e o texto cita as duas.
- Estrela-triângulo: o app usa I<sub>n</sub>/√3 (≈ 0,58·I<sub>n</sub>) para K1, K2 e o relé e I<sub>n</sub>/3 (≈ 0,33·I<sub>n</sub>)
  para K3, sem a margem de 1,15 que as notas da UDESC aplicam na escolha do contator (citada no texto como prática de
  aula).

Marcado com `confira`: a faixa típica da corrente de partida dos motores de gaiola, "da ordem de 5 a 8 vezes a nominal"
(o guia da WEG mostra cerca de 6 vezes na figura 3.9 e remete à placa, I<sub>p</sub>/I<sub>n</sub>, e às tabelas da NBR 17094;
não achei a faixa escrita numa fonte confiável).

Revisão independente de 2026-11-10 (correções na fonte e em `tools/banco/M3.mjs`): (1) exercício `b2:0`, alternativa D: dizia "51,5% usa 8 como número de pares de polos"; agora diz que o erro é pôr os 4 pares de polos na fórmula 120·f/p, que pede o número de polos (com 8 pares, n<sub>s</sub> seria 450 rpm, e não 1.800 rpm). (2) "rotor travado" saiu da lista de causas de sobrecarga leve: rotor travado puxa a corrente de partida, de 5 a 8 vezes a nominal. (3) A rampa da soft-starter ("2 a 30 s"), as categorias de emprego e a classe de disparo 10 ganharam `confira`: a IEC 60947-4-1 não foi lida no texto integral. (4) AC-15 é categoria da IEC 60947-5-1, dito na explicação do exercício `b5:1`.

## A2 · Automação, CLP e controle (`fontes/automacao-clp-controle.html`, escrita para o app)

Onda 2 (2026-11-10). Estação nova, sem apostila do estudante (itens 9.3 a 9.5): o aprofundamento foi escrito para o app e **nenhuma fonte foi corrigida** (não há troca em `tools/estacoes/A2.mjs`). As contas dos exemplos resolvidos e dos exercícios estão em `contas`; as 34 questões da aba Questões (exercícios das seções mais extras, revisão em `tools/banco/A2.mjs`) são conferidas por `tests/questoes.test.mjs`. Calculadoras: `escala-analogica`, `pullup-clp` e `routh-3`.

Fontes: UFRN/IMD (componentes e ciclo do CLP), Pepperl+Fuchs (PNP e NPN), M. Peet/ASU (Routh-Hurwitz: para s³ + a s² + b s + c, estável se a > 0, c > 0 e b > c/a, o mesmo que K < a·b), Ogata (Laplace, malha fechada, ações P, I e D) e Franchi e Camargo (CLP). O estilo de cobrança vem das questões 35, 36, 50 e 51 da prova de 2023.

Decisões registradas (não são erros de fonte):
- Resolução do conversor A/D: o app divide a faixa por 2<sup>n</sup>; alguns livros usam 2<sup>n</sup> − 1 (diferença de 0,02% com 12 bits). O texto cita as duas.
- Pull-up: R<sub>máx</sub> pela tensão mínima do nível ALTO (divisor com R<sub>in</sub>) e R<sub>mín</sub> pela potência do resistor com a chave fechada; o resistor testado precisa atender às duas.

Marcado com `confira`: detalhes de camada física e velocidade das redes industriais; a nomenclatura sink/source dos cartões de entrada; a retirada da linguagem IL na edição de 2025 da IEC 61131-3 (norma não lida no texto integral); a ligação do PNP e do NPN segundo a Pepperl+Fuchs (lida só no trecho mostrado pela busca); a base de tempo e o RTO, que variam por fabricante.

Revisão independente de 2026-11-10 (subagente, só leitura; contas dos exemplos, das calculadoras e das 34 questões refeitas, sem erro numérico). Corrigido: (1) exercício `b6:2`, o distrator "20 s" não saía de conta nenhuma e virou "24 s" (uma peça por segundo); (2) exercício `b6:0`, a alternativa D descreve o pulso do TP, e não o TOF, e a E não é de nenhum bloco padrão; (3) fórmula `a2-mf` da Biblioteca, explicação do distrator G·H/(1 + G); (4) `confira` em "o mais comum no Brasil" (entrada que pede PNP) e nas cores dos fios do sensor. O gabarito dos exercícios caía na letra B em 17 de 32: dez exercícios tiveram duas alternativas trocadas de lugar (agora A 5, B 7, C 9, D 6, E 5), sem mudar o texto delas. Não corrigido: a contagem da calculadora do A/D usa 2<sup>n</sup> − 1 e a resolução usa 2<sup>n</sup> (o texto explica as duas convenções).

## N1 · Segurança, NR-10 e manutenção (`fontes/seguranca-nr10-manutencao.html`, escrita para o app)

Onda 3 (2026-11-11). Estação nova, sem apostila do estudante (itens 6, 10.2 a 10.4): **nenhuma fonte foi corrigida**; as 41 contas (corrente de choque, MTBF, MTTR, disponibilidade, raios do Anexo II) estão em `contas`; as 35 questões (32 exercícios + 3 extras, `tools/banco/N1.mjs`) são conferidas por `tests/questoes.test.mjs`. Base normativa: `fontes/nr10-2019-x-2026.md` e `data/nr10.js` (texto do gov.br); a estação ensina a NR-10 de 2019, **vigente em 29/11/2026, e avisa onde a Portaria MTE 737/2026 (vale a partir de 01/06/2027) muda**. Os erros da apostila já listados nesta errata (qualificado × habilitado, ordem 1-9 das medidas de controle, "reenergização é a ordem inversa", zona controlada de 2027, 75 kW e reciclagem bienal só até 31/05/2027) não foram reintroduzidos.

Marcado com `confira` (18 pontos): que a banca cobre o texto de 2019; a definição de higiene do trabalho; o termo "incidente"; limiares em corrente contínua; faixas de corrente de choque (IEC 60479-1); resfriar queimadura com água corrente; extintor de CO₂ ou pó para equipamento energizado; "um cadeado por pessoa"; capacete classe B; calçado de eletricista; definição de ATPV; tensão de uso das luvas × tensão entre fases; ART e TRT; definições de defeito e falha da NBR 5462; justificativa do XLPE na questão 47 de 2023.

Limites conhecidos: muitos itens da NR-10 citados nas seções 1 a 7 (10.3.x, 10.4.x, 10.9.5, 10.11.x, 10.12.x) não estão em `fontes/nr10-2019-x-2026.md` nem em `data/nr10.js`; foram conferidos, existência e redação, no texto oficial de 2019 pela revisão independente de 2026-11-11.

Revisão independente de 2026-11-11 (Fable, só leitura; NR-10 de 2019 comparada com o PDF do gov.br, sem erro de número ou redação; 41 contas e 35 questões refeitas sem erro): corrigidos (1) "disjuntor protege o cabo, o DR protege a pessoa", falso como regra geral (em TN o disjuntor também faz o seccionamento automático; a Q37 de 2023 cobra isso); (2) o Prontuário "75 kW": a Q44 de 2023 escreveu "75 kVA" e manteve o Prontuário como resposta, e o texto agora diz isso; (3) atribuições a fabricantes sem fonte (10.000 V da Ega Master, não da Gedore; CAT III 600 V; Ritz; Kardec e Nascif lido em fonte secundária) com `confira`; (4) "capacitado é quem não tem o curso formal", que o 10.8.3 não diz; (5) "continua sendo tratada como energizada", reescrito para 10.5.1 e 10.5.4; (6) zona livre com a instrução formal do 10.8.9; (7) alternativa do exercício b8:2 e explicação do b7:0. Não corrigido: a tabela de efeitos da corrente (IEC 60479-1) segue com `confira`; o revisor aponta limite de largar de 5 mA e fibrilação perto de 40 mA em choque longo, contra 10 mA e 30 mA do texto; verificar antes de depender desses números.

## X1 · Números, proporções e matemática financeira (`fontes/matematica-numeros-proporcoes-juros.html`, escrita para o app)

Onda 3 (2026-11-11). Primeira estação de Matemática (Mat 1, 2 e 8), sem apostila do estudante; **nenhuma fonte foi corrigida**. As 207 contas dos 28 exemplos, das figuras e dos exercícios estão em `contas`; as 32 questões (`tools/banco/X1.mjs`) trazem `conta`, e cada distrator reproduz uma conta errada nomeada. O campo `hab` das questões é "Mat 1", "Mat 2" ou "Mat 8" (o Painel casa pelo id do edital), e `tests/questoes.test.mjs` aceita esse formato.

Fontes: UEL, UDESC (SABERMAT) e UFV (CEAD), abertas só no sumário e nas primeiras páginas, e por isso com `confira`; IFPR, Iezzi e Dante não foram consultados. A questão 16 de 2023 (velocidade e tempo, regra de três inversa) é de Mat 2, mas `data/embreve.js` a atribui à X2.

Revisão independente de 2026-11-11 (Fable, só leitura; 207 contas, 32 questões e distratores refeitos sem erro de gabarito): corrigidos (1) explicação do distrator `x1-taxa` ("taxa simples aproximada" estava errada); (2) alternativa "0,024 m" da questão de escala, que na verdade é 0,024 cm; (3) lacuna didática: o método de comparar potências agora inclui igualar a base, que a questão 11 de 2023 exige junto com o expoente; (4) notação de p na fórmula do fator multiplicativo, unificada com a teoria (forma decimal); (5) glossário (dízima periódica simples, razão inversa), resumo, V ou F de taxa equivalente e o texto sobre a questão 12 de 2023.

## X2 · Funções, equações e geometria (`fontes/matematica-funcoes-equacoes-geometria.html`, escrita para o app)

Onda 3 (2026-11-12). Mat 3, 4, 9 e 10; sem apostila do estudante; **nenhuma fonte foi corrigida**. 152 contas em `contas`; 32 questões com `conta` (`tools/banco/X2.mjs`). Fontes realmente abertas: UEL (equação do 2º grau, logaritmos e exponencial, só o início) e, pela revisão, Brasil Escola (ângulos notáveis), Colégio CEMP e Revisa Goiás (relações métricas) e Mundo Educação (cone). Pitágoras, áreas, prisma, cilindro, pirâmide e esfera ficaram sem página aberta e seguem com `confira` na seção Fontes.

Revisão independente de 2026-11-12 (duas passadas, ambas rotuladas `claude-sonnet-5-5`, **não Opus**, apesar de a configuração pedir Opus; sem erro de conta ou de gabarito): corrigidos o texto do distrator de `x2-expo` (descrevia o exponencial como se fosse o linear), símbolos `g` e `d` em `x2-cone`, o resumo (esfera; "base positiva"), duas explicações do banco e as promessas de cobertura da questão 16 (regra de três inversa, está na X1) e da 18 (resto da divisão, sem exercício aqui). Não corrigido: `secoes` do banco mapeia b1, b4 e b5 só a Mat 3 e b3 só a Mat 4, embora cada seção trate dos dois; a Biblioteca não tem fórmula de Pitágoras, logaritmo nem áreas e volumes além do cone.

## X3 · Contagem, probabilidade e estatística (`fontes/matematica-contagem-probabilidade-estatistica.html`, escrita para o app)

Onda 3 (2026-11-12). Mat 5, 6 e 7; **nenhuma fonte foi corrigida**. 110 contas; 32 questões (`tools/banco/X3.mjs`). Fontes abertas só parcialmente (Silveira, Bussab e Morettin, Barbetta), todas com `confira`. A questão 13 de 2023 dividiu a variância por N (10); a estação ensina N e diz que N − 1 só vale se o enunciado disser "amostra".

Revisão independente de 2026-11-12 (duas passadas em Sonnet, sem erro de conta): corrigidos o distrator de `x3-comb` (a nota "só vale para p = 2" era falsa), o uso de "chance" como favoráveis ÷ desfavoráveis (agora "razão de chances", com `confira` de que em enunciado costuma ser sinônimo de probabilidade), a dica de √2 em `b8:1`, a regra da variância, "Na prova não há calculadora" (`confira`: não achei no edital) e a moda multimodal. Não incluído: histograma com classes de larguras diferentes, polígono de frequência e ogiva.

## A1 · Eletrônica analógica e digital (`fontes/eletronica-analogica-digital.html`, escrita para o app)

Onda 4 (2026-11-12). Estação nova (itens 9.1 e 9.2): o aprofundamento foi escrito para o app e **nenhuma fonte foi corrigida**. As contas dos exemplos e dos exercícios estão em `contas` (107); as 34 questões estão em `tools/banco/A1.mjs`, com letras corretas A 7, B 6, C 6, D 8, E 7.

Fontes: texto do edital (Anexo IV, itens 9.1 e 9.2), questões 31 e 34 da prova de 2023 (só para o estilo de cobrança) e a bibliografia citada ao fim da fonte (Malvino e Bates, Boylestad e Nashelsky, Tocci, Idoeta e Capuano). **As fórmulas foram deduzidas e recalculadas no app, sem consulta ao texto integral desses livros**; o texto manda conferir a ondulação do filtro (V<sub>r</sub> = I/(f<sub>r</sub>·C)) e a do SCR (V<sub>p</sub>(1 + cos α)/(2π)).

Marcado com `confira`: valores típicos de folha de dados (queda e corrente do LED, queda mínima do 7805, famílias TTL).

Decisão de formato: nas alternativas que só diferem por barras de negação (De Morgan), cada barra leva o texto oculto "não" para leitores de tela e para o teste de alternativas repetidas.

Revisão independente de 2026-11-12 (subagente Opus, só leitura; as 107 contas e as 34 questões refeitas, gabarito das questões 31 e 34 de 2023 conferido contra o oficial). Corrigido: (1) exemplo resolvido 9, 42,87 V virou 42,88 V; (2) as barras de negação (De Morgan) ganharam texto oculto \"não\" em toda a fonte, nos cartões e nas explicações, para leitor de tela; (3) tiradas ou suavizadas afirmações sem fonte (\"NPN é o mais comum\", NAND por causa dos circuitos integrados, \"a prova costuma citar\", \"outras provas\"); (4) redação do secundário do transformador, do complemento de dois e do flip-flop (JK ou T). **Não corrigido:** o mapa de Karnaugh ocupa uma frase só, sem exemplo nem exercício.

## I3 · Medidas, retificadores, baterias e no-breaks (`fontes/medidas-retificadores-baterias-nobreaks.html`, escrita para o app)

Onda 4 (2026-11-12). Estação nova (itens 7.1, 7.3 e 7.4): **nenhuma fonte foi corrigida**. Contas em `contas`; 30 questões em `tools/banco/I3.mjs` (6 de cada letra).

Fontes: edital, questões 40 e 43 de 2023 (só estilo), NBR 5410 (tabela 60 e tensão aplicada), IEEE 43-2013 (IP, correção para 40 °C), Fluke (categorias CAT, IEC 61010-1), AEMC (queda de potencial, 62%), Socomec e IEC 62040-3 (VFD, VI, VFI), fabricantes de baterias VRLA e práticas IEEE 450, 1106 e 1188. **As normas foram lidas em artigos técnicos e resumos públicos, e não no texto integral**; o texto marca a diferença. O valor de compensação de temperatura (2 a 5,5 mV/°C por célula) é de fabricantes; vale o do modelo instalado.

Revisão independente de 2026-11-12 (subagente Opus, só leitura; as 68 contas e as 30 questões refeitas, questões 40 e 43 de 2023 conferidas contra o gabarito oficial). Corrigido: (1) a frase sobre as questões de 2023 no item 7 (a 60 é do 7.2, ensinada na M2); (2) distrator da bateria VRLA que chamava 28,8 V de \"equalização\" (VRLA não tem equalização separada); (3) PIV da meia onda com filtro capacitivo (2·V<sub>p</sub>); (4) o zener é regulador em paralelo, e não em série; (5) tabela 60 vale para SELV e PELV; (6) limite em kW do no-break; (7) lítio-ferro-fosfato (3,2 V); (8) `confira` na recomendação de não ligar motores a UPS e \"aproximadamente\" na regra de dobrar a cada 10 °C. **Não corrigido:** o distrator \"estabilizador de tensão com bateria\" (b6:0) não é categoria definida no texto, e a \"conversão simples\" da Q43 de 2023 não é explicada; a nota de que a CAT I saiu da IEC 61010-2-030; o `peso2023: 3` da I3 (convenção do item 7 inteiro; o `mapa2023` dá 2).

## I2 · Média tensão (1,0 a 17,5 kV) e SPDA (`fontes/media-tensao-spda.html`, escrita para o app)

Onda 4 (2026-11-12). Estação nova (itens 8.2 e 8.4): **nenhuma fonte foi corrigida**. Contas em `contas` (51); 30 questões em `tools/banco/I2.mjs` (6 de cada letra).

Fontes: edital, questões 46 e 54 de 2023 (só estilo; a 54, de TC, e a 46, de MPS), NR-10 (texto em vigor e Portaria 737/2026, conferidos pela comparação do repositório e pela tabela do Anexo II), materiais didáticos (UDESC), artigos e especificações de concessionárias (Equatorial). **A NBR 5419 (2015 e 2026), a NBR 14039, a NBR 15688 e a NBR 15992 não foram lidas no texto**; os valores vêm de materiais que as reproduzem, e a lista de Fontes diz isso. Pegadinha no texto: na NR-10 em vigor, 13,8 kV é \"alta tensão\"; a faixa de média tensão só vale a partir de 01/06/2027.

Marcado com `confira`: origem do limite de 17,5 kV no edital; engastamento e = L/10 + 0,6 m; emprego dos isoladores; relação de rapidez; seccionadora só abre sem carga; operações do religador e contagem do seccionalizador; classes de exatidão de TC e TP; faixa de 93% a 105% da tensão (PRODIST não lido); ordem das manobras e métodos de linha viva; correntes de pico dos níveis e R = 10·I<sup>0,65</sup>; ângulos do método de Franklin; eletrodo, anel e 10 Ω (edição de 2005); intervalos de inspeção de 1 e 3 anos.

Revisão independente de 2026-11-12 (subagente Opus, só leitura; as 51 contas e as 30 questões refeitas, questões 46 e 54 de 2023 conferidas contra o gabarito oficial e as imagens). Corrigido: (1) a coluna 98/95/90/80% da tabela de níveis é a eficiência do SPDA (1 − P<sub>B</sub>, valores da edição de 2005), e não a probabilidade de interceptação, e foi renomeada com `confira`; (2) questão x7 tinha duas alternativas defensáveis (espaçamentos de 2005 e de 2015) e a eficiência de 98%: agora cita a NBR 5419:2015 e usa a corrente de pico de 200 kA e a esfera do nível III; (3) a pegadinha da seção 6 agora diz partes 1, 2 e 3; (4) explicação do `cos α` na fórmula i2-ang; (5) wattímetros e medidores de energia usam TC e TP; (6) \"sempre o religador\" passou a valer só no par religador–seccionalizador (a chave fusível também interrompe a falta); (7) \"a montante\" sem crase; (8) curso complementar do SEP só para quem atua no SEP; (9) o enunciado de b6:1 não cita mais o item 7.3.2. **Não corrigido:** os ângulos de Franklin de 25/35/45/55° são da edição de 2005 (a de 2015 usa uma curva; para h = 10 m nos níveis III e IV o ângulo é maior), e o exemplo resolvido 15 os usa como dado do problema; a opção E de x3 (para-raios de 15 kV em rede de 13,8 kV) depende do aterramento do sistema; o `peso2023: 6` do stub original segue a convenção do item 8 inteiro (o `mapa2023` dá 2 à I2).

## P1 · Língua Portuguesa (`fontes/lingua-portuguesa.html`, escrita para o app)

Onda 4 (2026-11-12). Primeira estação do bloco de Português (itens 1 a 8 do Anexo IV; vol `PT`, linha `P`), criada porque 10 das 60 questões são de Português e zerar Português ou Matemática elimina. Sem apostila do estudante; **nenhuma fonte foi corrigida**. Textos de interpretação originais; 32 questões (`tools/banco/P1.mjs`, `hab` "Port 1" a "Port 8"). Fontes abertas: Decreto 6.583/2008 (Acordo Ortográfico), FUNAG (vírgula e porquês), UFMA (crase), portugues.com.br (coesão), Clique Vestibular (concordância); o VOLP e as gramáticas de Bechara, Cegalla e Cunha e Cintra **não foram consultados**, e o texto leva `confira` onde só havia trecho de busca.

Mudanças no app para receber o bloco: linha P no mapa, anel e estatística de Português na tela inicial, foco "Português" no Simulado (1/6 da prova nas proporções "tudo"), cor própria, `hab` "Port N" aceito pelo teste de questões, edital com os 8 itens de Português, `contas` vazio permitido para `vol` PT. O `mapa2023` continua com Português `null`.

Revisão independente de 2026-11-12 (rotulada `claude-sonnet-5-5`, **não Opus**, apesar de a configuração pedir Opus; os 32 gabaritos conferidos, sem segunda alternativa defensável): corrigidos (1) comparação errada em `b2:2` D (obsessão tem ss; ascensão e pretensão têm s); (2) regra de acento sem o ditongo crescente (história, série, água); (3) "r e s dobram" sem a condição de prefixo em vogal e sem hiper-/inter-/super- + r com hífen; (4) metonímia ("ler Machado" é autor pela obra); (5) alternativa de crase "a distância", discutível (Houaiss tolera crase), trocada por "a pé"; (6) duas explicações de `b8:1` e "português (idioma)"; (7) `confira` do corte do item 7.1.4.3 resolvido pelo edital, e `confira` na exceção senhora/senhorita/dona. Não corrigido: a P1 tem só 8 das 32 questões de interpretação e coesão sobre texto, contra 6 das 10 na prova de 2023, e falta o formato "referente entre colchetes", "conectivo para juntar períodos" e concordância nominal com particípio e dois substantivos de gêneros diferentes; concordância com sujeito composto sem as exceções de "ou" e "nem um nem outro"; descriminar/discriminar e emigrar/imigrar; o VOLP não foi consultado.

## C1 · Complementos de Elétrica (`fontes/complementos-eletrica.html`, escrita para o app)

Onda 4 (2026-11-12). Reúne temas que caíram em provas anteriores da Transpetro (2008, 2011, 2012, 2018) e só eram citados nas outras estações: transitório RC/RL, eletrostática, motor de 12 terminais e monofásico, TC e TP, sensores e 4-20 mA, cargas monofásicas em rede trifásica e dois wattímetros, Karnaugh, reatores e fotovoltaico. 32 questões, 104 `contas`, 12 figuras. Os temas vêm da classificação do PV Concursos, que não é oficial. Fontes lidas só por trechos de busca (WEG, UFPR, UDESC, NBR 6856 por resumos, fabricantes de sensores); RC/RL, Coulomb, Gauss e Karnaugh são de livro-texto, sem página aberta, e os exemplos foram recalculados. `confira` em: números de questão de provas, redução a 1/4 na partida série-paralelo, 75–80% da rotação do capacitor de partida, motor universal, classes de medição do TC, saturação (V = F·Is·Zs), Aron só a 3 fios e fator de potência do reator eletrônico.

Revisão independente de 2026-11-12 (rotulada `claude-sonnet-5-5`, não Opus): nenhum gabarito nem conta errados (104 `contas` da C1 recalculadas; Karnaugh por força bruta; X1/X3/P1 recalculados). Corrigidos: classes de medição do TC (NBR 6856:2015 mantém 0,3/0,6/1,2/3 e acrescenta 0,3S e 0,6S; 0,1/0,2/0,5/1 são da IEC); cargas do TC (C2,5, C5, C12,5, C22,5, C45, C90 com fp 0,9 e C25 a C200 com fp 0,5); afirmação de que RC/RL e sensores caíram em prova; restrição da série-paralelo a 220 V; 1/3 da estrela-triângulo como valor ideal; ogiva "nunca desce"; polígono pelos pontos médios; texto de P1 sem "a maioria dos apagões"; vírgula em P1 x5; exemplo da teoria de concordância nominal diferente do gabarito. Não corrigido (baixo risco): explicações fracas de alternativas em C1 b3:2 B, b2:3 A, b1:0 E; X3 x5 sem dizer populacional; convenção de prazo fracionário na X1; NBR 6856 lida só em trechos; chave centrífuga a 75–80% sem fonte WEG.

Extras da mesma onda: X1 ganhou tempo e taxa em juros compostos e taxa proporcional × equivalente (6 questões); X3 ganhou histograma, polígono, ogiva, setores, amplitude e variância por classes (5 questões, Figura 5); P1 ganhou texto com parágrafos numerados, referente, conectivo e concordância nominal e com "ou" (8 questões). Escritas por modelo menor; ver a linha de revisão abaixo.

## Banco de questões (`fontes/banco-de-questoes.html` → `data/questoes.js`, aba Questões das estações e Treino)

Revisão de 2026-10-25 (T4). As 205 questões do banco (158 "das apostilas" e 47 do próprio banco) passaram por revisão
de gabarito: cada conta foi refeita à mão, e as 80 questões de cálculo têm a conta registrada em `tools/banco/T*.mjs`
(campo `conta`); o teste `tests/questoes.test.mjs` recalcula cada uma (1%), confere que o número está na alternativa
correta e, nas alternativas só numéricas, que nenhuma errada dá o mesmo valor. **Nenhum gabarito estava errado.**

As 158 questões das apostilas são os exercícios do fim de cada seção. Elas entram com o texto já corrigido nas
estações (as trocas de `tools/estacoes/<id>.mjs`), então as erratas das estações valem também aqui: M2-1 (teste de
polaridade), e as reescritas da I1 (exercícios 3 do bloco 1, 5 do bloco 1, 5 e 6 do bloco 3 e 6 do bloco 5), da E1
(exercício 6 do bloco 5, E1-2) e da M2 (exercício 1 do bloco 3).

Cada alternativa errada ganhou uma explicação própria dizendo qual erro leva a ela (o banco só tinha o comentário da
correta e, em 47 questões, etiquetas de erro em parte das alternativas). As 15 questões de clicar na figura (`hot`) e
de ordenar (`ord`) viraram múltipla escolha, porque o app não tem esses tipos: as de figura mantêm a figura (a mesma
das estações, já revisada) e perguntam pelo elemento; as de ordenar listam as etapas em I a V e pedem a sequência.

| Id | Questão(ões) | O que dizia | O que diz agora | Fonte |
|---|---|---|---|---|
| BQ-1 | `a:T1:b1:3`, `a:T1:b5:1`, `a:T2:b6:2`, `a:T2:b6:4`, `a:T2:b7:1`, `a:T4:b2:2`, `a:T4:b3:1`, `a:T4:b4:3`, `a:T5:b2:2`, `a:T5:b3:3`, `f:t2:6` (distratores) | alternativas erradas que não saem de nenhum erro identificável, ou que não batem com a conta que as explica: 45°; 880 var; 95,0% (a conta dá 95,2%); 40% da nominal; 682 A (a conta dá 683,7 A); 0,5 A; 600 A; 8 V; 1.300 VA; 25,4 m, 31,8 m e 50,8 m; 10 kA e 50 kA | trocadas por valores que saem de um erro típico, explicado na alternativa: 50° (usou 50 Hz); 984 var (esqueceu de elevar o FP ao quadrado); 95,2% (perdas contadas em dobro); 20% (P<sub>Fe</sub>/(P<sub>Fe</sub> + P<sub>Cu</sub>)); 684 A (√3 multiplicando); 1,5 A (ignorou o ramo de 6 Ω); 2.880 (calculou a potência no curto, E²/r); 7,5 V (sentido da fonte dependente trocado); 1.400 VA (600 VA em só dois pontos); 10 m (4% tratado como 4 V), 22 m (4% de 220 V) e 254 m (esqueceu a corrente); 1 kA (curto limitado à nominal) e 34,6 kA (√3 a mais). Gabaritos iguais; a letra mudou em `a:T4:b2:2` (B → A) e `a:T5:b3:3` (B → C). As trocas das questões das apostilas são feitas nas estações (`trocas` com `errata: 'BQ-1'`), e o exercício da Teoria fica igual ao da aba Questões | regra 3 do `AGENTS.md` (cada alternativa diz qual erro leva a ela); contas em `tools/banco/T*.mjs` |
| BQ-2 | `o:t2:pol` (ordenar as etapas do teste de polaridade) | "Interligar os terminais H1 e X1 com um jumper"; "Medir a tensão entre H2 e X2" | "Interligar H1 ao terminal de baixa tensão adjacente a ele"; "Medir a tensão entre H2 e o outro terminal de baixa tensão" (a mesma correção de M2-1: o teste serve para descobrir qual é o X1) | as de M2-1 |
| BQ-3 | geradores do banco (`const GEN`) → `js/gerador.js` | `disj`: caso I<sub>B</sub> = 22 A, I<sub>z</sub> = 24 A com disjuntor de **24 A**; `pe`: fases de 95, 120 e 150 mm² (PE = S/2 = 47,5, 60 e 75 mm², seções que não existem); alternativas completadas com múltiplos do valor certo (×1,5, ×0,5, ×2…) sem erro que leve a elas; `res`: distratores ×10 e ÷10 atribuídos a "unidade"; `nodal`: o sorteio podia sair, depois de 200 tentativas, com E<sub>1</sub> não inteiro; `idx`: distrator "atrasada h × 60°" | `disj`: I<sub>B</sub> = 23 A, I<sub>z</sub> = 26 A, disjuntor de 25 A (série usual de 2 a 125 A, com distratores só entre I<sub>B</sub>/2 e 2·I<sub>z</sub>); `pe`: questão de pares fase/PE (cinco fases diferentes de 10 a 70 mm², em ordem crescente; cada par errado aplica mal uma faixa da tabela 58); sem enchimento: todo distrator sai de um erro com tipo e explicação (o teste exige 5 alternativas válidas em 100 sorteios); `res`: erros reais de prefixo (L em H, C em nF, fator √1000) e "esqueceu a raiz"; `nodal` sorteia entre as combinações válidas; `idx`: cada defasagem errada explicada pelo índice a que corresponde | NBR 5410, tabela 58 (seção do PE) e coordenação I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub> (5.3.3.2 no [texto de 1997](https://www.brasilpostos.com.br/wp-content/uploads/2013/09/5410-ABNT.pdf)), como na I1; série de correntes nominais de minidisjuntores (IEC 60898) |
| BQ-4 | exercício 2 da seção 4 da I1 (`a:T5:b4:1`), comentário | "Dormitórios e salas não estão na lista obrigatória da versão vigente (a revisão em andamento discute ampliá-la)." | a parte sobre a revisão da norma leva `confira`: a fonte citada na I1 (O Setor Elétrico, set/2025) trata do andamento da revisão, não da lista de locais com DR | regra 1 do `AGENTS.md` |

Ajustes de redação (sem erro técnico): no comentário de `a:T1:b6:5`, "(figura 8)" virou "(veja o diagrama fasorial da
estrela na Teoria)", porque a numeração da apostila não vale na aba Questões; o enunciado de `a:T2:b6:5` diz a
referência da regulação ("em relação à tensão em plena carga"); o comentário de `f:t3:1` perdeu uma frase solta. Nas
cópias das figuras usadas nas questões (só na aba Questões; as estações ficam como estão), saíram os rótulos que davam
a resposta: a fórmula de V<sub>AB</sub> e o ângulo de 30° (CA_FAS), "não muda" (CA_POT), B<sub>r</sub>, −H<sub>c</sub>,
"saturação" e a legenda da área (MG_HIST, com os pontos marcados P e Q), as perdas de cada ensaio (MG_EQ), "comando de
abertura" (SB_SUB) e as descrições dos esquemas (IN_ESQ).

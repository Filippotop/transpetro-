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
| BQ-1 | `a:T1:b5:1`, `a:T2:b6:4`, `a:T4:b2:2`, `a:T5:b3:3`, `f:t2:6` (distratores) | alternativas erradas que não saem de nenhum erro identificável: 880 var; 40% da nominal; 0,5 A; 25,4 m, 31,8 m e 50,8 m; 10 kA e 50 kA | trocadas por valores que saem de um erro típico, explicado na alternativa: 984 var (esqueceu de elevar o FP ao quadrado); 20% (P<sub>Fe</sub>/(P<sub>Fe</sub> + P<sub>Cu</sub>)); 1,5 A (ignorou o ramo de 6 Ω); 10 m (4% tratado como 4 V), 22 m (4% de 220 V) e 254 m (esqueceu a corrente); 1 kA (curto limitado à nominal) e 34,6 kA (√3 a mais). Gabaritos iguais; a letra mudou em `a:T4:b2:2` (B → A) e `a:T5:b3:3` (B → C) | regra 3 do `AGENTS.md` (cada alternativa diz qual erro leva a ela); contas em `tools/banco/T*.mjs` |
| BQ-3 | geradores do banco (`const GEN`) → `js/gerador.js` | `disj`: caso I<sub>B</sub> = 22 A, I<sub>z</sub> = 24 A com disjuntor de **24 A**; `pe`: fases de 95, 120 e 150 mm² (PE = S/2 = 47,5, 60 e 75 mm², seções que não existem); alternativas completadas com múltiplos do valor certo (×1,5, ×0,5, ×2…) sem erro que leve a elas; `res`: distratores ×10 e ÷10 atribuídos a "unidade"; `nodal`: o sorteio podia sair, depois de 200 tentativas, com E<sub>1</sub> não inteiro; `idx`: distrator "atrasada h × 60°" | `disj`: I<sub>B</sub> = 23 A, I<sub>z</sub> = 26 A, disjuntor de 25 A (série usual 6–10–13–16–20–25–32–40–50–63 A); `pe`: fases de 4 a 70 mm²; sem enchimento: todo distrator sai de um erro com tipo e explicação (o teste exige 5 alternativas válidas em 100 sorteios); `res`: erros reais de prefixo (L em H, C em nF, fator √1000) e "esqueceu a raiz"; `nodal` sorteia entre as combinações válidas; `idx`: cada defasagem errada explicada pelo índice a que corresponde | NBR 5410, tabela 58 (seção do PE) e coordenação I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub> (5.3.3.2 no [texto de 1997](https://www.brasilpostos.com.br/wp-content/uploads/2013/09/5410-ABNT.pdf)), como na I1; série de correntes nominais de minidisjuntores (IEC 60898) |
| BQ-2 | `o:t2:pol` (ordenar as etapas do teste de polaridade) | "Interligar os terminais H1 e X1 com um jumper"; "Medir a tensão entre H2 e X2" | "Interligar H1 ao terminal de baixa tensão adjacente a ele"; "Medir a tensão entre H2 e o outro terminal de baixa tensão" (a mesma correção de M2-1: o teste serve para descobrir qual é o X1) | as de M2-1 |

Ajustes de redação (sem erro técnico): no comentário de `a:T1:b6:5`, "(figura 8)" virou "(veja o diagrama fasorial da
estrela na Teoria)", porque a numeração da apostila não vale na aba Questões; em `a:T2:b7:1`, o distrator
√3 × 150.000/380 = 683,7 A aparecia como "682 A" e passou a "684 A".

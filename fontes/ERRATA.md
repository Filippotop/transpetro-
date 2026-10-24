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
| E3-1 | `circuitos-ca-trifasicos.html`, bloco 5, "Por que o fator de potência baixo é um problema" → E3, seção 1 | "a regulação da ANEEL estabelece um fator de potência de referência de 0,92, abaixo do qual **o consumidor atendido nessas condições** paga pelo excedente de reativos" | "a regulação da ANEEL (Resolução Normativa nº 1.000/2021) fixa o fator de potência de referência em 0,92, **indutivo ou capacitivo**: as unidades consumidoras do **grupo A** (atendidas em média ou alta tensão, como indústrias) que ficam abaixo dele pagam pelo excedente de reativos. Consumidores do grupo B (baixa tensão, como residências) não têm essa cobrança." O texto antigo deixava a entender que a cobrança vale para qualquer consumidor. | ANEEL, REN nº 1.000/2021, seção VIII ("Do fator de potência e do reativo excedente"), arts. 302 e 303, citados em [O Setor Elétrico, "A Resolução 1000 da Aneel"](https://www.osetoreletrico.com.br/?p=42765); confira os números dos artigos no texto oficial da ANEEL se for citá-los |
| E3-2 | `circuitos-ca-trifasicos.html`, bloco 5, quadro "Fator de potência" → E3, seção 1 | FP = cos φ = P/S, sem ressalva | Acrescentado: "FP = cos φ vale com tensão e corrente senoidais; com correntes distorcidas (harmônicos), FP = P/S continua valendo e fica menor que cos φ". Os instrumentos da E2 já falam de ondas distorcidas (inversores, fontes chaveadas), e o estudante não pode sair achando que as duas definições são sempre iguais. | Alexander e Sadiku, cap. 11 (potência em CA: FP = P/S); IEEE Std 1459 (fator de potência total = fator de deslocamento × fator de distorção, com tensão senoidal) |

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

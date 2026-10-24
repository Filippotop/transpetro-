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
| E1-3 | `circuitos-cc.html`, seção 4, quadro "Primeira lei (dos nós) e segunda lei (das malhas)" → E1 | LKT: "as subidas de potencial **(fontes)** igualam as quedas **(resistores)**" | "a soma das subidas de potencial é igual à soma das quedas. Uma fonte pode ser subida ou queda, conforme o sentido do percurso: no exemplo 4, E<sub>2</sub> é uma queda, porque está sendo carregada". A versão antiga contradizia o próprio exemplo 4, em que a fonte E<sub>2</sub> absorve 6 W. | Alexander e Sadiku, seção 2.4 (LKT como soma algébrica); [UFRN/IMD, Conceitos de Eletricidade, aula 3](https://hmateriais.imd.ufrn.br/materialV2/assets/download/conceitos-de-eletricidade/03-leis-de-kichhoff-e-tecnicas-de-analise-de-circuitos-CONCEITOS-DE-ELETRICIDADE-IMD.pdf) |
| E1-4 | `circuitos-cc.html`, seção 5, quadro "Condição de máxima transferência" → E1 | η = 50%: "nesse ponto, metade da potência é perdida em R<sub>th</sub>" | "metade da potência entregue pela fonte equivalente fica em R<sub>th</sub>. Numa fonte real (E com resistência interna r), é a perda dentro da própria fonte; num circuito qualquer, os 50% valem para o equivalente, e não para as perdas do circuito original". Exemplo: no circuito do exemplo 6 (24 V, 6 Ω, 3 Ω, 2 Ω) com R<sub>L</sub> = 4 Ω, a fonte de 24 V entrega 72 W e a carga recebe 4 W (5,6%), embora o equivalente diga 50%. | Alexander e Sadiku, seção 4.8 (máxima transferência) e a observação de que o equivalente só vale nos terminais; [Kuphaldt, *Lessons in Electric Circuits* I, 10.12 (LibreTexts)](https://workforce.libretexts.org/Bookshelves/Electronics_Technology/Circuitry/Book%3A_I_Direct_Current_(DC)/10%3A_DC_Network_Analysis/10.12%3A_Maximum_Power_Transfer_Theorem) |

Ajustes de contexto (não são erros técnicos, só o texto adaptado ao app): "Bloco N" virou "seção N"; "material de CA e
trifásicos" virou "estação E2"; "arquivos do projeto" saiu; a caixa "Como a Cesgranrio tem cobrado" ganhou os números
das questões de 2023 (36, 49, 52, 53 e 57), conferidos no caderno da prova; o item 7.3 (instrumentos) foi citado; e as
Fontes ganharam uma linha sobre esta revisão.

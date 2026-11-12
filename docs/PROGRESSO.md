# Progresso (atualizado a cada tarefa concluída)

Última atualização: 2026-11-12. T1–T6, M3, A2, N1, A1, I3, I2, X1, X2 e X3 concluídas e revisadas (X2 e X3 revisadas por duas passadas em Sonnet, não em Opus; A1, I3 e I2 por uma passada em Opus, só leitura). Matemática completa (X1–X3). Todas as estações do edital estão no app; o que resta é a avaliação do estudante e o estudo.

## Onda 1 (plano: `docs/superpowers/plans/2026-10-24-eletrica-de-ouro-onda1.md`)

| Tarefa | Estado | Commits |
|---|---|---|
| T1: clonar o Humanas na raiz e mover a Bancada para `bancada/` | ✅ concluída e revisada | 5a04655..2c69888 |
| T2: pipeline de estações + estação E1 (Circuitos CC) | ✅ concluída e revisada | ..0b4a99d |
| T3a: estações E2 (CA, fasores, impedância) e E3 (potência, FP, trifásicos, medidor de energia, dois wattímetros) | ✅ concluída e revisada | ..5262d92 |
| T3b: estações M1 (simbologia e diagramas) e M2 (eletromagnetismo e transformadores) | ✅ concluída e revisada | ..b658359 |
| T3c: estação I1 (instalações e NBR 5410) + estações "em breve" (M3, I2, I3, A1, A2, N1, X1–X3) | ✅ concluída e revisada | ..cec1278 |
| T4: banco de questões do estudante (`fontes/banco-de-questoes.html`: 205 questões, 30 geradores) → Treino e aba Questões das estações | ✅ concluída e revisada (4 rodadas de correção; exceções de letra dos geradores documentadas em `tests/questoes.test.mjs`) | ..0d9c227 |
| T5: prova Transpetro 2023 recortada por questão (`provas/t23`, `data/provas.js`) + gabarito **oficial** (`fontes/gabarito-2023.json`, Q28 e Q30 anuladas = ponto para todos), corte de 50% por bloco, `mapa2023` | ✅ concluída e revisada (ajustes de legibilidade em celular entram junto com a T6) | ..e005a80 |
| T6: Biblioteca (formulário, números-âncora, NR-10 de 2019 × 2026, simbologia, glossário próprio), Arena (Qual é a fórmula?, Ordene a NR-10, Grandeza e unidade), Plano de 10/11 a 28/11 (`data/plano.js`), Painel por item do edital com a marca da prova de 2023, Missão de hoje pelo peso do `mapa2023` | ✅ implementada e revisada; falta só a parada para o estudante avaliar | c43aeef.. |

Ondas seguintes (spec, seção 3):
- **Onda 2:** M3 ✅, A2 ✅ e A1 ✅ (escritas para o app e revisadas; ver `fontes/ERRATA.md`).
- **Onda 3:** N1 ✅, I3 ✅ e I2 ✅.
- **Onda 4:** Matemática (X1–X3) e recalibração do Plano e do Painel.

## Decisões já tomadas (não reabrir sem motivo)

- **Data da prova:** 29/11/2026, a do edital original, com aviso para conferir a retificação.
- **Numeração da prova de 2023:** Português 1–10, Matemática 11–20, Específicas 21–60 (confirmada pela capa).
- **Gabarito oficial de 2023: encontrado.** Está em `fontes/gabarito-2023.json`, junto com os dois PDFs da Cesgranrio (o preliminar e as "Respostas aos Recursos"), que batem letra a letra. As questões **28 e 30 foram anuladas**; nenhum outro gabarito da Prova 6 mudou.
- **Q28 de 2023 (Dy5):** foi anulada (o preliminar dava 120°; o certo é 150°). O app ensina a regra (a BT fica atrasada 150° em relação à AT) e mostra a questão como anulada.
- **Bancada:** sem service worker próprio; o SW da raiz precacheia `bancada/`. O SW da raiz só lê os próprios caches (`edo-*`) e apaga os caches `bancada-shell-*` antigos que tenham URLs da raiz.
- **Questões `hot` e `ord` do banco (15):** viram múltipla escolha se o Humanas não tiver um tipo equivalente.
- **Plano antigo** (`docs/superpowers/plans/2026-10-23-apostila.md`, apostila sobre a Bancada): substituído. O código dele fica em `bancada/` sem uso novo.
- **REN 1.000/2021 da ANEEL:** citada "conforme O Setor Elétrico" (o texto oficial não foi consultado).

## Pendências menores registradas pelas revisões

Nenhuma bloqueia o trabalho:
- T6, fora do que foi feito: o jogo "cálculo-relâmpago" da spec (os Números novos do Treino cobrem); a aba Simbologia mostra só o resumo da M1 (as figuras ficam na estação); o Plano manda Matemática, Português, A1/A2, N1, I2 e I3 para "fora do app" enquanto não houver estação; a página da NR-10 lado a lado é longa no celular;
- `simCotas` ainda usa `peso2023`/`PESO_DIVIDIDO` (a Missão de hoje já usa o `mapa2023`);
- chaves vazias herdadas do Humanas em `data/base.js` (`tl`, `fichas`, `rep`, `con`, `red`, `enemMap`);
- texto pequeno em figuras largas a 390 px (há o botão "Ampliar");
- o chip de faixa empurrado no cabeçalho das estações M (herdado do Humanas);
- algumas `contas` da E1 são tautológicas;
- o `bancada-runtime-v1` antigo (só com fontes) fica órfão;
- comentários internos que citam o Humanas (o alias CSS `.box.enem` saiu na T6).

## Fora deste repositório

- `Filippotop/humanas-de-ouro`, branch `ccr-0d786ede-6b8nps`: tira a pasta `bancada/` antiga do Humanas e protege o SW de lá contra cachear páginas 404. **Precisa de pull request e merge** (o estudante faz pelo GitHub).

## Como continuar

Pegue a primeira tarefa ⬜ ou ⏳ da tabela e leia o texto dela no plano. Siga o `AGENTS.md`, rode a revisão independente, faça commit, push e atualize esta página.

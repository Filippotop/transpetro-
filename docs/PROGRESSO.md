# Progresso (atualizado a cada tarefa concluída)

Última atualização: 2026-10-25. Estações E1, E2, E3, M1, M2 e I1 concluídas e revisadas. T4 implementada e em revisão; depois vêm T5 e T6.

## Onda 1 (plano: `docs/superpowers/plans/2026-10-24-eletrica-de-ouro-onda1.md`)

| Tarefa | Estado | Commits |
|---|---|---|
| T1: clonar o Humanas na raiz e mover a Bancada para `bancada/` | ✅ concluída e revisada | 5a04655..2c69888 |
| T2: pipeline de estações + estação E1 (Circuitos CC) | ✅ concluída e revisada | ..0b4a99d |
| T3a: estações E2 (CA, fasores, impedância) e E3 (potência, FP, trifásicos, medidor de energia, dois wattímetros) | ✅ concluída e revisada | ..5262d92 |
| T3b: estações M1 (simbologia e diagramas) e M2 (eletromagnetismo e transformadores) | ✅ concluída e revisada | ..b658359 |
| T3c: estação I1 (instalações e NBR 5410) + estações "em breve" (M3, I2, I3, A1, A2, N1, X1–X3) | ✅ concluída e revisada | ..cec1278 |
| T4: banco de questões do estudante (`fontes/banco-de-questoes.html`: 205 questões, 30 geradores) → Treino e aba Questões das estações | ⏳ implementada (banco nas abas Questões, 30 geradores no Treino, simulado na proporção de 2023, tipos de erro no Painel); **em revisão independente** (código + conteúdo das 205 questões). Falta corrigir o que a revisão achar | ..670a8d6 |
| T5: prova Transpetro 2023 recortada por questão (`fontes/prova-2023-…pdf`) + gabarito **oficial** (procurar; se não achar, sem correção) | ⬜ a fazer | — |
| T6: Biblioteca (formulário geral, números-âncora, NR-10 de 2019 × 2026), Arena, Plano até 29/11, Painel, Missão de hoje; entrega e parada para o estudante avaliar | ⬜ a fazer | — |

Ondas seguintes (spec, seção 3):
- **Onda 2:** A1, A2 e M3 (escrever do zero, no padrão dos aprofundamentos).
- **Onda 3:** N1, I3 e I2.
- **Onda 4:** Matemática (X1–X3) e recalibração do Plano e do Painel.

## Decisões já tomadas (não reabrir sem motivo)

- **Data da prova:** 29/11/2026, a do edital original, com aviso para conferir a retificação.
- **Numeração da prova de 2023:** Português 1–10, Matemática 11–20, Específicas 21–60 (confirmada pela capa).
- **Q28 de 2023 (Dy5):** nenhuma alternativa impressa traz os 150° corretos. O app ensina a regra (a BT fica atrasada 150° em relação à AT) e **não** dá gabarito.
- **Bancada:** sem service worker próprio; o SW da raiz precacheia `bancada/`. O SW da raiz só lê os próprios caches (`edo-*`) e apaga os caches `bancada-shell-*` antigos que tenham URLs da raiz.
- **Questões `hot` e `ord` do banco (15):** viram múltipla escolha se o Humanas não tiver um tipo equivalente.
- **Plano antigo** (`docs/superpowers/plans/2026-10-23-apostila.md`, apostila sobre a Bancada): substituído. O código dele fica em `bancada/` sem uso novo.
- **REN 1.000/2021 da ANEEL:** citada "conforme O Setor Elétrico" (o texto oficial não foi consultado).

## Pendências menores registradas pelas revisões

Nenhuma bloqueia o trabalho:
- texto pequeno em figuras largas a 390 px (há o botão "Ampliar");
- o chip de faixa empurrado no cabeçalho das estações M (herdado do Humanas);
- algumas `contas` da E1 são tautológicas;
- o `bancada-runtime-v1` antigo (só com fontes) fica órfão;
- alias CSS `.box.enem` e comentários internos que citam o Humanas.

## Fora deste repositório

- `Filippotop/humanas-de-ouro`, branch `ccr-0d786ede-6b8nps`: tira a pasta `bancada/` antiga do Humanas e protege o SW de lá contra cachear páginas 404. **Precisa de pull request e merge** (o estudante faz pelo GitHub).

## Como continuar

Pegue a primeira tarefa ⬜ ou ⏳ da tabela e leia o texto dela no plano. Siga o `AGENTS.md`, rode a revisão independente, faça commit, push e atualize esta página.

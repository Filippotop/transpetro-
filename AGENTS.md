# Instruções para agentes (Codex, Claude Code ou qualquer outro)

Leia este arquivo inteiro antes de mexer em qualquer coisa. Depois leia **`docs/PROGRESSO.md`**, que diz onde o trabalho parou e qual é a próxima tarefa.

## O projeto

**Elétrica de Ouro** é um app de estudo (PWA estático, sem build, em português do Brasil) para a prova da **Transpetro 2026**:
- Edital nº 03, banca **Cesgranrio**, nível médio, **Ênfase 8: Manutenção – Elétrica**;
- prova em **29/11/2026**, com 40 questões específicas + 10 de Português + 10 de Matemática;
- é eliminado quem faz menos de 50% em cada bloco ou zera Português ou Matemática.

O app é um **clone do app Humanas de Ouro** do mesmo estudante (`Filippotop/humanas-de-ouro`). O visual, a navegação e as ferramentas são os mesmos; o conteúdo é de Elétrica e Matemática. A pasta `bancada/` tem um simulador separado (ordens de serviço com instrumentos virtuais e NR-10), aberto pela aba Bancada.

- Publicado pelo GitHub Pages a partir do `main`: <https://filippotop.github.io/transpetro-/>
- **Desenho aprovado pelo estudante:** `docs/superpowers/specs/2026-10-24-eletrica-de-ouro-design.md`
- **Plano em execução (onda 1):** `docs/superpowers/plans/2026-10-24-eletrica-de-ouro-onda1.md`

## Regras inegociáveis

1. **Correção técnica acima de tudo.** É material de estudo para uma prova. Toda fórmula, número de norma e afirmação técnica precisa ser conferida em fonte confiável: texto oficial da NR-10 em gov.br, manuais de fabricante (WEG, Schneider, ABB), material de institutos federais, livros-texto. Toda correção vai para `fontes/ERRATA.md` com o que dizia, o que diz agora e a fonte. O que não der para confirmar leva `<span class="confira">…</span>`; nunca afirme algo sem confirmação.
2. **Toda conta de exemplo resolvido é registrada em `contas`** no arquivo de metadados da estação. O teste recalcula todas, com 1% de tolerância, e confere se o número aparece no texto.
3. **Questões:** 5 alternativas (A–E), exatamente uma correta, explicação para **cada** alternativa dizendo qual erro leva a ela. As das estações são originais, no estilo da Cesgranrio. Questões de prova real ficam só na aba Provas.
4. **Nunca invente gabarito oficial.** Se não encontrar o oficial, a prova roda sem correção, com aviso.
5. **Não traga conteúdo do Humanas** (ENEM, História, Filosofia etc.).
6. **Revisão independente por tarefa.** Quem escreveu não aprova o próprio trabalho. Antes de dar uma tarefa por concluída, outra sessão ou agente revisa o diff: recalcula as contas, confere os conceitos e olha prints a 390 px nos temas escuro e claro. O que for encontrado é corrigido antes de seguir.
7. **`npm test` verde antes de cada commit**, push para `origin main` ao fim de cada tarefa, e o CI (GitHub Actions "Testes") verde. Atualize `docs/PROGRESSO.md` no mesmo commit.
8. Não use o progresso do estudante (`localStorage`) de outro app. Chaves deste app: `eletrica-de-ouro-v1` e `edo-*`. A Bancada usa `bancada-transpetro-v1`.

## Como rodar

```bash
npm install
CHROMIUM=/caminho/do/chrome npm test     # sem CHROMIUM, usa o Chromium do Playwright (npx playwright install chromium)
npx serve .                               # e abra http://localhost:3000/
```

`npm test` roda os testes de sincronização, do service worker, das estações (`tests/estacoes.test.mjs`) e de fumaça no navegador (`tests/smoke.mjs`, com axe WCAG AA em 3 tamanhos × 2 temas e offline), e depois os da Bancada. O smoke aceita `ONLY=calc` (e outros filtros; veja o início de `tests/smoke.mjs`) para rodar só uma parte.

## Como funciona uma estação

- Os **aprofundamentos HTML** do estudante estão em `fontes/` (teoria, figuras SVG, quadros de fórmula `.eq`, calculadoras, exercícios comentados).
- Cada estação tem um arquivo de metadados em `tools/estacoes/<ID>.mjs`. Ele traz:
  - título, linha, itens do edital, faixa e `peso2023`;
  - `resumo`, `cartoes`, `vf` e `contas`;
  - `trocas`: correções de texto, cada uma tem de bater **exatamente uma vez** na fonte e deve citar a errata;
  - seções novas (HTML em `tools/estacoes/*.html`), `quiz` e `quizMais` (exercícios a mais);
  - `labs`: o mapa de calculadora para widget.
- A estação é gerada com `node tools/estacao.mjs fontes/<arquivo>.html <ID> [--secoes 1-4]`, que grava `data/estacoes/<ID>.js`. O gerador é determinístico. **Nunca edite `data/estacoes/*.js` à mão**: mude o `.mjs` e gere de novo.
- As calculadoras viram widgets em `js/calc.js` (`data-calc="nome"`), montados por `montarCalculadoras(raiz)` sempre que a aba Teoria é desenhada.
- Os estilos da teoria ficam em `css/estacao.css`, com os tokens do Humanas nos dois temas.
- Estações que ainda não existem ficam em `data/embreve.js` (`emBreve:true`).
- Todo arquivo novo usado em tempo de execução entra em `SHELL_FILES` no `sw.js`, e `VER` precisa mudar.

Os campos de uma estação são `{id, vol:'EL'|'MT', line:'E'|'M'|'I'|'A'|'N'|'X', title, itens, faixa:'A'|'B'|'C', peso2023, note, html, resumo, formulas, qs, emBreve?}`.

## Para criar uma estação NOVA (sem aprofundamento do estudante)

1. Escreva um aprofundamento em `fontes/<tema>.html` **no mesmo formato** dos existentes (copie a estrutura de `fontes/eletromagnetismo-transformadores.html`): "Antes de começar" com os itens do Anexo IV e "como a Cesgranrio cobra"; seções numeradas com teoria, figuras SVG (só classes, sem cor fixa), quadros `.eq` com cada símbolo nomeado, exemplos resolvidos, "Pegadinha clássica" e exercícios comentados no fim de cada seção; depois "Formulário-resumo" e "Fontes".
2. Crie `tools/estacoes/<ID>.mjs` (use `M2.mjs` como modelo), gere a estação, tire `emBreve` de `data/embreve.js`, rode os testes e confira os prints.
3. Os padrões da prova de 2023 que cada tema precisa ensinar estão na tabela de pesos da spec e em `fontes/prova-2023-manutencao-eletrica.pdf` (questões 21 a 60). Use números novos; não copie as questões.

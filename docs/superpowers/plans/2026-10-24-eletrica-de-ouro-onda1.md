# Elétrica de Ouro, onda 1: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pôr no ar o Elétrica de Ouro, um clone do Humanas de Ouro, com as 6 estações que vêm do material do estudante (revisadas), o banco de questões no Treino, a prova de 2023, a Bancada, a Biblioteca, o Plano e o Painel.

**Architecture:** O app do Humanas de Ouro (`/home/user/humanas-de-ouro`, branch `main`: `index.html` + `data/*.js` + `pwa.js` + `merge.js` + `gist-sync.js` + `sw.js` + `tests/`) é copiado para a raiz de `/home/user/transpetro-`. O app atual vai para `bancada/`. O conteúdo vem de `fontes/` e é convertido em `data/*.js` (formato `window.DATA`) por scripts em `tools/`. As calculadoras viram widgets em `js/calc.js`.

**Tech Stack:** HTML/CSS/JS sem build no navegador, Node 22 para ferramentas e testes, Playwright 1.56.1 + axe-core 4.10.2, poppler (`pdftoppm`, `pdftotext -bbox`) e Python 3 com PIL para recortar a prova.

**Spec:** `docs/superpowers/specs/2026-10-24-eletrica-de-ouro-design.md`

## Global Constraints

- Visual, navegação e comportamento do Humanas de Ouro **preservados**. Mudam só nomes, conteúdo, linhas e o que a spec manda (aba Fórmulas, Bancada no lugar de Redação).
- Nome: **Elétrica de Ouro**. Prova: `2026-11-29` ("confira a retificação no site da Cesgranrio"). Linhas: `E` Eletricidade, `M` Máquinas e Comandos, `I` Instalações e Medidas, `A` Automação e Eletrônica, `N` Segurança e Normas, `X` Matemática.
- Chave de progresso no `localStorage`: `eletrica-de-ouro-v1`. A Bancada mantém `bancada-transpetro-v1`.
- Português do Brasil. Nada de conteúdo de Humanas no app final (nenhum módulo, questão, cartão ou prova do ENEM).
- Conteúdo técnico: toda correção de erro é registrada em `fontes/ERRATA.md` (o que dizia, o que diz agora, a fonte). O que não for confirmado leva `<span class="confira">`.
- Questões: 5 alternativas A–E, exatamente uma correta, explicação para cada alternativa.
- `npm test` verde ao fim de cada tarefa. Push para `origin main` ao fim de cada tarefa. O CI (`.github/workflows/test.yml`) precisa ficar verde.

## Review Focus

1. **Progresso:** nenhum dado do Humanas pode vazar para cá, nem o contrário. Um aparelho que já usou a Bancada mantém o progresso dela. → teste na Task 1.
2. **Calculadoras:** precisam funcionar dentro de uma estação aberta por `innerHTML`, inclusive depois de trocar de aba e voltar. → teste na Task 2.
3. **Figuras e fórmulas no tema escuro:** nada de SVG preto sobre fundo escuro, nem quadro de fórmula ilegível. → screenshots e axe nas Tasks 2 e 6.
4. **Gabarito da prova de 2023:** se o oficial não for encontrado, a prova não pode corrigir com gabarito inventado. Ela fica em modo "sem correção", com aviso. → Task 5.
5. **Offline:** tudo o que uma estação usa (dados, widgets, figuras) e a Bancada abrem sem rede depois da primeira visita. → Task 6.

---

### Task 1: Clonar o Humanas e mover a Bancada

**Files:** move tudo o que hoje está na raiz de `transpetro-` (menos `fontes/`, `docs/`, `.github/`, `.gitignore`, `.nojekyll`, `package*.json`) para `bancada/`; copia da `humanas-de-ouro` `main`: `index.html`, `pwa.js`, `merge.js`, `gist-sync.js`, `sw.js`, `manifest.webmanifest`, `tests/*.mjs`, `tools/data_io.py`; cria `data/base.js` vazio; cria ícones novos em `icons/`.

**Interfaces:**
- Produz:
  - `window.DATA` com as mesmas chaves do Humanas (`modules`, `questions`, `cards`, `vf`, `plan`, `exams`, `tl`, `fichas`, `rep`, `con`, `quem`, `opostos`, `recal`, `opening`, `red`, `enemMap`, `deep`) e a chave nova `formulas: {}`. As chaves sem uso podem ficar vazias, mas precisam existir para o código não quebrar.
  - Uma estação (`modules[]`) tem os campos `{id, vol:'EL'|'MT', line:'E'|'M'|'I'|'A'|'N'|'X', title, itens:'2.1, 2.5', faixa:'A'|'B'|'C', peso2023:number, note, html, resumo, formulas, qs, emBreve?:true}`.
  - `LINES` = as 6 linhas da spec.
- A aba Redação vira **Bancada**: tela com os 4 cartões de OS e o botão "Abrir a Bancada" (`bancada/index.html`), mais "Voltar ao Elétrica de Ouro" dentro da Bancada.

- [ ] **Step 1:** Mover o app atual para `bancada/` (com `git mv`, para manter o histórico) e ajustar caminhos e testes da Bancada (`bancada/tests/`). Rodar `CHROMIUM=/opt/pw-browsers/chromium node bancada/tests/smoke.mjs` e os testes unitários dela. Esperado: verde.
- [ ] **Step 2:** Copiar os arquivos do Humanas. Trocar marca, título, cores do ícone, `LINES`, data da prova, chave do `localStorage`, nome do arquivo do Gist e textos fixos que falam de ENEM, Humanas, Linguagens e Redação. Esvaziar o conteúdo. O `sw.js` da raiz passa a precachear também a Bancada (`bancada/...`). O `manifest` ganha `name: "Elétrica de Ouro"`.
- [ ] **Step 3:** Adaptar `tests/smoke.mjs` do Humanas: abas novas, sem as checagens de provas do ENEM, e ao menos 1 estação de exemplo em `data/` só para o teste (removida na Task 2). Acrescentar um teste: progresso salvo em `eletrica-de-ouro-v1`, sem ler nem gravar `bancada-transpetro-v1` nem as chaves do Humanas.
- [ ] **Step 4:** `npm test` (raiz, que roda também os testes da Bancada) verde. Screenshot do início a 390 px, no tema escuro, conferido: identidade visual igual à do Humanas.
- [ ] **Step 5:** Commit e push.

### Task 2: Pipeline de estações e estação piloto E1 (Circuitos CC)

**Files:** Create `tools/estacao.mjs` (converte um aprofundamento HTML de `fontes/` em `data/estacoes/<id>.js`), `js/calc.js` (widgets), `css/estacao.css` (os estilos `.eq`, `.eq-main`, `.eq-name`, `.frac`, figuras, caixas, tabelas e o SVG dos aprofundamentos, adaptados aos tokens do Humanas nos dois temas), `data/estacoes/E1.js`, `tests/estacoes.test.mjs`.

**Interfaces:**
- `node tools/estacao.mjs <fonte.html> <id> [--secoes 1-4]` gera o módulo:
  - `html`: as seções `<h2>` escolhidas, convertidas para `<h4>`, com as figuras, os quadros `.eq` e as caixas;
  - `formulas`: o "Formulário-resumo";
  - `resumo`: 5 a 7 tópicos com o essencial da estação.

  O texto "Antes de começar" e as fontes ficam no fim. Os `<script>` são removidos, e cada calculadora vira `<div data-calc="<nome>" data-cfg='{…}'></div>`.
- `js/calc.js` exporta `montarCalculadoras(raiz: Element): void`. O `vMod` do `index.html` chama essa função depois de pôr o HTML da aba Teoria.
- Aba nova **Fórmulas** no módulo: mostra `formulas`.
- `contas`: cada estação exporta `contas: [{expr, valor, onde}]`, uma por número de exemplo resolvido. `tests/estacoes.test.mjs` recalcula com 1% de tolerância e confere que `valor` aparece no HTML.

- [ ] **Step 1:** Escrever `tests/estacoes.test.mjs`:
  - campos obrigatórios;
  - HTML bem formado (pilha de tags);
  - toda conta bate;
  - todo `data-calc` tem widget registrado;
  - SVG sem cor fixa que suma no tema escuro (sem `fill="#000"` nem `stroke="black"`).

  Rodar e ver falhar.
- [ ] **Step 2:** Implementar `tools/estacao.mjs`, `js/calc.js` (todas as calculadoras de `fontes/circuitos-cc.html`), `css/estacao.css` e a aba Fórmulas. Gerar `E1`.
- [ ] **Step 3: Revisão técnica de E1** (quem implementa faz a primeira passada; a revisão da tarefa confere):
  - recalcular cada exemplo e exercício;
  - conferir cada afirmação conceitual;
  - registrar as correções em `fontes/ERRATA.md`.
- [ ] **Step 4:** Cartões (12 a 20) e V ou F (10 a 15) da E1, no formato do Humanas, originais e tirados do conteúdo da estação.
- [ ] **Step 5:** `npm test` verde. Screenshots da E1 (Teoria com fórmula e figura, uma calculadora, Fórmulas) a 390 px nos dois temas, conferidos. Commit e push.

### Task 3: Estações E2, E3, M1, M2 e I1

Mesma receita da Task 2, Steps 2 a 5, uma estação por vez (cada estação é uma revisão própria). Divisão: `circuitos-ca-trifasicos.html` → **E2** (seções 1–4) + **E3** (seções 5–6, mais uma seção nova sobre **medidor de energia** e **método dos dois wattímetros**, que caíram nas questões 21 e 58 de 2023). `simbologia-diagramas.html` → **M1**. `eletromagnetismo-transformadores.html` → **M2**. `instalacoes-nbr5410.html` → **I1** (aplicar a errata de queda de tensão; conferir DR e DPS).

As outras estações da spec (M3, I2, I3, A1, A2, N1, X1–X3) entram com `emBreve:true`: título, itens e peso, sem conteúdo.

### Task 4: Banco de questões no Treino e nas estações

**Files:** Create `tools/banco.mjs`, `data/questoes.js`, `js/gerador.js`, `tests/questoes.test.mjs`.

- Converter as 205 questões (`APOST` + `BANK` de `fontes/banco-de-questoes.html`) para o formato `questions` do Humanas: `{id, vol, n, tag, base, cmd, alts[5], mod, ans:'A'–'E', ex:{A..E}}`.
  - O comentário único (`c`) vira `ex[ans]`.
  - As alternativas erradas ganham explicação a partir das etiquetas de erro (`e` + `ERR`). Quando faltar, a explicação é escrita.
  - `mod` = a estação correspondente (T1 → E2/E3, T2 → M2, T3 → M1, T4 → E1, T5 → I1, conforme o assunto).
- Questões `hot` e `ord` (11 + 4): manter, se o Humanas tiver um tipo equivalente; senão, converter para múltipla escolha.
- Os 30 geradores (`GEN`) vão para `js/gerador.js`. O Treino ganha a opção "Questões com números novos" por estação.
- Revisão: o teste recalcula toda questão numérica que tenha `conta`. Todas as 205 passam por uma revisão de gabarito.
- `tests/questoes.test.mjs`: 5 alternativas distintas, `ans` válido, `ex` para as 5, `mod` existente, gerador produz questão válida em 100 sorteios.

### Task 5: Prova Transpetro 2023 recortada

**Files:** Create `tools/recorta_prova.py`, `provas/t23/q001.webp`…`q060.webp`, entrada `exams.t23` em `data/provas.js`.

- Recortar cada questão do PDF (`fontes/prova-2023-manutencao-eletrica.pdf`, 15 páginas em duas colunas) usando `pdftotext -bbox` para achar o início de cada número de questão e `pdftoppm -r 200` para a imagem. Uma imagem por questão, sem cortar figura nem alternativa; questões que dividem um texto usam `shared`, como no Humanas.
- **Gabarito oficial:** procurar o gabarito definitivo da Cesgranrio (Transpetro 2023, Edital 01, Prova 6, Manutenção – Elétrica), em PCI Concursos, Qconcursos ou no site da Cesgranrio. Conferir ao menos 5 questões de cálculo resolvendo-as. Se não for encontrado, `key` fica `null` e a prova roda sem correção, com o aviso "gabarito oficial não encontrado". **Nunca inventar gabarito.**
- Mapear cada questão de 21 a 60 para a estação correspondente (`enemMap` → `mapa2023`; a classificação está na spec antiga e na tabela de pesos), para a Missão de hoje e a Recalibração.
- Teste: 60 imagens existem e o gabarito tem 60 letras válidas ou é `null`.

### Task 6: Biblioteca, Arena, Plano, Painel e entrega

- **Biblioteca:**
  - Formulário geral (juntando o `formulas` das estações);
  - Números-âncora (os da apostila completa, corrigidos pela errata);
  - **NR-10 lado a lado** (10.5.1/10.5.2 de 2019 × 10.13.1/10.13.2 de 2026, com as fontes do gov.br);
  - glossário.

  As abas do Humanas sem equivalente (linha do tempo, fichas de autor, conexões, repertório) **saem**.
- **Arena:** "Qual é a fórmula?" (a partir dos cartões), "Ordene a NR-10", "Grandeza e unidade". Os jogos do Humanas sem equivalente saem.
- **Plano:** de 2026-10-25 a 2026-11-28. Segue as ondas (estações prontas primeiro, pelo peso de 2023), com simulado semanal e revisão.
- **Painel:** acerto por linha e por item do edital; linha de referência = acerto na prova de 2023, quando o estudante a fizer.
- **Missão de hoje:** escolhe pelo peso de 2023, pelos erros e pelo plano.
- `sw.js`: `VER` novo, precache de tudo. Teste offline: estação, widget, prova e Bancada.
- `npm test` verde, CI verde, push. Screenshots (início, uma estação, Treino, Provas, Bancada, Biblioteca) a 390 px escuro e 1280 claro, conferidos. **Parada:** mandar ao estudante o link e os prints.

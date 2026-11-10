# Para o Hermes: continuar o app "Elétrica de Ouro"

Atualizado em 2026-11-10. A prova da Transpetro 2026 (Cesgranrio, nível médio, Ênfase 8: Manutenção – Elétrica) é em **29/11/2026**, faltam 19 dias. Responda ao estudante em **português (pt-BR)**, seja direto e honesto, sem elogios.

## 0. Cole isto para começar

```
Estamos construindo o app "Elétrica de Ouro" (repo Filippotop/transpetro-, branch main, clone local em C:\Users\fivar\transpetro-). Leia AGENTS.md, depois docs/HERMES-CONTINUAR.md, docs/CONTINUAR.md e docs/PROGRESSO.md, e continue de onde parou. Regras: correção técnica acima de tudo, revisão independente por tarefa, commit a cada passo com npm test verde.
```

## 1. O que o app é

PWA estático (sem build), português do Brasil, clone do Humanas de Ouro com conteúdo de Elétrica. Site: <https://filippotop.github.io/transpetro-/> (GitHub Pages, publicado a partir do `main`). Leia o `AGENTS.md` inteiro antes de mexer: ele tem as regras inegociáveis (fonte confiável para toda fórmula, `contas` recalculadas, 5 alternativas com explicação por alternativa, nunca inventar gabarito, revisão independente por tarefa, `npm test` verde antes de cada commit).

Rodar: `npm install`, `npx playwright install chromium`, `npm test` (no Windows o `.gitattributes` mantém LF; sem isso o `tools/banco.mjs` falha).

## 2. Estado do repositório (verifique com `git status` e `git log`)

**Publicado no ar (commit 237567f, `sw.js` VER `2026-11-10.1`):** estações E1, E2, E3, M1, M2, M3, I1; banco de questões; prova de 2023 com gabarito oficial; Bancada; T6 completa (Biblioteca com formulário, números-âncora, NR-10 lado a lado, simbologia e glossário; Arena com Qual é a fórmula?, Ordene a NR-10 e Grandeza e unidade; Plano de 10/11 a 28/11 em `data/plano.js`; Painel por item do edital; Missão de hoje). M3 e T6 passaram por revisão independente e foram corrigidas.

**Commit local não enviado:** `dbbd685`, CI: fixa `ubuntu-24.04` em `.github/workflows/test.yml`. O push foi recusado porque a credencial do git nesta máquina não tem o escopo `workflow`. O estudante precisa rodar `gh auth refresh -h github.com -s workflow` e depois `git push origin main`. Enquanto isso, o CI "Testes" do GitHub fica vermelho (o Playwright 1.56.1 não instala o Chromium no `ubuntu-latest`, que virou 26.04); a garantia de cada publicação é `npm test` rodado localmente. Se não quiser esperar, empurre as estações novas num commit separado e deixe o `dbbd685` num branch local.

**Trabalho em andamento, NÃO commitado (parou por limite de uso):**

- **A2 (Automação, CLP e controle, itens 9.3 a 9.5): escrita, falta integrar e revisar.** Já existem: `fontes/automacao-clp-controle.html`, `tools/estacoes/A2.mjs`, `tools/banco/A2.mjs`, `data/estacoes/A2.js` (gerado), a calculadora no `js/calc.js` (escala-analogica, pullup-clp, routh-3 e uma quarta), mudanças em `index.html`, `sw.js`, `data/embreve.js` (A2 saiu de "em breve"), `tests/estacoes.test.mjs`, `tools/banco/erros.mjs`. `node tests/estacoes.test.mjs` passa com A2. **Falta:** regenerar o banco (`node tools/banco.mjs`: o `data/questoes.js` ainda não tem as questões da A2); fórmulas (3 erradas cada, explicadas), pelo menos 5 termos de glossário e pares de unidade da A2 em `data/biblioteca.js` (o `tests/biblioteca.test.mjs` exige); a A2 entrar no `data/plano.js`; 2 geradores em `js/gerador.js` se o `tests/questoes.test.mjs` pedir; a seção da A2 em `fontes/ERRATA.md`; conferir o HTML da fonte (termina com um `<script>` de widgets, confira que está completo); `npm test` inteiro; prints a 390 px escuro e 1280 px claro; **revisão técnica independente** (subagente que recalcula as contas e confere os conceitos); depois commit e push. Tudo que não for confirmado em fonte leva `<span class="confira">`.
- **A1 (Eletrônica analógica e digital, itens 9.1 e 9.2): não saiu nada utilizável.** O agente caiu antes de gravar a fonte. Confira `git status` por sobra de arquivos de A1 (`js/calc.js` e `tools/banco/erros.mjs` podem ter trechos dela misturados com os da A2) e comece do zero se não houver nada.

## 3. O que falta, na ordem escolhida pelo estudante

1. Fechar a **A2** (acima) e escrever a **A1**.
2. **N1** (Segurança, NR-10 e manutenção; itens 6 e 10.2–10.4): reaproveite `data/nr10.js`, `fontes/nr10-2019-x-2026.md` e as pegadinhas da apostila (`fontes/ERRATA.md`). A NR-10 cobrada é, por inferência (marcada `confira`), a de 2019, vigente em 29/11/2026.
3. **I3** (medidas, retificadores, baterias e no-breaks; itens 7.1, 7.3, 7.4).
4. **I2** (média tensão de 1,0 a 17,5 kV e SPDA; itens 8.2 e 8.4).
5. **Matemática X1, X2, X3** (Mat 1 a 10). Matemática **elimina** (corte de 50% por bloco e zero em Português ou Matemática elimina). Hoje não há estação de Matemática; o Plano manda o estudante estudar por fora.
6. **Recalibrar o Plano** (`data/plano.js`) com as estações novas: troque as tarefas "fora do app" pelas estações. O teste exige que toda estação pronta apareça no plano, na ordem do peso de 2023 (`mapa2023` em `data/provas.js`).

Com 19 dias, **combine com o estudante o que cortar**; provavelmente só cabem A1, A2 e as de maior peso. Pesos em 2023: E3 8, I1 5, E1 4, M2 4, E2 3, M3 2, A1+A2 6, N1 4, I2 2, I3 2, Matemática 10. Pergunte antes de gastar tempo em estação de peso baixo.

## 4. Como criar uma estação (roteiro curto; detalhes no `AGENTS.md`)

1. `fontes/<tema>.html` no formato das outras (modelo completo: `fontes/maquinas-rotativas-protecao-partidas.html`), com teoria por seções, figuras SVG só com classes, quadros `.eq`, exemplos resolvidos, "Pegadinha clássica", "Como a Cesgranrio cobra", exercícios comentados, formulário-resumo e Fontes.
2. `tools/estacoes/<ID>.mjs` (resumo, 10–20 cartões, 10–20 V ou F, `contas`, `labs`) e `node tools/estacao.mjs fontes/<tema>.html <ID>` gera `data/estacoes/<ID>.js`. **Nunca edite `data/estacoes/*.js` nem `data/questoes.js` à mão.**
3. Questões em `tools/banco/<ID>.mjs` (cerca de 30), `node tools/banco.mjs` gera `data/questoes.js`.
4. Ligar em `index.html` (`<script src="data/estacoes/<ID>.js">`) e `sw.js` (`SHELL_FILES` e novo `VER`); tirar o `stub` de `data/embreve.js`.
5. Em `data/biblioteca.js`: fórmulas da estação (cada uma com 3 erradas e o erro explicado), pelo menos 5 termos no glossário, pares grandeza-unidade se couber. Em `data/plano.js`: a estação entra no plano.
6. Calculadoras em `js/calc.js` e geradores de "números novos" em `js/gerador.js`, conforme os testes cobram.
7. Seção da estação em `fontes/ERRATA.md` (fontes usadas e decisões).
8. `npm test` verde, prints, revisão independente, commit.

Modelo de referência dos arquivos tocados por uma estação: `git show --stat 591a1e7 de24c1d 2ac7d43` (M3).

## 5. Decisões já tomadas (não reabrir sem motivo)

- Prova em 29/11/2026 (edital original; "confira a retificação" no site da Cesgranrio).
- Numeração da prova de 2023: Português 1–10, Matemática 11–20, Específicas 21–60. Q28 e Q30 anuladas (ponto para todos).
- Peso por estação vem do `mapa2023` (`data/provas.js`), não do campo `peso2023` (que é o peso do item inteiro; o cabeçalho da estação mostra o do item).
- Progresso do estudante: chave `eletrica-de-ouro-v1` no navegador. Nunca misturar com o Humanas de Ouro nem com a Bancada.
- Nada de conteúdo de Humanas (ENEM, História etc.) neste app.
- Erros da apostila do estudante já corrigidos, não reintroduzir: ver `docs/CONTINUAR.md` seção 5 e `fontes/ERRATA.md`.

## 6. Cuidados que custaram caro

- **Limite de uso de 5 horas:** estoura com vários agentes em paralelo. No máximo 2 por vez; quando um falha por limite, retome-o depois do reset (17h, horário de Brasília) em vez de recomeçar. Faça commit a cada passo verde para o trabalho não ficar solto.
- Dois agentes mexendo nos mesmos arquivos compartilhados (`index.html`, `js/calc.js`, `sw.js`, `tests/`) se misturam. Prefira uma estação por vez, ou integre uma antes de começar a outra.
- Modelos: Opus para conteúdo técnico e para as revisões; modelos menores para telas, testes e código mecânico.
- Antes de publicar (push no `main` atualiza o site): peça confirmação ao estudante. O estudante autorizou publicar cada estação assim que passar na suíte completa e na revisão independente; confirme se ainda vale.
- Depois de publicar, o estudante precisa abrir o app com internet uma vez para o service worker baixar a versão nova.

## 7. Parada obrigatória

Depois de cada estação publicada, mande ao estudante o link e os prints (a 390 px escuro e 1280 px claro) e pergunte o que ajustar. O estudante é quem estuda no app; o que ele achar confuso vale mais que qualquer métrica.

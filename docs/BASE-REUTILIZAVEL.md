# Base reutilizável: como criar um app de estudo novo

Esta base é o app Elétrica de Ouro, com um gerador que copia só o **motor** e troca a **identidade**, mais um conteúdo mínimo para o app abrir. O Elétrica continua sendo este repo, sem mudança de comportamento: o gerador não altera nada aqui; ele só lê.

## Criar um app novo

```bash
node tools/novo-app.mjs --nome "Química de Ouro" --slug quimica-de-ouro --prefixo qdo \
  --dest C:/Users/User/quimica-de-ouro --prova 2027-03-10 --banca "Banca X" --cargo "Cargo Y" \
  [--concurso "Petrobras"] [--curto Química] [--url https://usuario.github.io/quimica-de-ouro/]
```

- `--concurso` é o nome sem artigo: sai "da Petrobras" (artigo pelo final do nome; use `--concurso` com cuidado para nomes que não terminam em "a"). Padrão: "do concurso público".
- `--prefixo`: **exatamente 3 letras minúsculas**, diferente de `edo` (Elétrica) e `hdo` (Humanas). Vira o prefixo de todas as chaves de `localStorage` e dos caches (`qdo-shell-1`, `qdo-last`…). O motor corta o nome do cache com `slice(10)` (`index.html`, ~1714), que só dá o nome certo com prefixo de 3 letras (`edo-shell-` tem 10 caracteres); por isso o gerador recusa outro tamanho.
- `--slug` vira a chave de progresso (`quimica-de-ouro-v1`), o nome do arquivo de exportação e o `package.json`.
- `--dest` tem de ficar **fora** do repositório do motor (e, portanto, fora de `.git` e `node_modules`); dentro dele, o gerador para com erro (exit 1).
- Idempotência: rodar de novo com os **mesmos** argumentos no **mesmo** `--dest` não faz nada (exit 0). Outro `--dest` gera arquivos idênticos. Um `--dest` que já existe e não é esse app para (exit 1, sem tocar em nada).
- Falha no meio (inclusive a checagem de sobras, exit 2): o destino criado nesta execução é **apagado**, e a marca `.novo-app.json` só é gravada no fim, com sucesso. Assim, um app quebrado nunca responde "nada a fazer" na reexecução.
- Textos digitados (`--nome`, `--banca`, `--cargo`, `--concurso`, `--curto`) não podem ter quebra de linha nem caractere de controle. Dentro do código gerado, `' " ` $ \ * & < >` saem como entidades HTML (ex.: `'` vira `&#39;`); na tela o texto aparece normal. `--url` aceita só `http(s)://` com letras, números e `. _ ~ / : -`.
- Não há `--com-bancada`: a Bancada é específica da Transpetro e não sai no gerador.

Depois de gerar:

```bash
cd C:/Users/User/quimica-de-ouro
npm test                  # merge.test.mjs
npx serve .               # ou: python -m http.server 8000
```

Validação num Chrome de verdade (390×844, temas escuro e claro, service worker, estação de exemplo, progresso gravado com o prefixo certo, nenhuma palavra de outra matéria). `--chave` e `--prefixo` são obrigatórios; sem eles a verificação não roda, e uma questão que não pôde ser respondida conta como falha:

```bash
node tools/novo-app-verifica.mjs --url http://localhost:8000/ --saida <pasta> --prefixo qdo- --chave quimica-de-ouro-v1 --chrome "C:/Program Files/Google/Chrome/Application/chrome.exe"
```

(o `--chrome` é o caminho do Chrome; a verificação roda a partir desta base, que tem o Playwright em `node_modules`.)

## Motor × conteúdo × identidade

| Camada | O que é | Onde |
|---|---|---|
| **Motor** (copiado) | app, navegação, revisão, sincronização, service worker, tema, widgets | `index.html`, `sw.js`, `pwa.js`, `merge.js`, `gist-sync.js`, `js/calc.js`, `js/motion.js`, `css/estacao.css|tema.css|motion.css|polish.css`, `vendor/`, `icons/`, `data/base.js`, `tools/estacao.mjs`, `tests/merge.test.mjs` |
| **Conteúdo** (gerado) | 1 estação EX1, 3 questões de exemplo, biblioteca vazia | `data/estacoes/EX1.js`, `data/biblioteca.js` |
| **Identidade** (trocada) | nome, slug, prefixo, data da prova, banca, cargo, URL, título, manifest | tabela `TROCAS` e `aplicaRemocoes` em `tools/novo-app.mjs` |
| **Não copiado** | conteúdo e geradores de Elétrica/Transpetro: `data/estacoes/*` (exceto EX1), `data/questoes.js`, `data/figresp.js`, `data/provas.js`, `data/nr10.js`, `data/plano.js`, `data/embreve.js`, `js/contas*.js`, `js/gerador.js`, `css/contas.css`, `bancada/`, `aulas/`, `fontes/`, `provas/`, `tools/banco*`, `tools/figresp*`, `tools/recorta_prova.py`, `AGENTS.md`/`PRODUCT.md`/`README.md` do Elétrica (o gerador escreve versões curtas) | — |

O gerador tira do `index.html` as `<script>`/`<link>` de arquivos que não foram copiados (sem erro de carregamento), reescreve a lista `SHELL_FILES` do `sw.js` com o que existe no destino e zera `BANCADA_FILES` e `IMAGES`.

## Onde o Elétrica está hardcoded no motor (`arquivo:linha`) e como o gerador neutraliza

Linhas de `index.html` (a base não foi alterada; as linhas são as atuais):

| Trecho | Linhas | Neutralização |
|---|---|---|
| Título, meta, apple-title | 12, 18 | `TROCAS` (`Elétrica de Ouro`→nome, `Elétrica`→curto) |
| Marca da barra e busca | 611, 613 | `TROCAS` (`Elétrica <em>de Ouro</em>`); exemplo de busca: `REMOVER` |
| Aba Bancada (barra) | 625 | `REMOVER` |
| Scripts de conteúdo/geradores e CSS de contas | 606, 659, 661, 662, 664, 667, 668–676 | pruning automático: tag removida se o arquivo não foi copiado |
| `STUDY_LINES`, `EXAM`, `EXAM_NOTE`, `LINES` (nomes das 7 linhas) | 683–687 | `REMOVER` (LINES e STUDY_LINES viram uma linha só, `E`); data por `TROCAS` |
| `KEY='eletrica-de-ouro-v1'` | 711 | `TROCAS` (`eletrica-de-ouro`→slug) |
| Prefixo `edo-` de todas as chaves (`edo-last`, `edo-prefs`, `edo-sim`…) | ~40 linhas | `TROCA_PREFIXO` (`\bedo-`→prefixo) |
| Tutor com "Transpetro (Cesgranrio, Manutenção – Elétrica)" | 988, 1055, 2177 | `TROCAS` (`da Transpetro`, `Cesgranrio`, `Manutenção – Elétrica`) |
| Jogo "Ordene a NR-10" (lista + função) | 1077, 1426–1440 | `REMOVER` |
| Subaba "NR-10 lado a lado" (rótulo, rota, função) | 1493–1494, 1529–1540 | `REMOVER` |
| Estrutura do plano: linha da prova, "Provas reais anteriores" (links de provas Transpetro) | 1603–1612 | `REMOVER` (linha da prova gerada com banca, cargo e data) |
| Tarefa do plano que abre a Bancada | 1595 | `REMOVER` |
| `APP_URL` (GitHub Pages do Elétrica) | 1718 | `TROCAS` |
| Rota de link direto `bancada`/`aulas` | 830, 891, 903, 1907 | `REMOVER` (atalhos "Bancada" e "Aulas em vídeo" do painel) |
| Bancada (`vBancada`, missões) e Aulas (`AULAS`, `vAulas`) | 1912–1931 | `REMOVER` (bloco até `v4: provas oficiais`; a linha `const EX = DATA.exams` fica) |
| Contagem de provas reais no Painel (`allRuns('t23')`) | 1550 | `REMOVER` (só chama `allRuns` se `EX.t23` existe) |
| Comentário da data da prova | 684 | `REMOVER` |
| Comentário "NR-10 de 2027" dos números-âncora | 1473 | `REMOVER` |

Outros arquivos:

| Arquivo | O que tem | Neutralização |
|---|---|---|
| `sw.js` 1–37 | comentários, `BANCADA_FILES` (a Bancada inteira), `IMAGES` (fotos das provas), `SHELL_FILES`, `VER` | `SHELL_FILES` reescrito; `BANCADA_FILES=[]`, `IMAGES=[]`; `VER='1'` |
| `sw.js` 40–50 | limpeza de caches antigos da Bancada, `edo-shell-` | prefixo por `TROCA_PREFIXO`; a limpeza da Bancada fica (inofensiva) |
| `pwa.js` 1, 62–86 | texto de instalação com o nome, prefixo `edo-`, prompt de download das provas | `TROCAS` e prefixo; sem provas (`N_IMGS=0`), o prompt de download não aparece (código existente em `pwa.js` 93) |
| `gist-sync.js` 1–6 | chave `edo-gist`, descrição e nome do arquivo do Gist (`eletrica-de-ouro-progresso`) | `TROCAS` e prefixo |
| `merge.js` 1 | cabeçalho | `TROCAS` |
| `js/calc.js` 1, `js/motion.js` 1, `css/*.css` | comentários com o nome | `TROCAS` |
| `icons/` | ícones idênticos aos do Elétrica (copiados) | **pendente**: trocar `icons/` antes de publicar |
| `tests/merge.test.mjs` 1 | cabeçalho | `TROCAS` |

Sanidade: depois de gerar, o gerador procura `Elétrica|Eletrica|Transpetro|NR-10|Humanas|ENEM|Cesgranrio|edo-` em todos os arquivos de texto do destino e **falha** (exit 2) se achar algo. Uma âncora de `REMOVER` que não bate exatamente o número esperado de vezes também falha, dizendo qual é (é assim que o gerador percebe que o motor mudou).

## Limites conhecidos (o que o gerador NÃO troca)

- **`--prefixo` de 3 letras** (ver acima): é uma restrição do motor, não do gerador. Trocar `slice(10)` por algo que leia o nome do cache resolve.
- **Textos presos à "prova de 2023"**: "Missão de hoje" e a ordem das estações (`index.html` ~868, ~847), Recalibração (~1166, ~1176), Painel (~1550), o aviso do Plano "Primeira passada (16 a 24/11)" (~1606) e a estação "em breve" da aba Provas (~1995). O gerador não troca nenhum desses. O comportamento desses textos com `DATA.mapa2023` vazio não foi testado.
- **Corte de 50% da Transpetro**: "Corte: 50% em cada bloco" e as regras de eliminação (`index.html` ~877, ~1292, ~1340, ~1848, ~1961–1966, ~2137), baseadas no edital 7.1.4.3 da Cesgranrio. Um app de outra banca mostra esse corte até alguém trocar essas regras.
- **Horário fixo da prova**: `new Date('AAAA-MM-DDT08:00:00-03:00')` (`index.html` 685). O gerador troca só a data; o horário fica 08:00 em Brasília, e a contagem regressiva usa esse valor.
- **`npm test` gerado só roda `merge.test.mjs`** (`package.json`). Os testes de contas, estações, questões, biblioteca, smoke e Bancada do Elétrica não são copiados.
- **Textos de método e de regra da prova** que aparecem nas telas do app gerado: "Específicas" (vol EL), "Na prova não há desconto por erro", "Questões inéditas no formato da prova…", "Aquecimento", "Missão de hoje" (que fala da "prova de 2023"), "Painel" e "Plano" com dicas de estudo. São texto da base, sem a palavra proibida, mas não são genéricos. Revisar a cada app.
- **Dados vazios por padrão**: `DATA.bib` (fórmulas, unidades, glossário), `DATA.edital`, `DATA.plan`, `DATA.recal`, `DATA.exams` (provas reais), `DATA.mapa2023`. As telas funcionam vazias (o gerador testou), mas a Biblioteca, a Arena e o Painel ficam magros até o conteúdo chegar.
- **Ícones herdados** do Elétrica (pendente, ver tabela): trocar `icons/` antes de publicar.
- **Primeira carga**: o aviso "Nova versão do app disponível" pode aparecer na 2ª navegação numa mesma sessão (comportamento do `pwa.js`, igual ao Elétrica). Não foi corrigido.
- **Parametrização (plano em 4 passos)**. Hoje a identidade é trocada por texto (`TROCAS`/`REMOVER`), o que é frágil. Plano:
  1. **`data/app.js`** com os valores atuais do Elétrica (nome, slug, prefixo, data da prova, banca, cargo, concurso, URL), sem mudar comportamento.
  2. **Um consumidor por commit**, cada um lendo de `APP` com fallback para o valor antigo (`index.html`, `sw.js`, `pwa.js`, `gist-sync.js`, `merge.js`…), um commit de cada vez, com `npm test` verde.
  3. **Textos de método em `APP.regras`** (corte, "prova de 2023", dicas do Plano), para tirar do HTML o que é de cada matéria.
  4. **O gerador escreve só `app.js`**: sem `TROCAS` de identidade; `REMOVER` fica só para o que não é configuração (bancada, aulas, NR-10).
  **Passos 2 a 4 só depois de 06/12/2026** (prova do Elétrica): mexer no app durante a semana de prova arrisca o estudo. O passo 1 é seguro antes disso.

## Como criar uma matéria nova (conteúdo)

1. Escrever o aprofundamento em `fontes/<tema>.html` (no app gerado, a pasta é sua; use `tools/estacao.mjs`, copiado, como no Elétrica).
2. Criar `tools/estacoes/<ID>.mjs` (modelo: o do Elétrica, `tools/estacoes/M2.mjs`) e gerar `data/estacoes/<ID>.js`.
3. Acrescentar o `<script>` da estação em `index.html` (depois de `data/base.js`) e a linha no mapa (`LINES`, que o gerador reduziu a `E`).
4. Preencher `data/biblioteca.js` (fórmulas com unidades e erros, glossário, unidades).

## Checklist de qualidade (herdado do AGENTS.md do Elétrica)

- [ ] **Correção técnica**: toda fórmula, número de norma e afirmação conferida em fonte confiável (texto oficial, fabricante, livro-texto). O que não der para confirmar leva `<span class="confira">…</span>`. Correções vão para um `ERRATA.md` com o que dizia, o que diz agora e a fonte.
- [ ] **Contas recalculadas**: toda conta de exemplo resolvido entra em `contas` e é recalculada por teste (1% de tolerância).
- [ ] **Questões**: 5 alternativas (A–E), exatamente uma correta, explicação de **cada** alternativa dizendo qual erro leva a ela. Questões originais, no estilo da banca. Nunca inventar gabarito oficial; sem gabarito, a prova roda sem correção, com aviso.
- [ ] **Escopo**: nada de conteúdo de outra matéria; nenhuma palavra de outra prova nos textos.
- [ ] **Revisão independente**: quem escreveu não aprova o próprio trabalho. Outra sessão ou agente recalcula as contas, confere os conceitos e olha os prints em 390 px nos temas escuro e claro.
- [ ] **Verificação**: `npm test` verde; `tools/novo-app-verifica.mjs` sem erro; prints salvos.
- [ ] **Identidade**: `icons/` trocados; `VER` do `sw.js` muda a cada publicação; chaves de `localStorage` só com o prefixo do app.

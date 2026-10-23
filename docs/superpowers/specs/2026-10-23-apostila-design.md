# Bancada v2, parte 1: apostila do edital e mapa de domínio

Data: 2026-10-23. Desenho aprovado em conversa, seção por seção.

## Objetivo

O estudante se prepara para a prova da Transpetro (Edital nº 03/2026, Cesgranrio, nível médio, Ênfase 8: Manutenção – Elétrica). Ele pediu um app "muito bom e didático", com:

- ensino **antes** de jogar;
- conteúdo **escrito**, com o mais importante destacado;
- mais conteúdo e mais questões;
- saber o próprio nível por tópico do edital.

O trabalho foi dividido em 4 partes, nesta ordem:

1. apostila do edital + mapa de domínio;
2. atendimento guiado (exemplo resolvido com retirada gradual da ajuda);
3. banco de questões por tópico;
4. novas OS.

**Este documento cobre só a parte 1** e a mudança da Bancada para um repositório próprio.

**Critério de sucesso:** o estudante abre o app e vê o que já domina e o que falta no edital. Ele estuda um módulo com o essencial destacado, confere o aprendizado na checagem e o mapa reflete isso. Cada módulo leva à OS correspondente.

## Fatos de partida (pesquisa de 2026-10-23)

- **Prova:** 60 questões (40 de Conhecimentos Específicos, 10 de Português, 10 de Matemática), 4 h ([agrobase](https://www.agrobase.com.br/concursos/2026/transpetro-nacional-selecao-publica-03-2026/)).
- **Data:** provavelmente 06/12/2026, mas sem confirmação oficial. As fontes divergem ([Direção](https://www.direcaoconcursos.com.br/noticias/concurso-transpetro-retificacao-prova-e-inscricao), [Gran](https://blog.grancursosonline.com.br/concurso-transpetro-cronograma-atualizado/amp/)). O app mantém `EXAM_DATE` num lugar só e avisa "confira no site da Cesgranrio".
- **Conteúdo programático:** o Anexo IV oficial não foi obtido. Até o estudante fornecer o texto, vale o sumário secundário da [Nova Concursos](https://www.novaconcursos.com.br/apostila/transpetro-profissional-transpetro-nivel-medio-junior-enfase-manutencao-eletrica), com 11 itens. O app deixa explícito que a numeração é provisória.
- **Peso dos temas:** na prova Cesgranrio/Petrobras 2017 (Téc. Manutenção Elétrica), 37 de 60 questões foram de eletricidade ([Qconcursos](https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2017-petrobras-tecnico-de-manutencao-junior-eletrica)). Por isso a faixa A começa por circuitos, trifásicos e potência.
- **NR-10:**
  - Em vigor na data da prova: Portaria 915/2019, desenergização no item 10.5.1 ([gov.br](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-10-atualizada-2019-1.pdf)).
  - A nova redação (Portaria MTE 737/2026) vale a partir de 01/06/2027. Ela troca a ordem de "impedimento de reenergização" e "constatação da ausência de tensão" e renumera o item para 10.13.1 ([gov.br](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-10-atualizada-2026-1.pdf)).

## 1. Módulo da apostila

Um módulo corresponde a um item do edital. Estrutura fixa:

1. **Cabeçalho:** item do edital, título, faixa (A/B/C) e `porque`, uma frase sobre por que o tema importa na prova.
2. **O essencial em 1 minuto:** de 5 a 7 tópicos para saber de cor.
3. **Seções numeradas.** Os destaques são marcados no HTML com classes: `.cai` (cai muito), `.pega` (pegadinha), `.exres` (exemplo resolvido, com o raciocínio escrito), `.fonte` (referência) e `.confira` (dado não confirmado em fonte).
4. **Figuras SVG inline** que usam os tokens de cor do tema (funcionam no escuro e offline).
5. **"Veja na bancada":** links para as OS do campo `missoes`.
6. **Resumo e checagem:** 4 questões (1 de memória, 1 de compreensão, 2 de aplicação no estilo Cesgranrio). Cada uma tem 5 alternativas, o gabarito e `porque[5]`, a explicação de **cada** alternativa.

**Primeira entrega (faixa A, 6 módulos):**

| id | Tema |
|---|---|
| `circuitos` | Circuitos CC e CA: Ohm, Kirchhoff, Thévenin/Norton, valores de pico, médio e eficaz |
| `trifasicos` | Sistemas trifásicos: Y e Δ, tensões e correntes de linha e de fase, neutro e desequilíbrio |
| `potencia` | Potência ativa, reativa e aparente; fator de potência e sua correção |
| `motores` | Motor de indução, partidas, comandos, relé de sobrecarga, falta de fase |
| `medidas` | Multímetro, alicate, megôhmetro, índice de polarização, vivo-morto-vivo |
| `normas` | NR-10 (em vigor × 2027) e NBR 5410 (DR, aterramento, isolação) |

Os demais itens do edital aparecem no mapa como "em breve".

**Tom:** o do app Humanas de Ouro. Frases diretas, termo técnico em negrito na primeira ocorrência, sem enrolação.

## 2. Telas

Barra fixa com 3 abas: **Estudar**, **Bancada** e **Revisar**. O leitor de módulo se abre dentro de Estudar.

- **Estudar → mapa do edital.**
  - Uma linha por item, com faixa, status e barra de domínio.
  - Status: ○ não lido · ◐ lido (≥ 90% das seções vistas) · ● checagem ≥ 75% de acerto · ★ dominado (checagem ≥ 75% **e** todas as questões do módulo na caixa 3 ou mais da revisão, o que exige acertar de novo em outro dia).
  - Itens sem módulo aparecem como "em breve".
  - Cartão **Próximo passo**, escolhido por regra: revisões vencidas primeiro → o módulo da faixa A com menor domínio → a OS ligada ao último módulo lido.
- **Leitor.**
  - Sumário das seções e progresso de leitura (calculado pelas seções que passaram pela tela).
  - Botão **Só o essencial**: esconde o texto corrido e mantém o essencial, os destaques e as figuras.
  - Botão **Ir para a checagem** e um botão para aumentar a letra.
  - Lembra a última seção lida.
  - A versão impressa sai limpa.
- **Bancada.** As OS atuais, cada uma mostrando "Antes de atender, leia: …" com link para os módulos do campo `modulos`.
- **Revisar.** A revisão espaçada atual, que passa a receber também as checagens da apostila. O intervalo da caixa é limitado a 20% dos dias que faltam até a prova (mínimo de 1 dia), seguindo [Cepeda et al., 2008](https://pubmed.ncbi.nlm.nih.gov/19076480/).

## 3. Dados e progresso

- **Conteúdo:** `js/apostila/<id>.js`, cada um exportando `{ id, item, titulo, faixa, porque, essencial[], secoes[{id, titulo, html}], fontes[{t, url}], missoes[], checagem[{s, o[5], a, porque[5]}], contas[{secao, expr, valor}] }`.
- **Catálogo:** `js/apostila/index.js` lista os módulos e a estrutura do edital (11 itens, com o módulo correspondente ou `null`).
- **Missões:** ganham o campo `modulos: [ids]`.
- **Progresso:** o objeto atual (`bancada-transpetro-v1`, `v: 3`) ganha `leitura: {<id>: {vistas: [secaoIds], ultima, em}}`.
  - As checagens entram no `srs` com ids `ap/<modulo>/<i>`.
  - `migrate()` aceita as versões 1 e 2 sem perda. Exportar e importar levam tudo.
- **Domínio:** calculado (função pura em `js/mastery.js`) a partir de `leitura`, `srs` e das respostas de checagem. Nunca é gravado.
  - Para isso, cada cartão do `srs` guarda também o último acerto/erro (`last`).
  - A porcentagem da checagem é a dos cartões do módulo cujo último resultado foi acerto.

## 4. Repositório próprio

1. Criar `Filippotop/bancada-manutencao` com o conteúdo atual de `bancada/` na raiz, mais `package.json` próprio (Playwright e axe-core como dependências de desenvolvimento).
2. GitHub Pages servindo o `main`, e um workflow de GitHub Actions rodando `npm test` em cada push e pull request.
3. Os testes passam a servir a raiz do novo repositório. O teste do service worker vira um teste próprio da Bancada.
4. No `humanas-de-ouro`: remover `bancada/`, a regra que exclui `/bancada/` no `sw.js` da raiz e o teste correspondente, e trocar a seção do README por um link para o endereço novo.

## 5. Qualidade e testes

- **Fontes:** todo número de norma e todo dado de fabricante tem fonte em `fontes`. O que não foi confirmado leva `.confira`. Não se inventa citação, e as questões são originais.
- `tests/apostila.test.mjs`:
  - campos obrigatórios de cada módulo; checagem com 5 alternativas, `a` válido e `porque` com 5 textos;
  - ids de seção únicos;
  - `missoes` e `modulos` cruzados e existentes;
  - **contas conferidas:** cada módulo exporta `contas: [{secao, expr, valor}]`, em que `expr` é uma expressão numérica (ex.: `127*Math.sqrt(3)`) e `valor` é o número exatamente como aparece no texto da seção (ex.: `"220"`). O teste avalia `expr`, confere que bate com `valor` dentro de 1% e que `valor` aparece no HTML da `secao`. Todo exemplo resolvido (`.exres`) tem ao menos uma conta registrada.
- `tests/mastery.test.mjs`: o status de domínio para progressos de exemplo, o limite de intervalo pela data da prova e a migração v2 → v3.
- **Teste de fumaça no navegador:**
  - mapa → leitor → só o essencial → checagem → o mapa muda de ○ para ●;
  - "Antes de atender" na bancada leva ao módulo;
  - 320/375/1280 px × claro/escuro, axe (WCAG AA), sem rolagem lateral e abrindo offline.
- **Antes de entregar:** a skill de revisão de código e uma revisão de acessibilidade.

## 6. Ordem de execução

1. Migrar para o repositório próprio e verificar que todos os testes passam lá.
2. Estrutura (catálogo, leitor, mapa, domínio, abas) e **um** módulo completo (`trifasicos`). **Ponto de parada:** o estudante avalia o tom e a profundidade.
3. Os cinco módulos restantes da faixa A.

## Fora do escopo desta parte

Atendimento guiado, banco grande de questões, novas OS, módulos das faixas B e C, sincronização entre aparelhos.

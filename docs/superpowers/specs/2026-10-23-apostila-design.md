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

## Fatos de partida

Fontes: o edital e a prova de 2023 enviados pelo estudante, mais a pesquisa de 2026-10-23.

- **Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO – 2026.3** (PDF enviado pelo estudante).
  - **Prova:** 40 questões de Conhecimentos Específicos e 20 de Gerais (10 de Português, 10 de Matemática), uma etapa só, alternativas de A a E.
  - **Eliminação (7.1.4.3):** menos de 50% em Específicos, **ou** menos de 50% em Gerais, **ou** zero em qualquer matéria de Gerais.
- **Data:** o Anexo V do edital original marca a prova para **29/11/2026**. Notícias falam de uma retificação para 06/12/2026 ([Direção](https://www.direcaoconcursos.com.br/noticias/concurso-transpetro-retificacao-prova-e-inscricao)), mas o texto da retificação não foi visto. O app mantém `EXAM_DATE` num lugar só e avisa "confira no site da Cesgranrio".
- **Conteúdo programático (Anexo IV, Ênfase 8), texto oficial:**
  1. Simbologia e diagramas (1.1 unifilares e trifilares; 1.2 esquemas de acionamento e controle).
  2. Circuitos CC e CA (2.1 CC; 2.2 CA; 2.3 operações com senoides; 2.4 valores médio, eficaz e de pico; 2.5 Kirchhoff, Thévenin e Norton).
  3. Energia e potência (3.1 cálculos e medidas; 3.2 ativa, reativa e aparente; 3.3 fator de potência e correção).
  4. Mono e trifásicos (4.1; 4.2 tensão de linha e de fase, estrela e triângulo).
  5. Máquinas (5.1 eletromagnetismo; 5.2 funcionamento; 5.3 transformadores; 5.4 síncronas; 5.5 CC e indução; 5.6 proteção BT; 5.7 acionamento e comando).
  6. Segurança e higiene (6.1 conceitos; 6.2 EPI e EPC; 6.3 interpretação de projetos).
  7. Medidas (7.1 fundamentos; 7.2 grandezas e SI; 7.3 instrumentos de corrente, tensão, potência e isolação; 7.4 retificadores, baterias e no-breaks).
  8. Instalações (8.1 BT; 8.2 redes aéreas de 1,0 a 17,5 kV; 8.3 aterramento; 8.4 SPDA).
  9. Automação e eletrônica (9.1 analógica e digital; 9.2 diagramas lógicos; 9.3 automação; 9.4 CLP; 9.5 malha fechada).
  10. Normas (10.1 NBR 5410; 10.2 manutenção; 10.3 materiais e ferramentas; 10.4 NR-10).
- **Peso observado na prova Transpetro 2023 (Manutenção – Elétrica, Cesgranrio, questões 21 a 60), classificação feita a partir do PDF:**

  | Item | Questões | Nº |
  |---|---|---|
  | 2 | 32, 33, 48, 49, 52, 53, 60 | 7 |
  | 8 | 37, 42, 45, 46, 54, 59 | 6 |
  | 9 | 31, 34, 35, 36, 50, 51 | 6 |
  | 3 | 21, 23, 25, 56, 58 | 5 |
  | 5 | 26, 27, 28, 29, 38 | 5 |
  | 4 | 22, 24, 30 | 3 |
  | 7 | 43, 44, 57 | 3 |
  | 10 | 40, 47, 55 | 3 |
  | 6 | 39, 41 | 2 |
  | 1 | — | 0 |

  Cerca de 25 das 40 questões exigem cálculo. Como é uma prova só, o peso serve para **priorizar**, nunca para excluir um item.
- **NR-10:**
  - Em vigor na data da prova: Portaria 915/2019, desenergização no item 10.5.1 ([gov.br](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-10-atualizada-2019-1.pdf)).
  - A nova redação (Portaria MTE 737/2026) vale a partir de 01/06/2027. Ela troca a ordem de "impedimento de reenergização" e "constatação da ausência de tensão" e renumera o item para 10.13.1 ([gov.br](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/nr-10-atualizada-2026-1.pdf)).
- **Questões de provas anteriores** não são copiadas. As checagens são originais e reproduzem os **padrões** observados (exemplo: "sobretensão numa fase → neutro rompido com cargas mal distribuídas").

## 1. Módulo da apostila

Um módulo corresponde a um item do edital. Estrutura fixa:

1. **Cabeçalho:** item do edital, título, faixa (A/B/C) e `porque`, uma frase sobre por que o tema importa na prova.
2. **O essencial em 1 minuto:** de 5 a 7 tópicos para saber de cor.
3. **Seções numeradas.** Os destaques são marcados no HTML com classes: `.cai` (cai muito), `.pega` (pegadinha), `.exres` (exemplo resolvido, com o raciocínio escrito), `.fonte` (referência) e `.confira` (dado não confirmado em fonte).
4. **Figuras SVG inline** que usam os tokens de cor do tema (funcionam no escuro e offline).
5. **"Veja na bancada":** links para as OS do campo `missoes`.
6. **Resumo e checagem:** 4 questões (1 de memória, 1 de compreensão, 2 de aplicação no estilo Cesgranrio). Cada uma tem 5 alternativas, o gabarito e `porque[5]`, a explicação de **cada** alternativa.

**Faixas (pelo peso de 2023):** A = itens 2, 3+4, 5, 8, 9; B = itens 6+10 (segurança, NR-10, NBR 5410) e 7; C = item 1.

**Primeira entrega (faixa A e a parte de normas, 6 módulos):**

| id | Itens do edital | Tema |
|---|---|---|
| `circuitos` | 2.1–2.5 | CC e CA: Ohm, Kirchhoff, Thévenin/Norton, fontes controladas, senoides (soma de fasores, pico/eficaz/médio), RC/RL |
| `potencia-trifasicos` | 3.1–3.3, 4.1–4.2 | Energia (kWh ↔ J, medidor), P/Q/S, FP e banco de capacitores, dois wattímetros, Y e Δ (correntes e tensões de linha e de fase) |
| `maquinas` | 5.1–5.7 | Força em condutor, transformador (perdas, índice horário, TC), motor CC shunt, síncrono, indução, estrela-triângulo, relé de sobrecarga |
| `instalacoes` | 8.1–8.4 | Esquemas TN/TT/IT e DR, queda de tensão, neutro rompido, aterramento e equipotencialização, SPDA e DPS |
| `automacao` | 9.1–9.5 | Amplificador operacional, álgebra booleana, CLP e pull-up, PID, malha fechada e Routh-Hurwitz, função de transferência RLC |
| `normas-seguranca` | 6.1–6.3, 10.1–10.4 | Perigo × risco, EPC × EPI, NR-10 (prontuário, 10.5.1 em vigor × 10.13.1 de 2027), princípios da NBR 5410, materiais e isolação de condutores |

O item 7 (medidas) e o item 1 (simbologia) aparecem no mapa como "em breve". As OS atuais já cobrem parte do 7.3 e do 1.2.

**Tom:** o do app Humanas de Ouro. Frases diretas, termo técnico em negrito na primeira ocorrência, sem enrolação.

## 2. Telas

Barra fixa com 3 abas: **Estudar**, **Bancada** e **Revisar**. O leitor de módulo se abre dentro de Estudar.

- **Estudar → mapa do edital.**
  - Uma linha por item **oficial** do Anexo IV (1 a 10, com os subitens), com faixa, peso em 2023, status e barra de domínio.
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
- **Catálogo:** `js/apostila/index.js` traz a estrutura oficial do Anexo IV (10 itens e subitens, com o peso de 2023) e diz qual módulo cobre cada subitem (um módulo pode cobrir subitens de mais de um item).
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
2. Estrutura (catálogo, leitor, mapa, domínio, abas) e **um** módulo completo (`potencia-trifasicos`). **Ponto de parada:** o estudante avalia o tom e a profundidade.
3. Os cinco módulos restantes.

## Fora do escopo desta parte

Atendimento guiado, banco grande de questões, novas OS, módulos dos itens 1 e 7, Conhecimentos Gerais (Português e Matemática), sincronização entre aparelhos.

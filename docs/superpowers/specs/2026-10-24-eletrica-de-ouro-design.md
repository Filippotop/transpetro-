# Elétrica de Ouro: desenho

Data: 2026-10-24. Aprovado em conversa com o estudante, seção por seção. Este documento **substitui** o desenho de 2026-10-23 (apostila em camadas sobre a Bancada). O estudante rejeitou aquela interface e pediu "totalmente diferente": mais conteúdo explicativo, com fórmulas, usando como base o app **Humanas de Ouro** (`Filippotop/humanas-de-ouro`), que ele já usa.

## Objetivo

Um app de estudo para a prova da Transpetro (Edital nº 03/2026, Cesgranrio, nível médio, Ênfase 8: Manutenção – Elétrica). A prova é em **29/11/2026** (Anexo V original; o app avisa para conferir a retificação). São 40 questões específicas e 20 gerais (10 de Português e 10 de Matemática). É eliminado quem fizer menos de 50% em cada bloco ou zerar Português ou Matemática.

O app é o **Humanas de Ouro clonado**, com o mesmo visual, a mesma navegação e as mesmas ferramentas, e com conteúdo de Elétrica e de Matemática. A Bancada (simulador de OS) vira uma aba.

**Critério de sucesso:** o estudante estuda pelo app, e não por PDFs soltos. Cada item do edital tem uma estação com teoria explicativa, fórmulas com cada símbolo nomeado, exemplos resolvidos e questões no formato da prova de 2023. O que ele erra volta na revisão.

## Fontes de conteúdo

Arquivos do estudante, em `fontes/` no repositório:

| Arquivo | Cobre (Anexo IV) |
|---|---|
| Circuitos CC, Kirchhoff, Thévenin e Norton (HTML) | 2.1, 2.5, parte de 7.3 |
| Circuitos CA e trifásicos (HTML) | 2.2–2.4, 3.1–3.3, 4.1–4.2 |
| Eletromagnetismo e transformadores (HTML) | 5.1, 5.3, 7.2 |
| Simbologia e diagramas elétricos (HTML) | 1.1, 1.2, parte de 5.7 |
| Instalações elétricas prediais e NBR 5410 (HTML) | 8.1, 8.3, 10.1, parte de 5.6 |
| Banco de questões interativo (HTML) | 205 questões (temas T1–T5 = os cinco acima), 30 geradores com números sorteados, taxonomia de erros, simulado e caderno de erros |
| Apostila completa (MD) | os 10 itens, em resumo; 30 exercícios com gabarito comentado; formulário; números-âncora |
| Prova Transpetro 2023, Manutenção – Elétrica (PDF) | 60 questões, para a aba Provas |

**Erros já encontrados na apostila completa**, que não podem entrar no app como estão:
- Qualificado × legalmente habilitado (NR-10, 10.8.1 e 10.8.2): o registro no conselho define o **habilitado**, não o qualificado.
- "Ordem de prioridade 1–9" das medidas de controle: a NR-10 (10.2.8.2) só prioriza a desenergização e, na impossibilidade dela, a tensão de segurança. O resto é uma lista de exemplos, sem ordem.
- Queda de tensão: 4% é o limite dos **circuitos terminais**; o limite total é 7% a partir do transformador próprio. O valor de 5% a partir do ponto de entrega leva `confira`.
- Exercício 14: o gabarito se contradiz no próprio texto (B × A). O certo é (A).
- Exercício 8: a explicação da alternativa (C) não explica o número.

## 1. Estrutura (Humanas → Elétrica de Ouro)

| Humanas | Elétrica de Ouro |
|---|---|
| Linhas (H, G, F, S, L) | Linhas pela ordem do Anexo IV: **E** Eletricidade (itens 2, 3, 4) · **M** Máquinas e Comandos (1, 5) · **I** Instalações e Medidas (7, 8) · **A** Automação e Eletrônica (9) · **N** Segurança e Normas (6, 10) · **X** Matemática |
| Módulo (Teoria · Cartões · V ou F · Questões) | Estação (Teoria · **Fórmulas** · Cartões-resumo · V ou F · Questões) |
| Provas (ENEM recortado) | Prova Transpetro 2023 recortada por questão, com gabarito oficial, cronometrada (4 h / 60 questões) |
| Redação | **Bancada**: as 4 OS do simulador atual |
| Biblioteca | Formulário geral, números-âncora, NR-10 (10.5.1 e 10.5.2 em vigor × 10.13.1/10.13.2 de 2027), simbologia, glossário |
| Arena | Jogos rápidos: qual é a fórmula, ordenar a NR-10, grandeza e unidade, cálculo-relâmpago |
| Treino | Simulado na proporção de 2023 (40 específicas + 20 gerais, ~4 min por questão); recalibração com a prova de 2023; caderno de erros com tipo de erro; geradores com números novos |
| Plano / Painel / Missão de hoje / Foco / Aa / Buscar | Os mesmos, recalibrados para 29/11 e para o peso dos itens em 2023 |

**Estações** (uma por aprofundamento; o de CA vira duas):

| Linha | Estação | Itens | Fonte | Peso 2023 |
|---|---|---|---|---|
| E | E1 Circuitos CC: Kirchhoff, Thévenin e Norton | 2.1, 2.5 | estudante | 7 (item 2) |
| E | E2 Corrente alternada, fasores e impedância | 2.2–2.4 | estudante (CA, blocos 1–4) | (item 2) |
| E | E3 Potência, fator de potência e trifásicos | 3, 4 | estudante (CA, blocos 5–6) + medidor de energia e dois wattímetros | 5 + 3 |
| M | M1 Simbologia e diagramas | 1 | estudante | 0 |
| M | M2 Eletromagnetismo e transformadores | 5.1, 5.3 | estudante | 5 (item 5) |
| M | M3 Máquinas rotativas, proteção e partidas | 5.2, 5.4–5.7 | **novo** | (item 5) |
| I | I1 Instalações prediais e NBR 5410 | 8.1, 8.3, 10.1 | estudante | 6 (item 8) |
| I | I2 Média tensão e SPDA | 8.2, 8.4 | **novo** | (item 8) |
| I | I3 Medidas, retificadores, baterias e no-breaks | 7.1, 7.3, 7.4 | **novo** | 3 |
| A | A1 Eletrônica analógica e digital | 9.1, 9.2 | **novo** | 6 (item 9) |
| A | A2 Automação, CLP e controle | 9.3–9.5 | **novo** | (item 9) |
| N | N1 Segurança, NR-10 e manutenção | 6, 10.2–10.4 | **novo** (corrigindo a apostila) | 2 + 3 |
| X | X1–X3 Matemática do edital | Mat 1–10 | **novo** | 10 |

## 2. Estação por dentro

- **Cabeçalho:** linha · estação N de M · faixa (A/B/C pelo peso de 2023) · "N questões em 2023" · uma frase sobre por que o tema importa.
- **Teoria:** o aprofundamento inteiro, com sumário recolhível, quadros de fórmula (`.eq`, com cada símbolo nomeado e a unidade), figuras SVG, calculadoras interativas, exemplos resolvidos, "Pegadinha clássica" e "Como a Cesgranrio cobra".
- **Fórmulas:** o formulário-resumo da estação.
- **Cartões-resumo** e **V ou F:** de 10 a 20 de cada por estação.
- **Questões:** no formato da prova de 2023. Enunciado no estilo Cesgranrio, 5 alternativas, figura quando preciso, e uma explicação por alternativa que diz **qual erro leva a ela**. As do banco do estudante entram revisadas.

## 3. Produção em ondas

1. **Onda 1:**
   - o app clonado e com o visual novo no ar;
   - as 6 estações que vêm do material do estudante, revisadas;
   - o banco de questões no Treino;
   - a prova de 2023 recortada;
   - a Bancada;
   - a Biblioteca com formulário e NR-10;
   - Plano e Painel básicos.
   - As outras estações aparecem como "em breve".
2. **Onda 2:** A1, A2 e M3.
3. **Onda 3:** N1, I3 e I2.
4. **Onda 4:** X1–X3 (Matemática), mais Plano e Painel recalibrados com os resultados.

## 4. Qualidade (obrigatória em toda onda)

1. **Revisão técnica independente:** um revisor que não escreveu o texto confere cada fórmula, número de norma e afirmação técnica contra fonte confiável (gov.br, fabricantes, institutos federais, livros-texto). O que não for confirmado leva `confira`.
2. **Contas conferidas por teste:** cada exemplo resolvido e cada questão de cálculo tem a conta registrada e recalculada por teste. Gabarito: 5 alternativas, exatamente uma correta, explicação para cada uma.
3. **Teste no navegador:** a bateria do Humanas, adaptada (3 tamanhos de tela × 2 temas, axe WCAG AA, sem rolagem lateral, offline).
4. **Avaliação do estudante:** ao fim de cada onda, ele estuda pelo app por um dia e diz onde travou.

Questões de prova real só na aba Provas (2023, com gabarito oficial da Cesgranrio, que precisa ser obtido e conferido). As questões das estações são originais.

## 5. Técnico

- O repositório `Filippotop/transpetro-` passa a ter o Humanas clonado na raiz. O app atual da Bancada vai para `bancada/` (página própria, aberta pela aba Bancada, com link de volta) e mantém o seu progresso (`bancada-transpetro-v1`).
- **Dados:** `data/*.js` no formato do Humanas (`window.DATA`), um arquivo por estação ou grupo. As calculadoras dos aprofundamentos viram widgets registrados por `data-calc`, porque o HTML das estações entra por `innerHTML` e `<script>` não roda. As figuras SVG e os estilos `.eq`, `.frac` etc. vêm junto.
- **Progresso:** chave própria no `localStorage`; a sincronização por Gist do Humanas é mantida, com outro nome de arquivo.
- PWA com service worker próprio na raiz (cobre `bancada/`), offline.
- **Testes:** `npm test` = testes do Humanas adaptados + testes de dados (gabaritos, contas, esquema das estações) + testes da Bancada. CI no GitHub Actions.

## Fora do escopo

Português (o estudante vai bem em Linguagens). Questões de provas copiadas nas estações. Sincronização além do Gist do Humanas.

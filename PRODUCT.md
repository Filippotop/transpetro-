# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: PWA estático (HTML/CSS/JS puro, sem build), publicado no GitHub Pages a partir do `main`. Testes com `npm test` (Playwright + axe).

## Users

Filippo Vargas, candidato à Transpetro 2026 (Edital nº 03, Cesgranrio, nível médio, Ênfase 8: Manutenção – Elétrica). Estuda principalmente no celular (referência de teste: 390 px), em sessões curtas, até a prova em 06/12/2026. *(Confirmado pelo usuário.)*

## Product Purpose

App de estudo para a prova: estações por item do edital (teoria, calculadoras, exercícios), Provas, Bancada, Biblioteca, Arena, Treino, Plano e Painel. Sucesso = passar nos três cortes: >=50% nas 40 específicas, >=50% nas gerais, e nota diferente de zero em Português e Matemática.

## Positioning

*(Confirmado pelo usuário.)* Conteúdo amarrado ao edital (estações por item do Anexo IV, ordenadas pelo peso na prova de 2023), contas de exemplo recalculadas por teste e correções registradas em errata, e a Bancada (simulador de ordens de serviço com instrumentos virtuais e NR-10).

## Operating Context

Funciona offline depois do primeiro acesso (service worker). Progresso local no aparelho (`eletrica-de-ouro-v1`, `edo-*`), com cópia/importação ou sincronização por Gist. A Bancada guarda progresso próprio (`bancada-transpetro-v1`). Método de estudo: Apostila de Ouro em Camadas, da Anália.

## Capabilities and Constraints

- pt-BR; dados em `data/*.js`; estações geradas por `tools/estacao.mjs` (nunca editar `data/estacoes/*.js` à mão).
- Todo arquivo novo de runtime entra em `SHELL_FILES` no `sw.js`, e `VER` muda a cada publicação.
- Questões: 5 alternativas, uma correta, explicação de cada alternativa. Nunca inventar gabarito oficial.
- Sem conteúdo do Humanas de Ouro (ENEM, História, Filosofia).
- Correção técnica acima de tudo; o que não for confirmado leva `<span class="confira">`.
- Prova: 06/12/2026 (adiada de 29/11).

## Brand Commitments

Manter a base visual e de navegação do Humanas de Ouro (tokens, temas escuro/claro, estrutura de abas); o usuário quer incrementar e deixar mais polido, não substituir. *(Decisão do usuário.)*

## Evidence on Hand

Aprofundamentos do estudante em `fontes/`, prova de 2023 em `fontes/prova-2023-manutencao-eletrica.pdf`, `fontes/ERRATA.md`, suíte de testes. Não há depoimentos, métricas de uso nem gabarito oficial além do que está nos arquivos; não fabricar.

## Product Principles

1. Correção técnica antes de estética: nenhuma mudança visual pode alterar ou esconder conteúdo conferido.
2. Celular primeiro, uso rápido em sessão curta.
3. Funciona offline e sem build.
4. Evolução do sistema existente, não ruptura: refinar o que o Humanas de Ouro já estabeleceu.
5. Foco no que cai na prova e no prazo até 06/12.

## Accessibility & Inclusion

WCAG AA (axe em 3 tamanhos x 2 temas já faz parte do `npm test`).

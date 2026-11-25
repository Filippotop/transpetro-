# Progresso (atualizado a cada tarefa concluída)

Última atualização: 2026-11-25 (edital consolidado até o DOU de 10/11/2026 conferido: Anexo IV da Ênfase 8 sem mudança, prova 06/12, corte 7.1.4.3 = 50% da Fase 1, 50% da Fase 2 somada e nota zero em qualquer geral; figuras de resposta revisadas por segunda leitura e 5 corrigidas). T1–T6, M3, A2, N1, A1, I3, I2, X1, X2 e X3 concluídas e revisadas (X2 e X3 revisadas por duas passadas em Sonnet, não em Opus; A1, I3 e I2 por uma passada em Opus, só leitura). Matemática completa (X1–X3). Todas as estações do edital estão no app; o que resta é a avaliação do estudante e o estudo.

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

## Rodada de melhorias (2026-11-25), VER 2026-11-25.1

- Banco: 825 → 902 questões (+77 revisadas pelo Opus: N1 +12, M2 +6, M3 +18, X1 +16, X2 +10, P1 +15). Ficaram de fora três de Português com alternativa ambígua (reg1, paron2, paron6). As letras corretas das 825 já publicadas ficam congeladas em `tools/banco/letras-publicadas.json` (o histórico guarda a letra marcada); ao publicar um lote novo, acrescente as letras dele.
- Figuras de resposta: segunda leitura independente das 147; corrigidas E1 Thévenin (painéis incoerentes), E1 fonte de corrente (sentido), A1 amp-op inversor (fio em curto sobre Ri), base do transistor e um rótulo em inglês.
- Usabilidade a 390 px: alvos de toque de 44 px (topo, chips, barra inferior, checkboxes do Plano), aviso de download das provas só depois da 1ª questão ou na 2ª visita, feedback de erro visível, subabas sem rolagem escondida.
- Plano: simulado de 2 h pode ser feito em dois blocos; revisões de X3 (02/12) e X2 (03/12); o simulado usa o `mapa2023` por estação.
- Base para outras matérias: `tools/novo-app.mjs` e `docs/BASE-REUTILIZAVEL.md` (o motor do Elétrica não foi alterado). Pesquisa e prioridades: `docs/PESQUISA-MELHORIAS.md`.
- Edital consolidado até o DOU de 10/11/2026 conferido: Anexo IV da Ênfase 8 sem mudança e prova em 06/12.

## Circuito resolvido nas respostas (2026-11-24)

`data/figresp.js` (gerado por `tools/figresp.mjs` a partir de `tools/figresp/*.mjs`) traz o circuito de cada questão que tem um, desenhado já resolvido, mostrado só na resposta (`qFigResp` em `index.html`; botão "Ampliar a figura" no celular). Cobertura: E1, E2, E3, C1, M1 (comandos, reaproveitando CMD1/CMD2 do banco), M2, M3, I1, I2, I3, A1 e A2. Ficam sem figura as questões de teoria, norma, lógica/Karnaugh, Português, Matemática e as de NR-10. **Não cobertos:** as questões dos geradores de números novos (`js/gerador.js`), a aba Provas (questões reais em imagem) e as perguntas de comando/CLP em escada que não usam o diagrama de partida direta/reversão. Revisão independente das figuras ainda pendente (conferidas só por mim, olhando as folhas de contato e recalculando os números da explicação).

## Decisões já tomadas (não reabrir sem motivo)

- **Data da prova:** **06/12/2026**. O edital original (Anexo V) dizia 29/11; a retificação publicada no DOU de 10/09/2026 e a nota da própria Transpetro (transpetro.com.br, "alterações em cronograma") adiaram para 06/12 (cartão de confirmação 01/12, gabaritos 07/12, recursos 07 e 08/12). Notícias de 11/11 (Agência Brasil, O Globo) confirmam. Alguns sites ainda citam 29/11 por engano. O app dizia 29/11 até 14/11/2026.
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
- pendências da revisão da onda 4 tratadas em 2026-11-12 (ver `fontes/ERRATA.md`, seções C1 e P1); seguem abertas: o texto da NBR 6856 (pago) não foi lido, a lista de cargas C2,5 a C200 e os 75–80% da chave centrífuga continuam com `confira`.

## Visual e movimento (2026-11-12)

`css/motion.css`, `js/motion.js` e `vendor/gsap.min.js` (GSAP 3.15.1, o mesmo do Humanas). Ideia: o mapa das linhas é um circuito. O trilho é desenhado e as estações acendem em sequência ao entrar na tela; estação concluída fica acesa; um pulso percorre a linha do próximo passo da missão; a resposta certa de primeira solta faíscas e a errada treme; fundo de papel de esquema e manchas das cores das linhas. Preferência "animações" em Aa (Automático, Completas, Leves, Desligadas; chave `motion` em `edo-prefs`); "reduzir movimento" do aparelho desliga tudo. Nada fica escondido à espera de rolagem (o axe reprova texto com opacidade 0). Do `motion.js` do Humanas ficaram de fora: rolagem suave (Lenis), fundo WebGL, partículas, inclinação 3D e título palavra por palavra. O teste de abas do `tests/smoke.mjs` espera 1,1 s antes do axe, porque a entrada da tela dura até 0,85 s.

## Plano de estudo até a prova (2026-11-14)

`data/plano.js`: 26 dias, 10/11 a 05/12 (os de 10 a 15/11 ficaram como estavam, para não perder marcações). De 16/11 em diante: (1) 16 a 24/11 primeira passada pelas estações que faltam na ordem do peso de 2023; (2) 25 a 27/11 simulado completo e pontos fracos; (3) 28/11 a 04/12 prova real de 2018 (fora do app, links na página do Plano), prova de 2023 outra vez, segunda passada (tarefa nova `rev`: reabre a estação na aba Questões, sem marcar sozinha) pelas estações de maior peso, simulados e erros; (4) 05/12 véspera. Regras do edital conferidas no PDF: 40 específicas + 10 Português + 10 Matemática; elimina menos de 50% nas específicas ou nas gerais, ou zero em Português ou Matemática; o ranqueamento da 1ª etapa usa só a nota das específicas (até 2 vezes vagas + cadastro por ênfase/polo), e a nota das gerais soma depois. Ênfase 8: 3 vagas imediatas e 33 posições no total (fonte: IBETP, a conferir no Anexo I). Cobertura do edital: os 57 subitens (Anexo IV, Ênfase 8, Português e Matemática) têm estação e questões; o PDF do edital no repositório é o original (o conteúdo programático não mudou nas retificações lidas).

## Fora deste repositório

- `Filippotop/humanas-de-ouro`, branch `ccr-0d786ede-6b8nps`: tira a pasta `bancada/` antiga do Humanas e protege o SW de lá contra cachear páginas 404. **Precisa de pull request e merge** (o estudante faz pelo GitHub).

## Como continuar

Pegue a primeira tarefa ⬜ ou ⏳ da tabela e leia o texto dela no plano. Siga o `AGENTS.md`, rode a revisão independente, faça commit, push e atualize esta página.

## Interface de estudo (2026-11-14)

Referências: StudyRise e PLABRevisions (painel de preparo com critérios visíveis, checklist da semana da prova), Duolingo (um passo claro por vez), TEC Concursos (filtros por assunto do edital, que o Treino já cobre). Feito: painel "Plano de hoje" na tela inicial (fase, barra, tarefas abríveis); painel "Pronto para a prova?" no Painel (4 critérios; limiares de 60%, 20 respostas e 3 simulados são escolha nossa, não do edital); "Semana da prova" nos últimos 7 dias (itens 8.3.1 e 8.18 do edital). Sem revisão independente (só interface).

Rodada seguinte (2026-11-14): aquecimento de 10 questões dos pontos fracos na tela inicial; "chance de passar nos cortes" no painel de preparo (binomial com o acerto de primeira, prior 2/2; específicas 20 de 40, gerais 10 de 20 sem zerar nenhuma; termômetro, não promessa); "dia fechado" com prévia de amanhã e confete (canvas-confetti 1.9.4, ISC, em vendor/); troca de aba com View Transitions nativas; números de largura fixa e escala 0,96 no toque (skill make-interfaces-feel-better, MIT). Sem revisão independente (interface).

Tema "papel" (2026-11-14): `css/tema.css` com tokens em três camadas (skill design-system); cartões brancos de borda fina, rótulos mono pequenos, gráfico de linha com área em SVG (Ritmo) e atalhos na tela inicial, seguindo o painel de referência do estudante. Dourado e cores das linhas mantidos.

Aulas em vídeo (2026-11-14): `aulas/v1..v3.mp4` (fator de potência, trifásico, constante RC), tela "Aulas" (`#aulas`, atalho na home). Feitas com HyperFrames 0.9.46 (Apache 2.0): voz Edge TTS (pt-BR-ThalitaMultilingual, escolhida pelo Filippo entre Kokoro, Piper, Chatterbox e Edge) por frase, sincronia exata pelas durações; Whisper medium local (faster-whisper) conferiu a fala (WER 2% a 4% em v1/v2; 19% em v3 só por grafia de unidades como "10 kOhm"). Vídeos não ficam no cache offline (o SW ignora `/aulas/`). Fontes do projeto de vídeo: `C:\Users\fivar\edo-aulas` (fora do repo). Sem revisão independente do roteiro: números conferidos à mão (cos φ 0,8; S/P/Q 2200/1760/1320; √3×220≈381; τ=RC=1 s; 63/86/99/37%).

Lacunas da auditoria de cobertura (2026-11-15): +10 questões (591 no banco): energia, medidor e custo (3.1, 4), fator de potência e correção (3.3, 2) e unidades do SI (7.2, 2) na aba Questões de E3 e M2; terrômetro (8.3, 2) em I3. Os extras de C1 aceitam `mod` (a questão aparece na estação do assunto). O bloco 5 de T1 deixou de contar tudo como 3.2: b5:0, b5:2 e b5:3 contam 3.3 e b5:4 conta 3.1. Biblioteca: fórmula e3-en (energia e custo) e termo 'Prefixos do SI'. Revisão independente: ver fontes/ERRATA.md.

Questões no nível da prova (2026-11-15): +144 questões (735 no banco: 236 fáceis, 377 médias e 122 difíceis), todas em `tools/banco/<ID>x.mjs` (formato em `tools/banco.mjs`), com revisão independente (ver ERRATA). Simulado ganhou o seletor Nível: misto, do fácil ao difícil, só fáceis, só médias, só difíceis.

2026-11-16: alternativas das 164 questões com a correta mais longa equilibradas; +14 questões de Português (P1z.mjs): banco com 749 questões. Gerador do banco aceita <ID>x.mjs e <ID>z.mjs.

2026-11-17: polimento visual (Impeccable) em `css/polish.css`, carregado depois de `motion.css`: cartão Próximo passo, aba ativa em ouro, ícones das tarefas, título da missão e contador. Só acabamento, sem mudar conteúdo. Adicionado `PRODUCT.md` (contexto de produto do Impeccable). `VER` do sw.js 2026-11-17.1; npm test verde (smoke com axe incluso). Sem revisão independente de outra sessão ainda.

2026-11-17 (v2): `css/polish.css` refeito: neutros quentes no claro, grafite em degraus no escuro, anel de 1px no lugar de borda, ouro só como cor de marca, Próximo passo chapado, raio 8-10px. Referências: Vercel, Linear, Notion, Stripe. `VER` 2026-11-17.2; npm test verde. Sem revisão independente de outra sessão.

2026-11-17: exercícios de fixação da Teoria guardam a resposta (S.fx, sincroniza e respeita exclusão) e ganham o botão "Refazer a seção" (2 toques). VER 2026-11-17.1.

2026-11-17: Biblioteca → Contas passo a passo (29 contas, Treinar com 3 acertos seguidos = dominada, S.ct), botão no Formulário de cada estação, atalho na home, busca; animações de acerto/erro nas alternativas. VER 2026-11-17.2.

2026-11-19: figuras SVG animadas nas 29 contas (js/contas-fig*.js, tools/fig-preview.mjs), acendem por passo, Treinar sem vazar resultado. VER 2026-11-19.1.

2026-11-19: painéis animados em CA e do capacitor, pausa, pulso por passo, contagem do resultado; Treinar sem vazar por proporção. VER 2026-11-19.2.

2026-11-19: aba Contas: treino misto, revisão espaçada, diagnóstico de erro, dicas, busca, cálculo mental, 4 contas novas (3 de prova real). VER 2026-11-19.3.
2026-11-19 (noite): +30 questões de Instalações/NBR 5410 (banco 779, revisão Opus aplicada), modo "Riscar alternativas" e regra do erro no cartão. VER 2026-11-19.5.
2026-11-24: análise crítica (2 revisores Opus); +26 questões de E3 (12 com figura) e +20 de Português com texto longo (banco 825); aviso de NÃO SALVO, versão no menu Aa, Próximo passo = plano do dia. VER 2026-11-24.1.
2026-11-25: questões novas 2026-11-25: 77 itens revisados pelo Opus integrados no banco (banco 902): N1 +12 (6.3 e 10.3, 45→57), M2 +6 (7.2, 10→16), M3 +18 (5.2, 5.6, 5.7, 42→60), X1 +16 (juros 4 e restos/movimento 12, 48→64), X2 +10 (geometria Mat 9 e 10, 42→52), P1 +15 (Português, 84→99). Correções do Opus aplicadas; contas recalculadas. Ficaram de fora: reg1, paron2 e paron6 (o Opus pediu nova revisão, trocam uma alternativa) e nenhum "descartar". Origem "e:EST:zN" (Português "e:P1:wN"), não "novo 2026-11-25": os testes contam e classificam as extras pelo prefixo da origem. Testes: exceção documentada PREFIXO_UNIDADE (M2 z1 e z3: 33,84 mJ × 33,84 J; 1 H × 1 mH). VER não atualizado: sw.js fora desta tarefa.

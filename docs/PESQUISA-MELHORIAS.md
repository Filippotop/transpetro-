# Pesquisa: o que melhora o Elétrica de Ouro (2026-11-25)

Fontes lidas nesta rodada (abstracts e páginas oficiais; os PDFs completos não foram abertos):

- Dunlosky et al. (2013), *Improving Students' Learning With Effective Learning Techniques*, Psychological Science in the Public Interest. Prática com testes e prática distribuída receberam utilidade **alta**; interleaving e autoexplicação, **moderada**; reler e grifar, **baixa**.
- Hattie e Donoghue / meta-análise de 10 técnicas (Frontiers in Education, 2021): 242 estudos, 169 mil participantes; prática distribuída d = 0,85 e prática com testes d = 0,74; o efeito do teste é maior com **feedback**. Ressalva dos próprios autores: a maioria dos estudos mede memória de fatos, perto do momento do estudo.
- Meta-análise em salas de aula reais (Educational Psychology Review, 2026): teste g = 0,37, espaçamento g = 0,20, intercalação g = 0,40; a intercalação funcionou melhor com **feedback atrasado** do que com feedback imediato.
- Estudo com estudantes com TDAH (PMC10397724): a prática de recuperação ajuda igual em quem tem e em quem não tem TDAH; o déficit está mais na **codificação** (estudar de forma rasa) do que na recuperação.
- FSRS (open-spaced-repetition/ts-fsrs, MIT): agendador de repetição espaçada mais preciso que o Leitner; exige pacote Node 24 ou bundle, e histórico de acertos por item.

## O que o app já faz certo

- Questões e contas com feedback por alternativa (efeito do teste com feedback).
- Leitner de 5 caixas nas contas e nos cartões, com intervalos de 1, 3, 7 e 14 dias limitados a 20% do tempo que falta para a prova (`js/contas.js:570-594`).
- Treino misto que evita duas contas seguidas da mesma estação (intercalação).
- Caderno de erros e "refazer os erros".

## Lacunas, em ordem de ganho pelo esforço

1. **As questões do banco (825) não têm revisão espaçada própria.** Só as contas e os cartões têm. O erro volta pelo "refazer os erros", sem data. Proposta: ao errar uma questão, agendar 1, 3 e 7 dias (mesma tabela do Leitner, capada pela prova) e mostrar "Revisão de hoje: N questões" na Missão. Mexe em `S` (progresso salvo): fazer em branch, com migração que não apague nada. Para a prova de 06/12 o ganho é pequeno (faltam 11 dias); vale mais como base para as próximas matérias.
2. **Feedback atrasado no simulado.** A meta-análise de 2026 aponta ganho da intercalação com feedback atrasado. O simulado já mostra o resultado só no fim; manter assim.
3. **Codificação antes da prática (TDAH).** Antes de uma estação nova, 2 minutos de "o que eu já sei sobre isto" (pergunta em branco) e uma autoexplicação em voz alta depois de cada conta resolvida. Custo: texto na tela, sem lógica nova.
4. **Sessões curtas com fim claro.** O plano ainda tem tarefas de 2 h e de 4 h; foram partidas em blocos no texto, mas o relógio do simulado não pausa. Proposta: botão "Pausar" que congela o cronômetro e grava o ponto (precisa teste em Playwright).
5. **Quatro números de peso conflitantes** entre `peso2023` das estações e `mapa2023`: o simulado já usa o mapa (corrigido nesta rodada); o campo antigo ainda aparece em textos das estações.

## O que não vale a pena agora

- Trocar o Leitner por FSRS: precisa de histórico longo para calibrar; em 11 dias não há dados.
- Gamificação nova (pontos, ranking): o app já tem metas e sequência; não há evidência forte de que melhore a nota.
- Reler e grifar: baixa utilidade; o app não deve incentivar.

## Pendências de conteúdo

- Itens do edital com menos questões: 6.3 (3), 7.2 (4), 10.3 (4), 5.2 (6), 5.6 (5) e Mat 9 e 10 (11 juntos). A rodada de 2026-11-25 acrescenta questões revisadas a todos.
- Rascunhos de Português com alternativa ambígua (`reg1`, `paron2`, `paron6`) ficaram de fora até nova revisão.
- Não consegui confirmar os textos da NBR 5410, NBR 6856 e IEC 60947 (normas pagas): tudo que depende deles leva `confira`.

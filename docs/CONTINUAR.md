# Como continuar em outra sessão

Atualizado em 2026-11-10 (prova em **29/11/2026**, faltam 19 dias).

## 1. Cole isto na sessão nova

```
Estamos construindo o app "Elétrica de Ouro" (repo Filippotop/transpetro-, branch main): um clone do Humanas de Ouro com conteúdo da prova da Transpetro 2026 (Cesgranrio, Ênfase 8 Manutenção–Elétrica). Leia AGENTS.md, depois docs/CONTINUAR.md e docs/PROGRESSO.md, e continue de onde parou. Fale em português, seja direto e honesto, sem me elogiar. Regras: correção técnica acima de tudo, revisão independente por tarefa (subagentes), commit e push a cada passo verde.
```

Se a sessão nova for na nuvem, anexe o repositório `Filippotop/transpetro-` e use `CHROMIUM=/opt/pw-browsers/chromium npm test`.

## 2. O que está pronto (no `main`)

- App no ar: <https://filippotop.github.io/transpetro-/> (PWA offline, tema claro e escuro).
- **Estações completas e revisadas:** E1 (CC), E2 (CA/fasores), E3 (potência, trifásicos, medidor, dois wattímetros), M1 (simbologia e diagramas), M2 (eletromagnetismo e transformadores), I1 (instalações e NBR 5410).
- **M3** (motores, proteção e partidas): escrita, no app (4 calculadoras, 34 questões, 3 geradores) e revisada em 10/11 (correções em `fontes/ERRATA.md`).
- **Banco de questões** (205 + as da M3), 33 geradores de "números novos", simulado na proporção de 2023, Painel com tipos de erro (T4, concluída e revisada).
- **Prova de 2023** recortada por questão, com **gabarito oficial** da Cesgranrio (`fontes/gabarito-2023.json`): Q28 e Q30 foram anuladas (ponto para todos). Corte de 50% por bloco e veredito do edital (T5, revisada e aprovada).
- Bancada (simulador de OS) em `bancada/`.
- `fontes/nr10-2019-x-2026.md`: NR-10 vigente (2019) lado a lado com a nova (Portaria MTE 737/2026, vale a partir de 01/06/2027), com texto literal do gov.br.

## 3. O que falta, em ordem

1. **T6**: implementada em 10/11 (Biblioteca, três jogos da Arena, Plano de 10/11 a 28/11 em `data/plano.js`, Painel por item do edital, Missão pelo `mapa2023`), com `npm test` verde e revisão independente feita. O que ficou de fora está em `docs/PROGRESSO.md`, "Pendências menores".
2. Revisões independentes da M3 e da T6: feitas em 10/11, achados corrigidos.
3. **Parada obrigatória após a T6:** mandar o link e prints ao estudante para avaliar.
4. Ondas seguintes (ordem escolhida pelo estudante, mantida mesmo depois do aviso de que Matemática elimina): **A1, A2** (eletrônica e automação, peso 6) → **N1, I3, I2** → **Matemática X1–X3**. Com 19 dias, provavelmente só cabem A1 e A2; decida com o estudante o que cortar.

## 4. Decisões já tomadas (não reabrir sem motivo)

- Prova em 29/11/2026 (edital original; "confira a retificação" no site da Cesgranrio).
- Numeração da prova de 2023: Português 1–10, Matemática 11–20, Específicas 21–60.
- Q28 de 2023 (Dy5): anulada pela banca; o app ensina a regra (BT atrasada 150° da AT). Q30: anulada, provável motivo (duas alternativas iguais) é **inferência** e está dito na tela.
- A NR-10 que a prova cobra é, provavelmente, a de 2019 (vigente em 29/11/2026); isso é inferência, marcada com `confira`.
- Peso por estação vem do `mapa2023` (`data/provas.js`), não do campo `peso2023` (que é o peso do item inteiro).
- Geradores: letra da resposta sorteada de A a E, só erros reais (sem enchimento); exceções documentadas em `tests/questoes.test.mjs`.
- Simulado: a partir de 15 questões, toda estação com questões entra com pelo menos 1.
- Progresso do estudante: chave `eletrica-de-ouro-v1` no navegador (nunca misturar com Humanas nem Bancada).

## 5. Erros da apostila do estudante (já corrigidos no app, não reintroduzir)

Qualificado × habilitado; ordem 1–9 das medidas de controle inventada; queda de tensão 4%/7%; exercício 14 e 8; "reenergização é a ordem inversa"; zona controlada com redação de 2027; regra dos 75 kW e reciclagem bienal só valem até 31/05/2027; "impossibilidade de aterrar = instalação energizada" não está em nenhum dos textos (o 10.5.4 fala de instalação desligada que pode ser reenergizada). Detalhes em `fontes/ERRATA.md` e `fontes/nr10-2019-x-2026.md`.

## 6. Como trabalhar

- Rodar: `npm install` e `CHROMIUM=/opt/pw-browsers/chromium npm test`. No Windows: `npx playwright install chromium` e `npm test` (o `.gitattributes` mantém LF; sem ele o `tools/banco.mjs` falha).
- Cada estação nova segue `AGENTS.md` ("Para criar uma estação NOVA"): aprofundamento em `fontes/`, metadados em `tools/estacoes/<ID>.mjs`, gerar com `node tools/estacao.mjs`.
- Modelos: **Opus** para conteúdo técnico e para revisões; **Sonnet** para telas, testes e código mecânico (julgamento, não medido).
- O limite de 5 horas estourou várias vezes com agentes em paralelo. Prefira no máximo 2 ao mesmo tempo; quando um falha por limite, retome-o com a mesma mensagem depois do horário de reset.
- Cada agente deve fazer commit e push a cada passo funcional (`git pull --rebase origin main` antes de empurrar).
- Marcar o que não for confirmado em fonte oficial com `<span class="confira">`.

## 7. Plugins

O claude-mem (memória entre sessões) foi instalado só no contêiner da nuvem, modo local, sem sincronização. Ele some com o contêiner; **a continuidade real é este arquivo, o `AGENTS.md` e o `docs/PROGRESSO.md` no GitHub.**

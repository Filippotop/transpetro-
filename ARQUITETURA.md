# Arquitetura

HTML + CSS + módulos ES nativos, sem etapa de build e sem dependências em tempo de execução. O GitHub Pages serve os arquivos como estão.

## 1. Mapa do código

| Arquivo | Responsabilidade |
|---|---|
| `js/util.js` | Formatação, sorteio com semente (testes), ruído de leitura, números complexos |
| `js/instruments.js` | Instrumentos, sequências da NR-10 (10.5.1 e 10.5.2), data da prova |
| `js/engine.js` | Motor **sem DOM**: estado do atendimento, toque nos alvos, bloqueio de ohmímetro/megôhmetro energizado, desenergização, dicas, pontuação, provas |
| `js/draw.js` | Primitivas SVG e alvos clicáveis `TPt` (ponto de teste), `HIT` (componente), `RING` (anel do alicate) |
| `js/missions/*.js` | Uma missão por arquivo (dados + modelo elétrico + desenho); `index.js` é o catálogo |
| `js/store.js` | Persistência em `localStorage` com migração, exportação e importação |
| `js/review.js` | Revisão espaçada (Leitner, caixas 1–5: 0, 1, 3, 7 e 16 dias) |
| `js/app.js` | Telas e eventos (delegação; nenhum `onclick` inline), `<dialog>` nativo, histórico do navegador |
| `sw.js` | Service worker próprio: cache versionado do app e das fontes |

## 2. Contrato de uma missão

O motor não conhece eletricidade: ele só chama estes membros.

```js
{
  id, n, titulo, area, edital, local, equip, sintoma,   // textos da OS
  instr: ["V","A","O","M","L","T","I"],                 // instrumentos disponíveis
  needsNR10: true, ctl0: {...},
  setup(F) -> params,                                    // parâmetros sorteados para a falha F
  measure(R, ins, target) -> {txt, unit, where, interp, key} | {na}
  action(R, nome), controls(R) -> HTML, svg(R) -> SVG,
  tick(R) -> bool (opcional), onDesen/onReen (opcionais),
  diag: [{id,t}], acts: [{id,t}],
  faults: [{ id, nome, diag, act, ideal, hints:[3], provas:[{any:[keys], txt}],
             explica, teoria, cesg, questoes:[{s,o:[5],a,c}] }]
}
```

- `target` é `{a,b}` (voltímetro entre dois pontos), `{c}` (componente) ou `{cl}` (anel do alicate).
- `controls()` usa `data-act="nome"` nos botões; o app chama `action(R, nome)`.
- Para registrar no caderno de campo, use `R.logAdd(texto, "ok" | "bad" | "hint")`. Para sortear, use `rand`/`pick`/`noise` de `util.js` (nunca `Math.random`), senão os testes deixam de ser determinísticos.
- `key` é a etiqueta da medição (ex.: `V:F21=hi`, `A:N=0`, `M:C2=NPE0`). As `provas` listam as etiquetas que demonstram o defeito; uma etiqueta terminada em `*` funciona como prefixo. Eventos observados também geram etiquetas (`E:selo`, `E:retrip`, `E:only:C2`).
- **Regra**: uma medição feita com o circuito desenergizado (ou o motor parado) deve gerar uma etiqueta própria (`=desen`, `=parado`), nunca a mesma de uma leitura real de zero. O teste `missions.test.mjs` cobra isso.

Ao criar uma missão, acrescente-a em `js/missions/index.js` e em `FILES` no `sw.js`. Os testes de integridade passam a cobri-la automaticamente.

## 3. Modelos elétricos

| Missão | Modelo |
|---|---|
| 1 · Comando | Conectividade booleana do ramo da bobina (L → F21 → 95-96 → S0 → S1‖selo → bobina → N), iterada para o selo |
| 2 · Quadro | Fasores: fonte em estrela 220/127 V e cargas resistivas monofásicas; neutro rompido ou com resistência pelo **teorema de Millman** |
| 3 · Motor | Valores tabelados por falha; desarme do relé por `tick` |
| 4 · DR | Soma das fugas dos circuitos ligados comparada ao limiar (19 mA normal; 9 mA no DR defeituoso); o testador mede `limiar − fuga presente` |

Os modelos são didáticos: servem para treinar o raciocínio de medição, não para cálculo de projeto.

## 4. Pontuação

Diagnóstico 50 + ação 20 + segurança 20 (−10 por violação) + eficiência 10 (só com diagnóstico certo: medições ≤ referência, 10; ≤ 2× referência, 5) − 5 por dica. Estrelas: ≥85 = 3, ≥65 = 2, ≥40 = 1.

## 5. Persistência

`P = {v:2, res:{<missão>:{best, n, faults:{<falha>: melhorNota}}}, nr10ok, instrutor, exams:[...], srs:{<missão/falha/i>: {box, due, seen, wrong}}}` em `localStorage` (`bancada-transpetro-v1`). Dados da versão 1 (o HTML único) são migrados sem perda.

## 6. Fatos normativos usados

- **NR-10, item 10.5.1**: seccionamento → impedimento de reenergização → constatação da ausência de tensão → aterramento temporário com equipotencialização → proteção dos elementos energizados na zona controlada → sinalização de impedimento de reenergização. A nova redação (Portaria MTE nº 737, de 29/05/2026, DOU de 01/06/2026) só entra em vigor em **01/06/2027**. Ao atualizar o app para depois dessa data, revise a sequência.
- **DR**: atuação entre 50% e 100% de IΔn; o toróide envolve fases e neutro, nunca o PE.
- **Data da prova**: `EXAM_DATE` em `js/instruments.js` (29/11/2026, Anexo V do edital original; `EXAM_DATE_NOTE` avisa na tela). **Confira a retificação no site da Cesgranrio**: há fontes com datas diferentes (06/12/2026).

## 7. O que ainda não foi feito

1. Editor de missões em JSON (transformador com ensaios a vazio e de curto, partida estrela-triângulo, terrômetro, TC com secundário aberto).
2. Ponta de prova arrastável e pinça para zoom (hoje: botão “Ampliar diagrama” com rolagem lateral).
3. Sons do contator e do disparo do DR; animação do fluxo de corrente depois do diagnóstico.
4. Sincronização entre aparelhos (hoje: exportar e importar arquivo).

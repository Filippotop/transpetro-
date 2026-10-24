# Bancada Virtual de Manutenção

Simulador de diagnóstico de defeitos elétricos para o Processo Seletivo Transpetro 2026 (Edital nº 03, Cesgranrio), Ênfase 8: Manutenção – Elétrica.

O aluno atende ordens de serviço (OS), mede circuitos com instrumentos virtuais, desenergiza seguindo a NR-10, emite um diagnóstico e recebe relatório, teoria e questões no estilo da banca.

- **4 OS, 18 defeitos sorteados**: comando de partida direta, quadro 220/127 V (neutro, fase, fornecimento), motor no CCM e DR.
- **Modo treino**: instrutor que interpreta cada leitura e dicas do supervisor (−5 pontos cada).
- **Modo prova**: 8 minutos, sem instrutor nem dicas, ordenação da NR-10 em todo atendimento e ranking pessoal.
- **Revisão espaçada** (sistema de Leitner) das questões do relatório: o que você erra volta no dia seguinte.
- **Offline**: o service worker da raiz (`../sw.js`) guarda a Bancada; depois da primeira visita ao Elétrica de Ouro, ela abre sem internet. A Bancada não registra service worker próprio.
- **Progresso no aparelho**, com exportação e importação de um arquivo para trocar de celular.
- Acessível: todos os alvos do diagrama funcionam por teclado; contraste WCAG AA nos temas claro e escuro.

## Como usar

Publicado no GitHub Pages: `https://filippotop.github.io/transpetro-/bancada/` (aba **Bancada** do Elétrica de Ouro, que fica um nível acima; o link “← Elétrica de Ouro” volta para ele). No celular, abra o endereço e use **Adicionar à tela inicial**.

Para rodar localmente, sirva a raiz do repositório com qualquer servidor estático (os módulos ES não abrem por `file://`):

```
npx serve .        # na raiz do repositório; depois abra http://localhost:3000/bancada/
```

## Testes

Na raiz do repositório:

```
npm install
npm test
```

- `bancada/tests/engine.test.mjs`: pontuação, regras de segurança, NR-10, persistência, revisão espaçada e checagens dos modelos elétricos (Millman, desequilíbrio 380/363/363 V, limiares do DR).
- `bancada/tests/missions.test.mjs`: percorre **todos os estados alcançáveis** de cada missão, mede tudo e exige que cada prova listada no relatório seja obtível; e garante que leituras com o circuito desenergizado não “provam” nada.
- `bancada/tests/smoke.mjs`: joga uma OS inteira num Chromium de verdade em 3 tamanhos × 2 temas, roda o axe (WCAG AA), confere revisão, modo prova, botão voltar e o link de volta. O offline da Bancada é testado em `tests/smoke.mjs` da raiz.
- `bancada/tests/sw.test.mjs`: todo módulo que a Bancada importa está em `BANCADA_FILES` do `sw.js` da raiz.

Se o Chromium do Playwright não estiver instalado, aponte para outro: `CHROMIUM=/caminho/do/chrome npm test`.

## Publicar uma versão nova

Mude `VER` no `sw.js` da raiz e, se a Bancada ganhar arquivo novo, acrescente-o em `BANCADA_FILES`.

Detalhes do código e de como criar novas OS: [ARQUITETURA.md](ARQUITETURA.md).

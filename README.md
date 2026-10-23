# Bancada Virtual de Manutenção

Simulador de diagnóstico de defeitos elétricos para o Processo Seletivo Transpetro 2026 (Edital nº 03, Cesgranrio), Ênfase 8: Manutenção – Elétrica.

O aluno atende ordens de serviço (OS), mede circuitos com instrumentos virtuais, desenergiza seguindo a NR-10, emite um diagnóstico e recebe relatório, teoria e questões no estilo da banca.

- **4 OS, 18 defeitos sorteados**: comando de partida direta, quadro 220/127 V (neutro, fase, fornecimento), motor no CCM e DR.
- **Modo treino**: instrutor que interpreta cada leitura e dicas do supervisor (−5 pontos cada).
- **Modo prova**: 8 minutos, sem instrutor nem dicas, ordenação da NR-10 em todo atendimento e ranking pessoal.
- **Revisão espaçada** (sistema de Leitner) das questões do relatório: o que você erra volta no dia seguinte.
- **Instalável e offline** (PWA): depois do primeiro acesso, funciona sem internet.
- **Progresso no aparelho**, com exportação e importação de um arquivo para trocar de celular.
- Acessível: todos os alvos do diagrama funcionam por teclado; contraste WCAG AA nos temas claro e escuro.

## Como usar

Publicado junto com o repositório no GitHub Pages: `https://filippotop.github.io/humanas-de-ouro/bancada/`. No celular, abra o endereço e use **Adicionar à tela inicial**.

Para rodar localmente, sirva a raiz do repositório com qualquer servidor estático (os módulos ES não abrem por `file://`):

```
npx serve .        # depois abra http://localhost:3000/bancada/
```

## Testes

Na raiz do repositório:

```
npm install
npm run test:bancada
```

- `tests/engine.test.mjs`: pontuação, regras de segurança, NR-10, persistência, revisão espaçada e checagens dos modelos elétricos (Millman, desequilíbrio 380/363/363 V, limiares do DR).
- `tests/missions.test.mjs`: percorre **todos os estados alcançáveis** de cada missão, mede tudo e exige que cada prova listada no relatório seja obtível; e garante que leituras com o circuito desenergizado não “provam” nada.
- `tests/smoke.mjs`: joga uma OS inteira num Chromium de verdade em 3 tamanhos × 2 temas, roda o axe (WCAG AA), confere revisão, modo prova, botão voltar e abertura offline.

Se o Chromium do Playwright não estiver instalado, aponte para outro: `CHROMIUM=/caminho/do/chrome npm run test:bancada`.

## Publicar uma versão nova

Mude `VER` em `sw.js`. É isso que faz os aparelhos baixarem a versão nova (o app mostra “Nova versão disponível”).

Detalhes do código e de como criar novas OS: [ARQUITETURA.md](ARQUITETURA.md).

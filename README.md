# Elétrica de Ouro

App de estudo para a prova da Transpetro (Edital nº 03/2026, Cesgranrio, nível médio), Ênfase 8: Manutenção – Elétrica. Prova em 29/11/2026 (data do edital original; confira a retificação no site da Cesgranrio).

É um clone do Humanas de Ouro, com o mesmo visual e a mesma navegação: linhas e estações por item do edital, Provas, Bancada, Biblioteca, Arena, Treino, Plano e Painel. Instalável no celular (PWA) e funciona sem internet depois do primeiro acesso. O progresso fica no aparelho (`eletrica-de-ouro-v1`); use **Aa → Copiar ou importar progresso** ou a sincronização por Gist para levá-lo a outro aparelho.

- `index.html`, `pwa.js`, `merge.js`, `gist-sync.js`, `sw.js`: o app.
- `data/*.js`: o conteúdo (`window.DATA`).
- `bancada/`: a Bancada Virtual de Manutenção (simulador de OS), aberta pela aba Bancada. Guarda o próprio progresso (`bancada-transpetro-v1`).
- `fontes/`: material do estudante. `docs/`: desenho e planos.

## Teste antes de publicar

```
npm install
npm test        # CHROMIUM=/caminho/do/chrome npm test, se o Chromium do Playwright não estiver instalado
```

Roda os testes do app (junção de progresso, service worker, teste de fumaça num Chromium de verdade com axe, 3 tamanhos × 2 temas, offline) e os da Bancada. Mude `VER` em `sw.js` a cada publicação.

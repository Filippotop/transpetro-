/* =====================================================================
   Apostila na tela: mapa do edital, leitor de módulo e checagem.
   Só gera HTML e observa a leitura; rotas, eventos e gravação ficam em app.js.
   ===================================================================== */
import { EDITAL, MODULOS } from '../apostila/index.js';
import { MISSIONS, missionById } from '../missions/index.js';
import { moduleStatus, itemStatus, nextStep } from '../mastery.js';
import { esc } from '../util.js';

const L = 'ABCDE';
export const GLIFO = { 'nao-lido': '○', lido: '◐', checado: '●', dominado: '★' };
export const NOME = { 'nao-lido': 'não lido', lido: 'lido', checado: 'checagem feita', dominado: 'dominado', 'em-breve': 'em breve' };
export const FONTES = [100, 115, 130];
/* Ícones desenhados (as fontes de celular nem sempre têm ◐); o caractere fica no texto, para leitores e testes. */
const ICONE = {
  'nao-lido': '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/>',
  lido: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor"/>',
  checado: '<circle cx="12" cy="12" r="9.6" fill="currentColor"/>',
  dominado: '<path d="M12 2.2l2.95 6.2 6.8.8-5 4.7 1.3 6.8L12 17.3l-6.05 3.4 1.3-6.8-5-4.7 6.8-.8z" fill="currentColor"/>',
};
const glifoHTML = st => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONE[st]}</svg><span class="vh">${GLIFO[st]}</span>`;

const pct = x => Math.round(100 * Math.min(1, Math.max(0, x || 0)));
const faixaHTML = f => `<span class="faixa f-${f.toLowerCase()}">Faixa ${f}</span>`;
const pesoTxt = n => n === 0 ? 'nenhuma questão em 2023' : n === 1 ? '1 questão em 2023' : `${n} questões em 2023`;
/** "3.1, 3.2 e 4.1" */
const lista = a => a.length > 1 ? `${a.slice(0, -1).join(', ')} e ${a[a.length - 1]}` : a.join('');
const modDoItem = it => { const subs = new Set(it.sub.map(s => s.id)); return MODULOS.find(m => m.itens.some(id => subs.has(id))); };
const itensDoMod = mod => [...new Set(mod.itens.map(s => s.split('.')[0]))];
const osHTML = id => { const M = missionById(id); return M ? `<button class="link" data-nav="start:${M.id}">OS ${M.n}: ${esc(M.titulo)}</button>` : ''; };

/* ---------------------------------------------------------------- mapa do edital */
function proximoHTML(P) {
  const nx = nextStep(P, MODULOS, MISSIONS);
  let acao, porque;
  if (nx.kind === 'revisar') {
    acao = `<a class="btn primary" href="#revisar">${esc(nx.label)}</a>`;
    porque = 'Revisões vencidas vêm primeiro: é o que segura a memória até o dia da prova.';
  } else if (nx.kind === 'os') {
    const M = missionById(nx.id);
    acao = `<button class="btn primary" data-nav="start:${nx.id}">Praticar na bancada${M ? `: OS ${M.n}` : ''}</button>`;
    porque = `Os módulos disponíveis da faixa A estão dominados. Pratique ${M ? `“${esc(M.titulo)}”, ligada ao último módulo que você estudou` : 'na bancada'}.`;
  } else {
    const m = MODULOS.find(x => x.id === nx.id), st = moduleStatus(m, P);
    acao = `<a class="btn primary" href="#mod/${m.id}">${esc(nx.label)}</a>`;
    porque = `Faixa ${m.faixa}, itens ${lista(itensDoMod(m))} do edital · ${st.status === 'nao-lido' ? `leitura em ${pct(st.leitura)}%` : `status: ${GLIFO[st.status]} ${NOME[st.status]}`}.`;
  }
  return `<section class="proximo" aria-labelledby="px-t"><p class="px-k" id="px-t">Próximo passo</p>${acao}<p class="px-s">${porque}</p></section>`;
}

function itemHTML(it, P) {
  const m = modDoItem(it), st = itemStatus(it, MODULOS, P), breve = st.status === 'em-breve';
  const titulo = m ? `<a href="#mod/${m.id}"><span class="vh">Item ${it.n}: </span>${esc(it.titulo)}</a>` : `<span class="vh">Item ${it.n}: </span>${esc(it.titulo)}`;
  const status = breve
    ? '<span class="ie-st breve">em breve</span>'
    : `<span class="ie-st" role="img" aria-label="Status: ${NOME[st.status]}, domínio ${pct(st.pct)}%">${glifoHTML(st.status)}</span>`;
  return `<li class="item-edital" data-n="${it.n}" data-status="${st.status}">
   <span class="ie-n" aria-hidden="true">${it.n}</span>
   <div class="ie-main">
    <h3 class="ie-t">${titulo}</h3>
    <p class="ie-meta">${faixaHTML(it.faixa)}<span>${pesoTxt(it.peso2023)}</span></p>
    <details class="ie-sub"><summary>${it.sub.length} subitens</summary><ul>${it.sub.map(s => `<li><b>${s.id}</b> ${esc(s.t)}</li>`).join('')}</ul></details>
   </div>
   ${status}
   <span class="ie-bar" aria-hidden="true"><span style="width:${breve ? 0 : pct(st.pct)}%"></span></span>
  </li>`;
}

/** Estudar: os 10 itens oficiais do Anexo IV com faixa, peso de 2023, status e barra de domínio. */
export function mapaV(P) {
  return `<header class="vhead">
   <p class="kicker">Estudar · Anexo IV do edital, Ênfase 8</p>
   <h2>Mapa do edital</h2>
   <p class="lede">Os 10 itens oficiais do conteúdo programático, com a prioridade (faixa), o peso na prova de 2023 e o quanto você já domina.</p>
  </header>
  ${proximoHTML(P)}
  <ul class="legenda" aria-label="Legenda dos status">
   <li><span class="g" aria-hidden="true" data-status="nao-lido">${glifoHTML('nao-lido')}</span> não lido</li>
   <li><span class="g" aria-hidden="true" data-status="lido">${glifoHTML('lido')}</span> lido</li>
   <li><span class="g" aria-hidden="true" data-status="checado">${glifoHTML('checado')}</span> checagem com 75% ou mais</li>
   <li><span class="g" aria-hidden="true" data-status="dominado">${glifoHTML('dominado')}</span> dominado (acertou de novo em outro dia)</li>
  </ul>
  <ol class="edital">${EDITAL.map(it => itemHTML(it, P)).join('')}</ol>
  <p class="note">Faixa A = mais cobrado em 2023; B = médio; C = pouco. A faixa serve para priorizar, nunca para pular: tudo do edital pode cair. O peso conta as 40 questões de conhecimentos específicos da prova Transpetro 2023 (Manutenção – Elétrica).</p>`;
}

/* ---------------------------------------------------------------- leitor */
function progressoHTML(mod, P) {
  const vistas = new Set(((P.leitura || {})[mod.id] || {}).vistas || []);
  const n = mod.secoes.filter(s => vistas.has(s.id)).length, t = mod.secoes.length;
  return { n, t, vistas, txt: `Leitura: ${n} de ${t} seções` };
}

/** Leitor de módulo. `essencial` esconde o texto corrido; `fonte` 0, 1 ou 2 (100%, 115%, 130%). */
export function leitorV(mod, P, { essencial = false, fonte = 0 } = {}) {
  const pr = progressoHTML(mod, P);
  const ck = `#mod/${mod.id}/checagem`;
  return `<article class="leitor${essencial ? ' so-essencial' : ''}" data-mod="${mod.id}" data-fonte="${fonte}">
  <p class="crumb"><a href="#estudar">← Mapa do edital</a></p>
  <header class="lh">
   <p class="kicker">Edital · ${mod.itens.join(' · ')}</p>
   <h2>${esc(mod.titulo)}</h2>
   <p class="porque">${faixaHTML(mod.faixa)} ${esc(mod.porque)}</p>
  </header>
  <div class="ltools">
   <div class="lbtns">
    <button type="button" class="btn sm" data-nav="essencial" aria-pressed="${essencial}">Só o essencial</button>
    <button type="button" class="btn sm" data-nav="fonte" aria-label="Tamanho da letra: ${FONTES[fonte]}%. Toque para mudar.">Aa <span class="fz">${FONTES[fonte]}%</span></button>
    <a class="btn sm primary" href="${ck}">Checagem</a>
   </div>
   <div class="lprog"><span class="lprog-t">${pr.txt}</span><span class="lbar" aria-hidden="true"><span style="width:${pct(pr.n / pr.t)}%"></span></span></div>
  </div>
  <div class="corpo">
   <section class="essencial" aria-labelledby="ess-t"><h3 id="ess-t">O essencial em 1 minuto</h3><ul>${mod.essencial.map(e => `<li>${esc(e)}</li>`).join('')}</ul></section>
   <nav class="sumario" aria-labelledby="sum-t"><h3 id="sum-t">Sumário</h3><ol>${mod.secoes.map((s, i) => `<li data-sum="${s.id}"${pr.vistas.has(s.id) ? ' class="lida"' : ''}><a href="#s-${s.id}"><span class="sn">${i + 1}</span><span>${esc(s.titulo)}</span></a><span class="mk">${pr.vistas.has(s.id) ? '✓<span class="vh"> (lida)</span>' : ''}</span></li>`).join('')}</ol></nav>
   ${mod.secoes.map((s, i) => `<section class="secao" id="s-${s.id}" aria-labelledby="h-${s.id}">
    <h3 id="h-${s.id}" tabindex="-1"><span class="sn">${i + 1}</span> ${esc(s.titulo)}</h3>
    ${s.html}
    <span class="fim" data-fim="${s.id}" aria-hidden="true"></span>
   </section>`).join('')}
   ${mod.missoes.length ? `<section class="veja" aria-labelledby="veja-t"><h3 id="veja-t">Veja na bancada</h3><p>Ponha a teoria para medir: ${mod.missoes.map(osHTML).join(' ')}</p></section>` : ''}
   <section class="fontes-mod" aria-labelledby="fon-t"><h3 id="fon-t">Fontes</h3><ol>${mod.fontes.map(f => `<li><a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.t)}</a></li>`).join('')}</ol></section>
   <div class="fim-mod"><p>Terminou? Confira o que ficou com ${mod.checagem.length} questões no estilo Cesgranrio. Acertando 3 ou mais, o item vira ● no mapa.</p><a class="btn primary" href="${ck}">Ir para a checagem</a></div>
  </div>
 </article>`;
}

/** Atualiza o progresso de leitura e o sumário sem redesenhar (a rolagem não pula). */
export function atualizaLeitura(root, mod, P) {
  const pr = progressoHTML(mod, P);
  const t = root.querySelector('.lprog-t'); if (t) t.textContent = pr.txt;
  const b = root.querySelector('.lbar > span'); if (b) b.style.width = pct(pr.n / pr.t) + '%';
  root.querySelectorAll('.sumario li[data-sum]').forEach(li => {
    const ok = pr.vistas.has(li.dataset.sum);
    if (ok === li.classList.contains('lida')) return;
    li.classList.toggle('lida', ok);
    li.querySelector('.mk').innerHTML = ok ? '✓<span class="vh"> (lida)</span>' : '';
  });
}

/** Observa o sentinela do fim de cada seção; `onSeen(secId)` quando ele aparece inteiro na tela. Devolve o desligador. */
export function observeSecoes(root, mod, onSeen) {
  if (typeof IntersectionObserver !== 'function') return () => {};
  const ids = new Set(mod.secoes.map(s => s.id));
  // o que fica atrás das abas e da barra do leitor (fixas) não conta como visto
  const stick = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stick')) || 0;
  const topo = Math.round(stick + (root.querySelector('.ltools')?.offsetHeight || 0)) + 16; // folga: o fim da seção anterior fica logo acima do título da seguinte
  const io = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting && ids.has(e.target.dataset.fim)) onSeen(e.target.dataset.fim);
  }, { threshold: 1, rootMargin: `-${topo}px 0px -64px 0px` });
  root.querySelectorAll('[data-fim]').forEach(el => io.observe(el));
  return () => io.disconnect();
}

/** Fórmulas e tabelas que não cabem rolam dentro do contêiner; quem rola precisa receber foco pelo teclado. */
export function marcaRolaveis(root) {
  root.querySelectorAll('.tw').forEach(el => {
    if (el.scrollWidth > el.clientWidth + 1) el.setAttribute('tabindex', '0'); else el.removeAttribute('tabindex');
  });
}

/* ---------------------------------------------------------------- questões e checagem */
export function questaoHTML(q, id, n) {
  return `<div class="q" data-q="${esc(id)}"><p class="stem"><b class="n">${n}.</b> ${q.s}</p><ul class="opts">${q.o.map((o, k) => `<li><button type="button" data-opt="${k}"><span class="l">(${L[k]})</span><span>${o}</span></button></li>`).join('')}</ul><div class="fbk" hidden role="status"></div></div>`;
}

/** Correção: questões das OS trazem `c`; as da apostila trazem `porque` de cada alternativa (a marcada e a correta). */
export function feedbackHTML(q, k) {
  const ok = k === q.a, cab = `<strong>${ok ? 'Correto.' : 'Incorreto.'} Resposta: (${L[q.a]})</strong>`;
  if (!q.porque) return `${cab}<br>${q.c}`;
  const certa = q.porque[q.a].replace(/^Certo\.\s*/, ''); // o cabeçalho já diz se acertou
  if (ok) return `${cab}<p>${certa}</p>`;
  return `${cab}<p><b class="fl">Você marcou (${L[k]}):</b> ${q.porque[k]}</p><p><b class="fl">Por que (${L[q.a]}):</b> ${certa}</p>`;
}

/** Questões das checagens com id estável `ap/<módulo>/<i>`, no formato das questões das OS. */
export const questoesApostila = () => MODULOS.flatMap(m => m.checagem.map((q, i) => ({ ...q, id: `ap/${m.id}/${i}`, modulo: m })));

export function checagemV(mod) {
  return `<article class="checagem" data-mod="${mod.id}">
  <p class="crumb"><a href="#mod/${mod.id}">← Voltar ao módulo</a></p>
  <header class="lh">
   <p class="kicker">Checagem · ${esc(mod.titulo)}</p>
   <h2>${mod.checagem.length} questões para conferir</h2>
   <p class="lede">No estilo Cesgranrio. A correção vem na hora e explica a alternativa que você marcou e a correta. As respostas entram na sua revisão espaçada.</p>
  </header>
  <section class="panel">${mod.checagem.map((q, i) => questaoHTML(q, `ap/${mod.id}/${i}`, i + 1)).join('')}</section>
  <section class="chk-res panel" aria-live="polite"></section>
 </article>`;
}

/** Resultado da checagem, depois da última resposta. */
export function resumoChecagem(mod, P, certos, total) {
  const st = moduleStatus(mod, P), itens = lista(itensDoMod(mod));
  const passou = st.status === 'checado' || st.status === 'dominado';
  return `<h3>Você acertou ${certos} de ${total}</h3>
  <p>${passou ? `No mapa, ${itensDoMod(mod).length > 1 ? 'os itens' : 'o item'} ${itens} ${itensDoMod(mod).length > 1 ? 'ficam' : 'fica'} com <b>${GLIFO[st.status]} ${NOME[st.status]}</b>.` : 'Para marcar ● no mapa, acerte pelo menos 3 de 4. Releia os destaques do módulo e refaça.'}</p>
  <p class="tm">As questões entraram na revisão espaçada. Para chegar a ★ (dominado), acerte-as de novo nos próximos dias, na aba Revisar.</p>
  <div class="actions"><a class="btn primary" href="#estudar">Ver o mapa</a><a class="btn" href="#mod/${mod.id}">Reler o módulo</a><button class="btn" data-nav="refazer">Refazer a checagem</button></div>
  ${mod.missoes.length ? `<p class="veja-os">Veja na bancada: ${mod.missoes.map(osHTML).join(' ')}</p>` : ''}`;
}

/* ---------------------------------------------------------------- bancada */
/** "Antes de atender, leia: …" com os módulos já escritos do campo `modulos` da OS. */
export function antesHTML(M) {
  const ms = (M.modulos || []).map(id => MODULOS.find(m => m.id === id)).filter(Boolean);
  if (!ms.length) return '';
  return `<p class="antes"><span class="antes-k">Antes de atender, leia:</span> ${ms.map(m => `<a href="#mod/${m.id}">${esc(m.titulo)}</a>`).join(' ')}</p>`;
}

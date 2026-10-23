/* =====================================================================
   Interface: painel, bancada, relatório, revisão. Toda a lógica de jogo
   fica em engine.js; aqui só há telas, eventos e persistência.
   ===================================================================== */
import { INSTR, NR10, NR10RE, EXAM_DATE, EXAM_DATE_NOTE } from './instruments.js';
import { MISSIONS, missionById, totalFaults, allQuestions } from './missions/index.js';
import * as E from './engine.js';
import * as S from './store.js';
import { answer, dueIds, boxes } from './review.js';
import { mmss, shuffle, pick, esc } from './util.js';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const view = $('#view');
const dlg = $('#modal');
const L = 'ABCDE';

let P = S.load();
let VIEW = 'home', RUN = null, TICK = null, REV = null;
const persist = () => { const ok = S.save(P); $('#pill-save').textContent = ok ? 'Progresso salvo neste aparelho' : 'Atenção: este navegador não está salvando o progresso'; $('#pill-save').classList.toggle('bad', !ok); };

/* ---------------------------------------------------------------- utilidades de tela */
const daysLeft = () => Math.max(0, Math.ceil((new Date(EXAM_DATE) - new Date()) / 86400000));
const starHTML = n => `<span class="stars" role="img" aria-label="${n} de 3 estrelas">${'★'.repeat(n)}<span class="off">${'★'.repeat(3 - n)}</span></span>`;
const exam = () => RUN && E.isExam(RUN);
const instrutorOn = () => P.instrutor && !exam();

/** Redesenha preservando o elemento com foco (o teclado não “perde o lugar”). */
function keepFocus(fn) {
  const a = document.activeElement; let sel = null;
  if (a && a !== document.body && view.contains(a)) {
    for (const attr of ['data-k', 'data-act', 'data-nav', 'id']) { const v = a.getAttribute(attr); if (v) { sel = `[${attr}="${CSS.escape(v)}"]`; break; } }
  }
  fn();
  if (sel) { const el = view.querySelector(sel); if (el) el.focus({ preventScroll: true }); }
}

/** Troca de tela. `how`: 'push' (nova entrada no histórico), 'replace' ou 'none'. */
function go(v, how = 'push') {
  VIEW = v;
  const url = v === 'home' ? location.pathname : '#' + v;
  if (how === 'push') history.pushState({ v }, '', url); else if (how === 'replace') history.replaceState({ v }, '', url);
  render(); window.scrollTo({ top: 0 });
}
function render() {
  $('#pill-days').textContent = `Faltam ${daysLeft()} dias para a prova (data do edital original)`; $('#pill-days').title = EXAM_DATE_NOTE;
  document.body.dataset.view = VIEW;
  if (VIEW === 'run' && RUN) return drawRun();
  if (VIEW === 'debrief' && RUN && RUN.result) { view.innerHTML = debriefV(); return; }
  if (VIEW === 'review') { view.innerHTML = reviewV(); return; }
  VIEW = 'home'; view.innerHTML = homeV();
}

/* ---------------------------------------------------------------- modal (<dialog> nativo: foco preso, Esc e fundo) */
let modalOpener = null, modalLocked = false;
function openModal(html, after, { locked = false } = {}) {
  modalOpener = document.activeElement; modalLocked = locked;
  dlg.querySelector('.mbox').innerHTML = html;
  if (!dlg.open) dlg.showModal();
  if (after) after();
  const f = dlg.querySelector('[autofocus],input,button:not([disabled])'); if (f) f.focus();
}
function closeModal() {
  if (dlg.open) dlg.close();
  if (modalOpener && document.contains(modalOpener)) modalOpener.focus();
}
dlg.addEventListener('cancel', e => { if (modalLocked) e.preventDefault(); });
dlg.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });

/* ---------------------------------------------------------------- painel inicial */
function homeV() {
  const f = S.foundFaults(P, MISSIONS), t = totalFaults(); const due = dueIds(P.srs).length; const nq = Object.keys(P.srs).length;
  const best = P.exams.slice().sort((a, b) => b.score - a.score || a.secs - b.secs).slice(0, 5);
  return `<section class="intro">
  <p class="kicker">Plantão de manutenção elétrica</p>
  <h2>Você é o técnico de plantão. Cada ordem de serviço esconde um defeito.</h2>
  <p>Escolha um atendimento, pegue os instrumentos e meça o circuito como faria em campo: multímetro, alicate, megôhmetro, testador de DR. O defeito é sorteado a cada atendimento, então a mesma OS pode esconder outro problema na próxima vez. Antes de qualquer medição sem tensão, você precisa desenergizar seguindo a NR-10.</p>
  <ol class="steps3"><li><b>Receba a OS</b><span>Leia o sintoma relatado.</span></li><li><b>Meça com segurança</b><span>Toque nos pontos de teste, componentes e cabos.</span></li><li><b>Diagnostique</b><span>Feche a OS com causa e ação; receba correção, teoria e questões no estilo Cesgranrio.</span></li></ol>
 </section>
 <div class="toolbar">
  <button class="btn primary" data-nav="plantao">Plantão aleatório</button>
  <button class="btn" data-nav="prova">Modo prova <span class="tm">(8 min, sem ajuda)</span></button>
  <button class="btn ${due ? 'warn' : ''}" data-nav="review" ${nq ? '' : 'disabled'}>Revisão${nq ? `: <b>${due}</b> pendente${due === 1 ? '' : 's'}` : ' (responda questões para liberar)'}</button>
 </div>
 <div class="toolbar">
  <label class="switch"><input type="checkbox" id="instrutor" ${P.instrutor ? 'checked' : ''}> Modo instrutor <span class="tm">(interpreta cada leitura)</span></label>
  <span class="pill ${P.nr10ok ? 'okp' : ''}">${P.nr10ok ? 'Sequência NR-10 dominada' : 'Sequência NR-10: ainda não feita'}</span>
  <span class="pill">Defeitos descobertos: <b>${f}/${t}</b></span>
 </div>
 <div class="mcards">${MISSIONS.map(m => {
    const r = P.res[m.id] || { faults: {}, best: 0, n: 0 };
    return `<article class="mcard">
   <div class="mhead"><span class="mn">OS ${m.n}</span><span class="area">${m.area}</span></div>
   <h3>${m.titulo}</h3><p class="mloc">${m.local}</p><p class="msint">${m.sintoma}</p>
   <p class="ed">${m.edital}</p>
   <p class="tm">${Object.keys(r.faults).length} de ${m.faults.length} defeitos descobertos</p>
   <div class="album" aria-label="Defeitos desta OS">${m.faults.map(fl => r.faults[fl.id] != null ? `<span class="fchip got" title="Melhor nota: ${r.faults[fl.id]}">${starHTML(E.starsOf(r.faults[fl.id]))} ${fl.nome}</span>` : '<span class="fchip" title="Defeito ainda não descoberto">?</span>').join('')}</div>
   <div class="mfoot"><span class="tm">${r.n ? `${r.n} atendimento(s) · melhor nota ${r.best}` : 'ainda não atendida'}</span><button class="btn primary" data-nav="start:${m.id}" aria-label="Atender OS ${m.n}: ${esc(m.titulo)}">Atender</button></div></article>`;
  }).join('')}</div>
 ${P.exams.length ? `<section class="panel ranking"><h3>Seu ranking no modo prova</h3><ol>${best.map(e => `<li><b>${e.score}</b> pontos · ${esc(missionById(e.m)?.titulo || e.m)} · ${mmss(e.secs)} · <span class="tm">${new Date(e.at).toLocaleDateString('pt-BR')}</span></li>`).join('')}</ol><p class="tm">${P.exams.length} prova(s) feitas · média ${Math.round(P.exams.reduce((s, e) => s + e.score, 0) / P.exams.length)} · acerto do diagnóstico ${Math.round(100 * P.exams.filter(e => e.ok).length / P.exams.length)}%</p></section>` : ''}
 ${nq ? `<section class="panel"><h3>Revisão espaçada</h3><p class="tm">Questões por caixa (1 = revisar já · 5 = dominada): ${boxes(P.srs).map((n, i) => `<span class="box-n">${i + 1}: <b>${n}</b></span>`).join(' ')}</p></section>` : ''}
 <details class="panel"><summary class="lbl">Seu progresso: cópia de segurança</summary>
  <p class="tm">O progresso fica só neste aparelho. Para levá-lo a outro, exporte o arquivo e importe lá.</p>
  <div class="actions"><button class="btn" data-nav="export">Exportar progresso</button><label class="btn file">Importar progresso<input type="file" id="importf" accept="application/json,.json" class="vh"></label><button class="btn danger" data-nav="reset">Zerar progresso</button></div>
 </details>
 <p class="note">Escopo: comandos elétricos, trifásicos, máquinas e proteção, instalações e NBR 5410, instrumentos de medição e NR-10 (itens 1.2, 4, 5.5 a 5.7, 7.3, 8.1, 8.3, 10.1 e 10.4 do Anexo IV, Ênfase 8). Os circuitos são modelos didáticos simplificados: os valores servem para treinar o raciocínio de medição, não para cálculo de projeto. A sequência da NR-10 usada é a do item 10.5.1 (redação vigente na data da prova).</p>`;
}

/* ---------------------------------------------------------------- atendimento */
function startRun(mid, mode = 'treino') {
  const M = mid ? missionById(mid) : pick(MISSIONS);
  RUN = E.createRun(M, null, { mode });
  go('run');
  clearInterval(TICK);
  TICK = setInterval(onTick, 1000);
}
function onTick() {
  if (VIEW !== 'run' || !RUN || RUN.result) return;
  if (dlg.open && !modalLocked && exam() && E.remaining(RUN) <= 0) closeModal();
  if (exam() && E.remaining(RUN) <= 0) { timeUp(); return; }
  const changed = E.tick(RUN);
  const ck = $('#clock'); if (ck) ck.textContent = clockTxt();
  if (changed) keepFocus(drawRun);
}
const clockTxt = () => exam() ? mmss(E.remaining(RUN)) : mmss(E.elapsed(RUN));
function stopRun() { clearInterval(TICK); TICK = null; }

function lcdHTML(r) {
  return r ? `<span class="lcd-v">${r.txt}</span><span class="lcd-u">${r.unit || ''}</span>` : '<span class="lcd-v dim">- - -</span>';
}
function drawRun() {
  const R = RUN, M = R.M, I = INSTR[R.instr];
  const probeTxt = R.instr === 'V' ? (R.red && !R.black ? `Ponta vermelha em <b>${R.red}</b>. Toque no segundo ponto (preta), ou num componente.` : 'Toque no 1º ponto (ponta vermelha) e depois no 2º (preta), ou direto num componente.') : I.dica;
  const interp = instrutorOn() && R.reading && R.reading.interp;
  const zoom = getZoom();
  view.innerHTML = `<div class="os">
   <div class="os-l"><p class="kicker">${exam() ? 'Modo prova · ' : ''}Ordem de serviço ${M.n} · ${M.local}</p><h2>${M.titulo}</h2><p class="mloc">${M.equip}</p><p class="osint">${M.sintoma}</p></div>
   <div class="os-r"><span class="pill ${R.energ ? 'en' : 'de'}">${R.energ ? 'Energizado' : 'Desenergizado e bloqueado'}</span><span class="pill ${exam() && E.remaining(R) < 60 ? 'bad' : ''}">${exam() ? 'Resta' : 'Tempo'} <b id="clock">${clockTxt()}</b></span><span class="pill">Medições <b>${R.meas}</b></span>${R.viol ? `<span class="pill bad">Violações: ${R.viol}</span>` : ''}</div></div>
  <div class="bench">
   <section class="board" aria-label="Bancada">
    <div class="scheme-bar"><span class="tm">${I.curto} · ${I.nome}${zoom ? ' · arraste o diagrama para os lados' : ''}</span><button class="link" data-nav="zoom" aria-pressed="${zoom}">${zoom ? 'Ajustar à tela' : 'Ampliar diagrama'}</button></div>
    <div class="scheme ${zoom ? 'zoom' : ''}" id="scheme">${M.svg(R)}</div>
    <div class="ctl">${M.controls(R)}</div>
   </section>
   <aside class="kit" id="kit">
    <p class="lbl" id="instr-lbl">Instrumentos</p><div class="instrs" role="group" aria-labelledby="instr-lbl">${M.instr.map(k => `<button class="ibtn ${R.instr === k ? 'on' : ''}" data-nav="instr:${k}" aria-pressed="${R.instr === k}"><span class="ik">${INSTR[k].curto}</span><span>${INSTR[k].nome}</span>${INSTR[k].desen ? '<span class="needs">sem tensão</span>' : ''}</button>`).join('')}</div>
    <div class="meter"><div class="mname">${I.nome}</div><div class="lcd" id="lcd" role="status" aria-live="polite" aria-label="Visor do instrumento">${lcdHTML(R.reading)}</div>
     <p class="probe">${probeTxt}</p>${interp ? `<p class="interp"><b>Instrutor:</b> ${R.reading.interp}</p>` : ''}</div>
    <div class="safety">${R.energ ? '<button class="btn" data-nav="desen">Desenergizar (NR-10)</button>' : '<button class="btn" data-nav="reen">Reenergizar</button>'}${exam() ? '' : `<button class="btn" data-nav="hint" ${R.hints >= R.F.hints.length ? 'disabled' : ''}>Dica do supervisor <span class="tm">(−5)</span></button>`}</div>
    <button class="btn primary wide" data-nav="diag">Emitir diagnóstico</button>
    <button class="link" data-nav="abandon">Abandonar atendimento</button>
   </aside></div>
  <section class="logbox"><p class="lbl">Caderno de campo</p>${R.log.length ? `<ol class="log">${R.log.map(l => `<li class="${l.cls || ''}"><span class="lt">${mmss(l.t)}</span> ${l.txt}</li>`).join('')}</ol>` : '<p class="tm">Suas medições e ações aparecem aqui automaticamente.</p>'}</section>
  <div class="minibar" aria-hidden="true"><span class="ik">${I.curto}</span><span class="mini-lcd">${R.reading ? `${R.reading.txt} ${R.reading.unit || ''}` : '- - -'}</span><span class="mini-st ${R.energ ? 'en' : 'de'}">${R.energ ? 'energizado' : 'bloqueado'}</span></div>`;
}

function getZoom() { try { const z = localStorage.getItem('bancada-zoom'); return z == null ? matchMedia('(max-width: 640px)').matches : z === '1'; } catch { return false; } }
function setZoom(z) { try { localStorage.setItem('bancada-zoom', z ? '1' : '0'); } catch { /* sem armazenamento: vale só nesta tela */ } }

/* ---------------------------------------------------------------- NR-10 */
let ORD = [];
function askDesen() {
  if (!RUN.energ) return;
  if (!RUN.M.needsNR10) { E.desenergize(RUN); return drawRun(); }
  if (P.nr10ok && !exam()) return openModal(`<h3 id="mt">Desenergizar (NR-10, item 10.5.1)</h3><p>Confirme que a sequência foi cumprida, nesta ordem:</p><ol>${NR10.map(s => `<li>${s}</li>`).join('')}</ol>
   <div class="actions"><button class="btn primary" id="dgo">Confirmar e desenergizar</button><button class="btn" id="dord">Refazer o exercício de ordenação</button><button class="btn" data-close>Cancelar</button></div>`, () => {
    $('#dgo').onclick = () => { closeModal(); E.desenergize(RUN); drawRun(); };
    $('#dord').onclick = () => openNR10();
  });
  openNR10();
}
function openNR10() {
  ORD = []; const it = shuffle(NR10.map((t, i) => ({ t, i })));
  openModal(`<h3 id="mt">Desenergizar com segurança (NR-10, item 10.5.1)</h3><p>Para liberar o circuito para medições sem tensão, toque nas etapas na ordem exigida pela norma.${exam() ? ' No modo prova, a ordenação é cobrada em todo atendimento.' : ' Depois de acertar uma vez, nas próximas OS basta confirmar a sequência.'}</p>
  <div class="ord2"><div id="nsrc" role="group" aria-label="Etapas disponíveis">${it.map(x => `<button class="ordit" data-i="${x.i}">${x.t}</button>`).join('')}</div><ol id="ndst" class="dst" aria-live="polite" aria-label="Sua sequência"></ol></div>
  <div class="actions"><button class="btn" id="nundo">Desfazer</button><button class="btn primary" id="nok" disabled>Conferir</button><button class="btn" data-close>Cancelar</button></div><div id="nfb" aria-live="polite"></div>`, wireNR10);
}
function wireNR10() {
  const draw = () => {
    $$('#nsrc .ordit').forEach(b => { b.hidden = ORD.includes(+b.dataset.i); });
    $('#ndst').innerHTML = ORD.map(i => `<li>${NR10[i]}</li>`).join('');
    $('#nok').disabled = ORD.length !== NR10.length;
    if (!dlg.contains(document.activeElement) || document.activeElement.hidden) { const nx = $$('#nsrc .ordit').find(b => !b.hidden) || $('#nok'); nx.focus(); }
  };
  $$('#nsrc .ordit').forEach(b => { b.onclick = () => { ORD.push(+b.dataset.i); draw(); }; });
  $('#nundo').onclick = () => { ORD.pop(); draw(); };
  $('#nok').onclick = () => {
    const ok = E.nr10Correct(ORD);
    $('#ndst').innerHTML = ORD.map((i, k) => `<li class="${i === k ? 'oright' : 'owrong'}">${NR10[i]}${i === k ? '' : ` <span class="ofix">deveria ser: ${NR10[k]}</span>`}</li>`).join('');
    $('#nok').disabled = true; $('#nundo').disabled = true;
    if (ok) {
      P.nr10ok = true; persist(); RUN.nr10 = true;
      $('#nfb').innerHTML = '<p class="okmsg">Sequência correta.</p><div class="actions"><button class="btn primary" id="ngo">Desenergizar</button></div>';
      $('#ngo').onclick = () => { closeModal(); E.desenergize(RUN); drawRun(); }; $('#ngo').focus();
    } else {
      $('#nfb').innerHTML = '<p class="badmsg">Ordem incorreta. Primeiro se secciona e se impede a religação; só então se constata a ausência de tensão. A sinalização vem por último.</p><div class="actions"><button class="btn" id="nre">Tentar de novo</button></div>';
      $('#nre').onclick = openNR10; $('#nre').focus();
    }
  };
}
function askReen() {
  openModal(`<h3 id="mt">Reenergização (NR-10, item 10.5.2)</h3><p>Antes de religar, confirme a sequência de reenergização:</p><ol>${NR10RE.map(s => `<li>${s}</li>`).join('')}</ol><div class="actions"><button class="btn primary" id="reok">Confirmar e reenergizar</button><button class="btn" data-close>Cancelar</button></div>`,
    () => { $('#reok').onclick = () => { closeModal(); E.reenergize(RUN); drawRun(); }; });
}

/* ---------------------------------------------------------------- diagnóstico */
function openDiag(timeout = false) {
  const M = RUN.M; const ds = shuffle(M.diag), as = shuffle(M.acts);
  openModal(`<h3 id="mt">${timeout ? 'Tempo esgotado: emita o diagnóstico' : 'Emitir diagnóstico'}</h3>
   <fieldset class="radios"><legend class="lbl">Causa do defeito</legend>${ds.map(d => `<label><input type="radio" name="dg" value="${d.id}"> ${d.t}</label>`).join('')}</fieldset>
   <fieldset class="radios"><legend class="lbl">Ação corretiva</legend>${as.map(a => `<label><input type="radio" name="ac" value="${a.id}"> ${a.t}</label>`).join('')}</fieldset>
   <p class="badmsg" id="dmsg" role="alert"></p>
   <div class="actions"><button class="btn primary" id="dok">Fechar a ordem de serviço</button>${timeout ? '' : '<button class="btn" data-close>Voltar a medir</button>'}</div>`, () => {
    $('#dok').onclick = () => {
      const d = dlg.querySelector('input[name=dg]:checked'), a = dlg.querySelector('input[name=ac]:checked');
      if (!d || !a) { $('#dmsg').textContent = 'Escolha a causa e a ação corretiva.'; return; }
      closeModal(); finishRun(d.value, a.value);
    };
  }, { locked: timeout });
}
function timeUp() {
  if (dlg.open && modalLocked) return;
  RUN.logAdd('Tempo esgotado.', 'bad'); openDiag(true);
}
function finishRun(dg, ac) {
  stopRun(); E.closeRun(RUN, dg, ac); S.record(P, RUN); persist();
  go('debrief', 'replace');
}

/* ---------------------------------------------------------------- relatório */
function debriefV() {
  const R = RUN, F = R.F, M = R.M, res = R.result;
  const dg = M.diag.find(d => d.id === res.dg), ac = M.acts.find(a => a.id === res.ac);
  const cd = M.diag.find(d => d.id === F.diag), ca = M.acts.find(a => a.id === F.act);
  return `<section class="panel result"><p class="kicker">Relatório da OS ${M.n} · ${M.titulo}${R.mode === 'prova' ? ' · modo prova' : ''}</p>
  <div class="score"><span class="big">${res.score}</span><span class="of">/100</span>${starHTML(res.stars)}</div>
  <p class="verdict ${res.okD ? 'okc' : 'noc'}">${res.okD ? 'Diagnóstico correto:' : 'Diagnóstico incorreto. O defeito era:'} <b>${F.nome}</b>.</p>
  <div class="tw"><table class="brk"><tbody>
   <tr><td>Causa</td><td>${res.okD ? '✓' : '✗'} ${dg.t}${res.okD ? '' : `<br><span class="tm">Correto: ${cd.t}</span>`}</td><td>${res.okD ? 50 : 0}/50</td></tr>
   <tr><td>Ação corretiva</td><td>${res.okA ? '✓' : '✗'} ${ac.t}${res.okA ? '' : `<br><span class="tm">Correto: ${ca.t}</span>`}</td><td>${res.okA ? 20 : 0}/20</td></tr>
   <tr><td>Segurança</td><td>${R.viol ? `${R.viol} violação(ões) da regra de medição sem tensão` : 'Nenhuma violação'}</td><td>${res.seg}/20</td></tr>
   <tr><td>Eficiência</td><td>${R.meas} medições (referência: ${F.ideal})${res.okD ? '' : ' · só conta com diagnóstico correto'}</td><td>${res.ef}/10</td></tr>
   ${R.hints ? `<tr><td>Dicas</td><td>${R.hints} dica(s) do supervisor</td><td>−${5 * R.hints}</td></tr>` : ''}
   <tr><td>Tempo</td><td>${mmss(res.secs)}</td><td></td></tr>
  </tbody></table></div></section>
 <section class="panel"><h3>O que estava acontecendo</h3><p>${F.explica}</p>
  <h3>As medições que provavam</h3><ul class="provas">${F.provas.map(pv => { const ok = E.provaOK(R.keys, pv); return `<li class="${ok ? 'done' : ''}"><span class="pk">${ok ? '✓ você mediu' : '○ não medido'}</span> ${pv.txt}</li>`; }).join('')}</ul>
  <h3>Teoria em uma frase (ou três)</h3><p>${F.teoria}</p>
  <div class="box cesg"><p class="box-title">Como a Cesgranrio cobra</p><p>${F.cesg} Padrão observado, não garantia.</p></div></section>
 <section class="panel"><h3>Fixe com duas questões</h3><p class="tm">As respostas entram na sua revisão espaçada: o que você errar volta amanhã.</p>${F.questoes.map((q, i) => questionHTML(q, `${M.id}/${F.id}/${i}`, i + 1)).join('')}</section>
 <details class="panel"><summary class="lbl">Seu caderno de campo (${R.log.length} registros)</summary><ol class="log">${R.log.slice().reverse().map(l => `<li class="${l.cls || ''}"><span class="lt">${mmss(l.t)}</span> ${l.txt}</li>`).join('')}</ol></details>
 <div class="actions"><button class="btn primary" data-nav="start:${M.id}">Atender esta OS de novo (outro defeito sorteado)</button><button class="btn" data-nav="plantao">Plantão aleatório</button><button class="btn" data-nav="home">Voltar ao painel</button></div>`;
}
function questionHTML(q, id, n) {
  return `<div class="q" data-q="${id}"><p class="stem"><b class="n">${n}.</b> ${q.s}</p><ul class="opts">${q.o.map((o, k) => `<li><button type="button" data-opt="${k}"><span class="l">(${L[k]})</span><span>${o}</span></button></li>`).join('')}</ul><div class="fbk" hidden role="status"></div></div>`;
}
const QBY = new Map(allQuestions().map(q => [q.id, q]));
function answerQuestion(btn) {
  const qe = btn.closest('.q'); const q = QBY.get(qe.dataset.q); const k = +btn.dataset.opt; const ok = k === q.a;
  qe.querySelectorAll('.opts button').forEach((x, i) => { x.disabled = true; if (i === q.a) x.classList.add('right'); if (i === k && !ok) x.classList.add('wrong'); });
  const fb = qe.querySelector('.fbk'); fb.hidden = false; fb.classList.toggle('no', !ok);
  fb.innerHTML = `<strong>${ok ? 'Correto.' : 'Incorreto.'} Resposta: (${L[q.a]})</strong><br>${q.c}`;
  const c = answer(P.srs, q.id, ok); persist();
  if (VIEW === 'review') { REV.done++; if (ok) REV.right++; const nx = $('#rnext'); nx.hidden = false; nx.focus(); }
  return c;
}

/* ---------------------------------------------------------------- revisão espaçada */
function startReview() {
  let ids = dueIds(P.srs); const extra = !ids.length;
  if (extra) ids = shuffle(Object.keys(P.srs)).slice(0, 10);
  REV = { ids: ids.filter(id => QBY.has(id)), i: 0, done: 0, right: 0, extra };
  go('review');
}
function reviewV() {
  if (!REV || !REV.ids.length) return '<section class="panel"><h3>Nada para revisar</h3><p>Responda as questões do relatório de uma OS para começar.</p><button class="btn" data-nav="home">Voltar ao painel</button></section>';
  if (REV.i >= REV.ids.length) return `<section class="panel"><h3>Revisão concluída</h3><p>Você acertou <b>${REV.right}</b> de ${REV.done}. ${dueIds(P.srs).length ? `Ainda há ${dueIds(P.srs).length} questão(ões) pendente(s) (as que você errou agora).` : 'Nada pendente por hoje.'}</p><div class="actions">${dueIds(P.srs).length ? '<button class="btn primary" data-nav="review">Revisar as pendentes</button>' : ''}<button class="btn" data-nav="home">Voltar ao painel</button></div></section>`;
  const q = QBY.get(REV.ids[REV.i]);
  return `<section class="panel"><p class="kicker">Revisão ${REV.extra ? 'extra (nada vencido hoje)' : 'espaçada'} · ${REV.i + 1} de ${REV.ids.length}</p><p class="tm">${q.mission.area} · ${q.fault.nome}</p>
   ${questionHTML(q, q.id, REV.i + 1)}
   <div class="actions"><button class="btn primary" id="rnext" data-nav="rnext" hidden>Próxima</button><button class="btn" data-nav="home">Parar</button></div></section>`;
}

/* ---------------------------------------------------------------- progresso: exportar, importar, zerar */
function exportP() {
  const blob = new Blob([JSON.stringify(P, null, 1)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `bancada-progresso-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
async function importP(file) {
  try {
    const raw = JSON.parse(await file.text()); const np = S.migrate(raw);
    if (!raw || typeof raw !== 'object' || !('res' in raw)) throw new Error('formato');
    P = np; persist(); render(); toast('Progresso importado.');
  } catch { toast('Não consegui ler esse arquivo. Use um arquivo exportado por este app.'); }
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 4000); }

/* ---------------------------------------------------------------- eventos (delegação: nada de onclick inline) */
const NAV = {
  plantao: () => startRun(null), prova: () => startRun(null, 'prova'), home: () => go('home'),
  review: startReview, rnext: () => { REV.i++; render(); const f = view.querySelector('.opts button'); if (f) f.focus(); },
  desen: askDesen, reen: askReen, diag: () => openDiag(),
  hint: () => { E.useHint(RUN); drawRun(); },
  zoom: () => { setZoom(!getZoom()); keepFocus(drawRun); },
  abandon: () => abandon(),
  export: exportP,
  reset: () => openModal('<h3 id="mt">Zerar progresso?</h3><p>Apaga notas, defeitos descobertos, histórico do modo prova e revisão deste aparelho. Não dá para desfazer (a não ser que você tenha exportado uma cópia).</p><div class="actions"><button class="btn danger" id="rz">Zerar</button><button class="btn" data-close>Cancelar</button></div>', () => { $('#rz').onclick = () => { P = S.fresh(); persist(); closeModal(); render(); toast('Progresso zerado.'); }; })
};
function abandon() {
  openModal(`<h3 id="mt">Abandonar este atendimento?</h3><p>A ordem de serviço ficará sem diagnóstico e não conta no seu progresso.</p><div class="actions"><button class="btn danger" id="ab">Abandonar</button><button class="btn" data-close>Continuar medindo</button></div>`,
    () => { $('#ab').onclick = () => { closeModal(); stopRun(); RUN = null; go('home'); }; });
}

view.addEventListener('click', e => {
  const t = e.target;
  const opt = t.closest('[data-opt]'); if (opt && !opt.disabled) return answerQuestion(opt);
  const nav = t.closest('[data-nav]');
  if (nav && !nav.disabled) {
    const [k, arg] = nav.dataset.nav.split(':');
    if (k === 'start') return startRun(arg);
    if (k === 'instr') { E.selectInstr(RUN, arg); return keepFocus(drawRun); }
    return NAV[k] && NAV[k]();
  }
  const act = t.closest('[data-act]'); if (act && !act.disabled && RUN) { E.doAction(RUN, act.dataset.act); return keepFocus(drawRun); }
  const tg = t.closest('[data-k]'); if (tg && RUN) { E.probe(RUN, tg.dataset.k); keepFocus(drawRun); }
});
view.addEventListener('keydown', e => {
  const tg = e.target.closest('[data-k]');
  if (tg && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); E.probe(RUN, tg.dataset.k); keepFocus(drawRun); }
});
view.addEventListener('change', e => {
  if (e.target.id === 'instrutor') { P.instrutor = e.target.checked; persist(); }
  if (e.target.id === 'importf' && e.target.files[0]) importP(e.target.files[0]);
});
/* Botão “voltar” do celular: não sai do app no meio de uma OS. */
window.addEventListener('popstate', () => {
  if (dlg.open) { closeModal(); }
  if (VIEW === 'run' && RUN && !RUN.result) { history.pushState({ v: 'run' }, '', '#run'); abandon(); return; }
  VIEW = (history.state && history.state.v) || 'home';
  if ((VIEW === 'run' || VIEW === 'debrief') && !RUN) VIEW = 'home';
  if (VIEW === 'run' && RUN && RUN.result) VIEW = 'debrief';
  render();
});
window.addEventListener('beforeunload', e => { if (VIEW === 'run' && RUN && !RUN.result && RUN.meas) e.preventDefault(); });

/* ---------------------------------------------------------------- início */
history.replaceState({ v: 'home' }, '', location.pathname);
persist(); render();

/* App instalável e offline. */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing; if (!nw) return;
      nw.addEventListener('statechange', () => {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) {
          const b = $('#update'); b.hidden = false;
          b.querySelector('button').onclick = () => { nw.postMessage('skip'); };
        }
      });
    });
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloaded && !(VIEW === 'run' && RUN && !RUN.result)) { reloaded = true; location.reload(); } });
  }).catch(() => { /* sem service worker: o app funciona, só não fica offline */ });
}

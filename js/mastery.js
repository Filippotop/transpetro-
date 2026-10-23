/* Domínio por módulo da apostila: leitura das seções + acerto na checagem (cartões `ap/<módulo>/<i>`). */
export const ORDEM = ['nao-lido', 'lido', 'checado', 'dominado'];
const rank = s => ORDEM.indexOf(s);
const clamp01 = x => Math.min(1, Math.max(0, x));

/** Estado de um módulo: leitura (0..1), acerto (0..1 ou null sem respostas) e status. */
export function moduleStatus(mod, P) {
  const secoes = mod.secoes || [], ids = new Set(secoes.map(s => s.id));
  const L = (P.leitura || {})[mod.id];
  const vistas = new Set(((L && Array.isArray(L.vistas)) ? L.vistas : []).filter(id => ids.has(id)));
  const leitura = secoes.length ? vistas.size / secoes.length : 0;
  const cards = (mod.checagem || []).map((_, i) => (P.srs || {})[`ap/${mod.id}/${i}`]);
  const certos = cards.filter(c => c && c.last === true).length;
  const respondidos = cards.filter(c => c && typeof c.last === 'boolean').length;
  const acerto = respondidos && cards.length ? certos / cards.length : null;
  let status = 'nao-lido';
  if (leitura >= 0.9) status = 'lido';
  if (acerto !== null && acerto >= 0.75) status = 'checado';
  if (status === 'checado' && cards.every(c => c && c.box >= 3)) status = 'dominado';
  return { status, leitura, acerto };
}

/** Item do edital: pior status entre os módulos que cobrem algum subitem; 'em-breve' sem cobertura. */
export function itemStatus(item, mods, P) {
  const subs = new Set((item.sub || []).map(s => s.id));
  const cov = mods.filter(m => (m.itens || []).some(id => subs.has(id)));
  if (!cov.length) return { status: 'em-breve', pct: 0 };
  const st = cov.map(m => moduleStatus(m, P));
  const status = st.reduce((w, s) => rank(s.status) < rank(w) ? s.status : w, 'dominado');
  const pct = st.reduce((a, s) => a + clamp01(0.5 * s.leitura + 0.5 * (s.acerto ?? 0)), 0) / st.length;
  return { status, pct };
}

/** Próximo passo sugerido: revisão vencida > módulo de faixa A menos dominado > prática na bancada. */
export function nextStep(P, mods, missions, now = Date.now()) {
  const venc = Object.values(P.srs || {}).filter(c => c.due <= now).length;
  if (venc) return { kind: 'revisar', id: 'revisar', label: `Revisar ${venc} questão(ões) vencida(s)` };
  const estudar = m => ({ kind: 'modulo', id: m.id, label: `Estudar: ${m.titulo || m.id}` });
  let best = null;
  for (const m of mods) {
    if (m.faixa !== 'A') continue;
    const s = moduleStatus(m, P);
    if (s.status === 'dominado') continue;
    if (!best || rank(s.status) < rank(best.s.status) || (s.status === best.s.status && s.leitura < best.s.leitura)) best = { m, s };
  }
  if (best) return estudar(best.m);
  let ult = null;
  for (const m of mods) {
    if (!(m.missoes || []).length) continue;
    const em = +((P.leitura || {})[m.id] || {}).em || 0;
    if (!ult || em > ult.em) ult = { m, em };
  }
  if (ult) return { kind: 'os', id: ult.m.missoes[0], label: 'Praticar na bancada' };
  return estudar(mods[0]);
}

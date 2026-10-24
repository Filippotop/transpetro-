/* Elétrica de Ouro (vindo do Humanas de Ouro): junção de progresso entre aparelhos.
   mergeS(a, b) devolve um progresso novo com o trabalho dos dois lados, sem alterar a nem b.
   Regras (especificação v10, seção 6):
   - ans: primeira tentativa (menor t); vf, recal, redo: mais recente (maior t)
   - read, best, act: maior valor; cards: maior due, empate maior box
   - sims: união por t; pv[ex].runs: união por id (entregue vence; senão mais respostas)
   - red.drafts: união por id (concluída vence; senão maior secs)
   - demais mapas: união de chaves; no conflito vence o lado com updated maior
   - del: última operação por caminho (JSON de um array de chaves); t>0 apagado em t, t<0 recriado em -t.
     Vence o maior |t|; o que termina apagado sai do resultado (senão a junção ressuscitaria exclusões)
   - reset ("Zerar progresso"): o lado com reset mais recente vence inteiro */
function mergeS(a, b) {
  const clone = x => x == null ? x : JSON.parse(JSON.stringify(x));
  a = clone(a) || {}; b = clone(b) || {};
  if ((a.reset || 0) !== (b.reset || 0)) { const w = (a.reset || 0) > (b.reset || 0) ? a : b; w.updated = Math.max(a.updated || 0, b.updated || 0); return w; }
  const bNewer = (b.updated || 0) > (a.updated || 0);
  const obj = x => x && typeof x === 'object' && !Array.isArray(x) ? x : {};
  const byKey = (x, y, pick) => { x = obj(x); y = obj(y); const out = {};
    for (const k of new Set([...Object.keys(x), ...Object.keys(y)])) out[k] = !(k in x) ? y[k] : !(k in y) ? x[k] : pick(x[k], y[k]);
    return out; };
  const byNewer = (x, y) => byKey(x, y, (p, q) => bNewer ? q : p);
  const byT = earliest => (x, y) => byKey(x, y, (p, q) => ((q && q.t) || 0) === ((p && p.t) || 0) ? (bNewer ? q : p) : (((q && q.t) || 0) < ((p && p.t) || 0)) === earliest ? q : p);
  const byMax = (x, y) => byKey(x, y, (p, q) => Math.max(+p || 0, +q || 0));
  const unionBy = (x, y, id, pick) => { const m = new Map();
    for (const it of [...(Array.isArray(x) ? x : []), ...(Array.isArray(y) ? y : [])]) { const k = it && it[id]; if (k == null) continue; m.set(k, m.has(k) ? pick(m.get(k), it) : it); }
    return [...m.values()]; };
  const nAns = r => Object.keys((r && r.ans) || {}).length;
  const pickRun = (p, q) => p.done !== q.done ? (q.done ? q : p) : (nAns(q) > nAns(p) ? q : p);
  const pickDraft = (p, q) => !!p.done !== !!q.done ? (q.done ? q : p) : ((q.secs || 0) > (p.secs || 0) ? q : p);

  const out = Object.assign({}, bNewer ? a : b, bNewer ? b : a);
  out.v = 1;
  out.ans = byT(true)(a.ans, b.ans);
  for (const k of ['vf', 'recal', 'redo']) out[k] = byT(false)(a[k], b[k]);
  for (const k of ['read', 'best', 'act']) out[k] = byMax(a[k], b[k]);
  out.cards = byKey(a.cards, b.cards, (p, q) => (q.due || '') !== (p.due || '') ? ((q.due || '') > (p.due || '') ? q : p) : ((q.box || 0) > (p.box || 0) ? q : p));
  for (const k of ['marks', 'chute', 'rep', 'plan', 'notes', 'snotes']) out[k] = byNewer(a[k], b[k]);
  out.sims = unionBy(a.sims, b.sims, 't', (p, q) => bNewer ? q : p);
  out.pv = byKey(a.pv, b.pv, (p, q) => ({ ...(bNewer ? { ...p, ...q } : { ...q, ...p }), runs: unionBy(p.runs, q.runs, 'id', pickRun), notes: byNewer(p.notes, q.notes) }));
  if (a.red || b.red) { const ra = obj(a.red), rb = obj(b.red);
    out.red = { ...(bNewer ? { ...ra, ...rb } : { ...rb, ...ra }), drafts: unionBy(ra.drafts, rb.drafts, 'id', pickDraft), plans: byNewer(ra.plans, rb.plans), check: byNewer(ra.check, rb.check) }; }
  out.dia2 = a.dia2 || b.dia2 ? ((a.dia2 && b.dia2) ? ((a.dia2.t || 0) <= (b.dia2.t || 0) ? a.dia2 : b.dia2) : (a.dia2 || b.dia2)) : undefined;
  if (out.dia2 === undefined) delete out.dia2;
  out.del = byKey(a.del, b.del, (p, q) => Math.abs(+q || 0) > Math.abs(+p || 0) ? q : p);
  if (!Object.keys(out.del).length) delete out.del;
  for (const [k, t] of Object.entries(out.del || {})) { if (!(t > 0)) continue; let path; try { path = JSON.parse(k); } catch (e) { continue; }
    if (!Array.isArray(path) || !path.length) continue;
    const id = String(path[path.length - 1]); let o = out;
    for (const s of path.slice(0, -1)) { o = o && o[s]; }
    if (Array.isArray(o)) { const i = o.findIndex(x => x && String(x.id) === id); if (i >= 0) o.splice(i, 1); }
    else if (o && typeof o === 'object') delete o[id]; }
  out.updated = Math.max(a.updated || 0, b.updated || 0);
  return out;
}

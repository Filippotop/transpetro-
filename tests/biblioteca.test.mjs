/* Elétrica de Ouro: testes de dados da Biblioteca e da Arena (sem navegador): NR-10 literal, fórmulas, glossário, números-âncora,
   unidades e Anexo IV. Rodar: node tests/biblioteca.test.mjs */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };
const files = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m => m[1]);
const ctx = vm.createContext({ window: {} });
for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
const D = ctx.window.DATA;
const stationIds = new Set(D.modules.map(m => m.id));
const norm = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* ---- NR-10: cada linha citada aparece, palavra por palavra, em fontes/nr10-2019-x-2026.md ---- */
check(D.nr10 && D.nr10.itens && D.nr10.itens.length >= 9, 'NR-10: DATA.nr10 não carregou (data/nr10.js fora do index.html?)');
if (D.nr10) {
  const md = fs.readFileSync(path.join(ROOT, 'fontes', 'nr10-2019-x-2026.md'), 'utf8').split('\n').map(l => l.replace(/^>\s?/, '')).join(' ').replace(/\s+/g, ' ');
  for (const it of D.nr10.itens) for (const k of ['a', 'b']) {
    check(it[k] && it[k].txt.length > 0 && /^https:\/\/www\.gov\.br\//.test(it[k].url) && it[k].pag > 0, `NR-10 ${it.id}/${k}: faltam texto, página ou link do gov.br`);
    for (const t of it[k].txt) check(md.includes(t.replace(/\s+/g, ' ').trim()), `NR-10 ${it.id}/${k}: trecho que não está em fontes/nr10-2019-x-2026.md: "${t.slice(0, 80)}"`);
    check(!/normas-regulamentadoras\/nr-10\.pdf/.test(it[k].url), `NR-10 ${it.id}/${k}: citou o endereço antigo nr-10.pdf, que agora serve o texto de 2027`);
  }
  /* A sequência de 2019 do jogo "Ordene a NR-10" tem de ser exatamente as alíneas do 10.5.1 (a–f) e do 10.5.2 (a–e), na ordem. */
  const alineas = id => D.nr10.itens.find(i => i.id === id).a.txt.filter(t => /^[a-f]\) /.test(t)).map(t => t.replace(/^[a-f]\) /, '').replace(/[;.]$/, '').replace(/ \(Alterada.*$/, '').replace(/\s*;$/, ''));
  for (const [k, id, n] of [['des', 'des', 6], ['reen', 'reen', 5]]) {
    const passos = D.nr10.seq[k].passos, al = alineas(id);
    check(passos.length === n && al.length === n, `NR-10 ${k}: ${passos.length} passos no jogo e ${al.length} alíneas (esperado ${n})`);
    passos.forEach((p, i) => check(norm(al[i]).replace(/;$/, '') === norm(p), `NR-10 ${k}, passo ${i + 1}: "${p}" não é a alínea "${al[i]}"`));
  }
  check(D.nr10.itens.find(i => i.id === 'des').b.txt.filter(t => /^[a-g]\) /.test(t)).length === 7, 'NR-10: a sequência de 2027 (10.13.1) tem 7 alíneas');
  check(/confira/.test(D.nr10.aviso) && /inferência/.test(D.nr10.aviso), 'NR-10: o aviso de qual versão a banca cobra perdeu o confira');
  check(D.nr10.raios.linhas.length === 11, 'NR-10: a tabela de raios do Anexo II tem 11 linhas');
  check(D.nr10.raios.linhas[0][1] === '0,20' && D.nr10.raios.linhas[0][2] === '0,70', 'NR-10: o primeiro raio (< 1 kV) deve ser 0,20 m e 0,70 m');
}

/* ---- Biblioteca ---- */
const B = D.bib;
check(B && B.formulas && B.glos && B.ancoras && B.unidades, 'biblioteca: DATA.bib não carregou (data/biblioteca.js fora do index.html?)');
if (B) {
  const ids = new Set();
  for (const f of B.formulas) {
    check(!ids.has(f.id), `fórmula ${f.id}: id repetido`); ids.add(f.id);
    check(stationIds.has(f.mod), `fórmula ${f.id}: estação ${f.mod} não existe`);
    check(f.erros.length === 3 && f.erros.every(e => e[1].length > 8), `fórmula ${f.id}: precisa de 3 fórmulas erradas, cada uma com o erro explicado`);
    check(f.sim.length > 0 && f.sim.every(s => s[0] && s[1] && s[2]), `fórmula ${f.id}: todo símbolo precisa de nome e unidade`);
    const all = [f.f, ...f.erros.map(e => e[0])].map(norm);
    check(new Set(all).size === 4, `fórmula ${f.id}: duas alternativas iguais`);
    check(!/[{}]/.test(f.f + f.erros.map(e => e[0]).join('')) && !/[{}]/.test(f.sim.map(s => s[0]).join('')), `fórmula ${f.id}: chave sem converter`);
  }
  check(B.formulas.length >= 30, `biblioteca: ${B.formulas.length} fórmulas (esperado 30 ou mais)`);
  const built = new Set(D.modules.filter(m => !m.emBreve).map(m => m.id));
  for (const id of built) if (!['M1'].includes(id)) check(B.formulas.some(f => f.mod === id), `biblioteca: nenhuma fórmula da estação ${id}`);

  check(B.glos.length >= 60, `glossário: ${B.glos.length} termos (esperado 60 ou mais)`);
  const seen = new Set();
  for (const g of B.glos) {
    check(!seen.has(norm(g.t)), `glossário: termo repetido "${g.t}"`); seen.add(norm(g.t));
    check(stationIds.has(g.mod), `glossário "${g.t}": estação ${g.mod} não existe`);
    check(norm(g.d).length >= 30 && /[.)]$/.test(norm(g.d)), `glossário "${g.t}": definição curta ou sem ponto final`);
  }
  const by = {}; B.glos.forEach(g => { by[g.mod] = (by[g.mod] || 0) + 1; });
  for (const id of built) check((by[id] || 0) >= 5, `glossário: a estação ${id} tem só ${by[id] || 0} termos`);

  for (const a of B.ancoras) check(stationIds.has(a.mod) && a.n && a.t, `número-âncora "${a.n}": falta estação ou texto`);
  const anc = B.ancoras.map(a => norm(a.n + ' ' + a.t + ' ' + (a.val || ''))).join(' | ');
  /* Correções da errata: a apostila dizia 4%/7% sem dizer o que é de quê, e 75 kW e a reciclagem bienal sem data. */
  check(/4% · 5% · 7%/.test(anc) && /circuitos terminais/.test(anc), 'âncoras: as quedas de tensão não estão como 4% (terminais), 5% e 7%');
  check(/31\/05\/2027/.test(norm(B.ancoras.find(a => a.n === '75 kW').val || '')), 'âncoras: o 75 kW perdeu a data (vale até 31/05/2027)');
  check(/31\/05\/2027/.test(norm(B.ancoras.find(a => a.n === 'Bienal').val || '')), 'âncoras: a reciclagem bienal perdeu a data (vale até 31/05/2027)');
  check(!/ordem inversa/i.test(anc), 'âncoras: a reenergização "é a ordem inversa" é erro da apostila e não pode voltar');

  for (const u of B.unidades) {
    check(stationIds.has(u.mod), `unidade "${u.g}": estação ${u.mod} não existe`);
    const outras = new Set(B.unidades.filter(x => x.u !== u.u).map(x => x.u));
    check(outras.size >= 3, `unidade "${u.g}": faltam alternativas`);
    /* Rótulo com nota, prefixo ou outro texto para "adimensional" vira distrator também correto no jogo. */
    check(!/;/.test(u.u) && !/^(mili|quilo)/.test(u.u) && (!/adimensional/.test(u.u) || u.u === 'adimensional (não tem unidade)'), `unidade "${u.u}": rótulo que serviria de resposta a outra grandeza`);
  }
  check(B.unidades.length >= 30, `unidades: ${B.unidades.length} pares (esperado 30 ou mais)`);
}

/* ---- Anexo IV ---- */
check(D.edital && D.edital.length === 11, 'edital: DATA.edital precisa dos itens 1 a 10 e da Matemática');
if (D.edital) {
  const sub = D.edital.flatMap(i => i.sub.map(s => s.id));
  check(new Set(sub).size === sub.length, 'edital: subitem repetido');
  const ed = fs.readFileSync(path.join(ROOT, 'bancada', 'js', 'apostila', 'edital.js'), 'utf8');
  for (const s of D.edital.flatMap(i => i.sub).filter(s => /^\d/.test(s.id))) check(ed.includes(`s('${s.id}', '${s.t.replace(/'/g, "\\'")}')`), `edital: o subitem ${s.id} difere do de bancada/js/apostila/edital.js`);
  const t = D.exams.t23.itens;
  for (const [n, it] of Object.entries(t)) if (!/^(Port|Mat)$/.test(it)) check(sub.includes(it), `edital: a questão ${n} de 2023 cita o item ${it}, que não está no edital`);
  for (const q of D.questions) check(sub.includes(String(q.hab)), `edital: a questão ${q.id} cita o item ${q.hab}, que não está no edital`);
}

/* ---- Plano: um dia por data, de 10/11 a 28/11/2026, só com tarefas que o app sabe abrir ---- */
check(D.plan && D.plan.length === 19, 'plano: DATA.plan precisa de 19 dias (10/11 a 28/11)');
if (D.plan && D.plan.length) {
  const SEM = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const built = D.modules.filter(m => !m.emBreve).map(m => m.id);
  const KS = { game: ['formula', 'nr10', 'unid', 'cards', 'vf', 'traps'], bib: ['formulas', 'anc', 'nr10', 'simb', 'glos', 'metodo'], sim: ['tudo', 'EL', 'MT', 'fracos', 'novas'], prova: ['t23:PME'], provares: ['t23'], mod: built };
  D.plan.forEach((p, i) => {
    const dt = new Date(Date.UTC(2026, 10, 10 + i));
    check(p.d === dt.toISOString().slice(0, 10), `plano: o dia ${i + 1} deveria ser ${dt.toISOString().slice(0, 10)} e é ${p.d}`);
    check(p.l === `${SEM[dt.getUTCDay()]} ${p.d.slice(8)}/11`, `plano ${p.d}: rótulo "${p.l}" com dia da semana errado`);
    check(p.foco && p.tasks.length >= 2 && p.tasks.length <= 4, `plano ${p.d}: precisa de foco e de 2 a 4 tarefas`);
    for (const t of p.tasks) {
      check(['mod', 'game', 'bib', 'sim', 'prova', 'provares', 'erros', 'refazer', 'novos', 'painel', 'bancada', 'out'].includes(t.k), `plano ${p.d}: tipo de tarefa desconhecido "${t.k}"`);
      if (KS[t.k]) check(KS[t.k].includes(t.a), `plano ${p.d}: a tarefa ${t.k} aponta para "${t.a}", que não existe`);
      if (t.k !== 'mod') check(t.t && t.t.length > 10, `plano ${p.d}: tarefa ${t.k} sem texto`);
    }
  });
  const mods = D.plan.flatMap(p => p.tasks).filter(t => t.k === 'mod').map(t => t.a);
  for (const id of built) check(mods.includes(id), `plano: a estação ${id} está pronta e não entrou no plano`);
  /* Ordem pelo peso na prova de 2023 (mapa2023). */
  const peso = id => Object.values(D.mapa2023).filter(x => x === id).length;
  mods.forEach((id, i) => { if (i) check(peso(mods[i - 1]) >= peso(id), `plano: ${mods[i - 1]} (${peso(mods[i - 1])} em 2023) veio antes de ${id} (${peso(id)})`); });
  check(D.plan.flatMap(p => p.tasks).some(t => t.k === 'out' && /Matemática/.test(t.t)), 'plano: Matemática elimina e precisa aparecer');
}

if (fails.length) { console.error(`FALHOU (${fails.length}):\n- ` + fails.join('\n- ')); process.exit(1); }
console.log(`biblioteca OK: NR-10 literal (${D.nr10.itens.length} itens), ${B.formulas.length} fórmulas, ${B.glos.length} termos, ${B.ancoras.length} números-âncora, ${B.unidades.length} unidades, Anexo IV, plano de ${D.plan.length} dias`);

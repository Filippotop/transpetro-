/* Apostila: catálogo do Anexo IV, esquema dos módulos, contas conferidas e ligação com as missões.
   Rodar: node --test bancada/tests */
import test from 'node:test';
import assert from 'node:assert/strict';
import { EDITAL } from '../js/apostila/edital.js';
import { MODULOS, moduloById, cobre } from '../js/apostila/index.js';
import { MISSIONS } from '../js/missions/index.js';

/** Módulos ainda não escritos que as missões já podem citar. Encolhe conforme os módulos chegam. */
const PLANEJADOS = ['circuitos', 'maquinas', 'instalacoes', 'automacao', 'normas-seguranca'];

/** Texto oficial do Anexo IV (Ênfase 8), corrigidos só erros óbvios de digitação. */
const ANEXO_IV = {
  '1.1': 'Diagramas unifilares e trifilares',
  '1.2': 'Esquemas de acionamento e controle em equipamentos elétricos',
  '2.1': 'Noções básicas de circuitos elétricos de corrente contínua (CC)',
  '2.2': 'Noções básicas de circuitos elétricos de corrente alternada (CA)',
  '2.3': 'Operações básicas com corrente e tensão senoidais',
  '2.4': 'Medidas de valores Médio, Eficaz e valor de Pico',
  '2.5': 'Aplicações das Leis de Kirchhoff e dos Teoremas de Thévenin e Norton',
  '3.1': 'Conceito, cálculos e medidas de potência e energia elétrica',
  '3.2': 'Potência ativa, reativa e aparente',
  '3.3': 'Fator de potência e correção do fator de potência',
  '4.1': 'Circuitos elétricos monofásicos e trifásicos',
  '4.2': 'Tensão de linha, tensão de fase e ligações estrela e triângulo',
  '5.1': 'Noções básicas de Eletromagnetismo aplicado',
  '5.2': 'Funcionamento básico e aplicação de máquinas elétricas',
  '5.3': 'Transformadores',
  '5.4': 'Máquinas síncronas',
  '5.5': 'Máquinas de corrente contínua e motores de indução',
  '5.6': 'Dispositivos de proteção de baixa tensão',
  '5.7': 'Acionamentos e comando de motores elétricos',
  '6.1': 'Conceitos básicos de segurança e higiene do trabalho',
  '6.2': 'Equipamentos de proteção individual e coletiva com ênfase em eletricidade',
  '6.3': 'Interpretação e análise de projetos elétricos',
  '7.1': 'Fundamentos de Medidas Elétricas',
  '7.2': 'Grandezas Elétricas, Magnéticas e Sistema Internacional de Unidades',
  '7.3': 'Utilização de instrumentos de medição e testes elétricos: Corrente, tensão, potência e isolação',
  '7.4': 'Funcionamento básico e aplicação de: Retificadores, Baterias e No-Breaks',
  '8.1': 'Instalações elétricas de baixa tensão',
  '8.2': 'Redes aéreas e instalações elétricas de 1,0 kV a 17,5 kV',
  '8.3': 'Sistemas de aterramento e uso de equipamentos especializados',
  '8.4': 'Conceitos básicos de sistemas de proteção contra descargas atmosféricas (SPDA)',
  '9.1': 'Conceitos básicos de eletrônica analógica e digital',
  '9.2': 'Conceitos básicos e interpretação de diagramas lógicos',
  '9.3': 'Conceitos básicos de automação industrial',
  '9.4': 'Projeto com uso de Controladores Lógicos Programáveis (CLP)',
  '9.5': 'Conceitos básicos de modelagem, Realimentação e Controle em Malha Fechada',
  '10.1': 'Conhecimentos básicos das normas: ABNT NBR-5410',
  '10.2': 'Conceitos básicos de Manutenção Elétrica',
  '10.3': 'Conhecimentos de materiais e ferramentas utilizados em instalações e serviços em eletricidade',
  '10.4': 'Conhecimento da Norma Regulamentadora NR-10 Segurança em Eletricidade',
};
const PESOS = { 1: 0, 2: 7, 3: 5, 4: 3, 5: 5, 6: 2, 7: 3, 8: 6, 9: 6, 10: 3 };
const FAIXAS = { 1: 'C', 2: 'A', 3: 'A', 4: 'A', 5: 'A', 6: 'B', 7: 'B', 8: 'A', 9: 'A', 10: 'B' };

const VAZIAS = new Set(['br', 'img', 'hr', 'circle', 'line', 'path', 'rect', 'ellipse', 'polyline', 'polygon']);
/** Confere a pilha de tags; devolve a lista de problemas (vazia se o HTML estiver bem formado). */
function htmlProblemas(html) {
  const erros = [], pilha = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const [, fecha, nome, auto] = m, tag = nome.toLowerCase();
    if (VAZIAS.has(tag) || auto) continue;
    if (!fecha) { pilha.push(tag); continue; }
    const topo = pilha.pop();
    if (topo !== tag) { erros.push(`</${tag}> fecha <${topo || 'nada'}>`); break; }
  }
  if (!erros.length && pilha.length) erros.push(`não fechadas: ${pilha.join(', ')}`);
  if (/<(?![a-zA-Z/!])/.test(html)) erros.push('"<" solto (use &lt;)');
  return erros;
}
const numero = v => Number(v.replace(/\./g, '').replace(',', '.'));

test('EDITAL: 10 itens com os subitens do Anexo IV, faixas e peso de 2023', () => {
  assert.equal(EDITAL.length, 10);
  EDITAL.forEach((it, i) => {
    assert.equal(it.n, i + 1);
    assert.ok(it.titulo, `item ${it.n} sem título`);
    assert.equal(it.peso2023, PESOS[it.n], `peso do item ${it.n}`);
    assert.equal(it.faixa, FAIXAS[it.n], `faixa do item ${it.n}`);
    for (const s of it.sub) assert.ok(s.id.startsWith(`${it.n}.`), `${s.id} fora do item ${it.n}`);
  });
  const subs = EDITAL.flatMap(it => it.sub);
  assert.deepEqual(subs.map(s => s.id), Object.keys(ANEXO_IV));
  for (const s of subs) assert.equal(s.t, ANEXO_IV[s.id], `texto do subitem ${s.id}`);
  assert.equal(EDITAL.reduce((a, it) => a + it.peso2023, 0), 40);
});

test('catálogo: ids únicos, moduloById e cobre', () => {
  const ids = MODULOS.map(m => m.id);
  assert.equal(new Set(ids).size, ids.length, 'ids de módulo repetidos');
  for (const m of MODULOS) {
    assert.equal(moduloById(m.id), m);
    for (const s of m.itens) assert.equal(cobre[s], m.id, `cobre[${s}]`);
  }
  assert.equal(moduloById('nao-existe'), undefined);
  for (const p of PLANEJADOS) assert.ok(!ids.includes(p), `${p} já existe: tire-o de PLANEJADOS`);
});

const SUBIDS = new Set(EDITAL.flatMap(it => it.sub.map(s => s.id)));
const MIDS = new Set(MISSIONS.map(m => m.id));

for (const M of MODULOS) {
  test(`${M.id}: campos obrigatórios`, () => {
    for (const k of ['id', 'titulo', 'porque']) assert.ok(typeof M[k] === 'string' && M[k].trim(), `falta ${k}`);
    assert.ok(['A', 'B', 'C'].includes(M.faixa), 'faixa inválida');
    assert.ok(Array.isArray(M.itens) && M.itens.length, 'sem itens');
    for (const s of M.itens) assert.ok(SUBIDS.has(s), `subitem ${s} não existe no EDITAL`);
    assert.ok(Array.isArray(M.essencial) && M.essencial.length >= 5 && M.essencial.length <= 7, 'essencial deve ter de 5 a 7 itens');
    assert.ok(M.essencial.every(e => typeof e === 'string' && e.trim()), 'essencial vazio');
    assert.ok(Array.isArray(M.secoes) && M.secoes.length, 'sem seções');
    for (const s of M.secoes) assert.ok(s.id && s.titulo && s.html, `seção incompleta: ${s.id}`);
    assert.ok(Array.isArray(M.fontes) && M.fontes.length, 'sem fontes');
    for (const f of M.fontes) {
      assert.ok(f.t && f.t.trim(), 'fonte sem título');
      assert.ok(/^https:\/\//.test(f.url), `fonte sem https: ${f.url}`);
    }
    assert.ok(Array.isArray(M.missoes), 'missoes deve ser lista');
    for (const id of M.missoes) assert.ok(MIDS.has(id), `missão ${id} não existe`);
    assert.ok(Array.isArray(M.contas), 'contas deve ser lista');
  });

  test(`${M.id}: checagem com 4 questões completas`, () => {
    assert.equal(M.checagem.length, 4, 'a checagem tem exatamente 4 questões');
    M.checagem.forEach((q, i) => {
      assert.ok(q.s && q.s.trim(), `questão ${i}: sem enunciado`);
      assert.equal(q.o.length, 5, `questão ${i}: precisa de 5 alternativas`);
      assert.equal(new Set(q.o).size, 5, `questão ${i}: alternativas repetidas`);
      assert.ok(q.o.every(o => typeof o === 'string' && o.trim()), `questão ${i}: alternativa vazia`);
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a <= 4, `questão ${i}: gabarito inválido`);
      assert.equal(q.porque.length, 5, `questão ${i}: porque precisa de 5 textos`);
      assert.ok(q.porque.every(p => typeof p === 'string' && p.trim()), `questão ${i}: porque vazio`);
    });
  });

  test(`${M.id}: seções com ids únicos e HTML bem formado`, () => {
    const ids = M.secoes.map(s => s.id);
    assert.equal(new Set(ids).size, ids.length, 'ids de seção repetidos');
    for (const s of M.secoes) {
      assert.deepEqual(htmlProblemas(s.html), [], `seção ${s.id}`);
      for (const svg of s.html.match(/<svg\b[^>]*>/g) || []) {
        assert.ok(/role="img"/.test(svg) && /aria-label="[^"]+"/.test(svg) && /viewBox="/.test(svg), `seção ${s.id}: svg sem role, aria-label ou viewBox`);
        assert.ok(!/\swidth=/.test(svg), `seção ${s.id}: svg com largura fixa`);
      }
      assert.ok(!/(fill|stroke)="#|style="/.test(s.html), `seção ${s.id}: cor fixa no HTML (use as classes do tema)`);
    }
  });

  test(`${M.id}: contas conferidas e todo exemplo resolvido tem conta`, () => {
    const porSecao = new Map(M.secoes.map(s => [s.id, s]));
    for (const s of M.secoes) {
      if (/class="[^"]*\bexres\b/.test(s.html)) assert.ok(M.contas.some(c => c.secao === s.id), `seção ${s.id} tem .exres sem conta registrada`);
    }
    for (const c of M.contas) {
      const s = porSecao.get(c.secao);
      assert.ok(s, `conta em seção inexistente: ${c.secao}`);
      assert.match(c.valor, /^-?\d{1,3}(\.\d{3})*(,\d+)?$|^-?\d+(,\d+)?$/, `valor fora do formato pt-BR: ${c.valor}`);
      const calc = Function(`return (${c.expr})`)(), alvo = numero(c.valor);
      assert.ok(Number.isFinite(calc), `expr inválida: ${c.expr}`);
      const tol = Math.max(Math.abs(calc), Math.abs(alvo)) * 0.01 || 1e-9;
      assert.ok(Math.abs(calc - alvo) <= tol, `${c.expr} = ${calc}, mas o texto diz ${c.valor}`);
      assert.ok(s.html.includes(c.valor), `o valor ${c.valor} não aparece na seção ${c.secao}`);
    }
  });
}

test('missões: todo módulo citado existe ou está planejado', () => {
  const ids = new Set(MODULOS.map(m => m.id));
  for (const M of MISSIONS) {
    assert.ok(Array.isArray(M.modulos) && M.modulos.length, `${M.id}: sem modulos`);
    for (const id of M.modulos) assert.ok(ids.has(id) || PLANEJADOS.includes(id), `${M.id}: módulo ${id} desconhecido`);
  }
  for (const m of MODULOS) for (const id of m.missoes) assert.ok(missionModulos(id).includes(m.id), `${m.id} cita a OS ${id}, que não cita o módulo de volta`);
});
const missionModulos = id => (MISSIONS.find(m => m.id === id) || {}).modulos || [];

test('verificador de HTML acusa tag não fechada e fechamento trocado', () => {
  assert.deepEqual(htmlProblemas('<div class="texto"><p>a <strong>b</strong></p></div>'), []);
  assert.deepEqual(htmlProblemas('<svg viewBox="0 0 1 1"><line x1="0"/><text>x</text></svg>'), []);
  assert.notDeepEqual(htmlProblemas('<div><p>a</div>'), []);
  assert.notDeepEqual(htmlProblemas('<div><p>a</p>'), []);
  assert.notDeepEqual(htmlProblemas('<p>a < b</p>'), []);
});

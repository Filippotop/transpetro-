/* Equilíbrio das letras corretas dos exercícios da Teoria das estações escritas a partir das apostilas do estudante.
   O app não embaralha as alternativas, e nessas apostilas a resposta cai muito em B e C (E3: 12 B em 18). Esta função decide,
   só a partir do QUIZ da fonte (tools/estacao.mjs e tools/banco.mjs a leem igual), quais exercícios trocam a correta de lugar
   com a alternativa de outra letra. Fica de fora quem tem alternativas numéricas em ordem e quem cita letra ou posição no
   texto ("alternativa C", "a segunda", "(A)", "todas as anteriores"), porque trocar de lugar quebraria a leitura.
   As duas ferramentas aplicam o mesmo plano: o exercício da Teoria e a questão da aba Questões continuam idênticos. */
export const COM_PERMUTACAO = ['E1', 'E2', 'E3', 'M1', 'M2', 'I1'];
const txt = t => String(t).replace(/<[^>]+>/g, '');
const cita = q => /\b(alternativas? [A-E]\b|opç(?:ão|ões) [A-E]\b|letras? [A-E]\b|\([A-E]\)|[A-E]\)|primeira|segunda|terceira|quarta|quinta|anteriores?|nenhuma d[ao]s?|todas as|ambas)/i.test([q.s, ...q.o, q.c].map(txt).join(' | '));
const emOrdem = q => {
  const n = q.o.map(a => { const m = txt(a).replace(/\./g, '').replace(',', '.').match(/-?\d+(\.\d+)?/); return m ? +m[0] : null; });
  return n.every(x => x !== null) && (n.every((x, i) => !i || x >= n[i - 1]) || n.every((x, i) => !i || x <= n[i - 1]));
};

/* Plano: { 'b3:1': {de, para} } (índices 0 a 4 da correta atual e da letra de destino). */
export function planoLetras(est, QUIZ) {
  if (!COM_PERMUTACAO.includes(est)) return {};
  const itens = [];
  for (const b of Object.keys(QUIZ).sort((x, y) => x.localeCompare(y, 'en', { numeric: true }))) QUIZ[b].forEach((q, i) => itens.push({ k: `${b}:${i}`, q }));
  const el = itens.filter(x => !cita(x.q) && !emOrdem(x.q));
  const cont = [0, 0, 0, 0, 0];
  itens.forEach(x => cont[x.q.a]++);
  el.forEach(x => cont[x.q.a]--);
  const plano = {};
  el.forEach((x, n) => {
    let para = n % 5;
    for (let t = 0; t < 5; t++) { const l = (n + t) % 5; if (cont[l] < cont[para]) para = l; }
    cont[para]++;
    if (para !== x.q.a) plano[x.k] = { de: x.q.a, para };
  });
  return plano;
}

/* Troca de lugar as alternativas de e para no exercício do QUIZ (o gabarito acompanha a correta). */
export function aplicaPlano(QUIZ, plano) {
  for (const [k, { de, para }] of Object.entries(plano)) {
    const [b, i] = k.split(':'), q = QUIZ[b][+i];
    if (q.a !== de) throw new Error(`plano de letras fora de sincronia em ${k}`);
    [q.o[de], q.o[para]] = [q.o[para], q.o[de]];
    q.a = para;
  }
}

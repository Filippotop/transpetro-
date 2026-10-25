/* Elétrica de Ouro: questões com números novos (Treino → "Números novos" e botão na aba Questões das estações).
   Os 30 geradores vêm do banco do estudante (fontes/banco-de-questoes.html, const GEN), revisados na T4:
   - cada questão sai no mesmo formato das do banco: {id, vol, mod, n, kind:'gerada', tag, base, cmd, alts[5], ans,
     ex:{A..E}, traps, erros, hab, dif};
   - toda alternativa errada sai de um erro identificado (tipo de erro de DATA.erros) e tem explicação própria com os
     números da questão; não há alternativa "de enchimento" (o banco completava com múltiplos do valor certo);
   - o sorteio é determinístico: G2:<gerador>:<semente> reconstrói a mesma questão (o caderno de erros guarda só o id).
     O prefixo G2 é da versão de outubro/2026 (revisão da T4); ids G: antigos sorteavam outra questão com a mesma
     semente e são ignorados (porId devolve null, e o app os deixa de fora do caderno e da revisão).
   window.GERADOR = {lista(), gerar(id, semente), porId('G:id:semente'), daEstacao(mod)}.
   Teste: tests/questoes.test.mjs (100 sorteios por gerador). */
(function (W) {
  'use strict';
  /* ---------- sorteio ---------- */
  function RNG(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  var pick = function (r, a) { return a[Math.floor(r() * a.length)]; };
  function shuffle(r, a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var R3 = Math.sqrt(3), R2 = Math.SQRT2, LET = 'ABCDE';
  /* ---------- números em pt-BR ---------- */
  /* Valores abaixo de 1 que, com d casas, mostrariam menos de 2 algarismos significativos (0,4 para 0,362) saem com 3
     significativos. */
  function fmt(x, d) {
    var t = Number(x).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
    if (x !== 0 && Math.abs(x) < 1 && t.replace(/\D/g, '').replace(/^0+/, '').length < 2) return sig(x);
    return t;
  }
  /* Três algarismos significativos (inteiros grandes ficam inteiros): 503, 50,3, 0,0125, 1.592. */
  function sig(x) { var a = Math.abs(x); if (a >= 1000) return fmt(Math.round(x), 0); return Number(x).toLocaleString('pt-BR', { maximumSignificantDigits: 3 }); }
  /* Formata sem zeros inúteis: 16 → "16", 17,5 → "17,5". */
  var num = function (x) { return Number(x).toLocaleString('pt-BR', { maximumFractionDigits: 2 }); };
  var V = function (x, u, d) { return (d == null ? sig(x) : fmt(x, d)) + (u ? ' ' + u : ''); };
  function erroDe(k) { var E = (W.DATA && W.DATA.erros) || {}; return E[k]; }

  /* Alternativas numéricas: a correta e os distratores [valor, tipo de erro, explicação]. Ficam só os distratores
     positivos que, formatados, diferem da correta e entre si; a explicação de cada um é a do seu erro. Em ordem
     crescente, como na prova. Sem 4 distratores válidos, a questão é inválida (o teste pega). Os distratores são
     sorteados com a semente da questão. */
  /* Posição (0 = A … 4 = E) da correta: sorteada de A a E entre as viáveis; se a sorteada não for viável, sorteia entre
     as viáveis. q.letras restringe as posições de um gerador que não tem deslizes reais suficientes de um lado
     (exceções documentadas em tests/questoes.test.mjs, EXCECAO_LETRA). */
  function escolheK(r, ks, letras) {
    if (letras) { var f = ks.filter(function (k) { return letras.indexOf('ABCDE'[k]) >= 0; }); if (f.length) ks = f; }
    var alvo = Math.floor(r() * 5);
    return ks.indexOf(alvo) >= 0 ? alvo : ks[Math.floor(r() * ks.length)];
  }
  function numOpts(r, q) {
    var f = function (v) { return q.dec == null ? sig(v) : fmt(v, q.dec); };
    var sep = q.sep == null ? 0.03 : q.sep; /* distância mínima (relativa) entre dois valores exibidos */
    var seen = {}, ok = { v: q.ans, t: f(q.ans), ok: true, ex: q.sol }, abaixo = [], acima = [];
    var nv = function (x) { return parseFloat(x.replace(/\./g, '').replace(',', '.')); }, vistos = [nv(ok.t)];
    seen[ok.t] = 1;
    shuffle(r, q.d || []).forEach(function (d) {
      var v = d[0]; if (!isFinite(v) || v <= 0) return;
      var t = f(v); if (seen[t] || /^0(,0*)?$/.test(t)) return;
      /* Compara o que aparece na tela, entre TODOS os valores exibidos. Exceção: com q.sep próprio (eta e bat, cujas leituras
         reais ficam a décimos de ponto percentual umas das outras), só a distância à correta é exigida. */
      var x = nv(t); if ((q.sep == null ? vistos : vistos.slice(0, 1)).some(function (y) { return Math.abs(x - y) < sep * Math.max(Math.abs(x), Math.abs(y)); })) return;
      seen[t] = 1; vistos.push(x); (v < q.ans ? abaixo : acima).push({ v: v, t: t, ok: false, erro: d[1], ex: d[2] });
    });
    /* Letra da correta: sorteada de A a E (k distratores abaixo dela e 4 − k acima, em ordem crescente, como na prova).
       Se faltarem distratores de um lado para a letra sorteada, sorteia entre as letras possíveis. */
    var ks = []; for (var k = 0; k <= 4; k++) if (k <= abaixo.length && 4 - k <= acima.length) ks.push(k);
    if (!ks.length) return [ok].concat(abaixo, acima).slice(0, 5); /* menos de 4 distratores: o teste acusa */
    var kk = escolheK(r, ks, q.letras);
    var out = abaixo.slice(0, kk).concat([ok], acima.slice(0, 4 - kk));
    out.sort(function (a, b) { return a.v - b.v; });
    return out.map(function (o) { o.t = o.t + (q.unit ? (q.unit[0] === '%' ? '' : ' ') + q.unit : ''); return o; });
  }
  /* Alternativas de texto: a correta e um conjunto [texto, tipo de erro, explicação]. */
  function txtOpts(r, q) {
    if (q.sortNum) { /* alternativas numéricas em texto (seções, correntes nominais): mesma regra da letra de numOpts */
      var val = function (t) { return parseFloat(t.replace(',', '.')); }, c = val(q.corr), ab = [], ac = [], usado = {};
      usado[q.corr] = 1;
      shuffle(r, q.pool).forEach(function (p) { if (usado[p[0]]) return; usado[p[0]] = 1; (val(p[0]) < c ? ab : ac).push({ t: p[0], ok: false, erro: p[1], ex: p[2] }); });
      var ks = []; for (var k = 0; k <= 4; k++) if (k <= ab.length && 4 - k <= ac.length) ks.push(k);
      var kk = escolheK(r, ks, q.letras);
      return ab.slice(0, kk).concat([{ t: q.corr, ok: true, ex: q.sol }], ac.slice(0, 4 - kk)).sort(function (a, b) { return val(a.t) - val(b.t); });
    }
    var used = {}, out = [{ t: q.corr, ok: true, ex: q.sol }]; used[q.corr] = 1;
    shuffle(r, q.pool).forEach(function (p) { if (out.length === 5 || used[p[0]]) return; used[p[0]] = 1; out.push({ t: p[0], ok: false, erro: p[1], ex: p[2] }); });
    return shuffle(r, out);
  }

  var GEN = {}, ORDEM = [];
  /* id, estação, item do edital, assunto, dificuldade, gerador */
  function G(id, mod, hab, tag, dif, make) { GEN[id] = { id: id, mod: mod, hab: hab, tag: tag, dif: dif, make: make }; ORDEM.push(id); }

  /* ================= E2 · corrente alternada ================= */
  G('rms', 'E2', '2.4', 'Valores de pico, médio e eficaz', 'fácil', function (r) {
    var Vp = pick(r, [100, 120, 150, 170, 200, 250, 311]), Vpp = 2 * Vp, ans = Vp / R2;
    return { v: { Vpp: Vpp }, s: 'Na manutenção de uma fonte, o osciloscópio mostra uma tensão senoidal de <b>' + fmt(Vpp, 0) + ' V pico a pico</b>. Um multímetro true RMS, ligado aos mesmos pontos, deve indicar, aproximadamente,', unit: 'V', dec: 1, ans: ans,
      sol: 'V<sub>p</sub> = V<sub>pp</sub>/2 = ' + fmt(Vp, 0) + ' V; o valor eficaz é V<sub>ef</sub> = V<sub>p</sub>/√2 = ' + fmt(ans, 1) + ' V.',
      d: [[Vp, 'pico', fmt(Vp, 0) + ' V é o pico (V<sub>pp</sub>/2): faltou dividir por √2.'],
        [Vpp, 'pp', fmt(Vpp, 0) + ' V é a própria leitura de pico a pico do osciloscópio.'],
        [Vpp / R2, 'ppEf', fmt(Vpp / R2, 1) + ' V = V<sub>pp</sub>/√2: aplicou o √2 ao pico a pico, sem antes dividir por 2.'],
        [2 * Vp / Math.PI, 'medio', fmt(2 * Vp / Math.PI, 1) + ' V = 2V<sub>p</sub>/π é o valor médio de meio ciclo, que o true RMS não indica.'],
        [Vp * R2, 'raiz2', fmt(Vp * R2, 1) + ' V = V<sub>p</sub> × √2: multiplicou pelo √2 em vez de dividir.'],
        [Vp / 2, 'raiz2', fmt(Vp / 2, 1) + ' V = V<sub>p</sub>/2: dividiu o pico por 2 em vez de por √2.'],
        [Vp / Math.PI, 'medio', fmt(Vp / Math.PI, 1) + ' V = V<sub>p</sub>/π é o valor médio da onda retificada em meia onda.'],
        [Vp / R3, 'formula', fmt(Vp / R3, 1) + ' V = V<sub>p</sub>/√3: usou √3 no lugar de √2.'],
        [Vp * R3, 'formula', fmt(Vp * R3, 1) + ' V = V<sub>p</sub> × √3: multiplicou o pico por √3.'],
        [Vpp * R2, 'raiz2', fmt(Vpp * R2, 1) + ' V = V<sub>pp</sub> × √2: multiplicou o pico a pico por √2 em vez de dividir.']] };
  });
  G('rl', 'E2', '2.2', 'Impedância em CA', 'média', function (r) {
    var t = pick(r, [[3, 4, 5], [6, 8, 10], [8, 6, 10], [12, 16, 20], [30, 40, 50], [9, 12, 15], [24, 18, 30]]), R = t[0], X = t[1], Z = t[2];
    var Vf = pick(r, [60, 100, 120, 150, 200]), I = Vf / Z;
    var st = 'Um circuito RL série, com R = ' + R + ' Ω e X<sub>L</sub> = ' + X + ' Ω, é alimentado por ' + Vf + ' V (eficaz). ';
    if (r() < 0.5) return { v: { R: R, X: X, V: Vf, pede: 'I' }, s: st + 'A corrente no circuito é de, aproximadamente,', unit: 'A', dec: 2, ans: I,
      sol: '|Z| = √(' + R + '² + ' + X + '²) = ' + Z + ' Ω; I = ' + Vf + '/' + Z + ' = ' + fmt(I, 2) + ' A.',
      d: [[Vf / (R + X), 'somaArit', fmt(Vf / (R + X), 2) + ' A = ' + Vf + '/(' + R + ' + ' + X + '): somou R e X<sub>L</sub> como resistências; |Z| = √(R² + X<sub>L</sub>²) = ' + Z + ' Ω.'],
        [Vf / R, 'semX', fmt(Vf / R, 2) + ' A = ' + Vf + '/' + R + ': ignorou a reatância.'],
        [Vf / X, 'semR', fmt(Vf / X, 2) + ' A = ' + Vf + '/' + X + ': ignorou a resistência.'],
        [Vf * R2 / Z, 'pico', fmt(Vf * R2 / Z, 2) + ' A usa o pico da tensão (' + Vf + ' × √2); o enunciado dá o valor eficaz.'],
        [Vf / (Z * Z), 'semRaiz', fmt(Vf / (Z * Z), 2) + ' A = ' + Vf + '/' + Z * Z + ': usou R² + X<sub>L</sub>² sem tirar a raiz.'],
        [Vf / (2 * R), 'divIgual', fmt(Vf / (2 * R), 2) + ' A aplica só metade da tensão ao resistor, como se ela se dividisse ao meio entre R e L, e ignora a reatância.'],
        [Vf / Math.sqrt(Math.abs(X * X - R * R)), 'sinal', fmt(Vf / Math.sqrt(Math.abs(X * X - R * R)), 2) + ' A usa √|X<sub>L</sub>² − R²|: subtraiu os quadrados em vez de somar.']] };
    var VR = I * R;
    return { v: { R: R, X: X, V: Vf, pede: 'VR' }, s: st + 'Um voltímetro ligado sobre o resistor indicará, aproximadamente,', unit: 'V', dec: 1, ans: VR,
      sol: '|Z| = ' + Z + ' Ω; I = ' + fmt(I, 2) + ' A; V<sub>R</sub> = I·R = ' + fmt(VR, 1) + ' V. (V<sub>L</sub> = ' + fmt(I * X, 1) + ' V; a soma é fasorial: √(V<sub>R</sub>² + V<sub>L</sub>²) = ' + Vf + ' V.)',
      d: [[Vf * R / (R + X), 'somaArit', fmt(Vf * R / (R + X), 1) + ' V = ' + Vf + ' × ' + R + '/(' + R + ' + ' + X + '): dividiu a tensão como se R e X<sub>L</sub> fossem resistências em série.'],
        [Vf, 'tensaoTotal', Vf + ' V é a tensão da fonte, que se divide (fasorialmente) entre R e L.'],
        [I * X, 'divisorTroca', fmt(I * X, 1) + ' V é a tensão no indutor (I·X<sub>L</sub>), não no resistor.'],
        [Vf / 2, 'divIgual', fmt(Vf / 2, 1) + ' V divide a tensão da fonte ao meio entre R e L.'],
        [VR / R2, 'raiz2', fmt(VR / R2, 1) + ' V divide ainda por √2, como se o resultado fosse de pico; o enunciado já dá o eficaz.'],
        [VR * R2, 'pico', fmt(VR * R2, 1) + ' V é o pico da tensão no resistor (× √2); o voltímetro indica o eficaz.'],
        [Vf * R / (Z * Z), 'semRaiz', fmt(Vf * R / (Z * Z), 1) + ' V calcula a corrente com R² + X<sub>L</sub>² sem a raiz (' + Vf + '/' + Z * Z + ' A).'],
        [Vf - I * X, 'somaArit', fmt(Vf - I * X, 1) + ' V = ' + Vf + ' − ' + fmt(I * X, 1) + ': subtraiu a tensão do indutor da fonte como se fossem escalares; a soma é fasorial.'],
        [Vf * R / X, 'semR', fmt(Vf * R / X, 1) + ' V calcula a corrente com X<sub>L</sub> no lugar de |Z| (' + Vf + '/' + X + ' A).'],
        [I * (R + X), 'somaArit', fmt(I * (R + X), 1) + ' V = I·(R + X<sub>L</sub>): somou as quedas no resistor e no indutor como escalares.']] };
  });
  G('res', 'E2', '2.2', 'Ressonância', 'média', function (r) {
    var L = pick(r, [10, 20, 40, 50, 100]), C = pick(r, [10, 25, 40, 50, 100]), LC = L * 1e-3 * C * 1e-6, f = 1 / (2 * Math.PI * Math.sqrt(LC));
    return { v: { L: L, C: C }, s: 'Um circuito RLC série tem L = ' + L + ' mH e C = ' + C + ' µF. Sua frequência de ressonância é de, aproximadamente,', unit: 'Hz', dec: 1, ans: f,
      sol: 'f<sub>0</sub> = 1/(2π√(LC)) = 1/(2π√(' + fmt(L * 1e-3, 3) + ' × ' + C + ' × 10<sup>−6</sup>)) ≈ ' + fmt(f, 1) + ' Hz.',
      d: [[f * 2 * Math.PI, 'sem2pi', fmt(f * 2 * Math.PI, 1) + ' Hz = 1/√(LC): esqueceu o 2π (esse valor é ω<sub>0</sub>, em rad/s).'],
        [f / Math.sqrt(1000), 'unidade', fmt(f / Math.sqrt(1000), 1) + ' Hz usa L em henries sem converter (' + L + ' H em vez de ' + L + ' mH).'],
        [f * Math.sqrt(1000), 'unidade', fmt(f * Math.sqrt(1000), 1) + ' Hz usa C em nanofarads (' + C + ' nF em vez de ' + C + ' µF): errou o prefixo.'],
        [2 * Math.PI * Math.sqrt(LC) * 1000, 'invertida', fmt(2 * Math.PI * Math.sqrt(LC) * 1000, 1) + ' é o período T<sub>0</sub> = 2π√(LC) em milissegundos: inverteu a fórmula.'],
        [f / (2 * Math.PI), 'omegaF', fmt(f / (2 * Math.PI), 1) + ' Hz divide f<sub>0</sub> por 2π mais uma vez: confundiu ω com f na conversão.'],
        [1 / (2 * Math.PI * LC), 'semRaiz', fmt(1 / (2 * Math.PI * LC), 1) + ' Hz = 1/(2π·LC): esqueceu a raiz quadrada de LC.'],
        [2 * f, 'sem2pi', fmt(2 * f, 1) + ' Hz = 1/(π√(LC)): usou π no lugar de 2π.'],
        [f / 1000, 'unidade', fmt(f / 1000, 1) + ' é o resultado em quilohertz, escrito como se fosse em hertz.']] };
  });
  /* ================= E3 · potência e trifásicos ================= */
  G('pot', 'E3', '3.2', 'Potências em CA', 'fácil', function (r) {
    var Vf = pick(r, [127, 220]), I = pick(r, [4, 5, 8, 10, 12, 15, 20]), fp = pick(r, [0.6, 0.8]), sn = Math.sqrt(1 - fp * fp), S = Vf * I, P = S * fp, Q = S * sn;
    var st = 'Uma carga monofásica alimentada em ' + Vf + ' V absorve ' + I + ' A com fator de potência ' + fmt(fp, 1) + ' indutivo. ';
    if (r() < 0.5) return { v: { V: Vf, I: I, fp: fp, pede: 'P' }, s: st + 'A potência <b>ativa</b> absorvida é de', unit: 'W', dec: 0, ans: P,
      sol: 'S = V·I = ' + fmt(S, 0) + ' VA; P = S·cos φ = ' + fmt(S, 0) + ' × ' + fmt(fp, 1) + ' = ' + fmt(P, 0) + ' W.',
      d: [[S, 'aparente', fmt(S, 0) + ' VA = V·I é a potência aparente: faltou o fator de potência.'],
        [Q, 'senCos', fmt(Q, 0) + ' var = S·sen φ é a potência reativa: usou o seno no lugar do cosseno.'],
        [S / fp, 'divFP', fmt(S / fp, 0) + ' = V·I/FP: usou a fórmula S = P/FP com V·I no lugar de P, isto é, dividiu pelo FP em vez de multiplicar.'],
        [P * R3, 'raiz3Mono', fmt(P * R3, 0) + ' W = P × √3: aplicou o √3, que só entra em circuito trifásico.'],
        [P / R3, 'raiz3Mono', fmt(P / R3, 0) + ' W = P/√3: dividiu por √3, que não entra num circuito monofásico.'],
        [P * fp, 'divFP', fmt(P * fp, 0) + ' W = V·I·cos²φ: multiplicou pelo fator de potência duas vezes.'],
        [P / 2, 'pico', fmt(P / 2, 0) + ' W = V·I·cos φ/2: usou a fórmula de valores de pico (P = V<sub>p</sub>·I<sub>p</sub>·cos φ/2) com valores eficazes.'],
        [2 * P, 'pico', fmt(2 * P, 0) + ' W usa os valores de pico de V e I (√2 × √2 = 2) na fórmula de valores eficazes.']] };
    return { v: { V: Vf, I: I, fp: fp, pede: 'Q' }, s: st + 'A potência <b>reativa</b> absorvida é de', unit: 'var', dec: 0, ans: Q,
      sol: 'S = ' + fmt(S, 0) + ' VA; sen φ = √(1 − ' + fmt(fp, 1) + '²) = ' + fmt(sn, 1) + '; Q = S·sen φ = ' + fmt(Q, 0) + ' var.',
      d: [[P, 'senCos', fmt(P, 0) + ' W = S·cos φ é a potência ativa: usou o cosseno no lugar do seno.'],
        [S, 'aparente', fmt(S, 0) + ' VA = V·I é a potência aparente.'],
        [S * (1 - fp), 'senCos', fmt(S * (1 - fp), 0) + ' = S × (1 − FP): usou 1 − cos φ como se fosse sen φ; o certo é sen φ = √(1 − cos²φ).'],
        [Q * R3, 'raiz3Mono', fmt(Q * R3, 0) + ' var = Q × √3: aplicou o √3 num circuito monofásico.'],
        [Q / R3, 'raiz3Mono', fmt(Q / R3, 0) + ' var = Q/√3: dividiu por √3, que não entra num circuito monofásico.'],
        [Q * sn, 'senCos', fmt(Q * sn, 0) + ' var = V·I·sen²φ: multiplicou pelo seno duas vezes.'],
        [Q / 2, 'pico', fmt(Q / 2, 0) + ' var = V·I·sen φ/2: usou a fórmula de valores de pico com valores eficazes.'],
        [2 * Q, 'pico', fmt(2 * Q, 0) + ' var usa os valores de pico de V e I (√2 × √2 = 2) na fórmula de valores eficazes.'],
        [Q / fp, 'divFP', fmt(Q / fp, 0) + ' var = Q/FP: dividiu a reativa pelo fator de potência.']] };
  });
  G('fpcorr', 'E3', '3.3', 'Correção do fator de potência', 'média', function (r) {
    var P = pick(r, [20, 30, 40, 60, 80, 120]), fp = pick(r, [0.6, 0.8]), sn = Math.sqrt(1 - fp * fp), tg = sn / fp, ans = P * tg;
    return { v: { P: P, fp: fp }, s: 'Uma instalação trifásica consome ' + P + ' kW (potência total) com fator de potência ' + fmt(fp, 1) + ' indutivo. A potência reativa capacitiva necessária para elevar o fator de potência a <b>1,0</b> é de', unit: 'kvar', dec: 1, ans: ans,
      sol: 'tg φ<sub>1</sub> = ' + fmt(sn, 1) + '/' + fmt(fp, 1) + ' = ' + fmt(tg, 3) + '; com FP = 1, tg φ<sub>2</sub> = 0; Q<sub>C</sub> = P·(tg φ<sub>1</sub> − tg φ<sub>2</sub>) = ' + P + ' × ' + fmt(tg, 3) + ' = ' + fmt(ans, 1) + ' kvar.',
      d: [[P * sn, 'senCos', fmt(P * sn, 1) + ' = P·sen φ: multiplicou a potência ativa pelo seno; a reativa é P·tg φ.'],
        [P / fp, 'aparente', fmt(P / fp, 1) + ' kVA = P/FP é a potência aparente, não a reativa a compensar.'],
        [P / fp - P, 'somaArit', fmt(P / fp - P, 1) + ' = S − P = ' + fmt(P / fp, 1) + ' − ' + P + ': subtraiu as potências como números comuns; elas formam um triângulo retângulo, e a reativa é √(S² − P²).'],
        [P * tg / fp, 'divFP', fmt(P * tg / fp, 1) + ' kvar = P·tg φ/FP: dividiu ainda o resultado pelo fator de potência.'],
        [P * (tg - 0.426), 'alvo', fmt(P * (tg - 0.426), 1) + ' kvar leva o FP a 0,92 (tg φ<sub>2</sub> = 0,426), o valor de referência, e não a 1,0 como pede o enunciado.'],
        [P * tg / R3, 'raiz3Total', fmt(P * tg / R3, 1) + ' kvar = P·tg φ/√3: dividiu por √3; com a potência trifásica total, Q<sub>C</sub> = P·tg φ, sem √3.'],
        [P * tg * R3, 'raiz3Total', fmt(P * tg * R3, 1) + ' kvar = √3·P·tg φ: multiplicou por √3; os ' + P + ' kW já são a potência total, e Q<sub>C</sub> = P·tg φ dispensa o √3.'],
        [3 * P * tg, 'raiz3Total', fmt(3 * P * tg, 1) + ' kvar = 3·P·tg φ: tratou os ' + P + ' kW como potência por fase; eles já são o total das três fases.'],
        [P * (1 - fp), 'senCos', fmt(P * (1 - fp), 1) + ' kvar = P × (1 − FP): usou 1 − cos φ no lugar de tg φ.']] };
  });
  G('triI', 'E3', '4.2', 'Ligações estrela e triângulo', 'média', function (r) {
    var VL = pick(r, [220, 380]), R = pick(r, [10, 11, 19, 20, 22, 38]), Y = r() < 0.5;
    var st = 'Uma carga trifásica equilibrada, puramente resistiva, de ' + R + ' Ω por fase, ligada em <b>' + (Y ? 'estrela' : 'triângulo') + '</b>, é alimentada por uma rede com tensão de linha de ' + VL + ' V. A corrente de linha é de, aproximadamente,';
    if (Y) { var a = VL / R3 / R;
      return { v: { VL: VL, R: R, lig: 'Y' }, s: st, unit: 'A', dec: 2, ans: a,
        sol: 'Em estrela, cada resistor recebe V<sub>F</sub> = ' + VL + '/√3 = ' + fmt(VL / R3, 1) + ' V; I<sub>L</sub> = I<sub>F</sub> = ' + fmt(VL / R3, 1) + '/' + R + ' = ' + fmt(a, 2) + ' A.',
        d: [[VL / R, 'linhaFase', fmt(VL / R, 2) + ' A = ' + VL + '/' + R + ': aplicou a tensão de linha ao resistor; em estrela, ele recebe V<sub>L</sub>/√3.'],
          [R3 * VL / R, 'faseLinhaI', fmt(R3 * VL / R, 2) + ' A é a corrente de linha da ligação em triângulo (√3·V<sub>L</sub>/R).'],
          [VL / (3 * R), 'tres', fmt(VL / (3 * R), 2) + ' A = ' + VL + '/(3 × ' + R + '): dividiu por 3 em vez de √3.'],
          [VL / (R2 * R), 'raiz2', fmt(VL / (R2 * R), 2) + ' A usa √2 no lugar de √3; √2 é a relação entre pico e eficaz.'],
          [VL / (R3 * R2 * R), 'pico', fmt(VL / (R3 * R2 * R), 2) + ' A divide ainda por √2, como se ' + VL + ' V fosse valor de pico; as tensões da rede já são eficazes.'],
          [VL / (2 * R), 'divIgual', fmt(VL / (2 * R), 2) + ' A divide a tensão de linha igualmente entre as duas fases do caminho; em estrela, cada fase recebe V<sub>L</sub>/√3.'],
          [VL / (3 * R3 * R), 'divIgual', fmt(VL / (3 * R3 * R), 2) + ' A divide ainda a corrente de fase por 3, como se ela se repartisse entre as três fases.'],
          [VL * R2 / (R3 * R), 'pico', fmt(VL * R2 / (R3 * R), 2) + ' A multiplica por √2: é o pico da corrente; a rede é dada em valores eficazes.']] }; }
    var b = R3 * VL / R;
    return { v: { VL: VL, R: R, lig: 'D' }, s: st, unit: 'A', dec: 2, ans: b,
      sol: 'Em triângulo, cada resistor recebe ' + VL + ' V: I<sub>F</sub> = ' + fmt(VL / R, 2) + ' A; I<sub>L</sub> = √3·I<sub>F</sub> = ' + fmt(b, 2) + ' A.',
      d: [[VL / R, 'faseLinhaI', fmt(VL / R, 2) + ' A é a corrente de fase (no resistor); a de linha é √3 vezes maior.'],
        [3 * VL / R, 'tres', fmt(3 * VL / R, 2) + ' A = 3 × ' + fmt(VL / R, 2) + ': usou 3 no lugar de √3.'],
        [VL / (R3 * R), 'linhaFase', fmt(VL / (R3 * R), 2) + ' A divide a tensão por √3, como na estrela; no triângulo, cada resistor recebe a tensão de linha.'],
        [R2 * VL / R, 'raiz2', fmt(R2 * VL / R, 2) + ' A usa √2 no lugar de √3.'],
        [2 * VL / R, 'somaArit', fmt(2 * VL / R, 2) + ' A = 2 × I<sub>F</sub>: somou aritmeticamente as correntes das duas fases que chegam ao nó; a soma é fasorial (√3·I<sub>F</sub>).'],
        [R3 * VL / (R2 * R), 'pico', fmt(R3 * VL / (R2 * R), 2) + ' A divide por √2, como se ' + VL + ' V fosse valor de pico; a tensão da rede já é eficaz.'],
        [R3 * R2 * VL / R, 'pico', fmt(R3 * R2 * VL / R, 2) + ' A multiplica por √2: é o pico da corrente de linha, não o valor eficaz.']] };
  });
  G('triP', 'E3', '4.1', 'Potência trifásica', 'fácil', function (r) {
    var VL = pick(r, [220, 380, 440]), IL = pick(r, [10, 12, 15, 20, 25, 30]), fp = pick(r, [0.8, 0.85, 0.9]), sn = Math.sqrt(1 - fp * fp), ans = R3 * VL * IL * fp / 1000;
    return { v: { VL: VL, IL: IL, fp: fp }, s: 'Um motor trifásico opera numa rede de ' + VL + ' V, com corrente de linha de ' + IL + ' A e fator de potência ' + fmt(fp, 2) + '. A potência ativa absorvida é de, aproximadamente,', unit: 'kW', dec: 2, ans: ans,
      sol: 'P = √3·V<sub>L</sub>·I<sub>L</sub>·cos φ = 1,732 × ' + VL + ' × ' + IL + ' × ' + fmt(fp, 2) + ' ≈ ' + fmt(ans * 1000, 0) + ' W = ' + fmt(ans, 2) + ' kW.',
      d: [[VL * IL * fp / 1000, 'semRaiz3', fmt(VL * IL * fp / 1000, 2) + ' kW = V<sub>L</sub>·I<sub>L</sub>·cos φ: esqueceu o √3.'],
        [3 * VL * IL * fp / 1000, 'tres', fmt(3 * VL * IL * fp / 1000, 2) + ' kW usa 3 no lugar de √3 com a tensão de linha.'],
        [R3 * VL * IL / 1000, 'aparente', fmt(R3 * VL * IL / 1000, 2) + ' kVA = √3·V<sub>L</sub>·I<sub>L</sub> é a potência aparente: faltou o fator de potência.'],
        [VL * IL * fp / R3 / 1000, 'raiz3inv', fmt(VL * IL * fp / R3 / 1000, 2) + ' kW divide por √3 em vez de multiplicar.'],
        [R3 * VL * IL / fp / 1000, 'divFP', fmt(R3 * VL * IL / fp / 1000, 2) + ' kW divide pelo fator de potência em vez de multiplicar.'],
        [R3 * VL * IL * sn / 1000, 'senCos', fmt(R3 * VL * IL * sn / 1000, 2) + ' kvar usa sen φ: é a potência reativa.'],
        [R3 * VL * IL * fp * fp / 1000, 'divFP', fmt(R3 * VL * IL * fp * fp / 1000, 2) + ' kW multiplica pelo fator de potência duas vezes.'],
        [2 * R3 * VL * IL * fp / 1000, 'pico', fmt(2 * R3 * VL * IL * fp / 1000, 2) + ' kW usa valores de pico de V e de I (√2 × √2 = 2) na fórmula de valores eficazes.']] };
  });
  /* ================= M2 · eletromagnetismo e transformadores ================= */
  G('trV', 'M2', '5.3', 'Transformador ideal', 'fácil', function (r) {
    var N1 = pick(r, [400, 500, 600, 800, 1000, 1200]), N2 = pick(r, [20, 40, 50, 60, 100, 200]), V1 = pick(r, [220, 440, 2200, 4400]), ans = V1 * N2 / N1;
    return { v: { N1: N1, N2: N2, V1: V1 }, s: 'Um transformador ideal tem ' + fmt(N1, 0) + ' espiras no primário e ' + N2 + ' no secundário. Com ' + fmt(V1, 0) + ' V aplicados ao primário, a tensão no secundário é de', unit: 'V', dec: 1, ans: ans,
      sol: 'V<sub>2</sub> = V<sub>1</sub>·N<sub>2</sub>/N<sub>1</sub> = ' + fmt(V1, 0) + ' × ' + N2 + '/' + fmt(N1, 0) + ' = ' + fmt(ans, 1) + ' V.',
      d: [[V1 * N1 / N2, 'relInv', fmt(V1 * N1 / N2, 1) + ' V = V<sub>1</sub>·N<sub>1</sub>/N<sub>2</sub>: inverteu a relação, como se fosse um elevador.'],
        [V1 * Math.pow(N2 / N1, 2), 'relQuad', fmt(V1 * Math.pow(N2 / N1, 2), 1) + ' V usa a relação ao quadrado, que vale para impedância, não para tensão.'],
        [V1 / N1, 'etapa', fmt(V1 / N1, 1) + ' V é a tensão por espira do primário (V<sub>1</sub>/N<sub>1</sub>); falta multiplicar por N<sub>2</sub>.'],
        [V1, 'formula', fmt(V1, 0) + ' V supõe que a tensão não muda; ela muda na relação N<sub>2</sub>/N<sub>1</sub>.'],
        [V1 * N2, 'semFator', fmt(V1 * N2, 1) + ' V = V<sub>1</sub>·N<sub>2</sub>: esqueceu de dividir por N<sub>1</sub>.'],
        [V1 - ans, 'formula', fmt(V1 - ans, 1) + ' V = V<sub>1</sub> − V<sub>2</sub>: subtraiu a tensão do secundário da do primário, conta que não aparece no transformador ideal.'],
        [N1 / N2, 'etapa', fmt(N1 / N2, 1) + ' é a relação de espiras N<sub>1</sub>/N<sub>2</sub>, um número sem unidade; falta dividir V<sub>1</sub> por ela.'],
        [V1 * N2 / (N1 + N2), 'formula', fmt(V1 * N2 / (N1 + N2), 1) + ' V = V<sub>1</sub>·N<sub>2</sub>/(N<sub>1</sub> + N<sub>2</sub>): somou as espiras no denominador.'],
        [V1 * Math.pow(N1 / N2, 2), 'relQuad', fmt(V1 * Math.pow(N1 / N2, 2), 1) + ' V inverte a relação e ainda a eleva ao quadrado.']] };
  });
  G('trI', 'M2', '5.3', 'Correntes no transformador', 'fácil', function (r) {
    var S = pick(r, [5, 10, 15, 25]), p = pick(r, [[2200, 220], [440, 220], [440, 110], [13800, 220]]), A = p[0], B = p[1], sec = r() < 0.6, Vt = sec ? B : A, O = sec ? A : B, ans = S * 1000 / Vt;
    return { v: { S: S, V: Vt }, s: 'Um transformador monofásico ideal de ' + S + ' kVA, ' + fmt(A, 0) + '/' + B + ' V, opera em plena carga. A corrente no <b>' + (sec ? 'secundário' : 'primário') + '</b> é de, aproximadamente,', unit: 'A', dec: 1, ans: ans,
      sol: 'I = S/V = ' + fmt(S * 1000, 0) + '/' + fmt(Vt, 0) + ' = ' + fmt(ans, 1) + ' A. O lado de menor tensão tem a maior corrente.',
      d: [[S * 1000 / O, 'ladoTroc', fmt(S * 1000 / O, 1) + ' A = ' + fmt(S * 1000, 0) + '/' + fmt(O, 0) + ' é a corrente do outro enrolamento.'],
        [S * 1000 / (R3 * Vt), 'raiz3Mono', fmt(S * 1000 / (R3 * Vt), 1) + ' A divide também por √3, que só entra em transformador trifásico.'],
        [S * 1000 * R3 / Vt, 'raiz3Mono', fmt(S * 1000 * R3 / Vt, 1) + ' A multiplica por √3, que não entra num transformador monofásico.'],
        [0.8 * S * 1000 / Vt, 'divFP', fmt(0.8 * S * 1000 / Vt, 1) + ' A multiplica por um fator de potência de 0,8 que o enunciado não deu; a potência nominal (kVA) já é a aparente.'],
        [S * 1000 / (0.8 * Vt), 'divFP', fmt(S * 1000 / (0.8 * Vt), 1) + ' A divide ainda por um fator de potência de 0,8 que o enunciado não deu; a potência nominal já é a aparente (kVA).'],
        [S / Vt, 'unidade', fmt(S / Vt, 1) + ' A usa a potência em kVA sem converter para VA (' + S + ' em vez de ' + fmt(S * 1000, 0) + ').'],
        [ans * O / Vt, 'formula', fmt(ans * O / Vt, 1) + ' A multiplica ainda pela relação ' + fmt(O, 0) + '/' + fmt(Vt, 0) + ': aplicou a relação de transformação a uma corrente que já é a do lado pedido.'],
        [ans * R2, 'pico', fmt(ans * R2, 1) + ' A é o pico da corrente (× √2); a corrente nominal é dada em valor eficaz.']] };
  });
  G('trZ', 'M2', '5.3', 'Impedância refletida', 'média', function (r) {
    var p = pick(r, [[440, 2], [880, 4], [1100, 5], [2200, 10], [4400, 20]]), V1 = p[0], a = p[1], Z = pick(r, [2, 4, 5, 8, 10, 11]), ans = a * a * Z;
    return { v: { V1: V1, V2: 220, Z: Z }, s: 'Uma carga resistiva de ' + Z + ' Ω é ligada ao secundário de um transformador ideal de ' + fmt(V1, 0) + '/220 V. A resistência vista pela fonte, no primário, é de', unit: 'Ω', ans: ans,
      sol: 'a = ' + fmt(V1, 0) + '/220 = ' + a + '; Z′ = a²·Z<sub>2</sub> = ' + a * a + ' × ' + Z + ' = ' + sig(ans) + ' Ω.',
      d: [[a * Z, 'relSimples', sig(a * Z) + ' Ω = a·Z: impedância reflete com a², não com a.'],
        [Z / (a * a), 'relInv', sig(Z / (a * a)) + ' Ω = Z/a²: refletiu do primário para o secundário, ao contrário.'],
        [Z / a, 'relInv', sig(Z / a) + ' Ω = Z/a: inverteu a reflexão e ainda esqueceu o quadrado.'],
        [Math.pow(a * Z, 2), 'formula', sig(Math.pow(a * Z, 2)) + ' Ω = (a·Z)²: elevou ao quadrado também a carga; só a relação entra ao quadrado.'],
        [Math.pow(a, 4) * Z, 'relQuad', sig(Math.pow(a, 4) * Z) + ' Ω aplica a² duas vezes (a<sup>4</sup>·Z).'],
        [V1 * V1 / Z, 'outra', sig(V1 * V1 / Z) + ' = V<sub>1</sub>²/Z: é uma potência (em W, se a carga estivesse sob ' + fmt(V1, 0) + ' V), não uma resistência.'],
        [a * a * Z * R3, 'raiz3Mono', sig(a * a * Z * R3) + ' Ω multiplica ainda por √3, que não entra num transformador monofásico.'],
        [Z, 'relSimples', Z + ' Ω é a própria carga: esqueceu de refletir para o primário (multiplicar por a²).']] };
  });
  G('I3f', 'M2', '5.3', 'Corrente nominal trifásica', 'fácil', function (r) {
    var S = pick(r, [75, 112.5, 150, 225, 300, 500]), VL = pick(r, [220, 380]), ans = S * 1000 / (R3 * VL);
    return { v: { S: S, VL: VL }, s: 'A corrente nominal no secundário de um transformador trifásico de ' + num(S) + ' kVA, com tensão de linha de ' + VL + ' V no secundário, é de, aproximadamente,', unit: 'A', dec: 1, ans: ans,
      sol: 'I = S/(√3·V<sub>L</sub>) = ' + fmt(S * 1000, 0) + '/(1,732 × ' + VL + ') ≈ ' + fmt(ans, 1) + ' A.',
      d: [[S * 1000 / VL, 'semRaiz3', fmt(S * 1000 / VL, 1) + ' A = S/V<sub>L</sub>: esqueceu o √3.'],
        [S * 1000 / (3 * VL), 'tres', fmt(S * 1000 / (3 * VL), 1) + ' A usa 3 no lugar de √3.'],
        [S * 1000 * R3 / VL, 'raiz3inv', fmt(S * 1000 * R3 / VL, 1) + ' A multiplica por √3 em vez de dividir.'],
        [0.8 * S * 1000 / (R3 * VL), 'divFP', fmt(0.8 * S * 1000 / (R3 * VL), 1) + ' A multiplica por um fator de potência de 0,8 que o enunciado não deu; a potência nominal (kVA) já é a aparente.'],
        [S * 1000 / (2 * VL), 'formula', fmt(S * 1000 / (2 * VL), 1) + ' A divide por 2 no lugar de √3.'],
        [S * 1000 / (R2 * VL), 'raiz2', fmt(S * 1000 / (R2 * VL), 1) + ' A usa √2 no lugar de √3.'],
        [S / (R3 * VL), 'unidade', fmt(S / (R3 * VL), 1) + ' A usa a potência em kVA sem converter para VA.'],
        [S * 1000 / (0.8 * R3 * VL), 'divFP', fmt(S * 1000 / (0.8 * R3 * VL), 1) + ' A divide por um fator de potência de 0,8 que o enunciado não deu; a potência nominal (kVA) já é a aparente.'],
        [S * 1000 * R2 / (R3 * VL), 'pico', fmt(S * 1000 * R2 / (R3 * VL), 1) + ' A é o pico da corrente (× √2); a corrente nominal é dada em valor eficaz.']] };
  });
  G('eta', 'M2', '5.3', 'Rendimento do transformador', 'difícil', function (r) {
    var S = pick(r, [50, 75, 100, 150]), fp = pick(r, [0.8, 1]), Pfe = pick(r, [200, 300, 400, 500]), Pc = pick(r, [800, 1000, 1200, 1500, 2000]), x = pick(r, [0.5, 0.75]);
    var P = x * S * fp * 1000, pc = x * x * Pc, ans = 100 * P / (P + Pfe + pc);
    return { letras: 'ABC', v: { S: S, fp: fp, Pfe: Pfe, Pc: Pc, x: x }, s: 'Um transformador de ' + S + ' kVA tem perdas no ferro de ' + Pfe + ' W e perdas no cobre de ' + fmt(Pc, 0) + ' W em carga nominal. Alimentando ' + fmt(x * 100, 0) + '% da carga nominal, com fator de potência ' + fmt(fp, 1) + ', seu rendimento é de, aproximadamente,', unit: '%', dec: 2, ans: ans, sep: 0.001,
      sol: 'P<sub>saída</sub> = ' + fmt(x, 2) + ' × ' + S + ' × ' + fmt(fp, 1) + ' = ' + fmt(P / 1000, 1) + ' kW; P<sub>Cu</sub> = ' + fmt(x, 2) + '² × ' + fmt(Pc, 0) + ' = ' + fmt(pc, 0) + ' W; η = ' + fmt(P, 0) + '/(' + fmt(P, 0) + ' + ' + Pfe + ' + ' + fmt(pc, 0) + ') ≈ ' + fmt(ans, 2) + '%.',
      d: [[100 * P / (P + Pfe + x * Pc), 'cuLinear', fmt(100 * P / (P + Pfe + x * Pc), 2) + '% usa P<sub>Cu</sub> = ' + fmt(x, 2) + ' × ' + fmt(Pc, 0) + ' W: escalou as perdas no cobre linearmente; elas variam com o quadrado da carga.'],
        [100 * P / (P + pc), 'semPerda', fmt(100 * P / (P + pc), 2) + '% esqueceu as perdas no ferro (' + Pfe + ' W), que existem em qualquer carga.'],
        [100 * P / (P + Pfe), 'semPerda', fmt(100 * P / (P + Pfe), 2) + '% esqueceu as perdas no cobre.'],
        [100 * (x * S * 1000) / (x * S * 1000 + Pfe + pc), 'usouS', fmt(100 * (x * S * 1000) / (x * S * 1000 + Pfe + pc), 2) + '% usa a potência aparente (kVA) no lugar da ativa: faltou o fator de potência.'],
        [100 * P / (P + x * Pfe + pc), 'formula', fmt(100 * P / (P + x * Pfe + pc), 2) + '% reduz também as perdas no ferro com a carga; elas dependem da tensão e ficam constantes (' + Pfe + ' W).'],
        [100 * P / (P + Pfe + Pc), 'semFator', fmt(100 * P / (P + Pfe + Pc), 2) + '% usa as perdas no cobre nominais (' + fmt(Pc, 0) + ' W); com ' + fmt(x * 100, 0) + '% da carga, elas são x²·P<sub>Cu</sub> = ' + fmt(pc, 0) + ' W.'],
        [100 * (1 - (Pfe + pc) / P), 'formula', fmt(100 * (1 - (Pfe + pc) / P), 2) + '% = 1 − perdas/P<sub>saída</sub>: dividiu as perdas pela saída; no rendimento, o denominador é a entrada (saída + perdas).'],
        [100, 'semPerda', '100% supõe um transformador ideal, sem perdas.']] };
  });
  G('etamax', 'M2', '5.3', 'Rendimento máximo', 'média', function (r) {
    var p = pick(r, [[90, 1000], [160, 1000], [144, 900], [250, 1000], [300, 1200], [200, 800], [400, 1600], [360, 1000]]), Pfe = p[0], Pc = p[1], x = Math.sqrt(Pfe / Pc), ans = 100 * x;
    return { v: { Pfe: Pfe, Pc: Pc }, s: 'Um transformador tem perdas no ferro de ' + Pfe + ' W e perdas no cobre de ' + fmt(Pc, 0) + ' W em carga nominal. O rendimento máximo ocorre com carga de, aproximadamente,', unit: '% da nominal', dec: 0, ans: ans,
      sol: 'O rendimento é máximo quando P<sub>Cu</sub> = P<sub>Fe</sub>: x²·' + fmt(Pc, 0) + ' = ' + Pfe + ' → x = √(' + Pfe + '/' + fmt(Pc, 0) + ') = ' + fmt(x, 2) + ', ou seja, ' + fmt(ans, 0) + '% da carga nominal.',
      d: [[100 * Pfe / Pc, 'semRaiz', fmt(100 * Pfe / Pc, 0) + '% = P<sub>Fe</sub>/P<sub>Cu</sub>: esqueceu a raiz quadrada.'],
        [100, 'formula', '100% supõe que o rendimento máximo é sempre na carga nominal; ele ocorre quando P<sub>Cu</sub> = P<sub>Fe</sub>.'],
        [100 * (1 - x), 'formula', fmt(100 * (1 - x), 0) + '% = 1 − √(P<sub>Fe</sub>/P<sub>Cu</sub>): subtraiu o resultado de 1.'],
        [100 * Pfe / (Pfe + Pc), 'formula', fmt(100 * Pfe / (Pfe + Pc), 0) + '% = P<sub>Fe</sub>/(P<sub>Fe</sub> + P<sub>Cu</sub>): fórmula que não existe para o ponto de rendimento máximo.'],
        [100 * Math.sqrt(Pfe / (Pfe + Pc)), 'formula', fmt(100 * Math.sqrt(Pfe / (Pfe + Pc)), 0) + '% = √(P<sub>Fe</sub>/(P<sub>Fe</sub> + P<sub>Cu</sub>)): pôs a soma das perdas sob a raiz.'],
        [100 * Math.pow(Pfe / Pc, 2), 'formula', fmt(100 * Math.pow(Pfe / Pc, 2), 0) + '% = (P<sub>Fe</sub>/P<sub>Cu</sub>)²: elevou ao quadrado em vez de tirar a raiz.'],
        [100 * (1 - Pfe / Pc), 'formula', fmt(100 * (1 - Pfe / Pc), 0) + '% = 1 − P<sub>Fe</sub>/P<sub>Cu</sub>: subtraiu a razão das perdas de 1 e esqueceu a raiz.'],
        [100 * Pc / (Pfe + Pc), 'formula', fmt(100 * Pc / (Pfe + Pc), 0) + '% = P<sub>Cu</sub>/(P<sub>Fe</sub> + P<sub>Cu</sub>): é a fração do cobre nas perdas nominais, não o ponto de rendimento máximo.'],
        [100 * Math.sqrt(1 - Pfe / Pc), 'formula', fmt(100 * Math.sqrt(1 - Pfe / Pc), 0) + '% = √(1 − P<sub>Fe</sub>/P<sub>Cu</sub>): tirou a raiz da diferença; a condição é x²·P<sub>Cu</sub> = P<sub>Fe</sub>.']] };
  });
  G('force', 'M2', '5.1', 'Força magnética', 'média', function (r) {
    var B = pick(r, [0.4, 0.5, 0.8, 1.2]), I = pick(r, [10, 15, 20, 25]), L = pick(r, [0.2, 0.3, 0.5]), th = pick(r, [90, 30]), sn = th === 30 ? 0.5 : 1, ans = B * I * L * sn;
    var d = th === 30
      ? [[B * I * L, 'angulo', fmt(B * I * L, 2) + ' N = B·I·L: usou sen 90°; com 30° entre condutor e campo, sen 30° = 0,5.'],
        [B * I * L * R3 / 2, 'angulo', fmt(B * I * L * R3 / 2, 2) + ' N usa cos 30° no lugar de sen 30°.'],
        [B * I * sn, 'semFator', fmt(B * I * sn, 2) + ' N esqueceu o comprimento do condutor.'],
        [B * I * L * 100 * sn, 'unidade', fmt(B * I * L * 100 * sn, 2) + ' N usa o comprimento em centímetros (' + fmt(L * 100, 0) + ') sem converter para metros.'],
        [I * L * sn, 'semFator', fmt(I * L * sn, 2) + ' N = I·L·sen θ: esqueceu o campo B.'],
        [B * L * sn, 'semFator', fmt(B * L * sn, 2) + ' N = B·L·sen θ: esqueceu a corrente.'],
        [B * I * L / 3, 'angulo', fmt(B * I * L / 3, 2) + ' N usa 30°/90° = 1/3 no lugar de sen 30° = 0,5: fez uma proporção com os ângulos.'],
        [ans / 10, 'unidade', fmt(ans / 10, 2) + ' N usa L = ' + fmt(L / 10, 3) + ' m: dividiu os centímetros por 1.000 em vez de 100.']]
      : [[B * I * L * 0.5, 'angulo', fmt(B * I * L * 0.5, 2) + ' N usa sen 30°; com o condutor perpendicular ao campo, sen 90° = 1.'],
        [B * I, 'semFator', fmt(B * I, 2) + ' N = B·I: esqueceu o comprimento.'],
        [B * I * L * 100, 'unidade', fmt(B * I * L * 100, 2) + ' N usa o comprimento em centímetros sem converter para metros.'],
        [I * L, 'semFator', fmt(I * L, 2) + ' N = I·L: esqueceu o campo B.'],
        [B * L, 'semFator', fmt(B * L, 2) + ' N = B·L: esqueceu a corrente.'],
        [ans / 10, 'unidade', fmt(ans / 10, 2) + ' N usa L = ' + fmt(L / 10, 3) + ' m: dividiu os centímetros por 1.000 em vez de 100.'],
        [B * I / L, 'invertida', fmt(B * I / L, 2) + ' N = B·I/L: dividiu pelo comprimento em vez de multiplicar.']];
    return { letras: 'ABCD', v: { B: B, I: I, L: L, th: th }, s: 'Um condutor retilíneo de ' + fmt(L * 100, 0) + ' cm, percorrido por ' + I + ' A, está imerso num campo uniforme de ' + fmt(B, 1) + ' T, formando ' + th + '° com as linhas de campo. A força sobre o condutor é de', unit: 'N', dec: 2, ans: ans,
      sol: 'F = B·I·L·sen θ = ' + fmt(B, 1) + ' × ' + I + ' × ' + fmt(L, 1) + ' × sen ' + th + '° = ' + fmt(ans, 2) + ' N.', d: d };
  });
  G('faraday', 'M2', '5.1', 'Lei de Faraday', 'média', function (r) {
    var N = pick(r, [50, 100, 200, 250, 500]), F1 = pick(r, [2, 4, 5, 6, 8]), k = pick(r, [0.25, 0.5]), F2 = F1 * k, dt = pick(r, [10, 20, 25, 50]), dF = F1 - F2, ans = N * dF / dt;
    return { v: { N: N, F1: F1, F2: F2, dt: dt }, s: 'O fluxo que atravessa uma bobina de ' + N + ' espiras cai uniformemente de ' + F1 + ' mWb para ' + num(F2) + ' mWb em ' + dt + ' ms. O módulo da fem média induzida é de', unit: 'V', dec: 2, ans: ans,
      sol: '|e| = N·ΔΦ/Δt = ' + N + ' × ' + fmt(dF * 1e-3, 4) + ' Wb/' + fmt(dt * 1e-3, 3) + ' s = ' + fmt(ans, 2) + ' V.',
      d: [[N * F1 / dt, 'fluxoTotal', fmt(N * F1 / dt, 2) + ' V usa o fluxo inicial (' + F1 + ' mWb) no lugar da variação (' + num(dF) + ' mWb).'],
        [N * (F1 + F2) / dt, 'sinal', fmt(N * (F1 + F2) / dt, 2) + ' V soma os fluxos inicial e final; a variação é a diferença.'],
        [dF / dt, 'semFator', fmt(dF / dt, 2) + ' V = ΔΦ/Δt: esqueceu as ' + N + ' espiras.'],
        [ans * 1000, 'unidade', fmt(ans * 1000, 2) + ' V usa o fluxo em Wb sem o prefixo mili (' + num(dF) + ' Wb em vez de ' + num(dF) + ' mWb).'],
        [ans / 1000, 'unidade', fmt(ans / 1000, 2) + ' V converte o fluxo para Wb e deixa o tempo em ms: errou a conversão de uma das grandezas.'],
        [N * dF / 1000, 'etapa', fmt(N * dF / 1000, 2) + ' = N·ΔΦ (em Wb): parou antes de dividir pelo tempo.'],
        [N * F2 / dt, 'fluxoTotal', fmt(N * F2 / dt, 2) + ' V usa o fluxo final (' + num(F2) + ' mWb) no lugar da variação (' + num(dF) + ' mWb).'],
        [ans * 10, 'unidade', fmt(ans * 10, 2) + ' V usa Δt = ' + fmt(dt / 10000, 4) + ' s: errou a conversão de ' + dt + ' ms (que são ' + fmt(dt / 1000, 3) + ' s).']] };
  });
  G('tc', 'M2', '7.3', 'Transformador de corrente', 'fácil', function (r) {
    var p = pick(r, [100, 150, 200, 300, 400, 600, 800]), rd = pick(r, [2, 2.5, 3, 3.5, 4, 4.5]), rtc = p / 5, ans = rd * rtc;
    return { letras: 'BCDE', v: { p: p, rd: rd }, s: 'Um TC de relação ' + p + '-5 A alimenta um amperímetro que indica ' + num(rd) + ' A. A corrente no circuito primário é de', unit: 'A', dec: 1, ans: ans,
      sol: 'RTC = ' + p + '/5 = ' + rtc + '; I<sub>p</sub> = ' + rtc + ' × ' + num(rd) + ' = ' + fmt(ans, 1) + ' A.',
      d: [[p, 'rtc', p + ' A é a corrente nominal do primário, não a medida.'],
        [rd * p, 'rtc', fmt(rd * p, 1) + ' A = ' + num(rd) + ' × ' + p + ': multiplicou pelo primário sem dividir pelo secundário (5 A).'],
        [rd * 5 / p, 'rtc', fmt(rd * 5 / p, 1) + ' A = ' + num(rd) + ' × 5/' + p + ': inverteu a relação do TC.'],
        [rd, 'rtc', num(rd) + ' A é a leitura do amperímetro, no secundário; falta multiplicar pela RTC.'],
        [rtc, 'rtc', rtc + ' é a própria RTC (' + p + '/5), um número sem unidade; falta multiplicar pela leitura.'],
        [rd * 5, 'rtc', fmt(rd * 5, 1) + ' A = ' + num(rd) + ' × 5: multiplicou pela corrente do secundário em vez da RTC.'],
        [p * 5 / rd, 'rtc', fmt(p * 5 / rd, 1) + ' A = ' + p + ' × 5/' + num(rd) + ': dividiu pela leitura em vez de multiplicar.'],
        [rd * (p + 5), 'rtc', fmt(rd * (p + 5), 1) + ' A = ' + num(rd) + ' × (' + p + ' + 5): somou as correntes nominais dos dois lados em vez de dividir.']] };
  });
  G('idx', 'M2', '5.3', 'Índice horário', 'média', function (r) {
    var p = pick(r, [['Dyn1', 1, 30], ['Dyn11', 11, 330], ['Dy5', 5, 150], ['Yd11', 11, 330], ['Yy0', 0, 0], ['Dd6', 6, 180]]), lig = p[0], h = p[1], atraso = p[2];
    var txt = function (a) { return a === 0 ? 'em fase' : a === 180 ? 'em oposição de fase (180°)' : a < 180 ? 'atrasada ' + a + '°' : 'adiantada ' + (360 - a) + '°'; };
    var corr = txt(atraso), pool = [];
    if (atraso !== 0 && atraso !== 180) pool.push([txt(360 - atraso), 'atrAdi', '“' + txt(360 - atraso) + '” inverte atraso e adiantamento: no ' + lig + ', a baixa tensão fica ' + h + ' × 30° = ' + atraso + '° atrasada (sentido horário do relógio)' + (atraso > 180 ? ', o que equivale a ' + (360 - atraso) + '° adiantada' : '') + '.']);
    if (h > 0) pool.push(['atrasada ' + h + '°', 'horaGrau', '“atrasada ' + h + '°” lê o índice como graus; cada hora do relógio vale 30°.']);
    [0, 30, 150, 180, 210, 330].forEach(function (a) {
      if (a === atraso || (atraso !== 0 && atraso !== 180 && a === 360 - atraso)) return;
      pool.push([txt(a), 'horaGrau', '“' + txt(a) + '” corresponde ao índice ' + a / 30 + ' (' + a / 30 + ' × 30° = ' + a + '° de atraso), não ao índice ' + h + ' do ' + lig + '.']);
    });
    return { v: { h: h }, s: 'A placa de um transformador indica a ligação <b>' + lig + '</b>. Em relação à tensão de linha do lado de alta tensão, a tensão de linha do lado de baixa tensão está', text: true, corr: corr,
      pool: pool,
      sol: 'Índice ' + h + ' → ' + h + ' × 30° = ' + atraso + '° de atraso da baixa em relação à alta' + (atraso > 180 ? ', o que equivale a ' + (360 - atraso) + '° de adiantamento' : '') + (atraso === 180 ? ': oposição de fase' : '') + (atraso === 0 ? ': as duas ficam em fase' : '') + '.' };
  });
  /* ================= E1 · circuitos CC ================= */
  G('mista', 'E1', '2.1', 'Associação mista', 'média', function (r) {
    var E = pick(r, [12, 24, 36, 48]), p = pick(r, [[6, 3], [12, 6], [12, 4], [20, 5], [10, 10]]), A = p[0], B = p[1], R1 = pick(r, [2, 4, 5, 6, 8]), Rp = A * B / (A + B), It = E / (R1 + Rp);
    /* O resistor pedido (X) é sorteado entre os dois do paralelo; Y é o outro. */
    var X = r() < 0.5 ? A : B, Y = X === A ? B : A, IX = It * Y / (A + B);
    return { v: { E: E, A: A, B: B, R1: R1, X: X }, s: 'Um resistor de ' + R1 + ' Ω está em série com a associação em paralelo de ' + A + ' Ω e ' + B + ' Ω, e o conjunto é ligado a ' + E + ' V. A corrente no resistor de ' + X + ' Ω' + (A === B ? ' (um dos dois do paralelo)' : '') + ' é de, aproximadamente,', unit: 'A', dec: 2, ans: IX,
      sol: 'Paralelo: ' + A + ' × ' + B + '/' + (A + B) + ' = ' + fmt(Rp, 2) + ' Ω; total ' + fmt(R1 + Rp, 2) + ' Ω; I = ' + fmt(It, 2) + ' A; V<sub>par</sub> = ' + fmt(It * Rp, 2) + ' V; I<sub>' + X + '</sub> = ' + fmt(It * Rp, 2) + '/' + X + ' = ' + fmt(IX, 2) + ' A.',
      d: [[It, 'total', fmt(It, 2) + ' A é a corrente total, que se divide entre os dois ramos do paralelo.'],
        [It * X / (A + B), 'divisorTroca', fmt(It * X / (A + B), 2) + ' A usa o próprio resistor no numerador do divisor de corrente; o numerador é o outro resistor (' + Y + ' Ω).'],
        [E / (R1 + A + B), 'serieTudo', fmt(E / (R1 + A + B), 2) + ' A soma os três resistores, como se estivessem todos em série.'],
        [E / X, 'tensaoTotal', fmt(E / X, 2) + ' A aplica a tensão da fonte inteira ao resistor de ' + X + ' Ω.'],
        [E / (R1 + X), 'formula', fmt(E / (R1 + X), 2) + ' A ignora o resistor de ' + Y + ' Ω, como se o ramo estivesse aberto.'],
        [It * Rp, 'etapa', fmt(It * Rp, 2) + ' é a tensão sobre o paralelo, em volts; falta dividir por ' + X + ' Ω.'],
        [E / R1, 'tensaoTotal', fmt(E / R1, 2) + ' A aplica a tensão da fonte inteira ao resistor de ' + R1 + ' Ω.'],
        [It * Rp / (A + B), 'serieTudo', fmt(It * Rp / (A + B), 2) + ' A divide a tensão do paralelo pela soma dos dois resistores, como se estivessem em série.'],
        [It / 2, 'divIgual', fmt(It / 2, 2) + ' A divide a corrente total ao meio entre os dois ramos, o que só vale para resistores iguais.'],
        [It * Rp / Y, 'divisorTroca', fmt(It * Rp / Y, 2) + ' A é a corrente no outro resistor do paralelo (' + Y + ' Ω).'],
        [It * Rp / (R1 + X), 'serieTudo', fmt(It * Rp / (R1 + X), 2) + ' A divide a tensão do paralelo por ' + R1 + ' Ω + ' + X + ' Ω, como se o resistor em série também estivesse no ramo.'],
        [It * R1 / X, 'etapa', fmt(It * R1 / X, 2) + ' A usa a queda no resistor de ' + R1 + ' Ω (' + fmt(It * R1, 2) + ' V) no lugar da tensão do paralelo.']] };
  });
  G('bat', 'E1', '2.1', 'Fonte real', 'média', function (r) {
    var E = pick(r, [12, 12.6, 24, 25, 48]), rr = pick(r, [0.1, 0.2, 0.25, 0.4, 0.5]), I1 = pick(r, [1, 2]), I2 = pick(r, [3, 4, 5]), V1 = E - rr * I1, V2 = E - rr * I2;
    var st = 'Em dois ensaios de uma bateria, mediram-se ' + fmt(V1, 2) + ' V com ' + I1 + ' A e ' + fmt(V2, 2) + ' V com ' + I2 + ' A.';
    if (r() < 0.5) return { v: { V1: V1, I1: I1, V2: V2, I2: I2, pede: 'r' }, s: st + ' A resistência interna da bateria é de', unit: 'Ω', dec: 2, ans: rr,
      sol: 'r = (V<sub>1</sub> − V<sub>2</sub>)/(I<sub>2</sub> − I<sub>1</sub>) = ' + fmt(V1 - V2, 2) + '/' + (I2 - I1) + ' = ' + fmt(rr, 2) + ' Ω.',
      d: [[(V1 - V2) / (I1 + I2), 'rintSoma', fmt((V1 - V2) / (I1 + I2), 2) + ' Ω divide pela soma das correntes; o certo é a diferença (I<sub>2</sub> − I<sub>1</sub>).'],
        [V2 / I2, 'cargaR', fmt(V2 / I2, 2) + ' Ω = ' + fmt(V2, 2) + '/' + I2 + ' é a resistência da carga no segundo ensaio, não a interna.'],
        [(V1 - V2) / I2, 'rintSoma', fmt((V1 - V2) / I2, 2) + ' Ω divide a queda pela corrente de um ensaio só; o certo é a variação da corrente.'],
        [(V1 - V2) * (I2 - I1), 'rintSoma', fmt((V1 - V2) * (I2 - I1), 2) + ' Ω multiplica as variações em vez de dividir.'],
        [V1 / I1, 'cargaR', fmt(V1 / I1, 2) + ' Ω = ' + fmt(V1, 2) + '/' + I1 + ' é a resistência da carga no primeiro ensaio.'],
        [(V1 + V2) / (I1 + I2), 'cargaR', fmt((V1 + V2) / (I1 + I2), 2) + ' Ω soma as leituras e as correntes: é uma resistência de carga média, não a interna.'],
        [(V1 - V2) / (I1 * I2), 'rintSoma', fmt((V1 - V2) / (I1 * I2), 2) + ' Ω divide a diferença das tensões pelo produto das correntes.']] };
    return { v: { V1: V1, I1: I1, V2: V2, I2: I2, pede: 'E' }, s: st + ' A força eletromotriz da bateria é de', unit: 'V', dec: 2, ans: E, sep: 0.003,
      sol: 'r = ' + fmt(V1 - V2, 2) + '/' + (I2 - I1) + ' = ' + fmt(rr, 2) + ' Ω; E = V<sub>1</sub> + r·I<sub>1</sub> = ' + fmt(V1, 2) + ' + ' + fmt(rr * I1, 2) + ' = ' + fmt(E, 2) + ' V.',
      d: [[V1, 'fem', fmt(V1, 2) + ' V é a tensão nos terminais com ' + I1 + ' A; a fem é maior que qualquer tensão medida com carga.'],
        [V2, 'fem', fmt(V2, 2) + ' V é a tensão nos terminais com ' + I2 + ' A.'],
        [V1 - rr * I1, 'sinal', fmt(V1 - rr * I1, 2) + ' V subtrai a queda interna em vez de somar: E = V + r·I.'],
        [(V1 + V2) / 2, 'formula', fmt((V1 + V2) / 2, 2) + ' V é a média das duas leituras; a fem é a tensão com corrente zero.'],
        [V1 + rr * I2, 'rintSoma', fmt(V1 + rr * I2, 2) + ' V soma à leitura de ' + I1 + ' A a queda calculada com a corrente do outro ensaio (' + I2 + ' A).'],
        [V1 + 2 * rr * I1, 'formula', fmt(V1 + 2 * rr * I1, 2) + ' V soma a queda interna duas vezes.'],
        [V1 + rr * (I1 + I2), 'rintSoma', fmt(V1 + rr * (I1 + I2), 2) + ' V soma à leitura as quedas dos dois ensaios.'],
        [V2 - rr * I2, 'sinal', fmt(V2 - rr * I2, 2) + ' V parte da leitura de ' + I2 + ' A e subtrai a queda interna em vez de somar.']] };
  });
  G('thev', 'E1', '2.5', 'Thévenin', 'difícil', function (r) {
    var p = pick(r, [[6, 3], [12, 6], [4, 4], [10, 10], [20, 5]]), A = p[0], B = p[1], R3_ = pick(r, [1, 2, 3, 4]), E = pick(r, [12, 18, 24, 36, 48]), RL = pick(r, [2, 4, 6, 8, 10]);
    var Rp = A * B / (A + B), Vth = E * B / (A + B), Rth = Rp + R3_, IL = Vth / (Rth + RL);
    var st = 'Uma fonte de ' + E + ' V alimenta, por um resistor de ' + A + ' Ω, um nó do qual sai um resistor de ' + B + ' Ω para a referência e um resistor de ' + R3_ + ' Ω até o terminal a (o terminal b é a referência).';
    if (r() < 0.5) return { v: { E: E, A: A, B: B, R3: R3_, RL: RL, pede: 'I' }, s: st + ' Ligando-se uma carga de ' + RL + ' Ω entre a e b, a corrente na carga é de, aproximadamente,', unit: 'A', dec: 2, ans: IL,
      sol: 'V<sub>th</sub> = ' + E + ' × ' + B + '/' + (A + B) + ' = ' + fmt(Vth, 2) + ' V; R<sub>th</sub> = (' + A + ' ∥ ' + B + ') + ' + R3_ + ' = ' + fmt(Rth, 2) + ' Ω; I<sub>L</sub> = ' + fmt(Vth, 2) + '/(' + fmt(Rth, 2) + ' + ' + RL + ') = ' + fmt(IL, 2) + ' A.',
      d: [[Vth / RL, 'semRth', fmt(Vth / RL, 2) + ' A = V<sub>th</sub>/R<sub>L</sub>: esqueceu a resistência de Thévenin em série com a carga.'],
        [E / (Rth + RL), 'usouE', fmt(E / (Rth + RL), 2) + ' A usa a fonte de ' + E + ' V no lugar de V<sub>th</sub> = ' + fmt(Vth, 2) + ' V.'],
        [Vth / (B + R3_ + RL), 'fonteAberta', fmt(Vth / (B + R3_ + RL), 2) + ' A calcula R<sub>th</sub> com a fonte aberta (o de ' + A + ' Ω some); zerar a fonte de tensão é pô-la em curto.'],
        [Vth / (A + B + R3_ + RL), 'serieTudo', fmt(Vth / (A + B + R3_ + RL), 2) + ' A soma todos os resistores na R<sub>th</sub>; o de ' + A + ' Ω e o de ' + B + ' Ω ficam em paralelo.'],
        [E / (A + B + R3_ + RL), 'serieTudo', fmt(E / (A + B + R3_ + RL), 2) + ' A põe tudo em série com a fonte original, sem montar o equivalente.'],
        [Vth / (A + R3_ + RL), 'semFator', fmt(Vth / (A + R3_ + RL), 2) + ' A calcula R<sub>th</sub> sem o resistor de ' + B + ' Ω, que fica em paralelo com o de ' + A + ' Ω.'],
        [Vth / (Rth + RL + R3_), 'formula', fmt(Vth / (Rth + RL + R3_), 2) + ' A conta o resistor de ' + R3_ + ' Ω duas vezes na malha.'],
        [Vth / Rth, 'semFator', fmt(Vth / Rth, 2) + ' A = V<sub>th</sub>/R<sub>th</sub> é a corrente de curto (sem a carga).'],
        [Vth / (Rp + RL), 'semFator', fmt(Vth / (Rp + RL), 2) + ' A esqueceu o resistor de ' + R3_ + ' Ω na R<sub>th</sub>.']] };
    return { v: { E: E, A: A, B: B, R3: R3_, RL: RL, pede: 'Rth' }, s: st + ' A resistência de Thévenin vista entre a e b é de', unit: 'Ω', dec: 2, ans: Rth,
      sol: 'Com a fonte em curto: ' + A + ' Ω ∥ ' + B + ' Ω = ' + fmt(Rp, 2) + ' Ω, em série com ' + R3_ + ' Ω → R<sub>th</sub> = ' + fmt(Rth, 2) + ' Ω.',
      d: [[B + R3_, 'fonteAberta', fmt(B + R3_, 2) + ' Ω deixa a fonte aberta (o de ' + A + ' Ω some); zerar a fonte de tensão é pô-la em curto.'],
        [A + B + R3_, 'serieTudo', fmt(A + B + R3_, 2) + ' Ω soma os três; com a fonte em curto, ' + A + ' Ω e ' + B + ' Ω ficam em paralelo.'],
        [Rp, 'semFator', fmt(Rp, 2) + ' Ω é só o paralelo: esqueceu o resistor de ' + R3_ + ' Ω até o terminal a.'],
        [A + R3_, 'semFator', fmt(A + R3_, 2) + ' Ω ignora o resistor de ' + B + ' Ω, que fica em paralelo com o de ' + A + ' Ω.'],
        [R3_, 'semFator', fmt(R3_, 2) + ' Ω é só o resistor até o terminal: esqueceu o paralelo de ' + A + ' Ω com ' + B + ' Ω.'],
        [Rp * R3_ / (Rp + R3_), 'seriePar', fmt(Rp * R3_ / (Rp + R3_), 2) + ' Ω põe o resistor de ' + R3_ + ' Ω em paralelo com os outros dois; ele fica em série.'],
        [(A + R3_) * B / (A + R3_ + B), 'seriePar', fmt((A + R3_) * B / (A + R3_ + B), 2) + ' Ω calcula ' + B + ' Ω em paralelo com (' + A + ' + ' + R3_ + ') Ω: montou a ligação errada.'],
        [A + B * R3_ / (B + R3_), 'seriePar', fmt(A + B * R3_ / (B + R3_), 2) + ' Ω põe ' + B + ' Ω em paralelo com ' + R3_ + ' Ω e soma ' + A + ' Ω: montou a ligação errada.'],
        [1 / (1 / A + 1 / B + 1 / R3_), 'seriePar', fmt(1 / (1 / A + 1 / B + 1 / R3_), 2) + ' Ω põe os três resistores em paralelo; o de ' + R3_ + ' Ω fica em série com o paralelo dos outros dois.']] };
  });
  G('pmax', 'E1', '2.5', 'Máxima transferência', 'média', function (r) {
    var Vt = pick(r, [10, 12, 20, 24, 30, 40]), R = pick(r, [2, 4, 5, 8, 10]), ans = Vt * Vt / (4 * R);
    return { v: { V: Vt, R: R }, s: 'Um circuito tem equivalente de Thévenin de ' + Vt + ' V e ' + R + ' Ω. A máxima potência que uma carga resistiva ajustável pode receber é de', unit: 'W', dec: 2, ans: ans,
      sol: 'A máxima transferência ocorre com R<sub>L</sub> = R<sub>th</sub> = ' + R + ' Ω: P<sub>máx</sub> = V<sub>th</sub>²/(4R<sub>th</sub>) = ' + Vt * Vt + '/' + 4 * R + ' = ' + fmt(ans, 2) + ' W.',
      d: [[Vt * Vt / R, 'sem4', fmt(Vt * Vt / R, 2) + ' W = V<sub>th</sub>²/R<sub>th</sub>: esqueceu o 4 da máxima transferência.'],
        [Vt * Vt / (2 * R), 'sem4', fmt(Vt * Vt / (2 * R), 2) + ' W = V<sub>th</sub>²/(2R<sub>th</sub>) é a potência total da fonte equivalente; só metade chega à carga.'],
        [Vt / (4 * R), 'semQuad', fmt(Vt / (4 * R), 2) + ' = V<sub>th</sub>/(4R<sub>th</sub>): esqueceu de elevar a tensão ao quadrado.'],
        [Vt * Vt / (8 * R), 'formula', fmt(Vt * Vt / (8 * R), 2) + ' W = (V<sub>th</sub>/2)²/(2R<sub>th</sub>): dividiu a tensão da carga ao quadrado pela resistência total (2R<sub>th</sub>), e não só pela da carga.'],
        [Vt * Vt / (16 * R), 'formula', fmt(Vt * Vt / (16 * R), 2) + ' W = I²·R com I = V<sub>th</sub>/(4R<sub>th</sub>); com R<sub>L</sub> = R<sub>th</sub>, a corrente é V<sub>th</sub>/(2R<sub>th</sub>).'],
        [Vt / (2 * R), 'outra', fmt(Vt / (2 * R), 2) + ' é a corrente na carga, em ampères (V<sub>th</sub>/(2R<sub>th</sub>)), não a potência.'],
        [2 * Vt * Vt / R, 'seriePar', fmt(2 * Vt * Vt / R, 2) + ' W = V<sub>th</sub>²/(R<sub>th</sub>/2): pôs a carga em paralelo com R<sub>th</sub>; ela fica em série.'],
        [4 * Vt * Vt / R, 'invertida', fmt(4 * Vt * Vt / R, 2) + ' W = 4·V<sub>th</sub>²/R<sub>th</sub>: multiplicou por 4 em vez de dividir.']] };
  });
  /* Análise nodal: só combinações em que E₁ sai inteiro e maior que V_A (lista fixa, sorteio entre elas). */
  var NODAL = [];
  [2, 4, 5, 10].forEach(function (R1) { [2, 4, 5, 10].forEach(function (R2v) { [2, 4, 5, 10].forEach(function (R3v) { [4, 5, 6, 8, 10, 12].forEach(function (VA) { [2, 4, 6, 8].forEach(function (E2) {
    var E1 = VA + R1 * (VA / R3v + (VA - E2) / R2v);
    if (Math.abs(E1 - Math.round(E1)) < 1e-9 && E1 > VA && E2 !== VA && E1 <= 60) NODAL.push([R1, R2v, R3v, VA, E2, Math.round(E1)]);
  }); }); }); }); });
  G('nodal', 'E1', '2.5', 'Análise nodal', 'difícil', function (r) {
    var c = pick(r, NODAL), R1 = c[0], R2v = c[1], R3v = c[2], VA = c[3], E2 = c[4], E1 = c[5], ans = VA / R3v;
    return { v: { E1: E1, R1: R1, E2: E2, R2: R2v, R3: R3v }, s: 'Uma fonte E<sub>1</sub> = ' + E1 + ' V, em série com R<sub>1</sub> = ' + R1 + ' Ω, e uma fonte E<sub>2</sub> = ' + E2 + ' V, em série com R<sub>2</sub> = ' + R2v + ' Ω, alimentam um mesmo nó A (positivos voltados para A). Do nó A para a referência há R<sub>3</sub> = ' + R3v + ' Ω. A corrente em R<sub>3</sub> é de', unit: 'A', dec: 2, ans: ans,
      sol: 'LKC em A: (V<sub>A</sub> − ' + E1 + ')/' + R1 + ' + V<sub>A</sub>/' + R3v + ' + (V<sub>A</sub> − ' + E2 + ')/' + R2v + ' = 0 → V<sub>A</sub> = ' + VA + ' V; I<sub>3</sub> = ' + VA + '/' + R3v + ' = ' + fmt(ans, 2) + ' A.',
      d: [[E1 / (R1 + R3v), 'ignorouFonte', fmt(E1 / (R1 + R3v), 2) + ' A ignora a fonte E<sub>2</sub> e o seu ramo.'],
        [(E1 - VA) / R1, 'total', fmt((E1 - VA) / R1, 2) + ' A é a corrente no ramo de E<sub>1</sub>, não em R<sub>3</sub>.'],
        [Math.abs(VA - E2) / R2v, 'total', fmt(Math.abs(VA - E2) / R2v, 2) + ' A é a corrente no ramo de E<sub>2</sub>.'],
        [E1 / R3v, 'tensaoTotal', fmt(E1 / R3v, 2) + ' A aplica a fonte E<sub>1</sub> inteira sobre R<sub>3</sub>.'],
        [VA / R1, 'divisorTroca', fmt(VA / R1, 2) + ' A divide V<sub>A</sub> por R<sub>1</sub>, não por R<sub>3</sub>.'],
        [VA, 'outra', fmt(VA, 2) + ' é a tensão do nó A, em volts, não a corrente.'],
        [(E1 + E2) / R3v, 'tensaoTotal', fmt((E1 + E2) / R3v, 2) + ' A aplica a soma das fontes sobre R<sub>3</sub>.'],
        [E1 / R1 + E2 / R2v, 'etapa', fmt(E1 / R1 + E2 / R2v, 2) + ' A é a soma das correntes de curto das fontes (E/R): parou na transformação em fontes de corrente.'],
        [VA / (R1 + R2v + R3v), 'serieTudo', fmt(VA / (R1 + R2v + R3v), 2) + ' A divide V<sub>A</sub> pela soma dos três resistores.'],
        [Math.abs(E1 - E2) / (R1 + R2v), 'formula', fmt(Math.abs(E1 - E2) / (R1 + R2v), 2) + ' A é a corrente que circularia entre as fontes se R<sub>3</sub> não existisse.'],
        [E2 / (R2v + R3v), 'ignorouFonte', fmt(E2 / (R2v + R3v), 2) + ' A ignora a fonte E<sub>1</sub> e considera só E<sub>2</sub>.'],
        [(E1 + E2) / (R1 + R2v + R3v), 'serieTudo', fmt((E1 + E2) / (R1 + R2v + R3v), 2) + ' A soma as fontes e os resistores como se o circuito fosse uma malha só.']] };
  });
  /* Ponte: só combinações em que R_x e os dois erros de lado dão valores diferentes entre si e dos resistores dados. */
  var PONTE = [];
  [100, 150, 200, 250].forEach(function (R1) { [100, 200, 300, 400].forEach(function (R2v) { [50, 100, 150, 300].forEach(function (R3v) {
    var v = [R2v * R3v / R1, R1 * R3v / R2v, R1 * R2v / R3v, R1, R2v, R3v].map(function (x) { return Math.round(x * 10); });
    if (new Set(v).size === 6) PONTE.push([R1, R2v, R3v]);
  }); }); });
  G('wheat', 'E1', '2.1', 'Ponte de Wheatstone', 'fácil', function (r) {
    var c = pick(r, PONTE), R1 = c[0], R2v = c[1], R3v = c[2], ans = R2v * R3v / R1;
    return { v: { R1: R1, R2: R2v, R3: R3v }, s: 'Numa ponte de Wheatstone em equilíbrio, R<sub>1</sub> = ' + R1 + ' Ω e R<sub>x</sub> estão em lados opostos, assim como R<sub>2</sub> = ' + R2v + ' Ω e R<sub>3</sub> = ' + R3v + ' Ω. O valor de R<sub>x</sub> é', unit: 'Ω', dec: 1, ans: ans,
      sol: 'Produtos dos lados opostos iguais: R<sub>1</sub>·R<sub>x</sub> = R<sub>2</sub>·R<sub>3</sub> → R<sub>x</sub> = ' + R2v + ' × ' + R3v + '/' + R1 + ' = ' + fmt(ans, 1) + ' Ω.',
      d: [[R1 * R3v / R2v, 'ladosPonte', fmt(R1 * R3v / R2v, 1) + ' Ω = R<sub>1</sub>·R<sub>3</sub>/R<sub>2</sub>: trocou os lados da ponte.'],
        [R1 * R2v / R3v, 'ladosPonte', fmt(R1 * R2v / R3v, 1) + ' Ω = R<sub>1</sub>·R<sub>2</sub>/R<sub>3</sub>: trocou os lados da ponte.'],
        [R2v + R3v, 'seriePar', fmt(R2v + R3v, 1) + ' Ω soma R<sub>2</sub> e R<sub>3</sub>; no equilíbrio, os produtos dos lados opostos são iguais.'],
        [R1 + R2v + R3v, 'seriePar', fmt(R1 + R2v + R3v, 1) + ' Ω soma os três resistores, como se estivessem em série.'],
        [R3v, 'ladosPonte', R3v + ' Ω supõe R<sub>x</sub> igual a R<sub>3</sub>, o que só valeria com R<sub>1</sub> = R<sub>2</sub>.'],
        [R2v, 'ladosPonte', R2v + ' Ω supõe R<sub>x</sub> igual a R<sub>2</sub>, o que só valeria com R<sub>1</sub> = R<sub>3</sub>.'],
        [R1, 'ladosPonte', R1 + ' Ω supõe que, em equilíbrio, R<sub>x</sub> é igual ao resistor oposto; o que se iguala são os produtos.']] };
  });
  /* ================= I1 · instalações e NBR 5410 ================= */
  var DIMS = [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
  G('ilum', 'I1', '8.1', 'Previsão de iluminação', 'fácil', function (r) {
    var a, b, k = 0; do { a = pick(r, DIMS); b = pick(r, DIMS); k++; } while ((a * b < 10 || ((a * b - 6) % 4) < 0.01) && k < 500);
    var A = a * b, nb = Math.floor((A - 6) / 4), ans = 100 + 60 * nb;
    return { letras: 'ABCD', v: { a: a, b: b }, s: 'Um cômodo residencial mede ' + fmt(a, 1) + ' m × ' + fmt(b, 1) + ' m. A carga mínima de iluminação prevista pela NBR 5410 é de', unit: 'VA', dec: 0, ans: ans,
      sol: 'Área = ' + fmt(A, 2) + ' m². 100 VA pelos primeiros 6 m²; restam ' + fmt(A - 6, 2) + ' m², com ' + nb + ' bloco(s) inteiro(s) de 4 m² (60 VA cada) → ' + ans + ' VA.',
      d: [[100 + 60 * Math.ceil((A - 6) / 4), 'arredCima', (100 + 60 * Math.ceil((A - 6) / 4)) + ' VA conta a fração final de 4 m² como bloco inteiro; só os blocos inteiros somam 60 VA.'],
        [Math.round(100 + 60 * (A - 6) / 4), 'arredCima', Math.round(100 + 60 * (A - 6) / 4) + ' VA distribui os 60 VA proporcionalmente à área que sobra, sem contar só blocos inteiros.'],
        [Math.round(100 * A / 6), 'regra6', Math.round(100 * A / 6) + ' VA aplica 100 VA a cada 6 m² da área inteira.'],
        [Math.round(60 * A / 4), 'regra6', Math.round(60 * A / 4) + ' VA aplica 60 VA a cada 4 m² da área inteira, sem os 100 VA dos primeiros 6 m².'],
        [60 * nb, 'regra6', (60 * nb) + ' VA conta só os blocos de 4 m² e esquece os 100 VA dos primeiros 6 m².'],
        [Math.round(60 * (A - 6) / 4), 'regra6', Math.round(60 * (A - 6) / 4) + ' VA esquece os 100 VA dos primeiros 6 m² e ainda conta a fração do último bloco.'],
        [100, 'regra6', '100 VA é só a parcela dos primeiros 6 m²; o cômodo tem ' + fmt(A, 2) + ' m².'],
        [100 + Math.round(60 * A / 4), 'regra6', (100 + Math.round(60 * A / 4)) + ' VA soma aos 100 VA os 60 VA por 4 m² da área inteira, sem descontar os primeiros 6 m².']] };
  });
  var potTug = function (k) { return 600 * Math.min(k, 3) + 100 * Math.max(k - 3, 0); };
  G('tugcoz', 'I1', '8.1', 'Tomadas em áreas molhadas', 'média', function (r) {
    var a = pick(r, [2.5, 3, 3.5, 4, 4.5]), b = pick(r, [3, 3.5, 4, 4.5, 5]), P = 2 * (a + b), n = Math.ceil(P / 3.5 - 1e-9), ans = potTug(n), ns = Math.ceil(P / 5 - 1e-9), nf = Math.floor(P / 3.5 + 1e-9);
    return { v: { a: a, b: b }, s: 'Uma cozinha mede ' + fmt(a, 1) + ' m × ' + fmt(b, 1) + ' m. A potência mínima atribuída às suas tomadas de uso geral, segundo a NBR 5410, é de', unit: 'VA', dec: 0, ans: ans,
      sol: 'Perímetro = ' + fmt(P, 1) + ' m; 1 ponto a cada 3,5 m ou fração: ' + fmt(P, 1) + '/3,5 = ' + fmt(P / 3.5, 2) + ' → ' + n + ' pontos. Potência: ' + Math.min(n, 3) + ' × 600' + (n > 3 ? ' + ' + (n - 3) + ' × 100' : '') + ' = ' + fmt(ans, 0) + ' VA.',
      d: [[600 * n, 'seiscentos', fmt(600 * n, 0) + ' VA dá 600 VA a todos os ' + n + ' pontos; só os três primeiros têm 600 VA, e os demais, 100 VA.'],
        [100 * n, 'comoSala', fmt(100 * n, 0) + ' VA dá 100 VA a cada ponto, como numa sala; na cozinha os três primeiros têm 600 VA.'],
        [potTug(ns), 'comoSala', fmt(potTug(ns), 0) + ' VA conta os pontos pelo critério de sala (1 a cada 5 m: ' + ns + ' pontos); na cozinha é 1 a cada 3,5 m.'],
        [potTug(nf), 'arredBaixo', fmt(potTug(nf), 0) + ' VA arredonda o número de pontos para baixo (' + nf + '); a fração de 3,5 m conta como mais um ponto.'],
        [1800, 'semFator', '1.800 VA conta só os três pontos de 600 VA e esquece os ' + Math.max(n - 3, 0) + ' excedentes de 100 VA.'],
        [potTug(n + 1), 'pontosTug', fmt(potTug(n + 1), 0) + ' VA conta ' + (n + 1) + ' pontos: arredondou ' + fmt(P / 3.5, 2) + ' para cima e ainda somou um.'],
        [600 + 100 * (n - 1), 'semFator', fmt(600 + 100 * (n - 1), 0) + ' VA dá 600 VA só ao primeiro ponto; na cozinha são até três pontos de 600 VA.'],
        [1800 + 100 * n, 'formula', fmt(1800 + 100 * n, 0) + ' VA soma 100 VA a todos os ' + n + ' pontos depois de já ter dado 600 VA aos três primeiros: contou esses três duas vezes.'],
        [Math.round(600 * P / 3.5), 'seiscentos', fmt(Math.round(600 * P / 3.5), 0) + ' VA multiplica o número fracionário de pontos (' + fmt(P / 3.5, 2) + ') por 600 VA, sem arredondar e sem a regra dos três primeiros.']] };
  });
  G('tugsala', 'I1', '8.1', 'Quantidade de tomadas', 'média', function (r) {
    var a, b, P, k = 0; do { a = pick(r, [3, 3.5, 4, 4.5, 5, 5.5, 6]); b = pick(r, [3, 3.5, 4, 4.5, 5]); P = 2 * (a + b); k++; } while (Math.abs(P / 5 - Math.round(P / 5)) < 1e-9 && k < 500);
    var n = Math.ceil(P / 5), par = function (x, va) { return x + ' pontos e ' + fmt(va, 0) + ' VA'; }, nc = Math.ceil(P / 3.5), na = Math.ceil(a * b / 5);
    var pool = [[par(n - 1, 100 * (n - 1)), 'arredBaixo', 'Arredondou ' + fmt(P / 5, 2) + ' para baixo; a fração de 5 m conta como mais um ponto: ' + n + ' pontos.'],
      [par(n, 600 * n), 'seiscentos', 'O número de pontos está certo, mas 600 VA por ponto é a regra de cozinhas e áreas de serviço; na sala, cada ponto de TUG tem 100 VA.'],
      [par(nc, potTug(nc)), 'comoSala', 'Usou as regras de cozinha (1 ponto a cada 3,5 m e 600 VA nos três primeiros), que não valem para salas.'],
      [par(nc, 100 * nc), 'comoSala', 'Contou os pontos pelo critério de cozinha (1 a cada 3,5 m: ' + nc + ' pontos); na sala é 1 a cada 5 m.'],
      [par(na, 100 * na), 'areaPerim', 'Dividiu a área (' + fmt(a * b, 2) + ' m²) por 5; o critério é o perímetro (' + fmt(P, 1) + ' m).'],
      [par(n + 1, 100 * (n + 1)), 'pontosTug', 'Arredondou ' + fmt(P / 5, 2) + ' para cima e ainda somou um ponto.']];
    return { v: { a: a, b: b }, s: 'Uma sala de estar mede ' + fmt(a, 1) + ' m × ' + fmt(b, 1) + ' m. Segundo a NBR 5410, o número mínimo de pontos de tomada de uso geral e a potência mínima atribuída a eles são, respectivamente,', text: true, corr: par(n, 100 * n), pool: pool,
      sol: 'Perímetro = ' + fmt(P, 1) + ' m; em salas e dormitórios, 1 ponto a cada 5 m ou fração: ' + fmt(P, 1) + '/5 = ' + fmt(P / 5, 2) + ' → ' + n + ' pontos, com 100 VA cada: ' + fmt(100 * n, 0) + ' VA.' };
  });
  G('queda', 'I1', '8.1', 'Queda de tensão', 'média', function (r) {
    var Vn = pick(r, [127, 220]), I = pick(r, [10, 16, 20, 25]), S = Vn * I, du = pick(r, [8, 10, 12, 15, 20]), lim = pick(r, [2, 3, 4]), dv = lim * Vn / 100, L = dv / (du * I) * 1000, Vo = Vn === 127 ? 220 : 127;
    return { v: { S: S, V: Vn, du: du, lim: lim }, s: 'Um equipamento de ' + fmt(S, 0) + ' VA em ' + Vn + ' V é alimentado por um circuito com queda de tensão unitária de ' + du + ' V/(A·km). Para que a queda não passe de ' + lim + '%, o comprimento máximo do circuito é de, aproximadamente,', unit: 'm', dec: 1, ans: L,
      sol: 'I = ' + fmt(S, 0) + '/' + Vn + ' = ' + I + ' A; ΔV<sub>máx</sub> = ' + lim + '% × ' + Vn + ' = ' + fmt(dv, 2) + ' V; L = ' + fmt(dv, 2) + '/(' + du + ' × ' + I + ') km = ' + fmt(L, 1) + ' m.',
      d: [[L / 2, 'idaVolta', fmt(L / 2, 1) + ' m divide ainda por 2 para ida e volta; a queda unitária em V/(A·km) já considera os dois condutores.'],
        [lim / (du * I) * 1000, 'percVolt', fmt(lim / (du * I) * 1000, 1) + ' m usa ' + lim + ' V como queda máxima: tratou o percentual como volts.'],
        [(lim * Vo / 100) / (du * I) * 1000, 'outraTensao', fmt((lim * Vo / 100) / (du * I) * 1000, 1) + ' m calcula o percentual sobre ' + Vo + ' V; o equipamento é de ' + Vn + ' V.'],
        [dv / du * 1000, 'semFator', fmt(dv / du * 1000, 1) + ' m esqueceu de multiplicar a queda unitária pela corrente de ' + I + ' A.'],
        [L / 1000, 'unidade', fmt(L / 1000, 1) + ' é o resultado em quilômetros; em metros, multiplica-se por 1.000.'],
        [dv * du * I, 'invertida', fmt(dv * du * I, 1) + ' = ΔV × ΔV<sub>u</sub> × I: multiplicou em vez de dividir.'],
        [Vn / (du * I) * 1000, 'percVolt', fmt(Vn / (du * I) * 1000, 1) + ' m usa a tensão inteira (' + Vn + ' V) como queda admissível, sem aplicar os ' + lim + '%.']] };
  });
  G('disj', 'I1', '5.6', 'Coordenação da proteção', 'fácil', function (r) {
    var p = pick(r, [[18, 24, 20], [23, 26, 25], [26, 32, 32], [30, 41, 40], [21, 28, 25], [35, 41, 40], [45, 57, 50], [55, 76, 63], [64, 89, 80]]), IB = p[0], Iz = p[1], ok = p[2];
    /* Série usual de correntes nominais de minidisjuntores (IEC 60898): 2 a 125 A. */
    var std = [2, 4, 6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125].filter(function (v) { return v !== ok; });
    /* Só valores plausíveis: entre I_B/2 e 2·I_z (nada de 2 A ou 125 A num circuito de 25 A). */
    var below = std.filter(function (v) { return v < IB && v >= IB / 2; }), above = std.filter(function (v) { return v > Iz && v <= 2 * Iz; });
    var pool = below.map(function (v) { return [v + ' A', 'abaixoIB', v + ' A é menor que a corrente de projeto (' + num(IB) + ' A): o disjuntor desarmaria em serviço normal.']; })
      .concat(above.map(function (v) { return [v + ' A', 'acimaIz', v + ' A é maior que a capacidade do condutor (' + num(Iz) + ' A): o cabo ficaria sem proteção.']; }));
    return { letras: 'BCD', v: { IB: IB, Iz: Iz }, s: 'Um circuito tem corrente de projeto de ' + num(IB) + ' A, e seus condutores têm capacidade de condução de ' + num(Iz) + ' A nas condições de instalação. Dentre as opções, a única corrente nominal de disjuntor que atende à coordenação I<sub>B</sub> ≤ I<sub>n</sub> ≤ I<sub>z</sub> é', text: true, corr: ok + ' A', pool: pool, sortNum: true,
      sol: num(IB) + ' ≤ I<sub>n</sub> ≤ ' + num(Iz) + ' → ' + ok + ' A: não desarma com a carga normal e protege o condutor.' };
  });
  G('neutro', 'I1', '8.1', 'Rompimento do neutro', 'difícil', function (r) {
    var p1, p2, k = 0; do { p1 = pick(r, [60, 100, 200, 500]); p2 = pick(r, [1000, 1500, 2000, 3000]); k++; } while (p2 <= p1 && k < 100);
    var vs = 220 * p2 / (p1 + p2), vl = 220 * p1 / (p1 + p2);
    return { letras: 'BCDE', v: { p1: p1, p2: p2 }, s: 'Numa rede 220/127 V, uma carga resistiva de ' + p1 + ' W/127 V está entre L1 e o neutro, e outra de ' + fmt(p2, 0) + ' W/127 V entre L2 e o neutro. Se o neutro se rompe, a tensão na carga de ' + p1 + ' W passa a ser de, aproximadamente,', unit: 'V', dec: 0, ans: vs,
      sol: 'Com R = V²/P, as duas cargas ficam em série sob 220 V. V<sub>' + p1 + ' W</sub> = 220 × P<sub>' + p2 + '</sub>/(P<sub>' + p1 + '</sub> + P<sub>' + p2 + '</sub>) = 220 × ' + p2 + '/' + (p1 + p2) + ' ≈ ' + fmt(vs, 0) + ' V. A carga menor recebe sobretensão.',
      d: [[127, 'neutroNada', '127 V supõe que o rompimento do neutro não muda nada.'],
        [110, 'divIgual', '110 V divide os 220 V igualmente, o que só vale para cargas iguais.'],
        [vl, 'cargaErrada', fmt(vl, 0) + ' V é a tensão na carga de ' + fmt(p2, 0) + ' W, a de menor resistência.'],
        [220 * p1 / p2, 'formula', fmt(220 * p1 / p2, 0) + ' V = 220 × P<sub>' + p1 + '</sub>/P<sub>' + p2 + '</sub>: montou a razão das potências invertida e sem a soma no denominador.'],
        [220, 'tensaoTotal', '220 V supõe que a carga menor fica com toda a tensão; a outra continua em série com ela.'],
        [254, 'somaArit', '254 V = 2 × 127: somou as duas tensões de fase; com o neutro rompido, as cargas ficam em série sob 220 V.'],
        [380, 'outraTensao', '380 V é a tensão de linha de uma rede 380/220 V; a rede aqui é 220/127 V.']] };
  });
  G('pe', 'I1', '8.3', 'Condutor de proteção', 'média', function (r) {
    var STD = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150];
    var S = pick(r, [10, 16, 25, 35, 50, 70]), ans = S <= 16 ? S : (S <= 35 ? 16 : S / 2), mm = function (v) { return num(v) + ' mm²'; };
    var pool = [], usados = {}; usados[ans] = 1;
    var add = function (v, e, t) { if (!usados[v] && pool.length < 10) { usados[v] = 1; pool.push([mm(v), e, t]); } };
    add(S, 'peTab', mm(S) + ' (igual à fase) só vale para fases de até 16 mm².');
    add(16, 'peTab', '16 mm² é a regra da faixa de 16 mm² a 35 mm²; a fase aqui é de ' + mm(S) + '.');
    if (STD.indexOf(S / 2) >= 0) add(S / 2, 'peTab', mm(S / 2) + ' (metade da fase) só vale para fases acima de 35 mm².');
    var i = STD.indexOf(ans);
    /* Nenhuma opção maior que a própria fase: um PE mais grosso que a fase não é engano plausível. */
    shuffle(r, [STD[i - 1], STD[i + 1], STD[i + 2], STD[i - 2], STD[i + 3], STD[i - 3], STD[i + 4], STD[i - 4]]).forEach(function (v) {
      if (v == null || v > S) return;
      add(v, 'peTab', v < ans ? mm(v) + ' fica abaixo do mínimo da tabela para fase de ' + mm(S) + '.' : mm(v) + ' atende, mas não é a seção mínima pedida: pela tabela, para fase de ' + mm(S) + ', basta ' + mm(ans) + '.');
    });
    return { letras: 'CDE', v: { S: S }, s: 'Os condutores de fase de um circuito têm seção de ' + mm(S) + '. A seção mínima do condutor de proteção, do mesmo material, é de', text: true, corr: mm(ans), pool: pool, sortNum: true,
      sol: 'Até 16 mm²: igual à fase; de 16 mm² a 35 mm²: 16 mm²; acima de 35 mm²: metade da fase. Para ' + mm(S) + ' → ' + mm(ans) + '.' };
  });

  /* ---------- montagem ---------- */
  function montar(gid, seed) {
    var g = GEN[gid]; if (!g) return null;
    var r = RNG(seed), q = g.make(r), opts = q.text ? txtOpts(r, q) : numOpts(r, q);
    var alts = [], ex = {}, traps = {}, erros = {}, ans = null;
    opts.slice(0, 5).forEach(function (o, i) {
      var k = LET[i]; alts.push(o.t); ex[k] = o.ex;
      if (o.ok) ans = k; else { erros[k] = o.erro; var E = erroDe(o.erro); if (E && E.t) traps[k] = E.t; }
    });
    return { id: 'G2:' + gid + ':' + seed, vol: 'EL', mod: g.mod, n: g.mod + ' · números novos', kind: 'gerada', tag: g.tag, base: [], src: '', cmd: q.s,
      alts: alts, ans: ans, ex: ex, traps: traps, erros: erros, hab: g.hab, dif: g.dif, gen: gid, vars: q.v };
  }
  W.GERADOR = {
    lista: function () { return ORDEM.map(function (id) { var g = GEN[id]; return { id: id, mod: g.mod, hab: g.hab, tag: g.tag }; }); },
    daEstacao: function (mod) { return ORDEM.filter(function (id) { return GEN[id].mod === mod; }); },
    gerar: function (gid, seed) { return montar(gid, seed == null ? Math.floor(Math.random() * 2147483647) : seed); },
    porId: function (id) { var m = /^G2:(\w+):(\d+)$/.exec(id || ''); return m && GEN[m[1]] ? montar(m[1], +m[2]) : null; }
  };
})(window);

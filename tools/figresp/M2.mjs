/* Figuras de resposta da estação M2 (eletromagnetismo e transformadores). Chave = id da questão. */
import { ladder, Canvas, xfmr, R, L, V, AC, I, Z, amp, volt, wat, swc } from './lib.mjs';

/* ensaio de transformador: fonte, instrumentos em série no primário e secundário aberto, em curto ou com instrumento */
function ensaio({ fonte, serie = [], sec, notas = [], aria, sx = 0 }) {
  const c = new Canvas(), Y0 = 0, Y1 = 130, X0 = 70;
  c.wire([[X0, Y0], [X0, 38]]); c.wire([[X0, 94], [X0, Y1]]); c.sym(fonte, X0, 66, 90); c.label(fonte, X0, 66, true, 'l'); c.dot(X0, Y0); c.dot(X0, Y1);
  let x = X0;
  serie.forEach(e => { const cx = x + 70; c.wire([[x, Y0], [cx - 28, Y0]]); c.sym(e, cx, Y0, 0); c.label(e, cx, Y0, false); x = cx + 28; });
  const t = xfmr(c, x + 100, Y0, Y1, { p: '', s: '' });
  c.wire([[x, Y0], [t.px, Y0]]); c.wire([[X0, Y1], [t.px, Y1]]);
  const xr = t.sx + 80;
  if (sec === 'aberto') { c.wire([[t.sx, Y0], [xr, Y0]]); c.wire([[t.sx, Y1], [xr, Y1]]); c.open(xr, Y0); c.open(xr, Y1); c.text(xr + 12, 70, 'aberto', 's-ts', 'start'); }
  else if (sec === 'curto') { c.wire([[t.sx, Y0], [xr, Y0], [xr, Y1], [t.sx, Y1]]); c.dot(xr, Y0); c.dot(xr, Y1); c.text(xr + 12, 70, 'em curto', 's-ts', 'start'); }
  c.text(t.px - 20, -24, 'primário', 's-tm', 'end'); c.text(t.sx + 20, -24, 'secundário', 's-tm', 'start');
  notas.forEach((n, k) => c.text(X0 - 40, Y1 + 36 + 18 * k, n, 's-tm', 'start'));
  return c.svg(aria);
}

export default {
  /* M2.27: teste de polaridade */
  'BQ-a-T2-b5-5': (() => {
    const c = new Canvas(), Y0 = 0, Y1 = 130, X0 = 70;
    c.wire([[X0, Y0], [X0, 38]]); c.wire([[X0, 94], [X0, Y1]]); c.sym(AC('', '220 V'), X0, 66, 90); c.label(AC('', '220 V'), X0, 66, true, 'l'); c.dot(X0, Y0); c.dot(X0, Y1);
    const t = xfmr(c, 250, Y0, Y1);
    c.wire([[X0, Y0], [t.px, Y0]]); c.wire([[X0, Y1], [t.px, Y1]]);
    c.wire([[t.px, Y0], [t.sx, Y0]]); c.dot(t.px, Y0); c.dot(t.sx, Y0); /* jumper H1–X1 */
    c.wire([[t.sx, Y1], [t.sx + 40, Y1]]); c.sym(volt('', ''), t.sx + 68, Y1, 0); /* voltímetro H2–X2 (por baixo) */
    c.wire([[t.sx + 96, Y1], [t.sx + 130, Y1], [t.sx + 130, Y1 + 50], [t.px - 0, Y1 + 50], [t.px, Y1]]); c.dot(t.px, Y1);
    c.text(t.px - 8, Y0 - 12, 'H1', 's-ts', 'end'); c.text(t.px - 8, Y1 + 18, 'H2', 's-ts', 'end'); c.text(t.sx + 8, Y0 - 12, 'X1', 's-ts', 'start'); c.text(t.sx + 8, Y1 + 18, 'X2', 's-ts', 'start');
    c.text((t.px + t.sx) / 2, Y0 - 30, 'jumper H1–X1', 's-tm');
    c.text(t.sx + 68, Y1 - 26, 'lê 165 V', 's-fb');
    c.text(X0 - 40, Y1 + 84, 'transformador 440/110 V: a = 4 → baixa tensão = 220/4 = 55 V', 's-tm', 'start');
    c.text(X0 - 40, Y1 + 104, '220 − 55 = 165 V (subtrativa); se fosse aditiva leria 220 + 55 = 275 V', 's-tm', 'start');
    return c.svg('Teste de polaridade de transformador de 440 para 110 volts: H1 ligado ao terminal adjacente de baixa tensão, 220 volts no primário e voltímetro de 165 volts entre H2 e X2: polaridade subtrativa');
  })(),
  /* M2.28: ensaio a vazio */
  'BQ-a-T2-b6-0': ensaio({ fonte: AC('', 'V nominal'), serie: [wat('W', '', { n: ['perdas no ferro'] })], sec: 'aberto', notas: ['a vazio: I pequena (só a de excitação) → perdas no cobre desprezíveis', 'tensão nominal → fluxo nominal → o wattímetro mede as perdas no ferro'],
    aria: 'Ensaio a vazio de transformador: tensão nominal no primário, secundário aberto, wattímetro indica as perdas no ferro' }),
  /* M2.29: ensaio de curto-circuito */
  'BQ-a-T2-b6-1': ensaio({ fonte: AC('', 'V reduzida'), serie: [amp('A', '', { n: ['I nominal'] }), wat('W', '', { n: ['perdas no cobre'] })], sec: 'curto', notas: ['curto no secundário: poucos % da tensão nominal já dão a corrente nominal', 'fluxo baixo → perdas no ferro desprezíveis → W = perdas no cobre'],
    aria: 'Ensaio de curto-circuito de transformador: tensão reduzida até a corrente nominal, secundário em curto, wattímetro indica as perdas no cobre' }),
  /* M2.38 */
  'BQ-a-T2-b7-4': ladder({ aria: 'Troca do amperímetro no secundário de um TC energizado: curto-circuitar o secundário antes de desconectar o instrumento', src: I('TC', '', { i: '5 A', n: ['primário energizado'] }),
    items: [{ s: amp('A', '', { n: ['instrumento a retirar'] }) }, { p: [swc('curto', '', { n: ['fechado ANTES', 'de desconectar'] })] }], note: 'secundário aberto com primário energizado: saturação e tensão perigosa' }),
  /* M2.39 */
  'BQ-a-T2-b7-5': ladder({ aria: 'Transformador de corrente 200 para 5 com amperímetro indicando 3,5 ampères: 140 ampères no primário', src: I('TC 200-5', '', { i: '3,5 A', n: ['secundário', 'primário: 140 A'] }),
    items: [{ s: amp('A', '', { n: ['3,5 A'] }) }], note: 'RTC = 200/5 = 40 → I₁ = 40·3,5 = 140 A' }),
  /* M2.60: autotransformador */
  'BQ-e-M2-y9': (() => {
    const c = new Canvas(), X0 = 70, XC = 220, XR = 480, YB = 250, YT = 0, YTAP = 110;
    c.wire([[X0, YT], [X0, 98]]); c.wire([[X0, 154], [X0, YB]]); c.sym(AC('', '600 V'), X0, 126, 90); c.label(AC('', '600 V', { i: '20 A' }), X0, 126, true, 'l'); c.dot(X0, YT); c.dot(X0, YB);
    c.wire([[X0, YT], [XC, YT]]); c.wire([[X0, YB], [XC, YB]]);
    c.wire([[XC, YT], [XC, 25]]); c.sym({ t: 'L' }, XC, 53, 90); c.wire([[XC, 81], [XC, YTAP]]);
    c.wire([[XC, YTAP], [XC, 139]]); c.sym({ t: 'L' }, XC, 177, 90); c.wire([[XC, 205], [XC, YB]]);
    c.dot(XC, YTAP); c.dot(XC, YB);
    c.wire([[XC, YTAP], [XR, YTAP]]); c.wire([[XR, YTAP], [XR, 137]]); c.sym(Z('', ''), XR, 165, 90); c.wire([[XR, 193], [XR, YB]]); c.wire([[XC, YB], [XR, YB]]); c.dot(XR, YB);
    c.text(XC + 20, 56, 'série: I₁ = 20 A', 's-fa', 'start'); c.text(XC + 20, 180, 'comum: 30 − 20 = 10 A', 's-fb', 'start');
    c.text(XC + 40, YTAP - 10, 'I₂ = 30 A', 's-fa', 'start');
    c.text(XR + 22, 168, 'carga 12 kVA', 's-ts', 'start'); c.text(XR + 22, 186, '400 V', 's-tm', 'start');
    c.arrow(X0, 78, -90, 's-f-pa');
    c.text(X0 - 40, YB + 36, 'I₂ = 12.000/400 = 30 A · I₁ = 12.000/600 = 20 A', 's-tm', 'start');
    return c.svg('Autotransformador abaixador de 600 para 400 volts com carga de 12 quilovolt-ampères: 20 ampères no trecho em série e 10 ampères no trecho comum');
  })(),
  /* M2.61: ensaio de curto-circuito com números */
  'BQ-e-M2-y10': ensaio({ fonte: AC('', '100 V'), serie: [amp('A', '', { n: ['10 A'] }), wat('W', '', { n: ['600 W'] })], sec: 'curto', notas: ['Z = 100/10 = 10 Ω · R = 600/10² = 6 Ω · X = √(10² − 6²) = 8 Ω (lado de alta)', 'a = 10 → R₂ = 0,06 Ω · X₂ = 0,08 Ω (referidos ao secundário)'],
    aria: 'Ensaio de curto-circuito de transformador de 22 quilovolt-ampères pelo lado de alta: 100 volts, 10 ampères e 600 watts; resistência de 6 ohms e reatância de 8 ohms' }),
};

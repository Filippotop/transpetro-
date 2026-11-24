/* Figuras de resposta da estação A1 (eletrônica analógica e digital). Chave = id da questão. */
import { ladder, rectBridge, Canvas, opamp, npn, R, C, L, V, AC, D, ZD, LED, Z, sw } from './lib.mjs';

/* transistor NPN com carga no coletor e resistor de base */
function bjt({ vcc, carga, rb = null, sinal = null, ib = '', notas = [], aria }) {
  const c = new Canvas(), YT = 0, YB = 220, X0 = 70, cx = 270;
  c.wire([[X0, YT], [X0, 94]]); c.wire([[X0, 150], [X0, YB]]); c.sym(V('', vcc), X0, 122, 90); c.label(V('', vcc), X0, 122, true, 'l'); c.dot(X0, YT); c.dot(X0, YB);
  const t = npn(c, cx, 150);
  c.wire([[X0, YT], [t.c[0], YT]]); c.wire([[t.c[0], YT], [t.c[0], 30]]); c.sym(carga, t.c[0], 62, 90); c.label(carga, t.c[0], 62, true, 'r'); c.wire([[t.c[0], 90], [t.c[0], t.c[1]]]);
  c.wire([[t.e[0], t.e[1]], [t.e[0], YB]]); c.wire([[X0, YB], [t.e[0], YB]]); c.dot(t.e[0], YB);
  if (rb) { c.wire([[130, t.b[1]], [t.b[0] - 58, t.b[1]]]); c.sym(rb, t.b[0] - 30, t.b[1], 0); c.wire([[t.b[0] - 2, t.b[1]], [t.b[0], t.b[1]]]); c.label(rb, t.b[0] - 30, t.b[1], false); }
  else c.wire([[130, t.b[1]], [t.b[0], t.b[1]]]);
  if (sinal) { c.open(130, t.b[1]); c.text(120, t.b[1] + 4, sinal, 's-ts', 'end'); }
  if (ib) c.text(t.b[0] - 40, t.b[1] + 58, ib, 's-fa');
  notas.forEach((n, k) => c.text(X0 - 40, YB + 36 + 18 * k, n, 's-tm', 'start'));
  return c.svg(aria);
}

/* amplificador operacional: kind = 'inv' | 'non' | 'dif' */
function opa({ kind, r1, rf, r2 = null, r3 = null, vin, vin2 = null, vout, notas = [], aria }) {
  const c = new Canvas(), cx = 300, cy = 90, p = opamp(c, cx, cy), X0 = 20;
  const lab = (t, x, y, a = 'start') => c.text(x, y, t, 's-fb', a);
  /* saída e realimentação */
  c.wire([[p.out[0], p.out[1]], [p.out[0] + 70, p.out[1]]]); c.open(p.out[0] + 70, p.out[1]); lab(vout, p.out[0] + 82, p.out[1] + 4);
  c.dot(p.out[0] + 36, p.out[1]);
  const fx = p.inv[0] - 36;
  c.wire([[p.out[0] + 36, p.out[1]], [p.out[0] + 36, -40], [fx + 36, -40]]); c.sym(rf, (fx + 36 + p.out[0] + 36) / 2, -40, 0); c.label(rf, (fx + 36 + p.out[0] + 36) / 2, -40, false);
  c.wire([[fx + 36, -40], [fx, -40], [fx, p.inv[1]]]);
  c.wire([[fx, p.inv[1]], [p.inv[0], p.inv[1]]]); c.dot(fx, p.inv[1]);
  if (kind === 'inv') {
    c.wire([[X0 + 40, p.inv[1]], [fx - 0, p.inv[1]]].map(q => q)); c.sym(r1, X0 + 100, p.inv[1], 0); c.label(r1, X0 + 100, p.inv[1], false);
    c.wire([[X0 + 40, p.inv[1]], [X0 + 72, p.inv[1]]]); c.open(X0 + 40, p.inv[1]); lab(vin, X0 + 34, p.inv[1] + 4, 'end');
    c.wire([[p.non[0], p.non[1]], [p.non[0] - 30, p.non[1]], [p.non[0] - 30, p.non[1] + 14]]); c.ground(p.non[0] - 30, p.non[1] + 14);
  } else if (kind === 'non') {
    c.wire([[fx, p.inv[1]], [fx, p.inv[1] + 40]]); c.sym(r1, fx, p.inv[1] + 68, 90); c.label(r1, fx, p.inv[1] + 68, true, 'l'); c.wire([[fx, p.inv[1] + 96], [fx, p.inv[1] + 106]]); c.ground(fx, p.inv[1] + 106);
    c.wire([[X0 + 40, p.non[1]], [p.non[0], p.non[1]]]); c.open(X0 + 40, p.non[1]); lab(vin, X0 + 34, p.non[1] + 4, 'end');
  } else {
    /* diferencial: V1 -R1-> inv ; V2 -R2-> non ; R3 do não inversor ao terra */
    c.wire([[X0 + 40, p.inv[1]], [X0 + 72, p.inv[1]]]); c.open(X0 + 40, p.inv[1]); lab(vin, X0 + 34, p.inv[1] + 4, 'end'); c.sym(r1, X0 + 100, p.inv[1], 0); c.label(r1, X0 + 100, p.inv[1], false);
    c.wire([[X0 + 128, p.inv[1]], [fx, p.inv[1]]]);
    c.wire([[X0 + 40, p.non[1] + 8], [X0 + 72, p.non[1] + 8], [X0 + 72, p.non[1]]].slice(0, 0));
    c.wire([[X0 + 40, p.non[1]], [X0 + 72, p.non[1]]]); c.open(X0 + 40, p.non[1]); lab(vin2, X0 + 34, p.non[1] + 4, 'end'); c.sym(r2, X0 + 100, p.non[1], 0); c.label({ ...r2, n: [] }, X0 + 100, p.non[1], false);
    c.wire([[X0 + 128, p.non[1]], [p.non[0], p.non[1]]]); c.dot(fx, p.non[1]);
    c.wire([[fx, p.non[1]], [fx, p.non[1] + 24]]); c.sym(r3, fx, p.non[1] + 52, 90); c.label(r3, fx, p.non[1] + 52, true, 'l'); c.wire([[fx, p.non[1] + 80], [fx, p.non[1] + 90]]); c.ground(fx, p.non[1] + 90);
  }
  notas.forEach((n, k) => c.text(X0, cy + 140 + 18 * k, n, 's-tm', 'start'));
  return c.svg(aria);
}

export default {
  /* A1.1 */
  'BQ-e-A1-b1-0': rectBridge({ phases: 1, src: AC('secundário', ''), loads: [R('carga', '')], notes: ['onda completa: os dois semiciclos são aproveitados → 2·60 = 120 Hz'], aria: 'Ponte retificadora a diodos alimentada por transformador em 60 hertz: ondulação de 120 hertz' }),
  /* A1.2 */
  'BQ-e-A1-b1-1': rectBridge({ phases: 1, src: AC('secundário', '24 V ef.'), loads: [R('carga', '', { u: 'Vp ≈ 32,5 V' })], notes: ['Vp = 24·√2 − 2·0,7 = 33,94 − 1,4 ≈ 32,5 V (dois diodos em série no caminho)'], aria: 'Ponte retificadora com secundário de 24 volts eficazes e diodos de silício: pico de 32,5 volts na carga' }),
  /* A1.3 */
  'BQ-e-A1-b1-2': rectBridge({ phases: 1, src: AC('', '60 Hz'), loads: [C('C', '1.000 µF'), R('carga', '', { i: '0,2 A' })], notes: ['ponte: fr = 120 Hz → Vr = I/(fr·C) = 0,2/(120·0,001) ≈ 1,67 V'], aria: 'Ponte retificadora com capacitor de 1.000 microfarads e carga de 0,2 ampère: ondulação de 1,67 volt' }),
  /* A1.4: diodo de roda livre */
  'BQ-e-A1-b1-3': (() => {
    const c = new Canvas(), YT = 0, YB = 220, X0 = 70;
    c.wire([[X0, YT], [X0, 94]]); c.wire([[X0, 150], [X0, YB]]); c.sym(V('', '24 V'), X0, 122, 90); c.label(V('', '24 V'), X0, 122, true, 'l'); c.dot(X0, YT); c.dot(X0, YB);
    const t = npn(c, 246, 150);
    c.wire([[X0, YT], [340, YT]]); c.wire([[260, YT], [260, 38]]); c.sym(L('bobina', 'do relé'), 260, 66, 90); c.label({ l: 'bobina do relé' }, 260, 66, true, 'l'); c.wire([[260, 94], [260, 110]]);
    c.wire([[260, 110], [t.c[0], t.c[1]]].slice(0, 1)); c.wire([[260, 110], [260, t.c[1]]]);
    c.wire([[340, YT], [340, 38]]); c.sym({ t: 'D' }, 340, 66, -90); c.wire([[340, 94], [340, 110]]); c.wire([[340, 110], [260, 110]]); c.dot(260, 110); c.dot(340, YT);
    c.text(356, 70, 'diodo de roda livre', 's-ts', 'start'); c.text(356, 88, 'catodo no +', 's-tm', 'start');
    c.wire([[t.e[0], t.e[1]], [t.e[0], YB]]); c.wire([[X0, YB], [t.e[0], YB]]); c.dot(t.e[0], YB);
    c.wire([[180, t.b[1]], [t.b[0], t.b[1]]]); c.open(180, t.b[1]); c.text(170, t.b[1] + 4, 'comando', 's-ts', 'end');
    c.text(X0 - 40, YB + 36, 'transistor desliga: a corrente da bobina circula pelo diodo e o pico de tensão fica limitado', 's-tm', 'start');
    return c.svg('Relé de 24 volts comandado por transistor com diodo em paralelo com a bobina, catodo no positivo: diodo de roda livre');
  })(),
  /* A1.6 */
  'BQ-e-A1-b2-1': ladder({ aria: 'Regulador Zener de 9,1 volts com fonte de 15 volts, resistor de 180 ohms e carga de 910 ohms: 32,8 miliampères no resistor, 10 na carga e 22,8 no Zener', src: V('', '15 V', { i: '32,8 mA' }),
    items: [{ s: R('R', '180 Ω', { u: '5,9 V' }) }, { p: [ZD('Zener', '9,1 V', { i: '22,8 mA', rev: true })] }, { p: [R('carga', '910 Ω', { i: '10 mA', u: '9,1 V' })] }], note: 'IS = (15 − 9,1)/180 = 32,8 mA · IL = 9,1/910 = 10 mA · IZ = IS − IL = 22,8 mA' }),
  /* A1.7 */
  'BQ-e-A1-b2-2': ladder({ aria: 'LED de 2 volts com 10 miliampères em fonte de 24 volts: resistor limitador de 2.200 ohms', src: V('', '24 V', { i: '10 mA' }),
    items: [{ s: R('R', '2.200 Ω', { u: '22 V' }) }, { w: LED('LED', '2,0 V', { u: '2 V' }) }], note: 'R = (24 − 2,0)/0,010 = 2.200 Ω' }),
  /* A1.8 */
  'BQ-e-A1-b2-3': ladder({ aria: 'Regulador Zener com a carga desconectada: toda a corrente do resistor passa pelo Zener, que dissipa o máximo', src: V('', 'Vin'),
    items: [{ s: R('R', '', { n: ['IS'] }) }, { p: [ZD('Zener', '', { i: 'IS (máxima)', rev: true, n: ['dissipação máxima'] })] }, { p: [sw('carga', '', { n: ['desconectada', 'IL = 0'] })] }], note: 'sem carga: IZ = IS − 0 = IS' }),
  /* A1.10 */
  'BQ-e-A1-b3-1': bjt({ vcc: '15 V', carga: R('RC', '1,5 kΩ', { i: '4 mA', u: '6 V' }), ib: 'IB = 40 µA', notas: ['IC = β·IB = 100·40 µA = 4 mA · VRC = 4 mA·1,5 kΩ = 6 V', 'VCE = 15 − 6 = 9,0 V (região ativa)'], aria: 'Transistor com beta 100, 15 volts e resistor de coletor de 1,5 quilo-ohms com 40 microampères de base: 4 miliampères de coletor e VCE de 9 volts' }),
  /* A1.11 */
  'BQ-e-A1-b3-2': bjt({ vcc: '12 V', carga: R('carga', '200 Ω', { i: '60 mA', u: '12 V' }), rb: R('RB', '717 Ω'), sinal: '5 V', ib: 'IB = 6 mA', notas: ['IC = 12/200 = 60 mA · IB = IC/10 = 6 mA', 'RB = (5 − 0,7)/6 mA ≈ 717 Ω'], aria: 'Transistor como chave: sinal de 5 volts, resistor de base de 717 ohms, carga de 12 volts e 200 ohms com 60 miliampères' }),
  /* A1.36 */
  'BQ-e-A1-y2': bjt({ vcc: '12 V', carga: R('relé', '240 Ω', { i: '50 mA', u: '12 V' }), rb: R('RB', '2.500 Ω'), sinal: '5,7 V', ib: 'IB = 2 mA', notas: ['IC = 12/240 = 50 mA · IB mín. = 50/50 = 1 mA → dobro: 2 mA', 'RB = (5,7 − 0,7)/2 mA = 2.500 Ω'], aria: 'Transistor com beta 50 comandando relé de 12 volts e 240 ohms: base de 2 miliampères e resistor de base de 2.500 ohms' }),
  /* A1.13 */
  'BQ-e-A1-b4-0': opa({ kind: 'inv', r1: R('Ri', '4 kΩ'), rf: R('Rf', '20 kΩ'), vin: 'Vi = −0,6 V', vout: 'Vo = +3,0 V', notas: ['Vo = −(Rf/Ri)·Vi = −(20/4)·(−0,6) = +3,0 V'], aria: 'Amplificador operacional inversor com 4 e 20 quilo-ohms: entrada de menos 0,6 volt e saída de mais 3 volts' }),
  /* A1.14 */
  'BQ-e-A1-b4-1': opa({ kind: 'non', r1: R('R1', '1,5 kΩ'), rf: R('Rf', '13,5 kΩ'), vin: 'Vi = 0,3 V', vout: 'Vo = 3,0 V', notas: ['ganho = 1 + Rf/R1 = 1 + 9 = 10 → Vo = 10·0,3 = 3,0 V'], aria: 'Amplificador operacional não inversor com 1,5 e 13,5 quilo-ohms: entrada de 0,3 volt e saída de 3 volts' }),
  /* A1.37 */
  'BQ-e-A1-y3': opa({ kind: 'inv', r1: R('Ri', '20 kΩ'), rf: R('Rf', '100 kΩ'), vin: 'Vi = +3 V', vout: 'Vo = −12 V (saturada)', notas: ['ganho −Rf/Ri = −5 → linear: −15 V', 'a saída não passa da alimentação (±12 V): satura em −12 V'], aria: 'Amplificador inversor de ganho menos 5 com alimentação de mais ou menos 12 volts: entrada de 3 volts e saída saturada em menos 12 volts' }),
  /* A1.38 */
  'BQ-e-A1-y4': opa({ kind: 'dif', r1: R('R1', '10 kΩ'), rf: R('Rf', '40 kΩ'), r2: R('R2', '10 kΩ'), r3: R('R3', '40 kΩ'), vin: 'V1 = 1,2 V', vin2: 'V2 = 1,7 V', vout: 'Vo = 2,0 V', notas: ['V+ = 1,7·40/(10 + 40) = 1,36 V · Vo = 1,36·(1 + 4) − 4·1,2 = 2,0 V'], aria: 'Amplificador diferencial com 10 e 40 quilo-ohms, V1 de 1,2 volt e V2 de 1,7 volt: saída de 2 volts' }),
  /* A1.17 */
  'BQ-e-A1-b5-0': ladder({ aria: 'Filtro passa-baixas RC com 4,7 quilo-ohms e 22 nanofarads: frequência de corte de 1.540 hertz', src: AC('Vin', ''),
    items: [{ s: R('R', '4,7 kΩ') }, { p: [C('C', '22 nF')] }, { term: ['', '', 'Vout (no capacitor)'] }], note: 'fc = 1/(2π·R·C) = 1/(2π·4.700·22×10⁻⁹) ≈ 1.540 Hz' }),
  /* A1.35 */
  'BQ-e-A1-y1': ladder({ aria: 'Regulador Zener de 12 volts e 1,2 watt com 120 ohms em série e carga de 240 ohms: fonte máxima de 30 volts', src: V('', '30 V', { i: '150 mA' }),
    items: [{ s: R('R', '120 Ω', { u: '18 V' }) }, { p: [ZD('Zener', '12 V', { i: '100 mA', rev: true, n: ['P = 1,2 W'] })] }, { p: [R('carga', '240 Ω', { i: '50 mA', u: '12 V' })] }], note: 'IZ máx = 1,2/12 = 100 mA · IL = 50 mA · IR = 150 mA → Vin = 12 + 150 mA·120 = 30 V' }),
};

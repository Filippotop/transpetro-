/* Questões extras da estação M2 (7.2, unidades e grandezas do eletromagnetismo). Rascunhos revisados pelo Opus, integrados em 2026-11-25. Ids z1…z6 = RS-7.2-1…6. */
export default {
  extra: [
    // RS-7.2-1
    { id: "z1", mod: "M2", d: "m", h: "7.2", tag: "Energia armazenada em capacitor e prefixos",
      s: "Um capacitor de 470 µF é carregado sob 12 V. A energia armazenada nele é de, aproximadamente,",
      o: ["2,82 mJ", "33,84 J", "67,68 mJ", "33,84 mJ", "33,84 µJ"], a: 3,
      c: "W = ½·C·V² = 0,5 × 470×10⁻⁶ × 12² = 0,03384 J = 33,84 mJ.",
      w: { A: "[formula] Esqueceu o quadrado da tensão: ½·C·V = 0,5 × 470×10⁻⁶ × 12 = 2,82 mJ. A energia usa V².", B: "[unidade] Erro de prefixo: 33,84 mJ = 0,03384 J; 33,84 J é 1.000 vezes maior.", C: "[formula] Esqueceu a metade da fórmula: C·V² = 0,0677 J = 67,68 mJ.", E: "[unidade] Erro de prefixo: 33,84 mJ = 33.840 µJ; 33,84 µJ é 1.000 vezes menor." },
      conta: ["0.5*470e-6*12**2*1000"], src: "fontes/ (energia do capacitor não consta nas fontes do repo: confira em livro-texto de circuitos)" },
    // RS-7.2-2
    { id: "z2", mod: "M2", d: "f", h: "7.2", tag: "Condutância em siemens e prefixo",
      s: "Um resistor de 50 Ω tem condutância, em siemens e em milissiemens, respectivamente, de",
      o: ["0,02 S e 0,02 mS", "0,02 S e 20 mS", "50 S e 50.000 mS", "0,002 S e 2 mS", "0,2 S e 200 mS"], a: 1,
      c: "G = 1/R = 1/50 = 0,02 S = 20 mS. Siemens é o inverso do ohm.",
      w: { A: "[unidade] Trocou o prefixo: 0,02 S = 20 mS, e não 0,02 mS.", C: "[formula] Tomou o valor da resistência como condutância (G = 1/R) e converteu 50 S para mS corretamente.", D: "[formula] Confundiu 50 com 500 ao dividir: 1/500 = 0,002 S.", E: "[detalhe] Leu 50 Ω como 5 Ω: G = 1/5 = 0,2 S = 200 mS." },
      conta: ["1/50*1000"], src: "fontes/circuitos-cc.html (siemens) e fontes/eletromagnetismo-transformadores.html (Wb, T, H, A/m, μ)" },
    // RS-7.2-3
    { id: "z3", mod: "M2", d: "m", h: "7.2", tag: "Indutância pela razão N·Φ/I",
      s: "Uma bobina de 500 espiras é percorrida por 2 A e produz no núcleo um fluxo de 4 mWb, que atravessa cada uma das espiras. Sua indutância própria é de",
      o: ["0,002 H", "2 H", "1 H", "0,5 H", "1 mH"], a: 2,
      c: "L = N·Φ/I = 500 × 0,004 / 2 = 1 H. Como Wb/A = H, a unidade fecha.",
      w: { A: "[formula] Esqueceu o número de espiras: Φ/I = 0,004/2 = 0,002 H.", B: "[formula] Esqueceu de dividir pela corrente: N·Φ = 500 × 0,004 = 2 Wb·espira, que é fluxo concatenado, não indutância.", D: "[formula] Usou I² no lugar de I: N·Φ/I² = 2/4 = 0,5 H.", E: "[unidade] Converteu 4 mWb como 4 µWb: 500 × 4×10⁻⁶ / 2 = 1×10⁻³ H." },
      conta: ["500*0.004/2"], src: "fontes/circuitos-cc.html (siemens) e fontes/eletromagnetismo-transformadores.html (Wb, T, H, A/m, μ) L = N·Φ/I não consta nas fontes do repo: confira em livro-texto." },
    // RS-7.2-4
    { id: "z4", mod: "M2", d: "f", h: "7.2", tag: "Intensidade de campo H em solenoide (A/m)",
      s: "Um solenoide longo, sem núcleo, tem 1.000 espiras em 0,5 m de comprimento e é percorrido por 2 A. A intensidade de campo magnético H dentro dele é, em A/m, de",
      o: ["4 A/m", "2.000 A/m", "4.000 A/m", "8.000 A/m", "0,25 A/m"], a: 2,
      c: "H = N·I/l = 1.000 × 2 / 0,5 = 4.000 A/m.",
      w: { A: "[formula] Esqueceu o número de espiras: I/l = 2/0,5 = 4 A/m.", B: "[formula] Esqueceu de dividir pelo comprimento: N·I = 2.000 A·e, que é força magnetomotriz, não A/m.", D: "[formula] Dividiu por l² em vez de l: 2.000/0,25 = 8.000 A/m.", E: "[oposto] Inverteu a razão e ainda esqueceu as espiras: l/I = 0,5/2 = 0,25." },
      conta: ["1000*2/0.5"], src: "fontes/circuitos-cc.html (siemens) e fontes/eletromagnetismo-transformadores.html (Wb, T, H, A/m, μ) H = N·I/l não consta nas fontes do repo: confira em livro-texto." },
    // RS-7.2-5
    { id: "z5", mod: "M2", d: "m", h: "7.2", tag: "Tesla em unidades de base SI",
      s: "Em F = B·I·L, com F em newton, I em ampère e L em metro, a unidade de B é o tesla. Em termos de newton, ampère e metro, 1 T equivale a",
      o: ["N·m/A", "N/(A·m)", "V/m", "A·m/N", "N·A/m"], a: 1,
      c: "Por F = B·I·L, B = F/(I·L), com unidade N/(A·m). Como 1 Wb = 1 V·s, também vale V·s/m² = Wb/m².",
      w: { A: "[unidade] N·m/A = J/A = V·s = Wb, que é a unidade do fluxo magnético Φ, não da densidade de fluxo B.", C: "[unidade] V/m é a unidade do campo elétrico, não do magnético.", D: "[oposto] Inverteu a razão: a força deve estar no numerador, B = F/(I·L).", E: "[formula] Pôs a corrente no numerador: em B = F/(I·L), tanto I quanto L ficam no denominador." },
      src: "fontes/circuitos-cc.html (siemens) e fontes/eletromagnetismo-transformadores.html (Wb, T, H, A/m, μ) 1 Wb = 1 V·s não consta nas fontes do repo: confira em livro-texto (lei de Faraday)." },
    // RS-7.2-6
    { id: "z6", mod: "M2", d: "d", h: "7.2", tag: "Densidade de fluxo B = μ_r·μ0·H em material",
      s: "Um núcleo ferromagnético tem permeabilidade relativa μ_r = 2.000 e é submetido a H = 500 A/m (considere o material na região linear). Considerando μ0 = 4π×10⁻⁷ H/m, a densidade de fluxo magnético B no núcleo é de, aproximadamente,",
      o: ["0,00063 T", "1,26 T", "12,6 T", "0,0126 T", "2.000 T"], a: 1,
      c: "B = μ_r·μ0·H = 2.000 × 4π×10⁻⁷ × 500 ≈ 1,2566 T.",
      w: { A: "[formula] Esqueceu μ_r e usou só μ0: B = μ0·H = 4π×10⁻⁷ × 500 ≈ 6,3×10⁻⁴ T.", C: "[detalhe] Erro de zero: usou μ_r = 20.000.", D: "[detalhe] Usou H = 5 A/m no lugar de 500 A/m: 2.000 × 4π×10⁻⁷ × 5 ≈ 0,0126 T.", E: "[formula] Tomou μ_r como densidade de fluxo, ignorando μ0 e H." },
      conta: ["2000*4*Math.PI*1e-7*500"], src: "fontes/circuitos-cc.html (siemens) e fontes/eletromagnetismo-transformadores.html (Wb, T, H, A/m, μ)" },
  ],
};

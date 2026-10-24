/* =====================================================================
   MÓDULO DA APOSTILA — Energia, potência e circuitos trifásicos
   Edital (Anexo IV): 3.1, 3.2, 3.3, 4.1 e 4.2. Faixa A.
   Formato: ver js/apostila/index.js. Toda conta de exemplo resolvido
   está em `contas` e é conferida por tests/apostila.test.mjs.
   ===================================================================== */

const energia = `
<div class="texto">
<p><strong>Potência</strong> é a rapidez com que a energia é convertida. <strong>Energia</strong> é potência acumulada no tempo:</p>
<p class="tw"><strong>E = P · t</strong></p>
<p>Duas maneiras de usar a mesma fórmula:</p>
<ul>
<li><strong>No SI:</strong> P em watts e t em segundos dão E em joules, porque 1 W = 1 J/s.</li>
<li><strong>Na conta de luz:</strong> P em quilowatts e t em horas dão E em <strong>quilowatt-hora</strong> (kWh).</li>
</ul>
<p>O kWh é unidade de <em>energia</em>, não de potência. "kW/h" não existe.</p>
</div>
<div class="exres">
<p><strong>Quanto vale 1 kWh em joules?</strong></p>
<ol>
<li>1 kWh é a energia de 1 kW funcionando durante 1 h.</li>
<li>Passe tudo para o SI: 1 kW = 1.000 W e 1 h = 3.600 s.</li>
<li>E = 1.000 W × 3.600 s = 3.600.000 J, isto é, 3,6·10<sup>6</sup> J (3,6 MJ).</li>
<li>Aplicando: um chuveiro de 5.400 W ligado por 20 min gasta 5,4 kW × (20/60) h = 1,8 kWh. Em joules: 1,8 × 3,6·10<sup>6</sup> = 6,48·10<sup>6</sup> J, isto é, 6.480.000 J.</li>
</ol>
<p><strong>Resposta:</strong> 1 kWh = 3,6·10<sup>6</sup> J.</p>
<p><strong>Como a banca tenta te enganar:</strong> alternativas que esquecem o "k" (3,6·10<sup>3</sup>) ou que usam 60 s em vez de 3.600 s numa hora.</p>
</div>
<div class="texto">
<p>O <strong>medidor de energia eletromecânico</strong> (de indução) tem um disco de alumínio que gira com velocidade proporcional à potência da carga. Por isso o <em>número de voltas</em> é proporcional à <em>energia</em>.</p>
<p>A <strong>constante do disco</strong> (K<sub>d</sub>) diz quantos Wh correspondem a uma volta:</p>
<ul>
<li>voltas = E / K<sub>d</sub>;</li>
<li>potência a partir das voltas: P = (voltas × K<sub>d</sub>) / t.</li>
</ul>
</div>
<div class="exres">
<p><strong>Um medidor tem K<sub>d</sub> = 4 Wh/volta. Ficam ligados um ferro de passar de 1.000 W por 6 min e uma TV de 120 W por 1 h 30 min. Quantas voltas o disco dá?</strong></p>
<ol>
<li>Calcule a energia de cada carga em Wh (P em W, t em h). Ferro: 1.000 × (6/60) = 100 Wh. TV: 120 × 1,5 = 180 Wh.</li>
<li>Energias se somam, ao mesmo tempo ou não: 100 + 180 = 280 Wh.</li>
<li>Voltas = 280 / 4 = 70.</li>
<li>Caminho inverso: com o mesmo medidor, o disco dá 15 voltas em 2 min. A energia é 15 × 4 = 60 Wh, gasta em 2/60 h. P = 60 / (2/60) = 1.800 W.</li>
</ol>
<p><strong>Resposta:</strong> 70 voltas.</p>
<p><strong>Como a banca tenta te enganar:</strong> multiplicar watts por minutos sem converter (1.000 × 6 = 6.000) ou somar as potências e usar um tempo só.</p>
</div>
<p class="fonte">SI: 1 W = 1 J/s e 1 h = 3.600 s (Brochura do SI, tradução do Inmetro). Funcionamento do medidor de indução: Basso e Rocha Filho, Caderno Brasileiro de Ensino de Física.</p>`;

const triangulo = `
<div class="texto">
<p>Em corrente alternada, a corrente pode estar defasada da tensão de um ângulo <strong>φ</strong>. Daí surgem três potências:</p>
<ul>
<li><strong>Potência ativa</strong> P, em W: a que vira trabalho e calor. É a média da potência instantânea, a que o wattímetro mede e o medidor de kWh registra.</li>
<li><strong>Potência reativa</strong> Q, em var: energia que vai e volta entre a fonte e os campos magnéticos (motores, reatores, transformadores) ou elétricos (capacitores). Tem média zero, mas ocupa o cabo.</li>
<li><strong>Potência aparente</strong> S, em VA: S = V · I. É ela que dimensiona cabo, transformador e gerador.</li>
</ul>
<p>As três formam um triângulo retângulo:</p>
<p class="tw">P = S · cos φ &nbsp;·&nbsp; Q = S · sen φ &nbsp;·&nbsp; S<sup>2</sup> = P<sup>2</sup> + Q<sup>2</sup></p>
<p>O <strong>fator de potência</strong> é FP = P / S. Com tensão e corrente senoidais, FP = cos φ.</p>
<p>O sinal de Q diz o tipo de carga:</p>
<ul>
<li><strong>Indutiva</strong> (motor): corrente atrasada da tensão, Q &gt; 0. A carga consome reativo.</li>
<li><strong>Capacitiva</strong> (capacitor): corrente adiantada, Q &lt; 0. A carga fornece reativo.</li>
<li><strong>Resistiva</strong>: φ = 0, Q = 0 e FP = 1.</li>
</ul>
</div>
<svg viewBox="0 0 320 220" role="img" aria-label="Triângulo de potências: P no cateto horizontal, Q indutivo no cateto vertical para cima, S na hipotenusa e o ângulo φ entre P e S. Para baixo, tracejado, o caso capacitivo com Q negativo.">
<line class="wire thick" x1="40" y1="130" x2="250" y2="130"/>
<line class="wire thick pa-s" x1="250" y1="130" x2="250" y2="40"/>
<line class="wire thick" x1="40" y1="130" x2="250" y2="40"/>
<line class="wire dsh pc-s" x1="250" y1="130" x2="250" y2="190"/>
<line class="wire dsh" x1="40" y1="130" x2="250" y2="190"/>
<path class="wire" d="M 80 130 A 40 40 0 0 0 76.8 114.2"/>
<text class="ts" x="86" y="125">φ</text>
<text class="ts" x="118" y="124">P (W)</text>
<text class="ts" x="104" y="74">S (VA)</text>
<text class="ts" x="258" y="88">Q &gt; 0</text>
<text class="tn" x="258" y="104">indutivo</text>
<text class="ts" x="258" y="166">Q &lt; 0</text>
<text class="tn" x="258" y="182">capacitivo</text>
<text class="tm" x="40" y="212">FP = P/S = cos φ</text>
</svg>
<div class="cai">
<p>A Cesgranrio usa triângulos de lados "redondos". Reconheça na hora:</p>
<ul>
<li><strong>3-4-5:</strong> FP = 0,8 ↔ sen φ = 0,6; FP = 0,6 ↔ sen φ = 0,8.</li>
<li><strong>5-12-13</strong>, <strong>7-24-25</strong> e <strong>8-15-17</strong>.</li>
</ul>
<p>Sem triângulo pronto: sen φ = √(1 − FP<sup>2</sup>).</p>
</div>
<div class="exres">
<p><strong>No quadro geral, mediu-se S = 13 kVA e Q = 5 kvar (indutivo). Quanto valem P e o FP?</strong></p>
<ol>
<li>Desenhe o triângulo: S é a hipotenusa; Q, o cateto vertical.</li>
<li>Pitágoras: P = √(S<sup>2</sup> − Q<sup>2</sup>) = √(169 − 25) = √144 = 12 kW.</li>
<li>FP = P / S = 12/13 ≈ 0,92.</li>
<li>Como Q &gt; 0, a carga é indutiva: FP 0,92 indutivo (corrente atrasada).</li>
</ol>
<p><strong>Resposta:</strong> P = 12 kW e FP ≈ 0,92 indutivo.</p>
<p><strong>Como a banca tenta te enganar:</strong> subtrair direto (13 − 5 = 8 kW) ou dar Q/S = 5/13 ≈ 0,385 como FP. Esse é o sen φ.</p>
</div>
<p class="fonte">Definições de P, Q, S e FP: e-lee, "Potências" (regime sinusoidal).</p>`;

const correcao = `
<div class="texto">
<p>Para várias cargas ligadas no mesmo quadro:</p>
<ul>
<li>P total = soma das P;</li>
<li>Q total = soma <em>algébrica</em> das Q (indutivas com +, capacitores com −);</li>
<li>S total = √(P<sup>2</sup> + Q<sup>2</sup>), calculado no fim.</li>
</ul>
<p>Os kVA não se somam direto, porque cada carga tem um ângulo φ diferente. A soma só bate quando todas têm o mesmo FP.</p>
<p><strong>Por que corrigir o FP?</strong> Para a mesma potência ativa, FP baixo exige mais corrente. Mais corrente significa mais perda I<sup>2</sup>R nos cabos, mais queda de tensão e transformador ocupado com reativo. A distribuidora ainda cobra o reativo excedente quando o FP fica abaixo do mínimo regulamentado.</p>
<p><strong>Como corrigir:</strong> um <strong>banco de capacitores</strong> em paralelo com a carga. Ele fornece ali mesmo o reativo que os motores pedem, e a rede deixa de transportá-lo.</p>
<p>P não muda. Antes, Q<sub>1</sub> = P · tg φ<sub>1</sub>. Depois, Q<sub>2</sub> = P · tg φ<sub>2</sub>. O banco fornece a diferença:</p>
<p class="tw"><strong>Q<sub>C</sub> = P · (tg φ<sub>1</sub> − tg φ<sub>2</sub>)</strong></p>
</div>
<div class="tw"><table>
<caption>Valores que mais aparecem</caption>
<thead><tr><th scope="col">FP (cos φ)</th><th scope="col">sen φ</th><th scope="col">tg φ</th></tr></thead>
<tbody>
<tr><td>0,6</td><td>0,8</td><td>1,333</td></tr>
<tr><td>0,707</td><td>0,707</td><td>1</td></tr>
<tr><td>0,8</td><td>0,6</td><td>0,75</td></tr>
<tr><td>0,96</td><td>0,28</td><td>0,292</td></tr>
<tr><td>1</td><td>0</td><td>0</td></tr>
</tbody></table></div>
<div class="exres">
<p><strong>Um quadro de força alimenta dois motores trifásicos. Motor 1: 20 kVA, FP 0,6. Motor 2: 15 kVA, FP 0,8. No quadro há um banco de capacitores de 18 kvar. Que potência reativa e que FP o quadro vê?</strong></p>
<ol>
<li>Separe cada motor em P e Q. Motor 1: P = 20 × 0,6 = 12 kW; sen φ = 0,8, então Q = 20 × 0,8 = 16 kvar. Motor 2: P = 15 × 0,8 = 12 kW; Q = 15 × 0,6 = 9 kvar.</li>
<li>Some P com P e Q com Q: P = 12 + 12 = 24 kW; Q = 16 + 9 = 25 kvar.</li>
<li>Sem o banco, S = √(24<sup>2</sup> + 25<sup>2</sup>) ≈ 34,7 kVA, e não 20 + 15 = 35. FP = 24/34,7 ≈ 0,69.</li>
<li>O banco entra com sinal negativo: Q = 25 − 18 = 7 kvar.</li>
<li>Com o banco, S = √(24<sup>2</sup> + 7<sup>2</sup>) = 25 kVA e FP = 24/25 = 0,96.</li>
<li>Conferência pela fórmula: tg φ<sub>1</sub> = 25/24 e tg φ<sub>2</sub> = 7/24. Q<sub>C</sub> = 24 × (25/24 − 7/24) = 18 kvar. Bate.</li>
</ol>
<p><strong>Resposta:</strong> 7 kvar (indutivo) e FP = 0,96.</p>
<p><strong>Como a banca tenta te enganar:</strong> somar os kVA dos motores, esquecer de subtrair o banco (25 kvar) ou somar o banco como se fosse indutivo.</p>
</div>
<div class="pega">
<p><strong>O banco reduz Q, não P.</strong> Depois da correção, os motores consomem a mesma potência ativa e a mesma corrente. O que cai é Q, S e a corrente no trecho entre a fonte e o banco. A energia ativa (kWh) não muda.</p>
<p>Capacitor demais também é erro: o FP passa a capacitivo (Q &lt; 0) e a tensão pode subir.</p>
</div>
<p class="fonte">Compensação do fator de potência: e-lee, "Compensação do factor de potência"; UNESP, Cap. 3, item 5.2.</p>`;

const medicao = `
<div class="texto">
<p>O <strong>wattímetro</strong> tem duas bobinas: a de corrente, em série com a carga, e a de potencial, em paralelo. Ele indica a potência ativa P = V · I · cos φ.</p>
<p>Voltímetro × amperímetro dá S, não P. Com os três instrumentos juntos, FP = W / (V · A).</p>
<p>Modelando a carga como resistência em série com reatância:</p>
<ul>
<li>R = P / I<sup>2</sup>, porque só a resistência dissipa potência ativa;</li>
<li>|X| = Q / I<sup>2</sup>.</li>
</ul>
</div>
<div class="exres">
<p><strong>Uma carga monofásica tem V = 100 V, I = 5 A e o wattímetro indica 300 W. Represente a carga como R em série com X.</strong></p>
<ol>
<li>S = V · I = 100 × 5 = 500 VA.</li>
<li>FP = P / S = 300/500 = 0,6.</li>
<li>Q = √(500<sup>2</sup> − 300<sup>2</sup>) = 400 var.</li>
<li>R = P / I<sup>2</sup> = 300/25 = 12 Ω e |X| = Q / I<sup>2</sup> = 400/25 = 16 Ω.</li>
<li>Conferência: |Z| = V / I = 100/5 = 20 Ω, e √(12<sup>2</sup> + 16<sup>2</sup>) = 20.</li>
</ol>
<p><strong>Resposta:</strong> Z = 12 + j16 Ω se a carga for indutiva, ou 12 − j16 Ω se for capacitiva. O wattímetro sozinho não revela o sinal.</p>
<p><strong>Como a banca tenta te enganar:</strong> se, ao ligar outro elemento, o wattímetro passar a marcar exatamente V × A, o FP visto pela fonte virou 1. Esse elemento cancelou a reatância da carga, logo tem o tipo oposto ao dela.</p>
</div>
<div class="texto">
<p><strong>Em trifásico:</strong></p>
<ul>
<li><strong>A quatro fios</strong> (com neutro): um wattímetro por fase, e P = W<sub>1</sub> + W<sub>2</sub> + W<sub>3</sub>.</li>
<li><strong>A três fios</strong> (sem neutro): basta o <strong>método dos dois wattímetros</strong>. As bobinas de corrente ficam em duas linhas, e as de potencial, entre cada uma dessas linhas e a terceira. Vale para carga equilibrada ou não.</li>
</ul>
<p>Com carga equilibrada, cada wattímetro lê:</p>
<p class="tw">W<sub>1</sub> = V<sub>L</sub> · I<sub>L</sub> · cos(φ − 30°) &nbsp;·&nbsp; W<sub>2</sub> = V<sub>L</sub> · I<sub>L</sub> · cos(φ + 30°)</p>
<p>Daí saem as consequências:</p>
<ul>
<li>FP = 1 (φ = 0°): W<sub>1</sub> = W<sub>2</sub>.</li>
<li>FP = 0,5 (φ = 60°): W<sub>2</sub> = 0, e W<sub>1</sub> mostra toda a potência.</li>
<li>FP &lt; 0,5 (φ &gt; 60°): W<sub>2</sub> fica negativo. O ponteiro analógico bate no batente; inverte-se a bobina de potencial e a leitura entra com sinal negativo.</li>
<li>Bônus: Q = √3 · (W<sub>1</sub> − W<sub>2</sub>).</li>
</ul>
</div>
<div class="cai">
<p><strong>Dois wattímetros: P = W<sub>1</sub> + W<sub>2</sub>, em soma algébrica.</strong></p>
<ul>
<li>Leitura negativa não é defeito: indica FP &lt; 0,5.</li>
<li>Uma leitura igual a zero indica FP = 0,5.</li>
</ul>
</div>
<div class="exres">
<p><strong>Num motor trifásico a três fios, operando quase a vazio, os wattímetros indicam W<sub>1</sub> = 8 kW e W<sub>2</sub> = −2 kW. Quanto valem P, Q e o FP?</strong></p>
<ol>
<li>Soma algébrica: P = 8 + (−2) = 6 kW.</li>
<li>Q = √3 × (8 − (−2)) = √3 × 10 ≈ 17,3 kvar.</li>
<li>S = √(6<sup>2</sup> + 17,3<sup>2</sup>) ≈ 18,3 kVA, e FP = 6/18,3 ≈ 0,327.</li>
<li>Coerência: houve leitura negativa, então o FP tinha de dar menos que 0,5. Deu.</li>
</ol>
<p><strong>Resposta:</strong> P = 6 kW e FP ≈ 0,33.</p>
<p><strong>Como a banca tenta te enganar:</strong> somar os módulos (8 + 2 = 10 kW) ou ficar com a maior leitura.</p>
</div>
<p class="fonte">Método dos dois wattímetros: UNAM, "Medición de potencia en sistemas eléctricos".</p>`;

const ligacoes = `
<div class="texto">
<p>Um gerador <strong>trifásico</strong> produz três tensões senoidais de mesmo valor, defasadas de 120°. Numa carga <strong>equilibrada</strong> (três ramos iguais), as três correntes também têm o mesmo módulo e ficam a 120° entre si.</p>
<p>Quatro definições que a prova cobra:</p>
<ul>
<li><strong>Tensão de fase</strong> (V<sub>F</sub>): a tensão sobre cada ramo, seja enrolamento ou impedância. Em Y, é a tensão entre fase e neutro.</li>
<li><strong>Tensão de linha</strong> (V<sub>L</sub>): a tensão entre dois condutores de fase.</li>
<li><strong>Corrente de linha</strong> (I<sub>L</sub>): a corrente no condutor que vem da rede, a que o alicate mede no cabo.</li>
<li><strong>Corrente de fase</strong> (I<sub>F</sub>): a corrente dentro de cada ramo.</li>
</ul>
</div>
<div class="tw"><table>
<caption>Estrela × triângulo (carga equilibrada)</caption>
<thead><tr><th scope="col"></th><th scope="col">Estrela (Y)</th><th scope="col">Triângulo (Δ)</th></tr></thead>
<tbody>
<tr><th scope="row">Tensão</th><td>V<sub>L</sub> = √3 · V<sub>F</sub></td><td>V<sub>L</sub> = V<sub>F</sub></td></tr>
<tr><th scope="row">Corrente</th><td>I<sub>L</sub> = I<sub>F</sub></td><td>I<sub>L</sub> = √3 · I<sub>F</sub></td></tr>
<tr><th scope="row">Exemplos</th><td>127/220 V e 220/380 V</td><td>cada ramo sob a tensão de linha</td></tr>
</tbody></table></div>
<div class="texto">
<p><strong>Por que √3?</strong> A tensão de linha é a diferença entre duas tensões de fase: V<sub>AB</sub> = V<sub>AN</sub> − V<sub>BN</sub>. Os dois fasores têm o mesmo módulo e ficam a 120°. A diferença vale 2 · V<sub>F</sub> · cos 30° = √3 · V<sub>F</sub> e fica adiantada 30° de V<sub>AN</sub>. No Δ, o mesmo raciocínio vale para as correntes: I<sub>A</sub> = I<sub>AB</sub> − I<sub>CA</sub>.</p>
</div>
<svg viewBox="0 0 320 240" role="img" aria-label="Fasores de uma ligação estrela: V AN, V BN e V CN partem do neutro com o mesmo módulo, a 120 graus entre si. A tensão de linha V AB liga a ponta de V BN à ponta de V AN e mede raiz de 3 vezes a tensão de fase.">
<line class="wire thick pa-s" x1="150" y1="125" x2="235" y2="125"/>
<line class="wire thick pb-s" x1="150" y1="125" x2="107.5" y2="198.6"/>
<line class="wire thick pc-s" x1="150" y1="125" x2="107.5" y2="51.4"/>
<line class="wire thick" x1="107.5" y1="198.6" x2="235" y2="125"/>
<path class="wire" d="M 175 125 A 25 25 0 0 0 137.5 103.4"/>
<circle class="comp" cx="150" cy="125" r="3.5"/>
<text class="tn" x="132" y="142">N</text>
<text class="tn" x="160" y="104">120°</text>
<text class="ts" x="205" y="116">V<tspan class="tn" dy="3">AN</tspan></text>
<text class="ts" x="60" y="218">V<tspan class="tn" dy="3">BN</tspan></text>
<text class="ts" x="62" y="44">V<tspan class="tn" dy="3">CN</tspan></text>
<text class="ts" x="176" y="196">V<tspan class="tn" dy="3">AB</tspan><tspan dy="-3"> = √3·V</tspan><tspan class="tn" dy="3">F</tspan></text>
</svg>
<div class="texto">
<p>A mesma carga ligada em Δ recebe em cada ramo √3 vezes mais tensão do que em Y. Por isso a corrente de fase fica √3 vezes maior, e a de linha e a potência, 3 vezes maiores. É o princípio da partida estrela-triângulo, vista no módulo de máquinas.</p>
</div>
<div class="exres">
<p><strong>Uma rede 220/127 V alimenta duas cargas resistivas equilibradas: uma em Y, com 12,7 Ω por fase, e outra em Δ, com 22 Ω por fase. Qual a corrente em cada linha da rede?</strong></p>
<ol>
<li>Carga Y: cada resistor fica sob a tensão de fase, 220/√3 = 127 V. I<sub>F</sub> = 127/12,7 = 10 A. Em Y, I<sub>L</sub> = I<sub>F</sub> = 10 A.</li>
<li>Carga Δ: cada resistor fica sob a tensão de linha, 220 V. I<sub>F</sub> = 220/22 = 10 A. Em Δ, I<sub>L</sub> = √3 × 10 ≈ 17,3 A.</li>
<li>As duas cargas são resistivas. As correntes de linha delas estão em fase com a mesma tensão fase-neutro, então os módulos se somam: 10 + 17,3 = 27,3 A.</li>
</ol>
<p><strong>Resposta:</strong> 27,3 A por linha (10 A da carga Y e 17,3 A da carga Δ).</p>
<p><strong>Como a banca tenta te enganar:</strong> "as duas têm 10 A de fase, logo a rede fornece 20 A". Isso esquece o √3 do Δ. Somar módulos só vale quando as cargas têm o mesmo ângulo φ. Com ângulos diferentes, some P e Q.</p>
</div>
<div class="pega">
<p><strong>Corrente de fase × corrente de linha.</strong> Em Δ, o alicate no cabo mede I<sub>L</sub>, mas dentro do enrolamento circula I<sub>L</sub>/√3.</p>
<p>Se uma carga em Δ e outra em Y puxam a <em>mesma</em> corrente de linha, a corrente de fase do Δ é √3 vezes menor: I<sub>F(Δ)</sub>/I<sub>F(Y)</sub> = 1/√3 = √3/3.</p>
</div>
<p class="fonte">Relações de linha e de fase: e-lee, "Ligação de cargas"; UNESP, Cap. 3, itens 2.1 e 2.2.</p>`;

const potencia3f = `
<div class="texto">
<p>Numa carga trifásica equilibrada, cada um dos três ramos consome V<sub>F</sub> · I<sub>F</sub> · cos φ. Então P = 3 · V<sub>F</sub> · I<sub>F</sub> · cos φ.</p>
<p>Substituindo as relações de Y (V<sub>F</sub> = V<sub>L</sub>/√3, I<sub>F</sub> = I<sub>L</sub>) ou de Δ (V<sub>F</sub> = V<sub>L</sub>, I<sub>F</sub> = I<sub>L</sub>/√3), as duas ligações dão a mesma expressão:</p>
<p class="tw"><strong>P = √3 · V<sub>L</sub> · I<sub>L</sub> · cos φ</strong> &nbsp;·&nbsp; Q = √3 · V<sub>L</sub> · I<sub>L</sub> · sen φ &nbsp;·&nbsp; S = √3 · V<sub>L</sub> · I<sub>L</sub></p>
<p>A fórmula usa grandezas de linha porque V<sub>L</sub> vem da rede e I<sub>L</sub> se mede no cabo, sem saber como a carga está ligada.</p>
<p><strong>O que diz a placa:</strong></p>
<ul>
<li><strong>Gerador ou transformador:</strong> potência aparente, em kVA.</li>
<li><strong>Motor:</strong> potência mecânica no eixo, em kW ou cv. A potência elétrica de entrada é P<sub>eixo</sub> / η, onde η é o <strong>rendimento</strong>.</li>
</ul>
</div>
<div class="pega">
<p>O φ da fórmula é o ângulo entre a tensão e a corrente <em>de fase</em>, isto é, o ângulo da impedância. Não é o ângulo entre V<sub>L</sub> e I<sub>L</sub>, que difere dele de 30°.</p>
<p>E fórmula igual não quer dizer consumo igual: a mesma impedância em Δ consome 3 vezes mais que em Y.</p>
</div>
<div class="exres">
<p><strong>Placa de um gerador síncrono trifásico: 400 V, 60√3 kVA, ligação Δ, FP 0,8. Qual a corrente nominal de fase?</strong></p>
<ol>
<li>Comece pela corrente de linha, que sai de S = √3 · V<sub>L</sub> · I<sub>L</sub>: I<sub>L</sub> = 60√3 · 1.000 / (√3 × 400). O √3 cancela: 60.000/400 = 150 A.</li>
<li>Em Δ, a corrente de fase é a de linha dividida por √3: I<sub>F</sub> = 150/√3 = 50√3 ≈ 86,6 A.</li>
<li>De quebra, a potência ativa nominal: P = S · FP = 60√3 × 0,8 = 48√3 ≈ 83,1 kW.</li>
</ol>
<p><strong>Resposta:</strong> I<sub>F</sub> = 50√3 A ≈ 86,6 A.</p>
<p><strong>Como a banca tenta te enganar:</strong> as alternativas trazem 150 A (a corrente de linha), 150√3 A (multiplicou em vez de dividir) e 50 A (dividiu por 3).</p>
</div>
<div class="exres">
<p><strong>Placa de um motor: 15 kW no eixo, 380 V, FP 0,85, rendimento 0,9. Qual a corrente de linha?</strong></p>
<ol>
<li>A placa dá a potência mecânica. A potência elétrica de entrada é 15/0,9 ≈ 16,7 kW.</li>
<li>I<sub>L</sub> = P / (√3 · V<sub>L</sub> · cos φ) = 15.000 / (√3 × 380 × 0,85 × 0,9) ≈ 29,8 A.</li>
</ol>
<p><strong>Resposta:</strong> ≈ 29,8 A.</p>
<p><strong>Como a banca tenta te enganar:</strong> esquecer o rendimento, que dá cerca de 10% a menos de corrente.</p>
</div>
<p class="fonte">Potência trifásica: e-lee, "Potências em sistemas trifásicos"; UNESP, Cap. 3, item 5.1.</p>`;

const neutro = `
<div class="texto">
<p>Na rede Y a quatro fios (três fases e neutro), as cargas monofásicas de 127 V ficam entre fase e neutro. O <strong>neutro</strong> amarra o centro-estrela das cargas ao da fonte. Assim cada carga recebe 127 V, qualquer que seja a distribuição.</p>
<p>A corrente no neutro é a soma fasorial das três correntes de fase:</p>
<ul>
<li>carga equilibrada: as correntes se anulam e I<sub>N</sub> = 0;</li>
<li>carga desequilibrada: o neutro conduz a diferença.</li>
</ul>
<p><strong>Neutro rompido:</strong> sem a ligação, o centro-estrela das cargas perde a referência e "flutua" (<strong>deslocamento do neutro</strong>). As tensões de linha continuam 220 V, mas as tensões fase-neutro se redistribuem:</p>
<ul>
<li>a fase com menos carga (maior resistência) fica com tensão alta;</li>
<li>a fase mais carregada fica com tensão baixa.</li>
</ul>
</div>
<svg viewBox="0 0 320 160" role="img" aria-label="Neutro rompido: uma lâmpada de 100 W na fase A e um aquecedor de 1.000 W na fase B se encontram no ponto N linha, que está desligado do neutro N da fonte. As duas cargas ficam em série sob os 220 V entre A e B: cerca de 200 V na lâmpada e 20 V no aquecedor.">
<text class="ts" x="10" y="41">A</text>
<line class="wire pa-s" x1="26" y1="36" x2="116" y2="36"/>
<circle class="comp" cx="130" cy="36" r="14"/>
<line class="wire" x1="120" y1="26" x2="140" y2="46"/>
<line class="wire" x1="120" y1="46" x2="140" y2="26"/>
<polyline class="wire" points="144,36 200,36 200,72"/>
<text class="ts" x="10" y="113">B</text>
<line class="wire pb-s" x1="26" y1="108" x2="110" y2="108"/>
<rect class="comp" x="110" y="98" width="40" height="20"/>
<polyline class="wire" points="150,108 200,108 200,72"/>
<circle class="comp" cx="200" cy="72" r="3.5"/>
<text class="tn" x="180" y="68">N′</text>
<line class="wire nn-s" x1="200" y1="72" x2="238" y2="72"/>
<line class="wire nn-s" x1="262" y1="72" x2="296" y2="72"/>
<line class="wire" x1="240" y1="62" x2="248" y2="82"/>
<line class="wire" x1="252" y1="62" x2="260" y2="82"/>
<text class="ts" x="300" y="77">N</text>
<text class="tn" x="226" y="98">rompido</text>
<text class="tm" x="10" y="78">220 V</text>
<text class="ts" x="84" y="16">100 W: ≈ 200 V</text>
<text class="ts" x="80" y="140">1.000 W: ≈ 20 V</text>
</svg>
<div class="exres">
<p><strong>Uma lâmpada de 100 W/127 V está na fase A, e um aquecedor de 1.000 W/127 V, na fase B. A fase C está sem carga. O neutro do alimentador se rompe. Que tensão fica na lâmpada?</strong></p>
<ol>
<li>Sem neutro, as duas cargas ficam em série entre as fases A e B, isto é, sob 220 V.</li>
<li>Resistência de cada uma pelos dados nominais (R = V<sup>2</sup>/P): lâmpada, 127<sup>2</sup>/100 ≈ 161 Ω; aquecedor, 127<sup>2</sup>/1.000 ≈ 16,1 Ω.</li>
<li>Divisor de tensão: a lâmpada tem 10 vezes a resistência do aquecedor, então fica com 10/11 dos 220 V. São 220 × 10/11 = 200 V na lâmpada e 220 − 200 = 20 V no aquecedor.</li>
<li>A corrente é 220/(161 + 16,1) ≈ 1,24 A.</li>
<li>A 200 V, a lâmpada dissiparia 200<sup>2</sup>/161 ≈ 248 W, cerca de 2,5 vezes o nominal. Ela queima.</li>
</ol>
<p><strong>Resposta:</strong> ≈ 200 V na lâmpada: sobretensão e queima. O aquecedor fica quase sem tensão.</p>
<p><strong>Como a banca tenta te enganar:</strong> "cada carga continua com 127 V" ou "cada uma fica com metade de 220 V". A tensão se divide na proporção das resistências, e quem tem menos potência fica com mais tensão.</p>
<p>O modelo supõe R constante. A resistência do filamento muda com a temperatura, mas a conclusão é a mesma.</p>
</div>
<div class="cai">
<p><strong>Padrão de prova:</strong> sobretensão numa fase (e subtensão em outra) num quadro com cargas monofásicas indica <strong>neutro rompido</strong>, ou com mau contato, e cargas mal distribuídas entre as fases.</p>
<p>Não confunda com fase rompida: ela deixa aquela fase sem tensão, não eleva as outras.</p>
</div>
<p>Veja isso acontecendo na bancada: <button class="link" data-nav="start:qd">atender a OS 2, lâmpadas queimando no prédio administrativo</button>.</p>
<p class="fonte">Deslocamento do neutro: UNESP, Cap. 3, item 2.1.1.3. Corrente de neutro: e-lee, "Ligação de cargas". Operar sem neutro causa sobretensões e queima de equipamentos: J. Starosta, O Setor Elétrico.</p>`;

export default {
  id: 'potencia-trifasicos',
  itens: ['3.1', '3.2', '3.3', '4.1', '4.2'],
  titulo: 'Energia, potência e circuitos trifásicos',
  faixa: 'A',
  porque: '8 das 40 questões de 2023 foram de potência ou de trifásico, quase todas de conta.',
  essencial: [
    'E = P · t. 1 kWh = 3.600.000 J (3,6·10⁶ J). Medidor de disco: voltas = energia (Wh) ÷ Kd (Wh/volta).',
    'S² = P² + Q² e FP = P/S = cos φ. Indutivo: Q > 0, corrente atrasada. Capacitivo: Q < 0, corrente adiantada.',
    'Várias cargas: some P com P e Q com Q (capacitor entra negativo), nunca os kVA. Banco: Qc = P · (tg φ₁ − tg φ₂).',
    'O banco de capacitores reduz Q, S e a corrente da rede. P e os kWh não mudam.',
    'Dois wattímetros (3 fios): P = W₁ + W₂ em soma algébrica. FP = 0,5: uma leitura zera. FP < 0,5: uma fica negativa.',
    'Estrela: VL = √3 · VF e IL = IF. Triângulo: VL = VF e IL = √3 · IF. Em ambas, P = √3 · VL · IL · cos φ.',
    'Neutro rompido com cargas desequilibradas: sobretensão na fase menos carregada e subtensão na mais carregada.',
  ],
  secoes: [
    { id: 'energia', titulo: 'Energia, kWh e o medidor de disco', html: energia },
    { id: 'triangulo', titulo: 'Potência ativa, reativa e aparente', html: triangulo },
    { id: 'correcao', titulo: 'Várias cargas e correção do fator de potência', html: correcao },
    { id: 'medicao', titulo: 'Medição de potência e o método dos dois wattímetros', html: medicao },
    { id: 'ligacoes', titulo: 'Ligações estrela e triângulo', html: ligacoes },
    { id: 'potencia3f', titulo: 'Potência trifásica e dados de placa', html: potencia3f },
    { id: 'neutro', titulo: 'O neutro e o neutro rompido', html: neutro },
  ],
  fontes: [
    { t: 'Edital nº 03/2026 Transpetro, Anexo IV', url: 'https://www.cesgranrio.org.br/' },
    { t: 'e-lee (UCLouvain/UE), M. J. Resende: Potências (regime sinusoidal)', url: 'https://sites.uclouvain.be/e-lee/PO/realisations/CircuitsElectriques/RegimeSinusoidal/Potencias/Potencias.pdf' },
    { t: 'e-lee, M. J. Resende: Compensação do factor de potência', url: 'https://sites.uclouvain.be/e-lee/PO/realisations/CircuitsElectriques/SistemasTrifasicos/Compensacao/CompFacPot.pdf' },
    { t: 'e-lee, M. J. Resende: Ligação de cargas (estrela e triângulo)', url: 'https://sites.uclouvain.be/e-lee/PO/realisations/CircuitsElectriques/SistemasTrifasicos/LigacaoCargas/LigacaoCargas.pdf' },
    { t: 'e-lee, M. J. Resende: Potências em sistemas trifásicos', url: 'https://sites.uclouvain.be/e-lee/PO/realisations/CircuitsElectriques/SistemasTrifasicos/Potencias/PotenciaTri.pdf' },
    { t: 'UNESP Ilha Solteira, Eletrotécnica, Cap. 3: Circuitos trifásicos', url: 'https://feis.unesp.br/Home/departamentos/engenhariaeletrica/cap3_circuitos_trifasicos.pdf' },
    { t: 'UNAM, Medición de potencia en sistemas eléctricos (método dos dois wattímetros)', url: 'https://control.fi-b.unam.mx/academias/aca_ace/txt/T_04.pdf' },
    { t: 'Basso e Rocha Filho, Garrafas de água em contadores de energia elétrica (Cad. Bras. Ens. Fís., 2004): funcionamento do medidor de indução', url: 'https://periodicos.ufsc.br/index.php/fisica/article/download/10003/14545/49325' },
    { t: 'Sistema Internacional de Unidades, 9ª ed. (tradução Inmetro/IPQ)', url: 'https://www.gov.br/suframa/pt-br/centrais-de-conteudo/biblioteca/sistema-internaciona-de-unidades-inmetro.pdf' },
    { t: 'J. Starosta, A revisão da NBR 5410 e a proteção adicional do neutro (O Setor Elétrico, 2018)', url: 'https://www.osetoreletrico.com.br/?p=11274' },
  ],
  missoes: ['qd', 'mot'],
  checagem: [
    {
      s: 'Uma carga trifásica equilibrada, alimentada a três fios, tem a potência medida pelo método dos dois wattímetros. Um dos wattímetros indica zero. O fator de potência da carga é',
      o: ['1,0', '0,866', '0,707', '0,5', 'zero'],
      a: 3,
      porque: [
        'Com FP = 1 (φ = 0°), os dois wattímetros marcam o mesmo valor, cada um com metade da potência.',
        'Com FP = 0,866 (φ = 30°), W₁ = VL·IL·cos 0° e W₂ = VL·IL·cos 60°: W₂ é metade de W₁, mas não zera.',
        'Com FP = 0,707 (φ = 45°), W₂ = VL·IL·cos 75°, ainda positivo. Só fica menor.',
        'Certo. W₂ = VL·IL·cos(φ + 30°) zera quando φ + 30° = 90°, isto é, φ = 60° e FP = cos 60° = 0,5. O outro wattímetro mostra toda a potência.',
        'Com FP = 0 (φ = 90°), as leituras ficam iguais e opostas e a soma (P) é zero. Nenhum dos dois marca zero.',
      ],
    },
    {
      s: 'Um quadro de distribuição 220/127 V alimenta apenas cargas monofásicas. Entre cada fase e o barramento de neutro do quadro, o eletricista mede cerca de 175 V, 80 V e 145 V. As tensões entre fases estão normais, em 220 V. A causa mais provável é',
      o: [
        'o rompimento de uma das fases do alimentador',
        'a interrupção do neutro do alimentador, com as cargas mal distribuídas entre as fases',
        'a sobrecarga de um motor trifásico ligado ao quadro',
        'o fator de potência baixo das cargas do quadro',
        'o condutor de proteção (PE) desligado do barramento de terra',
      ],
      a: 1,
      porque: [
        'Fase rompida deixa aquela fase sem tensão e não eleva as outras. Além disso, as três tensões de linha estão normais: as três fases chegam ao quadro.',
        'Certo. Sem neutro, o centro-estrela das cargas flutua. As tensões de linha continuam 220 V, mas as fase-neutro se redistribuem: a fase com menos carga sobe (175 V) e a mais carregada cai (80 V).',
        'Uma sobrecarga aumenta a corrente e pode causar queda de tensão, mas não leva uma fase a 175 V.',
        'FP baixo aumenta a corrente e as perdas, mas não cria sobretensão numa fase.',
        'O PE não conduz corrente em operação normal. Desligado, ele tira a proteção contra choque, mas não muda as tensões entre fase e neutro.',
      ],
    },
    {
      s: 'Um quadro alimenta duas cargas que funcionam juntas. A carga 1 consome 24 kW com fator de potência 0,8 indutivo. A carga 2 tem 20 kVA e fator de potência 0,6 indutivo. No quadro há também um banco de capacitores de 19 kvar. A potência aparente, em kVA, fornecida ao quadro é',
      o: ['15', '36', '39', '49,5', '50'],
      a: 2,
      porque: [
        '15 kvar é a potência reativa que sobra depois do banco (34 − 19). Ela não é a potência aparente.',
        '36 kW é a potência ativa total (24 + 12). O banco não muda P, mas S inclui o reativo que restou.',
        'Certo. Carga 1: S = 24/0,8 = 30 kVA e Q = 30 × 0,6 = 18 kvar. Carga 2: P = 20 × 0,6 = 12 kW e Q = 20 × 0,8 = 16 kvar. Total: P = 36 kW e Q = 18 + 16 − 19 = 15 kvar. S = √(36² + 15²) = 39 kVA.',
        '√(36² + 34²) ≈ 49,5 kVA é o valor sem o banco. Faltou descontar os 19 kvar capacitivos.',
        '30 + 20 = 50 kVA soma potências aparentes de cargas com FP diferentes, o que não vale.',
      ],
    },
    {
      s: 'A placa de um gerador síncrono trifásico informa: tensão nominal 220 V, potência aparente 22√3 kVA, ligação triângulo. A corrente nominal em cada enrolamento (corrente de fase), em A, é',
      o: ['100√3', '100', '100√3/3', '100/3', '300'],
      a: 2,
      porque: [
        'Multiplicou a corrente de linha por √3. Em Δ é o contrário: a corrente de fase é menor que a de linha. O mesmo valor sai de S/V, uma fórmula monofásica.',
        '100 A é a corrente de linha: IL = S/(√3·VL) = 22√3·1.000/(√3 × 220). Em Δ, ela não é igual à corrente de fase.',
        'Certo. IL = 100 A, e em Δ IF = IL/√3 = 100/√3 = 100√3/3 ≈ 57,7 A. Conferência: 3 × 220 × 57,7 ≈ 38,1 kVA = 22√3 kVA.',
        'Dividiu por 3 em vez de √3. O 3 aparece na potência (três ramos), mas a relação entre corrente de linha e de fase no Δ é √3.',
        'Multiplicou por 3. Não existe essa relação: no Δ, a corrente de fase é IL/√3.',
      ],
    },
  ],
  contas: [
    { secao: 'energia', expr: '1000*3600', valor: '3.600.000' },
    { secao: 'energia', expr: '5.4*20/60', valor: '1,8' },
    { secao: 'energia', expr: '1.8*3.6e6', valor: '6.480.000' },
    { secao: 'energia', expr: '1000*6/60', valor: '100' },
    { secao: 'energia', expr: '120*1.5', valor: '180' },
    { secao: 'energia', expr: '100+180', valor: '280' },
    { secao: 'energia', expr: '280/4', valor: '70' },
    { secao: 'energia', expr: '15*4', valor: '60' },
    { secao: 'energia', expr: '15*4/(2/60)', valor: '1.800' },
    { secao: 'triangulo', expr: '13**2', valor: '169' },
    { secao: 'triangulo', expr: 'Math.sqrt(13**2-5**2)', valor: '12' },
    { secao: 'triangulo', expr: '12/13', valor: '0,92' },
    { secao: 'triangulo', expr: '5/13', valor: '0,385' },
    { secao: 'correcao', expr: '20*0.6', valor: '12' },
    { secao: 'correcao', expr: '20*0.8', valor: '16' },
    { secao: 'correcao', expr: '15*0.6', valor: '9' },
    { secao: 'correcao', expr: '16+9', valor: '25' },
    { secao: 'correcao', expr: 'Math.sqrt(24**2+25**2)', valor: '34,7' },
    { secao: 'correcao', expr: '24/Math.sqrt(24**2+25**2)', valor: '0,69' },
    { secao: 'correcao', expr: '25-18', valor: '7' },
    { secao: 'correcao', expr: 'Math.sqrt(24**2+7**2)', valor: '25' },
    { secao: 'correcao', expr: '24/25', valor: '0,96' },
    { secao: 'correcao', expr: '24*(25/24-7/24)', valor: '18' },
    { secao: 'medicao', expr: '100*5', valor: '500' },
    { secao: 'medicao', expr: '300/500', valor: '0,6' },
    { secao: 'medicao', expr: 'Math.sqrt(500**2-300**2)', valor: '400' },
    { secao: 'medicao', expr: '300/5**2', valor: '12' },
    { secao: 'medicao', expr: '400/5**2', valor: '16' },
    { secao: 'medicao', expr: '100/5', valor: '20' },
    { secao: 'medicao', expr: 'Math.sqrt(12**2+16**2)', valor: '20' },
    { secao: 'medicao', expr: '8+(-2)', valor: '6' },
    { secao: 'medicao', expr: 'Math.sqrt(3)*(8-(-2))', valor: '17,3' },
    { secao: 'medicao', expr: 'Math.sqrt(6**2+(Math.sqrt(3)*10)**2)', valor: '18,3' },
    { secao: 'medicao', expr: '6/Math.sqrt(6**2+(Math.sqrt(3)*10)**2)', valor: '0,327' },
    { secao: 'ligacoes', expr: '220/Math.sqrt(3)', valor: '127' },
    { secao: 'ligacoes', expr: '127/12.7', valor: '10' },
    { secao: 'ligacoes', expr: '220/22', valor: '10' },
    { secao: 'ligacoes', expr: 'Math.sqrt(3)*10', valor: '17,3' },
    { secao: 'ligacoes', expr: '10+Math.sqrt(3)*10', valor: '27,3' },
    { secao: 'potencia3f', expr: '60*1000', valor: '60.000' },
    { secao: 'potencia3f', expr: '60*Math.sqrt(3)*1000/(Math.sqrt(3)*400)', valor: '150' },
    { secao: 'potencia3f', expr: '150/Math.sqrt(3)', valor: '86,6' },
    { secao: 'potencia3f', expr: '50*Math.sqrt(3)', valor: '86,6' },
    { secao: 'potencia3f', expr: '60*Math.sqrt(3)*0.8', valor: '83,1' },
    { secao: 'potencia3f', expr: '15/0.9', valor: '16,7' },
    { secao: 'potencia3f', expr: '15000/(Math.sqrt(3)*380*0.85*0.9)', valor: '29,8' },
    { secao: 'neutro', expr: '127**2/100', valor: '161' },
    { secao: 'neutro', expr: '127**2/1000', valor: '16,1' },
    { secao: 'neutro', expr: '220*(127**2/100)/(127**2/100+127**2/1000)', valor: '200' },
    { secao: 'neutro', expr: '220-200', valor: '20' },
    { secao: 'neutro', expr: '220/(127**2/100+127**2/1000)', valor: '1,24' },
    { secao: 'neutro', expr: '200**2/(127**2/100)', valor: '248' },
  ],
};

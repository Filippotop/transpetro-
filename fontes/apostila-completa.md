# APOSTILA — CONHECIMENTOS ESPECÍFICOS
## Transpetro 2026 · Edital nº 03 · Ênfase 8: MANUTENÇÃO – ELÉTRICA

**Banca:** Fundação Cesgranrio
**Prova:** 29/11/2026 · 4 horas · 60 questões (40 Específicas + 20 Gerais)
**Corte:** eliminado quem tirar menos de 50% nas Específicas, menos de 50% nas Gerais, ou zero em qualquer matéria das Gerais.
**Base:** Anexo IV do Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO-2026.3 (conteúdo integral, na ordem oficial).

---

### Como usar esta apostila

Os 10 blocos abaixo são exatamente os 10 itens do Anexo IV, na ordem em que o edital os lista. Nada aqui está fora do programa oficial, e nada do programa oficial ficou de fora.

Cada bloco tem: **resumo teórico** → **exercícios no estilo Cesgranrio** (5 alternativas) → **gabarito comentado**.

Uma observação estratégica antes de começar: a nota das Específicas é o que define o ranqueamento inicial (item 7.1.2, alínea "c" do edital). Só passam para a soma com as Gerais os candidatos ranqueados até 2× o número de vagas + cadastro de reserva. Ou seja: **as Específicas são o filtro; as Gerais decidem a classificação final.** Não dá para negligenciar nenhuma das duas, mas é nas Específicas que você é cortado.

---

# BLOCO 1 — SIMBOLOGIA E DIAGRAMAS ELÉTRICOS

*(1.1 Diagramas unifilares e trifilares; 1.2 Esquemas de acionamento e controle em equipamentos elétricos)*

## 1.1 Diagramas unifilares e trifilares

**Diagrama unifilar** representa um sistema trifásico por meio de **uma única linha**, mesmo que existam três condutores. É a representação usada em projetos de distribuição, subestações e quadros de distribuição, porque privilegia a visão global do sistema em detrimento do detalhe de cada fase.

O que o unifilar mostra: fonte de alimentação, transformadores, barramentos, disjuntores, chaves seccionadoras, cargas, e as características nominais (tensão, corrente, potência, seção dos condutores).

O que o unifilar **não** mostra: como cada fase é individualmente conectada, sequência de fases, detalhes de ligação interna dos equipamentos.

**Diagrama trifilar** (ou multifilar) representa **cada condutor individualmente** — as três fases, o neutro e o condutor de proteção aparecem separadamente. É usado quando o detalhe da ligação importa: painéis de comando, esquemas de proteção, diagramas de ligação de motores, circuitos de medição.

| | Unifilar | Trifilar |
|---|---|---|
| Representação | 1 linha para 3 fases | cada condutor separado |
| Uso típico | visão geral, subestação, QGBT | detalhe de ligação, painéis, proteção |
| Vantagem | clareza, simplicidade | precisão de conexão |
| Limitação | omite detalhe por fase | polui em sistemas grandes |

**Simbologia básica (ABNT NBR 5444 / IEC 60617):** transformador (dois círculos entrelaçados), disjuntor (contato com quadrado ou "x"), seccionadora (contato com traço inclinado, sem câmara de extinção), fusível (retângulo atravessado por linha), motor (círculo com "M"), gerador (círculo com "G"), terra (três traços decrescentes).

## 1.2 Esquemas de acionamento e controle

Em painéis industriais, separa-se sempre **circuito de potência** de **circuito de comando**:

- **Circuito de potência (força):** conduz a corrente da carga. Contém disjuntor-motor ou fusíveis, contatos principais do contator, relé de sobrecarga (bimetálico) e o motor. Desenhado com traço mais grosso.
- **Circuito de comando (controle):** conduz corrente baixa. Contém botoeiras, contatos auxiliares, bobina do contator, sinalização. Frequentemente em tensão reduzida (24 V, 110 V) para segurança do operador.

**Contator:** chave eletromagnética. Quando a bobina (A1-A2) é energizada, o núcleo é atraído e fecha os contatos principais (1-2, 3-4, 5-6, numeração ímpar/par) e comuta os contatos auxiliares.

- **Contato NA (normalmente aberto)** — numeração terminada em **3-4** (ex.: 13-14). Fecha quando o contator é acionado.
- **Contato NF (normalmente fechado)** — numeração terminada em **1-2** (ex.: 11-12). Abre quando o contator é acionado.

**Selo (ou retenção):** contato auxiliar NA do próprio contator ligado em paralelo com a botoeira de partida (S1, tipo pulso). Ao soltar a botoeira, o selo mantém a bobina alimentada. É o que faz a partida ser "com retenção" em vez de "por impulso". Sem selo, o motor pararia ao soltar o botão.

**Intertravamento:** contatos NF de um contator inseridos em série com a bobina do outro, impedindo que ambos fechem simultaneamente. Essencial na **reversão** (evita curto entre fases) e na **partida estrela-triângulo** (evita fechar Y e Δ juntos).

**Partidas mais cobradas:**

- **Direta:** contator único. Corrente de partida de 6 a 8× a nominal. Só para motores pequenos ou rede robusta.
- **Estrela-triângulo:** parte em Y (tensão de fase reduzida a 1/√3) e comuta para Δ. Reduz corrente e conjugado de partida a **1/3**. Exige motor com 6 terminais acessíveis e carga de partida leve.
- **Reversão:** dois contatores com duas fases invertidas entre si, obrigatoriamente intertravados.
- **Soft-starter:** partida eletrônica, rampa de tensão. Reduz solicitação mecânica.
- **Inversor de frequência:** controla velocidade variando f e V (mantendo V/f constante para preservar o fluxo).

---

## Exercícios — Bloco 1

**1.** Um técnico analisa a documentação de uma subestação e precisa identificar rapidamente a topologia geral do sistema, os transformadores instalados e as cargas alimentadas, sem necessidade de detalhar a conexão individual de cada fase. O tipo de diagrama mais adequado e sua característica definidora são, respectivamente:

(A) trifilar — representa cada condutor separadamente
(B) unifilar — representa o sistema trifásico por uma única linha
(C) funcional — representa a sequência lógica de operação
(D) isométrico — representa o traçado espacial da instalação
(E) de blocos — representa apenas as funções, sem componentes

**2.** Em um circuito de comando para partida direta de motor trifásico, a botoeira de partida S1 é do tipo pulso (retorna à posição de repouso quando solta). Para que o motor permaneça funcionando após o operador soltar S1, deve-se:

(A) ligar um contato NF do contator em série com S1
(B) ligar um contato NA do contator em paralelo com S1
(C) substituir S1 por uma botoeira do tipo trava
(D) ligar o relé de sobrecarga em paralelo com a bobina
(E) inserir um contato NF do relé térmico em paralelo com S1

**3.** Na partida estrela-triângulo de um motor de indução trifásico, o intertravamento entre os contatores de estrela e de triângulo tem por finalidade principal:

(A) reduzir o conjugado de partida a um terço
(B) permitir a inversão do sentido de rotação
(C) impedir o fechamento simultâneo dos dois contatores, evitando curto-circuito entre fases
(D) garantir que o motor parta sempre em triângulo
(E) proteger o motor contra sobrecarga prolongada

## Gabarito comentado — Bloco 1

**1 — (B).** O unifilar é justamente a representação que sintetiza as três fases em uma linha única, sendo o padrão para visão global de subestações. **(A)** descreve corretamente o trifilar, mas ele é o oposto do que se pediu (detalhamento, não visão geral). **(D)** isométrico é de tubulação, não de elétrica. **(C)** e **(E)** não correspondem a tipos padronizados nesse contexto.

**2 — (B).** É a definição de **selo/retenção**: contato auxiliar NA do próprio contator em paralelo com a botoeira de partida, mantendo o caminho de corrente para a bobina após S1 abrir. **(A)** é errado porque um NF em série abriria o circuito ao acionar o contator, desligando-o imediatamente (o motor "piscaria"). **(C)** funcionaria eletricamente, mas viola a boa prática de segurança: botoeira com trava não permite desligamento por falta de tensão nem parada de emergência confiável. **(E)** o contato NF do relé térmico vai em **série**, para desligar em sobrecarga; em paralelo ele anularia a proteção.

**3 — (C).** Se os dois contatores fecharem juntos, as pontas do enrolamento ligadas em estrela ficam simultaneamente conectadas em triângulo — o que estabelece curto-circuito franco entre fases. Por isso o intertravamento é obrigatório, elétrico e frequentemente também mecânico. **(A)** é uma consequência da ligação em estrela em si, não do intertravamento. **(B)** é função da reversão, outro esquema. **(D)** é o inverso: parte em estrela. **(E)** é função do relé de sobrecarga.

---

# BLOCO 2 — CIRCUITOS ELÉTRICOS CC E CA

*(2.1 CC; 2.2 CA; 2.3 Operações com corrente e tensão senoidais; 2.4 Valores médio, eficaz e de pico; 2.5 Leis de Kirchhoff e Teoremas de Thévenin e Norton)*

## 2.1–2.2 Fundamentos

**Lei de Ohm:** V = R · I

**Associação de resistores:**
- Série: R_eq = R₁ + R₂ + ... (mesma corrente, tensões se somam)
- Paralelo: 1/R_eq = 1/R₁ + 1/R₂ + ... (mesma tensão, correntes se somam)
- Dois em paralelo: R_eq = (R₁·R₂)/(R₁+R₂)
- n resistores **iguais** em paralelo: R_eq = R/n

**Em CC, regime permanente:** o capacitor se comporta como **circuito aberto** (corrente nula) e o indutor como **curto-circuito** (queda de tensão nula). Esse é um ponto clássico de pegadinha.

## 2.3 Grandezas senoidais

v(t) = V_p · sen(ωt + φ), onde ω = 2πf (rad/s) e f em Hz.

**Comportamento dos elementos em CA:**

| Elemento | Reatância/Impedância | Defasagem corrente × tensão |
|---|---|---|
| Resistor | R | em fase (0°) |
| Indutor | X_L = 2πfL | corrente **atrasa** 90° |
| Capacitor | X_C = 1/(2πfC) | corrente **adianta** 90° |

Mnemônico consagrado: **"CIVIL"** — no **C**apacitor, o **I** vem antes do **V**; o **V** vem antes do **I** no **L** (indutor).

**Impedância:** Z = R + j(X_L − X_C), com módulo |Z| = √(R² + (X_L − X_C)²) e ângulo φ = arctg[(X_L − X_C)/R].

**Ressonância série:** ocorre quando X_L = X_C. Nesse ponto Z = R (mínima), a corrente é máxima e o fator de potência é unitário. f_r = 1/(2π√(LC)).

## 2.4 Valor médio, eficaz e de pico

- **Valor de pico (V_p):** amplitude máxima.
- **Valor de pico a pico:** 2·V_p.
- **Valor médio de uma senoide completa: ZERO** (áreas positiva e negativa se cancelam). Para meia onda ou onda retificada, V_méd = 2V_p/π ≈ 0,637·V_p.
- **Valor eficaz (RMS):** para senoide pura, **V_ef = V_p/√2 ≈ 0,707·V_p**.

O valor eficaz é o valor CC que produziria a **mesma dissipação de potência** em um resistor. É por isso que "220 V" da rede é valor eficaz — o pico é 220·√2 ≈ 311 V. Multímetros comuns indicam eficaz.

## 2.5 Kirchhoff, Thévenin e Norton

**1ª Lei de Kirchhoff (LKC — Lei dos Nós):** a soma das correntes que entram em um nó é igual à soma das que saem. Σ I = 0. Decorre da conservação da carga.

**2ª Lei de Kirchhoff (LKT — Lei das Malhas):** a soma algébrica das tensões em um percurso fechado é nula. Σ V = 0. Decorre da conservação da energia.

**Teorema de Thévenin:** qualquer rede linear vista por dois terminais pode ser substituída por uma **fonte de tensão V_th em série com uma resistência R_th**.
- V_th = tensão **em aberto** entre os terminais (retirada a carga).
- R_th = resistência vista dos terminais com as fontes **desativadas** (fontes de tensão em curto, fontes de corrente em aberto).

**Teorema de Norton:** equivalente dual — **fonte de corrente I_N em paralelo com R_N**.
- I_N = corrente de **curto-circuito** entre os terminais.
- R_N = R_th (mesma resistência).
- Relação: **V_th = I_N · R_th**

**Máxima transferência de potência:** ocorre quando R_carga = R_th. Nessa condição, o rendimento é de apenas 50%.

---

## Exercícios — Bloco 2

**4.** A tensão em uma tomada residencial é medida com um multímetro, que indica 127 V. Os valores de pico e o valor médio dessa tensão senoidal são, respectivamente, em volts, aproximadamente:

(A) 127 e 127
(B) 180 e 0
(C) 180 e 127
(D) 90 e 0
(E) 254 e 127

**5.** Em um circuito RLC série alimentado em 60 Hz, mediu-se R = 8 Ω, X_L = 12 Ω e X_C = 6 Ω. O módulo da impedância do circuito, em ohms, é:

(A) 6
(B) 8
(C) 10
(D) 14
(E) 26

**6.** Um técnico precisa determinar o equivalente de Thévenin de uma rede linear vista por dois terminais A-B. Para obter a resistência de Thévenin, ele deve:

(A) medir a resistência com a carga conectada e as fontes ativas
(B) curto-circuitar A-B e medir a corrente resultante
(C) desativar as fontes independentes — tensão em curto e corrente em aberto — e calcular a resistência vista de A-B
(D) desativar as fontes independentes — tensão em aberto e corrente em curto — e calcular a resistência vista de A-B
(E) dividir a tensão de circuito aberto pela resistência da carga

## Gabarito comentado — Bloco 2

**4 — (B).** O multímetro indica **valor eficaz**, então V_ef = 127 V. O pico é V_p = V_ef·√2 = 127 × 1,414 ≈ **180 V**. O valor médio de uma senoide **completa** é **zero**, pois os semiciclos positivo e negativo se cancelam. **(A)**, **(C)** e **(E)** erram ao atribuir valor médio não nulo. **(D)** inverte a relação, dividindo por √2 em vez de multiplicar.

**5 — (C).** |Z| = √(R² + (X_L − X_C)²) = √(8² + (12−6)²) = √(64 + 36) = √100 = **10 Ω**. **(E)** é o erro de somar tudo aritmeticamente (8+12+6). **(D)** é o erro de somar R com a reatância resultante sem elevar ao quadrado (8+6). **(A)** considera só a reatância líquida; **(B)**, só a resistência.

**6 — (C).** Esta é a regra padrão de desativação: fonte de tensão ideal desativada vira **curto-circuito** (V = 0), e fonte de corrente ideal desativada vira **circuito aberto** (I = 0). **(D)** é a inversão exata dessa regra — alternativa clássica da Cesgranrio para punir memorização frouxa. **(B)** descreve a obtenção da corrente de **Norton**, não da resistência. **(A)** e **(E)** não correspondem ao procedimento.

---

# BLOCO 3 — ENERGIA E POTÊNCIA ELÉTRICA

*(3.1 Conceito, cálculos e medidas; 3.2 Potência ativa, reativa e aparente; 3.3 Fator de potência e sua correção)*

## 3.1 Conceitos

**Potência (P):** taxa de transferência de energia. Unidade: watt (W).
**Energia (E):** E = P · t. Unidade prática de faturamento: **kWh**.

Em CC: P = V·I = R·I² = V²/R.

## 3.2 O triângulo de potências (CA)

| Potência | Símbolo | Unidade | Significado |
|---|---|---|---|
| **Ativa** | P | W (kW) | efetivamente convertida em trabalho/calor |
| **Reativa** | Q | var (kvar) | trocada com campos magnéticos/elétricos, não produz trabalho útil |
| **Aparente** | S | VA (kVA) | total fornecido pela fonte; base do dimensionamento |

Relações:
- **S = √(P² + Q²)**
- **P = S · cos φ**
- **Q = S · sen φ**
- **cos φ = P/S** ← este é o **fator de potência**

Monofásico: P = V·I·cos φ
**Trifásico: P = √3 · V_L · I_L · cos φ**

## 3.3 Fator de potência

FP baixo significa que grande parte da corrente circula sem produzir trabalho útil. Consequências: maior corrente para a mesma potência ativa → maiores perdas Joule (RI²), maiores quedas de tensão, subutilização de transformadores e condutores, e **cobrança de excedente de reativo** pela concessionária.

**Referência regulatória:** o FP de referência mínimo é **0,92** (indutivo ou capacitivo), conforme regulação da ANEEL. Abaixo disso, há faturamento de energia reativa excedente.

**Causa dominante do FP baixo na indústria:** motores de indução operando **a vazio ou com pouca carga**. Um motor subcarregado consome quase a mesma reativa de magnetização, mas pouca ativa — despencando o cos φ.

**Correção:** instalar **capacitores** (fornecem reativo capacitivo que compensa o indutivo).

Fórmula essencial:
**Q_C = P · (tg φ₁ − tg φ₂)**

onde φ₁ é o ângulo do FP original e φ₂ o do FP desejado.

Tipos de correção: **individual** (junto à carga — melhor tecnicamente, alivia toda a instalação), **por grupo**, e **geral** (no QGBT — mais barata, mas não alivia os circuitos internos).

---

## Exercícios — Bloco 3

**7.** Uma instalação industrial apresenta potência ativa de 80 kW e fator de potência 0,8 indutivo. A potência aparente e a potência reativa dessa instalação valem, respectivamente:

(A) 64 kVA e 48 kvar
(B) 100 kVA e 60 kvar
(C) 100 kVA e 80 kvar
(D) 128 kVA e 60 kvar
(E) 80 kVA e 64 kvar

**8.** Considere uma carga trifásica equilibrada alimentada em 380 V (tensão de linha), que absorve corrente de linha de 50 A com fator de potência 0,80. A potência ativa consumida, em kW, é aproximadamente:

(A) 15,2
(B) 26,3
(C) 30,4
(D) 45,6
(E) 52,6

**9.** Um técnico de manutenção observa que o fator de potência de um setor da planta caiu significativamente durante o turno noturno, quando a produção é reduzida, embora os motores permaneçam ligados. A explicação técnica mais consistente e a medida corretiva mais adequada são, respectivamente:

(A) os motores operam sobrecarregados; instalar reatores
(B) os motores operam com carga muito reduzida, mantendo a reativa de magnetização com pouca potência ativa; instalar banco de capacitores e avaliar o desligamento de motores ociosos
(C) a tensão da rede aumentou; instalar transformador abaixador
(D) a frequência da rede caiu; instalar inversor de frequência
(E) os condutores estão subdimensionados; aumentar a seção dos cabos

## Gabarito comentado — Bloco 3

**7 — (B).** S = P/cos φ = 80/0,8 = **100 kVA**. Para Q: sen φ = 0,6 (triângulo 0,8/0,6/1), logo Q = S·sen φ = 100 × 0,6 = **60 kvar**. Alternativamente, Q = √(S²−P²) = √(10000−6400) = √3600 = 60. **(A)** multiplica em vez de dividir (80×0,8). **(D)** confunde a relação de S. **(E)** troca as grandezas.

**8 — (B).** P = √3 · V_L · I_L · cos φ = 1,732 × 380 × 50 × 0,80 = **26.326 W ≈ 26,3 kW**. **(C)** é o erro de esquecer o cos φ (380×50×1,732 = 32,9 kVA — que seria a potência **aparente**, não a ativa; o valor 30,4 vem de omitir o √3 e aplicar outro caminho). **(A)** e **(D)** decorrem de omitir ou duplicar o fator √3. Atenção: a Cesgranrio adora incluir a alternativa que corresponde à **potência aparente** quando pede a **ativa**.

**9 — (B).** Motor de indução subcarregado é a causa clássica: a corrente de magnetização (reativa) permanece praticamente constante, enquanto a componente ativa cai com a carga — logo cos φ = P/S despenca. A correção passa por banco de capacitores e, sobretudo, por eliminar a operação ociosa. **(A)** inverte o diagnóstico (sobrecarga tende a **aumentar** o FP). **(C)**, **(D)** e **(E)** apresentam causas que não explicam a correlação com a redução de produção.

---

# BLOCO 4 — CIRCUITOS MONOFÁSICOS E TRIFÁSICOS

*(4.1 Circuitos monofásicos e trifásicos; 4.2 Tensão de linha, tensão de fase e ligações estrela e triângulo)*

## 4.1 Sistemas polifásicos

Sistema trifásico: três tensões de mesma amplitude e frequência, defasadas de **120°** entre si. Vantagens sobre o monofásico: menor volume de cobre para a mesma potência, potência instantânea constante (menor vibração em máquinas), e possibilidade de campo magnético girante — que é o que permite o motor de indução partir sozinho.

**Sistema equilibrado:** cargas iguais nas três fases. Nesse caso, a corrente no neutro é **nula**.

## 4.2 Estrela (Y) e Triângulo (Δ) — o núcleo do bloco

**Tensão de fase (V_f):** entre fase e neutro (ou sobre cada elemento da carga).
**Tensão de linha (V_L):** entre duas fases.
**Corrente de fase (I_f):** no elemento da carga.
**Corrente de linha (I_L):** no condutor que alimenta.

### Ligação ESTRELA (Y)
- **V_L = √3 · V_f**
- **I_L = I_f**
- Possui ponto neutro acessível.
- Exemplo prático: rede 220/127 V (V_L = 220, V_f = 127, pois 127×1,732 ≈ 220) e rede 380/220 V (380 = 220×1,732).

### Ligação TRIÂNGULO (Δ)
- **V_L = V_f**
- **I_L = √3 · I_f**
- Não possui neutro.

**Regra de memorização:** na estrela, o √3 está na **tensão**; no triângulo, o √3 está na **corrente**. Em ambos, a potência é **P = √3 · V_L · I_L · cos φ**.

**Consequência prática decisiva:** para a mesma rede, uma carga ligada em triângulo consome **três vezes** a potência que consumiria em estrela. É exatamente esse fato que fundamenta a partida estrela-triângulo (Bloco 1): partindo em Y, a corrente e o conjugado caem a 1/3.

**Motor de 6 terminais:** um motor 220/380 V liga-se em **triângulo em 220 V** e em **estrela em 380 V** — em ambos os casos, cada bobina recebe 220 V, sua tensão nominal.

---

## Exercícios — Bloco 4

**10.** Em um sistema trifásico equilibrado ligado em estrela, mede-se a tensão entre duas fases igual a 380 V. A tensão entre fase e neutro, em volts, é aproximadamente:

(A) 110
(B) 127
(C) 190
(D) 220
(E) 658

**11.** Uma carga trifásica equilibrada é ligada em triângulo e apresenta corrente de fase de 20 A. A corrente de linha, em ampères, é aproximadamente:

(A) 11,5
(B) 20
(C) 34,6
(D) 60
(E) 69,3

**12.** Um motor de indução trifásico com 6 terminais acessíveis, de placa 220/380 V, será instalado em uma rede cuja tensão de linha é 380 V. A ligação correta e a justificativa técnica são:

(A) triângulo, porque assim cada bobina recebe 380 V
(B) estrela, porque assim cada bobina recebe 380 V
(C) triângulo, porque assim cada bobina recebe 220 V
(D) estrela, porque assim cada bobina recebe 220 V, sua tensão nominal
(E) indiferente, pois o motor é bitensão e se adapta automaticamente

## Gabarito comentado — Bloco 4

**10 — (D).** Em estrela, V_L = √3·V_f, logo V_f = V_L/√3 = 380/1,732 ≈ **219,4 ≈ 220 V**. É a rede 380/220 V, padrão em boa parte do Brasil. **(C)** é o erro de dividir por 2 em vez de √3. **(E)** multiplica em vez de dividir. **(B)** corresponde à rede 220/127, outra combinação.

**11 — (C).** Em triângulo, I_L = √3·I_f = 1,732 × 20 ≈ **34,6 A**. **(A)** divide em vez de multiplicar (erro de aplicar a regra da estrela). **(D)** multiplica por 3 em vez de √3. **(B)** aplica a relação da estrela (I_L = I_f), que é justamente a errada aqui.

**12 — (D).** A menor tensão da placa (220 V) é a **tensão nominal de cada bobina**. Em rede de 380 V, a ligação estrela faz cada bobina receber 380/√3 ≈ 220 V — exatamente o nominal. **(C)** erra a ligação: em triângulo a 380 V, cada bobina receberia os 380 V integrais, resultando em sobretensão de 73% e queima do enrolamento. **(A)** e **(B)** trocam a justificativa. **(E)** é falso: motor bitensão exige **religação manual** dos terminais na caixa de ligação.

---

# BLOCO 5 — MÁQUINAS ELÉTRICAS

*(5.1 Eletromagnetismo aplicado; 5.2 Funcionamento e aplicação; 5.3 Transformadores; 5.4 Máquinas síncronas; 5.5 Máquinas CC e motores de indução; 5.6 Dispositivos de proteção de BT; 5.7 Acionamentos e comando de motores)*

## 5.1 Eletromagnetismo aplicado

**Lei de Faraday:** e = −N·(dΦ/dt) — tensão induzida proporcional à variação do fluxo magnético.
**Lei de Lenz:** o efeito da corrente induzida se opõe à causa que a originou (sinal negativo acima).
**Força em condutor:** F = B·I·L·sen θ.

## 5.3 Transformadores

Máquina **estática** que transfere energia entre circuitos por acoplamento magnético, alterando níveis de tensão **sem alterar a frequência**.

**Relação de transformação:**
**V₁/V₂ = N₁/N₂ = I₂/I₁ = a**

(a corrente é inversamente proporcional às espiras — se a tensão sobe, a corrente desce, pois a potência se conserva, descontadas as perdas.)

**Perdas:**
- **No ferro (a vazio):** histerese + Foucault (correntes parasitas). Praticamente **constantes**, independem da carga. Mitigadas por chapas laminadas e isoladas de aço-silício. Determinadas pelo **ensaio a vazio**.
- **No cobre (Joule):** R·I² nos enrolamentos. **Variam com o quadrado da carga**. Determinadas pelo **ensaio de curto-circuito**.

**Rendimento máximo:** ocorre quando perdas no ferro = perdas no cobre.

**Autotransformador:** enrolamento único com derivação; menor, mais barato e mais eficiente, porém **sem isolação galvânica** entre primário e secundário — o que restringe seu uso por segurança.

## 5.4 Máquinas síncronas

Giram **exatamente** na velocidade síncrona, sem escorregamento. Rotor alimentado em CC (excitação).

**Velocidade síncrona: n_s = 120·f / p** (n_s em rpm, f em Hz, p = número de **polos**)

Exemplos em 60 Hz: 2 polos → 3600 rpm; 4 polos → 1800 rpm; 6 polos → 1200 rpm; 8 polos → 900 rpm.

**Aplicações:** geradores (praticamente toda a geração elétrica), e o **motor síncrono superexcitado** operando como **compensador síncrono** — fornecendo reativo capacitivo e corrigindo o fator de potência da planta. Desvantagem: não parte sozinho.

## 5.5 Motor de indução (assíncrono)

É o motor mais usado na indústria — robusto, barato, baixa manutenção (o gaiola de esquilo não tem escovas nem comutador).

**Escorregamento:** **s = (n_s − n)/n_s**, geralmente expresso em %. Valores típicos: 1% a 5% em plena carga.

O rotor **nunca** atinge n_s: se atingisse, não haveria variação de fluxo, não haveria tensão induzida, nem corrente, nem conjugado. É o motivo pelo qual se chama **assíncrono**.

**Tipos:** rotor gaiola de esquilo (dominante) e rotor bobinado (anéis coletores, permite inserir resistência rotórica para aumentar conjugado de partida).

**Corrente de partida:** 6 a 8 vezes a nominal — daí a necessidade dos métodos de partida do Bloco 1.

## 5.5 (cont.) Máquinas de corrente contínua

Possuem **comutador e escovas** (maior manutenção). Excelente controle de velocidade — historicamente sua grande vantagem, hoje disputada pelos inversores de frequência aplicados a motores de indução.

- **Série:** conjugado de partida elevadíssimo; **não pode operar a vazio** (dispara, podendo se autodestruir). Usado em tração.
- **Paralelo (shunt):** velocidade praticamente constante.
- **Composto:** características intermediárias.

## 5.6 Dispositivos de proteção de baixa tensão

| Dispositivo | Protege contra | Observação |
|---|---|---|
| **Fusível** | curto-circuito (principalmente) | atuação única, precisa ser substituído |
| **Disjuntor termomagnético** | **térmico** → sobrecarga; **magnético** → curto-circuito | rearmável |
| **Relé de sobrecarga (bimetálico)** | sobrecarga do motor | não protege contra curto |
| **DR (diferencial-residual)** | **corrente de fuga / choque elétrico** | 30 mA para proteção de pessoas |
| **DPS** | surtos/sobretensões transitórias | descargas atmosféricas e manobras |

Ponto crítico: **o DR não protege contra sobrecarga nem curto-circuito** — protege pessoas contra choque e a instalação contra fuga à terra. E **o disjuntor não protege contra choque** por contato direto entre fase e neutro. São funções complementares, não substituíveis.

## 5.7 Acionamentos

**Inversor de frequência:** varia a velocidade do motor de indução alterando a frequência. Mantém a relação **V/f constante** para preservar o fluxo magnético e o conjugado. Estrutura: retificador → barramento CC (link DC) → inversor (IGBTs) com modulação PWM.

**Soft-starter:** controla apenas a tensão de partida por rampa (tiristores). Não controla velocidade em regime.

---

## Exercícios — Bloco 5

**13.** Um motor de indução trifásico de 6 polos é alimentado em 60 Hz e opera, em plena carga, a 1.164 rpm. A velocidade síncrona e o escorregamento valem, respectivamente:

(A) 1.200 rpm e 3,0%
(B) 1.200 rpm e 6,0%
(C) 1.800 rpm e 3,0%
(D) 1.800 rpm e 35,3%
(E) 3.600 rpm e 67,7%

**14.** Em um transformador monofásico ideal, o primário possui 1.000 espiras e é alimentado em 380 V, enquanto o secundário possui 200 espiras. Se a corrente no secundário for de 25 A, a tensão no secundário e a corrente no primário valem, respectivamente:

(A) 76 V e 5 A
(B) 76 V e 125 A
(C) 1.900 V e 5 A
(D) 1.900 V e 125 A
(E) 380 V e 25 A

**15.** Durante uma inspeção, um técnico verifica que o quadro de distribuição possui disjuntores termomagnéticos corretamente dimensionados, porém nenhum dispositivo DR instalado. A consequência técnica dessa ausência é que a instalação:

(A) fica desprotegida contra curto-circuito
(B) fica desprotegida contra sobrecarga nos condutores
(C) fica desprotegida contra correntes de fuga à terra, comprometendo a proteção das pessoas contra choque elétrico
(D) fica desprotegida contra sobretensões de origem atmosférica
(E) não sofre qualquer prejuízo, pois o disjuntor termomagnético cumpre a mesma função

**16.** As perdas no ferro de um transformador, decorrentes de histerese e correntes de Foucault, caracterizam-se por:

(A) variar com o quadrado da corrente de carga
(B) ser praticamente constantes, independentemente da carga
(C) ocorrer apenas em regime de sobrecarga
(D) ser eliminadas pelo uso de enrolamentos de cobre
(E) crescer linearmente com a corrente de carga

## Gabarito comentado — Bloco 5

**13 — (A).** n_s = 120·f/p = (120 × 60)/6 = **1.200 rpm**. s = (1200 − 1164)/1200 = 36/1200 = 0,03 = **3,0%**. **(C)** e **(D)** erram ao usar 4 polos (1.800 rpm) — atenção: o edital cobra **polos**, não pares de polos. **(B)** dobra o escorregamento.

**14 — (B).** Relação a = N₁/N₂ = 1000/200 = 5. V₂ = V₁/a = 380/5 = **76 V**. Como a corrente é **inversamente** proporcional às espiras: I₁ = I₂/a = 25/5 = 5 A... atenção, aqui é o contrário: I₁·N₁ = I₂·N₂ → I₁ = I₂·(N₂/N₁) = 25 × 0,2 = **5 A**. Portanto a resposta correta é **(A) 76 V e 5 A**. Verificação por potência: S₁ = 380 × 5 = 1.900 VA; S₂ = 76 × 25 = 1.900 VA. ✔ Confere. **Gabarito: (A).** **(B)** aplica a relação de corrente no sentido invertido. **(C)** e **(D)** tratam o transformador como elevador, invertendo a relação de espiras.

> *Nota de estudo:* sempre confira pela conservação da potência aparente (S₁ = S₂ no transformador ideal). É o método mais seguro para não errar o sentido da relação de correntes — e foi ele que resolveu a ambiguidade acima.

**15 — (C).** O DR é o único dispositivo da lista que detecta desequilíbrio entre as correntes de fase e neutro, característico de fuga à terra — inclusive através do corpo humano. Disjuntores termomagnéticos já cobrem sobrecarga **(B)** e curto **(A)**, então essas não são consequências da ausência do DR. **(D)** é função do DPS. **(E)** é o erro conceitual mais comum: as funções são complementares, não redundantes.

**16 — (B).** As perdas no ferro dependem do fluxo magnético, que por sua vez depende essencialmente da **tensão aplicada** e da frequência — ambas constantes em operação normal. Por isso são chamadas de "perdas a vazio" e são medidas justamente no ensaio a vazio. **(A)** e **(E)** descrevem as perdas no **cobre** (R·I², proporcionais ao quadrado da corrente). **(C)** é falso: existem desde a energização, mesmo sem carga. **(D)** não faz sentido físico.

---

# BLOCO 6 — SEGURANÇA E HIGIENE DO TRABALHO

*(6.1 Conceitos básicos; 6.2 EPI e EPC com ênfase em eletricidade; 6.3 Interpretação e análise de projetos elétricos)*

## 6.1 Conceitos básicos

**Perigo:** fonte com potencial de causar dano.
**Risco:** combinação da probabilidade de ocorrência com a severidade do dano.
**Incidente / quase-acidente:** evento sem lesão, mas com potencial — deve ser investigado.
**Acidente do trabalho:** evento que resulta em lesão ou doença.

**Hierarquia de controle de riscos** (ordem obrigatória de prioridade, conforme NR-01):
1. **Eliminação** do perigo
2. **Substituição** por algo menos perigoso
3. **Controles de engenharia** (EPC, isolamento, barreiras)
4. **Controles administrativos** (procedimentos, sinalização, treinamento)
5. **EPI** — sempre o **último** recurso

Essa ordem é cobrada com frequência: EPI nunca é a primeira medida.

## 6.2 EPI e EPC em eletricidade

**EPC (coletivo) — prioridade sobre o EPI:** aterramento temporário, bloqueio e etiquetagem, barreiras e invólucros, sinalização, isolamento das partes vivas, obstáculos, dispositivos de seccionamento visível.

**EPI para eletricidade:** capacete classe B (isolante), óculos de proteção, luvas isolantes de borracha (com luva de cobertura em vaqueta), calçado isolante sem componentes metálicos, **vestimenta com proteção contra arco elétrico** (tecido antichama, com ATPV adequado ao risco calculado), protetor facial contra arco, cinturão paraquedista para trabalho em altura.

Ponto de atenção: **vestimenta de algodão comum não é EPI contra arco elétrico**. E tecido sintético comum (poliéster) é proibido — funde na pele.

**Bloqueio e Etiquetagem (LOTO):** cadeado físico impedindo reenergização + etiqueta identificando o responsável. Cada trabalhador aplica seu próprio cadeado; só ele o retira.

## 6.3 Interpretação de projetos elétricos

Documentos que compõem um projeto: memorial descritivo, memorial de cálculo (dimensionamento de condutores, queda de tensão, curto-circuito), diagrama unifilar, plantas baixas com pontos e circuitos, quadro de cargas, ART/TRT do responsável técnico.

Na leitura de plantas, atenção a: identificação de circuitos, seção dos condutores, tipo de eletroduto, altura de tomadas e interruptores, e a correspondência entre a planta e o quadro de cargas.

---

## Exercícios — Bloco 6

**17.** Na análise de risco de uma atividade de manutenção elétrica, um técnico propõe as seguintes medidas: fornecer luvas isolantes, instalar barreira física isolante, treinar a equipe no procedimento e substituir o equipamento por modelo com partes vivas totalmente enclausuradas. Considerando a hierarquia de controle de riscos, a ordem de prioridade correta dessas medidas é:

(A) luvas → treinamento → barreira → substituição
(B) treinamento → luvas → substituição → barreira
(C) substituição → barreira → treinamento → luvas
(D) barreira → substituição → luvas → treinamento
(E) luvas → barreira → substituição → treinamento

**18.** Sobre a vestimenta de proteção utilizada em atividades com risco de arco elétrico, é correto afirmar que:

(A) o algodão comum é adequado, por ser um material natural
(B) o poliéster é recomendado por sua resistência mecânica
(C) deve ser confeccionada em tecido antichama, com ATPV compatível com a energia incidente calculada para a tarefa
(D) é dispensável quando o trabalhador utiliza luvas isolantes
(E) é exigida apenas em instalações acima de 1.000 V

## Gabarito comentado — Bloco 6

**17 — (C).** A hierarquia manda começar pela **substituição** (elimina o perigo na fonte, pois enclausurar as partes vivas remove a exposição), seguida de **controle de engenharia** (barreira física), depois **controle administrativo** (treinamento) e, por último, **EPI** (luvas). Todas as demais alternativas colocam o EPI antes de medidas coletivas — exatamente o erro conceitual que a questão testa.

**18 — (C).** A vestimenta deve ser antichama e ter **ATPV** (Arc Thermal Performance Value) igual ou superior à energia incidente estimada no estudo de arco elétrico. **(A)** é a pegadinha clássica: algodão comum queima e adere à pele; só o algodão **tratado com retardante de chama** é aceitável. **(B)** é grave: sintéticos comuns fundem sobre a pele, agravando a lesão. **(D)** confunde proteções complementares. **(E)** é falso — o risco de arco existe e é frequentemente severo em baixa tensão.

---

# BLOCO 7 — MEDIDAS ELÉTRICAS

*(7.1 Fundamentos; 7.2 Grandezas elétricas, magnéticas e SI; 7.3 Instrumentos de medição e testes: corrente, tensão, potência e isolação; 7.4 Retificadores, baterias e no-breaks)*

## 7.1–7.2 Grandezas e unidades (SI)

| Grandeza | Símbolo | Unidade |
|---|---|---|
| Corrente | I | ampère (A) — **unidade de base do SI** |
| Tensão | V | volt (V) |
| Resistência | R | ohm (Ω) |
| Potência | P | watt (W) |
| Energia | E | joule (J); prática: kWh |
| Carga | Q | coulomb (C) |
| Capacitância | C | farad (F) |
| Indutância | L | henry (H) |
| Fluxo magnético | Φ | weber (Wb) |
| Densidade de fluxo | B | tesla (T) |
| Frequência | f | hertz (Hz) |

Prefixos: n (10⁻⁹), µ (10⁻⁶), m (10⁻³), k (10³), M (10⁶), G (10⁹).

## 7.3 Instrumentos

| Instrumento | Mede | Ligação |
|---|---|---|
| **Voltímetro** | tensão | **paralelo** com a carga; alta impedância interna |
| **Amperímetro** | corrente | **série** com o circuito; baixíssima impedância |
| **Alicate amperímetro** | corrente | **abraçando um único condutor**, sem interromper o circuito |
| **Wattímetro** | potência ativa | bobina de corrente em série + bobina de tensão em paralelo |
| **Ohmímetro** | resistência | circuito **desenergizado** |
| **Megôhmetro (megger)** | **resistência de isolamento** | aplica alta tensão CC (500/1000 V), circuito desenergizado |
| **Terrômetro** | resistência de aterramento | método da queda de potencial |

Erros clássicos que a banca explora:
- Ligar amperímetro em **paralelo** → curto-circuito, destruição do instrumento.
- Ligar voltímetro em série → leitura próxima de zero e circuito praticamente aberto.
- Abraçar **dois condutores** (fase e neutro) com o alicate → leitura zero em circuito equilibrado, pois as correntes se anulam. Esse mesmo princípio, aliás, é o de funcionamento do **DR**.
- Usar megôhmetro em circuito energizado ou com equipamentos eletrônicos conectados → risco e dano.

**Medição de potência trifásica — Método dos Dois Wattímetros (Aron):** permite medir potência trifásica em sistema a **três fios** (com ou sem equilíbrio) usando apenas dois wattímetros. P_total = W₁ + W₂.

## 7.4 Retificadores, baterias e no-breaks

**Retificador:** converte CA em CC. Meia onda (1 diodo, V_méd = V_p/π), onda completa em ponte (4 diodos, V_méd = 2V_p/π). O capacitor de filtro reduz a ondulação (ripple).

**Baterias:** chumbo-ácido (estacionárias, VRLA), níquel-cádmio, íon-lítio. Capacidade em **Ah**. Autonomia ≈ capacidade (Ah) / corrente de descarga (A), com correções pelo efeito Peukert.

**No-break (UPS):**
- **Standby (off-line):** alimenta pela rede; comuta para bateria na falta. Tempo de transferência não nulo.
- **Interativo (line-interactive):** possui estabilizador; corrige variações de tensão sem recorrer à bateria.
- **On-line (dupla conversão):** a carga é **sempre** alimentada pelo inversor (CA→CC→CA). **Tempo de transferência zero** e isolamento total dos distúrbios da rede. É o tipo indicado para cargas críticas — sistemas de controle, instrumentação, SDCD.

---

## Exercícios — Bloco 7

**19.** Um técnico precisa medir a corrente que circula em um motor em funcionamento, sem desligar o equipamento nem interromper o circuito. O instrumento adequado e o procedimento correto são:

(A) amperímetro convencional, ligado em paralelo com o motor
(B) voltímetro, ligado em série com um dos condutores
(C) alicate amperímetro, abraçando simultaneamente os três condutores de fase
(D) alicate amperímetro, abraçando um único condutor por vez
(E) megôhmetro, aplicado entre fase e terra

**20.** A resistência de isolamento dos enrolamentos de um motor deve ser verificada durante a manutenção preventiva. O instrumento apropriado e a condição obrigatória para o ensaio são, respectivamente:

(A) ohmímetro comum, com o motor energizado
(B) megôhmetro, com o motor energizado
(C) megôhmetro, com o circuito desenergizado e o motor desconectado da rede
(D) alicate amperímetro, com o motor em carga nominal
(E) wattímetro, com o motor a vazio

## Gabarito comentado — Bloco 7

**19 — (D).** O alicate amperímetro mede por indução do campo magnético, sem necessidade de abrir o circuito — exatamente o que a situação exige. Deve abraçar **um** condutor. **(C)** é o erro decisivo: abraçando os três condutores de um sistema equilibrado, a soma vetorial das correntes é zero e a leitura será nula. **(A)** provocaria curto-circuito. **(B)** é conceitualmente incorreto em ambos os aspectos. **(E)** mede isolamento, não corrente, e exige circuito desenergizado.

**20 — (C).** O megôhmetro aplica tensão contínua elevada (tipicamente 500 V ou 1.000 V) para avaliar a integridade do isolamento, e por isso exige **circuito completamente desenergizado e isolado da rede** — tanto por segurança quanto para não danificar dispositivos conectados. **(A)** e **(B)** violam a condição de segurança; além disso, o ohmímetro comum não aplica tensão suficiente para revelar falhas de isolamento. **(D)** e **(E)** medem grandezas distintas.

---

# BLOCO 8 — INSTALAÇÕES ELÉTRICAS

*(8.1 Instalações de baixa tensão; 8.2 Redes aéreas e instalações de 1,0 kV a 17,5 kV; 8.3 Aterramento e equipamentos especializados; 8.4 SPDA)*

## 8.1 Baixa tensão

**Faixa de BT:** até 1.000 V em CA e 1.500 V em CC (âmbito da NBR 5410).

**Dimensionamento de condutores — os critérios devem ser aplicados e o maior resultado prevalece:**
1. Seção mínima (norma: 1,5 mm² para iluminação; 2,5 mm² para tomadas de uso geral)
2. Capacidade de condução de corrente (ampacidade), corrigida por temperatura e agrupamento
3. Queda de tensão máxima admissível
4. Capacidade de curto-circuito
5. Proteção contra sobrecarga (coordenação com o disjuntor)

**Queda de tensão máxima (NBR 5410):** em geral 4% do ponto de entrada até o ponto mais distante; 7% quando a origem é transformador próprio do consumidor.

**Cores de identificação:**
- **Condutor de proteção (PE): verde ou verde-amarelo — uso exclusivo**
- **Neutro: azul-claro**
- Fases: qualquer outra cor (usualmente preto, vermelho, branco/cinza)

## 8.2 Média tensão (1,0 kV a 17,5 kV)

Redes de distribuição primária (13,8 kV é o padrão brasileiro mais comum). Componentes: cruzetas, isoladores (pino, disco, polimérico), chaves fusíveis, religadores, para-raios, transformadores de distribuição.

Equipamentos e cuidados específicos: uso de **detector de tensão** apropriado à classe, **vara de manobra**, luvas classe adequada, e observância obrigatória das distâncias de segurança da NR-10.

## 8.3 Sistemas de aterramento

Funções: segurança das pessoas (limitar tensões de contato), proteção dos equipamentos, referência de potencial e escoamento de descargas.

**Esquemas de aterramento (NBR 5410):** a primeira letra indica a situação da alimentação em relação à terra; a segunda, a situação das massas.

| Esquema | Característica |
|---|---|
| **TN-S** | neutro e condutor de proteção **separados** em todo o percurso |
| **TN-C** | funções de neutro e proteção **combinadas** em um único condutor (PEN) |
| **TN-C-S** | combinadas em parte da instalação, separadas a partir de certo ponto |
| **TT** | massas aterradas em eletrodo **independente** do neutro da alimentação |
| **IT** | alimentação isolada da terra (ou aterrada por impedância); massas aterradas |

**Equipotencialização:** interligação de todas as massas e elementos condutores para eliminar diferenças de potencial. O **BEP (Barramento de Equipotencialização Principal)** é onde convergem: condutor de aterramento, tubulações metálicas, estrutura, armadura do concreto e o SPDA.

**Resistência de aterramento:** depende da resistividade do solo, da geometria e da profundidade dos eletrodos. Reduz-se aumentando número/comprimento das hastes ou tratando o solo.

## 8.4 SPDA (NBR 5419)

**Princípio fundamental:** o SPDA **não impede a descarga atmosférica**. Ele oferece um caminho preferencial e controlado para escoá-la com segurança à terra.

**Componentes:** subsistema de **captação** (captores), de **descida** (condutores) e de **aterramento** (eletrodos, preferencialmente em anel).

**Métodos de posicionamento dos captores:**
- **Franklin (ângulo de proteção):** cone de proteção a partir de captor elevado. Limitado a estruturas de menor altura.
- **Gaiola de Faraday (malha):** malha condutora envolvendo a estrutura. Usado em edificações maiores.
- **Esfera rolante (esfera fictícia):** método mais geral; a esfera de raio definido pelo nível de proteção "rola" sobre a estrutura, e os pontos tocados são os que exigem proteção.

**Níveis de proteção:** I (mais rigoroso) a IV, definidos por análise de risco.

---

## Exercícios — Bloco 8

**21.** De acordo com a NBR 5410, a cor **verde-amarela** em condutores isolados é de uso exclusivo para identificação do:

(A) condutor neutro
(B) condutor fase R
(C) condutor de proteção (PE)
(D) condutor de retorno de comando
(E) condutor de equipotencialização suplementar de uso opcional

**22.** Um sistema de proteção contra descargas atmosféricas (SPDA) foi instalado em um tanque de armazenamento de derivados de petróleo. Sobre a função desse sistema, é correto afirmar que ele:

(A) impede a incidência de descargas atmosféricas sobre a estrutura
(B) neutraliza as cargas elétricas presentes nas nuvens
(C) oferece um caminho preferencial e controlado para o escoamento da corrente de descarga até a terra
(D) reduz a intensidade da corrente da descarga a valores desprezíveis
(E) substitui a necessidade de aterramento da estrutura

**23.** No esquema de aterramento **TN-S**, tem-se que:

(A) as funções de neutro e de proteção são exercidas por um único condutor em toda a instalação
(B) o condutor neutro e o condutor de proteção são distintos e mantidos separados ao longo de todo o percurso
(C) a alimentação é isolada da terra e as massas não são aterradas
(D) as massas são aterradas em eletrodo independente do aterramento da alimentação
(E) não há condutor de proteção, sendo a segurança garantida apenas por isolação reforçada

## Gabarito comentado — Bloco 8

**21 — (C).** A NBR 5410 reserva a dupla coloração **verde-amarela** (ou o verde puro) exclusivamente ao condutor de proteção — justamente para impedir confusão em situação de risco. **(A)** neutro é azul-claro. **(B)** fases usam qualquer cor exceto verde, verde-amarelo e azul-claro. **(D)** e **(E)** não correspondem a reservas de cor normalizadas nesses termos.

**22 — (C).** É o conceito central do SPDA, e a alternativa **(A)** é a concepção equivocada mais difundida — o sistema não repele nem evita o raio. **(B)** e **(D)** são fisicamente impossíveis: a energia da descarga não é reduzida pelo SPDA. **(E)** inverte a relação — o subsistema de aterramento é parte integrante e indispensável do SPDA.

**23 — (B).** O "S" em TN-S significa **separados**: PE e neutro são condutores distintos do início ao fim. **(A)** descreve o TN-C (condutor PEN combinado). **(D)** descreve o **TT**. **(C)** descreve parcialmente o **IT**, mas erra ao afirmar que as massas não são aterradas — no IT as massas **são** aterradas. **(E)** não corresponde a nenhum esquema normalizado.

---

# BLOCO 9 — AUTOMAÇÃO E ELETRÔNICA ANALÓGICA E DIGITAL

*(9.1 Eletrônica analógica e digital; 9.2 Diagramas lógicos; 9.3 Automação industrial; 9.4 Projeto com CLP; 9.5 Modelagem, realimentação e controle em malha fechada)*

## 9.1 Eletrônica analógica

**Diodo:** conduz em polarização direta (queda ≈ 0,7 V no silício), bloqueia em reversa. Aplicações: retificação, proteção contra inversão de polaridade, diodo de roda livre (freewheeling) em cargas indutivas.

**Diodo Zener:** opera em ruptura reversa controlada; usado como **regulador de tensão** e referência.

**Transistor bipolar (TBJ):** três terminais (base, coletor, emissor). Regiões: corte (chave aberta), saturação (chave fechada) e ativa (amplificação). Em automação, opera predominantemente como **chave**.

**Amplificador operacional:** ganho aberto altíssimo, impedância de entrada altíssima. Configurações típicas: inversora, não inversora, seguidor de tensão (buffer), somador, comparador.

**Tiristor (SCR):** conduz após pulso no gate e só cessa quando a corrente cai abaixo do valor de manutenção. Base dos soft-starters.

## 9.1 (cont.) Eletrônica digital

**Sistemas de numeração:** binário, octal, decimal, hexadecimal. Conversões são cobradas com frequência.

**Portas lógicas e tabelas-verdade:**

| A | B | AND | OR | NAND | NOR | XOR |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 |

**Álgebra de Boole — identidades essenciais:**
- A + 0 = A · A + 1 = 1 · A · 0 = 0 · A · 1 = A
- A + A = A · A · A = A · A + Ā = 1 · A · Ā = 0
- **De Morgan:** ¬(A·B) = ¬A + ¬B e ¬(A+B) = ¬A · ¬B

## 9.3–9.4 Automação industrial e CLP

**CLP (Controlador Lógico Programável):** computador industrial dedicado. Estrutura: **CPU**, **memória**, **módulos de entrada** (digitais e analógicos), **módulos de saída**, **fonte de alimentação** e interfaces de comunicação.

**Ciclo de varredura (scan):** sequência fixa e repetitiva —
**1) leitura das entradas → 2) execução do programa → 3) atualização das saídas → 4) housekeeping/diagnóstico**

Esse é um dos pontos mais cobrados. Note que o CLP **não** lê as entradas continuamente durante a execução: ele congela uma "imagem" das entradas no início do ciclo.

**Linguagens (IEC 61131-3):** Ladder (LD — a mais usada, deriva dos diagramas de comando a relé), Diagrama de Blocos Funcionais (FBD), Texto Estruturado (ST), Lista de Instruções (IL) e SFC (Grafcet).

**Ladder básico:** contato NA (─┤├─), contato NF (─┤/├─), bobina (─( )─). A lógica é lida da esquerda (barra de energização) para a direita.

**SDCD:** sistema digital de controle distribuído, usado em plantas de processo de grande porte (refinarias, terminais). **SCADA:** supervisão e aquisição de dados.

## 9.5 Controle em malha fechada

**Malha aberta:** a saída **não** influencia a ação de controle. Simples e barata, mas não corrige perturbações. Ex.: temporizador de máquina de lavar.

**Malha fechada (realimentada):** a saída é medida e comparada com o **set-point**; o **erro** gera a ação corretiva. Corrige perturbações e variações de carga.

Elementos: set-point → comparador (gera o erro) → controlador → elemento final de controle (atuador) → processo → transmissor/sensor → realimentação.

**Controlador PID:**
- **P (proporcional):** resposta proporcional ao erro. Rápido, mas deixa **erro de offset** em regime permanente.
- **I (integral):** acumula o erro no tempo e **elimina o erro em regime permanente**. Torna a resposta mais lenta e pode gerar sobre-elevação (overshoot).
- **D (derivativo):** responde à **taxa de variação** do erro. Antecipa tendências, amortece oscilações, mas amplifica ruído.

---

## Exercícios — Bloco 9

**24.** O ciclo de varredura (scan) de um Controlador Lógico Programável é executado, em regime normal de operação, na seguinte sequência:

(A) execução do programa → leitura das entradas → atualização das saídas
(B) leitura das entradas → execução do programa → atualização das saídas
(C) atualização das saídas → leitura das entradas → execução do programa
(D) leitura das entradas → atualização das saídas → execução do programa
(E) execução do programa → atualização das saídas → leitura das entradas

**25.** Em uma malha de controle de temperatura, o operador observa que o processo se estabiliza consistentemente 3 °C abaixo do set-point, sem nunca alcançá-lo. A ação de controle que deve ser introduzida ou intensificada para eliminar esse desvio permanente é a:

(A) proporcional
(B) integral
(C) derivativa
(D) proporcional-derivativa
(E) de banda morta

**26.** Aplicando o teorema de De Morgan à expressão ¬(A · B), obtém-se:

(A) ¬A · ¬B
(B) ¬A + ¬B
(C) A + B
(D) A · B
(E) ¬(A + B)

## Gabarito comentado — Bloco 9

**24 — (B).** A sequência é fixa: o CLP primeiro **lê** e armazena a imagem das entradas, depois **executa** a lógica sobre essa imagem e só então **atualiza** as saídas. Compreender isso é o que explica, na prática, o **tempo de resposta** do CLP e por que mudanças na entrada durante a execução só surtem efeito no ciclo seguinte. As demais alternativas embaralham a ordem.

**25 — (B).** Desvio permanente (offset) que persiste em regime é a assinatura clássica do controle **puramente proporcional**. A ação **integral** acumula o erro ao longo do tempo, e essa acumulação continua atuando enquanto houver qualquer erro — o que só cessa quando o erro chega a zero. **(A)** intensificar o P reduziria o offset, mas não o eliminaria, além de aproximar o sistema da instabilidade. **(C)** o derivativo responde à variação do erro; com erro constante, sua contribuição é nula — inútil neste caso. **(E)** banda morta agravaria o problema.

**26 — (B).** De Morgan: a negação de um produto é a **soma das negações**. **(A)** é o erro simétrico — corresponde a ¬(A + B), não a ¬(A · B). **(E)** é justamente essa outra expressão. Regra prática: "quebra a barra e troca o sinal".

---

# BLOCO 10 — NORMAS E REGULAMENTAÇÕES

*(10.1 ABNT NBR 5410; 10.2 Conceitos de manutenção elétrica; 10.3 Materiais e ferramentas; 10.4 NR-10 – Segurança em Instalações e Serviços em Eletricidade)*

## 10.1 ABNT NBR 5410 — Instalações elétricas de baixa tensão

**Campo de aplicação:** instalações de BT (até 1.000 V CA / 1.500 V CC), com o objetivo de garantir segurança de pessoas e animais, funcionamento adequado e conservação dos bens.

**Proteção contra choques elétricos — dois níveis:**
- **Proteção básica** (contra contato **direto**): isolação das partes vivas, barreiras, invólucros, obstáculos, colocação fora de alcance.
- **Proteção supletiva** (contra contato **indireto** — massas energizadas por falha): seccionamento automático da alimentação (DR + aterramento), equipotencialização, isolação dupla ou reforçada, separação elétrica, extrabaixa tensão (SELV/PELV).

**Exigências relevantes:** DR de alta sensibilidade (**30 mA**) obrigatório em circuitos de áreas molhadas (banheiros, cozinhas, áreas externas, lavanderias) e tomadas em áreas internas que possam alimentar equipamentos externos; DPS conforme análise de risco; divisão da instalação em circuitos independentes.

## 10.2 Conceitos de manutenção elétrica

| Tipo | Quando ocorre | Característica |
|---|---|---|
| **Corretiva não planejada** | após a falha | maior custo indireto, parada não programada |
| **Corretiva planejada** | após identificar defeito, com programação | decisão consciente de operar até intervir |
| **Preventiva** | em intervalos **predefinidos** | baseada em tempo/ciclos; pode trocar peça ainda boa |
| **Preditiva** | com base na **condição** monitorada | termografia, análise de vibração, ultrassom, análise de óleo, medição de isolamento |
| **Detectiva** | busca falhas ocultas | teste de sistemas de proteção e intertravamento |
| **Engenharia de manutenção** | atua na **causa raiz** | elimina falhas recorrentes, melhora o projeto |

**Indicadores:**
- **MTBF** (Mean Time Between Failures) — tempo médio **entre** falhas; mede **confiabilidade**. Quanto maior, melhor.
- **MTTR** (Mean Time To Repair) — tempo médio de reparo; mede **manutenibilidade**. Quanto menor, melhor.
- **Disponibilidade = MTBF / (MTBF + MTTR)**

**Técnicas preditivas em elétrica:** **termografia** (identifica pontos quentes em conexões frouxas, desequilíbrio de fases, sobrecarga), **medição de resistência de isolamento**, **análise de vibração** em motores, **ultrassom** (detecta efeito corona e arcos em painéis).

## 10.3 Materiais e ferramentas

**Materiais condutores:** cobre (alta condutividade, boa maleabilidade) e alumínio (mais leve e barato, usado em redes aéreas; exige cuidado com conexões bimetálicas devido à corrosão galvânica e à fluência).

**Materiais isolantes:** PVC (limite 70 °C), EPR e XLPE (90 °C, melhor desempenho térmico e em curto-circuito), borracha, porcelana, vidro, polímeros.

**Ferramentas:** alicate universal, de corte, de bico, **alicate de crimpar** terminais, **desencapador**, chaves isoladas (com certificação **1.000 V**, normalmente ensaiadas a 10 kV), chave de fenda/Philips isolada, **vara de manobra**, detector de tensão, torquímetro (conexões devem ser apertadas com torque especificado — aperto insuficiente gera ponto quente; excessivo danifica o terminal).

Ponto de prova: **ferramenta isolada não é ferramenta com cabo de plástico**. Deve ser certificada e inspecionada visualmente antes de cada uso.

## 10.4 NR-10 — Segurança em Instalações e Serviços em Eletricidade

**Aplicação:** a todas as fases (geração, transmissão, distribuição e consumo) e a todos que interajam em instalações elétricas.

**Medidas de controle — ordem de prioridade:**
1. **Desenergização**
2. Emprego de tensão de segurança
3. Barreiras e invólucros
4. Bloqueios e impedimentos
5. Obstáculos e anteparos
6. Isolação das partes vivas
7. Sinalização
8. Sistemas de seccionamento automático
9. Equipotencialização

**Sequência obrigatória de DESENERGIZAÇÃO (art. 10.5.1) — memorize a ordem:**
1. **Seccionamento**
2. **Impedimento de reenergização** (bloqueio)
3. **Constatação da ausência de tensão**
4. **Instalação de aterramento temporário** com equipotencialização dos condutores
5. **Proteção dos elementos energizados** existentes na zona controlada
6. **Instalação da sinalização** de impedimento de reenergização

**Sequência de REENERGIZAÇÃO — é a ordem inversa:** retirada das ferramentas/utensílios/equipamentos → retirada da zona controlada de todos os trabalhadores não envolvidos → remoção do aterramento temporário e equipotencialização → remoção da sinalização de impedimento → destravamento e religação.

**Zonas de risco:**
- **Zona de risco:** entorno imediato da parte energizada; acesso **permitido apenas a profissionais autorizados** e com adoção de técnicas e instrumentos apropriados.
- **Zona controlada:** entorno da zona de risco; acesso restrito a **profissionais autorizados**.
- **Zona livre:** sem restrição.

**Qualificação:**
- **Profissional qualificado:** possui curso específico reconhecido pelo sistema oficial de ensino e registro no conselho de classe.
- **Profissional legalmente habilitado:** qualificado **e** com registro ativo no conselho.
- **Profissional capacitado:** trabalha sob responsabilidade de profissional habilitado e autorizado.
- **Profissional autorizado:** qualificado, capacitado ou habilitado, **com anuência formal da empresa**.

**Treinamentos:**
- **Curso Básico — Segurança em Instalações e Serviços com Eletricidade: 40 horas.**
- **Curso Complementar — Segurança no Sistema Elétrico de Potência (SEP) e em suas proximidades: 40 horas.**
- **Reciclagem bienal**, ou quando houver troca de função, retorno de afastamento superior a três meses, ou modificação significativa nas instalações.

**Documentação (Prontuário de Instalações Elétricas — PIE):** obrigatório para estabelecimentos com carga instalada superior a **75 kW**. Deve conter esquemas unifilares atualizados, documentação das inspeções, especificação de EPI/EPC, procedimentos de emergência, certificações e habilitações dos trabalhadores.

**Trabalho em instalações energizadas:** só é permitido quando houver **impossibilidade técnica** de desenergizar ou quando a desenergização introduzir **risco maior**. Exige **Análise de Risco**, procedimento específico e autorização formal.

---

## Exercícios — Bloco 10

**27.** De acordo com a NR-10, o primeiro procedimento da sequência obrigatória de desenergização de um circuito elétrico é:

(A) a constatação da ausência de tensão
(B) a instalação de aterramento temporário
(C) o seccionamento
(D) a instalação da sinalização de impedimento de reenergização
(E) o impedimento de reenergização

**28.** Um técnico realiza inspeção termográfica em um quadro de distribuição e identifica ponto quente em uma conexão. A modalidade de manutenção empregada nessa inspeção e a natureza do benefício obtido são, respectivamente:

(A) corretiva não planejada — reparo imediato após a falha
(B) preventiva — substituição em intervalo predefinido
(C) preditiva — intervenção baseada na condição real do componente, antes da falha
(D) detectiva — identificação de falhas ocultas em sistemas de proteção
(E) corretiva planejada — operação até a quebra com programação prévia

**29.** Considere um equipamento cujo tempo médio entre falhas (MTBF) é de 380 horas e cujo tempo médio de reparo (MTTR) é de 20 horas. A disponibilidade desse equipamento é de:

(A) 5,0%
(B) 80,0%
(C) 90,0%
(D) 95,0%
(E) 99,5%

**30.** Conforme a NR-10, o Prontuário de Instalações Elétricas é obrigatório para estabelecimentos com carga instalada superior a:

(A) 25 kW
(B) 50 kW
(C) 75 kW
(D) 100 kW
(E) 150 kW

## Gabarito comentado — Bloco 10

**27 — (C).** A sequência inicia pelo **seccionamento** — só é possível impedir a reenergização, constatar ausência de tensão e aterrar depois de abrir o circuito. **(E)** é o segundo passo; **(A)** o terceiro; **(B)** o quarto; **(D)** o sexto e último. A Cesgranrio cobra essa ordem tanto no sentido direto quanto no inverso (reenergização), então vale memorizar as duas.

**28 — (C).** Termografia é técnica preditiva por excelência: monitora a **condição** do ativo (temperatura) e permite intervir antes que a falha ocorra, no momento tecnicamente justificado. **(B)** é o erro mais provável: preventiva se baseia em **intervalo de tempo**, não em condição medida. **(A)** e **(E)** pressupõem falha já ocorrida. **(D)** detectiva se refere a falhas ocultas em sistemas de proteção — outra categoria.

**29 — (D).** Disponibilidade = MTBF/(MTBF + MTTR) = 380/(380 + 20) = 380/400 = 0,95 = **95,0%**. **(A)** calcula o complemento (indisponibilidade) de forma equivocada. As demais não correspondem à razão correta.

**30 — (C).** O limite normativo é **75 kW** de carga instalada. É um número puramente memorístico e recorrente em provas — vale fixar junto com os outros valores-âncora da NR-10: **40 h** (curso básico), **40 h** (SEP), **bienal** (reciclagem), **30 mA** (DR para pessoas, este da NBR 5410).

---

# ANEXO — TABELA DE FÓRMULAS ESSENCIAIS

| Fórmula | Aplicação |
|---|---|
| V = R·I | Lei de Ohm |
| P = V·I = R·I² = V²/R | Potência em CC |
| V_ef = V_p/√2 | Valor eficaz (senoide) |
| X_L = 2πfL ; X_C = 1/(2πfC) | Reatâncias |
| \|Z\| = √(R² + (X_L−X_C)²) | Impedância série |
| S = √(P² + Q²) ; FP = P/S | Triângulo de potências |
| Q_C = P·(tg φ₁ − tg φ₂) | Correção do fator de potência |
| P = √3·V_L·I_L·cos φ | Potência trifásica |
| Estrela: V_L = √3·V_f ; I_L = I_f | Ligação Y |
| Triângulo: V_L = V_f ; I_L = √3·I_f | Ligação Δ |
| V₁/V₂ = N₁/N₂ = I₂/I₁ | Transformador ideal |
| n_s = 120·f/p | Velocidade síncrona |
| s = (n_s − n)/n_s | Escorregamento |
| Disponibilidade = MTBF/(MTBF+MTTR) | Indicador de manutenção |

---

# ANEXO — NÚMEROS-ÂNCORA PARA MEMORIZAÇÃO

- **1.000 V CA / 1.500 V CC** — limite de baixa tensão (NBR 5410)
- **30 mA** — sensibilidade do DR para proteção de pessoas
- **1,5 mm²** (iluminação) e **2,5 mm²** (tomadas) — seções mínimas
- **4% / 7%** — quedas de tensão máximas admissíveis
- **75 kW** — carga instalada que obriga o Prontuário (NR-10)
- **40 h + 40 h** — curso básico e complementar SEP (NR-10)
- **Bienal** — reciclagem NR-10
- **0,92** — fator de potência de referência (ANEEL)
- **6 a 8×** — corrente de partida direta do motor de indução
- **1/3** — redução de corrente e conjugado na partida estrela-triângulo
- **√2 ≈ 1,414 · √3 ≈ 1,732** — constantes que aparecem em quase toda questão de cálculo

---

*Material elaborado a partir do conteúdo programático oficial do Anexo IV do Edital nº 03 – TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO-2026.3, Ênfase 8: Manutenção – Elétrica. Nenhum tópico foi acrescentado além do programa oficial. A bibliografia é de livre escolha do candidato, conforme item 8.2 do Edital.*

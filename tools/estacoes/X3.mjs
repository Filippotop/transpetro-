/* Estação X3: contagem, probabilidade e estatística (itens Mat 5, Mat 6 e Mat 7 do edital).
   Aprofundamento escrito para o app (fontes/matematica-contagem-probabilidade-estatistica.html), no formato das apostilas do
   estudante; aqui ficam os metadados, o resumo, os cartões, o V ou F e as contas. As questões da aba Questões são os
   exercícios do fim de cada seção, com a explicação de cada alternativa em tools/banco/X3.mjs.
   Gerar: node tools/estacao.mjs fontes/matematica-contagem-probabilidade-estatistica.html X3 */

const EX = n => 'Exemplo resolvido ' + n;

export default {
  fonte: 'fontes/matematica-contagem-probabilidade-estatistica.html',
  meta: {
    id: 'X3', vol: 'MT', line: 'X',
    title: 'Contagem, probabilidade e estatística',
    itens: 'Mat 5, 6, 7', faixa: 'B', peso2023: 2,
    note: 'Em 2023 caíram duas das dez questões de Matemática, as duas sobre desvio padrão: a expressão do desvio padrão dos bônus de 10 funcionários numa tabela de frequências (13) e a turma de desvio padrão zero (15). Gabarito oficial: E e E. Contagem e probabilidade não caíram, mas estão no edital. É um padrão de uma prova só.',
  },
  renomear: { antes: 'Escopo do edital e como a banca cobra', fontes: 'Fontes' },
  labs: {},
  trocas: [],
  resumo: [
    ['Princípio da contagem', 'Etapas seguidas: multiplique as opções. Alternativas que se excluem: some. Comece pela restrição.'],
    ['Permutação', 'n! ordena n elementos. Repetidos: divida por a!·b!. Juntos: faça um bloco e multiplique por 2!.'],
    ['Arranjo e combinação', 'Ordem importa: arranjo, p fatores a partir de n. Não importa: combinação = arranjo ÷ p!.'],
    ['Probabilidade', 'Favoráveis ÷ possíveis. Pelo menos um = 1 − nenhum. "E" multiplica; "ou" soma e tira a interseção.'],
    ['Tabelas e gráficos', 'Relativa = f/N. Acumulada: soma até a linha. Setor: (f/N)·360°. A base da variação é a antiga.'],
    ['Média, mediana e moda', 'Média: soma ÷ n (ponderada: ÷ soma dos pesos). Mediana: ordene. Moda: a mais repetida.'],
    ['Variância e desvio padrão', 'σ² = Σf(x − média)²/Σf; σ = √σ². σ = 0 só se todos iguais. Somar não muda; × k multiplica por |k|.'],
  ],
  cards: [
    ['Como funciona o princípio fundamental da contagem?', 'Etapas seguidas: multiplique o número de opções de cada uma. 2 contatores × 3 relés = 6 conjuntos. Comece pela etapa que tem restrição.'],
    ['Quando se soma e quando se multiplica?', '"E" (uma etapa e depois outra): multiplica. "OU" (alternativas que se excluem): soma. 4 escadas ou 3 elevadores: 7 maneiras; subir e descer: 7 × 7 = 49.'],
    ['O que é n! e quanto vale 0!?', 'n! = n · (n − 1) · … · 2 · 1. Por convenção, 0! = 1. Decore 4! = 24, 5! = 120 e 6! = 720.'],
    ['Como calcular 9!/7!?', 'Corte o 7!: sobra 9 × 8 = 72. O produto vai do maior número até o primeiro que não foi cortado (não é 9 − 7, nem 9 × 7).'],
    ['Anagramas com letras repetidas: qual a conta?', 'Divida n! pelo fatorial de cada repetição. MOTOR: 5!/2! = 60. RESISTOR: 8!/(2! · 2!) = 10.080.'],
    ['Duas pessoas devem ficar juntas numa fila de 4. Como contar?', 'Faça um bloco: com as outras duas são 3 elementos, 3! = 6 filas. Dentro do bloco, 2! = 2 ordens. Total: 6 × 2 = 12.'],
    ['Arranjo ou combinação: como decidir?', 'Troque dois escolhidos de lugar: o resultado mudou? Sim: arranjo (fila, pódio, senha). Não: combinação (comissão, dupla, aperto de mão).'],
    ['Como calcular C(5, 3) sem a fórmula inteira?', 'Três fatores a partir de 5, sobre 3!: (5 × 4 × 3)/6 = 10. Atalho: C(5, 3) = C(5, 2) = 10.'],
    ['Como calcular probabilidade num espaço equiprovável?', 'P = casos favoráveis ÷ casos possíveis. 3 defeituosos em 20 relés: 3/20 = 15%. Não é favoráveis ÷ desfavoráveis (isso é a razão de chances).'],
    ['Dois dados: qual a probabilidade de a soma ser 9?', 'Possíveis: 6 × 6 = 36 pares. Favoráveis: (3, 6), (4, 5), (5, 4) e (6, 3) = 4. P = 4/36 ≈ 11,1%. As 11 somas (2 a 12) não são equiprováveis.'],
    ['Como calcular "A ou B" sem contar duas vezes?', 'n(A) + n(B) − n(A e B). Múltiplos de 3 ou de 5 de 1 a 20: 6 + 4 − 1 = 9, ou seja, 9/20 = 45%.'],
    ['Como calcular "pelo menos um" em eventos independentes?', '1 − P(nenhum). Três vistorias de 20% cada: 1 − 0,8<sup>3</sup> = 1 − 0,512 = 48,8%.'],
    ['Probabilidade sem reposição: o que muda?', 'O total cai a cada retirada. 5 fichas verdes e 3 azuis, duas verdes: 5/8 × 4/7 ≈ 35,7%. Com reposição seria 5/8 × 5/8 ≈ 39,1%.'],
    ['Gráfico de setores: como achar o ângulo?', '(frequência ÷ total) × 360°. 24 de 160 ordens: 0,15 × 360° = 54°. Não use a porcentagem ou a frequência como grau.'],
    ['Média ponderada: por que dividir pela soma dos pesos?', 'Média = Σ f·x / Σ f. Notas 8, 6 e 7 com pesos 2, 3 e 5: 69/10 = 6,9, e não (8 + 6 + 7)/3.'],
    ['Como achar a mediana?', 'Ordene os dados. Ímpar: o valor do meio. Par: média dos dois centrais. 20, 25, 30, 35, 40, 90: (30 + 35)/2 = 32,5.'],
    ['Como calcular o desvio padrão?', 'Média; desvios; quadrados (× frequência); soma ÷ total = variância; raiz. Para 2, 4, 4, 4, 5, 5, 7, 9: variância 4, desvio padrão 2.'],
    ['Quando o desvio padrão é zero?', 'Só quando todos os valores são iguais (60 notas 5). Metade 0 e metade 10 tem a mesma média, 5, e o maior desvio possível, 5.'],
  ],
  vf: [
    ['Em etapas seguidas, o número total de resultados é a soma das opções de cada etapa.', false, 'As opções <b>se multiplicam</b>: senha de 3 algarismos diferentes é 10 × 9 × 8 = 720, e não 10 + 9 + 8 = 27.'],
    ['Por convenção, 0! = 1.', true, 'É uma convenção que faz as fórmulas valerem; 0! <b>não</b> é zero.'],
    ['5! é igual a 25.', false, '5! = 5 × 4 × 3 × 2 × 1 = <b>120</b>. O 25 é 5².'],
    ['O número de anagramas de MOTOR é 5! = 120.', false, 'O O aparece duas vezes: P = 5!/2! = <b>60</b>.'],
    ['Para formar uma comissão de 3 pessoas entre 8, deve-se usar arranjo.', false, 'Numa comissão a ordem não importa: combinação, C(8, 3) = <b>56</b>. O arranjo, 336, conta cada comissão 6 vezes.'],
    ['C(5, 3) = C(5, 2).', true, 'Escolher quem entra é o mesmo que escolher quem fica de fora: os dois valem 10.'],
    ['Ao lançar dois dados, as onze somas possíveis (de 2 a 12) têm a mesma probabilidade.', false, 'A soma 7 tem 6 pares e a soma 2 tem 1 só. Equiprováveis são os <b>36 pares ordenados</b>.'],
    ['Em um lote de 20 relés com 3 defeituosos, a probabilidade de sortear um defeituoso é 3/17.', false, 'O denominador é o <b>total</b>, 20: P = 3/20 = 15%. Dividir por 17 (os bons) dá a razão de chances (3 para 17), e não a probabilidade.'],
    ['A probabilidade de ocorrer pelo menos um evento é 1 menos a probabilidade de não ocorrer nenhum.', true, 'É o evento complementar; costuma ser bem mais curto que somar os casos.'],
    ['Dois sensores independentes falham com 30% e 20%; a probabilidade de os dois falharem é 50%.', false, '"E" multiplica: 0,30 × 0,20 = <b>6%</b>. A soma, 50%, é um erro clássico.'],
    ['Em um gráfico de setores, um setor de 20% tem ângulo de 20°.', false, 'O ângulo é a fração do círculo: 0,20 × 360° = <b>72°</b>.'],
    ['Com número par de dados, a mediana é a média dos dois valores centrais, depois de ordenar.', true, 'Exemplo: 20, 25, 30, 35, 40, 90 tem mediana (30 + 35)/2 = 32,5.'],
    ['Um valor muito maior que os demais altera mais a média do que a mediana.', true, 'A média usa todos os valores; a mediana só olha a posição. Em 10, 12, 14, 16 e 58, a média é 22 e a mediana, 14.'],
    ['Somar R$ 500,00 ao salário de todos os técnicos de um grupo aumenta o desvio padrão.', false, 'Somar a mesma constante a todos os dados <b>não muda</b> o desvio padrão. Multiplicar por <i>k</i> o multiplica por |<i>k</i>|.'],
    ['O desvio padrão de um conjunto de dados é zero somente se todos os valores forem iguais.', true, 'Cada desvio é zero só quando o valor é igual à média; se todos são, a soma dos quadrados é zero.'],
  ],
  contas: [
    /* seção 1 */
    ['2*3', '6 conjuntos', EX(1)],
    ['4*4*4', '64', EX(2)], ['4*3*2', '24', EX(2)],
    ['3*6*5', '90 números', EX(3)],
    ['9*10*10', '900', 'Restrição primeiro'],
    ['4+3', '7 maneiras', EX(4)], ['7*7', '49', EX(4)],
    /* seção 2 */
    ['3*2*1', '6; 4! = 24', 'Decore os primeiros'], ['4*3*2*1', '24; 5! = 120', 'Decore os primeiros'], ['5*4*3*2*1', '120; 6! = 720', 'Decore os primeiros'], ['6*5*4*3*2*1', '720; 7! = 5.040', 'Decore os primeiros'], ['7*6*5*4*3*2*1', '5.040', 'Decore os primeiros'],
    ['4*3*2*1', '24, que é 4!', EX(5)],
    ['6*5', '30', EX(6)], ['7*6/2', '21', EX(6)],
    ['120/2', '60 anagramas', EX(7)],
    ['3*2*1', '6 filas', EX(8)], ['2*1', '2 ordens', EX(8)], ['6*2', '12 filas', EX(8)],
    ['9*8', '72', 'Em cancelamentos'],
    /* seção 3 */
    ['6*5', '30', EX(9)], ['30/2', '15', EX(9)],
    ['5*4*3', '60', EX(10)], ['3*2*1', '6', EX(10)], ['60/6', '10', EX(10)], ['5*4/2', '10', EX(10)],
    ['7*6/2', '21', EX(11)], ['21*3', '63 comissões', EX(11)],
    ['7*6*5/6', '35', EX(12)], ['4*3*2/6', '4', EX(12)], ['35-4', '31 grupos', EX(12)],
    /* seção 4 */
    ['3/20', '0,15', EX(13)], ['3/20*100', '15%', EX(13)], ['20-3', '17', EX(13)], ['17/20', '0,85', EX(13)], ['17/20*100', '85%', EX(13)],
    ['6*6', '36', EX(14)], ['4/36*100', '11,1%', EX(14)], ['1/9*100', '11,1%', EX(14)],
    ['6+4-1', '9', EX(15)], ['9/20', '0,45', EX(15)], ['9/20*100', '45%', EX(15)],
    /* seção 5 */
    ['0.3*0.2', '0,06', EX(16)], ['0.3*0.2*100', '6%', EX(16)], ['0.7*0.8', '0,56', EX(16)], ['1-0.7*0.8', '0,44', EX(16)], ['(1-0.7*0.8)*100', '44%', EX(16)],
    ['1-0.2', '0,80', EX(17)], ['0.8**3', '0,512', EX(17)], ['1-0.8**3', '0,488', EX(17)], ['(1-0.8**3)*100', '48,8%', EX(17)],
    ['5/8*4/7', '0,357', EX(18)], ['5/8*4/7*100', '35,7%', EX(18)], ['2*5/8*3/7', '0,536', EX(18)], ['2*5/8*3/7*100', '53,6%', EX(18)], ['5/8*5/8', '0,39', EX(18)], ['5/8*5/8*100', '39,1%', EX(18)],
    ['6*5/2', '15', EX(19)], ['1/15', '0,067', EX(19)], ['1/15*100', '6,7%', EX(19)],
    ['0.3*0.2*100', '6%', 'Somar probabilidades de eventos em sequência'],
    /* seção 6 */
    ['12+9+6+3', '30 turnos', EX(20)], ['12/30*100', '40%', EX(20)], ['9/30*100', '30%', EX(20)], ['6/30*100', '20%', EX(20)], ['3/30*100', '10%', EX(20)], ['12+9', '21', EX(20)], ['21+6', '27', EX(20)], ['27+3', '30', EX(20)], ['6+3', '9 turnos', EX(20)],
    ['80/160*360', '180°', EX(21)], ['56/160', '0,35', EX(21)], ['56/160*360', '126°', EX(21)], ['24/160', '0,15', EX(21)], ['24/160*360', '54°', EX(21)], ['180+126+54', '360°', EX(21)],
    ['(55-40)/40', '0,375', EX(22)], ['(55-40)/40*100', '37,5%', EX(22)], ['(65-50)/50', '0,30', EX(22)], ['(65-50)/50*100', '30%', EX(22)],
    ['0.2*360', '72°', 'Dar o ângulo do setor como 20°'],
    /* seção 7 */
    ['150/5', '30 min', EX(23)], ['240/6', '40 min', EX(23)], ['(30+35)/2', '32,5 min', EX(23)],
    ['4*1+8*2+6*3+2*4', '46 horas', EX(24)], ['46/20', '2,3 horas', EX(24)], ['(1+2+3+4)/4', '2,5', EX(24)],
    ['8*2+6*3+7*5', '69', EX(25)], ['2+3+5', '10', EX(25)], ['69/10', '6,9', EX(25)], ['(8+6+7)/3', '7, ignoraria', EX(25)],
    ['(10+12+14+16+18)/5', '14', EX(26)], ['110/5', '22', EX(26)],
    /* seção 8 */
    ['40/8', '5', EX(27)], ['9+1+1+1+0+0+4+16', '32', EX(27)], ['32/8', '4', EX(27)], ['Math.sqrt(4)', '2', EX(27)], ['232/8', '29 − 25', EX(27)], ['232/8-25', '4', EX(27)],
    ['23/10', '2,3 horas', EX(28)], ['2*(1-2.3)**2', '3,38', EX(28)], ['4*(2-2.3)**2', '0,36', EX(28)], ['3*(3-2.3)**2', '1,47', EX(28)], ['(4-2.3)**2', '2,89', EX(28)], ['3.38+0.36+1.47+2.89', '8,1', EX(28)], ['8.1/10', '0,81', EX(28)], ['Math.sqrt(0.81)', '0,9', EX(28)],
    ['200*1.2', 'R$ 240,00', EX(29)],
    ['Math.sqrt(2)', '1,41', 'Figura 6'], ['Math.sqrt(200)', '14,1', 'Figura 6'],
  ],
};

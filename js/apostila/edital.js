/* Conteúdo programático oficial: Edital nº 03/2026 Transpetro (Cesgranrio), Anexo IV, Ênfase 8: Manutenção – Elétrica.
   Texto dos subitens copiado do edital; corrigidos só erros óbvios de digitação ("Kv" → "kV", "Medidas de Elétricas" →
   "Medidas Elétricas"; o primeiro subitem do item 10 vem impresso como "10." e aqui é o 10.1).
   peso2023: nº de questões da prova Transpetro 2023 (Manutenção – Elétrica, questões 21 a 60) classificadas em cada item.
   Faixa: A = mais cobrado em 2023, B = médio, C = pouco. Serve para priorizar, nunca para excluir. */
const s = (id, t) => ({ id, t });

export const EDITAL = [
  { n: 1, titulo: 'Simbologia e diagramas elétricos', peso2023: 0, faixa: 'C', sub: [
    s('1.1', 'Diagramas unifilares e trifilares'),
    s('1.2', 'Esquemas de acionamento e controle em equipamentos elétricos'),
  ] },
  { n: 2, titulo: 'Circuitos elétricos CC e CA', peso2023: 7, faixa: 'A', sub: [
    s('2.1', 'Noções básicas de circuitos elétricos de corrente contínua (CC)'),
    s('2.2', 'Noções básicas de circuitos elétricos de corrente alternada (CA)'),
    s('2.3', 'Operações básicas com corrente e tensão senoidais'),
    s('2.4', 'Medidas de valores Médio, Eficaz e valor de Pico'),
    s('2.5', 'Aplicações das Leis de Kirchhoff e dos Teoremas de Thévenin e Norton'),
  ] },
  { n: 3, titulo: 'Conceito de energia e potência elétrica', peso2023: 5, faixa: 'A', sub: [
    s('3.1', 'Conceito, cálculos e medidas de potência e energia elétrica'),
    s('3.2', 'Potência ativa, reativa e aparente'),
    s('3.3', 'Fator de potência e correção do fator de potência'),
  ] },
  { n: 4, titulo: 'Circuitos monofásicos e trifásicos', peso2023: 3, faixa: 'A', sub: [
    s('4.1', 'Circuitos elétricos monofásicos e trifásicos'),
    s('4.2', 'Tensão de linha, tensão de fase e ligações estrela e triângulo'),
  ] },
  { n: 5, titulo: 'Máquinas elétricas', peso2023: 5, faixa: 'A', sub: [
    s('5.1', 'Noções básicas de Eletromagnetismo aplicado'),
    s('5.2', 'Funcionamento básico e aplicação de máquinas elétricas'),
    s('5.3', 'Transformadores'),
    s('5.4', 'Máquinas síncronas'),
    s('5.5', 'Máquinas de corrente contínua e motores de indução'),
    s('5.6', 'Dispositivos de proteção de baixa tensão'),
    s('5.7', 'Acionamentos e comando de motores elétricos'),
  ] },
  { n: 6, titulo: 'Segurança e higiene do trabalho', peso2023: 2, faixa: 'B', sub: [
    s('6.1', 'Conceitos básicos de segurança e higiene do trabalho'),
    s('6.2', 'Equipamentos de proteção individual e coletiva com ênfase em eletricidade'),
    s('6.3', 'Interpretação e análise de projetos elétricos'),
  ] },
  { n: 7, titulo: 'Medidas elétricas', peso2023: 3, faixa: 'B', sub: [
    s('7.1', 'Fundamentos de Medidas Elétricas'),
    s('7.2', 'Grandezas Elétricas, Magnéticas e Sistema Internacional de Unidades'),
    s('7.3', 'Utilização de instrumentos de medição e testes elétricos: Corrente, tensão, potência e isolação'),
    s('7.4', 'Funcionamento básico e aplicação de: Retificadores, Baterias e No-Breaks'),
  ] },
  { n: 8, titulo: 'Instalações elétricas', peso2023: 6, faixa: 'A', sub: [
    s('8.1', 'Instalações elétricas de baixa tensão'),
    s('8.2', 'Redes aéreas e instalações elétricas de 1,0 kV a 17,5 kV'),
    s('8.3', 'Sistemas de aterramento e uso de equipamentos especializados'),
    s('8.4', 'Conceitos básicos de sistemas de proteção contra descargas atmosféricas (SPDA)'),
  ] },
  { n: 9, titulo: 'Automação e eletrônica analógica e digital', peso2023: 6, faixa: 'A', sub: [
    s('9.1', 'Conceitos básicos de eletrônica analógica e digital'),
    s('9.2', 'Conceitos básicos e interpretação de diagramas lógicos'),
    s('9.3', 'Conceitos básicos de automação industrial'),
    s('9.4', 'Projeto com uso de Controladores Lógicos Programáveis (CLP)'),
    s('9.5', 'Conceitos básicos de modelagem, Realimentação e Controle em Malha Fechada'),
  ] },
  { n: 10, titulo: 'Normas e regulamentações', peso2023: 3, faixa: 'B', sub: [
    s('10.1', 'Conhecimentos básicos das normas: ABNT NBR-5410'),
    s('10.2', 'Conceitos básicos de Manutenção Elétrica'),
    s('10.3', 'Conhecimentos de materiais e ferramentas utilizados em instalações e serviços em eletricidade'),
    s('10.4', 'Conhecimento da Norma Regulamentadora NR-10 Segurança em Eletricidade'),
  ] },
];

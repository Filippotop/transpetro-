#!/usr/bin/env python3
"""Recorta a prova Transpetro 2023 (Manutenção – Elétrica, Cesgranrio) em uma imagem por questão.

Uso:  python3 tools/recorta_prova.py [--pdf fontes/prova-2023-manutencao-eletrica.pdf] [--out provas/t23] [--folha pasta]

Como funciona:
1. `pdftotext -bbox` dá a posição de cada palavra. O número de uma questão é uma palavra só de dígitos, sozinha na
   linha, com corpo grande (altura >= 12 pt), na margem esquerda de uma coluna (x = 28 ou 312 pt).
2. `pdftoppm -r 200` desenha as páginas. Em cada página, as réguas horizontais duplas dividem o corpo em faixas;
   a faixa tem duas colunas quando a régua vertical do meio passa por ela, senão é de largura inteira (questões 51 e 56).
3. A questão vai do seu número até o número seguinte na mesma coluna (ou o fim da faixa). O fim é a última linha de
   texto da região (sem as letras cinzentas de RASCUNHO e sem a seta "Continua"), estendido para baixo enquanto houver
   tinta (barras de fração, radicais). Nada abaixo da última alternativa entra.
4. O texto-base de Português (questões 1 a 7 citam os parágrafos dele) vira `s001.webp`: a coluna esquerda e o topo
   da direita da página 2, empilhados.
5. Grava provas/t23/qNNN.webp e s001.webp (WebP, qualidade 82) e data/provas.js, com o gabarito oficial lido de
   fontes/gabarito-2023.json (28 e 30 anuladas = null) e o mapa questão → estação, que está neste arquivo.
   Determinístico: rodar de novo dá os mesmos arquivos. Nunca edite data/provas.js à mão.
Precisa de poppler-utils (pdftotext, pdftoppm) e Pillow com WebP.
"""
import argparse, json, os, re, subprocess, sys, tempfile
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DPI = 200
K = DPI / 72.0                      # pt → px
COLS = {'L': (22.0, 290.0), 'R': (305.0, 573.0), 'W': (22.0, 573.0)}
GUTTER = (294.0, 300.0)             # régua vertical dupla entre as colunas
BODY = (66.0, 780.0)                # entre o cabeçalho (TRANSPETRO) e a régua do rodapé (y = 784 pt)
INK = 150                           # mais escuro que isto é tinta; RASCUNHO (~210) e a marca d'água do PCI (~185) não

# ---------------------------------------------------------------------------------------------------------------
# Metadados da prova (o que não sai do PDF). O gabarito vem de fontes/gabarito-2023.json, nunca daqui.
EXAM_ID = 't23'
TITLE = 'Transpetro 2023 · Manutenção – Elétrica'
SUB = 'Cesgranrio · Prova 6 · nível médio · 60 questões (10 de Português, 10 de Matemática, 40 específicas)'
# Capa da prova (instruções 01 e 12): 1,0 ponto cada questão (Básicos 20,0 + Específicos 40,0 = 60,0); 4 horas.
PONTOS = {'P': 1.0, 'M': 1.0, 'E': 1.0}
DURACAO_MIN = 240
CAPA = ('Capa do caderno: questões 1 a 10 (Língua Portuguesa) e 11 a 20 (Matemática), 1,0 ponto cada, total 20,0; '
        'questões 21 a 60 (Conhecimentos Específicos), 1,0 ponto cada, total 40,0; total da prova 60,0 pontos. '
        'Tempo: 4 horas, já incluída a marcação do cartão-resposta.')
SHARED = {'1-7': 's001.webp'}       # as questões 1 a 7 citam os parágrafos do texto "Brasil, paraíso dos agrotóxicos"

# Questão → (subitem do Anexo IV, estação). Classificação feita lendo cada questão (ver o relatório da Task 5);
# os totais por item reproduzem a tabela de pesos de 2023 da spec (2:7, 3:5, 4:3, 5:5, 6:2, 7:3, 8:6, 9:6, 10:3).
# Matemática (11 a 20) segue as notas das estações X1–X3 em data/embreve.js.
MAPA = {
    11: ('Mat', 'X1'), 12: ('Mat', 'X1'), 13: ('Mat', 'X3'), 14: ('Mat', 'X1'), 15: ('Mat', 'X3'),
    16: ('Mat', 'X2'), 17: ('Mat', 'X1'), 18: ('Mat', 'X2'), 19: ('Mat', 'X2'), 20: ('Mat', 'X2'),
    21: ('3.1', 'E3'),  # medidor de energia: voltas do disco
    22: ('3.3', 'E3'),  # banco de capacitores: reativo visto pelo quadro
    23: ('3.2', 'E3'),  # P, Q, S e fator de potência
    24: ('4.2', 'E3'),  # cargas em Δ e em Y: corrente de linha
    25: ('4.2', 'E3'),  # Δ × Y: razão das correntes de fase
    26: ('5.1', 'M2'),  # força num condutor (F = B·I·L)
    27: ('5.3', 'M2'),  # laminação do núcleo: correntes parasitas
    28: ('5.3', 'M2'),  # índice horário Dy5 (anulada)
    29: ('5.5', 'M3'),  # motor CC shunt: potência de saída
    30: ('4.2', 'E3'),  # gerador em Δ: corrente de fase (anulada)
    31: ('9.1', 'A1'),  # amplificador operacional
    32: ('2.3', 'E2'),  # RC em regime senoidal
    33: ('2.4', 'E2'),  # valor eficaz
    34: ('9.2', 'A1'),  # circuito lógico → expressão booleana
    35: ('9.5', 'A2'),  # PID mal ajustado
    36: ('9.4', 'A2'),  # pull-up na entrada do CLP
    37: ('8.3', 'I1'),  # esquema TN: corrente de falta e DR
    38: ('5.7', 'M3'),  # partida estrela-triângulo
    39: ('6.1', 'N1'),  # perigo × risco
    40: ('7.3', 'I3'),  # HIPOT: ensaio de isolação
    41: ('6.2', 'N1'),  # EPC × EPI na NR-10
    42: ('8.1', 'I1'),  # sobretensão numa fase: neutro rompido
    43: ('7.4', 'I3'),  # UPS off-line
    44: ('10.4', 'N1'), # NR-10: prontuário acima de 75 kVA
    45: ('8.1', 'I1'),  # queda de tensão: comprimento máximo
    46: ('8.4', 'I2'),  # SPDA: medidas de proteção contra surtos
    47: ('10.3', 'N1'), # isolação do condutor (materiais)
    48: ('2.3', 'E2'),  # soma de senoides defasadas de 90°
    49: ('2.1', 'E1'),  # resistência interna da bateria
    50: ('9.5', 'A2'),  # ganho K para oscilação em malha fechada
    51: ('9.5', 'A2'),  # função de transferência do RLC
    52: ('2.5', 'E1'),  # Thévenin
    53: ('2.1', 'E1'),  # circuito CC: resistência de carga
    54: ('8.2', 'I2'),  # transformador de corrente na subestação
    55: ('10.1', 'I1'), # NBR 5410: princípios fundamentais
    56: ('3.2', 'E3'),  # wattímetro, amperímetro e voltímetro: Z1
    57: ('2.1', 'E1'),  # CC com fonte controlada: potência nos resistores
    58: ('3.1', 'E3'),  # método dos dois wattímetros
    59: ('8.3', 'I1'),  # canalização de água × aterramento
    60: ('7.2', 'M2'),  # SI: 1 kWh em joules
}
NOTAS = {
    28: 'Anulada: o gabarito preliminar marcava 120°; o certo para Dy5 é 150° atrasada (5 × 30°). Veja a estação M2.',
    30: 'Anulada pela banca.',
}
FONTE = ('Gabarito oficial da Cesgranrio, após recursos; questões 28 e 30 anuladas. Caderno: Edital nº 1 – '
         'TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO 2023.1, Prova 6 – Manutenção – Elétrica, aplicada em 10/12/2023 '
         '(cópia do PCI Concursos). Gabarito: fontes/gabarito-2023.json, conferido entre o preliminar e as '
         'Respostas aos Recursos.')
# ---------------------------------------------------------------------------------------------------------------


def words_by_page(pdf):
    out = subprocess.run(['pdftotext', '-bbox', pdf, '-'], capture_output=True, text=True, check=True).stdout
    pages = []
    for chunk in out.split('<page ')[1:]:
        pages.append([(float(a), float(b), float(c), float(d), t) for a, b, c, d, t in
                      re.findall(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)</word>', chunk)])
    return pages


def render(pdf, tmp):
    subprocess.run(['pdftoppm', '-r', str(DPI), '-png', pdf, os.path.join(tmp, 'p')], check=True)
    files = sorted(f for f in os.listdir(tmp) if f.startswith('p-') and f.endswith('.png'))
    return [Image.open(os.path.join(tmp, f)).convert('L') for f in files]


def px(v):
    return int(round(v * K))


def ink_rows(img, x0, x1, y0, y1):
    """Lista de bools: a linha de pixels y (de y0 a y1, em pt) tem tinta entre x0 e x1?"""
    box = img.crop((px(x0), px(y0), px(x1), px(y1)))
    w, h = box.size
    data = box.tobytes()
    return [any(b < INK for b in data[r * w:(r + 1) * w]) for r in range(h)]


def is_ink_word(img, w):
    """Palavra impressa em preto (as letras de RASCUNHO e a marca d'água são cinza-claro)."""
    box = img.crop((px(w[0]), px(w[1]), max(px(w[2]), px(w[0]) + 1), max(px(w[3]), px(w[1]) + 1)))
    return min(box.tobytes()) < INK


def bands(img):
    """Faixas do corpo da página entre réguas horizontais, cada uma marcada com duas colunas ou largura inteira."""
    W0, W1 = px(COLS['W'][0]), px(COLS['W'][1])
    y0, y1 = px(BODY[0]), px(BODY[1])
    box = img.crop((W0, y0, W1, y1)); w = box.size[0]; data = box.tobytes()
    rules = []
    for r in range(box.size[1]):
        row = data[r * w:(r + 1) * w]
        if sum(1 for b in row if b < 200) > 0.9 * w:
            rules.append(y0 + r)
    groups = []                           # cada régua dupla vira um intervalo (início, fim)
    for y in rules:
        if groups and y - groups[-1][1] <= 12: groups[-1][1] = y
        else: groups.append([y, y])
    edges = [y0] + [v for g in groups for v in g] + [y1]
    out = []
    for a, b in zip(edges[0::2], edges[1::2]):
        if b - a < 30: continue
        g = img.crop((px(GUTTER[0]), a, px(GUTTER[1]), b)); gw = g.size[0]; gd = g.tobytes()
        dark = sum(1 for r in range(g.size[1]) if min(gd[r * gw:(r + 1) * gw]) < 160)
        out.append((a / K, b / K, dark > 0.6 * g.size[1]))
    return out


def find_numbers(pages):
    found = []
    for pi, ws in enumerate(pages):
        for w in ws:
            x0, y0, x1, y1, t = w
            if not re.fullmatch(r'\d{1,2}', t) or y1 - y0 < 12 or not (y0 > BODY[0] and y1 < BODY[1]): continue
            if not (abs(x0 - 28.3) < 1.2 or abs(x0 - 311.8) < 1.2): continue
            same = [v for v in ws if v is not w and abs(v[1] - y0) < 3 and (v[0] < 297) == (x0 < 297)]
            if same: continue
            found.append((int(t), pi, x0, y0))
    nums = [f[0] for f in found]
    if sorted(nums) != list(range(1, 61)) or len(set(nums)) != 60:
        sys.exit(f'números de questão achados: {sorted(nums)} (esperado 1 a 60, uma vez cada)')
    return {n: (pi, x0, y0) for n, pi, x0, y0 in found}


def region_bottom(img, ws, x0, x1, top, limit):
    """Fim da questão: última palavra preta da região, estendida enquanto houver tinta logo abaixo."""
    inside = [w for w in ws if w[0] >= x0 - 1 and w[2] <= x1 + 1 and w[1] >= top - 1 and w[3] <= limit + 1
              and w[4] != 'Continua' and is_ink_word(img, w)]
    if not inside: sys.exit(f'região sem texto em y={top:.0f}')
    bottom = max(w[3] for w in inside)
    if bottom >= limit - 1: return min(bottom, limit)
    rows = ink_rows(img, x0, x1, bottom, limit)
    gap, last = 0, 0
    for i, r in enumerate(rows):
        if r: last, gap = i + 1, 0
        else:
            gap += 1
            if gap > 6: break
    return bottom + last / K


def save(img, box, path):
    x0, y0, x1, y1 = box
    crop = img.crop((px(x0), px(y0), px(x1), px(y1))).convert('RGB')
    crop.save(path, 'WEBP', quality=82, method=6)
    return crop.size


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--pdf', default=os.path.join(ROOT, 'fontes', 'prova-2023-manutencao-eletrica.pdf'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'provas', EXAM_ID))
    ap.add_argument('--folha', help='pasta para gravar as folhas de conferência (todas as questões lado a lado)')
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    pages = words_by_page(a.pdf)
    with tempfile.TemporaryDirectory() as tmp:
        imgs = render(a.pdf, tmp)
        starts = find_numbers(pages)
        page_bands = {pi: bands(imgs[pi]) for pi in sorted({s[0] for s in starts.values()})}
        img_meta, boxes = {}, {}
        for n in range(1, 61):
            pi, x0, y0 = starts[n]
            band = next(b for b in page_bands[pi] if b[0] <= y0 <= b[1])
            col = ('L' if x0 < 297 else 'R') if band[2] else 'W'
            cx0, cx1 = COLS[col]
            nxt = [s[2] for m, s in starts.items() if s[0] == pi and band[0] <= s[2] <= band[1] and s[2] > y0
                   and (col == 'W' or (s[1] < 297) == (col == 'L'))]
            limit = (min(nxt) - 4) if nxt else band[1] - 2
            top = max(y0 - 5, band[0] + 2)   # sem pegar a régua de cima da faixa
            bottom = region_bottom(imgs[pi], pages[pi], cx0, cx1, top, limit) + 6
            boxes[n] = (pi, col, (cx0, top, cx1, min(bottom, limit)))
            w, h = save(imgs[pi], boxes[n][2], os.path.join(a.out, f'q{n:03d}.webp'))
            img_meta[str(n)] = {'f': f'q{n:03d}.webp', 'w': w, 'h': h}
        # Texto-base (página 2): o título "Brasil, paraíso dos agrotóxicos", a coluna esquerda e o topo da direita até a questão 1.
        p2 = starts[1][0]; ws = pages[p2]
        title = min(w[1] for w in ws if w[4] == 'Brasil,' and w[0] < 297)  # o título, não o "O Brasil" do texto
        lb = region_bottom(imgs[p2], ws, *COLS['L'], title, BODY[1] - 2) + 6
        rb = region_bottom(imgs[p2], ws, *COLS['R'], BODY[0] + 4, starts[1][2] - 4) + 6
        left = imgs[p2].crop((px(COLS['L'][0]), px(title - 6), px(COLS['L'][1]), px(lb)))
        right = imgs[p2].crop((px(COLS['R'][0]), px(BODY[0] + 4), px(COLS['R'][1]), px(rb)))
        sw = max(left.width, right.width)
        sh = Image.new('L', (sw, left.height + right.height), 255)
        sh.paste(left, (0, 0)); sh.paste(right, (0, left.height))
        sh.convert('RGB').save(os.path.join(a.out, SHARED['1-7']), 'WEBP', quality=82, method=6)
        shared = {'1-7': {'f': SHARED['1-7'], 'w': sh.width, 'h': sh.height}}
        if a.folha: folhas(a.folha, a.out, img_meta, shared, boxes)
    write_data(img_meta, shared)
    for n in range(1, 61):
        pi, col, (x0, y0, x1, y1) = boxes[n]
        print(f'q{n:02d}  pág. {pi + 1:2d}  {col}  y {y0:5.1f}–{y1:5.1f} pt  {img_meta[str(n)]["w"]}×{img_meta[str(n)]["h"]} px')
    print(f's001  texto-base 1-7  {shared["1-7"]["w"]}×{shared["1-7"]["h"]} px')


def folhas(dest, out, img_meta, shared, boxes):
    """Folhas de conferência: cada recorte com uma moldura, para olhar todos de uma vez (sem figura ou alternativa cortada)."""
    os.makedirs(dest, exist_ok=True)
    items = [('s001', shared['1-7']['f'])] + [(f'q{n:02d}', img_meta[str(n)]['f']) for n in range(1, 61)]
    per = 6
    for i in range(0, len(items), per):
        ims = [(lbl, Image.open(os.path.join(out, f)).convert('RGB')) for lbl, f in items[i:i + per]]
        scale = 0.5
        ims = [(l, im.resize((int(im.width * scale), int(im.height * scale)))) for l, im in ims]
        W = 3 * 780; rows = [ims[j:j + 3] for j in range(0, len(ims), 3)]
        H = sum(max(im.height for _, im in r) + 40 for r in rows)
        sheet = Image.new('RGB', (W, H), (120, 120, 120))
        y = 0
        from PIL import ImageDraw
        d = ImageDraw.Draw(sheet)
        for r in rows:
            x = 0
            for lbl, im in r:
                d.text((x + 6, y + 6), lbl, fill=(255, 255, 0))
                sheet.paste(im, (x + 4, y + 30))
                x += max(780, im.width + 10)
            y += max(im.height for _, im in r) + 40
        sheet.save(os.path.join(dest, f'folha-{i // per + 1:02d}.png'))


def write_data(img_meta, shared):
    gab = json.load(open(os.path.join(ROOT, 'fontes', 'gabarito-2023.json'), encoding='utf-8'))
    key = {str(n): gab['gabarito'][str(n)] for n in range(1, 61)}
    exam = {
        'id': EXAM_ID, 'ano': 2023, 'title': TITLE, 'sub': SUB, 'first': 1, 'last': 60,
        'key': key, 'status': 'pendente', 'fonte': FONTE, 'capa': CAPA, 'pontos': PONTOS, 'duracao': DURACAO_MIN,
        'anuladas': gab['anuladas'], 'notas': {str(k): v for k, v in NOTAS.items()},
        'itens': {str(n): MAPA[n][0] for n in sorted(MAPA)},
        'img': img_meta, 'shared': shared,
    }
    mapa = {str(n): MAPA[n][1] for n in sorted(MAPA)}
    head = ('/* Elétrica de Ouro: prova Transpetro 2023 (Manutenção – Elétrica) recortada por questão.\n'
            '   GERADO por tools/recorta_prova.py: não edite à mão. Gabarito: fontes/gabarito-2023.json (oficial, após recursos).\n'
            '   mapa2023[questão] = estação, para a Missão de hoje e a Recalibração (questões 11 a 60). */\n')
    body = ('window.DATA.exams[' + json.dumps(EXAM_ID) + '] = ' + json.dumps(exam, ensure_ascii=False) + ';\n'
            'window.DATA.mapa2023 = ' + json.dumps(mapa, ensure_ascii=False) + ';\n')
    open(os.path.join(ROOT, 'data', 'provas.js'), 'w', encoding='utf-8').write(head + body.replace('</', '<\\/'))


if __name__ == '__main__':
    main()

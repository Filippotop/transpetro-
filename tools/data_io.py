"""Lê e grava data/*.js (window.DATA = {...}) sem mudar nada além do que foi editado."""
import json

def load(path):
    src = open(path, encoding='utf-8').read()
    head, rest = src.split('window.DATA = ', 1)
    return head, json.loads(rest.rstrip().rstrip(';'))

def dump(path, head, data):
    body = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
    open(path, 'w', encoding='utf-8').write(head + 'window.DATA = ' + body + ';\n')

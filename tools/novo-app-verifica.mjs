#!/usr/bin/env node
/* Verificação de um app gerado por tools/novo-app.mjs, num Chrome de verdade (Playwright), em 390×844, nos temas
   escuro e claro. Confere: sem erros de página nem de console (exceto falhas de rede para fontes externas), título e
   manifest sem palavras de outra matéria, texto das telas sem essas palavras, estouro horizontal no celular, service
   worker registrado e o shell em cache. Salva screenshots e um relatório JSON.
   Uso: node tools/novo-app-verifica.mjs --url http://localhost:8765/ --saida <pasta> [--chrome <caminho>]
   Pré-requisito: o app servido (ex.: python -m http.server 8765 dentro da pasta gerada). */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, all) => (v.startsWith('--') ? [...acc, [v.slice(2), all[i + 1]]] : acc), []));
const URL_APP = args.url;
const SAIDA = args.saida;
const CHROME = args.chrome || process.env.CHROMIUM;
if (!URL_APP || !SAIDA || !args.chave || !args.prefixo) { console.error('uso: --url <endereço> --saida <pasta> --prefixo <ex.: qdo-> --chave <ex.: quimica-de-ouro-v1> [--chrome <chrome.exe>]'); process.exit(1); }
fs.mkdirSync(SAIDA, { recursive: true });

/* Palavras de outra matéria. Se alguma aparecer no app gerado, algo do Elétrica sobrou. */
const PROIBIDO = /Elétrica|Eletrica de Ouro|Transpetro|NR-10|Humanas|ENEM|Cesgranrio|edo-/i;
const VIEWS = ['linhas', 'provas', 'biblioteca', 'arena', 'treino', 'plano', 'painel'];
const relatorio = { url: URL_APP, temas: {}, erros: [], sobras: [], ok: true };
const falha = (msg) => { relatorio.ok = false; relatorio.erros.push(msg); };
/* Pedidos a fontes externas (Google Fonts, CDNs) podem falhar sem internet; não são erro do app. */
const externo = (u) => !u.startsWith(new URL(URL_APP).origin);

const browser = await chromium.launch({ executablePath: CHROME || undefined, headless: true });
for (const tema of ['dark', 'light']) {
  const t = { erros: [], consoleErros: [], shot: [] };
  relatorio.temas[tema] = t;
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: tema, deviceScaleFactor: 1, serviceWorkers: 'allow' });
  const page = await ctx.newPage();
  page.on('pageerror', e => t.erros.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') t.consoleErros.push(m.text()); });
  page.on('requestfailed', r => { if (!externo(r.url())) t.erros.push('falha de rede local: ' + r.url()); });
  await page.goto(URL_APP, { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  /* Service worker registrado e shell em cache. */
  const sw = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return { suportado: false };
    const reg = await navigator.serviceWorker.ready.catch(() => null);
    const keys = await caches.keys();
    return { suportado: true, registrado: !!reg, escopo: reg && reg.scope, caches: keys };
  });
  t.sw = sw;
  if (!sw.registrado) falha(`[${tema}] service worker não registrou`);
  if (args.prefixo && !sw.caches.some(k => k.startsWith(args.prefixo))) falha(`[${tema}] nenhum cache com o prefixo ${args.prefixo}`);

  /* Título e manifest. */
  const titulo = await page.title();
  const manifest = await page.evaluate(async () => (await fetch('manifest.webmanifest')).text());
  for (const [nome, txt] of [['title', titulo], ['manifest', manifest]]) {
    if (PROIBIDO.test(txt)) falha(`[${tema}] ${nome} tem palavra de outra matéria: ${txt.match(PROIBIDO)[0]}`);
  }
  t.titulo = titulo;

  /* Estouro horizontal no celular (390 px). */
  const estouro = async () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

  /* Cada tela principal: texto sem palavras de outra matéria, sem estouro, sem erro. */
  for (const v of VIEWS) {
    const ok = await page.$(`#tabs button[data-v="${v}"]`);
    if (!ok) { falha(`[${tema}] aba ${v} não existe na barra`); continue; }
    await page.click(`#tabs button[data-v="${v}"]`);
    await page.waitForTimeout(350);
    const txt = await page.evaluate(() => document.querySelector('#app').innerText);
    if (PROIBIDO.test(txt)) { relatorio.sobras.push(`${tema}/${v}: ${txt.match(PROIBIDO)[0]}`); }
    const over = await estouro();
    if (over > 0) falha(`[${tema}] aba ${v} estoura ${over}px na horizontal a 390 px`);
    if (tema === 'dark' || v === 'linhas') await page.screenshot({ path: path.join(SAIDA, `${tema}-${v}.png`), fullPage: false });
  }

  /* Estação de exemplo: abre pelo link direto (#EX1) numa carga nova, responde uma questão e confere as chaves salvas. */
  await page.goto('about:blank');
  await page.goto(URL_APP + '#EX1', { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const txtEx = await page.evaluate(() => document.querySelector('#app').innerText);
  if (!/Estação de exemplo/.test(txtEx)) falha(`[${tema}] a estação EX1 não abriu pelo link #EX1`);
  if (PROIBIDO.test(txtEx)) relatorio.sobras.push(`${tema}/EX1: ${txtEx.match(PROIBIDO)[0]}`);
  await page.screenshot({ path: path.join(SAIDA, `${tema}-estacao-EX1.png`), fullPage: false });
  t.shot.push(path.join(SAIDA, `${tema}-estacao-EX1.png`));
  try {
    await page.getByRole('button', { name: /^Questões/ }).first().click({ timeout: 4000 });
    await page.waitForTimeout(500);
    await page.locator('.alt').first().click({ timeout: 4000 });
    await page.waitForTimeout(800);
    const chaves = await page.evaluate(() => Object.keys(localStorage));
    t.chaves = chaves;
    if (!chaves.includes(args.chave || '')) falha(`[${tema}] após responder, a chave ${args.chave} não foi gravada (gravou: ${chaves.join(', ')})`);
    if (chaves.some(k => /^edo-|eletrica-de-ouro/.test(k))) falha(`[${tema}] gravou chave de outro app: ${chaves.join(', ')}`);
    await page.screenshot({ path: path.join(SAIDA, `${tema}-questao-EX1.png`), fullPage: false });
    t.shot.push(path.join(SAIDA, `${tema}-questao-EX1.png`));
  } catch (e) { t.questaoNaoTestada = String(e.message).split('\n')[0]; falha(`[${tema}] não consegui responder a questão de exemplo: ${t.questaoNaoTestada}`); }

  t.erros.forEach(e => falha(`[${tema}] ${e}`));
  t.consoleErros = t.consoleErros.filter(m => !/fonts|googleapis|gstatic/i.test(m));
  if (t.consoleErros.length) falha(`[${tema}] ${t.consoleErros.length} erro(s) de console: ${t.consoleErros.slice(0, 3).join(' | ')}`);
  await ctx.close();
}
await browser.close();
if (relatorio.sobras.length) falha(`palavras de outra matéria nas telas: ${relatorio.sobras.join('; ')}`);
fs.writeFileSync(path.join(SAIDA, 'relatorio.json'), JSON.stringify(relatorio, null, 2));
console.log(JSON.stringify({ ok: relatorio.ok, erros: relatorio.erros, titulo: relatorio.temas.dark && relatorio.temas.dark.titulo, sw: relatorio.temas.dark && relatorio.temas.dark.sw, saida: SAIDA }, null, 2));
process.exit(relatorio.ok ? 0 : 1);

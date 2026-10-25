/* Elétrica de Ouro: service worker da raiz. Cobre o app e a Bancada (bancada/), que não tem service worker próprio.
   Mude VER a cada publicação: é o que faz os aparelhos baixarem a versão nova.
   Caches com prefixo edo-: o Humanas de Ouro (mesma origem github.io) usa hdo- e apaga só os dele. */
const VER='2026-10-25.7';
const SHELL='edo-shell-'+VER, IMGS='edo-provas-v1', RUNTIME='edo-runtime-v1';
const SHELL_FILES=['./','index.html','data/base.js','data/estacoes/E1.js','data/estacoes/E2.js','data/estacoes/E3.js','data/estacoes/M1.js','data/estacoes/M2.js','data/estacoes/I1.js','data/embreve.js','data/questoes.js','js/calc.js','js/gerador.js','css/estacao.css','merge.js','gist-sync.js','manifest.webmanifest','pwa.js','icons/icon.svg','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
/* A Bancada inteira, para abrir sem internet depois da primeira visita ao app. */
const BANCADA_FILES=[
  'bancada/',
  'bancada/index.html',
  'bancada/manifest.webmanifest',
  'bancada/css/app.css',
  'bancada/icons/apple-touch-icon.png',
  'bancada/icons/icon-192.png',
  'bancada/icons/icon-512.png',
  'bancada/icons/icon.svg',
  'bancada/js/app.js',
  'bancada/js/draw.js',
  'bancada/js/engine.js',
  'bancada/js/instruments.js',
  'bancada/js/mastery.js',
  'bancada/js/review.js',
  'bancada/js/store.js',
  'bancada/js/util.js',
  'bancada/js/apostila/edital.js',
  'bancada/js/apostila/index.js',
  'bancada/js/apostila/potencia-trifasicos.js',
  'bancada/js/missions/cmd.js',
  'bancada/js/missions/dr.js',
  'bancada/js/missions/index.js',
  'bancada/js/missions/mot.js',
  'bancada/js/missions/qd.js',
  'bancada/js/ui/apostila.js'
];
/* Imagens das provas (provas/<id>/...), baixadas só com consentimento (ver pwa.js). A prova de 2023 entra na Task 5. */
const IMAGES=[];

self.addEventListener('install',e=>{ e.waitUntil(caches.open(SHELL).then(c=>c.addAll(SHELL_FILES.concat(BANCADA_FILES))).then(()=>self.skipWaiting())); });
/* Caches da Bancada de quando ela morava na raiz (bancada-shell-*, bancada-runtime-v1): guardam index.html, manifest e
   ícones da raiz e não podem sobreviver. Só apaga os que têm URL neste escopo fora de bancada/; a cópia da Bancada no
   Humanas de Ouro (mesma origem, URLs em /humanas-de-ouro/bancada/) fica intocada. */
async function oldRootBancada(k){
  if(!(k.startsWith('bancada-shell-')||k==='bancada-runtime-v1')) return false;
  const scope=self.registration.scope, sub=scope+'bancada/';
  const reqs=await (await caches.open(k)).keys();
  return reqs.some(r=>r.url.startsWith(scope)&&!r.url.startsWith(sub));
}
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(async k=>{
    if((k.startsWith('edo-shell-')&&k!==SHELL)||await oldRootBancada(k)) await caches.delete(k);
  }))).then(()=>self.clients.claim())); });

/* Procura só nos caches deste app: caches.match() olharia todos os caches da origem, inclusive os de outros apps. */
const fromShell=(req,opt)=>caches.open(SHELL).then(c=>c.match(req,opt));

/* Página guardada para cada navegação: a Bancada tem a sua (bancada/index.html), o resto é o app (index.html). */
function pageKey(url){ return /\/bancada(\/|$)/.test(url.pathname)?'bancada/index.html':'index.html'; }

self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.hostname==='api.github.com') return; /* sincronização: sempre da rede, nunca do cache */
  if(req.mode==='navigate'){
    const key=pageKey(url);
    e.respondWith(fetch(req).then(r=>{ if(r.ok){ const cp=r.clone(); caches.open(SHELL).then(c=>c.put(key,cp)); } return r; }).catch(()=>fromShell(key,{ignoreSearch:true})));
    return;
  }
  if(url.origin===location.origin&&url.pathname.includes('/provas/')){
    e.respondWith(caches.open(IMGS).then(c=>c.match(req).then(hit=>hit||fetch(req).then(r=>{ if(r.ok) c.put(req,r.clone()); return r; }))));
    return;
  }
  /* Mesma origem: ignora ?v= etc. (a Bancada importa módulos sem parâmetros, mas por garantia). */
  const same=url.origin===location.origin;
  e.respondWith((same?fromShell(req,{ignoreSearch:true}):caches.open(RUNTIME).then(c=>c.match(req))).then(hit=>{
    const net=fetch(req).then(r=>{ if(r&&(r.ok||r.type==='opaque')){ const cp=r.clone(); caches.open(same?SHELL:RUNTIME).then(c=>c.put(req,cp)); } return r; });
    if(hit){ e.waitUntil(net.catch(()=>{})); return hit; }
    return net;
  }));
});

let warming=false;
async function warm(){
  if(warming) return; warming=true;
  const c=await caches.open(IMGS); const have=new Set((await c.keys()).map(r=>new URL(r.url).pathname.split('/provas/')[1]));
  const todo=IMAGES.filter(p=>!have.has(p)); let n=IMAGES.length-todo.length; const fresh=todo.length>0;
  const post=async(done)=>{ for(const cl of await self.clients.matchAll()) cl.postMessage({type:'warm-progress',have:n,total:IMAGES.length,done,fresh}); };
  let last=0;
  for(let i=0;i<todo.length;i+=6){
    await Promise.all(todo.slice(i,i+6).map(p=>fetch('provas/'+p).then(r=>{ if(r.ok){ n++; return c.put('provas/'+p,r); } }).catch(()=>{})));
    if(Date.now()-last>400){ last=Date.now(); await post(false); }
  }
  await post(true); warming=false;
}
self.addEventListener('message',e=>{ if(e.data&&e.data.type==='warm') e.waitUntil(warm()); });

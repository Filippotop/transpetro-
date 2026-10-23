/* Bancada Virtual de Manutenção: service worker (app offline).
   Mude VER a cada publicação: é o que faz os aparelhos baixarem a versão nova. */
const VER = '2026-10-23.1';
const SHELL = 'bancada-shell-' + VER, RUNTIME = 'bancada-runtime-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'js/app.js', 'js/engine.js', 'js/store.js', 'js/review.js', 'js/util.js', 'js/instruments.js', 'js/draw.js',
  'js/missions/index.js', 'js/missions/cmd.js', 'js/missions/qd.js', 'js/missions/mot.js', 'js/missions/dr.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('bancada-shell-') && k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* A página pede a troca de versão quando o aluno toca em “Atualizar”. */
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(SHELL).then(c => c.put('index.html', cp)); } return r; })
      .catch(() => caches.match('index.html', { ignoreSearch: true })));
    return;
  }
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !fonts) return;
  /* Cache primeiro; a rede atualiza em segundo plano (stale-while-revalidate). */
  e.respondWith(caches.match(req, { ignoreSearch: !fonts }).then(hit => {
    const net = fetch(req).then(r => {
      if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(fonts ? RUNTIME : SHELL).then(c => c.put(req, cp)); }
      return r;
    });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});

/* Elétrica de Ouro: sincronização automática entre aparelhos por um Gist secreto do próprio usuário.
   Só no app instalado / github.io (a versão dentro do Claude não alcança serviços externos).
   A chave fica em localStorage['edo-gist'], fora do progresso: nunca entra na exportação nem no link mágico. */
(function(){
  if(!window.__PWA) return;
  const K='edo-gist', DESC='eletrica-de-ouro-progresso', FILE='eletrica-de-ouro-progresso.json', API='https://api.github.com';
  let cfg=null; try{ cfg=JSON.parse(localStorage.getItem(K)||'null'); }catch(e){}
  let state=cfg&&cfg.gistId?'ok':'off', at=null, busy=null, again=false, timer=null;

  const err=code=>Object.assign(new Error(code),{code});
  async function api(path,opt={}){
    let r; try{ r=await fetch(API+path,{...opt,cache:'no-store',headers:{Authorization:'Bearer '+cfg.token,Accept:'application/vnd.github+json','Content-Type':'application/json'}}); }
    catch(e){ throw err('offline'); }
    if(r.status===401||r.status===403) throw err('auth');
    if(!r.ok) throw err('offline');
    return r.json();
  }
  async function readGist(){
    const g=await api('/gists/'+cfg.gistId); const f=g.files&&g.files[FILE]; if(!f) return null;
    let txt=f.content; if(f.truncated&&f.raw_url) txt=await (await fetch(f.raw_url,{cache:'no-store'})).text();
    try{ return JSON.parse(txt); }catch(e){ return null; }
  }
  /* Telas que guardam referências ao progresso em memória: trocar S no meio perderia o que é digitado. */
  const busyView=()=>view==='prova';
  /* Comparação sem depender da ordem das chaves (a junção remonta os objetos). */
  const canon=x=>JSON.stringify(x,(k,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.keys(v).sort().reduce((o,kk)=>(o[kk]=v[kk],o),{}):v);
  const same=(x,y)=>canon(x)===canon(y);
  function apply(m){ S=m; fix(); try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} render(); }
  function fail(e){ state=e&&e.code==='auth'?'auth':'offline'; paint(); return state; }

  async function pull(){
    if(!cfg||!cfg.gistId||state==='auth'||busyView()) return false;
    try{ const remote=await readGist(); state='ok'; at=Date.now(); paint();
      if(!remote) return false; const m=mergeS(S,remote);
      /* O que só existe aqui (estudo sem internet, envio que falhou) sobe já, sem esperar outro save(). */
      if(!same(m,remote)) push();
      if(same(m,S)) return false; apply(m); return true; }
    catch(e){ fail(e); return false; }
  }
  /* Sempre lê o Gist antes de escrever: outro aparelho pode ter enviado depois da última leitura.
     Um envio pedido durante outro não se perde: roda de novo quando o primeiro termina. */
  function push(opts={}){
    if(!cfg||!cfg.gistId||state==='auth') return Promise.resolve();
    if(busy){ again=true; return busy; }
    busy=(async()=>{ try{
      const remote=await readGist();
      let out=S; if(remote){ const m=mergeS(S,remote); if(!busyView()&&!same(m,S)) apply(m); out=busyView()?m:S; }
      if(!remote||!same(out,remote)){
        const body=JSON.stringify({files:{[FILE]:{content:JSON.stringify(out)}}});
        await api('/gists/'+cfg.gistId,{method:'PATCH',body,keepalive:!!opts.quick&&body.length<60000}); }
      state='ok'; at=Date.now(); paint();
    }catch(e){ fail(e); } })().then(()=>{ busy=null; if(again){ again=false; return push(opts); } });
    return busy;
  }
  async function connect(token){
    token=(token||'').trim(); if(!token) return 'auth';
    cfg={token}; state='ok';
    try{
      const list=await api('/gists?per_page=100');
      let g=list.find(x=>x.description===DESC&&x.files&&x.files[FILE]);
      if(!g) g=await api('/gists',{method:'POST',body:JSON.stringify({description:DESC,public:false,files:{[FILE]:{content:JSON.stringify(S)}}})});
      cfg={token,gistId:g.id}; try{ localStorage.setItem(K,JSON.stringify(cfg)); }catch(e){}
      await pull(); await push(); return state;
    }catch(e){ const s=fail(e); if(s==='auth'){ cfg=null; try{ localStorage.removeItem(K); }catch(x){} } return s; }
  }
  function disconnect(){ cfg=null; state='off'; at=null; try{ localStorage.removeItem(K); }catch(e){} paint(); }
  function status(){ return {state,at}; }

  function label(){
    if(state==='auth') return 'sincronização parada: reconecte';
    if(state==='offline') return 'sem internet: salvo neste aparelho';
    if(state==='ok'&&at){ const m=Math.floor((Date.now()-at)/60000); return m<1?'sincronizado agora':`sincronizado há ${m} min`; }
    return state==='ok'?'sincronizando…':null;
  }
  function paint(){ const l=label(); if(l) try{ setSync(l); }catch(e){} const box=document.getElementById('gistBox'); if(box) mountUI(box); }
  setInterval(()=>{ if(state==='ok'&&at) paint(); },60000);

  function mountUI(box){
    const on=cfg&&cfg.gistId;
    box.innerHTML=on
      ?`<div class="panel" style="display:grid;gap:8px;padding:12px"><b>Sincronização entre aparelhos: ligada</b><span class="muted" style="font-size:13px">${esc(label()||'')}</span>
         <div class="row"><button class="btn" id="gsNow">Sincronizar agora</button><button class="btn ghost" id="gsOff">Desconectar este aparelho</button></div></div>`
      :`<div class="panel" style="display:grid;gap:8px;padding:12px"><b>Sincronizar automaticamente entre aparelhos</b>
         <p class="muted" style="font-size:13px;margin:0">O progresso fica num Gist secreto do seu GitHub e se junta sozinho entre o app e o site no computador. Faça uma vez por aparelho: <a href="https://github.com/settings/tokens/new?scopes=gist&description=El%C3%A9trica%20de%20Ouro" target="_blank" rel="noopener">crie uma chave</a> só com a permissão <b>gist</b> e cole aqui.</p>
         <input type="password" id="gsTok" placeholder="Cole a chave do GitHub (ghp_…)" autocomplete="off" aria-label="Chave do GitHub">
         <div class="row"><button class="btn gold" id="gsGo">Conectar</button></div>
         <p class="muted" style="font-size:12px;margin:0">Privacidade: um Gist secreto não aparece em buscas, mas quem tiver o link consegue abrir, e ele inclui suas anotações. A chave só dá acesso aos seus Gists e pode ser apagada no GitHub a qualquer momento.</p>
         <p class="muted" id="gsSt" style="font-size:12.5px;margin:0" aria-live="polite">${state==='auth'?'A última chave foi recusada: crie outra e conecte de novo.':''}</p></div>`;
    const g=box.querySelector('#gsGo'); if(g) g.onclick=async()=>{ const st=box.querySelector('#gsSt'); st.textContent='Conectando…'; g.disabled=true;
      const r=await connect(box.querySelector('#gsTok').value); if(r!=='ok'){ mountUI(box); box.querySelector('#gsSt').textContent=r==='auth'?'A chave foi recusada. Confira se ela tem a permissão gist.':'Sem conexão com o GitHub agora. Tente de novo com internet.'; } };
    const n=box.querySelector('#gsNow'); if(n) n.onclick=()=>pull().then(()=>push());
    const o=box.querySelector('#gsOff'); if(o) o.onclick=()=>{ if(!o.dataset.ok){ o.dataset.ok=1; o.textContent='Toque de novo: o progresso continua neste aparelho'; return; } disconnect(); };
  }

  window.onSaved=()=>{ if(!cfg||!cfg.gistId) return; clearTimeout(timer); timer=setTimeout(()=>{ timer=null; push(); },3000); };
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden'){ if(timer){ clearTimeout(timer); timer=null; push({quick:true}); } }
    else pull();
  });
  window.addEventListener('online',()=>{ if(state==='offline') state='ok'; pull().then(()=>push()); });
  window.GistSync={connect,pull,push,disconnect,status,mountUI};
  if(cfg&&cfg.gistId) pull();
})();

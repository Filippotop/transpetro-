/* Elétrica de Ouro: camada do app instalável (fora do Claude). Chaves de localStorage com prefixo edo-: o Humanas de Ouro usa a mesma origem. */
(function(){
  document.body.classList.add('has-tutor','is-pwa');
  const CLAUDE='https://claude.ai/new';
  const copy=txt=>new Promise((ok,no)=>{ try{ navigator.clipboard.writeText(txt).then(ok,no); }catch(e){ no(e); } });

  function extBox(out,html){ out.innerHTML=`<div class="tutor-out ext">${html}<p class="muted xst" aria-live="polite" style="margin:8px 0 0;font-size:12.5px"></p></div>`; return out.querySelector('.xst'); }

  /* Tutor de texto: copia a pergunta pronta para colar no Claude. */
  window.askTutor=async function(out,prompt){
    const st=extBox(out,`<p style="margin:0 0 8px">O tutor responde dentro do Claude. Copie a pergunta pronta, abra o Claude e cole numa conversa.</p>
      <div class="row"><button class="btn gold xc">Copiar pergunta</button><a class="btn" href="${CLAUDE}" target="_blank" rel="noopener">Abrir o Claude</a></div>
      <textarea class="xt" readonly hidden style="min-height:90px;font-size:12px;margin-top:8px"></textarea>`);
    out.querySelector('.xc').onclick=()=>copy(prompt).then(()=>{ st.textContent='Copiada. Abra o Claude e cole.'; },()=>{ const ta=out.querySelector('.xt'); ta.hidden=false; ta.value=prompt; ta.focus(); ta.select(); st.textContent='Copie o texto selecionado manualmente.'; });
  };

  /* Tutor das provas: compartilha a imagem da questão com o Claude e copia o pedido. */
  window.explainOfficial=async function(out,id,n,his){
    const e=EX[id]; const sh=Object.entries(e.shared||{}).find(([kk])=>{ const [a,b]=kk.split('-').map(Number); return n>=a&&n<=b; });
    const prompt=officialPrompt(id,n,his,sh);
    const st=extBox(out,`<p style="margin:0 0 8px">O tutor com imagem roda no Claude. O botão abaixo copia o pedido e abre o compartilhamento: escolha o app do Claude, cole o pedido junto da imagem e envie.</p>
      <div class="row"><button class="btn gold xs">Enviar questão ao Claude</button><button class="btn xc">Só copiar o pedido</button><a class="btn" href="${imgUrl(id,n)}" target="_blank" rel="noopener">Abrir a imagem</a></div>`);
    out.querySelector('.xc').onclick=()=>copy(prompt).then(()=>st.textContent='Pedido copiado.',()=>st.textContent='Não consegui copiar.');
    let files=null;
    (async()=>{ try{ let blobs=await imgBlobs(imgUrl(id,n)); if(sh) blobs=(await imgBlobs(`provas/${id}/${sh[1].f}`)).concat(blobs);
      files=blobs.slice(0,4).map((b,i)=>new File([b],`questao-${n}-parte-${i+1}.png`,{type:'image/png'})); }catch(err){ files=false; } })();
    out.querySelector('.xs').onclick=async()=>{
      copy(prompt).catch(()=>{});
      if(files===null){ st.textContent='Preparando a imagem, toque de novo em um segundo.'; return; }
      if(!files||!(navigator.canShare&&navigator.canShare({files}))){ st.textContent='Este navegador não compartilha imagens. O pedido foi copiado: abra a imagem, salve e anexe no Claude.'; return; }
      try{ await navigator.share({files,text:prompt}); st.textContent='Se o Claude abrir sem o texto, cole o pedido (já está copiado) antes de enviar.'; }
      catch(err){ st.textContent= err&&err.name==='AbortError' ? 'Compartilhamento cancelado.' : 'Não consegui compartilhar. Use "Abrir a imagem" e anexe no Claude; o pedido já está copiado.'; }
    };
  };

  /* Selo de sincronização */
  try{ setSync('salvo neste aparelho'); }catch(e){}

  /* Toast de status */
  const toast=document.createElement('div'); toast.id='pwaToast'; toast.hidden=true; toast.setAttribute('role','status'); document.body.appendChild(toast);
  let tt, sticky=false; function say(html,ms,stk){ if(sticky&&!stk) return; sticky=!!stk; toast.innerHTML=html; toast.hidden=false; clearTimeout(tt); if(ms) tt=setTimeout(()=>{ toast.hidden=true; sticky=false; },ms); }
  const unstick=()=>{ sticky=false; toast.hidden=true; };


  /* Progresso vindo do Claude pelo link mágico (#importar=...) */
  (function(){
    const h=location.hash; if(!h.startsWith('#importar=')) return;
    const code=decodeURIComponent(h.slice(10)); try{ history.replaceState(null,'',location.pathname+location.search); }catch(e){}
    unpackS(code).then(r=>{
      const here=countRec(S), there=countRec(r);
      say(`<span>Chegou o progresso do Claude: ${there} registros (aqui: ${here}). Importar substitui o deste aparelho.</span><button class="btn gold" id="pwaImp">Importar</button><button class="btn" id="pwaImpNo">Agora não</button>`,0,true);
      document.getElementById('pwaImp').onclick=()=>{ applyImport(r); sticky=false; say('<span>Progresso importado.</span>',3000); };
      document.getElementById('pwaImpNo').onclick=unstick;
    }).catch(()=>say('<span>O link de progresso veio incompleto. No Claude, use Aa → Copiar código do progresso e cole aqui no mesmo menu.</span>',7000));
  })();

  /* Instalação */
  let deferred=null;
  const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferred=e; if(!isStandalone()) offerInstall(); });
  function offerInstall(){
    let seen=0; try{ seen=+localStorage.getItem('edo-pwa-install-seen')||0; }catch(e){}
    if(Date.now()-seen<3*864e5) return;
    say(`<span>Instale o Elétrica de Ouro como app.</span><button class="btn gold" id="pwaInst">Instalar</button><button class="btn" id="pwaNo" aria-label="Agora não">Agora não</button>`);
    document.getElementById('pwaInst').onclick=async()=>{ toast.hidden=true; if(deferred){ deferred.prompt(); await deferred.userChoice.catch(()=>{}); deferred=null; } };
    document.getElementById('pwaNo').onclick=()=>{ toast.hidden=true; try{ localStorage.setItem('edo-pwa-install-seen',Date.now()); }catch(e){} };
  }
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(ios&&!isStandalone()) setTimeout(()=>{ let seen=0; try{ seen=+localStorage.getItem('edo-pwa-install-seen')||0; }catch(e){} if(Date.now()-seen>3*864e5){ say(`<span>Para instalar: toque em Compartilhar e depois em <b>Adicionar à Tela de Início</b>.</span><button class="btn" id="pwaNo">Ok</button>`); document.getElementById('pwaNo').onclick=()=>{ toast.hidden=true; try{ localStorage.setItem('edo-pwa-install-seen',Date.now()); }catch(e){} }; } },2500);

  /* Service worker e download das imagens das provas para uso offline.
     No Wi-Fi baixa sozinho; fora dele (ou quando o aparelho não diz, como no iPhone) pergunta antes. Sem imagens, não pergunta nada. */
  let warmed=false;
  const N_IMGS=Object.values((window.DATA||{}).exams||{}).reduce((a,e)=>a+Object.keys(e.img||{}).length+Object.keys(e.shared||{}).length,0);
  const WARM_MB=Math.max(1,Math.round(N_IMGS*0.06)), WARM_OK='edo-pwa-warm-ok', WARM_LATER='edo-pwa-warm-later';
  const onWifi=()=>{ const c=navigator.connection; return !!c&&!c.saveData&&(c.type==='wifi'||c.type==='ethernet'); };
  async function mayWarm(){
    try{ if(localStorage.getItem(WARM_OK)) return true; }catch(e){}
    if(onWifi()) return true;
    try{ if((await (await caches.open('edo-provas-v1')).keys()).length>=N_IMGS) return true; }catch(e){} /* quem já tinha baixado antes desta versão */
    return false;
  }
  function askWarm(go){
    let later=0; try{ later=+localStorage.getItem(WARM_LATER)||0; }catch(e){}
    if(Date.now()-later<864e5) return;
    say(`<span>Baixar as provas (${WARM_MB} MB) para usar sem internet? Prefira o Wi-Fi.</span><button class="btn gold" id="pwaWarm">Baixar</button><button class="btn" id="pwaWarmNo">Depois</button>`,0,true);
    document.getElementById('pwaWarm').onclick=()=>{ try{ localStorage.setItem(WARM_OK,'1'); }catch(e){} unstick(); go(); };
    document.getElementById('pwaWarmNo').onclick=()=>{ try{ localStorage.setItem(WARM_LATER,Date.now()); }catch(e){} unstick(); };
  }
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(reg=>{
      const post=()=>{ const w=reg.active||navigator.serviceWorker.controller; if(w) w.postMessage({type:'warm'}); };
      const warm=()=>{ if(!N_IMGS){ warmed=true; try{ setSync('funciona offline'); }catch(e){} return; } mayWarm().then(ok=>ok?post():askWarm(post)); };
      if(reg.active) warm(); else navigator.serviceWorker.addEventListener('controllerchange',warm,{once:true});
      reg.addEventListener('updatefound',()=>{ const nw=reg.installing; if(!nw) return; nw.addEventListener('statechange',()=>{ if(nw.state==='activated'&&navigator.serviceWorker.controller) say(`<span>Nova versão do app disponível.</span><button class="btn gold" id="pwaRl">Atualizar</button>`); const b=document.getElementById('pwaRl'); if(b) b.onclick=()=>location.reload(); }); });
    }).catch(()=>{});
    navigator.serviceWorker.addEventListener('message',e=>{ const d=e.data||{};
      if(d.type==='warm-progress'&&!d.done){ say(`<span>Baixando as provas para usar sem internet: ${d.have}/${d.total}</span>`); }
      if(d.type==='warm-progress'&&d.done){ warmed=d.have>=d.total; if(d.fresh) say(warmed?'<span>Pronto: o app inteiro funciona sem internet.</span>':`<span>Baixei ${d.have} de ${d.total} imagens das provas. O resto vem na próxima vez com internet.</span>`,4000); else toast.hidden=true; if(warmed) try{ setSync('funciona offline'); }catch(err){} }
    });
  }
  window.addEventListener('offline',()=>say(warmed?'<span>Sem internet: tudo continua funcionando, menos o tutor.</span>':'<span>Sem internet: o estudo continua, mas as imagens de prova que você ainda não abriu não carregam.</span>',5000));
})();

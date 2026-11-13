/* Movimento do Elétrica de Ouro (GSAP). Base: motion.js do Humanas de Ouro, sem rolagem suave nem fundo WebGL.
   Modos (preferência "animações" em Aa): auto, full, light, off. "Reduzir movimento" do aparelho força off.
   Nada aqui muda dado nem texto que o leitor de tela lê; com off, a página fica como era. */
(function(){
  if(!window.gsap) return;
  const root=document.documentElement, app=document.getElementById('app'); if(!app) return;
  const RM=matchMedia('(prefers-reduced-motion: reduce)');
  const lowEnd=(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4);
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  const SEL='.pagehead,.panel,.stat,.task,.next,.line,.aring,.excard,.q,.fc,.err,.game,.prompt';
  let cur='', undo=[], lastKey=null, io=null;

  const mode=()=>{ const p=root.dataset.motion||'auto'; if(RM.matches||p==='off') return 'off'; if(p==='auto') return lowEnd?'light':'full'; return p; };

  /* Uma linha do mapa "liga": o trilho é desenhado e as estações acendem em sequência. */
  function energize(line,delay){
    const tr=line.querySelector('.stations'); if(!tr) return;
    gsap.fromTo(tr,{'--draw':0},{'--draw':1,duration:.7,delay,ease:'power2.inOut',clearProps:'--draw'});
    gsap.from(tr.querySelectorAll('.st .c'),{scale:0,duration:.4,delay:delay+.12,ease:'back.out(2.4)',stagger:.08,clearProps:'transform'});
  }

  function enter(){
    if(cur==='off') return;
    /* a corrente passa na linha do próximo passo da missão */
    const nx=app.querySelector('.next'), lc=nx&&[...nx.classList].find(c=>c.startsWith('lc-'));
    const live=lc&&app.querySelector('.line.'+lc); if(live) live.classList.add('live');
    const key=document.body.dataset.view; if(key===lastKey) return; lastKey=key; // só ao trocar de tela
    const vh=innerHeight, all=[...app.querySelectorAll(SEL)].filter(e=>!e.parentElement.closest(SEL));
    /* Só o que está na tela entra animado. Nada fica escondido à espera da rolagem: o axe lê texto com opacidade 0
       como contraste reprovado, e conteúdo invisível por falha de script seria pior que conteúdo sem animação. */
    const now=all.filter(e=>e.getBoundingClientRect().top<vh).slice(0,30);
    if(now.length) gsap.from(now,{opacity:0,y:14,duration:.45,ease:'power3.out',stagger:{amount:Math.min(.4,now.length*.05)},clearProps:'opacity,transform'});
    if(io) all.filter(e=>e.matches('.line')&&!now.includes(e)).forEach(e=>io.observe(e)); // linha fora da tela liga quando aparecer
    now.filter(e=>e.matches('.line')).forEach((l,i)=>energize(l,.25+i*.12));
    app.querySelectorAll('.aring circle[stroke-dasharray]').forEach(c=>{
      const [a,b]=c.getAttribute('stroke-dasharray').split(' ').map(Number);
      gsap.fromTo(c,{attr:{'stroke-dasharray':'0 '+b}},{attr:{'stroke-dasharray':a+' '+b},duration:1,delay:.2,ease:'power2.out'});
    });
    app.querySelectorAll('.bar2 i').forEach(i=>{ const w=i.style.width; if(w) gsap.fromTo(i,{width:'0%'},{width:w,duration:.9,delay:.2,ease:'power2.out'}); });
    app.querySelectorAll('.stat .n,.countdown .big').forEach(n=>{ // contagem: só inteiros no início do texto
      const t=n.firstChild; if(!t||t.nodeType!==3) return; const m=t.nodeValue.match(/^(\d+)(%?)$/); if(!m) return;
      const to=+m[1], o={v:0}; gsap.to(o,{v:to,duration:.9,delay:.15,ease:'power1.out',onUpdate:()=>{t.nodeValue=Math.round(o.v)+m[2];},onComplete:()=>{t.nodeValue=m[1]+m[2];}});
    });
  }

  function startFull(){
    // Partículas douradas ao fundo (poucas; paradas com a aba oculta).
    const cv=document.createElement('canvas'); cv.setAttribute('aria-hidden','true'); cv.className='edo-fx';
    document.body.prepend(cv); const g=cv.getContext('2d'); let W=0,H=0,raf=0;
    const dpr=Math.min(devicePixelRatio||1,1.5), N=innerWidth<700?18:36;
    const ps=Array.from({length:N},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.6+.6,v:Math.random()*.00004+.00001,p:Math.random()*6.3}));
    const fit=()=>{ W=cv.width=innerWidth*dpr; H=cv.height=innerHeight*dpr; };
    const gold=()=>getComputedStyle(root).getPropertyValue('--gold').trim()||'#8F6300';
    let col=gold(), frame=0;
    const draw=t=>{ raf=requestAnimationFrame(draw); if(document.hidden) return; if(!(frame++%240)) col=gold();
      g.clearRect(0,0,W,H); g.fillStyle=col;
      for(const q of ps){ q.y-=q.v*16; if(q.y<-.02) q.y=1.02; const x=(q.x+Math.sin(t/4000+q.p)*.015)*W;
        g.globalAlpha=.12+.1*Math.sin(t/1500+q.p); g.beginPath(); g.arc(x,q.y*H,q.r*dpr,0,6.283); g.fill(); } };
    fit(); addEventListener('resize',fit); raf=requestAnimationFrame(draw);
    undo.push(()=>{ cancelAnimationFrame(raf); removeEventListener('resize',fit); cv.remove(); });

    if(fine.matches){
      // Inclinação 3D nas estatísticas e botões que "puxam" o ponteiro.
      const mv=e=>{
        const s=e.target.closest&&e.target.closest('.stat'); if(s){ const r=s.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
          gsap.to(s,{rotationY:x*8,rotationX:-y*8,transformPerspective:700,duration:.3,overwrite:'auto'}); }
        const b=e.target.closest&&e.target.closest('.btn.primary,.btn.gold'); if(b){ const r=b.getBoundingClientRect();
          gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.18,y:(e.clientY-r.top-r.height/2)*.25,duration:.3,overwrite:'auto'}); } };
      const lv=e=>{ const t=e.target.closest&&e.target.closest('.stat,.btn.primary,.btn.gold'); if(t) gsap.to(t,{rotationX:0,rotationY:0,x:0,y:0,duration:.5,ease:'elastic.out(1,.5)',overwrite:'auto',clearProps:'transform'}); };
      document.addEventListener('pointermove',mv,{passive:true}); document.addEventListener('pointerout',lv,{passive:true});
      undo.push(()=>{ document.removeEventListener('pointermove',mv); document.removeEventListener('pointerout',lv); });
    }
    // Uma linha do mapa que estava fora da tela liga quando aparece na rolagem.
    io=new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; io.unobserve(e.target); energize(e.target,.05); }),{rootMargin:'0px 0px -6% 0px'});
    undo.push(()=>{ io.disconnect(); io=null; });

    // Fundo: manchas das cores das linhas à deriva.
    const au=document.createElement('div'); au.className='edo-aurora'; au.setAttribute('aria-hidden','true');
    au.innerHTML=['--e','--m','--i','--a'].map(v=>`<i style="--c:var(${v})"></i>`).join(''); document.body.prepend(au);
    const bl=[...au.children].map((el,i)=>gsap.to(el,{x:()=>gsap.utils.random(-25,25)+'vw',y:()=>gsap.utils.random(-20,20)+'vh',duration:gsap.utils.random(14,22),ease:'sine.inOut',repeat:-1,yoyo:true,delay:-i*3}));
    undo.push(()=>{ bl.forEach(t=>t.kill()); au.remove(); });
  }

  /* Resposta de uma questão: a certa salta e solta faíscas (modo completo); a errada treme. Lê as classes que o app
     põe depois do clique; não decide nada. */
  function sparks(el){
    const r=el.getBoundingClientRect(), x=r.left+r.width/2, y=r.top+r.height/2;
    for(let i=0;i<12;i++){ const s=document.createElement('i'); s.className='edo-spark'; s.setAttribute('aria-hidden','true');
      s.style.cssText=`left:${x-3}px;top:${y-3}px;background:var(${i%3?'--gold':'--ok'})`; document.body.append(s);
      const a=i/12*6.283+Math.random()*.5, d=28+Math.random()*34;
      gsap.to(s,{x:Math.cos(a)*d,y:Math.sin(a)*d+10,opacity:0,scale:.3,duration:.55+Math.random()*.25,ease:'power2.out',onComplete:()=>s.remove()}); }
  }
  document.addEventListener('click',e=>{
    if(cur==='off') return; const alt=e.target.closest&&e.target.closest('.alt'); if(!alt||!alt.dataset.k) return;
    const q=alt.closest('.q'), host=q&&q.parentElement, k=alt.dataset.k; if(!host) return;
    const idx=[...host.children].indexOf(q); // o app redesenha a questão inteira: reencontra pelo lugar
    requestAnimationFrame(()=>{ const q2=q.isConnected?q:host.isConnected?host.children[idx]:null, a=q2&&q2.querySelector('.alt[data-k="'+k+'"]'); if(!a) return;
      if(a.classList.contains('right')){ const L=a.querySelector('.L'); gsap.fromTo(L,{scale:.6},{scale:1,duration:.5,ease:'elastic.out(1,.45)',clearProps:'transform'}); if(cur==='full'&&!q2.querySelector('.alt.wrong')) sparks(L); } // faíscas só no acerto de primeira
      else if(a.classList.contains('wrong')) gsap.fromTo(a,{x:0},{keyframes:{x:[0,-7,6,-4,3,0]},duration:.4,ease:'power1.out',clearProps:'transform'}); });
  },true); // na captura: o clique do app troca a questão e o alvo sairia da página antes de chegar aqui

  // Rolagem suave (Lenis): opção separada, porque sequestra a roda do mouse e pode travar a rolagem em alguns aparelhos.
  let smUndo=null;
  function smoothSync(){
    const want=root.dataset.smooth==='on'&&cur&&cur!=='off'&&fine.matches&&window.Lenis;
    if(!want){ if(smUndo){ smUndo(); smUndo=null; } return; }
    if(smUndo) return;
    const lenis=new Lenis({lerp:.12,prevent:n=>!!n.closest('#pop,textarea,select,input,.stations,[data-lenis-prevent]')});
    const tick=t=>lenis.raf(t*1000); gsap.ticker.add(tick);
    smUndo=()=>{ gsap.ticker.remove(tick); lenis.destroy(); };
  }

  // Fundo 3D (opção separada): shader de fluido em WebGL puro, nas cores das linhas, a meia resolução e 30 quadros/s.
  let glUndo=null;
  function bgSync(){
    const want=root.dataset.bg==='on'&&cur&&cur!=='off';
    if(!want){ if(glUndo){ glUndo(); glUndo=null; } return; }
    if(glUndo) return;
    const cv=document.createElement('canvas'); cv.className='edo-gl'; cv.setAttribute('aria-hidden','true');
    const gl=cv.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,powerPreference:'low-power'}); if(!gl) return;
    const sh=(t,src)=>{ const s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s); return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null; };
    const vs=sh(gl.VERTEX_SHADER,'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}');
    const fs=sh(gl.FRAGMENT_SHADER,`precision mediump float;uniform vec2 r,m;uniform float t,a;uniform vec3 c1,c2,c3;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,s=.5;for(int i=0;i<4;i++){v+=s*n(p);p*=2.;s*=.5;}return v;}
      void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*2.2;
        vec2 q=vec2(fbm(p+t*.06),fbm(p+vec2(5.2,1.3)-t*.05));
        float f=fbm(p+3.*q+(m-.5)*.8);
        vec3 c=mix(c1,c2,clamp(f*1.7,0.,1.));c=mix(c,c3,clamp(length(q)*.8,0.,1.));
        c+=.12*sin(f*14.+t*.4+vec3(0.,2.,4.));
        gl_FragColor=vec4(c*a,a);}`);
    if(!vs||!fs) return;
    const pr=gl.createProgram(); gl.attachShader(pr,vs); gl.attachShader(pr,fs); gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(pr,'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const U=k=>gl.getUniformLocation(pr,k);
    const rgb=v=>{ const x=getComputedStyle(root).getPropertyValue(v).trim().replace('#',''); return x.length===6?[0,2,4].map(i=>parseInt(x.substr(i,2),16)/255):[.5,.4,.2]; };
    const dark=()=>{ const b=rgb('--bg'); return (b[0]+b[1]+b[2])/3<.5; };
    let mx=.5,my=.5,raf=0,last=0,W=0,H=0;
    const fit=()=>{ W=cv.width=Math.max(2,innerWidth>>1); H=cv.height=Math.max(2,innerHeight>>1); gl.viewport(0,0,W,H); };
    const pm=e=>{ mx=e.clientX/innerWidth; my=1-e.clientY/innerHeight; };
    const lost=e=>{ e.preventDefault(); };
    const draw=ts=>{ raf=requestAnimationFrame(draw); if(document.hidden||ts-last<33) return; last=ts;
      gl.uniform2f(U('r'),W,H); gl.uniform2f(U('m'),mx,my); gl.uniform1f(U('t'),ts/1000);
      gl.uniform1f(U('a'),dark()?.4:.22);
      gl.uniform3f(U('c1'),...rgb('--gold')); gl.uniform3f(U('c2'),...rgb('--e')); gl.uniform3f(U('c3'),...rgb('--i'));
      gl.drawArrays(gl.TRIANGLES,0,3); };
    document.body.prepend(cv); fit(); addEventListener('resize',fit); addEventListener('pointermove',pm,{passive:true}); cv.addEventListener('webglcontextlost',lost);
    raf=requestAnimationFrame(draw);
    glUndo=()=>{ cancelAnimationFrame(raf); removeEventListener('resize',fit); removeEventListener('pointermove',pm); cv.remove(); const x=gl.getExtension('WEBGL_lose_context'); x&&x.loseContext(); };
  }

  function apply(){
    const m=mode(); if(m===cur){ bgSync(); smoothSync(); return; }
    undo.forEach(f=>f()); undo=[]; cur=m; root.dataset.fx=m; lastKey=null;
    bgSync(); smoothSync();
    if(m==='off') return;
    if(m==='full') startFull();
    enter();
  }

  new MutationObserver(()=>requestAnimationFrame(enter)).observe(app,{childList:true});
  new MutationObserver(apply).observe(root,{attributes:true,attributeFilter:['data-motion','data-bg','data-smooth']});
  RM.addEventListener&&RM.addEventListener('change',apply);

  // Luz que segue o ponteiro (ver css/motion.css). Só com mouse.
  if(fine.matches) document.addEventListener('pointermove',e=>{
    if(cur==='off') return; const c=e.target.closest&&e.target.closest('.panel,.task,.stat,.line'); if(!c) return;
    const r=c.getBoundingClientRect(); c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px');
  },{passive:true});

  apply();
})();

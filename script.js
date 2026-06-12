const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);} });
  }, {threshold:.12,rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  const animateStat = el => {
    const target = parseInt(el.dataset.target,10);
    const suffix = el.innerHTML.includes('<span') ? el.innerHTML.match(/<span[\s\S]*<\/span>/)[0] : '';
    if(target===0){el.innerHTML='0'+suffix;return;}
    let cur=0;
    const step=Math.max(1,Math.ceil(target/40));
    const tick=()=>{ cur+=step; if(cur>=target){el.innerHTML=target+suffix;return;} el.innerHTML=cur+suffix; requestAnimationFrame(tick); };
    tick();
  };
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(e=>{ if(e.isIntersecting){animateStat(e.target);statIO.unobserve(e.target);} });
  },{threshold:.5});
  document.querySelectorAll('.stat-num').forEach(el=>statIO.observe(el));
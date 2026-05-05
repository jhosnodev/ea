(function(){
  const html=document.documentElement;
  let ticking=false;
  let scrollY=0;

  function update(){
    scrollY=html.scrollTop;
    html.style.setProperty('--scroll-y',scrollY);
    ticking=false;
  }

  function onScroll(){
    if(!ticking){
      requestAnimationFrame(update);
      ticking=true;
    }
  }

  html.addEventListener('scroll',onScroll,{passive:true});

  const moon=document.querySelector('.hero__moon');
  if(moon){
    const moonParallax=()=>{
      const pct=scrollY/(html.scrollHeight-html.clientHeight)||0;
      moon.style.transform=`translateY(${pct*-30}px) scale(${1-pct*0.1})`;
      moon.style.opacity=0.72-pct*0.2;
    };
    window.addEventListener('scroll',moonParallax,{passive:true});
    moonParallax();
  }

  const reveal=document.querySelectorAll('.reveal');
  const revealOnScroll=()=>{
    const trigger=html.clientHeight*0.85;
    reveal.forEach(el=>{
      const rect=el.getBoundingClientRect();
      if(rect.top<trigger){
        el.classList.add('is-visible');
      }
    });
  };
  window.addEventListener('scroll',revealOnScroll,{passive:true});
  revealOnScroll();

  const marquee=document.querySelector('.marquee__track');
  if(marquee){
    const clone=marquee.innerHTML;
    marquee.innerHTML=clone+clone;
  }
})();
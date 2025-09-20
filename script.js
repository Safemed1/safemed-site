
function calendlyUrl(){
  const u = new URL("https://calendly.com/safemed-joseph/30min");
  u.searchParams.set("embed_domain", location.hostname||"localhost");
  return u.toString();
}
function openCalendly(){
  if (window.Calendly) {
    Calendly.initPopupWidget({ url: calendlyUrl() });
  } else {
    window.open(calendlyUrl(), "_blank");
  }
  return false;
}
function toggleMenu(){
  const m = document.getElementById('mobileMenu');
  m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}
document.addEventListener('DOMContentLoaded', () => {
  const qr = document.getElementById('qr-img');
  if(qr){ qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data="+encodeURIComponent(calendlyUrl()); }
  const y = document.getElementById('year'); if(y){ y.textContent = new Date().getFullYear(); }

  // slideshow
  const slidesEl = document.getElementById('slides');
  if(slidesEl){
    const dots = Array.from(document.querySelectorAll('#dots .dot'));
    let index = 0, timer = null;
    const total = slidesEl.children.length;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = (i) => {
      index = (i + total) % total;
      slidesEl.style.transform = 'translateX(' + (-index*100) + '%)';
      dots.forEach((d,di)=>d.classList.toggle('active', di===index));
    };
    const next = () => show(index+1);
    const start = () => { if(!prefersReduce) timer = setInterval(next, 3500); };
    const stop  = () => { clearInterval(timer); timer=null; };
    dots.forEach((d,i)=> d.addEventListener('click', ()=>{ show(i); stop(); start(); }));
    const host = slidesEl.parentElement;
    host.addEventListener('mouseenter', stop);
    host.addEventListener('mouseleave', ()=>{ if(!timer) start(); });
    show(0); start();
  }
});

// Lightbox functionality
document.addEventListener('DOMContentLoaded', ()=>{
  const imgs=document.querySelectorAll('.gallery-img');
  const lightbox=document.getElementById('lightbox');
  const lightboxImg=document.getElementById('lightbox-img');
  const caption=document.getElementById('lightbox-caption');
  const closeBtn=document.querySelector('.lightbox-close');
  imgs.forEach(img=>{
    img.addEventListener('click', ()=>{
      lightbox.style.display='flex';
      lightboxImg.src=img.src;
      caption.textContent=img.alt;
    });
  });
  closeBtn.addEventListener('click', ()=>{ lightbox.style.display='none'; });
  lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox){ lightbox.style.display='none'; } });
});


// LIGHTBOX
document.addEventListener('DOMContentLoaded', () => {
  const slidesWrap = document.querySelector('.slideshow .slides');
  const imgs = slidesWrap ? Array.from(slidesWrap.querySelectorAll('img')) : [];
  const lb = document.getElementById('lightbox');
  if(!lb || imgs.length === 0) return;

  const lbImg = document.getElementById('lightbox-img');
  const btnClose = lb.querySelector('.lb-close');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');
  let index = 0;
  const open = (i)=>{
    index = i;
    lbImg.src = imgs[index].currentSrc || imgs[index].src;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  };
  const close = ()=>{
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  };
  const prev = ()=> open((index - 1 + imgs.length) % imgs.length);
  const next = ()=> open((index + 1) % imgs.length);

  imgs.forEach((img,i)=> img.addEventListener('click', ()=> open(i)));
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  lb.addEventListener('click', (e)=>{ if(e.target === lb) close(); });
  document.addEventListener('keydown', (e)=>{
    if(lb.classList.contains('open')){
      if(e.key === 'Escape') close();
      if(e.key === 'ArrowLeft') prev();
      if(e.key === 'ArrowRight') next();
    }
  });
});



/* ===== Calendly-only fixes (compact, single inline, no floating badge) ===== */
(function(){
  function applyCalendlyFixes(){
    try {
      // Inject compact styles + hide floating badge
      if (!document.getElementById('calendly-fix-css')) {
        var style = document.createElement('style');
        style.id = 'calendly-fix-css';
        style.textContent = [
          '.calendly-badge-widget, .calendly-badge-content, [data-testid="floating_badge"]{display:none !important;}',
          '.calendly-inline-widget{height:520px !important;max-width:880px;margin:12px auto;border-radius:12px;overflow:hidden;}',
          '@media (max-width:520px){.calendly-inline-widget{height:480px !important;}}'
        ].join('\\n');
        document.head && document.head.appendChild(style);
      }

      // Neutralize floating badge initializer if present
      if (window.Calendly && typeof window.Calendly.initBadgeWidget === 'function') {
        try { window.Calendly.initBadgeWidget = function(){ /* disabled */ }; } catch(e){}
      }

      // Keep only the first inline widget (hide duplicates)
      var widgets = document.querySelectorAll('.calendly-inline-widget');
      if (widgets.length > 1) {
        for (var i=1; i<widgets.length; i++) {
          widgets[i].style.display = 'none';
        }
      }
    } catch(e){ /* ignore */ }
  }

  // Observe DOM in case Calendly injects badge later
  var obs = new MutationObserver(function(){
    var badge = document.querySelector('.calendly-badge-widget, .calendly-badge-content, [data-testid="floating_badge"]');
    if (badge) { badge.parentNode && badge.parentNode.removeChild(badge); }
    applyCalendlyFixes();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      applyCalendlyFixes();
      obs.observe(document.documentElement, {childList:true, subtree:true});
    });
  } else {
    applyCalendlyFixes();
    obs.observe(document.documentElement, {childList:true, subtree:true});
  }

  window.addEventListener('load', applyCalendlyFixes);
})();

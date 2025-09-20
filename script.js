
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


// Mobile menu toggle (fixed)
document.addEventListener('DOMContentLoaded', function(){
  var btn = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-nav');
  if(btn && nav){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      document.body.classList.toggle('nav-open');
    });
    // Close when clicking a link
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ document.body.classList.remove('nav-open'); });
    });
    // Close when clicking outside
    document.addEventListener('click', function(e){
      if(!document.body.classList.contains('nav-open')) return;
      if(nav.contains(e.target) || btn.contains(e.target)) return;
      document.body.classList.remove('nav-open');
    });
    // Close on ESC
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ document.body.classList.remove('nav-open'); }
    });
  }
});


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

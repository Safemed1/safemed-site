
// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if(burger){
  burger.addEventListener('click', () => nav.classList.toggle('open'));
}
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav?.classList.remove('open');
    }
  });
});
// Phone CTA copies number
const phoneBtns = document.querySelectorAll('[data-phone]');
phoneBtns.forEach(btn => {
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(btn.dataset.phone);
      btn.classList.add('copied');
      btn.innerText = 'Number copied!';
      setTimeout(()=>{ btn.innerText = 'Call/Text (323) 492-6837'; btn.classList.remove('copied'); }, 1500);
    }catch(e){}
  });
});

// Mobile menu
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('mobileMenu');
btn?.addEventListener('click', () => {
  const hidden = menu.getAttribute('aria-hidden') === 'true';
  menu.setAttribute('aria-hidden', hidden ? 'false' : 'true');
  btn.setAttribute('aria-expanded', hidden ? 'true' : 'false');
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Hero slideshow
const slides = [
  'clinician-hero-920.webp',
  'hero-extra-2.png',
  'hero-extra-3.png',
  'hero-extra-4.png',
  'hero-extra-5.png',
  'hero-extra-6.png',
];
const hero = document.getElementById('heroSlide');
let idx = 0;
setInterval(() => {
  idx = (idx + 1) % slides.length;
  hero.classList.remove('fade-in');
  void hero.offsetWidth; // reflow to restart animation
  hero.removeAttribute('src'); hero.setAttribute('data-src', slides[idx]); document.dispatchEvent(new Event('DOMContentLoaded'));
  hero.classList.add('fade-in');
}, 4500);

// Mobile menu toggle + small UX helpers
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

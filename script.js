
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('#burger');
  const nav = document.querySelector('#nav');
  burger?.addEventListener('click', () => nav.classList.toggle('open'));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // Calendly open (if present)
  const calendlyLinks = document.querySelectorAll('a[data-calendly]');
  calendlyLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const url = a.dataset.calendly || a.getAttribute('href');
      if (url && url !== 'javascript:void(0)') {
        window.open(url, '_blank');
      } else {
        // fallback to email compose
        window.location.href = 'mailto:safemed.joseph@gmail.com';
      }
    });
  });
});

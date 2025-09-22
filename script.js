
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  const close = () => { drawer?.classList.remove('open'); scrim?.classList.remove('show'); };
  burger?.addEventListener('click', () => { drawer?.classList.add('open'); scrim?.classList.add('show'); });
  scrim?.addEventListener('click', close);
  document.querySelectorAll('#drawer a').forEach(a => a.addEventListener('click', close));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    });
  });

  const calendlyLinks = document.querySelectorAll('a[data-calendly]');
  calendlyLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const url = a.dataset.calendly || a.getAttribute('href');
      if (url && url !== 'javascript:void(0)') window.open(url, '_blank');
      else window.location.href = 'mailto:safemed.joseph@gmail.com';
    });
  });
});

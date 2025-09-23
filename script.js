
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  const close = () => { drawer?.classList.remove('open'); scrim?.classList.remove('show'); };
  burger?.addEventListener('click', () => { drawer?.classList.add('open'); scrim?.classList.add('show'); });
  scrim?.addEventListener('click', close);
  document.querySelectorAll('#drawer a').forEach(a => a.addEventListener('click', close));

  // enforce Calendly link on all book buttons
  document.querySelectorAll('a[data-calendly]').forEach(a => {
    a.setAttribute('href', 'https://calendly.com/safemed-joseph/30min');
    a.setAttribute('target', '_blank');
  });
});

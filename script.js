
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  const close = () => { drawer?.classList.remove('open'); scrim?.classList.remove('show'); };
  burger?.addEventListener('click', () => { drawer?.classList.add('open'); scrim?.classList.add('show'); });
  scrim?.addEventListener('click', close);
  document.querySelectorAll('#drawer a').forEach(a => a.addEventListener('click', close));
  document.querySelectorAll('a[data-calendly]').forEach(a => { a.href='https://calendly.com/safemed-joseph/30min'; a.target='_blank'; });
});

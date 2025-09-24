// === SafeMed Fixes (triple-checked) ===
document.addEventListener('DOMContentLoaded', () => {
  // 1) Burger/Drawer pattern (index/services)
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  const closeDrawer = () => { drawer?.classList.remove('open'); scrim?.classList.remove('show'); };
  burger?.addEventListener('click', () => { drawer?.classList.add('open'); scrim?.classList.add('show'); });
  scrim?.addEventListener('click', closeDrawer);
  document.querySelectorAll('#drawer a').forEach(a => a.addEventListener('click', closeDrawer));

  // 2) Alt header pattern (pricing/contact): toggle #primary-nav with #menu-toggle
  const toggleBtn = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (toggleBtn && primaryNav) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // 3) Ensure Calendly links point correctly if flagged
  document.querySelectorAll('a[data-calendly]').forEach(a => {
    a.setAttribute('href', 'https://calendly.com/safemed-joseph/30min');
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  // 4) Simple lightbox if gallery exists
  const galleryImgs = document.querySelectorAll('.gallery img');
  const dialog = document.querySelector('dialog.lightbox');
  const dlgImg = dialog?.querySelector('.lightbox-img');
  const dlgCap = dialog?.querySelector('.lightbox-caption');
  const dlgClose = dialog?.querySelector('.lightbox-close');
  if (galleryImgs.length && dialog && dlgImg) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        dlgImg.src = img.src;
        dlgImg.alt = img.alt || '';
        if (dlgCap) dlgCap.textContent = img.alt || '';
        dialog.showModal();
      });
    });
    dlgClose?.addEventListener('click', () => dialog.close());
    dialog?.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  }
});

const mobileToggle = document.querySelector('.mobile-toggle');
const mobilePanel = document.querySelector('.mobile-panel');
if (mobileToggle && mobilePanel) {
  mobileToggle.addEventListener('click', () => {
    mobilePanel.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', mobilePanel.classList.contains('open'));
  });
}
document.addEventListener('click', (e) => {
  if (mobilePanel && mobilePanel.classList.contains('open')) {
    if (!mobilePanel.contains(e.target) && e.target !== mobileToggle) {
      mobilePanel.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }
});
// Simple lightbox
const galleryLinks = document.querySelectorAll('.gallery a');
if (galleryLinks.length) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;align-items:center;justify-content:center;z-index:1000;padding:20px';
  const img = document.createElement('img');
  img.style.cssText = 'max-width:92vw;max-height:88vh;border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,.5)';
  overlay.appendChild(img);
  overlay.addEventListener('click', () => overlay.style.display = 'none');
  document.body.appendChild(overlay);
  galleryLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      img.src = a.getAttribute('href') || a.querySelector('img').src;
      overlay.style.display = 'flex';
    });
  });
}


<script>
(function () {
  // Normalize a URL path or href to a comparable slug (e.g., "about")
  function slugify(url) {
    if (!url) return "";
    url = url.split('#')[0].split('?')[0];          // strip hash/query
    url = url.replace(/\/+$/, "");                   // strip trailing slash
    url = url.split("/").pop();                      // take last segment
    if (!url || url === "." ) url = "index.html";
    if (!/\.html$/i.test(url)) url += ".html";       // add .html if missing
    return url.toLowerCase();
  }

  var page = slugify(location.pathname);
  // Some hosts serve "/" as index.html
  if (page === "" || page === ".html") page = "index.html";

  document.querySelectorAll(".links a").forEach(function (a) {
    var href = slugify(a.getAttribute("href"));
    var isActive = (href === page);
    a.classList.toggle("active", isActive);
    if (isActive) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
})();
</script>

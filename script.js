
/* ===== SafeMed: Calendly cleanup & 2-button CTA (strict) ===== */
(function () {
  var DEFAULTS = {
    urls: [
      "https://calendly.com/safemed-joseph/30min",
      "https://calendly.com/safemed/consult"
    ],
    heading: "Book now"
  };

  function getCalendlyURL() {
    // Prefer explicit links already in the page
    var a = document.querySelector('a[href*="calendly.com"]');
    if (a) return a.getAttribute('href');
    // Or look for any prior widgets that had data-url
    var w = document.querySelector('.calendly-inline-widget[data-url*="calendly.com"]');
    if (w) return w.getAttribute('data-url');
    return DEFAULTS.urls[0];
  }

  function loadCalendlyScript(cb) {
    var src = "https://assets.calendly.com/assets/external/widget.js";
    if (document.querySelector('script[src*="assets.calendly.com/assets/external/widget.js"]')) {
      cb && cb(); return;
    }
    var s = document.createElement("script");
    s.src = src; s.async = true; s.onload = function(){ cb && cb(); };
    document.head.appendChild(s);
  }

  function nukeInlineCalendlyAndQR() {
    // Remove inline Calendly iframes/widgets
    document.querySelectorAll('iframe[src*="calendly.com"], .calendly-inline-widget').forEach(function(n){ n.remove(); });
    // Remove QR images and empty wrappers
    Array.prototype.forEach.call(document.querySelectorAll('img'), function(img){
      var src = (img.getAttribute('src') || '').toLowerCase();
      var alt = (img.getAttribute('alt') || '').toLowerCase();
      var cls = (img.getAttribute('class') || '').toLowerCase();
      if (src.includes('qr') || src.includes('qrcode') || alt.includes('qr') || alt.includes('qrcode') || cls.includes('qr')) {
        var parent = img.parentElement;
        img.remove();
        if (parent && !parent.textContent.trim() && parent.children.length === 0) parent.remove();
      }
    });
    // Remove common stray text near old embeds
    Array.prototype.forEach.call(document.querySelectorAll('*'), function(el){
      var t = (el.textContent || '').trim().toLowerCase();
      if (t === 'tap to open calendly.' || t === 'tap to open calendly') el.remove();
    });
  }

  function killFloatingBadge() {
    var kill = function(){
      document.querySelectorAll('.calendly-badge-widget, .calendly-badge-content, [data-testid="floating_badge"]').forEach(function(n){
        if (n && n.parentNode) n.parentNode.removeChild(n);
      });
    };
    kill();
    // Neutralize any future initializer
    if (window.Calendly && typeof window.Calendly.initBadgeWidget === 'function') {
      try { window.Calendly.initBadgeWidget = function(){ /* disabled */ }; } catch(e){}
    }
    // Watch for injected badge
    var obs = new MutationObserver(kill);
    obs.observe(document.documentElement, {childList:true, subtree:true});
  }

  function ensureCTAStyles() {
    if (document.getElementById('sm-cal-cta-css')) return;
    var css = [
      '.sm-cta { display:flex; gap:12px; flex-wrap:wrap; margin-top:10px; }',
      '.sm-btn { background:#ffffff; color:#0c7e80; border-radius:9999px; padding:10px 16px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.15); }',
      '.sm-btn:hover { background:#0c7e80; color:#ffffff; }',
      '.sm-btn.secondary { box-shadow:none; border:2px solid #0c7e80; }',
      '@media (max-width:520px){ .sm-btn{ width:100%; } }',
      '.booknow-copy { margin-top:8px; }',
      '.booknow-copy ul { margin:8px 0 12px 18px; }'
    ].join('\\n');
    var style = document.createElement('style');
    style.id = 'sm-cal-cta-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function rebuildBookNowBox() {
    var url = getCalendlyURL();
    ensureCTAStyles();
    var headings = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3'));
    var target = headings.find(function(h){ return (h.textContent || '').trim().toLowerCase() === DEFAULTS.heading; });
    if (!target) return;
    var section = target.closest('section') || target.parentElement;

    // Remove any old cards/widgets immediately following the heading
    var next = target.nextElementSibling;
    while (next && (next.matches('.calendly-inline-widget, .card') || (next.querySelector && next.querySelector('.calendly-inline-widget')))) {
      var toRemove = next;
      next = next.nextElementSibling;
      toRemove.remove();
    }

    // Insert a fresh persuasive card
    var card = document.createElement('div');
    card.className = 'card booknow-copy';
    card.innerHTML = ''
      + '<p>Start with a <strong>free 20‑minute consult</strong>. We’ll review medications and DME, identify quick wins, and build a simple plan so your loved one stays <em>safer at home</em>—with less stress for the family.</p>'
      + '<ul>'
      +   '<li>Weekly pillbox setup done right</li>'
      +   '<li>Daily reminders that actually fit your routine</li>'
      +   '<li>Monthly DME sanitization & safety checks</li>'
      +   '<li>Clear visit summaries for the family</li>'
      + '</ul>'
      + '<div class="sm-cta">'
      +   '<a class="sm-btn open-calendly" href="' + url + '" target="_blank" rel="noopener">Open Calendly</a>'
      +   '<a class="sm-btn secondary quick-cal" href="#">Quick‑Book Popup</a>'
      + '</div>';

    target.insertAdjacentElement('afterend', card);

    // Wire the popup button
    var quick = card.querySelector('.quick-cal');
    quick.addEventListener('click', function(e){
      e.preventDefault();
      loadCalendlyScript(function(){
        if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
          window.Calendly.initPopupWidget({ url: url });
        } else {
          window.open(url, '_blank', 'noopener');
        }
      });
    });
  }

  function run() {
    nukeInlineCalendlyAndQR();
    killFloatingBadge();
    rebuildBookNowBox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

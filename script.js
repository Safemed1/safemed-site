
/* ===== SafeMed: Calendly-only controller (no inline calendar; popup button + copy) ===== */
(function () {
  var DEFAULT_CALENDLY_URLS = [
    "https://calendly.com/safemed-joseph/30min",
    "https://calendly.com/safemed/consult"
  ];

  function getExistingCalendlyURL() {
    // Prefer any existing <a href="https://calendly.com/...">
    var anchors = Array.prototype.slice.call(document.querySelectorAll('a[href*="calendly.com"]'));
    if (anchors.length) return anchors[0].getAttribute('href');
    // Else look for any data-url on previous widgets
    var div = document.querySelector('div.calendly-inline-widget[data-url*="calendly.com"]');
    if (div) return div.getAttribute('data-url');
    // Fallback to defaults
    return DEFAULT_CALENDLY_URLS[0];
  }

  function ensureCalendlyScriptLoaded(cb) {
    var src = "https://assets.calendly.com/assets/external/widget.js";
    if (document.querySelector('script[src*="assets.calendly.com/assets/external/widget.js"]')) {
      cb && cb();
      return;
    }
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = function(){ cb && cb(); };
    document.head.appendChild(s);
  }

  function disableFloatingBadge() {
    // Kill any existing badge elements
    var kill = function(){
      document.querySelectorAll('.calendly-badge-widget, .calendly-badge-content, [data-testid="floating_badge"]').forEach(function(n){
        if (n && n.parentNode) n.parentNode.removeChild(n);
      });
    };
    kill();
    // Neutralize initializer if available
    if (window.Calendly && typeof window.Calendly.initBadgeWidget === 'function') {
      try { window.Calendly.initBadgeWidget = function(){ /* disabled */ }; } catch(e){}
    }
    // Watch for injected badge
    var obs = new MutationObserver(kill);
    obs.observe(document.documentElement, {childList:true, subtree:true});
  }

  function removeInlineCalendars() {
    document.querySelectorAll('.calendly-inline-widget').forEach(function(n){ n.remove(); });
  }

  function addOpenCalendlyHandlers() {
    var url = getExistingCalendlyURL();
    // Any existing .open-calendly element becomes a popup trigger
    document.querySelectorAll('.open-calendly,[data-calendly-url]').forEach(function(el){
      if (el.dataset.boundCalendly) return;
      var u = el.getAttribute('data-calendly-url') || url;
      el.addEventListener('click', function(e){
        e.preventDefault();
        ensureCalendlyScriptLoaded(function(){
          if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
            window.Calendly.initPopupWidget({ url: u });
          } else {
            window.location.href = u; // fallback
          }
        });
      });
      el.dataset.boundCalendly = "1";
    });
  }

  function upsertBookNowBoxCopy() {
    var url = getExistingCalendlyURL();
    // Find the section whose heading is "Book now" (case-insensitive)
    var headings = Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3'));
    var targetHeading = headings.find(function(h){
      return (h.textContent || "").trim().toLowerCase() === "book now";
    });
    if (!targetHeading) return;
    var section = targetHeading.closest('section') || targetHeading.parentElement;

    // If there's already a persuasive block we injected, skip recreating
    if (section && section.querySelector('.booknow-copy')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'card booknow-copy';
    wrapper.style.marginTop = "8px";

    var p = document.createElement('p');
    p.innerHTML = "Start with a <strong>free 20‑minute consult</strong>. We’ll review current medications and DME, identify quick wins, and map a simple plan that keeps your loved one <em>safer at home</em>—with less stress for the family.";
    wrapper.appendChild(p);

    var ul = document.createElement('ul');
    ul.style.margin = "8px 0 12px 18px";
    ["Weekly pillbox setup done right",
     "Daily reminders that actually fit your routine",
     "Monthly DME sanitization & safety checks",
     "Clear visit summaries for the family"].forEach(function(txt){
       var li = document.createElement('li');
       li.textContent = txt;
       ul.appendChild(li);
     });
    wrapper.appendChild(ul);

    var btn = document.createElement('a');
    btn.href = "#";
    btn.className = "button cta open-calendly";
    btn.setAttribute('data-calendly-url', url);
    btn.textContent = "Book a 20‑minute consult";
    wrapper.appendChild(btn);

    // Insert after the heading
    targetHeading.insertAdjacentElement('afterend', wrapper);
  }

  function run() {
    disableFloatingBadge();
    removeInlineCalendars();
    upsertBookNowBoxCopy();
    addOpenCalendlyHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

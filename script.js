(function(){
  // Mobile toggle
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('site-nav');

  if (btn && menu) {
    btn.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      document.body.classList.toggle('no-scroll', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on link tap
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        document.body.classList.remove('no-scroll');
        btn.setAttribute('aria-expanded','false');
      });
    });

    // ESC closes
    window.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        menu.classList.remove('open');
        document.body.classList.remove('no-scroll');
        btn.setAttribute('aria-expanded','false');
      }
    });
  }

  // Normalize active tab across /about, about.html, /about/, and anchors
  function slug(u){
    if(!u) return '';
    u = u.split('#')[0].split('?')[0].replace(/\/+$/,'');
    var last = u.split('/').pop(); if(!last) last = 'index.html';
    if(!/\.html$/i.test(last)) last += '.html';
    return last.toLowerCase();
  }
  var page = slug(location.pathname);
  document.querySelectorAll('.links a').forEach(function(a){
    var href = slug(a.getAttribute('href'));
    var active = (href === page);
    a.classList.toggle('active', active);
    if(active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
})();

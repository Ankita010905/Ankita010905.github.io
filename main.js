(function () {
  // mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('nav.main');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // project filters
  var fbtns = document.querySelectorAll('.filters button');
  var cards = document.querySelectorAll('[data-cats]');
  fbtns.forEach(function (b) {
    b.addEventListener('click', function () {
      fbtns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      var f = b.getAttribute('data-filter');
      cards.forEach(function (c) {
        var show = f === 'all' || c.getAttribute('data-cats').split(' ').indexOf(f) !== -1;
        c.hidden = !show;
      });
    });
  });

  // hero waveform: three-phase sine set
  var cv = document.getElementById('wave');
  if (!cv) return;
  var ctx = cv.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = 0, w = 0, h = 0;

  function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function resize() {
    var r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    w = r.width; h = r.height;
    cv.width = w * d; cv.height = h * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    var cols = [css('--accent'), css('--amber'), css('--slate')];
    var mid = h * 0.5, amp = Math.min(h * 0.28, 90), cycles = w < 600 ? 1.6 : 2.6;
    for (var p = 0; p < 3; p++) {
      ctx.beginPath();
      ctx.strokeStyle = cols[p];
      ctx.lineWidth = 2;
      for (var x = 0; x <= w; x += 3) {
        var y = mid + amp * Math.sin((x / w) * cycles * 2 * Math.PI - t + p * 2 * Math.PI / 3);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
  function loop() { t += 0.025; draw(); requestAnimationFrame(loop); }
  window.addEventListener('resize', function () { resize(); draw(); });
  resize(); draw();
  if (!reduce) requestAnimationFrame(loop);
})();

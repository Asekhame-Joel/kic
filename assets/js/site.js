// Kingdom Impact Church — mobile navigation + gentle scroll reveals
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("mobile-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("hidden") === false;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    document.body.classList.add("reveal-off");
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          setTimeout(function () {
            el.classList.add("is-visible");
          }, i * 90);
          observer.unobserve(el);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---------- Gallery lightbox ---------- */
(function () {
  var box = document.getElementById('lightbox');
  if (!box) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('.lb-item'));
  if (!items.length) return;
  var img = box.querySelector('.lb-img');
  var cap = box.querySelector('.lb-caption');
  var index = 0;
  var lastFocus = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var el = items[index];
    img.src = el.getAttribute('data-src');
    img.alt = el.getAttribute('data-caption') || '';
    cap.textContent = el.getAttribute('data-caption') || '';
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    requestAnimationFrame(function () { box.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(function () { box.hidden = true; img.src = ''; }, 200);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  items.forEach(function (el, i) {
    el.addEventListener('click', function () { open(i); });
  });
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
})();

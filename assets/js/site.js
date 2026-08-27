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

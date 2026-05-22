/**
 * Image Carousel
 * --------------
 * Initialises auto-advancing image carousels on project cards.
 * Call initCarousels() after project cards have been injected into the DOM.
 *
 * Expects each carousel to have the structure produced by gallery.js:
 *   .project-card__carousel
 *     img.carousel-img (×N)
 *     button.carousel-arrow.prev
 *     button.carousel-arrow.next
 *     div.carousel-dots
 *       span.carousel-dot (×N)
 */
(function () {
  var AUTO_INTERVAL_MS = 4000;

  function initCarousel(el) {
    var imgs = el.querySelectorAll(".carousel-img");
    if (!imgs || imgs.length < 2) {
      // Single image or empty — just mark first active, no behaviour needed
      if (imgs && imgs.length === 1) imgs[0].classList.add("active");
      return;
    }

    var dots  = el.querySelectorAll(".carousel-dot");
    var prev  = el.querySelector(".carousel-arrow.prev");
    var next  = el.querySelector(".carousel-arrow.next");
    var current = 0;
    var timer   = null;

    function goTo(i) {
      imgs[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = ((i % imgs.length) + imgs.length) % imgs.length;
      imgs[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
    }

    function startTimer() {
      timer = setInterval(function () { goTo(current + 1); }, AUTO_INTERVAL_MS);
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    if (prev) {
      prev.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        goTo(current - 1);
        resetTimer();
      });
    }

    if (next) {
      next.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        goTo(current + 1);
        resetTimer();
      });
    }

    for (var d = 0; d < dots.length; d++) {
      (function (idx) {
        dots[idx].addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(idx);
          resetTimer();
        });
      })(d);
    }

    // Pause auto-advance while user hovers
    el.addEventListener("mouseenter", function () { clearInterval(timer); });
    el.addEventListener("mouseleave", startTimer);

    // Initialise first frame
    imgs[0].classList.add("active");
    if (dots[0]) dots[0].classList.add("active");
    startTimer();
  }

  function initCarousels() {
    var carousels = document.querySelectorAll(".project-card__carousel");
    for (var i = 0; i < carousels.length; i++) {
      initCarousel(carousels[i]);
    }
  }

  window.initCarousels = initCarousels;
})();

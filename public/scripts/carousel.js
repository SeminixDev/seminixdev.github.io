/**
 * Image Carousel
 * --------------
 * Auto-scrolls only while the user hovers over the card.
 * Resets to the first image when the user moves away.
 * Arrow clicks pause auto-scroll for the current hover session;
 * the next hover starts fresh from image 0.
 *
 * Expects each carousel to have the structure produced by ProjectCard.astro:
 *   .project-card__carousel
 *     img.carousel-img (×N)
 *     button.carousel-arrow.prev
 *     button.carousel-arrow.next
 *     div.carousel-dots
 *       span.carousel-dot (×N)
 */
(function () {
  var AUTO_INTERVAL_MS = 1200;

  function initCarousel(el) {
    var imgs = el.querySelectorAll(".carousel-img");
    if (!imgs || imgs.length < 2) {
      if (imgs && imgs.length === 1) imgs[0].classList.add("active");
      return;
    }

    var dots    = el.querySelectorAll(".carousel-dot");
    var prev    = el.querySelector(".carousel-arrow.prev");
    var next    = el.querySelector(".carousel-arrow.next");
    var current = 0;
    var timer   = null;
    var paused  = false; // true after user manually clicks an arrow this hover session

    function goTo(i) {
      imgs[current].classList.remove("active");
      if (dots[current]) dots[current].classList.remove("active");
      current = ((i % imgs.length) + imgs.length) % imgs.length;
      imgs[current].classList.add("active");
      if (dots[current]) dots[current].classList.add("active");
    }

    function startAutoScroll() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, AUTO_INTERVAL_MS);
    }

    function stopAutoScroll() {
      clearInterval(timer);
      timer = null;
    }

    function resetToFirst() {
      stopAutoScroll();
      goTo(0);
      paused = false;
    }

    if (prev) {
      prev.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        paused = true;
        stopAutoScroll();
        goTo(current - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        paused = true;
        stopAutoScroll();
        goTo(current + 1);
      });
    }

    // Attach hover to the whole card so the arrows don't feel like a dead zone
    var card = el.closest(".project-card") || el;

    card.addEventListener("mouseenter", function () {
      goTo(0);
      paused = false;
      startAutoScroll();
    });

    card.addEventListener("mouseleave", function () {
      resetToFirst();
    });

    // Initialise first frame — no auto-scroll until hover
    imgs[0].classList.add("active");
    if (dots[0]) dots[0].classList.add("active");
  }

  function initCarousels() {
    var carousels = document.querySelectorAll(".project-card__carousel");
    for (var i = 0; i < carousels.length; i++) {
      initCarousel(carousels[i]);
    }
  }

  window.initCarousels = initCarousels;
}());

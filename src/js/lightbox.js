/**
 * Lightbox
 * --------
 * Full-screen overlay for viewing project images and embedded YouTube videos.
 *
 * Usage:
 *   Lightbox.init(items)   – items: [{ type: "image"|"video", src: "..." }]
 *   Lightbox.open(index)   – opens at a specific item index
 *   Lightbox.close()       – closes the lightbox
 *
 * Keyboard: ArrowLeft / ArrowRight to navigate, Escape to close.
 * Click outside the media to close.
 */
(function () {
  var overlay, mediaImg, mediaIframe, closeBtn, prevBtn, nextBtn, counter;
  var items   = [];
  var current = 0;
  var built   = false;

  function build() {
    overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image viewer");

    closeBtn = document.createElement("button");
    closeBtn.className = "lightbox-close";
    closeBtn.innerHTML = "&#10005;";
    closeBtn.setAttribute("aria-label", "Close lightbox");
    closeBtn.addEventListener("click", close);

    prevBtn = document.createElement("button");
    prevBtn.className = "lightbox-nav prev";
    prevBtn.innerHTML = "&#8592;";
    prevBtn.setAttribute("aria-label", "Previous");
    prevBtn.addEventListener("click", function () { show(current - 1); });

    nextBtn = document.createElement("button");
    nextBtn.className = "lightbox-nav next";
    nextBtn.innerHTML = "&#8594;";
    nextBtn.setAttribute("aria-label", "Next");
    nextBtn.addEventListener("click", function () { show(current + 1); });

    mediaImg = document.createElement("img");
    mediaImg.className = "lightbox-media";
    mediaImg.alt = "";

    mediaIframe = document.createElement("iframe");
    mediaIframe.className = "lightbox-iframe";
    mediaIframe.setAttribute("allowfullscreen", "");
    mediaIframe.setAttribute("allow", "autoplay; encrypted-media");
    mediaIframe.style.display = "none";

    counter = document.createElement("div");
    counter.className = "lightbox-counter";
    counter.setAttribute("aria-live", "polite");

    overlay.appendChild(closeBtn);
    overlay.appendChild(prevBtn);
    overlay.appendChild(mediaImg);
    overlay.appendChild(mediaIframe);
    overlay.appendChild(nextBtn);
    overlay.appendChild(counter);
    document.body.appendChild(overlay);

    // Click outside media closes
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   show(current - 1);
      if (e.key === "ArrowRight")  show(current + 1);
    });

    built = true;
  }

  function show(idx) {
    current = ((idx % items.length) + items.length) % items.length;
    var item = items[current];

    if (item.type === "video") {
      mediaImg.style.display    = "none";
      mediaIframe.style.display = "block";
      mediaIframe.src = item.src + (item.src.indexOf("?") === -1 ? "?autoplay=1" : "&autoplay=1");
    } else {
      mediaIframe.style.display = "none";
      mediaIframe.src           = "";
      mediaImg.style.display    = "block";
      mediaImg.src = item.src;
    }

    var hasMultiple = items.length > 1;
    prevBtn.style.display   = hasMultiple ? "" : "none";
    nextBtn.style.display   = hasMultiple ? "" : "none";
    counter.textContent     = hasMultiple ? (current + 1) + " / " + items.length : "";
  }

  function open(idx) {
    if (!built) build();
    if (!items.length) return;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    show(idx || 0);
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    mediaIframe.src = ""; // stop video
  }

  function init(mediaItems) {
    items = mediaItems || [];
    if (!built && items.length) build();
  }

  window.Lightbox = { init: init, open: open, close: close };
})();

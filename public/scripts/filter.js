/**
 * Client-side project filter
 * --------------------------
 * Shows/hides server-rendered project cards by category.
 * Reads data-category attributes from .project-card elements.
 */
(function () {
  var tabs  = document.querySelectorAll('.filter-tab');
  var cards = document.querySelectorAll('.project-card');

  function setFilter(category) {
    tabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.getAttribute('data-value') === category);
    });
    cards.forEach(function (card) {
      var match = category === 'all' || card.getAttribute('data-category') === category;
      card.style.display = match ? '' : 'none';
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var val = tab.getAttribute('data-value') ?? 'all';
      setFilter(val);
    });
  });
}());

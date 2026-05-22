/**
 * Project Gallery Renderer
 * ------------------------
 * renderProjects(containerId, featuredOnly, category)
 *   – renders project cards, including carousel support and detail page links
 *
 * renderFilterTabs(containerId, projectGridId)
 *   – renders category filter pill buttons
 *
 * Requires: projects.js, carousel.js
 */

function escapeHTML(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Builds the media area of a project card.
 * - 0 images: placeholder div
 * - 1 image:  single <img>
 * - 2+ images: carousel with arrows + dots
 */
function createCardMedia(project) {
  var images = project.images || [];

  if (images.length === 0) {
    var placeholder = document.createElement("div");
    placeholder.className = "project-card__placeholder";
    placeholder.textContent = "</>";
    return placeholder;
  }

  if (images.length === 1) {
    var img = document.createElement("img");
    img.className = "project-card__img";
    img.src     = images[0];
    img.alt     = project.title + " screenshot";
    img.loading = "lazy";
    return img;
  }

  // Multi-image carousel
  var carousel = document.createElement("div");
  carousel.className = "project-card__carousel";

  for (var i = 0; i < images.length; i++) {
    var cImg = document.createElement("img");
    cImg.className = "carousel-img";
    cImg.src     = images[i];
    cImg.alt     = project.title + " screenshot " + (i + 1);
    cImg.loading = "lazy";
    carousel.appendChild(cImg);
  }

  var prev = document.createElement("button");
  prev.className = "carousel-arrow prev";
  prev.type      = "button";
  prev.innerHTML = "&#8592;";
  prev.setAttribute("aria-label", "Previous image");
  carousel.appendChild(prev);

  var next = document.createElement("button");
  next.className = "carousel-arrow next";
  next.type      = "button";
  next.innerHTML = "&#8594;";
  next.setAttribute("aria-label", "Next image");
  carousel.appendChild(next);

  var dots = document.createElement("div");
  dots.className = "carousel-dots";
  for (var d = 0; d < images.length; d++) {
    var dot = document.createElement("span");
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", "Go to image " + (d + 1));
    dots.appendChild(dot);
  }
  carousel.appendChild(dots);

  return carousel;
}

/**
 * Renders project cards.
 *
 * @param {string}  containerId
 * @param {boolean} featuredOnly  – only show projects with featured === true
 * @param {string}  [category]    – filter by category slug
 */
function renderProjects(containerId, featuredOnly, category) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var list = PROJECTS.slice();

  if (featuredOnly) {
    list = list.filter(function (p) { return p.featured; });
  }
  if (category && category !== "all") {
    list = list.filter(function (p) { return p.category === category; });
  }

  if (list.length === 0) {
    container.innerHTML = "<p class='no-projects'>No projects here yet — check back soon!</p>";
    return;
  }

  container.innerHTML = "";
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    var p = list[i];

    var card = document.createElement("article");
    card.className = "project-card";
    if (p.category) card.setAttribute("data-category", p.category);

    // Stretched link — makes the whole card navigate to the detail page
    var stretchLink = document.createElement("a");
    stretchLink.href = "projects/" + p.id + ".html";
    stretchLink.className = "stretched-link";
    stretchLink.setAttribute("aria-label", p.title);
    card.appendChild(stretchLink);

    // Media (carousel or placeholder)
    card.appendChild(createCardMedia(p));

    // Card body
    var body = document.createElement("div");
    body.className = "project-card__body";

    var titleEl = document.createElement("h3");
    titleEl.className = "project-card__title";
    titleEl.textContent = p.title;
    body.appendChild(titleEl);

    // Role + date meta
    if (p.role || p.date) {
      var metaEl = document.createElement("p");
      metaEl.className = "project-card__meta";
      var parts = [];
      if (p.role) parts.push(p.role);
      if (p.date) {
        var d = new Date(p.date + "-01");
        parts.push(d.toLocaleDateString("en-GB", { month: "short", year: "numeric" }));
      }
      metaEl.textContent = parts.join(" \u00B7 ");
      body.appendChild(metaEl);
    }

    var desc = document.createElement("p");
    desc.className = "project-card__desc";
    desc.textContent = p.description;
    body.appendChild(desc);

    // Tags
    if (p.tags && p.tags.length) {
      var tagsDiv = document.createElement("div");
      tagsDiv.className = "project-card__tags";
      for (var t = 0; t < p.tags.length; t++) {
        var tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = p.tags[t];
        tagsDiv.appendChild(tag);
      }
      body.appendChild(tagsDiv);
    }

    // External links — sit above the stretched link via z-index
    if (p.links && Object.keys(p.links).length) {
      var linksDiv = document.createElement("div");
      linksDiv.className = "project-card__links";
      var keys = Object.keys(p.links);
      for (var k = 0; k < keys.length; k++) {
        var name = keys[k];
        var a = document.createElement("a");
        a.href   = p.links[name];
        a.target = "_blank";
        a.rel    = "noopener noreferrer";
        a.textContent = name;
        a.className = "project-card__ext-link";
        linksDiv.appendChild(a);
      }
      body.appendChild(linksDiv);
    }

    card.appendChild(body);
    fragment.appendChild(card);
  }

  container.appendChild(fragment);

  // Initialise carousels now that cards are in the DOM
  if (typeof initCarousels === "function") initCarousels();
}

/**
 * Renders category filter tab buttons.
 *
 * @param {string} tabsContainerId   – element to render tabs into
 * @param {string} projectGridId     – project grid to re-render on filter change
 */
function renderFilterTabs(tabsContainerId, projectGridId) {
  var container = document.getElementById(tabsContainerId);
  if (!container) return;

  var tabs = [
    { label: "All",            value: "all"    },
    { label: "Games",          value: "game"   },
    { label: "Engines & Tools", value: "engine" },
    { label: "Web",            value: "web"    }
  ];

  var current = "all";

  function setActive(value) {
    current = value;
    var all = container.querySelectorAll(".filter-tab");
    for (var j = 0; j < all.length; j++) {
      all[j].classList.toggle("active", all[j].getAttribute("data-value") === current);
    }
    renderProjects(projectGridId, false, current === "all" ? null : current);
  }

  for (var i = 0; i < tabs.length; i++) {
    (function (tab) {
      var btn = document.createElement("button");
      btn.className = "filter-tab" + (tab.value === "all" ? " active" : "");
      btn.textContent = tab.label;
      btn.type = "button";
      btn.setAttribute("data-value", tab.value);
      btn.addEventListener("click", function () { setActive(tab.value); });
      container.appendChild(btn);
    })(tabs[i]);
  }
}

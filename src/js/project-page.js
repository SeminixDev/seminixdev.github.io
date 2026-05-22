/**
 * Project Detail Page Renderer
 * ----------------------------
 * Reads [data-project-id] from #project-detail and renders the full
 * project page: hero, media gallery, overview, sections, related posts,
 * and a back link.
 *
 * Requires: projects.js, posts.js, lightbox.js, blog.js
 */
(function () {
  var container = document.getElementById("project-detail");
  if (!container) return;

  var projectId = container.getAttribute("data-project-id");
  var project   = null;

  if (typeof PROJECTS !== "undefined") {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === projectId) { project = PROJECTS[i]; break; }
    }
  }

  if (!project) {
    container.innerHTML = "<div class='container' style='padding:4rem 1.5rem'><p class='no-projects'>Project not found.</p><a href='projects.html'>&larr; All Projects</a></div>";
    return;
  }

  // ── Hero ─────────────────────────────────────────────────────────────────

  var hero = document.createElement("header");
  hero.className = "project-hero";

  var heroInner = document.createElement("div");
  heroInner.className = "container";

  if (project.category) {
    var cat = document.createElement("p");
    cat.className = "project-hero__category";
    cat.textContent = project.category.toUpperCase();
    heroInner.appendChild(cat);
  }

  var h1 = document.createElement("h1");
  h1.className = "project-hero__title";
  h1.textContent = project.title;
  heroInner.appendChild(h1);

  if (project.subtitle) {
    var sub = document.createElement("p");
    sub.className = "project-hero__subtitle";
    sub.textContent = project.subtitle;
    heroInner.appendChild(sub);
  }

  // Meta row
  var meta = document.createElement("div");
  meta.className = "project-hero__meta";
  if (project.role) {
    var roleSpan = document.createElement("span");
    roleSpan.textContent = "\uD83D\uDC64 " + project.role;
    meta.appendChild(roleSpan);
  }
  if (project.date) {
    var dateSpan = document.createElement("span");
    var d = new Date(project.date + "-01");
    dateSpan.textContent = "\uD83D\uDCC5 " + d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    meta.appendChild(dateSpan);
  }
  heroInner.appendChild(meta);

  // Tags
  if (project.tags && project.tags.length) {
    var tagsDiv = document.createElement("div");
    tagsDiv.className = "project-card__tags";
    tagsDiv.style.marginBottom = "1.25rem";
    for (var t = 0; t < project.tags.length; t++) {
      var tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = project.tags[t];
      tagsDiv.appendChild(tag);
    }
    heroInner.appendChild(tagsDiv);
  }

  // Action buttons
  if (project.links) {
    var actions = document.createElement("div");
    actions.className = "project-hero__actions";
    var keys = Object.keys(project.links);
    for (var k = 0; k < keys.length; k++) {
      var name = keys[k];
      var a = document.createElement("a");
      a.href    = project.links[name];
      a.target  = "_blank";
      a.rel     = "noopener noreferrer";
      a.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      a.className = k === 0 ? "btn btn-primary" : "btn btn-outline";
      actions.appendChild(a);
    }
    heroInner.appendChild(actions);
  }

  hero.appendChild(heroInner);
  container.appendChild(hero);

  // ── Media Gallery ────────────────────────────────────────────────────────

  var lightboxItems = [];
  if (project.video) {
    lightboxItems.push({ type: "video", src: project.video });
  }
  if (project.images && project.images.length) {
    for (var img = 0; img < project.images.length; img++) {
      lightboxItems.push({ type: "image", src: project.images[img] });
    }
  }

  if (lightboxItems.length > 0) {
    var mediaSection = document.createElement("section");
    mediaSection.className = "container";
    mediaSection.style.paddingBottom = "0";

    var mediaH = document.createElement("h2");
    mediaH.className = "section-title";
    mediaH.textContent = "// Media";
    mediaSection.appendChild(mediaH);

    var gallery = document.createElement("div");
    gallery.className = "media-gallery";

    for (var m = 0; m < lightboxItems.length; m++) {
      (function (idx, item) {
        var thumb;
        if (item.type === "video") {
          thumb = document.createElement("div");
          thumb.className = "media-gallery__video-thumb";
          thumb.setAttribute("role", "button");
          thumb.setAttribute("tabindex", "0");
          thumb.setAttribute("aria-label", "Open video");
          thumb.innerHTML = '<span class="video-play-icon">&#9654;</span><span class="video-play-label">Watch Video</span>';
        } else {
          thumb = document.createElement("img");
          thumb.className = "media-gallery__thumb";
          thumb.src     = item.src;
          thumb.alt     = project.title + " — screenshot " + idx;
          thumb.loading = "lazy";
        }

        function openLightbox() {
          if (typeof Lightbox !== "undefined") Lightbox.open(idx);
        }
        thumb.addEventListener("click", openLightbox);
        thumb.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(); }
        });

        gallery.appendChild(thumb);
      })(m, lightboxItems[m]);
    }

    mediaSection.appendChild(gallery);
    container.appendChild(mediaSection);

    if (typeof Lightbox !== "undefined") {
      Lightbox.init(lightboxItems);
    }
  }

  // ── Overview ─────────────────────────────────────────────────────────────

  var descSection = document.createElement("section");
  descSection.className = "container project-section";

  var descH = document.createElement("h2");
  descH.className = "section-title";
  descH.textContent = "// Overview";
  descSection.appendChild(descH);

  var descP = document.createElement("p");
  descP.className = "project-section__lead";
  descP.textContent = project.description;
  descSection.appendChild(descP);

  container.appendChild(descSection);

  // ── Detail Sections ───────────────────────────────────────────────────────

  if (project.sections && project.sections.length) {
    // For game projects with a single "About" section, merge it into overview
    var isSimple = project.sections.length === 1 && project.sections[0].title === "About";

    if (isSimple) {
      var aboutContent = document.createElement("div");
      aboutContent.className = "project-section__content";
      aboutContent.innerHTML = project.sections[0].content;
      descSection.appendChild(aboutContent);
    } else {
      for (var s = 0; s < project.sections.length; s++) {
        var sec = project.sections[s];
        var secEl = document.createElement("section");
        secEl.className = "container project-section";

        var secH = document.createElement("h2");
        secH.className = "section-title";
        secH.textContent = "// " + sec.title;
        secEl.appendChild(secH);

        var secContent = document.createElement("div");
        secContent.className = "project-section__content";
        secContent.innerHTML = sec.content;
        secEl.appendChild(secContent);

        container.appendChild(secEl);
      }
    }
  }

  // ── Related Posts ────────────────────────────────────────────────────────

  if (typeof POSTS !== "undefined") {
    var related = POSTS.filter(function (p) { return p.projectId === projectId; });
    if (related.length > 0) {
      var relSection = document.createElement("section");
      relSection.className = "container related-section";

      var relH = document.createElement("h2");
      relH.className = "section-title";
      relH.textContent = "// Related Posts";
      relSection.appendChild(relH);

      var relGrid = document.createElement("div");
      relGrid.className = "blog-grid";
      relGrid.id = "related-posts-grid";
      relSection.appendChild(relGrid);

      container.appendChild(relSection);

      if (typeof renderPosts === "function") {
        renderPosts("related-posts-grid", { projectId: projectId });
      }
    }
  }

  // ── Back link ────────────────────────────────────────────────────────────

  var backSection = document.createElement("div");
  backSection.className = "container";
  backSection.style.padding = "1rem 1.5rem 3rem";

  var backLink = document.createElement("a");
  backLink.href = "projects.html";
  backLink.textContent = "\u2190 All Projects";
  backSection.appendChild(backLink);
  container.appendChild(backSection);

})();

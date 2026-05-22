/**
 * Blog Post Renderer
 * ------------------
 * renderPosts(containerId, options) — renders post cards from POSTS array
 * loadPost(postId, contentId, metaId) — fetches .md file and renders a full post
 *
 * Requires POSTS (posts.js) and optionally PROJECTS (projects.js) to be loaded first.
 * loadPost requires marked.js (CDN) to be loaded for Markdown parsing.
 */

function formatDate(dateStr) {
  var d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Renders post cards into a container.
 *
 * @param {string} containerId
 * @param {Object} [options]
 * @param {number} [options.limit]     – max posts to render
 * @param {string} [options.projectId] – filter to posts linked to this project
 */
function renderPosts(containerId, options) {
  var container = document.getElementById(containerId);
  if (!container) return;

  options = options || {};

  if (typeof POSTS === "undefined" || !POSTS.length) {
    container.innerHTML = "<p class='no-projects'>No posts yet — check back soon!</p>";
    return;
  }

  var list = POSTS.slice();

  if (options.projectId) {
    list = list.filter(function (p) { return p.projectId === options.projectId; });
  }

  // Sort newest first
  list.sort(function (a, b) { return b.date.localeCompare(a.date); });

  if (options.limit) {
    list = list.slice(0, options.limit);
  }

  if (list.length === 0) {
    container.innerHTML = "<p class='no-projects'>No posts yet — check back soon!</p>";
    return;
  }

  container.innerHTML = "";
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    var post = list[i];

    var card = document.createElement("a");
    card.href = "blog/" + post.id + ".html";
    card.className = "blog-card";
    card.setAttribute("aria-label", post.title);

    // Gradient accent strip
    var accent = document.createElement("div");
    accent.className = "blog-card__accent";
    card.appendChild(accent);

    var body = document.createElement("div");
    body.className = "blog-card__body";

    var dateEl = document.createElement("p");
    dateEl.className = "blog-card__date";
    dateEl.textContent = formatDate(post.date);
    body.appendChild(dateEl);

    var titleEl = document.createElement("h3");
    titleEl.className = "blog-card__title";
    titleEl.textContent = post.title;
    body.appendChild(titleEl);

    var summary = document.createElement("p");
    summary.className = "blog-card__summary";
    summary.textContent = post.summary;
    body.appendChild(summary);

    // Tags
    if (post.tags && post.tags.length) {
      var tagsDiv = document.createElement("div");
      tagsDiv.className = "project-card__tags";
      for (var t = 0; t < post.tags.length; t++) {
        var tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = post.tags[t];
        tagsDiv.appendChild(tag);
      }
      body.appendChild(tagsDiv);
    }

    // Related project link
    if (post.projectId && typeof PROJECTS !== "undefined") {
      for (var p = 0; p < PROJECTS.length; p++) {
        if (PROJECTS[p].id === post.projectId) {
          var projLink = document.createElement("p");
          projLink.className = "blog-card__project-link";
          projLink.textContent = "\u21B3 " + PROJECTS[p].title;
          body.appendChild(projLink);
          break;
        }
      }
    }

    card.appendChild(body);
    fragment.appendChild(card);
  }

  container.appendChild(fragment);
}

/**
 * Fetches a .md file and renders a full blog post into the page.
 *
 * @param {string} postId
 * @param {string} contentId  – element to render Markdown into
 * @param {string} metaId     – element to render post hero/meta into
 */
function loadPost(postId, contentId, metaId) {
  var post = null;
  if (typeof POSTS !== "undefined") {
    for (var i = 0; i < POSTS.length; i++) {
      if (POSTS[i].id === postId) { post = POSTS[i]; break; }
    }
  }

  var contentEl = document.getElementById(contentId);
  var metaEl    = document.getElementById(metaId);

  if (!post) {
    if (contentEl) contentEl.innerHTML = "<p class='no-projects'>Post not found.</p>";
    return;
  }

  // Render meta / hero
  if (metaEl) {
    var h1 = document.createElement("h1");
    h1.className = "post-hero__title";
    h1.textContent = post.title;
    metaEl.appendChild(h1);

    var dateEl = document.createElement("p");
    dateEl.className = "post-hero__meta";
    dateEl.textContent = formatDate(post.date);
    metaEl.appendChild(dateEl);

    if (post.tags && post.tags.length) {
      var tagsDiv = document.createElement("div");
      tagsDiv.className = "project-card__tags";
      tagsDiv.style.marginTop = ".5rem";
      for (var t = 0; t < post.tags.length; t++) {
        var tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = post.tags[t];
        tagsDiv.appendChild(tag);
      }
      metaEl.appendChild(tagsDiv);
    }

    // Linked project
    if (post.projectId && typeof PROJECTS !== "undefined") {
      for (var p = 0; p < PROJECTS.length; p++) {
        if (PROJECTS[p].id === post.projectId) {
          var relP = document.createElement("p");
          relP.className = "post-hero__project-link";
          relP.innerHTML = "Related project: <a href=\"projects/" + PROJECTS[p].id + ".html\">" + PROJECTS[p].title + "</a>";
          metaEl.appendChild(relP);
          break;
        }
      }
    }
  }

  // Fetch and render Markdown
  if (!contentEl || !post.contentPath) return;
  contentEl.innerHTML = "<p class='no-projects'>Loading\u2026</p>";

  fetch(post.contentPath)
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(function (md) {
      if (typeof marked !== "undefined") {
        contentEl.innerHTML = marked.parse(md);
      } else {
        contentEl.innerHTML = "<pre style='white-space:pre-wrap'>" + md + "</pre>";
      }
    })
    .catch(function () {
      contentEl.innerHTML =
        "<p class='no-projects'>Could not load post content. " +
        "Make sure you are running on a local server (<code>npx serve .</code>) rather than opening the file directly.</p>";
    });
}

/**
 * Escape a string for safe insertion into HTML.
 */
function escapeHTML(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Renders project cards into a container element.
 *
 * @param {string} containerId  – id of the target element
 * @param {boolean} featuredOnly – if true, only render projects with featured === true
 */
function renderProjects(containerId, featuredOnly) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var list = featuredOnly
    ? PROJECTS.filter(function (p) { return p.featured; })
    : PROJECTS;

  if (list.length === 0) {
    container.innerHTML = "<p class='no-projects'>No projects yet — check back soon!</p>";
    return;
  }

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    var card = document.createElement("article");
    card.className = "project-card";

    // Thumbnail
    if (p.image) {
      var img = document.createElement("img");
      img.className = "project-card__img";
      img.src = p.image;
      img.alt = p.title + " screenshot";
      card.appendChild(img);
    } else {
      var placeholder = document.createElement("div");
      placeholder.className = "project-card__placeholder";
      placeholder.textContent = "</>";
      card.appendChild(placeholder);
    }

    var body = document.createElement("div");
    body.className = "project-card__body";

    var title = document.createElement("h3");
    title.className = "project-card__title";
    title.textContent = p.title;
    body.appendChild(title);

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

    // Links
    if (p.links) {
      var linksDiv = document.createElement("div");
      linksDiv.className = "project-card__links";
      var keys = Object.keys(p.links);
      for (var k = 0; k < keys.length; k++) {
        var name = keys[k];
        var a = document.createElement("a");
        a.href = p.links[name];
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = name;
        linksDiv.appendChild(a);
      }
      body.appendChild(linksDiv);
    }

    card.appendChild(body);
    fragment.appendChild(card);
  }

  container.innerHTML = "";
  container.appendChild(fragment);
}

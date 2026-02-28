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

  var html = "";
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    html += "<article class='project-card'>";

    // Thumbnail
    if (p.image) {
      html += "<img class='project-card__img' src='" + p.image + "' alt='" + p.title + " screenshot'>";
    } else {
      html += "<div class='project-card__placeholder'>&lt;/&gt;</div>";
    }

    html += "<div class='project-card__body'>";
    html += "<h3 class='project-card__title'>" + p.title + "</h3>";
    html += "<p class='project-card__desc'>" + p.description + "</p>";

    // Tags
    if (p.tags && p.tags.length) {
      html += "<div class='project-card__tags'>";
      for (var t = 0; t < p.tags.length; t++) {
        html += "<span class='tag'>" + p.tags[t] + "</span>";
      }
      html += "</div>";
    }

    // Links
    if (p.links) {
      html += "<div class='project-card__links'>";
      var keys = Object.keys(p.links);
      for (var k = 0; k < keys.length; k++) {
        var name = keys[k];
        html += "<a href='" + p.links[name] + "' target='_blank' rel='noopener noreferrer'>" + name + "</a>";
      }
      html += "</div>";
    }

    html += "</div></article>";
  }

  container.innerHTML = html;
}

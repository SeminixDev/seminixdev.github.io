/**
 * Projects Database
 * -----------------
 * Add, remove, or reorder entries here to update both the
 * landing-page "Featured" section and the full /projects.html gallery.
 *
 * Each project object:
 *   title       – Project name
 *   description – Short summary (1-2 sentences)
 *   tags        – Array of technology/topic tags
 *   image       – Path or URL to a thumbnail (optional, falls back to placeholder)
 *   links       – Object with named URLs, e.g. { github: "…", itch: "…", live: "…" }
 *   featured    – true to show on the landing page
 */
const PROJECTS = [
  {
    title: "Example Game Project",
    description: "A 2D platformer built with Unity featuring procedural level generation.",
    tags: ["Unity", "C#", "Game Dev"],
    image: "",
    links: {
      github: "https://github.com/SeminixDev",
      itch: "https://seminix.itch.io"
    },
    featured: true
  },
  {
    title: "Portfolio Website",
    description: "This very site — a code-themed personal portfolio with dark/light mode.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "",
    links: {
      github: "https://github.com/SeminixDev/seminixdev.github.io"
    },
    featured: true
  },
  {
    title: "Another Cool Project",
    description: "A command-line tool that does something awesome.",
    tags: ["Python", "CLI"],
    image: "",
    links: {
      github: "https://github.com/SeminixDev"
    },
    featured: false
  }
];

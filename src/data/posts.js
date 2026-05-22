/**
 * Blog Posts Database
 * -------------------
 * Single source of truth for all blog/devlog posts.
 * Updating an entry here updates the home page Latest Posts section
 * and the blog listing page automatically.
 *
 * Schema:
 *   id          – URL slug, used for blog/[id].html
 *   title       – Post title
 *   date        – "YYYY-MM-DD" (sorted newest-first)
 *   summary     – One-sentence teaser shown on post cards
 *   contentPath – Path to .md file (relative to site root), fetched at runtime
 *   projectId   – Optional: links this post to a project (must match a project id)
 *   tags        – Array of topic tags
 *   image       – Optional card thumbnail path or URL
 */
const POSTS = [
  {
    id: "example-post",
    title: "Welcome to My Devlog",
    date: "2026-05-22",
    summary: "An introduction to this blog — where I'll post development updates, technical deep-dives, and game jam retrospectives.",
    contentPath: "src/posts/example-post.md",
    projectId: null,
    tags: ["Meta", "Site"],
    image: ""
  }
];

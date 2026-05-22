# SeminixDev — Content Update Checklist

A quick reference for keeping all platforms in sync whenever I update my portfolio.

---

## Adding or Updating a Project

- [ ] Edit `src/data/projects.js` — update `description`, `tags`, `images`, `video`, `links`
- [ ] Add screenshot(s) to `src/assets/projects/[slug]/` and reference them in `images: [...]`
- [ ] If a video exists: get the YouTube embed URL (`https://www.youtube.com/embed/VIDEO_ID`) and set `video: "..."`
- [ ] The project detail page at `projects/[slug].html` is auto-rendered from the data — no HTML edits needed
- [ ] **LinkedIn**: Update the "Projects" section — 1–2 sentences + link to `seminixdev.github.io/projects/[slug].html`
- [ ] **Itch.io** (if game): Update the game description page to mention/link your portfolio

---

## Publishing a Blog / Devlog Post

1. Write the post in `src/posts/[slug].md`
2. Add an entry to `src/data/posts.js` (copy the schema from the existing entry)
3. Create `blog/[slug].html` — copy `blog/example-post.html`, update:
   - `<title>` and `<meta name="description">`
   - The `loadPost("example-post", ...)` call → change to post's id
4. **LinkedIn**: Share a 2–3 sentence summary + link to the post
5. **Itch.io** (if game-related): Post as a devlog on the relevant game page

---

## When Status Changes (new job, graduation, etc.)

- [ ] Update the hero `<p>` in `index.html`
- [ ] Update `about.html`
- [ ] Update LinkedIn headline and summary

---

## Useful Links

| Platform   | URL |
|------------|-----|
| Portfolio  | https://seminixdev.github.io |
| GitHub     | https://github.com/SeminixDev |
| Itch.io    | https://seminix.itch.io |
| LinkedIn   | https://www.linkedin.com/in/moskala-piotr/ |

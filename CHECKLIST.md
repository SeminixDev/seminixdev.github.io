# SeminixDev — Content Update Checklist

A quick reference for keeping all platforms in sync whenever I update my portfolio.

---

## Adding or Updating a Project

- [ ] Create or edit `src/content/projects/[slug].md`
  - Frontmatter: `title`, `subtitle`, `description`, `tags`, `category`, `role`, `date`, `images`, `video`, `links`, `featured`
  - Body: full write-up in Markdown — headings, lists, code blocks all supported
- [ ] Add screenshot(s) to `public/assets/projects/[slug]/` and reference them in `images: [...]`
- [ ] If a video exists: paste the YouTube embed URL (`https://www.youtube.com/embed/VIDEO_ID`) in `video: "..."`
- [ ] Push to `main` — GitHub Actions builds and deploys automatically
- [ ] **LinkedIn**: Update the "Projects" section — 1–2 sentences + link to `seminixdev.github.io/projects/[slug]`
- [ ] **Itch.io** (if game): Update the game description page to mention/link the portfolio

---

## Publishing a Blog / Devlog Post

1. Create `src/content/posts/[slug].md`
   - Frontmatter: `title`, `date` (YYYY-MM-DD), `summary`, `tags`, optionally `projectId` (must match a project slug)
   - Body: full post in Markdown
2. Push to `main` — the blog listing and post page generate automatically
3. **LinkedIn**: Share a 2–3 sentence summary + link to the post
4. **Itch.io** (if game-related): Post as a devlog on the relevant game page

---

## When Status Changes (new job, graduation, etc.)

- [ ] Update the hero text in `src/pages/index.astro`
- [ ] Update `src/pages/about.astro`
- [ ] Update LinkedIn headline and summary

---

## Local Development

```bash
npm run dev       # Start dev server at http://localhost:4321
npm run build     # Build to dist/ (run before pushing if unsure)
npm run preview   # Preview the built dist/ locally
```

> **Deployment is automatic** — push to `main`, GitHub Actions runs `astro build`, and GitHub Pages is updated within ~1 minute.
> One-time setup required: **Settings → Pages → Source → GitHub Actions** in the repo settings.

---

## Useful Links

| Platform   | URL |
|------------|-----|
| Portfolio  | https://seminixdev.github.io |
| GitHub     | https://github.com/SeminixDev |
| Itch.io    | https://seminix.itch.io |
| LinkedIn   | https://www.linkedin.com/in/moskala-piotr/ |

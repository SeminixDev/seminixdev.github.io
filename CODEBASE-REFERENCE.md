# CODEBASE-REFERENCE.md

> Concise reference document. Keep this up to date when adding pages, components, or schema fields.

Site purpose: game programmer & software engineer personal portfolio site.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro v6 (static output, no SSR) |
| Styling | Vanilla CSS (`src/styles/global.css`) |
| Scripting | Vanilla JS in `public/scripts/` (no bundler) |
| TypeScript | Strict mode |
| Fonts | Self-hosted Fira Sans (body) + Fira Code (headings/code) |
| Hosting | GitHub Pages via GitHub Actions (`/.github/workflows/`) |
| Site URL | `https://seminixdev.github.io` |

---

## Project Structure

```
/
├── astro.config.mjs          # Astro config — site URL, no base path (user/org site)
├── tsconfig.json             # Strict TS; extends astro/tsconfigs/strict
├── package.json              # Scripts: dev, build, preview
│
├── .github/workflows/        # CI/CD — builds & deploys to GitHub Pages on push to main
├── .vscode/
│   ├── tasks.json            # "Dev: Start" and "Build & Preview" tasks
│   └── settings.json         # Uses workspace TypeScript (not bundled VS Code TS)
│
├── public/                   # Served as-is (no Astro processing)
│   ├── assets/
│   │   ├── me.jpg            # Portrait photo used in the landing page hero
│   │   └── projects/         # Project screenshot images (referenced from frontmatter)
│   ├── fonts/
│   │   ├── Fira-Code/        # FiraCode-VariableFont_wght.ttf (variable, 300–700)
│   │   └── Fira-Sans/        # FiraSans-Regular/Italic/Bold/BoldItalic.ttf
│   └── scripts/
│       ├── carousel.js       # Hover-triggered auto-scroll carousel (see behaviour notes)
│       ├── filter.js         # Category filter tabs on the /projects page
│       └── lightbox.js       # Full-screen image/video lightbox on project detail pages
│
└── src/
    ├── content.config.ts     # Zod schemas for content collections (see below)
    ├── env.d.ts              # Astro type reference shim
    │
    ├── content/
    │   ├── projects/         # One .md file per project
    │   └── posts/            # One .md file per blog post
    │
    ├── layouts/
    │   └── BaseLayout.astro  # <html> shell, navbar, footer, theme toggle, font <link>s
    │
    ├── components/
    │   ├── ProjectCard.astro  # Card shown in project grids; handles 0/1/N image cases
    │   └── BlogCard.astro     # Card shown in blog grids
    │
    ├── pages/
    │   ├── index.astro        # Landing page — hero (portrait + text), featured projects, latest posts
    │   ├── about.astro        # Static about page
    │   ├── projects.astro     # Full project grid with category filter tabs
    │   ├── blog.astro         # Full blog post list
    │   ├── projects/[slug].astro  # Dynamic project detail page
    │   └── blog/[slug].astro      # Dynamic blog post page
    │
    └── styles/
        └── global.css         # All styles — imported once in BaseLayout.astro
```

---

## Content Collections

### `projects` — `src/content/projects/*.md`

```ts
{
  title:         string            // Display name
  description:   string            // One-liner shown in card + hero subtitle on detail page
  tags:          string[]          // General tags (e.g. "Game Jam", "2D Platformer")
  skills:        string[]          // Technical skills/tools (e.g. "Unity", "C#")
  category:      'engine' | 'game' | 'web'   // Used for filter tabs
  role:          string            // e.g. "Solo", "Lead Programmer"
  date:          string            // "YYYY-MM" format
  images:        string[]          // Paths relative to public/ e.g. "/assets/projects/foo.png"
  video?:        string            // YouTube embed URL (optional)
  links:         Record<string, string>  // e.g. { itch: "https://...", github: "https://..." }
  featured:      boolean           // Shows on landing page if true
  playInBrowser: boolean           // Shows "✨Play In Browser" if true
}
```

Markdown body = project description shown on the detail page (`/projects/[slug]`).

### `posts` — `src/content/posts/*.md`

```ts
{
  title:      string
  date:       string            // "YYYY-MM-DD" format
  summary:    string            // Short blurb shown in blog card
  projectId?: string            // Links post to a project (matches project filename without .md)
  tags?:      string[]
  image?:     string            // Optional header image path
}
```

---

## Pages & Routes

| URL | File | Notes |
|---|---|---|
| `/` | `pages/index.astro` | Hero with portrait, featured projects, latest 3 posts |
| `/about` | `pages/about.astro` | Static page |
| `/projects` | `pages/projects.astro` | All projects + JS category filter |
| `/projects/[slug]` | `pages/projects/[slug].astro` | Detail page — hero, media gallery, Markdown body, related posts |
| `/blog` | `pages/blog.astro` | All posts |
| `/blog/[slug]` | `pages/blog/[slug].astro` | Post with optional linked project |

---

## Styling

All CSS lives in `src/styles/global.css`. Key conventions:

- **CSS variables** defined on `:root` / `[data-theme="dark"]` and `[data-theme="light"]`
- **Font variables**: `--body-font`, `--heading-font` — change these to swap fonts globally
- **Colour tokens**: `--bg`, `--bg-surface`, `--bg-card`, `--text`, `--text-muted`, `--accent`, `--accent-alt`, `--heading`, `--link`, `--border`, `--shadow`
- Dark mode is default; light mode applied via `data-theme="light"` on `<html>`
- Theme persists in `localStorage` via inline script in `BaseLayout.astro` (runs before paint)
- Single mobile breakpoint at `600px`

---

## Client-Side Scripts

Scripts are plain JS files in `public/scripts/`, loaded with `<script is:inline src="...">`.

| Script | Behaviour |
|---|---|
| `carousel.js` | Auto-scrolls on card hover. Resets to frame 0 on mouse-leave. Arrow clicks pause auto-scroll; re-hovering restarts it. |
| `filter.js` | Filters `.project-card` elements by `data-category` attribute using filter tab buttons. |
| `lightbox.js` | Opens full-screen overlay on image/video thumb click; supports keyboard navigation (← → Esc). |

---

## Components

### `ProjectCard.astro`

- **0 images** → placeholder `</>` box
- **1 image** → static `<Image>` (Astro component, `loading="eager"`)
- **2+ images** → carousel `<div>` with prev/next arrows and dot indicators; first frame eager, rest lazy

### `BlogCard.astro`

- Displays title, date, summary, optional tag list
- Links to the related project if `projectId` is set

---

## Adding Content

**New project:** Create `src/content/projects/my-project.md` with the frontmatter schema above. Add screenshots to `public/assets/projects/`.

**New blog post:** Create `src/content/posts/my-post.md`. Set `projectId` to link it to a project detail page.

**Feature a project on the home page:** Set `featured: true` in its frontmatter.

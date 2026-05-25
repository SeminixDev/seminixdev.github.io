---
title: Portfolio Website
description: A fully static, code-themed portfolio with dark/light mode, filterable project gallery, and Markdown-based content management.
skills: [Astro, HTML, CSS, JavaScript, TypeScript]
tags: [Meta]
category: web
role: Solo
date: "2026-05"
images: ["/assets/projects/pw1.png"]
video: ""
links:
  github: https://github.com/SeminixDev/seminixdev.github.io
featured: false
---

A fully static portfolio site built with **Astro**. It showcases all of my projects and helps me document my software and game development journey.

## Architecture & Content

Content is managed exclusively via Astro's **Content Collections** — adding a new project or blog post simply means writing a new `.md` file with a specific front-matter schema. This completely eliminates the need for an external CMS or database.

The site is built as a fully static output and deployed automatically to GitHub Pages via a **GitHub Actions** workflow triggered on every push to the `main` branch. 

## UI & Features

The site features a custom Vanilla CSS design system using CSS variables, ensuring a lightweight payload with zero framework overhead. Key features include:

- **Theme Toggling**: A dark/light mode toggle that persists in `localStorage` and respects the user's `prefers-color-scheme`.
- **Dynamic Project Gallery**: Filterable project cards with hover-activated image carousels.
- **Media Lightbox**: A custom, keyboard-navigable media lightbox for viewing project screenshots and videos.
- **Responsive Layout**: A mobile-first design that adapts seamlessly to all screen sizes.
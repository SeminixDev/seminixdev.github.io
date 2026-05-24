---
title: Portfolio Website
subtitle: Personal Developer Portfolio
description: This site — a code-themed portfolio with dark/light mode, filterable project gallery, image carousels, lightbox gallery, Markdown blog, and individual project detail pages. Built with Astro.
skills: [Astro, HTML, CSS, JavaScript, TypeScript]
tags: []
category: web
role: Solo
date: "2026-05"
images: ["/assets/projects/pw1.png"]
video: ""
links:
  github: https://github.com/SeminixDev/seminixdev.github.io
featured: false
---

A fully static portfolio site built with **Astro** — the source of truth for all my projects. Features include dark/light theme toggle (persisted in localStorage, respects `prefers-color-scheme`), a filterable project gallery with image carousels and a keyboard-navigable lightbox, a blog system with content authored in Markdown, individual project detail pages with technical write-ups, and a responsive mobile layout.

Content is managed via Astro's Content Collections — adding a new project means writing a single `.md` file. The site is deployed automatically to GitHub Pages via a GitHub Actions workflow on every push to `main`.

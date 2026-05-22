# Welcome to My Devlog

This is the first post on my portfolio blog. I'll use this space to document development progress on my projects, share technical write-ups, and post retrospectives on game jams I participate in.

## What to Expect

Posts here will fall into a few categories:

- **Devlogs** — progress updates on active projects: what I built, what broke, and what I learned
- **Technical write-ups** — deeper dives into specific systems (networking, rendering, physics)
- **Jam retrospectives** — what went well, what didn't, and how I'd approach it differently next time

## How Posts Link to Projects

Each post can be associated with a specific project. When a post has a linked project, you'll see it referenced on both the blog card and at the bottom of the post page. On the project's detail page, all related posts are listed together.

## A Note on the Stack

This site is built without any frameworks — pure HTML, CSS, and vanilla JavaScript. Blog posts like this one are written in Markdown and rendered client-side using [marked.js](https://marked.js.org/). Images, code blocks, and all standard Markdown formatting are supported.

```js
// Example: adding a new blog post
const POSTS = [
  {
    id: "my-new-post",
    title: "My New Post",
    date: "2026-06-01",
    summary: "A one-sentence teaser.",
    contentPath: "src/posts/my-new-post.md",
    projectId: "modularender", // optional
    tags: ["C++", "Devlog"]
  }
];
```

---

*More posts coming soon.*

import type { ProjectData } from "../types";
import thisWebsiteTitle from "../../assets/thisWebsite_title.png";

export const project: ProjectData = {
  slug: "this-website",
  type: "special",
  title: "Amy Liu's Portfolio Website",
  time: "JAN 2026",
  skills: "React • TypeScript • Tailwind • React Router • UI/UX",
  role: "Frontend Developer • Designer",
  description:
    "A custom-built interactive portfolio website designed to showcase projects through an unconventional horizontal “Lava Tray” interface and a responsive masonry grid. Built with React and Tailwind CSS, the site supports dual viewing modes, immersive full-screen project pages, and modular content blocks for long-form storytelling. A built-in admin system enables direct content editing, while dynamic filtering and navigation support intuitive exploration across devices.",
  image: thisWebsiteTitle,
  link: null,
  githubLink: null,
  contentBlocks: [
    {
      id: "tw-intro",
      type: "rich-text",
      align: "left",
      content:
        "<p>This case study is rendered by the portfolio itself—you are reading a page built from the same modular system that documents every other project. Each work gets a stable slug, a shareable URL under <strong>/works/:slug</strong>, and optional long-form blocks below the hero.</p><p>The goal was not a static PDF-style portfolio, but a browsable environment: quick scanning in the tray, deep reading on project pages, and live embeds where tools deserve a first-class demo.</p>",
    },
    {
      id: "tw-pillars",
      type: "card-grid",
      cards: [
        {
          title: "Lava Tray",
          description:
            "Horizontal snap-scroll tray with hover previews, floating metadata, and tactile card selection. Optimized for discovery—see many projects at once without leaving the landing rhythm.",
          image: thisWebsiteTitle,
        },
        {
          title: "Grid View",
          description:
            "Responsive masonry layout for readers who prefer scanning thumbnails. Search, multi-tag filters, and sort modes (default, alphabetical, newest) narrow the set in place.",
          image: thisWebsiteTitle,
        },
        {
          title: "Project Stories",
          description:
            "Full-screen detail pages with hero media, about copy, sidebar metadata, and composable content blocks—stats, splits, process steps, quotes, embeds, and CTAs.",
          image: thisWebsiteTitle,
        },
      ],
    },
    {
      id: "tw-split-dual-mode",
      type: "split",
      title: "Two ways to browse, one data model",
      text: "Tray and grid read from the same project array—no duplicated content. Clicking any real project navigates to its canonical route instead of opening a fragile in-app overlay, so URLs survive refresh and can be shared.\n\nThe landing page uses scroll snapping to separate introduction from the works interface. Purple accent (#BA76FF) on deep blue gradients carries through landing, tray, grid, and detail views for a consistent editorial identity.",
      image: thisWebsiteTitle,
      reverse: false,
    },
    {
      id: "tw-stats",
      type: "stats",
      stats: [
        { label: "Project slots", value: "20", suffix: "" },
        { label: "Content blocks", value: "16", suffix: " types" },
        { label: "Route groups", value: "2", suffix: "" },
        { label: "Stack", value: "Vite", suffix: " + React" },
      ],
    },
    {
      id: "tw-steps",
      type: "process-steps",
      layout: "horizontal",
      steps: [
        {
          title: "Land & orient",
          description:
            "Hero landing introduces the site, then smooth-scroll into the Works section at /works.",
        },
        {
          title: "Filter & compare",
          description:
            "Search by title or skill tags; switch tray ↔ grid without losing context.",
        },
        {
          title: "Open a project",
          description:
            "Navigate to /works/:slug for immersive detail, prev/next between adjacent works.",
        },
        {
          title: "Try live tools",
          description:
            "Tools Library at /tools hosts standalone utilities; select projects embed runtime demos in the hero iframe.",
        },
      ],
    },
    {
      id: "tw-code-routes",
      type: "code",
      language: "typescript",
      filename: "Route contract (excerpt)",
      code: `// Works
/                          → landing + works app
/works                     → scroll to Works section
/works/:project_name       → project detail (slug-based)

// Tools (unchanged)
/tools
/tools/:name/:id
/tools/runtime/:slug`,
    },
    {
      id: "tw-accordion",
      type: "accordion",
      items: [
        {
          title: "Shareable project routes",
          content:
            "Every published project uses a stable slug (e.g. this-website, campus-cravings). Invalid slugs show a lightweight not-found state with a path back to /works. Closing detail always returns to Works—not browser history—so navigation stays predictable.",
        },
        {
          title: "Admin content editing",
          content:
            "Password-gated admin mode unlocks inline edits on project detail: titles, descriptions, hero images, embed URLs, and content blocks. Changes persist in session state so the site can be updated during a review without redeploying copy.",
        },
        {
          title: "Modular content blocks",
          content:
            "Long-form case studies compose from blocks: rich text, split layouts, image grids, masonry, stats, process steps, card grids, comparisons, accordions, quotes, video, code snippets, and CTAs. This page uses that same block set as a living spec.",
        },
        {
          title: "Tools Library integration",
          content:
            "Interactive utilities (e.g. Course Tiermaker) live in /tools with metadata pages and a /tools/runtime/:slug embed surface. Portfolio projects can reference tools via hero iframes and CTA links without duplicating the app shell.",
        },
      ],
    },
    {
      id: "tw-quote",
      type: "quote",
      text: "A portfolio should feel like a place you wander—not a deck you download.",
      author: "Design intent",
    },
    {
      id: "tw-cta",
      type: "cta",
      text: "Browse the Works tray",
      link: "/works",
      subtext: "Return to the interactive project browser",
    },
  ],
};

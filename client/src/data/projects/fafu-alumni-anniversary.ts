import type { ProjectData } from "../types";
import anniversaryImage from "../../assets/anniversary_title.png";

export const project: ProjectData = {
  slug: "fafu-alumni-anniversary",
  type: "special",
  title: "FAFU Alumni Anniversary Presentation Framework",
  time: "JAN 2026",
  skills: "React • GSAP • UI/UX",
  role: "Designer Developer",
  description:
    "This project is a modular, React-based web presentation framework designed for ceremonial and large-scale event use. Built as a flexible skeleton rather than a single fixed slideshow, it supports polymorphic slide templates, GSAP-driven transitions, and both manual and timed autoplay modes. Slides are rendered dynamically from structured data, enabling reusable layouts for introductions, historical narratives, sponsor sections, and transitions. The architecture prioritizes visual rhythm, pacing, and adaptability, allowing the same codebase to be reused across different events with minimal changes while maintaining a cohesive ceremonial aesthetic.",
  image: anniversaryImage,
  link: null,
  githubLink: null,
};

import type { ProjectData } from "../types";
import CourseTiermakerTitle from "../../assets/course_tiermaker_title.svg";

export const project: ProjectData = {
  slug: "course-tiermaker",
  type: "special",
  title: "Course Tiermaker",
  time: "MAY 2026",
  skills: "React • TypeScript • UX • localStorage",
  role: "Product Designer • Frontend Developer",
  description:
    "An interactive course ranking tool for planning MI electives at UofT. Import a JSON course list, drag courses into custom tiers, annotate each course with notes, and compare options side by side. Progress saves automatically to the browser so planning can continue across sessions without an account.",
  image: CourseTiermakerTitle,
  embedUrl: "/tools/runtime/course-tiermaker",
  link: "/tools/course-tiermaker/003",
  githubLink: "",
  contentBlocks: [
    {
      id: "ctm-intro",
      type: "rich-text",
      align: "left",
      content:
        "<p>Course Tiermaker started as a personal planning workflow: too many interesting electives, not enough clarity on trade-offs. Instead of spreadsheets, the tool uses a tier-list interaction model inspired by <em>tiermaker.com</em>—fast to scan, easy to rearrange, and readable at a glance.</p><p>The live embed above is the full application. Scroll down for how it works, what it saves, and how it connects to the Tools Library.</p>",
    },
    {
      id: "ctm-split-features",
      type: "split",
      title: "Core workflow",
      text: "Upload or paste a JSON course list, then drag cards between tiers (Must Take, High, Maybe, Later, Skip). Each card supports inline notes for instructor preferences, scheduling constraints, or vibe checks. Tier labels and colors can be edited to match your own decision language.\n\nThe interface is optimized for quick comparisons: pool view for unranked courses, tier columns for committed rankings, and persistent state so nothing is lost mid-session.",
      image: CourseTiermakerTitle,
      reverse: false,
    },
  ],
};

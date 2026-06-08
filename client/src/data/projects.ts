import thisWebsiteTitle from "../assets/thisWebsite_title.png";

import campusCravingTitle from "../assets/campusCraving_title.png";

import smartChipTitle from "../assets/SmartChip_title.jpg";

import GenesisTitle from "../assets/Genesis_title.png";

import CDaysTitle from "../assets/CDays_title.png";

import windowWeatherTitle from "../assets/windowWeather_title.png";

import anniversaryImage from "../assets/anniversary_title.png"; 

import unicefGeosightTitle from "../assets/unicefGeosight_title.png";

import sameRoofTitle from "../assets/UTSM_title.jpg";

import lightningTitle from "../assets/lightning_title.png";

import OCCATProfile from "../assets/OCCAT_profile.png";
import OCCATPost from "../assets/OCCAT_post.png";

import trafficCityTitle from "../assets/TrafficCity_title.png";
import trafficCityIdea1 from "../assets/TrafficCity_idea.png";
import trafficCityIdea2 from "../assets/TrafficCity_idea2.png";

import lookingGlassTitle from "../assets/lookingGlass_title.png";

import attractivePoliticsTitle from "../assets/attractivePolitics_title.png";

import CourseTiermakerTitle from "../assets/course_tiermaker_title.svg";
import TemperatureCloudTitle from "../assets/TemperatureCloud_title.JPG";


export interface BlockBase {
  id: string;
}

export interface RichTextBlock extends BlockBase {
    type: 'rich-text';
    content: string; // HTML string supported
    align?: 'left' | 'center';
}

export interface SplitBlock extends BlockBase {
  type: 'split';
  image: string;
  title?: string;
  text: string;
  reverse?: boolean;
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  image: string;
  caption?: string;
  variant: 'full-width' | 'center' | 'left' | 'right';
}

export interface GridBlock extends BlockBase {
  type: 'grid';
  images: string[];
  columns: 2 | 3 | 4;
}

export interface MasonryBlock extends BlockBase {
    type: 'masonry';
    images: string[];
}

export interface GalleryBlock extends BlockBase {
    type: 'gallery-scroll';
    images: string[];
}

export interface QuoteBlock extends BlockBase {
  type: 'quote';
  text: string;
  author?: string;
}

export interface ProcessStepBlock extends BlockBase {
    type: 'process-steps';
    steps: { title: string; description: string }[];
    layout: 'vertical' | 'horizontal';
}

export interface StatsBlock extends BlockBase {
    type: 'stats';
    stats: { label: string; value: string; suffix?: string }[];
}

export interface CardGridBlock extends BlockBase {
    type: 'card-grid';
    cards: { title: string; description: string; image?: string }[];
}

export interface ComparisonBlock extends BlockBase {
    type: 'comparison';
    imageLeft: string;
    imageRight: string;
    labelLeft?: string;
    labelRight?: string;
}

export interface AccordionBlock extends BlockBase {
    type: 'accordion';
    items: { title: string; content: string }[];
}

export interface CTABlock extends BlockBase {
    type: 'cta';
    text: string;
    link: string;
    subtext?: string;
}

export interface VideoBlock extends BlockBase {
    type: 'video';
    url: string; 
    caption?: string;
    autoPlay?: boolean;
    provider?: 'youtube' | 'vimeo' | 'figma' | 'loom' | 'native';
}

export interface CodeBlock extends BlockBase {
    type: 'code';
    code: string;
    language?: string;
    filename?: string;
}

// Legacy support alias (mapped to ImageBlock in renderer if needed, or kept for compat)
export interface FullWidthBlock extends BlockBase {
  type: 'full-width';
  image: string;
  caption?: string;
}

export type ContentBlock = 
    | RichTextBlock
    | SplitBlock 
    | ImageBlock
    | FullWidthBlock
    | GridBlock 
    | MasonryBlock
    | GalleryBlock
    | QuoteBlock 
    | ProcessStepBlock 
    | StatsBlock
    | CardGridBlock
    | ComparisonBlock
    | AccordionBlock
    | CTABlock
    | VideoBlock 
    | CodeBlock;

export interface ProcessSection {
  id: string;
  title: string;
  content: string;
  image: string | null;
}

export interface ProcessSection {
  id: string;
  title: string;
  content: string;
  image: string | null;
}

export interface ProjectItem {
  id: number;
  slug: string;
  idStr: string;
  time: string;
  projectLabel: string;
  type: "special" | "placeholder";
  title: string;
  skills: string;
  role: string;
  description: string;
  customHtml?: string;
  image: string | null;
  embedUrl?: string | null;
  link: string | null;
  githubLink: string | null;
  contentBlocks?: ContentBlock[];
}

export const initialProjects: ProjectItem[] = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const idStr = id < 10 ? `0${id}` : `${id}`;
  const projectLabel = `PROJECT ${idStr}`;
  
  //1. This Website
  if (id === 1) {
    return {
      id,
      slug: "this-website",
      idStr,
      projectLabel,
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
  }

  // 2. Campus Cravings
  if (id === 2) {
    return {
      id,
      slug: "campus-cravings",
      idStr,
      projectLabel,
      type: "special",
      title: "Campus Cravings",
      time: "AUG 2025",
      skills: "HTML/CSS/JavaScript • RAG • UI/UX",
      role: "Creative Technologist • Developer",
      description:
        "Designed a site showcasing NYU-area food options by embedding and customizing WordPress content via REST APIs. Built a dish randomizer in JavaScript and integrated an OpenAI-based chatbot with basic RAG logic. Applied UX principles from Figma mockups. Led to recruitment for NYU’s WordPress & Emerging Tech role.",
      image: campusCravingTitle,
      link: "https://wp.nyu.edu/tischschoolofthearts-campus_craving/",
      githubLink: "",
    };
  }

  // 3. Between Boundaries
  if (id === 3) {
    return {
      id,
      slug: "between-boundaries",
      idStr,
      projectLabel,
      type: "special",
      title: "Between Boundaries",
      time: "FALL 2023",
      skills: "Arduino • AI/ML • WEBGL • Projection Mapping • Installation",
      role: "Creative Technologist • Interaction Designer",
      description:
       "A semi-autonomous interactive installation exploring the blurred boundary between human, machine, and nature. The work presents a speculative “being” that claims neither human nor AI identity, communicating primarily through emojis and non-verbal signals. Using sensors, serial communication, and a kinetic sculpture with RGB lighting and sound, the installation shifts behavior based on human presence and interaction. Digital responses generated through character-based AI are mapped to physical reactions, while a Pepper’s Ghost hologram blends virtual 3D content with physical form. The project questions authorship, consciousness, and how human bias shapes the systems we create.",
      image: smartChipTitle,
      link: null,
      githubLink: null,
    };
  }

  //
  if (id === 4) {
    return {
      id,
      slug: "genesis",
      idStr,
      projectLabel,
      type: "special",
      title: "Genesis",
      time: "FALL 2022",
      skills: "p5.js • AI/ML • Projection Mapping • Installation",
      role: "Game Designer • Developer",
      description:
        "GENESIS is an interactive narrative installation that imagines a future in which humanity no longer exists and artificial intelligence becomes the sole medium for preserving human culture. Participants assume the role of observers in orbit, scanning everyday objects to generate symbolic texts and myth-like narratives that form a speculative encyclopedia for a future species. Combining p5.js animations, object detection, generative text logic, and MIDI-controlled projection mapping, the work links physical artifacts to responsive visuals and asks how meaning, memory, and human values are translated—and transformed—when interpreted through algorithmic systems.",
      image: GenesisTitle,
      link: null,
      githubLink: null,
    };
  } 

  // 5. 100 Days of OC's (?) Artifacts
  if (id === 5) {
    return {
      id,
      slug: "100-days-ocs-artifacts",
      idStr,
      projectLabel,
      type: "special",
      title: "100 Days of OC's (?) Artifacts",
      time: "FALL 2025",
      skills: "Graphic Design",
      role: "Graphic Designer",
      description:
        "A semesrer-long personal challenge to output creative visuals for 100 days. The project explores themes of identity, transformation, and narrative through a series of digital illustrations and mixed-media collages. Each piece reflects a unique aspect of character design, storytelling, or emotional expression.",
      image: CDaysTitle,
      link: "https://www.instagram.com/siera_100days/",
      githubLink: "",
    };
  } 

  // 3. UNICEF GeoSight
  if (id === 6) {
    return {
      id,
      slug: "unicef-geosight",
      idStr,
      projectLabel,
      type: "special",
      title: "UNICEF GeoSight",
      time: "JUNE 2025",
      skills: "React • MapLibre GL JS • Docker",
      role: "Co-Developer",
      description:
        "Co-developed a working prototype for a dual-map swipe feature proposed in UNICEF GeoSight’s open-source repository. Built with React and MapLibre GL JS to support side-by-side comparison of geospatial data, and refined state management to enable responsive toggling and improved usability.",
      image: unicefGeosightTitle,
      link: "",
      githubLink: "",
    };
  }

  // 6. Under the Same Roof
  if (id === 7) {
    return {
      id,
      slug: "under-the-same-roof",
      idStr,
      projectLabel,
      type: "special",
      title: "Under the Same Roof",
      time: "SPRING 2025",
      skills: "Three.js • Fusion 360 • Projection Mapping • 3D Printing • Installation",
      role: "Creative Technologist • 3D Artist ",
      description:
        "A mixed-media installation exploring how algorithmic language models reshape our understanding of home and meaning. Visitors input a word, which is processed through a Word2Vec embedding model to dynamically alter a physical dollhouse’s layout and atmosphere using Three.js, projection mapping, and screen-based media.",
      image: sameRoofTitle,
      link: null,
      githubLink: null
    };
  }

  if (id === 8) {
    return {
      id,
      slug: "lightning",
      idStr,
      projectLabel,
      type: "special",
      title: "Lightning",
      time: "SPRING 2025",
      skills: "p5.js • generative art",
      role: "Developer",
      description:
        "A generative animation exploring the visual structure and rhythm of lightning through recursive branching and controlled randomness. Built in p5.js, the sketch uses Gaussian noise, depth-based branching, and layered glow effects to simulate electrical discharge, flicker, and atmospheric light over time.",
      image: lightningTitle,
      link: null,
      githubLink: null,
    };
  }

  // 9. Traffic City
  if (id === 9) {
    return {
      id,
      slug: "traffic-city",
      idStr,
      projectLabel,
      type: "special",
      title: "Traffic City",
      time: "FALL 2024",
      skills: "Accessibility • HTML/CSS/JavaScript • MakeCode Arcade • Arduino",
      role: "Game Designer • Developer",
      description:
        "Designed and co-developed a browser-based two-button driving game prioritizing inclusive play for users with limited mobility. Built in MakeCode Arcade, the game allows control through two-directional inputs, enabling gameplay via alternative physical gestures. Implemented accessibility features including colorblind-safe palettes and dual-sensory feedback.",
      image: trafficCityTitle,
      link: "https://editor.p5js.org/sl9964/full/nGaf3eE2I",
      githubLink: "",
      processSections: [ 
        { 
          id: "p1",
          title: "The Concept: Balancing Constraints",
          content: "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course, so balancing multiple final projects becomes its own constraint. In this case, the two “weights” on my beam balance were _Intro to Digital Fabrication_ and _The Nature of Code_, and my creative process had to move carefully between them. From previous projects, I had learned that constraints define possibilities. This led me to propose a project that combined a physical dollhouse with a digital room. As someone deeply interested in interior design, I wanted to experiment with both physical and virtual spatial design within one system.",
            image: trafficCityIdea1
          },
        {
          id: "p2",
          title: "Development: The Digital Room",
          content: "The development of Under the Same Roof, like most combined final projects, involved many challenges. The digital room took the form of an office, which itself can be understood as a system composed of defined elements—desks, chairs, bookcases, cups, and computers. Each of these objects can be broken down into geometric primitives with adjustable parameters. For example, a cup can be modeled as a hollow cylinder with a torus handle; by adjusting scale, proportion, and style, it can become a mug, water bottle, or teacup. This approach allows for a large number of variations and combinations that can be stylized through color and material choices.",
          image:  trafficCityIdea2
        }
      ]
    };
  }

  //
  if (id === 10) {
    return {
      id,
      slug: "looking-through-glass-house",
      idStr,
      projectLabel,
      type: "special",
      title: "The Looking-through Glass House",
      time: "Spring 2024",
      skills: "Three.js • Blender • Interactive Narrative",
      role: "Developer",
      description:
        "An interactive web-based narrative inspired by Through the Looking-Glass, combining a 2D questionnaire with a 3D navigable room. The project explores authorship, control, and identity by positioning the user as a “pawn” within a rule-driven system, using mirrors, narration, and constrained interaction to question agency within digital environments.",
      image: lookingGlassTitle,
      link: null,
      githubLink: null,
    };
  }

  //11. Window Weather
  if (id === 11) {
    return {
      id,
      slug: "window-weather",
      idStr,
      projectLabel,
      type: "special",
      title: "Window Weather",
      time: "SPRING 2025",
      skills: "p5.js • API Integration • Generative Art",
      role: "Designer Developer",
      description:
        "This project is an interactive weather visualization that transforms real-world climate data into a simulated interior environment. Using live data from a weather API, the system translates conditions such as rain, snow, fog, cloud cover, wind direction, and time of day into generative visuals rendered through p5.js. Weather parameters dynamically influence particle behaviors, noise fields, opacity, motion, and density, creating responsive window-based scenes that shift between atmospheric states. By framing global weather inside a domestic interior, the project explores how external environmental data can be abstracted into sensory, emotional experiences—blurring the boundary between outside climate systems and intimate, lived space.tion of observing weather through a window.",
      image: windowWeatherTitle,
      link: "https://meowing-chef-843.notion.site/Window-of-Weather-1b5fc717e3aa80e19c6dd6f1ec211193",
      githubLink: null,
    };
  } 

  // 12. OCCat
  if (id === 12) {
    return {
      id,
      slug: "occat-social",
      idStr,
      projectLabel,
      type: "special",
      title: "OCCat Social",
      time: "SPRING 2024",
      skills: "Node.js • Full Stack",
      role: "Full Stack Developer",
      description:
        "Developed a side-scroll social platform for Original Character (OC) creators with profile customization, media uploads, and community interactions. Built with Node.js, Express.js, bcrypt, and NeDB. Designed a playful, niche-oriented UI using EJS templates.",
      image: OCCATProfile,
      link: "#project-12",
      githubLink: "#github-12",
      processSections: [ 
        { 
          id: "p1",
          title: "The Concept: Balancing Constraints",
          content: "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course, so balancing multiple final projects becomes its own constraint. In this case, the two “weights” on my beam balance were _Intro to Digital Fabrication_ and _The Nature of Code_, and my creative process had to move carefully between them. From previous projects, I had learned that constraints define possibilities. This led me to propose a project that combined a physical dollhouse with a digital room. As someone deeply interested in interior design, I wanted to experiment with both physical and virtual spatial design within one system.",
            image: OCCATProfile
          },
        {
          id: "p2",
          title: "Development: The Digital Room",
          content: "The development of Under the Same Roof, like most combined final projects, involved many challenges. The digital room took the form of an office, which itself can be understood as a system composed of defined elements—desks, chairs, bookcases, cups, and computers. Each of these objects can be broken down into geometric primitives with adjustable parameters. For example, a cup can be modeled as a hollow cylinder with a torus handle; by adjusting scale, proportion, and style, it can become a mug, water bottle, or teacup. This approach allows for a large number of variations and combinations that can be stylized through color and material choices.",
          image: OCCATPost
        }
      ]
    };
  }

  if(id === 13){
      return {
      id,
      slug: "cloud-maker",
      idStr,
      projectLabel,
      type: "special",
      title: "Cloud Maker",
      time: "FALL 2023",
      skills: "p5.js • WEBGL • Arduino",
      role: "Developer",
      description:
        "A procedural 3D cloud form generated using merged sphere geometries and animated vertex distortion in Three.js. The cloud is constructed from layered base volumes and hundreds of smaller “cloudlets” distributed using golden-ratio spacing, then animated through sinusoidal vertex displacement to create a soft, breathing motion. The project explores form, motion, and atmosphere through geometry manipulation, lighting, and emissive materials.",
      image: TemperatureCloudTitle,
      link: null,
      githubLink: null,
      };
  }

  if (id === 14) {
    return {
      id,
      slug: "attractive-politics",
      idStr,
      projectLabel,
      type: "special",
      title: "Attractive Politics", 
      time: "SPRING 2025", 
      skills: "p5.js • Simulation • Generative Art. Data Visualization", 
      role: "Designer Developer",
      description:
        "This project began as an exploration of collective behavior and political polarization through interactive simulation. I assigned different “political stands” mass and behavioral traits, allowing particles to attract or repel one another with varying strength, inspired by physical forces such as magnetism and wind as well as ideas from The Nature of Code. Rather than relying on centralized mouse control, I made each element draggable, enabling users to influence local dynamics by repositioning agents directly. I also implemented an interface that allows the simulation to be started, paused, and switched between attraction and repulsion modes, while logging interaction data. Along the way, I encountered challenges translating geometric interaction into code—particularly detecting mouse interaction with non-circular shapes—which led me to adapt mathematical solutions for triangle hit-testing. Through this process, the project evolved from a purely visual sketch into an interactive system that reveals how small, localized interactions can produce complex, emergent social patterns.",
      image: attractivePoliticsTitle,
      link: "https://editor.p5js.org/sl9964/full/AoL-VeegC",
      githubLink: "",
    };
  }

  if (id === 15) {
    return {
      id,
      slug: "fafu-alumni-anniversary",
      idStr,
      projectLabel,
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
  }

  // 16. Course Tiermaker
  if (id === 16) {
    return {
      id,
      slug: "course-tiermaker",
      idStr,
      projectLabel,
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
        {
          id: "ctm-stats",
          type: "stats",
          stats: [
            { label: "Save model", value: "Auto", suffix: "" },
            { label: "Storage", value: "Browser", suffix: " local" },
            { label: "Default tiers", value: "5", suffix: "" },
            { label: "Status", value: "Live", suffix: "" },
          ],
        },
        {
          id: "ctm-steps",
          type: "process-steps",
          layout: "vertical",
          steps: [
            {
              title: "Import courses",
              description:
                "Load a JSON list of courses (code, name, credits, term, instructor, notes). Sample data ships with the tool for first-time use.",
            },
            {
              title: "Rank into tiers",
              description:
                "Drag courses from the pool into tiers. Reorder within a tier to express priority inside each band.",
            },
            {
              title: "Annotate and refine",
              description:
                "Edit notes per course, rename tiers, and adjust colors. Changes write to localStorage on every update.",
            },
            {
              title: "Resume later",
              description:
                "Reload the page or embed and your last session restores automatically. Clear All resets with confirmation.",
            },
          ],
        },
        {
          id: "ctm-quote",
          type: "quote",
          text: "The goal is not a perfect ranking—it is a visible map of trade-offs you can revise as plans change.",
          author: "Design intent",
        },
        {
          id: "ctm-cta",
          type: "cta",
          text: "Open in Tools Library",
          link: "/tools/course-tiermaker/003",
          subtext: "Full tool page with metadata and related tools",
        },
      ],
    };
  }

  // Placeholders 17–20 (reserved slots with full metadata stubs)
  if (id === 17) {
    return {
      id,
      slug: "project-17",
      idStr,
      projectLabel,
      type: "placeholder",
      title: "[PROJECT 17 — COMING SOON]",
      time: "TBD",
      skills: "[SKILL USED]",
      role: "Creative Technologist",
      description:
        "Reserved portfolio slot. Summary and process documentation will be added when this project is ready to publish.",
      image: null,
      link: null,
      githubLink: null,
    };
  }

  if (id === 18) {
    return {
      id,
      slug: "project-18",
      idStr,
      projectLabel,
      type: "placeholder",
      title: "[PROJECT 18 — COMING SOON]",
      time: "TBD",
      skills: "[SKILL USED]",
      role: "Developer",
      description:
        "Reserved portfolio slot. Summary and process documentation will be added when this project is ready to publish.",
      image: null,
      link: null,
      githubLink: null,
    };
  }

  if (id === 19) {
    return {
      id,
      slug: "project-19",
      idStr,
      projectLabel,
      type: "placeholder",
      title: "[PROJECT 19 — COMING SOON]",
      time: "TBD",
      skills: "[SKILL USED]",
      role: "Designer Developer",
      description:
        "Reserved portfolio slot. Summary and process documentation will be added when this project is ready to publish.",
      image: null,
      link: null,
      githubLink: null,
    };
  }

  if (id === 20) {
    return {
      id,
      slug: "project-20",
      idStr,
      projectLabel,
      type: "placeholder",
      title: "[PROJECT 20 — COMING SOON]",
      time: "TBD",
      skills: "[SKILL USED]",
      role: "Developer",
      description:
        "Reserved portfolio slot. Summary and process documentation will be added when this project is ready to publish.",
      image: null,
      link: null,
      githubLink: null,
    };
  }

  // Fallback return for any id that doesn't match
  return {
    id,
    slug: `project-${idStr.toLowerCase()}`,
    idStr,
    projectLabel,
    type: "placeholder",
    title: "[PROJECT NAME]",
    time: "[TIMEFRAME]",
    skills: "[SKILL USED]",
    role: "Developer",
    description:
      "This project data is currently encrypted or unavailable.",
    image: null,
    link: null,
    githubLink: null,
  };
});

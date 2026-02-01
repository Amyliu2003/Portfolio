import campusCravingTitle from "../assets/campusCraving_title.png";
import campusCravingBot from "../assets/campusCraving_bot.png";

import CDaysTitle from "../assets/100days_title.png";

import unicefGeosightTitle from "../assets/unicefGeosight_title.png";

import sameRoofTitle from "../assets/UTSM_title.jpg";

import lightningTitle from "../assets/lightning_title.png";

import OCCATTitle from "../assets/OCCAT_title.png";
import OCCATProfile from "../assets/OCCAT_profile.png";
import OCCATPost from "../assets/OCCAT_post.png";

import trafficCityTitle from "../assets/TrafficCity_title.png";
import trafficCityIdea1 from "../assets/TrafficCity_idea.png";
import trafficCityIdea2 from "../assets/TrafficCity_idea2.png";
import trafficCityMenu from "../assets/trafficCity_menu.png";
import trafficCityGame from "../assets/trafficCity_game.png";
import { data } from "react-router-dom";



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
  link: string | null;
  githubLink: string | null;
  contentBlocks?: ContentBlock[];
}

export const initialProjects: ProjectItem[] = Array.from({ length: 15 }, (_, i) => {
  const id = i + 1;
  const idStr = id < 10 ? `0${id}` : `${id}`;
  const projectLabel = `PROJECT ${idStr}`;

  // 1. Campus Cravings
  if (id === 2) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "Campus Cravings",
      time: "AUG 2025",
      skills: "JS • OpenAI • UI/UX",
      role: "Creative Technologist • Developer",
      description:
        "Designed a site showcasing NYU-area food options by embedding and customizing WordPress content via REST APIs. Built a dish randomizer in JavaScript and integrated an OpenAI-based chatbot with basic RAG logic. Applied UX principles from Figma mockups. Led to recruitment for NYU’s WordPress & Emerging Tech role.",
      image: campusCravingTitle,
      link: "https://wp.nyu.edu/tischschoolofthearts-campus_craving/",
      githubLink: "",
    };
  }

  // 2. 100 Days of OC's (?) Artifacts
  if (id === 5) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "100 Days of OC's (?) Artifacts",
      time: "WINTER 2025",
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
  if (id === 3) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "UNICEF GeoSight",
      time: "JUNE 2025",
      skills: "React • Mapping • OSS",
      role: "Frontend Developer • GIS Specialist",
      description:
        "Co-developed a working prototype for a dual-map swipe feature proposed in UNICEF GeoSight’s open-source repository. Built with React and MapLibre GL JS to support side-by-side comparison of geospatial data, and refined state management to enable responsive toggling and improved usability.",
      image: unicefGeosightTitle,
      link: "",
      githubLink: "",
    };
  }

  if (id === 4) {
    return {
      id,
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
  }

  // 6. Under the Same Roof
  if (id === 6) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "Under the Same Roof",
      time: "SPRING 2025",
      skills: "Three.js • AI/ML • Installation",
      role: "Creative Technologist • 3D Artist",
      description:
        "A mixed-media installation exploring how algorithmic language models reshape our understanding of home and meaning. Visitors input a word, which is processed through a Word2Vec embedding model to dynamically alter a physical dollhouse’s layout and atmosphere using Three.js, projection mapping, and screen-based media.",
      image: sameRoofTitle,
      link: null,
      githubLink: null
    };
  }

  if (id === 7) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "Lightning",
      time: "SPRING 2025",
      skills: "p5.js • motion graphics",
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
      idStr,
      projectLabel,
      type: "special",
      title: "Traffic City",
      time: "WINTER 2024",
      skills: "Accessibility • Game Dev",
      role: "Game Designer • Developer",
      description:
        "Designed and co-developed a browser-based two-button driving game prioritizing inclusive play for users with limited mobility. Built in MakeCode Arcade, the game allows control through two-directional inputs, enabling gameplay via alternative physical gestures. Implemented accessibility features including colorblind-safe palettes and dual-sensory feedback.",
      image: trafficCityTitle,
      link: "https://editor.p5js.org/sl9964/full/nGaf3eE2I",
      githubLink: "#github-09",
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
      idStr,
      projectLabel,
      type: "placeholder",
      title: "The Looking-through Glass House",
      time: "[TIMEFRAME]",
      skills: "[SKILL USED]",
      role: "Developer",
      description:
        "An interactive web-based narrative inspired by Through the Looking-Glass, combining a 2D questionnaire with a 3D navigable room. The project explores authorship, control, and identity by positioning the user as a “pawn” within a rule-driven system, using mirrors, narration, and constrained interaction to question agency within digital environments.",
      image: null,
      link: null,
      githubLink: null,
    };
  }

  // 12. OCCat
  if (id === 12) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "OCCat Social",
      time: "SPRING 2024",
      skills: "Node.js • Full Stack",
      role: "Full Stack Developer",
      description:
        "Developed a side-scroll social platform for Original Character (OC) creators with profile customization, media uploads, and community interactions. Built with Node.js, Express.js, bcrypt, and NeDB. Designed a playful, niche-oriented UI using EJS templates.",
      image: OCCATTitle,
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
  }

  // Default placeholder items
  return {
    id,
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

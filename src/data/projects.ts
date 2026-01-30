

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
  processSections?: ProcessSection[];
}

export const initialProjects: ProjectItem[] = Array.from({ length: 15 }, (_, i) => {
  const id = i + 1;
  const idStr = id < 10 ? `0${id}` : `${id}`;
  const projectLabel = `PROJECT ${idStr}`;

  // 1. Campus Cravings
  if (id === 1) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "Campus Cravings",
      skills: "JS • OpenAI • UI/UX",
      role: "Creative Technologist • Developer",
      description:
        "Designed a site showcasing NYU-area food options by embedding and customizing WordPress content via REST APIs. Built a dish randomizer in JavaScript and integrated an OpenAI-based chatbot with basic RAG logic. Applied UX principles from Figma mockups. Led to recruitment for NYU’s WordPress & Emerging Tech role.",
      image:'../assets/campusCraving_title.png',
      link: "#project-01",
      githubLink: "#github-01",
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
      skills: "React • Mapping • OSS",
      role: "Frontend Developer • GIS Specialist",
      description:
        "Co-developed a working prototype for a dual-map swipe feature proposed in UNICEF GeoSight’s open-source repository. Built with React and MapLibre GL JS to support side-by-side comparison of geospatial data, and refined state management to enable responsive toggling and improved usability.",
      image: "assets/unicefGeosight_title.png",
      link: "#project-03",
      githubLink: "#github-03",
    };
  }

  // 6. Under the Same Roof
  if (id === 6) {
    return {
      id,
      idStr,
      projectLabel,
      type: "special",
      title: "Same Roof",
      skills: "Three.js • AI/ML • Installation",
      role: "Creative Technologist • 3D Artist",
      description:
        "A mixed-media installation exploring how algorithmic language models reshape our understanding of home and meaning. Visitors input a word, which is processed through a Word2Vec embedding model to dynamically alter a physical dollhouse’s layout and atmosphere using Three.js, projection mapping, and screen-based media.",
      image:"assets/unicefGeosight_title.png",
      link: null,
      githubLink: null,
      processSections: [ 
        { 
          id: "p1",
          title: "The Concept: Balancing Constraints",
          content: "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course, so balancing multiple final projects becomes its own constraint. In this case, the two “weights” on my beam balance were _Intro to Digital Fabrication_ and _The Nature of Code_, and my creative process had to move carefully between them. From previous projects, I had learned that constraints define possibilities. This led me to propose a project that combined a physical dollhouse with a digital room. As someone deeply interested in interior design, I wanted to experiment with both physical and virtual spatial design within one system.",
          image: "https://images.unsplash.com/photo-1713471288083-d67cf693f448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJhbGFuY2UlMjBjb25zdHJhaW50fGVufDF8fHx8MTc2OTY0NDkwMXww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          id: "p2",
          title: "Development: The Digital Room",
          content: "The development of Under the Same Roof, like most combined final projects, involved many challenges. The digital room took the form of an office, which itself can be understood as a system composed of defined elements—desks, chairs, bookcases, cups, and computers. Each of these objects can be broken down into geometric primitives with adjustable parameters. For example, a cup can be modeled as a hollow cylinder with a torus handle; by adjusting scale, proportion, and style, it can become a mug, water bottle, or teacup. This approach allows for a large number of variations and combinations that can be stylized through color and material choices.",
          image: "https://images.unsplash.com/photo-1639299940869-4addd5e19727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHdpcmVmcmFtZSUyMGZ1cm5pdHVyZSUyMGRlc2lnbnxlbnwxfHx8fDE3Njk2NDQ5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          id: "p3",
          title: "System Logic: Word2Vec & Semantics",
          content: "Because this system was complex, it needed to be driven by a single variable that was both concise and descriptive. This led me to explore dictionaries and semantic models, eventually drawing inspiration from TensorFlow’s word vectors and Google’s Word2Vec model. To organize this complexity, I constructed a three-dimensional semantic space with three axes. By measuring how close an input word was to axis terms such as “individual” and “collectivism,” the semantic meaning of the word could be represented as a vector within this defined environment. Through algorithmic mapping, this vector then generated a collection of stylized furniture elements, effectively constructing an office designed by a “stranger roommate.”",
          image: "https://images.unsplash.com/photo-1767477665589-3e729f5909f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGNvZGUlMjBuZXR3b3JrfGVufDF8fHx8MTc2OTY0NDkwMXww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          id: "p4",
          title: "Fabrication: Projection Mapping",
          content: "At that stage, the remaining question was how to connect the digital system with a physical space. This was addressed through projection mapping, a technique already within my skill set. Because my physical fabrication skills were relatively limited, I chose pragmatic solutions: I 3D-printed furniture pieces, spray-painted them in solid colors, and built modular boxes from different acrylic materials that would stand out in a dark environment. I then projected the dynamic web-based visuals onto the dollhouse, with the downstairs living room serving as the user input interface.",
          image: "https://images.unsplash.com/photo-1761495760159-e2b461c23ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0aW9uJTIwbWFwcGluZyUyMGFydCUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3Njk2NDQ5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          id: "p5",
          title: "Exhibition: The Uninvited Roommate",
          content: "This “roommate” was never invited; it arrived as an assumption—an entity that had entered the home without consent, requiring coexistence under the same roof. When exhibited at the NYU IMA/ITP Spring 2025 Show, the dollhouse was illuminated by projections in a darkened space. Audience members were invited to sit down and consider what word they would want a word as a roommate. After entering a word, they waited as the upstairs office was refurnished in real time. The system displayed basic information about the word, including its semantic relationships to key values such as frugality or commercialization, revealing whether the outcome aligned with or contradicted audience expectations. Words with close semantic distances were also displayed as related “relatives” within the 3D space, offering visitors the option to change roommates.",
          image: "https://images.unsplash.com/photo-1761403794164-65897bc570a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYXJ0JTIwZ2FsbGVyeSUyMGV4aGliaXRpb258ZW58MXx8fHwxNzY5NjQ0OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
          id: "p6",
          title: "Reflection: Agency in the AI Era",
          content: "Much like these uninvited roommates, AI systems built on semantic databases are gradually embedding themselves into how we consume information—from social media to content-sharing platforms, and eventually into daily life and education. In this context, the only agency we retain may be the choice of whom—or what—we live with under the same roof.",
          image: "https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYWJzdHJhY3QlMjBmdXR1cmV8ZW58MXx8fHwxNzY5NjQ0OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        }
      ]
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
      skills: "Accessibility • Game Dev",
      role: "Game Designer • Developer",
      description:
        "Designed and co-developed a browser-based two-button driving game prioritizing inclusive play for users with limited mobility. Built in MakeCode Arcade, the game allows control through two-directional inputs, enabling gameplay via alternative physical gestures. Implemented accessibility features including colorblind-safe palettes and dual-sensory feedback.",
      image:
        "https://images.unsplash.com/photo-1759171052927-83f3b3a72b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMGFyY2FkZSUyMHJhY2luZyUyMGdhbWUlMjBzY3JlZW58ZW58MXx8fHwxNzY5NTQ1ODgxfDA&ixlib=rb-4.1.0&q=80&w=1200",
      link: "#project-09",
      githubLink: "#github-09",
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
      skills: "Node.js • Full Stack",
      role: "Full Stack Developer",
      description:
        "Developed a side-scroll social platform for Original Character (OC) creators with profile customization, media uploads, and community interactions. Built with Node.js, Express.js, bcrypt, and NeDB. Designed a playful, niche-oriented UI using EJS templates.",
      image:
        "https://images.unsplash.com/photo-1569154076682-4c0466623ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRvbGxob3VzZSUyMHNoYXJhY3RlciUyMHNrZXRjaCUyMGNyZWF0aXZlJTIwc29jaWFsJTIwbWVkaWElMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY5NTQ1ODgxfDA&ixlib=rb-4.1.0&q=80&w=1200",
      link: "#project-12",
      githubLink: "#github-12",
    };
  }

  // Default placeholder items
  return {
    id,
    idStr,
    projectLabel,
    type: "placeholder",
    title: "[PROJECT NAME]",
    skills: "[SKILL USED]",
    role: "Developer",
    description:
      "This project data is currently encrypted or unavailable.",
    image: null,
    link: null,
    githubLink: null,
  };
});

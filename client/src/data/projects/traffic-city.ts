import type { ProjectData } from "../types";
import trafficCityTitle from "../../assets/TrafficCity_title.png";
import trafficCityIdea1 from "../../assets/TrafficCity_idea.png";
import trafficCityIdea2 from "../../assets/TrafficCity_idea2.png";

export const project: ProjectData = {
  slug: "traffic-city",
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

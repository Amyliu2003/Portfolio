import type { ProjectData } from "../types";
import attractivePoliticsTitle from "../../assets/attractivePolitics_title.png";

export const project: ProjectData = {
  slug: "attractive-politics",
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

import type { ProjectData } from "../types";
import windowWeatherTitle from "../../assets/windowWeather_title.png";

export const project: ProjectData = {
  slug: "window-weather",
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

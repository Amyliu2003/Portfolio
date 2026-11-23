import type { ProjectData } from "../types";
import TemperatureCloudTitle from "../../assets/TemperatureCloud_title.JPG";

export const project: ProjectData = {
slug: "cloud-maker",
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

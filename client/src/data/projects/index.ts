import type { ProjectData, ProjectItem } from "../types";
import { ORDER } from "../order";
import { project as projectThisWebsite } from "./this-website";
import { project as projectCampusCravings } from "./campus-cravings";
import { project as projectBetweenBoundaries } from "./between-boundaries";
import { project as projectGenesis } from "./genesis";
import { project as project100DaysOcsArtifacts } from "./100-days-ocs-artifacts";
import { project as projectUnicefGeosight } from "./unicef-geosight";
import { project as projectUnderTheSameRoof } from "./under-the-same-roof";
import { project as projectLightning } from "./lightning";
import { project as projectTrafficCity } from "./traffic-city";
import { project as projectLookingThroughGlassHouse } from "./looking-through-glass-house";
import { project as projectWindowWeather } from "./window-weather";
import { project as projectOccatSocial } from "./occat-social";
import { project as projectCloudMaker } from "./cloud-maker";
import { project as projectAttractivePolitics } from "./attractive-politics";
import { project as projectFafuAlumniAnniversary } from "./fafu-alumni-anniversary";
import { project as projectCourseTiermaker } from "./course-tiermaker";
import { project as projectProject17 } from "./project-17";
import { project as projectProject18 } from "./project-18";
import { project as projectProject19 } from "./project-19";
import { project as projectProject20 } from "./project-20";

const ALL_PROJECTS: ProjectData[] = [
  projectThisWebsite,
  projectCampusCravings,
  projectBetweenBoundaries,
  projectGenesis,
  project100DaysOcsArtifacts,
  projectUnicefGeosight,
  projectUnderTheSameRoof,
  projectLightning,
  projectTrafficCity,
  projectLookingThroughGlassHouse,
  projectWindowWeather,
  projectOccatSocial,
  projectCloudMaker,
  projectAttractivePolitics,
  projectFafuAlumniAnniversary,
  projectCourseTiermaker,
  projectProject17,
  projectProject18,
  projectProject19,
  projectProject20,
];

export const PROJECTS_BY_SLUG: Record<string, ProjectData> = Object.fromEntries(
  ALL_PROJECTS.map((project) => [project.slug, project]),
);

export const initialProjects: ProjectItem[] = ORDER.map((slug, i) => {
  const data = PROJECTS_BY_SLUG[slug];
  if (!data) throw new Error(`ORDER lists unknown project slug "${slug}"`);
  const id = i + 1;
  const idStr = id < 10 ? `0${id}` : `${id}`;
  return { ...data, id, idStr, projectLabel: `PROJECT ${idStr}` };
});

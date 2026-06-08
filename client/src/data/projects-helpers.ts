import { initialProjects, type ProjectItem } from "./projects";

export function getRouteableProjects(
  items: ProjectItem[] = initialProjects,
): ProjectItem[] {
  return items.filter((item) => item.type === "special" && !!item.slug);
}

export function getProjectBySlug(
  slug: string,
  items: ProjectItem[] = initialProjects,
): ProjectItem | null {
  const normalized = slug.trim().toLowerCase();
  return (
    getRouteableProjects(items).find(
      (item) => String(item.slug).trim().toLowerCase() === normalized,
    ) ?? null
  );
}

export function getAdjacentProjectSlugs(
  slug: string,
  items: ProjectItem[] = initialProjects,
): { prev: string | null; next: string | null } {
  const routeable = getRouteableProjects(items);
  const index = routeable.findIndex(
    (item) => item.slug.trim().toLowerCase() === slug.trim().toLowerCase(),
  );
  if (index === -1) return { prev: null, next: null };

  const prev = routeable[(index - 1 + routeable.length) % routeable.length]?.slug ?? null;
  const next = routeable[(index + 1) % routeable.length]?.slug ?? null;
  return { prev, next };
}

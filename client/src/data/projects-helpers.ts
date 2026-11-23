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

/** Lowercased search words, split on whitespace; words shorter than 2 chars are ignored. */
export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length >= 2);
}

export function hasActiveFilter(searchTerm: string, activeTags: string[]): boolean {
  return tokenize(searchTerm).length > 0 || activeTags.length > 0;
}

/**
 * Shared Works search rule (Tray + Grid):
 * - text: any search word appears in title / skills / projectLabel / description
 * - tags: any active tag appears in skills
 * - both conditions must hold.
 */
export function matchesSearch(
  item: ProjectItem,
  searchTerm: string,
  activeTags: string[],
): boolean {
  const tokens = tokenize(searchTerm);
  const haystack = [item.title, item.skills, item.projectLabel, item.description]
    .join("\n")
    .toLowerCase();
  const matchesText =
    tokens.length === 0 || tokens.some((token) => haystack.includes(token));
  const matchesTags =
    activeTags.length === 0 || activeTags.some((tag) => item.skills.includes(tag));
  return matchesText && matchesTags;
}

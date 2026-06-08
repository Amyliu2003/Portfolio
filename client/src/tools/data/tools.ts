export type ToolStatus = "live" | "wip" | "prototype";
export type ToolType = "component" | "embed";

export type Tool = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  status: ToolStatus;
  year: number;
  featured?: boolean;
  type: ToolType;
  embedUrl?: string;
  githubUrl?: string;
};

export const tools: Tool[] = [
  {
    id: "001",
    slug: "prisense",
    name: "Prisense",
    description: "Pricing signal exploration tool embedded from standalone deployment.",
    tags: ["vibe-code", "AI", "interactive"],
    status: "live",
    year: 2026,
    featured: true,
    type: "embed",
    embedUrl: "https://prisense.vercel.app",
  },
  {
    id: "002",
    slug: "chess-pgn-converter",
    name: "Chess ↔ Narrative",
    description: "Converts PGN sequences into narrative-style move summaries.",
    tags: ["chess", "AI", "prototype"],
    status: "wip",
    year: 2026,
    type: "component",
  },
  {
    id: "003",
    slug: "course-tiermaker",
    name: "Course Tiermaker",
    description: "Drag-and-rank workflow to organize classes by impact and vibe.",
    tags: ["vibe-code", "interactive", "design"],
    status: "live",
    year: 2026,
    type: "component",
  },
  {
    id: "004",
    slug: "escape-room-chess",
    name: "Escape Room Chess Puzzle",
    description: "Puzzle-style chess challenge with narrative progression states.",
    tags: ["chess", "interactive", "design"],
    status: "prototype",
    year: 2026,
    type: "component",
  },
  {
    id: "005",
    slug: "productivity-enforcer",
    name: "Productivity Enforcer",
    description: "External productivity guardrail app embedded into the portfolio.",
    tags: ["vibe-code", "AI"],
    status: "wip",
    year: 2026,
    type: "embed",
    embedUrl: "https://example.com/productivity-enforcer",
  },
];

export const toolBySlugAndId = (slug: string, id: string) =>
  tools.find((tool) => tool.slug === slug && tool.id === id) ?? null;

export const featuredTool =
  tools.find((tool) => tool.featured) ?? tools[0] ?? null;

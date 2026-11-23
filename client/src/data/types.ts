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
  slug: string;
  idStr: string;
  time: string;
  projectLabel: string;
  type: "special" | "placeholder";
  /** Derived, not stored: true for the first FEATURED_COUNT works in ORDER (lit by default in the tray) */
  featured?: boolean;
  title: string;
  skills: string;
  role: string;
  description: string;
  customHtml?: string;
  image: string | null;
  embedUrl?: string | null;
  link: string | null;
  githubLink: string | null;
  contentBlocks?: ContentBlock[];
}

/** A project's own data; number, label and featured are derived from its position in ORDER. */
export type ProjectData = Omit<ProjectItem, "id" | "idStr" | "projectLabel" | "featured">;

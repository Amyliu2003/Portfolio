import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import TextareaAutosize from 'react-textarea-autosize';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { 
  ProjectItem, 
  ContentBlock, 
  SplitBlock, 
  FullWidthBlock, 
  GridBlock, 
  QuoteBlock, 
  VideoBlock, 
  CodeBlock,
  MasonryBlock,
  GalleryBlock,
  StatsBlock,
  ProcessStepBlock,
  CardGridBlock,
  ComparisonBlock,
  AccordionBlock,
  CTABlock,
  RichTextBlock,
  ImageBlock
} from "../data/projects";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onUpdate: (updatedProject: ProjectItem) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface ExtendedProjectItem extends ProjectItem {
  contentBlocks?: ContentBlock[];
}

const COLORS = {
  primary: "#181A4B",
  secondary: "#172FAB",
  accent: "#BA76FF",
  dim: "rgba(255, 255, 255, 0.2)",
};

const THEME = {
  fontTitle: "tk-din-condensed uppercase tracking-[-3px]",
  fontHeader: "din-normal uppercase tracking-normal font-bold",
  fontBody: "publicSans-text font-normal tracking-wide",
  fontDecorative: "yarding-text uppercase tracking-[1px]",
  fontMono: "font-mono uppercase tracking-widest",
};

// --- Block Renderers ---

const RichTextRenderer: React.FC<{ block: RichTextBlock }> = ({ block }) => (
    <div className={`w-full max-w-4xl mx-auto my-16 px-6 ${block.align === 'center' ? 'text-center' : 'text-left'}`}>
        <div 
            className={`prose prose-invert prose-lg max-w-none ${THEME.fontBody} prose-headings:${THEME.fontHeader} prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#BA76FF]`}
            dangerouslySetInnerHTML={{ __html: block.content }}
        />
    </div>
);

const SplitBlockRenderer: React.FC<{ block: SplitBlock }> = ({ block }) => (
  <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start my-24 ${block.reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="flex-1 w-full">
      <div className="w-full aspect-[4/3] relative overflow-hidden bg-white/5 group">
        <img 
            src={block.image} 
            alt={block.title || 'Project visual'} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
    </div>
    <div className="flex-1 w-full space-y-6">
      {block.title && (
        <h3 className={`text-3xl text-white ${THEME.fontHeader}`}>
          {block.title}
        </h3>
      )}
      <p className={`text-lg leading-relaxed text-[#d1d5dc] ${THEME.fontBody} whitespace-pre-wrap`}>
        {block.text}
      </p>
    </div>
  </div>
);

const ImageBlockRenderer: React.FC<{ block: ImageBlock | FullWidthBlock }> = ({ block }) => {
    const variant = 'variant' in block ? block.variant : 'full-width';
    
    let containerClass = "w-full my-24";
    let aspectClass = "aspect-[21/9]";

    if (variant === 'left' || variant === 'right') {
        containerClass = `w-full md:w-2/3 my-24 ${variant === 'right' ? 'ml-auto' : 'mr-auto'}`;
        aspectClass = "aspect-[16/9]";
    } else if (variant === 'center') {
        containerClass = "w-full md:w-3/4 mx-auto my-24";
        aspectClass = "aspect-[16/9]";
    }

    return (
        <div className={containerClass}>
            <div className={`w-full ${aspectClass} relative overflow-hidden bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)]`}>
                <img 
                    src={block.image} 
                    alt={block.caption || 'Project visual'} 
                    className="w-full h-full object-cover" 
                />
            </div>
            {block.caption && (
                <p className={`mt-4 text-xs opacity-50 text-center ${THEME.fontBody} uppercase tracking-[1.2px]`}>
                    {block.caption}
                </p>
            )}
        </div>
    );
};

const QuoteBlockRenderer: React.FC<{ block: QuoteBlock }> = ({ block }) => (
  <div className="w-full max-w-4xl mx-auto my-32 text-center px-6">
    <blockquote className={`text-3xl md:text-5xl italic leading-tight text-white/90 mb-8 ${THEME.fontHeader}`}>
      "{block.text}"
    </blockquote>
    {block.author && (
      <cite className={`not-italic text-sm text-[var(--accent)] ${THEME.fontBody} uppercase tracking-[1.2px]`}>
        — {block.author}
      </cite>
    )}
  </div>
);

const GridBlockRenderer: React.FC<{ block: GridBlock }> = ({ block }) => {
    const cols = block.columns || 2;
    const gridClass = cols === 4 ? 'md:grid-cols-4' : cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

    return (
        <div className={`grid grid-cols-1 ${gridClass} gap-4 my-24`}>
            {block.images.map((img, idx) => (
            <div key={idx} className="w-full aspect-square relative overflow-hidden bg-white/5 border border-[rgba(255,255,255,0.2)] group">
                <img 
                    src={img} 
                    alt={`Grid item ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
            </div>
            ))}
        </div>
    );
};

const MasonryBlockRenderer: React.FC<{ block: MasonryBlock }> = ({ block }) => (
    <div className="w-full my-24">
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter="1rem">
                {block.images.map((img, idx) => (
                    <div key={idx} className="bg-white/5 overflow-hidden border border-[rgba(255,255,255,0.2)]">
                        <img
                            src={img}
                            alt={`Masonry item ${idx}`}
                            className="w-full h-auto block"
                        />
                    </div>
                ))}
            </Masonry>
        </ResponsiveMasonry>
    </div>
);

const GalleryScrollRenderer: React.FC<{ block: GalleryBlock }> = ({ block }) => (
    <div className="w-full my-24 overflow-x-auto pb-6 snap-x snap-mandatory flex gap-4 scrollbar-thin scrollbar-thumb-[#BA76FF] scrollbar-track-[#111]">
        {block.images.map((img, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[80vw] md:w-[600px] aspect-video bg-white/5 border border-[rgba(255,255,255,0.2)] overflow-hidden relative">
                 <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                 <span className={`absolute bottom-4 right-4 text-[10px] bg-black/50 px-2 py-1 backdrop-blur-md border border-white/10 ${THEME.fontBody} uppercase`}>
                    {idx + 1} / {block.images.length}
                 </span>
            </div>
        ))}
    </div>
);

const StatsBlockRenderer: React.FC<{ block: StatsBlock }> = ({ block }) => (
    <div className="w-full my-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-[rgba(255,255,255,0.2)] py-12">
        {block.stats.map((stat, idx) => (
            <div key={idx} className="text-center">
                <div className={`text-4xl md:text-6xl text-[var(--accent)] mb-2 ${THEME.fontHeader}`}>
                    {stat.value}<span className="text-2xl text-white/50">{stat.suffix}</span>
                </div>
                <div className={`text-xs text-white/70 uppercase tracking-widest ${THEME.fontBody}`}>
                    {stat.label}
                </div>
            </div>
        ))}
    </div>
);

const ProcessStepRenderer: React.FC<{ block: ProcessStepBlock }> = ({ block }) => (
    <div className="w-full my-24">
        <div className={`grid ${block.layout === 'vertical' ? 'grid-cols-1 gap-12' : 'grid-cols-1 md:grid-cols-4 gap-4'}`}>
            {block.steps.map((step, idx) => (
                <div key={idx} className="relative group">
                    <div className={`text-6xl text-[var(--accent)] mb-4 transition-colors duration-500 ${THEME.fontTitle}`}>
                        0{idx + 1}
                    </div>
                    <h4 className={`text-xl text-white mb-2 ${THEME.fontHeader}`}>{step.title}</h4>
                    <p className={`text-sm text-gray-400 leading-relaxed ${THEME.fontBody}`}>{step.description}</p>
                    {block.layout === 'horizontal' && idx !== block.steps.length - 1 && (
                         <div className="hidden md:block absolute top-8 right-0 w-full h-[1px] bg-[#333] -z-10 translate-x-1/2" />
                    )}
                </div>
            ))}
        </div>
    </div>
);

const CardGridRenderer: React.FC<{ block: CardGridBlock }> = ({ block }) => (
    <div className="w-full my-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {block.cards.map((card, idx) => (
            <div key={idx} className="border border-[rgba(255,255,255,0.2)] bg-white/5 p-6 hover:border-[var(--accent)] transition-colors group">
                {card.image && (
                    <div className="w-full h-48 mb-6 overflow-hidden bg-black">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                )}
                <h4 className={`text-lg text-white mb-2 group-hover:text-[var(--accent)] ${THEME.fontHeader}`}>{card.title}</h4>
                <p className={`text-sm text-gray-400 ${THEME.fontBody}`}>{card.description}</p>
            </div>
        ))}
    </div>
);

const ComparisonRenderer: React.FC<{ block: ComparisonBlock }> = ({ block }) => (
    <div className="w-full my-24 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-8">
        <div className="relative group">
            <img src={block.imageLeft} alt="Before/Left" className="w-full h-auto border border-[#333]" />
            {block.labelLeft && (
                <span className={`absolute top-4 left-4 bg-black/70 px-3 py-1 text-xs border border-white/20 backdrop-blur-md ${THEME.fontBody} uppercase`}>
                    {block.labelLeft}
                </span>
            )}
        </div>
        <div className="relative group">
            <img src={block.imageRight} alt="After/Right" className="w-full h-auto border border-[#333]" />
            {block.labelRight && (
                <span className={`absolute top-4 left-4 bg-black/70 px-3 py-1 text-xs border border-white/20 backdrop-blur-md text-[var(--accent)] ${THEME.fontBody} uppercase`}>
                    {block.labelRight}
                </span>
            )}
        </div>
    </div>
);

const AccordionRenderer: React.FC<{ block: AccordionBlock }> = ({ block }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="w-full max-w-3xl mx-auto my-24 border-t border-[rgba(255,255,255,0.2)]">
            {block.items.map((item, idx) => (
                <div key={idx} className="border-b border-[rgba(255,255,255,0.2)]">
                    <button 
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between py-6 hover:bg-white/5 transition-colors text-left px-4"
                    >
                        <h4 className={`text-sm md:text-base ${THEME.fontHeader}`}>{item.title}</h4>
                        <span className={`transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-[var(--accent)]' : ''}`}>
                            ↓
                        </span>
                    </button>
                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-black/20"
                            >
                                <div className={`p-6 pt-0 text-gray-400 font-light leading-relaxed ${THEME.fontBody}`}>
                                    {item.content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

const CTARenderer: React.FC<{ block: CTABlock }> = ({ block }) => (
    <div className="w-full my-32 flex flex-col items-center text-center">
        <a 
            href={block.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-bold text-white transition-all duration-300 bg-transparent border-2 border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
        >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className={`relative text-xl uppercase tracking-widest ${THEME.fontHeader}`}>{block.text}</span>
        </a>
        {block.subtext && (
            <p className={`mt-6 text-xs text-white/40 ${THEME.fontBody} uppercase tracking-widest`}>
                {block.subtext}
            </p>
        )}
    </div>
);

const VideoBlockRenderer: React.FC<{ block: VideoBlock }> = ({ block }) => (
    <div className="w-full my-24">
        <div className="w-full aspect-video relative overflow-hidden border border-[#333] bg-black">
            {block.url.includes('youtube') || block.url.includes('vimeo') ? (
                <iframe 
                    src={block.url} 
                    className="w-full h-full" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    title={block.caption || 'Video Embed'}
                />
            ) : (
                <video 
                    src={block.url} 
                    className="w-full h-full object-cover" 
                    controls 
                    autoPlay={block.autoPlay} 
                    loop={block.autoPlay}
                    muted={block.autoPlay} 
                />
            )}
        </div>
        {block.caption && (
          <p className={`mt-4 text-xs opacity-50 text-center ${THEME.fontBody} uppercase tracking-widest`}>
            {block.caption}
          </p>
        )}
    </div>
);

const CodeBlockRenderer: React.FC<{ block: CodeBlock }> = ({ block }) => (
    <div className="w-full my-24 max-w-4xl mx-auto">
        <div className="border border-[#333] bg-[#0a0a0a] rounded-sm overflow-hidden font-mono text-sm relative">
             {block.filename && (
                 <div className="flex items-center justify-between px-4 py-2 border-b border-[#333] bg-white/5">
                     <span className="text-xs uppercase text-white/50">{block.filename}</span>
                     {block.language && <span className="text-[10px] uppercase text-[var(--accent)]">{block.language}</span>}
                 </div>
             )}
             <div className="p-6 overflow-x-auto">
                 <pre className="text-gray-300 leading-relaxed">
                     <code>{block.code}</code>
                 </pre>
             </div>
        </div>
    </div>
);

// --- Main Component ---

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  isAdmin,
  onUpdate,
  onPrev,
  onNext,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ExtendedProjectItem | null>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      setFormData({ ...project });
    }
    setIsEditing(false);
  }, [project]);

  const handleSave = () => {
    if (formData) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (project) {
      setFormData({ ...project });
    }
    setIsEditing(false);
  };

  const scrollToProcess = () => {
     if(processSectionRef.current) {
         processSectionRef.current.scrollIntoView({ behavior: 'smooth' });
     }
  };

  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen || !project || !formData) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
        }}
        className="fixed inset-0 z-[200] flex flex-col overflow-y-auto"
        style={{ background: "linear-gradient(#181a4b,#172fab)" }} 
      >
        {/* Global Font Load for Project Detail */}
        <div className="fixed top-6 right-6 z-50 flex gap-4 bg-gradient-to-b from-[#181a4b] to-[#172fab]"
        >
          {/* EDIT CONTROLS */}
          {isAdmin && (
            <>
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="p-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest bg-[#181A4B]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="p-4 border border-[#BA76FF] text-[#BA76FF] hover:bg-[#BA76FF] hover:text-black transition-colors uppercase font-mono text-xs tracking-widest bg-[#181A4B]"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-4 border border-[#BA76FF] text-[#BA76FF] hover:bg-[#BA76FF] hover:text-black transition-colors uppercase font-mono text-xs tracking-widest bg-[#181A4B]"
                >
                  Edit Project
                </button>
              )}
            </>
          )}

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="p-4 border group bg-[#181A4B] hover:bg-[var(--accent)] transition-colors duration-300"
            style={{ borderColor: COLORS.dim }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="text-white group-hover:text-black"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* --- MAIN CONTENT CONTAINER --- */}
        <div className="w-full max-w-7xl mx-auto p-6 md:p-12 mt-12 mb-20 relative">
          
          {/* SECTION 1: HEADER (Compact) */}
          <div className="flex flex-col items-start w-full mb-12">
              
              {/* TITLE ROW */}
              <div className=" flex flex-col md:flex-row items-end justify-between w-full border-b-0">
                 
                 {/* LEFT: LABEL & TITLE */}
                 <div className="flex flex-col">
                     <p className={`text-[#ba76ff] text-3xl tracking-[1.4px] leading-[20px] mb-1 ${THEME.fontBody}`}>
                        {project.projectLabel}
                     </p>
                     
                     {isEditing ? (
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className={`bg-white/10 border border-[#333] text-[var(--accent)] px-2 text-[72px] leading-none w-full ${THEME.fontTitle}`}
                        />
                      ) : (
                        <h1 className={`text-7xl text-[var(--accent)] leading-none tracking-[-3px] uppercase ${THEME.fontTitle}`}>
                            {project.title}
                        </h1>
                      )}
                 </div>

                 {/* RIGHT: METADATA */}
                 <div className="mt-6 md:mt-0 flex flex-col items-end opacity-60">
                     <p className={`text-[12px] text-white text-right tracking-[1.2px] uppercase leading-[16px] ${THEME.fontBody}`}>
                        Spring 2026
                     </p>
                     {isEditing ? (
                         <input
                           type="text"
                           value={formData.skills}
                           onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                           className={`bg-white/10 border border-[#333] text-white text-xs mt-1 w-48 ${THEME.fontBody}`}
                         />
                      ) : (
                         <p className={`text-[12px] text-white text-right tracking-[1.2px] uppercase leading-[16px] ${THEME.fontBody}`}>
                            {project.skills}
                         </p>
                      )}
                 </div>
              </div>
          </div>

          {/* SECTION 2: FULL SCREEN HERO IMAGE */}
          <div className="w-[70vw] h-[100vh] relative mb-24 bg-[rgba(255,255,255,0.05)] p-px"
               style={{marginBottom: "6rem"}}
          >
             <div className="absolute border border-[rgba(255,255,255,0.2)] inset-0 pointer-events-none z-10" />
             
             {isEditing && (
                <div className="absolute top-4 left-4 z-20 w-full max-w-md bg-black/80 p-4 border border-[#333] backdrop-blur-md">
                   <label className="block text-[10px] font-mono uppercase text-[#BA76FF] mb-2">Change Image</label>
                   <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#333] hover:border-[var(--accent)] cursor-pointer transition-colors mb-4 group/upload">
                      <div className="text-center">
                        <span className="block text-xs font-mono uppercase text-white/50 group-hover/upload:text-white">Click to Upload</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if(file) handleImageUpload(file, (base64) => setFormData({...formData, image: base64}));
                        }}
                      />
                   </label>
                </div>
             )}

            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-white/20 font-mono uppercase">
                  No Image Preview
               </div>
            )}
          </div>

          {/* SECTION 3: ABOUT PROJECT (Centered Slide) */}
          <div className="min-h-[100vh] flex flex-col justify-center w-full mb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* LEFT COLUMN (Span 8) */}
              <div className="md:col-span-8">
                <h3 className={`text-4xl font-bold uppercase mb-6 text-[var(--accent)] ${THEME.fontDecorative}`}>
                  About Project
                </h3>

                {isEditing ? (
                  <TextareaAutosize
                    minRows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`w-full bg-white/10 border border-[#333] text-white px-4 py-4 text-xl md:text-2xl leading-relaxed outline-none resize-none ${THEME.fontBody}`}
                  />
                ) : (
                  <>
                    <p className={`text-xl md:text-2xl leading-relaxed opacity-80 font-light whitespace-pre-line mb-8 selection:bg-[var(--accent)] selection:text-black ${THEME.fontBody}`}>
                      {project.description}
                    </p>
                    {/* KNOW MORE BUTTON - Only show if there is extra content */}
                    {formData.contentBlocks && formData.contentBlocks.length > 0 && (
                      <button
                        onClick={scrollToProcess}
                        className={`mb-8 inline-block text-[var(--accent)] text-sm uppercase tracking-widest hover:text-white transition-colors font-bold ${THEME.fontBody}`}
                      >
                        [ Know More ]
                      </button>
                    )}
                  </>
                )}

                {/* BUTTONS */}
                <div className="mt-8 mb-16">
                  <div className="flex flex-wrap gap-4">
                    {formData.link && (
                      <a
                        href={formData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block px-8 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 ${THEME.fontHeader}`}
                      >
                        Launch Live Demo
                      </a>
                    )}
                    {formData.githubLink && (
                      <a
                        href={formData.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block px-8 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 ${THEME.fontHeader}`}
                      >
                        View Code / Repo
                      </a>
                    )}
                  </div>
                </div>

                {/* CUSTOM HTML SUPPORT */}
                {project.customHtml && (
                  <div
                    className="mt-8 border border-[#333] p-4 bg-white/5"
                    dangerouslySetInnerHTML={{ __html: project.customHtml }}
                  />
                )}
              </div>

              {/* RIGHT COLUMN (Span 4) */}
              <div className="md:col-span-4 space-y-8">
                {/* ROLE */}
                <div className="border-l pl-6" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
                  <h4 className={`font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2 ${THEME.fontMono}`}>
                    Role
                  </h4>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-white/10 border border-[#333] text-white px-2 py-1"
                    />
                  ) : (
                    <div className="flex flex-col gap-1">
                      {formData.role.split("•").map((r, i) => (
                        <p key={i} className={`text-lg uppercase font-bold ${THEME.fontHeader}`}>{r.trim()}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* TECH STACK */}
                <div className="border-l pl-6" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
                  <h4 className={`font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-2 ${THEME.fontMono}`}>
                    Tech Stack
                  </h4>
                  <ul className={`space-y-1 text-sm opacity-70 ${THEME.fontMono}`}>
                    {formData.skills.split("•").map((skill, i) => (
                      <li key={i}>{skill.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: PROCESS & DEVELOPMENT */}
          {formData.contentBlocks && formData.contentBlocks.length > 0 && (
            <div ref={processSectionRef} className="w-full border-t border-[#333] pt-12 mb-12 relative">
                
                <h2 className={`text-[#ba76ff] text-[40px] leading-[32px] uppercase mb-12 ${THEME.fontDecorative}`}>
                    Process & Development
                </h2>

                {/* MODULAR CONTENT BLOCKS */}
                <div className="w-full">
                  {formData.contentBlocks.map((block: ContentBlock) => {
                    switch (block.type) {
                      case 'rich-text':
                          return <RichTextRenderer key={block.id} block={block} />;
                      case 'split':
                          return <SplitBlockRenderer key={block.id} block={block} />;
                      case 'full-width':
                      case 'image':
                          return <ImageBlockRenderer key={block.id} block={block} />;
                      case 'quote':
                          return <QuoteBlockRenderer key={block.id} block={block} />;
                      case 'grid':
                          return <GridBlockRenderer key={block.id} block={block} />;
                      case 'masonry':
                          return <MasonryBlockRenderer key={block.id} block={block} />;
                      case 'gallery-scroll':
                          return <GalleryScrollRenderer key={block.id} block={block} />;
                      case 'stats':
                          return <StatsBlockRenderer key={block.id} block={block} />;
                      case 'process-steps':
                          return <ProcessStepRenderer key={block.id} block={block} />;
                      case 'card-grid':
                          return <CardGridRenderer key={block.id} block={block} />;
                      case 'comparison':
                          return <ComparisonRenderer key={block.id} block={block} />;
                      case 'accordion':
                          return <AccordionRenderer key={block.id} block={block} />;
                      case 'cta':
                          return <CTARenderer key={block.id} block={block} />;
                      case 'video':
                         return <VideoBlockRenderer key={block.id} block={block} />;
                      case 'code':
                         return <CodeBlockRenderer key={block.id} block={block} />;
                      default:
                        return null;
                    }
                  })}
                </div>
            </div>
          )}
          
          {/* Footer of modal (Yarndings Divider) */}
          <div className="w-full flex items-center justify-center mt-12 mb-12 opacity-60">
               <div className={`text-[20px] text-white tracking-[1px] ${THEME.fontDecorative}`}>
                  This is the end of the project. Thank you for viewing!
              </div>
          </div>

          {/* NAVIGATION FOOTER */}
          <div className="w-full flex items-center justify-between mt-12 mb-24 pt-12 border-t border-[rgba(255,255,255,0.1)]">
              <button 
                  onClick={onPrev}
                  className={`group flex items-center gap-4 text-white hover:text-[var(--accent)] transition-colors ${THEME.fontHeader}`}
              >
                  <span className="text-2xl transition-transform group-hover:-translate-x-2">←</span>
                  <span className="uppercase tracking-widest text-sm md:text-base">Previous Project</span>
              </button>

              <button 
                  onClick={onNext}
                  className={`group flex items-center gap-4 text-white hover:text-[var(--accent)] transition-colors ${THEME.fontHeader}`}
              >
                  <span className="uppercase tracking-widest text-sm md:text-base">Next Project</span>
                  <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
              </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

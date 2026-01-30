import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SlideData {
  id: number;
  title: string;
  description: string;
  actionText: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "AMY",
    description: "Constructing digital experiences through experimental technology and curated design. Exploring the intersection of data structures, pixel perfection, and user interaction.",
    actionText: "Execute_Init"
  },
  {
    id: 2,
    title: "ABOUT",
    description: "A creative technologist based in NYU IMA, bridging the gap between artistic vision and technical implementation. Focusing on interactive web experiences, generative art, and system aesthetics.",
    actionText: "Read_Bio"
  },
  {
    id: 3,
    title: "STACK",
    description: "Leveraging modern frameworks including React, TypeScript, Tailwind CSS, and WebGL to build performant, scalable, and visually immersive applications for the post-digital age.",
    actionText: "View_Stack"
  },
  {
    id: 4,
    title: "CONTACT",
    description: "Open for collaborations, commissions, and conversations about the future of the web. Initiating communication protocols is encouraged for all prospective inquiries.",
    actionText: "Send_Signal"
  },
  {
    id: 5,
    title: "MISC",
    description: "Archiving experimental prototypes, unfinished sketches, and digital artifacts. This system is a living repository of ongoing exploration and discovery.",
    actionText: "Access_Log"
  }
];

export const LandingPage: React.FC<{ onScrollDown: () => void }> = ({ onScrollDown }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleJumpTo = (index: number) => {
    setCurrentSlideIndex(index);
  }

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div 
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center text-white"
      style={{
        background: 'linear-gradient(180deg, rgba(186, 117, 255, 0.30) 0%, rgba(186, 117, 255, 0) 23%), linear-gradient(180deg, #D5DCD9 0%, #83C1E6 16%, #1D5DE5 41%, #172FAB 56%, #181A4B 82%)'
      }}
    >
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none"></div>

      {/* TOP LEFT DATA BLOCK */}
      <div className="absolute top-8 left-8 z-10 flex flex-col items-start gap-1">
        <div className="flex flex-col items-start text-[#1A35B2]">
          <p className="yarding-text text-xs leading-[15px] tracking-[1.2px]">SYS.BOOT_SEQUENCE_INIT</p>
          <p className="yarding-text text-xs leading-[15px] tracking-[1.2px]">LOADING_MODULES: [CORE, UI, GFX]</p>
          <p className="yarding-text text-xs leading-[15px] tracking-[1.2px]">STATUS: OPTIMAL</p>
        </div>
        <div className="mt-2 w-16 h-1 bg-[#1A35B2]"></div>
      </div>

      {/* BOTTOM RIGHT DATA BLOCK */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-end gap-1 text-right hidden md:flex">
        <div className="flex flex-col items-end text-white/70">
          <p className="font-['Alegreya_Sans'] text-xs leading-[15px] tracking-[1.2px]">COORD: 40.6935° N, -73.9854° W</p>
          <p className="font-['Alegreya_Sans'] text-xs leading-[15px] tracking-[1.2px]">RENDER_ENGINE: REACT.V18</p>
          <p className="font-['Alegreya_Sans'] text-xs leading-[15px] tracking-[1.2px]">SESSION_ID: GOLDEN RECORD</p>
        </div>
        <div className="mt-2 w-16 h-1 bg-white"></div>
      </div>

      {/* CASCADING STACK CONTAINER */}
      <div className="relative z-20 w-[90%] max-w-[788px] h-[500px] flex items-center justify-center">
        <AnimatePresence>
          {SLIDES.map((slide, index) => {
            // Only show slides up to the current index (plus maybe one if animating out? No, simple stack)
            // Strategy: Render ALL slides, but control visibility/z-index.
            // Requirement: "stack slideshow one by one as they are open windows"
            // This implies we KEEP the old ones visible behind.
            
            // Render condition: render if index <= currentSlideIndex
            if (index > currentSlideIndex) return null;

            // Offset calculation
            // Let's make them cascade slightly down-right
            const offset = index * 20; 
            const isTop = index === currentSlideIndex;

            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.9, y: 50, x: -50 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: offset - (currentSlideIndex * 10), // Adjust to keep centered roughly
                    x: offset - (currentSlideIndex * 10),
                    zIndex: index 
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-full bg-white/50 backdrop-blur-md border-l border-r border-[#BA76FF]/30 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                style={{ 
                    // Use inline style for stacking context if needed, but motion handles transform
                    maxWidth: '788px',
                    height: '500px' // Fixed height for consistent stacking
                }}
              >
                {/* WINDOW HEADER */}
                <div className="w-full h-12 border-b border-[#BA76FF]/30 flex items-center justify-between px-6 bg-white/10 shrink-0 relative z-30 select-none">
                    <span className="font-['Special_Elite'] text-[#BA76FF] text-[10px] tracking-widest">
                        FIG. {String(slide.id).padStart(2, '0')}
                    </span>
                    
                    {/* Navigation Dots (Only interactive on top slide? Or global? Let's make top slide specific) */}
                    <div className="flex gap-2">
                        {SLIDES.map((s, i) => (
                        <div
                            key={s.id}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            i === index ? "bg-[#BA76FF]" : "bg-[#333]/30"
                            }`}
                        />
                        ))}
                    </div>

                    <span className="font-['Special_Elite'] text-[#BA76FF] text-[10px] tracking-widest">
                        INDEX_{String(slide.id).padStart(3, '0')}
                    </span>
                </div>

                {/* WINDOW CONTENT */}
                <div className="flex-1 flex flex-col items-center p-8 md:p-12 gap-8 w-full h-full justify-center relative">
                    {/* Navigation Arrows (Only on TOP slide) */}
                    {isTop && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 p-2 text-[#BA76FF]/50 hover:text-[#BA76FF] hover:bg-[#BA76FF]/10 rounded-full transition-all duration-200 group/nav"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" className="transform group-hover/nav:-translate-x-1 transition-transform">
                                <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 p-2 text-[#BA76FF]/50 hover:text-[#BA76FF] hover:bg-[#BA76FF]/10 rounded-full transition-all duration-200 group/nav"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" className="transform group-hover/nav:translate-x-1 transition-transform">
                                <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </>
                    )}

                    <motion.h1 
                        className="font-['Caesar_Dressing'] text-[#BA76FF] text-7xl md:text-9xl text-center leading-none drop-shadow-lg break-words w-full select-none"
                    >
                        {slide.title}
                    </motion.h1>

                    <div className="relative max-w-[512px] w-full">
                        <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-[#BA76FF]"></div>
                        <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-[#BA76FF]"></div>

                        <p className="font-['Alegreya_Sans'] text-black text-sm uppercase tracking-[0.35px] leading-[22px] text-justify select-none">
                        {slide.description}
                        </p>
                    </div>

                    <div className="pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onScrollDown}
                            className={`group bg-[#BA76FF] hover:bg-[#a356ff] text-white overflow-hidden relative flex items-center shadow-lg ${!isTop ? 'pointer-events-none opacity-50' : ''}`}
                            style={{ width: '195px', height: '56px' }}
                        >
                            <div className="absolute inset-0 border border-[#BA76FF] group-hover:bg-[#BA76FF] transition-colors"></div>
                            <div className="relative z-10 w-full flex items-center justify-center gap-3 px-4">
                                <span className="font-['Special_Elite'] text-xs tracking-[1.2px] uppercase">
                                {slide.actionText}
                                </span>
                                <span className="font-['Special_Elite'] text-xs group-hover:translate-x-1 transition-transform">{`>>`}</span>
                            </div>
                        </motion.button>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

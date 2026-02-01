import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import meAnime from "../assets/me_anime.png";
import meGame from "../assets/me_games.png";

interface TimelineItemData {
  id: number;
  image: string;
  text: string;
  alignment: 'left' | 'right';
  milestone?: string;
}

const timelineData: TimelineItemData[] = [
  {
    id: 1,
    image: meAnime,
    text: "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: 'right', // Image on right
    milestone: "INITIATION"
  },
  {
    id: 2,
    image: meAnime,
    text: "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: 'left', // Image on left
    milestone: "DEVELOPMENT"
  },
  {
    id: 3,
    image: meGame,
    text: "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: 'right',
    milestone: "DEPLOYMENT"
  },
  {
    id: 4,
    image: meAnime,
    text: "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: 'left',
    milestone: "OPTIMIZATION"
  },
];

const TimelineItem = ({ data, index }: { data: TimelineItemData; index: number }) => {
  const isRight = data.alignment === 'right';
  
  return (
    <div className={`flex w-full items-center justify-between mb-32 relative ${isRight ? 'flex-row' : 'flex-row-reverse'}`}>
      
      {/* Text Section */}
      <motion.div 
        initial={{ opacity: 0, x: isRight ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`w-[42%] flex flex-col ${isRight ? 'items-end text-right' : 'items-start text-left'}`}
      >
        <div className="mb-4 flex items-center gap-2">
            {!isRight && <div className="w-2 h-2 bg-[#BA76FF] rounded-full animate-pulse" />}
            <span className="text-[#BA76FF] font-mono text-sm tracking-[0.2em]">{data.milestone}</span>
            {isRight && <div className="w-2 h-2 bg-[#BA76FF] rounded-full animate-pulse" />}
        </div>
        <p className="font-['Public_Sans'] font-medium text-[#d1d5dc] text-2xl leading-tight">
          {data.text}
        </p>
      </motion.div>

      {/* Center Marker */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="w-4 h-4 bg-[#181A4B] border-2 border-[#BA76FF] rounded-full shadow-[0_0_15px_#BA76FF]" 
        />
      </div>

      {/* Image Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-[42%] flex ${isRight ? 'justify-start' : 'justify-end'}`}
      >
        <div className="relative group cursor-pointer">
            {/* Image Container with Sci-Fi border */}
            <div className="relative overflow-hidden border border-[#BA76FF]/30 bg-[#181A4B]/80 p-2 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                    <img 
                        src={data.image} 
                        alt={data.milestone} 
                        className="w-full max-w-[500px] h-auto object-contain mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105" 
                    />
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#BA76FF]/10 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />
                </div>
            </div>
            
            {/* Decorative Corners */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#BA76FF] transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-[#BA76FF]/50" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#BA76FF] transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-[#BA76FF]/50" />
            
            {/* Tech details */}
            <div className="absolute bottom-4 right-4 text-[10px] text-[#BA76FF] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                IMG_ID: {data.id.toString().padStart(4, '0')}
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[1200px] mx-auto py-100 px-4">
      {/* Central Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#BA76FF]/20 h-full">
        <motion.div 
            style={{ height }}
            className="w-full bg-gradient-to-b from-[#BA76FF] via-[#BA76FF] to-transparent shadow-[0_0_15px_#BA76FF]"
        />
      </div>

      <div className="relative z-10">
        {timelineData.map((item, index) => (
            <TimelineItem key={item.id} data={item} index={index} />
        ))}
      </div>
    </div>
  );
};

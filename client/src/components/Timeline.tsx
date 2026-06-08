import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import meAnime from "../assets/me_anime.png";
import meGame from "../assets/me_games.png";

interface TimelineItemData {
  id: number;
  image: string;
  text: string;
  alignment: "left" | "right";
  milestone: string;
}

const timelineData: TimelineItemData[] = [
  {
    id: 1,
    image: meAnime,
    text:
      "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: "right",
    milestone: "INITIATION",
  },
  {
    id: 2,
    image: meAnime,
    text:
      "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: "left",
    milestone: "DEVELOPMENT",
  },
  {
    id: 3,
    image: meGame,
    text:
      "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: "right",
    milestone: "DEPLOYMENT",
  },
  {
    id: 4,
    image: meAnime,
    text:
      "During my time at NYU, I often attempted to merge project ideas across two very different classes. Professors are generally aware that students tend to devote all of their time and effort to a single course.",
    alignment: "left",
    milestone: "OPTIMIZATION",
  },
];

const TimelineItem = ({ data }: { data: TimelineItemData }) => {
  const isRight = data.alignment === "right";

  return (
    <div
      className={`relative w-full flex items-center ${
        isRight ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full lg:w-[44%] flex flex-col ${
          isRight ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          {!isRight && (
            <span className="w-2 h-2 bg-[#BA76FF] rounded-full animate-pulse" />
          )}
          <span className="text-[#BA76FF] font-mono text-xs tracking-[0.3em]">
            {data.milestone}
          </span>
          {isRight && (
            <span className="w-2 h-2 bg-[#BA76FF] rounded-full animate-pulse" />
          )}
        </div>

        <p className="publicSans-text font-medium text-[#d1d5dc] text-xl leading-snug max-w-[520px]">
          {data.text}
        </p>
      </motion.div>

      {/* CENTER NODE */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="w-4 h-4 rounded-full bg-[#181A4B] border-2 border-[#BA76FF] shadow-[0_0_12px_#BA76FF]"
        />
      </div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full lg:w-[44%] flex ${
          isRight ? "justify-start" : "justify-end"
        }`}
      >
        <div className="relative group">
          <div className="relative overflow-hidden border border-[#BA76FF]/30 bg-[#181A4B]/80 p-2 backdrop-blur-sm">
            <img
              src={data.image}
              alt={data.milestone}
              className="max-w-[500px] w-full object-contain mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
            />
          </div>

          {/* corners */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#BA76FF]" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#BA76FF]" />

          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#BA76FF] opacity-0 group-hover:opacity-100 transition-opacity">
            IMG_ID: {String(data.id).padStart(4, "0")}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full max-w-7xl my-auto mx-auto my-12 px-4 md:px-8 lg:px-12 flex flex-col gap-32 py-20"
      style={{marginBottom: "20vh", marginTop:"20vh"}}
    >
      {/* CENTRAL LINE */}
      <div className="absolute top-[20vh] bottom-[20vh] left-1/2 -translate-x-1/2 w-[2px]">
        <div className="absolute inset-0 bg-[#BA76FF]/20" />
        <motion.div
          style={{ height: lineProgress }}
          className="absolute top-0 w-full bg-gradient-to-b from-[#BA76FF] to-transparent shadow-[0_0_16px_#BA76FF]"
        />
      </div>

      {/* ITEMS */}
      <div className="relative z-10 flex flex-col gap-[20vh]">
        {timelineData.map((item) => (
          <TimelineItem key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};
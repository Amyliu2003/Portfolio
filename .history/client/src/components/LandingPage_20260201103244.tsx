import React from "react";
import svgPaths from "../imports/svg-4yjotkk3wi";
import { Timeline } from "./Timeline";
import { Iceberg } from "./Iceberg";

export const LandingPage: React.FC<{
  onScrollDown?: () => void;
}> = ({ onScrollDown }) => {
  return (
    <div className="w-full relative min-h-screen bg-transparent overflow-hidden flex flex-col items-center">
      {/* ==================== FIXED HEADER / HERO SECTION ==================== */}
      <div className="relative w-full h-screen min-h-[800px] max-h-[1080px] shrink-0 flex items-center justify-center overflow-hidden">
        {/* Top Right "Works" Link */}
        <div 
            onClick={onScrollDown}
            className="absolute top-8 right-8 sm:top-12 sm:right-12 z-50 cursor-pointer group"
        >
            <div className="text-white text-xs sm:text-sm publicSans-text uppercase tracking-[2px] opacity-70 group-hover:opacity-100 group-hover:text-[#BA76FF] transition-all duration-300">
                [ WORKS ]
            </div>
        </div>

        {/* Top Left Data Block */}
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-20">
          <div className=" inline-flex flex-col justify-start items-start">
            <div className="self-stretch text-[#1A35B2] text-[12px] yarding-text font-normal leading-[15px] tracking-[1.20px] break-words">
              SYS.BOOT_SEQUENCE_INIT
            </div>
            <div className="self-stretch text-[#1A35B2] text-[12px] yarding-text font-normal leading-[15px] tracking-[1.20px] break-words">
              LOADING_MODULES: [CORE, UI, GFX]
            </div>
            <div className="self-stretch text-[#1A35B2] text-[12px] yarding-text font-normal leading-[15px] tracking-[1.20px] break-words">
              STATUS: OPTIMAL
            </div>
          </div>
          <div className="mt-4">
            <svg
              width="64"
              height="4"
              viewBox="0 0 64 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="4" fill="#1A35B2" />
            </svg>
          </div>
        </div>

        {/* Bottom Right Data Block */}
        <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 flex flex-col items-end gap-2">
          <div className="flex flex-col justify-start items-end">
            <div className="self-stretch text-right text-white/70 text-[12px] publicSans-text font-normal leading-[15px] tracking-[1.20px] break-words">
              COORD: 40.6935° N, -73.9854° W
            </div>
            <div className="self-stretch text-right text-white/70 text-[12px] publicSans-text font-normal leading-[15px] tracking-[1.20px] break-words">
              RENDER_ENGINE: REACT.V18
            </div>
            <div className="self-stretch text-right text-white/70 text-[12px] publicSans-text font-normal leading-[15px] tracking-[1.20px] break-words">
              SESSION_ID: GOLDEN RECORD
            </div>
          </div>
          <div>
            <svg
              width="64"
              height="4"
              viewBox="0 0 64 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="64" height="4" fill="white" />
            </svg>
          </div>
        </div>

        {/* Iceberg */}
        

      {/* ==================== SCROLLABLE TIMELINE ==================== */}
      <div className="w-full flex flex-col items-center py-100 relative z-10">
        <Timeline />
      </div>

      {/* ==================== FOOTER ==================== */}
      <div className="flex flex-col gap-[40px] items-center relative shrink-0 w-[1124px] max-w-full px-4 mb-32">
        <p className="capitalize font-['DIN:Medium',sans-serif] leading-[1.2] min-w-full not-italic relative shrink-0 text-[#d1d5dc] text-[48px] text-center w-[min-content] whitespace-pre-wrap">
          During my time at NYU, I often attempted to merge
          project ideas across two very different classes.
        </p>

        {/* Social Icons */}
        <div className="flex flex-col items-center justify-center py-[12px] relative shrink-0 w-[577px]">
          <div className="flex gap-[16px] items-center relative shrink-0">
            {/* X Logo */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[24px] relative shrink-0 w-[23.98px] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 23.98 24"
              >
                <path d={svgPaths.p16d01100} fill="#BA76FF" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 size-[24px] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
              >
                <g clipPath="url(#clip_insta)">
                  <path d={svgPaths.p3c382d72} fill="#BA76FF" />
                </g>
                <defs>
                  <clipPath id="clip_insta">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 size-[24px] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
              >
                <g clipPath="url(#clip_yt)">
                  <path d={svgPaths.p13f17d00} fill="#BA76FF" />
                </g>
                <defs>
                  <clipPath id="clip_yt">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 size-[24px] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
              >
                <g clipPath="url(#clip_li)">
                  <path d={svgPaths.p167f5280} fill="#BA76FF" />
                </g>
                <defs>
                  <clipPath id="clip_li">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

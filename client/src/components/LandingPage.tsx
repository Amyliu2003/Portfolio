import React from "react";
import { Timeline } from "./Timeline";
import { Iceberg } from "./Iceberg";

const SOCIAL_ICON_PATHS = {
  x: "M14.2737 10.1635L23.2023 0H21.0872L13.3313 8.82305L7.14125 0H0L9.3626 13.3433L0 24H2.11504L10.3002 14.6806L16.8388 24H23.98M2.8784 1.5619H6.12769L21.0856 22.5148H17.8355",
  instagram:
    "M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z",
  youtube:
    "M19.615 3.184C16.011 2.938 7.984 2.939 4.385 3.184C0.488 3.45 0.029 5.804 0 12C0.029 18.185 0.484 20.549 4.385 20.816C7.985 21.061 16.011 21.062 19.615 20.816C23.512 20.55 23.971 18.196 24 12C23.971 5.815 23.516 3.451 19.615 3.184ZM9 16V8L17 11.993L9 16Z",
  linkedin:
    "M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z",
} as const;

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
            {/* <div className="text-white text-xs sm:text-sm font-mono uppercase tracking-[2px] opacity-70 group-hover:opacity-100 group-hover:text-[#BA76FF] transition-all duration-300">
                [ WORKS ]
            </div> */}
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
            <div className="self-stretch text-right text-white/70 text-[12px] font-mono font-normal leading-[15px] tracking-[1.20px] break-words">
              COORD: 40.6935° N, -73.9854° W
            </div>
            <div className="self-stretch text-right text-white/70 text-[12px] font-mono font-normal leading-[15px] tracking-[1.20px] break-words">
              RENDER_ENGINE: REACT.V18
            </div>
            <div className="self-stretch text-right text-white/70 text-[12px] font-mono font-normal leading-[15px] tracking-[1.20px] break-words">
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
        <Iceberg />
      </div>


    {/* ==================== SCROLLABLE TIMELINE SECTION ==================== */}
    {/* <section className=" relative w-full flex justify-center z-10 pt-[20vh] pb-[24vh] px-4 ">
      <div className=" w-full max-w-[1200px] flex justify-center ">
        <Timeline />
      </div>
    </section> */}

      {/* ==================== FOOTER ==================== */}
      <div className="flex flex-col gap-[40px] items-center relative shrink-0 w-[1124px] max-w-full px-4 mb-32">
        {/* <p className="capitalize font-['DIN:Medium',sans-serif] leading-[1.2] min-w-full not-italic relative shrink-0 text-[#d1d5dc] text-[48px] text-center w-[min-content] whitespace-pre-wrap">
          During my time at NYU, I often attempted to merge
          project ideas across two very different classes.
        </p> */}

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
                <path d={SOCIAL_ICON_PATHS.x} fill="#BA76FF" />
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
                  <path d={SOCIAL_ICON_PATHS.instagram} fill="#BA76FF" />
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
                  <path d={SOCIAL_ICON_PATHS.youtube} fill="#BA76FF" />
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
                  <path d={SOCIAL_ICON_PATHS.linkedin} fill="#BA76FF" />
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

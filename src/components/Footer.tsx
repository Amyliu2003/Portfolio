import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="w-full relative z-50 shrink-0">
      <div className="w-full h-[52px] bg-gradient-to-b from-[#1E1E1E]/50 to-transparent flex items-center justify-between px-8 border-b border-white/10">
         
         {/* Left Status */}
         <div className="flex items-center gap-4">
            <div className="relative w-7 h-7 flex items-center justify-center">
               <div className="absolute inset-0 bg-white/20 rounded-full blur-[5px]"></div>
               <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="relative z-10">
                  <path d="M10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14C18 16.2091 16.2091 18 14 18C11.7909 18 10 16.2091 10 14Z" fill="white"/>
               </svg>
            </div>
            
            <div className="flex items-center text-[16px] uppercase tracking-[3px] text-white marquee-container"> 
               <div className="marquee-content">
                   <span data-tooltip="THE END IS NEVER " className="yarding-text mr-1">THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER  </span>
               </div>
            </div>
         </div>

         {/* Right Spacer */}
         <div className="w-1/4"></div>
      </div>
    </div>
  );
};

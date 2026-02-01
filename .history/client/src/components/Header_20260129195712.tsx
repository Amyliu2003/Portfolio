import React from "react";
import { COLORS } from "../utils/theme";

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
}) => {
  return (
    <header className="flex-shrink-0 w-full px-8 py-8 md:py-10 z-10 flex flex-col md:flex-row justify-between items-end border-b border-white/20">
      {/* LEFT: TITLE BLOCK */}
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-baseline gap-2">
            <h1 className="text-white text-5xl md:text-7xl font-['Underdog'] uppercase tracking-[1.8px] leading-none">
                Amy
            </h1>
            <h1 className="text-[#BA76FF] text-5xl md:text-7xl font-['Warnes'] uppercase tracking-[1.8px] leading-none">
                LiuSiyan
            </h1>
        </div>
        <div className="flex items-center gap-1 text-white/80 font-['Alegreya_Sans'] italic uppercase tracking-[1.4px] text-sm">
            <span className="yarding-text">siera@2149</span>
            <span className="font-normal not-italic"> | Creative Technologist | NYU IMA</span>
        </div>
      </div>

      {/* RIGHT: META BLOCK */}
      <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
         {/* Login Link */}
         <button 
            onClick={isLoggedIn ? onLogoutClick : onLoginClick}
            className="font-['Yarding'] text-white text-xs uppercase tracking-[1.2px] hover:text-[#BA76FF] transition-colors"
         >
             {isLoggedIn ? "[Logout]" : "[Login]"}
         </button>

         {/* Work Label */}
         <div className="text-right text-white text-3xl md:text-4xl font-['Tinos'] uppercase tracking-[0.9px] leading-none">
             Work / 22-26
         </div>

         {/* Squares */}
         <div className="flex gap-2 mt-1">
             <div className="w-3 h-3 border border-white"></div>
             <div className="w-3 h-3 bg-[#BA76FF]"></div>
             <div className="w-3 h-3 border border-white"></div>
         </div>
      </div>
    </header>
  );
};

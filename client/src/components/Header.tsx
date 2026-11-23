import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

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
    <header className="flex-shrink-0 w-full px-8 py-8 sm:py-10 z-10 flex flex-col md:flex-row justify-between items-end border-b border-white/20">
      {/* LEFT: TITLE BLOCK */}
      <div className="flex flex-col items-start gap-0">
        <Link to="/works" className="block max-w-[min(468px,70vw)] leading-none hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        <div className="flex items-center gap-0 text-white/80 publicSans-text italic uppercase tracking-[1.4px] text-xs sm:text-sm leading-none">
            <span className="yarding-text hidden sm:block ">siera@2149 |</span>
            <span className="font-normal not-italic"> Creative Technologist | Master of Information student, University of Toronto</span>
        </div>
      </div>

      {/* RIGHT: META BLOCK */}
      <div className="flex flex-col items-start sm:items-end gap-0 mt-4 md:mt-0">
         <Link
            to="/tools"
            className="font-mono text-white text-xs uppercase tracking-[1.2px] hover:text-[#BA76FF] transition-colors"
         >
            [Tools]
         </Link>

         {/* Login Link */}
         <button 
            onClick={isLoggedIn ? onLogoutClick : onLoginClick}
            className="font-['Yarding'] text-white text-xs uppercase tracking-[1.2px] hover:text-[#BA76FF] transition-colors"
         >
             {isLoggedIn ? "[Logout]" : "[Login]"}
         </button>

         {/* Work Label */}
         <div className="text-right tk-din-condensed text-white text-3xl md:text-4xl  uppercase tracking-[0.9px] leading-none">
             Work / 22-26
         </div>

         {/* Squares */}
         <div className="flex gap-0 mt-1">
             <div className="w-3 h-3 border border-white"></div>
             <div className="w-3 h-3 bg-[#BA76FF]"></div>
             <div className="w-3 h-3 border border-white"></div>
         </div>
      </div>
    </header>
  );
};

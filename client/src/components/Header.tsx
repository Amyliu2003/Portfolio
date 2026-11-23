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
    <header className="flex-shrink-0 w-full px-8 py-8 sm:py-10 z-10 flex flex-row gap-4 sm:gap-6 justify-between items-end border-b border-white/20">
      {/* LEFT: TITLE BLOCK */}
      <div className="flex flex-col items-start gap-0 min-w-0 flex-1">
        <Link to="/works" className="block max-w-[min(468px,70vw)] leading-none hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        <div className="flex items-center gap-0 text-white/80 publicSans-text italic uppercase tracking-[1.4px] text-xs sm:text-sm leading-none">
            <span className="yarding-text hidden sm:block">siera@2149</span>
            {/* Separator in the tagline face so it matches the other "|" (Yarding draws it like "/") */}
            <span className="hidden sm:block font-normal not-italic whitespace-pre"> | </span>
            <span className="font-normal not-italic leading-[1.3]"><span className="inline-block">Creative Technologist |</span> <span className="inline-block">U of T MI &amp; NYU IMA</span></span>
        </div>
      </div>

      {/* RIGHT: META BLOCK */}
      <div className="header-meta flex flex-col items-end shrink-0 gap-0">
         <Link
            to="/tools"
            className="header-meta__small font-mono text-white uppercase tracking-[1.2px] hover:text-[#BA76FF] transition-colors"
         >
            [Tools]
         </Link>

         {/* Login Link */}
         <button 
            onClick={isLoggedIn ? onLogoutClick : onLoginClick}
            className="header-meta__small font-['Yarding'] text-white uppercase tracking-[1.2px] hover:text-[#BA76FF] transition-colors"
         >
             {isLoggedIn ? "[Logout]" : "[Login]"}
         </button>

         {/* Work Label */}
         <div className="header-meta__work text-right tk-din-condensed text-white uppercase tracking-[0.9px] leading-none">
             Work / 22-26
         </div>

         {/* Squares */}
         <div className="flex gap-0 mt-1">
             <div className="header-meta__sq border border-white"></div>
             <div className="header-meta__sq bg-[#BA76FF]"></div>
             <div className="header-meta__sq border border-white"></div>
         </div>
      </div>
    </header>
  );
};

import React from "react";

export const Iceberg: React.FC = () => {

  const TOP_W = "clamp(250px, 70vw, 900px)";
  const BOTTOM_W = "clamp(200px, 65vw, 900px)";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* TOP ICEBERG */}
      <div
        className="absolute z-10"
        style={{
          left: "50%",
          top: "min(500px, max(0px, calc((800px - 100vw) * 0.6)))",               // 响应式 top   
          width: TOP_W,
          aspectRatio: "1110 / 509",         
          transform: "translateX(-50%) translateY(50%)",      
        }}
      >
        <svg
          viewBox="0 0 1110 509"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M515.285 0L1030.57 474H0L515.285 0Z" fill="url(#icebergTopA)" />
          <path d="M745.785 95L1109.08 509H382.487L745.785 95Z" fill="url(#icebergTopB)" />
          <defs>
            <linearGradient id="icebergTopA" x1="554.541" y1="0" x2="554.541" y2="509" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7FBE1" />
              <stop offset="1" stopColor="#C3D8FF" />
            </linearGradient>
            <linearGradient id="icebergTopB" x1="554.541" y1="0" x2="554.541" y2="509" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7FBE1" />
              <stop offset="1" stopColor="#C3D8FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* BOTTOM ICEBERG (REFLECTION) */}
      <div
        className="absolute opacity-40 z-0"
        style={{
          left: "50%",
          top: "390px",    
          width: BOTTOM_W,
          aspectRatio: "1109 / 370",
          transform: "translateX(-50%) translateY(50%) scaleX(-1)",
        }}
      >
        <svg
          viewBox="0 0 1109 370"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M595.963 370L78.6532 27.5336L1109 24.1601L595.963 370Z" fill="url(#icebergBottomA)" />
          <path d="M365.085 301.779L0 2.37849L726.438 0L365.085 301.779Z" fill="url(#icebergBottomB)" />
          <defs>
            <linearGradient id="icebergBottomA" x1="554.5" y1="0" x2="554.5" y2="370" gradientUnits="userSpaceOnUse">
              <stop stopColor="#96B0E3" />
              <stop offset="1" stopColor="#56527D" />
            </linearGradient>
            <linearGradient id="icebergBottomB" x1="554.5" y1="0" x2="554.5" y2="370" gradientUnits="userSpaceOnUse">
              <stop stopColor="#96B0E3" />
              <stop offset="1" stopColor="#56527D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
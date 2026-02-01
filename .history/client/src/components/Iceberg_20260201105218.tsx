import React from "react";

export const Iceberg: React.FC = () => {
  return (
    <div className="relative w-full h-[100vh] pointer-events-none overflow-visible">
      
      {/* TOP ICEBERG */}
      <div className="absolute left-1/2 max-w-[1000px] -translate-x-1/2 z-10">
        <svg
          viewBox="0 0 1110 509"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full aspect-[1110/509]"
          style={{ width: "1000px", height: "500px" }}
        >
          <path
            d="M515.285 0L1030.57 474H0L515.285 0Z"
            fill="url(#icebergTopA)"
          />
          <path
            d="M745.785 95L1109.08 509H382.487L745.785 95Z"
            fill="url(#icebergTopB)"
          />
          <defs>
            <linearGradient
              id="icebergTopA"
              x1="554.541"
              y1="0"
              x2="554.541"
              y2="509"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F7FBE1" />
              <stop offset="1" stopColor="#C3D8FF" />
            </linearGradient>
            <linearGradient
              id="icebergTopB"
              x1="554.541"
              y1="0"
              x2="554.541"
              y2="509"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F7FBE1" />
              <stop offset="1" stopColor="#C3D8FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* BOTTOM ICEBERG (REFLECTION) */}
      <div className="absolute left-1/2 w-[70%] max-w-[1000px] -translate-x-1/2 scale-x-[-1] opacity-40 z-0">
        <svg
          viewBox="0 0 1109 370"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full aspect-[1109/370]"
          style={{ width: "1000px", height: "500px" }}
        >
          <path
            d="M595.963 370L78.6532 27.5336L1109 24.1601L595.963 370Z"
            fill="url(#icebergBottomA)"
          />
          <path
            d="M365.085 301.779L0 2.37849L726.438 0L365.085 301.779Z"
            fill="url(#icebergBottomB)"
          />
          <defs>
            <linearGradient
              id="icebergBottomA"
              x1="554.5"
              y1="0"
              x2="554.5"
              y2="370"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#96B0E3" />
              <stop offset="1" stopColor="#56527D" />
            </linearGradient>
            <linearGradient
              id="icebergBottomB"
              x1="554.5"
              y1="0"
              x2="554.5"
              y2="370"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#96B0E3" />
              <stop offset="1" stopColor="#56527D" />
            </linearGradient>
          </defs>
        </svg>
      </div>

    </div>
  );
};
import React from 'react';

interface SamasyaSetuLogoProps {
  className?: string;
  size?: number;
}

export const SamasyaSetuLogo: React.FC<SamasyaSetuLogoProps> = ({
  className = 'w-full h-full',
  size
}) => {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Background Circle Base */}
      <rect width="200" height="220" fill="transparent" />

      {/* 1. TOP-LEFT ORANGE SECTION & HEADS */}
      {/* Top Left Head */}
      <circle cx="55" cy="40" r="13" fill="#ea580c" />
      {/* Top Center Head */}
      <circle cx="103" cy="22" r="8" fill="#f97316" />
      {/* Left Outer Arm/Head */}
      <circle cx="26" cy="98" r="9" fill="#ea580c" />
      {/* Orange Body Arc (Top-Left quadrant) */}
      <path
        d="M 100 36 C 68 36 44 60 38 98 C 50 102 64 103 76 100 C 72 82 84 66 100 64 Z"
        fill="#ea580c"
      />

      {/* 2. TOP-RIGHT GREEN SECTION & HEADS */}
      {/* Top Right Head */}
      <circle cx="152" cy="44" r="13" fill="#16a34a" />
      {/* Right Outer Arm/Head */}
      <circle cx="178" cy="100" r="9" fill="#16a34a" />
      {/* Green Body Arc (Top-Right quadrant) */}
      <path
        d="M 104 36 C 136 36 160 62 166 100 C 152 103 138 102 126 98 C 130 82 118 66 104 64 Z"
        fill="#16a34a"
      />

      {/* 3. BOTTOM DEEP ROYAL BLUE SECTION & HEADS */}
      {/* Bottom Left Head */}
      <circle cx="40" cy="166" r="11" fill="#0052a5" />
      {/* Bottom Center Head */}
      <circle cx="100" cy="198" r="12" fill="#0052a5" />
      {/* Bottom Right Head */}
      <circle cx="162" cy="166" r="11" fill="#0052a5" />
      {/* Blue Body Arc (Bottom Half) */}
      <path
        d="M 38 108 C 42 152 70 178 100 180 C 130 178 158 152 162 108 C 150 114 136 118 120 120 C 114 140 88 140 80 120 C 64 118 50 114 38 108 Z"
        fill="#0052a5"
      />

      {/* 4. CENTRAL GLOBE SPHERE */}
      {/* Deep Blue Globe Base */}
      <circle cx="100" cy="106" r="38" fill="#0052a5" />
      {/* Gradient Overlay for Depth */}
      <circle cx="100" cy="106" r="38" fill="url(#globeGrad)" />

      {/* Globe Lat/Long Lines in White */}
      {/* Equator & Horizontal Parallels */}
      <path
        d="M 64 106 H 136"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 70 91 C 80 94 120 94 130 91"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 70 121 C 80 118 120 118 130 121"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 80 78 C 90 80 110 80 120 78"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 80 134 C 90 132 110 132 120 134"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Prime Meridian & Curving Longitude Meridians */}
      <path
        d="M 100 68 V 144"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 100 68 C 84 80 84 132 100 144"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 100 68 C 116 80 116 132 100 144"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle
        cx="100"
        cy="106"
        r="38"
        stroke="#ffffff"
        strokeWidth="3"
      />

      {/* 5. WHITE CONNECTING HANDS / BRIDGING ARMS */}
      {/* Left Hand Holding Globe */}
      <path
        d="M 32 102 C 48 102 62 106 72 108 C 66 112 52 114 36 112 Z"
        fill="#ffffff"
      />
      {/* Right Hand Holding Globe */}
      <path
        d="M 168 102 C 152 102 138 106 128 108 C 134 112 148 114 164 112 Z"
        fill="#ffffff"
      />

      <defs>
        <radialGradient
          id="globeGrad"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(90 95) rotate(50) scale(45)"
        >
          <stop stopColor="#0284c7" stopOpacity="0.8" />
          <stop offset="0.6" stopColor="#0052a5" />
          <stop offset="1" stopColor="#0f2b5c" />
        </radialGradient>
      </defs>
    </svg>
  );
};

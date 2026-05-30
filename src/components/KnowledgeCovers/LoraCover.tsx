import React from "react";
import CoverShell from "./CoverShell";

export default function LoraCover() {
  return (
    <CoverShell>
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        <rect width="320" height="200" fill="#FBEFE3" />

        <g transform="translate(48,52)">
          <rect x="0" y="0" width="96" height="96" rx="8" fill="#241C15" stroke="#241C15" strokeWidth="2.5" />
          <g opacity="0.18">
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`vh${i}`} x1={(i + 1) * 19.2} y1="0" x2={(i + 1) * 19.2} y2="96" stroke="#F4D35E" strokeWidth="1" />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`hl${i}`} x1="0" y1={(i + 1) * 19.2} x2="96" y2={(i + 1) * 19.2} stroke="#F4D35E" strokeWidth="1" />
            ))}
          </g>
          <text x="48" y="44" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="22" fontWeight="800" fill="#F4D35E">W</text>
          <text x="48" y="62" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#F4D35E" opacity="0.7">d × d</text>
          <g transform="translate(74,72)">
            <circle r="9" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
            <rect x="-3.5" y="-5" width="7" height="6" rx="1" fill="none" stroke="#241C15" strokeWidth="1.5" />
            <rect x="-5" y="-1" width="10" height="8" rx="1.5" fill="#241C15" />
          </g>
          <text x="48" y="86" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#F4D35E" opacity="0.6">frozen</text>
        </g>

        <text x="160" y="100" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="20" fontWeight="800" fill="#241C15">+</text>

        <g transform="translate(176,52)">
          <rect x="0" y="0" width="96" height="24" rx="6" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />
          <text x="48" y="17" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="14" fontWeight="800" fill="white">B</text>
          <text x="84" y="17" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="white" opacity="0.85">d×r</text>

          <text x="48" y="42" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="14" fontWeight="800" fill="#241C15">×</text>

          <rect x="36" y="48" width="24" height="48" rx="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
          <text x="48" y="74" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="14" fontWeight="800" fill="white">A</text>
          <text x="48" y="88" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="7" fill="white" opacity="0.85">r×d</text>
        </g>

        <g transform="translate(40,168)">
          <rect x="0" y="0" width="240" height="22" rx="11" fill="#241C15" />
          <text x="120" y="15" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#F4D35E" fontWeight="700" letterSpacing="0.12em">
            y = W·x + (B × A)·x
          </text>
        </g>

        <text x="160" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C" letterSpacing="0.18em" fontWeight="700">
          LOW-RANK ADAPTATION
        </text>
      </svg>
    </CoverShell>
  );
}

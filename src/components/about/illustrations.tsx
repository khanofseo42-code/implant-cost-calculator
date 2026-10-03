/**
 * Decorative SVG artwork for the About page. Like the landing artwork, these use
 * fixed brand-adjacent colours so they read the same in light and dark mode.
 */

import { useId } from "react";

type SvgProps = { className?: string };

function useSvgId(prefix: string) {
  return `${prefix}${useId().replace(/:/g, "")}`;
}

/** Soft blue blob, accent bubbles and a dashed connector behind the hero implant. */
export function AboutHeroBackdrop({ className }: SvgProps) {
  const p = useSvgId("abg");
  return (
    <svg viewBox="0 0 560 480" fill="none" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${p}-blob`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#eef5ff" />
          <stop offset="45%" stopColor="#b9d5ff" />
          <stop offset="100%" stopColor="#5f9bff" />
        </radialGradient>
        <linearGradient id={`${p}-teal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a6f3e4" />
          <stop offset="100%" stopColor="#3fcfb5" />
        </linearGradient>
        <linearGradient id={`${p}-violet`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8d6ff" />
          <stop offset="100%" stopColor="#8f8cf2" />
        </linearGradient>
      </defs>

      {/* Outer glow + main blob */}
      <path
        d="M120 210 C110 110 200 40 300 46 C410 52 480 130 470 236 C462 330 390 400 290 404 C190 408 128 320 120 210 Z"
        fill="#dceaff"
        opacity="0.6"
      />
      <path
        d="M150 214 C146 128 214 76 296 80 C392 84 446 150 438 240 C430 318 372 372 292 372 C206 372 154 300 150 214 Z"
        fill={`url(#${p}-blob)`}
        opacity="0.85"
      />

      {/* Bubbles */}
      <circle cx="110" cy="190" r="20" fill={`url(#${p}-teal)`} opacity="0.85" />
      <circle cx="180" cy="160" r="8" fill="#2f6df6" opacity="0.85" />
      <circle cx="430" cy="16" r="9" fill="#2f6df6" />
      <circle cx="166" cy="356" r="12" fill={`url(#${p}-violet)`} />

      {/* Dashed connector running off the bottom-right card */}
      <path d="M520 240 C548 290 470 330 440 380 C420 414 380 440 362 478" stroke="#3fb7c9" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <circle cx="516" cy="236" r="5" fill="#3fb7c9" />
    </svg>
  );
}

/** Tilted clipboard with a red "no" sign — the "What we are not" section. */
export function ClipboardNotArt({ className }: SvgProps) {
  const p = useSvgId("cnot");
  return (
    <svg viewBox="0 0 300 260" fill="none" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${p}-s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#2a4a9a" floodOpacity="0.22" />
        </filter>
        <linearGradient id={`${p}-board`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fb4ff" />
          <stop offset="100%" stopColor="#3f73ea" />
        </linearGradient>
        <linearGradient id={`${p}-red`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff7a86" />
          <stop offset="100%" stopColor="#e5364a" />
        </linearGradient>
      </defs>

      {/* Background blobs */}
      <circle cx="96" cy="70" r="62" fill="#ffd9de" opacity="0.7" />
      <circle cx="210" cy="60" r="36" fill="#ffe3e7" opacity="0.8" />
      <circle cx="70" cy="190" r="56" fill="#dbe8ff" opacity="0.7" />

      <g filter={`url(#${p}-s)`} transform="rotate(-10 140 140)">
        <rect x="56" y="36" width="160" height="200" rx="18" fill={`url(#${p}-board)`} />
        <rect x="68" y="56" width="136" height="168" rx="10" fill="#ffffff" />
        <rect x="108" y="22" width="56" height="28" rx="10" fill="#3a4a66" />
        <circle cx="136" cy="22" r="9" fill="#3a4a66" />
        <circle cx="136" cy="22" r="4" fill="#9aa8bf" />
        <circle cx="80" cy="70" r="3" fill="#cdd8ea" />

        {/* "No" sign */}
        <circle cx="114" cy="122" r="28" fill={`url(#${p}-red)`} />
        <circle cx="114" cy="122" r="17" fill="#ffffff" />
        <path d="M102 110 L126 134" stroke={`url(#${p}-red)`} strokeWidth="7" strokeLinecap="round" />

        <rect x="84" y="170" width="96" height="7" rx="3.5" fill="#d6dfee" />
        <rect x="84" y="186" width="74" height="7" rx="3.5" fill="#e3e9f4" />
        <rect x="84" y="202" width="86" height="7" rx="3.5" fill="#e3e9f4" />
      </g>
    </svg>
  );
}

/** Open envelope with a letter and a paper-plane badge — the "Get in touch" panel. */
export function EnvelopeArt({ className }: SvgProps) {
  const p = useSvgId("env");
  return (
    <svg viewBox="0 0 360 260" fill="none" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${p}-s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#2a4a9a" floodOpacity="0.22" />
        </filter>
        <linearGradient id={`${p}-back`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7da6ff" />
          <stop offset="100%" stopColor="#4c7cf0" />
        </linearGradient>
        <linearGradient id={`${p}-front`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a9c6ff" />
          <stop offset="100%" stopColor="#5d8cf6" />
        </linearGradient>
        <linearGradient id={`${p}-plane`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f86ff" />
          <stop offset="100%" stopColor="#1f4fd8" />
        </linearGradient>
      </defs>

      {/* Background blobs + bubbles */}
      <circle cx="170" cy="130" r="104" fill="#d9e8ff" opacity="0.8" />
      <circle cx="96" cy="176" r="56" fill="#c4f1e6" opacity="0.7" />
      <circle cx="262" cy="190" r="50" fill="#d4e4ff" opacity="0.8" />
      <circle cx="30" cy="40" r="12" fill="#c9dcff" />
      <circle cx="270" cy="232" r="22" fill="#b6e9ef" opacity="0.9" />
      <path d="M326 70 C350 110 320 150 290 160" stroke="#3fb7c9" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <circle cx="328" cy="66" r="5" fill="#3fb7c9" />

      <g filter={`url(#${p}-s)`} transform="rotate(-8 180 160)">
        {/* Envelope back + open flap */}
        <path d="M70 120 L180 60 L290 120 V220 H70 Z" fill={`url(#${p}-back)`} />
        {/* Letter */}
        <rect x="104" y="58" width="152" height="120" rx="10" fill="#ffffff" />
        <rect x="124" y="82" width="96" height="8" rx="4" fill="#cfdbef" />
        <rect x="124" y="100" width="112" height="8" rx="4" fill="#dfe7f5" />
        <rect x="124" y="118" width="80" height="8" rx="4" fill="#dfe7f5" />
        {/* Envelope front pocket */}
        <path d="M70 120 L180 186 L290 120 V214 C290 222 284 228 276 228 H84 C76 228 70 222 70 214 Z" fill={`url(#${p}-front)`} />
        <path d="M70 228 L160 168 M290 228 L200 168" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
      </g>

      {/* Paper-plane badge */}
      <g filter={`url(#${p}-s)`}>
        <circle cx="282" cy="44" r="32" fill={`url(#${p}-plane)`} />
        <path d="M266 44 L298 30 L290 62 L281 50 Z" fill="#ffffff" />
        <path d="M281 50 L298 30" stroke="#c7d8ff" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

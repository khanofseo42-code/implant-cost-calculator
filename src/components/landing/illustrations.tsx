/**
 * Decorative SVG artwork for the landing page. Everything is aria-hidden and
 * uses fixed brand-adjacent colours (not theme tokens) so the 3D-style tooth
 * and implant keep their look in both light and dark mode.
 */

import { useId } from "react";

type SvgProps = { className?: string };

/** Stable, SSR-safe prefix for SVG gradient/filter ids (colons stripped for url() refs). */
function useSvgId(prefix: string) {
  return `${prefix}${useId().replace(/:/g, "")}`;
}

const MOLAR_CROWN =
  "M10 50 C6 22 22 8 42 9 C52 10 56 16 60 16 C64 16 68 10 78 9 C98 8 114 22 110 50 C107 76 100 98 94 112 C80 118 40 118 26 112 C20 98 13 76 10 50 Z";

export function ToothDefs({ p }: { p: string }) {
  return (
    <defs>
      <linearGradient id={`${p}-enamel`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#f2f6fc" />
        <stop offset="100%" stopColor="#cfdbec" />
      </linearGradient>
      <linearGradient id={`${p}-metal`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5f6e84" />
        <stop offset="35%" stopColor="#eef3f9" />
        <stop offset="55%" stopColor="#a9b5c6" />
        <stop offset="100%" stopColor="#526077" />
      </linearGradient>
      <linearGradient id={`${p}-metal-dark`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#36435a" />
        <stop offset="40%" stopColor="#9aa8bc" />
        <stop offset="100%" stopColor="#323d54" />
      </linearGradient>
    </defs>
  );
}

export function MolarCrown({ p }: { p: string }) {
  return (
    <>
      <path d={MOLAR_CROWN} fill={`url(#${p}-enamel)`} stroke="#c9d5e6" strokeWidth="1.2" />
      <path d="M22 34 C26 20 36 15 46 16" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.95" fill="none" />
      <path d="M74 18 C86 16 98 22 100 34" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" fill="none" />
      <path d="M98 62 C96 82 90 98 84 108" stroke="#b4c3d8" strokeWidth="3" strokeLinecap="round" opacity="0.5" fill="none" />
    </>
  );
}

/** Molar crown + abutment + threaded titanium post, drawn upright in a 120×260 box. */
export function ToothImplantShape({ p }: { p: string }) {
  return (
    <g>
      <MolarCrown p={p} />
      {/* Abutment */}
      <path d="M34 114 H86 L80 140 H40 Z" fill={`url(#${p}-metal)`} />
      <rect x="34" y="112" width="52" height="5" rx="2.5" fill="#d3dbe6" />
      {/* Post */}
      <rect x="42" y="140" width="36" height="92" rx="6" fill={`url(#${p}-metal)`} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M35 ${146 + i * 12} Q60 ${153 + i * 12} 85 ${146 + i * 12} L83 ${153 + i * 12} Q60 ${160 + i * 12} 37 ${153 + i * 12} Z`}
          fill={`url(#${p}-metal-dark)`}
          opacity="0.9"
        />
      ))}
      <path d="M42 230 Q60 256 78 230 Z" fill={`url(#${p}-metal-dark)`} />
    </g>
  );
}

const BONE_PORES: [number, number, number, number][] = [
  [150, 360, 7, 5], [182, 400, 5, 4], [140, 430, 6, 4], [205, 448, 4, 3], [176, 336, 4, 3],
  [226, 380, 5, 4], [340, 372, 6, 5], [372, 410, 5, 4], [404, 350, 6, 4], [418, 430, 5, 4],
  [356, 448, 4, 3], [392, 382, 3, 3], [160, 462, 4, 3], [430, 395, 4, 3], [208, 352, 3, 2],
];

/** Large hero scene: gum/bone cross-section with the implant, plus floating badges. */
export function HeroIllustration({ className }: SvgProps) {
  const p = useSvgId("hero");
  return (
    <svg viewBox="0 0 520 520" fill="none" className={className} aria-hidden="true" focusable="false">
      <ToothDefs p={p} />
      <defs>
        <radialGradient id={`${p}-halo`} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#e3edff" />
          <stop offset="100%" stopColor="#c4d8ff" />
        </radialGradient>
        <linearGradient id={`${p}-gum`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbb3ba" />
          <stop offset="100%" stopColor="#e26d7c" />
        </linearGradient>
        <linearGradient id={`${p}-bone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbe7cf" />
          <stop offset="100%" stopColor="#ecc59d" />
        </linearGradient>
        <linearGradient id={`${p}-green`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34e09a" />
          <stop offset="100%" stopColor="#079a63" />
        </linearGradient>
        <filter id={`${p}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#2a4a9a" floodOpacity="0.2" />
        </filter>
        <filter id={`${p}-soft`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#2a4a9a" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Halo */}
      <circle cx="285" cy="240" r="232" fill={`url(#${p}-halo)`} />
      <circle cx="285" cy="240" r="232" stroke="#ffffff" strokeWidth="3" />
      <circle cx="285" cy="240" r="200" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />

      {/* Bone + gum cross-section */}
      <g filter={`url(#${p}-shadow)`}>
        <path
          d="M118 322 C118 302 132 292 152 292 H418 C438 292 452 302 452 322 V440 C452 462 434 478 412 478 H158 C136 478 118 462 118 440 Z"
          fill={`url(#${p}-bone)`}
        />
        {BONE_PORES.map(([x, y, rx, ry], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#d79d6c" opacity="0.45" />
        ))}
        <path
          d="M104 300 C126 254 204 260 285 264 C366 260 444 254 466 300 C466 326 446 332 424 324 C384 312 334 318 285 318 C236 318 186 312 146 324 C124 332 104 326 104 300 Z"
          fill={`url(#${p}-gum)`}
        />
        <path d="M140 280 C180 268 230 268 262 270" stroke="#ffd3d8" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* Implant */}
      <g transform="translate(189 18) scale(1.6)" filter={`url(#${p}-shadow)`}>
        <ToothImplantShape p={p} />
      </g>

      {/* Floating badges */}
      <g filter={`url(#${p}-soft)`}>
        <circle cx="436" cy="104" r="46" fill={`url(#${p}-green)`} />
        <ellipse cx="422" cy="82" rx="22" ry="11" fill="#ffffff" opacity="0.25" />
        <text x="436" y="122" textAnchor="middle" fontSize="52" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">
          $
        </text>
      </g>
      <g filter={`url(#${p}-soft)`}>
        <circle cx="126" cy="186" r="40" fill="#ffffff" />
        <path
          d="M113 166 H133 L141 174 V206 H113 Z M133 166 V174 H141 M120 184 H134 M120 192 H134 M120 199 H128"
          stroke="#2a5be0"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="444" cy="262" r="38" fill="#ffffff" />
        <path d="M427 263 L439 275 L462 250" stroke="#2a5be0" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Sparkle dots */}
      <circle cx="70" cy="110" r="7" fill="#5c8bfb" opacity="0.65" />
      <circle cx="490" cy="190" r="5" fill="#8bb0ff" opacity="0.8" />
      <circle cx="70" cy="262" r="4" fill="#8bb0ff" opacity="0.7" />
    </svg>
  );
}

/** Standalone upright tooth + implant, used as an edge decoration. */
export function ToothImplantDecor({ className }: SvgProps) {
  const p = useSvgId("decor");
  return (
    <svg viewBox="0 0 120 260" fill="none" className={className} aria-hidden="true" focusable="false">
      <ToothDefs p={p} />
      <defs>
        <filter id={`${p}-s`} x="-30%" y="-10%" width="160%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2a4a9a" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter={`url(#${p}-s)`}>
        <ToothImplantShape p={p} />
      </g>
    </svg>
  );
}

/** Single molar crown, no post. */
export function ToothDecor({ className }: SvgProps) {
  const p = useSvgId("molar");
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true" focusable="false">
      <ToothDefs p={p} />
      <MolarCrown p={p} />
    </svg>
  );
}

/** Soft teal / blue leaf cluster for section edges. */
export function LeafDecor({ className, flip }: SvgProps & { flip?: boolean }) {
  const p = useSvgId("leaf");
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${p}-t`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5fe2c8" />
          <stop offset="100%" stopColor="#14a892" />
        </linearGradient>
        <linearGradient id={`${p}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9dbff" />
          <stop offset="100%" stopColor="#6f98fb" />
        </linearGradient>
      </defs>
      <path d="M10 200 C0 120 40 40 130 20 C150 100 110 180 10 200 Z" fill={`url(#${p}-b)`} opacity="0.5" />
      <path d="M30 210 C30 150 80 100 170 100 C170 160 120 210 30 210 Z" fill={`url(#${p}-t)`} opacity="0.7" />
      <path d="M20 196 C60 150 100 90 130 30" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M40 204 C80 180 120 140 160 108" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
    </svg>
  );
}

/** Blue speech bubble with a question mark (FAQ section). */
export function QuestionBubble({ className }: SvgProps) {
  const p = useSvgId("q");
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${p}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5c8bfb" />
          <stop offset="100%" stopColor="#1f45c9" />
        </linearGradient>
        <filter id={`${p}-s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#1d3ca8" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter={`url(#${p}-s)`}>
        <path
          d="M60 10 C88 10 108 30 108 56 C108 82 88 102 60 102 C52 102 46 101 40 98 L18 110 L24 88 C16 79 12 68 12 56 C12 30 32 10 60 10 Z"
          fill={`url(#${p}-g)`}
        />
      </g>
      <ellipse cx="44" cy="30" rx="18" ry="8" fill="#ffffff" opacity="0.2" />
      <text x="60" y="76" textAnchor="middle" fontSize="58" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">
        ?
      </text>
    </svg>
  );
}

/** Clipboard with green checks, an implant and a molar (final CTA). */
export function ClipboardScene({ className }: SvgProps) {
  const p = useSvgId("clip");
  return (
    <svg viewBox="0 0 440 320" fill="none" className={className} aria-hidden="true" focusable="false">
      <ToothDefs p={p} />
      <defs>
        <filter id={`${p}-s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#0b2a7a" floodOpacity="0.3" />
        </filter>
        <linearGradient id={`${p}-green`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3ddc97" />
          <stop offset="100%" stopColor="#12a86a" />
        </linearGradient>
      </defs>

      {/* Clipboard */}
      <g filter={`url(#${p}-s)`} transform="rotate(-8 150 170)">
        <rect x="40" y="40" width="200" height="250" rx="22" fill="#e6eefc" />
        <rect x="54" y="66" width="172" height="212" rx="12" fill="#ffffff" />
        <rect x="104" y="26" width="72" height="30" rx="12" fill="#9db7ee" />
        <rect x="120" y="18" width="40" height="18" rx="9" fill="#6f8fe0" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 62})`}>
            <rect x="70" y="86" width="34" height="34" rx="9" fill={`url(#${p}-green)`} />
            <path d="M80 103 L86 109 L96 96" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="116" y="92" width="92" height="8" rx="4" fill="#cdd9ee" />
            <rect x="116" y="108" width="60" height="8" rx="4" fill="#dfe7f5" />
          </g>
        ))}
      </g>

      {/* Implant + molar */}
      <g filter={`url(#${p}-s)`}>
        <g transform="translate(258 20) scale(1)">
          <ToothImplantShape p={p} />
        </g>
        <g transform="translate(346 118) scale(0.85) rotate(14 60 60)">
          <MolarCrown p={p} />
        </g>
      </g>

      {/* Sparkles */}
      <path d="M418 36 L400 52 M428 70 L404 74 M392 22 L386 40" stroke="#f6e27a" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Small tooth mark used inside the logo tile. */
export function ToothMark({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M7.2 3.5c-2.4 0-4 1.8-4 4.1 0 1.7.5 3 1 4.4.5 1.5.7 3.3 1.1 5 .3 1.4 1 2.6 2 2.6 1.1 0 1.2-1.3 1.5-3 .2-1.2.6-2 1.2-2s1 .8 1.2 2c.3 1.7.4 3 1.5 3 1 0 1.7-1.2 2-2.6.4-1.7.6-3.5 1.1-5 .5-1.4 1-2.7 1-4.4 0-2.3-1.6-4.1-4-4.1-1.3 0-2.2.5-3.1.5s-1.9-.5-3.5-.5Z"
        fill="#fff"
      />
      <path d="M9 7.2c.8-.5 1.7-.6 2.6-.4" stroke="#7aa2ff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Logo wordmark: a trailing uppercase run ("IQ" in "ImplantIQ") is tinted brand blue. */
export function BrandWordmark({ text, className }: { text: string; className?: string }) {
  const match = text.match(/^(.*?)([A-Z]{2,})$/);
  return (
    <span className={className}>
      {match ? (
        <>
          <span className="text-foreground">{match[1]}</span>
          <span className="text-brand-600">{match[2]}</span>
        </>
      ) : (
        <span className="text-foreground">{text}</span>
      )}
    </span>
  );
}

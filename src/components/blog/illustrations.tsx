/**
 * Decorative SVG artwork for the blog: the index hero scene and per-category
 * cover art used when a post has no featured image. Fixed colours, aria-hidden.
 */

import { useId } from "react";
import { MolarCrown, ToothDefs, ToothImplantShape } from "@/components/landing/illustrations";

type SvgProps = { className?: string };

function useSvgId(prefix: string) {
  return `${prefix}${useId().replace(/:/g, "")}`;
}

/** Blob, article card and implant behind the blog hero (the insight card is HTML). */
export function BlogHeroArt({ className }: SvgProps) {
  const p = useSvgId("bh");
  return (
    <svg viewBox="0 0 520 300" fill="none" className={className} aria-hidden="true" focusable="false">
      <ToothDefs p={p} />
      <defs>
        <radialGradient id={`${p}-blob`} cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#e9f2ff" />
          <stop offset="50%" stopColor="#b5d2ff" />
          <stop offset="100%" stopColor="#4f8dff" />
        </radialGradient>
        <filter id={`${p}-s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#2a4a9a" floodOpacity="0.22" />
        </filter>
      </defs>

      <path
        d="M90 170 C80 90 150 30 250 28 C350 26 410 80 400 160 C392 230 330 280 240 282 C150 284 98 240 90 170 Z"
        fill={`url(#${p}-blob)`}
        opacity="0.85"
      />
      <circle cx="80" cy="26" r="18" fill="#cfe1ff" />
      <circle cx="420" cy="12" r="8" fill="#2f6df6" />
      <circle cx="402" cy="160" r="8" fill="#14b8c8" />
      <path d="M150 50 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4 Z" fill="#ffffff" opacity="0.8" />
      <path d="M396 166 C380 220 340 250 300 262" stroke="#2f6df6" strokeWidth="1.6" strokeDasharray="4 5" />
      <path d="M406 158 C440 150 470 130 480 100" stroke="#2f6df6" strokeWidth="1.6" strokeDasharray="4 5" />
      <path d="M408 2 C412 20 404 34 396 40" stroke="#2f6df6" strokeWidth="1.6" strokeDasharray="4 5" />

      {/* Article card */}
      <g filter={`url(#${p}-s)`} transform="rotate(-10 150 160)">
        <rect x="40" y="70" width="190" height="160" rx="16" fill="#f4f8ff" />
        <rect x="56" y="90" width="44" height="40" rx="8" fill="#5b8dff" />
        <circle cx="70" cy="102" r="5" fill="#ffffff" />
        <path d="M60 126 L74 112 L84 120 L92 112 L98 126 Z" fill="#ffffff" />
        <rect x="112" y="94" width="96" height="8" rx="4" fill="#cbdaf3" />
        <rect x="112" y="110" width="80" height="8" rx="4" fill="#dbe5f6" />
        <rect x="56" y="148" width="152" height="8" rx="4" fill="#cbdaf3" />
        <rect x="56" y="166" width="138" height="8" rx="4" fill="#dbe5f6" />
        <rect x="56" y="184" width="150" height="8" rx="4" fill="#dbe5f6" />
        <rect x="56" y="202" width="100" height="8" rx="4" fill="#dbe5f6" />
      </g>

      {/* Implant */}
      <g transform="translate(212 16) scale(1.02)" filter={`url(#${p}-s)`}>
        <ToothImplantShape p={p} />
      </g>
    </svg>
  );
}

function Backdrop({ p, from, to }: { p: string; from: string; to: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${p}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${p}-gum`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7a8b2" />
          <stop offset="100%" stopColor="#dc6676" />
        </linearGradient>
        <filter id={`${p}-s`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#1d2b4f" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect width="440" height="150" fill={`url(#${p}-bg)`} />
    </>
  );
}

/** Gum mound with a single implant crown — shared by several covers. */
function GumImplant({ p, x, y, scale = 1 }: { p: string; x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} filter={`url(#${p}-s)`}>
      <path d="M-6 150 C-6 120 20 108 60 108 C100 108 126 120 126 150 V200 H-6 Z" fill={`url(#${p}-gum)`} />
      <g transform="translate(0 -6)">
        <ToothImplantShape p={p} />
      </g>
      <path d="M-6 150 C20 134 40 140 60 140 C80 140 100 134 126 150 V200 H-6 Z" fill={`url(#${p}-gum)`} opacity="0.95" />
    </g>
  );
}

function FinancingCover({ p }: { p: string }) {
  return (
    <>
      <Backdrop p={p} from="#f3f6fb" to="#dde5f0" />
      <rect y="122" width="440" height="28" fill="#e9eef6" />
      {/* Implant model */}
      <GumImplant p={p} x={60} y={18} scale={0.62} />
      <g transform="translate(26 38) scale(0.4)" filter={`url(#${p}-s)`}>
        <MolarCrown p={p} />
      </g>
      <g transform="translate(118 38) scale(0.4)" filter={`url(#${p}-s)`}>
        <MolarCrown p={p} />
      </g>
      {/* Coin stacks */}
      {[
        [200, 9], [236, 12], [272, 7], [304, 5],
      ].map(([cx, n], s) => (
        <g key={s} filter={`url(#${p}-s)`}>
          {Array.from({ length: n }).map((_, i) => (
            <g key={i}>
              <ellipse cx={cx} cy={130 - i * 8} rx="16" ry="5" fill="#b8913f" />
              <rect x={cx - 16} y={124 - i * 8} width="32" height="6" fill="#d9b768" />
              <ellipse cx={cx} cy={124 - i * 8} rx="16" ry="5" fill="#ecd294" />
            </g>
          ))}
        </g>
      ))}
      {/* Calculator */}
      <g filter={`url(#${p}-s)`} transform="rotate(-8 390 80)">
        <rect x="336" y="20" width="110" height="130" rx="12" fill="#e3e7ee" />
        <rect x="348" y="32" width="86" height="26" rx="5" fill="#9fb0a2" />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={348 + c * 22} y={68 + r * 18} width="18" height="13" rx="3" fill={c === 3 ? "#9aa7ba" : "#f7f9fc"} />
          ))
        )}
      </g>
    </>
  );
}

function InsuranceCover({ p }: { p: string }) {
  return (
    <>
      <Backdrop p={p} from="#5a6b80" to="#2c3747" />
      {/* Form */}
      <g transform="rotate(-12 200 90)" filter={`url(#${p}-s)`}>
        <rect x="40" y="10" width="330" height="190" rx="4" fill="#eef2f7" />
        <text x="120" y="60" fontSize="17" fontWeight="800" fill="#2c3a55" fontFamily="system-ui, sans-serif" letterSpacing="1">
          DENTAL INSURANCE
        </text>
        <text x="150" y="80" fontSize="13" fontWeight="700" fill="#2c3a55" fontFamily="system-ui, sans-serif" letterSpacing="1">
          CLAIM FORM
        </text>
        {[100, 116, 132, 148, 164].map((y, i) => (
          <g key={y}>
            <rect x="70" y={y} width={i % 2 ? 90 : 120} height="5" rx="2" fill="#b7c2d4" />
            <rect x="200" y={y} width={i % 2 ? 140 : 110} height="2" fill="#c9d2e0" />
          </g>
        ))}
      </g>
      {/* Pen */}
      <g transform="rotate(24 300 110)" filter={`url(#${p}-s)`}>
        <rect x="240" y="104" width="120" height="9" rx="4.5" fill="#1d2433" />
        <rect x="320" y="104" width="10" height="9" fill="#c0c7d3" />
        <path d="M240 104 L226 108.5 L240 113 Z" fill="#c0c7d3" />
      </g>
      {/* Molar */}
      <g transform="translate(350 4) scale(0.72)" filter={`url(#${p}-s)`}>
        <MolarCrown p={p} />
        <path d="M30 112 C30 140 40 160 46 172 C50 160 54 140 58 118 Z M62 118 C66 140 70 160 76 172 C82 160 92 140 90 112 Z" fill={`url(#${p}-enamel)`} />
      </g>
    </>
  );
}

function ComparisonCover({ p }: { p: string }) {
  return (
    <>
      <Backdrop p={p} from="#f6e9ec" to="#e7cfd6" />
      <path d="M250 0 H440 V150 H210 Z" fill="#f2dfe4" />
      <path d="M250 0 L210 150" stroke="#ffffff" strokeWidth="6" />
      {/* Single implant */}
      <GumImplant p={p} x={70} y={10} scale={0.66} />
      {/* Full arch */}
      <g filter={`url(#${p}-s)`}>
        <path d="M250 150 C254 98 300 74 340 74 C380 74 426 98 430 150 Z" fill={`url(#${p}-gum)`} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(${262 + i * 27} ${44 + Math.abs(i - 2.5) * 6}) scale(0.26)`}>
            <MolarCrown p={p} />
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${280 + i * 36} 104)`}>
            <rect x="-5" y="0" width="10" height="30" rx="2" fill={`url(#${p}-metal)`} />
            {[0, 1, 2, 3].map((t) => (
              <rect key={t} x="-7" y={4 + t * 7} width="14" height="2.5" rx="1" fill={`url(#${p}-metal-dark)`} />
            ))}
          </g>
        ))}
      </g>
      {/* VS badge */}
      <g filter={`url(#${p}-s)`}>
        <circle cx="230" cy="74" r="24" fill="#1f3366" stroke="#ffffff" strokeWidth="4" />
        <text x="230" y="81" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">
          VS
        </text>
      </g>
    </>
  );
}

function CostGuideCover({ p }: { p: string }) {
  return (
    <>
      <Backdrop p={p} from="#eef2f7" to="#c9d2de" />
      <rect y="110" width="440" height="40" fill="#cdb79c" opacity="0.55" />
      <GumImplant p={p} x={44} y={14} scale={0.64} />
      {/* Clipboard with bar chart */}
      <g transform="rotate(-14 280 80)" filter={`url(#${p}-s)`}>
        <rect x="170" y="10" width="220" height="170" rx="10" fill="#2f63e0" />
        <rect x="182" y="24" width="196" height="150" rx="5" fill="#f7f9fd" />
        <rect x="250" y="2" width="60" height="18" rx="5" fill="#3b4254" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const h = [18, 26, 22, 34, 40, 30, 46][i];
          return <rect key={i} x={226 + i * 16} y={130 - h} width="10" height={h} rx="2" fill={i % 2 ? "#3a73f0" : "#7ea4f7"} />;
        })}
        <rect x="200" y="140" width="150" height="4" rx="2" fill="#d2dbe9" />
        <rect x="200" y="40" width="90" height="5" rx="2.5" fill="#c6d1e3" />
      </g>
      {/* Calculator corner */}
      <g filter={`url(#${p}-s)`} transform="rotate(10 410 40)">
        <rect x="380" y="-10" width="90" height="80" rx="10" fill="#dfe4ec" />
        <rect x="392" y="2" width="66" height="18" rx="4" fill="#a5b2a8" />
        {[0, 1, 2].map((c) => (
          <rect key={c} x={392 + c * 22} y="28" width="18" height="12" rx="3" fill="#f6f8fb" />
        ))}
      </g>
    </>
  );
}

function GeneralCover({ p }: { p: string }) {
  return (
    <>
      <Backdrop p={p} from="#eef4ff" to="#cfe0ff" />
      <circle cx="320" cy="40" r="60" fill="#ffffff" opacity="0.5" />
      <GumImplant p={p} x={170} y={10} scale={0.66} />
    </>
  );
}

const COVERS: Record<string, (props: { p: string }) => React.ReactElement> = {
  financing: FinancingCover,
  insurance: InsuranceCover,
  "treatment comparison": ComparisonCover,
  "cost guide": CostGuideCover,
};

/** Category-matched illustrated cover for posts without a featured image. */
export function BlogCoverArt({ category, className }: SvgProps & { category: string }) {
  const p = useSvgId("cover");
  const Cover = COVERS[category.toLowerCase()] ?? GeneralCover;
  return (
    <svg
      viewBox="0 0 440 150"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <ToothDefs p={p} />
      <Cover p={p} />
    </svg>
  );
}

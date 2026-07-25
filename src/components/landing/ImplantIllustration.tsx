export function ImplantIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-labelledby="implant-illustration-title"
    >
      <title id="implant-illustration-title">
        Illustration of a dental implant with crown, abutment, and titanium post
      </title>
      <defs>
        <linearGradient id="implantGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500)" />
          <stop offset="100%" stopColor="var(--color-accent-500)" />
        </linearGradient>
        <radialGradient id="haloGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="var(--color-brand-200)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-brand-200)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="240" cy="220" r="200" fill="url(#haloGrad)" />

      {/* Crown */}
      <path
        d="M170 110 Q240 60 310 110 L300 190 Q240 220 180 190 Z"
        fill="url(#implantGrad)"
        opacity="0.95"
      />
      <path
        d="M170 110 Q240 60 310 110 L300 190 Q240 220 180 190 Z"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="2"
      />

      {/* Abutment */}
      <path d="M205 190 L275 190 L262 250 L218 250 Z" fill="var(--color-brand-700)" />

      {/* Titanium post with threads */}
      <rect x="220" y="250" width="40" height="150" rx="10" fill="var(--color-foreground-muted)" opacity="0.8" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x="214" y={262 + i * 16} width="52" height="6" rx="3" fill="var(--color-surface)" opacity="0.5" />
      ))}
      <path d="M240 400 L228 430 L252 430 Z" fill="var(--color-foreground-muted)" opacity="0.8" />

      {/* Gum line */}
      <path
        d="M90 260 Q240 300 390 260 L390 300 Q240 340 90 300 Z"
        fill="var(--color-danger)"
        opacity="0.12"
      />
      <path d="M90 264 Q240 304 390 264" stroke="var(--color-danger)" strokeOpacity="0.4" strokeWidth="3" fill="none" />

      {/* Success badge */}
      <circle cx="360" cy="140" r="34" fill="var(--color-accent-500)" />
      <path
        d="M345 140 L356 151 L378 127"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Floating accent dots */}
      <circle cx="105" cy="150" r="6" fill="var(--color-brand-400)" opacity="0.6" />
      <circle cx="130" cy="360" r="5" fill="var(--color-accent-400)" opacity="0.6" />
      <circle cx="380" cy="330" r="7" fill="var(--color-brand-300)" opacity="0.6" />
    </svg>
  );
}

// Loose, hand-drawn marks so the page doesn't look machine-made. Both inherit currentColor.

export function HandUnderline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path
        d="M3 13 C 60 5, 130 4, 200 8 S 280 12, 297 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M20 17 C 90 11, 170 11, 260 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function HandArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 50" aria-hidden="true" className={className}>
      <path
        d="M8 4 C 22 8, 30 20, 22 34 C 20 38, 18 41, 17 45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M9 38 L 17 46 L 25 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

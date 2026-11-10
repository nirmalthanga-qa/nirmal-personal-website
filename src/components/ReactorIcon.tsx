/** Rotating segmented ring (reactor-style outline) used behind the menu button's centre. */
export function ReactorRing() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true">
      <defs>
        <radialGradient id="reactor-glow">
          <stop offset="0" stopColor="var(--reactor)" stopOpacity=".6" />
          <stop offset="1" stopColor="var(--reactor)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="26" cy="26" r="25" fill="var(--bg-deep)" />
      <circle
        className="r-glow"
        cx="26"
        cy="26"
        r="21"
        fill="url(#reactor-glow)"
      />
      <circle
        className="r-seg"
        cx="26"
        cy="26"
        r="22.5"
        fill="none"
        stroke="var(--reactor)"
        strokeWidth="3"
        strokeDasharray="11.2 3.25"
      />
      <circle
        cx="26"
        cy="26"
        r="17.5"
        fill="none"
        stroke="var(--reactor)"
        strokeWidth="1.5"
        opacity=".75"
      />
    </svg>
  );
}

/** Red triangular reactor core shown in the Dark Knight theme. */
export function ReactorCore() {
  return (
    <svg className="burger-core" viewBox="0 0 52 52" aria-hidden="true">
      <circle
        cx="26"
        cy="26"
        r="13"
        fill="none"
        stroke="var(--reactor)"
        strokeWidth="1.5"
      />
      <path
        d="M26 15 37 34H15zM21 31h10"
        fill="none"
        stroke="var(--reactor)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hamburger bars that turn into an X when the menu is open (shown when no menu image is set). */
export function BurgerBars() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true">
      <g stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round">
        <path className="b1" d="M17 20h18" />
        <path className="b2" d="M17 26h18" />
        <path className="b3" d="M17 32h18" />
      </g>
    </svg>
  );
}

/** Large faint ring for the welcome section's background. */
export function HeroRing() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="var(--reactor)"
        strokeWidth="3.4"
        strokeDasharray="22.4 6.5"
      />
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="none"
        stroke="var(--reactor)"
        strokeWidth=".8"
      />
    </svg>
  );
}

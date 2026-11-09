import type { CSSProperties } from "react";
import { site } from "../data/site";
import { HeroRing } from "./ReactorIcon";

/** Landing section: reactor powers on, then "Welcome" types in like a HUD. */
export function Hero({ play = true }: { play?: boolean }) {
  const title = site.welcome.title;

  return (
    <section
      className={`hero${play ? " play" : ""}`}
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="hero-ring" aria-hidden="true">
        {/* inner wrapper carries the power-on animation, so your ring's own animation is untouched */}
        <div className="hero-power">
          <HeroRing />
        </div>
      </div>

      <div className="hero-in">
        <h1 className="hero-title" id="hero-title">
          <span className="sr">{title}</span>
          <span className="hud" aria-hidden="true">
            {Array.from(title).map((c, i) => (
              <span
                key={i}
                className="ch"
                style={{ "--i": i } as CSSProperties}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          <span className="sr">
            , you are on the website of {site.name}: Engineer, Sketch Artist and
            Automotive Enthusiast
          </span>
        </h1>
        <p className="hero-sub">TO MY PERSONAL PAGE</p>
      </div>

      <a className="cue" href="#about" aria-label="Scroll to the next section">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}

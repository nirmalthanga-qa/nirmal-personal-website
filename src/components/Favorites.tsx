import { useState } from "react";
import { Reveal } from "./Reveal";

interface Portrait {
  category: string;
  displayName: string;
  image: string;
  alt: string;
  mark?: "top-mask" | "dark-knight" | "messi";
}

const portraits: Portrait[] = [
  {
    category: "Color",
    displayName: "Red",
    image: "/favorites/red.svg",
    alt: "Red. Bold, energetic, and full of emotion.",
  },
  {
    category: "Beverage",
    displayName: "Mocha",
    image: "/favorites/mocha-poster.svg",
    alt: "A red and cream Cafe Mocha poster with a cup of coffee and chocolate.",
  },
  {
    category: "Place",
    displayName: "Hill Stations",
    image: "/favorites/hill-stations-poster.svg",
    alt: "Original red-and-cream illustration of layered mountains, tea fields, and a lake.",
  },
  {
    category: "Season",
    displayName: "Fall",
    image: "/favorites/fall-poster.svg",
    alt: "Original red-and-cream autumn illustration of a winding path beneath a tree.",
  },
  {
    category: "Athlete",
    displayName: "Lionel Messi",
    image: "/favorites/messi-poster.svg",
    alt: "Silhouette logo celebrating Lionel Messi and his number 10.",
    mark: "messi",
  },
  {
    category: "Movie",
    displayName: "The Dark Knight",
    image: "/favorites/dark-knight-poster.svg",
    alt: "The site's dark theme bat logo on a red night-city poster.",
    mark: "dark-knight",
  },
  {
    category: "Character",
    displayName: "Tony Stark",
    image: "/favorites/tony-stark-poster.svg",
    alt: "The site's back-to-top mask logo on a red Tony Stark poster.",
    mark: "top-mask",
  },
  {
    category: "Car",
    displayName: "Automotive",
    image: "/favorites/car-next-poster.svg",
    alt: "A cream down arrow on a red poster pointing to the next section.",
  },
];

function PortraitCard({ portrait }: { portrait: Portrait }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <figure className="favorite-portrait">
      <button
        className={`favorite-flip${flipped ? " is-flipped" : ""}`}
        type="button"
        aria-label={`${flipped ? "Show" : "Reveal"} ${portrait.category}: ${portrait.displayName}`}
        aria-pressed={flipped}
        onClick={() => setFlipped((current) => !current)}
      >
        <span
          className="favorite-face favorite-face-front"
          aria-hidden={flipped}
        >
          <span className="favorite-category">{portrait.category}</span>
        </span>
        <span
          className="favorite-face favorite-face-back"
          aria-hidden={!flipped}
        >
          <img src={portrait.image} alt="" loading="lazy" />
          {portrait.mark &&
            (portrait.mark === "messi" ? (
              <img
                className="favorite-messi-logo"
                src="/favorites/messi-logo.png"
                alt="Messi number 10 logo"
                loading="lazy"
              />
            ) : (
              <span
                className={`favorite-artwork-mark ${portrait.mark}`}
                aria-hidden="true"
              />
            ))}
        </span>
      </button>
    </figure>
  );
}

export function Favorites() {
  return (
    <section
      className="sec favorites"
      id="favorites"
      aria-label="Personal Favorites"
    >
      <Reveal as="h2">
        <span className="hl">My</span> Favorites
      </Reveal>

      <div className="favorite-room" aria-label="Favorite portraits">
        {portraits.map((portrait) => (
          <PortraitCard
            key={`${portrait.category}-${portrait.displayName}`}
            portrait={portrait}
          />
        ))}
      </div>

      <div className="favorites-now-playing" aria-label="Now playing">
        <span className="favorites-equalizer" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span>Now Playing: Till I Collapse (Eminem)</span>
      </div>
    </section>
  );
}

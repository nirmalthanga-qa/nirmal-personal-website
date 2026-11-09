import { site } from "../data/site";
import { Reveal } from "./Reveal";

/* Fallback glyphs: drawn in currentColor, used only if a logo file is missing.
   Real logos come from site.automotive.*.logo (SVGs in /public/brands). */
function FallbackGlyph({ make }: { make: string }) {
  switch (make) {
    case "honda":
      return (
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="4" y="10" width="56" height="44" rx="8" />
          <path d="M18 20v24M46 20v24M18 32h28" />
        </svg>
      );
    case "toyota":
      return (
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <ellipse cx="32" cy="32" rx="26" ry="18" />
          <ellipse cx="32" cy="32" rx="13" ry="18" />
          <ellipse cx="32" cy="22" rx="20" ry="7" />
        </svg>
      );
    case "porsche":
      return (
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 10h36v22c0 12-9 19-18 22-9-3-18-10-18-22z" />
          <path d="M14 30h36M32 10v44M22 24h8v8h-8zM34 34h8v8h-8z" />
        </svg>
      );
    case "audi":
      return (
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="14" cy="32" r="9" />
          <circle cx="26" cy="32" r="9" />
          <circle cx="38" cy="32" r="9" />
          <circle cx="50" cy="32" r="9" />
        </svg>
      );
    case "bmw":
      return (
        <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="26" />
          <circle cx="32" cy="32" r="16" />
          <path d="M32 16v16h16M32 48V32H16" />
        </svg>
      );
    default:
      return null;
  }
}

/** Brand icon: real logo if provided, else the fallback glyph. Tinted via CSS filter. */
function BrandIcon({
  make,
  logo,
  size,
}: {
  make: string;
  logo?: string;
  size: "hero" | "row";
}) {
  if (logo) {
    return (
      <img
        className={`brand-img ${size}`}
        src={logo}
        alt=""
        loading="lazy"
        onError={(e) => {
          // if the file 404s, swap to the drawn fallback
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.dataset.fallback = "true";
            e.currentTarget.remove();
            parent.appendChild(
              Object.assign(document.createElement("span"), {
                className: "brand-fallback",
              }),
            );
          }
        }}
      />
    );
  }
  return <FallbackGlyph make={make} />;
}

export function Automotive() {
  const { automotive } = site;

  return (
    <section
      className="sec automotive"
      id="automotive"
      aria-labelledby="automotive-title"
    >
      {/* Centre-stage: favourite brand */}
      <Reveal className="auto-fav">
        <span className="auto-fav-label" id="automotive-title">
          Favorite Automotive Brand
        </span>
        <span className="auto-fav-name">{automotive.favoriteBrand}</span>
      </Reveal>

      {/* Top 5 */}
      <Reveal as="h3" className="auto-top-title" delay={0.1}>
        My Top 5 Cars of All-time
      </Reveal>

      <ol className="auto-cars">
        {automotive.topCars.map((car, i) => (
          <Reveal
            as="li"
            key={car.name}
            className="auto-car"
            delay={0.05 + i * 0.06}
          >
            <span className="auto-car-mark">
              <BrandIcon make={car.make} logo={car.logo} size="row" />
            </span>
            <span className="auto-car-name">{car.name}</span>
          </Reveal>
        ))}
      </ol>

      {/* F1 car drives right to left along the bottom, wheels spinning */}
      <div className="cars-lane f1-lane" aria-hidden="true">
        <div className="f1">
          <img className="f1-body" src="/f1-car.png" alt="" />
          <img className="f1-wheel front" src="/f1-wheel-front.png" alt="" />
          <img className="f1-wheel rear" src="/f1-wheel-rear.png" alt="" />
          <span className="smoke">
            {Array.from({ length: 7 }).map((_, k) => (
              <span key={k} style={{ animationDelay: `${k * 0.22}s` }} />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}

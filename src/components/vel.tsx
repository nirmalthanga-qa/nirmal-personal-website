import { useEffect, useRef, useState } from "react";
import { velArt } from "../data/velPaths";

/** Vel line art that draws itself outline-first, then fills in. Desktop only (hidden by CSS on small screens). */
export function Vel() {
  const ref = useRef<HTMLDivElement>(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDraw(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = velArt.paths.length;

  return (
    <div ref={ref} className={`vel${draw ? " draw" : ""}`} aria-hidden="true">
      <svg viewBox={`0 0 ${velArt.w} ${velArt.h}`} role="img">
        {velArt.paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            pathLength={1}
            className={`vel-p ${p.k}`}
            style={{ ["--i" as string]: i, ["--n" as string]: n }}
            fillRule="evenodd"
          />
        ))}
      </svg>
    </div>
  );
}

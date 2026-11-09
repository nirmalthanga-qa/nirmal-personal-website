import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { links } from "../data/links";

interface RoleIcon {
  key: string;
  side: "l" | "c" | "r";
  glyph: ReactNode;
  href?: string;
  target?: string;
}

const ICONS: RoleIcon[] = [
  {
    key: "laptop",
    side: "l",
    href: links.professionalPortfolio,
    target: "_blank",
    glyph: (
      <>
        <rect x="14" y="16" width="36" height="24" rx="3" />
        <path d="M8 46h48l-3.5 6h-41z" />
        <path d="M25 28l5 5 9-10" />
      </>
    ),
  },
  {
    key: "art",
    side: "c",
    glyph: (
      <>
        <path d="M32 9C18.5 9 9 18.5 9 31s9.5 24 22 24c4.4 0 6.5-2.3 6.5-5.4 0-2.4-1.6-3.8-1.6-5.9 0-2.7 2.2-4.2 4.8-4.2H46c5.8 0 9-3.2 9-8.5C55 17.8 45.4 9 32 9z" />
        <circle className="dot" cx="21" cy="29" r="3" />
        <circle className="dot" cx="29" cy="19.5" r="3" />
        <circle className="dot" cx="41" cy="21" r="3" />
        <circle className="dot" cx="19.5" cy="40" r="3" />
      </>
    ),
  },
  {
    key: "car",
    side: "r",
    href: "#automotive", // <-- Link to the automotive section
    glyph: (
      <>
        <path d="M19 30l3.5-10h19L45 30" />
        <rect x="8" y="30" width="48" height="17" rx="5" />
        <circle cx="17.5" cy="38.5" r="3" />
        <circle cx="46.5" cy="38.5" r="3" />
        <path d="M26 40h12" />
        <path d="M14 47v6h8v-6M42 47v6h8v-6" />
      </>
    ),
  },
];

interface RoleIconsProps {
  onPortfolio?: () => void;
}

export function RoleIcons({ onPortfolio }: RoleIconsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`icons${shown ? " in" : ""}`} ref={ref}>
      {ICONS.map((icon, i) => {
        const style = { "--d": `${i * 0.18}s` } as CSSProperties;
        const core = (
          <div className="ico-core">
            <svg className="ico-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle className="glow" cx="50" cy="50" r="40" />
              <circle
                className="seg"
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="var(--acc)"
                strokeWidth="3.2"
                strokeDasharray="22.4 6.5"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="var(--acc)"
                strokeWidth=".9"
                opacity=".6"
              />
            </svg>
            <svg className="ico-glyph" viewBox="0 0 64 64" aria-hidden="true">
              {icon.glyph}
            </svg>
          </div>
        );

        if (icon.href) {
          const isExternal = icon.href.startsWith("http");
          return (
            <a
              key={icon.key}
              className={`ico ${icon.side} clickable`}
              style={style}
              href={icon.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={
                isExternal
                  ? "Open my professional portfolio"
                  : `Scroll to ${icon.key}`
              }
              onClick={
                icon.key === "laptop" && onPortfolio
                  ? (e) => {
                      e.preventDefault();
                      onPortfolio();
                    }
                  : undefined
              }
            >
              {core}
            </a>
          );
        }

        return (
          <div
            key={icon.key}
            className={`ico ${icon.side}`}
            style={style}
            aria-hidden="true"
          >
            {core}
          </div>
        );
      })}
    </div>
  );
}

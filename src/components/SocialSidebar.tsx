import { useEffect, useState } from "react";
import { links } from "../data/links";

export function SocialSidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      frame = 0;
      const { scrollHeight } = document.documentElement;
      setVisible(window.scrollY + window.innerHeight >= scrollHeight - 80);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside
      className={`social-sidebar${visible ? " show" : ""}`}
      aria-label="Social media links"
      aria-hidden={!visible}
    >
      <a
        className="social-link"
        href={links.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram (opens in a new tab)"
        tabIndex={visible ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5.2" />
          <circle cx="12" cy="12" r="4.2" />
          <circle className="dot" cx="17.3" cy="6.7" r="1.1" />
        </svg>
      </a>
      <a
        className="social-link"
        href={links.linkedin.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in a new tab)"
        tabIndex={visible ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
    </aside>
  );
}

import { forwardRef, useEffect, useState } from "react";
import { site } from "../data/site";
import { BurgerBars, ReactorRing } from "./ReactorIcon";

interface HeaderProps {
  open: boolean;
  onToggle: () => void;
}

export const Header = forwardRef<HTMLButtonElement, HeaderProps>(
  function Header({ open, onToggle }, buttonRef) {
    const [solid, setSolid] = useState(false);
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
      const onScroll = () => setSolid(window.scrollY > 40);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // your own menu picture sits inside the rotating ring; while the menu is open it gives way to the X
    const showImage = Boolean(site.menuIcon) && !imageFailed && !open;

    return (
      <header className={`hd${solid || open ? " solid" : ""}`}>
        <a
          className="logo"
          href="#top"
          aria-label={`${site.name}, back to the top`}
        >
          <span className="logo-glyph" aria-hidden="true">
            {site.logo}
          </span>
          <span className="sr">{site.name}</span>
        </a>
        <button
          ref={buttonRef}
          className={`burger${open ? " open" : ""}`}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="menu"
          onClick={onToggle}
        >
          <ReactorRing />
          {showImage ? (
            <img
              className="burger-img"
              src={site.menuIcon}
              alt=""
              onError={() => setImageFailed(true)}
            />
          ) : (
            <BurgerBars />
          )}
        </button>
      </header>
    );
  },
);

import { useEffect, useRef } from 'react';
import { site } from '../data/site';

interface MenuOverlayProps {
  open: boolean;
  onNavigate: () => void;
}

export function MenuOverlay({ open, onNavigate }: MenuOverlayProps) {
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => first.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  return (
    <nav className="menu" id="menu" aria-label="Main">
      <ul>
        {site.nav.map((item, i) => (
          <li key={item.id}>
            <a ref={i === 0 ? first : undefined} href={`#${item.id}`} onClick={onNavigate}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

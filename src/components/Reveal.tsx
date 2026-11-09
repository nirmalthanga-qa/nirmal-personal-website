import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  /** Delay in seconds before the reveal transition starts. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Fades an element in the first time it scrolls into view (styles live in global.css as .rv / .in). */
export function Reveal({ as: Tag = 'div', delay, className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // kept in state (not added with classList) so a changing className prop can never wipe the `in` class
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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? ({ '--d': `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag ref={ref} className={['rv', shown && 'in', className].filter(Boolean).join(' ')} style={style}>
      {children}
    </Tag>
  );
}

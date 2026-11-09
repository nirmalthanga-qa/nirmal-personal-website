import { useEffect, useRef, useState } from 'react';

/**
 * Back-to-top button shaped like the mask in /public/top-mask.png, tinted with the theme colour.
 * It appears once you scroll down and rides above the footer instead of covering it.
 */
export function BackToTop() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setVisible(window.scrollY > window.innerHeight * 0.8);
      const footer = document.querySelector('footer');
      const carLane = document.querySelector('.f1-lane');
      const el = ref.current;
      if (el) {
        el.style.setProperty('--lift', '0px');
        const buttonRect = el.getBoundingClientRect();
        let lift = footer
          ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
          : 0;
        const laneRect = carLane?.getBoundingClientRect();
        const liftedTop = buttonRect.top - lift;
        const liftedBottom = buttonRect.bottom - lift;
        if (
          laneRect &&
          liftedBottom > laneRect.top &&
          liftedTop < laneRect.bottom
        ) {
          lift += liftedBottom - laneRect.top + 12;
        }
        lift = Math.min(lift, Math.max(0, window.innerHeight - buttonRect.height - 40));
        el.style.setProperty('--lift', `${Math.round(lift)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a ref={ref} className={`top${visible ? ' show' : ''}`} href="#top" aria-label="Back to top" tabIndex={visible ? 0 : -1}>
      <span className="top-eyes" aria-hidden="true" />
      <span className="top-mask" aria-hidden="true" />
    </a>
  );
}

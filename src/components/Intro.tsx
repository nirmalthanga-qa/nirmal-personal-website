import { useEffect } from 'react';
import { site } from '../data/site';

export type IntroPhase = 'in' | 'out' | 'done';

const IN_MS = 3800;
const OUT_MS = 800;

interface IntroProps {
  phase: IntroPhase;
  setPhase: (phase: IntroPhase) => void;
}

/** Full-screen name that zooms out, then fades away to reveal the landing page. Any key press or tap skips it. */
export function Intro({ phase, setPhase }: IntroProps) {
  useEffect(() => {
    if (phase === 'in') {
      const skip = () => setPhase('out');
      const timer = window.setTimeout(skip, IN_MS);
      window.addEventListener('keydown', skip);
      window.addEventListener('pointerdown', skip);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('keydown', skip);
        window.removeEventListener('pointerdown', skip);
      };
    }
    if (phase === 'out') {
      const timer = window.setTimeout(() => setPhase('done'), OUT_MS);
      return () => window.clearTimeout(timer);
    }
  }, [phase, setPhase]);

  if (phase === 'done') return null;

  const [first, ...rest] = site.name.split(' ');
  return (
    <div className={`intro ${phase}`} aria-hidden="true">
      <p className="intro-title">
        <span>{first}</span> <span>{rest.join(' ')}</span>
      </p>
      <p className="intro-quote">{site.quote}</p>
    </div>
  );
}

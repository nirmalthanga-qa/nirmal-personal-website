import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

type Msg = { from: "them" | "me"; text: string };

/** The whole conversation. "them" = visitor (left), "me" = Nirmal (right). */
const SCRIPT: Msg[] = [
  { from: "them", text: "Hi Nirmal" },
  { from: "me", text: "Hello!" },
  { from: "them", text: "When is your birthday?" },
  { from: "me", text: "Wish me on January 17" },
  { from: "them", text: "Current location?" },
  { from: "me", text: "Bengaluru" },
  { from: "them", text: "What's your blood group?" },
  { from: "me", text: "Why?" },
  { from: "them", text: "Just asking.." },
  { from: "me", text: "It's O +ve" },
  { from: "them", text: "Have you ever taken a personality test?" },
  { from: "me", text: "Yes, it's INTJ-A" },
  { from: "them", text: "What is your favorite movie?" },
  { from: "me", text: "You can see all my personal favorites below" },
  { from: "them", text: "Sure Nirmal, I will look into it" },
  { from: "me", text: "Cool, Have a good day!" },
  { from: "them", text: "Thanks You too!" },
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/* ---- dock icon glyphs ---- */
function MessagesGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5c-5 0-9 3.3-9 7.4 0 2.3 1.3 4.3 3.3 5.7-.2 1.1-.8 2.2-1.6 3 1.9-.1 3.5-.8 4.6-1.6.8.2 1.7.3 2.7.3 5 0 9-3.3 9-7.4S17 3.5 12 3.5z"
        fill="#fff"
      />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"
        fill="#fff"
      />
    </svg>
  );
}

function SpotifyGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#1ed760" />
      <g fill="none" stroke="#121212" strokeLinecap="round">
        <path d="M6.6 9.5Q12 7.9 17.5 10.2" strokeWidth="1.8" />
        <path d="M7.3 12.5Q12 11.1 16.8 13" strokeWidth="1.5" />
        <path d="M8 15.4Q12 14.3 15.9 15.7" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function SafariGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="8.6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.3"
      />
      <g transform="rotate(45 12 12)">
        <path d="M12 5.2 14.1 12H9.9z" fill="#ff3b30" />
        <path d="M12 18.8 14.1 12H9.9z" fill="#fff" />
      </g>
    </svg>
  );
}

function CameraGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.6 7.2 9.8 5h4.4l1.2 2.2z" fill="#2c2c2e" />
      <rect x="3" y="7" width="18" height="12" rx="2.6" fill="#2c2c2e" />
      <circle cx="12" cy="13" r="3.9" fill="#4a4a50" />
      <circle cx="12" cy="13" r="2.3" fill="#15151a" />
      <circle cx="17.7" cy="9.4" r="0.8" fill="#ffd60a" />
    </svg>
  );
}

export function Facts() {
  const [open, setOpen] = useState(false);
  const [max, setMax] = useState(false); // maximised = fills the whole screen
  const [minimized, setMinimized] = useState(false); // shows the "running" dot under the icon
  const [tapping, setTapping] = useState(false);
  const [done, setDone] = useState(false); // red "1" badge after the first chat closes itself
  const [origin, setOrigin] = useState("50% 100%");
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  const tokenRef = useRef(0);
  const seenRef = useRef(false); // true once the first-time chat has played (or been dismissed)
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /** Point the open/close animation at the Messages icon. */
  const measureOrigin = useCallback((maximised: boolean) => {
    const s = screenRef.current;
    const i = iconRef.current;
    if (!s || !i) return;
    const sr = s.getBoundingClientRect();
    const ir = i.getBoundingClientRect();
    // the windowed app sits 6% from the sides and 4% from the top (see .ip-chat in the CSS)
    const offX = maximised ? 0 : sr.width * 0.06;
    const offY = maximised ? 0 : sr.height * 0.04;
    setOrigin(
      `${ir.left - sr.left + ir.width / 2 - offX}px ${ir.top - sr.top + ir.height / 2 - offY}px`,
    );
  }, []);

  /** FIRST TIME ONLY: home screen -> tap Messages -> app opens -> chat plays -> app closes. */
  const play = useCallback(
    async (hold: number) => {
      const my = ++tokenRef.current;
      const dead = () => my !== tokenRef.current;

      setOpen(false);
      setMax(false);
      setMinimized(false);
      setTyping(false);
      setShown(0);
      setDone(false);

      await sleep(hold);
      if (dead()) return;

      setTapping(true);
      await sleep(500);
      if (dead()) return;

      measureOrigin(false);
      setTapping(false);
      setOpen(true);
      await sleep(3000);
      if (dead()) return;

      for (let n = 0; n < SCRIPT.length; n++) {
        const m = SCRIPT[n];
        if (m.from === "me") {
          setTyping(true);
          await sleep(1500);
          if (dead()) return;
          setTyping(false);
        } else {
          await sleep(1100);
          if (dead()) return;
        }
        setShown(n + 1);
        await sleep(m.from === "me" ? 1000 : 600);
        if (dead()) return;
      }

      seenRef.current = true; // the animated version never plays again
      await sleep(3500); // time to read the last reply
      if (dead()) return;
      setOpen(false);
      setMax(false);
      setDone(true);
    },
    [measureOrigin],
  );

  /** Tap the Messages icon. */
  const openApp = () => {
    if (open) return;

    if (!seenRef.current) {
      play(300); // first time: show the animated chat
      return;
    }

    // after that: just reopen with every message already there
    tokenRef.current++;
    measureOrigin(false);
    setTyping(false);
    setShown(SCRIPT.length);
    setDone(false);
    setMinimized(false);
    setMax(false);
    setTapping(true);
    window.setTimeout(() => setTapping(false), 450);
    setOpen(true);
  };

  /** Red button = close, yellow button = minimise (leaves a dot under the icon). */
  const dismiss = (minimize: boolean) => {
    tokenRef.current++; // stops the first-time chat if it is still running
    seenRef.current = true; // so the next open shows all messages instantly
    measureOrigin(max);
    setTyping(false);
    setOpen(false);
    setMax(false);
    setMinimized(minimize);
    setDone(false);
  };

  // first time only: start when the iPad is mostly on screen
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      seenRef.current = true;
      setOpen(true);
      setShown(SCRIPT.length);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.6) return;
        io.disconnect();
        if (!seenRef.current) play(2600);
      },
      { threshold: [0, 0.6] },
    );
    io.observe(root);

    return () => {
      tokenRef.current++;
      io.disconnect();
    };
  }, [play]);

  // keep the newest message in view
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing, open]);

  const tab = open ? 0 : -1;

  return (
    <section className="sec facts" id="facts" aria-labelledby="facts-title">
      <Reveal as="h2">
        <span className="hl">Intro</span> Chat
      </Reveal>

      <div className="ip" ref={rootRef}>
        <div className="ip-screen" ref={screenRef}>
          {/* Home screen: wallpaper + dock (Call, Messages, Spotify, Safari, Camera) */}
          <div className="ip-home">
            <div className="ip-dock">
              <span className="ip-app ip-phone" aria-hidden="true">
                <PhoneGlyph />
              </span>

              <button
                type="button"
                ref={iconRef}
                className={`ip-app ip-msgs${tapping ? " tap" : ""}`}
                aria-label="Open Messages"
                onClick={openApp}
              >
                <MessagesGlyph />
                {done && (
                  <span className="ip-badge" aria-hidden="true">
                    1
                  </span>
                )}
                {(open || minimized) && (
                  <span className="ip-run" aria-hidden="true" />
                )}
              </button>

              <span className="ip-app ip-spotify" aria-hidden="true">
                <SpotifyGlyph />
              </span>
              <span className="ip-app ip-safari" aria-hidden="true">
                <SafariGlyph />
              </span>
              <span className="ip-app ip-camera" aria-hidden="true">
                <CameraGlyph />
              </span>
            </div>
          </div>

          {/* Messages window */}
          <div
            className={`ip-chat${open ? " open" : ""}${max ? " max" : ""}`}
            style={{ transformOrigin: origin }}
            aria-hidden={!open}
          >
            <header className="ip-head">
              <div className="ip-ctl">
                <button
                  type="button"
                  className="c"
                  aria-label="Close Messages"
                  tabIndex={tab}
                  onClick={() => dismiss(false)}
                >
                  <svg viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M3.2 3.2l3.6 3.6M6.8 3.2 3.2 6.8" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="m"
                  aria-label="Minimize Messages"
                  tabIndex={tab}
                  onClick={() => dismiss(true)}
                >
                  <svg viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M2.8 5h4.4" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="x"
                  aria-label={max ? "Restore window size" : "Maximize Messages"}
                  tabIndex={tab}
                  onClick={() => setMax((v) => !v)}
                >
                  <svg viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M5 2.8v4.4M2.8 5h4.4" />
                  </svg>
                </button>
              </div>
              <span className="ip-avatar" aria-hidden="true">
                G
              </span>
              <span className="ip-name">Guest</span>
            </header>

            <div
              className="ip-list"
              ref={listRef}
              role="log"
              aria-label="Chat between a guest and Nirmal"
            >
              {SCRIPT.slice(0, shown).map((m, n) => (
                <div key={n} className={`ip-bubble ${m.from}`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div
                  className="ip-bubble me ip-typing"
                  aria-label="Nirmal is typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <div className="ip-input" aria-hidden="true">
              iMessage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

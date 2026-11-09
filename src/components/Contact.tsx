import { links } from "../data/links";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      className="sec contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <Reveal as="h2" id="contact-title">
        <span className="hl">Let's</span> Connect
      </Reveal>

      <Reveal delay={0.1} className="contact-links">
        <a
          className="social-btn"
          href={links.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5.2" />
            <circle cx="12" cy="12" r="4.2" />
            <circle className="dot" cx="17.3" cy="6.7" r="1.1" />
          </svg>
          {/* <span>Instagram</span> */}
        </a>

        <a
          className="social-btn"
          href={links.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (opens in a new tab)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          {/* <span>LinkedIn</span> */}
        </a>
      </Reveal>
    </section>
  );
}

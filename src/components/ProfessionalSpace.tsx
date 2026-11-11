import { Reveal } from "./Reveal";
import { links } from "../data/links";

export function ProfessionalSpace() {
  return (
    <section
      className="sec professional-space"
      id="professional-space"
      aria-labelledby="professional-space-title"
    >
      <Reveal as="h2">
        <span className="hl">Professional</span> Space
      </Reveal>
      <figure className="professional-space-artwork">
        <picture>
          <source srcSet="/workspace.avif" type="image/avif" />
          <img
            src="/workspace.png"
            alt="Workspace with a laptop, coffee, notebook, phone, headphones, and car key."
            width={1536}
            height={1024}
            decoding="async"
          />
        </picture>
      </figure>
      <a
        className="professional-space-portfolio"
        href={links.professionalPortfolio}
        target="_blank"
        rel="noreferrer"
      >
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="14" y="12" width="36" height="29" rx="3" />
          <path d="M8 47h48l-4 6H12z" />
          <path d="m25 27 5 5 10-11" />
        </svg>
        <span>Professional Portfolio</span>
      </a>
    </section>
  );
}

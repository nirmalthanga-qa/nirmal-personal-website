import { links } from "../data/links";
import { Reveal } from "./Reveal";
import { RoleIcons } from "./RoleIcons";
import { RoleRoller } from "./RoleRoller";

export function WhoAmI() {
  return (
    <section className="sec" id="about">
      <Reveal as="h2">
        <span className="hl">Who</span> Am I?
      </Reveal>
      <Reveal delay={0.1}>
        <RoleRoller />
      </Reveal>
      <RoleIcons
        onPortfolio={() =>
          window.open(
            links.professionalPortfolio,
            "_blank",
            "noopener,noreferrer",
          )
        }
      />
      <aside
        className="now-playing"
        aria-label="Now playing: Till I Collapse by Eminem"
      >
        <span className="now-playing-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>Now Playing: Till I Collapse - Eminem</span>
      </aside>
    </section>
  );
}

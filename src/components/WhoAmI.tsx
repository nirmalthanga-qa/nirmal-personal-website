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
    </section>
  );
}

import { site } from "../data/site";
import { Reveal } from "./Reveal";
import { Vel } from "./vel";

/** Small swatch for the colour row — filled circle tinted with the named colour. */
// function ColorDot({ color }: { color: string }) {
//   return (
//     <span
//       className="fav-dot"
//       style={{ background: color }}
//       aria-hidden="true"
//     />
//   );
// }

interface Row {
  key: string;
  label: string;
  value: string;
  extra?: React.ReactNode;
}

export function Favorites() {
  const { favorites } = site;

  const rows: Row[] = [
    { key: "god", label: "The One", value: favorites.god.name },
    {
      key: "color",
      label: "Color",
      value: favorites.color.name,
      // extra: <ColorDot color={favorites.color.name} />,
    },
    { key: "food", label: "Food", value: favorites.food },
    { key: "beverage", label: "Beverage", value: favorites.beverage },
    { key: "place", label: "Place", value: favorites.place },
    { key: "season", label: "Season", value: favorites.season },
    { key: "athlete", label: "Athlete", value: favorites.athlete },
    { key: "character", label: "Character", value: favorites.character },
    { key: "movie", label: "Movie", value: favorites.movie },
  ];

  return (
    <section
      className="sec favorites"
      id="favorites"
      aria-label="Personal Favorites"
    >
      <Reveal as="h2">
        <span className="hl">Personal</span> Favorites
      </Reveal>

      <div className="fav-layout">
        <ul className="fact-list">
          {rows.map((row, i) => (
            <Reveal as="li" key={row.key} delay={0.03 * i} className="fact">
              <span className="fact-k">{row.label}</span>
              <span className="fact-v">
                {row.value}
                {row.extra}
              </span>
            </Reveal>
          ))}
        </ul>
        <Vel />
      </div>
    </section>
  );
}

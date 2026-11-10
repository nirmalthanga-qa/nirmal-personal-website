export interface Role {
  /** Highlighted first word. */
  lead: string;
  rest: string;
}

export const site = {
  name: "NIRMAL KUMAR",

  /** Short mark shown in the header (sized to match the burger). */
  logo: "NK",

  /** Play the name-zoom intro before the landing page (skipped for visitors who prefer reduced motion). */
  intro: true,

  /** The titles that roll in the "Who Am I?" section. */
  roles: [
    { lead: "Senior", rest: " Engineer" },
    { lead: "Sketch", rest: " Artist" },
    { lead: "Automotive", rest: " Enthusiast" },
  ] satisfies Role[],

  /** Shown under the name in the intro. */
  quote: "Be Your Own Hero",

  /** The big word on the landing page. */
  welcome: {
    title: "Welcome",
  },

  /** Optional: your own picture for the menu button, placed inside the rotating ring (for example '/hamburger.png' after saving the file in /public). Leave undefined to show the hamburger bars. */
  menuIcon: "/hamburger.png" as string | undefined,

  /** Facts shown in the third section. */
  facts: {
    birthday: { month: "JANUARY", day: "17" },
    zodiac: "SCORPIO (Vedic)",
    blood: "O +ve",
    hometown: "SALEM",
    location: "BENGALURU",
    personality: "INTJ-A",
  },
  favorites: {
    god: { name: "முருகன்" },
    color: { name: "Red" },
    food: "Kothu Parotta",
    beverage: "Cafe Mocha",
    place: "Hill Stations",
    season: "Fall",
    athlete: "Lionel Messi",
    character: "Tony Stark",
    movie: "The Dark Knight Trilogy",
    automotive: "Honda",
  },
  automotive: {
    favoriteBrand: "Honda",
    favoriteBrandLogo: "/brands/honda.svg",

    topCars: [
      {
        make: "honda",
        name: "Honda Civic Type R (FL5)",
        logo: "/brands/honda.svg",
      },
      {
        make: "toyota",
        name: "Toyota Land Cruiser (100 series)",
        logo: "/brands/toyota.svg",
      },
      {
        make: "porsche",
        name: "Porsche 911 Turbo S (992.2)",
        logo: "/brands/porsche.svg",
      },
      { make: "audi", name: "Audi RS6 Avant (C8)", logo: "/brands/audi.svg" },
      { make: "bmw", name: "BMW M5 (E39)", logo: "/brands/bmw.svg" },
    ] satisfies { make: string; name: string; logo: string }[],
  },
  nav: [
    { id: "top", label: "Home" },
    { id: "about", label: "Who Am I?" },
    { id: "facts", label: "Intro Chat" },
    { id: "favorites", label: "Favorites" },
    { id: "automotive", label: "Automotive" },
    { id: "professional-space", label: "Professional Space" },
  ],
};

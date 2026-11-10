import { site } from "../data/site";

export function Footer() {
  return (
    <footer>
      <span>
        © {new Date().getFullYear()} {site.name}. ALL RIGHTS RESERVED.
      </span>
    </footer>
  );
}

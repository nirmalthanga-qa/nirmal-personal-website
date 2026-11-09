import { site } from "../data/site";

export function Footer() {
  return (
    <footer>
      <span>
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </span>
    </footer>
  );
}

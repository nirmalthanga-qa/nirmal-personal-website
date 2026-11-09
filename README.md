# Nirmal: personal website

Single-page React + TypeScript + Vite site, same stack as the portfolio.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
```

## Make it yours

- **Name, intro quote, welcome message, rolling titles, menu items:** all in `src/data/site.ts`.
- **Intro:** the name zooms out, then the landing page appears (any key press or tap skips it; it is skipped for visitors who prefer reduced motion). Set `intro: false` in `src/data/site.ts` to turn it off.
- **Header:** the name sits on the left in the same style as the headings. The menu button on the right is a rotating segmented ring. To put your own picture inside it, save the file in `public/` (for example `public/hamburger.png`) and set `menuIcon: '/hamburger.png'` in `src/data/site.ts`. While the menu is open, the picture gives way to an X so it is clear how to close it.
- **Back-to-top button:** appears after you scroll past the landing page and uses `public/back-to-top.png` (a transparent cut-out in the theme cream). Change the file or the `backToTopIcon` path in `src/data/site.ts` to use a different image.
- **Links:** the Professional Portfolio button URL and the Instagram handle are in `src/data/links.ts`.
- **Who Am I icons, back-to-top mask and footer styles:** `src/styles/extras.css` (loaded after `global.css`). The back-to-top button uses `public/top-mask.png`, a transparent cut-out of the mask that is tinted with the theme colour (`--acc`).
- **Theme:** colours are the variables at the top of `src/styles/global.css` (`--bg`, `--acc`, `--shadow`). The red and cream palette comes from your reference image.

## Deploy on Vercel

1. Push the folder to a Git repository and import it in Vercel (framework: Vite, build command `npm run build`, output `dist`).
2. In the project, open Settings → Domains and add your domain (for example `nirmal-thanga.com`).
3. Put the portfolio project on a subdomain such as `work.nirmal-thanga.com`.

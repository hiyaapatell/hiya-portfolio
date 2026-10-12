# Hiya Patel, unboxed.

An interactive React portfolio for Hiya Patel.

## Run locally

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The static output is `dist/client/`. The starter also emits a Sites-compatible Worker at `dist/server/index.js`.

## GitHub Pages

Push these files to a GitHub repository with a `main` branch, then enable **Settings → Pages → Source → GitHub Actions**. The included workflow builds and publishes `dist/client/`, with the repository’s base path configured automatically. For a custom domain, set `VITE_BASE_PATH` to `/` in the workflow.

## Edit content

- `src/App.jsx`: project descriptions, career timeline, contact links, reader notes, interaction logic.
- `src/styles.css`: visual styling and responsive layouts.
- `public/assets/`: local illustrations, fonts, project cover images, and companion variants.
- `public/Hiya-Patel-Resume.pdf`: the supplied résumé.

## Interactions

- Scroll to open the cardboard box, clear ten objects, and reveal four case-study cards.
- Click objects to remove them and hear from Pixel.
- Use the top navigation or bottom dock to move between sections.
- Read project summaries and follow links to the full projects on Behance.
- Expand packing-slip rows, read the career receipt, and open the résumé.
- Flip the reader, page through notes, and click its stickers.
- Customize Pixel’s shape, material, colour, and mood. Preferences stay in this browser.
- Take three parting gifts, toggle the optional synthesized sound, and dismiss with Escape.

## Content and asset sources

Hiya’s career, education, skills, contact information, and project claims come from the uploaded résumé. Project cover images are downloaded from Hiya’s public Behance portfolio. No performance metrics or personal hobbies were invented.

The source reference’s decorative box, object, sticker, and companion artwork is included locally for visual fidelity, with text adjusted where needed. Application code is original; the reference’s JavaScript and stylesheets are not shipped. The fonts are Google Fonts families: Bricolage Grotesque, DM Mono, Fraunces, Literata, Bungee, Yatra One, and Caveat. Before public distribution, confirm permissions for the reference artwork and follow its applicable terms.

## Scope

The four local project pages summarize the verified work and link to the full external case studies. They do not invent additional research results or reproduce every section of the reference’s unrelated case studies. Scroll choreography is an original implementation of the reference’s interaction flow, with sampled source artwork for the box opening.

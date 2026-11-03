# The Agent's Dungeon

A mobile-first, browser-based learning game about keeping AI agents safe. This
prototype uses plain HTML, CSS, and JavaScript; it has no build step, backend,
account, or personal-information requirement.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file
server. For example, if Python 3 is installed:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Stop the server with Ctrl+C.

## Project structure

- `index.html` — accessible single-page app shell and asset references.
- `css/styles.css` — shared mobile-first layout and components.
- `css/theme-terminal.css` and `css/theme-pixel.css` — separate visual themes selected by the shared game state.
- `js/game.js` — in-memory state, screen navigation, and d12 flow.
- `js/questions.js` — the three scenarios, choices, outcomes, and feedback.
- `js/ui.js` — accessible screen rendering and interactions.
- `assets/` — replaceable UX placeholder artwork.

## Replacing placeholder artwork

Replace an asset with your own file and update its reference in `index.html` or
the stylesheet if the filename or format changes. Keep meaningful alternative
text for informative images, and use empty alternative text for decorative
images. The files named `*-placeholder.svg` are simple vector stand-ins, not
final game artwork.

Placeholder assets include the game logo, favicon, guardian and assistant
portraits, d12 icon, dungeon and terminal backgrounds, instructions icon,
visual-version previews, success/defeat artwork, theme-colour JSON files, and
pixel tileset and assistant sprite. Placeholder WOFF2 fonts are original
bitmap fonts, intended to be replaced with final licensed fonts. Raster images
are valid JPEG and PNG files; SVG originals are included for editable artwork.

The project is static and can be deployed to any host that serves HTML, CSS,
JavaScript, and image files. No server-side configuration is required.

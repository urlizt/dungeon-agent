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
- `css/styles.css` — mobile-first layout and A/B visual themes.
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
visual-version previews, and success/defeat artwork. Raster background files
are provided as valid JPEG and PNG images. SVG originals are also included for
the title art, previews, and ending artwork so those placeholders can be edited
as vectors.

The project is static and can be deployed to any host that serves HTML, CSS,
JavaScript, and image files. No server-side configuration is required.

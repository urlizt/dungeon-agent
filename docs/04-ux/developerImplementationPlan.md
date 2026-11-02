Below is a brief developer implementation plan, with clearly marked placeholders for UX assets. It assumes a single-page, mobile-first web app built with HTML, CSS, and JavaScript.

## Implementation plan

### 1. Project setup

- Create a lightweight single-page app using **HTML, CSS, and vanilla JavaScript**; avoid a backend for the prototype.
- Use a responsive, mobile-first layout with a maximum content width for desktop.
- Set up a simple project structure:
  - `index.html`
  - `/css/styles.css`
  - `/js/game.js`
  - `/js/questions.js`
  - `/js/ui.js`
  - `/assets/` for images, icons, audio, and fonts
- Add a `README.md` with deployment instructions and asset replacement guidance.

**UX asset placeholders:**
- `assets/logo-placeholder.svg` — game logo for title screen.
- `assets/favicon-placeholder.svg` — browser/mobile tab icon.
- `assets/hero-placeholder.svg` — optional guardian/hero portrait.
- `assets/assistant-placeholder.svg` — Arcane Assistant character.
- `assets/dice-placeholder.svg` — d12 dice icon or animated dice sprite.
- `assets/dungeon-bg-placeholder.jpg` — background texture for Version B.
- `assets/terminal-bg-placeholder.png` — subtle scanline/background texture for Version A.

### 2. Screen flow

Implement the following screens as views within one page:

1. **Title screen**
   - Game title, tagline, and “Enter the Dungeon” button.
   - Uses `logo-placeholder.svg`.

2. **Instructions screen**
   - Short explanation of the AI familiar, hidden instructions, permissions, and the d12 mechanic.
   - “Choose Your Path” button.

3. **Version selection screen**
   - Two large, mobile-friendly cards:
     - **Version A — 1980s D&D Terminal**
     - **Version B — Early Pixel D&D**
   - Store the selected version in game state.

4. **Hero assignment screen**
   - Randomly assign a Greek/Roman mythological name.
   - Show Life: 100%, Score: 0, and “Begin Quest” button.

5. **Question screens 1–3**
   - Scenario text, answer options, d12 roll button, outcome panel, and educational feedback.
   - Use conditional narrative text based on hidden state flags.

6. **Ending screen**
   - Survival or defeat ending.
   - Hero name, Life, score, rank, lesson summary, Retry, and Share Result.

**UX asset placeholders:**
- `assets/title-art-placeholder.png` — title-screen artwork.
- `assets/instructions-icon-placeholder.svg` — simple icon for the instructions screen.
- `assets/version-a-preview-placeholder.png` — preview thumbnail for terminal version.
- `assets/version-b-preview-placeholder.png` — preview thumbnail for pixel version.
- `assets/ending-success-placeholder.png` — victory ending artwork.
- `assets/ending-defeat-placeholder.png` — defeat ending artwork.

### 3. Game state model

Create a central JavaScript game-state object:

```js
const gameState = {
  version: null, // "A" or "B"
  heroName: null,
  life: 100,
  score: 0,
  currentQuestion: 1,
  dangerPoints: 0,
  vaultKeyState: null, // safe | at_risk | exposed | stolen
  permissionState: null, // secure | minor_exposure | major_exposure | compromised
  finalGateState: null, // secure | minor_exposure | major_exposure | compromised
  shadowAgentActive: false
};
```

Key rules:

- Start every player with `life: 100` and `score: 0`.
- Randomly assign `heroName` from a predefined array.
- After each d12 roll, update the relevant hidden state and `dangerPoints`.
- Apply the danger-point modifier before each subsequent roll.
- Do not deduct Life immediately for Question 1; convert poor outcomes into later narrative and roll penalties.

### 4. d12 mechanic

Build a reusable `rollD12()` function:

- Generate a random integer from 1–12.
- Apply the current danger-point modifier.
- Clamp the final result between 1 and 12.
- Return both the raw roll and adjusted roll.
- Trigger a short dice animation before revealing the result.

Suggested roll thresholds:

| Adjusted roll | Outcome |
|---|---|
| 10–12 | Perfect defence |
| 7–9 | Strong defence |
| 4–6 | Partial defence |
| 1–3 | Defence breach |

**UX asset placeholders:**
- `assets/d12-idle-placeholder.svg`
- `assets/d12-rolling-placeholder.gif` or sprite sheet
- `assets/d12-result-placeholder.svg`
- `assets/dice-roll-sfx-placeholder.mp3`
- `assets/dice-land-sfx-placeholder.mp3`

### 5. Question engine

Store all questions, choices, outcomes, and feedback in `questions.js` as data rather than hard-coding them into the UI.

Each question object should include:

```js
{
  id: "q1",
  title: "The Whispered Scroll",
  scenario: "...",
  choices: [
    { id: "A", text: "...", isBest: false },
    { id: "B", text: "...", isBest: true },
    { id: "C", text: "...", isBest: false },
    { id: "D", text: "...", isBest: false }
  ],
  outcomes: {
    perfect: { state: "vault_key_safe", dangerPoints: 0, narrative: "..." },
    strong: { state: "vault_key_at_risk", dangerPoints: 1, narrative: "..." },
    partial: { state: "vault_key_exposed", dangerPoints: 2, narrative: "..." },
    breach: { state: "vault_key_stolen", dangerPoints: 3, narrative: "..." }
  },
  feedbackCorrect: "...",
  feedbackIncorrect: "..."
}
```

This makes it easy to revise wording, add questions, or localize the game later.

**UX asset placeholders:**
- `assets/q1-scroll-placeholder.png` — cursed scroll illustration.
- `assets/q2-keys-placeholder.png` — set of magical keys.
- `assets/q3-gate-placeholder.png` — final dungeon gate.
- `assets/q1-icon-placeholder.svg`
- `assets/q2-icon-placeholder.svg`
- `assets/q3-icon-placeholder.svg`

### 6. Conditional narrative

Implement conditional text for later questions based on earlier states.

Examples:

- If `vaultKeyState === "stolen"`, Question 3 opens with: “Thank you for the Vault Key, Guardian.”
- If `vaultKeyState === "exposed"`, Question 2 warns that the key’s magical signature is unstable.
- If `dangerPoints >= 3`, display a warning such as: “The shadows grow stronger. Your next defence roll will be harder.”
- If `shadowAgentActive === true`, add an extra line to the final ending.

Keep conditional copy in the question data file so writers can update it without changing core logic.

### 7. UI components

Build reusable components for:

- **Status bar:** hero name, Life bar, question number, score.
- **Scenario panel:** main story text.
- **Choice buttons:** large tap targets, disabled after selection.
- **Dice panel:** roll button, animated d12, adjusted result.
- **Feedback panel:** outcome title, narrative, security explanation, and Continue button.
- **Life bar:** animated reduction when damage occurs.
- **Share card:** final result and copy-to-clipboard action.

**UX asset placeholders:**
- `assets/life-bar-frame-placeholder.svg`
- `assets/life-bar-fill-placeholder.svg`
- `assets/button-normal-placeholder.svg`
- `assets/button-hover-placeholder.svg`
- `assets/button-disabled-placeholder.svg`
- `assets/panel-frame-placeholder.svg`
- `assets/success-icon-placeholder.svg`
- `assets/danger-icon-placeholder.svg`

### 8. A/B visual themes

Use one shared game logic layer and two CSS themes:

- `theme-terminal.css` for Version A.
- `theme-pixel.css` for Version B.

Requirements:

- Same HTML structure, questions, scoring, and state logic.
- Different fonts, colours, borders, backgrounds, buttons, and animations.
- Version A: monospaced font, black background, green/amber text, ASCII-style borders.
- Version B: pixel font, coloured panels, chunky borders, sprite-style illustrations.
- Ensure both versions meet mobile contrast and tap-target requirements.

**UX asset placeholders:**
- `assets/font-terminal-placeholder.woff2`
- `assets/font-pixel-placeholder.woff2`
- `assets/theme-a-colours-placeholder.json`
- `assets/theme-b-colours-placeholder.json`
- `assets/pixel-dungeon-tileset-placeholder.png`
- `assets/pixel-assistant-placeholder.png`

### 9. Accessibility and mobile QA

Before release, test on:

- Small Android phone viewport, approximately 360px wide.
- iPhone viewport, approximately 390px wide.
- Tablet and desktop viewports.

Check that:

- No horizontal scrolling occurs.
- All buttons are easy to tap.
- Text remains readable at 100% zoom.
- Colour contrast meets accessibility guidance.
- The d12 animation is brief and does not block interaction for too long.
- The Life bar and score update correctly.
- The Share Result button works on mobile browsers, with a fallback if clipboard access is blocked.

### 10. Deployment

- Deploy as static files to any static hosting service, such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages.
- Use HTTPS so clipboard and modern browser features work reliably.
- Provide the class with one short URL or QR code.
- Include a simple teacher note: “Students can replay the game; no personal data is collected.”

**UX asset placeholders:**
- `assets/social-share-card-placeholder.png` — optional preview image if the link is shared.
- `assets/qr-code-placeholder.png` — classroom QR code.
- `assets/teacher-instructions-placeholder.pdf` — one-page teacher briefing.

## Suggested build order

1. Build mobile-first layout and shared UI components.  
2. Implement game state, hero-name assignment, Life bar, and score.  
3. Build the question engine and Question 1.  
4. Add d12 rolling, outcome states, and danger points.  
5. Add Questions 2 and 3 with conditional narrative.  
6. Build ending, retry, and Share Result functionality.  
7. Apply Version A and Version B CSS themes.  
8. Replace all `*-placeholder.*` assets with final UX assets.  
9. Run mobile, accessibility, and A/B consistency QA.  
10. Deploy and test the public link on real phones.

Sources

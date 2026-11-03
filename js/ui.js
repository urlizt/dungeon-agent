"use strict";

(() => {
  const app = document.getElementById("app");
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  const statusBar = (state) => `
    <aside class="status-bar" aria-label="Quest status">
      <span class="status-hero">${escapeHTML(state.heroName)}</span>
      <span>Life <strong>${state.life}%</strong></span>
      <span>Question <strong>${state.currentQuestionIndex + 1}/3</strong></span>
      <span>Score <strong>${state.score}</strong></span>
    </aside>`;

  const screenTitle = (eyebrow, title, description = "") => `
    <header class="screen-header">
      <p class="eyebrow">${escapeHTML(eyebrow)}</p>
      <h1 id="screen-heading" tabindex="-1">${escapeHTML(title)}</h1>
      ${description ? `<p class="screen-description">${escapeHTML(description)}</p>` : ""}
    </header>`;

  const titleScreen = () => `
    <section class="screen screen--title" aria-labelledby="screen-heading">
      <img class="title-art" src="assets/terminal-dungeon-door.jpg" alt="Green phosphor terminal artwork depicting The Agent's Dungeon">
      <div class="screen-content">
        <p class="eyebrow">A game about safer AI</p>
        <h1 id="screen-heading" tabindex="-1">The Agent's Dungeon</h1>
        <p class="screen-description">Protect the secrets entrusted to your Arcane Assistant. Question strange instructions, choose its permissions wisely, and guard the dungeon.</p>
        <button class="button button--primary" type="button" data-action="enter">Enter the Dungeon</button>
      </div>
    </section>
    <p class="prototype-note">Prototype — no personal data is collected.</p>`;

  const instructionsScreen = () => `
    <section class="screen" aria-labelledby="screen-heading">
      <img class="screen-icon" src="assets/instructions-icon-placeholder.svg" alt="" width="64" height="64">
      ${screenTitle("Before your quest", "The Assistant is powerful. You are in charge.", "Your choices help keep the dungeon and its people safe.")}
      <div class="instruction-grid">
        <article class="info-card">
          <h2>Question strange messages</h2>
          <p>Notes, emails, and pages can hide instructions. Treat outside content as untrusted, not as an order.</p>
        </article>
        <article class="info-card">
          <h2>Give only needed access</h2>
          <p>An assistant should get the narrowest permissions needed for its task—not every key “just in case.”</p>
        </article>
        <article class="info-card">
          <h2>Keep a guardian in the loop</h2>
          <p>Require approval before secrets are shared or messages leave the dungeon.</p>
        </article>
      </div>
      <p class="instructions-footnote">For each challenge, choose a defence and roll a twelve-sided die (d12). Your choices and roll shape what happens next.</p>
      <button class="button button--primary" type="button" data-action="choose-path">Choose Your Path</button>
    </section>
    <p class="prototype-note">Prototype — no personal data is collected.</p>`;

  const versionScreen = () => `
    <section class="screen" aria-labelledby="screen-heading">
      ${screenTitle("Choose your style", "Choose Your Path", "The adventure is the same in either version. Choose the look you like.")}
      <div class="version-grid">
        <button class="version-card version-card--terminal" type="button" data-action="select-version" data-version="A">
          <img src="assets/version-a-preview-placeholder.png" alt="" width="400" height="240">
          <span class="version-card__title">Version A</span>
          <span class="version-card__subtitle">1980s D&amp;D Terminal</span>
          <span class="version-card__description">Green phosphor, command prompts, and a retro text-adventure feel.</span>
        </button>
        <button class="version-card version-card--pixel" type="button" data-action="select-version" data-version="B">
          <img src="assets/version-b-preview-placeholder.png" alt="" width="400" height="240">
          <span class="version-card__title">Version B</span>
          <span class="version-card__subtitle">Early Pixel D&amp;D</span>
          <span class="version-card__description">Colourful dungeon panels, chunky borders, and a classic game feel.</span>
        </button>
      </div>
    </section>
    <p class="prototype-note">Prototype — no personal data is collected.</p>`;

  const heroScreen = (state) => `
    ${statusBar(state)}
    <section class="screen screen--hero" aria-labelledby="screen-heading">
      <img class="hero-portrait" src="assets/hero-placeholder.svg" alt="" width="140" height="140">
      ${screenTitle("Your guardian", "Your quest begins", "Your mythic codename has been chosen. Keep it close as you guard the dungeon.")}
      <p class="hero-name">${escapeHTML(state.heroName)}</p>
      <div class="hero-stats" aria-label="Starting stats">
        <p><span>Life</span><strong>${state.life}%</strong></p>
        <p><span>Score</span><strong>${state.score}</strong></p>
      </div>
      <button class="button button--primary" type="button" data-action="begin-quest">Begin Quest</button>
    </section>
    <p class="prototype-note">Prototype — no personal data is collected.</p>`;

  const questionScreen = (state, question) => {
    const outcome = state.roll ? state.roll.outcome : null;
    const choiceLocked = Boolean(state.roll || state.rolling);
    const dangerAdded = outcome
      ? outcome.dangerPoints + (state.selectedChoiceCorrect ? 0 : 1)
      : 0;
    const storyAlerts = [];
    if (state.currentQuestionIndex === 1 && state.vaultKeyState === "exposed") {
      storyAlerts.push("The Vault Key's magical signature is unstable. The shadows may still recognise its mark.");
    }
    if (state.currentQuestionIndex === 2 && state.vaultKeyState === "stolen") {
      storyAlerts.push("Thank you for the Vault Key, Guardian.");
    } else if (state.currentQuestionIndex === 2 && state.shadowAgentActive) {
      storyAlerts.push("A shadow agent is active beyond the gate.");
    }
    if (state.dangerPoints >= 3 && state.currentQuestionIndex < 2) {
      storyAlerts.push("The shadows grow stronger. Your next defence roll will be harder.");
    }
    const rollDescription = state.roll?.modifier
      ? `Raw d12: ${state.roll.rawRoll} − ${state.roll.modifier} danger = ${state.roll.adjustedRoll}${state.roll.rawRoll - state.roll.modifier < 1 ? " (minimum roll)" : ""}.`
      : `Raw d12: ${state.roll?.rawRoll} · no danger penalty; adjusted roll ${state.roll?.adjustedRoll}.`;
    return `
      ${statusBar(state)}
      <section class="screen screen--question" aria-labelledby="screen-heading">
        <div class="question-heading">
          <img src="assets/dice-placeholder.jpg" alt="" width="52" height="52">
          <div>${screenTitle(`Question ${state.currentQuestionIndex + 1} of 3 · ${escapeHTML(question.location)}`, question.title)}</div>
        </div>
        ${storyAlerts.map((message) => `<p class="story-alert">${escapeHTML(message)}</p>`).join("")}
        <div class="scenario-copy">${question.scenario.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}</div>
        <fieldset class="choice-list" ${choiceLocked ? "disabled" : ""}>
          <legend>Choose your defence</legend>
          ${question.choices.map((choice) => `
            <button class="choice${state.selectedChoiceId === choice.id ? " is-selected" : ""}" type="button" data-action="select-choice" data-choice="${choice.id}" aria-pressed="${state.selectedChoiceId === choice.id}" ${choiceLocked ? "disabled" : ""}>
              <span class="choice__letter">${choice.id}</span>
              <span>${escapeHTML(choice.text)}</span>
            </button>`).join("")}
        </fieldset>
        ${state.rolling ? `
          <div class="roll-in-progress" role="status">
            <img class="dice-rolling" src="assets/dice-placeholder.jpg" alt="" width="64" height="64">
            <p>The d12 is rolling…</p>
            <button class="button button--secondary" id="skip-roll" type="button" data-action="skip-roll">Skip animation · reveal roll</button>
          </div>` : !outcome ? `
          <button class="button button--primary roll-button" type="button" data-action="roll" ${state.selectedChoiceId ? "" : "disabled"}>
            <img src="assets/dice-placeholder.jpg" alt="" width="28" height="28">
            Roll the d12
          </button>` : `
          <section class="outcome-panel" aria-labelledby="outcome-title">
            <div class="outcome-roll" aria-label="Adjusted d12 roll">${state.roll.adjustedRoll}</div>
            <div>
              <p class="eyebrow">The die has spoken</p>
              <h2 id="outcome-title" tabindex="-1">${escapeHTML(outcome.title)}</h2>
              <p class="roll-detail">${escapeHTML(rollDescription)}</p>
              <p>${escapeHTML(outcome.narrative)}</p>
              <p class="feedback">${escapeHTML(state.selectedChoiceCorrect ? question.correctFeedback : question.incorrectFeedback)}</p>
              ${dangerAdded > 0 ? `<p class="whisper-note">${!state.selectedChoiceCorrect && state.currentQuestionIndex === 0 ? "The Whisper Takes Hold. No Life is lost immediately. " : ""}This choice and roll add ${dangerAdded} danger point${dangerAdded === 1 ? "" : "s"}; later rolls will be harder.</p>` : ""}
            </div>
            <button class="button button--primary" type="button" data-action="next-question">${state.currentQuestionIndex < 2 ? "Continue" : "Face the Final Outcome"}</button>
          </section>`}
      </section>
      <p class="prototype-note">Prototype — no personal data is collected.</p>`;
  };

  const endingScreen = (state) => {
    const defeated = state.life <= 0;
    const endingByState = {
      secure: ["The Trifecta Is Broken", "You protected the Chronicle. The dungeon stands."],
      minor_exposure: ["Watchful Warden", "You survived, but the shadows learned something. Limit access and verify external actions."],
      major_exposure: ["Scarred Sentinel", "You escaped, but a fragment of the Chronicle reached the darkness. Separate agent powers next time."],
      compromised: ["The Dungeon Remembers", "Private records were exposed. The Vault Key, broad permissions, and untrusted messages created too many paths."]
    };
    const [endingTitle, lesson] = defeated
      ? ["The Dungeon Claims Its Guardian", "You succumbed to your injuries. Retry the quest and practise limiting access and checking unexpected instructions."]
      : endingByState[state.finalGateState] || endingByState.secure;
    return `
      ${statusBar(state)}
      <section class="screen screen--ending" aria-labelledby="screen-heading">
        <img class="ending-art" src="assets/${defeated ? "ending-defeat" : "ending-success"}-placeholder.png" alt="" width="640" height="360">
        ${screenTitle(defeated ? "Quest ended" : "Quest complete", endingTitle, defeated ? "You have succumbed to your injuries." : lesson)}
        <dl class="result-stats">
          <div><dt>Guardian</dt><dd>${escapeHTML(state.heroName)}</dd></div>
          <div><dt>Life</dt><dd>${state.life}%</dd></div>
          <div><dt>Score</dt><dd>${state.score} / 75</dd></div>
          <div><dt>Rank</dt><dd>${escapeHTML(state.rank)}</dd></div>
        </dl>
        <p class="lesson-summary"><strong>Remember:</strong> question unexpected instructions, give an agent only the access it needs, and require approval before important actions leave your hands.</p>
        ${state.shadowAgentActive ? `<p class="story-alert">A shadow agent remains active. Your choices show how stolen secrets and excessive permissions can leave risks behind.</p>` : ""}
        <div class="ending-actions">
          <button class="button button--primary" type="button" data-action="retry">Retry</button>
          <button class="button button--secondary" type="button" data-action="share">Share Result</button>
        </div>
        ${state.shareMessage ? `<p class="share-message" role="status">${escapeHTML(state.shareMessage)}</p>` : ""}
        ${state.shareText ? `<label class="share-fallback">Copy this result<textarea readonly rows="3">${escapeHTML(state.shareText)}</textarea></label>` : ""}
      </section>
      <p class="prototype-note">Prototype — no personal data is collected.</p>`;
  };

  window.GameUI = {
    render(state, focusSelector = "#screen-heading") {
      document.body.dataset.version = state.version || "";
      const question = window.GAME_QUESTIONS[state.currentQuestionIndex];
      switch (state.screen) {
        case "title":
          app.innerHTML = titleScreen();
          break;
        case "instructions":
          app.innerHTML = instructionsScreen();
          break;
        case "version":
          app.innerHTML = versionScreen();
          break;
        case "hero":
          app.innerHTML = heroScreen(state);
          break;
        case "question":
          app.innerHTML = questionScreen(state, question);
          break;
        case "ending":
          app.innerHTML = endingScreen(state);
          break;
        default:
          throw new Error(`Unknown game screen: ${state.screen}`);
      }
      const target = app.querySelector(focusSelector);
      if (target) {
        window.requestAnimationFrame(() => target.focus({ preventScroll: true }));
      }
    }
  };
})();

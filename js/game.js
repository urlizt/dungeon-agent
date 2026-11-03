"use strict";

(() => {
  const heroNames = [
    "Ariadne the Sentinel",
    "Orion of the Archive",
    "Minerva the Warden",
    "Perseus the Gatekeeper",
    "Cassandra the Seer",
    "Atlas the Vaultkeeper"
  ];

  const createGameState = (version = null) => ({
    screen: "title",
    version,
    heroName: null,
    life: 100,
    score: 0,
    rank: null,
    currentQuestionIndex: 0,
    dangerPoints: 0,
    selectedChoiceId: null,
    selectedChoiceCorrect: false,
    roll: null,
    pendingRoll: null,
    rolling: false,
    vaultKeyState: null,
    permissionState: null,
    finalGateState: null,
    shadowAgentActive: false,
    shareMessage: "",
    shareText: ""
  });

  let state = createGameState();
  let rollAnimationTimer = null;
  const diceAnimationDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 800;

  const render = (focusSelector) => window.GameUI.render(state, focusSelector);
  const beginNewGame = (version) => {
    if (rollAnimationTimer !== null) {
      window.clearTimeout(rollAnimationTimer);
      rollAnimationTimer = null;
    }
    state = createGameState(version);
    state.heroName = heroNames[Math.floor(Math.random() * heroNames.length)];
    state.screen = "hero";
    render();
  };

  const findOutcome = (question, roll) => question.outcomes.find((outcome) => roll >= outcome.minimum);
  const dangerModifier = () => state.dangerPoints >= 5 ? 3
    : state.dangerPoints >= 3 ? 2
      : state.dangerPoints >= 1 ? 1
        : 0;
  const clampD12 = (roll) => Math.min(12, Math.max(1, roll));
  const rollD12 = () => {
    const rawRoll = Math.floor(Math.random() * 12) + 1;
    const modifier = dangerModifier();
    return {
      rawRoll,
      modifier,
      adjustedRoll: clampD12(rawRoll - modifier)
    };
  };
  const rankForResult = () => state.life <= 0 ? "Defeated by the Agent"
    : state.score === 75 && state.life === 100 ? "Legendary AI Guardian"
      : state.score >= 50 ? "Skilled Dungeon Warden"
        : state.score >= 25 ? "Apprentice Sentinel"
          : "Lucky Survivor";

  const revealRoll = () => {
    if (!state.pendingRoll || !state.rolling) return;
    if (rollAnimationTimer !== null) {
      window.clearTimeout(rollAnimationTimer);
      rollAnimationTimer = null;
    }
    const question = window.GAME_QUESTIONS[state.currentQuestionIndex];
    const choice = question.choices.find((item) => item.id === state.selectedChoiceId);
    const { rawRoll, adjustedRoll, modifier } = state.pendingRoll;
    const outcome = findOutcome(question, adjustedRoll);
    if (!outcome) throw new Error(`No outcome is defined for adjusted d12 roll ${adjustedRoll}.`);

    state.selectedChoiceCorrect = Boolean(choice?.best);
    if (state.selectedChoiceCorrect) state.score += 25;
    state[question.stateKey] = outcome.state;
    state.shadowAgentActive ||= outcome.state === "stolen" || outcome.state === "compromised";
    state.dangerPoints += (state.selectedChoiceCorrect ? 0 : 1) + outcome.dangerPoints;
    state.roll = { rawRoll, adjustedRoll, modifier, outcome };
    state.pendingRoll = null;
    state.rolling = false;
    render("#outcome-title");
  };

  const shareResult = async () => {
    const survived = state.life > 0;
    const message = survived
      ? `I survived The Agent's Dungeon as ${state.heroName} with ${state.life}% Life — Rank: ${state.rank}.`
      : `I played The Agent's Dungeon as ${state.heroName} — Rank: ${state.rank}.`;
    state.shareText = message;
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard access is unavailable in this browser.");
      }
      await navigator.clipboard.writeText(message);
      state.shareMessage = "Your result was copied. Share it with your friends!";
    } catch (error) {
      console.warn("Could not copy the share result.", error);
      state.shareMessage = "Your browser could not copy the result automatically. Select the text below and copy it.";
    }
    render("#share-fallback textarea, #screen-heading");
  };

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || button.disabled) return;

    switch (button.dataset.action) {
      case "enter":
        state.screen = "instructions";
        render();
        break;
      case "choose-path":
        state.screen = "version";
        render();
        break;
      case "select-version":
        beginNewGame(button.dataset.version);
        break;
      case "begin-quest":
        state.currentQuestionIndex = 0;
        state.screen = "question";
        render();
        break;
      case "select-choice": {
        if (state.roll || state.rolling) return;
        state.selectedChoiceId = button.dataset.choice;
        render(`[data-choice="${state.selectedChoiceId}"]`);
        break;
      }
      case "roll": {
        if (!state.selectedChoiceId || state.roll || state.rolling) return;
        state.pendingRoll = rollD12();
        state.rolling = true;
        render("#skip-roll");
        rollAnimationTimer = window.setTimeout(revealRoll, diceAnimationDuration);
        break;
      }
      case "skip-roll":
        revealRoll();
        break;
      case "next-question":
        if (state.currentQuestionIndex < window.GAME_QUESTIONS.length - 1) {
          state.currentQuestionIndex += 1;
          state.selectedChoiceId = null;
          state.selectedChoiceCorrect = false;
          state.roll = null;
          state.screen = "question";
        } else {
          state.screen = "ending";
          state.finalGateState = state.finalGateState || "secure";
          state.rank = rankForResult();
        }
        render();
        break;
      case "retry":
        beginNewGame(state.version);
        break;
      case "share":
        await shareResult();
        break;
      default:
        throw new Error(`Unknown game action: ${button.dataset.action}`);
    }
  });

  render();
})();

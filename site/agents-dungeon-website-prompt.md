# Project: The Agent's Dungeon
## Create a modern gaming website and landing page

### 1. Project overview

Build a polished, production-quality marketing website for **The Agent's Dungeon**, an interactive browser-based game exploring AI agent safety.

**Source repository:**
https://github.com/urlizt/dungeon-agent

**Visual inspiration:**
https://afkpilot.com/

The website has three equally important objectives:

1. **Attract players:** Make visitors curious enough to play the game.
2. **Educate:** Explain AI agent safety through an approachable, interactive gaming concept.
3. **Showcase:** Present the project as an interesting AI, game development and experimentation project.

This is a standalone marketing website. The existing game must remain a separate application.

### 2. Start by exploring the repository

Before implementing anything:

- Clone or inspect the GitHub repository.
- Read the README and inspect all source files.
- Understand the existing gameplay, mechanics, scenarios, characters and themes.
- Identify the game's actual entry point and deployment requirements.
- Review all available images, artwork, icons and assets.
- Identify opportunities to reuse existing game assets in the marketing website.

Produce a short implementation plan before making changes.

Do not modify or break the existing game.

### 3. Architecture

The marketing website and game must be separate.

Requirements:

- Build an independent landing page.
- Preserve the existing game implementation.
- The landing page must not require the game to be embedded or loaded to function.
- Play Now must navigate to the actual game.
- Keep the game URL configurable rather than hardcoding an assumed deployment address.
- If the game is not currently deployed, document the required configuration.
- Keep the marketing site independently deployable.
- Avoid unnecessary frameworks, backend services or dependencies.

Recommend an appropriate repository structure after inspecting the existing project.

### 4. Visual design

Use AFK Pilot as the primary design inspiration.

Do not copy its branding, assets or content. Create an original visual identity for The Agent's Dungeon.

**Desired aesthetic: Modern gaming meets retro dungeon adventure.**

Visual characteristics:

- Modern, clean and spacious website layout.
- Strong, oversized typography.
- Dark, atmospheric dungeon-inspired backgrounds.
- Pixel-art characters and environmental details.
- Subtle terminal-inspired elements.
- Carefully chosen accent colours.
- Strong visual hierarchy.
- Interesting transitions and micro-interactions.
- Polished desktop and mobile experiences.

The website should feel like an indie game launch, not a generic SaaS landing page.

Use the existing game's visual identity as a foundation, but elevate the presentation.

Avoid excessive gradients, generic AI imagery, unnecessary glassmorphism and clutter.

### 5. Website content and sections

#### A. Navigation

Create a simple, persistent navigation bar.

Include:
- The Agent's Dungeon branding.
- The Game.
- How to Play.
- About.
- GitHub.
- A prominent Play Now button.

#### B. Hero section

This is the most important section.

Create an immediate visual impression.

Include:
- A compelling headline about entering the dungeon and surviving as an AI agent.
- A concise explanation of the game.
- Primary CTA: PLAY NOW.
- Secondary CTA: EXPLORE THE DUNGEON.
- A distinctive visual featuring the game's characters, dungeon or environment.

The headline and copy should be original, memorable and slightly playful.

The visitor should understand within five seconds what the game is about.

#### C. The concept

Explain the central idea:

AI agents operate in environments where decisions have consequences. Players explore the challenges of keeping agents safe through interactive scenarios.

Make the connection between gameplay and real-world AI agent safety understandable without becoming overly technical.

#### D. How to play

Explain the gameplay using a simple visual sequence.

Use the actual mechanics discovered in the repository.

Introduce:
- The scenarios.
- Player decisions.
- The d12 mechanic.
- Consequences and outcomes.
- The objective of each challenge.

Use diagrams, illustrations or visual storytelling where useful.

#### E. Explore the game

Showcase the actual game features.

Include:
- The three existing learning scenarios.
- Terminal and pixel-art visual themes.
- Guardian and assistant characters.
- Interactive decisions.
- Success and defeat outcomes.

Use real screenshots and assets wherever possible.

Do not fabricate screenshots or features.

#### F. Why agent safety matters

Include a short educational section connecting the game to real AI concepts.

Potential topics, where supported by the actual game:
- Agent autonomy.
- Decision-making.
- Permissions and boundaries.
- Human oversight.
- Risk and consequences.
- Safe agent behaviour.

Keep this accessible and engaging.

#### G. Project showcase

Present the project as an open-source experiment.

Include:
- A link to the GitHub repository.
- A short project description.
- The technology stack, based on the actual source code.
- An invitation to explore, contribute or experiment.

Do not invent development statistics, community numbers or project achievements.

#### H. Final call to action

Finish with a visually strong section.

Suggested messaging:

"READY TO ENTER THE DUNGEON?"

Invite visitors to play and discover whether they can keep their AI agent alive.

Include a prominent PLAY NOW button.

#### I. Footer

Include:
- Project branding.
- GitHub link.
- Navigation links.
- Relevant credits.
- Copyright information where appropriate.

### 6. Copywriting and tone

The tone should be:

- Playful but intelligent.
- Slightly irreverent.
- Technically credible.
- Accessible to people unfamiliar with AI.
- Consistent with an indie gaming brand.

Use short, memorable headlines.

Avoid corporate marketing language and generic AI hype.

The website should appeal to both gaming enthusiasts and people interested in AI agents.

### 7. Technical implementation

- Mobile-first responsive design.
- Semantic HTML.
- Accessible navigation and controls.
- Good keyboard accessibility.
- Optimised images and assets.
- Fast page loading.
- SEO-friendly page structure and metadata.
- Social sharing metadata and Open Graph image.
- Appropriate favicon.
- Sensible asset organisation.
- No unnecessary external dependencies.
- No unnecessary analytics or tracking.

Use the existing technology stack where practical. If a different framework is justified, explain why before adopting it.

### 8. Quality assurance

Test the completed website.

Verify:

- Desktop layout.
- Mobile layout.
- Navigation.
- All CTA links.
- GitHub links.
- Play Now destination.
- Image loading.
- Accessibility basics.
- Browser console.
- Existing game functionality.

Ensure the landing page works independently of the game.

### 9. Deployment

Provide straightforward deployment instructions.

Prefer a lightweight static hosting solution compatible with the chosen implementation.

Document:
- How to run locally.
- How to configure the game URL.
- How to build the website.
- How to deploy it.
- How to update the website independently of the game.

Do not deploy or publish anything without explicit authorisation.

### 10. Deliverables

Produce:

1. Complete working marketing website.
2. Responsive desktop and mobile layouts.
3. Reusable components and organised assets.
4. Updated README.
5. Local development instructions.
6. Deployment instructions.
7. Summary of files created and modified.
8. QA results and any outstanding issues.

### 11. Implementation approach

Work in the following stages:

**Stage 1: Discovery**
Inspect the repository, existing game and assets.

**Stage 2: Design**
Establish the visual system, page structure, typography, colours and key components.

**Stage 3: Implementation**
Build the standalone marketing website.

**Stage 4: Refinement**
Review the visual result and improve spacing, typography, imagery, interactions and responsiveness.

**Stage 5: Testing**
Test the landing page and verify the original game remains unaffected.

**Stage 6: Handover**
Document the implementation, configuration and deployment.

Do not stop after producing a wireframe or design proposal. Complete the working implementation.

### Final design objective

Create a website that makes someone think:

"I want to play this."

Then, once they've played:

"I actually learned something about AI agent safety."

And for developers:

"That's an interesting project. I want to see how it works."

The finished result should look and feel like a real indie game launch, with its own identity, rather than a basic project README converted into a webpage.
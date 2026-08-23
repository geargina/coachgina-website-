# Voice and brand

**MIRROR.** The canonical source is the vault brand bible at `03-work/coach-gina/linkedin/linkedin-content-brand-bible.md` plus `voice-patterns.md`. Re-sync this file when those change. It lives here because vault rules do not load if you open Claude directly in `~/Sites/coachgina-website`.

## Who this is for

APAC professionals who are **new to AI**, Singapore and Malaysia and the Philippines first. Explicitly not deep-technical builders, not US or EU corporate audiences.

## The 3Ps

**Pain.** Non-technical people facing the mental hurdle of learning AI. She simplifies it and makes the journey from chat to agentic smoother and more fun.

**Person.** Three distinct buyers:
1. Non-technical individuals
2. Institutions building a culture of AI adoption in their teams
3. Training partners who already run classes and want an AI trainer in their catalogue

**Promise.** Simplify it, keep it fun and hands-on. The proof is personal: she came to AI without a technical background, so anyone can. Positioning her as the person who crossed over beats positioning her as an expert who learned to teach, and it makes volume claims unnecessary. The proof is the crossing, not the count.

**The spine: chat to agentic.** A ladder, not a slogan. It maps onto the real product: Masterclass L1 covers Projects and Cowork, L2 covers Claude Code, and the API vs MCP post is the concept piece underneath. Use it to sequence pages.

## Hard bans

These keep regressing. Treat them as absolute.

**Dashes.** No em-dashes (—), no en-dashes (–), no spaced-hyphen separators ( - ). Exceptions: hyphenated compounds ("few-shot", "hands-on") and numeric ranges, though "1 to 2 hrs" is preferred over "1-2 hrs".

**Staccato triplets.** Banned shape: "Not X. Not Y. Not Z." The ban extends to two-item negation lists, and to any run of 3 similar-length short sentences even without parallel structure. Break into 2 or 4. Comma-cascade prose across line breaks is her actual cadence and is fine.

**AI-reflective filler.** "your story resonates", "that hit close to home", "real impact", "at the end of the day".

**Setup-phrase openers.** "Here's what happened...", "Let me tell you...", "I'm about to share...", "Today I want to talk about...", "A friend reminded me...".

**Buzzy figurative verbs.** unlocks, leverages, elevates, delves, seamless, supercharge, harness, dive in, game-changer, lands / landing. Use plain phrasing.

**Retired phrases.** "Not going to lie..." (banned 26 Jun 2026).

**Self-naming in body copy.** "I'm Geargina...", "As Coach Gina...". The page already says who she is.

## Cadence

- Digits, not words. "3 hrs" not "three hours". "21 attendees" not "twenty-one".
- ALL CAPS for emphasis, sparingly, 1 or 2 words. Never bold or italic.
- Ellipsis for a pause, never a dash.
- **Kill the best line.** If a line would look good on a coffee mug, plainify it. The real test is whether a line *performs* or *states*. Plain-true payoff lines survive even when punchy.
- Grammatical looseness and Singapore-English phrasing are intentional. Do not auto-correct them into neutral corporate prose.

## Design tokens

Defined in `assets/site.css` `:root`. Do not hardcode hex values anywhere else.

```
--bg:#0f2a20   --bg-2:#082018   --card:#12382a   --card-2:#0b2a1f
--ink:#f2ecd8  --ink-dim:#b9c9bd  --ink-mute:#6f8577
--line:rgba(242,236,216,0.10)   --line-2:rgba(242,236,216,0.18)
--yellow:#f7d046   --yellow-ink:#1a1405
--f-display:"Archivo"   --f-body:"Inter"   --f-mono:"JetBrains Mono"
--maxw:1240px   --pad-x:32px
```

Deep forest green ground, cream ink, mustard accent. Archivo 900 for display, Inter for body, JetBrains Mono for the uppercase eyebrow and chip labels. The site is dark-only; `[data-theme="neon"]` and `[data-theme="warm"]` are dev experiments driven by the tweaks panel, not a real light mode.

Reusable classes: `.wrap`, `section.s`, `.eyebrow`, `h2.sec`, `.offer`, `.offer.featured`, `.testi-card`, `.chip`, `.tag`, `.btn`, `.btn.ghost`, `.help-grid`, `.blog-grid`.

**Note for any redesign:** the body font is Inter, which the "avoid generic AI aesthetics" guidance in the vault's `05-resources/ai-design-website-toolkit.md` names as an overused font to avoid. Worth revisiting deliberately rather than by accident.

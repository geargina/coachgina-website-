# SEO and AEO conventions

What this site already does, and the rules for keeping it consistent. Procedure for publishing lives in the vault `coachgina-web` skill; the shapes live here.

## Current state

Better than most. Every page has a title, meta description, canonical, and full Open Graph plus Twitter tags.

Schema in use:
- `index.html`: an `@graph` with `Person`, `Organization`, `WebSite` and 4 `Service` blocks, plus a `VideoObject` for the trailer and a 6-question `FAQPage` that mirrors the visible `#faq` section. The homepage FAQ was cut from 10 invisible questions to 6 visible ones on 4 Sep 2026.
- `speaking.html`: `WebPage` + `BreadcrumbList` + `FAQPage` (5, mirrored)
- `ai-workshops-singapore.html`, `claude-workshop-singapore.html`: `WebPage` (with `dateModified`) + `BreadcrumbList` + `FAQPage` (4 and 3, mirrored) + `Service` references by `@id`
- `case-study-*.html`: `Article` + `BreadcrumbList`; `case-studies.html`: `CollectionPage`
- `links.html`: minimal `WebPage`, indexable, self-canonical
- `contact.html`: `ContactPage`
- `blog/index.html`: `Blog`
- every post: `BlogPosting` + `BreadcrumbList`

`robots.txt` explicitly allows GPTBot, ChatGPT-User, Claude-Web, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and CCBot. Keep it that way; being citable by answer engines is the point.

## Rules

**Never add `aggregateRating` or `Review` schema.** There is no rating data. The site previously showed a fabricated "5.0 average" and that must not return in machine-readable form.

**The FAQ schema is the copy answer engines quote verbatim.** Change it in the same commit as the visible copy it describes, never in a follow-up. Stale FAQ answers keep getting asserted long after the page changes.

**No FAQ schema without a visible twin.** Every Question in JSON-LD has a matching `<details><summary>` on the page with identical text. Google's guidance treats markup that does not reflect on-page content as a violation, and invisible FAQ was the one thing this site did that the vendored AI-optimisation guide warns against.

**Dated promotional video.** A trailer that names a cohort date lives in one isolated section (`#trailer`) with its own claims-register row carrying an expiry. Delete the whole section after the date rather than editing around it. `VideoObject.uploadDate` is the date it went live on this site.

**`Service` descriptions must match the visible offer copy exactly**, including price. If the visible card says "scoped per team", the schema does not carry a number.

**No `Event` or `Course` schema for past sessions.** The Aug 2026 masterclass was Cogentic-branded and registration lived on cogentic-ai.com, so Event schema here would describe someone else's page's event after the fact and invite "expired event" flags. Revisit only when Level 2 has a confirmed date **and** a landing page on this domain.

**`@id` contract (9 Sep 2026).** Five reusable nodes are DEFINED once, on the homepage, and only REFERENCED everywhere else: `https://geargina.com/#svc-masterclass`, `https://geargina.com/#svc-team`, `https://geargina.com/#svc-partner`, `https://geargina.com/#svc-coaching`, `https://geargina.com/#video-trailer`. Plus the existing `#gina`, `#org`, `#website`. A reference is `{"@type": "Service", "@id": "https://geargina.com/#svc-team", "name": "Team Workshops"}` (type, id, name only, so the Rich Results Test does not flag a missing field). Never redefine a description or price on a second page; that is how two versions of one offer end up in the index.

**FAQ contract (9 Sep 2026).** The homepage carries 8 questions. `ai-workshops-singapore.html` carries 4, `claude-workshop-singapore.html` 3, `speaking.html` 5. No question text appears on two pages. Every answer is 40 to 80 words and its first sentence is the answer. No self-referential superlative ("best AI workshop facilitator") is ever asked or answered on this domain; "How do I choose an AI workshop facilitator in Singapore?" is answered as an honest checklist.

**Intent pages carry first-hand delivery detail.** A page earns its URL by holding things the homepage cannot: the run sheet, the scoping questions, the survey instrument, a formats table, what went wrong and what changed, screenshots of her own setup. No location swaps, no tool swaps, no rewording of an offer card into a page. Two intent pages exist (`ai-workshops-singapore.html`, `claude-workshop-singapore.html`); a third needs 60 days of Search Console data first.

**Title ownership.** The homepage title is the person ("Geargina Tan | AI Workshop Facilitator, Singapore | Coach Gina"). The hub owns "AI Workshops in Singapore". The Claude page owns "Claude Workshop in Singapore". Two pages never share a head term.

**Case studies** are flat root files (`case-study-*.html`, indexed by `case-studies.html` as a `CollectionPage`) with `Article` schema: `headline`, `image` at least 1200px wide, `datePublished`, `dateModified`, `author` → `#gina`, `publisher` → `#org`, `mainEntityOfPage`, plus `BreadcrumbList`. Never `Review` or `aggregateRating`. Facts only from the register; a client with no cleared quote gets no testimonial block.

**Recency.** After every delivered event: the Speaking page stage moves from upcoming to past, its visible "Last updated" line and sitemap `lastmod` bump, and the hub's "Last updated" bumps when its proof changes. Pages under 3 months old are cited far more often; an edit that changes facts earns the bump, a cosmetic edit does not.

**Do not hand-bump `lastmod` on posts whose content did not change.** Fake freshness churn is a known negative signal.

**AEO structure for any explainer post:** direct answer in the first paragraph, H2s phrased as the questions a real person would type, a definition block, and a comparison table where two things are being distinguished. Add `FAQPage` to a post only when it genuinely answers question-shaped queries, and lift the answers from the body so page text and schema agree.

## Alt text formula

Under 320 characters. Entity-anchor the opening, name the exact image title, describe the visual for crawlers, weave a long-tail phrase, close with a Singapore-AI search phrase.

> Hand-drawn sketch by Geargina Tan (Coach Gina), Singapore's AI expert and COO of WTFox.ai: "API vs MCP, explained simply". Tangled cables from app boxes into a robot show one-by-one API connections; a single USB-C hub below shows MCP as the one universal plug. AI training for teams in Singapore.

Use the full entity-anchored opening on the 3 or 4 images that matter (About portrait, workshop photos, post covers). Shorter descriptive alt is fine elsewhere. Video covers cannot take alt text.

## Publishing a blog post: the 4-file sync

There is no build step and nothing is generated. Miss a file and the post is invisible or the feed drifts.

1. **`blog/<slug>.html`** from `post-template.html`. Fill all 9 tokens: `{{SLUG}} {{TITLE}} {{DESCRIPTION}} {{KEYWORDS}} {{IMAGE_FILE}} {{CATEGORY}} {{READ_TIME}} {{DATE_ISO}} {{DATE_DISPLAY}}`. Remove the template comment block.
2. **`blog/index.html`** gets a `.post` card, newest first.
3. **`sitemap.xml`** gets a `<url>` with `lastmod`, `changefreq`, `priority`.
4. **`blog/feed.xml`** gets an `<item>` (title, link, guid, pubDate in RFC-822, category, description) and its `lastBuildDate` updated.
5. Optional: swap a card in the homepage `#blog` teaser grid, and bump the homepage `lastmod` if you do.

Category is display text plus `articleSection` plus the feed `<category>`. It has no CSS dependency, so adding a new one is safe.

Covers live in **`assets/img/`**. **Cover images are forced to 16:9 with `object-fit:cover`.** Portrait source art must be composed onto a 16:9 canvas first (1920x1080, matching background) or the crop cuts through the middle of the image.

**`.article .body` has no `table` styles.** A post needing a table carries a scoped `<style>` in its own head rather than forcing a `?v=` bump across every file.

## Verification before push

```
xmllint --noout sitemap.xml blog/feed.xml
```

Then extract each JSON-LD block and parse it, run `render-check` at 1440x900 and 390x844, and run the constraint grep from `voice-and-brand.md`. After push: curl the live URL, confirm the feed and sitemap contain it, confirm `context/` still 404s, and run the live URL through validator.schema.org.

Vercel Analytics: `/_vercel/insights/script.js` 404s until Web Analytics is enabled in the project. Whitelist that one failed request in QA.

## Known gaps, worth doing

- Internal linking between blog posts and offer pages is still thin, though `speaking.html` now links to two posts and the ai-workshop post links back to `speaking.html`. Hand-picked contextual links beat a related-posts component at this post count.

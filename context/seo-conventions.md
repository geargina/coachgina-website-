# SEO and AEO conventions

What this site already does, and the rules for keeping it consistent. Procedure for publishing lives in the vault `coachgina-web` skill; the shapes live here.

## Current state

Better than most. Every page has a title, meta description, canonical, and full Open Graph plus Twitter tags.

Schema in use:
- `index.html`: an `@graph` with `Person`, `Organization`, `WebSite` and 4 `Service` blocks, plus a separate `FAQPage` with 10 questions
- `contact.html`: `ContactPage`
- `blog/index.html`: `Blog`
- every post: `BlogPosting` + `BreadcrumbList`

`robots.txt` explicitly allows GPTBot, ChatGPT-User, Claude-Web, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and CCBot. Keep it that way; being citable by answer engines is the point.

## Rules

**Never add `aggregateRating` or `Review` schema.** There is no rating data. The site previously showed a fabricated "5.0 average" and that must not return in machine-readable form.

**The FAQ schema is the copy answer engines quote verbatim.** Change it in the same commit as the visible copy it describes, never in a follow-up. Stale FAQ answers keep getting asserted long after the page changes.

**`Service` descriptions must match the visible offer copy exactly**, including price. If the visible card says "scoped per team", the schema does not carry a number.

**No `Event` or `Course` schema for past sessions.** The Aug 2026 masterclass was Cogentic-branded and registration lived on cogentic-ai.com, so Event schema here would describe someone else's page's event after the fact and invite "expired event" flags. Revisit only when Level 2 has a confirmed date **and** a landing page on this domain.

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

**Cover images are forced to 16:9 with `object-fit:cover`.** Portrait source art must be composed onto a 16:9 canvas first (1920x1080, matching background) or the crop cuts through the middle of the image.

**`.article .body` has no `table` styles.** A post needing a table carries a scoped `<style>` in its own head rather than forcing a `?v=` bump across every file.

## Verification before push

```
xmllint --noout sitemap.xml blog/feed.xml
```

Then extract each JSON-LD block and parse it, run `render-check` at 1440x900 and 390x844, and run the constraint grep from `voice-and-brand.md`. After push: curl the live URL, confirm the feed and sitemap contain it, confirm `context/` still 404s, and run the live URL through validator.schema.org.

## Known gaps, worth doing

- Internal linking between blog posts and offer pages is almost nonexistent. Hand-picked contextual links beat a related-posts component at 8 posts.
- Two blog post titles contain em-dashes, matching the live post `<h1>`s. Fixing them means changing both the card and the post title together.
- `blog/index.html` and several posts still reference "1:1 coaching sessions" and "case studies from real coaching sessions", which overstates a service with no completed engagements on record.

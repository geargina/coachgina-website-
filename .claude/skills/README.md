# Design skills, installed 23 Aug 2026

Third-party skills vendored into this repo so they load for sessions
rooted here, rather than globally. All were security-checked before
installing.

| Skill | Source | Licence |
|---|---|---|
| `taste-skill`, `brandkit`, `redesign-skill` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT |
| `animate`, `review-animations`, `animation-vocabulary` | [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT |
| `brand-guidelines`, `theme-factory` | [anthropics/skills](https://github.com/anthropics/skills) | Anthropic |

## Why these and not the rest

Each source repo ships far more than this. Only the skills that apply to
a static brand site were taken; Swift, Expo, xlsx, pptx and the like are
noise here.

`canvas-design` was installed and then removed: it bundles 54 TTF font
files at 5.2MB, and this brand uses 3 fixed Google Fonts (Archivo, Inter,
JetBrains Mono). Not worth the git history.

## Safety notes

None of these install a hook or run an installer, verified after copying.
That is the difference between these and `AgriciDaniel/claude-seo`, which
ships a `PostToolUse` hook matching `Edit|Write`. If claude-seo is ever
installed it must be scoped to this repo only, never global, or its
schema validator fires on every markdown edit in the Obsidian vault.

`taste-skill`'s only script is `skill.sh`, a lookup table that echoes a
path. No network, no writes, no eval.

## Not deployed

`.claude/` is listed in `.vercelignore`, so none of this is served.

## SEO skills, added 23 Aug 2026

9 of the 25 skills from [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo)
(MIT), vendored as guidance only:

`seo-audit` `seo-schema` `seo-technical` `seo-page` `seo-geo`
`seo-content-brief` `seo-sitemap` `seo-images` `seo-content`

Skipped: ecommerce, local and maps (no shop or storefront), hreflang and
programmatic (one language, hand-written pages), backlinks, dataforseo,
competitor-pages and google (need paid API credentials), and cluster, drift,
flow, plan, sxo and image-gen (built for large sites or paid tooling).

### Why vendored rather than installed as a plugin

**The plugin's `PostToolUse` hook has a false positive that would block real
edits.** Its schema validator searches JSON-LD for the literal string
`REPLACE`, case-insensitively, meaning to catch template placeholders like
`[REPLACE ME]`. It matches the ordinary English word instead.

Tested against this site before installing. Two posts would have been blocked
with exit code 2:

- `blog/api-vs-mcp-difference-explained-simply.html` contains "Does MCP replace
  APIs?", which is the entire point of the article
- `blog/wtfox-ai-whatsapp-crm-sales-automation.html` contains "why AI won't
  replace salespeople"

It also warns "Missing @type" on the homepage's `@graph` block, which is a
second false positive: a `@graph` container legitimately has no top-level
`@type`.

The validator code itself is clean. It makes no network calls, spawns nothing
and writes nothing, and the Node wrapper spawns Python with an argument array
so there is no shell injection surface. The problem is the heuristic, not the
security.

### Current state of the plugin

The marketplace is registered in `~/.claude/settings.json`, and the repo is
cloned to `~/.claude/plugins/marketplaces/AgriciDaniel-claude-seo` (7.2MB), but
the plugin is **not installed**: there is no `enabledPlugins` entry anywhere and
no `PostToolUse` hook registered. Nothing from it executes.

A couple of the vendored skills reference optional helper scripts
(`scripts/pagespeed_check.py`, `scripts/render_page.py`) that were not copied.
Those need API credentials anyway; the guidance stands without them.

### To remove all of this

```
rm -rf .claude/skills/seo-*
/plugin marketplace remove agricidaniel-claude-seo
```

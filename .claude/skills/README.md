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

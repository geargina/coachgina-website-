# Logo concepts, 23 Aug 2026

The site had **no favicon at all** before this, so browser tabs showed a blank
icon, and the nav mark was a text "G" in a mustard rounded square.

## Chosen

`mark-squared.svg` is live, as `assets/img/logo/mark.svg`. An architectural G
with squared terminals, matching Archivo's geometry. Reads correctly from 512px
down to 16px, and looks nothing like Google's G.

## Why not the others

| Concept | Verdict |
|---|---|
| `mark-socket.svg` / `mark-socket2.svg` | Best *idea*: a G whose aperture is a plug socket, which comes from her own most-shared post, MCP as the one plug everything fits. v1's two thin pins turned to mush at 16px; v2's bold slot survives. Kept as the alternate if she wants the MCP story in the mark. |
| `mark-aperture.svg` | Cleanest at all sizes but **uncomfortably close to Google's G**. A mustard square with that silhouette reads Google-adjacent. Rejected on that basis. |
| `mark-ladder.svg` | Three ascending bars. Perfect legibility, but reads as a bar chart or signal-strength icon rather than a monogram. Not ownable. |
| `mark-ladder2.svg` | G plus three ascending dots, encoding the chat to context to agentic spine. Most meaningful, busiest at 16px. Strong second choice. |

`compare.png` and `compare-v2.png` show every concept at 256, 64, 28 and 16px.

## Deliverables now live

```
assets/img/logo/mark.svg          the mark
assets/img/logo/mark-inverse.svg  for light backgrounds
assets/img/logo/mark-mono.svg     single colour, uses currentColor
assets/img/logo/lockup.svg        mark plus GEARGINA wordmark
favicon.svg                       root, modern browsers
favicon-32.png, favicon-16.png    fallbacks
apple-touch-icon.png              180x180, iOS home screen
```

The wordmark stays Archivo 900, which the site already loads, so the lettering
costs nothing extra and is guaranteed correct. Deliberately not image-generated:
generators produce plausible-looking wordmarks with subtly wrong letterforms,
and a logo is the worst place for that.

## To switch

Copy any `mark-*.svg` from this folder over `assets/img/logo/mark.svg` and
`favicon.svg`, then regenerate the PNG fallbacks.

# Coach Gina | geargina.com

Personal brand website for Geargina Tan (Coach Gina). Static HTML site, deployed via Vercel.

**Read `CLAUDE.md` before editing.** Every committed file in this repo is served publicly, and no number, price or quote goes into the HTML unless `context/claims-and-proof.md` marks it CONFIRMED.

## Stack

- Plain HTML/CSS/JS (built in Claude design)
- Hosted on Vercel
- Domain: geargina.com (registrar: Squarespace, DNS via Google Workspace)
- Contact email: hello@iamcoachgina.com (still the working inbox, not a stale URL)

## Pages

- `index.html` — homepage
- `contact.html` — contact / workshop enquiries
- `privacy.html` — privacy policy
- `terms.html` — terms of service

## Folders

- `assets/` — CSS, JS, fonts, images
- `blog/` — blog posts
- `uploads/` — image uploads

## Local development

Open `index.html` directly in a browser, or run a quick local server:

```bash
cd ~/Sites/coachgina-website
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Pushing to `main` on GitHub auto-deploys to Vercel.

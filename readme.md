# Carl Ashley Molina — Portfolio

A simple, fast, fully-static personal portfolio site. No frameworks, no build step.
Just HTML + CSS + vanilla JS, ready to deploy on GitHub Pages.

## Features

- Light/Dark theme with auto-detect + toggle
- Responsive (mobile-friendly)
- Easy to edit — all content lives in `index.html`
- Playground with 3 working mini-apps:
  - Weather lookup (Open-Meteo API — no key required)
  - GitHub profile viewer (GitHub public API)
  - Password generator (runs locally with Web Crypto)

## Files

| File | What to edit |
|------|--------------|
| `index.html` | Your name, bio, projects, links |
| `styles.css` | Colors, spacing, fonts |
| `script.js`  | Mini-app logic — add your own! |

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `portfolio` or `<your-username>.github.io`).
2. Upload these files (`index.html`, `styles.css`, `script.js`, `README.md`) to the root of the repo.
3. Go to the repo's Settings → Pages.
4. Under Source, select branch `main` (and folder `/ (root)`), click Save.
5. Wait ~1 minute. Your site will be live at:
   - `https://<your-username>.github.io/portfolio/` (project repo), or
   - `https://<your-username>.github.io/` (if you named the repo `<your-username>.github.io`)

## How to edit

Everything is plain HTML — open `index.html` and search for the section you want to change. Replace the text and links. Commit & push, and GitHub Pages auto-redeploys in ~30 seconds.

## Local development

Just open `index.html` in your browser. Done. No `npm install`, no servers.

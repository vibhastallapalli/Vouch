# Notary Desk — frontend design prototype

Privacy app mockup (Midnight Network): landing with day/night themes, commit → prove → verify flow, register, and receipt screens.

## Run it

Static files only — no build step. Serve the folder from any static host:

- **GitHub Pages:** push this repo, then Settings → Pages → deploy from branch (root). `index.html` opens the prototype.
- **Locally:** `npx serve .` (or any static server). Opening the file directly via `file://` won't work — it must be served over HTTP.

Keep the folder structure intact: `App Prototype.dc.html` needs `support.js`, `browser-window.jsx`, and the `_ds/` design-system folder next to it. Fonts load from Google Fonts CDN.

## Files

- `App Prototype.dc.html` — the full prototype (all screens)
- `Landing Day-Night.dc.html` — earlier landing-only version
- `_ds/` — Notary Desk design system (tokens, components bundle, style guide)

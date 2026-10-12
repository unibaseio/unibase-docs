# Unibase Docs

Source for **[docs.unibase.com](https://docs.unibase.com)** — built with [Starlight](https://starlight.astro.build) and deployed to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).

Pages live in `src/content/docs/`; the sidebar is defined in `astro.config.mjs`. **Read [CLAUDE.md](CLAUDE.md) first** — the site is Starlight, not GitBook (retired), and `npm run check` enforces the format.

```bash
nvm use          # Node 22 (.nvmrc)
npm install
npm run dev      # http://localhost:4321
npm run check    # format rules
npm run build    # -> dist/
```

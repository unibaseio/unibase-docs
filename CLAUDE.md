# Unibase Docs — writing guide

This repo is the source of **docs.unibase.com**, built with **[Starlight](https://starlight.astro.build)**
(Astro). GitBook is retired; this repo is **not GitBook** any more: GitBook syntax still builds but renders wrong — `{% hint %}` shows
up as literal text, image paths break, titles appear twice. Every push to `main` deploys.

## Rules

1. Write Starlight Markdown only — use the table below, never `{% … %}` tags.
2. Never add `SUMMARY.md`, `README.md`, `gitbook-docs.yaml` or `.gitbook.yaml`. Don't connect
   GitBook Git Sync to this repo — it rewrites pages into GitBook format and drops images.
3. Don't force-push `main`; open a PR or push normal commits.
4. Before pushing: `npm run check && npm run build` (Claude Code runs the check automatically
   before `git push` via `.claude/settings.json`; CI runs it on every PR and push).

## Where things go

| What | Where |
|------|-------|
| Pages | `src/content/docs/<section>/<page>.md` → URL `/<section>/<page>/` |
| Section home page | `src/content/docs/<section>/index.md` → `/<section>/` |
| Sidebar (order + labels) | `astro.config.mjs` → `sidebar` — **every new page must be added** |
| Images | `public/images/…`, referenced as `/images/…` |
| Downloads (PDFs, …) | `public/files/…`, linked as `/files/…` |

## Page template

```md
---
title: "Page title"
description: "One sentence: what this page helps you do."
---

Lead paragraph (the title is rendered from frontmatter — no `# H1` in the body).

## First section
```

Use `.md` by default; use `.mdx` only when the page uses components (Tabs, cards, …), and import them.

## GitBook → Starlight

| GitBook | Starlight |
|---------|-----------|
| `# Title` at the top | `title:` in frontmatter (body starts at `##`) |
| `{% hint style="info" %}…{% endhint %}` | `:::note` … `:::` (`success`→`:::tip`, `warning`→`:::caution`, `danger`→`:::danger`) |
| `{% tabs %}{% tab title="Python" %}…{% endtab %}{% endtabs %}` | `<Tabs syncKey="lang"><TabItem label="Python">…</TabItem></Tabs>` in `.mdx` |
| `{% code title="x.py" %}` + fence | ` ```py title="x.py" ` |
| `{% stepper %}{% step %}` | numbered `## 1. …` headings, or `<Steps>` around an ordered list (`.mdx`) |
| `<table data-view="cards">` | `<CardGrid>` + `<LinkCard title="…" description="…" href="/…/" />` (`.mdx`) |
| `[x](../folder/page.md)` | `[x](/folder/page/)` — link the URL, not the file |
| `.gitbook/assets/img.png` | `public/images/img.png` → `![alt](/images/img.png)` |
| `{% file src="….pdf" %}` | `public/files/x.pdf` → `[📎 x.pdf](/files/x.pdf)` |

Component import line for `.mdx` pages:

```js
import { Tabs, TabItem, CardGrid, LinkCard } from '@astrojs/starlight/components';
```

Use `syncKey="lang"` on language tabs so the reader's choice sticks across pages.

## Local preview

```bash
nvm use && npm install
npm run dev      # http://localhost:4321
npm run check    # format rules (fast)
npm run build    # full build
```

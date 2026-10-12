// Guards the docs against GitBook-format content, which Starlight can't render
// (it builds, but shows `{% hint %}` as text, drops images, duplicates titles).
//
//   npm run check                 run all checks
//   node scripts/check-docs.mjs --hook
//       Claude Code PreToolUse hook (.claude/settings.json): reads the tool call
//       on stdin and only checks before a `git push`; exit 2 blocks the push.
import fs from 'node:fs';
import path from 'node:path';

const DOCS = 'src/content/docs';
const COMPONENTS = ['Tabs', 'TabItem', 'CardGrid', 'LinkCard', 'Card', 'Steps', 'Aside', 'Badge', 'FileTree'];

if (process.argv.includes('--hook')) {
  const input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}');
  if (!/\bgit\s+push\b/.test(input.tool_input?.command ?? '')) process.exit(0);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

for (const f of ['gitbook-docs.yaml', '.gitbook.yaml', 'SUMMARY.md']) {
  if (fs.existsSync(f)) fail(f, 'GitBook file — this repo is Starlight-only (GitBook is retired); delete it (see CLAUDE.md)');
}

const pages = walk(DOCS).filter((f) => /\.mdx?$/.test(f));
const urlOf = (f) =>
  '/' + path.relative(DOCS, f).replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '') + '/';
const urls = new Set(pages.map((f) => urlOf(f).replace(/\/+$/, '/')));
const config = fs.readFileSync('astro.config.mjs', 'utf8');

for (const f of pages) {
  const name = path.basename(f);
  if (/^(SUMMARY|README)\.md$/i.test(name)) {
    fail(f, `${name} is a GitBook file, not a page — delete it (section home pages are index.md)`);
    continue;
  }
  const src = fs.readFileSync(f, 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm || !/^title:/m.test(fm[1])) fail(f, 'frontmatter needs `title:` (it becomes the page heading)');

  // Check prose only: blank out fenced code blocks so their contents never match.
  const prose = src.replace(/^```[\s\S]*?^```/gm, (m) => m.replace(/[^\n]/g, ' '));
  const line = (i) => prose.slice(0, i).split('\n').length;

  for (const m of prose.matchAll(/\{%\s*(\w+)[^%]*%\}/g)) {
    fail(`${f}:${line(m.index)}`, `GitBook tag {% ${m[1]} %} — use the Starlight equivalent (CLAUDE.md, "GitBook → Starlight")`);
  }
  for (const m of prose.matchAll(/^# .+$/gm)) {
    fail(`${f}:${line(m.index)}`, 'H1 in the body — the title comes from frontmatter; start sections at ##');
  }
  const used = COMPONENTS.filter((c) => new RegExp(`<${c}[\\s>/]`).test(prose));
  if (used.length && !f.endsWith('.mdx')) fail(f, `uses <${used.join('>, <')}> — components need a .mdx file`);
  for (const c of used) {
    if (!new RegExp(`import\\s*\\{[^}]*\\b${c}\\b[^}]*\\}\\s*from\\s*'@astrojs/starlight/components'`).test(src)) {
      fail(f, `<${c}> used but not imported from '@astrojs/starlight/components'`);
    }
  }
  for (const m of prose.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
    const src_ = m[1];
    if (/^https?:/.test(src_)) continue;
    if (!src_.startsWith('/images/')) fail(`${f}:${line(m.index)}`, `image "${src_}" — put it in public/images/ and link as /images/…`);
    else if (!fs.existsSync(path.join('public', decodeURI(src_)))) fail(`${f}:${line(m.index)}`, `image "${src_}" not found in public/`);
  }
  for (const m of prose.matchAll(/\]\((?!https?:|mailto:|#)([^)\s#]+)(#[^)\s]*)?\)/g)) {
    const target = m[1];
    if (target.startsWith('/llms') || fs.existsSync(path.join('public', decodeURI(target)))) continue; // public/ files
    if (/\.mdx?$/.test(target)) {
      fail(`${f}:${line(m.index)}`, `link "${target}" points at a file — link the page URL instead, e.g. /build/reference/sdk-quickstart/`);
    } else if (target.startsWith('/') && !urls.has(target.endsWith('/') ? target : target + '/')) {
      fail(`${f}:${line(m.index)}`, `link "${target}" — no page at that URL`);
    }
  }
  const url = urlOf(f);
  const slug = url.slice(1, -1);
  if (slug && !config.includes(`"${slug}"`) && !config.includes(`'${slug}'`)) {
    fail(f, `not in the sidebar — add { "label": "…", "slug": "${slug}" } to astro.config.mjs`);
  }
}

if (errors.length) {
  console.error(`docs check failed (${errors.length}):\n` + errors.map((e) => '  - ' + e).join('\n'));
  console.error('\nThis site is Starlight, not GitBook — see CLAUDE.md for the format.');
  process.exit(2);
}
console.log(`docs check passed (${pages.length} pages)`);

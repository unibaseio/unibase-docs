// Builds the Starlight site from the GitBook sources, which stay the single
// source of truth while GitBook Git Sync is on: SUMMARY.md drives the sidebar,
// .gitbook.yaml the redirects, and every page in SUMMARY.md is converted into
// src/content/docs/ (generated, gitignored) on each `astro dev` / `astro build`.
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'src/content/docs';
const ASSETS = '.gitbook/assets';
const PUBLIC_ASSETS = 'public/gitbook-assets'; // generated, gitignored
const PUBLIC_FILES = 'public/files'; // repo files linked from pages (PDFs etc.), generated
const linkedFiles = new Set();
const ASIDE = { info: 'note', success: 'tip', warning: 'caution', danger: 'danger' };
// Sub-path the site is served under, e.g. /unibase-docs on a GitHub Pages project
// site; empty on a custom domain. Starlight prefixes its own nav; we prefix page links.
export const BASE = (process.env.DOCS_BASE ?? '').replace(/\/$/, '');

// GitBook URL scheme, kept so links and the domain can move over unchanged:
// README.md -> /, aip/README.md -> /aip/, aip/x.md -> /aip/x/
export const urlOf = (file) =>
  '/' + file.replace(/(^|\/)README\.md$/, '$1').replace(/\.md$/, '/');

const summary = () =>
  [...fs.readFileSync('SUMMARY.md', 'utf8').matchAll(/^( *)\* \[(.+)\]\((.+\.md)\)$/gm)];

export function sidebar() {
  const root = { items: [] };
  const stack = [{ depth: -1, node: root }];
  for (const [, indent, label, file] of summary()) {
    const node = { label, link: urlOf(file), items: [] };
    while (stack.at(-1).depth >= indent.length) stack.pop();
    stack.at(-1).node.items.push(node);
    stack.push({ depth: indent.length, node });
  }
  // Starlight group headers aren't links, so a section's index page becomes its first entry.
  const finish = ({ label, link, items }) =>
    items.length ? { label, items: [{ label: 'Overview', link }, ...items.map(finish)] } : { label, link };
  return root.items.map(finish);
}

export function redirects() {
  if (!fs.existsSync('.gitbook.yaml')) return {};
  const block = fs.readFileSync('.gitbook.yaml', 'utf8').split('redirects:')[1] ?? '';
  return Object.fromEntries(
    [...block.matchAll(/^\s+(\S+): (\S+\.md)$/gm)].map(([, from, to]) => ['/' + from, BASE + urlOf(to)]),
  );
}

function convert(file, src) {
  const title = src.match(/^# (.+)$/m)[1];
  let step = 0;
  let body = src
    .replace(/^# .+\n+/m, '') // Starlight renders the title itself
    .replace(/\]\((?!https?:)([^)\s#]+\.md)(#[^)\s]*)?\)/g, (_, target, hash = '') =>
      `](${BASE}${urlOf(path.posix.join(path.posix.dirname(file), target))}${hash})`)
    // Directory links (`quick-start/`) resolve against GitBook's slash-less page URLs;
    // Starlight's pages end in `/`, so make them absolute via the directory's README.
    .replace(/\]\((?!https?:|\/)([^)\s#]+\/)(#[^)\s]*)?\)/g, (link, target, hash = '') => {
      const readme = path.posix.join(path.posix.dirname(file), target, 'README.md');
      return fs.existsSync(readme) ? `](${BASE}${urlOf(readme)}${hash})` : link;
    })
    .replace(/\]\((?!https?:)([^)\s#]+\.(?!md\))\w+)\)/g, (link, target) => {
      const repoPath = path.posix.join(path.posix.dirname(file), target);
      if (repoPath.startsWith('.gitbook/') || !fs.existsSync(repoPath)) return link;
      linkedFiles.add(repoPath);
      return `](${BASE}/files/${encodeURI(repoPath)})`;
    })
    .replace(/\{% file src="([^"]+)" %\}/g, (_, src) => `[📎 ${path.posix.basename(src)}](${encodeURI(src)})`)
    .replace(/(?:\.\.\/)*\.gitbook\/assets\//g, `${BASE}/gitbook-assets/`)
    .replace(/\{% hint style="(\w+)" %\}/g, (_, style) => ':::' + (ASIDE[style] ?? 'note'))
    .replace(/\{% endhint %\}/g, ':::')
    .replace(/\{% code title="([^"]+)"([^%]*)%\}\n```(\w*)/g, (_, title, attrs, lang) =>
      `\`\`\`${lang} title="${title}"${attrs.includes('lineNumbers="true"') ? ' showLineNumbers' : ''}`)
    .replace(/\{% endcode %\}\n?/g, '')
    .replace(/\{% step %\}\n+(#+) /g, (_, level) => `${level} ${++step}. `)
    .replace(/\{% (stepper|endstepper|endstep) %\}\n?/g, '')
    .replace(/\{% tabs %\}/g, '\n<Tabs syncKey="lang">\n')
    .replace(/\{% tab title="([^"]+)" %\}/g, '\n<TabItem label="$1">\n')
    .replace(/\{% endtab %\}/g, '\n</TabItem>\n')
    .replace(/\{% endtabs %\}/g, '\n</Tabs>\n');

  const mdx = body.includes('<Tabs');
  if (mdx) body = "import { Tabs, TabItem } from '@astrojs/starlight/components';\n\n" + body;
  // Starlight slugifies paths (drops dots etc.); pin those pages to their GitBook URL.
  const gitbookPath = urlOf(file).slice(1, -1);
  const slug = /[^a-z0-9/-]/.test(gitbookPath) ? `slug: ${JSON.stringify(gitbookPath)}\n` : '';
  return { mdx, text: `---\ntitle: ${JSON.stringify(title)}\n${slug}---\n\n${body}` };
}

export function generate() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.rmSync(PUBLIC_ASSETS, { recursive: true, force: true });
  if (fs.existsSync(ASSETS)) fs.cpSync(ASSETS, PUBLIC_ASSETS, { recursive: true });
  for (const [, , , file] of summary()) {
    const { mdx, text } = convert(file, fs.readFileSync(file, 'utf8'));
    const out = path.join(OUT, file.replace(/README\.md$/, 'index.md').replace(/\.md$/, mdx ? '.mdx' : '.md'));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, text);
  }
  fs.rmSync(PUBLIC_FILES, { recursive: true, force: true });
  for (const f of linkedFiles) {
    fs.mkdirSync(path.join(PUBLIC_FILES, path.dirname(f)), { recursive: true });
    fs.copyFileSync(f, path.join(PUBLIC_FILES, f));
  }
}

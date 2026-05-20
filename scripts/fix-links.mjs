import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'out';
const FALLBACK = '/es/comunidad/blog/';

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

const existing = new Set();
for (const p of walk(ROOT)) {
  if (path.basename(p) === 'index.html') {
    let url = '/' + path.relative(ROOT, path.dirname(p)).split(path.sep).join('/') + '/';
    url = url.replace('//', '/').toLowerCase();
    existing.add(url);
  }
}

let changed = 0;
for (const f of walk(ROOT)) {
  const html = fs.readFileSync(f, 'utf8');
  const next = html.replace(/href="(\/[a-z][^"#]*)"/g, (m, h) => {
    let n = (h.split('?')[0].split('#')[0] + '/').replace('//', '/').toLowerCase();
    if (!n.endsWith('/')) n += '/';
    if (n.startsWith('/wp-content/') || n.startsWith('/_next/') || n.startsWith('/favicon')) return m;
    if (existing.has(n)) return m;
    return `href="${FALLBACK}"`;
  });
  if (next !== html) { fs.writeFileSync(f, next); changed++; }
}
console.log(`fix-links: ${changed} files cleaned`);

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const legacyRoot = path.join(root, 'legacy/next-dev-1.7/app');
const astroRoot = path.join(root, 'apps/web/src/pages');

function walk(dir, predicate, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    const st = fs.statSync(file);
    if (st.isDirectory()) walk(file, predicate, out);
    else if (predicate(file)) out.push(file);
  }
  return out;
}

const legacy = walk(legacyRoot, f => f.endsWith(`${path.sep}page.tsx`)).map(file => {
  const rel = path.relative(legacyRoot, path.dirname(file)).replaceAll(path.sep, '/');
  return rel ? `/${rel}` : '/';
}).sort();

const astro = walk(astroRoot, f => f.endsWith('.astro') && path.basename(f) !== '404.astro').map(file => {
  let rel = path.relative(astroRoot, file).replaceAll(path.sep, '/');
  if (rel.endsWith('/index.astro')) rel = rel.slice(0, -'/index.astro'.length);
  else if (rel === 'index.astro') rel = '';
  else rel = rel.slice(0, -'.astro'.length);
  return rel ? `/${rel}` : '/';
}).sort();

const oldSet = new Set(legacy);
const newSet = new Set(astro);
const missing = legacy.filter(x => !newSet.has(x));
const approvedNewRoutes = new Set(['/project/[slug]', '/projects']);
const extra = astro.filter(x => !oldSet.has(x) && !approvedNewRoutes.has(x));
const missingApproved = [...approvedNewRoutes].filter(x => !newSet.has(x));

if (missing.length || extra.length || missingApproved.length) {
  console.error(`Route parity FAILED. DEV1.7=${legacy.length}, Astro=${astro.length}`);
  if (missing.length) console.error('Missing:', missing);
  if (extra.length) console.error('Extra:', extra);
  if (missingApproved.length) console.error('Missing approved:', missingApproved);
  process.exit(1);
}
console.log(`Architecture v2 application route parity: OK (${legacy.length} preserved + ${approvedNewRoutes.size} approved routes = ${astro.length})`);

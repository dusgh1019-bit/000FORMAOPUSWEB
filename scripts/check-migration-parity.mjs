import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const patch = JSON.parse(fs.readFileSync(path.join(root,'config/patch-surface.json'),'utf8'));
const intentionalContentDrift = new Set(patch.intentionalContentDrift ?? []);
const resetDomains = new Set(patch.resetDomains ?? []);
const pairs = [
  ['legacy/next-dev-1.7/content/model.ts', 'content/site/model.ts'],
  ['legacy/next-dev-1.7/content/grea.ts', 'content/grea/index.ts'],
  ['legacy/next-dev-1.7/content/exercitus.ts', 'content/grea/exercitus.ts'],
  ['legacy/next-dev-1.7/content/parvus.ts', 'content/parvus/index.ts'],
  ['legacy/next-dev-1.7/content/machina.ts', 'content/machina/index.ts'],
  ['legacy/next-dev-1.7/content/history.ts', 'content/history/archive.ts'],
  ['legacy/next-dev-1.7/content/history-timeline.ts', 'content/history/timeline/index.ts'],
];
const requiredCss = [
  'packages/grea/src/domain.css',
  'packages/exercitus/src/domain.css',
  'packages/parvus/src/domain.css',
  'packages/machina/src/domain.css',
  'packages/cad/src/domain.css',
];
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const errors = [];
for (const [a,b] of pairs) {
  const pa=path.join(root,a), pb=path.join(root,b);
  if (!fs.existsSync(pa) || !fs.existsSync(pb)) errors.push(`missing content pair: ${a} / ${b}`);
  else if (hash(pa)!==hash(pb) && !intentionalContentDrift.has(b)) errors.push(`content drift: ${a} -> ${b}`);
  else if (hash(pa)!==hash(pb)) console.log(`Patch-declared content drift: ${b}`);
}
for (const f of requiredCss) if (!fs.existsSync(path.join(root,f))) errors.push(`missing domain CSS: ${f}`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Migration content guard: OK; undeclared content drift = 0; domain CSS ownership files present.`);

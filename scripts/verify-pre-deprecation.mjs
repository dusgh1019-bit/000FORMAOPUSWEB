import { spawnSync } from 'node:child_process';
const checks = [
  'scripts/check-boundaries.mjs',
  'scripts/check-routes.mjs',
  'scripts/check-legacy-integrity.mjs',
  'scripts/check-migration-parity.mjs',
  'scripts/check-component-parity.mjs',
];
for (const script of checks) {
  const r = spawnSync(process.execPath, [script], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log('Pre-deprecation source gate: PASS');

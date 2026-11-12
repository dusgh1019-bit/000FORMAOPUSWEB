import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const root=process.cwd(), legacy=path.join(root,'legacy/next-dev-1.7'), manifest=path.join(root,'migration/LEGACY_SHA256.txt');
const lines=fs.readFileSync(manifest,'utf8').trim().split(/\r?\n/).filter(Boolean); const bad=[];
for(const line of lines){const m=line.match(/^([0-9a-f]{64})\s+(.+)$/); if(!m)continue; const f=path.join(legacy,m[2]); if(!fs.existsSync(f)){bad.push('missing '+m[2]);continue;} const h=crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'); if(h!==m[1])bad.push('changed '+m[2]);}
if(bad.length){console.error(bad.join('\n'));process.exit(1)} console.log('Frozen DEV 1.7 legacy integrity: OK');

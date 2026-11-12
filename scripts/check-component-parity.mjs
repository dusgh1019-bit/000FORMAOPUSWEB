import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const patch=JSON.parse(fs.readFileSync(path.join(root,'config/patch-surface.json'),'utf8'));
const intentionalComponentDrift=new Set(patch.intentionalComponentDrift ?? []);
const resetDomains=new Set(patch.resetDomains ?? []);
const domains=['grea','exercitus','parvus','machina','history'];
function migrateImports(text,domain){
  text=text.replaceAll("from 'next/link'","from '@forma-opus/ui/react/Link'");
  text=text.replaceAll("from 'next/navigation'","from '@forma-opus/ui/react/router'");
  text=text.replaceAll("from '@/components/BreadcrumbTrail'","from '@forma-opus/ui/react/BreadcrumbTrail'");
  const map={
    grea:["@/content/grea","@content/grea/index"],
    exercitus:["@/content/exercitus","@content/grea/exercitus"],
    parvus:["@/content/parvus","@content/parvus/index"],
    machina:["@/content/machina","@content/machina/index"],
    historyTimeline:["@/content/history-timeline","@content/history/timeline/index"],
    historyArchive:["@/content/history","@content/history/archive"],
  };
  if(domain==='history'){
    text=text.replaceAll(map.historyTimeline[0],map.historyTimeline[1]);
    text=text.replaceAll(map.historyArchive[0],map.historyArchive[1]);
  } else {
    const [a,b]=map[domain]; text=text.replaceAll(a,b);
  }
  return text;
}
let count=0;const errors=[];
for(const domain of domains){
  if(resetDomains.has(domain)){ console.log(`Domain reset: component parity intentionally skipped for ${domain}`); continue; }
  const oldDir=path.join(root,'legacy/next-dev-1.7/components',domain);
  const newDir=path.join(root,'packages',domain,'src/components');
  for(const name of fs.readdirSync(newDir).filter(n=>n.endsWith('.tsx')).sort()){
    const oldFile=path.join(oldDir,name),newFile=path.join(newDir,name);
    if(!fs.existsSync(oldFile)){errors.push(`No DEV 1.7 peer: ${domain}/${name}`);continue;}
    const expected=migrateImports(fs.readFileSync(oldFile,'utf8'),domain);
    const actual=fs.readFileSync(newFile,'utf8');
    count++;
    const relative=path.relative(root,newFile).split(path.sep).join('/');
    if(expected!==actual && !intentionalComponentDrift.has(relative)) errors.push(`Component drift beyond boundary codemod: ${domain}/${name}`);
    else if(expected!==actual) console.log(`Patch-declared component drift: ${relative}`);
  }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Migrated component guard: OK (${count} checked; undeclared drift = 0)`);

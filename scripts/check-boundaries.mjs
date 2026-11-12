import fs from 'node:fs'; import path from 'node:path';
const root=process.cwd(); const rules=JSON.parse(fs.readFileSync(path.join(root,'config/boundaries.json'),'utf8')); const packageRoot=path.join(root,'packages'); const errors=[];
const contentRule={grea:['grea/'],exercitus:['grea/exercitus'],parvus:['parvus/'],machina:['machina/'],history:['history/'],cad:['cad/'],shell:['site/'],ui:[],core:[],services:[]};
for(const [pkg,allowed] of Object.entries(rules)){
 const src=path.join(packageRoot,pkg,'src'); if(!fs.existsSync(src))continue; const stack=[src];
 while(stack.length){const cur=stack.pop();for(const name of fs.readdirSync(cur)){const file=path.join(cur,name),st=fs.statSync(file);if(st.isDirectory())stack.push(file);else if(/\.(ts|tsx|astro|js|mjs)$/.test(name)){const text=fs.readFileSync(file,'utf8');
   const imports=[...text.matchAll(/(?:from\s+|import\s*\()['"]@forma-opus\/([^/'"]+)/g)].map(m=>m[1]); for(const dep of imports){if(dep!==pkg&&!allowed.includes(dep))errors.push(`${pkg}: ${path.relative(root,file)} -> @forma-opus/${dep}`)}
   const content=[...text.matchAll(/(?:from\s+|import\s*\()['"]@content\/([^'"]+)/g)].map(m=>m[1]); for(const dep of content){const ok=(contentRule[pkg]||[]).some(prefix=>dep===prefix.replace(/\/$/,'')||dep.startsWith(prefix));if(!ok)errors.push(`${pkg}: ${path.relative(root,file)} -> @content/${dep}`)}
 }}}
}
if(errors.length){console.error('Boundary violations:\n'+errors.map(x=>' - '+x).join('\n'));process.exit(1)} console.log('Architecture v2 package/content boundaries: OK');

import fs from 'node:fs'; import path from 'node:path';
const root=path.join(process.cwd(),'legacy/next-dev-1.7');
function walk(dir){ return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
const files=walk(root).filter(f=>!f.endsWith('tsconfig.tsbuildinfo'));
const code=files.filter(f=>/\.(ts|tsx)$/.test(f));
const clients=code.filter(f=>fs.readFileSync(f,'utf8').trimStart().match(/^['"]use client['"]/));
const css=fs.readFileSync(path.join(root,'app/globals.css'),'utf8');
const media=[...css.matchAll(/@media\s*([^\{]+)/g)].map(m=>m[1].trim());
const sections=[...css.matchAll(/\/\*([\s\S]*?)\*\//g)].map(m=>m[1].replace(/\s+/g,' ').trim());
console.log(JSON.stringify({files:files.length,tsTsx:code.length,clientComponents:clients.length,globalCssBytes:Buffer.byteLength(css),globalCssLines:css.split('\n').length,cssHistoricalSections:sections.length,mediaQueries:media.length,breakpoints:[...new Set(media)]},null,2));

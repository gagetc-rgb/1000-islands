const fs=require('fs'),pp=require('../../tools/penpot-sync/node_modules/puppeteer-core');
const {prepare,extract}=require('../../tools/penpot-sync/extract.cjs');
const jobs=JSON.parse(fs.readFileSync('tools/penpot-sync/pages.json'));
const groups={desktop:'19c47d73-0a5d-8067-8008-bcac4ff9f2ad',mobile:'998cb9f0-5ded-8044-8008-bce251986e65',emails:'998cb9f0-5ded-8044-8008-bce2552ae348',admin:'998cb9f0-5ded-8044-8008-bce2565ba647'};
(async()=>{const b=await pp.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});const p=await b.newPage();await p.setViewport({width:1440,height:900});const boards=[];
if(process.env.SKIP_PEN)boards.push(...JSON.parse(fs.readFileSync(__dirname+'/penpot-shapes.json')));
for(const [group,id]of Object.entries(process.env.SKIP_PEN?{}:groups)){
 await p.goto(`https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=${id}&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0`,{waitUntil:'networkidle2',timeout:60000});await p.waitForSelector('[class*="thumbnail-info"]');
 const data=await p.evaluate(()=>{
 function val(m,k){if(!m)return null;if(m[k]!==undefined)return m[k];const key='$'+k.replace(/-/g,'_')+'$';if(m[key]!==undefined)return m[key];function walk(n){const a=n?.['$arr$']||n?.arr;if(!a)return undefined;for(let i=0;i<a.length;i+=2){if(a[i]?.name===k)return a[i+1];if(a[i]===null&&a[i+1]){const r=walk(a[i+1]);if(r!==undefined)return r}}}return walk(m.root||m)??(m['$$extmap$']?val(m['$$extmap$'],k):null)}
 function shape(e){let f=e[Object.keys(e).find(k=>k.startsWith('__reactFiber'))];for(let i=0;f&&i<7;i++,f=f.return)if(f.memoizedProps?.shape)return f.memoizedProps.shape;return null}
 return [...document.querySelectorAll('button[class*="thumbnail-item"]')].map(el=>{const svg=el.querySelector('svg'),root=shape(svg.querySelector('g[id^="shape-"]')),seen=new Set();const shapes=[...svg.querySelectorAll('g[id^="shape-"]')].map(e=>{const s=shape(e);if(!s||seen.has(s.id.uuid))return null;seen.add(s.id.uuid);return {id:s.id.uuid,name:s.name,type:s.type.name,x:s.x-root.x,y:s.y-root.y,w:s.width,h:s.height,interactions:val(s,'interactions'),texts:[...e.querySelectorAll('text')].map(t=>t.textContent),fills:val(s,'fills')};}).filter(Boolean);return {name:el.querySelector('[class*="thumbnail-info"]').textContent,id:root.id.uuid,w:root.width,h:root.height,shapes};});});
 boards.push(...data.map(d=>({...d,group})));console.log('PENPOT',group,data.length);
}
fs.writeFileSync(__dirname+'/penpot-shapes.json',JSON.stringify(boards,null,2));
const fresh=[];
for(const j of jobs){await p.setViewport({width:j.w,height:j.oneScreen?j.h:(j.w<600?660:640)});await p.goto(`https://islands-1000-prototype.pages.dev/${j.file||j.key}?notes=${process.env.NOTES||'1'}`,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.addStyleTag({content:'*,*::before,*::after{transition:none!important;animation:none!important}'});
if(!j.menuOpen&&!j.oneScreen&&!/^(state-|unavailable)/.test(j.key))await p.addStyleTag({content:'.mbar{transform:none!important;visibility:visible!important}'});
if(j.tab)await p.click('#'+j.tab);if(j.menuOpen)await p.click('summary.burger');await p.evaluate(prepare);const data=await p.evaluate(extract,j.oneScreen||/^(state-|unavailable)/.test(j.key));fresh.push({...j,...data});}
fs.writeFileSync(__dirname+`/html-fresh${process.env.NOTES==='0'?'-clean':''}.json`,JSON.stringify(fresh,null,2));
const report=[];for(const j of fresh){const pb=boards.find(b=>b.name===j.name);if(!pb){report.push({name:j.name,missingBoard:true});continue;}const pool=pb.shapes.filter(s=>s.type==='text').map(s=>({...s,text:s.texts.join('')}));const missing=[],moved=[];
for(const t of j.items.filter(t=>t.k==='text'&&!(j.oneScreen&&t.y>=j.h))){let i=pool.findIndex(s=>s.text===t.s&&Math.abs(s.x-t.x)<3&&Math.abs(s.y-t.y)<3);if(i<0){i=pool.findIndex(s=>s.text===t.s);if(i<0)missing.push(t);else moved.push({text:t.s,html:[t.x,t.y],pen:[pool[i].x,pool[i].y]});}if(i>=0)pool.splice(i,1);}
report.push({name:j.name,size:[j.w,j.h,pb.w,pb.h],missing,moved,extra:pool.map(s=>s.text),htmlLinks:j.links,penLinks:pb.shapes.filter(s=>s.interactions)});console.log('COMPARE',j.name,'missing',missing.length,'moved',moved.length,'extra',pool.length);}
fs.writeFileSync(__dirname+`/parity${process.env.NOTES==='0'?'-clean':''}.json`,JSON.stringify(report,null,2));await b.close();})().catch(e=>{console.error(e);process.exit(1)});

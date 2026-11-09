const fs=require('fs'),path=require('path');
const pp=require('../../tools/penpot-sync/node_modules/puppeteer-core');
const OUT=__dirname,base='https://islands-1000-prototype.pages.dev';
const names=fs.readdirSync(path.resolve(__dirname,'../../wireframes')).filter(x=>x.endsWith('.html')).map(x=>x.slice(0,-5));
const sizes=[[1440,640],[1280,620],[1366,657],[1536,730],[1920,950],[1024,690],[768,950],[390,660],[360,640],[844,340]];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function measure(){
 const visible=e=>e.checkVisibility({checkOpacity:true,checkVisibilityCSS:true}),box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,bottom:r.bottom,right:r.right}},fixed=e=>{for(;e;e=e.parentElement)if(getComputedStyle(e).position==='fixed')return true;return false};
 const problems=[],lines=[]; const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()) {const n=walker.currentNode,e=n.parentElement;if(!n.textContent.trim()||!visible(e)||fixed(e)||e.closest('script,style'))continue;const r=document.createRange();r.selectNodeContents(n);
 for(const rc of r.getClientRects())if(rc.width>1)lines.push({e,t:n.textContent.trim().slice(0,65),x:rc.x,y:rc.y,w:rc.width,h:rc.height});
 }
 for(let i=0;i<lines.length;i++)for(let j=i+1;j<lines.length;j++){const a=lines[i],b=lines[j];if(a.e===b.e||a.e.contains(b.e)||b.e.contains(a.e))continue;const dx=Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x),dy=Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y);if(dx>2&&dy>3)problems.push({type:'text-overlap',a:a.t,b:b.t,y:a.y});}
 for(const e of document.querySelectorAll('.btn,button'))if(visible(e)&&!fixed(e)){const b=e.getBoundingClientRect();for(const l of lines.filter(l=>e===l.e||e.contains(l.e)))if(l.x<b.x-1||l.x+l.w>b.right+1||l.y<b.y-2||l.y+l.h>b.bottom+2)problems.push({type:'button-text-outside',text:l.t,box:box(e)});}
 const hero=document.querySelector('.hero'),sub=document.querySelector('.subnav');
 return {width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,hero:hero?box(hero):null,subnav:sub?box(sub):null,problems,photos:[...document.querySelectorAll('.ph')].filter(visible).filter(e=>box(e).h>innerHeight).map(e=>({text:e.innerText,box:box(e)})),links:[...document.querySelectorAll('a')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href'),url:a.href,cls:a.className,visible:visible(a)})),buttons:[...document.querySelectorAll('button')].filter(visible).map(e=>({text:e.innerText,id:e.id})),footer:!!document.querySelector('.site-footer'),nav:[...document.querySelectorAll('.nav a')].map(a=>({text:a.textContent,href:a.getAttribute('href'),current:a.getAttribute('aria-current')})),mobileNav:[...document.querySelectorAll('.menu-panel a')].map(a=>({text:a.textContent,href:a.getAttribute('href'),current:a.getAttribute('aria-current')})),footerLinks:[...document.querySelectorAll('.site-footer a')].map(a=>({text:a.textContent,href:a.getAttribute('href')}))};
}
(async()=>{
const browser=await pp.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const result={date:new Date().toISOString(),layout:[],pages:{},errors:[],anchors:[],menus:[],sliders:[],submissions:[],destinations:[]};
const jobs=sizes.flatMap(([w,h])=>names.map(n=>({w,h,n})));
async function worker(){const p=await browser.newPage();let job;p.on('pageerror',e=>result.errors.push({job,error:String(e)}));
 while(job=jobs.shift()){const {w,h,n}=job;await p.setViewport({width:w,height:h});const response=await p.goto(`${base}/${n}`,{waitUntil:'load',timeout:40000});await p.evaluate(()=>document.fonts.ready);await sleep(70);const r=await p.evaluate(measure);result.layout.push({page:n,size:`${w}x${h}`,status:response.status(),...r,links:undefined,nav:undefined,mobileNav:undefined,footerLinks:undefined,buttons:undefined});if(w===1440)result.pages[n]=r;
 if(r.scrollWidth>w||r.problems.length||r.photos.length)console.log('LAYOUT',n,w,h,'overflow',r.scrollWidth-w,'issues',JSON.stringify(r.problems).slice(0,250),'tall',r.photos.length);
 if(w===390&&await p.$('details.menu')){await p.click('summary.burger');await sleep(80);const open=await p.$eval('details.menu',e=>e.open);await p.click('summary.burger');const closed=await p.$eval('details.menu',e=>!e.open);result.menus.push({page:n,open,closed});}
 if(['home','raja-ampat','north-sulawesi','yachts','advisors'].includes(n)){
 const targets=await p.$$eval('.subnav a[href^="#"],.hero a[href^="#"]',es=>[...new Set(es.map(e=>e.getAttribute('href')))]);
 for(const target of targets){await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';scrollTo(0,0)});await sleep(100);const selector=`.subnav a[href="${target}"],.hero a[href="${target}"]`;await p.$eval(selector,e=>e.click());await sleep(320);const a=await p.evaluate(t=>{const e=document.querySelector(t),head=e?.querySelector('h2')||e,b=x=>x?.getBoundingClientRect(),nav=document.querySelector('.subnav'),hdr=document.querySelector('.site-header'),sticky=[nav,hdr].filter(e=>e&&['fixed','sticky'].includes(getComputedStyle(e).position)).map(e=>b(e).bottom);const sec=e?.closest('section'),prices=[...sec?.querySelectorAll('.trip-price')||[]].map(e=>b(e).bottom),bar=document.querySelector('.mbar');return {target:t,headTop:b(head)?.top,barBottom:Math.max(0,...sticky),pricesBottom:prices.length?Math.max(...prices):null,barOn:bar?.classList.contains('is-on'),barTop:bar?b(bar).top:null,scrollY};},target);result.anchors.push({page:n,size:`${w}x${h}`,...a});}
 }
 }await p.close();}
await Promise.all([worker(),worker(),worker()]);
const p=await browser.newPage();await p.setViewport({width:390,height:660});
for(const n of ['raja-ampat','north-sulawesi','yachts']){await p.goto(`${base}/${n}`);await p.$eval('#days',e=>e.scrollIntoView());const before=await p.$$eval('.trip-price b',es=>es.map(e=>e.textContent));await p.focus('#days');await p.keyboard.press('ArrowRight');const after=await p.$$eval('.trip-price b',es=>es.map(e=>e.textContent));result.sliders.push({page:n,before,after,days:await p.$eval('#days',e=>e.value),targets:await p.$$eval('.trip .btn',es=>es.map(e=>e.href))});}
for(const [n,selector] of [['plan','a[href="thank-you.html"]'],['advisors','a[href="thank-you-advisor.html"]']]){await p.goto(`${base}/${n}`);await p.$eval(selector,e=>e.scrollIntoView());await Promise.all([p.waitForNavigation(),p.click(selector)]);result.submissions.push({from:n,to:p.url()});}
const urls=[...new Set(Object.values(result.pages).flatMap(r=>r.links).filter(a=>a.href&&a.href!=='#'&&!a.href.startsWith('#')).map(a=>a.url))];
for(const url of urls){try {const r=await p.goto(url,{waitUntil:'load',timeout:30000});const hash=new URL(url).hash;result.destinations.push({url,status:r.status(),title:await p.title(),anchor:hash?await p.evaluate(h=>!!document.getElementById(decodeURIComponent(h.slice(1))),hash):true});}catch(e){result.destinations.push({url,error:String(e)})}}
fs.writeFileSync(OUT+'/html-audit.json',JSON.stringify(result,null,2));console.log('DONE',result.layout.length,'layouts',result.destinations.length,'targets',result.errors.length,'JS errors');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

const fs=require('fs');
const pp=require('../../tools/penpot-sync/node_modules/puppeteer-core');
(async()=>{
 const b=await pp.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const p=await b.newPage(); await p.setViewport({width:1440,height:640});
 p.on('response',async r=>{if(r.url().includes('/api/')) console.log('API',r.status(),r.url(),(await r.text().catch(()=>'' )).slice(0,160));});
 for(const url of ['https://islands-1000-prototype.pages.dev','https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ad&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0']){
  try {const r=await p.goto(url,{waitUntil:'networkidle2',timeout:45000}); console.log('PAGE',r.status(),await p.title(),(await p.$eval('body',e=>e.innerText)).slice(0,3500));}catch(e){console.log(String(e));}
 }
 await p.screenshot({path:__dirname+'/penpot-cover.png'});
 fs.writeFileSync(__dirname+'/penpot-dom.html',await p.content());
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});

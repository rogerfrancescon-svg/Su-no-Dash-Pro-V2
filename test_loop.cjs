const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  let renderCount = 0;
  page.on('console', msg => {
    if(msg.text().includes('APP_RENDER')) renderCount++;
  });
  await page.goto('http://localhost:3000');
  
  // click "Modo Offline" 
  await page.evaluate(() => {
    window.dispatchEvent(new Event('offline-login'));
  });
  
  await new Promise(r => setTimeout(r, 5000));
  console.log('Render count:', renderCount);
  await browser.close();
})();

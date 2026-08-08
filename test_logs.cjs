const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => {
    console.log(msg.type(), msg.text());
  });
  await page.goto('http://localhost:3000');
  
  // wait 2s
  await new Promise(r => setTimeout(r, 2000));
  
  // click "Modo Offline" 
  await page.evaluate(() => {
    window.dispatchEvent(new Event('offline-login'));
  });
  
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
})();

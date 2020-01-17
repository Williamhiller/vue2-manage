
const puppeteer = require('puppeteer');
// const iPhone = puppeteer.devices['iPhone 6'];
// const findChrome = require('./node_modules/carlo/lib/find_chrome');


(async () => {
    // let findChromePath = await findChrome({});
    // let executablePath = findChromePath.executablePath;
    // console.log(executablePath)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1020,
            height: 1080
        }
    });
    const page = await browser.newPage();
    // await page.setRequestInterception(true);
    // page.on('request', (request) => {
    //     if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
    //         request.abort();
    //     } else {
    //         request.continue();
    //     }
    // });
    // await page.emulate(iPhone);
    await page.goto('http://live.win007.com/indexall.aspx');

    await page.waitForSelector('#table_live');
    let matchList = await page.evaluate(() =>{
        var list = [];
        var trs = document.querySelectorAll('#table_live tr');

        for(var i=0; i< trs.length; i++) {
            var tr = trs[i];
            var id = tr.id;
            var code = id.split('_')[1];
            if(id.includes('tr1') && code !== '0') {
                var tds = tr.querySelectorAll('td');
                list.push({
                    code: code,
                    match: tds[1].innerText,
                    homeTeam : tds[4].querySelectorAll('a')[2].innerText,
                    guestTeam : tds[6].querySelectorAll('a')[0].innerText
                })
            }
        }

        return list
    });
    console.log(matchList)

})();


const puppeteer = require('puppeteer-core');
const findChrome = require('./node_modules/carlo/lib/find_chrome');

(async () => {
    let findChromePath = await findChrome({});
    let executablePath = findChromePath.executablePath;
    // console.log(executablePath)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080
        },
        executablePath: executablePath
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });
    // await page.emulate(iPhone);
    await page.goto('https://www.ixiupet.com/zixun/');

    const elementInput = await page.$('input#kw');
    const elementBtn = await page.$('#su');
    setTimeout(async function () {
        await elementInput.type('test');
    },4000);
    setTimeout(async function () {
        elementBtn.click()
    },5000);
    // setTimeout(async function () {
    //     await elementHandle.press('Enter');
    // },6000)
    setTimeout(async function () {

        // browser.close()
    },10000)
})();

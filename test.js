
const puppeteer = require('puppeteer-core');
// const iPhone = puppeteer.devices['iPhone 6'];
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
    // await page.emulate(iPhone);
    await page.goto('https://www.baidu.com/');

    let x = 10;
    x = await page.evaluate(() =>{
        var test = document.querySelector('#su').value;// 联赛名称
        return test
    });
    console.log(x)
    // const divsCounts = await page.$$eval('#su', el => el.innerHTML);
    // const elementHandle = await page.$('input#kw');
    // setTimeout(async function () {
    //     await elementHandle.type('input');
    // },4000)
    // setTimeout(async function () {
    //     await elementHandle.type(' text');
    // },5000)
    // setTimeout(async function () {
    //     await elementHandle.press('Enter');
    // },6000)
    setTimeout(async function () {

        browser.close()
    },10000)
})();

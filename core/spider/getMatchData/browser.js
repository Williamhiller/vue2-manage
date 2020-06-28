
const puppeteer = require('puppeteer-core');
// const findChrome = require('../../../node_modules/carlo/lib/find_chrome');

let browser;

module.exports = (async () => {
    let findChromePath = await findChrome({});
    let executablePath = findChromePath.executablePath;
    browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 1920,
            height: 1080
        },
        executablePath : executablePath
    });
    return browser;
})();


const puppeteer = require('puppeteer');
let browser;

module.exports = (async () => {

    browser = await puppeteer.launch({
        headless: false
    });
    return browser;
})();

/**
 * Created by Williamhiler on 2016/11/22.
 */

const puppeteer = require('puppeteer-core');
const findChrome = require('../../node_modules/carlo/lib/find_chrome');

module.exports = (async function () {
    let findChromePath = await findChrome({});
    let executablePath = findChromePath.executablePath;
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 1020,
            height: 1080
        },
        executablePath: executablePath
    });
    return {
        getMatchRound : function (url) {
            return new Promise(async (resolve) => {
               const page = await browser.newPage();
               await page.goto(url);
               let data = await page.evaluate(() =>{
                   var data = {};
                   data.arrLeague = arrLeague;
                   data.arrTeam = arrTeam;
                   data.jh = jh;
                   return data;
               });
               page.close();
               resolve(data)
            })
        },
        getMatchData : function (url) {
            return new Promise(async (resolve) => {
               const page = await browser.newPage();
               await page.goto(url);
               let data = await page.evaluate(() =>{
                   var data = {};

                   data.game = window.game;
                   data.hash = window.hsDetail._hash;
                   var oddset = document.getElementById('oddstr_370');
                   var tds = oddset.querySelectorAll('td');
                   var strArr = tds[3].getAttribute('onclick').split('\'');

                   data.params = strArr[1];

                   return data;
               });
               page.close();
               resolve(data)
            })
        },
        getHistoryData : function (url) {
            return new Promise(async (resolve) => {
                const page = await browser.newPage();
                await page.goto(url);
                let data = await page.evaluate(() =>{
                    var data = [];

                    var trs = document.querySelectorAll('tr');
                    trs.forEach(function (item, index) {
                        if(index === 0) {
                            return
                        }
                        var tds = item.querySelectorAll('td');
                        data.push([
                            tds[0].innerText,
                            tds[1].innerText,
                            tds[2].innerText
                        ])
                    });

                    return data;
                });
                page.close();
                resolve(data)
            })
        }
    }
})();



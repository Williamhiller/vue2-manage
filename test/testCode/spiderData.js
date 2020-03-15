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
            width: 1920,
            height: 1080
        },
        executablePath : executablePath
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

                   var scores = document.getElementById("headVs").querySelectorAll(".score");
                   data.game = window.game;
                   data.gameDetail = window.gameDetail;
                   data.result = scores[0].innerText + "-" + scores[1].innerText;

                   // data.hash = window.hsDetail._hash;
                   // oddstr_115 威廉 370 oddset
                   // var oddset = document.getElementById('oddstr_115');
                   // var tds = oddset.querySelectorAll('td');
                   // var strArr = tds[3].getAttribute('onclick').split('\'');

                   // data.params = strArr[1];
                   // data.home = window.hometeam_cn;
                   // data.guest = window.guestteam_cn;

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
                            tds[0].innerText, // 主胜
                            tds[1].innerText, //平
                            tds[2].innerText,//负
                            tds[3].innerText,//胜概率
                            tds[4].innerText,//平概率
                            tds[5].innerText,//负概率
                            tds[6].innerText,//返还率
                            tds[7].innerText,//主凯利
                            tds[8].innerText,//平凯利
                            tds[9].innerText,//客凯利
                            tds[10].innerText,//时间
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



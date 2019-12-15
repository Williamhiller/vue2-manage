/**
 * Created by Williamhiler on 2016/11/22.
 */

module.exports = function (url) {
    return new Promise(async (resolve, reject) =>{
        try {
            let browser = await require('./browser');
            const page = await browser.newPage();
            await page.setRequestInterception(true);
            page.on('request', (request) => {
                if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
                    request.abort();
                } else {
                    request.continue();
                }
            });
            await page.goto(url);

            let data = await page.evaluate(() =>{
                var data = {};

                var matchData = {};
                matchData.homeName = hometeam;
                matchData.homeCode = h2h_home;
                matchData.guestName = guestteam;
                matchData.guestCode = h2h_away;
                matchData.league = document.querySelector('.LName').innerHTML;// 联赛名称
                matchData.homeData = h_data;
                matchData.guestData = a_data;
                matchData.historyData = v_data;

                data.matchData = matchData;

                return data;
            });
            await page.close();

            resolve(data);
        }catch (e) {
            reject(e)
        }
    });
};



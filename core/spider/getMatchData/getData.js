/**
 * Created by Williamhiler on 2016/11/22.
 */
let Q = require("q");
let phantom = require('phantom');
module.exports = async function (url) {
    let deferred = Q.defer();

    let ph = await phantom.create();
    let page = await ph.createPage();
    page.setting('userAgent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3440.75 Safari/537.36');
    page.setting('loadImages',false);

    try {
        await page.open(url);
        let data = await page.evaluate(function () {
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
        page.close();
        ph.exit(0);
        deferred.resolve(data);
    }catch (e) {
        deferred.reject(e);
    }

    return deferred.promise;
};



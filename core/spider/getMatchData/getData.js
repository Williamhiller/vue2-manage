/**
 * Created by Williamhiler on 2016/11/22.
 */
let Q = require("q");
let phantom = require('phantom');
let _ph, _page;

module.exports = function (url) {
    let deferred = Q.defer();
    let _url = url;

    phantom.create().then(function (ph) {
        _ph = ph;
        return _ph.createPage();
    }).then(function (page) {
        _page = page;
        _page.setting('userAgent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3440.75 Safari/537.36');

        console.log(_url)
        return _page.open(_url);
    }).then(function (status) {
        console.log(status)

        return _page.evaluate(function () {
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
    }).then(function (data) {
        deferred.resolve(data);

        _page.close();
        _ph.exit(0);
    }).catch(function (e) {
        console.log(e)
        deferred.reject(e);
    });

    return deferred.promise;
};


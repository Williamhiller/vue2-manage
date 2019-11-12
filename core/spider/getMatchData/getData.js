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

        return _page.open(_url);
    }).then(function (status) {
        console.log(status);

        return _page.evaluate(function () {
            var data = {};
            var bet365D = document.getElementById("tr_o_1_8");
            var initial = {};
            var bet365;

            if(bet365D) {
                bet365 = bet365D.querySelectorAll("td");
                initial.up = parseFloat(bet365[11].innerHTML);
                initial.position = bet365[12].innerHTML;
                initial.down = parseFloat(bet365[13].innerHTML);
            }

            var matchData = {};
            matchData.homeName = hometeam;
            matchData.homeCode = h2h_home;
            matchData.guestName = guestteam;
            matchData.guestCode = h2h_away;
            // matchData.league = document.querySelector('.LName').innerHTML;// 联赛名称
            matchData.homeData = h_data;
            matchData.guestData = a_data;
            matchData.historyData = v_data;

            data.matchData = matchData;
            data.initial = initial;

            return data;
        });
    }).then(function (data) {
        let dataAll = data;
        dataAll.initial.position = getNumberPos(dataAll.initial.position || "");

        deferred.resolve(dataAll);

        _page.close();
        _ph.exit(0);
    }).catch(function (e) {
        console.log(e);
        deferred.reject(e);
    });

    return deferred.promise;
};

/**
 * 分数盘口转小数盘口
 * @param deno 字符串形式的分数盘
 * @returns {number}
 */
function getNumberPos(deno) {
    let pos = 0;
    let arr = deno.split("/");
    arr.forEach(function (item) {
        pos += parseFloat(item);
    });

    return deno?pos/arr.length : 0;
}


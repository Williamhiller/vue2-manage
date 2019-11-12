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

            var trs = document.getElementById("table_live").getElementsByTagName("tr");
            // let date = trs[2].getAttribute("name"); // 周五，周六，目的是获取今天的比赛
            //
            var list = [];
            var tds,tr_item;

            for(var i=2;i<trs.length;i++) {
                tr_item = trs[i];
                var date = tr_item.getAttribute("name");
                if(date == null) { // 如果没有了，则表示仅今天的
                    continue;
                }

                tds = tr_item.getElementsByTagName("td");
                var tr_id = tr_item.id.split("_");
                if(tr_id[0] === "tr2") {
                    continue;
                }
                list.push({
                    date : date,
                    code : tr_id[1],
                    idx : tds[0].querySelector("div").innerText,
                    league : tds[1].querySelector("a").innerText,
                    homeName : tds[4].querySelector("a").innerText,
                    guestName : tds[6].querySelector("a").innerText
                })

            }

            return list;
        });

    }).then(function (list) {

        deferred.resolve(list);

        _page.close();
        _ph.exit(0);
    }).catch(function (e) {
        console.log(e);
        deferred.reject(e);
    });

    return deferred.promise;
};


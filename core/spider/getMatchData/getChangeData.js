/**
 * Created by Williamhiler on 2016/11/22.
 */
var Q = require("q");
var phantom = require('phantom');
var _ph, _page;

module.exports = function (url) {
    var deferred = Q.defer();
    var _url = url;

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

            var trs = document.getElementById("odds2").getElementsByTagName("tr");
            var now =[], run=[];
            var tds;
            for(var i=1;i<trs.length;i++) {
                tds = trs[i].getElementsByTagName("td");
                if(tds.length > 5) {
                    if(tds[0].innerHTML) { //表示滚球
                        run.push([
                            tds[0].innerHTML,
                            tds[1].innerHTML,
                            tds[2].querySelector("b").innerHTML,
                            tds[3].querySelector("font").innerHTML,
                            tds[4].querySelector("b").innerHTML,
                            tds[5].innerHTML
                        ]);
                    }else {
                        now.push([
                            tds[2].querySelector("b").innerHTML,
                            tds[3].querySelector("font").innerHTML,
                            tds[4].querySelector("b").innerHTML,
                            tds[5].innerHTML
                        ]);
                    }
                }
            }
            var half = false;
            for(var i =0; i <run.length ; i++) {
                var item = run[i];
                if(item[0] === "中场") {
                    half = true;
                }
                if(half && parseInt(item[0]) > 45) {
                    item[0] = "45";
                }
            }

            data.now = now;
            data.run = run;

            return data;
        });

    }).then(function (data) {

        deferred.resolve(data);

        _page.close();
        _ph.exit(0);
    }).catch(function (e) {
        console.log(e);
        deferred.reject(e);
    });

    return deferred.promise;
};


/**
 * Created by Williamhiler on 2016/11/22.
 */

var phantom = require('phantom');
var Q = require("q");
var _ph, _page, _outObj;

module.exports = function (url) {
    var deferred = Q.defer();

    var _url = url;

    phantom.create().then(function (ph) {
        _ph = ph;
        return _ph.createPage();
    }).then(function (page) {
        _page = page;
        _page.setting('userAgent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36');

        return _page.open(_url);
    }).then(function (status) {
        console.log(status);

        return _page.evaluate(function () {
            // $("#Table2 tr").eq(1).find("td:last-child").click();

            // var arr = [];
            // $("#Table3 tr").each(function () {
            //     if($(this).attr("align")) {
            //         var href = $(this).find("td").eq(9).find("a").eq(0).attr("href");
            //         var code = href.match(/\d+/)[0];
            //         arr.push(code)
            //     }
            // });

            var data = {};
            // data.roundArr = arr;
            data.jh = document.jh;
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




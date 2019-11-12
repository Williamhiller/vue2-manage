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
        _page.setting('userAgent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3440.75 Safari/537.37');

        return _page.open(_url);
    }).then(function (status) {
        console.log(status);

        return _page.evaluate(function () {
            var data = {};

            data.game = window.game;
            data.gameDetail = window.gameDetail;

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



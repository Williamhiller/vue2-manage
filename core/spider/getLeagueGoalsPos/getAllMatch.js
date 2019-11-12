/**
 * Created by Williamhiler on 2016/11/22.
 */

let phantom = require('phantom');
let Q = require("q");
let _ph, _page;

module.exports = function (url) {
    return new Promise((resolve, reject)=> {
        let _url = url;

        phantom.create().then(function (ph) {
            _ph = ph;
            return _ph.createPage();
        }).then(function (page) {
            _page = page;
            _page.setting('userAgent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3440.75 Safari/537.36');

            return _page.open(_url);
        }).then(function (status) {
            console.log(status);

            return _page.evaluate(function () {
                var data = {};
                data.arrLeague = arrLeague;
                data.arrTeam = arrTeam;
                data.jh = jh;
                return data;
            });
        }).then(function (data) {
            resolve(data);

            _page.close();
            _ph.exit(0);
        }).catch(function (e) {
            console.log(e);
            reject(e);
        });
    });

};




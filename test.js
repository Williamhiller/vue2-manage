// a phantomjs example
var page = require('webpage').create();
phantom.outputEncoding="gbk";
page.open("http://www.topfe.cn", function(status) {
    if ( status === "success" ) {
        console.log(page.title);
    } else {
        console.log("Page failed to load.");
    }
    phantom.exit(0);
});

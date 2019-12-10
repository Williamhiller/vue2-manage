var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
phantom.create()
    .then(instance => {
        phInstance = instance;
        console.log(111111)
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        console.log(222222)
        return page.open('https://www.baidu.com/');
    })
    .then(status => {
        console.log(333333)
        console.log(status);
        return sitepage.property('content');
    })
    .then(content => {
        console.log(content);
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });

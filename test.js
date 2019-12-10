// var phantom = require('phantom');
//
// var sitepage = null;
// var phInstance = null;
// phantom.create()
//     .then(instance => {
//         phInstance = instance;
//         console.log(111111)
//         return instance.createPage();
//     })
//     .then(page => {
//         sitepage = page;
//         console.log(222222)
//         return page.open('https://www.baidu.com/');
//     })
//     .then(status => {
//         console.log(333333)
//         console.log(status);
//         return sitepage.property('content');
//     })
//     .then(content => {
//         console.log(content);
//         sitepage.close();
//         phInstance.exit();
//     })
//     .catch(error => {
//         console.log(error);
//         phInstance.exit();
//     });
'use strict'
const superagent = require('superagent')
const cheerio = require('cheerio')

var theUrl = 'http://localhost:3000/spa.html'

const spider = (link) => {
    let promise =  new Promise( (resolve, reject) => {
        superagent.get(link)
            .end((err, res) => {
                if (err) return console.log(err)
                let $ = cheerio.load(res.text)
                console.log($('html').html())
                resolve($)
            })
    })
    return promise
}

spider(theUrl)

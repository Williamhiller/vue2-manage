/**
 * Created by Williamhiler on 2016/11/22.
 */
module.exports = function () {

    return new Promise(async (resolve) => {
        let browser = await require('./browser');
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
        await page.goto('http://live.win007.com/indexall.aspx', {
            timeout : 0
        });

        await page.waitForSelector('#table_live');
        let matchList = await page.evaluate(() =>{
            var list = [];
            var trs = document.querySelectorAll('#table_live tr');

            for(var i=0; i< trs.length; i++) {
                var tr = trs[i];
                var id = tr.id;
                var code = id.split('_')[1];
                if(id.includes('tr1') && code !== '0') {
                    var tds = tr.querySelectorAll('td');
                    var vs = tds[9].querySelectorAll('div')[0];
                    if(!vs) {
                        continue;
                    }

                    if(tds[3].innerText) {
                        continue;
                    }
                    list.push({
                        code: code,
                        match: tds[1].innerText,
                        homeName : tds[4].querySelectorAll('a')[2].innerText,
                        guestName : tds[6].querySelectorAll('a')[0].innerText,
                        asianOdd : vs ? vs.innerText: ''
                    })
                }
            }

            return list
        });
        page.close();
        resolve(matchList)
    })
};


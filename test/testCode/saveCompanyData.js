

let fs = require("fs");
let location = "./static_temp/";


let url = "http://zq.win007.com/big/League/36.html";
let dataAll = [];
(async function () {
    let spiderData = await require("./spiderData");

    let roundData = await spiderData.getMatchRound(url);

    let allArr = [];
    for(let i=1 ; i < 20 ; i ++) {
        let round = roundData.jh["R_"+i];
        allArr = allArr.concat(round);
    }
    let companyCode = '';

    for(let j =0; j<allArr.length;j++) {
        let code = allArr[j][0];
        let matchUrl = `http://op1.win007.com/oddslist/${code}.htm`;
        let matchData = await spiderData.getMatchData(matchUrl);
        let historyUrl = `http://op1.win007.com${matchData.params}`;

        let list = await spiderData.getHistoryData(historyUrl);

        console.log(code,j)

        for(let h=0; h<list.length; h++) {
            let dataItem = list[h];
            dataAll.push(dataItem);

            await fs.writeFileSync(location + 'En.json',JSON.stringify(dataAll));
        }
    }

})();




let fs = require("fs");
let location = "../../static_temp/";

// 换成日职乙
let url = "http://zq.win007.com/big/League/8.html";
let dataAll = [];
(async function () {
    let spiderData = await require("./spiderData");

    let roundData = await spiderData.getMatchRound(url);

    let allArr = [];
    for(let i=1 ; i < 18 ; i ++) {
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
            dataAll.push({
                home: dataItem[0],
                draw: dataItem[1],
                guest: dataItem[2]
            });
            await fs.writeFileSync(location+'oddset.json',JSON.stringify(dataAll,null,4));
        }
    }

})();


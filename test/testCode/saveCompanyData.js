
let MongoClient = require('mongodb').MongoClient;
let spiderData = require("./spiderData");


let url = "http://zq.win007.com/cn/League/2018-2019/36.html";
let dataAll = [];
MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, async function(err, db) {
    if (err) {
        throw err;
        return;
    };
    let dbo = db.db("admin");
    let collection = dbo.collection("E2019");

    let spiderData = await require("./spiderData");
    let roundData = await spiderData.getMatchRound(url);

    let allArr = [];
    for(let i=1 ; i < 38 ; i ++) {
        let round = roundData.jh["R_"+i];
        allArr = allArr.concat(round);
    }

    console.log(allArr.length)
    for(let j =199; j<allArr.length;j++) {
        let code = allArr[j][0];

        let matchUrl = `http://op1.win007.com/oddslist/${code}.htm`;
        let matchData = await spiderData.getMatchData(matchUrl);
        let historyUrl = `http://op1.win007.com${matchData.params}`;

        let list = await spiderData.getHistoryData(historyUrl);

        console.log(code,j)
        let saveObj = {
            code : code,
            home: matchData.home,
            guest: matchData.guest,
            odds : list
        }
        await collection.insertOne(saveObj, async function(err, res) {
            if (err) throw err;
            console.log("success")
        });
    }
});



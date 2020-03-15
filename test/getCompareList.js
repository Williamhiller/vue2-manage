let MongoClient = require('mongodb').MongoClient;
// let url = "mongodb://localhost:27017/";
let url = "mongodb+srv://william:liu123@cluster0-jyw35.mongodb.net";
let matchUrl = "http://zq.win007.com/cn/SubLeague/2019-2020/6.html";
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology:true }, async function(err, db) {

    let dbo = db.db("vuechat");
    // let tactics = await dbo.collection("tactics").find({}).toArray();

    let comparelist = await dbo.collection("comparelist");

    let spiderData = await require("./testCode/spiderData");
    let roundData = await spiderData.getMatchRound(matchUrl);

    let allArr = [];
    for(let i=1 ; i < 26 ; i ++) {
        let round = roundData.jh["R_"+i];
        allArr = allArr.concat(round);
    }

    for(let j =24; j<200;j++) {
        let code = allArr[j][0];

        let matchUrl = `http://op1.win007.com/oddslist/${code}.htm`;
        let matchData = await spiderData.getMatchData(matchUrl);
        let obj = {};
        obj.result = matchData.result;

        // data game和gameDetail 其中game 大概在第26位置 82|code|Ladbrokes  William Hill
        let L_code , W_code , code_365;
        matchData.game.forEach(function (item) {
            if(item.indexOf("|Ladbrokes|") !== -1) {
                L_code = item.split("|")[1];
            }
            if(item.indexOf("|William Hill|") !== -1) {
                W_code = item.split("|")[1];
            }
            if(item.indexOf("|Bet 365|") !== -1) {
                code_365 = item.split("|")[1];
            }
        });
        if(!L_code && !W_code) {
            return '';
        }

        matchData.gameDetail.forEach(function (item) {
            let arr = item.split("^");
            if(arr[0] === L_code) {
                obj.ladbrokes = arr[1];
            }
            if(arr[0] === W_code) {
                obj.william = arr[1];
            }
            if(arr[0] === code_365) {
                obj.bet = arr[1];
            }
        });

        console.log(j);
        await comparelist.insertOne(obj);
    }


    // dbo.collection("test").insertMany(myObj, function(err, res) {
    //     if (err) throw err;
    //     console.log("插入的文档数量为: " + res.insertedCount);
    //     db.close();
    // });
    // dbo.collection("test").updateOne({code:234562}, {$set:myObj[0]},{upsert :true},function(err, res) {
    //     if (err) throw err;
    //     console.log("插入的文档数量为: " + res.insertedCount);
    //     db.close();
    // });
    // let filter = { "homeRecentScore":{$gte:67}};
    // dbo.collection("test").find({code:234562}).toArray(function(err, result) { // 返回集合中所有数据
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // })
});

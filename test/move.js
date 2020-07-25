let MongoClient = require('mongodb').MongoClient;
// let url = "mongodb://localhost:27017/";
let url = "mongodb+srv://william:liu123@cluster0-jyw35.mongodb.net";


MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology:true }, async function(err, db) {

    let dbo = db.db("vuechat");
    // let tactics = await dbo.collection("tactics").find({}).toArray();

    let rules = await dbo.collection("rules").find({}).toArray();
    // let ruleMatches = await dbo.collection("rulematches");

    console.log(rules)
    let maps = {};
    rules.forEach((item) => {
        maps[item.match] = 1
    })
    console.log(maps)
    return;
    for(let i=0; i<tactics.length; i++) {
        let tacticItem = tactics[i];
        let tacticId = tacticItem._id.toString();
        let matchIds = {};
        let tacticMatches = await dbo.collection("tacticmatches").find({
            tacticId : tacticId
        }).toArray();

        for(let j=0;j<tacticMatches.length; j++) {
            let matchItem = tacticMatches[j];
            let match = matchItem.match;
            if(!matchIds[match]) {
                let res = await rules.insertOne({
                    match : matchItem.match,
                    result: tacticItem.result,
                    area: tacticItem.area,
                    situation: tacticItem.situation,
                    description: tacticItem.tactics,
                });
                matchIds[match] = res.insertedId.toString()
            }

            await ruleMatches.insertOne({
                code : matchItem.code,
                odd: matchItem.odd,
                score: matchItem.score,
                ruleId: matchIds[match],
            })
        }

    }

    console.log("done")


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

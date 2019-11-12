
let fs = require("fs");
let location = "../../data/";
let utils = require("../../utils/utils");
let setAnalyze = require("./setAnalyze");
let getAllMatch = require('../spider/getLeagueGoalsPos/getAllMatch'); // 获取欧赔数据

// 换成英冠
let url = "http://zq.win007.com/cn/League/34.html";
getAllMatch(url).then(function (pageData) {
    let round = pageData.jh.R_37; // 第38轮
    let league = pageData.arrLeague[9];
    let len = round.length;
    let allAnalyze = "";

    let go = function (index) {
        let item = round[index];
        let code = item[0];

        allAnalyze = league + " ";
        setAnalyze(code).then(function (output) {
            allAnalyze += output;
            allAnalyze += "\n";

            if(index < len) {
                fs.appendFile(location+'analyze/analyzeLeagueAll.txt',allAnalyze,function(err){
                    let next = index + 1;
                    console.log("fs-append-success",index);

                    if(next < len) {
                        go(next)
                    }
                });
            }
        });
    };

    go(0)

});


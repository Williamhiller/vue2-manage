
let fs = require("fs");
let location = "../../data/";
let utils = require("../../utils/utils");
let setAnalyze = require("./setAnalyze");
let getJingcaiList = require('../spider/getMatchData/getJingcaiList'); // 获取欧赔数据

getJingcaiList("http://jc.win007.com/index.aspx").then(function (list) {

    let today = list.filter((item) => {
        return (item.date === '周二')
    });

    fs.writeFile(location+'analyze/jingcaiList.json',utils.beautifyJson(today,1),function(err){
        console.log("write-jingcaiList-success")
    });

    let allAnalyze = "";
    let len = today.length;

    let go = function (index) {
        let item = today[index];
        allAnalyze = item.idx + " " + item.league + " ";
        setAnalyze(item.code).then(function (output) {
            allAnalyze += output;
            allAnalyze += "\n";

            if(index < len) {
                fs.appendFile(location+'analyze/analyzeAll.txt',allAnalyze,function(err){
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


/**

 爬取单场比赛的分析数据，欧赔细节等
 */
let fs = require("fs");
let location = "../../data/";
let getData = require('../spider/getMatchData/getData'); // 获取联赛数据，近况往绩等
let getChangeData = require("../spider/getMatchData/getChangeData");
let utils = require("../../utils/utils");
let calcUpDown = require("../calcLevels/calcUpDown");

/**
 * 自动生成分析矩阵
 * @param data
 * @param first 365大小球初盘
 */
let writeFun = function (data,first) {
    let matchData = data.matchData;
    let position = parseFloat(first[1]);

    // 开始解析近况往绩
    let history = "" , home = ["",""], guest = ["",""];
    let firstDate = new Date(first[3]);
    matchData.historyData.forEach((item) => {
        if(history.length < 6) {
            history += utils.getGoalsUp(item[8],item[9],position)
        }
    });
    matchData.homeData.forEach((item) => {
        let itemDate = new Date("20" + item[0] + " 00:00:00");
        // 开盘时间
        if(firstDate > itemDate) {
            if(item[4] === matchData.homeCode) {
                // 主场
                if(home[1].length < 6) {
                    home[1] += utils.getGoalsUp(item[8],item[9],position)
                }
            }
            if(home[0].length < 6) {
                home[0] += utils.getGoalsUp(item[8],item[9],position)
            }
        }

    });
    matchData.guestData.forEach((item) => {
        let itemDate = new Date("20" + item[0] + " 00:00:00");
        if(firstDate > itemDate) {
            // 如果主队代码和客队代码不同，则表示本场是客场
            if(item[4] !== matchData.guestCode) {
                // 客场
                if(guest[1].length < 6) {
                    guest[1] += utils.getGoalsUp(item[8],item[9],position)
                }
            }
            // 客队近6场
            if(guest[0].length < 6) {
                guest[0] += utils.getGoalsUp(item[8],item[9],position)
            }
        }

    });

    let output = "";
    output +=  `${matchData.homeName}-${matchData.guestName}\n`;
    output += `往绩${utils.getGoalOverview(history)}（${history}）\n`;
    output += `主队${utils.getGoalOverview(home[0])}（${home[0]}） `;
    output += `主场${utils.getGoalOverview(home[1])}（${home[1]}）\n`;
    output += `客队${utils.getGoalOverview(guest[0])}（${guest[0]}） `;
    output += `客场${utils.getGoalOverview(guest[1])}（${guest[1]}）\n`;
    output += calcUpDown(history,home,guest);

    output += `365 ${first[0]} ${first[1]} ${first[2]} >${first[3]}\n`;

    fs.writeFile(location+'analyze/gameAnalyze.txt',output,function(err){
        console.log("fs-write-success",err)
    });
    return output;
};

let start = function (code) {

    return new Promise((resolve, reject) => {
        getData(`http://zq.win007.com/analysis/${code}cn.htm`).then(function (data) {
            // 如果是非2.5盘口，就直接返回
            if(data.initial.position !== 2.5) {
                resolve("");
                return;
            }

            let url = `http://vip.win007.com/changeDetail/overunder.aspx?id=${code}&companyID=8&l=0`;
            getChangeData(url).then(function (changeData) {

                let first = changeData.now[changeData.now.length-1];
                first[3] = "2019-" + first[3];

                resolve(writeFun(data,first))
            });
        });
    });
};
// start(1552512);

module.exports = start;



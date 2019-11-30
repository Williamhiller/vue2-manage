/**

 爬取单场比赛的分析数据，欧赔细节等
 */

let getData = require('../spider/getMatchData/getData'); // 获取联赛数据，近况往绩等
let getOddData = require('../spider/getMatchData/getOddData'); // 获取欧赔数据
let utils = require("../../utils/utils");


let saveData = { // 保存威廉和立博的初赔信息
    W : [],
    L : []
};
/**
 * 自动生成分析矩阵
 * @param data
 */
let writeFun = function (data) {

    let matchData = data.matchData;
    // 开始解析近况往绩
    let history = "" , home = ["",""], guest = ["",""];
    let williamDate = new Date(saveData.W[3]);
    matchData.historyData.forEach((item) => {
        let h , g;
        if(item[4] === matchData.homeCode) {
            [h,g] = [item[8],item[9]];
        }else {
            [h,g] = [item[9],item[8]];
        }
        if(history.length < 6) {
            history += utils.getMatchResult(h,g)
        }
    });
    matchData.homeData.forEach((item) => {
        let h , g;
        let itemDate = new Date("20" + item[0] + " 00:00:00");
        // 开盘时间
        if(williamDate > itemDate) {
            if(item[4] === matchData.homeCode) {
                [h,g] = [item[8],item[9]];
                // 主场
                if(home[1].length < 6) {
                    home[1] += utils.getMatchResult(h,g)
                }
            }else {
                [h,g] = [item[9],item[8]];
            }
            if(home[0].length < 6) {
                home[0] += utils.getMatchResult(h,g)
            }
        }

    });
    matchData.guestData.forEach((item) => {
        let h , g;
        let itemDate = new Date("20" + item[0] + " 00:00:00");
        if(williamDate > itemDate) {
            if(item[4] === matchData.guestCode) {
                [h,g] = [item[8],item[9]];
            }else {
                [h,g] = [item[9],item[8]];
                // 主场
                if(guest[1].length < 6) {
                    guest[1] += utils.getMatchResult(h,g)
                }
            }
            if(guest[0].length < 6) {
                guest[0] += utils.getMatchResult(h,g)
            }
        }

    });

    let output;
    output = "";
    output +=  `${matchData.homeName}-${matchData.guestName}\n`;
    output += `往绩${utils.getMatchOverview(history)}（${history}）\n`;
    output += `主队${utils.getMatchOverview(home[0])}（${home[0]}） `;
    output += `主场${utils.getMatchOverview(home[1])}（${home[1]}）\n`;
    output += `客队${utils.getMatchOverview(guest[0])}（${guest[0]}） `;
    output += `客场${utils.getMatchOverview(guest[1])}（${guest[1]}）\n`;
    // output += calcScore(history,home,guest);

    output += `威廉 ${saveData.W[0].toFixed(2)} ${saveData.W[1].toFixed(2)} ${saveData.W[2].toFixed(2)} >${saveData.W[3]}\n`;
    output += `立博 ${saveData.L[0].toFixed(2)} ${saveData.L[1].toFixed(2)} ${saveData.L[2].toFixed(2)} >${saveData.L[3]}\n`;

    // fs.writeFile(location+'analyze/gameAnalyze.txt',output,function(err){
    //     console.log("fs-write-success",err)
    // });

    return output;
};

/**
 * 获取比赛输出信息
 * @param code
 * @returns {Promise<any>}
 */
let start = function (code) {

    return new Promise((resolve, reject) => {
        getData(`http://zq.win007.com/analysis/${code}cn.htm`).then(function (data) {
            // 获取欧赔数据
            let url = `http://op1.win007.com/oddslist/${code}.htm`;

            getOddData(url).then(function (oddData) {
                // data game和gameDetail 其中game 大概在第26位置 82|code|Ladbrokes  William Hill
                let L_code , W_code;
                oddData.game.forEach(function (item) {
                    if(item.indexOf("|Ladbrokes|") !== -1) {
                        L_code = item.split("|")[1];
                    }
                    if(item.indexOf("|William Hill|") !== -1) {
                        W_code = item.split("|")[1];
                    }
                });
                if(!L_code && !W_code) {
                    resolve("");
                    return;
                }

                oddData.gameDetail.forEach(function (item) {
                    let arr = item.split("^");
                    if(arr[0] === L_code || arr[0] === W_code) {
                        let allData = arr[1].split(";");
                        let detail = allData[allData.length-2].split("|");
                        let a = parseFloat(detail[0]),
                            b = parseFloat(detail[1]),
                            c = parseFloat(detail[2]);
                        let rate = a*b*c*100/(a*b+a*c+b*c);
                        rate = Math.round(rate*100)/100;

                        let date = detail[3];
                        // "04-27 19:11".split("-");
                        if(date.split("-")[0].length < 4) { // 判断第一个是否是年，有可能是有年份的
                            date = new Date().getFullYear() + "-" +date;
                        }
                        let iData = [a,b,c,date,rate];
                        if(arr[0] === L_code) {
                            saveData.L = iData
                        }
                        if(arr[0] === W_code) {
                            saveData.W = iData
                        }
                    }

                });
                resolve(writeFun(data))
            });
        });
    });
};
start(1735008);

module.exports = start;



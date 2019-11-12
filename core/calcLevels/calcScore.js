
let fs = require("fs");
let location = "../../data/";
let utils = require("../../utils/utils");


let allArrOne = JSON.parse(fs.readFileSync(location+"calclevel/recent6.json","utf-8"));
let allArrWin = JSON.parse(fs.readFileSync(location+"calclevel/recent6Win.json","utf-8"));

let all = [];
let allWin = [];

allArrOne.forEach(function (item) {
    item.forEach(function (j) {
        all.push(j)
    })
});
allArrWin.forEach(function (item) {
    item.forEach(function (j) {
        allWin.push(j)
    })
});


let len = all.length;
let len2 = allWin.length;
/**
 * 计算总分
 * @param val
 * @returns {number}
 */
let calcRecent = function (val) {
    let pos = all.indexOf(val);
    return parseFloat((100-pos*100/(len-1)).toFixed(2));
};
/**
 * 计算赢球指数
 * @param val
 * @returns {number}
 */
let calcSelf = function (val) {
    let str = val.replace(/1/g,0);
    let pos = allWin.indexOf(str);
    return parseFloat((100-pos*100/(len2-1)).toFixed(2));
};
/**
 * 计算平局指数
 * @param val
 * @returns {number}
 */
let calcDraw = function (val) {
    let str = val.replace(/3/g,0).replace(/1/g,3);
    let pos = allWin.indexOf(str);
    return parseFloat((100-pos*100/(len2-1)).toFixed(2));
};

let parseTable = function (tableArr) {
  let table = "";
  // table += "胜 | 平 | 负 | |  |  | \n";
  // table += "---|---|---|---|---|---|---\n";

  for(let i=0;i<tableArr.length;i++) {
      let item = tableArr[i];
      if(item.length === 0) {
          continue;
      }
      let col = '';
      item.forEach(function (j,index) {
          let t = j,len = t.length;

          t += len < 9 ? " ".repeat(9-len) : "";
          t += index < item.length-1 ? " | " :"";

          col += t;
      });
      col += "\n";
      table += col;
  }

  return table;
};
/**
 *计算
 * @param o 往绩
 * @param h 主队
 * @param a 客队
 * @param mongo
 */
let calc = function (o,h,a,mongo) {
    let history = {};
    let home = {};
    let guest = {};


    history.recentScore = calcRecent(o);
    history.recentDrawScore = calcDraw(o);
    history.recentWinScore = calcSelf(o);


    home.recentScore = calcRecent(h[0]);
    home.recentDrawScore = calcDraw(h[0]);
    home.recentWinScore = calcSelf(h[0]);

    home.recentSelfScore = calcRecent(h[1]);
    home.recentSelfDrawScore = calcDraw(h[1]);
    home.recentSelfWinScore = calcSelf(h[1]);


    guest.recentScore = calcRecent(a[0]);
    guest.recentDrawScore = calcDraw(a[0]);
    guest.recentWinScore = calcSelf(a[0]);

    guest.recentSelfScore = calcRecent(a[1]);
    guest.recentSelfDrawScore = calcDraw(a[1]);
    guest.recentSelfWinScore = calcSelf(a[1]);

    let tableArr = [[],[],[]];
    if(o.length >= 6) {
        tableArr[0].push("往绩综:"+history.recentScore,"往绩胜:" + history.recentWinScore,"往绩平:"+ history.recentDrawScore, " ", " ", " ", " ");
    }

    tableArr[1].push("主近况:"+ home.recentScore ,"近况胜:"+ home.recentWinScore,"近况平:"+ home.recentDrawScore , " ");
    tableArr[1].push("主场:"+ home.recentSelfScore , "主场胜:" + home.recentSelfWinScore,"主场平:"+ home.recentSelfDrawScore);

    tableArr[2].push("客近况:"+ guest.recentScore ,"客况胜:"+ guest.recentWinScore, "近况平:"+ guest.recentDrawScore, " ");
    tableArr[2].push("客场:"+ guest.recentSelfScore  , "客场胜:" + guest.recentSelfWinScore ,"客场平:"+ guest.recentSelfDrawScore);

    let output;
    if(mongo) {
        output = {};
        output.homeScore = home.recentScore;
        output.guestScore = guest.recentScore;

        output.homeSelfScore = home.recentSelfScore;
        output.guestSelfScore = guest.recentSelfScore;
        output.historyScore = history.recentScore;

        output.homeDrawScore = home.recentDrawScore;
        output.guestDrawScore = guest.recentDrawScore;
        output.homeSelfDrawScore = home.recentSelfDrawScore;
        output.guestSelfDrawScore = guest.recentSelfDrawScore;

        output.history = o;
        output.homeRecent = h[0];
        output.guestRecent = a[0];
        output.homeSelfRecent = h[1];
        output.guestSelfRecent = a[1];
    }else {
        output = parseTable(tableArr);
    }
    return output;
};

// 依次是近况综合 近况赢球 近况平 ；主场综合 主场赢球 主场平
// let text = calc("003013",["010300","311011"],["111300","131001"]);
//
// fs.writeFile(location+'calclevel/test.txt',text,function(err){
//     console.log("success",err)
// });

module.exports = calc;


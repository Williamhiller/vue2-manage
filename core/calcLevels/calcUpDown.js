
let fs = require("fs");
let location = "../../data/";
let utils = require("../../utils/utils");


let allArrWin = JSON.parse(fs.readFileSync(location+"calclevel/recent6Win.json","utf-8"));

let all = [];
let allWin = [];

allArrWin.forEach(function (item) {
    item.forEach(function (j) {
        allWin.push(j)
    })
});


let len2 = allWin.length;

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

let parseTable = function (tableArr) {
  let table = "";
  // table += "胜 | 平 | 负 | |  |  | \n";
  // table += "---|---|---|---|---|---|---\n";
  tableArr.forEach(function (item) {
      let col = '';
      item.forEach(function (j,index) {
          let t = j,len = t.length;

          t += len < 9 ? " ".repeat(9-len) : "";
          t += index < item.length-1 ? " | " :"";

          col += t;
      });
      col += "\n";
      table += col;
  });

  return table;
};
/**
 *计算
 * @param o 往绩
 * @param h 主队
 * @param a 客队
 */
let calc = function (o,h,a) {
    let history = {};
    let home = {};
    let guest = {};


    history.recentWinScore = calcSelf(o);

    home.recentWinScore = calcSelf(h[0]);
    home.recentSelfWinScore = calcSelf(h[1]);

    guest.recentWinScore = calcSelf(a[0]);
    guest.recentSelfWinScore = calcSelf(a[1]);

    let tableArr = [[],[],[]];
    tableArr[0].push("往绩:"+history.recentWinScore);

    tableArr[1].push("主近况:"+ home.recentWinScore ," ");
    tableArr[1].push("主场:"+ home.recentSelfWinScore );

    tableArr[2].push("客近况:"+ guest.recentWinScore , " ");
    tableArr[2].push("客场:"+ guest.recentSelfWinScore  );

    return parseTable(tableArr);
};

module.exports = calc;
// 1代表上盘，0下盘，走盘情况比较少，直接按
let text = calc("030333",["000003","030330"],["033000","300333"]);

fs.appendFile(location+'calclevel/test.txt',text,function(err){
    console.log("success",err)
});


var fs = require("fs");
var location = "../../data/";
var utils = require("../../utils/utils");

let arrAll = [];
/**
 * 递归进行计算
 * @param arr 传入的数组
 * @param num 输的个数
 * @param b_pos 输的个数
 */
let calcSort = function (arr,num,b_pos) {
    num = num || 0;
    if(num === 0) {
        arrAll[num] = [arr];
        calcSort(arr,1);
        return;
    }

    if(!arrAll[num]) {
        arrAll[num] = [];
    }
    arr.forEach(function (item,index) {
        let pos = arr.length - 1 -index;
        if(pos < 0) {
            return;
        }
        if(b_pos !== undefined && pos >= b_pos) {
            return;
        }

        let first = arr.concat();

        first.splice(pos,1,1);

        if(num < arr.length) {
            calcSort(first,num+1,pos);
        }
        arrAll[num].push(first);
    });
};

let insertArr = [];
let replace = function (arr,num,u_pos) {
    num = num || 0;
    if(num === 0) {
        insertArr= [];
    }

    let posArr = [];
    arr.forEach(function (item,index) {
        if(item === 1) {
            posArr.push(index);
        }
    });
    let len = posArr.length;

    if(!insertArr[num]) {
        insertArr[num] = [];
    }

    posArr.forEach(function (item,index) {
        // 长度减去序号
        let pos = len - 1 - index;
        let l_pos = posArr[pos];
        let t_arr = arr.concat();

        if(pos < 0) {
            return;
        }
        if(u_pos !== undefined && l_pos >= u_pos) {
            return;
        }

        t_arr.splice(l_pos,1,0);

        if(pos > 0) {// 3310 执行
            replace(t_arr,num+1,l_pos);
        }
        insertArr[num].push(t_arr.join(""))
    });

    /**
     * 纪录所有的 1的位置
     */

};
let all = [];

let calcTwo = function (){
    let a_index = 0;
    arrAll.forEach(function (one,x) {
        one.forEach(function (two,y) {
            replace(two);

            let iArr = [two.join("")];
            insertArr.forEach(function (item) {
                item.forEach(function (j) {
                    iArr.push(j)
                });
            });
            all[a_index] = iArr.concat();
            a_index++;
        });

    });
};

/**
 * 场次数量
 * @param num
 */
let init = function (num){
    let arr =[];
    for(let i=0;i<num;i++){
        arr.push(3);
    }
    calcSort(arr);

    calcTwo();

};

init(10);
console.log(all.length)
// console.log(all)
fs.writeFile(location+'calclevel/recent10.json',utils.beautifyJson(all,1),function(err){

});

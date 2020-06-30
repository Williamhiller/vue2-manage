
const scoreData =require('../static_temp/score.json')
const scoreLevel =require('../static_temp/scoreLevel.json')

module.exports = {
    parseLen (text, len) {
        let indent = 0;
        if(text.length < len) {
            indent = len - text.length;
        }
        return text + " ".repeat(indent)
    },
    /**
     * 获取北京时间
     * @param date
     * @returns {Date}
     */
    getLocalTime (date) {
        // let hours = offset || 8;
        // 取本地时间
        let localtime = date ? new Date(date) : new Date();
        // 取本地毫秒数
        let localmesc = localtime.getTime();
        // 取本地时区与格林尼治所在时区的偏差毫秒数
        let localOffset = localtime.getTimezoneOffset() * 60000;
        // 反推得到格林尼治时间
        let utc = localOffset + localmesc;
        // 得到指定时区时间
        let calctime = utc + (3600000 * 8);

        return new Date(calctime);
    },
    /**
     * 深拷贝
     * @param obj
     * @returns {any}
     */
    deepCopy (obj) {
        let res = JSON.stringify(obj);

        return JSON.parse(res);
    },
    /**
     * 计算整体成绩，如近6场 321
     * @param text
     * @returns {string|string}
     */
    getMatchOverview (text) {
        let common = "";
        let arr = text.split("");
        let w = 0,d=0,l=0;
        arr.forEach((item) => {
            if(item === "3") {
                w++
            }else if(item === "1") {
                d++
            }else {
                l++
            }
        });
        common = common + w + d +l;

        let score = 0, level = 0;
        for(let key in scoreData) {
            if(scoreData[key].includes(text)) {
                score = key;
            }
        }
        let position = scoreLevel.indexOf(parseInt(score));
        if(position != -1) {
            level = Math.ceil(position/10)
        }
        let finalScore = (score/62)*100;

        return `${
            this.parseLen(text,6)
        }|${
            this.parseLen(common,3)
        }|${
            this.parseLen(score,3)
        }|${level}|${
            finalScore.toFixed(1)
        }`;
    },
    /**
     * 计算大小球，序列化
     * @param text
     * @returns {string|string}
     */
    getGoalOverview (text) {
        let res = "";
        let arr = text.split("");
        let w = 0,l=0;
        arr.forEach((item) => {
            if(item === "3") {
                w++
            }else {
                l++
            }
        });
        res = res + w +l;

        return res;
    },
    /**
     * 获取比赛结果
     * @param a
     * @param b
     * @returns {number}
     */
    getMatchResult (a,b) {
        let res = 1;
        if(parseInt(a) > parseInt(b)) {
            res = 3
        }else if(a < b) {
            res = 0
        }

        return res;
    },
    /**
     * 计算大小球
     * @param a
     * @param b
     * @param c
     * @returns {number}
     */
    getGoalsUp (a,b,c) {
        let res = 3;
        let goals = a+b;
        if(goals > c) {
            res = 3;
        }else {
            res = 0
        }

        return res;
    },
    sumScores : function (score) {
        var num = 0;
        var s = score.split("-");

        num += parseInt(s[0]) + parseInt(s[1]);

        return num;
    },
    // 美化json
    beautifyJson : function (obj,num) {
        var indent = " ".repeat(2);

        function stringify(object,level) {
            var f = "",
                l = "",
                c = "";
            var len;

            var f_i = indent.repeat(level);
            var type = Object.prototype.toString.call(object);
            //数组对象的
            if(type === "[object Array]") {
                len = object.length;

                if(level === num) { //序列化层级限制
                    c += JSON.stringify(object);
                }else  {
                    f = "[\n"+indent.repeat(level+1);
                    l = f_i+"]";

                    object.forEach(function (item,index) {

                        c += stringify(item,level+1);

                        if(index < len-1) {
                            c += ",\n" + indent.repeat(level+1);
                        }else {
                            c += "\n"
                        }
                    });
                }

            }else if(type === "[object Object]"){
                if(level === num) { //序列化层级限制
                    c += JSON.stringify(object);
                }else  {
                    f = "{\n"+indent.repeat(level+1);
                    l = f_i+"}";

                    len = Object.keys(object).length;
                    Object.keys(object).forEach(function (key,index) {
                        var item = object[key];
                        c += "\""+key.toString() + "\":";
                        if(typeof item === "object") {
                            c += stringify(item,level+1);
                        }else {
                            c += item;
                        }

                        if(index < len-1) {
                            c += ",\n" + indent.repeat(level+1);
                        }else {
                            c += "\n";
                        }
                    });
                }
            }else {
                c = object
            }

            return f + c + l;
        }

        return stringify(obj,0)
    }
};
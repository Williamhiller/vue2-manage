const schedule = require('node-schedule');
const GeTui = require('gt-push-sdk');
const NotificationTemplate = require('gt-push-sdk/getui/template/NotificationTemplate');
const AppMessage = require('gt-push-sdk/getui/message/AppMessage');
const moment = require("moment");
const Pushs = require('../../models/push');
const utils = require('../../utils/utils');

// http的域名
const HOST = 'http://sdk.open.api.igexin.com/apiex.htm';
// https的域名
// let HOST = 'https://api.getui.com/apiex.htm';

// 定义常量, appId、appKey、masterSecret 采用本文档 "第二步 获取访问凭证 "中获得的应用配置
const APPID = '8IjojWNlxV58Ue0z5PpT94';
const APPKEY = 'uQGHPiNaO38TSmKRd3MOU3';
const MASTERSECRET = 'w06hgQBOCdAuhCm2ltHotA';

const setMessage = function(title, text) {
    let template = new NotificationTemplate({
        appId: APPID,
        appKey: APPKEY,
        title: title,
        text: text,
        // logoUrl: 'http://3.133.60.176:8080/static/img/drink.png',
        isRing: true,
        isVibrate: true,
        isClearable: true,
        transmissionType: 1,
        transmissionContent: ''
    });

    // 定义"AppMessage"类型消息对象，设置消息内容模板、发送的目标App列表、是否支持离线发送、以及离线消息有效期(单位毫秒)
    return new AppMessage({
        isOffline: false,
        offlineExpireTime: 3600 * 12 * 1000,
        data: template,
        appIdList: [APPID],
        speed: 0
    });
};

let gt = new GeTui(HOST, APPKEY, MASTERSECRET);
const pushMessageToApp = function(type) {
    let title,text;
    if(type === "喝水") {
        title = "该喝水啦！";
        text = `亲爱的主人，已经${moment(utils.getLocalTime()).format('hh:mm')}啦，别忘记喝水哦～`;
    }
    if(type === '出行') {
        title = "该去健身房啦！";
        text = `亲爱的主人，已经${moment(utils.getLocalTime()).format('hh:mm')}啦，别忘记去健身房哦～`;
    }
    let taskGroupName = null;
    let message = setMessage(title, text);
    gt.pushMessageToApp(message, taskGroupName,function (err, res) {
      console.log(res)
    });
};
pushMessageToApp("喝水")

let scheduler, hasStart = false;
let listGlobal = [];
let timerObj = {};

let getOffsetTime = function (date, hour, minute) {
    let dayNow = utils.getLocalTime();
    let dayNotice = utils.getLocalTime(date || '');
    if(hour) {
        dayNotice.setHours(hour);
    }
    if(minute) {
        dayNotice.setMinutes(minute);
    }

    return dayNotice.getTime() - dayNow.getTime();
};
let startTimer = function (id,time, type) {
    console.log(id,time, type)
    if(time >= 0 && time < 3600000) {
        timerObj[id] = setTimeout(function () {
            pushMessageToApp(type);
        },time)
    }
};

const parseList = function () {
    listGlobal.forEach(function (item) {
        let time;
        let arr = item.time.split(':');

        if(item.date) {
            time = getOffsetTime(item.date,arr[0], arr[1]);
            startTimer(item._id,time, item.type);
            return;
        }
        let nowDate = new Date();
        let weekDays = ['周日','周一','周二','周三','周四','周五','周六'];
        let day = weekDays[nowDate.getDay()];

        if(item.week.includes(day)) {
            time = getOffsetTime('',arr[0],arr[1]);
            startTimer(item._id,time, item.type);
        }

    })
};

const scheduleStart = (list)=>{
    listGlobal = list;
    //每分钟的第10秒定时执行一次
    // 秒、分、时、日、月、周几
    hasStart = true;
    scheduler = schedule.scheduleJob('00 35 * * * *',()=>{
        console.log('******** run',new Date());
        scheduleCancel();
        hasStart = true;
        parseList()
    });
};
function scheduleCancel(cancel) {
    if(hasStart) {
        if(cancel) {
            scheduler.cancel();
        }
        hasStart = false;
        for(let key in timerObj) {
            clearTimeout(timerObj[key])
        }
        timerObj = {};
    }
}

module.exports = {
    async start (fn){
        let list = await Pushs.find({});
        if(list.length > 0) {
            scheduleStart(list);
            parseList();
        }
        fn();
    },
    cancel (){
        scheduleCancel(true);
        console.log('******** cancel',new Date())
    },
    getStatus (){
        return hasStart
    }
};

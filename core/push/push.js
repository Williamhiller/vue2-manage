

const GeTui = require('gt-push-sdk');
const NotificationTemplate = require('gt-push-sdk/getui/template/NotificationTemplate');
const AppMessage = require('gt-push-sdk/getui/message/AppMessage');

// http的域名
const HOST = 'http://sdk.open.api.igexin.com/apiex.htm';

// https的域名
// let HOST = 'https://api.getui.com/apiex.htm';

// 定义常量, appId、appKey、masterSecret 采用本文档 "第二步 获取访问凭证 "中获得的应用配置
const APPID = '8IjojWNlxV58Ue0z5PpT94';
const APPKEY = 'uQGHPiNaO38TSmKRd3MOU3';
const MASTERSECRET = 'w06hgQBOCdAuhCm2ltHotA';

let gt = new GeTui(HOST, APPKEY, MASTERSECRET);

pushMessageToApp();
console.log(new Date(new Date().getTime() + 28800000));
// 设置时间
let warnTime = new Date(...[2019,11,29,13,40,1]) - new Date();
console.log(warnTime)
// return;

function pushMessageToApp() {
  let taskGroupName = null;
  let message = setMessage('122:521le时间2d3到了2', '该喝水了922');
  gt.pushMessageToApp(message, taskGroupName, function (err, res) {
    console.log(err, res);
  });

  setTimeout(function () {
    // message = setMessage('1232时间3到2了', '该喝水了 emmmmmmmmm21mmmm');
    // gt.pushMessageToApp(message, taskGroupName, function (err, res) {
    //   console.log(err, res);
    // });
  },10000);
}

function setMessage (title, text) {
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
}

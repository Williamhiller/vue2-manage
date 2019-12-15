var config = require('./config/index');
var port = config.build.port;
var express = require('express');

// sesstion 存储
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('cookie-session')
// 日志
var log4js = require('./server_modules/log.js').log4js;
var logger = require('./server_modules/log.js').logger;

// 数据库
var mongoose = require('./server_modules/mongodb.js');
var browser = require('./core/spider/getMatchData/browser');

// 服务启动
var app = express();

var router = express.Router();
// 用于静态展示入口
router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});
//声明静态资源地址
app.use(express.static('./manage'));
app.use(router);
// 服务器提交的数据json化
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// sesstion 存储
app.use(cookieParser())
app.use(session({
  secret: 'winManage',
  resave: false,
  saveUninitialized: true
}))

require('./router/routes.js')(app)

if ('development' === app.get('env')) {
  app.set('showStackError', true)
  // app.use(morgan(':method :url :status'))
  app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}))
  app.locals.pretty = true
  // mongoose.set('debug', true)
}

app.listen(port);

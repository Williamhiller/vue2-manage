
const pushRouter = require('./pushRouter');
const analyzeRouter = require('./analyzeRouter');
const positionRouter = require('./positionRouter');
const ruleRouter = require('./ruleRouter');
const accountRouter = require('./accountRouter');
const Compare = require('../models/compare')

module.exports = (app) => {
    app.use((req, res, next) => {
        app.locals.user = req.session.user;

        next()
    });

    pushRouter(app);
    analyzeRouter(app);
    positionRouter(app);
    ruleRouter(app);
    accountRouter(app);

    app.get('/admin/info', (req, res) => {
        res.json({
            code : 200,
            data : {
                "name": "admin",
                "id": '001',
                "role": "管理员",
                "avatar": 'avatar.png'
            }
        })
    });
    app.post('/admin/login', (req, res) => {
        const _user = req.body;

        if(_user.name === "bestwin" && _user.password === "bestwin") {
            req.session.user = {user : 'admin'};
            res.json({
                code : 200,
                message : '登录成功！'
            })
        }else {
            res.json({
                code : 400,
                message : '用户名或密码不正确！'
            })
        }
    });
    app.get('/compare',async (req, res) => {
        const _query= req.query;
        let skip = Number.parseInt(_query.skip) || 0;
        let list = await Compare.find({}).skip(skip).limit(1);
        res.json({
            code : 200,
            data : list
        })
    });
};

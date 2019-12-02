
const Ids = require('../models/id')
const Article = require('../models/article')
const Analyze = require('../models/analyze')
const setAnalyze = require('../core/calcLevels/setAnalyze')
const pushRouter = require('./pushRouter')

module.exports = (app) => {
    app.use((req, res, next) => {
        const _user = req.session.user
        app.locals.user = _user

        next()
    })

    pushRouter(app)

    app.get('/admin/info', (req, res) => {
        res.json({
            code : 200,
            data : {
                "name": "admin",
                "id": '001',
                "role": "管理员",
                "avatar": 'avatar.jpg'
            }
        })
    })
    app.post('/admin/login', (req, res) => {
        const _user = req.body

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
    })

    app.post('/article/upload', (req, res) => {
        const _article = req.body

        Ids.findOneAndUpdate({"name": 'article'}, {$inc: {'id': 1}}, {new: true}, (idErr, ids) =>{
            if (idErr) {
                global.logger.error(idErr)
            }
            _article.id = ids.id

            var article = new Article(_article)
            article.save( (err) => {
                if (err) {
                    global.logger.error(err);
                    res.json({
                        code: 500,
                        data: err
                    })
                    return;
                }
                res.json({
                    code: 200,
                    data: '添加成功'
                })
            })
        });
    })

    app.post('/analyze/upload', async (req, res) => {
        const _analyze = req.body;

        let data = await setAnalyze(_analyze.code);
        let matchData = data.matchData;
        let params = {
            code: _analyze.code,
            match: _analyze.match,
            round : _analyze.round,
            homeName : matchData.homeName,
            guestName : matchData.guestName,
            homeScore : matchData.homeScore,
            guestScore : matchData.guestScore,
            first : matchData.first,
            // odd : Object,
            analyse: _analyze.content
        };
        console.log('-------',params)
        console.log('-------',data)
        Analyze.update({code : _analyze.code}, params,{upsert: true}, (idErr, as)  => {
            console.log(idErr, as)
            if (idErr) {
                res.json({
                    code : 400,
                    message : idErr
                })
                return
            }
            res.json({
                code : 200,
                message : '保存成功！'
            })
        });
    })
};

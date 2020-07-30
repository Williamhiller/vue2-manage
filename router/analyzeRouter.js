

const Analyze = require('../models/analyze')
const setAnalyze = require('../core/calcLevels/setAnalyze');
const getMatchList = require('../core/spider/getMatchData/getJingcaiList')
module.exports = (app) => {

    //  获取比赛列表
    app.get('/match/list', async (req, res) => {

        let data = await getMatchList();
        if(data) {
            res.json({
                code : 200,
                data : data
            })
        }else {
            res.json({
                code : 400,
                message : '获取数据失败'
            })
        }

    })
    //  获取比赛信息，分析时使用
    app.get('/analyze/qiutan/:id', async (req, res) => {

        let data = await setAnalyze(req.params.id);
        if(data) {
            let matchData = data.matchData;

            res.json({
                code : 200,
                data : {
                    homeName : matchData.homeName,
                    guestName : matchData.guestName,
                    league : matchData.league,
                    first : matchData.first,
                    output : matchData.output,
                    homeScore : matchData.homeScore,
                    guestScore : matchData.guestScore,
                    ladbrokes : data.ladbrokes,
                    william : data.william,
                    bet : data.bet,
                    betfair: data.betfair
                }
            })
        }else {
            res.json({
                code : 400,
                message : '获取数据失败'
            })
        }

    })

    app.delete('/analyze/delete/:id', async (req, res) => {
        const code = req.params.id;

        Analyze.findOneAndDelete({'code': code}, err => {
            if(err) {
                res.json({
                    errno: 1,
                    message: '删除失败'
                })
                return;
            }
            res.json({
                code : 200,
                message: '删除成功'
            })
        })
    })

    app.get('/analyze/list', async (req, res) => {
        const _analyze = req.query;
        let params = {};
        if(_analyze.code) {
            params.code = _analyze.code;
        }
        if(_analyze.match) {
            params.match = _analyze.match;
        }
        if(_analyze.round) {
            params.round = _analyze.round;
        }
        let page = _analyze.page - 1;

        Analyze.find(params).countDocuments({}).exec( (err, total) => {
            Analyze.find(params).limit(20).skip(20*page).sort({_id:-1}).exec((idErr, list)  => {
                if (idErr) {
                    res.json({
                        code : 400,
                        message : idErr
                    })
                    return
                }
                res.json({
                    code : 200,
                    data : {
                        total : total,
                        list : list
                    }
                })
            });
        })
    })
    app.post('/analyze/upload', async (req, res) => {
        const _analyze = req.body;
        let params = {
            code: _analyze.code,
            match: _analyze.match,
            round : _analyze.round,
            homeName : _analyze.homeName,
            guestName : _analyze.guestName,
            homeScore : _analyze.homeScore,
            guestScore : _analyze.guestScore,
            first : _analyze.first,
            output : _analyze.output,
            analyse: _analyze.content
        };

        Analyze.updateOne({code : _analyze.code}, params,{upsert: true}, (idErr, as)  => {
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

    // 复盘获取分析文档
    app.get('/analyze/:id', async (req, res) => {

        let code = req.params.id;
        if(!code) {
            res.json({
                code : 400,
                message : '未传入code'
            })
            return;
        }
        Analyze.findOne({code : code}, (err, doc) => {
            if (err) {
                global.logger.error(err);
                res.json({
                    code: 500,
                    data: err
                })
                return;
            }
            res.json({
                code : 200,
                data : doc
            })
        });
    })

    app.post('/analyze/replay', async (req, res) => {
        const _analyze = req.body;
        let params = {
            replay: _analyze.replay,
            result: _analyze.result,
            score: _analyze.score
        };

        Analyze.updateOne({code : _analyze.code}, params,{upsert: true}, (idErr, as)  => {
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
}

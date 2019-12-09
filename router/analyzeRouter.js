

const Analyze = require('../models/analyze')
const setAnalyze = require('../core/calcLevels/setAnalyze')
module.exports = (app) => {

    //  获取比赛信息，分析时使用
    app.get('/analyze/qiutan/:id', async (req, res) => {

        let data = await setAnalyze(req.params.id);
        if(data) {
            let matchData = data.matchData;

            res.json({
                code : 200,
                data : matchData
            })
        }else {
            res.json({
                code : 400,
                message : '获取数据失败'
            })
        }

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

        Analyze.find(params, (idErr, list)  => {
            if (idErr) {
                res.json({
                    code : 400,
                    message : idErr
                })
                return
            }
            res.json({
                code : 200,
                data : list
            })
        });
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

        Analyze.update({code : _analyze.code}, params,{upsert: true}, (idErr, as)  => {
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
}

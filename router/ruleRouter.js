
const Rule = require('../models/rule')
const RuleMatch = require('../models/ruleMatch')

module.exports = (app) => {

    app.get('/rules/list', async (req, res) => {
        const _param = req.query;
        let params = {};
        if(_param.match) {
            params.match = _param.match;
        }
        let list = await Rule.find(params);
        res.json({
            code : 200,
            data : list
        })
    })
    app.delete('/rules/:id', async (req, res) => {
        const id = req.params.id

        Rule.findOneAndDelete({'_id': id}, err => {
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
    });
    app.post('/rules', async (req, res) => {
        const _rule = req.body;
        let rule = new Rule(_rule)
        rule.save((err) => {
            if (err) {
                res.json({
                    errno: 1,
                    message: '保存失败'
                });
                return;
            }
            res.json({
                code : 200,
                message: '保存成功'
            })
        });
    });

    app.get('/rules/match/:ruleId', async (req, res) => {
        let ruleId = req.params.ruleId;
        let list = await RuleMatch.find({ruleId : ruleId});
        if(res) {
            res.json({
                code : 200,
                data : list
            })
        }
    });
    app.delete('/rules/match/:id', async (req, res) => {
        const id = req.params.id;

        RuleMatch.findOneAndDelete({'_id': id}, err => {
            if(err) {
                res.json({
                    errno: 1,
                    message: '删除失败'
                });
                return;
            }
            res.json({
                code : 200,
                message: '删除成功'
            })
        })
    });
    app.post('/rules/match', async (req, res) => {
        const _rule = req.body;
        let ruleMatch = new RuleMatch(_rule)
        ruleMatch.save((err) => {
            if (err) {
                res.json({
                    errno: 1,
                    message: '保存失败'
                });
                return;
            }
            res.json({
                code : 200,
                message: '保存成功'
            })
        });
    })
};


const Tactic = require('../models/tactic')
const TacticMatch = require('../models/tacticMatch')

module.exports = (app) => {

    app.get('/tactics/list', async (req, res) => {
        let list = await Tactic.find({});
        res.json({
            code : 200,
            data : list
        })
    })
    app.delete('/tactics/:id', async (req, res) => {
        const id = req.params.id

        Tactic.findOneAndDelete({'_id': id}, err => {
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
    app.post('/tactics', async (req, res) => {
        const _tactic = req.body;
        let tactic = new Tactic(_tactic)
        tactic.save((err) => {
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

    app.get('/tactics/match/:tacticId', async (req, res) => {
        let tacticId = req.params.tacticId;
        let list = await TacticMatch.find({tacticId : tacticId});
        if(res) {
            res.json({
                code : 200,
                data : list
            })
        }
    });
    app.delete('/tactics/match/:id', async (req, res) => {
        const id = req.params.id;

        TacticMatch.findOneAndDelete({'_id': id}, err => {
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
    app.post('/tactics/match', async (req, res) => {
        const _tactic = req.body;
        let tacticMatch = new TacticMatch(_tactic)
        tacticMatch.save((err) => {
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

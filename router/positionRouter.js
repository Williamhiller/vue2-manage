
const Positions = require('../models/position')
module.exports = (app) => {
    app.get('/position', async (req, res) => {
        const _analyze = req.query;
        let params = {};
        if(_analyze.match) {
            params.match = _analyze.match;
        }
        let list = await Positions.find(params);
        res.json({
            code : 200,
            data : list
        })
    });

    app.post('/position', async (req, res) => {
        const _push = req.body;
        let push = new Positions(_push)
        push.save((err) => {
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

    app.delete('/position/:id', async (req, res) => {
        const id = req.params.id

        Positions.findOneAndDelete({'_id': id}, err => {
            if(err) {
                res.json({
                    errno: 1,
                    message: '删除失败'
                })
                return;
            }
            res.json({
                code : 200,
                message: '保存成功'
            })
        })
    })
}

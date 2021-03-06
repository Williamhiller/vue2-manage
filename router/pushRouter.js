
const Pushs = require('../models/push')
const schedule = require('../core/push')
module.exports = (app) => {
    app.get('/push/list', async (req, res) => {
        let list = await Pushs.find({});
        // console.log("push-------",list);
        res.json({
            code : 200,
            data : list
        })
    })

    app.post('/push/set', async (req, res) => {
        const _push = req.body
        let push = new Pushs(_push)
        push.save((err) => {
            if (err) {
                res.json({
                    errno: 1,
                    message: '保存失败'
                })
                return;
            }
            res.json({
                code : 200,
                message: '保存成功'
            })
        });
    })

    app.delete('/push/delete/:id', async (req, res) => {
        const id = req.params.id

        Pushs.findOneAndDelete({'_id': id}, err => {
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

    app.post('/push/toggle', async (req, res) => {
        const params = req.body;

        if(params.schedule === 'status') {
            res.json({
                code : 200,
                status: schedule.getStatus()
            });
            return
        }
        if(params.schedule === 'open') {
            schedule.start(function () {
                res.json({
                    code : 200,
                    message: '成功'
                });
            });
        }else {
            schedule.cancel();
            res.json({
                code : 200,
                message: '成功'
            });
        }
    })
}

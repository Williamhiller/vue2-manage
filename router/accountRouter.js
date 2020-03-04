
const Account = require('../models/account')

module.exports = (app) => {

    app.get('/account', async (req, res) => {
        let list = await Account.find({});
        res.json({
            code : 200,
            data : list
        })
    })

    app.post('/account', async (req, res) => {
        const _tactic = req.body;
        let tactic = new Account(_tactic)
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
};

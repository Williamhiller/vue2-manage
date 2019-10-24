

module.exports = (app) => {
    app.use((req, res, next) => {
        next()
    })

    app.post('/admin/login', (req, res) => {
        const _user = req.body

        console.log(_user)
        // const info = req.query.info
        // const userid = req.query.id
        // const key = 'fde7f8d0b3c9471cbf787ea0fb0ca043'
        // if(_user.name === "bestwin" && _user.password === "bestwin") {
        //     res.json({
        //         code : 200,
        //         message : '登录成功！'
        //     })
        // }else {
        //     res.json({
        //         code : 400,
        //         message : '用户名或密码不正确！'
        //     })
        // }
        res.json({
            code : 200,
            message : '登录成功！'
        })
    })
}

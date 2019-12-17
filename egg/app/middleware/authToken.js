const jwt = require('jsonwebtoken') //引入jsonwebtoken

module.exports = (options, app) => {
    return async function auth(ctx, next) {
        let authorization = ctx.header.authorization // 获取header里的authorization
        if (!authorization) {
            ctx.throw(401, '没有token，请登录');
        }

        const token = authorization.split(' ')[1]; //请求头里面携带了bearer认证,需要把这个去掉
        const secret = app.config.secret

        await verifyToken(token, secret).then(async res => {
                console.log(res)
                ctx.session.userInfo = res
                await next()
            })
            .catch(async err => {
                ctx.body = { code: 401, msg: '登录状态已过期' }
            })



    }
}

//验证token
function verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, result) => {
            if (!err) { resolve(result) } else reject(err)
        });
    })
}
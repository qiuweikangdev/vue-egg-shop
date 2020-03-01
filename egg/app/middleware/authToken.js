/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-17 10:03:19
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-02-18 19:58:12
 */
const jwt = require('jsonwebtoken') //引入jsonwebtoken
module.exports = (options, app) => {
    return async function auth(ctx, next) {
        let authorization = ctx.header.authorization // 获取header里的authorization
        if (!authorization) {
            ctx.throw(401, '没有token，请登录');
        }

        const token = authorization.split(' ')[1]; //请求头里面携带了bearer认证,需要把这个去掉
        const secret = app.config.secret
  
        try{
           let res =  await verifyToken(token, secret)
           ctx.state.user = res  //把token信息存储在上下文，便于访问
           console.log('token信息',res)
            await next()
        }catch(err){
            console.log(err)
            ctx.status = 401
            ctx.state.user = null;
            return  ctx.body = { 
                code: 401, 
                msg: '登录状态已过期' 
            }
        }

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
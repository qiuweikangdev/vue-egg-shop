/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-04 17:09:55
 */

// 'use strict';
// const Controller = require('egg').Controller;
// const svgCaptcha = require('svg-captcha');
// class UserController extends Controller {
//         //注册
//     async register() {
//             const { ctx } = this;
//             const { username, password, avatar, fileName, authCode } = ctx.params //接受客户端的参数
//                 //avatar前端传过来的头像base64二进制流数据
//             var base64Data = avatar.replace(/^data:image\/\w+;base64,/, ""); //过滤base64的前缀
//             var dataBuffer = Buffer.from(base64Data, 'base64'); //二进制流转换base64
//             let saltPwd = await ctx.helper.saltPassword(password) //获取加密后的密码
//                 // let queryUser = "SELECT * from  users where username ='" + username + "'"
//             let queryUser = 'SELECT * FROM users WHERE username = "' + username + '"'
//             let result1 = await ctx.service.tools.query(queryUser) //查询用户存不存在
//             if (!result1.length) {
//                 //如果用户名不存在,则新建用户
//                 let insertUser = 'INSERT INTO users(username,password,avatar) VALUES (?, ? , ?)'
//                 let result2 = await ctx.service.tools.query(insertUser, [username, saltPwd, dataBuffer])
//                 if (result2) {
//                     ctx.body = {
//                         code: 200,
//                         message: '注册成功',
//                     }
//                 }
//             } else {
//                 ctx.body = {
//                     code: 200,
//                     message: '用户名已存在,注册失败',
//                 }
//             }

//         }
//         //登录
//     async login() {
//             const { ctx, app } = this;
//             const { username, password, authCode } = ctx.params;
//             // const secret = app.config.secret;
//             const secret = app.config.jwt.secret
//                 // const token = ctx.helper.getToken({ username }, secret);
//             const sqlStr = 'SELECT * FROM users WHERE username = "' + username + '"'
//             const result = await ctx.service.tools.query(sqlStr)


//             //result如果没有匹配到结果，返回的是空数组
//             if (authCode !== ctx.session.code) {
//                 ctx.body = {
//                     code: 200,
//                     message: '验证码错误',
//                 }
//             } else if (result.length > 0) {
//                 //比较加密后密码
//                 await ctx.helper.comparePassword(password, result[0].password)
//                     .then((isMatch) => {
//                         if (isMatch) {
//                             const token = ctx.helper.getToken({ id: result[0].id, name: result[0].username }, secret);

//                             //用户信息
//                             const userInfo = {
//                                 id: result[0].id,
//                                 username: result[0].username,
//                                 avatar: ctx.helper.getBase64(result[0].avatar)
//                             }
//                             ctx.body = {
//                                 code: 200,
//                                 message: '登录成功',
//                                 token,
//                                 userInfo: userInfo
//                             }
//                         } else {
//                             ctx.body = {
//                                 code: 200,
//                                 message: '密码错误',
//                             }
//                         }
//                     }).catch(err => {
//                         ctx.body = {
//                             code: 500,
//                             message: err
//                         }
//                     })
//             } else {
//                 ctx.body = {
//                     code: 200,
//                     message: '用户名不存在'

//                 }
//             }









//     // 校验验证码
//     async verifyCode() {
//         const { ctx } = this
//         const { code } = ctx.params
//         console.log(code)
//         if (code === ctx.session.code) {
//             ctx.body = {
//                 code: 200,
//                 message: '验证成功'
//             }
//         } else {
//             ctx.body = {
//                 code: 200,
//                 message: '验证失败'
//             }
//         }
//     }

//     //获取用户信息，需要登录授权成功才能获取用户信息
//     async getUserInfo() {
//         const { ctx } = this;
//         const { id } = ctx.state.user
//         console.log(ctx.state.user)
//         const sqlStr = 'SELECT * FROM users WHERE id = "' + id + '"'
//         await ctx.service.tools.query(sqlStr).then(res => {
//                 const str = res[0].avatar //获取头像的二进制流数据
//                 const buffer = Buffer.from(str, 'utf8') //转换为buffer对象
//                 const base64Str = buffer.toString('base64') //根据base64编码转换为base64字符串
//                 const userInfo = {
//                     avatar: base64Str,
//                     username: res[0].username,
//                     id: res[0].id
//                 }
//                 ctx.body = {
//                     message: '获取数据成功',
//                     userInfo: userInfo
//                 }
//             })
//             .catch(err => {
//                 ctx.body = {
//                     message: '获取数据失败',
//                     error: err
//                 }
//             })
//     }

//     //添加商品
//     async addGoods() {

//     }

// }
// module.exports = UserController;

"use strict"
const Controller = require('egg').Controller;
class UserController extends Controller{
    async register(){
        this.ctx.body =await this.ctx.service.user.register(this.ctx.params)
    }
    async login(){
        this.ctx.body =await this.ctx.service.user.login(this.ctx.params)
    }
    async auth(){
        this.ctx.body =await this.ctx.service.user.auth(this.ctx.params)
    }
    async getUserInfo(){
        this.ctx.body =await this.ctx.service.user.getUserInfo(this.ctx.params)
    }
    async captcha(){
        this.ctx.body =await this.ctx.service.user.captcha(this.ctx.params)
    }
    async addToCart(){
        this.ctx.body =await this.ctx.service.user.addToCart(this.ctx.params)
    }
    async getShopCartData(){
        this.ctx.body =await this.ctx.service.user.getShopCartData(this.ctx.params)
    }
    async addGoods(){
        this.ctx.body =await this.ctx.service.user.addGoods(this.ctx.params)
    }
    async reduceGoods(){
        this.ctx.body =await this.ctx.service.user.reduceGoods(this.ctx.params)
    }
}
module.exports = UserController;
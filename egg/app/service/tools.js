/*
 * @Descripttion: 业务逻辑操作
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-02 17:03:12
 */
'use strict';
const { Service } = require('egg');
const svgCaptcha = require('svg-captcha');
class UserService extends Service {
    //数据库操作
    async query(sql, value) {
        return await this.app.mysql.query(sql, value)
    }
    async find(uid) {
            const user = await this.app.mysql.query('select * from users where id = ?', uid);
            return user;
        }
        //产生验证码
    async captcha() {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 52,
            width: 100,
            height: 42,
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            background: '#6CA0B5',
        });
        this.ctx.session.code = captcha.text.toLocaleLowerCase();
        return captcha;
    }

    //验证码验证
    // async verifyCode() {
    //     const { authCode } = this.ctx.params // 获取客户端发送的类型和验证码
    //     const code = this.ctx.session.code;
    //     let result_success = { message: '验证码正确' } // 定义返回结果
    //     let result_error = { message: '验证码错误' }
    //     return this.ctx.session.code
    // }

}
module.exports = UserService
/*
 * @Descripttion: 一些工具方法
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-02-20 22:21:37
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const saltRounds = 10; //加盐的强度
module.exports = {
    //生成Token 
    getToken(payload = {}, secret) {
        return jwt.sign(payload, secret, { expiresIn: '24h' });
    },
    //密码加密处理方法
    saltPassword(password) {
        //password客户端传过来的密码
        return new Promise((resolve, reject) => {
            //生成加盐密码
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (!err) {
                    bcrypt.hash(password, salt, (err, hash) => {
                        password = hash
                        resolve(password)
                    })
                } else {
                    reject(err)
                }

            })
        })
    },

    //加密后密码比对
    //_password一个是客户端密码， password一个是数据库取出来的密码
    comparePassword(_password, password) {
        return new Promise((resolve, reject) => {
            //比对方法
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    },
    //二进制流数据转换为base64
    getBase64(str) {
        const buffer = Buffer.from(str, 'utf8') //转换为buffer对象
        const base64Str = buffer.toString('base64') //根据base64编码转换为base64字符串
        return base64Str
    }
    
}
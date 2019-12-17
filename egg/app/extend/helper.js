/*
 * @Descripttion: 一些工具方法
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-03 20:16:24
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const saltRounds = 10; //加盐的强度
module.exports = {
    //生成Token 
    getToken(payload = {}, secret) {
        return jwt.sign(payload, secret, { expiresIn: '1h' });
    },
    //密码加密处理方法
    saltPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                //执行下一个方法使用next调用
                //this指向当前对象实例userSchema
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
    comparePassword(_password, password) {
        return new Promise((resolve, reject) => {
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
/*
 * @Descripttion: 一些工具方法
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-18 20:07:46
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
    },
    //生成订单号
    getOrderID(){
        let currDate = new Date();
        let year = currDate.getFullYear();
        let month = currDate.getMonth() + 1 < 10 ? "0" + (currDate.getMonth() + 1): currDate.getMonth() + 1;
        let day = currDate.getDate()<10 ? "0"+currDate.getDate() : currDate.getDate();
        let hour = currDate.getHours()<10 ? "0"+currDate.getDate() : currDate.getHours();
        let minute = currDate.getMinutes()<10 ? "0"+currDate.getMinutes() : currDate.getMinutes();
        let second = currDate.getSeconds()<10 ? "0"+currDate.getSeconds() : currDate.getSeconds();
        //获取年月日
        let date = year + month + day +hour + minute + second; 
        //获取当时时间戳
        let timestamp = Number(Date.parse(currDate).toString().substr(-1,2));
        //生成订单id
        let orderId = date + timestamp;
        return orderId 
    }
    
}
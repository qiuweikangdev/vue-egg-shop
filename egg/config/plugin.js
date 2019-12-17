/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-02 18:02:54
 */
'use strict';

/** @type Egg.EggPlugin */

exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};
// 跨域
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
//websocket
exports.io = {
    enable: true,
    package: 'egg-socket.io'
};

// egg-jwt
exports.jwt = {
    enable: true,
    package: "egg-jwt"
};
exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
};
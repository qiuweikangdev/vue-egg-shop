/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-17 10:03:20
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-10 00:40:00
 */
'use strict';

/** Egg.EggPlugin */

exports.mysql = {
    le: true,
  package: 'egg-mysql',
};
//跨域
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

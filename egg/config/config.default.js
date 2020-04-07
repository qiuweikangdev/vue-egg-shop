/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-07 20:30:55
 */
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1573697703688_9789';

    // config.secret = 'secret'; //密钥
    // add your middleware config here

    config.jwt = {
        secret: 'secret', //密钥
        ignore: [/^\/user\/login/, /^\/user\/register/] // 哪些请求不需要认证
    }
    config.middleware = ['params', 'errorHandle'];
    

    // config.mysql = {
    //     client: {
    //         // host
    //         host: 'localhost',
    //         // 端口号
    //         port: '3306',
    //         // 用户名
    //         user: 'root',
    //         // 密码
    //         password: '12345',
    //         // 数据库名
    //         database: 'my_shop',
    //     },
    //     // 是否加载到 app 上，默认开启
    //     app: true,
    //     // 是否加载到 agent 上，默认关闭
    //     agent: false,
    // };

    //跨域
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ['http://127.0.0.1:8080','http://localhost:3000']
    };
    config.cors = {
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true, //获得前端的cookie
        // origin: () => 'http://127.0.0.1:8080' //这边不能为*号，需要指定明确的、与请求网页一致的域名
        // origin: () => 'http://127.0.0.1:3000'//这边不能为*号，需要指定明确的、与请求网页一致的域名

    };
    config.cluster = {
        listen: {
        path: '',
        port: 5000,
        hostname: '0.0.0.0'
        },
    };
    //静态资源
    config.static = {
        prefix: '/public/', //前缀
        // dir: path.join(appInfo.baseDir, 'app/public'), 
        dynamic: true,
        preload: false,
        buffer: true,
        // maxAge: 31536000,
      };
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    //session
    // config.session = {
    //     key: 'SESSION_ID',
    //     maxAge: 864000, //过期时间
    //     httpOnly: true,
    //     encrypt: true,
    //     renew: true //延长会话有效期 
    // }
    return {
        ...config,
        ...userConfig,
    };
};
// exports.io = {
//     namespace: {
//         '/': {
//             // connectionMiddleware是在client保持连接的时候调用的中间件
//             connectionMiddleware: ['auth'],
//             // packetMiddleware是在server发送包给client之后调用的中间件
//             packetMiddleware: ['filter']
//         },
//     },
// };
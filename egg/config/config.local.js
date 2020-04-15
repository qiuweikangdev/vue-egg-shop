/*
 * @Author: your name
 * @Date: 2019-12-17 10:03:20
 * @LastEditTime: 2020-04-09 19:16:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-egg-shop\shop\egg\config\config.local.js
 */
// config/config.${env}.js
exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'my_shop',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
}

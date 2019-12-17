/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-18 14:29:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-14 18:06:42
 */
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
    publicPath: './', //相对路径来链接所有打包的资源
    //   publicPath: process.env.NODE_ENV === 'production'
    // ? './'
    // : './',
    devServer: {
        open: true, //自动打开浏览器
        host: 'localhost', //本地主机
        port: 8080, //端口号
        hot: true, //热更新
    },
    //不需要生产环境的 source map  (资源映射)
    productionSourceMap: false,
    chainWebpack(config) {
        // config.plugins.delete('preload') // TODO: need test
        // config.plugins.delete('prefetch') // TODO: need test
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },

}
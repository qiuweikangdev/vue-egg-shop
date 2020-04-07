/*
 * @Descripttion: 首页模块数据业务逻辑
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 17:32:16
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-08 00:47:16
 */
"use strict"
const Service = require('egg').Service
class HomeService extends Service {
    //轮播图
    async getHomeCarousel(){
        let sqlStr = 'SELECT * FROM home_carousel'
        let result = await this.app.mysql.query(sqlStr)
        return {
            code: 200,
            data: result
        }
    }
    //首页导航
    // async getHomeNav() {
    //     const { ctx } = this;
    //     const result = require('../data/homenav.json')
    //         // let sqlStr = 'SELECT * FROM home_carousel'
    //         // let result = await ctx.service.tools.query(sqlStr)
    //     return  {
    //         code: 200,
    //         data: result
    //     }
    // }
   //首页导航栏商品
   async getHomeNav() {
    const { ctx } = this;
    const result = require('../data/homenav.json')
        // let sqlStr = 'SELECT * FROM home_carousel'
        // let result = await ctx.service.tools.query(sqlStr)
    return  {
        code: 200,
        data: result
    }
}           

}

module.exports = HomeService
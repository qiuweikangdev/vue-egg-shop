/*
 * @Descripttion: 首页模块数据业务逻辑
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 17:32:16
 * @LastEditors  : qqqiu
 * @LastEditTime : 2020-01-21 19:03:51
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
    //首页 限时抢购
    async getHomeFlash() {
        const { ctx } = this;
        const result = require('../data/flashSale.json')
            return {
                code: 200,
                data: result
            }
        }
              

}

module.exports = HomeService
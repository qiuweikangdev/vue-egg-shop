/*
 * @Descripttion: 商品接口
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-14 16:42:01
 */
'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
    // 首页轮播图
    async homecarousel() {
            const { ctx } = this;
            let sqlStr = 'SELECT * FROM home_carousel'
            let result = await ctx.service.tools.query(sqlStr)
            ctx.body = {
                code: 200,
                data: result
            }
        }
        //首页导航
    async homenav() {
            const { ctx } = this;
            const result = require('../data/homenav.json')
                // let sqlStr = 'SELECT * FROM home_carousel'
                // let result = await ctx.service.tools.query(sqlStr)
            ctx.body = {
                code: 200,
                data: result
            }
        }
        //首页 限时抢购
    async homeflash() {
        const { ctx } = this;
        const result = require('../data/flashSale.json')
        ctx.body = {
            code: 200,
            data: result
        }
    }
    async captcha() {
        const { ctx } = this;
        ctx.body = {
            content: '12xx3',
        }
    }
}

module.exports = HomeController;
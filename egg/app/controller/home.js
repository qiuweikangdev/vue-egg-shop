/*
 * @Descripttion: 首页
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-17 10:03:19
 * @LastEditors  : qqqiu
 * @LastEditTime : 2020-01-21 19:03:41
 */
'use strict';
const Controller = require('egg').Controller
class HomeController extends Controller {
    // 首页轮播图
    async homeCarousel(){
        this.ctx.body  = await this.ctx.service.home.getHomeCarousel()
    }
    async homeNav(){
        this.ctx.body  = await this.ctx.service.home.getHomeNav()
    }
}

module.exports = HomeController
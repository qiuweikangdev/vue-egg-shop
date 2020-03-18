/*
 * @Descripttion: 商品接口
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-18 15:12:57
 */
'use strict';
const Controller = require('egg').Controller;
const fs = require('fs')
class GoodsController extends Controller {
        //限时抢购商品
    async getFlashSale(){
        this.ctx.body = await this.ctx.service.goods.getFlashSale()
    }


}

module.exports = GoodsController;

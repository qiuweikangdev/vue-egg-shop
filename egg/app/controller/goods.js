/*
 * @Descripttion: 商品接口
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-26 19:58:18
 */
'use strict';
const Controller = require('egg').Controller;
const fs = require('fs')
class GoodsController extends Controller {
        //限时抢购商品
    async getFlashSale(){
        this.ctx.body = await this.ctx.service.goods.getFlashSale()
    }
      //获取商品类别
  async getGoodsSumType(){
    this.ctx.body = await this.ctx.service.goods.getGoodsSumType()
  }
  //获取总用户、总商品、总订单、总交易记录数据
  async getTypsData(){
    this.ctx.body = await this.ctx.service.goods.getTypsData()
  }
 //获取商品数据
  async getGoodsData(){
    this.ctx.body = await this.ctx.service.goods.getGoodsData()

  }
}

module.exports = GoodsController;

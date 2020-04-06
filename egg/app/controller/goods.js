/*
 * @Descripttion: 商品接口
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-06 10:44:22
 */
'use strict';
const Controller = require('egg').Controller;
const fs = require('fs')
class GoodsController extends Controller {
        //限时抢购商品
    async getFlashSale(){
        this.ctx.body = await this.ctx.service.goods.getFlashSale()
    }
      //限时抢购商品
      async getHotProduct(){
        this.ctx.body = await this.ctx.service.goods.getHotProduct()
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
  //商品点赞
  async goodsLike(){
      this.ctx.body = await this.ctx.service.goods.goodsLike(this.ctx.params)
  }

  //判断用户是否对商品已点赞
async isLiked(){
  this.ctx.body = await this.ctx.service.goods.isLiked(this.ctx.params)

}

  //获取订单数据
  async getOrderData(){
    this.ctx.body = await this.ctx.service.goods.getOrdeData()
  }
  //删除订单编号
  async deleteOrderID(){
    this.ctx.body = await this.ctx.service.goods.deleteOrderID(this.ctx.params)

  }
  //删除商品编号
  async deleteGoodsID(){
    this.ctx.body = await this.ctx.service.goods.deleteGoodsID(this.ctx.params)

  }
}

module.exports = GoodsController;

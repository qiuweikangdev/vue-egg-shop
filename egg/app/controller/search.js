/*
 * @Descripttion: 搜索
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-17 10:03:19
 * @LastEditors  : qqqiu
 * @LastEditTime : 2020-01-24 14:03:08
 */
'use strict';
const Controller = require('egg').Controller
class SearchController extends Controller {
  // 根据商品名字来搜索某所有商品
    async searchGoods(){
        this.ctx.body  = await this.ctx.service.search.searchGoods()
    }
 
}

module.exports = SearchController
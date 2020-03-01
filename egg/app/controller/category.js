/*
 * @Descripttion: 分类
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-17 10:03:19
 * @LastEditors  : qqqiu
 * @LastEditTime : 2020-02-06 20:31:51
 */
'use strict';
const Controller = require('egg').Controller
class CategoryController extends Controller {
    //插入分类目录商品到数据库
    async insertCategorySub(){
        this.ctx.body  = await this.ctx.service.category.insertCategorySub()
    }
     //插入商品数据到数据库
    async insertAllGoods(){
        this.ctx.body  = await this.ctx.service.category.insertAllGoods()
    }
      // 读取分类目
    async getCategorySub(){
        this.ctx.body  = await this.ctx.service.category.getCategorySub()
    }
       // 根据分类id读取某分类商品数据
    async getGoodsByCategoryID(){
     this.ctx.body  = await this.ctx.service.category.getGoodsByCategoryID(this.ctx.params)
}
}

module.exports = CategoryController
/*
 * @Descripttion: 商品接口
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-26 19:38:23
 */
'use strict';
const Controller = require('egg').Controller;
const fs = require('fs')
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

    //插入分类目录商品到数据库
    async insertCategorySub() {
            const { ctx } = this;
            var dataObj
            fs.readFile('./app/data/category_sub.json', (err, data) => {
                dataObj = JSON.parse(data)
                dataObj.RECORDS.map(async value => {
                    let result = await this.app.mysql.insert('category_sub', value)
                    console.log(result);
                })
            })
        }
    //插入商品数据
    async insertAllGoods(){
        const { ctx } = this;
        var dataObj
        fs.readFile('./app/data/goods.json', (err, data)=>{
            dataObj = JSON.parse(data)
            dataObj.map(async value=>{
                console.log(value)
             await this.app.mysql.insert('goods', value)
                .then(()=>{
                    console.log('插入成功')
                })
                .catch(error=>{
                    console.log('插入失败',error)
                })
            })
        })
    }

   // 根据类别获取商品列表
    
}

module.exports = HomeController;
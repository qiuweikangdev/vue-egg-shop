/*
 * @Descripttion: 商品接口
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-28 14:39:33
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
                dataObj.records.map(async value => {
                    let result = await this.app.mysql.insert('category_sub', value)
                    console.log(result);
                })
            })
        }
        //插入商品数据
    async insertAllGoods() {
        const { ctx } = this;
        var dataObj
        fs.readFile('./app/data/goods.json', (err, data) => {
            dataObj = JSON.parse(data)
            dataObj.map(async value => {
                console.log(value)
                await this.app.mysql.insert('goods', value)
                    .then(() => {
                        console.log('插入成功')
                    })
                    .catch(error => {
                        console.log('插入失败', error)
                    })
            })
        })
    }
    // 读取分类目录
    async getCategorySub(){
        const { ctx } = this;
        let sqlStr = 'SELECT * FROM category_sub'
        await ctx.service.tools.query(sqlStr)
        .then((result) => {
           ctx.body = {code:200,success:result}
        })
        .catch(error => {
            ctx.body={code:500,error:error}
        })
    }

    
    
    //根据分类id读取某分类商品数据
    async getGoodsByCategoryID(){
        const { ctx } = this;
        const { subID } = ctx.params
        let sqlStr = 'SELECT * FROM goods WHERE SUB_ID ="'+ subID + '"'
        await ctx.service.tools.query(sqlStr)
        .then((result) => {
           ctx.body = {code:200,success:result}
        })
        .catch(error => {
            ctx.body={code:500,error:error}
        })
    }


}   

module.exports = HomeController;
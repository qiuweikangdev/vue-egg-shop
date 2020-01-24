/*
 * @Descripttion: 分类模块业务逻辑
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 17:32:16
 * @LastEditors  : qqqiu
 * @LastEditTime : 2020-01-21 17:55:05
 */
"use strict"
const Service = require('egg').Service
const fs = require('fs')
class CategoryService extends Service {
    //插入分类目录商品到数据库
    async insertCategorySub() {
        var dataObj
        fs.readFile('./app/data/category_sub.json', (err, data) => {
            dataObj = JSON.parse(data)
            dataObj.records.map(async value => {
                let result = await this.app.mysql.insert('category_sub', value)
                console.log(result, '插入成功')
            })
        })
    }
    //插入商品数据
    async insertAllGoods() {
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
    async getCategorySub() {
        let sqlStr = 'SELECT * FROM category_sub'
        let result 
        await ctx.service.tools.query(sqlStr)
            .then((res) => {
                result = { code: 200, success: res }
            })
            .catch(error => {
                result = { code: 500, error: error }
            })
        return result 
    }
    //根据分类id读取某分类商品数据
    async getGoodsByCategoryID() {
        const { subID } = ctx.params
        let sqlStr = 'SELECT * FROM goods WHERE SUB_ID ="' + subID + '"'
        let result
        await this.app.mysql.query(sqlStr)
            .then((res) => {
                result = { code: 200, success: res }
            })
            .catch(error => {
                result = { code: 500, error: error }
            })
        return result
    }
    //

}
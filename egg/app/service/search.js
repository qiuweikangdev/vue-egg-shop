/*
 * @Descripttion: 搜索模块业务逻辑
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 17:32:16
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-17 18:50:09
 */
"use strict"
const Service = require('egg').Service
class SearchService extends Service {
       //根据商品名字搜索 (模糊查询)
       async searchGoods(params) {
        const { name } = params
        let sqlStr = 'SELECT * FROM goods WHERE product_name LIKE "' + `%${name}%` + '"'
        console.log(sqlStr,'sql')
        let result 
        await this.app.mysql.query(sqlStr)
            .then((res) => {
                console.log(res,'resresres')
                if (res.length > 0) {
                    result = { code: 200, message: res, status: '1' }
                } else {
                    result  = { code: 200, message: '暂无相关商品', status: '0' }
                }

            })
            .catch(error => {
                console.log(error)
                result = { code: 500, error: error }
            })
          return result 
    }
}
module.exports = SearchService
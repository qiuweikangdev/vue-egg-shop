/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 14:50:39
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-18 15:11:59
 */
const Service = require('egg').Service
class GoodsService extends Service {
        //限时抢购
    async getFlashSale(){
        const result = require('../data/flashSale.json')
        return {
            code:200,
            data:result
        }

    }
}

module.exports = GoodsService
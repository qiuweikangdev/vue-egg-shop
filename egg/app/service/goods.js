/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 14:50:39
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-26 19:55:34
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
    //获取商品类别
    async getGoodsSumType(){
        let sqlStr = 'SELECT mall_sub_name as name,count(sub_id) as count FROM goods go,category_sub ca GROUP BY go.sub_id,ca.mall_sub_name,ca.id HAVING go.sub_id =ca.id '
        let result =await this.app.mysql.query(sqlStr)
        return {
            code:200,
            data:result
        }
    }
    //获取总用户、总商品、总订单、总交易记录数据
    async getTypsData(){
      let sqlStr =`
      select t1.countUser,t2.countGoods,t3.countOrder,t4.countPaid from (
      (select count(user_id) as countUser  from users) t1,
      (select count(goods_id ) as countGoods from goods) t2,
      (select count(order_id) as countOrder  from orders ) t3,
      (select count(order_status) as countPaid  from orders where order_status>0  ) t4
      )
      `
    try{ 
        let result =await this.app.mysql.query(sqlStr)
        return {
            code:200,
            data:result
        }
    }catch(e){
        console.log(e)
        return {
            code:500,
            message:'发生错误'
        }
    }
        
    }

    //获取商品数据
    async getGoodsData(){
       let sqlStr = 'SELECT * FROM goods'
       let result = await this.app.mysql.query(sqlStr)
       return {
           code:200,
           data:result
       }
    }
}

module.exports = GoodsService
/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 14:50:39
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-06 11:03:05
 */
const Service = require('egg').Service
class GoodsService extends Service {
        //限时抢购
    async getFlashSale(){
        // const result = require('../data/flashSale.json')
        let sqlStr = 'SELECT * FROM goods limit 10'
        let result = await this.app.mysql.query(sqlStr)
        return {
            code:200,
            data:result
        }
    }
    //火爆商品
    async getHotProduct(){
        let sqlStr = 'SELECT * FROM goods limit 2,10'
        let result = await this.app.mysql.query(sqlStr)
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

    //商品点赞
    async goodsLike(params){
        const { goods_id,like_num } = params
        const { id:user_id }  = this.ctx.state.user
        const sqlSelect = 'SELECT * FROM goods_like where user_id ="'+user_id +'"' +' and goods_id = "' + goods_id +'"'
        let result1 = await this.app.mysql.query(sqlSelect) 
          //大于0说明已经点赞过了    
        if(result1.length>0){
          let likeNum = parseInt(like_num) -1
          //删除点赞表记录
          const sqlDelete = 'DELETE FROM  goods_like where user_id ="'+user_id +'"' +' and goods_id = "' + goods_id +'"'
          let result2 = await this.app.mysql.query(sqlDelete) 
           if(result2){
            //对商品表点赞数进行更新
               const sqlUpdate1 = 'UPDATE goods SET like_num = "'+likeNum + '" WHERE goods_id ="'+goods_id +'"' 
              let result3 = await this.app.mysql.query(sqlUpdate1)
              if(result3){
                return {
                    isLiked:0,
                    message:'取消点赞',
                    likeNum
               }
              }
           } 
        }else{
            //新增点赞表记录
             let likeNum = parseInt(like_num) +1
             const sqlInsert = 'INSERT INTO  goods_like(goods_id,user_id) VALUES (?,?)'
              let result4 = await this.app.mysql.query(sqlInsert,[goods_id,user_id]) 
             if(result4){
                //对商品表点赞数进行更新
                  const sqlUpdate2 = 'UPDATE goods SET like_num = "'+likeNum + '" WHERE goods_id ="'+goods_id +'"' 
                  let result5 = await this.app.mysql.query(sqlUpdate2)
                if(result5){
                    return {
                        isLiked:1,
                        message:'点赞成功',
                        likeNum
                    }
                }
             }

        }

    }

 //判断用户是否对商品已点赞
 async isLiked(params){
    const { goods_id } = params
    const { id:user_id }  = this.ctx.state.user
    const sqlStr1 = 'SELECT * FROM goods_like where user_id ="'+user_id  +'"' +' and goods_id = "' + goods_id +'"'
    let result1 = await this.app.mysql.query(sqlStr1) 
     if(result1.length>0){
     const sqlStr2 = 'SELECT like_num FROM goods where goods_id ="'+ goods_id +'"' 
     let result2 = await this.app.mysql.query(sqlStr2) 
         return {
             isliked:1,
             likeNum:result2[0].like_num
         }
     }else{
        return {
            isliked:0,
        }
     }
}

    //获取订单
    async getOrdeData(){
        let sqlStr ='SELECT * FROM orders'
      let result =   await this.app.mysql.query(sqlStr)
        return {
            code:200,
            data:result
        }
    }
    
    //删除订单编号
    async deleteOrderID(params){
    const { order_num } = params
      try{
        let sqlStr = 'DELETE FROM orders WHERE order_num = +"' + order_num +'"'
        let result = await this.app.mysql.query(sqlStr)
        if(result.affectedRows>0){
            return {
                code:200,
                ok:1,
                data:result
            }
        }
      
      }catch(e){
            return {
                code:500,
                ok:0,
                message:'发生错误'
            }
      }
       
    }
    //删除商品编号
    async deleteGoodsID(params){
        const { goods_serial_number } = params
          try{
            let sqlStr = 'DELETE FROM goods WHERE goods_serial_number = +"' + goods_serial_number +'"'
            let result = await this.app.mysql.query(sqlStr)
            if(result.affectedRows>0){
                return {
                    code:200,
                    ok:1,
                    data:result
                }
            }
          
          }catch(e){
              console.log(e)
                return {
                    code:500,
                    ok:0,
                    message:'发生错误'
                }
          }
           
        }
}

module.exports = GoodsService
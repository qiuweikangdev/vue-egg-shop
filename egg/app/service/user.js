/*
 * @Descripttion: 用户业务逻辑
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 14:48:38
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-22 11:41:52
 */
"use strict";

const Service = require("egg").Service;

class UserService extends Service {
     //注册
    async register(params){
        const { ctx ,app} = this;
        let { username, password, avatar, fileName, authCode } = params //接受客户端的参数
                //avatar前端传过来的头像base64二进制流数据
        let base64Data = avatar.replace(/^data:image\/\w+;base64,/, ""); //过滤base64的前缀
        let  dataBuffer = Buffer.from(base64Data, 'base64'); //二进制流转换base64
        let saltPwd = await ctx.helper.saltPassword(password) //获取加密后的密码
        let queryUser = 'SELECT * FROM users WHERE username = "' + username + '"'
        let result = {}
        let result1 = await app.mysql.query(queryUser) //查询用户存不存在
        if (!result1.length) {
            //如果用户名不存在,则新建用户
            let insertUser = 'INSERT INTO users(username,password,avatar) VALUES (?, ? , ?)'
            let result2 = await app.mysql.query(insertUser, [username, saltPwd, dataBuffer])
            if (result2) {
                result = {
                    code: 200,
                    message: '注册成功',
                }
            }

        } else {
            result = {
                code: 200,
                message: '用户名已存在,注册失败',
            }
        }
        return result 

    }
    //登录
    async login(params){
        const { ctx ,app} = this;
        let { username, password, authCode } = params;
        let secret = app.config.jwt.secret
        let sqlStr = 'SELECT * FROM users WHERE username = "' + username + '"'
        console.log(authCode,'client')
        console.log(ctx.session.code,'session')
        let result
        let result1 = await app.mysql.query(sqlStr)
          //result如果没有匹配到结果，返回的是空数组
           if (authCode !== ctx.session.code) {
            result = {
                code: 200,
                message: '验证码错误',
            }
        } else if (result1.length > 0) {
            //比较加密后密码
            await ctx.helper.comparePassword(password, result1[0].password)
                .then((isMatch) => {
                    if (isMatch) {
                        const token = ctx.helper.getToken({ id: result1[0].id, name: result1[0].username }, secret);
                        //用户信息
                        const userInfo = {
                            id: result1[0].id,
                            username: result1[0].username,
                            avatar: ctx.helper.getBase64(result1[0].avatar)
                        }
                        result = {
                            code: 200,
                            message: '登录成功',
                            token,
                            userInfo: userInfo
                        }
                    } else {
                        result = {
                            code: 200,
                            message: '密码错误',
                        }
                    }
                }).catch(err => {
                    result = {
                        code: 500,
                        message: err
                    }
                })
        } else {
            result = {
                code: 200,
                message: '用户名不存在'

            }
        }
        return result
    }
    //后台登录( 不用验证码)
    async loginAdmin(params){
        const { ctx ,app} = this;
        let { username, password  } = params;
        let secret = app.config.jwt.secret
        let sqlStr = 'SELECT * FROM users WHERE username = "' + username + '"'
        let result
        let result1 = await app.mysql.query(sqlStr)
        if(result1.length>0){
             //比较加密后密码
            await ctx.helper.comparePassword(password, result1[0].password)
                .then((isMatch) => {
                    if (isMatch) {
                        const token = ctx.helper.getToken({ id: result1[0].id, name: result1[0].username }, secret);
                        //用户信息
                        const userInfo = {
                            id: result1[0].id,
                            username: result1[0].username
                        }
                        result = {
                            code: 200,
                            message: '登录成功',
                            token,
                            userInfo: userInfo
                        }
                    } else {
                        ctx.status = 401;
                        result = {
                            message: '密码错误',
                        }
                    }
                }).catch(err => {
                    ctx.status = 500;
                    result = {
                        message: err
                    }
                })
        }
         else {
            ctx.status = 404;
            result = {
                message: '用户名不存在'

            }
        }
        return result
    }
    //获取所有用户
    async getUserAll(){
      const result =  await this.app.mysql.select('users')
      return {
          code:200,
          data:result
      }
    }

    //验证码
    async captcha() {
        const { ctx } = this;
        const captcha = await ctx.service.tools.captcha()
        ctx.response.type = 'image/svg+xml'; // 返回的类型
        return captcha.data
    } 
    //token授权
    async auth(params){
        const { ctx, app } = this;
        const { id,name } = ctx.state.user
        const secret = app.config.jwt.secret
        const token = ctx.helper.getToken({ id,name }, secret);
        return {
            code: 200,
            token
        }
    }
   //获取用户信息，需要登录授权成功才能获取用户信息
   async getUserInfo() {
    const { ctx, app } = this;
    const { id } = ctx.state.user
    // console.log(ctx.state.user)
    const sqlStr = 'SELECT * FROM users WHERE id = "' + id + '"'
    let result 
    await app.mysql.query(sqlStr).then(res => {
            const str = res[0].avatar //获取头像的二进制流数据
            const buffer = Buffer.from(str, 'utf8') //转换为buffer对象
            const base64Str = buffer.toString('base64') //根据base64编码转换为base64字符串
            const userInfo = {
                avatar: base64Str,
                username: res[0].username,
                id: res[0].id
            }
            result = {
                message: '获取数据成功',
                userInfo: userInfo
            }
        })
        .catch(err => {
            result = {
                message: '获取数据失败',
                error: err
            }
        })
    return result
}
 //添加商品到购物车
  async addToCart(params){
     const { ctx, app } = this;
     const { id:product_id,product_name,present_price,small_image}   = params
    const { id:user_id } =ctx.state.user
    let product_amount = 1;
    // let  sqlStr = 'SELECT * FROM cart where product_id  = "'+product_id +'" LIMIT 1'
    let  sqlStr = 'SELECT * FROM cart where product_id  = "'+product_id +'"' + ' and user_id ="'+user_id +'"LIMIT 1'
    let result
    await app.mysql.query(sqlStr).then(async res=>{
         if(res){
           let  result1 = JSON.parse(JSON.stringify(res))
            if(result1[0]){
                //商品已存在，则商品数量+1
                let product_amount = result1[0].product_amount +1
                let sqlStr = 'UPDATE cart SET product_amount = "'+product_amount +'" WHERE  product_id = "'+product_id+'"'
                await app.mysql.query(sqlStr).then(res=>{
                    if(res){
                        result = {
                            code:200,
                            message:'添加购物车成功'
                        }
                    }
                }).catch(error=>{
                    console.log(error)
                    result = {
                        code:0,
                        message:'添加购物车失败'
                    }
                })
            }else{
                //如果商品不存在，则插入商品到数据库
            let add_str = 'INSERT INTO cart(user_id,product_id,product_name,price,product_amount,product_image) VALUES(?,?,?,?,?,?)'
            let sql_params = [user_id,product_id,product_name,present_price,product_amount,small_image]
              await app.mysql.query(add_str,sql_params).then(res=>{
                  if(res){
                    result=  {
                        code:200,
                        message:'添加购物车成功'
                    }
                  }
              }).catch(error=>{
                  console.log(error)
                  result = {
                        code:500,
                        message:'添加失败'
                    }
              })
            }
         }
    }).catch(err=>{
        console.log(err)
        result=  {
            code:500,
            message:'服务器内部错误'
        }
    })
    return result
  }

  //请求购物车数据
  async getShopCartData(params){
      const { ctx,app } = this
      const { id:user_id } = ctx.state.user
      let sqlStr = 'SELECT * FROM cart where user_id ="'+user_id+'"'
      let result
      try{
        let data =  await app.mysql.query(sqlStr)
        result = {
            code:200,
            data
        }

      }catch(error){
          console.log(error)
      }
    return result
     
  }
  
  //减少商品
  async reduceGoods(params){
    const { product_id,product_amount}   = params
    const { id:user_id } = this.ctx.state.user
    try{ 
        if(parseInt(product_amount)>1){
            let amount = parseInt(product_amount) -1
            let sql_update = 'UPDATE cart SET product_amount = "'+amount+'"  WHERE  product_id = "'+product_id+'"' +' and user_id = "'+ user_id +'"'
            let res =   await this.app.mysql.query(sql_update)
            if(res){
                return {
                    code:200,
                    message:'减少商品成功'
                }
            }
        }else if(parseInt(product_amount) === 1){
            let sql_delete = 'DELETE FROM cart  WHERE  product_id = "' +product_id+'"'
            let res = await this.app.mysql.query(sql_delete)
            if(res){
                return {
                    code:200,
                    message:'删除商品成功'
                }
            }
        }
    }catch(e){
        return {
            code:500,
            message:'减少失败'
        }
    }
  }
  //增加商品
  async addGoods(params){
    const { ctx, app } = this;
    const { product_id,product_amount}   = params
    const { id:user_id } = this.ctx.state.user
    try{
        let amount = parseInt(product_amount) +1
        let sql_update = 'UPDATE cart SET product_amount = "'+amount+'"  WHERE  product_id = "'+product_id+'"' +' and user_id ="' + user_id +'"'
        let res =   await app.mysql.query(sql_update)
        if(res){
            return {
                code:200,
                message:'添加成功'
            }
        }
    }catch(e){
        return {
            code:500,
            message:'添加失败'
        }
    }
  }
  //生成订单ID
  async generateOrderID(){
    return this.ctx.helper.getOrderID()
  }
  //生成订单
  async generateOrder(params){
      //订单编号、收获人名字、收货人电话、省、市、区、商品金额、运费金额、支付金额
    const { order_num,shipping_user,tel,province,city,county,order_amount,shipping_fee,payment_amount,goods,order_status}   = params
    const { id:user_id }  = this.ctx.state.user
    let value1 = {
        order_num,
        user_id,
        shipping_user,
        tel,
        province,
        city,
        county,
        order_amount,
        shipping_fee,
        payment_amount,
        order_status
    }
    try{
      let result1 =  await this.app.mysql.insert('order',value1)
       if(result1){
           let value2={}
           let result2 =  await this.app.mysql.select('order',{
               where:{ order_num},
               columns:['order_id'],
               limit:1
           })
           goods.map(async item=>{
               value2.order_id =result2[0].order_id
               value2.product_id = item.product_id,
               value2.product_name=item.product_name,
               value2.product_amount=item.product_amount
               value2.product_image = item.product_image
               value2.product_price = item.price
               await this.app.mysql.insert('order_detail',value2)
           })
       }
       if(order_status){
        return {
            code:200,
            message:'提交订单成功'
        }
       }else{
            return {
                code:200,
                message:'待付款订单'
            }
       }
      
    }catch(err){
        console.log(err)
         return {
           code:500,
           message:'提交订单失败'
       }
    }
    
  }
  //获取订单数据
  async getOrderInfo(params){
      //这里查询语句可以进行优化 (可使用多表查询)
    const { order_status } = params //根据订单类型来查询数据
    // order_type 为 0 时 查询未支付的订单,为1时查询订单,[0,1]查询全部
    const { id:user_id }  = this.ctx.state.user
    //查询订单号
    try{
        //一个用户可能有多个订单号
        let result1 =  await this.app.mysql.select('order',{
            where:{ user_id,order_status},
            columns:['order_id','order_status'],
        })
        //根据订单号id获取商品 数据
        let order_id=[]
        let orderInfo = []
        result1.map((item)=>{
            let obj = {}
            obj.order_status =item.order_status
            obj.order_id =item.order_id
            order_id.push(item.order_id)
            orderInfo.push(obj)
        })
        let result2 =  await this.app.mysql.select('order_detail',{
            where:{ order_id },
        })
        let newResult=[]
        for(let i =0;i<orderInfo.length;++i){
            let arr = []
            result2.map((item,index)=>{
                if(orderInfo[i].order_id ===item.order_id){
                    item.order_status=orderInfo[i].order_status
                    arr.push(item)
                }
            })
            if(arr.length>0){
                newResult.push(arr)
             }
         
        }

        return {
            code:200,
            data:newResult
        }
    }catch(error){
        console.log(error)
        return {
            code:500,
            data:'获取订单数据失败'
        }
    }
    
  }
}

module.exports = UserService
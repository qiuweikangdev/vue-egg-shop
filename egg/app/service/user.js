/*
 * @Descripttion: 用户业务逻辑
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-21 14:48:38
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-01 16:17:20
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
        const { username } = ctx.state.user
        const secret = app.config.jwt.secret
        const token = ctx.helper.getToken({ username }, secret);
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
    let  sqlStr = 'SELECT * FROM cart where product_id = "'+product_id +'" LIMIT 1'
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
                        code:0,
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
    try{ 
        if(parseInt(product_amount)>1){
            let amount = parseInt(product_amount) -1
            let sql_update = 'UPDATE cart SET product_amount = "'+amount+'"  WHERE  product_id = "'+product_id+'"'
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
    try{
        let amount = parseInt(product_amount) +1
        let sql_update = 'UPDATE cart SET product_amount = "'+amount+'"  WHERE  product_id = "'+product_id+'"'
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
    
}

module.exports = UserService
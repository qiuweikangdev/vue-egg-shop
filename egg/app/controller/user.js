'use strict'
const Controller = require('egg').Controller
class UserController extends Controller {
    //前台
    //注册
    async register() {
        this.ctx.body = await this.ctx.service.user.register(this.ctx.params)
    }
    //登录
    async login() {
        this.ctx.body = await this.ctx.service.user.login(this.ctx.params)
    }
    //token授权
    async auth() {
        this.ctx.body = await this.ctx.service.user.auth(this.ctx.params)
    }
    //获取用户角色
    async getUserRole() {
        this.ctx.body = await this.ctx.service.user.getUserRole()
    }
    //获取用户信息
    async getUserInfo() {
        this.ctx.body = await this.ctx.service.user.getUserInfo(this.ctx.params)
    }
    //验证码
    async captcha() {
        this.ctx.body = await this.ctx.service.user.captcha(this.ctx.params)
    }
    //添加商品到购物车
    async addToCart() {
        this.ctx.body = await this.ctx.service.user.addToCart(this.ctx.params)
    }
    //获取购物车商品
    async getShopCartData() {
        this.ctx.body = await this.ctx.service.user.getShopCartData(this.ctx.params)
    }
    //增加商品
    async addGoods() {
        this.ctx.body = await this.ctx.service.user.addGoods(this.ctx.params)
    }
    //减少商品
    async reduceGoods() {
        this.ctx.body = await this.ctx.service.user.reduceGoods(this.ctx.params)
    }
    //生成订单ID
    async generateOrderID() {
        this.ctx.body = await this.ctx.service.user.generateOrderID()
    }
    //生成订单
    async generateOrder() {
        this.ctx.body = await this.ctx.service.user.generateOrder(this.ctx.params)
    }
    //获取订单
    async getOrderInfo() {
        this.ctx.body = await this.ctx.service.user.getOrderInfo(this.ctx.params)
    }
    //后台系统
    async loginAdmin() {
        this.ctx.body = await this.ctx.service.user.loginAdmin(this.ctx.params)
    }
    async getUserAll() {
        this.ctx.body = await this.ctx.service.user.getUserAll()
    }
    async deleteUserID() {
        this.ctx.body = await this.ctx.service.user.deleteUserID(this.ctx.params)
    }
    //小程序
    async wxLoginAuth() {
        this.ctx.body = await this.ctx.service.user.wxLoginAuth(this.ctx.params)
    }
}
module.exports = UserController

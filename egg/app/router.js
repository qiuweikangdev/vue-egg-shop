/*
 * @Descripttion:
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-20 17:26:52
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

     // 个人中心模块接口
    router.get('/captcha', controller.user.captcha); //验证码
    router.post('/user/login', controller.user.login); //登录
    router.post('/user/register', controller.user.register); //注册
    router.get('/user/authorization', app.jwt, controller.user.auth); //token授权
    router.get('/user/getUserInfo', app.jwt, controller.user.getUserInfo); //获取用户信息
    router.post('/user/addToCart', app.jwt,controller.user.addToCart); // 添加购物车
    router.get('/user/getShopCartData', app.jwt,controller.user.getShopCartData); // 请求购物车数据
    router.post('/user/addGoods',app.jwt,controller.user.addGoods); // 增加购物车商品
    router.post('/user/reduceGoods',app.jwt, controller.user.reduceGoods); // 减少购物车商品

    //订单
    router.get('/user/generateOrderId',controller.user.generateOrderID); // 生成订单id
    router.post('/user/generateOrder',app.jwt,controller.user.generateOrder); // 生成订单信息
    router.post('/user/getOrderInfo',app.jwt,controller.user.getOrderInfo); // 生成订单信息


    //首页
    router.get('/home/homecarousel', controller.home.homeCarousel); // 首页轮播图
    router.get('/home/homenav', controller.home.homeNav); // 首页导航
    router.get('/home/getFlashSale', controller.goods.getFlashSale); // 首页限时抢购商品
    //分类
    router.get('/insertAllGoods', controller.category.insertAllGoods); // 插入商品数据到数据库
    router.get('/insertCategorySub', controller.category.insertCategorySub); // 插入分类目录到数据库
    router.get('/goods/getCategorySub', controller.category.getCategorySub); // 读取分类目录
    router.get('/goods/getGoodsByCategoryID', controller.category.getGoodsByCategoryID); // 根据分类id读取某分类商品数据
    //搜索
    router.get('/goods/searchGoods', controller.search.searchGoods); // 根据商品名字来搜索某所有商品


    //后台系统
    router.post('/user/loginAdmin', controller.user.loginAdmin); //登录

};
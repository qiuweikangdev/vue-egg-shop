/*
 * @Descripttion:
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-17 11:01:29
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // //个人中心模块接口
    // router.get('/captcha', controller.user.captcha); //验证码
    // router.post('/user/login', controller.user.login); //登录
    // router.post('/user/register', controller.user.register); //注册
    // router.get('/user/authorization', app.jwt, controller.user.auth); //token授权
    // router.get('/user/getUserInfo', app.jwt, controller.user.getUserInfo); //获取用户信息


    // //商品中心接口
    // router.get('/goods/homecarousel', controller.goods.homecarousel); // 首页轮播图
    // router.get('/goods/homenav', controller.goods.homenav); // 首页导航
    // router.get('/goods/homeflash', controller.goods.homeflash); // 首页限时抢购
    // router.get('/insertAllGoods', controller.goods.insertAllGoods); // 插入商品数据到数据库
    // router.get('/insertCategorySub', controller.goods.insertCategorySub); // 插入分类目录到数据库
    // router.get('/goods/getCategorySub', controller.goods.getCategorySub); // 读取分类目录
    // router.get('/goods/getGoodsByCategoryID', controller.goods.getGoodsByCategoryID); // 根据分类id读取某分类商品数据
    // router.get('/goods/searchGoods', controller.goods.searchGoods); // 根据分类id读取某分类商品数据


     // //个人中心模块接口
    router.get('/captcha', controller.user.captcha); //验证码
    router.post('/user/login', controller.user.login); //登录
    router.post('/user/register', controller.user.register); //注册
    router.get('/user/authorization', app.jwt, controller.user.auth); //token授权
    router.get('/user/getUserInfo', app.jwt, controller.user.getUserInfo); //获取用户信息
    router.post('/user/addToCart', app.jwt,controller.user.addToCart); // 添加购物车
    router.get('/user/getShopCartData', app.jwt,controller.user.getShopCartData); // 请求购物车数据
    router.post('/user/addGoods', app.jwt,controller.user.addGoods); // 增加商品
    router.post('/user/reduceGoods', app.jwt,controller.user.reduceGoods); // 减少商品

    //首页
    router.get('/home/homecarousel', controller.home.homeCarousel); // 首页轮播图
    router.get('/home/homenav', controller.home.homeNav); // 首页导航
    router.get('/home/homeflash', controller.home.homeFlash); // 首页限时抢购
    //分类
    router.get('/insertAllGoods', controller.category.insertAllGoods); // 插入商品数据到数据库
    router.get('/insertCategorySub', controller.category.insertCategorySub); // 插入分类目录到数据库
    router.get('/goods/getCategorySub', controller.category.getCategorySub); // 读取分类目录
    router.get('/goods/getGoodsByCategoryID', controller.category.getGoodsByCategoryID); // 根据分类id读取某分类商品数据
    //搜索
    router.get('/goods/searchGoods', controller.search.searchGoods); // 根据商品名字来搜索某所有商品

};
/*
 * @Descripttion:
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-29 16:20:03
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-28 14:39:41
 */
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    //个人中心模块接口
    router.get('/captcha', controller.user.captcha); //验证码
    router.post('/user/login', controller.user.login); //登录
    router.post('/user/register', controller.user.register); //注册
    router.get('/user/authorization', app.jwt, controller.user.auth); //token授权
    router.get('/user/getUserInfo', app.jwt, controller.user.getUserInfo); //获取用户信息
    router.post('/verify-code', controller.user.verifyCode); //校验验证码


    //商品中心接口
    router.get('/goods/homecarousel', controller.goods.homecarousel); // 首页轮播图
    router.get('/goods/homenav', controller.goods.homenav); // 首页导航
    router.get('/goods/homeflash', controller.goods.homeflash); // 首页限时抢购
    router.get('/insertAllGoods', controller.goods.insertAllGoods); // 插入商品数据到数据库
    router.get('/insertCategorySub', controller.goods.insertCategorySub); // 插入分类目录到数据库
    router.get('/goods/getCategorySub', controller.goods.getCategorySub); // 读取分类目录
    router.post('/goods/getGoodsByCategoryID', controller.goods.getGoodsByCategoryID); // 根据分类id读取某分类商品数据
};
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-05 22:50:30
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-20 14:48:10
 */
/*
 * @Descripttion: mutations的事件变量
 */

// 1、 设置token
export const SET_TOKEN = 'SET_TOKEN'
    // 2.用户信息
export const USER_INFO = 'USER_INFO';
// 3、.初始化用户信息
export const INIT_USER_INFO = 'INIT_USER_INFO';

// 4.初始化用户收货地址 
export const INIT_USER_SHIPPING_ADDRESS = 'INIT_USER_SHIPPING_ADDRESS';
// 5.增加用户收货地址
export const ADD_USER_SHIPPING_ADDRESS = 'ADD_USER_SHIPPING_ADDRESS';
// 6.删除用户收货地址
export const DELETE_USER_SHIPPING_ADDRESS = 'DELETE_USER_SHIPPING_ADDRESS';
// 7.修改用户收货地址
export const CHANGE_USER_SHIPPING_ADDRESS = 'CHANGE_USER_SHIPPING_ADDRESS';

// 8.首页轮播图
export const HOME_CAROUSEL = 'HOME_CAROUSEL'
    // 9.首页导航滚动区域数据
export const HOME_NAV = 'HOME_NAV'
    //10.限时抢购商品
export const HOME_FLASH = 'HOME_FLASH'

// 11.添加商品
export const ADD_GOODS = 'ADD_GOODS'

//12.添加商品到购物车
export const ADD_TO_CART = 'ADD_TO_CART'

//13. 初始化购物车数据
export const INIT_SHOP_CART = 'INIT_SHOP_CART'

//14.减少商品
export const REDUCE_GOODS = 'REDUCE_GOODS'

//15.删除选中商品
export const DELETE_SELECT_GOODS = 'DELETE_SELECT_GOODS'

//15.单个商品复选框事件
export const SINGLE_SELECT_GOODS = 'SINGLE_SELECT_GOODS'

//15.全选商品品事件
export const ALL_SELECT_GOODS = 'ALL_SELECT_GOODS'
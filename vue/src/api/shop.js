/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-18 12:59:37
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-18 10:27:02
 */
import axios from './index'

// 1.请求首页轮播
export const getHomeCarousel = () => {
    return axios.request({
        url: 'home/homecarousel',
        method: 'get'
    })
}


// 2.请求首页导航区域
export const getHomeNav = () => {
    return axios.request({
        url: 'home/homenav',
        method: 'get'
    })
}

// 3.请求首页限时抢购商品
export const getHomeFlash = () => {
    return axios.request({
        url: 'home/getFlashSale',
        method: 'get'
    })
}

// 4.请求分类目录数据
export const getCategorySub = () => {
    return axios.request({
        url: 'goods/getCategorySub',
        method: 'get'
    })
}

// 5.根据分类id读取某分类商品数据
export const getGoodsByCategoryID = (subID) => {
    return axios.request({
        url: 'goods/getGoodsByCategoryID',
        method: 'get',
        params: {
            subID
        }
    })
}

// 6.根据商品名称搜索商品
export const searchGoods = (name) => {
    return axios.request({
        url: 'goods/searchGoods?time=' + new Date(),
        method: 'get',
        params: {
            name
        }
    })
}



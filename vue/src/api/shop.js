/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-18 12:59:37
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-31 13:12:45
 */
import axios from './index'

export const getGoodsInfo = (id) => {
    return axios.request({
        url: 'goods/getGoodsInfo',
        method: 'post',
        baseURL: 'http://127.0.0.1:3000',
        data: {
            id
        }
    })

}


export const getGoods = () => {
    return axios.request({
        url: 'goods/getGoods',
        method: 'get',
        baseURL: 'http://127.0.0.1:3000'
    })
}

export const getDetailGoodsInfo = (goodsId) => {
    return axios.request({
        url: 'goods/getDetailGoodsInfo',
        method: 'post',
        baseURL: 'http://127.0.0.1:3000',
        data: {
            goodsId
        }
    })
}

// 1.请求首页轮播
export const getHomeCarousel = () => {
    return axios.request({
        url: 'goods/homecarousel',
        method: 'get',
        baseURL: 'http://127.0.0.1:3000',
    })
}


// 2.请求首页导航区域
export const getHomeNav = () => {
    return axios.request({
        url: 'goods/homenav',
        method: 'get',
        baseURL: 'http://127.0.0.1:3000',
    })
}

// 3.请求首页限时抢购
export const getHomeFlash = () => {
    return axios.request({
        url: 'goods/homeflash',
        method: 'get',
        baseURL: 'http://127.0.0.1:3000',
    })
}

// 4.请求分类目录数据
export const getCategorySub = () => {
    return axios.request({
        url: 'goods/getCategorySub',
        method: 'get',
        baseURL: 'http://127.0.0.1:3000'
    })
}

// 5.根据分类id读取某分类商品数据
export const getGoodsByCategoryID = (subID) => {
    return axios.request({
        url: 'goods/getGoodsByCategoryID',
        method: 'get',
        baseURL: 'http://127.0.0.1:3000',
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
        baseURL: 'http://127.0.0.1:3000',
        params: {
            name
        }
    })
}
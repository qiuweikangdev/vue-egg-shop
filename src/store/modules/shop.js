/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-11-27 11:54:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-14 19:46:02
 */
import { getHomeCarousel, getHomeNav, getHomeFlash } from '@/api/shop'
// import { getToken, setToken, removeToken} from '@/utils/auth'
import {
    HOME_CAROUSEL,
    HOME_NAV,
    HOME_FLASH
} from './mutation-types'



const state = {
    homecarousel: [], //首页轮播图
    homenav: [], //首页导航滚动区域数据
    homeflash: [], //首页限时抢购
}

const mutations = {
    //1.保存首页轮播图
    [HOME_CAROUSEL](state, homecarousel) {
        state.homecarousel = homecarousel
    },
    //2.保存首页导航滚动区域数据
    [HOME_NAV](state, homenav) {
        state.homenav = homenav
    },
    //3.保存首页导航滚动区域数据
    [HOME_FLASH](state, homeflash) {
        state.homeflash = homeflash
    }

}


const actions = {
    // 1. 获取首页的轮播图
    async reqHomeCarousel({ commit }) {
        const result = await getHomeCarousel()
            // console.log(result, 'carousel')
        commit('HOME_CAROUSEL', result.data.data)
    },
    // 2. 获取首页导航滚动区域数据
    async reqHomeNav({ commit }) {
        const result = await getHomeNav()
        commit('HOME_NAV', result.data.data.data)
    },
    // 2. 获取首页限时抢购
    async reqHomeFlash({ commit }) {
        const result = await getHomeFlash()
        commit('HOME_FLASH', result.data.data.data.product_list)
    }
}



export default {
    namespaced: true, //命名空间 
    state,
    mutations,
    actions
}
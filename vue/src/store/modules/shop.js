/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-16 17:34:14
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-05 16:56:15
 */
/*
 * @Descripttion: 商品类数据存储
 * @Author: qqqiu
 */
import { getHomeCarousel, getHomeNav, getHomeFlash ,getCategorySub,getGoodsByCategoryID } from '@/api/shop'
// import { getToken, setToken, removeToken} from '@/utils/auth'
import {
    HOME_CAROUSEL,
    HOME_NAV,
    HOME_FLASH,
    CATEGORY_SUB
} from './mutation-types'



const state = {
    homecarousel: [], //首页轮播图
    homenav: [], //首页导航滚动区域数据
    homeflash: [], //首页限时抢购
    CategorySub: [], //商品分类目录数据
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
    },
     //4.保存分类目录数据
     [CATEGORY_SUB](state, CategorySub) {
        state.CategorySub =CategorySub
    }

}


const actions = {
    // 1. 获取首页的轮播图
    async reqHomeCarousel({ commit }) {
        const result = await getHomeCarousel()
        commit('HOME_CAROUSEL', result.data.data)
    },
    // 2. 获取首页导航滚动区域数据
    async reqHomeNav({ commit }) {
        const result = await getHomeNav()
        commit('HOME_NAV', result.data.data.data)
    },
    // 3. 获取首页限时抢购
    async reqHomeFlash({ commit }) {
        const result = await getHomeFlash()
        commit('HOME_FLASH', result.data.data)
    },
    // 4. 获取商品分类目录
    async reqCategorySub({ commit }) {
        const result = await getCategorySub()
        // console.log(result.data.message)
        commit('CATEGORY_SUB', result.data.success)
    },
    // // 5.根据分类id读取某分类商品数据
    // async reqGoodsByCategoryID({ commit },subID) {
    //       await getGoodsByCategoryID(subID).then(res=>{
    //            return res.data.result
    //       })
    //       .catch(error=>{
    //           console.log(error)
    //       })
       
        
    // }
}



export default {
    namespaced: true, //命名空间 
    state,
    mutations,
    actions
}
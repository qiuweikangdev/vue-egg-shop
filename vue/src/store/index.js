/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-16 17:34:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-24 14:42:38
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import shop from './modules/shop'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        user, //用户信息相关的模块
        shop
    },
    getters
})
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import shop from './modules/shop'
import settings from './modules/settings'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        user, //用户信息相关的模块
        shop,
        settings
    },
    getters
})
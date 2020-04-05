/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-16 19:13:01
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-05 23:04:30
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from '@/store/index'
import '@/config/rem'
import '@/styles/index.scss'
import uploader from 'vue-simple-uploader'
import VTop from '@/components/backToTop'
import '@/icons'
import '@/filter' //全局引入过滤器
import FastClick from 'fastclick'
//推荐局部引入组件库中的组件
import { Cell, CellGroup, Tabbar, TabbarItem, Stepper, Tab, Tabs, Button, Row, Col, Swipe, SwipeItem, Lazyload, Field, NavBar, Skeleton, Divider, Uploader, SwitchCell, Grid, GridItem, AddressList, AddressEdit, Area, Search, CountDown, SubmitBar, Checkbox, List, PullRefresh, GoodsAction, GoodsActionIcon, GoodsActionButton,ContactCard, ContactList, ContactEdit,Icon} from 'vant'
Vue.use(uploader)
Vue.use(Cell).use(CellGroup).use(Tabbar).use(TabbarItem).use(Stepper).use(Tab).use(Tabs).use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(Skeleton).use(Divider).use(Uploader).use(SwitchCell).use(Grid).use(GridItem).use(AddressList).use(AddressEdit).use(Area).use(Search).use(CountDown).use(SubmitBar).use(Checkbox).use(List).use(PullRefresh).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(ContactCard).use(ContactList).use(Icon);

Vue.component('v-top', VTop)

// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
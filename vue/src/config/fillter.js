/*
 * @Descripttion: 价格过滤器
 * @Date: 2019-09-19 13:41:46
 * @LastEditTime: 2019-12-13 16:03:10
 */
//对金钱的格式化处理
import Vue from 'vue'
Vue.filter('moneyFormat', (value) => {
    return '¥' + Number(value).toFixed(2);
})
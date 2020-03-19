/*
 * @Descripttion: 价格过滤器
 * @Date: 2019-09-19 13:41:46
 * @LastEditTime: 2020-03-19 10:41:01
 */
//对金钱的格式化处理
import Vue from 'vue'
Vue.filter('moneyFormat', (value) => {
    return '¥' + Number(value).toFixed(2);
})
Vue.filter('amountFormat',(value)=>{
    return '×' + Number(value)
})
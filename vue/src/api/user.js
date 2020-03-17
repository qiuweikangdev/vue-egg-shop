/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-16 17:34:13
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-17 11:01:52
 */
/*
 * @Descripttion: 用户个人中心相关接口
 * @Author: qqqiu
 */
import axios from './index'

//1.注册
export const register = (username, password, avatar, fileName, authCode) => {
    return axios.request({
        url: 'user/register',
        method: 'post',
        data: {
            username,
            password,
            avatar, //头像
            fileName, //文件名字
            authCode
        },
    })
}

//2、登录
export const login = (username, password, authCode) => {
    return axios.request({
        url: 'user/login',
        method: 'post',
        data: {
            username,
            password,
            authCode
        },

    })
}

//3、判断token是否有效
//后端判断请求头有无 token，没有或者 token 过期，返回401；
export const authorization = () => {
    return axios.request({
        url: '/user/authorization',
        method: 'get',
    })
}

// //上传头像
// export const upload = (files) => {
//     return axios.request({
//         url: '/user/upload',
//         method: 'post',
//         // headers: {'Content-Type': 'multipart/form-data'},
//         data: {
//             files
//         }
//     })
// }


//4、获取用户相关信息 
export const getUserInfo = () => {
    return axios.request({
        url: '/user/getUserInfo',
        method: 'get',
    })
}

// //5、验证码
// export const captcha = () => {
//         return axios.request({
//             url: '/captcha',
//             method: 'get',
//         })
//     }
    //验证验证码
// export const verifyCode = (code) => {
//     return axios.request({
//         url: '/verify-code',
//         method: 'post',
//         data: {
//             code
//         }
//     })
// }

// 5、添加商品到购物车
export const addToCart = (goods) => {
    return axios.request({
        url: 'user/addToCart',
        method: 'post',
        params:goods
           
    })
}

//6 请求购物车数据
export const getShopCartData = ()=>{
    return axios.request({
        url: 'user/getShopCartData',
        method: 'get',
    })
}
//7 增加商品
export const addGoods = (goods)=>{
    return axios.request({
        url: 'user/addGoods',
        method: 'post',
        params:goods
    })
}
//8 减少商品
export const reduceGoods = (goods)=>{
    return axios.request({
        url: 'user/reduceGoods',
        method: 'post',
        params:goods
    })
}
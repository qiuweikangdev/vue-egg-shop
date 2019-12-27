/*
 * @Descripttion: 用户个人中心相关接口
 * @Author: qqqiu
 */
import axios from './index'
export const register = (username, password, avatar, fileName, authCode) => {
    return axios.request({
        url: 'user/register',
        method: 'post',
        baseURL: "http://127.0.0.1:3000/",
        data: {
            username,
            password,
            avatar, //头像
            fileName, //文件名字
            authCode
        },
    })
}

//登录
export const login = (username, password, authCode) => {
    return axios.request({
        url: 'user/login',
        method: 'post',
        baseURL: "http://127.0.0.1:3000/",
        data: {
            username,
            password,
            authCode
        },

    })
}

//判断token是否有效
//后端判断请求头有无 token，没有或者 token 过期，返回401；
export const authorization = () => {
    return axios.request({
        url: '/user/authorization',
        baseURL: 'http://127.0.0.1:3000',
        method: 'get',
    })
}

//上传头像
export const upload = (files) => {
    return axios.request({
        url: '/user/upload',
        baseURL: 'http://127.0.0.1:3000',
        method: 'post',
        // headers: {'Content-Type': 'multipart/form-data'},
        data: {
            files
        }
    })
}


//获取用户相关信息 
export const getUserInfo = () => {
    return axios.request({
        url: '/user/getUserInfo',
        baseURL: 'http://127.0.0.1:3000',
        method: 'get',
    })
}

//验证码
export const captcha = () => {
        return axios.request({
            url: '/captcha',
            method: 'get',
            baseURL: 'http://127.0.0.1:3000',
        })
    }
    //验证验证码
export const verifyCode = (code) => {
    return axios.request({
        url: '/verify-code',
        method: 'post',
        baseURL: 'http://127.0.0.1:3000',
        data: {
            code
        }
    })
}
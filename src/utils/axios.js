import axios from 'axios'
import { baseURL } from '@/config/baseURL'
import store from '@/store'
import { getToken } from './auth'
import { Toast } from 'vant';
axios.defaults.withCredentials = true; //允许请求头携带cookie
class HttpRequest {
    //baseURL请求的基础路径
    //当没有传入baseUrl参数时，则使用默认的baseURL
    constructor(baseUrl = baseURL) {
        // this是我们创建的实例
        this.baseUrl = baseUrl
        this.queue = {} //每次请求的url都放进去queue里
    }
    getInsideConfig() {
            const config = {
                baseURL: this.baseUrl,
                headers: {},
            }
            return config
        }
        //请求和响应拦截
    interceptors(instance, url) {
        //请求拦截
        //在发送请求之前做些什么
        //可让每个请求携带令牌token
        instance.interceptors.request.use(config => {
                //添加全局的loading.. 
                //Spin.show  （方法）
                //config : 请求的所有配置 
                // console.log('request',config)
                // if(!Object.keys(this.queue).length){
                //如果没有queue队列里没有请求即没有url
                //则调用Spin.show() 这个方法
                // }


                // 每次发送请求之前判断vuex中是否存在token        
                // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
                // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
                // const token = store.state.token;        
                // token && (config.headers.Authorization = token); 
                if (store.getters.token) {
                    config.headers['authorization'] = 'Bearer ' + getToken()
                }
                // this.queue[url] = true
                return config
            }, error => {
                return Promise.reject(error)
            })
            //响应拦截
            //成功请求
        instance.interceptors.response.use(res => {
            //res ：响应的信息
            //对响应的结果进行处理
            //    delete this.queue[url] 
            //拿到响应结果的data数据和status状态码
            const { data, status } = res
            if (data.code === 401) {
                Toast({
                    type: 'fail',
                    duration: '1000',
                    message: '登录过期,请重新登录'
                });
            }
            // return data
            return res
        }, error => {
            // delete this.queue[url]  
            return Promise.reject(error)
        })
    }
    request(options) {
        const instance = axios.create()
            // 把两个对象合并一个对象
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
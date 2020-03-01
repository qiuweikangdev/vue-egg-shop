//baseUrL请求的基础路径
//NODE_ENV是用户一个自定义的变量
//process.env属性返回包含用户环境的对象
export const baseURL = process.env.NODE_ENV === 'production' ?
    '' //部署在一个域名的根路径  生产环境 （上线）
    :
    'http://127.0.0.1:5000' //本地开发环境
import vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store'
import { startLoading,endLoading } from '@/utils/toast'
import { getToken ,removeToken,setToken } from '@/utils/auth';
import NProgress from 'nprogress'   //进度条
import 'nprogress/nprogress.css'  //进度条的样式，这个样式必须引入
import { Toast } from 'vant';
NProgress.configure({ showSpinner: false }) 
//解决点击同一个路由，页面报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


vue.use(Router)
const router = new Router({
    routes
})


router.beforeEach((to,from,next)=>{
     NProgress.start()
     const token = getToken()
     //每进入路由之前需要判断每个路由是否需要登录
    if(to.matched.some((item)=>{
        return item.meta.login_require
    })){                                                                                                  
        if(token){
            store.dispatch('user/authorization').then((res)=>{
                if(to.name === 'login') next({name:'home'})
                else next()
                NProgress.done()
             })
             .catch((err)=>{
                 //token过期，重新登录
                 //清除token  (如果不清除token会造成死循环)
                //  removeToken() 或者 setToken('')
                //   removeToken()
                 setToken('')
                 next({name:'login'})
                 NProgress.done()
             })
        }
        else{
            if(to.name == 'register'){next()}
            else  next({name:'login'})
            NProgress.done()
        }
    }else{
        next()
    }
 
})

router.afterEach(() => {
    //完成进度条
    NProgress.done()

  })


export default router
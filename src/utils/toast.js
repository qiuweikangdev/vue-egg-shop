// import Vue from 'vue';
import { Toast } from 'vant';

// Vue.use(Toast);

var loading 
export const startLoading = ()=>{
    loading = Toast.loading({
            mask: true,
            duration:3000,
            message: '加载中...'
        });
}

export const endLoading = ()=>{
    loading.clear()
}



//倒计时提示

// export const toast = (message)=>{
//       loading = Toast.loading({
//          duration:800,
//          forbidClick: true, // 禁用背景点击
//          message: message
//      })
// }
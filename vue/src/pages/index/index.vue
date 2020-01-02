<!--
 * @Descripttion: 一级路由主界面
 * @Author: qqqiu
 -->
<template>
    <div>
         <!-- 底部导航栏为主界面-->
         <!-- showBottomTabBar表示是否展示底部标签栏 -->
          <tab-bar v-show="$route.meta.showBottomTabBar"></tab-bar>
          <!-- 二级路由 -->
          
        <router-view ></router-view>
    </div>
</template>

<script>
import TabBar from '@/pages/tabBar/tabBar'
    export default {
         components:{
     TabBar
   },
   data(){
       return {
           flag:true
       }
   },
   created(){
         this.flag = true
    //    if(this.$route.name.includes("category")){
    //        this.flag = false
    //    }else{
    //          this.flag = true
    //    }
   },
   watch:{
       flag(val){
           if(val){
            //    this.flag = false
           }
        //    if(val){
        //         this.flag = true
        //    }else{
        //        console.log(this.flag)
        //         this.flag = false
        //    }
       },
       $route(to){
            this.flag = true
       }
   },
   methods:{
       getFlag(msg){
         this.flag = msg
       }
   }
    }
</script>

<style lang="scss" scoped>

</style>
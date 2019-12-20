<!--
 * @Descripttion: 一级路由主界面
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-20 10:02:48
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-20 10:32:38
 -->
<template>
    <div>
         <!-- 底部导航栏为主界面-->
          <tab-bar></tab-bar>
          <!-- 二级路由 -->
        <router-view></router-view>
    </div>
</template>

<script>
import TabBar from '@/pages/tabBar/tabBar'
    export default {
         components:{
     TabBar
   }
    }
</script>

<style lang="scss" scoped>

</style>
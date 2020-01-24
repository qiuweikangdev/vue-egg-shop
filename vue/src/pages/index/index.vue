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
          
         <keep-alive>
                <router-view v-if="$route.meta.keepAlive">
                    <!--这里是会被缓存的路由-->
                </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
            <!--因为用的是v-if 所以下面还要创建一个未缓存的路由视图出口-->
        </router-view>

    </div>
</template>

<script>
import TabBar from '@/pages/tabBar/tabBar'
    export default {
         components:{
     TabBar
   },
    }
</script>

<style lang="scss" scoped>

</style>
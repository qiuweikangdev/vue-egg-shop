<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-16 19:13:01
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-20 10:30:02
 -->
<template>
 <div id="app">
   <router-view></router-view>
   <!-- 底部导航栏-->
   <!-- <tab-bar></tab-bar> -->
 </div>
</template>

<script>
// import TabBar from '@/pages/tabBar/tabBar'
export default {
  //  components:{
  //    TabBar
  //  }
}
</script>
<style>
html,
body,
#app {
  height: 100%;
  /* touch-action: none 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。 */
}
</style>


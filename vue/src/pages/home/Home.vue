<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-08 20:56:04
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-05 16:59:43
 -->
<template>
  <div id='home'> 
      <!-- 1、头部搜索栏 -->
      <div class="Header" >
         <Search :isShow.sync='flag'></Search>
      </div>
     
      <div v-show='flag'>
            <!-- 2.轮播图 -->
      <Carousel :homecarousel='homecarousel'></Carousel>
      <!-- 3.中间区域导航滚动 -->
      <Nav :homenav='homenav'></Nav>
      <!-- 4.限时抢购 -->
      <flash-sale ></flash-sale>
      <!-- 5.限时抢购商品横向滚动 -->
      <flash-food :FlashFood='homeflash'></flash-food>
      <!-- 6. 热门 -->
      <hot-sale></hot-sale>
       <!-- 7. 热门商品下拉刷新 -->
      <!-- <hot-food></hot-food> -->
      <hot-produce></hot-produce>
          <van-divider >我是有底线的</van-divider>
      <!-- 8.回到顶部 -->
       <v-top />
      </div>
  
      <!-- <router-view></router-view> -->
  </div>
</template>

<script>
//1.引入vuex模块
import { createNamespacedHelpers} from "vuex";
const { mapActions ,mapState,mapMutations } = createNamespacedHelpers("shop");

//2.自动化导入模块
const path = require('path')
const files = require.context('@/pages/home/components', true, /\.vue$/)
const modules = {}
files.keys().forEach(key => {
  const name = path.basename(key, '.vue')
  modules[name] = files(key).default || files(key)
})
export default {
    components:modules,
    data(){
        return {
          flag:true
        }
    },
    computed:{
        //获取轮播图、导航滚动图、限时抢购数据
         ...mapState(['homecarousel','homenav','homeflash']),
    },
    created(){
         this.$store.dispatch('shop/reqHomeCarousel') //首页轮播图
         this.$store.dispatch('shop/reqHomeNav') //首页导航
         this.$store.dispatch('shop/reqHomeFlash') //首页导航
    },
    methods:{
        // ...mapActions(['reqHomeCarousel']),
        // 数据初始化
        initData(){
            //  this.reqHomeCarousel().then
        }
    },
   
}
</script>

<style lang='scss'>
#home {
  background-color: "#f5f5f5";
  padding-bottom:3rem;
}
.van-divider {
  background-color: #f5f5f5;
  margin: 0;
}
</style>
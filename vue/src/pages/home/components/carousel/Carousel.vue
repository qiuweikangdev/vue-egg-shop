<!--
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-16 17:34:14
 * @LastEditors  : qqqiu
 * @LastEditTime : 2020-01-02 12:54:52
 -->

<!--
 * @Descripttion: 轮播图
 -->
<template>
  <div id='carousel'>
         <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="( banner ,index) in homecarousel" :key="index" >
                    <img v-lazy="banner.imgUrl" width="100%" class="carousel-img"/>
                </van-swipe-item>
            </van-swipe>
        </div>  
  </div>
</template>

<script>
export default {
    props:{
        // 接受父组件传过来的数据
        homecarousel:Array
    },
}
</script>

<style scoped lang='scss'>
#carousel{
    padding:3rem 1rem 1rem;
    background-image: url('~@/assets/images/flash/backImage.png');
    .swiper-area{
       
    }
    .van-swipe{
         border-radius:30px 10px 30px 10px;
    }
    .carousel-img{
        height: 140px;
    }
}
</style>
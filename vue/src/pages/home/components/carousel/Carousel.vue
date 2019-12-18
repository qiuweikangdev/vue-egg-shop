
<!--
 * @Descripttion: 轮播图
 -->
<template>
  <div id='carousel'>
         <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="( banner ,index) in homecarousel" :key="index" >
                    <img v-lazy="banner.imgUrl" width="100%" height="140px"/>
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
    padding:1rem;
    background-image: url('~@/assets/images/flash/backImage.png');
    .swiper-area{
       
    }
    .van-swipe{
         border-radius:30px 10px 30px 10px;
    }
}
</style>
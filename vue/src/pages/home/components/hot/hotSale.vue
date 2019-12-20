<!--
 * @Descripttion: 火爆商品
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-11-27 15:14:39
 -->
<template>
  <div id='hot-main'>
    <div class="hot-content">
          <div class="title">火爆商品</div>
        <!-- 抢购图片.. -->
        <div class="hot-icon"><img :src="hotSaleIcon" alt=""></div>
       </div> 
  </div>
</template>

<script>
export default {
  data(){
    return {
       // 倒计时时间设置 单位毫秒
        hotSaleIcon:require('@/assets/images/hot/hot.png')
    }
  },
  props:{
    hotFood:Array
  }
}
</script>

<style lang='scss' scoped>
#hot-main{
  padding: 0 0 0 0.5rem;
  background: #F6F6F6;
  // transform: scaleY(0.7);
}
.hot-content{
  display: flex;
  align-items: center;
  // transform: scaleY(0.7);
}

.title {
  display: inline-block;
  // border-left: 5px #E5017D solid;
  padding: 0 1rem;
  // height: 1.5rem;
  vertical-align: middle;
  font-size: 1rem;
  position: relative;
  //  transform: scaleY(1.3);
}
.title::before{
  content:'';
  display: block;
  position: absolute;
  top:2px;
  left:0px;
  right:0;
   width: 0px;
  height: 0px;
  border-top: 10px solid transparent;
  border-left: 10px solid #D4237A;
  /*  border-bottom 也可以不设置，因为朝下的箭头是依赖上边框和左边框和右边框的一部分，不包括下边框 */
  /* 颜色可以设置与底部相同的颜色，也可以设置为透明色 */
  /* transparent表示透明 */
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
}
.hot-icon{
  width: 50%;
  height:80px;
  position: relative;
  left:30px;
  img{
    width:100%;
    height:80px;
  }
}
</style>
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-03 09:48:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-08 23:15:46
 -->
<template>
  <div>
      order
       <!-- 路由出口 (子路由) -->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  margin-bottom: 5rem;
  .wrapper {
    height: 4rem;
    width: 100%;
    position: relative;
    .productImageWrapper {
      display: flex;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: start;
      height: 4rem;
      width: 80%;
      overflow: hidden;
      .imageWrapper {
        flex-wrap: nowrap;
        img {
          height: 3rem;
          width: 3rem;
        }
      }
    }
    .productCount {
      right: 0.1rem;
      top: 1.5rem;
      position: absolute;
      color: grey;
    }
  }

  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
}
</style>

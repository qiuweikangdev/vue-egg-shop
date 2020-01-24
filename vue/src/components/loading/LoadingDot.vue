<!--
 * @Descripttion: 加载动画
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-01-03 10:26:07
 * @LastEditors  : qqqiu
 * @LastEditTime : 2020-01-03 10:46:27
 -->
<template>
        <div 
        class="loading"
        :class="show?'active':''"
         >
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            </div>
</template>

<script>
    export default {
            props: ['show'] 
    }
</script>

<style lang="scss" scoped>
body {
  display: flex;
  // height: 100vh;
  justify-content: center;
  align-items: center;
  background: #222;
  align-items: center;
  height:100%;
}
//用来控制显示和隐藏的类
.loading.active{
    visibility: visible; //可以保留元素的原有位置
    opacity: 1;
    -webkit-opacity: 1;
    -o-opacity: 1;
    -ms-opacity: 1;
    -moz-opacity: 1;
    filter: alpha(opacity=100);
}
.loading {
  $colors: #7ef9ff, #89cff0, #4682b4, #0f52ba, #000080;
  display: flex;
  align-content: center;
  justify-content: center;
  animation-delay: 1s;
  position: absolute;
  left:50%;
  top: 50%;
  width:100%;
  margin-left:-50%;
 -webkit-opacity: 0;
  -o-opacity: 0;
  -ms-opacity: 0;
  -moz-opacity: 0;
  visibility: hidden;
  filter: alpha(opacity=0);
  .dot {
    position: relative;
    width:1em;
    height:1em;
    margin: 0.8em;
    border-radius: 50%;
    
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        background: nth($colors, $i);

        &::before {
          animation-delay: $i * 0.8s;
        }
      }
    }
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}

</style>
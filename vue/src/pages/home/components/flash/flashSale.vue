<!--
 * @Descripttion: 限时抢购
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-11-27 15:14:39
 -->
<template>
  <div id='flash-main'>
    <div class="count-down">
          <div class="title">限时抢购</div>
          <!-- vant的倒计时组件 -->
          <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="item">{{ timeData.hours }}</span>
            <span class="item">{{ timeData.minutes }}</span>
            <span class="item">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
        </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
       // 倒计时时间设置 单位毫秒
        time:60*60*24*1000  //倒计时一天
    }
  },
  props:{
    FlashFood:Array
  }
}
</script>

<style lang='scss' scoped>
#flash-main{
  padding: 0 1rem;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #000;
}
.count-down{
  display: flex;
  justify-content:start;
  align-items: center;
  //  padding-left:1rem;
}
.title {
  display: inline-block;
  border-left: 4px #E5017D solid;
  padding: 0 1rem;
  height: 1.5rem;
  vertical-align: middle;
  font-size: 1rem;
}
</style>
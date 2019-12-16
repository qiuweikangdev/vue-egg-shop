v-<template>
    <div class='countdown-main'>
        <!-- 剩余时间倒计时 -->
        <div>
            <p>剩余时间倒计时:</p>
             <span>{{time}}</span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      flag: false
    };
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 500);
  },
  props: {
    endTime: {
      type: String,
       // 设置定时器倒计时，时间必须大于当前时间
      default:'2019-11-16 19:00:00' 
    }
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime);
      const nowTime = new Date();
      //(结束时间 - 当前时间)ms / 1000  = 剩余时间的秒数
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      let d = parseInt(leftTime / (24 * 60 * 60));
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24)); //时  hour
      let m = this.formate(parseInt((leftTime / 60) % 60)); //分 minute
      let s = this.formate(parseInt(leftTime % 60)); //秒 second

      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end");
      }
      this.time = `${h}:${m}:${s}`; // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  }
};
</script>
 
<style scoped>
</style>

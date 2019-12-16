<template>
    <div>
      <button v-show="Verification" @click="handleClick">点击获取验证码</button>
      <button v-show="!Verification"><span>{{timer}}</span>秒后重新获取</button>
    </div>
</template>
 
<script>
    export default {
      data(){
        return{
          Verification:true,    //通过v-show控制显示获取还是倒计时
          timer:60      //定义初始时间为60s
        }
      },
      methods:{
        handleClick(){
          this.Verification = false;      //点击button改变v-show的状态
          let auth_timer = setInterval(()=>{  //定时器设置每秒递减
            this.timer--;        //递减时间
            if(this.timer<=0){  
              this.Verification = true;    //60s时间结束还原v-show状态并清除定时器
              clearInterval(auth_timer)
            }
          },1000)
        }
      }
    }
</script>
 
<style scoped lang='scss'>
button{
  padding: 10px 20px;
  border:1px solid #000
}
</style>
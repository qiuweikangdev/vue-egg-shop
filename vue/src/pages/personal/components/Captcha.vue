
<!--
 * @Descripttion: 验证码
 -->
<template>
  <div class='container'>
<van-cell-group>
  <van-field
    v-model="code"
    required
    clearable
    label="验证码"
    placeholder="请输入验证码"
    :error-message="authCodeErrorMsg"
    @input="handleInput"
  />
  </van-cell-group>
    <!-- <div><span class='captcha'></span></div>  -->
    <div>
         <img
              ref="captcha"
              class="get-verification"
              alt="captcha"
              @click.prevent="getCaptcha()"
                >
    </div>
 </div> 
</template>

<script>
import{createNamespacedHelpers} from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
      data(){
        return {
         code:'',  //验证码
          codeErrorMsg:'',  //验证码出现错误时信息
         }
      },
      props:{
        authCodeErrorMsg:{
           type:String
        },
        //触发验证码
        triggerCode:{
          type:Array,
        }
      },
      watch:{
        triggerCode(val){
          //发生变化时，就会触发验证码
          if(val){
              this.getCaptcha()
              this.code =''
          }
        },
      },
      mounted(){
          this.getCaptcha()
        this.showLogin = true;
      },
      methods:{
        ...mapActions(['captcha']),
         getCaptcha(){
            this.$refs.captcha.src = 'http://127.0.0.1:5000/captcha?time=' + new Date();
            this.$emit('getCaptcha',this.getCaptcha)
          // this.captcha().then(res=>{
            //     this.captchaUrl =res.data.captcha
            //     const captcha = document.querySelector('.captcha')
            //     captcha.innerHTML = this.captchaUrl
            //     captcha.addEventListener('click',this.getCaptcha)
                
            // }).catch(err=>{
            //     console.log(err)
            // })
        },
        handleInput(){
          //当输入框内容改变的时候，则触发事件把验证码传递出去
                 this.$emit('authCode',this.code)
        },
        }
}
</script>

<style scoped lang='scss'>
.container{
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  .captcha-inp input{
    width: 70%;
  }
  .captcha{
    display:block;
    text-align:center;
    line-height: 100%;
    padding-top:0.1rem;
  }
}
</style>
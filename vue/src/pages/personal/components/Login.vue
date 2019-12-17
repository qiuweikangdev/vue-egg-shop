<template>
<div class="wrapper">
    <div class='person-main'>
         <div class="person-content">
       <div class="person-top">
        <van-nav-bar
            left-text="返回"
            left-arrow
            right-text="用户登录"
            @click-left="goBack"
         />
          <div class='flag-perple'>
             <img :src="imgUrl" alt="" width="25%">
       </div>
        </div>
         <div class="person-panel">
            <van-field 
                v-model="userInfo.username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErrorMsg"
            />
            <van-field 
                v-model="userInfo.password"
                type="password"
                label="密码" 
                placeholder="请输入密码"
                required
                @keyup.enter.native='loginAction'
                :error-message="passwordErrorMsg"
               
            />
            <!-- 验证码组件 -->
            <Captcha 
            :authCodeErrorMsg='authCodeErrorMsg'
             @authCode='getAuthCode'  
             @keyup.enter.native='loginAction' 
             :triggerCode='triggerCode' >
              </Captcha>

               <div class='go-into' ><span @click="$router.push({name:'register'})">还没账号? 去注册</span></div> 
            <div class="person-button">
                <van-button  @click="loginAction" size="large" :loading="openLoading">登录</van-button>
            </div>

         </div>
           </div>
    </div>
   
</div>
</template>

<script>
    import { Toast } from 'vant'
  import { getToken,setToken } from '@/utils/auth'
   import { createNamespacedHelpers } from 'vuex'   //导入命名空间辅助函数
   const { mapActions } = createNamespacedHelpers('user')
   import Captcha from './Captcha'
   export default {
       components:{Captcha},
        data() {
            return {
                userInfo:{
                    username: '',
                    password: '',
                    authCode:'',  //验证码
                },
                triggerCode:[], //触发验证码
                openLoading:false, //是否开启用户注册的Loading状态
                usernameErrorMsg:'',  //当用户名出现错误时的提示信息
                passwordErrorMsg:'',  //当密码出现错误时的提示信息
                authCodeErrorMsg:'',  //验证码出现错误时的错误信息
                imgUrl:require('@/assets/images/flag.png')
            }
        },
       methods: {
           ...mapActions(['login','captcha','syncUserInfo']),
           goBack() {
               this.$router.go(-1)
           },
            loginAction(){
                this.checkForm() && this.loginUser()
            },
          loginUser(){
             this.openLoading=true;
            this.login(this.userInfo)
              .then( res=>{
               if(res.code === 200 && res.message === '登录成功'){
                      console.log('success')
                     Toast({
                        message: '登录成功',
                        duration: 800,
                        type:'success'
                    });
                    //登录成功，同步用户信息
                    this.syncUserInfo(res.userInfo)
                    this.$router.push({name:'home'})
                    return;
                }
                
                else if(res.message === '验证码错误'){
                    console.log('error',res)
                       this.openLoading=false;
                       this.userInfo.authCode='';
                       console.log(this.userInfo.authCode,'xxx')
                       this.triggerCode.push('true')  //触发请求验证码
                        Toast({
                        message: '验证码错误',
                        duration: 800,
                        type:'fail'
                    });
                          return;
                }
                else{
                     this.openLoading=false;
                     Toast.fail('用户名或密码错误')
                       Toast({
                        message: '用户名或密码错误',
                        duration: 800,
                         type:'fail'
                    });
                        return;
                }

             })
             .catch(error=>{
                 console.log(error)
             })
            
        },
           //获取验证码
        getAuthCode(code){
            this.userInfo.authCode = code
        },
           //表单验证方法
           checkForm(){
              let isOk = true
              if(this.userInfo.username.length<3){
                  this.usernameErrorMsg = "用户名不能少于3位"
                  isOk=false
              }else{
                  this.usernameErrorMsg = ''
              } 
              if(this.userInfo.password.length<6){
                  this.passwordErrorMsg = '密码不能少于6位'
                  isOk = false
              }else{
                  this.passwordErrorMsg = ''
              }
              if(!this.userInfo.authCode){
                    this.authCodeErrorMsg = '请输入验证码'
                    isOk = false
              }else{
                    this.authCodeErrorMsg = ''
              }
              return isOk
           } 

       }, 
    }
</script>

<style scoped lang='scss'>
$fonColor: #fff;
$bgColor: #e5017d;
.wrapper{
    height: 100%;
    background: rgb(221, 4, 123);
    background-image: url('~@/assets/images/999.png');
    background-repeat:no-repeat;
    background-size: 100% 100%;
}
.van-nav-bar{
      border-radius:10px;
}
.person-main{
     padding:4rem 1rem;
    .person-content{
        background: #fff;
        border-radius:10px;
    }
    .person-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
    }
    .person-button{
        padding-top:25px;
        padding-bottom: 5px;
    }
    .go-into{
        text-align: right;
    }
    .go-into span{
        font-size: 0.75rem;
        color:#555
    }
} 
.person-top{
    position: relative;
}
  .flag-perple{
        text-align: center;
        position: absolute;
        top:-3rem;
        z-index:999;
        img{
            border-radius:50%;
        }
    }   
</style>
<template>
  <div class="wrapper">
    <div class="person-main">
      <div class="person-content">
        <div class="person-top">
          <van-nav-bar
            left-text="返回"
            left-arrow
            right-text="用户注册"
            @click-left="goBack"
          />
          <div class="flag-perple">
            <img :src="imgUrl" alt="" width="25%" />
          </div>
          <div class="person-panel">
            <!-- 上传头像 -->
            <van-row type="flex" justify="center">
              <van-col class="upload-avatar">
                <van-uploader
                  v-model="fileList"
                  accept="image/jpeg ,image/png"
                  :before-read="beforRead"
                  :after-read="afterRead"
                  :max-count="1"
                  :max-size="1024 * 100"
                  deletable
                  @oversize="oversize"
                />
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <van-field
                  v-model="userInfo.username"
                  label="用户名"
                  icon="clear"
                  placeholder="请输入用户名"
                  required
                  @click-icon="username = ''"
                  :error-message="usernameErrorMsg"
                />
              </van-col>
              <van-col span="24">
                <van-field
                  v-model="userInfo.password"
                  type="password"
                  label="密码"
                  placeholder="请输入密码"
                  required
                  :error-message="passwordErrorMsg"
                  @keyup.enter.native="registerAction"
                />
              </van-col>
            </van-row>
            <!-- 验证码 -->
            <Captcha
              :authCodeErrorMsg="authCodeErrorMsg"
              @authCode="getAuthCode"
              @keyup.enter.native="registerAction"
            ></Captcha>
            <div class="go-into" @click="$router.push({ name: 'login' })">
              <span>已有账号? 去登录</span>
            </div>
            <div class="register-button">
              <van-button
                @click="registerAction"
                size="large"
                :loading="openLoading"
                >马上注册</van-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import url from '@/serviceAPI.config.js'
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("user");
import Captcha from "./captcha";
import { Toast } from "vant";
export default {
  components: { Captcha },
  data() {
    return {
      fileList: [], //上传头像
      file: Object,
      userInfo: {
        username: "",
        password: "",
        avatar: Object,
        fileName: "",
        authCode: "", //验证码
      },
      openLoading: false, //是否开启用户注册的Loading状态
      usernameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "", //当密码出现错误时的提示信息,
      authCodeErrorMsg: "", //验证码出现错误时的错误信息
      imgUrl: require("@/assets/images/flag.png"),
    };
  },
  methods: {
    ...mapActions(["register"]),
    goBack() {
      //    this.$router.go(-1)
      this.$router.push("/");
    },
    registerAction() {
      //表单验证 和 提交表单数据结果
      this.checkForm() && this.registerUser();
    },
    //上传到服务器
    afterRead(files) {
      this.file = files.file; //获取File对象
    },
    //判断文件类型
    beforRead(file) {
      // console.log(file.type)
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast.fail("只允许上传jpg/png格式的图片！");
        return false;
      }
      return true;
    },
    //文件超过大小
    oversize() {
      Toast.fail("图片太大了");
    },
    //压缩图片
    resizeMe(img, type, max_width, max_height) {
      var canvas = document.createElement("canvas");
      var width = img.width;
      var height = img.height;
      max_width = !isNaN(max_width) ? max_width : 0;
      max_height = !isNaN(max_height) ? max_height : 0;
      // 在这里图片是等比例缩放的，调用方法时填入图片允许的最大宽度或者是最大的高度
      //如果最大宽度为0 则按照最大高度固定，宽度自适应的方式来实现
      //如果是最大高度为0，则按照最大的宽度来实现
      if (max_width == 0) {
        if (height > max_height) {
          width = Math.round((width *= max_height / height));
          height = max_height;
        }
      }
      if (max_height == 0) {
        if (width > max_width) {
          height = Math.round((height *= max_width / width));
          width = max_width;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height); //绘制图片
      type = type === "jpg" ? "jpeg" : type;
      return canvas.toDataURL("image/" + type, 0.7); //这里的0.7值的是图片的质量
    },
    //处理头像
    dealAvatar() {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        var fileName = this.file.name; //文件名字
        var fileType = this.file.name.split(".")[1]; //文件类型
        reader.readAsArrayBuffer(this.file);
        reader.onload = (ev) => {
          var blob = new Blob([ev.target["result"]]);
          window["URL"] = window["URL"] || window["webkitURL"];
          var blobURL = window["URL"].createObjectURL(blob);
          var image = new Image();
          image.src = blobURL;
          image.onload = (e) => {
            var thumb = this.resizeMe(image, fileType, 400, 0); //获得的路径是将图片转换成了base64
            //   this.userInfo.avatar = thumb;
            //   this.userInfo.fileName = fileName;
            let obj = { thumb, fileName };
            resolve(obj);
          };
        };
      });
    },
    async registerUser() {
      this.openLoading = true;
      let obj = await this.dealAvatar();
      this.userInfo.avatar = obj.thumb;
      this.userInfo.fileName = obj.fileName;
      this.register(this.userInfo)
        .then((res) => {
          if (res.code === 200 && res.message === "注册成功") {
            Toast.success("注册成功");
            this.$router.push({ name: "login" });
            return;
          } else if (res.message === "验证码错误") {
            this.openLoading = false;
            this.userInfo.authCode = "";
            Toast({
              message: "验证码错误",
              duration: 800,
              type: "fail",
            });
            this.triggerCode.push("true"); //触发请求验证码
          } else {
            this.openLoading = false;
            Toast.fail("用户名已存在");
          }
        })
        .catch((err) => {
          console.log(err, "err");
          this.openLoading = false;
          Toast.fail("注册失败");
        });
    },
    //获取验证码
    getAuthCode(code) {
      this.userInfo.authCode = code;
    },
    //表单验证方法
    checkForm() {
      let isOk = true;
      if (this.userInfo.username.length < 3) {
        this.usernameErrorMsg = "用户名不能少于3位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.userInfo.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      if (!this.userInfo.authCode) {
        this.authCodeErrorMsg = "请输入验证码";
        isOk = false;
      }
      if (!this.fileList.length) {
        Toast.fail("请上传头像");
        isOk = false;
      }

      return isOk;
    },
  },
};
</script>

<style scoped lang="scss">
$fonColor: #fff;
$bgColor: #e5017d;
.wrapper {
  height: 100%;
  background-image: url("~@/assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.van-nav-bar {
  border-radius: 10px;
}
.person-main {
  //  padding:4rem 1rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  bottom: 0;
  margin-top: -230px;
  padding: 0.8rem 1rem;
  .person-content {
    background: #fff;
    border-radius: 10px;
  }
  /deep/ .van-cell {
    padding: 16px 24px;
  }
  /deep/ .van-field__control {
    font-size: 16px;
  }
  .person-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
  }
  .person-button {
    padding-top: 25px;
    padding-bottom: 5px;
  }
  .go-into {
    text-align: right;
  }
  .go-into span {
    font-size: 0.75rem;
    color: #555;
  }
  .upload-avatar {
    padding-top: 1.2rem;
  }
}
.person-top {
  position: relative;
}
.flag-perple {
  text-align: center;
  position: absolute;
  top: -3rem;
  left: 35%;
  z-index: 99;
  width: 30%;
  display: block;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>

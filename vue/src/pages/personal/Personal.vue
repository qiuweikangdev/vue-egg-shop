<template>
  <div class="personal-main">
    <van-nav-bar
      title="我的"
      :fixed="true"
      :border="false"
      style="height:2.5rem;background:#E5017D;"
    />

    <!-- 用户信息 头像和名字 -->

    <van-cell-group>
      <van-cell style="background:#E5017D">
        <!--登录状态-->
        <template slot="title">
          <van-row
            v-if="token"
            class="user-info"
            type="flex"
            justify="center"
            align="center"
          >
            <van-col span="8" class="avatar">
              <img
                :src="'data:image/jpeg;base64,' + userInfo.avatar"
                alt
                width="100%"
              />
            </van-col>
            <van-col span="16" class="username">
              <p>{{ userInfo.username }}</p>
            </van-col>
          </van-row>

          <!-- 未登录状态 -->
          <van-row
            v-else
            class="user-info"
            type="flex"
            justify="center"
            align="center"
          >
            <van-col span="8" class="avatar">
              <img :src="imgUrl" alt width="100%" />
            </van-col>
            <van-col span="16" class="username">
              <p @click="$router.push('/login')">立即登录</p>
            </van-col>
          </van-row>

          <!-- <div class="avatar"><img :src="userInfo.avatar" alt="" width="50%"></div>
          <div class="username"><p>{{userInfo.username}}</p></div>-->
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 订单相关 -->
    <van-cell-group>
      <van-cell
        title="我的订单"
        icon="label"
        value="查看全部订单"
        is-link
        @click="goToOrder(-1)"
      ></van-cell>
      <!-- Grid宫格 -->
      <van-grid :border="false">
        <van-grid-item
          v-for="(order, index) in orderData"
          :key="index"
          :icon="order.icon"
          :text="order.title"
          @click="goToOrder(index)"
        />
      </van-grid>
    </van-cell-group>

    <!-- 收获地址 -->
    <van-cell-group>
      <van-cell
        title="我的收获地址"
        icon="todo-list"
        is-link
        @click="goToMyAddredd"
      ></van-cell>
    </van-cell-group>

    <!-- 意见反馈 -->
    <van-cell-group>
      <van-cell
        title="意见反馈"
        icon="comment-circle"
        is-link
        @click="goToSuggest"
      ></van-cell>
    </van-cell-group>

    <!-- 联系客服 -->
    <van-cell-group>
      <van-cell
        title="联系客服"
        icon="phone"
        value="客服时间 07:00-22:00"
      ></van-cell>
    </van-cell-group>

    <!-- 分割线 -->
    <!-- <van-divider /> -->

    <!-- 切换主题 -->
    <!-- <set-color></set-color> -->

    <!-- 退出登录 -->
    <van-row class="exit" type="flex" justify="center" v-if="token">
      <van-col span="18">
        <van-button size="large" @click="handleLogout">退出登录</van-button>
      </van-col>
    </van-row>
    <!-- <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>-->
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import setColor from "./components/setColor";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("user");
import { Toast } from "vant";
export default {
  data() {
    return {
      imgUrl: require("@/assets/images/flag.png"), //未登录的头像标志
      token: getToken(),
      //  订单状态
      orderData: [
        { icon: "cart-circle-o", title: "待支付" },
        { icon: "gift-o", title: "待收货" },
        { icon: "smile-comment-o", title: "待评价" },
        { icon: "cash-back-record", title: "售后/退款" },
      ],
    };
  },
  components: {
    setColor,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    if (this.token) {
      this.INIT_USER_INFO(); //初始化用户信息,把localstorage中的本地数据保存在vuex
      this.getInfo(); //如果存在token,则获取用户信息
    }
  },
  methods: {
    ...mapActions(["logout", "getUserInfo"]),
    ...mapMutations(["INIT_USER_INFO"]),
    //跳转到登录界面
    login() {
      this.$router.push("/login");
    },
    //退出登录
    handleLogout() {
      this.logout();
      this.$router.go(0); //刷新当前页面
      // this.$router.push({ name: "login" });
    },
    getInfo() {
      // console.log(this.userInfo)
      // const { username , avatar } = this.userInfo
      // this.userInfo.avatar = "data:image/jpeg;base64," + avatar;
      // this.getUserInfo().then(res => {
      //    console.log(res)
      //   const { id, username, avatar } = res.userInfo;
      //   this.userInfo = {
      //     id,
      //     username,
      //     avatar
      //   };
      //   //后端返回的是base64,因为是二进制流，因此会缺少base64的前缀，需要手动添加
      //   this.userInfo.avatar = "data:image/jpeg;base64," + avatar;
      //   console.log(this.userInfo);
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
    },
    //订单
    goToOrder(index) {
      if (index == 3) {
        Toast({
          message: "尚未开通!",
          duration: 800,
        });
      } else {
        this.$router.push({ name: "myOrder", params: { active: index + 1 } });
      }
    },
    //收获地址
    goToMyAddredd() {
      this.$router.push({ name: "myAddress" });
    },
    //意见反馈
    goToSuggest() {
      Toast({
        message: "尚未开通!",
        duration: 800,
      });
      // this.$router.push({ name: "suggest" });
    },
  },
};
</script>

<style scoped lang="scss">
$fonColor: #fff;
$bgColor: #e5017d;
.personal-main {
  height: 100%;
  .van-nav-bar__title {
    color: $fonColor;
  }
  .user-info {
    color: $fonColor;
    font-size: 1.2rem;
    margin-top: 2rem;
    .avatar {
      img {
        border-radius: 50%;
      }
    }
    .username {
      padding-left: 1rem;
    }
  }
  .van-button {
    box-shadow: 0 0 0.9rem rgba(211, 210, 210, 0.1) inset;
  }
  .van-cell__left-icon {
    color: $bgColor;
    font-size: 1.2rem;
  }
  //退出登录
  .exit {
    margin-top: 1rem;
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }

  .router-slider-enter,
  .router-slider-leave-to {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
}
</style>

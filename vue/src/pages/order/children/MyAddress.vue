<!--
 * @Descripttion: 我的收货地址
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-03 09:47:49
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-15 11:34:41
 -->
<template>
  <div id="myAddress">
    <!-- 导航栏  -->
    <van-nav-bar title="我的地址" left-arrow :fixed="true" :border="true" @click-left="onClickLeft"></van-nav-bar>

    <!--没有地址数据的占位图  -->
    <div class="noDataPlaceHold" v-show="shippingAddress.length<1">
      <img src="@/assets/images/order/noAddress.png" alt />
      <span class="desc">还没有添加过地址呢,添加一个吧😄</span>
    </div>

    <!-- 地址列表 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="shippingAddress"
      @add="onAdd"
      @edit="onEdit"
      @select="onBackAddress"
      style="margin-top: 3rem"
      add-button-text="+ 增加新地址"
    ></van-address-list>

    <!-- 子路由 (添加地址/编辑地址) -->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("user");
// 引入发布订阅
import { CHOOSE_USER_ADDRESS } from "@/config/pubsub-type.js";
export default {
  data() {
    return {
      chosenAddressId: 0 //当前选中地址的 id
    };
  },
  computed: {
    ...mapState(["shippingAddress"]) //收货地址列表
  },
  created() {
    this.INIT_USER_SHIPPING_ADDRESS(); //初始化收货地址信息
  },
  methods: {
    //1.用户地址
    ...mapMutations(["INIT_USER_SHIPPING_ADDRESS"]),
    // 2.返回到上个界面
    onClickLeft() {
      this.$router.back();
    },
    //3 添加地址
    onAdd() {
      this.$router.push({ path: "/order/myAddress/addAddress" });
    },
    //4.编辑地址
    onEdit(item) {
      this.$router.push({ name: "editAddress", params: { content: item } });
    },
    onBackAddress(item) {
      this.$router.replace({ name: "order", params: item });
    }
    //5. 切换选中的地址时触发
    //  onBackAddress (item, index) {
    //     // 发布通知到订单界面修改值
    //     PubSub.publish(CHOOSE_USER_ADDRESS, item);
    //     // 返回到上一个界面
    //     // this.$router.back();
    //   }
  }
};
</script>

<style scoped lang='scss'>
#myAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 40%;
      height: 20%;
    }
    .desc {
      color: grey;
      font-size: 0.6rem;
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
  .van-address-list__add {
    bottom: 1rem;
  }
  .van-button--large {
    left: 15%;
    width: 70%;
    border-radius: 2rem;
    background-color: #e5017d;
    border: none;
  }
}
</style>
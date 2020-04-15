<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-03 09:48:02
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-15 13:52:13
 -->
<template>
  <div id="order">
    <van-nav-bar title="填写订单" left-arrow :fixed="true" @click-left="onClickLeft" />
    <!-- 选择收货地址 -->
    <van-contact-card
      :type="address_type"
      add-text="选择收货地址"
      :name="address_name"
      :tel="address_phone"
      @click="chooseAddress"
      style="margin-top:3rem"
    />
    <!-- 商品缩略图 -->
    <div class="wrapper" @click="goToGoodsList">
      <div class="productImageWrapper" ref="productImageWrapper">
        <ul class="imageWrapper" ref="imageWrapper">
          <li
            ref="subWrapper"
            style="display:inline"
            v-for="(item,index) in goodsData"
            :key="index"
          >
            <img :src="item.product_image" alt />
          </li>
        </ul>
      </div>
      <ul class="productCount">
        <span>共{{selectedCountAll}}件</span>
        <van-icon name="arrow" />
      </ul>
    </div>
    <!-- 商品金额 -->
    <van-cell-group>
      <van-cell title="商品金额">
        <div class="money">{{(selectGoodsPriceAll ) | moneyFormat }}</div>
      </van-cell>
      <van-cell title="配送费">
        <div class="money">{{shipping_fee.toFixed(2)}}</div>
      </van-cell>
    </van-cell-group>
    <!-- 提交订单 -->
    <van-submit-bar
      :price="paymentAmount"
      label="实付"
      button-text="
                    提交订单"
      @submit="onSubmit"
    />
    <!-- 路由出口 (子路由) -->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast, Dialog } from "vant";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      goodsInfo: [],
      address_type: "add", //地址卡片类型
      address_name: null, // 收货人
      address_phone: null, // 收货人电话
      address_id: null, // 收货人地址ID
      deliveryTime: "请选择送达时间",
      showDateTimePopView: false,
      shipping_fee: 3.0 //配送费
    };
  },
  computed: {
    ...mapGetters({
      goods: "selectGoods",
      token: "token",
      selectGoodsPrice: "selectGoodsPrice",
      selectedCount: "selectedCount"
    }),
    goodsData() {
      return this.goodsInfo[0].product_image ? this.goodsInfo : this.goods;
    },
    selectedCountAll() {
      return this.goodsInfo ? "1" : this.selectGoodsPrice;
    },
    selectGoodsPriceAll() {
      return this.goodsInfo[0].present_price
        ? this.goodsInfo[0].present_price
        : this.selectGoodsPrice / 100;
    },
    paymentAmount() {
      return (
        parseInt(this.selectGoodsPrice) + parseInt(this.shipping_fee) * 100
      );
    }
  },
  mounted() {
    if (this.goods.length > 0) {
      this.$nextTick(() => {
        this._initScroll();
      });
    }
  },
  created() {
    if (this.$route.params) {
      this.goodsInfo = [this.$route.params];
    }
  },
  updated() {
    if (Object.values(this.$route.params).length > 0) {
      this.getAddress();
    }
  },
  beforeDestroy() {
    this.goodsInfo = [];
  },
  methods: {
    ...mapMutations({
      INIT_SHOP_CART: "user/INIT_SHOP_CART",
      unpaid: "user/ORDER_UNPAID"
    }),
    ...mapActions({ generateOrder: "user/generateOrder" }),
    onClickLeft() {
      this.$router.back();
    },
    // 提交订单
    onSubmit() {
      if (!this.address_name) {
        Toast({
          message: "请选择收货地址",
          duration: 800
        });
      } else {
        //提交订单
        let orderInfo = {
          addressId: this.$route.params.id,
          selectGoodsPrice: this.selectGoodsPrice,
          shipping_fee: this.shipping_fee,
          goods: this.goods,
          payment_amount: this.paymentAmount,
          order_status: 0
        };
        Dialog.confirm({
          title: "温馨提示",
          message: "确定付款吗?"
        })
          .then(() => {
            // on confirm 确认删除
            orderInfo.order_status = 1;
            this.generateOrder(orderInfo);
          })
          .catch(() => {
            // on cancel
            //待付款
            orderInfo.order_status = 0;
            this.generateOrder(orderInfo);
          });
      }
    },
    // 选择地址
    chooseAddress() {
      this.$router.push("/order/myAddress");
    },
    //商品清单
    goToGoodsList() {
      this.$router.push({ name: "orderGoodsList" });
    },
    //初始化滚动商品视图
    _initScroll() {
      if (!this.productImageScroll) {
        this.$refs.imageWrapper.style.width =
          this.$refs.subWrapper.length * 60 + "px";
        this.productImageScroll = new BScroll(this.$refs.productImageWrapper, {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true
        });
      } else {
        this.productImageScroll.refresh();
      }
    },
    //获取地址信息
    getAddress() {
      console.log(this.$route.params, "xxxxx");
      this.address_type = "edit";
      this.address_name = this.$route.params.name; // 收货人
      this.address_phone = this.$route.params.tel; // 收货人电话
      this.address_id = this.$route.params.id; // 收货人地址ID
    }
  }
};
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
    background: #fff;
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

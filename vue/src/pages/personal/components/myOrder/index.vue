<!--
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-16 19:47:53
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-18 23:16:00
 -->
<template>
  <div id="myOrder">
    <van-nav-bar title="我的订单"
                 :border=false
                 :fixed="true"
                 @click-left="onClickLeft"
                 left-arrow
                 style="height:2.5rem" />
    <van-tabs v-model="active"
              animated
              swipeable
              sticky
              :border="false"
              :offset-top="47"
              ref="tabs"
              type="line"
              color="#28BE57"
              title-active-color="#28BE57"
              animated:yes>
      <!-- 全部 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[0]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
      <!-- 待支付 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[1]}}</span>
        </div>
        <OrderType :orderTypeDataArray="unpaid" />
      </van-tab>
      <!-- 待收货 -->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[2]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
      <!-- 待评价-->
      <van-tab>
        <div slot="title">
          <span>{{itemsTitle[3]}}</span>
        </div>
        <OrderType :orderTypeDataArray="typeArray" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script >
import OrderType from './components/orderType'
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("user");
export default {
  data () {
    return {
      typeArray: [],
      // 路由传递过来的数据 active
      active: this.$route.params.active,
      itemsTitle: ['全部', '待支付', '待收货', '待评价'],
    }
  },
  computed:{
     ...mapState({unpaid:state=>state.unpaid}),

  },
  components: {
    OrderType
  },
  mounted(){
    this.getOrderInfo()
  },
  updated(){
      console.log(this.unpaid,'unpaid')
  },
  methods: {
    ...mapActions(['getOrderInfo']),
    onClickLeft () {
      this.$router.back();
    }
  }
}
</script>

<style lang="scss" scoped>
#myOrder {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #f5f5f5;
  .van-icon {
    color: #dedede;
  }
  
}
</style>

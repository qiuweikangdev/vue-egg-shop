<!--
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-16 19:47:53
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-19 22:02:38
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
              @click='handleTabs(active)'
              animated:yes>
      <!-- 全部 -->
        <van-tab 
          v-for ='(item,index) in itemsTitle'
          :key='index'
        >
        <div slot="title">
          <span>{{item}}</span>
        </div>
           <div class='order-type'> <OrderType :orderTypeDataArray="orderStatusInfo" :orderActive='active' /></div>
           <!-- 猜你会喜欢 -->
            <van-divider :style="{ color: 'black', borderColor: 'grey' }">
               猜你喜欢
         </van-divider>
        <hot-produce></hot-produce>
        </van-tab>
    </van-tabs>
  </div>
</template>
<script >
import OrderType from './components/orderType'
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("user");
import HotProduce from '@/pages/home/components/hot/hotProduce.vue'
export default {
  data () {
    return {
      typeArray:[],
      // 路由传递过来的数据 active
      active: this.$route.params.active || 0,
      itemsTitle: ['全部', '待支付', '待收货', '待评价'],
    }
  },
  computed:{
     ...mapState({orderStatusInfo:state=>state.orderStatusInfo}),
  },
  components: {
    OrderType,HotProduce
  },
   created(){
     //获取订单信息
     this.handleTabs()
  },
  watch:{
    '$route'(to){
         this.handleTabs(to.params.active)
         this.active = to.params.active
    }
  },
  methods: {
    ...mapActions(['getOrderInfo']),
    onClickLeft () {
      this.$router.back();
    },
    handleTabs(index = this.active){
      let num = index || [0,1]
      let order_status  //0待支付, 1已支付, [0,1]表示查询全部
      switch(this.itemsTitle[num]){
          case '待支付' :
             order_status = 0;
            break;
          case '待收货':
             order_status = 1;
            break;
          case '待评价':
             order_status = 1;
            break;  
          default:
            order_status=[0,1]
            break;
      }
        this.getOrderInfo(order_status)
    }
  }
}
</script>

<style lang="scss" scoped>
#myOrder {
  height:100%;
  .van-icon {
    color: #dedede;
  }
  .order-type{
     background: #F6F6F6;
  }
  
}
</style>

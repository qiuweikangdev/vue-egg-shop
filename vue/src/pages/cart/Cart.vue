<!--
 * @Descripttion: 购物车模块
 * @Author: qqqiu
 * @Date: 2019-12-16 15:09:17
 -->
<template>
  <div id="cart">
    <!-- 导航栏-->
    <van-nav-bar
      title="购物车"
      left-arrow
      @click-left="onClickLeft"
      @click-right="clearGoods"
    > 
      <span slot="right" v-show='isShowEmptyCart' :style="selectedGoodNum ==0?{color:'#ccc'}:{color:'#D4237A'}">删除</span>
    </van-nav-bar>

    <div class="cart-wrapper">
      <!--购物车没有商品时  -->
      <div class="empty-cart" v-show="!isShowEmptyCart">
        <img :src="emptyCartIcon" alt />
        <p class="empty-title">购物车空空如也~</p>
        <router-link to="/">
          <p class="go-shopping">去逛逛</p>
        </router-link>
      </div>

      <!--购物车有商品时  -->
      <div class="cart-content" v-show="isShowEmptyCart">
        <ul class="cart-content-wrapper" v-for="(goods,index) in shopCart" :key="index">
          <li class="cart-content-list">
            <div class="goods-checkbox">
              <!-- <input type="checkbox"> -->
              <van-checkbox
                v-model="goods.checked"
                checked-color="#D4237A"
                @click="oneSelect(goods.product_id)"
              ></van-checkbox>
            </div>
            <div class="center">
              <img :src="goods.product_image" />
            </div>
            <div class="right">
              <p class="top-content">{{goods.product_name}}</p>
              <div class="bottom-content">
                <p class="goodsPrice">{{goods.price | moneyFormat}}</p>
                <div class="goodsDeal">
                  <span @click="reduceGoodsData(goods.product_id,goods.product_amount)">-</span>
                  <input type="number"  disabled v-model.number="goods.product_amount" />
                  <!-- <span
                    @click="addGoods(goods.id,goods.name,
                    goods.smallImage,goods.price)"
                  >+</span> -->
                   <span
                    @click="addGoodsData(goods.product_id,goods.product_amount)"
                  >+</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- 提交订单 -->
        <van-submit-bar
          :price="totalPrice"
          :button-text="submitBarText"
          @submit="onSubmit"
          :disabled="!(selectedGoodNum>0)"
          v-show="isShowEmptyCart"
        >
          <van-checkbox v-model="isCheckedAll" checked-color="#D4237A">全选</van-checkbox>
        </van-submit-bar> 
         <!-- 猜你喜欢 -->
      <van-divider :style="{ color: 'black', borderColor: 'grey' }">
        猜你喜欢
      </van-divider>
      <hot-produce></hot-produce>
      </div>
        
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("user");
import { Dialog, Toast } from 'vant'; //引入提示框、会话框
import HotProduce from '@/pages/home/components/hot/hotProduce.vue'
export default {
  components:{
    HotProduce
  },
  data() {
    return {
      emptyCartIcon: require("@/assets/images/cart/empty.png"), //购物车为空的显示的图片
    };
  },
  computed: {
    //1.vuex中的用户商品数据
    ...mapState(["shopCart", "userInfo",'token']),
    //2.价格总价
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    //2.是否显示空购物车样式
    isShowEmptyCart() {
      let isshow = false;
      if (this.goodsCount > 0) {
        isshow = true;
      }
      return isshow;
    },
    //2.提交订单文本
    submitBarText() {
      const count = this.selectedGoodNum;
      return "结算" + (count ? `(${count})` : "");
    },
    //3.选中商品数量
    selectedGoodNum() {
      let num = 0;
      // Object.values(this.shopCart).forEach(goods => {
      //   if (goods.checked) {
      //     num++;
      //   }
      // });
      this.shopCart.forEach(goods => {
          if (goods.checked) {
            num++;
          }
        });
      return num;
    },
    //4.商品数量
    goodsCount() {
      return this.shopCart.length;
    },
    //5 是否全部选中
    isCheckedAll: {
      //由于我们给商品添加了checked属性，商品存储在vuex中,要修改state的值,需要通过mutations
      get() {
        let flag = true;  
        // Object.values(this.shopCart).forEach(goods => {
        //   //如果商品有一个没有选中，则返回false
        //   if (!goods.checked) {
        //      flag = false;
        //   }
        // });
        this.shopCart.forEach(goods => {
          //如果商品有一个没有选中，则返回false
          if (!goods.checked) {
             flag = false;
          }
        });
        return flag;
      },
      set(isCheckedAll) {
           // 取消全选返回false,全选返回ture
        this.ALL_SELECT_GOODS({ isCheckedAll });
      }
    },
    //6.计算shopCart中一共选中商品的数量
    selectedGoodsCount() {
      let selectedGoodsCount = 0;
      // Object.values(this.shopCart).forEach(goods => {
      //   if (goods.checked) {
      //     selectedGoodsCount++;
      //   }
      // });
    this.shopCart.forEach(goods => {
        if (goods.checked) {
          selectedGoodsCount++;
        }
      });
      return selectedGoodsCount;
    }
  },
  methods: {
    // mutaions方法
    ...mapMutations([
      "ADD_GOODS",
      "REDUCE_GOODS",
      "INIT_SHOP_CART",
      "SINGLE_SELECT_GOODS",
      "DELETE_SELECT_GOODS",
      "ALL_SELECT_GOODS"
    ]),
    ...mapActions(['getShopCartData','addGoods','reduceGoods']),
    onClickLeft() {
      // 4。 返回上一个界面
      this.$router.back();
    },
    //5、删除选中商品
    clearGoods() {
      if(this.selectedGoodNum >0){
        Dialog.confirm({
        title: '温馨提示',
        message: '确定删除选中商品吗?'
          }).then(() => {
            // on confirm 确认删除
            this.DELETE_SELECT_GOODS();
          }).catch(() => {
            // on cancel
          });
        }
      
    },
    onSubmit() {
      // 6.结算
      if (this.selectedGoodNum > 0) {
        // 跳转到订单界面
        this.$router.push('/order');
      } else {
        Toast({
          message: '请选择需要结算的商品',
          duration: 1000
        });
      }
    },
    //7、单个选中商品复选框事件
    oneSelect(goodsID) {
      this.SINGLE_SELECT_GOODS({ goodsID });
    },
      //8、减少商品
  reduceGoodsData(product_id, product_amount){
    if(product_amount > 1){
        this.reduceGoods({
          product_id,
          product_amount
        });
    }else if(product_amount === 1){
        Dialog.confirm({
          title: '温馨提示',
          message: '确定删除选中商品吗?'
        }).then(() => {
          // on confirm 确认删除
            this.reduceGoods({
              product_id,
              product_amount
          });
        }).catch(() => {
          // on cancel
        });
    }
  },
 
  //9、添加商品
  addGoodsData(product_id,product_amount){
      this.addGoods({product_id,product_amount})
  }
  }

  
};
</script>

<style lang="scss" scoped>
#cart {
  // background-color: #F5F5F5;
  height: 100%;
  padding-bottom: 3rem;
  .title-wrapper {
    padding: 0.5rem 1rem;
    .cart-title {
      font-size: 1.2rem;
    }
    .cart-manage {
      float: right;
    }
  }
  .cart-wrapper {
    // 购物车为空的样式
    .empty-cart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      img {
        width: 50%;
        height: 8rem;
        margin: 0 auto;
      }
      .go-shopping {
        background-color: #d4237a;
        color: #fff;
        width: 30%;
        margin: 0 auto;
        border-radius: 1rem;
        padding: 0.5rem 0;
      }
    }
    .cart-content{
        position: relative;
    }
    //购物车有商品样式
    .cart-content-wrapper {
      padding: 0.5rem 0rem;
      position: relative;
      .cart-content-list {
        display: flex;
        // justify-content: center;
        align-items: center;
        border-bottom: 1rem solid #f5f5f5;
        padding: 0.5rem 0.5rem;
        .goods-checkbox {
          input {
            display: block;
            border-radius: 1rem;
          }
        }
        .center {
          width: 30%;
          margin:0 1rem;
          // width:8rem;
          // height:14rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          width: 50%;
          padding: 0 1rem;
        }
      }
   

    }

    .bottom-content {
      display: flex;
      justify-content: space-around;
    }
    //商品处理 (增加/减少)
    .goodsDeal {
      display: flex;
      align-items: center;
      .goodsPrice {
        float: right;
      }
      input {
        float: left;
        width: 2rem;
        height: 1.2rem;
        text-align: center;
        margin: 0 0.2rem;
        font-size: 0.8rem;
        background-color: #f5f5f5;
        border: 0;
      }
    }
   //提交订单样式
   .van-submit-bar{
       bottom:50px;
      /deep/ .van-checkbox__icon{
           margin-left: 10px;
       }
   }
  }
}
</style>
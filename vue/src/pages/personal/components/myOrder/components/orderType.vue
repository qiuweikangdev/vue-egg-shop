<!--
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-03-16 20:38:35
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-06 09:42:35
 -->
<template>
  <div id="orderType">
    <div v-if="orderTypeDataArray.length>0 && orderActive !==3" class='order-wrapper'>
      <div class='wrapper'>
        <ul v-for='(arr,index) in orderTypeDataArray' :key='index' class='wrapperItem'>
           <li v-for='(product,i) in arr' :key="i">
               <span class='image'><img :src="product.product_image" alt=""></span> 
                <span class='name'>{{product.product_name}}</span>
                 <span class='product_price'>
                   {{product.product_price | moneyFormat}}
                <span class="product_amount">{{product.product_amount | amountFormat}}</span>
               </span>
           </li>
             <!-- 按钮 -->
              <div class='footer_btn' >
                <van-button round color="#7232dd" plain @click='handleBtn1'>
                {{!arr[0]["order_status"]?'修改地址':orderActive===2 ||arr[0]["order_status"]?'延长收货':'查看物流'}}
                </van-button>
                <van-button round color="#7232dd" plain @click='handleBtn2'>
                {{!arr[0]["order_status"]?'取消订单':orderActive===2 ||arr[0]["order_status"]?'查看物流':'卖了换钱'}}
                </van-button>
                <van-button round color="#7232dd" plain  @click='handleBtn3'>
                {{!arr[0]["order_status"]?'付款':orderActive===2 ||arr[0]["order_status"]?'确认收货':'评价'}}
                </van-button>
         </div>
        </ul>
      </div>
    </div>
    <div v-else
         class="noDataPlaceHold">
      <!-- <img src="@/assets/images/personal/noData.jpeg" alt=""> -->
      <div class='icon-order'>
        <svg-icon iconClass='order' style="width:2.3rem;height:2.3rem"></svg-icon>
      </div>
      <span class="desc" >暂时还没有相关订单</span>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Dialog, Toast } from 'vant'; //引入提示框、会话框
export default {
  props: {
    orderTypeDataArray: Array,
    orderActive:Number
  },
  methods:{
    handleBtn1(e){
       switch(e.toElement.innerText){
        case '延长收货':
          // this.handleDialog('确定要延长收货吗?')
           Toast({
            message: '尚未开通',
              icon: 'warning-o'
          });
          break;
         case '修改地址':
          Toast({
            message: '尚未开通',
              icon: 'warning-o'
          });
          break;
      }
    },
    handleBtn2(e){
        switch(e.toElement.innerText){
        case '查看物流':
          Toast({
                message: '尚未开通',
                icon: 'warning-o'
              });
          break;
         case '取消订单':
            Toast({
                message: '尚未开通',
                icon: 'warning-o'
              });
          break;
         case '评价':
          this.handleDialog('确定要评价吗?')
          break;
      }
    },
    handleBtn3(e){
      switch(e.toElement.innerText){
        case '付款':
          this.handleDialog('确定要付款吗?')
          break;
         case '确认收货':
          this.handleDialog('确认收货吗?')
          break;
         case '评价':
          Toast({
                  message: '尚未开通',
                  icon: 'warning-o'
                })
          break;
      }
    },
      handleDialog(message){
          Dialog.confirm({
        title: '温馨提示',
        message: message
          }).then(() => {
            // on confirm 
          }).catch(() => {
            // on cancel
          });
    },
  }
  
}
</script>

<style lang="scss" scoped>
#orderType {
    height:100%;
    padding:3rem 0.5rem 0;
  .order-wrapper{
    height:100%;
  }
  .wrapper{
    display: flex;
    justify-content:center;
    align-items: center;
    flex-wrap: wrap;
    height:100%;
    .wrapperItem{
       margin-bottom:0.5rem;
       background: #fff;
       padding:0 30px;
       border-radius: 20px;
    }
    li >span{
      padding:5px;
      display:inline-block;
      height:100%;
    }
    .name{
      width:40%;
    }
    .image{
      padding:10px;
    }
    .product_price{
          position: relative;
          left:20px;
         .product_amount{
          color:#666;
          font-size: 0.8rem;
          position: absolute;
          top:25px;
          right:5px;
          bottom:0;
        }
    }
    img{
       width: 4rem;
       height:4rem;
      border-radius:50%;
    }
    .footer_btn{
      display: flex;
      justify-content: center;
      padding:1rem;
     /deep/ .van-button{
         flex: 0 0 35%;
        margin-left:5px;
        border-color:#D4237A !important;
        color:#D4237A !important;
        white-space: nowrap;
      }
    }
  }

  //没有数据
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon-order{
      padding:2rem 0;
    }
    img {
      width: 60%;
      height: 60%;
    }
    .desc {
      color: grey;
      font-size: 0.6rem;
      padding-bottom: 0.5rem;
    }
  }
  .noData {
    margin-top: 3rem;
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
</style>

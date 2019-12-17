<!--
 * @Descripttion: 购物车模块
 * @Author: qqqiu
 * @Date: 2019-12-16 15:09:17
 -->
<template>
    <div id='cart'>
        <!-- 导航栏-->
   <van-nav-bar
        title="购物车"
        left-arrow
        right-text="删除"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
    
     <div class="cart-wrapper">
             <!--购物车没有商品时  -->
             <div class="empty-cart" v-show='!isShowEmptyCart'>
                 <img :src="emptyCartIcon" alt="">
                 <p class='empty-title'>购物车空空如也~</p>
                 <router-link to='/'><p class='go-shopping'>去逛逛</p></router-link>
             </div>

          <!--购物车有商品时  -->
             <div class="cart-content" v-show="isShowEmptyCart">
                 <!-- <div class="cart-content-list"
                    v-for='(goods,index) in shopCart'
                    :key="index"
                 >
                        
                 </div> -->
                <ul 
                 class="cart-content-list" 
                   v-for='(goods,index) in shopCart'   
                  :key="index"
                 >
                <li>
                    <input type="radio">
                </li>
                </ul>

                <!-- 提交订单 -->
                <van-submit-bar
                        :price="3050"
                        button-text="提交订单"
                        @submit="onSubmit"
                        >
                        <van-checkbox v-model="checked">全选</van-checkbox>
                        <!-- <span slot="tip">
                            你的收货地址不支持同城送, <span>修改地址</span>
                        </span> -->
                        </van-submit-bar>
             </div>
     </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        data(){
            return {
                emptyCartIcon:require('@/assets/images/cart/empty.png'), //购物车为空的显示的图片
                checked:'',
            }
        },
        computed:{
            //1.vuex中的用户商品数据
            ...mapState(['shopCart', 'userInfo']),
            //2.是否显示空购物车样式
            isShowEmptyCart(){
                  let isshow = false;
                   if (this.totalCount > 0) {
                    isshow = true;
                } 
                return isshow
            
            },
          //3.计算shopCart的数量
          totalCount(){

          }
        },
          methods:{
            onClickLeft(){
                // 4。 返回上一个界面
                this.$router.back()
            },
            onClickRight(){
                //5. 删除操作
                    console.log('xxx')
            },
            onSubmit(){
                // 6.提交订单

            },
        },
    }
</script>

<style lang="scss" scoped>
#cart{
    background-color: #F5F5F5;
    height:100%;
    .title-wrapper{
        padding:0.5rem 1rem;
        .cart-title{
            font-size:1.2rem;
        }
        .cart-manage{
            float:right;
        }
    }
    .cart-wrapper{
        // 购物车为空的样式
        .empty-cart{
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
             img{
             padding-top: 2rem;
            width: 50%;
            height: 8rem;
            margin: 0 auto;
             }
             .go-shopping{
                 background-color: #D4237A;
                 color:#fff;
                 width:30%;
                 margin:0 auto;
                border-radius:1rem;
                padding:0.5rem 0;
             }
        }
    }
}
</style>
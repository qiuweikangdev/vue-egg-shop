<template>
  <div id='categoryGoods'>
      <!-- 分类目录通过id来获取某分类商品 -->
        <div  class="right-area">
            <ul class='right-wrapper'>
                <li 
                    class='item'
                    v-for='(product,index) in categoriesDetailData'
                    :key='index'
                     @click="goToGoodsDetail(product)"
                >
                    <div class='item-area'>
                         <div class='img-left'>
                            <img :src="product.small_image"  :onerror='errorImg' alt="">
                         </div>
                          <div class='content-right'>
                              <span class='name'>{{product.product_name}}</span>
                              <span class="spec">{{product.spec}}</span>
                              <div class='price'>
                                 <span class='now-price'>{{product.present_price | moneyFormat}}</span>
                                  <span class='orign-price'>{{product.origin_price | moneyFormat}}</span>
                              </div>
                              <!-- 添加购物车 -->
                                     <div class="buyCar"><shop-cart :index='index' :product='product'></shop-cart></div>
                                <!-- <div class="buyCar"
                                    @click.stop="addToCart(item,index)">
                                        <svg-icon iconClass="car"
                                            style="width:1.3rem;height:1.3rem"></svg-icon>
                                </div> -->

                          </div>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapMutations,mapState } from 'vuex'
import ShopCart from '@/components/shopCart'
export default {
    components:{
       ShopCart
  },
     data(){
         return {
             errorImg:'this.src="'+require('@/assets/images/errorImg.png') +'"'  //图片失效的替补图片
         }
     },
     props:{
         categoriesDetailData:Array
     },
     mounted(){
         this._initBScroll()
     },
     methods:{
          ...mapMutations({
             ADD_TO_CART:'user/ADD_TO_CART'
            }),
         goToGoodsDetail(product){
            this.$router.push({
                path:'/goodsDetail',
                query:{
                    id: product.goods_id,
                    name: product.name,
                    small_image: product.small_image,
                    present_price:product.present_price,
                    spec: product.spec,
                    total_sales:product.total_sales,
                    origin_price: product.origin_price,
                    like_num: product.like_num,
                }
            })
         },
      _initBScroll(){
            // 1.1.初始化滚动视图
            this.$nextTick(() => {
              if (!this.leftScroll) {
                this.leftScroll = new BScroll('#categoryGoods', {
                  probeType: 3,
                  click: true,
                  scrollY: true,
                  tap: true,  
                  mouseWheel: true //鼠标齿轮滚动
                });
              } else {
                   this.leftScroll.refresh();
              }
            });
     },
        
         addToCart(item){
             this.ADD_TO_CART(item) 
         }
     }
}
</script>

<style scoped lang='scss'>
#categoryGoods{
 .right-wrapper{ 
     .item-area{
         height: 100%;
         display: flex;
         align-items: center;
     }
     .item{
         height: 100%;
         padding:0.5rem 0.3rem;
         border-bottom: 1px solid #ccc;
     }
     .img-left{
         border-radius: 50%;
         img{
             display: block;
             width:3rem;
             height:3rem;
         }
     }
    .content-right{
        flex:0 0 50%;
        padding:0.5rem 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
        span{
            padding:0.2rem 0;
        }
        .name{
            font-size: 0.7rem;
        }
        .spec{
              white-space: nowrap;
               font-size: 0.5rem;
              color:#A7ABB0;
        }
        .price{
               font-size: 0.6rem;
            .now-price{
                color:#FF3434;
            }
            .orign-price{
                padding-left:0.5rem;
                text-decoration: line-through;
                color:#555;
            }
        }
        .buyCar{
                position: absolute;
                left: 8rem;
                bottom:-1rem;
                width: 2.5rem;
                height: 2.5rem;
        }
    } 
 }   
}
</style>
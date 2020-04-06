<template>
  <div id="produce-main">
    <!-- 火爆商品列表 -->
    <ul class="itemWrapper" >
        <li class="item"
        v-for="(product,index) in product_list" :key="index"
         @click.stop="goToGoodsDetail(product)">
            <div class="item-image">
                <img :src="product.small_image" alt="">
                <span class="title">{{product.name}}</span>
            </div>
            <div>
            </div>
            <div class="price">
                <p class="now-price">{{product.present_price | moneyFormat}}</p>
                 <p class="original-price">{{product.origin_price | moneyFormat}}</p>
                     <!-- 购物车 -->
                  <div class="buyCar"><shop-cart :index='index' :product='product'></shop-cart></div>
             </div>
            <div>
            </div>
        </li>

    </ul>

    
  </div>
</template>

<script>
//1.引入vuex模块
import { createNamespacedHelpers} from "vuex";
const { mapActions ,mapState,mapMutations } = createNamespacedHelpers("user");
import ShopCart from '@/components/shopCart'
import { getHotProduct } from '@/api/shop'
export default {
  components:{ ShopCart },
  data() {
    return {
      product_list: []
    };
  },
  created(){
    this.initData()
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
      addToCart(product){
          this.ADD_TO_CART(product)
      },
      goToGoodsDetail(produce){
            this.$router.push({
                path:'/goodsDetail',
                query:{
                    id: produce.id,
                    name: produce.name,
                    small_image: produce.small_image,
                    price:produce.price,
                    spec: produce.spec,
                    total_sales:produce.total_sales,
                    origin_price: produce.origin_price,
                }
            })
      },
      async initData(){
        let result = await getHotProduct()
        this.product_list = result.data.data
      }
  }
};
</script>

<style scope lang='scss'>
#produce-main {
    background-color:#F9F9F9;
    .itemWrapper{
         display: flex;
         align-items: center;
         justify-content:space-between;
         flex-wrap:wrap;
         padding:0.5rem;
         height:100%;
        img{
            width: 100%;
            height: 100%;
        }
        .item{
            width:48%;
            background-color:#fff;
            border-bottom: 10px #F9F9F9 solid;
            padding-bottom: 0.5rem;
         
        }
        .item-image{
            text-align: center;
            .title{
                font-size:12px;
                white-space: nowrap;
            }

        }
        .price{
            display: flex;
             font-size:12px;
             padding-right:0.5rem;
             position: relative;
             justify-content: center;
             .original-price{
                 padding-left:0.5rem;
                 text-decoration: line-through;
             }
             .now-price{
                color:#FF3434;
             }
             .buyCar {
                position: absolute;
                right:-0.5rem;
                top:0.25rem;
                width: 2.5rem;
                height: 2.5rem;
         } 
        }
      
    }
}
</style>
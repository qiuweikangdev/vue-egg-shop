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
export default {
  components:{ ShopCart },
  data() {
    return {
      product_list: [
        {
          id: "5b72911c01a6eaaf048b5d79",
          product_name: "爱森五花肉 500g",
          name: "爱森五花肉 500g",
          origin_price: "46.90",
          present_price: "41.80",
          vip_price: "",
          spec: "高端五花肉 吃出幸福的滋味",
          small_image:
            "https://img.ddimg.mobi/product/4513b9fc5935f1548406258985.jpg!deliver.product.list",
          category_id: "58fa1cc1936edfe6568b58c2",
          sizes: [],
          total_sales: 8790
        },
        {
          id: "5c9471687b37a12d3c79bf10",
          product_name: "云南文山黄牛鲜牛腩 260g",
          name: "云南文山黄牛鲜牛腩 260g",
          origin_price: "29.90",
          present_price: "27.80",
          vip_price: "",
          spec: "黄油是黄牛牛腩的精华~",
          small_image:
            "https://img.ddimg.mobi/product/e5b12559464b71553495475772.jpg!deliver.product.list",
          category_id: "58fa2059936edf89778b56e5",
          sizes: [],
          total_sales: 8440
        },
        {
          id: "5b150c9bc0a1ea13728b4576",
          product_name: "粮全其美葱香味手抓饼 900g/袋",
          name: "粮全其美葱香味手抓饼 900g/袋",
          origin_price: "20.80",
          present_price: "18.80",
          vip_price: "",
          spec: "金黄酥脆 黄金扑鼻",
          small_image:
            "https://ddimg.ddxq.mobi/becc0e6b257781528108118451.jpg!maicai.product.list",
          category_id: "5b0ffb3845cd42cb548c913c",
          sizes: [],
          total_sales: 8458
        },
        {
          id: "58f1b84d916edfb84ccb5f39",
          product_name: "松花菜半颗 约500g",
          name: "松花菜半颗 约500g",
          origin_price: "8.50",
          present_price: "7.59",
          vip_price: "",
          spec: "脆脆嫩嫩 花菜我一般选这种~",
          small_image:
            "https://ddimg.ddxq.mobi/47a79cef49d661492078512642.jpeg!maicai.product.list",
          category_id: "599fda09936edf10388f85fb",
          sizes: [],
          total_sales: 9027
        },
        {
          id: "5d15c51910abf114a940ca5d",
          product_name: "美国车厘子 250g",
          name: "美国车厘子 250g",
          origin_price: "32.90",
          present_price: "25.90",
          vip_price: "",
          spec: "果中钻石 甜蜜多汁~",
          small_image:
            "https://img.ddimg.mobi/product/b960de0ed28d11562551037392.jpg!deliver.product.list",
          category_id: "5953229c936edfd20c8b8bbe",
          sizes: [],
          total_sales: 8257
        },
        {
          id: "59280487936edf5a7a8ebd0b",
          product_name: "芸豆 300g",
          name: "芸豆 300g",
          origin_price: "9.90",
          present_price: "5.99",
          vip_price: "",
          spec: "芸豆炒肉丝炖排骨 流口水ing",
          small_image:
            "https://img.ddimg.mobi/product/73c7833c39d6d1545274259948.jpg!maicai.product.list",
          category_id: "58fbf4d5936edfe4568b5986",
          sizes: [],
          total_sales: 8919
        },
        {
          id: "5af3fd56c0a1ea5f248b458b",
          product_name: "四季宝柔滑花生酱 340g/瓶",
          name: "四季宝柔滑花生酱 340g/瓶",
          origin_price: "19.90",
          present_price: "16.90",
          vip_price: "",
          spec: "适合凉拌.涂抹、质地细腻味美，拌面也是超好吃~",
          small_image:
            "https://ddimg.ddxq.mobi/abf3023fb51611526109391551.jpg!maicai.product.list",
          category_id: "58fb3bb5936edfe5568b5909",
          sizes: [],
          total_sales: 7610
        },
        {
          id: "5bed12cd716de100468c4dd7",
          product_name: "伊赛澳洲原切冷冻牛腱 1kg",
          name: "伊赛澳洲原切冷冻牛腱 1kg",
          origin_price: "79.90",
          present_price: "69.90",
          vip_price: "",
          spec: "鲜切急冻 锁住美味",
          small_image:
            "https://img.ddimg.mobi/product/718558731a1eb1562568919636.jpg!deliver.product.list",
          category_id: "58fa206a936edfe4568b57e6",
          sizes: [],
          total_sales: 7225
        },
      ]
    };
  },
  props: {},
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
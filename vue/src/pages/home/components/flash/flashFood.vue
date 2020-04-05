<!--
 * @Descripttion: 限时抢购的商品
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-11-27 15:14:39
 -->
<template>
  <div id="flashFood">
    <div class="food-wrapper" ref='wrapper'>
      <ul class="food-content" ref='foodContent'>
        <li 
        class="food-item"
        v-for='(product,index) in FlashFood'
        :key='index'
        ref='foodItem'
        @click='goToGoodsDetail(product)'
        >  
          <div class='item-image'>
            <img src="" alt=""  v-lazy="product.small_image" class='food-img'>
             <span class="title">{{product.product_name}}</span>
           </div>  
             <div class="price">
            <p class="now-price">{{product.present_price | moneyFormat}}</p>
            <p class="original-price">{{product.origin_price | moneyFormat}}</p>
            <div class="buyCar"><shop-cart :index='index' :product='product'></shop-cart></div>
            <!-- <div class="buyCar"
                 @click.stop="addToCart(product,index)">
                    <svg-icon iconClass="car"
                        style="width:1.3rem;height:1.3rem"></svg-icon>
            </div> -->
            
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { toMoney } from '@/filter/moneyFilter'
import { mapMutations,mapState } from 'vuex'
import BScroll from 'better-scroll'
import ShopCart from '@/components/shopCart'
export default {
  components:{
    ShopCart
  },
  data() {
    return {
    };
  },
  props:{
    // 1.限时抢购商品数据
      FlashFood:Array

  },
  computed: {
  ...mapState({
    //2. token
    token:state =>state.user.token
  })
},
  watch:{
    FlashFood(){
        this.$nextTick(()=>{
            this._initBScroll()
        })
    }
  },
  methods:{
    //3 添加购物车方法
    ...mapMutations({
      ADD_TO_CART:'user/ADD_TO_CART'
    }),
    addToCart(item,index){
        this.ADD_TO_CART(item)
      //  if(this.token){
         
      //  }
    },
  // 初始化滚动事件
    _initBScroll(){
          //获取所有li标签元素，返回的是伪数组
        let allItems =  this.$refs.foodItem
        let sumWidth = 0
        //把所有li元素组成的伪数组转换真正的数组
        Array.prototype.slice.call(allItems).forEach(item=>{
            sumWidth += item.clientWidth
        })
        this.$refs.foodContent.style.width =sumWidth  + 'px'
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            startX: 0,
            click: true,
            scrollX: true,  //开启横向滚动
            eventPassthrough:'vertical'  //保留原生滚动
          });
    },
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
      }
  }
};
</script>

<style lang="scss" scoped>
#flashFood{
    .food-wrapper{
        overflow: hidden;
        height: 100%;    
        .food-content{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left:0.2rem;
        .food-item{
            padding-right: 2rem;
            flex: 0 0 5rem;
        } 
        .food-img{
            width:100%;
            height:100%;
            border-radius: 50%;
          }
        .title{
        padding: 0.2rem;
        display: inline-block;
        font-size: 0.65rem;
        height: 1.8rem;
        line-height: 1rem;
        word-break: break-all;
        // display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;
        }
         .price {
            position: relative;
            padding-left: 0.5rem;
                .original-price {
                font-size: 0.6rem;
                color: #999999;
                text-decoration: line-through;
                }
          .now-price {
                color: #f37078;
                font-size: 0.7rem;
            }
            
         }
         
         .buyCar {
                position: absolute;
                left:3.5rem;
                top:0.15rem;
                width: 2.5rem;
                height: 2.5rem;
         } 
      
         
        }
        
    }
}
</style>
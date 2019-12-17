<!--
 * @Descripttion: 限时抢购的商品
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-11-27 15:14:39
 -->
<template>
  <div id="flashFood">
    <div class="food-wrapper">
      <ul class="food-content">
        <li 
        class="food-item"
        v-for='(item,index) in FlashFood'
        :key='index'
        >
            <img src="" alt=""  v-lazy="item.small_image" class='food-img'>
             <span class="title">{{item.name}}</span>
             <div class="price">
            <p class="now-price">{{item.price | moneyFormat}}</p>
            <p class="original-price">{{item.origin_price | moneyFormat}}</p>
            <div class="buyCar"
                 @click="addToCart(item,index)">
                 <!-- 购物车图标 -->
                    <svg-icon iconClass="car"
                        style="width:1.3rem;height:1.3rem"></svg-icon>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { toMoney } from '@/filter/moneyFilter'
import { mapMutations,mapState } from 'vuex'
export default {
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
  // filters:{
  //   //2. 对价格的格式过滤
  //     moneyFormat(money){
  //         return toMoney(money)
  //     }
  // },
  methods:{
    //3 添加购物车方法
    ...mapMutations({
      ADD_TO_CART:'user/ADD_TO_CART'
    }),
    addToCart(item,index){
        this.ADD_TO_CART(item)
      //  if(this.token){
         
      //  }
    }
  }
};
</script>

<style lang="scss" scoped>
#flashFood{
    .food-wrapper{
        overflow: hidden;
        .food-content{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        .food-item{
            // flex: 1;
            padding-right: 1.2rem;
        } 
        .food-img{
            width: 5rem;
            height: 5rem;
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
                left:3.2rem;
                top:0.15rem;
                width: 2.5rem;
                height: 2.5rem;
         } 
      
         
        }
        
    }
}
</style>
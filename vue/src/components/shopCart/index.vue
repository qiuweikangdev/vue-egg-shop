<!--
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2020-02-20 20:18:37
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-17 19:01:55
 -->
<template>
      <div id='shop-cart' :class='className'
                 @click.stop="addToCart(product,index)">
                 <!-- 购物车图标 -->
                    <svg-icon iconClass="car"
                        style="width:1.3rem;height:1.3rem"></svg-icon>
        </div>
</template>

<script>
import { mapMutations,mapActions,mapState} from 'vuex'
    export default {
       props:{
           className:{
                type:String,
                default:'shopCart'
           },
           index:Number,
           product:Object
       },
       computed:{
           ...mapState({token:state=>state.user.token})
       },
       methods:{
           //添加购物车方法
            // ...mapMutations({
            //     ADD_TO_CART:'user/ADD_TO_CART'
            //     }),
            ...mapActions({
                 ADD_TO_CART:'user/addToCart'
            }),    
           addToCart(product,index){
               if(this.token){
                    this.ADD_TO_CART(product)
               }else{
                   this.$router.push('/login')
               }
               
           }
       }
    }
</script>

<style lang="scss" scoped>

</style>
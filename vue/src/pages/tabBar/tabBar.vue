<!--
 * @Descripttion: 底部导航栏
 * @Author: qqqiu
 -->
<template>
  <!-- <div id="tabBar"> -->
    <!-- <van-icon name="friends-o" /> -->
      <van-tabbar v-model="active">
        <van-tabbar-item
         v-for='(item,index) in tabbar' 
         :key="index"
         :icon='item.normal'
         @click='handleTab(index,item.name)'
         :info='item.name.includes("cart")?goodsNum:""'
         >
        <span>{{item.title}}</span>
        <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? item.active : item.normal"
      >
        </van-tabbar-item>
        </van-tabbar>
  <!-- </div> -->
</template>

<script>
import { Toast } from 'vant';
import { getToken } from '@/utils/auth'
import { createNamespacedHelpers } from 'vuex'   //导入命名空间辅助函数
const {  mapState, mapMutations, mapActions } = createNamespacedHelpers('user')
export default {
  data() {
    return {
      active: 0, //默认选中标签
      tabbar:[
        { 
          name:'home',
          title:'首页',
          normal:require('@/assets/images/tabbar/home_default.png'),
          active:require('@/assets/images/tabbar/home_selected.png')
        },
        {
          name:'category',
          title:'分类',
          normal:require('@/assets/images/tabbar/category_default.png'),
          active:require('@/assets/images/tabbar/category_selected.png')
        },
        { 
          name:'cart',
          title:'购物车',
          normal:require('@/assets/images/tabbar/cart_default.png'),
          active:require('@/assets/images/tabbar/cart_selected.png')
        },
        {
           name: "personal",
          title:'个人中心',
          normal:require('@/assets/images/tabbar/mine_default.png'),
          active:require('@/assets/images/tabbar/mine_selected.png')
        },
      ]
    }
  },
  computed:{
     ...mapState(['shopCart','token']),
     //购物车数量
      goodsNum(){
        // return this.$store.getters.goodsNum
          let num = 0
         this.shopCart.forEach((goods)=>{
            num += goods.product_amount
          })
          if(num>0){
              return num            
          }
      }
  },
  created(){
    //初始化购物车商品数据
    // this.INIT_SHOP_CART()
    if(this.token){
      this.getShopCartData()
    } 
    // this.tabbarSelected()
    //保证每次页面加载前Tabbar选中正常
    this.tabbarSelected(this.$route.name)
  },
  watch:{
      // 监听路由变化,保证路由跳转Tabbar选中正常
     $route(to,from){
        this.tabbarSelected(to.name)
     }
  },
  methods:{
    //获取mutaions里的方法，初始化购物车数据
    //  ...mapMutations(['INIT_SHOP_CART']),
    ...mapActions(['getShopCartData']),
     handleTab(index,name){
        this.$router.push({name:name})
        // const token = getToken()
        // if(token){
        //     this.$router.push(name)
        // }else{
        //    Toast.fail('请先登录');
        // }
      
     },
     tabbarSelected(name){
       //findIndex方法是返回第一个匹配到的数组成员的位置
      var  index= this.tabbar.findIndex((item,index)=>{
             return name.includes(item.name)
       })
        this.active = index
     }
  }
}
</script>

<style scoped>
#tabBar{
  height:auto;
}
</style>
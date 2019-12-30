<!--
 * @Descripttion: 分类模块
 * @Author: qqqiu
 -->
<template>
  <div id='category'>
      <!-- 搜索 -->
      <Search :isShow.sync='isCategory'></Search>
      <!-- 分类内容 -->
      <div class="category-content" v-show='isCategory'> 
        <!-- 左边区域 -->
          <div class='left-area'> 
                <ul class="left-wrapper">
                  <li 
                      v-for="(item, index) in CategorySub"
                      :key="index"
                      :class='[{selected:currentIndex === index},{categoryItem:true}]'
                      @click="clickLeft(item,index)"
                  >
                     <span class="text-item">{{item.mall_sub_name}}</span>
                  </li>
                </ul>
          </div>

          <!-- 右边区域 -->
           <Category-Goods :categoriesDetailData='categoriesDetailData'></Category-Goods>
      </div>
  </div>
</template>

<script>
import Search from './components/Search'
import CategoryGoods from './components/categoryGoods'
import BScroll from 'better-scroll'
import { createNamespacedHelpers} from "vuex";
const { mapActions ,mapState,mapMutations } = createNamespacedHelpers("shop");
import { getGoodsByCategoryID } from '@/api/shop'
export default {
   components:{ Search ,CategoryGoods},
    data(){
      return {
        //是否显示分类内容
         isCategory:true,
         currentIndex:0,  //当前左边的索引
         //左边分类目录数据
         categoriesData:[],
         //右边分类数据
         categoriesDetailData:[]
      }
    },
    created(){
       //初始化左边分类目录数据
       this.$store.dispatch('shop/reqCategorySub')
       //初始化分类数据
       this.initCategoriesData()
    },
    computed:{
      //获取商品分类
      ...mapState(['homenav','CategorySub'])
    },
    updated(){
    },
    mounted(){
      if(this.isCategory){
        this.$nextTick(()=>{
          this._initBScroll()
        })
         
      }
    },
    methods:{
      // 1、初始化滚动事件
      _initBScroll(){
            // 1.1.初始化滚动视图
            this.$nextTick(() => {
              if (!this.leftScroll) {
                this.leftScroll = new BScroll('.left-area', {
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
     //初始化分类商品数据
     async initCategoriesData(){
        let initID = '2c9f6c946016ea9b016016f79c8e0000'  //分类目录商品第一个ID
        let result = await getGoodsByCategoryID(initID)
          if(result.data.success){
          this.categoriesDetailData = result.data.success
        }
      },
     async  clickLeft(item,index){
        //改变当前索引值
         this.currentIndex = index;
         // 根据分类id读取某分类商品数据
        let result = await getGoodsByCategoryID(item.id)
        if(result.data.success){
          this.categoriesDetailData = result.data.success
          console.log(this.categoriesDetailData)
        }
      },
     
    }
}
</script>

<style scoped lang='scss'>
#category{
  overflow: hidden;
  .category-content{
        display: flex;
       position:absolute;
       top: 2.75rem;
       bottom: 3rem;  //距离顶部多少距离，目的就是限制左边的高度
       overflow: hidden;  //一定要设置溢出隐藏，否则滚动的时候，会超出内容 
  }
   //左边区域
   .left-area{
      width: 6rem;
      background: #F4F4F4;
      .categoryItem {
          padding: 0.7rem 0;
          border-bottom: solid 0.01rem #e8e9e8;
          position: relative;
          font-size:0.8rem;
           .text-item{
             display: inline-block;
             color: #666;
             padding:0.2rem 1rem;
             white-space: nowrap;
      }
     }
   }
   .selected{
      background: #fff;
   }
   .selected .text-item {
      border-left:5px  #D4237A solid;
      font-weight: bold;
       font-size:0.9rem;
       color:#333;
   }
}
</style>
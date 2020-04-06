<!--
 * @Descripttion: 分类模块
 * @Author: qqqiu
 -->
<template>
  <div id='category'>
      <!-- 搜索 -->
      <Search :isShow.sync='isCategory' :isSearching='isSearching'></Search>
      <!-- 分类内容 -->
      <div class="category-content" v-show='isCategory'> 
        <!-- 左边区域 -->
          <div class='left-area'> 
                <ul class="left-wrapper">
                  <li 
                      v-for="(item, index) in CategorySub"
                      :key="index"
                      :class='[{selected:currentIndex === index},{categoryItem:true}]'
                      @click="clickLeft(item.id,index)"
                      ref='sub'
                  >
                     <span class="text-item">{{item.mall_sub_name}}</span>
                  </li>
                </ul>
          </div>

          <!-- 右边区域 -->
           <Category-Goods :categoriesDetailData='categoriesDetailData'></Category-Goods>
      </div>
      <!-- 正在加载组件 -->
       <Loading-Bounce :show="isShowLoading" />
       <!-- <Loading-Dot :show="isShowLoading" /> -->
  </div>
</template>

<script>
import Search from '@/pages/home/components/header/Search'
import CategoryGoods from './components/categoryGoods'
import BScroll from 'better-scroll'
import { createNamespacedHelpers} from "vuex";
const { mapActions ,mapState,mapMutations } = createNamespacedHelpers("shop");
import { getGoodsByCategoryID } from '@/api/shop'
import LoadingBounce from '@/components/loading/LoadingBounce'
import LoadingDot from '@/components/loading/LoadingDot'
export default {
   components:{ Search ,CategoryGoods,LoadingBounce,LoadingDot},
    data(){
      return {
        //是否显示分类内容
         isCategory:true,
         currentIndex:0,  //当前左边的索引
         //左边分类目录数据
         categoriesData:[],
         //右边分类数据
         categoriesDetailData:[],
         currenCategorytId:'', // 当前分类目录的id,用于缓存数据时请求最新数据
          isShowLoading:true,  //是否显示加载组件
          name:this.$route.params.name,
          subObj:{}
      }
    },
    created(){
       //初始化左边分类目录数据
       this.$store.dispatch('shop/reqCategorySub')
       //初始化分类数据
       console.log('aaaa')
       this.initCategoriesData()
    },
    //
    // beforeUpdate(){
    //   if(this.name){
    //     let obj =  this.NavToSub()
    //     this.clickLeft(obj.id,obj.num)
    //   }
    // },
    computed:{
      //获取商品分类
      ...mapState(['homenav','CategorySub']),
      //判断是否正在搜索
            isSearching(){
                return  this.isShowLoading
          }
    },
    mounted(){
      if(this.isCategory){
        this.$nextTick(()=>{
          this._initBScroll()
        })
      }
      if(this.name){
         this.$nextTicqk(()=>{ 
           this.NavToSub()
          })
      }
    },
    //keep-alive 组件激活时调用。 （即页面缓存了数据时进入页面就触发）
    activated(){
        if(this.name){
              let obj =  this.NavToSub()
              this.clickLeft(obj.id,obj.num)
          }
       else if(this.currenCategorytId ){
           this.$nextTick(()=>{
          //根据当前分类的id,请求最新的数据
              this.clickLeft(this.currenCategorytId,this.currentIndex)
        })
       }
    },
    watch:{
      $route(to,from){
         this.name = to.params.name
      },
       CategorySub(val){
             if(this.name){
              let obj =  this.NavToSub()
              this.clickLeft(this.currenCategorytId,this.currentIndex)
            }

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
            this.isShowLoading= false
       }
      
      },
     async  clickLeft(id,index){
        //改变当前索引值
         this.currentIndex = index;
         // 根据分类id读取某分类商品数据
        let result = await getGoodsByCategoryID(id)
        console.log(result,'result')
        this.currenCategorytId = id  //记录当前分类目录的id
        if(result.data.success){
          this.categoriesDetailData = result.data.success
        }
     //滚动到对应的位置
      setTimeout(() => {
        let menuLists = this.$refs.sub;
        let el = menuLists[index];
        // 2.3 滚动到对应元素上
        this.leftScroll.scrollToElement(el, 100);
       },100);


      },
      NavToSub(){
        let obj = {}
         for(let i=0;i<this.CategorySub.length;++i){
            if(this.CategorySub[i].mall_sub_name.includes(this.name)){
                this.currenCategorytId =  this.CategorySub[i].id
                this.currentIndex =i
                obj.id = this.CategorySub[i].id
                obj.num =i
                  break;
            }
         }
         console.log(this.currenCategorytId,'currenCategorytId')
         console.log(this.currentIndex,'currentIndex')
         return obj
      
     
      }
    }
}
</script>

<style scoped lang='scss'>
#category{
  overflow: hidden;
  .category-content{
        display: flex;
       position:absolute;
       top: 2rem;
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
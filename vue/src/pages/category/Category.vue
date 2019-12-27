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
                      v-for="(item, index) in categoriesData"
                      :key="index"
                      :class='[{selected:currentIndex === index},{categoryItem:true}]'
                      @click="clickLeft(index)"
                  >
                     <span class="text-item">{{item.name}}</span>
                  </li>
                </ul>
          </div>
      </div>
  </div>
</template>

<script>
import Search from './components/Search'
import BScroll from 'better-scroll'
export default {
   components:{ Search },
    data(){
      return {
        //是否显示分类内容
         isCategory:true,
         currentIndex:0,  //当前左边的索引
         //左边分类列表数据
         categoriesData:[
            {name:'水果'},
            {name:'水果'},
            {name:'水果'},
            {name:'水果'},
            {name:'水果'},
            {name:'肉类'},
            {name:'肉类'},
            {name:'肉类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'},
            {name:'乳类'}
         ]
      }
    },
    created(){
    },
    mounted(){
      if(this.isCategory){
        this.$nextTick(()=>{
          this._initBScroll()
        })
         
      }
    },
    computed:{
      // showCategory:{
      //       get(){
      //           return this.isCategory
      //     },
      //       set(val){
      //           this.isCategory = val
      //       }
      // }
        
    },
    methods:{
      // showTab(flag){
      //    this.$emit('showTab',flag)
      //    this.isCategory = flag
      // },
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
      clickLeft(index){
        //改变当前索引值
         this.currentIndex = index;
         //
      }
    }
}
</script>

<style scoped lang='scss'>
#category{
  overflow: hidden;
  .category-content{
        display: flex;
       position: absolute;
       top: 2.75rem;
       bottom: 3rem;  //距离顶部多少距离，目的就是限制左边的高度
       overflow: hidden;  //一定要设置溢出隐藏，否则滚动的时候，会超出内容 
  }
   //左边区域
   .left-area{
      width: 5rem;
      background: #F4F4F4;
      .categoryItem {
          padding: 0.7rem 0;
          border-bottom: solid 0.01rem #e8e9e8;
          position: relative;
          font-size:0.8rem;
           .text-item{
             color: #666;
             padding:0.2rem 1rem;
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
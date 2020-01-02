<!--
 * @Descripttion: 搜索匹配到的结果界面
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-30 18:15:41
 -->
<template>
  <div id='searchConent'>
       <Search :isShow.sync='flag' :isSearch='isSearch' ></Search>
       <!-- 搜索到的商品 -->
       <div class='food-wrapper' v-show='flag'>
           <ul class="food-content">
               <li
               v-for='(produce,index) in goodsInfo'
               :key='index'
               class="food-item"
               >
                   <div class='food-img'>
                       <img :src="produce.small_image" alt="" :onerror='errorImg' >
                   </div>
                   <div class='content-bottom'>
                       <span>{{produce.name}}</span>
                       <div class='price'>
                           <span>{{produce.origin_price}}</span>
                           <span>{{produce.present_price}}</span>
                       </div>
                       
                   </div>
               </li>
           </ul>

        <div class="empty-goods" v-show ='emptyGoods ||  goodsInfo.length<0'>
            <div class='empty-icon'>
                <img :src="emptyIcon" alt="">
            </div>
            <p>主人对不起...我真的尽力了...</p>
            <p>搜索不到有关数据...</p>
        </div>
       </div>
         <Loading :show="isShowLoading" />
  </div>
</template>

<script>
import Search from '@/pages/home/components/header/Search'
import { searchGoods } from '@/api/shop';
import Loading from '@/components/loading/Loading'
import {
    Toast
} from 'vant'
export default {
       components:{ Search ,Loading },
      data(){
          return {
              goodsInfo:[],
              name:this.$route.query.name, //接受传过来路由参数
               errorImg:'this.src="'+require('@/assets/images/errorImg.png') +'"',  //图片失效的替补图片
                flag:true,
                emptyGoods:false, //空商品
                emptyIcon:require('@/assets/images/empty.png'),
                isShowLoading:true,  //是否显示加载图标
          }
      },
      created(){
          this.getGoodsInfo()
      },
    
      watch:{
          flag(val){
              this.flag = val
          },
          $route(to,from){
              this.$nextTick(()=>{
                   this.getGoodsInfo(to.query.name)
                    this.$router.go(0)
                    //   window.location.reload()
              })
          }
          
      },
      computed:{
          //判断是否正在搜索
            isSearch(){
                return  this.isShowLoading
            }
      },
      methods:{ 
           async getGoodsInfo(name){
                this.isShowLoading= true
             let result =await searchGoods(this.name || name)
             setTimeout(()=>{
                    if(result.data.status === '1'){
            this.emptyGoods = false
              this.goodsInfo = result.data.message
                  this.isShowLoading= false
           }else{  
            this.emptyGoods = true
             this.isShowLoading= false
                Toast({
                    message: '暂无相关商品',
                    duration: 800
                })
          }
             },800)
       
      },
      getName(name){
          console.log(name)
          this.getGoodsInfo(name)
      }
      }

}
</script>

<style scoped lang='scss'>
#searchConent{
    background: #F5F5F5;
    padding-top:2rem;
     .food-content{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-around;
        .food-item{
            flex: 0 0 7rem;
            padding:0.2rem 1.2rem;
            background: #fff;
            border-bottom: 10px #F9F9F9 solid;
        } 
        .food-img{ 

            img{
                 width:100%;
                height:100%;
            }
           
          }
         .content-bottom{
             font-size:0.6rem;
             padding:0.5rem 0;
              .price{
                  display: flex;
                  span{
                      padding:0 0.5rem;
                      font-size: 0.8rem;
                  }
              } 
         }
        
     }
     //无商品样式
     .empty-goods{
         color: #888;
         text-align:center;
         font-size:0.9rem;
         height:100%;
         width:100%;
         position:absolute;
         padding-top:100px;
         background: #F5F5F5;
         overflow: hidden;
        
         .empty-icon{
             width:50%;
             margin:0 auto;
             animation: run 2s infinite;
             transition:all 0.2s linear;
             img{
                 width:100%;
                 height:100%;
             }
         }
     }
     @keyframes run {
         0% {             
           transform: translate(0px, 0px);            
        }            
        50% {                
           transform: translate(0px, -20px);            
        }            
        100% {                
           transform: translate(0px, 0px);
        }
        
     }
}
</style>
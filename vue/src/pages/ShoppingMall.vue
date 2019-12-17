<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon"/>
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" />
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
         <!--轮播图-->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="( banner ,index) in homecarousel" :key="index" >
                    <img v-lazy="banner.imgUrl" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>  
        <!--type bar-->
        <!-- <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>

            </div>
        </div>   -->
        <!--adbanner area-->
        <div>
            <img v-lazy="adBanner" width="100%" />
        </div>
        <!--Recommend goods area-->
        <!-- <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                   <swiper-slide v-for="(item,index) in recommendGoods " :key="index" >
                       <div class="recommend-item">
                           <img :src="item.image" width="80%">
                           <div>{{item.goodsName}}</div>
                           <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice  | moneyFilter}})</div>
                       </div>
                   </swiper-slide> 
                </swiper>
            </div>
        </div> -->
        <!-- <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component> -->
        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <!-- <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
                                <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">

                                </goods-info>
                        </van-col>
                    </van-row>
                </van-list> -->
            </div>
        </div>
        <!-- 返回顶部 -->
        <div>
            <v-top></v-top>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // 局部引入vue-awesome-swiper
    // import 'swiper/dist/css/swiper.css'
    import {swiper ,swiperSlide} from 'vue-awesome-swiper'
    import { createNamespacedHelpers } from 'vuex'   //导入命名空间辅助函数
    const { mapState } = createNamespacedHelpers('shop')
    // import floorComponent from '../component/floorComponent'
    import { toMoney } from '@/filter/moneyFilter.js'
    // import goodsInfo from '../component/goodsInfoComponent'
    // import url from '@/serviceAPI.config.js'
   
    export default {
        data(){
            return {
                    swiperOption:{
                    slidesPerView:3
                },
                 msg: 'Shopping Mall',
                 locationIcon: require('@/assets/images/location.png'),
                bannerPicArray:[],
                category:[],
                adBanner:'',
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[],  //热卖商品
                swiperOption: {
                    slideToClickedSlide: true,
                    autoplay:true, //自动轮播
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 10,
                        modifier:1,
                        slideShadows : false  //轮播阴影
                    },
                    // loop:true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
        }
            }
        },
          components:{swiper,swiperSlide},
        computed:{
            ...mapState(['homecarousel'])
        },
        created(){
             this.$store.dispatch('shop/reqHomeCarousel') 
        },
       filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
     
       
    }
</script>

<style scoped lang='scss'>
html{

}
    .search-bar{
        height:2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width:100%;
        height: 1.3rem;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom:1px solid #fff !important;
        background-color: #e5017d;
        color:#fff;
    }
    .location-icon{
        padding-top:.2rem;
        padding-left:.3rem;
    }
    .swiper-area{
        clear:both;
        max-height:15rem;
        overflow: hidden;
    }

    .type-bar{
        background-color: #fff;
        margin:0 .3rem .3rem .3rem;
        border-radius: .3rem;
        font-size:14px;
        display:flex;
        flex-direction:row;
        flex-wrap:nowrap;
    }
    .type-bar div{
        padding:.3rem;
        font-size:12px;
        text-align: center;
        flex:1;
    }
    .recommend-area{
        background-color: #fff;
        margin-top:.3rem;
    }
    .recommend-title{
        border-bottom:1px solid #eee;
        font-size:14px;
        padding:.2rem;
        color:#e5017d;
    }
    .recommend-body{
        border-bottom:1px solid #eee;
    }
    .recommend-item{
        width:99%;
        border-right:1px solid #eee;
        font-size:12px;
        text-align: center;
    }
    .hot-area{
        text-align: center;
        font-size:14px;
        height: 1.8rem;
        line-height:1.8rem;
    }
    .hot-goods{
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }
    
</style>

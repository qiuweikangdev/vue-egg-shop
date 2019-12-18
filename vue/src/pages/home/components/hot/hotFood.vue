<!--
 * @Descripttion: 火爆商品下拉加载
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-11-27 15:14:39
 -->
<template>
  <div id='hotFood-main'>
      <!-- 下拉加载 -->
      <div class="pull-down-list">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
             <p>刷新次数: {{ count }}</p>
                <van-list v-model="loading" :finished="finished"  @load="onLoad">
                            <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                                <!-- <div class="list-item-img">
                                    <img :src="item.IMAGE1" 
                                    width="100%"
                                    :onerror="errorImg"                                    
                                     />
                                </div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>                                    
                                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>                                    
                                 </div> -->
                            </div>
                        </van-list>
        </van-pull-refresh>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
       loading:false,
      finished:false, //上拉加载是否有数据
      page:1,        //商品列表的页数
        goodList:[],   //商品列表信息
        categorySubId:'', //商品子类ID
        isRefresh:false, //下拉刷新
    }
  },

  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    onLoad(){
       this.$toast('刷新成功123');
    },
    goGoodsInfo(){

    }
    
  }
}
</script>

<style lang='scss' scoped>
#hotFood-main{
  height: 100%;
  .pull-down-list{
    background: gray;
  }
}
</style>
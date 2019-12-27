<!--
 * @Descripttion:  分类搜索模块
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-25 10:12:51
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-26 16:01:13
 -->
<template>
   <div id='search-main'>
       <div class='search' v-if='searchFlag'>
       <van-search placeholder="请输入搜索关键词" v-model="value" @click="handleClick" />
       <!-- <input type="text" @click="handleClick" class="searchInp" placeholder="请搜索"> -->
       </div>
       <!-- 更多搜索 -->
       <div class="search-content" v-else > 
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="onSearch"
                    @cancel="onCancel"
                />
                   <!-- 更多搜索方式 -->
                <div class='more-search'>
                    <div style='padding:1rem'>
                         <svg-icon iconClass="search"/>
                         <span style='color:#9C9C9C;padding:0 0.5rem;'>更多搜索方式</span>
                    </div>
                    
                    <!-- 搜索店铺 -->
                    <div  class='search-store'>
                          <svg-icon iconClass="store"/>
                          <span>搜索店铺</span>
                    </div>
                     
                 
                </div>

                  <!-- 热门搜索 -->
                <div class='search-hot'>
                    <div style='padding:1rem'>
                         <svg-icon iconClass="search"/>
                         <span style='color:#9C9C9C;padding:0 0.5rem;'>热门搜索</span>
                    </div>
                    
                    <div  class='hot-item'>
                          <span v-for='(item,index) in searchHot' :key='index'>{{item.name}}</span>
                    </div>
                     
                 
                </div>
       </div>
   </div>
</template>

<script>
import {
    Toast
} from 'vant'
export default {
    data(){
        return {
            searchFlag:true,  //搜索标志
            value:'',
            // 热门搜索
            searchHot:[
                {name:'鱼'},
                {name:'牛奶'},
                {name:'鸡蛋'},
                {name:'鸡肉'},
            ]
        }
    },
    props:{
        isShow:Boolean
    },
    watch:{
        searchFlag(val){
            if(val === false){
                 this.$nextTick(()=>{
                    const search =  document.querySelector('.search-content .van-field__control')
                     search.focus()
             })
            }
        }
    },
    methods:{
        handleClick(){
            this.searchFlag = false
            this.$emit('update:isShow',false)
           
        },
        onSearch(){
              Toast({
                    message: '暂未实现',
                    duration: 800
                })
        },
        onCancel(){
             this.searchFlag = true
             this.$emit('update:isShow',true)

        }
    }
}
</script>

<style scoped lang='scss'>
#search-main{
    background: #fff;
    .search{
        display: flex;
        justify-content: center;
        background: #F7F8FA;
        margin:0.5rem;
        border-radius: 50px;
           .van-search{
               background:transparent !important;
               padding:0 !important;
           }
    }
    .more-search{
        padding-left: 0.5rem;
           .van-search__content{
               border-radius: 20px;
           }
           .search-store{
               width: 30%;
               color:#58595B;
               background: #F4F4F4;
               border-radius: 30px;
               padding:0.5rem;
               span{
                   padding-left:0.5rem;
               }
           }
    }
    .search-hot{
        padding-left: 0.5rem;
    }
    .hot-item{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-around;
    }
    .hot-item span{
               color:#58595B;
               background: #F4F4F4;
               border-radius: 30px;
               padding:0.5rem 0.9rem;
               text-align: center;
    }
 
}

</style>
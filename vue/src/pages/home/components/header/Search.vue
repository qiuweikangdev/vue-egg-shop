<!--
 * @Descripttion:  搜索模块组件
 -->
<template>
   <div id='search-main'>
       <div class='search' v-if='searchFlag'>
           <div class="search-header">
                <svg-icon iconClass="back" style='width:2rem;height:2rem' class="back" v-show='isIcon' @click="handleBack"></svg-icon>
         <van-search placeholder="请输入搜索关键词" shape="round" v-model="value" @click="handleClick" />
       <!-- <input type="text" @click="handleClick" class="searchInp" placeholder="请搜索"> -->
         </div>
       </div>
       <!-- 更多搜索 -->
       <div class="search-content" v-else > 
             <div class="search-header">
            <svg-icon iconClass="back" style='width:2rem;height:2rem' class="back"  @click="handleBack"></svg-icon>
                <van-search
                    v-model="searchConent"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="onSearch"
                    @cancel="onCancel"
                    @click='onClick'
                >
                
                  <div slot="action" @click="onSearch">搜索</div>
                </van-search>
                   </div>
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
            searchConent:'',
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
        isShow:Boolean,
    },
    computed:{
        isIcon(){
             return this.$route.name === 'search'
        }
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
        handleBack(){
             this.$router.back()
            // if(this.$route.name === 'search'){
            //     this.$router.back()
            // }else{
            //     this.$router.push('/home')
            //       this.searchFlag = true    
            //      this.$emit('update:isShow',true)  //true标志表示要显示首页内容
            // }
        },
        //一点击就输入框就聚焦
        onClick(){
              const search =  document.querySelector('.search-content .van-field__control')
              search.focus()
        },
        async onSearch(){
            if(!this.searchConent){
                Toast({
                    message: '不能为空~',
                    duration: 800
                })
            }else{
                let searchKey = this.searchConent.toLowerCase()
                this.$router.push({
                    path:'/search',
                    query:{
                    name:this.searchConent
                }})
            }
            
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
    .search-header{
        display: flex;
        align-items: center;
        background: #D4237A;
        width:100%;
        justify-content: center;
        .van-search{
            flex:0 0 85%;
        }
         
    }
  
    .van-search--show-action{
        background: #D4237A !important;
    }
    .van-search__action{
        color:#fff;
    }
    .search{
        display: flex;
        justify-content: center;
        background: #D4237A;
        // margin:0.5rem;
           .van-search{
               background:transparent !important;
               padding:0.2rem 0 !important;
               justify-content: center;
           }
         
          
    }
    // 更多搜索
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
    .more-search::before{
        display: block;
        position: absolute;
        top:0;
        left:0;
        width:2rem;
        height:2rem;
        background: #ccc;
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
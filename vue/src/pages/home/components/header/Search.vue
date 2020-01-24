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
                          <span @click='storeItem'>搜索店铺</span>
                    </div>
                     
                 
                </div>

                  <!-- 热门搜索 -->
                <div class='search-hot'>
                    <div style='padding:1rem'>
                         <svg-icon iconClass="search"/>
                         <span style='color:#9C9C9C;padding:0 0.5rem;'>热门搜索</span>
                    </div>
                    
                    <div  class='hot-item'>
                          <span v-for='(item,index) in searchHot' :key='index' @click='hotItem(item)'>{{item.name}}</span>
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
            // searching:false, //判断是否正在搜索中
            value:'',
            // 热门搜索
            searchHot:[
                {name:'水果'},
                {name:'牛奶'},
                {name:'茶饮'},
                {name:'巧克力'},
            ]
        }
    },
    props:{
        isShow:Boolean, //true表示显示搜索
        isSearching:Boolean//判断是否正在搜索中, true为正在搜索
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
               //如果当前正在搜索,则不能点击
              let isOk = false
           if(!this.isSearching){
                this.searchFlag = false
              this.$emit('update:isShow',false)
              isOk = true
           }else{
                 isOk = false
             }
            return isOk
           
        },
        handleBack(){ 
                const num = sessionStorage.count
                this.$router.go(-num)
                //当返回时,把次数初始化
                sessionStorage.count=0;
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
                   this.searching = true
                   //记录每次搜索刷新路由时的历史记录次数
                if(sessionStorage.count){
                    sessionStorage.count=Number(sessionStorage.count)+1;
                }else{
                    sessionStorage.count=1;
                }
                //由于web存储是异步,需要等待存储完成之后,才进行跳转路由刷新
                setTimeout(()=>{
                    let searchKey = this.searchConent.toLowerCase()
                   this.$router.push({
                    path:'/search/'+new Date().getTime(),
                    query:{
                    name:searchKey
                }})
                },500)
             
            }
            
        },
        hotItem(item){
           this.searchConent =  item.name
           this.onSearch()
        },
        storeItem(){
              Toast({
                    message: '暂无相关店铺哦',
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
      width:100%;
      top:0;
      position: fixed;
      z-index:999;
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
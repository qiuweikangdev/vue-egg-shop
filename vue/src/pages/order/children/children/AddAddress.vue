<!--
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-16 17:34:14
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-17 21:52:46
 -->
<template>
<!-- 添加地址 -->
  <div id='addAddress'>
      <!-- 导航栏 -->
      <van-nav-bar title="添加地址"
                 left-arrow
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"></van-nav-bar>
    <!-- vant组件的地址编辑 -->
    
        <van-address-edit :area-list="areaList"
                      show-postal
                      show-set-default
                      show-search-result
                      :search-result="searchResult"  
                      save-button-text="保存并使用"
                      @save="onSave"
                      style="margin-top:3rem" />          

  </div>
</template>

<script>
import areaList from '@/config/area.js'  //省市区区域列表
import{ createNamespacedHelpers } from 'vuex'
const { mapActions,mapMutations } = createNamespacedHelpers('user')
export default {
     data(){
         return {
             areaList:areaList,  //省市区区域列表
             searchResult: []  //详细地址搜索结果
        }
     },
     methods:{
           ...mapMutations(['ADD_USER_SHIPPING_ADDRESS']),
             // 1.返回上级界面
            onClickLeft () {
             this.$router.go(-1);
            },
             // 2. 保存地址
             onSave(content){
                 //content：表单内容
                  let addressID =this.addressId().toString();  //地址ID
                  content['id'] = addressID;
                  content['address'] = content.province + content.city + content.county + content.addressDetail;
                  this.ADD_USER_SHIPPING_ADDRESS({
                    // addressID,
                    content
                  });
                  this.$router.back(); // 保存完之后回退上一步
             },
             //3.生成不重复ID，保证每个地址的ID都不一样
             addressId(){
               //UUID 是 通用唯一识别码（Universally Unique Identifier）
                var lastUuid = 0;  
                return (new Date().getTime() / 1000 + (lastUuid++));  
             }
     }
}
</script>

<style lang="scss" scoped>
#addAddress{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
  .van-address-edit {
    .van-button {
      background-color: #45c763;
    }
  }
}
</style>

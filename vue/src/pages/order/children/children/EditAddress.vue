<template>
 <!-- 订单模块->编辑地址 -->
   <div id="editAddress">
    <van-nav-bar title="编辑地址"
                 left-arrow
                 :fixed=true
                 :border=true
                 @click-left="onClickLeft"></van-nav-bar>
    <van-address-edit :area-list="areaList"
                      show-postal
                      show-delete
                      show-set-default
                      show-search-result
                      :addressInfo="addressInfo"
                      :search-result="searchResult"
                      @save="onSave"
                      @delete="onDelete"
                      style="margin-top:3rem" />
  </div>
</template>

<script>
import areaList from '@/config/area.js'  //省市区区域列表
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("user");
export default {
    data(){
        return {
             areaList: areaList,
            addressInfo: this.$route.params.content, //路由传过来的信息
            searchResult: []
        }
    },
    methods:{
         ...mapMutations(['ADD_USER_SHIPPING_ADDRESS', 'DELETE_USER_SHIPPING_ADDRESS', 'CHANGE_USER_SHIPPING_ADDRESS']),
               // 1.返回上级界面
                onClickLeft () {
                this.$router.go(-1);
                },
          // 2. 保存
                onSave (content) {
                let id = content.id;
                this.CHANGE_USER_SHIPPING_ADDRESS({
                   content
                });
                this.$router.back();
                },
                  // 3.删除
         onDelete (content) {
      let id = content.id;
      this.DELETE_USER_SHIPPING_ADDRESS({ id });
      this.$router.back();
    }
    }
}
</script>
<style lang="scss" scoped>
#editAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
}
</style>

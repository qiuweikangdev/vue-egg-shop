<!--
 * @Descripttion: 首页头部搜索栏
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-13 11:33:39
 -->
<template>
  <div id='header'>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value:''
    }
  },
  methods:{
    onSearch(){
      
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
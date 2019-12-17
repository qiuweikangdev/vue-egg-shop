<template>
 <uploader :options="options" class="uploader-example">
  <uploader-unsupport></uploader-unsupport>
  <uploader-drop>
   <!-- <uploader-btn>select files</uploader-btn> -->
   <uploader-btn :attrs="attrs">select images</uploader-btn>
   <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
  </uploader-drop>
  <!-- <uploader-list></uploader-list> -->
 </uploader>
</template>
 
<script>
 export default {
  data () {
   return {
    options: {
     // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
     target: '//localhost:3000/user/upload',
     testChunks: false
    },
    attrs: {
     accept: 'image/*'
    }
   }
  }
 }
</script>
 
<style>
 .uploader-example {
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
 }
 .uploader-example .uploader-btn {
  margin-right: 4px;
 }
 .uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
 }
</style>
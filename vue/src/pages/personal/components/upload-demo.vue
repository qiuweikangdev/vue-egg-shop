<template>
    <div>
     <a href="javascript:;" class="a-upload">  
        <input type="file" name="" id="fileId" @change='changeFile'>上传头像 
   </a>  
    <button @click='submit'>提交</button>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
   const { mapActions } = createNamespacedHelpers('user')
    export default {
        data(){
            return{
                file:{},
                fileList:[]
            }
        },
        props:{
            imgUrl:{
                type:Array,
            }
        },
        methods:{
            ...mapActions(['upload']),
            changeFile(e){
                var objFile = document.getElementById("fileId");
                  console.log(objFile.files[0]) //获取FileList对象
                  this.file = objFile.files[0]
                
            },
            submit(){
                this.upload(this.file).then((res)=>{
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
   .a-upload {  
            padding: 4px 10px;  
            height: 20px;  
            line-height: 20px;  
            position: relative;  
            cursor: pointer;  
            color: #888;  
            background: #fafafa;  
            border: 1px solid #ddd;  
            border-radius: 4px;  
            overflow: hidden;  
            display: inline-block; 
            text-decoration: none;
        }  
        .a-upload  input {  
            position: absolute;  
            right: 0;  
            top: 0;  
             opacity: 0;  
            filter: alpha(opacity=0);   
            cursor: pointer;
        }  

        .a-upload:hover {  
            color: #444;  
            background: #eee;  
            border-color: #ccc;  
            text-decoration: none 
        }  
</style>
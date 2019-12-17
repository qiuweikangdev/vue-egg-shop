<template>
    <div>
        <div>
            <span>意见反馈</span>
            <span>0/200</span>
        </div>
        
        
       <van-cell-group>
        <van-field
            v-model="message"
            type="textarea"
            placeholder="请输入...."
            rows="3"
            autosize
                />
        </van-cell-group>
          <van-field
            v-model="username"
            required
            clearable
            label="联系电话"
            placeholder="请输入手机号"
                />

        <van-button type="primary" size="large" @click="submitMessage()">提交</van-button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                message:''
            }
        },
        methods:{
           submitMessage(){
               console.log('提交'+ this.message)
           }
        }
               
    }
</script>

<style  scoped>

</style>
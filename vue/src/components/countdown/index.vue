<!--
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-16 17:34:13
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-09 02:22:30
 -->
<template>
    <div>
        <!-- <count-down1 ></count-down1> -->
        <count-down2 ></count-down2>
    </div>
</template> 
<script>
import CountDown1 from './components/demo1'
import CountDown2 from './components/demo2'

    export default {
        components:{CountDown1,CountDown2},
        data(){
            return {
                endTime:''
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
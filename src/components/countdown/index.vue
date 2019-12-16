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
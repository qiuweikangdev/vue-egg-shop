<template>
  <div>
      <van-cell-group>

    <van-switch-cell v-model="checked" :title="mode"   @change="switchColor(checked)" />
    </van-cell-group>
    </div>
</template>

<script>
export default {
    data(){
        return {
            checked:false,
            mode:'夜间模式'
        }
    },
    methods:{
        switchColor(val){
            // console.log(val)
            this.checked = val
            }
    },
    watch:{
        checked(val){
            this.$emit('switch', val)
        }
    } 
}
</script>

<style>

</style>
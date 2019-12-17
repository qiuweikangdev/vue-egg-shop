<template>
    <div >
        <switch-color @switch='switchColor' ></switch-color>
    </div>
</template>

<script>
import SwitchColor from './SwitchTheme'
    export default {
        components:{
            SwitchColor
        },
        methods:{
            switchColor(value){
                if(value){
                    console.log(value)
                    document.getElementsByTagName('html')[0].setAttribute('data-theme','theme3')

                }else{
                    document.getElementsByTagName('html')[0].setAttribute('data-theme','theme1')

                }


        //         const  night = {
        //             fontColor:'#fff',
        //             bgColor:'#000'
        //         }
        //         const day ={
        //             fontColor:'#000',
        //             bgColor:'#fff'
        //         }

        //     let fontColor = value?day.fontColor:night.fontColor
        //     let bgColor = value?day.bgColor:night.bgColor

        //   this.$store.dispatch('settings/changeSetting', {
        //       key: 'fontColor',
        //       value: fontColor
        //     })
        //    this.$store.dispatch('settings/changeSetting', {
        //       key: 'bgColor',
        //       value: bgColor
        //     })   
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
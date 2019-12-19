<template>
    <div class="rules">
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll" ref="bscroll">
            <div class="bscroll-container">
                <ul>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                   <li>1</li><li>1</li><li>1</li>
                </ul>
            </div>
        </div>
        <!-- <p class="x">加载更多...</p> -->
    </div>
</template>
 
<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            dropDown:false
        }
    },
    mounted(){
        this.scrollFn()
    },
    methods:{
        scrollFn(){
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.bscroll, {
                        click: true,
                        scrollY: true,
                        probeType: 3
                    });
                }else{
                    this.scroll.refresh();
                }
                this.scroll.on('scroll', (pos) => {
                    console.log(pos.y,this.dropDown)
                    //如果下拉超过50px 就显示下拉刷新的文字
                    if(pos.y>50){
                        this.dropDown = true
                    }else{
                        this.dropDown = false
                    }
                })
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if(pos.y > 50){
                        console.log("下拉刷新成功")
                        this.dropDown = false
                    }
                    //上拉加载 总高度>下拉的高度+10 触发加载更多
                    if(this.scroll.maxScrollY>pos.y+10){
                        console.log("加载更多")
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题
                        this.scroll.refresh()
                    }
                    console.log(this.scroll.maxScrollY+"总距离----下拉的距离"+pos.y)
                })
                console.log(this.scroll.maxScrollY)
            });
        }
    }
}
</script>
 
 
<style scoped>
.bscroll{
    width: 100%;
    height:500px;
    overflow: hidden;
}
.bscroll-container{
    background: #ff0000;
}
.drop-down{
    position: absolute;
    top:0px;
    lefT:0px;
    width: 100%;
    height: 50px;
    line-height:50px;
    text-align: center;
    font-size:0.8rem;
    color:#CCC;
}
</style>
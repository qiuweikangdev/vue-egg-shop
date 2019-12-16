<template>
  <div class="masonry">
    <div class="item" :key="i" v-for="i in 9" :style="getItemStyle(i)">{{i}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heights: [350, 160, 170, 180, 140, 155, 165, 180, 175],
      colors: [
        "#ef3429",
        "#f68f25",
        "#4ba846",
        "#0476c2",
        "#c077af",
        "#f8d29d",
        "#b4a87f",
        "#d0e4a8",
        "#4dc7ec"
      ]
    };
  },
  methods: {
    getItemStyle(index) {
      return {
        height: "100%",
        background: this.colors[index - 1]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.masonry {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr; // 分为3行
  grid-template-columns: 1fr 1fr 1fr; // 分为3列
  column-gap: 5px; // 列间距5px
//   grid-auto-rows:160px;
  height: 540px;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #999;
    font-size: 40px;
    &:first-child {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
}
</style>
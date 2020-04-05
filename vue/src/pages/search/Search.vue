<!--
 * @Descripttion: 搜索匹配到的结果界面
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-30 18:15:41
 -->
<template>
  <div id="searchConent">
    <Search :isShow.sync="flag" :isSearching="isSearching"></Search>
    <!-- 搜索到的商品 -->
    <div class="food-wrapper" v-show="flag">
      <ul class="food-content">
        <li
          v-for="(produce,index) in goodsInfo"
          :key="index"
          class="food-item"
          @click="goToGoodsDetail(produce)"
        >
          <div class="food-img">
            <img :src="produce.small_image" alt :onerror="errorImg" />
          </div>
          <div class="content-bottom">
            <span>{{produce.name}}</span>
            <span class="spec">{{produce.spec}}</span>
            <div class="price">
              <span class="now-price">{{produce.origin_price | moneyFormat}}</span>
              <span class="orign-price">{{produce.present_price | moneyFormat}}</span>
            </div>
          </div>
        </li>
      </ul>

      <div class="empty-goods" v-show="emptyGoods ||  goodsInfo.length<0">
        <div class="empty-icon">
          <img :src="emptyIcon" alt />
        </div>
        <p>主人对不起...我真的尽力了...</p>
        <p>搜索不到有关数据...</p>
      </div>
    </div>
    <!-- 正在加载组件 -->
    <Loading-Bounce :show="isShowLoading" />
    <!-- <Loading-Dot :show="isShowLoading" /> -->
  </div>
</template>

<script>
import Search from "@/pages/home/components/header/Search";
import { searchGoods } from "@/api/shop";
import LoadingBounce from "@/components/loading/LoadingBounce";
import LoadingDot from "@/components/loading/LoadingDot";
import { Toast } from "vant";
export default {
  components: { Search, LoadingBounce, LoadingDot },
  data() {
    return {
      goodsInfo: [],
      name: this.$route.query.name, //接受传过来路由参数
      errorImg: 'this.src="' + require("@/assets/images/errorImg.png") + '"', //图片失效的替补图片
      flag: true,
      emptyGoods: false, //空商品
      emptyIcon: require("@/assets/images/empty.png"),
      isShowLoading: true //是否显示加载组件
    };
  },
  created() {
    this.getGoodsInfo();
  },
  watch: {
    flag(val) {
      this.flag = val;
    },
    $route(to, from) {
      this.$nextTick(() => {
        this.getGoodsInfo(to.query.name);
        this.$router.go(0);
        //   window.location.reload()
      });
    }
  },
  computed: {
    //判断是否正在搜索
    isSearching() {
      return this.isShowLoading;
    }
  },
  methods: {
    async getGoodsInfo(name) {
      this.isShowLoading = true;
      let result = await searchGoods(this.name || name);
      setTimeout(() => {
        if (result.data.ok === 1) {
          this.emptyGoods = false;
          this.goodsInfo = result.data.message;
          this.isShowLoading = false;
        } else {
          this.emptyGoods = true;
          this.isShowLoading = false;
          Toast({
            message: "暂无相关商品",
            duration: 800
          });
        }
      }, 1000);
    },
    goToGoodsDetail(produce) {
      this.$router.push({
        path: "/goodsDetail",
        query: {
          id: produce.id,
          name: produce.name,
          small_image: produce.small_image,
          present_price: produce.present_price,
          spec: produce.spec,
          total_sales: produce.total_sales,
          origin_price: produce.origin_price
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
#searchConent {
  background: #f5f5f5;
  padding-top: 2rem;
  .food-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    .food-item {
      flex: 0 0 7rem;
      padding: 0.2rem 1.2rem;
      background: #fff;
      border-bottom: 10px #f9f9f9 solid;
    }
    .food-img {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content-bottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.6rem;
      padding: 0.5rem 0;
      .spec {
        padding: 0.2rem 0;
        color: #b4b7bb;
      }
      .price {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 0.7rem;
        }
        .now-price {
          color: #ff3434;
        }
        .orign-price {
          padding-left: 0.5rem;
          text-decoration: line-through;
          color: #555;
        }
      }
    }
  }
  //无商品样式
  .empty-goods {
    color: #888;
    text-align: center;
    font-size: 0.9rem;
    height: 100%;
    width: 100%;
    position: absolute;
    padding-top: 100px;
    background: #f5f5f5;
    overflow: hidden;
    .empty-icon {
      width: 50%;
      margin: 0 auto;
      animation: run 2s infinite;
      transition: all 0.2s linear;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  @keyframes run {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -20px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
}
</style>
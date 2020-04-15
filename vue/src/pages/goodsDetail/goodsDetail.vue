<template>
  <!-- 商品详情界面 -->
  <div id="goods-detail">
    <!-- 导航栏 -->
    <van-nav-bar title="商品详情" :fixed="true" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="detail-wrapper">
      <!-- 商品图 -->
      <div class="goods-image">
        <img :src="goodsInfo.small_image" alt :onerror="errorImg" />
      </div>
      <div class="goods-info">
        <div class="title">{{goodsInfo.name}}</div>
        <div class="sub-title">{{goodsInfo.spec}}</div>
        <div class="easy-like" @click="handleLike">
          <!-- 点赞   -->
          <span class="like-icon">
            <img :src="likeDefault" alt />
          </span>
          <span :class="[{'like-num':true,'liked':flagLike}]">{{likeNum}}</span>
        </div>
        <div class="price">
          <span class="now-price">{{goodsInfo.present_price | moneyFormat}}</span>
          <span class="origin-price">{{goodsInfo.origin_price }}</span>
        </div>
      </div>
    </div>

    <!-- 底部栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" :info="goodsNum" @click="goCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCar" />
      <van-goods-action-button type="danger" text="立即购买" @click="goBuy" />
    </van-goods-action>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"; //导入命名空间辅助函数
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("user");
import { Toast } from "vant";
import { isLiked, goodsLike } from "@/api/shop";
export default {
  data() {
    return {
      goodsInfo: this.$route.query, //接受传过来路由参数
      likeNum: this.$route.query.like_num, //点赞数
      likeDefault: require("@/assets/images/easyLike/like_default.png"), //没点赞图标
      likeSelected: require("@/assets/images/easyLike/like_selected.png"), //已点赞图标
      errorImg: 'this.src="' + require("@/assets/images/errorImg.png") + '"', //图片失效的替补图片
      flagLike: false //点赞标志
    };
  },
  created() {
    //初始化购物车商品数据
    this.INIT_SHOP_CART();
    // this.tabbarSelected()
    if (this.token) {
      this.isGoodsLiked(); //判断用户商品是否已经点赞
    }
  },
  methods: {
    //获取mutaions里的方法，初始化购物车数据 、添加购物车
    ...mapMutations(["INIT_SHOP_CART", "ADD_TO_CART"]),
    //返回上一个界面
    onClickLeft() {
      this.$router.back();
    },
    //添加到购物车
    addToCar() {
      this.ADD_TO_CART(this.goodsInfo);
    },
    //去购买
    goBuy() {
      console.log(this.goodsInfo, "goodsInfo");
      this.$router.push({
        name: "order",
        params: {
          product_image: this.goodsInfo.small_image,
          present_price: this.goodsInfo.present_price
        }
      });
      //   Toast({
      //     message: "暂未实现",
      //     duration: 800
      //   });
    },
    //点赞
    async handleLike() {
      if (this.token) {
        let result = await goodsLike(this.goodsInfo.id, this.likeNum);
        if (result.data.isLiked == 1) {
          this.flagLike = true;
          this.likeNum = result.data.likeNum;
          document.querySelector(".like-icon img").src = this.likeSelected;
        } else {
          this.flagLike = false;
          this.likeNum = result.data.likeNum;
          document.querySelector(".like-icon img").src = this.likeDefault;
        }
      } else {
        this.$router.push("/login");
      }
    },
    //去购物车
    goCart() {
      this.$router.push({ name: "cart" });
    },
    //判断当前商品是否已点赞
    async isGoodsLiked() {
      let result = await isLiked(this.goodsInfo.id);
      if (result.data.isliked === 0) {
        document.querySelector(".like-icon img").src = this.likeDefault;
      } else {
        document.querySelector(".like-icon img").src = this.likeSelected;
        this.likeNum = result.data.likeNum;
        this.flagLike = true;
      }
    }
  },
  computed: {
    ...mapState(["shopCart", "token"]),
    //购物车数量
    goodsNum() {
      let num = 0;
      Object.values(this.shopCart).forEach(goods => {
        num += goods.num;
      });
      if (num > 0) {
        return num;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
#goods-detail {
  .detail-wrapper {
    display: flex;
    flex-direction: column;
    .goods-image {
      padding: 1rem;
      border-bottom: 3px #eff8f5 solid;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-info {
      font-size: 14px;
      padding: 0.5rem 0.3rem;
      border-bottom: 2px #eff8f5 solid;
      position: relative;
      div {
        padding-bottom: 0.6rem;
      }
      .title {
        width: 60%;
      }
      .sub-title {
        font-size: 12px;
        color: #a3a3a3;
      }
      //点赞的样式
      .liked {
        color: #6cbd45 !important;
      }
      .easy-like {
        position: absolute;
        right: 30px;
        top: 10px;
        display: flex;
        align-items: center;
        color: gray;
        border: 1px #a3a3a3 solid;
        padding: 0.2rem 0.5rem;
        span {
          padding-left: 0.5rem;
        }
        .like-num {
          display: inline-block;
          font-weight: bold;
          color: #ccc;
        }
        img {
          width: 1rem;
          height: 1rem;
        }
      }
      .price {
        .origin-price {
          text-decoration: line-through;
          color: #333;
        }
        .now-price {
          font-size: 16px;
          color: #d51230;
        }
        span {
          padding: 0 0.2rem;
        }
        .total-sales {
          float: right;
          color: #d51230;
        }
      }
    }
  }
}
</style>
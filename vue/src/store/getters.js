/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-16 17:34:14
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-06 13:45:17
 */
const getters = {
    token: state => state.user.token,
    //价格总价
    totalPrice(state){
        let totalPrice = 0;
        state.user.shopCart.forEach(goods=>{
            if(goods.checked){
                //由于vant组件的price单位是分,所以我们要转换为分
                totalPrice += (goods.price * goods.product_amount * 100)
            }
        })
        return totalPrice
    },
    //购物车商品数量
    goodsNum(state){
        let num = 0;
      state.user.shopCart.forEach(goods=>{
            num +=goods.num;
        })
        return num

    },
    //选中商品
    selectGoods(state){
        let goodsData = []
        let shopCart = state.user.shopCart;
        shopCart.map((item)=>{
            if(item.checked){
                goodsData.push(item)
            }
        })
        return goodsData
    },
      //选中商品金额
      selectGoodsPrice(state){
        let totalPrice = 0;
        state.user.shopCart.map((item)=>{
            if(item.checked){
                totalPrice +=(item.price *item.product_amount * 100)
            }
        })
        return totalPrice;
    },
    //选中商品的数量
    selectedCount(state){
        let count = 0;
        state.user.shopCart.map((item)=>{
            if(item.checked){
                count++
            }
        })
        return count;
    }


}
export default getters
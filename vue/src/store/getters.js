/*
 * @Descripttion: 
 * @version: 
 * @Author: qqqiu
 * @Date: 2019-12-16 17:34:14
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-03-01 19:07:54
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

    }
}
export default getters
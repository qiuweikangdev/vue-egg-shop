const getters = {
    token: state => state.user.token,
    //价格总价
    totalPrice(state){
        let totalPrice = 0;
        Object.values(state.user.shopCart).forEach(goods=>{
            if(goods.checked){
                totalPrice += (goods.price * goods.num * 100)
            }
        })
        return totalPrice
    },
    //购物车商品数量
    goodsNum(state){
        let num = 0;
        Object.values(state.user.shopCart).forEach(goods=>{
            num +=goods.num;
        })
        return num

    }
}
export default getters
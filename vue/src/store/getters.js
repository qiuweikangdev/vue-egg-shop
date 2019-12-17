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
    }
}
export default getters
import { login, register, authorization, getUserInfo, upload, captcha, verifyCode } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {
    USER_INFO,
    SET_TOKEN,
    INIT_USER_INFO,
    INIT_USER_SHIPPING_ADDRESS,
    ADD_USER_SHIPPING_ADDRESS,
    DELETE_USER_SHIPPING_ADDRESS,
    CHANGE_USER_SHIPPING_ADDRESS,
    ADD_GOODS,
    ADD_TO_CART,
    INIT_SHOP_CART,
    REDUCE_GOODS,
    SINGLE_SELECT_GOODS,
    ALL_SELECT_GOODS
} from './mutation-types'
// 引入本地存储
import {
    getLocalStore,
    setLocalStore,
    removeLocalStore,
} from '@/config/global'
import Vue from 'vue'
import router from '@/router'
import {
    Toast
} from 'vant'
const state = {
    token: getToken(),
    userInfo: {}, // 用户信息
    shippingAddress: [], //配送地址
    shopCart: {} //用户购物车商品

}

const mutations = {
    // 1、设置token
    [SET_TOKEN](state, token) {
        state.token = token
    },

    //2 、保存用户信息到本地
    [USER_INFO](state, userInfo) {
        //2.1 同步state数据
        state.userInfo = userInfo;
        //2.2 将数据更新到本地
        setLocalStore('userInfo', state.userInfo);
    },
    //3、初始化获取用户信息
    [INIT_USER_INFO](state) {
        // 3.1 先存本地用户数据
        let initUserInfo = getLocalStore('userInfo');
        if (initUserInfo) {
            state.userInfo = JSON.parse(initUserInfo);
        }
    },
    //4.初始化获取用户收货地址
    [INIT_USER_SHIPPING_ADDRESS](state) {
        let initUsershippingAddress = getLocalStore('shippingAddress');
        if (initUsershippingAddress) {
            state.shippingAddress = JSON.parse(initUsershippingAddress);
            console.log(state.shippingAddress, 'xx')
        } else {
            state.shippingAddress = [];
        }
    },
    //5.增加用户的收获地址 
    [ADD_USER_SHIPPING_ADDRESS](state, { content }) {
        // 4.1 取出state中的shippingAddress
        let shippingAddress = state.shippingAddress;
        // 4.2 给shippingAddress赋值
        shippingAddress.push(content);
        // 4.3 产生新对象
        state.shippingAddress = [...shippingAddress];
        // 4.4 将数据存储到本地
        setLocalStore('shippingAddress', state.shippingAddress);
    },
    //6. 删除用户的收获地址
    [DELETE_USER_SHIPPING_ADDRESS](state, {
        id
    }) {
        // 6.1 取出state中的shippingAddress
        let shippingAddress = state.shippingAddress;
        // 6.2 根据地址的id删除 
        for (let i = 0; i < shippingAddress.length; i++) {
            if (shippingAddress[i].id == id) {
                shippingAddress.splice(i, 1);
                break;
            }
        }
        // 6.3更新store数据
        state.shippingAddress = [...shippingAddress];
        // 6.4更新本地数据
        setLocalStore('shippingAddress', state.shippingAddress);
    },
    //7.修改用户地址信息
    [CHANGE_USER_SHIPPING_ADDRESS](state, { content }) {
        // 7.1 取出state中的shippingAddress
        let shippingAddress = state.shippingAddress;
        // 7.2查找id的那个对象
        for (let index = 0; index < shippingAddress.length; index++) {
            if (shippingAddress[index].id == content.id) {
                // console.log(shippingAddress[index]);
                shippingAddress[index] = content;
                break;
            }
        }
        // 7.3更新store数据
        state.shippingAddress = [...shippingAddress];
        // 7.4更新本地数据
        setLocalStore('shippingAddress', state.shippingAddress);
    },
    //8 添加商品
    [ADD_GOODS](state, {
        goodsID,
        goodsName,
        smallImage,
        goodsPrice
    }) {
        let shopCart = state.shopCart;
        // 8.1 根据ID判断商品是否存在
        if (shopCart[goodsID]) {
            // console.log(shopCart)
                //让数量goodsID里面的num +1
            shopCart[goodsID]['num']++;
        } else {
            // 8.2 不存在则设置shopCart购物车商品默认值
            shopCart[goodsID] = {
                    'num': 1, //商品数量
                    'id': goodsID, //商品ID
                    'name': goodsName, //商品名称
                    'price': goodsPrice, //商品价格
                    'smallImage': smallImage, //商品图片
                    'checked': true //是否选中
                }
                // 8.3 给shopCart产生新对象
            state.shopCart = {
                ...shopCart
            };
            // 8.4 将商品数据存储到本地
            setLocalStore('shopCart', state.shopCart);
        }


    },
    //9.添加商品到购物车
    [ADD_TO_CART](state, goods) {
        if (state.token) {
            //9.1 如何没有登录跳转到登录界面
            //调用ADD_GOODS方法添加商品
            let shopCart = state.shopCart
            if (shopCart[goods.id]) {
                shopCart[goods.id]['num']++;
            }
            //注意在模块下mutations提交是 '模块名/函数名'，否则会报错
            setTimeout(() => {
                this.commit("user/ADD_GOODS", {
                    goodsID: goods.id, //商品ID
                    goodsName: goods.name, //商品名
                    smallImage: goods.small_image, //图片地址
                    goodsPrice: goods.price //价格
                })
                Toast({
                    message: '成功加入购物车',
                    duration: 800
                })
            }, 900);
        } else {
            // 9.2 如何没有登录跳转到登录界面
            router.push('/login')
        }
    },
    //10.页面初始化,获取本地购物车的数据
    [INIT_SHOP_CART](state) {
        // 10.1 先存本地取购物车数据
        let initShopCart = getLocalStore('shopCart');
        if (initShopCart) {
            // 10.2 如何购物车有数据那么就把它通过对象的方式赋值给store
            state.shopCart = JSON.parse(initShopCart);
        }
    },
    //11.减少商品
    [REDUCE_GOODS](state,{goodsID}){
        //11.1取出state中的商品数据
        let shopCart = state.shopCart;
         //12.1通过商品ID来找到这个商品
        let goods = shopCart[goodsID];
        if(goods){
            if (goods['num'] > 0) {
                // 12.2 减少商品数量
                goods['num']--;
            }else{
                //12.3等于0的时候就删除商品
                delete shopCart[goodsID];
            }
         
             //12.4 更新state中的商品数据
             state.shopCart = {
                ...shopCart
             }
            //12.5 更新本地中的商品数据
            setLocalStore('shopCart', state.shopCart);
        }
    },
    //12.单个商品复选框事件
     [SINGLE_SELECT_GOODS](state,{goodsID}){
            // 12.1 取出state中的商品数据
          let shopCart = state.shopCart;
           // 12.2 根据商品id取到goods
         let goods = shopCart[goodsID];
        // 12.3 判断商品是否存在
        if (goods) {
            //12.4 判断checked是否存在
            if(goods.checked){
                goods.checked = !goods.checked;
            }else{
                //12.5如果不存在，则设置checked属性
                Vue.set(goods,'checked')

            }
        }
          // 12.6 将数据更新到本地
        state.shopCart = {
            ...shopCart
        }
         // 12.7 将数据更新到本地
         setLocalStore('shopCart', state.shopCart);
     },
     //13. 全选商品事件
     [ALL_SELECT_GOODS](state,{isCheckedAll}){
          // 13.1 取出state中的商品数据
          let shopCart = state.shopCart;
          Object.values(shopCart).forEach((goods)=>{
              if(goods.checked && !isCheckedAll){
                  //当商品有选中且取消全选时
                  goods.checked = false;
                //   goods.checked = !isCheckedAll;
              }else{
                   //当没有商品选中且全选时
                goods.checked = true;
                // Vue.set(goods, 'checked', true);
              }
          })
          // 13.2
          state.shopCart = {
            ...shopCart
         };
       // 13.3 将数据更新到本地
        setLocalStore('shopCart', state.shopCart);
     }
}

const actions = {
    // 1、注册
    register({ commit }, userInfo) {
        const { username, password, avatar, fileName, authCode } = userInfo
        return new Promise((resolve, reject) => {
            register(username.trim(), password, avatar, fileName, authCode)
                .then(res => {
                    const { data } = res
                    if (data.code === 200 && data.message === '注册成功' || data.message === '用户名已存在,注册失败') {
                        resolve(data)
                    } else {
                        reject()
                    }

                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    // 2、登录    
    login({ commit }, userInfo) {
        const { username, password, authCode } = userInfo
        return new Promise((resolve, reject) => {
            login(username.trim(), password, authCode)
                .then(res => {
                    const { data } = res
                    if (data.message === '验证码错误') {
                        resolve(res.data)
                    } else if (data.code === 200 && data.token) {
                        commit(SET_TOKEN, data.token)
                            //登录成功之后获取token，设置token
                        setToken(data.token)
                        resolve(res.data)
                    } else if (data.message === '用户名不存在' || data.message === '密码错误') {
                        resolve(data)
                    } else {
                        reject()
                    }

                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    //3、后端判断请求头有无 token，没有或者 token 过期，返回401；
    authorization({ commit }) {
        return new Promise((resolve, reject) => {
            //调用后台接口授权，来获取token
            authorization().then(res => {
                if (parseInt(res.data.code) === 401) {
                    //token过期
                    reject(new Error('token error'))
                } else {
                    //当用户一直在操作，进行跳转路由
                    //我们希望延迟token的过期时间
                    //再设置token时间来延迟token的过期时间
                    setToken(res.data.token)
                        // console.log(res)
                    resolve()
                }
            }).catch((err) => {
                reject(err)
            })
        })
    },
    //上传头像
    // upload({ commit }, file) {
    //     return new Promise((resolve, reject) => {
    //         upload(file).then(res => {
    //             console.log(res.data)
    //             resolve(res.data)
    //         }).catch(err => {
    //             reject(err)
    //         })
    //     })
    // },

    // 4、验证码
    captcha() {
        return new Promise((resolve, reject) => {
            captcha()
                .then(res => {
                    const { data } = res
                    if (data.code === 200 && data.captcha) {
                        resolve(res)
                    } else {
                        reject()
                    }

                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    // 5. 同步用户的信息
    syncUserInfo({ commit }, userInfo) {
        commit(USER_INFO, userInfo);
    },



    //  6、获取用户相关信息 (根据Token)
    getUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(res => {
                    const { data } = res
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
                // getUserInfo().then(res=>{
                //     const { data } = res
                //     console.log(data)
                //     // if(!data){
                //     //     reject('验证失败,重新登录')
                //     // }
                //     // const { name,avatar} = data
                //     // commit(SET_Name,name)
                //     // commit(SET_AVATAR,avatar)
                // })
        })
    },

    //  7、退出登录
    logout({ commit }, state) {
        removeToken()
        commit('SET_TOKEN', '')
    }

    //8.
}


export default {
    namespaced: true, //命名空间 
    state,
    mutations,
    actions
}
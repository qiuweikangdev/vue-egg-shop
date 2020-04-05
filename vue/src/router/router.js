export default [{
        //主界面 一级路由
        path: '/',
        redirect: '/home', //重定向到首页
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/index/index.vue'),
        // 二级路由
        children: [{
                // 首页
                path: 'home',
                name: 'home',
                meta: {
                    login_require: false, //是否需要登录
                    showBottomTabBar: true, //是否显示底部标签栏
                    keepAlive: true // 是否数据缓存
                },
                component: () =>
                    import ('@/pages/home/Home.vue')
            }, //分类
            {
                path: '/category',
                name: 'category',
                meta: {
                    login_require: false,
                    showBottomTabBar: true,
                    keepAlive: true
                },
                component: () =>
                    import ('@/pages/category/Category.vue')

            }, {
                // 个人中心
                path: 'personal',
                name: 'personal',
                meta: {
                    login_require: false,
                    showBottomTabBar: true,
                    keepAlive: true
                },
                component: () =>
                     import ('@/pages/personal/Personal.vue'),  
            }, {
                // 购物车
                path: '/cart',
                name: 'cart',
                meta: {
                    login_require: true,
                    keepAlive: true,
                    showBottomTabBar: true,
                },
                component: () =>
                    import ('@/pages/cart/Cart.vue')
            },
            {
                // 订单
                path: '/myOrder',
                name: 'myOrder',
                meta: {
                    login_require: true
                },
                component:()=>
                    import('@/pages/personal/components/myOrder/index'),
            },
            {
                // 搜索
                path: '/search/:name',
                name: 'search',
                meta: {
                    login_require: false,
                    showBottomTabBar: false,
                    keepAlive: true
                },
                component: () =>
                    import ('@/pages/search/Search.vue')
            },
            {
                //商品详情
                path: '/goodsDetail',
                name: 'goodsdetail',
                meta: {
                    login_require: false,
                    showBottomTabBar: false,
                    keepAlive: false
                },
                component: () =>
                    import ('@/pages/goodsDetail/goodsDetail.vue')
            },
        ]
    },
    //注册
    {
        path: '/register',
        name: 'register',
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/personal/components/register')
    },
    //登录
    {
        path: '/login',
        name: 'login',
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/personal/components/login')
    },
    //建议反馈
    {
        path: '/suggest',
        name: 'suggest',
        meta: {
            login_require: true
        },
        component: () =>
            import ('@/pages/personal/components/Suggest.vue')
    },
    {
        path: '/upload-demo',
        component: () =>
            import ('@/pages/personal/components/upload-demo.vue')
    },
    {
        path: '/upload',
        component: () =>
            import ('@/pages/personal/components/upload.vue')
    },
    //倒计时
    {
        path: '/countdown-1',
        component: () =>
            import ('@/components/countdown/index.vue')
    },
    //加载订单相关的组件
    {
        // 订单
        path: '/order',
        name: 'order',
        meta: {
            login_require: true
        },
        component: () =>
            import ('@/pages/order/Order.vue'),
        children: [{
            meta: {
                login_require: true
            },
            //我的地址
            path: 'myAddress',
            name: 'myAddress',
            component: () =>
                import ('@/pages/order/children/MyAddress.vue'),
            children: [{
                    //新增地址
                    path: 'AddAddress',
                    name: 'addAddress',
                    meta: {
                        login_require: true
                    },
                    component: () =>
                        import ('@/pages/order/children/children/AddAddress.vue'),
                },
                {
                    //编辑地址
                    path: 'editAddress',
                    name: 'editAddress',
                    meta: {
                        login_require: true
                    },
                    component: () =>
                        import ('@/pages/order/children/children/EditAddress.vue'),
                }
            ]
        }]
    }
  
]
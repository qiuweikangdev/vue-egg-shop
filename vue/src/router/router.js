export default [{
        //首页
        path: '/',
        name: 'home',
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/home/Home.vue')
    },
    //注册
    {
        path: '/register',
        name: 'register',
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/personal/components/Register')
    },
    //登录
    {
        path: '/login',
        name: 'login',
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/personal/components/Login')
    },
    //商品列表
    {
        path: '/goods',
        name: 'goods',
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/Goods.vue')
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
    //个人中心
    {
        path: '/personal',
        name: 'personal',
        meta: {
            login_require: false
        },
        component: () =>
            import ('@/pages/personal/Personal.vue')
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
    {
        path: '/switch-theme',
        component: () =>
            import ('@/pages/personal/components/SwitchTheme.vue')
    },
    {
        path: '/tabbar-demo',
        component: () =>
            import ('@/pages/tabBar/tabBar.vue')
    },
    //倒计时
    {
        path: '/countdown-1',
        component: () =>
            import ('@/components/countdown/index.vue')
    },
    //购物车
    {
        path: '/cart',
        name: 'cart',
        component: () =>
            import ('@/pages/cart/Cart.vue')

    },
    //分类
    {
        path: '/category',
        name: 'category',
        component: () =>
            import ('@/pages/category/Category.vue')

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
    },
    // {
    //     path: '/myAddress',
    //     name: 'myAddress',
    //     meta: {
    //         login_require: true
    //     },
    //     component: () =>
    //         import ('@/pages/order/children/MyAddress.vue')

    // },
    //瀑布流
    {
        path: '/test',
        component: () =>
            import ('@/components/test.vue')

    }
]
// 引入vue
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'


// 注册（使用）路由
Vue.use(VueRouter)

// 定义路由
const routes = [
  // 登录表单页
  {
    path: '/login',  // 路径
    name: 'login',   // 名字
    component: () => import('../views/Login/Login')   // 引入登入组件
  },
  // home首页
  {
    path: '/', 
    component: () => import('../views/Index/Index'),  // 引入后端首页组件
    children: [
      {
        path: '',
        component: () => import('../views/Home/Home')
      },
      {
        path: '/configuration',       // 系统配置
        component: () => import('../views/Configuration/Configuration')
      },
      {
        path: '/accountadd',          // 添加账号
        component: () => import('../views/AccountAdd/AccountAdd')
      },
      {
        path: '/accountmanage',       // 账号管理
        component: () => import('../views/AccountManage/AccountManage')
      },
      {
        path: '/modifypassword',      // 修改密码
        component: () => import('../views/ModifyPassword/ModifyPassword')
      },
      {
        path: '/goodsadd',             // 添加商品
        component: () => import('../views/GootsAdd/GootsAdd')
      },
      {
        path: '/goodsmanage',          // 商品管理
        component: () => import('../views/GoodsManage/GoodsManage')
      },
      {
        path: '/personal',             // 个人中心
        component: () => import('../views/Personal/Personal')
      },
      {
        path: '/salesstatistics',       // 销售统计
        component: () => import('../views/SalesStatistics/SalesStatistics')
      },
      {
        path: '/classifymanage',
            path: '/classifymanage',          // 分类管理
            component: () => import('../views/ClassifyManage/ClassifyManage')

      },
      {
        path: '/stockadd',              // 添加库存
        component: () => import('../views/StockAdd/StockAdd')
      },
      {
        path: '/stockmanage',            // 库存管理
        component: () => import('../views/StockManage/StockManage')
      },
      {
        path: '/memberadd',           // 添加会员
        component: () => import('../views/MemberAdd/MemberAdd')
      },
      {
        path: '/membermanage',          // 会员管理
        component: () => import('../views/MemberManage/MemberManage')
      },
      {
        path: '/saleslist',             // 销售列表
        component: () => import('../views/SalesList/SalesList')
      },
      {
        path: '/goodscheckout',        // 商品出库
        component: () => import('../views/GoodsCheckout/GoodsCheckout')
      },
      {
        path: '/goodsrejected',            // 商品退货
        component: () => import('../views/GoodsRejected/GoodsRejected')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})
// 导出路由实例对象
export default router

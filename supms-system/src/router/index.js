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
    name: 'index',  
    component: () => import('../views/Index/Index'),  // 引入后端首页组件
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home/Home')
      },
      {
        path: '/configuration',       // 系统配置
        name: 'configuration',
        component: () => import('../views/Configuration/Configuration')
      },
      {
        path: '/accountadd',          // 添加账号
        name: '/accountadd',
        component: () => import('../views/AccountAdd/AccountAdd')
      },
      {
        path: '/accountmanage',       // 账号管理
        name: '/accountmanage',
        component: () => import('../views/AccountManage/AccountManage')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 导出路由实例对象
export default router

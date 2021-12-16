// 引入vue
import Vue from 'vue'
// 引入axios
import axios from 'axios'
// 引入element-ui样式和组件
import ElementUI from 'element-ui';    //组件
import 'element-ui/lib/theme-chalk/index.css';  //样式
// 结构引入部分elementui的Message组件功能
import {Message} from 'element-ui';

// 引入顶级组件
import App from './App.vue'
// 引入路由
import router from './router'
// 引入公用样式
import '@/style/common.less';


// 注册/使用emementui
Vue.use(ElementUI);
// 把axios挂在Vue的原型上 所有vue的实例对象共享
Vue.prototype.axios = axios;

// 全局路由守卫 拦截所有路由
router.beforeEach((to, from , next) => {
  // 获取token
  const token = window.localStorage.getItem('token');
  // 判断是否有token
  if (token) {
    // 放行
    next();
  } else {
    if (to.path === '/login'){
      // 放行
      next();
    } else {
      // 弹出提示
      Message.error('请登录以后再操作！');
      // 跳到登录页（不是登录页进来的就没有token）
      return next({"path": "/login"})
    }
  }
})

// 阻止生产提示
Vue.config.productionTip = false

// 创建vue实例对象，挂载dom，把路由和app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

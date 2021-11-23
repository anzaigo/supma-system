// 引入vue
import Vue from 'vue'
// 引入element-ui样式和组件
import ElementUI from 'element-ui';    //组件
import 'element-ui/lib/theme-chalk/index.css';  //样式
// 引入顶级组件
import App from './App.vue'
// 引入路由
import router from './router'
// 引入公用样式
import '@/style/common.less';


// 注册/使用emementui
Vue.use(ElementUI);

// 阻止生产提示
Vue.config.productionTip = false

// 创建vue实例对象，挂载dom，把路由和app顶级组件传入 渲染进入dom容器中
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

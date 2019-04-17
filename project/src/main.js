/* 入口文件 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/style/css/common.less"
import "./assets/style/css/iconfont.css"

// 引入封装过的axios
import request from "./api/request"



// 添加原型
Vue.prototype.req = request;

Vue.use(ElementUI)

Vue.config.productionTip = false

// 设置路由守卫
router.beforeEach((to,from,next) => {
  let token = window.localStorage.getItem("token");
  // 判断token是否存在
  if(!token){
    if(to.path === "/login"){
      next();
    }else{
      next({path:"/login"})
    }
  }else{
    next();
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

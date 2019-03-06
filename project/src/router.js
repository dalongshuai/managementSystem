// 引入资源模块
import Vue from 'vue'
import Router from 'vue-router'

// 使用路由
Vue.use(Router)

export default new Router({
  routes: [
    // 系统信息
    {
      path:"/index",
      component: () => import('./views/Index/Index.vue'),
      children:[
        {path:"./systeminfo",component: () => import('./views/Systeminfo/Systeminfo.vue')}
      ]
    },

    // 登录
    {path:"/login",component: () => import('./views/Login/Login.vue')},

    {path:"/accountadd",component: () => import('./views/Accountadd/Accountadd.vue')},
    {path:"/accountmanage",component: () => import('./views/Accountmanage/Accountmanage.vue')},
    {path:"/goodsadd",component: () => import('./views/Goodsadd/Goodsadd.vue')},
    {path:"/goodsmanage",component: () => import('./views/Goodsmanage/Goodsmanage.vue')},
    {path:"/passwordchange",component: () => import('./views/Passwordchange/Passwordchange.vue')},
    {path:"/stockadd",component: () => import('./views/Stockadd/Stockadd.vue')},
    {path:"/stockmanage",component: () => import('./views/Stockmanage/Stockmanage.vue')},
    {path:"/systeminfo",component: () => import('./views/Systeminfo/Systeminfo.vue')},
  ]
})
// 引入资源模块
import Vue from 'vue'
import Router from 'vue-router'

// 使用路由
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/index",component: () => import('./views/Index/Index.vue'),
      children:[
        // 默认显示系统信息
        {path:"",component: () => import('./views/Systeminfo/Systeminfo.vue')},

        // 账户管理
        {path:"/index/accountadd",component: () => import('./views/Accountadd/Accountadd.vue')},
        {path:"/index/accountmanage",component: () => import('./views/Accountmanage/Accountmanage.vue')},
        {path:"/index/passwordchange",component: () => import('./views/Passwordchange/Passwordchange.vue')},
        {path:"/index/personcenter",component: () => import('./views/Personcenter/Personcenter.vue')},

        // 商品管理
        {path:"/index/goodsadd",component: () => import('./views/Goodsadd/Goodsadd.vue')},
        {path:"/index/goodsmanage",component: () => import('./views/Goodsmanage/Goodsmanage.vue')},

        // 库存管理
        {path:"/index/stockadd",component: () => import('./views/Stockadd/Stockadd.vue')},
        {path:"/index/stockmanage",component: () => import('./views/Stockmanage/Stockmanage.vue')},

        // 系统信息
        {path:"/index/systeminfo",component: () => import('./views/Systeminfo/Systeminfo.vue')},

        // 统计管理
        {path:"/index/salestatis",component: () => import('./views/Salestatis/Salestatis.vue')},
        {path:"/index/instatis",component: () => import('./views/Instatis/Instatis.vue')}

        
      ]
    },
    // 登录
    {path:"/",component: () => import('./views/Login/Login.vue')},
    {path:"/login",component: () => import('./views/Login/Login.vue')},
  ]
})
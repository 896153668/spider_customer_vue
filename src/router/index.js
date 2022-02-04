// import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import Home from "../views/Home";
// import Info from "../views/Info";
import Login from "../views/Login.vue";
// import Main from "../views/Main";
import Setting from "../views/Setting";
import Appointment from "../views/Appointment";
import Paymethod from "../views/PayMethod";



// Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          // 页面标题title
          title: '首页'
        }
      },
      {
        path: '/setting',
        component: Setting,
        meta: {
          // 页面标题title
          title: '设置'
        }
      },
      {
        path: '/appointment',
        component: Appointment,
        meta: {
          // 页面标题title
          title: '预约详情'
        }
      },
      {
        path: '/paymethod',
        component: Paymethod,
        meta: {
          // 页面标题title
          title: '方式详情'
        }
      },
      // {
      //   path: '/info',
      //   component: Info,
      //   meta: {
      //     // 页面标题title
      //     title: '详细信息'
      //   }
      // },
    ]
  },
  {
    path: '/',
    name: 'Begin',
    redirect: '/login',

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      // 页面标题title
      title: '后台管理'
    }
  },
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// Vue.use(router)
export default router

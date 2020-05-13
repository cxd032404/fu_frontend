import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import '../../static/css/style.css'

//andyis routerCur
import index from '@/pages/home/index'
import aacc from '@/pages/home/aacc'
import apply from '@/pages/home/apply'
// import publicapi from '@/pages/publicapi/publicapi'

import login from '@/pages/login/login'
import register from '@/pages/login/register'
import forget from '@/pages/login/forget'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component:index
      // component: () => import("@/pages/home/index")
    },{
      path: '/aacc',
      name: 'aacc',
      component:aacc

    },{
      path: '/apply',
      name: 'apply',
      component:apply
    },{
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/forget',
      name: '/forget',
      component: forget
    }

  ]
})

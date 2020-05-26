import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import '../../static/css/style.css'

//andyis routerCur
import index from '@/pages/home/index'
import culture from '@/pages/wenti/culture'
import activity from '@/pages/wenti/tianlai/bisai/activity'

import activityrecord from '@/pages/wenti/tianlai/bisai/activityrecord'
import customer from '@/pages/wenti/tianlai/bisai/customer'
import classs from '@/pages/wenti/tianlai/bisai/classs'
import activeshare from '@/pages/wenti/tianlai/bisai/activeshare'
import class_details from '@/pages/wenti/tianlai/bisai/class_details'
import honor from '@/pages/wenti/tianlai/bisai/honor'
import honor_details from '@/pages/wenti/tianlai/bisai/honor_details'
// import publicapi from '@/pages/publicapi/publicapi'

//公用底部



import login from '@/pages/login/login'
import register from '@/pages/login/register'
import logincode from '@/pages/login/logincode'
import my from '@/pages/mycenter/my'
import loginhome from '@/pages/login/loginhome'
//活动类型
Vue.use(Router)


const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component:index,
      meta: {
        keepAlive: true,
      }
    },{
      path: '/loginhome',
      name: 'loginhome',
      component:loginhome,

    },{
      path: '/logincode',
      name: 'logincode',
      component: logincode
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/activity',
      name: 'activity',
      component: activity
    },{
      path: '/culture',
      name: 'culture',
      component: culture
    },{
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        keepAlive: true,
      }
    },{
      path: '/activityrecord',
      name: 'activityrecord',
      component: activityrecord
    },{
      path: '/customer',
      name: 'customer',
      component: customer
    },{
      path: '/activeshare',
      name: 'activeshare',
      component: activeshare
    },{
      path: '/classs',
      name: 'classs',
      component:classs
    },{
      path: '/class_details',
      name: 'class_details',
      component:class_details
    },{
      path: '/honor',
      name: 'honor',
      component:honor
    },{
      path: '/honor_details',
      name: 'honor_details',
      component:honor_details
    },

  ]
})

export default router

router.beforeEach((to, from, next) => {
  // localStorage.setItem("token","2fd18e36712e604dc33f3af085296e3e");
  // localStorage.setItem("openid","oWa2wt4DkjQd6kIpjlBXvuOojpGI");
  // return
  // alert(JSON.stringify(to))
  // alert(JSON.stringify(from))
  console.log(to)
  console.log(from)

  var token = localStorage.getItem("token")

   let tokenid = localStorage.getItem("token");
    if (to.meta.keepAlive){
      //
			if(tokenid){
				next()
			}else {
				next({
					path:'/logincode'
				})
			}



    }else{
				next()
    }

})

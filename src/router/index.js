import Vue from 'vue'
import Router from 'vue-router'


import txmapa from '@/components/txmapa'
// import '../../static/css/style.css'
// import '../../static/css/animate.css'

//andyis routerCur
import index from '@/pages/home/index'
import indexNew from '@/pages/home/indexNew'
import culture from '@/pages/wenti/culture'
import activity from '@/pages/wenti/tianlai/bisai/activity'
import activity2 from '@/pages/wenti/tianlai/bisai/activity2'
import activityrecord from '@/pages/wenti/tianlai/bisai/activityrecord'
import customer from '@/pages/wenti/tianlai/bisai/customer'
import classs from '@/pages/wenti/tianlai/bisai/classs'
import classslist from '@/pages/wenti/tianlai/bisai/classslist'
import activeshare from '@/pages/wenti/tianlai/bisai/activeshare'
import class_details from '@/pages/wenti/tianlai/bisai/class_details'
import honor from '@/pages/wenti/tianlai/bisai/honor'
import honor_details from '@/pages/wenti/tianlai/bisai/honor_details'
import pace from '@/pages/wenti/tianlai/bisai/pace'
import group from '@/pages/wenti/tianlai/bisai/group'
import author from '@/pages/public/author'
// import publicapi from '@/pages/publicapi/publicapi'

//公用底部

//地图组件
import map from '@/pages/home/map'
import mapgd from '@/pages/home/mapgd'
import map2 from '@/pages/home/map2'
import mapupd from '@/pages/home/mapupd'
import rili from '@/pages/home/rili'


import login from '@/pages/login/login'
import register from '@/pages/login/register'
import logincode from '@/pages/login/logincode'
import my from '@/pages/mycenter/my'
import myinfo from '@/pages/mycenter/myinfo'


import shezhi from '@/pages/mycenter/shezhi'
import contactus from '@/pages/mycenter/contactus'
import loginhome from '@/pages/login/loginhome'

import shezhixy from '@/pages/mycenter/shezhi_xy'
import shezhizc from '@/pages/mycenter/shezhi_zc'
import wode from '@/pages/mycenter/wode'

//俱乐部
import club from '@/pages/club/club'
import activityCreate from '@/pages/club/activityCreate'
import managedActivityList from '@/pages/club/managedActivityList'
import managedActivityListDetail from '@/pages/club/managedActivityListDetail'
import signupnum from '@/pages/club/signupnum'
import activityUpdate from '@/pages/club/activityUpdate'
import vipMenber from '@/pages/club/vipMenber'
import activityBm from '@/pages/club/activityBm'
import activityBmDetail from '@/pages/club/activityBmDetail'
import actvityQd from '@/pages/club/actvityQd'
import actvityQdDetail from '@/pages/club/actvityQdDetail'
import review from '@/pages/club/review'
import reviewDetail from '@/pages/club/reviewDetail'
import activityNav from '@/pages/club/activityNav'
import gdactivityCreate from '@/pages/club/gdactivityCreate'

//惠团购
import discount from '@/pages/discount/discount'

//wtallpage
import collect from '@/pages/wenti/wtpage/collect'
import diaoblic from '@/pages/wenti/wtpage/diaoblic'
import handwriting from '@/pages/wenti/wtpage/handwriting'
import happiness from '@/pages/wenti/wtpage/happiness'
import joker from '@/pages/wenti/wtpage/joker'
import nunchaku from '@/pages/wenti/wtpage/nunchaku'
import shadow from '@/pages/wenti/wtpage/shadow'
import sharesound from '@/pages/wenti/wtpage/sharesound'
import skills from '@/pages/wenti/wtpage/skills'
import treasure from '@/pages/wenti/wtpage/treasure'
import view from '@/pages/wenti/wtpage/view'
import weightlifting from '@/pages/wenti/wtpage/weightlifting'
import workplace from '@/pages/wenti/wtpage/workplace'

//测试用
import logintest from '@/pages/public/logintest'

//活动类型
Vue.use(Router)


const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/txmapa',
      name: 'txmapa',
      component:txmapa,
    },
    {
      path: '/reviewDetail/:post_id',
      name: 'reviewDetail',
      component:reviewDetail,
    },
    {
      path: '/gdactivityCreate',
      name: 'gdactivityCreate',
      component:gdactivityCreate,
      meta:{
        keepAlive: true,
      },
    },
    {
      path: '/activityNav',
      name: 'activityNav',
      component:activityNav,
    },
    {
      path: '/review',
      name: 'review',
      component:review,
    },
    {
      path: '/discount',
      name: 'discount',
      component:discount,
    },


    {
      path: '/actvityQdDetail/:id',
      name: 'actvityQdDetail',
      component:actvityQdDetail,
    },
    {
      path: '/actvityQd',
      name: 'actvityQd',
      component:actvityQd,
    },
    {
      path: '/activityBmDetail/:id',
      name: 'activityBmDetail',
      component:activityBmDetail,
    },
    {
      path: '/activityBm',
      name: 'activityBm',
      component:activityBm,
    },
    {
      path: '/vipMenber',
      name: 'vipMenber',
      component:vipMenber,
    },
    {
      path: '/activityUpdate/:id',
      name: 'activityUpdate',
      component:activityUpdate,
    },
    {
      path: '/signupnum/:id',
      name: 'signupnum',
      component:signupnum,
    },
    {
      path: '/managedActivityListDetail/:id',
      name: 'managedActivityListDetail',
      component:managedActivityListDetail,
    },
    {
      path: '/managedActivityList',
      name: 'managedActivityList',
      component:managedActivityList,
    },
    {
      path: '/activityCreate',
      name: 'activityCreate',
      component:activityCreate,
      meta:{
        keepAlive: true,
      },
    },
    {
      path: '/rili',
      name: 'rili',
      component:rili,
    },
    // {
    //   path: '/map2',
    //   name: 'map2',
    //   component:map2,
    // },
    // {
    //   path: '/map',
    //   name: 'map',
    //   component:map,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    {
      path: '/mapupd/:id',
      name: 'mapupd',
      component:mapupd,
      meta: {
        keepAlive: true
      }
    },
    // {
    //   path: '/mapgd',
    //   name: 'mapgd',
    //   component:mapgd,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    {
      path: '/indexNew',
      name: 'indexNew',
      component:indexNew,
    },
    {
      path: '/',
      name: 'index',
      component:index,
      meta:{
        // keepAlive: true,
        requireAuth: true
      },

    },{
      path: '/loginhome',
      name: 'loginhome',
      component:loginhome,
      meta: {
        requireAuth: true
      },

    },{
      path: '/logincode',
      name: 'logincode',
      component: logincode,
      meta:{
        requireAuth: true
      },

    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/activity',
      name: 'activity',
      component: activity,
      meta:{
        requireAuth: true
      },

    },{
      path: '/culture',
      name: 'culture',
      component: culture,
      meta:{
        // keepAlive: true,
        requireAuth: true
      },

    },{
      path: '/my',
      name: 'my',
      component: my,

    },{
      path: '/activityrecord',
      name: 'activityrecord',
      component: activityrecord
    },{
      path: '/customer',
      name: 'customer',
      component: customer
    },{
      path: '/activeshare/:post_id',
      name: 'activeshare',
      component: activeshare,

    },{
      path: '/classs',
      name: 'classs',
      component:classs,
      meta: {
        keepAlive: true
      }
    },{
      path: '/classslist/:id',
      name: 'classslist',
      component:classslist,
    },{
      path: '/class_details/:post_id',
      name: 'class_details',
      component:class_details,
      meta: {
        // keepAlive: true,
        requireAuth: true
      }
    },{
      path: '/honor',
      name: 'honor',
      component:honor,
      meta: {
        keepAlive: true
      }
    },{
      path: '/honor_details',
      name: 'honor_details',
      component:honor_details,
      meta: {
        keepAlive: true
      }

    },{
      path: '/pace',
      name: 'pace',
      component:pace
    },{
      path: '/club',
      name: 'club',
      component:club,
      meta:{
        // keepAlive: true,
        requireAuth: true
      },
    },{
      path: '/group',
      name: 'group',
      component:group,
    },{
      path: '/activity2',
      name: 'activity2',
      component:activity2,
    },
    {
      path: '/shezhi',
      name: 'shezhi',
      component:shezhi
    },
    {
      path: '/contactus',
      name: 'contactus',
      component:contactus
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component:myinfo
    },
    {
      path: '/shezhixy',
      name: 'shezhixy',
      component:shezhixy
    },
    {
      path: '/shezhizc',
      name: 'shezhizc',
      component:shezhizc
    },
    {
      path: '/collect',
      name: 'collect',
      component:collect
    },
    {
      path: '/diaoblic',
      name: 'diaoblic',
      component:diaoblic
    },
    {
      path: '/handwriting',
      name: 'handwriting',
      component:handwriting
    },
    {
      path: '/happiness',
      name: 'happiness',
      component:happiness
    },
    {
      path: '/joker',
      name: 'joker',
      component:joker
    },
    {
      path: '/nunchaku',
      name: 'nunchaku',
      component:nunchaku
    },
    {
      path: '/shadow',
      name: 'shadow',
      component:shadow
    },
    {
      path: '/sharesound',
      name: 'sharesound',
      component:sharesound
    },
    {
      path: '/skills',
      name: 'skills',
      component:skills
    },
    {
      path: '/treasure',
      name: 'treasure',
      component:treasure
    },
    {
      path: '/view',
      name: 'view',
      component:view
    },
    {
      path: '/weightlifting',
      name: 'weightlifting',
      component:weightlifting
    },
    {
      path: '/workplace',
      name: 'workplace',
      component:workplace
    },
    {
      path: '/author',
      name: 'author',
      component: author,
    },
    {
      path: '/wode',
      name: 'wode',
      component: wode,
    },
    {
      path: '/logintest',
      name: 'logintest',
      component: logintest,
      meta:{
        requireAuth: true
      },
    },

  ]
})


//




const baseurl = "http://www.staffhome.cn";//本地测试地址
// const baseurl = "http://testwww.staffhome.cn";//本地测试地址

// 请求微信服务器获取code 方法
function getUserCode() {
  let redirectURL = encodeURI((baseurl+"/author").split('&code')[0]);//获取地址
  const base = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=';
  let state;
  let surl;
  let reserveUrl;
  let appid = "wx73c5d9fedd980b37";
  let scope = "snsapi_userinfo";
  // alert(redirectURL)
  // return
window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectURL}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
  // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1c24d0b2f06df7f9&redirect_uri=http%3A%2F%2Ftest.sports.zongyutech.com%2Fapi%2Flogin%2Ftest&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
}


router.beforeEach((to,from,next) => {
  console.log(to)
  console.log(from)
  // console.log(next)
  console.log("to & form")
  let tokenid = localStorage.getItem("token");
  let companyid = localStorage.getItem("company_id");
  let code = localStorage.getItem("code");

  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

  if (!to.meta.requireAuth) {
      if (isiOS && to.path !== location.pathname) {
          // 此处不可使用location.replace
          location.assign(to.fullPath)
        } else {
          next()
        }
  } else {
    // localStorage.getItem("code")==null||window.localStorage.getItem("code")===undefined||window.localStorage.getItem("code")=='')
      if ( localStorage.getItem("code")=="undefined" || localStorage.getItem("code")=="" || localStorage.getItem("code")==null || localStorage.getItem("code")==undefined) {
          console.log("请求微信服务器获取code");
          getUserCode();
       }
       else {
          if (isiOS && to.path !== location.pathname) {
              // 此处不可使用location.replace
                  location.assign(to.fullPath)
          }
          else if (!companyid){
             if (to.path === '/logincode') {
               next();
             }else{
               // alert("没有token")
               next({
                 path:"/logincode"
               });
             }
           }
           else if (!tokenid){

                 if (to.path === '/logincode') {
                   next();
                 }else{
                   // alert("没有token")
                   next({
                     path:"/logincode"
                   });
                 }
           }
           else {
              next();
            }
        }

    }


})




export default router

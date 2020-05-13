// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import head from '@/pages/public/head'
Vue.component('m-header', head)
import 'vant/lib/index.css';

//vant
import { Loading } from 'vant';
Vue.use(Loading);
import { Field,Button,Toast,Divider } from 'vant'
import { toast } from 'vant';
Vue.use(Toast);
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Divider)

//代理部分
import axios from './request/https.js'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import qs from 'qs';
import api from './request/api.js'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.prototype.api = api
Vue.config.productionTip = false


import './../static/css/style.css'





//双击路由报错uncaught
// const originalPush = router.prototype.push;
//     router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import head from '@/pages/public/head'
import footer from '@/pages/public/footer'
import banner from '@/pages/public/banner'



Vue.component('m-header', head)
Vue.component('m-footer', footer)
Vue.component('m-banner', banner)


import 'vant/lib/index.css';

//vant
import { Loading } from 'vant';
Vue.use(Loading);
import { Field,Button,Toast,Divider } from 'vant'
import { button } from 'vant';
import { toast } from 'vant';
import { Cell, CellGroup } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { Popup } from 'vant';
import { Uploader } from 'vant';
import { List } from 'vant';
import { loading } from 'vant';
import { ImagePreview } from 'vant';
import { Form } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { PullRefresh } from 'vant';
import { list } from 'vant';

Vue.use(List);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(PullRefresh);
// 全局注册
Vue.use(ImagePreview);
//瀑布流插件
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)




Vue.use(Form);
Vue.use(Loading);
Vue.use(List);
Vue.use(Uploader);
Vue.use(Popup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Divider)


//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/css/swiper.css'

//代理部分
import api from './request/api.js'

// import axios from 'axios'
import axios from './request/https.js'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import qs from 'qs';
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

Vue.prototype.api = api
Vue.config.productionTip = false


import './../static/css/style.css'



//
// Vue.http.options.emulateJSON = true;
// Vue.http.options.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// };

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});


function getUserCode() {
  let redirectURL = encodeURI((baseurl+"/author").split('&code')[0]);//获取地址
  const base = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=';
  let state;
  let surl;
  let reserveUrl;
  let appid = "wx1c24d0b2f06df7f9";
  let scope = "snsapi_userinfo";
  // alert(redirectURL)
  // return
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectURL}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1c24d0b2f06df7f9&redirect_uri=http%3A%2F%2Ftest.sports.zongyutech.com%2Fapi%2Flogin%2Ftest&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//引入外部anitmated
import './../static/css/animate.min.css'

//vant
import 'vant/lib/index.css';
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
import { Calendar } from 'vant';
import { DatetimePicker } from 'vant';
import { Switch } from 'vant';
import { Dialog } from 'vant';
import { NoticeBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Picker } from 'vant';

Vue.use(Picker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NoticeBar);
Vue.use(Dialog);
Vue.use(Switch);
Vue.use(DatetimePicker);
Vue.use(Calendar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(PullRefresh);
// 全局注册
Vue.use(ImagePreview);
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


//animated
import animated from 'animate.css';
Vue.use(animated)

// element ul
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/css/swiper.css'
//瀑布流插件
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

//引入wow.js
// import wow from 'wowjs'
// import 'animate.css'
// Vue.prototype.$wow=wow
// import axios from 'axios'
//代理部分
import api from './request/api.js'
import axios from './request/https.js'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import qs from 'qs';
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.prototype.api = api
Vue.config.productionTip = false

//新的





//引入公用CSS

import './../static/css/style.css'
//百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  /* 需要注册百度地图开发者来获取你的ak */
  ak: 'NI5YPG5rt4bWlt6AmLoFuOIos88uM53C'
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});

<template>
<div class="container">
  <!-- //swiper -->
    <div class="bank_tit">
      <span class="fl"><img :src="list_comp.icon">{{list_comp.company_name}}</span>
      <!-- <span class="fr"  @click="tomy()"><img src="../../assets/images/bussiness-man-fill.png">我的</span> -->
    </div>

  <!-- banner公共组件 -->
  <div class="container-fluid huodongswiper ix_banners">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in toppic"  :key="index"><img :src="item.img_url"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>

  <div class="container-fluid wentlist">
      <h1>{{list_data_name}}</h1>
      <ul>
        <!-- <li @click.stop.prevent="wentihome()">文体汇总</li> -->
        <li v-for="(item,index) in list_data" :key="index">
          <div class="m_wlist_ix">
              <router-link :to="item.img_jump_url" >
              <div class="ov_img_a">
                <img :src="item.img_url">
                <h4>{{item.text}}</h4>
                <p>{{item.title}}</p>
              </div>
              </router-link>
          </div>
        </li>
      </ul>
  </div>

  <div class="container-fluid wentlist">
      <h1>{{list_data2_name}}</h1>
      <ul>
        <!-- <li @click.stop.prevent="wentihome()">文体汇总</li> -->
        <li v-for="(item,index) in list_data2" :key="index">
          <div class="m_wlist_ix">
              <router-link :to="item.img_jump_url" >
              <div class="ov_img_a">
                <img :src="item.img_url">
                <h4>{{item.text}}</h4>
                <p>{{item.title}}</p>
              </div>
              </router-link>
          </div>
        </li>
      </ul>
  </div>
  <!--我的按钮入口-->

  <div class="my_router" @click="myrout()">
      <img src="@/assets/images/mybtn.png">
  </div>
  <!-- 底部toobar -->
  <div class="zhanwei"></div>
</div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      // list:[],
      // listdetail:[],
      // pic_9_list:[],
          swiperOption:{
            slidesPerView: '1',
            spaceBetween: 10,
            initialSlide:1,
            loop:true,
            speed:600, //config参数同swiper4,与官网一致
            pagination:{
                 el: " .swiper-pagination",
                 clickable: true,
                 type: "bullets"
                 }
          },
         toppic:[],
         list_data:[],
         list_comp:[],
         list_data2:[],
         list_data_name:"",
         list_data2_name:"",
         token: '',

    }
  },

  created(){
      this.get_all_data()
  },
  mounted() {

  },
  watch: {

   },
  methods: {
    myrout(){
      this.$router.push({
          name:'my'
        })
    },
      tomy(){
        this.$router.push({
            name:'my'
          })
      },
      get_all_data(){
        var $this=this;
        var param={
          success:true,
          msg:"ok"
        }
        // window.localStorage.getItem("token")
        var qs = require('qs');
        let url = this.api.userApi.getIndexData
          console.log(url);
         this.axios.post(url,qs.stringify(param),
         {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}}
        )
        .then((res) => {

         this.list_data =res.data.data.pageElementList.index_menu1.detail;
         this.list_data2 =res.data.data.pageElementList.index_menu2.detail;


         this.list_data_name =res.data.data.pageElementList.index_menu1.element_name;
         this.list_data2_name =res.data.data.pageElementList.index_menu2.element_name;
          // this.list_data =res.data.data.pageElementList.index_menu.detail;
          var dataresurl = res.data.data.pageElementList;
          if (res.data.code==200){
              // this.list_data =dataresurl.index_menu1.detail;
              this.list_comp =dataresurl.index_top_company.detail;
              console.log(dataresurl);



              this.toppic=dataresurl.index_top_piclist.detail;

              // console.log(this.toppic);

          }
          else if(res.data.code==403){
            this.$toast(res.data.msg);
            this.$router.replace('/logincode');
          }
          else{
            this.$toast(res.data.msg);
          }

        }).catch((error) => {
          console.warn(error)
        })
      },

  }

}
</script>

<style>


</style>

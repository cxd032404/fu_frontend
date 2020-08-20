<template lang="html">


    <div class="container-fluid">

      <!-- <van-loading type="spinner" color="#1989fa"></van-loading> -->
      <!-- banner公共组件 -->
      <div class="container-fluid huodongswiper ix_banners ix_newbanner">
          <div class="bank_tit">
            <span class="fl"><img :src="list_comp.icon">{{list_comp.company_name}}</span>
          </div>
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in toppic"  :key="index">
              <router-link :to="item.img_jump_url"><img :src="item.img_url"></router-link>
            </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
      </div>

      <!-- 活动公告 -->
      <div class="ix_new_gg container">
        <van-notice-bar left-icon="volume-o" :scrollable="false">
          <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
          >
            <van-swipe-item>你有个视觉盛宴活动马上开始了哦</van-swipe-item>
            <van-swipe-item>你有个足球俱乐部活动马上开始了哦</van-swipe-item>
            <!--
            <van-swipe-item>你有个视觉盛宴活动马上开始了哦</van-swipe-item> -->
          </van-swipe>
        </van-notice-bar>
        <div class="goqiand">
            <!-- <span>去签到</span> -->
        </div>
      </div>
      <!-- <div class="">
        11111111111111
      </div> -->

      <!-- libiao -->
      <div class="container-fluid ix_new_glist "   >
          <ul>
            <li v-for="(item,index) in list_data" :key="index"  >
                  <router-link :to="item.img_jump_url" >
                    <img :src="item.img_url">
                    <p>{{item.text}}</p>
                  </router-link>
            </li>

            <!-- <li @click="tojbz()">
              健步走
            </li> -->
          </ul>
      </div>
      <!-- jingpinke -->
        <div class=" container-fluid ix_new_class ">
            <div class="container ixntit">
              <span>精品课</span>

              <router-link to="/classs"><img src="@/assets/images/rscopy.png" alt=""></router-link>
            </div>
            <div class="ix_cls_ct">
              <swiper :options="swiperOptionClss">
                <swiper-slide  v-for="(item,index) in ixjp_list" :key="index"  class="wow fadeInRight" data-wow-duration="1s" :data-wow-delay="index*0.3+'s'" >
                    <img  @click="toDeail(item.post_id)" v-if="item.header_img != '' " :src="item.header_img" alt="">
                    <img  @click="toDeail(item.post_id)" v-else  :src="item.header_video_img" alt="">
                  <div class="c_tag1">
                    {{item.list_name}}
                  </div>
                  <div class="c_tag2">
                    <h2>{{item.title}}</h2>
                    <p>{{item.views}}人已看</p>
                  </div>
                </swiper-slide>

              </swiper>
            </div>
        </div>

        <!-- 进行中的活动 -->
        <div class="container-fluid ix_new_jxz "  >
          <div class="container ix_new_jxz_ixntit">
            <span>进行中的活动</span>
          </div>
          <div class="ix_jxz_ct">
            <swiper :options="swiperOptionJxz">
              <swiper-slide  v-for="(item,index) in apply_list"  :key="index"  class="wow fadeInRight" data-wow-duration="1s" :data-wow-delay="index*0.3+'s'">
                <img :src="item.icon">
                <div class="jx_tag">
                  <h2>{{item.activity_name}}<img src="@/assets/images/833.png"></h2>
                  <p>{{item.comment}}</p>
                </div>
              </swiper-slide>

            </swiper>
          </div>
        </div>
        <!--我的按钮入口-->

        <div class="my_router" @click="myrout()">
            <img src="@/assets/images/163436.png">
        </div>



    </div>
</template>

<script>
import {WOW} from 'wowjs';

export default {
  data(){
    return{
      swiperOption:{
        slidesPerView: '1',
        spaceBetween: 10,
        initialSlide:1,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    　　observeParents:true,//修改swiper的父元素时，自动初始化swiper
    　　loop:true,

    　　autoplay: {
    　　delay: 5000,
        　　disableOnInteraction: false
        },
        speed:600, //config参数同swiper4,与官网一致
        pagination:{
             el: " .swiper-pagination",
             clickable: true,
             type: "bullets"
             }
      },
      swiperOptionClss:{
        slidesPerView: 'auto',
        spaceBetween: 15,
        initialSlide:0,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    　　observeParents:true,//修改swiper的父元素时，自动初始化swiper
    // 　　loop:true,
        speed:600, //config参数同swiper4,与官网一致
      },

      swiperOptionJxz:{
        slidesPerView: 'auto',
        spaceBetween: 15,
        initialSlide:0,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    　　observeParents:true,//修改swiper的父元素时，自动初始化swiper

    // 　　loop:true,
        speed:600, //config参数同swiper4,与官网一致
      },
      toppic:[],
      list_data:[],
      list_comp:[],
      list_data2:[],
      list_data_name:"",
      list_data2_name:"",
      token: '',
      ixjp_list:[],
      apply_list:[],

    }
  },
  created(){
      this.get_all_data()
  },
  mounted() {

  },
  watch: {
      ixjp_list:function(){
        	this.$nextTick(function(){
            new WOW({live: false,offset:50,}).init();
            // alert(1);
        	});
    	},
      list_data:function(){
        	this.$nextTick(function(){
            new WOW({live: false,offset:50,}).init();
            // alert(1);
        	});
    	}
   },

  methods: {
    tojbz(){
      wx.miniProgram.navigateTo({url: '/path/to/wtIndex'})
    },
    toDeail(post_id){
      this.$router.push({ name: 'class_details', params: { post_id: post_id } });
    },
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
        var company_id =  localStorage.getItem("company_id");
        var params={
          company:company_id,
          page_sign:this.$route.name,
          culture:'1',
        }
        var qs = require('qs');
        var parm = JSON.stringify(params);
        let url = this.api.userApi.get_zp
        console.log(url);
        this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
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
              console.log(this.toppic);
              this.ixjp_list=dataresurl.boutique.detail;
              this.apply_list=dataresurl.applyingAcitivity.detail.activity_list;

          }
          else if(res.data.code==403){
            this.$toast(res.data.msg);
            this.$router.replace('/loginhome?company_id=1');
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

<style lang="css" scoped>
</style>

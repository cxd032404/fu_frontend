<template lang="html">
  <div class="container-fulid">
      <!-- tag箭头 -->
      <div class="pb_tag_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          文体汇
      </div>

      <div class="container">
        <div class="bank_tit">
          <span class="fl"><img :src="list_comp.icon">{{list_comp.company_name}}</span>
        </div>
        <!-- banner公共组件 -->
        <div class="container-fluid huodongswiper culare_banner">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item,index) in toppic" :key="index"><img :src="item.img_url"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>

        <div class="container wt_list">
            <div class="wenti_all container-fluid">
                <div class="wenti_top_img">
                    <p>{{whys.element_name}}</p>
                </div>
                <div class="wenti_fenlei clearfix">
                    <ul>
                      <li  v-for="item in whysdetail" >
                        <router-link :to="item.img_jump_url" >
                          <img :src="item.img_url">
                          <p>{{item.text}}</p>
                        </router-link>
                      </li>

                    </ul>
                </div>
            </div>
        </div>
        <!-- 强身健体 -->
        <div class="container wt_list">
            <div class="wenti_all container-fluid">
                <div class="wenti_top_img">
                    <p>{{qsjt.element_name}}</p>
                </div>
                <div class="wenti_fenlei clearfix">
                    <ul>
                      <li  v-for="item in qsjtdetail" >
                        <router-link :to="item.img_jump_url" >
                          <img :src="item.img_url">
                          <p>{{item.text}}</p>
                        </router-link>
                      </li>

                    </ul>
                </div>
            </div>
        </div>
        <!-- 工作生活 -->
        <div class="container wt_list">
            <div class="wenti_all container-fluid">
                <div class="wenti_top_img">
                    <p>{{gzsh.element_name}}</p>
                </div>
                <div class="wenti_fenlei clearfix">
                    <ul>
                      <li  v-for="item in gzshdetail" >
                        <router-link :to="item.img_jump_url" >
                          <img :src="item.img_url">
                          <p>{{item.text}}</p>
                        </router-link>
                      </li>

                    </ul>
                </div>
            </div>
        </div>
          <!-- 占位符 -->
        <div class="zhanweifu container-fluid">
        </div>
      </div>



  </div>
</template>

<script>

export default {
  data() {
    return {
      swiperOption:{
        slidesPerView: 1,
        spaceBetween: 10,
        initialSlide:1,
        loop:true,
        speed:700, //config参数同swiper4,与官网一致
        pagination:{
             el: " .swiper-pagination",
             clickable: true,
             type: "bullets"
             }
      },
      //滑动图片
      toppic:[],

      whys:[],
      whysdetail:[],
      qsjt:[],
      qsjtdetail:[],
      gzsh:[],
      gzshdetail:[],

      list_comp:[],
    }
  },
  created(){

  },
  mounted() {
    this.get_all_data();
  },
  methods: {
    get_all_data(){
      var $this=this;
      var param={
        success:true,
        msg:"ok",
      }
      // window.localStorage.getItem("token")
      var qs = require('qs');
      let url = this.api.userApi.getculture
        console.log(url);
       this.axios.post(url,qs.stringify(param),
       {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}}
      )
      .then((res) => {

      var dataresurl = res.data.data.pageElementList;



        if (res.data.code==200){
            this.whys=dataresurl.culture_activity1;
            this.whysdetail=dataresurl.culture_activity1.detail;
            // this.whys=dataresurl.culture_activity1;
            // this.whysdetail=dataresurl.culture_activity1.detail;
            this.qsjt=dataresurl.culture_activity2;
            this.qsjtdetail=dataresurl.culture_activity2.detail;
            //
            this.gzsh=dataresurl.culture_activity3;
            this.gzshdetail=dataresurl.culture_activity3.detail;
            //
            this.list_comp =res.data.data.pageElementList.culture_company.detail;

            //顶部toppic
            this.toppic=dataresurl.culture_top_piclist.detail;

            console.log(this.toppic);

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

<style lang="css" scoped>
</style>

<template lang="html">
    <div class="container-fluid">
        <!-- banner -->
        <div class="container-fluid huodongswiper ix_banners ix_banners_news">

            <!-- <div class="china_bank_name">
                <img :src="list_comp.icon">{{list_comp.company_name}}
            </div> -->
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item,index) in toppic"  :key="index">
                <router-link :to="item.img_jump_url"><img :src="item.img_url"></router-link>
              </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>


    </div>
</template>

<script>
export default {
  data(){
    return {
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
      toppic:[],
    }
  },
  created(){
    this.get_all_data();
  },
  methods: {


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
       this.axios.post(url,qs.stringify(param),)
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

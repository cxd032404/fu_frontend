<template lang="html">
  <div class="container-fluid jingpin_bg">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        <!-- {{pagename.page_name}} -->
        精品课列表
    </div>
      <div class="pb_top_zhanwei"></div>

        <div class="class_list_day container-fluid">
              <h2>{{top.list_name}}</h2>
            <img :src="top.header_url">
        </div>

        <div class="clist_lis container-fluid">
            <ul>
              <li v-for="(item,index) in contlist"  :key="index" @click="toDeail(item.post_id)"  class="wow fadeInUp"  data-wow-duration="1s" :data-wow-delay="index*0.3+'s'">
                <div class="fl jpin_nw_lt">
                      <img :src="item.source[0].path+item.source[0].suffix" alt="">
                </div>
                <div class="fl jpin_nw_rt">
                    <h1>{{item.title}}</h1>
                    <p>{{item.views}}人已看</p>
                </div>
              </li>

            </ul>
        </div>

  </div>
</template>

<script>
import {WOW} from 'wowjs';
export default {
  data(){
    return {
      top:[],
      contlist:[],
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
      contlist:function(){
          this.$nextTick(function(){
            new WOW({live: false,offset:50,}).init();
            // alert(1);
          });
      }
   },
  methods: {

    toDeail(post_id){
      this.$router.push({ name: 'class_details', params: { post_id: post_id } });
    },
    getData(){
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        list_id:this.$route.params.id,
        company:company_id,
        page_sign:"boutiqueSingleList",
      }
      // window.localStorage.getItem("token")
      var qs = require('qs');
      var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
        console.log(url);
       this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),
       // {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token"),'code':window.localStorage.getItem("code")}}
      )
      .then((res) => {

        // this.class_list=
        this.top=res.data.data.pageElementList.boutiqueSingleList.detail;
        this.contlist=res.data.data.pageElementList.boutiqueSingleList.data.data;
        console.log(res.data.data.pageElementList);

      }).catch((error) => {
        console.warn(error)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>

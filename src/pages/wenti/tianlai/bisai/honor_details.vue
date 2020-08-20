<template lang="html">
  <div class="container-fluid">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{honor_detail.list_name}}
    </div>
    <div class="pb_top_zhanwei"></div>

    <!-- 详情大图 -->
    <div class="container-fluid">

        <div class="container xianjin_content_nr">
            <h1>
              {{honor_detail.title}}
            </h1>
            <div class="xianjin_ico container-fluid">
                <div class="xianj_img fl">


                  <img v-if="user_info.user_img == '' || user_info.user_img == null " src="@/assets/images/5959.png">
                  <img v-else :src="user_info.user_img">


                </div>
                <div class="xianj_ct fl">
                    <h4 v-if="user_info.user_img == '' || user_info.user_img == null ">默认用户</h4>
                    <h4 v-else>{{user_info.nick_name}}</h4>

                    <span>{{honor_detail.update_time}}</span>
                </div>
            </div>
            <div class="xianj_all_nr" v-html="honor_detail.content">

            </div>
            <div class="xianj_botm">
                <ul>
                  <li><img src="@/assets/images/share_xianjin_icon.png">1143</li>


                  <li v-if="this.iskuos==1" @click="dz_cont_qx()"><img src="@/assets/images/good_xianjin_icon.png">{{this.kudos}} </li>
                  <li  v-else @click="dz_cont()"><img src="@/assets/images/good_xianjin_icon.png">{{this.kudos}}</li>



                  <li><img src="@/assets/images/eye_xianjin_icon.png">{{honor_detail.views}}</li>
                </ul>
            </div>

            <!-- 我是有底线的 -->

        </div>

        <div class="pubu_dixian_botm">
          <p><span></span>我是有底线的 <span></span></p>
        </div>
        <!-- 猜你喜欢 -->

    </div>


    <div class="zhanwei"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pagename:[],
      honor_detail:[],
      user_info:[],
      iskuos:'',
      kudos:'',
    }
  },
  created() {
    this.detail()
  },
  methods:{
    // 内容页点赞
    dz_cont(){
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        // company:company_id,
        // page_sign:this.$route.name,
        post_id:this.$route.query.id,
      }
      var qs = require('qs');
      let url = this.api.userApi.get_dianzan
      this.axios.post(url,qs.stringify(params),)
      .then((res) => {
        // console.log(res.data.data.kudos);
        // this.detail();
        if(res.data.code==200){
          this.kudos++;
          this.iskuos=1
        }else{
        }
      }).catch((error) => {
        console.warn(error)
      })

    },

    dz_cont_qx(){
      var param={
          post_id:this.$route.query.id,
      }
      var qs = require('qs');
      let url = this.api.userApi.get_qx
      this.axios.post(url,qs.stringify(param),)
      .then((res) => {
        console.log("取消点赞？？？？？？？？？？？？？")
        this.iskuos=0
        this.kudos--
        // this.$toast(res.data.msg)

      }).catch((error) => {
        console.warn(error)
      })


    },
    //
    detail(){
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        company:company_id,
        page_sign:this.$route.name,
        post_id:this.$route.query.id,
      }
      var qs = require('qs');
      var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token"),'code':window.localStorage.getItem("code")}})
      .then((res) => {
        console.log(res);

        this.pagename=res.data.data.pageInfo;
        this.honor_detail=res.data.data.pageElementList.hnor_detail_menu.detail;
        this.kudos=res.data.data.pageElementList.hnor_detail_menu.detail.kudos;
        this.iskuos=res.data.data.pageElementList.hnor_detail_menu.detail.is_kudos;
        this.user_info=this.honor_detail.user_info;
        console.log(this.user_info);


      }).catch((error) => {
        console.warn(error)
      })
    },

  }

}
</script>

<style lang="css" scoped>
</style>

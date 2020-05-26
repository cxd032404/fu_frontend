<template lang="html">
  <div class="container-fluid">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{pagename.page_name}}
    </div>

    <!-- 详情大图 -->
    <div class="container-fluid">

        <div class="container xianjin_content_nr">
            <h1>
              {{honor_detail.title}}
            </h1>
            <div class="xianjin_ico container-fluid">
                <div class="xianj_img fl">
                    <img src="@/assets/images/tx-3.png" alt="">
                </div>
                <div class="xianj_ct fl">
                    <h4>张阳阳</h4>
                    <span>{{honor_detail.update_time}}</span>
                </div>
            </div>
            <div class="xianj_all_nr" v-html="honor_detail.content">

            </div>
            <div class="xianj_botm">
                <ul>
                  <li><img src="@/assets/images/share_xianjin_icon.png">1143</li>
                  <li><img src="@/assets/images/good_xianjin_icon.png">1143</li>
                  <li><img src="@/assets/images/eye_xianjin_icon.png">5000</li>
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
    }
  },
  created() {
    this.detail()
  },
  methods:{
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
      let url = this.api.userApi.rongyu_list
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {
        console.log(res);

        this.pagename=res.data.data.pageInfo;


        this.honor_detail=res.data.data.pageElementList.hnor_detail_menu.detail;



      }).catch((error) => {
        console.warn(error)
      })
    },

  }

}
</script>

<style lang="css" scoped>
</style>

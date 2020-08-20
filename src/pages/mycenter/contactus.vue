<template lang="html">
  <div class="container-fluid">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{pagenamess.page_name}}
    </div>
    <div class="pb_top_zhanwei"></div>

    <div class="contant_img">
      <img :src="honor_detail.img_url" alt="">
      <p>版本号 V1.1.0</p>
    </div>

    <div class="container content_info">
       <div class="content_nr  baise">
            <ul>
              <li>
                <div class="concats_lt fl">
                  微信公众号
                </div>
                <div class="concats_rt fr" @click="copyUrl(cont_list.wechat_acount_name)">
                  {{cont_list.wechat_acount_name}} <img src="@/assets/images/fuzhi.png">
                </div>
              </li>
              <!-- <li>
                <div class="concats_lt fl">
                  微博
                </div>
                <div class="concats_rt fr">
                  wentizhichuang
                </div>
              </li>
              <li>
                <div class="concats_lt fl">
                  客服电话
                </div>
                <div class="concats_rt fr">
                  400-6300-1111
                </div>
              </li> -->
            </ul>
       </div>
    </div>

    <!-- 底部内容 -->
     <div class="contactus_bom tc">
        <h1>广州文野文化有限公司</h1>
        <p>Copyright@2020 Wentizhichuang All Rights Reserved</p>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagenamess:[],
      honor_detail:[],
      cont_list:[],
    }
  },
  created() {
    this.detail()
  },
  methods:{
    // 内容页点赞
    copyUrl(text) {
      this.$toast("复制成功");
     const input = document.createElement('input')
     document.body.appendChild(input)
     input.setAttribute('value',text)
     input.select()
     if (document.execCommand('copy')) {
       document.execCommand('copy')
     }
     document.body.removeChild(input)

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
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {

        this.pagenamess=res.data.data.pageInfo;
          console.log(this.pagenamess);
        this.honor_detail=res.data.data.pageElementList.contactus.detail;
        this.cont_list=res.data.data.pageElementList.wechatAccount.detail;

      }).catch((error) => {
        console.warn(error)
      })
    },

  }

}
</script>

<style lang="css" scoped>
</style>

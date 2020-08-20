<template lang="html">
  <div class="container-fulid">
      <!-- tag箭头 -->
      <div class="pb_tag_top bg_bs">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          设置
      </div>
      <div class="pb_top_zhanwei"></div>

      <div class="container pb_container sz_all_sss">
        <div class="sz_all_sss_nr">
          <van-cell is-link @click="show_xieyis()">用户协议</van-cell>
          <van-cell is-link @click="show_zhengces()">隐私政策</van-cell>
        </div>
      </div>

      <!-- //用户协议隐私政策 -->
      <div class="user_pop_2">
          <van-popup v-model="show_xieyi"
          closeable
          close-icon="close"
          >
            <div class="xieyi_content">
              <div class="all_xy_nr_ct">
                {{this.user}}
              </div>
            </div>
          </van-popup>
      </div>
      <div class="user_pop_2">
          <van-popup v-model="show_zhengce" closeable
          close-icon="close">
            <div class="user_content">
              <div class="all_xy_nr_ct">
                {{this.zhengce}}

              </div>
            </div>
        </van-popup>
      </div>



    </div>
</template>

<script>
export default {
  data(){
    return{
      show_zhengce:false,
      show_xieyi:false,
      zhengce:[],
      user:[],
    }
  },
  created(){
      this.get_Company_data();
      // this.get_user_shenfen();
  },
  methods: {
    show_xieyis(){
      // this.show_xieyi=true;
      this.$router.push({
          name:'shezhixy'
        })

    },
    show_zhengces(){
      this.$router.push({
          name:'shezhizc'
        })
    },
    get_Company_data(){
        // 判断企业全输入然后验证码不显示
      var  Params={
        company_id:localStorage.getItem("company_id"),
        privacy:"1",
        user:"1",
      }
      console.log(Params);
     // console.log(Params.company_id);
      var qs = require('qs');
      let url = this.api.userApi.get_Company
      this.axios.post(url,qs.stringify(Params),)
        .then((res) => {

          console.log(res);
          // console.log(res.data.data);

          if (res.data.code==200) {
            this.company=res.data.data.company_name;
            //隐私政策
            this.zhengce=res.data.data.protocal.privacy.content;
            console.log(this.zhengce);
            //用户协议
            this.user=res.data.data.protocal.user.content;
          }
          else{
            this.$toast(res.data.msg);
          }
        }).catch((error) => {

      })




    },

    }
}
</script>

<style lang="css" scoped>
</style>

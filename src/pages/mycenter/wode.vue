<template lang="html">
    <div class="container-fluid ">
      <div class="pb_tag_top baise">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          我的
      </div>
      <div class="pb_top_zhanwei"></div>


      <div class="container baise my_wode">
        <div class="wode_cont">
            <div class="wode_toux">
              <img v-if=" userlist.user_img == '' || userlist.user_img == null " src="@/assets/images/5959.png"  alt="">
              <img v-else :src="userlist.user_img">
            </div>
            <van-cell title="姓名"  :value="userlist.nick_name" />
            <!-- <van-cell title="账号" is-link :value="userlist.mobile" /> -->
            <van-cell title="账号"  :value="userlist.mobile" />

        </div>
      </div>



    </div>
</template>

<script>

export default {
  data() {
    return {
      userlist:[],
      user_img:'',
    }
  },
  created(){
    this.getuserinfo();
  },

  methods: {

    // 获取企业名称
    getuserinfo(){
      var $this=this;
      var params={
      }
      var qs = require('qs');
      var parm = JSON.stringify(params);
      let url = this.api.userApi.get_userinfo
      console.log(url);
      this.axios.post(url,qs.stringify(params),)
      .then((res) => {

        this.userlist=res.data.data;
        console.log(res.data.data);

      }).catch((error) => {
        console.warn(error)
      })
    },



  }

}
</script>

<style lang="css" scoped>
</style>

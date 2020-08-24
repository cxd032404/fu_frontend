<template lang="html">
  <div class="container-fulid">
      <!-- tag箭头 -->
      <div class="pb_tag_top bg_se">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          我的
      </div>
      <div class="pb_top_zhanwei"></div>

      <div class="container-fluid my_cont">
          <div class="my_cont_1">
            <img src="@/assets/images/my1.png">
            <div class="my_ct_pos">
                <div class="pos_m_a fl">
                  <!-- <img v-if=" this.userimg != '' " :src="this.userimg" alt="">
                  <img v-else src="@/assets/images/5959.png" alt=""> -->

                  <img v-if=" userlist.user_img == '' || userlist.user_img == null " src="@/assets/images/5959.png"  alt="">
                  <img v-else :src="userlist.user_img">
                </div>
                <div class="pos_m_b fl">
                    <h1>{{userlist.nick_name}}</h1>
                    <button  @click="geren()">个人中心</button>
                </div>
            </div>
          </div>

          <div class="my_cont_2 container">
            <ul>
              <li @click="hdjilu()"><img src="@/assets/images/sm1.png"> <span>活动记录</span>  <dbo><img  src="@/assets/images/rscopy.png"></dbo> </li>
              <li @click="myinfo()"><img src="@/assets/images/sm4.png"> <span>我的消息</span>  <dbo><img  src="@/assets/images/rscopy.png"></dbo> </li>
              <li @click="lianxi()"><img src="@/assets/images/sm2.png"> <span>联系我们</span>  <dbo><img  src="@/assets/images/rscopy.png"></dbo> </li>
              <li @click="shezhi()"><img src="@/assets/images/sm5.png"> <span>设置</span>  <dbo><img  src="@/assets/images/rscopy.png"></dbo> </li>
            </ul>
          </div>
      </div>

      <!-- <m-footer></m-footer> -->

    </div>
</template>

<script>

export default {
  data() {
    return {
      userlist:[],
      nickname:localStorage.getItem("nickname"),
      user_img:'',
    }
  },
  created(){
    this.getuserinfo();
  },
  mounted() {
    //判断如果缓存中有头像就显示
    if(localStorage.getItem("userimg"))
      {
      this.user_img = localStorage.getItem("userimg")
      }

  },
  methods: {

    geren(){
      this.$router.push({
          name:'wode'
        })
    },

    lianxi(){
      this.$router.push({
          name:'contactus'
        })
    },

    hdjilu(){
      this.$router.push({
          name:'activityrecord'
        })
    },
    myinfo(){
      this.$router.push({
          name:'myinfo'
        })
    },
    shezhi(){
      this.$router.push({
          name:'shezhi'
        })
    },
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

<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        <!-- {{this.pagename}} -->
        已报名人员
    </div>
    <div class="pb_top_zhanwei"></div>

      <div class="club_bm_pepeo">
          <ul>
            <li v-for="item in uselist"  :key="">
              <img v-if="item.user_img==null" src="@/assets/images/5959.png">
              <img v-else  :src="item.user_img">
              <span>{{item.nick_name}}</span>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      uselist:[],
      pagename:'',
    }
  },
  created() {
    this.getActivity();
  },
  mounted(){
  },
  methods:{
    getActivity(){
      var $this=this;
      var params={
        activity_id:this.$route.params.id,
        company:localStorage.getItem("company_id"),
        page_sign:"activityMemberList",
      }
      console.log(params);
      var qs = require('qs');
      var parm = JSON.stringify(params);
      // var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {
        //顶部name
        console.log(res);
        this.pagename=res.data.data.pageInfo.page_name;
        this.uselist=res.data.data.pageElementList.activityMemberList.detail.activity_member_list;

      }).catch((error) => {
        console.warn(error)
      })
    },
  }
}
</script>

<style lang="css" scoped>
</style>

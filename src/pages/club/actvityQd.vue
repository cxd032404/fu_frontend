<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        活动签到
    </div>
    <div class="pb_top_zhanwei"></div>



    <div class="container act_qiandao" v-if="this.qdlist.length>0">
      <ul>
        <li v-for="(item,index) in qdlist"  :key="index">
          <div class="act_qd_top">
            <h1> <img :src="item.club_icon" alt=""> {{item.club_name}}</h1>
          </div>
          <div class="act_qd_nr baise">
              <div class="qdrw">
                签到任务
              </div>
              <div class="act_qd_nr_nr">
                <h1>{{item.activity_name}}</h1>
                <p>提醒各位会员，{{item.now}}{{item.time}}有活动，请准时到场签到。</p>
                <p><span><img src="@/assets/images/pos_na.png"></span>{{item.address}}</p>
                <p><span class="ffs"><img src="@/assets/images/timsss.png"></span>{{item.chinese_start_time}}-{{item.chinese_end_time}}</p>
                <p>已签到人数：{{item.checkin_count}}</p>
              </div>

              <div v-if="item.activity_status==0" class="goqiadao"  @click="toqdDetail(item.activity_id)" :style="{color:item.activity_color}">
                {{item.activity_status_name}}
              </div>
              <div v-else-if="item.activity_status==1" class="goqiadao" :style="{color:item.activity_color}">
                {{item.activity_checkin_time}} {{item.activity_status_name}}
              </div>
              <div v-else class="goqiadao"  :style="{color:item.activity_color}">
                {{item.activity_status_name}}
              </div>

          </div>

        </li>
      </ul>
    </div>

    <!-- //空白页面 -->
    <div class="pb_all_info"  v-else>
      <div class="pb_all_info_nr">
        <img src="@/assets/images/3422.png">
        <p>这里空空如也～</p>
      </div>
    </div>




    <div class="zhanwei">
    </div>
    <!-- 待签到弹窗 -->



  </div>
</template>

<script>
export default {
  data(){
    return{
      dis_show: true,
      pagename:'',
      artime:'',
      qdlist:[],
      starstime:'',
    }
  },
  created() {
  },
  beforeDestroy(){

 },
  mounted(){
    this.getActivity();
  },
  methods:{
    //点击选项卡切换
    changeType(item){
      this.states=item
    },
    toqdDetail(actid){
        this.$router.push({ name: 'actvityQdDetail', params: { id: actid } });
    },
    getActivity(){
      var $this=this;
      var params={
        company:localStorage.getItem("company_id"),
        page_sign:"attendActivityListToCheckin",
      }
      console.log(params);
      var qs = require('qs');
      var parm = JSON.stringify(params);
      // var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {
        //顶部name
        this.qdlist=res.data.data.pageElementList.attendActivityListToCheckin.detail.activity_list;
        console.log(res);



      }).catch((error) => {
        console.warn(error)
      })
    },




  },

}
</script>

<style lang="css" scoped>
</style>

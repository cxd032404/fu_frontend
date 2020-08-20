<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        活动管理
    </div>
      <div class="pb_top_zhanwei"></div>

      <!-- 活动详情管理 -->
      <div class="jlb_activity_details baise">

          <div class="jlb_ganl container">
            <ul>
              <li v-if="activityInfo.member_limit==0"><div class="jlb_gl_lt fl">名额</div><div class="jlb_gl_rt fr">不限人数</div></li>
              <li v-else ><div class="jlb_gl_lt fl">名额</div><div class="jlb_gl_rt fr">{{activityInfo.member_limit}}人</div></li>

              <li ><div class="jlb_gl_lt fl">已报名</div> <div class="jlb_gr_jt fr" @click="toNum()"><img src="@/assets/images/rs.png"></div> <div class="jlb_gl_rt fr">{{bmnum.userCount}}人</div></li>
              <li><div class="jlb_gl_lt fl">活动名称</div><div class="jlb_gl_rt fr">{{activityInfo.activity_name}}</div></li>
              <li><div class="jlb_gl_lt fl">活动地点</div><div class="jlb_gl_rt fr">{{checkall.address}}</div></li>
              <li><div class="jlb_gl_lt fl">活动时间</div><div class="jlb_gl_rt fr">{{activityInfo.chinese_start_time}}-{{activityInfo.chinese_end_time}}</div></li>
              <li><div class="jlb_gl_lt fl">报名时间</div><div class="jlb_gl_rt fr">{{activityInfo.chinese_apply_start_time}}-{{activityInfo.chinese_apply_end_time}}</div></li>
              <li>
                <div class="jlb_gl_lt">
                  活动介绍
                </div>
                <div class="jlb_hdjs">
                  <p>
                    {{activityInfo.comment}}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <!-- 取消活动弹窗 -->
          <div class="jlb_btn_details">
              <button type="button" name="button" @click="updateHD(upid)">编辑活动</button>
              <button type="button" name="button" @click="quxiao_Ck()">取消活动</button>
          </div>
      </div>




  </div>
</template>

<script>
export default {
  data(){
    return{
      bmnum:[],
      activityInfo:[],//管理详情
      upid:this.$route.params.id,//更新活动ID
      currentDate: new Date(), //开始标准时间
      aptime:'',
      aptime2:'',
      aptime3:'',
      aptime4:'',
      checkall:'',

      timea:'',
      timeb:'',
      timec:'',
      timed:'',
    }
  },
  created() {
  },
  mounted(){
    this.getInfo();
  },
  methods:{
    //报名人数
    toNum(){
        this.$router.push({ name: 'signupnum' });
    },

    //修改活动
    updateHD(updateid){
      this.$router.push({ name: 'activityUpdate', params: { id: updateid } });
    },

    //取消活动接口
    getQxAct(){
      var $this=this;
      var params={
        activity_id:this.$route.params.id,
      }
      console.log(params);
      var qs = require('qs');
      // var parm = JSON.stringify(params);
      let url = this.api.userApi.act_cancal
      this.axios.post(url,qs.stringify(params),)
      .then((res) => {
        this.$toast(res.data.msg)
        // // this.$toast(res.data.msg);
      }).catch((error) => {
        console.warn(error)
      })
    },
    //获取活动修改信息
    getInfo(){
      var $this=this;
      var params={
        company:localStorage.getItem("company_id"),
        activity_id:this.$route.params.id,
      }
      console.log(params);
      var qs = require('qs');
      var parm = JSON.stringify(params);
      // var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+"activityInfo",qs.stringify({params:parm}),)
      .then((res) => {
        console.log(res);
        this.activityInfo=res.data.data.pageElementList.activity_info.detail.activity_info;
        //已报名人数
        this.bmnum=res.data.data.pageElementList.activity_info.detail;

        console.log(this.bmnum);
        this.checkall=this.activityInfo.checkin;

        this.aptime=this.activityInfo.start_time;
        this.aptime2=this.activityInfo.update_time;
        this.aptime3=this.activityInfo.apply_start_time;
        this.aptime4=this.activityInfo.apply_end_time;

        // 时间转换
        var date = new Date(this.aptime);
        this.timea = date.getFullYear() + '/' + (Number(date.getMonth()) + 1) +'/'+ date.getDate()
        var date2 = new Date(this.aptime2);
        this.timeb = date2.getFullYear() + '/' + (Number(date2.getMonth()) + 1) +'/'+ date2.getDate()
        var date3 = new Date(this.aptime3);
        this.timec = date3.getFullYear() + '/' + (Number(date3.getMonth()) + 1) +'/'+ date3.getDate()
        var date4 = new Date(this.aptime4);
        this.timed = date4.getFullYear() + '/' + (Number(date4.getMonth()) + 1) +'/'+ date4.getDate()

        // console.log(date.getFullYear());
        // console.log(date.getMonth() + 1);
        // console.log(date.getDate());

        // // this.$toast(res.data.msg);
      }).catch((error) => {
        console.warn(error)
      })
    },
    quxiao_Ck(){
      this.$dialog.confirm({
          title: '确认取消活动吗？',
          message: '取消活动后该条活动记录被删除，员工无法再次访问此活动',
        })
          .then(() => {
            // on confirm
            console.log("确定");
            this.getQxAct();

            setTimeout(()=>{
            this.$router.push({ name: 'activityBm'});
            },1000)

          })
          .catch(() => {
            // on cancel
            console.log("关闭");
          });
    }
  }
}
</script>

<style lang="css" scoped>
</style>

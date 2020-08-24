<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        <!-- {{this.pagename}} -->
        活动报名
    </div>
    <div class="pb_top_zhanwei"></div>

    <div class="activity_banner container-fluid ">
          <img v-if="banner_info_length.length>=1"  :src="banner_info.img_url">
          <img  v-else src="@/assets/images/banner.jpg" alt="">

    </div>
    <!-- //活动详情内容 -->
    <div class="activity_content container baise">
        <div class="lanqiu_a_cont">
            <div class="lanqiu_ico">
                <img v-if="this.icons==''" src="@/assets/images/default.png">
                <img v-else :src="this.icons">
            </div>
            <h1>{{acinfo.activity_name}}</h1>
            <p>{{acinfo.chinese_start_time}}-{{acinfo.chinese_end_time}}</p>

            <button v-if="this.aplied_id==0" type="button" name="button" @click="toBmCk()">一键报名</button>
            <button v-else type="button" name="button" class="huise" >已报名</button>

            <span v-if="acinfo.remain=='不限'"><em>{{acinfo.remain}}</em>名额</span>
            <span v-else>余<em>{{acinfo.remain}}</em>名额</span>
        </div>

        <div class="lanqiu_b_cont">
          <ul>
            <li>
              <div class="fl hd_lt_pc">
                  活动地点:
              </div>
              <div class="fl hd_rt_pc">
                <p>{{adinfo.address}}</p>
              </div>
            </li>
            <li>
              <div class="fl hd_lt_pc">
                  报名时间:
              </div>
              <div class="fl hd_rt_pc">
                <p>{{acinfo.chinese_apply_start_time}}-{{acinfo.chinese_apply_end_time}}</p>
              </div>
            </li>
            <li>
              <div class="fl hd_lt_pc">
                  活动名额:
              </div>
              <div class="fl hd_rt_pc">
                <p v-if="acinfo.member_limit==0">不限</p>
                <p v-else>{{acinfo.member_limit}}人</p>
              </div>
            </li>
            <li>
              <div class="fl hd_lt_pc">
                  活动介绍:
              </div>
              <div class="fl hd_rt_pc">
                <p>{{acinfo.comment}}</p>
              </div>
            </li>
          </ul>
        </div>
    </div>

    <div class="ybaom_cot container baise" v-if="this.uselist.length>0">
      <div class="ybam_nr">
        <div class="ybam_nr_tit">
          已报名
        </div>
        <div class="ybam_list_al">
          <ul class="fl">
            <li v-for="(item,index) in uselist"  v-if="index<4" >
              <img v-if="item.user_img==null" src="@/assets/images/5959.png">
              <img v-else  :src="item.user_img">
            </li>
            <li v-if="this.uselist.length>4">
              +{{this.uselist.length-4}}
            </li>
          </ul>
            <div class="fr ybam_jt"  @click="toSignNum()">
                <img src="@/assets/images/sgg.png">
            </div>
        </div>
      </div>
    </div>

    <div class="zhanwei">
    </div>


    <!-- 报名状态变化 -->

    <div class="jlb_bm_code" >
      <van-popup v-model="code_a" class="jlb_bm_code_nr">
        <div class="bm_cg_code tc">

          <div class="bm_cg_code_nr">
            <img src="@/assets/images/00226.png">
            <h1 style="color:#3678E1;">报名成功</h1>
          </div>

          <div class="huod_sta_gb" @click="to_code_a()">
            <img src="@/assets/images/gsgb.png" alt="">
          </div>

        </div>
      </van-popup>
      <!-- 报名已满 -->
      <van-popup v-model="code_b" class="jlb_bm_code_nr">
          <div class="bm_cg_code tc">
              <div class="bm_cg_code_nr">
                <img src="@/assets/images/worn.png">
                <h1>报名失败</h1>
                <p>{{this.msg}}</p>
                  <router-link  to="/activityBm" >
                  <a href="javascript:void(0)" >去看看其他活动吧>>></a>
                  </router-link>
              </div>

              <div class="huod_sta_gb" @click="to_code_a()">
                <img src="@/assets/images/gsgb.png" alt="">
              </div>
          </div>
      </van-popup>


      <!-- 报名失败 -->
      <van-popup v-model="code_c" class="jlb_bm_code_nr">

        <div class="bm_cg_code tc">
            <div class="bm_cg_code_nr">
              <img src="@/assets/images/worn.png">
              <h1>报名失败</h1>
              <p>{{this.msg}}</p>
              <!-- <a href="javascript:void(0)" @click="shenqingClick()">{{this.jlb_name}}>>></a> -->
              <span  @click="shenqingClick()">{{this.jlb_name}}>>></span>
            </div>

            <div class="huod_sta_gb" @click="to_code_a()">
              <img src="@/assets/images/gsgb.png" alt="">
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
      msg:'',
      aplied_id:'',
      code_a_status:'0',
      jlb_name:'',
      pagename:'',
      acinfo:'',
      adinfo:'',
      banner_info:[],
      banner_info_length:[],
      activityid:this.$route.params.id,
      uselist:[],
      userlistnum:[],
      code_a:false,
      code_b:false,
      code_c:false,
      icons:'',
    }
  },
  created() {
    this.getActivity();
    this.getTxlist();
    this.getBMlist();
  },
  mounted(){
  },
  methods:{

    shenqingClick(){
      this.shenqingClub();
    },
    toSignNum(actid){
          this.$router.push({ name: 'signupnum', params: { id: this.activityid } });
    },
    //报名成功三个状态
    to_code_a(){
      this.all_show_huodong=false;
      this.code_a=false;
      this.code_b=false;
      this.code_c=false;
    },
    //获取报名头像部分
    getBMlist(){
      var $this=this;
      var params={
        activity_id:this.$route.params.id,
        company:localStorage.getItem("company_id"),
        page_sign:"activityMemberList",
      }
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
        this.userlistnum=this.uselist.length;

      }).catch((error) => {
        console.warn(error)
      })
    },

    //申请加入俱乐部
    shenqingClub(){
      var $this=this;
      var qs = require('qs');
      var params={
           club_id:this.jlb_id,
           operation:"join",
      }
      let url = this.api.userApi.jlb_state
      this.axios.post(url,qs.stringify(params),)
      .then((res) => {
        //顶部name
      console.log(res);

      this.$toast(res.data.msg);
      setTimeout(()=>{
        this.code_c=false;
      },1000)


      }).catch((error) => {
        console.warn(error)
      })
      // console.log(this.result);
    },

      // 去报名
      toBmCk(){
        var $this=this;
        var params={
          activity_id:this.$route.params.id,
        }
        console.log(params);
        var qs = require('qs');
        var parm = JSON.stringify(params);
        // var parm = JSON.stringify(params);
        let url = this.api.userApi.jlb_bm
        this.axios.post(url,qs.stringify(params),)
        .then((res) => {
          //顶部name
          console.log(res);
          // 俱乐部报名三种状态
          if(res.data.code==200){
            this.code_a=true;
            this.aplied_id=1;
          }
          else if (res.data.code==400) {
            this.code_b=true;
            this.msg=res.data.msg;
          }
          else{
            this.code_c=true;
            this.jlb_name=res.data.msg;
            this.jlb_id=res.data.data.club_id;
            this.msg=res.data.msg;
          }
          // console.log(res);
          // console.log(res.data.msg);

        }).catch((error) => {
          console.warn(error)
        })
      },
    //
    getActivity(){
      var $this=this;
      var params={
        activity_id:this.$route.params.id,
        company:localStorage.getItem("company_id"),
        page_sign:"activityInfo",
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
        this.acinfo=res.data.data.pageElementList.activity_info.detail.activity_info;

        //判断是否可以报名
        this.aplied_id=res.data.data.pageElementList.activity_info.detail.aplied;


        this.banner_info=res.data.data.pageElementList.activity_info.detail.club_info.banner[0];
        this.banner_info_length=res.data.data.pageElementList.activity_info.detail.club_info.banner;
        // alert(this.banner_info_length.length)
        this.icons=res.data.data.pageElementList.activity_info.detail.icon;
        this.adinfo=this.acinfo.checkin;
        console.log(this.acinfo);

      }).catch((error) => {
        console.warn(error)
      })
    },



    getTxlist(){
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

      }).catch((error) => {
        console.warn(error)
      })
    },




  }
}
</script>

<style lang="css" scoped>
</style>

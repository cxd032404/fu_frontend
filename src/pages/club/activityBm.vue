<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          <!-- {{this.pagename}} -->
          活动报名
    </div>
    <div class="pb_top_zhanwei"></div>


    <div class="vshow_cont"  >
        <div class="container-fluid hy_meber_top_ct baise">
          <div class="hy_meber_top ">
            <ul>
              <!-- <li class="active" @>待审核</li>
              <li>已审核</li> -->
              <li @click="changeType(0)" :class="this.states==0?'active':''"  >未报名</li>
              <li @click="changeType(1)"  :class="this.states==1?'active':''">已报名</li>
            </ul>
          </div>
        </div>
        <div class="act_qd_list container" v-if="this.states==0">

            <div v-if="this.onging.length>0">
              <ul>
                <li @click="toDetail(item.activity_id)" v-for="item in onging"  >
                  <!-- <img :src="item.icon" alt=""> -->
                  <div class="qd_lt_a fl">
                    <img v-if="item.icon==''" src="@/assets/images/5959.png">
                    <img v-else  :src="item.icon">
                  </div>
                  <div class="qd_lt_b fl">
                      <h1>{{item.club_name}}</h1>
                      <p>{{item.activity_name}}...</p>
                      <p>{{item.format_apply_time}}</p>
                  </div>
                    <div class="qd_lt_c fr">
                      <button type="button" name="button">去报名</button>
                    </div>
                </li>
              </ul>

            </div>
            <div class="pb_all_info"  v-else>
              <div class="pb_all_info_nr">
                <img src="@/assets/images/3422.png">
                <p>这里空空如也～</p>
              </div>
            </div>

          </div>

          <div v-else class="jlb_ybm container">
              <div v-if="this.yes_list.length>0">
                <!-- //下拉加载 -->
                <van-list
                  v-model="loading"
                  :offset="100"
                  :finished="finished"
                  finished-text="没有更多了"
                  :immediate-check="false"
                  @load="onLoad"
                  ref="yes_list"
                >
                <ul>
                  <li v-for="item in yes_list"   @click="toDetail(item.activity_id)">
                    <div class="fl jlb_ybm_a">
                      <img v-if="item.icon==''" src="@/assets/images/5959.png">
                      <img v-else  :src="item.icon">
                      <span>{{item.club_name}}</span>
                    </div>
                    <div class="fl jlb_ybm_b">
                        <h1>{{item.activity_name}}</h1>
                        <p class="topyidian"><span><img src="@/assets/images/pos_na.png"></span>{{item.position}}</p>
                        <p><span class="ffs"><img src="@/assets/images/timsss.png"></span>{{item.start_time}}-{{item.end_time}}</p>
                        <p><span></span>已报名人数:{{item.Usercount}}</p>
                    </div>

                    <div class="ybm_stas" v-if="item.status==2">
                      <img src="@/assets/images/print_fail_icon.png">
                    </div>
                    <div class="" v-else>
                    </div>
                  </li>
                </ul>

                </van-list>



              </div>
              <div class="pb_all_info"  v-else>
                <div class="pb_all_info_nr">
                  <img src="@/assets/images/3422.png">
                  <p>这里空空如也～</p>
                </div>
              </div>

          </div>
      </div>
    <!-- 空白信息通用版 -->
    <!-- <div class="pb_all_info"  v-else>
      <div class="pb_all_info_nr">
        <img src="@/assets/images/3422.png">
        <p>这里空空如也，赶快去发布活动吧～</p>
        <router-link to="activityNav">
        <button  type="button" name="button">去看看</button>
        </router-link>
      </div>
    </div> -->



  </div>

</template>

<script>
export default {
  data(){
    return{
      pagename:'',
      onging:[],
      states:0,
      yes_list:[],
      loading: false,
      finished: false,
      pageNum:1,

    }
  },
  created() {
    this.getActivity();
    this.getHdlist();
  },
  mounted(){
  },

  watch: {
        //监听路由变化
    '$route' (to, from) {
        if(to.name == 'activityBm' || from.name == 'activityBm') {
            //重新调用接口
            this.getActivity();
            this.getHdlist();
        }
    },
  },
  methods:{


    changeType(item){
      this.states=item
      this.pageNum=1;
      this.yes_list=[];
      this.getHdlist();

    },
    toDetail(actid){
          this.$router.push({ name: 'activityBmDetail', params: { id: actid } });
      },

    getActivity(){
      var $this=this;
      var params={
        company:localStorage.getItem("company_id"),
        page_sign:"applyingAcitivity",
        already_applied:'0',
        pageSize:"1000",
        page:'1',
      }
      console.log(params);
      var qs = require('qs');
      var parm = JSON.stringify(params);
      // var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {
        //顶部name
        console.log(res)
        this.pagename=res.data.data.pageInfo.page_name;
        console.log(res.data.data.pageElementList.applyingAcitivity.detail.activity_list);
        this.onging=res.data.data.pageElementList.applyingAcitivity.detail.activity_list



      }).catch((error) => {
        console.warn(error)
      })
    },

    getHdlist(){
      var $this=this;
      var params={
        company:localStorage.getItem("company_id"),
        page_sign:"appliedActivityList",
        pageSize:"3",
        page:this.pageNum,
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
        this.yes_list_before=res.data.data.pageElementList.activitylist.detail.activity_list;
        // this.yes_list=res.data.data.pageElementList.activitylist.detail.activity_list;
        this.loading = false;
        this.finished = false;
        this.yes_list=this.yes_list.concat(this.yes_list_before);
        // this.yes_list=[];
        if(this.yes_list_before.length==0){
          this.loading = true;
          this.finished = true;
        }

      }).catch((error) => {
        console.warn(error)
      })
    },

    //上拉加载
    onLoad(){
      this.pageNum++;
      console.log(this.pageNum);
      this.getHdlist();
    },


  }

}
</script>

<style lang="css" scoped>
</style>

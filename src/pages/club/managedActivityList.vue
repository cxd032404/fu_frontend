<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        活动管理
    </div>
    <div class="pb_top_zhanwei"></div>

    <!-- 管理才有的下拉框 -->
    <!-- <div class="v_mber_top baise" v-if="this.managed_list.length>2">
        <div class="v_mber_input " :class="{'v_mber_input_active':v_mber_inputTrue}"   @click="gly_zhs_inputCk()">
            {{this.jlb_name}}<img src="@/assets/images/62414.png" alt="">
        </div>
        <div class="v_mber_nr">
          <transition name="mber_top_list">
            <ul v-if="show" class="ul-box">
              <li  v-for="(item,index) in managed_list"  :key="index" @click="zhsinput(item.club_name,item.club_id)">{{item.club_name}}</li>
            </ul>
           </transition>
        </div>
    </div>
    <div v-else>
    </div> -->

    <div class="mang_pos" :class="{'mang_pos_active':mang_pos_True}"  @click="gly_inputCk()" >
    </div>
    <div class="mang_all container-fluid">
        <div class="mang_cont baise">
            <div class="mang_top container">
              <div class="mang_top_lt fl">
                全部活动
              </div>
              <div class="mang_top_rt fr" @click="gly_inputCk()" :class="{'mang_top_rt_active':mang_top_rt_True}">
                <input v-model="default_name" type="text" readonly>
                <img src="@/assets/images/san.png">
              </div>
            </div>
            <!-- 11111 -->
            <transition name="mang_box">
            <div class="mang_box" v-if="mang_show">
              <ul>
                <li v-for="item in m_mang" @click="toStatus(item.id,item.name)" >{{item.name}}</li>
              </ul>
            </div>
           </transition>
        </div>
    </div>



    <!-- 李彪开始 -->
      <div class="cb_ac_list container">
        <!-- 上拉加载 -->
        <van-list
           v-model="loading"
          :immediate-check="false"
           :offset="50"
           :finished="finished"
           finished-text=" "
            @load="loadMore"
            ref="fenye_list"
          >
          <ul>
            <!-- <li v-for="(item,index) in fenye_list"  :key="index" @click="toDetail(item.activity_id)">
              <div class="fl cb_ac_list_ico">
                <img :src="item.icon">
              </div>
              <div class="fl cb_ac_list_name">
                  {{item.club_name}}  <span>{{item.chinese_start_time}}</span>
                  <p>{{item.activity_name}}</p>
              </div>
              <div class="fr cb_ac_list_jt">
                <img src="@/assets/images/13116.png">
              </div>
            </li> -->
            <li class="ac_gl"  v-for="(item,index) in fenye_list"  :key="index" @click="toDetail(item.activity_id)">
                <div class="ac_gl_nr">
                    <div class="ac_gl_a">
                      <div class="aca_lt fl">
                        <img v-if="item.icon==''" src="@/assets/images/default.png">
                        <img v-else :src="item.icon">
                      {{item.club_name}}
                      </div>
                      <div class="aca_rt fr" v-if="item.activity_status==5">
                          活动已取消
                      </div>
                      <div class="aca_rt fr" v-else-if="item.activity_status==0">
                          报名未开始
                      </div>
                      <div class="aca_rt fr" v-else-if="item.activity_status==1">
                          报名中
                      </div>
                      <div class="aca_rt fr" v-else-if="item.activity_status==2">
                          报名已结束
                      </div>
                      <div class="aca_rt fr" v-else-if="item.activity_status==3">
                          活动进行中
                      </div>
                      <div class="aca_rt fr" v-else-if="item.activity_status==4">
                          活动已结束
                      </div>
                      <div class="aca_rt fr" v-else>
                          未知状态
                      </div>

                    </div>

                    <div class="ac_gl_b">
                      {{item.activity_name}}
                    </div>
                    <div class="ac_gl_c">
                      <p><img src="@/assets/images/pos_na.png">{{item.address}}</p>
                      <p><img src="@/assets/images/timsss.png">{{item.chinese_start_time}}</p>
                      <p><img src="@/assets/images/1416.png">已报名人数:{{item.applied}}人</p>
                    </div>
                </div>
            </li>
          </ul>

          </van-list>


      </div>

  </div>
</template>

<script>
export default {

  data(){
    return{
      default_name:'全部',
      mang_top_rt_True:false,
      mang_pos_True:false,
      mang_show:false,
      v_mber_inputTrue:false,
      mang_show:false,
      show: false,
      activity_list:[],
      jlb_name:'全部',
      act_gl_seTrue:false,
      managed_list:[],
      clubid:'-1',
      // 上拉加载分页
      loading: false,
      finished: false,
      pageNum:1,
      pageSize:5,
      fenye_list:[],
      result_zta:"",
      m_mang:[
        {name:'全部',id:'-1'},
        {name:'报名中',id:'1'},
        {name:'活动进行中',id:'3'},
        {name:'活动已结束',id:'4'},
        {name:'活动已取消',id:'5'},
      ],
      params:{
        company:localStorage.getItem("company_id"),
        page_sign:this.$route.name,
        pageSize:3,
        page:1,
        club_id:'-1',
        activity_status:'-1',
      }
    }
  },

  created() {
    this.getActivity()
  },
  mounted(){
  },
  methods:{

    toStatus(id,name){
      this.mang_show=false;
      this.mang_pos_True= false;
      this.mang_top_rt_True= false;


      //清空数组里面的数据
      // alert(this.default_name.value);
      this.default_name=name;
      this.params.page=1,
      // alert(this.params.page);
      this.loading = false;
      this.finished = false;
      this.fenye_list=[];
      this.params.activity_status=id;
      this.getActivity();

    },
    toDetail(actid){
          this.$router.push({ name: 'managedActivityListDetail', params: { id: actid } });
      },
    // 管理员部分下拉
    gly_zhs_inputCk(){
      this.show= !this.show;
      this.v_mber_inputTrue= !this.v_mber_inputTrue;
    },
    gly_inputCk(){
      this.mang_show= !this.mang_show;
      this.mang_pos_True= !this.mang_pos_True;
      this.mang_top_rt_True= !this.mang_top_rt_True;
    },
    zhsinput(name,id){
      //显示内
      this.show=false;
      this.v_mber_inputTrue=false;
      //
      this.jlb_name=name;
      this.act_gl_seTrue=false;
      this.clubid=id;
      //筛选分别俱乐部内容
      this.params.page=1,
      this.loading = false;
      this.finished = false;
      this.fenye_list=[];
      this.getActivity();

    },
    // mingliCk(item){
    //   alert(item);
    //   this.mingeinput=item;
    //   this.ClassTrue=false;
    // },
    //参加活动列表
      getActivity(){
        var $this=this;
        // var params={
        //   company:localStorage.getItem("company_id"),
        //   page_sign:this.$route.name,
        //   pageSize:this.pageSize,
        //   page:this.pageNum,
        //   club_id:this.clubid,
        // }
        console.log(this.params);
        var qs = require('qs');
        var parm = JSON.stringify(this.params);
        // var parm = JSON.stringify(params);
        let url = this.api.userApi.get_zp
        this.axios.post(url+'/'+this.params.company+'/'+this.params.page_sign,qs.stringify({params:parm}),)
        .then((res) => {
          console.log(res);
          // console.log(res.data.data.pageElementList.activitylist.detail.activity_list);
          this.activity_list=res.data.data.pageElementList.managedActivityList.detail.managed_activity_list;
          this.fenye_list=this.fenye_list.concat(this.activity_list);
          //状体判断
          // this.result_list
          this.managed_list=res.data.data.pageElementList.managedActivityList.detail.managed_club_list;
          this.result_zta=res.data.data.pageElementList.managedActivityList.detail.residuals;
          // console.log(this.fenye_list);
          // 返回MSG提  this.loading = false;
           this.loading = false;
            if(this.result_zta==0){
              this.finished = true;
            }
          // // this.$toast(res.data.msg);
        }).catch((error) => {
          console.warn(error)
        })
      },
      //上拉加载
      loadMore() {
        this.params.page++;
        this.getActivity();
      },

  }


}
</script>

<style lang="css" scoped>
</style>

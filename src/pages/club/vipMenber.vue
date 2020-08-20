<template lang="html">
  <div class="container-fluid jingpin_bg">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        会员管理
    </div>
    <div class="pb_top_zhanwei"></div>





    <div class="club_hy_meber">
          <div class="hy_meber_top">
            <ul>
              <!-- <li class="active" @>待审核</li>
              <li>已审核</li> -->
              <li @click="changeType(0)" :class="params.result==0?'active':''"  >待审核</li>
              <li @click="changeType(3)"  :class="params.result==3?'active':''">已审核</li>
            </ul>
          </div>



          <div class="v_mber_top" v-if="clublist.length>2 && params.result==0" ref="treeWrap">
              <div class="v_mber_input " :class="{'v_mber_input_active':v_mber_inputTrue}"  v-on:click="toggleSanj()">
                  {{this.clubName}}<img src="@/assets/images/62414.png" alt="">
              </div>
              <div class="v_mber_nr" >
                <transition name="mber_top_list">
                  <ul v-if="show" class="ul-box">
                    <li  v-for="(item,index) in clublist"  :key="index" @click="ClickClub(item.club_id,item.club_name,item.Usercount)">{{item.club_name}}</li>
                  </ul>
                 </transition>
              </div>
          </div>
          <div v-else>
          </div>


          <div class="hy_meber">

            <!-- 待审核 -->
              <div v-if="params.result==0" class="daishenhe">

                <div v-if="this.meberlist.length>0">
                  <div class="club_b_qx ovh">
                    <div class="fl club_b_a fl"@click="toggleAll()">
                      <van-checkbox v-model="isCheckAll">全选</van-checkbox>
                    </div>
                    <div class="fl club_b_a fr">
                      当前会员数： <b>{{this.julbchengyuan}}</b>  人
                    </div>
                  </div>
                  <!-- <van-button type="info" @click="toggleAll">反选</van-button> -->
                  <div class="hy_meber_dsh">
                    <van-checkbox-group v-model="logidlist"  ref="checkboxGroup">

                      <van-list
                        v-model="loading"
                        :offset="100"
                        :finished="finished"
                        finished-text="没有更多了"
                        :immediate-check="false"
                        @load="onLoad"
                        ref="meberlist"
                      >

                      <ul>
                        <li v-for="(item,index) in meberlist"  :key="index">

                          <div class="fl dhs_a">
                                <van-checkbox :name="item.log_id">
                                  <div class="fl dhs_b">
                                     <h1>{{item.true_name}}  </h1>
                                     <p>申请加入:{{item.club_name}}</p>
                                     <p>{{item.create_time}}</p>
                                  </div>
                                </van-checkbox>
                          </div>
                        </li>
                      </ul>

                        </van-list>


                    </van-checkbox-group>
                  </div>
                  <div class="btm_t_j_fix">
                      <span  @click="jujue()">拒绝</span>
                      <span  @click="tongguo()">通过</span>
                  </div>
                </div>
                <div class="pb_all_info pb_all_info_mber"  v-else>
                  <div class="pb_all_info_nr">
                    <img src="@/assets/images/65057.png">
                    <p>暂时没有会员申请</p>
                    <router-link to="/club">
                    <button  type="button" name="button">返回</button>
                    </router-link>
                  </div>
                </div>


              </div>
              <!-- 已审核   -->
              <div v-else class="yishenhe">

               <div v-if="this.meberlist.length>0">
                  <div class="ysh_status">
                    <van-list
                      v-model="loading"
                      :offset="100"
                      :finished="finished"
                      finished-text="没有更多了"
                      :immediate-check="false"
                      @load="onLoad"
                      ref="meberlist"
                    >

                    <ul>
                      <li v-for="(item,index) in meberlist"  :key="index">
                        <div class="fl ysh_name">
                          <h1>{{item.true_name}} <span>(会员数:{{item.user_count}}人)</span> </h1>
                          <p>申请加入:{{item.club_name}}</p>
                          <p>{{item.create_time}}</p>
                        </div>
                        <div class="fr ysh_tong">
                            <div v-if="item.result==1" class="ysh_a">
                               已通过
                            </div>
                            <div v-else class="ysh_a">
                               已拒绝
                            </div>
                        </div>
                      </li>
                    </ul>

                      </van-list>

                  </div>
               </div>
               <div class="pb_all_info pb_all_info_mber"  v-else>
                 <div class="pb_all_info_nr">
                   <img src="@/assets/images/65057.png">
                   <p>暂时没有会员申请</p>
                   <router-link to="/club">
                   <button  type="button" name="button">返回</button>
                   </router-link>
                 </div>
               </div>
              </div>
          </div>


    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{

      v_mber_inputTrue:false,
      isCheckAll:false,
      show: false,
      julbchengyuan:'',
      clubName:"全部",
      active:0,
      logidlist:[],
      meberlist:[],
      clublist:[],
      params: {
        page:1,
        result: 0,
        club_id:"-1",
        company:localStorage.getItem("company_id"),
        page_sign:"clubMemberLog",
        pageSize:"10",

      },
    }
  },
  mounted(){
    this.getVipMeber();

    let _this = this;
    document.addEventListener('mouseup',(e) =>{
        let tree = this.$refs.treeWrap
        if (tree) {
          if (!tree.contains(e.target)) {
            this.show =false
            this.v_mber_inputTrue=false
          }
        }
      })


  },
  methods: {


    //三角切换
    toggleSanj(){
      this.show= !this.show;
      this.v_mber_inputTrue= !this.v_mber_inputTrue;
    },

    //
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll(true)
      if(this.isCheckAll==true){
        this.$refs.checkboxGroup.toggleAll(false)
      }
      // this.$refs.checkboxGroup.toggleAll();
    },

    //电机线下拉选择
    ClickClub(clubid,cname,uscount){
      this.params.page=1;
      this.meberlist=[];
      this.julbchengyuan=uscount;
      this.show=false;
      this.params.club_id=clubid
      this.clubName=cname;
      this.v_mber_inputTrue=false;
      this.getVipMeber();
    },
    //点击选项卡切换
    changeType(item){
      this.params.page=1;
      this.meberlist=[];
      this.params.result=item
      this.getVipMeber();
    },
    getVipMeber(){
      var $this=this;
      var qs = require('qs');
      var parm = JSON.stringify(this.params);
      // var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+this.params.company+'/'+this.params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {
        //顶部name
        console.log(res);
        //俱乐部列表
        this.clublist=res.data.data.pageElementList.club_member_log.detail.club_list;
        // alert(this.clublist.length-1)
        this.mmidlength=this.clublist.length-1;

        if(this.params.club_id==-1){
          this.julbchengyuan= this.clublist[this.mmidlength].Usercount;
        }
        // this.clubName=res.data.data.pageElementList.club_member_log.detail.club_name;
        this.loading = false;
        this.finished = false;
        this.meberlist_before=res.data.data.pageElementList.club_member_log.detail.member_log_list;
        this.meberlist=this.meberlist.concat(this.meberlist_before);
        if(this.meberlist_before.length==0){
          this.loading = true;
          this.finished = true;
        }



      }).catch((error) => {
        console.warn(error)
      })
    },

    //上拉加载
    onLoad(){
      this.params.page++;
      console.log(this.params);
      this.getVipMeber();
    },


    tongguo(){
      var $this=this;
      var qs = require('qs');
      var params={
           log_id:this.logidlist,
           operation:"pass",
      }
      let url = this.api.userApi.jlb_state
      this.axios.post(url,qs.stringify(params),)
      .then((res) => {
        //顶部name
        this.$toast(res.data.msg);

        setTimeout(()=>{
          this.$router.go(0);
        },1000)


      }).catch((error) => {
        console.warn(error)
      })
      // console.log(this.result);
    },
    jujue(){
      var $this=this;
      var qs = require('qs');
      var params={
           log_id:this.logidlist,
           operation:"reject",
      }
      console.log(params);
      let url = this.api.userApi.jlb_state
      this.axios.post(url,qs.stringify(params),)
      .then((res) => {
        //顶部name
        this.$toast(res.data.msg);


        setTimeout(()=>{
          this.$router.go(0);
        },1000)




      }).catch((error) => {
        console.warn(error)
      })
      // console.log(this.result);
    }
  },
}
</script>

<style lang="css" scoped>
</style>

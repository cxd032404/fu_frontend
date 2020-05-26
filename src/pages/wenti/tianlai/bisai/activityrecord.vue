<template lang="html">
  <div class="container-fulid">
      <!-- tag箭头 -->
      <div class="pb_tag_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          活动记录
      </div>

      <div class="container jilu_list"  v-show="jiluall">
          <div class="jilu_time">{{list_record.create_time}}</div>
          <div class="jilu_box">
            <div class="jilu_nr">
                <div class="jilu_top">
                  <div class="fl jilu_bq">
                      <span>{{list_record.activity_name}}</span>
                  </div>
                  <div class="fr jilu_btn">
                      <ul>
                        <li @click="vx_share()">
                           <img src="@/assets/images/share_activety_icon.png" alt="">分享
                        </li>
                        <li @click="delete_hd()">
                          <img src="@/assets/images/delete_activety_icon.png">删除
                        </li>
                      </ul>
                  </div>
                </div>
                <div class="jilu_cap">
                  <p>{{list_record.content}}</p>
                </div>
            </div>
            <div class="jilu_cont container-fluid">
              <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in list_souce_data"  :key="index">

                  <div  v-if="item.type=='video'" class="m_vdsp_all" >
                    <video  controls  :src="item.path">
                    </video>
                    <!-- <div class="video_btn" @click="video_btn()">
                      <img src="@/assets/images/video.png" />
                    </div> -->
                  </div>
                  <div v-else class="m_vdsp_all">
                      <img :src="item.path">
                  </div>
                 </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="my_pos_num">
                <ul>
                  <li>我的得票数</li>
                  <li>{{list_record.kudos}}</li>
                </ul>
            </div>
            <!-- <div class="my_toupiao">
                <button type="button" name="button">投TA一票</button>
            </div> -->
          </div>
      </div>

      <!--分享按钮-->
      <div class="share_vx container-fluid">
            <van-popup  position="bottom" :style="{ height: '30%' }" v-model="share_show">
              <div class="vx_table">
                  <ul>
                    <li @click="activeshare()">
                      <img src="@/assets/images/weixin_share_icon.png">
                      <p>微信好友</p>
                    </li>
                    <li>
                      <img src="@/assets/images/mate_share_icon.png">
                      <p>朋友圈</p>
                    </li>
                  </ul>
              </div>

              <div class="copy_close" @click="copy_close()">
                <img src="@/assets/images/copy.png">
              </div>
            </van-popup>
      </div>

    </div>
</template>

<script>
export default {
  data(){
    return{
      share_show:false,
      jiluall:false,
      list_record:[],
      list_souce_data:[],
      post_id:"",
      swiperOption:{
        slidesPerView: 1,
        spaceBetween: 10,
        initialSlide:1,
        loop:true,
        speed:700, //config参数同swiper4,与官网一致
        pagination:{
             el: " .swiper-pagination",
             clickable: true,
             type: "bullets"
             }
      },
    }
  },
  created() {
      this.getrecord()
   },
// get_activityrecord
  methods: {
    // 分享
    activeshare(){
      this.$router.push({
          name:'activeshare'
        })
    },
    vx_share(){
        this.share_show = true;
    },
    copy_close(){
      this.share_show = false;
    },
    //删除
    delete_hd(){
      var $this=this;
      var param={
          post_id:this.post_id,
       }
       console.log(param.post_id);
      var qs = require('qs');
      let url = this.api.userApi.delete_huodong
      this.axios.post(url,qs.stringify(param),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {
        // console.log("删除");
        // console.log(res.data);
        // // this.newkey.splice(msi,1);
        if(res.data.code==400){
          this.$toast(res.data.msg);
        }
        else{
          this.$toast(res.data.msg);
        }
        // this.sid=this.sourceid[this.sid];
      }).catch((error) => {
        console.warn(error)
      })
    },
    getrecord(){
      var params={
          post_id:this.post_id,
          page:1,
          pagesize:5,
      }
      var qs = require('qs');
      let url = this.api.userApi.get_activityrecord
      this.axios.post(url,qs.stringify(params),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {
        var count_hd = res.data.data.pageElementList.activity_log_detail.data.count;

        if(count_hd==0){
          this.$toast("暂无活动数据");

        }
        else{

          this.jiluall=true
          this.list_record=res.data.data.pageElementList.activity_log_detail.data.data[0];
          this.list_souce_data=res.data.data.pageElementList.activity_log_detail.data.data[0].source;

          this.post_id=res.data.data.pageElementList.activity_log_detail.data.data[0].post_id;

        }




      }).catch((error) => {
        console.warn(error)
      })
    },
  },

}
</script>

<style lang="css" scoped>
</style>

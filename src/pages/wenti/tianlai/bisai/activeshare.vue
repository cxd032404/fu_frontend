<template lang="html">
  <div class="container-fulid">
      <!-- tag箭头 -->
      <div class="hd_share_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        <div class="share_ico_img">
          <img src="@/assets/images/5959.png">
          {{list_record.nick_name}}
        </div>
      </div>
      <div class="pb_top_zhanwei"></div>
      <!-- 分享弹窗 -->
      <div class="share_tc" v-show="sharetc" @click="showcl()">
        <img src="@/assets/images/3804.png">
      </div>
      <div class="container jilu_list"  v-show="jiluall">
          <div class="jilu_box">
            <div class="jilu_nr">
                <div class="jilu_cap" style="margin-top:0rem;">
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

            <div  v-if="list_record.is_kudos==1" class="my_toupiao active" v-show="toup_btn_b"   >
                <button type="button" name="button">已投票</button>
            </div>
            <div  v-else class="my_toupiao" v-show="toup_btn_a"  @click="toggle_like()" >
                <button type="button" name="button">投TA一票</button>
            </div>






          </div>
      </div>

      <!--分享按钮-->

    </div>
</template>

<script>
export default {
  data(){
    return{
      sharetc:true,
      vote:[],
      toup_btn_b:true,
      toup_btn_a:true,
      share_show:false,
      desc:'',
      imgurls:'',
      suffix:'',
      titles:'',
      jiluall:false,
      list_record:[],
      list_souce_data:[],
      post_id:'',
      share_postid:'',
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

   },
   mounted() {
     this.getJsAuth();
     this.getrecord()
     this.txsx()

      console.log("mounted-测试m")
   },

  watch: {

  },

  methods: {

    getJsAuth() {
      let that = this;
      var qs = require('qs');
      var param={
          url:location.href.split('#')[0],
      }

      this.share_postid=this.$route.params.post_id;
      let url = this.api.userApi.getJs;
      this.axios.post(url,qs.stringify(param))
      .then(result => {
        console.log(result)
        console.log(result.data.data.appId);

        if(this.vote.list_type=="vote"){
            this.titles="我在参赛，请为我投票"
        }else{
            this.titles=this.desc
        }


        wx.config({
          debug: false,
          appId: result.data.data.appId, // 必填，公众号的唯一标识
          timestamp: result.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: result.data.data.nonceStr, // 必填，生成签名的随机串
          signature: result.data.data.signature,
          jsApiList: [ //需要调用的JS接口列表
            'updateAppMessageShareData', //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0） 新接口
            'updateTimelineShareData', //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0） 老接口
            'onMenuShareTimeline', //分享到朋友圈 老接口
            'onMenuShareAppMessage', //分享给盆友 老接口
            'getLocation' //获取定位
          ]
        });


            wx.onMenuShareAppMessage({
              title: this.titles, // 分享标题
              desc: this.desc, //分享描述
              link: 'http://www.staffhome.cn/activeshare/'+this.share_postid, // 分享链接
              imgUrl: this.imgurls+this.suffix, // 分享图标
              success() {
                console.log('分享成功')
              }
            });
            wx.onMenuShareTimeline({
              title:this.titles, // 分享标题
              desc: this.desc, //分享描述
              link: 'http://www.staffhome.cn/activeshare/'+this.share_postid, // 分享链接
              imgUrl: this.imgurls+this.suffix, // 分享图标
              success() {
                console.log('分享成功')
              }
            });

      })

    },
    showcl(){
          this.sharetc = false;
          this.share_postid=this.$route.params.post_id;
          // alert(this.share_postid);

          if(this.vote.list_type=="vote"){
              this.titles="我在参赛，请为我投票"
          }else{
              this.titles=this.desc
          }


          wx.onMenuShareAppMessage({
            title: this.titles, // 分享标题
            desc: this.desc, //分享描述
            link: 'http://www.staffhome.cn/activeshare/'+this.share_postid, // 分享链接
            imgUrl: this.imgurls+this.suffix, // 分享图标
            success() {
              console.log('分享成功')
            }
          });
          wx.onMenuShareTimeline({
            title: this.titles, // 分享标题
            desc: this.desc, //分享描述
            link: 'http://www.staffhome.cn/activeshare/'+this.share_postid, // 分享链接
            imgUrl: this.imgurls+this.suffix, // 分享图标
            success() {
              console.log('分享成功')
            }
          });

    },
    txsx(){
      setTimeout(()=>{
      // this.data = this.data.concat(this.data)
        this.sharetc = false
        // console.log(this.data.length)
      },4000)

    },
    //投票
    toggle_like(){
      var param={
           post_id:this.$route.params.post_id,
      }

      var qs = require('qs');
      let url = this.api.userApi.get_dianzan
      this.axios.post(url,qs.stringify(param),
      // {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token"),'code':window.localStorage.getItem("code")}}
      )
      .then((res) => {
        console.log("点赞？？？？？？？？？？？？？")
        this.toup_btn_a=false;
        this.toup_btn_b=true;
        //点击增加1
        // this.pubu_data[index].is_kudos=1
        this.getrecord();
        // this.pubu_data[index].kudos++
        // this.$toast(res.data.msg);

      }).catch((error) => {
        console.warn(error)
      })

    },
    //删除

    getrecord(){
      console.log(this.$route.params.post_id);
      var params={
          post_id:this.$route.params.post_id,
          page:1,
          pagesize:5,
      }


      // this.share_postid = this.$route.params.share_postid;
      var parm = JSON.stringify(params);
      console.log(params);
      var qs = require('qs');
      let url = this.api.userApi.get_activityrecord
      this.axios.post(url,qs.stringify({params:parm}),)
      .then((res) => {


        var count_hd = res.data.data.pageElementList.activity_log_detail.data.count;
        if(count_hd==0){
          this.$toast("暂无活动数据");

        }
        else{
          console.log(res.data.data.pageElementList.activity_log_detail.data.data[0]);
          this.vote=res.data.data.pageElementList.activity_log_detail.data.data[0];

          this.desc=res.data.data.pageElementList.activity_log_detail.data.data[0].content;
          this.imgurls=res.data.data.pageElementList.activity_log_detail.data.data[0].source[0].path;
          this.suffix=res.data.data.pageElementList.activity_log_detail.data.data[0].source[0].suffix;
          this.jiluall=true
          this.list_record=res.data.data.pageElementList.activity_log_detail.data.data[0];

          console.log(this.list_record);
          this.list_souce_data=res.data.data.pageElementList.activity_log_detail.data.data[0].source;

            console.log(res.data.data.pageElementList.activity_log_detail);
          // this.post_id=res.data.data.pageElementList.activity_log_detail.data.data[0].post_id;

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

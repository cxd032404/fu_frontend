<template lang="html">
    <div class="container-fluid">
      <div class="review_fix">

          <div class="revw_top">
              <div class="rvw_top_a">
                  <div class="fl rvtlt">
                    <a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/11316.png"></a>
                  </div>
                  <!-- <div class="fr rvtrt" @click="share()">
                    <img src="@/assets/images/1305.png">
                  </div> -->
              </div>
          </div>

          <div class="revw_ship" >
            <swiper :options="sw_vd_img" class="sw_vd_img" >
              <swiper-slide v-for="(item,index) in blist"  :key="index"  >
                <div  v-if="item.type=='video'"   class="m_vdsp_all" >
                  <!-- <video  id="vide"  controls autoplay :src="item.path" @click="videoClick()">
                  </video> -->
                   <img class="videobtns" :class="{'videobtn':videobtnTrue}"  src="@/assets/images/video_start.png"  @click="videoClick(item.path)">
                   <video :id="item.path"  :poster="item.path+item.suffix"  :src="item.path" type="video/mp4" @click="videoClick(item.path)" ></video>
                </div>
                <div v-else class="m_vdsp_all">
                    <img :src="item.path">
                </div>
              </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>

          <div class="revw_foot">
              <div class="revw_ft_nr">
                  <div class="revw_btm_a">
                    <div class="fl rv_a">
                        <img v-if="useinfo.user_img" :src="useinfo.user_img" alt="">
                        <img v-else src="@/assets/images/5959.png" alt="">
                          <!-- {{useinfo.user_img}} -->
                        {{useinfo.nick_name}}
                    </div>
                    <div class="fr rv_b">
                       <img src="@/assets/images/10529.png" alt="">
                       {{nrlist.kudos}}
                    </div>
                  </div>
                  <div class="revw_btm_b">
                    <p>{{nrlist.content}}</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    var _this = this
    return{
      videID:'',
      imgIndex:'',
      suolvtu:"",
      sharecont:"",
      videobtnTrue:false,//视频播放
      nrlist:[],
      blist:[],
      useinfo:[],
      share_postid:'',
      tan_images:'',
      sw_vd_img:{
        slidesPerView: '1',
        spaceBetween: 0,
        initialSlide:0,
        loop:false,
        speed:700, //config参数同swiper4,与官网一致
        pagination:{
             el: " .swiper-pagination",
             clickable: true,
             type: "fraction"
        },
        on:{
        slideChangeTransitionStart: function () {
          // _this.imgIndex = this.realIndex;
          // _this.videoClick(_this.imgIndex);
          var vide=document.getElementById(_this.videID);
          vide.pause();
          _this.videobtnTrue=false;
          }
        },
      },
    }
  },
  created() {
    this.getJsAuth();
    this.getrecord();
  },
  methods: {
    // 视频播放暂停
    videoClick(url){
      console.log(url);
    //显示视频播放按钮
    // alert(item);
     this.videID=url;
      this.videobtnTrue=!this.videobtnTrue;
     var vide=document.getElementById(url);

     // vide.addEventListener('ended', function () {
     // this.videobtnTrue==false;
     //  alert(1);
     // }, false);

     if(vide.paused){
      vide.play();
     }else if(vide.play()){
       vide.pause();
      }
    },
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
              title: "精彩回顾", // 分享标题
              desc: this.sharecont, //分享描述
              link: 'http://www.staffhome.cn/reviewDetail/'+this.share_postid, // 分享链接
              imgUrl: this.suolvtu, // 分享图标
              success() {
                console.log('分享成功')
              }
            });
            wx.onMenuShareTimeline({
              title: "精彩回顾", // 分享标题
              desc: this.sharecont, //分享描述
              link: 'http://www.staffhome.cn/reviewDetail/'+this.share_postid, // 分享链接
              imgUrl: this.suolvtu, // 分享图标
              success() {
                console.log('分享成功')
              }
            });

      })

    },

    share(){

      // wx.onMenuShareAppMessage({
      //   title: "精彩回顾的标题Andy自定义微信好友", // 分享标题
      //   desc: "精彩回顾的描述Andy自定义微信好友", //分享描述
      //   link: 'http://www.staffhome.cn/reviewDetail/'+this.share_postid, // 分享链接
      //   imgUrl: this.imgurls+this.suffix, // 分享图标
      //   success() {
      //     console.log('分享成功')
      //   }
      // });
      // wx.onMenuShareTimeline({
      //   title: "精彩回顾的标题Andy自定义朋友圈", // 分享标题
      //   desc: "精彩回顾的描述Andy自定义朋友圈", //分享描述
      //   link: 'http://www.staffhome.cn/reviewDetail/'+this.share_postid, // 分享链接
      //   imgUrl: this.imgurls+this.suffix, // 分享图标
      //   success() {
      //     console.log('分享成功')
      //   }
      // });


    },
    //获取详情
    getrecord(){
      var $this=this;
      var params={
        post_id:this.$route.params.post_id,
        company:localStorage.getItem("company_id"),
        page_sign:"postInfo",
      }
      var qs = require('qs');
      var parm = JSON.stringify(params);
      // var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {
        //顶部name
        console.log(res);
        this.nrlist=res.data.data.pageElementList.postInfo.detail;
        this.sharecont=res.data.data.pageElementList.postInfo.detail.content;
        // 获取头像
        this.useinfo=res.data.data.pageElementList.postInfo.detail.user_info;
        //banner轮播
        this.blist=res.data.data.pageElementList.postInfo.detail.source;
        if(this.blist.length>1){
            this.suolvtu=this.blist[0].path+this.blist[0].suffix;
        }



        console.log(this.nrlist)
      }).catch((error) => {
        console.warn(error)
      })
    },




  }
}
</script>

<style lang="css" scoped>
</style>

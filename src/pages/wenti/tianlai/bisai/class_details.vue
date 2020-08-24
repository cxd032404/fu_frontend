<template lang="html">
  <div class="container-fluid jingpin_bg">
    <div class="pb_tag_top">
      <span><a  @click="returnBack" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{pagename.page_name}}
    </div>
    <div class="pb_top_zhanwei"></div>

    <!-- 详情大图 -->
    <div class="container-fluid">
        <div class="cart_video">
          <video :src="list_menu.path"   controls :poster="list_menu.path+list_menu.suffix">
          </video>
        </div>

        <div class="container xunlian" v-html="list_vd_nr.content" :class="slideFlag ? 'cardlist active' : 'cardlist'" >

        </div>
        <!-- <button @click="dianjup()" class="vd_btn_nr" type="button" name="button">  <img src="@/assets/images/arrows_open_content.png" alt=""></button> -->


        <!-- 猜你喜欢 -->
        <div class="container c_like">
          <h2>{{connect_l_name.list_name}}</h2>
          <ul>
            <li v-for="(item,index) in more_video"  :key="index" @click="classDT(item.post_id)">
              <div class="c_like_nr" >
                <div class="c_like_lt fl">
                  <!-- <video :src="item.source[0].path"  controls  :poster="item.source[0].path+item.source[0].suffix"  >
                  </video> -->
                  <img :src="item.source[0].path+item.source[0].suffix">

                  <div class="c_like_pos">
                     <!-- <h4>维密天使雕刻计划</h4> -->
                     <!-- <p>00:25:34</p> -->
                   </div>
                </div>
                <div class="c_like_rt fr">
                  <h1>{{item.title}}</h1>
                  <p><span>{{item.views}}</span>人观看</p>
                </div>

              </div>
            </li>


          </ul>
        </div>
    </div>


    <div class="zhanwei"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      more_video:[],
      slideFlag: false,
      list_menu:[],
      pagename:[],
      top_video:[],
      videolist:[],
      video_all_list:[],
      list_vd_nr:[],
      showall:false,
      connect_l_name:[],
      //返回对应的下标
      details_index:"",
      params:{
        company:localStorage.getItem("company_id"),
        page_sign:"class_details",
        post_id:this.$route.params.post_id,
      },

    }
  },
  created() {
    this.detail()

  },
  watch:{
    '$route' (to,from){
      this.$router.go(0);
    }
  },
  // mounted() {
  //     window.addEventListener('scroll', this.scrollToTop)
  // },
  // destroyed() {
  //     window.removeEventListener('scroll', this.scrollToTop)
  // },
  methods:{

    dianjup(){
      console.log(111);
      this.slideFlag = !this.slideFlag;

    },
    //返回到对应的下标
    returnBack(){

      // alert(1);
      //  return
       this.$router.back(-1);

    },

    //点击详情页更多列表页跳转其他页面注意，params参数
    classDT(post_id){
        // this.params.post_id=post_id
        // this.detail();
        // alert(post_id);
        this.$router.push({ name: 'class_details', params: { post_id: post_id } });
        // this.detail();
    },

    // 详情页接口数据
    detail(){
      var $this=this;
      var company_id =  localStorage.getItem("company_id");

      //params写成公用的了

      var qs = require('qs');
      var parm = JSON.stringify(this.params);
      console.log(parm);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+this.params.company+'/'+this.params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {

        this.pagename=res.data.data.pageInfo;
        // console.log(res.data.data.pageElementList.class_details_video.data.data)
        this.list_menu=res.data.data.pageElementList.class_details_menu.detail.source[0];
        this.top_video=res.data.data.pageElementList.class_details_video.detail;

        this.video_all_list=res.data.data.pageElementList.class_details_video.data.data;
        //
        //
        // this.videolist=res.data.data.pageElementList.class_details_video.data.data;
        // for(var i=0;i<this.videolist.length;i++){
        //   this.video_all_list.push(this.videolist[i].source[0]);
        // }
        this.list_vd_nr=res.data.data.pageElementList.class_details_menu.detail;
        console.log(res.data.data.pageElementList.class_details_menu.detail.connect_list);
        this.more_video=res.data.data.pageElementList.class_details_menu.detail.connect_list;
        this.connect_l_name=res.data.data.pageElementList.class_details_menu.detail;
        console.log(  this.connect_l_name);


      }).catch((error) => {
        console.warn(error)
      })
    },

  }

}
</script>

<style lang="css" scoped>
</style>

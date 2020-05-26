<template lang="html">
  <div class="container-fluid">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{pagename.page_name}}
    </div>

    <!-- 详情大图 -->
    <div class="container-fluid">
        <div class="cart_video">
          <video :src="top_video.img_url" autoplay controls :poster="top_video.img_url">
          </video>
        </div>

        <div class="container xunlian" v-html="list_menu.content">
            <!-- <h2>{{list_menu.element_name}}</h2>
            <p>

            </p> -->

        </div>

        <!-- 猜你喜欢 -->
        <div class="container c_like">
          <h2>猜你喜欢</h2>
          <ul>
            <li v-for="(item,index) in video_all_list"  :key="index" >
              <div class="c_like_nr">
                <video :src="item.path" controls  :poster="item.path+item.suffix">
                </video>
                <div class="c_like_pos">
                  <h4>维密天使雕刻计划</h4>
                  <p>00:25:34</p>
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
      list_menu:[],
      pagename:[],
      top_video:[],
      videolist:[],
      video_all_list:[],
    }
  },
  created() {
    this.detail()
  },
  methods:{
    detail(){
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        company:company_id,
        page_sign:this.$route.name,
        post_id:this.$route.query.id,
      }

      var qs = require('qs');
      var parm = JSON.stringify(params);
      let url = this.api.userApi.jinpin_detail
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {

        this.pagename=res.data.data.pageInfo;

        console.log(res.data.data.pageElementList.class_details_video.data.data)
        this.list_menu=res.data.data.pageElementList.class_details_menu.detail;
        this.top_video=res.data.data.pageElementList.class_details_video.detail;


        this.videolist=res.data.data.pageElementList.class_details_video.data.data;
        for(var i=0;i<this.videolist.length;i++){
          this.video_all_list.push(this.videolist[i].source[0]);
        }
        console.log(this.video_all_list);


      }).catch((error) => {
        console.warn(error)
      })
    },

  }

}
</script>

<style lang="css" scoped>
</style>

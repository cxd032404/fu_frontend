<template lang="html">
  <div class="container-fluid jingpin_bg">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{pagename.page_name}}
    </div>

    <div class="jingpin_data_list">
      <swiper :options="swiperOption_jinpin">
      　　<swiper-slide v-for="(item,index) in nav_list"  :key="index"   :class="{'active':index==current}"  >
      　　  <div class="jinpin_list"><p>{{item.name.substr(3,5)}}</p><span>{{item.name.substr(0,2)}}</span></div>
      　　</swiper-slide>

      </swiper>
    </div>

    <!-- 精品课内容 -->
      <div class="jingpin_wx container" >
          <!-- <div class="wx_top_nr">
               <h2>微笑露一点，说话轻一点</h2>
              <p>快行动起来吧！</p>
               <img :src="pic_menu_top.img_url"> 
          </div> -->
          <div class="jinpin_vd_list">
              <ul>
                <li  v-for="(item,index) in class_menu_top_all"  :key="index" @click="classDetail(item.post_id)">
                  <div class="jp_vd_nr">
                      <video :src="item.path" controls >
                      </video>
                      <div class="jp_vd_ms">
                        <h2>瘦腿训练</h2>
                        <p>3088人已观看</p>
                      </div>
                  </div>
                </li>
              </ul>
          </div>
      </div>
      <!-- 占位符 -->
      <div class="zhanwei">
      </div>
  </div>
</template>

<script>
export default {
  data() {
    var _this = this
    return {
      current:0,
      pagename:[],
      nav_list:[],
      classmenurArr:[],
      classmenurArr_conent:[],
      class_menu_top:[],
      class_menu_top_all:[],
      picArrall_content:[],
      pic_menu_top:[],
      pic_menu_top_all:[],

      picArrall:[],
      swiperOption_jinpin: {
          slidesPerView: 'auto',
          spaceBetween: 0,
          loop:false,
          speed:600,
          on: {
                click: function () {
                  // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
                  // console.log(this); // -> Swiper
                  // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                  const clickedIndex = this.clickedIndex;
                  // console.log(this.clickedIndex);
                  _this.handleClickSlide(clickedIndex);
                }
              }
          // centeredSlides: true,
        },
    }
  },

  //点击当前li增加class

  created() {

    this.jingpin_list()
    this.video_list_first()
  },

  methods:{

    //点击跳转详情页
    classDetail(post_id){
      console.log(post_id);
     this.$router.push({path: 'class_details', query: {id: post_id}})
    },

    handleClickSlide(index) {
          console.log('当前点击索引：', index);
          this.current=index;

          this.classmenurArr_conent=[];
          this.class_menu_top_all=[];
          //点击切换对应下面的数组
          var $this=this;
          var company_id =  localStorage.getItem("company_id");
          var params={
            company:company_id,
            page_sign:this.$route.name,
          }
          // var parm = JSON.stringify(params);
          var qs = require('qs');
          let url = this.api.userApi.jinpin_class
          // this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
          this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify(params),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
          .then((res) => {

            // this.fulllist = res.data.data.pageElementList.class_menu+index;
            // console.log(Object.keys(res.data.data.pageElementList))
            var objArr=Object.keys(res.data.data.pageElementList)
            var classmenurArr=[]
            var picArr=[]
            for(var i=0;i<objArr.length;i++){
              if(objArr[i].indexOf('class_menu')!=-1){
                classmenurArr.push(res.data.data.pageElementList[objArr[i]])
              }
              if(objArr[i].indexOf('class_pic')!=-1){
                picArr.push(res.data.data.pageElementList[objArr[i]])
              }
            }
            console.log(classmenurArr);
            this.classmenurArr=classmenurArr;
            this.picArrall =picArr;
            console.log("获取class_menu所有数组")
            console.log(this.classmenurArr);
            console.log(this.picArrall);


            console.log("根据index判断当前显示哪个数组");
            console.log();
            this.classmenurArr_conent.push(this.classmenurArr[index].data);

            this.pic_menu_top=this.picArrall[index].detail;
            // console.log(this.picArrall_content[0].detail);

            console.log(this.classmenurArr_conent[0].data);
            //循环上面的数组里面的东西push到一个新的数组里面
            this.class_menu_top= this.classmenurArr_conent[0].data;


            for(var m=0;m<this.class_menu_top.length;m++){
              this.class_menu_top_all.push(this.class_menu_top[m].source[0]);

            }


            // console.log(this.classmenurArr_conent[0].data);
            // console.log(index);
            console.log("最后数组列表");
            console.log(this.class_menu_top_all);
            // console.log(this.pic_menu_top_all);



          }).catch((error) => {
            console.warn(error)
          })




      },

  video_list_first(){

    //点击切换对应下面的数组
    var $this=this;
    var company_id =  localStorage.getItem("company_id");
    var params={
      company:company_id,
      page_sign:this.$route.name,
    }
    // var parm = JSON.stringify(params);
    var qs = require('qs');
    let url = this.api.userApi.jinpin_class
    // this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
    this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify(params),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
    .then((res) => {
      this.pagename=res.data.data.pageInfo;
      // this.pagename=res.data.data.pageInfo;
      // this.fulllist = res.data.data.pageElementList.class_menu+index;
      // console.log(Object.keys(res.data.data.pageElementList))
      var objArr=Object.keys(res.data.data.pageElementList)
      var classmenurArr=[]
      var picArr=[]
      for(var i=0;i<objArr.length;i++){
        if(objArr[i].indexOf('class_menu')!=-1){
          classmenurArr.push(res.data.data.pageElementList[objArr[i]])
        }
        if(objArr[i].indexOf('class_pic')!=-1){
          picArr.push(res.data.data.pageElementList[objArr[i]])
        }
      }
      console.log(classmenurArr);
      this.classmenurArr=classmenurArr;
      this.picArrall =picArr;
      console.log("获取class_menu所有数组")
      console.log(this.classmenurArr);
      console.log(this.picArrall);


      console.log("根据index判断当前显示哪个数组");
      this.classmenurArr_conent.push(this.classmenurArr[0].data);
      this.picArrall_content.push(this.picArrall[0]);

      console.log(this.picArrall_content[0].detail);

      console.log(this.classmenurArr_conent[0].data);
      //循环上面的数组里面的东西push到一个新的数组里面
      this.class_menu_top= this.classmenurArr_conent[0].data;
      this.pic_menu_top=this.picArrall_content[0].detail;

      for(var m=0;m<this.class_menu_top.length;m++){
        this.class_menu_top_all.push(this.class_menu_top[m].source[0]);
      }


      // console.log(index);
      console.log("最后数组列表");
      console.log(this.class_menu_top_all);



    }).catch((error) => {
      console.warn(error)
    })


  },
    // selectSort(index){
    //   console.log(index);
    //   this.current=index;
    // },
    jingpin_list(){
      console.log(this.$route.name)
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        company:company_id,
        page_sign:this.$route.name,
      }
      // var parm = JSON.stringify(params);
      var qs = require('qs');
      let url = this.api.userApi.jinpin_class
      // this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify(params),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {
        this.nav_list = res.data.data.pageElementList.class_nav.detail.jump_urls;
        console.log(res.data.data.pageElementList);
        console.log(res.data.data.pageElementList);



      }).catch((error) => {
        console.warn(error)
      })
    },
  }


}
</script>

<style lang="css" scoped>
</style>

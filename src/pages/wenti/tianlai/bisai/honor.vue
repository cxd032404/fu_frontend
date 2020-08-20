<template lang="html">
  <div class="container-fluid " >
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          {{pagename.page_name}}
    </div>
    <div class="pb_top_zhanwei"></div>

      <div class="rongyulist_top container-fluid">
        <ul>
          <li v-for="(item,index) in nav_list"  :key="index" :class="{'active':index==current}" @click="nav_click(index)">{{item.name}}</li>
        </ul>
      </div>

      <div class="rongyu_content container">
        <div class="rongyu_box">
          <van-list  v-model="loading" :immediate-check="false" :offset="100" :finished="finished"
            finished-text="没有更多内容了" @load="loadMore" ref="list_all">
            <ul>
              <!-- <li v-for="(item,index) in list_all"   :key="index" @click="honordetail(item.post_id)"  class=" wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s"> -->
              <li v-for="(item,index) in list_all"   :key="index" @click="honordetail(item.post_id)">
                <div class="rongyu_nr" >
                    <div class="fl ryu_lt">
                      <h2>{{item.title}}</h2>
                      <p>{{item.create_time}}</p>
                    </div>
                    <div class="fr ryu_rt">
                      <img :src="item.source[0].path">
                    </div>
                </div>
              </li>
            </ul>

          </van-list>


        </div>
      </div>


      <div class="zhanwei">
      </div>
  </div>
</template>

<script>
import {WOW} from 'wowjs';
export default {
  //注册子组件

  data() {
    return {

      mapaddress:localStorage.getItem("mapaddress"),
      nav_list:[],
      current:0,
      listArr_list:[],
      list_all:[],
      pagename:[],
      index:0,

      //下拉加载
      loading: false,
      finished: false,
      pagesize:3,
      pageNum:1,
      totalpage:"",

    }
  },
  created() {
    this.get_rongyu_list()
  },
  mounted(){

 },
 watch: {
   nav_list:function(){
       this.$nextTick(function(){
         new WOW({live: false,offset:50,}).init();
         // alert(1);
       });
   }
 },
  methods:{


    honordetail(post_id){
         this.$router.push({path:'honor_details', query: {id: post_id}})
    },
    nav_click(index){


        this.pageNum=1;
        this.list_all=[];
        this.current=index;
        this.index=index;
        this.loading = false;
        this.finished = false;
        this.get_rongyu_list();




    },
    //
    get_rongyu_list(){


      //上拉刷新初始化
      this.loading = true;
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        company:company_id,
        page_sign:this.$route.name,
        page_size:this.pagesize,
        page:this.pageNum,
      }
      console.log(params);
      var qs = require('qs');
      var parm = JSON.stringify(params);
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {
        console.log(res.data.data.pageElementList)
        this.nav_list=res.data.data.pageElementList.honor_nav.detail.jump_urls
        this.pagename=res.data.data.pageInfo;

        var objArr=Object.keys(res.data.data.pageElementList)
        var listArr=[]

        for(var i=0;i<objArr.length;i++){
          if(objArr[i].indexOf('honor_menu')!=-1){
            listArr.push(res.data.data.pageElementList[objArr[i]])
          }
        }
        this.listArr_list=listArr;
        console.log("数据部分");
        console.log(this.listArr_list[this.index].data.total_page);
        this.totalpage=this.listArr_list[this.index].data.total_page;
        // this.list_all=this.listArr_list[this.index].data.data;
        this.list_all=this.list_all.concat(this.listArr_list[this.index].data.data);

        console.log("数据部分list_all");
        console.log(this.list_all);
        this.loading = false;
        this.finished = false;

        // console.log(res.data.data.pageElementList.honor_menu1.data.data.length);
        if(res.data.data.pageElementList.honor_menu1.data.data.length==0)
        {
            this.finished = true;
        }

      }).catch((error) => {
        console.warn(error)
      })

    },


    loadMore(){
      this.pageNum++;
      console.log(this.pageNum);
      this.loading = true;
      this.get_rongyu_list();
      // 加载状态结束

    },




  }
}
</script>

<style lang="css" scoped>
</style>

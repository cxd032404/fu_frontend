<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{pagename.page_name}}
    </div>

      <div class="rongyulist_top container-fluid">
        <ul>
          <li v-for="(item,index) in nav_list"  :key="index" :class="{'active':index==current}" @click="nav_click(index)">{{item.name}}</li>
        </ul>
      </div>

      <div class="rongyu_content container">
        <div class="rongyu_box">
            <ul>
            <van-list
               v-model="loading"
               :finished="finished"
               finished-text="没有更多了"
               @load="onLoad"
              >
              <li v-for="(item,index) in list_all"  :key="index" @click="honor_detail(item.post_id)">
                <div class="rongyu_nr">
                    <div class="fl ryu_lt">
                      <h2>{{item.title}}</h2>
                      <p>{{item.create_time}}</p>
                    </div>
                    <div class="fr ryu_rt">
                      <img :src="item.source[0].path">
                    </div>
                </div>
              </li>
              </van-list>

            </ul>
        </div>
      </div>


      <div class="zhanwei">
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav_list:[],
      current:0,
      listArr_list:[],
      list_all:[],
      pagename:[],
      pagesize:1,
      loading: false,
      finished: false,
      pageNum:1,


    }
  },
  created() {
    this.get_rongyu_list()
  },
  methods:{
    //下拉刷新
    onLoad() {
      console.log("下拉加载");

      setTimeout(() => {
        for (let pageNum = 1; pageNum < this.count; pageNum++) {
          this.list_all=this.list_all.concat(this.listArr_list[0].data.data);
        }


        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list_all.length >= this.count) {
          this.finished = true;
        }
      }, 1000);

    },



    honor_detail(post_id){
         this.$router.push({path:'honor_details', query: {id: post_id}})
    },
    nav_click(index){
        this.current=index;

        console.log(this.listArr_list[index].data.data);
        this.list_all=this.listArr_list[index].data.data;

    },
    //
    get_rongyu_list(){
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        company:company_id,
        page_sign:this.$route.name,
        page_size:this.pagesize,
        page:this.pageNum,
      }
      var parm = JSON.stringify(params);
      var qs = require('qs');
      let url = this.api.userApi.rongyu_list
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {

        this.count=res.data.data.pageElementList;
        this.nav_list=res.data.data.pageElementList.honor_nav.detail.jump_urls
        this.pagename=res.data.data.pageInfo;

        var objArr=Object.keys(res.data.data.pageElementList)
        var listArr=[]

        for(var i=0;i<objArr.length;i++){
          if(objArr[i].indexOf('honor_menu')!=-1){
            listArr.push(res.data.data.pageElementList[objArr[i]])
          }
        }


        console.log(listArr);
        this.listArr_list=listArr;
        console.log("数据部分");
        console.log(  this.listArr_list);
        // this.list_all=this.list_all.concat(this.listArr_list[0].data.data);
        this.list_all=this.listArr_list[0].data.data;
        this.count=this.listArr_list[0].data.count;




      }).catch((error) => {
        console.warn(error)
      })
    },

  }
}
</script>

<style lang="css" scoped>
</style>

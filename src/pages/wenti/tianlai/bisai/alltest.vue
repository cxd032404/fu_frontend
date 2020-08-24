<template lang="html">
  <div class="container-fluid "  style="height:400px;overflow-y:auto;">
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
          <van-list  v-model="loading" :immediate-check="false" :offset="100" :finished="finished"
            finished-text="没有更多了" @load="loadMore" ref="list_all">

            <ul>
              <li v-for="(item,index) in list_suoyou"  :key="index" @click="honor_detail(item.post_id)">
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
            </ul>

          </van-list>
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
      pagesize:4,
      loading: false,
      finished: false,
      pageNum:1,
      listArr_list:[],
      list_all:[],
      pagename:[],
      total_page:"",
      list_suoyou:[],
      index:0,

    }
  },
  mounted(){
    // this.get_rongyu_list();
  },
  created() {
    this.get_rongyu_list();
  },
  methods:{


    nav_click(index){
        this.index=index;
        this.current=index;
        // this.get_rongyu_list();
        // this.pageNum=1;
        // this.list_all=this.listArr_list[index].data.data;
        // console.log(index);
        // console.log(this.listArr_list[index].data.data);
        // this.list_all=[];
        // this.list_all=this.list_all.concat(this.listArr_list[index].data.data);thi
        // this.get_rongyu_list();
        this.filterAir();
    },

    loadMore() {
      setTimeout(() => {

        this.pageNum ++;
        console.log(this.pageNum)
        this.get_rongyu_list();
        // if(this.pageNum>=this.count)
        // {
        //    this.finished = true;
        // }
      });
    },

    honor_detail(post_id){
         this.$router.push({path:'honor_details', query: {id: post_id}})
    },

    get_rongyu_list(){

      if (this.pageNum == 1) {
          this.list_all = [];
      }

      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var params={
        company:company_id,
        page_sign:this.$route.name,
        page_size:this.pagesize,
        page:this.pageNum,
      }

      console.log(params)
      var parm = JSON.stringify(params);
      var qs = require('qs');
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
      .then((res) => {

        // this.count=res.data.data.pageElementList;
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
        // this.loading = false;
        console.log("以下是数据部分");
        // console.log(this.listArr_list[0].data.data);
        // list_suoyou

        this.list_suoyou=this.listArr_list[this.index].data.data;
        console.log(this.list_suoyou);
        // this.list_suoyou=this.list_suoyou.concat(this.listArr_list);
        //
        // console.log(this.list_suoyou);
        this.filterAir()
        // this.list_all=this.list_all.concat(this.listArr_list[0].data.data);
        // this.total_page=this.listArr_list[0].data.total_page;
        console.log("总页数");
        console.log(this.total_page);
        // if (this.pageNum > 1 && this.list_all.length > 0) {
        //
        // }
        // if (this.pageNum  == this.total_page) {
        //   this.finished = true;
        //   this.loading = true;
        // }
      }).catch((error) => {
        console.warn(error)
      })
    },

    filterAir(){
        //当前下边下面的所有数据

        // this.list_suoyou=this.list_suoyou.concat();
        this.list_suoyou=this.list_suoyou.concat(this.list_suoyou);
        console.log("所有数据");
        console.log(this.list_suoyou);
        //当前index下面的页数
        // this.total_page=this.list_suoyou[this.index].data.total_page;
        // if (this.pageNum  == this.total_page) {
        //   this.finished = true;
        //   this.loading = true;
        // }

    },

  }
}
</script>

<style lang="css" scoped>
</style>

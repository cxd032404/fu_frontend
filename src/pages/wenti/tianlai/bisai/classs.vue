<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        {{pagename.page_name}}
    </div>
      <div class="pb_top_zhanwei"></div>
      <!-- 精品课NEW -->
      <div class="jpin_new_list container" >
          <div class="jpin_div wow fadeInUp"  data-wow-duration="1s" data-wow-delay=".2s" v-if="yilist_b.length > 0">
              <div class="jpin_nw_top"  @click="more1(yilist_a.list_id)">
                  <img :src="yilist_c.img_url">
                  <h1>{{yilist_a.list_name}}</h1>
              </div>
              <div class="jpin_nw_nr">
                  <ul>
                    <li v-for="(item,index) in yilist_b"  :key="index"  @click="toDeail(item.post_id)">
                      <div class="fl jpin_nw_lt">
                          <img :src="item.source[0].path+item.source[0].suffix" alt="">

                      </div>
                      <div class="fl jpin_nw_rt">
                          <h1>{{item.title | ellipsis}} <img src="@/assets/images/rscopy.png"></h1>
                          <p>难度：新手入门 | {{item.views}}人学习</p>
                      </div>
                    </li>
                  </ul>
              </div>

              <div class="jinpin_more tc" @click="more1(yilist_a.list_id)">
                     <p>查看更多</p>
              </div>
          </div>
          <div v-else></div>
          <div class="jpin_div wow fadeInUp"  data-wow-duration="1s" data-wow-delay=".5s" v-if="erlist_b.length > 0">
              <div class="jpin_nw_top" @click="more2(erlist_a.list_id)">
                  <img :src="erlist_c.img_url">
                  <h1>{{erlist_a.list_name}}</h1>

              </div>
              <div class="jpin_nw_nr">
                  <ul>
                    <li v-for="(item,index) in erlist_b"  :key="index"  @click="toDeail(item.post_id)">
                      <div class="fl jpin_nw_lt">
                          <img :src="item.source[0].path+item.source[0].suffix" alt="">
                          <video id="videHour" :src="item.source[0].path">
                          </video>
                      </div>
                      <div class="fl jpin_nw_rt">
                        <h1>{{item.title | ellipsis}}  <img src="@/assets/images/rscopy.png"></h1>
                          <!-- <p>06.00 · {{item.views}}人已看</p> -->
                          <p>{{item.views}}人已看</p>
                      </div>
                    </li>
                  </ul>
              </div>

              <div class="jinpin_more tc"  @click="more2(erlist_a.list_id)">
                  <p>查看更多</p>
              </div>
          </div>
          <div v-else></div>
          <!-- <a name="id">22</a> -->
          <div class="jpin_div wow fadeInUp"  data-wow-duration="1s" data-wow-delay=".8"  v-if="sanlist_b.length > 0">
              <div class="jpin_nw_top" @click="more3(sanlist_a.list_id)" >
                  <img :src="sanlist_c.img_url">
                  <h1>{{sanlist_a.list_name}}</h1>

              </div>
              <div class="jpin_nw_nr">
                  <ul>
                    <li v-for="(item,index) in sanlist_b"  :key="index" @click="toDeail(item.post_id)">
                      <div class="fl jpin_nw_lt">
                          <img :src="item.source[0].path+item.source[0].suffix" alt="">
                      </div>
                      <div class="fl jpin_nw_rt">
                            <h1>{{item.title | ellipsis}}  <img src="@/assets/images/rscopy.png"></h1>
                          <p> {{item.views}}人已看</p>
                      </div>
                    </li>
                  </ul>
              </div>

              <div class="jinpin_more tc" @click="more3(sanlist_a.list_id)">
                  <p>查看更多</p>
              </div>
          </div>
          <div v-else></div>
          <div class="jpin_div wow fadeInUp"  data-wow-duration="1s" data-wow-delay="1.1s" v-if="silist_b.length > 0" >
              <div class="jpin_nw_top" @click="more4(silist_a.list_id)">

                  <img :src="silist_c.img_url">
                  <h1>{{silist_a.list_name}}</h1>

              </div>
              <div class="jpin_nw_nr">
                  <ul>
                    <li v-for="(item,index) in silist_b"  :key="index"  @click="toDeail(item.post_id)">
                      <div class="fl jpin_nw_lt">
                          <img :src="item.source[0].path+item.source[0].suffix" alt="">
                      </div>
                      <div class="fl jpin_nw_rt">
                            <h1>{{item.title | ellipsis}}  <img src="@/assets/images/rscopy.png"></h1>
                          <p>{{item.views}}人已看</p>
                      </div>
                    </li>
                  </ul>
              </div>

              <div class="jinpin_more tc" @click="more4(silist_a.list_id)">
                  <p>查看更多</p>
              </div>
          </div>
          <div v-else></div>
          <div class="jpin_div wow fadeInUp"  data-wow-duration="1s" data-wow-delay="1.4s" v-if="wulist_b.length > 0" >
              <div class="jpin_nw_top"  @click="more5(wulist_a.list_id)">
                  <img :src="wulist_c.img_url">
                  <h1>{{wulist_a.list_name}}</h1>
              </div>
              <div class="jpin_nw_nr">
                  <ul>
                    <li v-for="(item,index) in wulist_b"  :key="index" @click="toDeail(item.post_id)">
                      <div class="fl jpin_nw_lt">
                          <img :src="item.source[0].path+item.source[0].suffix" alt="">
                      </div>
                      <div class="fl jpin_nw_rt">
                            <h1>{{item.title | ellipsis}}  <img src="@/assets/images/rscopy.png"></h1>
                          <p> {{item.views}}人已看</p>
                      </div>
                    </li>
                  </ul>
              </div>

              <div class="jinpin_more tc"  @click="more5(wulist_a.list_id)">
                  <p>查看更多</p>
              </div>
          </div>
          <div v-else></div>

      </div>


  </div>
</template>

<script>
import {WOW} from 'wowjs';
export default {
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0,8) + '...'
      }
      return value
    }

  },
  data(){
    return{
      pagename:'',
      yilist_a:[],
      yilist_b:[],
      yilist_c:[],
      erlist_a:[],
      erlist_b:[],
      erlist_c:[],
      sanlist_a:[],
      sanlist_b:[],
      sanlist_c:[],
      silist_a:[],
      silist_b:[],
      silist_c:[],
      wulist_a:[],
      wulist_b:[],
      wulist_c:[],
    }
  },
  created(){
  },
  mounted() {
    this.get_all_data();
  },
  watch: {
    yilist_b:function(){
        this.$nextTick(function(){
          new WOW({live: false,offset:10,}).init();
          // alert(1);
        });
    },
  },
  methods: {


      toDeail(post_id){
        this.$router.push({ name: 'class_details', params: { post_id: post_id } });
      },
      more1(id){
         this.$router.push({name:'classslist', params: {id: id}})
      },
      more2(id){
         this.$router.push({name:'classslist', params: {id: id}})
      },
      more3(id){
         this.$router.push({name:'classslist', params: {id: id}})
      },
      more4(id){
         this.$router.push({name:'classslist', params: {id: id}})
      },
      more5(id){
         this.$router.push({name:'classslist', params: {id: id}})
      },


      get_all_data(){
        var $this=this;
        var company_id =  localStorage.getItem("company_id");
        var params={
          company:company_id,
          page_sign:"boutiqueList",
          success:true,
          msg:"ok"
        }
        // window.localStorage.getItem("token")
        var qs = require('qs');
        let url = this.api.userApi.get_zp
          console.log(url);
         this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify(params)).then((res) => {
          this.pagename=res.data.data.pageInfo;
          console.log(res);
          this.yilist_a=res.data.data.pageElementList.monday_list.detail;
          this.yilist_b=res.data.data.pageElementList.monday_list.data.data;
          this.yilist_c=res.data.data.pageElementList.monday.detail;

          this.erlist_a=res.data.data.pageElementList.tuseday_list.detail;
          this.erlist_b=res.data.data.pageElementList.tuseday_list.data.data;
          this.erlist_c=res.data.data.pageElementList.tuseday.detail;

          this.sanlist_a=res.data.data.pageElementList.wednesday_list.detail;
          this.sanlist_b=res.data.data.pageElementList.wednesday_list.data.data;
          this.sanlist_c=res.data.data.pageElementList.wednesday.detail;

          this.silist_a=res.data.data.pageElementList.thursday_list.detail;
          this.silist_b=res.data.data.pageElementList.thursday_list.data.data;
          this.silist_c=res.data.data.pageElementList.thursday.detail;

          this.wulist_a=res.data.data.pageElementList.friday_list.detail;
          this.wulist_b=res.data.data.pageElementList.friday_list.data.data;
          this.wulist_c=res.data.data.pageElementList.friday.detail;


          // this.classlist=res.data.data.pageElementList.boutiqueList.detail;
        }).catch((error) => {
          console.warn(error)
        })
      },

  }


}
</script>

<style lang="css" scoped>
</style>

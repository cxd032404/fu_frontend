<template lang="html">
  <div class="container-fluid">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        天籁之音
        <div class="bisaishow">
          <!-- <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu> -->
            <span @click="bisai_show = !bisai_show ">比赛类<img src="@/assets/images/xiajiantous.png"></span>
        </div>
    </div>
    <div class="pb_top_zhanwei"></div>

    <div class="bisai_nr">
      <van-popup v-model="bisai_show" position="top" >
          <div class="bisai_select">
            <ul>

              <li v-for="(item,index) in  mtopnav"  :key="index" @click="dianji_router(item)">
                  <div class="">
                    <span>{{item.name}}</span>
                    <dbo> <img src="@/assets/images/rscopy.png" alt=""> </dbo>
                  </div>
               </li>

            </ul>
          </div>
      </van-popup>
    </div>

    <!-- 内容信息 -->
    <van-tabs v-model="active" class="mm_tl_list">
        <van-tab title="活动信息">
          <div class="container-fluid huodong">
              <img :src="hd_pic.img_url">
              <div v-if="this.avab.available==0 ||  this.avab.applied==1"  class="baom_btn ybm" >
                <div class="baom_btn_nr">
                    <button type="button" name="button">已报名</button>
                </div>
              </div>
              <div v-else class="baom_btn" @click="showPopup">
                <div class="baom_btn_nr">
                    <button type="button" name="button">报名</button>
                </div>
              </div>


              <!-- <div class="baom_btn" @click="showPopup">
                <div class="baom_btn_nr">
                    <button type="button" name="button">报名</button>
                </div>
              </div> -->

              <!-- 底部弹出报名 -->
              <div class="baom_tanchuang">
                <van-popup v-model="showtanchuang">
                   <!-- 报名方法 -->
                    <div class="baom_tanchuang_like " >
                        <div class="baom_tanchuang_like_nr">
                            <label for="">
                              <span>姓名</span>
                              <input v-model="user_name"  type="text" name="" value="" placeholder="请填写姓名">
                            </label>
                            <label for="">
                              <span>手机号码</span>
                              <input oninput="if(value.length>11)value=value.slice(0,11)" v-model="mobile"  type="text" name="" value="" placeholder="请填写手机号">
                            </label>
                            <label for="">
                              <span>所在部门</span>
                              <input v-model="user_bumen"  type="text" name="" value="" placeholder="请填写部门">
                            </label>
                              <div style="clear:both;"></div>
                              <!-- 理  解报名 -->
                            <!-- <div class="baom_btn_nr" @click="baomao_suc()"> -->
                            <div class="baom_btn_nr" @click="get_baoming()">
                                <button type="button" name="button">立即报名</button>
                            </div>
                        </div>
                    </div>
                    <div class="baom_guanbi" @click="baom_guanbi()">
                        <img src="@/assets/images/guanbi.png">
                    </div>
                </van-popup>
                <van-popup v-model="showtanchuang2">
                   <!-- 报名方法 -->
                    <div class="baom_tanchuang_like ">
                        <div class="baom_tanchuang_like_nr">
                            <div class="bm_ts_pos_suc">
                                <img src="@/assets/images/pay_success_icon.png">
                                <h2>恭喜报名成功</h2>
                            </div>
                        </div>
                    </div>
                    <div class="baom_guanbi" @click="baom_guanbi()">
                        <img src="@/assets/images/guanbi.png">
                    </div>
                </van-popup>
              </div>
              <div class="zhanwei"></div>
          </div>
        </van-tab>

        <van-tab title="专家指导">
          <!-- //专家指导 -->
          <div class="container-fluid zhuanjiainfo">


              <div class="cont_video">
                  <ul>
                    <li v-for="item in cont_video"  >
                      <video :src="item.path"  controls :poster="item.path+item.suffix">
                      </video>
                    </li>
                  </ul>
              </div>
              <div class="container" v-html="content_zhuanjia.content ">
                <h3>专家指导视频</h3>
                <p>女神必备，「瘦腿」修炼秘籍！本课程进行了为期 4 周的效果测试，一共 183 人参加。4 周后瘦腿成功率高达 69.7%，平均每人瘦了 2.19cm，相当于牛仔裤小了 2 个码，效果显著。如果配合减脂训练、饮食控制，还能让瘦腿效果更明显。</p>
                <img src="@/assets/images/defalut.png" alt="">
                <img src="@/assets/images/defalut.png" alt="">
              </div>
              <div class="zhanweifu">
              </div>
              <!-- 客服弹窗 -->
          </div>
          <div class="zhidao_ico" @click="customer()">
            <img src="@/assets/images/customer_servic.png" alt="">
          </div>
        </van-tab>

        <van-tab title="参赛作品">

                <!-- 参赛作品瀑布流 -->
          <div class="m_pubuniu">
            <div class="container-water-fall container">
                <!-- <div><button  @click="loadmore">loadmore</button> </div> -->
                <!-- <waterfall  :data="data"  @loadmore="loadmore"  @finish="finish" > -->
                <waterfall :data="pubu_data"  @loadmore="loadmore"  @finish="finish" >
                <template >
                <div class="cell-item  wow zoomIn"  data-wow-duration="1s" data-wow-delay="index*0.3+'s'" v-for="(item,index) in pubu_data"   :key="index" >
                  <img :src="item.source[0].path+item.source[0].suffix" :lazy-src="item.source[0].path"    @click="big_img(item.post_id,index)"/>

                      <div class="item-body">
                        <div class="item-desc" @click="act_jl(item.post_id)">{{item.content}}</div>
                          <div class="item-footer">
                              <div class="avatar">

                                <img v-if="item.user_img == '' || item.user_img == null " src="@/assets/images/5959.png">
                                <img v-else :src="item.user_img">

                              </div>

                              <div class="name">{{item.nick_name}}</div>

                              <div v-if="item.is_kudos==1"  class="like active" @click="toggle_like_2()">
                                    <div class="like-total">{{item.kudos}}</div>
                                    <i></i>
                              </div>
                              <div v-else class="like"  @click="toggle_like(item.post_id,index)" >
                                    <div class="like-total">{{item.kudos}}</div>
                                    <i></i>
                              </div>
                          </div>
                      </div>

                </div>
                </template>
                </waterfall>

                 <!-- 我是有底线的 -->
                 <div class="pubu_dixian_botm">
                   <p><span></span>我是有底线的 <span></span></p>
                 </div>
                <loading :show="loading" />
              </div>

              <!-- //loading -->

              <div  v-if="this.anniubtn==1"   class="container-fluid dibu_scsppp" v-show="guanb_scanniu">
                <div class="m_p_d_s">
                  <div  class=" baom_up sczup_btn " @click="baom_up()">
                      上传作品
                  </div>
                </div>
              </div>
              <div v-else >

              </div>

              <van-popup class="shangc_gban" v-model="shou_up" position="bottom" :style="{ height: '68%' }"  closeable close-icon-position="top-right">
                  <div class="baom_up_nr  shangchuanner">
                    <h3>上传作品</h3>
                    <div class="up_nr_tii">内容</div>
                    <!-- <p v-model="">

                    </p> -->
                    <textarea name="name"  v-model="comment" placeholder="请输入简单的描述">
                      大家快来围观我的马甲线～～～大家快来围观我的马甲线～～～
                    </textarea>

                    <div>

                    <div class="videoupd">

                    </div>

                      <div class="upload-img">
                          <van-uploader v-model="fileList.config"  accept="image/gif, image/jpeg,video/*" :before-read="beforeRead"   :after-read="afterRead" :before-delete="beforeDelete" />
                       </div>
                       <div class="upload_tishi">
                         <p>最多可上传1个视频+5张图片</p>
                       </div>
                    </div>

                    <div class="bux_shuhua">
                      <div class="baom_btn_nr">
                          <button type="button" @click="getimgemit()" name="button">提交</button>
                      </div>
                    </div>
                  </div>
              </van-popup>
          </div>
            <!-- 点击弹出大图展示 -->

            <van-popup v-model="istanchuang" class="tancss">
              <div class="tanchu_big">

                <!-- <van-image-preview v-model="tac_img_show" :images="tan_images" @change="onChange" @closed="onClose_bigimg">
                <template v-slot:index>第{{ index }}页</template>
                </van-image-preview> -->
                <div class="tc_vd_img_guanbi" @click="onClose_bigimg()">
                    <div class="swiper_biaoqian_tc" v-model="isSWactive">
                        <img src="@/assets/images/arrow-lisft.png" alt="">
                        <ul>
                          <!-- ishavevideo:0,
                          ishaveimg:0 -->
                          <!-- videoAndImgPerview_tabStatus -->
                          <li  :class="[{'SWactive':videoAndImgPerview_tabStatus==1}]" v-if="ishavevideo==1" ><span>视频</span></li>
                          <li  :class="[{'SWactive':videoAndImgPerview_tabStatus==2}]" v-if="ishaveimg==1"><span>图片</span></li>
                        </ul>
                     </div>
                </div>

                <!-- <div class="video_btn" @click="video_btn()">
                  <img src="@/assets/images/video.png" />
                </div> -->
                <div class="tc_vd_img">
                  <swiper :options="sw_vd_img" class="sw_vd_img" >
                    <swiper-slide v-for="(item,index) in tan_images"  :key="index"  >
                      <div  v-if="item.type=='video'"   class="m_vdsp_all" >
                        <img class="videobtns" :class="{'videobtn':videobtnTrue}"  src="@/assets/images/video_start.png" @click="videoClick()">
                       <video id="vide"       :poster="item.path+item.suffix"  :src="item.path" type="video/mp4" @click="videoClick()" ></video>
                      </div>
                      <div v-else class="m_vdsp_all">
                          <img :src="item.path">
                      </div>
                    </swiper-slide>
                      <div class="swiper-pagination" v-for="(item,index) in tan_images" :key="index" slot="pagination"></div>
                    </swiper>

                    <div class="xiangq_cont">
                      <h1>
                        <img v-if="shipnrname.user_img == '' || shipnrname.user_img == null " src="@/assets/images/5959.png">
                        <img v-else :src="shipnrname.user_img">

                        {{shipnrname.nick_name}}</h1>
                      <p>{{shipnr.content}}</p>
                    </div>



                </div>

              </div>
          </van-popup>
        </van-tab>
        <van-tab title="排行榜">
          <div class="container-fluid m_paihang_content">
              <div class="top_dz_banner">
                  <img src="@/assets/images/21100516.png">
              </div>
              <div class="dianz_vant container-fluid">
                <van-tabs v-model="dianz_active">
                  <van-tab title="点赞榜">
                    <div class="m_yangy_dianz">
                        <div class="container">
                          <div class="m_yy_dianz_conta ">
                              <div class="pisoh_a fl">
                                  <p>我的票数</p>
                              </div>


                              <div class="dz_conta fr"  v-for="(item,index) in list_dianzan_paihang"  :key="index">
                                  <div class="fl dz_ct_info" v-if="item.highlight==1">
                                    <img v-if="item.user_img == '' || item.user_img == null " src="@/assets/images/5959.png">
                                    <img v-else :src="item.user_img">
                                    <span>{{item.true_name}}</span>
                                  </div>
                                  <div class="" v-else>
                                  </div>

                                  <div class="fr dz_ct_cx" v-if="item.highlight==1">
                                      <span>{{item.count}}</span>
                                  </div>
                                  <div v-else>
                                  </div>
                              </div>
                          </div>
                          <!-- 排名 -->
                          <div class="m_yy_dianz_contb">
                            <table>
                               <tr>
                                 <td><span>排名</span></td>
                                 <td><span>姓名</span></td>
                                 <td><span>票数</span></td>
                               </tr>

                               <tr v-for="(item,index) in list_dianzan_paihang"  :key="index">
                                 <td>
                                   <div class="dz_first_a" v-if="item.highlight==1">
                                   </div>
                                   <div v-else class="dz_first_a">
                                     {{index}}
                                   </div>
                                 </td>
                                 <td>
                                   <div class="dz_first_b">
                                     <div class=" dz_ct_info" v-if="item.highlight==1">
                                     </div>
                                     <div v-else class=" dz_ct_info">
                                       <img v-if="item.user_img == '' || item.user_img == null " src="@/assets/images/5959.png">
                                       <img v-else :src="item.user_img">
                                       <span>{{item.true_name}}</span>
                                     </div>
                                   </div>
                                 </td>
                                 <td>
                                   <div v-if="item.highlight==1" class="dz_first_c">
                                   </div>
                                   <div v-else class="dz_first_c">
                                     <div class=" dz_ct_cx">
                                         <span>{{item.count}}</span>
                                     </div>
                                   </div>
                                 </td>
                               </tr>

                            </table>
                          </div>
                        </div>
                    </div>
                  </van-tab>
                  <van-tab title="专家评分"></van-tab>
                  <van-tab title="总榜行"></van-tab>
                </van-tabs>
              </div>
          </div>
        </van-tab>


      </van-tabs>

    <!-- //活动信息 -->


  </div>
</template>

<script>
import {WOW} from 'wowjs';
import loading from './loading'

export default {
  components:{
      loading
    },

  data(){
      var _this = this
    return {
      cont_video:[],
      videobtnTrue:false,//视频播放
      avab:[],
      userinfo:[],
      pj_router:"",
      nowTime:"",
      anniubtn:"",
      value1: 0,
      bisai_show:false,
      active:0,
      dianz_active:0,
      index_status:0,
      mp4default:require('@/assets/images/timg.jpg'),
      hd_top:{},
      hd_pic:{},
      showtanchuang:false,
      showtanchuang2:false,
      shou_up:false,
      // 活动参数
      user_name:'',
      mobile:'',
      user_bumen:'',
      //多图上传
      comment:[],
      fileList: [],
      isTransition:true,
        mtopnav:[],
      //瀑布流
      width:'',
      col:'2',
      loading:false,
      imgPramsArr:[],
      imgPramslistid:'',
      imgPramscomment:'',
      post_id:"",
      sid:"",
      visible:"1",
      delimglist:[],
      newkey:[],
      listidarr:[],
      // like_count:10,
			istclass:true,
      //瀑布流
      pubu_data:[],
      pageNum:"1",
      start_post_id:"",
      //点赞
      current:"",
      isdzactive:false,
      guanb_scanniu:true,
      //点赞排行榜
      list_dianzan_paihang:[],
      list_dianzan_cont:[],
      //点击大图展示
      tac_img_show: false,
      index: 0,
      big_img_list:[],
      closeable: true,
      tan_images: [],
      istanchuang:false,
      vd_po_list: [
        { name: '视频', value: 0 },
        { name: '图片', value: 1 },
      ],
      isSWactive:false,
      // videoAndImgPerview:0,
      videoAndImgPerview_tabStatus:0,//标签栏状态
      imgVideoArr:[],
      sw_vd_img:{
        slidesPerView: '1',
        spaceBetween: 0,
        initialSlide:0,
        loop:false,
        speed:700, //config参数同swiper4,与官网一致
        pagination: {
          el: " .swiper-pagination",
          clickable: true,
          type: 'fraction',
        },
        on:{
            slideChangeTransitionEnd: function () {
              // _this.videoAndImgPerview=this.activeIndex
              if(this.activeIndex==0){
                _this.videoAndImgPerview_tabStatus=1
              }else {
                if(_this.imgVideoArr[this.activeIndex].type=='video'){
                  _this.videoAndImgPerview_tabStatus=1
                }else {
                  _this.videoAndImgPerview_tabStatus=2
                }
              }
          },

         },
      },
      ishavevideo:0,
      ishaveimg:0,
      //专家指导页面
      content_zhuanjia:[],
      //视频详情内容
      shipnr:[],
      shipnrname:[],

    }
  },


  // filters:{
  //    unescape:function (html) {
  //        return html
  //            .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
  //            .replace(/&lt;/g, "<")
  //            .replace(/&gt;/g, ">")
  //            .replace(/&quot;/g, "\"")
  //            .replace(/&#39;/g, "\'");
  //    }
  // },
  computed:{
        itemWidth(){
          return (166*1*(document.documentElement.clientWidth/375)).toString()
        },
        gutterWidth(){
          return (10*0.5*(document.documentElement.clientWidth/375)).toString()
        },



      },
    watch: {
        mobile: function(val){
          this.mobile = val.replace(/\D/g, '')
        },
        pubu_data:function(){
            this.$nextTick(function(){
              new WOW({live: false,offset:50,}).init();
              // alert(1);
            });
        }
      },
    mounted() {
      this.get_all_data();
      this.get_zuopin();
      this.tan_images_mth();
      },
    methods: {

      // 视频播放暂停
      videoClick(){
      //显示视频播放按钮
        this.videobtnTrue=!this.videobtnTrue;
       var vide=document.getElementById("vide");
       if(vide.paused){
        vide.play();
       }else if(vide.play()){
         vide.pause();
        }

      },
    //跳转活动记录
    // 分享

    act_jl(post_id){
      console.log(post_id);
      this.$router.push({ name: 'activeshare', params: { post_id: post_id } });
    },


    dianji_router(item){
      console.log(item.url);
      console.log('/'+this.$route.name);
      this.pj_router='/'+this.$route.name;
      if(this.pj_router==item.url){
        this.bisai_show=false;
      }
      else{
          this.$router.replace(item.url);
      }
    },
    bisai_show_ck(){
      this.bisai_show = true;
    },
    //过滤器
    customer(){
      this.$router.push({
          name:'customer'
        })
    },

    //点击视频播放
    picture_list_nr(){
      this.isSWactive=false
      this.isimgBtn=true
      this.tan_images[0]=2;
    },
    // 专家指导作品显示
    get_zuopin(){

      // this.pubu_data=[];
      var $this=this;
      //变量地址
      var urlsolw={
        company:localStorage.getItem("company_id"),
        page_sign:"activity_details1",
      }
      var params={
              "start":this.start_post_id,
              "page":this.pageNum,
              "page_size":10,
              "element_sign_list":["activity_work"],
      }
      console.log(params);
      var qs = require('qs');
      var parm = JSON.stringify(params);
      // return
      let url = this.api.userApi.get_zp
      this.axios.post(url+'/'+urlsolw.company+'/'+urlsolw.page_sign,qs.stringify({params:parm}),)
      .then((res) => {
        // console.log("瀑布流？？？？？");
          console.log(res);
        //
        this.big_img_list = res.data.data.pageElementList.activity_work.data;
        this.pubu_data =this.pubu_data.concat(res.data.data.pageElementList.activity_work.data.data);
        // console.log(this.pubu_data);
        // this.userinfo =this.pubu_data;
        // console.log(this.userinfo);
        this.start_post_id=this.pubu_data[this.pubu_data.length-1].post_id;
        // this.dz_post_id=this.pubu_data;
        // console.log(this.dz_post_id);
      }).catch((error) => {
        console.warn(error)
      })
    },

    //判断是否有视频显示上边的按钮
    tan_images_mth(){


    },

    //点击弹出大图
    //点击展示阅览大图
    onChange(index) {
      this.index = index;
    },
    big_img(post_id,index){

      // this.$router.push({
      //     name:'aydetails'
      //   })

      console.log(post_id);
      this.istanchuang=true;
     console.log(this.pubu_data[index].source);
      this.tan_images=this.pubu_data[index].source
      this.imgVideoArr=this.pubu_data[index].source
      var imgArr=this.pubu_data[index].source

      console.log(imgArr)
      for(var i=0;i<imgArr.length;i++){
        if(imgArr[0].type=='video'){
          this.videoAndImgPerview_tabStatus=1
        }else {
          this.videoAndImgPerview_tabStatus=2
        }
        if(imgArr[i].type=='video'){
          this.ishavevideo=1
          console.log(this.ishavevideo)
        }
        if(imgArr[i].type=='pic'){
          this.ishaveimg=1
          console.log(this.ishaveimg)
        }
      }
        this.shipnr=this.pubu_data[index]
        this.shipnrname=this.pubu_data[index]

      // pubu_data
    },
    onClose_bigimg() {
        this.istanchuang=false;
        this.tan_images=[];
        this.videoAndImgPerview_tabStatus=0
        this.ishavevideo=0
        this.ishaveimg=0
        console.log("视频按钮关闭")
        console.log(this.sw_vd_img.initialSlide==0);
        this.sw_vd_img.initialSlide==0;
        this.tan_images=[];
        // this.sw_vd_img.push()

      },
      //点赞功能
    toggle_like_2(){
          this.$toast("您已经投过票了,明天再来吧!（投票后不可取消哦~）")
    },
    toggle_like(post_id,index){
      var param={
           post_id:post_id,
      }
      var qs = require('qs');
      let url = this.api.userApi.get_dianzan
      this.axios.post(url,qs.stringify(param),)
      .then((res) => {
        console.log("点赞？？？？？？？？？？？？？")
        this.pubu_data[index].is_kudos=1
        this.pubu_data[index].kudos++
        this.$toast(res.data.msg)

      }).catch((error) => {
        console.warn(error)
      })

    },
    //瀑布流插件
     mix(){
           this.$waterfall.mix()
      },
      //瀑布流加载更多或者下拉加载
     loadmore(index){


       this.start_post_id=this.pubu_data[this.pubu_data.length-1].post_id;
       console.log("加载更多");
       console.log(index);

       this.loading = true
       // console.log(this.start_post_id);
       this.get_zuopin();
       // return
       setTimeout(()=>{
       // this.data = this.data.concat(this.data)
       this.loading = false
         // console.log(this.data.length)
       },1000)

     },
     finish(){
       // this.$toast("数据已经全部加载完毕");
     },
    //多图上传文件
    beforeRead(file) {
       console.log(file);
       return new Promise((resolve, reject) => {
         if (file.type == 'video/mp4') {
           alert('只能上传一个视频哦！');
           // let img = new File(['foo'], '@/assets/images/arrow-lift.png', {
           //   type: 'image/jpeg',
           // });
           // resolve(img);
            resolve(file);
           // reject();
         } else {
            resolve(file);
         }
       });

     },

    afterRead(file) {
      let that = this;
      var params = new FormData();
      file.status = 'uploading';
      file.message = '上传中...';
      this.delimglist.push(file.file);
      this.listidarr.push(this.list_post_id);
      params.append("img",file.file);
      params.append("list_id", this.list_post_id);
      params.append("post_id", this.post_id);
      params.append("detail[comment]",that.comment);
      params.append("comment",this.comment);

      // console.log("删除图片的数组");
      // console.log(this.delimglist);
      // console.log("列表ID");
      // console.log(this.listidarr);

      let config = {
          headers: {
            //添加请求头
            "Content-Type": "multipart/form-data",
            'Accept': 'application/json','UserToken': window.localStorage.getItem("token")
          },
        };
      let url = this.api.userApi.get_tijiao
        this.axios.post(url,params,config)
       .then((res) => {

         console.log("上传的返回值")
         console.log(res);

         //上传状态
         file.status = 'done';
         file.message = '上传完成';

          // console.log(this.newkey);
            this.$toast(res.data.msg);
          // alert(res.data.msg);
           this.post_id=res.data.data.post_id;

           this.newkey.push(res.data.data.new_key);
           // console.log(res.data.data.new_key);
           console.log("上传部分");
           console.log(this.newkey);
           console.log(this.delimglist);
           //上传成功
       }).catch((error) => {
         console.warn(error)
       })
     },


    //删除多图文件
    beforeDelete(file) {
        // console.log(file);
        file.status = 'uploading';
        file.message = '删除中...';
        // console.log("删除图片的数组");
        // console.log(this.delimglist);
        // console.log("列表ID");
        // console.log(this.listidarr);



        var needDeleteSid=''
        var msi=0
        for(var i=0;i<this.delimglist.length;i++){
          if(this.delimglist[i].name==file.file.name){
            console.log(i);
            msi=i
            // newkey
            needDeleteSid=this.newkey[i]


          }
        }

        // vue删除回调函数
        return new Promise((resolve, reject) => {
             var $this=this;
             var param={
                post_id:this.post_id,
                sid:needDeleteSid[0],
                // sid:this.newkey,
              }
             var qs = require('qs');
             let url = this.api.userApi.get_del
             this.axios.post(url,qs.stringify(param),)
             .then((res) => {

              console.log("删除");
               this.newkey.splice(msi,1);
               this.delimglist.splice(msi,1);

               resolve(file);

               console.log("删除数组");
               console.log(this.delimglist);
               console.log(this.newkey);


               // console.log(res);
               // this.sid=this.sourceid[this.sid];
             }).catch((error) => {
               console.warn(error)
             })
       });

    },
    //提交按钮
    getimgemit(){

      console.log(this.newkey.length);

      if( this.newkey.length=="0"){
        this.$toast("请上传图片！");
      }
      else{

        var $this=this;
        var param={
           post_id:this.post_id,
           list_id:this.list_post_id,
           visible:this.visible,
           // detail[comment]:this.comment,
           comment:this.comment,
         }
        var qs = require('qs');
        let url = this.api.userApi.get_tijiao
        this.axios.post(url,qs.stringify(param),)
        .then((res) => {

              // if(){
              //   this.$toast("请上传图片！");
              // }


             if (res.data.code==200) {
              this.$toast("作品提交成功");
              this.guanb_scanniu=false;

              this.start_post_id="";
              this.pubu_data=[];
              // console.log(this.start_post_id);
              // window.location.reload()
              this.get_zuopin();



               setTimeout(()=>{
                   this.shou_up = false;
               },1000)
             }
             else{
               this.$toast(res.data.msg);
             }


        }).catch((error) => {
          console.warn(error)
        })

      }


    },
    //底部弹窗
    showPopup() {
        this.showtanchuang = true;
        this.baomsucess = false;
    },
    baom_guanbi(){
        this.showtanchuang = false;
        this.showtanchuang2 = false;
    },
    baomao_suc(){
      // this.showtanchuang = false;
      // this.showtanchuang2 = false;
      // this.active=2;

    },
    baom_up(){
        this.showtanchuang = false;
        this.showtanchuang2 = false;
        this.shou_up = true;
    },
    //活动报名接口
    get_baoming(){
      var $this=this;
      var param={
        // mobile:this.mobile,
        // user_name:this.user_name,
        // department:this.user_bumen,
        activity_id:this.hdbmid,
      }
      console.log(param);
      // window.localStorage.getItem("token")
      var qs = require('qs');
      let url = this.api.userApi.get_baoming
       this.axios.post(url,qs.stringify(param),
       {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}}
      )
      .then((res) => {

          // console.log(res);
        if (res.data.code==200){

            // location.reload();
            this.showtanchuang2 = true;
              // window.location.reload()
            setTimeout(()=>{
              this.showtanchuang = false;
              this.showtanchuang2 = false;
              this.anniubtn=1;
              this.avab.available=0;
              this.avab.applied=1;
              // console.log(this.avab.available);
              // console.log(this.avab.applied);
              this.active=2;


            // this.data = this.data.concat(this.data)
              // console.log(this.data.length)
            },1500)






        }
        else if(res.data.code==403){
          this.$toast(res.data.msg);
          this.$router.replace('/logincode');
        }
        else{
          this.$toast(res.data.msg);
        }

      }).catch((error) => {
        console.warn(error)
      })
    },
    //接口获取
    get_all_data(){
      var $this=this;
      var company_id =  localStorage.getItem("company_id");
      var param={
        company:company_id,
        // success:true,
        // msg:"ok",

      }
      // window.localStorage.getItem("token")
      var qs = require('qs');
      let url = this.api.userApi.get_activity_details
       this.axios.post(url+'/'+param.company+'/'+'activity_details'+'1',qs.stringify(param),
       // {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token"),'code':window.localStorage.getItem("code")}}
      )
      .then((res) => {


        // console.log(res);

        var dataresurl = res.data.data.pageElementList;
        if (res.data.code==200){

            console.log("获取接口所有数据");
            console.log(dataresurl);

             this.hd_top=Object.assign([], dataresurl.activity_details_nav.detail.jump_urls);
             this.hd_pic=Object.assign([], dataresurl.activity_details_pic.detail);
             //活动提交id
             //判断对象是否存在

             if(dataresurl.activity_details_submit){
               this.hdbmid= dataresurl.activity_details_submit.detail.activity_id;
             }

             if(dataresurl.activity_details_submit){
               this.avab = dataresurl.activity_details_submit.detail;
             }
             //多图上传嵌套id
             this.list_post_id = dataresurl.activity_work.detail.list_id;
             //点赞排行

             this.list_dianzan_paihang = dataresurl.activity_list_kudos.detail.all;
             this.list_dianzan_cont = dataresurl.activity_list_kudos.detail.self;
            // console.log(dataresurl.activity_list_kudos.detail);
             //专家指导

             this.content_zhuanjia = res.data.data.pageElementList.activity_expert.data.data[0];
             this.cont_video=this.content_zhuanjia.source;
             // console.log('2222');
            //判断提交按钮
              this.anniubtn = dataresurl.activity_work_submit.detail.available;
             // console.log("所有接口内容");
             //
             // // 报名状态
             // console.log( dataresurl.activity_work_submit.detail);
             // console.log("报名状态");
             // console.log( this.avab);

             // this.nva_top = res.data.data.pageElementList.activity_datails_type.detail.jump_urls;
            this.mtopnav = res.data.data.pageElementList.activity_datails_type.detail.jump_urls;
             console.log(  this.mtopnav);
             //  console.log(this.nva_top);
             // console.log(res.data.data.pageElementList.activity_datails_type.detail.jump_urls);
             // console.log(this.content_zhuanjia);
        }
        else if(res.data.code==403){
          this.$toast(res.data.msg);
          this.$router.replace('/logincode');
        }
        else{
          this.$toast(res.data.msg);
        }

      }).catch((error) => {
        console.warn(error)
      })
    },




    // end
  }

}
</script>

<style lang="css" scoped>
</style>

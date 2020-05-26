<template lang="html">
  <div class="container-fluid">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        天籁之音
        <div class="bisaishow">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </div>
    </div>

    <!-- 内容信息 -->
    <van-tabs v-model="active" class="mm_tl_list">
        <van-tab title="活动信息">
          <div class="container-fluid huodong">
              <img :src="hd_pic.img_url">
              <div class="baom_btn" @click="showPopup">
                  <div class="baom_btn_nr">
                      <button type="button" name="button">报名</button>
                  </div>
              </div>
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
                              <input v-model="mobile"  type="text" name="" value="" placeholder="请填写手机号">
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
                <div><button  @click="loadmore">loadmore</button> </div>
                <!-- <waterfall  :data="data"  @loadmore="loadmore"  @finish="finish" > -->
                <waterfall :data="pubu_data"  @loadmore="loadmore"  @finish="finish" >
                <template >
                <div class="cell-item" v-for="(item,index) in pubu_data"  >

                  <img :src="item.source[0].path+item.source[0].suffix" :lazy-src="item.source[0].path"    @click="big_img(item.post_id,index)"/>

                      <div class="item-body">
                        <div class="item-desc">{{item.content}}</div>
                          <div class="item-footer">
                              <div class="avatar"><img src="@/assets/images/toux1.png"></div>
                              <div class="name">{{item.user_info.nick_name}}</div>

                              <div v-if="item.is_kudos==1"  class="like active">
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
              <div class="container-fluid dibu_scsppp">
                <div class="m_p_d_s">
                  <div class=" baom_up sczup_btn " @click="baom_up()">
                      上传作品
                  </div>
                </div>
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
                          <van-uploader v-model="fileList.config" multiple  :after-read="afterRead" :before-delete="beforeDelete" />
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
                    <img src="@/assets/images/reeor-fill.png" alt="">
                </div>

                <div class="tc_vd_img">
                  <swiper :options="sw_vd_img" class="sw_vd_img">
                    <swiper-slide v-for="(item,index) in tan_images"  :key="index">
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
                      <div class="swiper-pagination" v-for="(item,index) in tan_images" :key="index" slot="pagination"></div>
                    </swiper>


                  <div class="swiper_biaoqian_tc" v-model="isSWactive">
                      <ul>
                        <!-- ishavevideo:0,
                        ishaveimg:0 -->
                        <!-- videoAndImgPerview_tabStatus -->
                        <li  :class="[{'SWactive':videoAndImgPerview_tabStatus==1}]" v-if="ishavevideo==1" ><span>视频</span></li>
                        <li  :class="[{'SWactive':videoAndImgPerview_tabStatus==2}]" v-if="ishaveimg==1"><span>图片</span></li>
                      </ul>
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
                              <div class="dz_conta fr">
                                  <div class="fl dz_ct_info">
                                    <img src="@/assets/images/tx-3.png">
                                    <span>{{list_dianzan_cont.true_name}}</span>
                                  </div>
                                  <div class="fr dz_ct_cx">
                                      <span>{{list_dianzan_cont.count}}</span>
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
                                   <div class="dz_first_a">
                                     {{index+1}}
                                   </div>
                                 </td>
                                 <td>
                                   <div class="dz_first_b">
                                     <div class=" dz_ct_info">
                                       <img src="@/assets/images/tx-3.png">
                                       <span>{{item.true_name}}</span>
                                     </div>
                                   </div>
                                 </td>
                                 <td>
                                   <div class="dz_first_c">
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
                  <van-tab title="专家评分">专家评分</van-tab>
                  <van-tab title="总榜行">总榜行</van-tab>
                </van-tabs>
              </div>
          </div>
        </van-tab>


      </van-tabs>

    <!-- //活动信息 -->


  </div>
</template>

<script>

import loading from './loading'


export default {
  components:{
      loading
    },

  data(){
      var _this = this
    return {
      value1: 0,
      active:0,
      dianz_active:0,
      option1: [
        { text: '比赛类', value: 0 },
        { text: '展示类', value: 1 },
      ],
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

  mounted() {
    this.get_all_data();
    this.get_zuopin();
    this.tan_images_mth();

    },
  methods: {

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
      var $this=this;
      //变量地址
      var urlsolw={
        company:1,
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
      this.axios.post(url+'/'+urlsolw.company+'/'+urlsolw.page_sign,qs.stringify({params:parm}),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {
        console.log("瀑布流？？？？？");

        //
        this.big_img_list = res.data.data.pageElementList.activity_work.data;
        console.log(this.big_img_list);

        this.pubu_data =this.pubu_data.concat(res.data.data.pageElementList.activity_work.data.data);
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

      console.log(post_id);
      this.istanchuang=true;
      // console.log(this.pubu_data[index].source);
      this.tan_images=this.pubu_data[index].source
      this.imgVideoArr=this.pubu_data[index].source
      var imgArr=this.pubu_data[index].source

      console.log(imgArr)
      for(var i=0;i<imgArr.length;i++){
        if(imgArr[0].type=='video'){
          // videoAndImgPerview_tabStatus
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
      // return
        // for(let i=0;i<this.pubu_data[index].source.length;i++){
        //   this.tan_images.push(
        //     this.pubu_data[index].source[i].path
        //   );
        //   this.tan_images.push(
        //    this.pubu_data[index].source[i].type
        //   );
        // }

        console.log("视频视频")
        console.log(this.tan_images);

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
    toggle_like(post_id,index){
      var param={
           post_id:post_id,
      }
      var qs = require('qs');
      let url = this.api.userApi.get_dianzan
      this.axios.post(url,qs.stringify(param),{headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}})
      .then((res) => {
        console.log("点赞？？？？？？？？？？？？？")
        console.log(res)
        //点击增加1
        this.pubu_data[index].is_kudos=1
        this.pubu_data[index].kudos++

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
    afterRead(file) {
      let that = this;
      var params = new FormData();

      // file.status = 'uploading';
      // file.message = '上传中...';

      this.delimglist.push(file.file);
      this.listidarr.push(this.list_post_id);
      console.log("删除图片的数组");
      console.log(this.delimglist);
      console.log("列表ID");
      console.log(this.listidarr);
      params.append("img",file.file);
      params.append("list_id", this.list_post_id);
      params.append("post_id", this.post_id);
      params.append("detail[comment]",this.comment);
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

         //上传状态
         file.status = 'done';
         file.message = '上传完成';

          console.log("提交res");
          console.log(res);
          console.log(res.data.data.new_key);

           this.post_id=res.data.data.post_id;
           this.newkey.push(res.data.data.new_key);

           console.log(this.newkey);
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
               resolve(file);
               console.log(res);
               // this.sid=this.sourceid[this.sid];
             }).catch((error) => {
               console.warn(error)
             })
       });

    },
    //提交按钮
    getimgemit(){
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

            this.$toast("作品提交成功");
            setTimeout(()=>{
                this.shou_up = false;
            },1000)

      }).catch((error) => {
        console.warn(error)
      })

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
        mobile:this.mobile,
        user_name:this.user_name,
        department:this.user_bumen,
        activity_id:$this.hdbmid,
      }
      // window.localStorage.getItem("token")
      var qs = require('qs');
      let url = this.api.userApi.get_baoming
       this.axios.post(url,qs.stringify(param),
       {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}}
      )
      .then((res) => {

          // console.log(res);
        if (res.data.code==200){
            this.showtanchuang2 = true;

            setTimeout(()=>{
            // this.data = this.data.concat(this.data)
              this.active=2;
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
      var param={
        success:true,
        msg:"ok"
      }
      // window.localStorage.getItem("token")
      var qs = require('qs');
      let url = this.api.userApi.get_activity_details
       this.axios.post(url,qs.stringify(param),
       {headers:{'Accept': 'application/json','UserToken': window.localStorage.getItem("token")}}
      )
      .then((res) => {
        var dataresurl = res.data.data.pageElementList;
        if (res.data.code==200){

             this.hd_top=Object.assign([], dataresurl.activity_details_nav.detail.jump_urls);
             this.hd_pic=Object.assign([], dataresurl.activity_details_pic.detail);
             //活动提交id
             this.hdbmid= dataresurl.activity_details_submit.detail.activity_id;
             //多图上传嵌套id
             this.list_post_id = dataresurl.activity_work.detail.list_id;
             //点赞排行
             this.list_dianzan_paihang = dataresurl.activity_list_kudos.detail.all;
             this.list_dianzan_cont = dataresurl.activity_list_kudos.detail.self;
             //专家指导
             this.content_zhuanjia = dataresurl.activity_expert.data.data[0];
            //
             console.log("所有接口内容");
             console.log(this.content_zhuanjia);
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

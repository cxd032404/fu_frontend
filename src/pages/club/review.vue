<template lang="html">
  <div class="container-fluid ">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        精彩回顾
    </div>
    <div class="pb_top_zhanwei"></div>

<div class="jingcai_foget container-fluid">
      <!-- 参赛作品瀑布流 -->
  <div class="m_pubuniu">

        <!-- 缺省状态 -->
        <div class="pb_all_info"  v-if="this.pubu_data.length<=0">
          <div class="pb_all_info_nr">
            <img src="@/assets/images/upload.png">
            <p>还没有人发布内容喔～</p>
            <div class=""v-if="this.acaiid=1">
              <button @click="baom_up()"   type="button" name="button">去上传</button>
            </div>
            <div class="" v-else>
            </div>
          </div>
        </div>
        <!-- // -->
        <div class="queshneg_all" v-else>
          <div class="container-water-fall container">
            <waterfall :data="pubu_data"  @loadmore="loadmore"  @finish="finish" >
               <template >
                  <div class="cell-item andyg  wow zoomIn"  data-wow-duration="1s" data-wow-delay="index*0.3+'s'" v-for="(item,index) in pubu_data"   :key="index" >
                    <img  @click="act_jl(item.post_id)" :src="item.source[0].path+item.source[0].suffix" :lazy-src="item.source[0].path"    />

                        <div class="item-body">
                          <div class="item-desc" >{{item.content}}</div>
                            <div class="item-footer">
                                <div class="avatar" >

                                  <img v-if="item.user_img == '' || item.user_img == null " src="@/assets/images/5959.png">
                                  <img v-else :src="item.user_img">

                                </div>

                                <div class="name">{{item.nick_name}}</div>

                                <div v-if="item.is_kudos==1"  class="like active" @click="toggle_like_2(item.post_id,index)">
                                      <div class="like-total">{{item.kudos}}</div>
                                      <em></em>
                                </div>
                                <div v-else class="like"  @click="toggle_like(item.post_id,index)" >
                                      <div class="like-total">{{item.kudos}}</div>
                                      <em></em>
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
          <div    class="container-fluid dibu_scsppp" v-show="guanb_scanniu" v-if="this.acaiid=1">
            <div class="m_p_d_s">
              <div  class=" baom_up sczup_btn " @click="baom_up()">
                  上传
              </div>
            </div>
          </div>
          <div class="" v-else>
          </div>
        </div>
          <!-- 应该是上传弹窗 -->
        <van-popup class="shangc_gban baise" v-model="shou_up" position="bottom" :style="{ height: '68%' }"  closeable close-icon-position="top-right">
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
                    <van-uploader v-model="fileList.config"  accept="image/gif, image/jpeg,video/*"   :after-read="afterRead" :before-delete="beforeDelete" />
                 </div>
                 <div class="upload_tishi">
                   <!-- <p>最多可上传1个视频+5张图片</p> -->
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
      <!-- end -->
</div>

  </div>
</template>

<script>
import {WOW} from 'wowjs';
import loading from '@/pages/wenti/tianlai/bisai/loading'
export default {
    components:{
        loading
      },
    data(){
      return {

        guanb_scanniu:true,
        shou_up:false,
        comment:[],
        fileList: [],
        isTransition:true,
        loading:false,
        mtopnav:[],
        list_post_id:[],

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
        //判断上传
        acaiid:"",


      }
    },
    mounted() {
      // this.get_all_data();
      this.get_zuopin();
      },
      methods: {
        // 上传作品
        baom_up(){
            // this.$router.go(0);
            this.showtanchuang = false;
            this.showtanchuang2 = false;
            this.shou_up = true;

        },
      //跳转活动记录
        act_jl(post_id){
          console.log(post_id);
          this.$router.push({ name: 'reviewDetail', params: { post_id: post_id } });
        },
        // 专家指导作品显示
        get_zuopin(){

          // this.pubu_data=[];
          var $this=this;
          //变量地址
          var urlsolw={
            company:localStorage.getItem("company_id"),
            page_sign:"clubReview",
          }
          var params={
                  "start":this.start_post_id,
                  "page":this.pageNum,
                  "pageSize":10,
                  // "element_sign_list":["activity_work"],
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
              var dataresurl = res.data.data.pageElementList;
              //list_id
              this.list_post_id = dataresurl.hotList.detail.list_id;
            //判断俱乐部是否显示上传按钮
             this.acaiid=dataresurl.hotList.data.available;
            //
            // this.big_img_list = res.data.data.pageElementList.activity_work.data;
            this.pubu_data =this.pubu_data.concat(res.data.data.pageElementList.hotList.data.data);
            this.start_post_id=this.pubu_data[this.pubu_data.length-1].post_id;




          }).catch((error) => {
            console.warn(error)
          })
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
       // beforeRead(file) {
       //    console.log(file);
       //    return new Promise((resolve, reject) => {
       //      if (file.type == 'video/mp4') {
       //        alert('只能上传一个视频哦！');
       //        // let img = new File(['foo'], '@/assets/images/arrow-lift.png', {
       //        //   type: 'image/jpeg',
       //        // });
       //        // resolve(img);
       //         resolve(file);
       //        // reject();
       //      } else {
       //         resolve(file);
       //      }
       //    });
       //
       //  },
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

                if (res.data.code==200) {
                 this.$toast("作品提交成功");
                 // this.guanb_scanniu=false;

                 this.start_post_id="";
                 this.pubu_data=[];
                 // this.get_zuopin();
                  setTimeout(()=>{
                    this.shou_up = false;
                  },500)

                  setTimeout(()=>{
                    this.$router.go(0);
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
       //点赞功能

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
         // this.$toast(res.data.msg)

       }).catch((error) => {
         console.warn(error)
       })

     },
     toggle_like_2(post_id,index){
           // this.$toast("您已经投过票了,明天再来吧!（投票后不可取消哦~）")

       var param={
            post_id:post_id,
       }
       var qs = require('qs');
       let url = this.api.userApi.get_qx
       this.axios.post(url,qs.stringify(param),)
       .then((res) => {
         console.log("取消点赞？？？？？？？？？？？？？")
         this.pubu_data[index].is_kudos=0
         this.pubu_data[index].kudos--
         // this.$toast(res.data.msg)

       }).catch((error) => {
         console.warn(error)
       })

     },




      }
}
</script>

<style lang="css" scoped>
</style>

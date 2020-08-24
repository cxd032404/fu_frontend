<template lang="html">
    <div class="container-fluid ">
      <div class="pb_tag_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          俱乐部
      </div>
      <div class="pb_top_zhanwei"></div>


      <div class="club_a_banner container-fluid">
        <div class=" huodongswiper ix_banners ix_newbanner">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item,index) in bannerlist"  :key="index">
                <img :src="item.img_url">
              </swiper-slide>
                <div class="swiper-pagination" slot="pagination">
                </div>
            </swiper>
        </div>
      </div>

      <div class="club_a_icon container-fluid">
         <ul>
           <li v-for="(item,index) in icolist" :key="index"  >
                 <router-link :to="item.img_jump_url" >
                   <img :src="item.img_url">
                   <p>{{item.text}}</p>
                 </router-link>
           </li>
         </ul>
      </div>
      <!-- 日历 -->
      <div class="club_a_rli container-fluid">
        <div class="yuefen">

          <swiper :options="swiperOptionMouth"  >
            <swiper-slide  v-for="(item,index) in yuefen"  :key="index" >
              {{item.name}}
            </swiper-slide>
          </swiper>
          <div class="swiper-next"><img src="@/assets/images/Left.png" alt=""> </div>
          <div class="swiper-prev"> <img src="@/assets/images/Right.png" alt=""> </div>

          <!-- <ul>
            <li v-bind:class='{yueActive:index==yuefenTrue}' v-for="(item,index) in yuefen"  :key="index" @click="yuefenCon(index);">
              {{item.name}}
            </li>
          </ul> -->
        </div>
        <div class="actjis">
          <ul>
            <li>
              <div class="xuhui_lt fl">
                <img :src="act_list.club_icon" alt="">
              </div>
              <div class="xuhui_rt fl">
                <h1>{{act_list.club_name}}</h1>
                <p>{{act_list.comment}}…</p>
              </div>
              <div class="act_go" @click="toBmDetail(act_list.activity_id)">
                  <img src="@/assets/images/630115929.png">
              </div>
            </li>
          </ul>
        </div>
        <div class="day">
          <ul>
            <li  v-for="(item,index) in dayslist" :key="index">
              <div class="pos_rl_a" >{{item}}</div>
              <div class="pos_rl_b" v-for="item2 in arrlist"  v-bind:class='{dayactive:index==item2.date-1}'   @click="posClick(item2.date)" >
                {{item2.date}}
              </div>

            </li>
          </ul>
        </div>
      </div>
      <!-- 我加入的俱乐部 -->
      <div class="club_a_join container-fluid">
        <div class="container">
          <div class="tit_join">
            我加入的俱乐部
          </div>
          <div class="club_a_jnlist">
              <ul>

                <li v-for="(item,index) in joinlist"  :key="index">
                  <div class="clb_a_nr">
                    <div class="fl cb_sa">
                      <img :src="item.icon" alt="">
                    </div>
                    <div class="fl cb_sb">
                      <h1>{{item.club_name}}</h1>
                      <p>已有 <em>{{item.user_count}}</em> 位会员 ：已组织 <em>{{item.activity_count}}</em> 次活动</p>
                    </div>
                    <div class="fr cb_sc" v-if="item.result==0">
                       <span>审核中</span>
                    </div>
                    <div class="" v-else>
                    </div>
                  </div>
                </li>

              </ul>
          </div>
        </div>
      </div>
        <!-- <van-cell title="活动发布" is-link to="activityCreate" />
        <van-cell title="活动管理" is-link to="managedActivityList" />
        <van-cell title="会员管理" is-link to="vipMenber" />
        <van-cell title="活动报名" is-link to="activityBm" />
        <van-cell title="活动签到" is-link to="actvityQd" /> -->
      <!-- <div class="jianbuzou_pic">
          <img src="@/assets/images/1.png" alt="">
      </div> -->

    </div>
</template>


<script>
export default {
  data(){
    var _this = this
    return{
      //获取当前日
      nowdays:new Date().getDate(),
      nowMouth:new Date().getMonth()+1,
      mimiactiveTrue:false,
      bannerlist:[],//banner
      icolist:[],//图标
      joinlist:[],//我加入的俱乐部
      swiperOption:{
        slidesPerView: '1',
        spaceBetween: 10,
        initialSlide:1,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    　　observeParents:true,//修改swiper的父元素时，自动初始化swiper
    　　loop:true,
    　　autoplay: {
    　　delay: 5000,
        　　disableOnInteraction: false
        },
        speed:600, //config参数同swiper4,与官网一致
        pagination:{
             el: " .swiper-pagination",
             clickable: true,
             type: "bullets"
             }
        },

        //月份
        swiperOptionMouth:{
          slidesPerView: '1',
          spaceBetween: 10,
          initialSlide:7,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
      　　observeParents:true,//修改swiper的父元素时，自动初始化swiper
      　　loop:true,
          speed:600, //config参数同swiper4,与官网一致
          navigation: {
              nextEl: ".yuefen .swiper-prev", //前进按钮的css选择器或HTML元素。
              prevEl: ".yuefen .swiper-next", //后退按钮的css选择器或HTML元素。
            },
          on:{
            slideChangeTransitionStart: function () {
              _this.imgIndex = this.realIndex + 1;
              _this.yuefenCon( _this.imgIndex);
              }
            },

          },

      // yuefen:[
      //   {name:'January',id:'1'},
      //   {name:'February',id:'2'},
      //   {name:'March',id:'3'},
      //   {name:'April',id:'4'},
      //   {name:'May',id:'5'},
      //   {name:'June',id:'6'},
      //   {name:'July',id:'7'},
      //   {name:'August',id:'8'},
      //   {name:'September',id:'9'},
      //   {name:'October',id:'10'},
      //   {name:'November',id:'11'},
      //   {name:'December',id:'12'},
      // ],
      yuefen:[
        {name:'一月',id:'1'},
        {name:'二月',id:'2'},
        {name:'三月',id:'3'},
        {name:'四月',id:'4'},
        {name:'五月',id:'5'},
        {name:'六月',id:'6'},
        {name:'七月',id:'7'},
        {name:'八月',id:'8'},
        {name:'九月',id:'9'},
        {name:'十月',id:'10'},
        {name:'十一月',id:'11'},
        {name:'十二月',id:'12'},
      ],
      days:[],
      daylth:"1",
      //日期绑定当前天数
      ClassTrue:'-1',
      yuefenTrue:'',
      onmouths:'',
      ondays:'',
      allmh:[],
      dayslist:[],
      //ceshi
      alldaylist:[],
      arrlist:[],
      dayDate:[],
      dayDateS:[],
      act_list:[],
      UserMonthlyActivities:["UserMonthlyActivities"],
      params:{
        month:'',
        company:localStorage.getItem("company_id"),
        page_sign:"clubIndex",
      }

    }
  },
  created() {
    this.getMouth();
    this.getRlDate();
  },
  mounted(){

  },
  methods: {
    //
    toBmDetail(actid){
        this.$router.push({ name: 'activityBmDetail', params: { id: actid } });
    },
    //获取当前月份天数
      getMouth(){
        for(var m=1;m<=this.yuefen.length;m++){
            var datas=new Date(2020,m,0).getDate()
            this.allmh=this.allmh.concat(datas);
        }
        //获取每个月天数
        // console.log(this.allmh);
        // var newCa=[]
        for(var n=0;n<this.allmh.length;n++){
           var dayca=[]
            for (var m = 1;m <=this.allmh[n]; m++) {
              dayca.push(m)
            }
            var param={
              allDay:this.allmh[n],
              Mouth:this.yuefen[n],
              arr:dayca
            }
            // console.log(param);
            this.alldaylist.push(param)
        }
          // this.alldaylist=this.alldaylist.concat(this.alldaylist);
          console.log(this.alldaylist)

          //选中当前月份和天数
          var nowData=new Date().getMonth()+1;
          // var nowDay=new Date().getDate();
          // this.nowDays=nowDay;
           // alert(this.nowDays)
          this.yuefenTrue=nowData;
          this.dayslist=this.alldaylist[nowData].arr;
      },
      //点击月份切换当前天数
      yuefenCon(index){
        // 绑定今天的变色
        if(this.nowMouth == index)
        {
          this.mimiactiveTrue=true
        }else{
          this.mimiactiveTrue=false
        }

        this.dayslist=this.alldaylist[index-1].arr;
        // console.log(this.alldaylist);
        this.params.month=index;
        this.getRlDate();
        //将活动信息的数据显示为空
        // this.act_list=[];
      },
      //绑定当前天数的事件
      // 2020-1-15

     getRlDate(){
       var $this=this;
       var qs = require('qs');
       // console.log(this.params);
       var parm = JSON.stringify(this.params);
       let url = this.api.userApi.get_zp
       this.axios.post(url+'/'+this.params.company+'/'+this.params.page_sign,qs.stringify({params:parm}),)
       .then((res) => {
         //顶部name
          // console.log(res.data.data.pageElementList);

          this.act_list=res.data.data.pageElementList.UserMonthlyActivities.detail.user_monthly_activities.first_activity_info;

          this.dayDateS=res.data.data.pageElementList.UserMonthlyActivities.detail.user_monthly_activities.date_data;
          //输出所有日期消息
          // console.log(this.dayDateS);
          this.arrlist=res.data.data.pageElementList.UserMonthlyActivities.detail.user_monthly_activities.month_activities;
          this.bannerlist=res.data.data.pageElementList.clubBanner.detail.banner_list;
          this.pisState=res.data.data.pageElementList.permission.detail.permission;
            // if()

            // this.act_list=this.dayDateS[2];

            if(this.pisState==1){
              this.icolist=res.data.data.pageElementList.clubPermissionIcon.detail;
            }
            else{
                this.icolist=res.data.data.pageElementList.clubUserIcon.detail;
            }


           this.joinlist=res.data.data.pageElementList.attend_club_list.detail.club_list;

         //  //
         //  this.ClassTrue=18;
          // this.ClassTrue=27;

       }).catch((error) => {
         console.warn(error)
       })
     },

     posClick(day){
        //循环
       // this.dayDate=[];
       // for(var i=0;i<this.arrlist.length;i++){
       //   // console.log(this.arrlist[i].activity_name);
       //   if(this.arrlist[i].date==day){
       //     this.dayDate=this.dayDate.concat(this.arrlist[i]);
       //   }
       // }
       // 直接拿下标
        this.act_list=this.dayDateS[day];
        // console.log(this.dayDateS[day]);


     }

  }
}
</script>

<style lang="css" scoped>
</style>

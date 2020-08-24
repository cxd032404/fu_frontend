<template lang="html">
    <div class="container-fluid jingpin_bg">
      <div class="pb_tag_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          活动发布（单次）
      </div>
      <div class="pb_top_zhanwei"></div>

      <!-- //活动发布 -->
        <div class="activecrate container">

            <div class="ty_btm_solid">
              <div class="huodongname">
                  <img src="@/assets/images/163828.png"><input type="text" v-model="activityname" value=""  placeholder="请输入活动主题">
              </div>
            </div>
            <div class="huodongmiaos">
              <!-- <van-field
                  v-model="message"
                  autosize
                  type="textarea"
                  placeholder="输入活动介绍，最多输入300个字符"
                /> -->
                  <textarea placeholder="输入活动介绍，最多输入300个字符"  v-model="message" ></textarea>
            </div>

            <div class="club_from">
                  <label>
                    <div class="fl cb_tit">
                        俱乐部 <span>*</span>
                    </div>
                    <div class="fr cb_nr">
                        <div class="pb_sj_ty" @click="julebus()"  v-if="this.ismenber>1">
                            <input type="text" v-model="bm_jlb" readonly  >
                            <img src="@/assets/images/62414.png">
                        </div>
                        <div class="pb_sj_ty"  v-else >
                            <input type="text" v-model="julebu_club_name" readonly  >
                        </div>
                    </div>
                  </label>

                  <!-- <div class="bm_jlb" :class="{'bm_jlb_active':bmjlbTrue}">
                      <ul>
                        <li v-for="item in bmjlb"  v-text="item.club_name" @click="bm_jlb_Ck(item.club_name,item.club_id)"></li>
                      </ul>
                  </div> -->

                  <label>
                    <div class="fl cb_tit">
                        报名资格 <span>*</span>
                    </div>
                    <div class="fr cb_nr">
                        <div class="pb_sj_ty" @click="bmzgs()" >
                            <input type="text" v-model="bm_bmzg_value"  readonly  >
                            <img src="@/assets/images/62414.png">
                        </div>
                    </div>
                  </label>
                  <!-- <div class="bm_bmzg" :class="{'bm_bmzg_active':bmzgTrue}">
                      <ul>
                        <li v-for="item in bmzg"  v-text="item.text" @click="bm_zg_Ck(item.text,item.value)"></li>
                      </ul>
                  </div> -->
                  <label>
                    <div class="fl cb_tit">
                        当月报名次数限制 <span>*</span>
                    </div>
                    <div class="fr cb_nr">
                        <div class="pb_sj_ty" @click="bmcss()">
                            <input type="text" v-model="bm_cishu" readonly >
                            <img src="@/assets/images/62414.png">
                        </div>
                    </div>
                  </label>
                  <!-- <div class="bmcs_ct" :class="{'bmcs_ct_active':bmcsTrue}" v-if="bmcs.length>1">
                      <ul>
                        <li v-for="item in bmcs"  v-text="item+'次'" @click="bm_cishu_Ck(item)"></li>
                      </ul>
                  </div>
                  <div class="" v-else>
                  </div> -->

                  <label>
                    <div class="fl cb_tit">
                        活动地点 <span>*</span>
                    </div>
                    <div class="fr hdplace" >
                      <input type="text" @click="positionCk()" v-model="mapaddress"   />
                      <span @click="tomap()"><img  src="@/assets/images/pos.png"></span>
                    </div>
                  </label>
                  <!-- 活动地点下拉 -->
                  <!-- <div  class="hdplace_position" :class="{'hdplace_positionActive':hdplacepositionTrue}">
                    <ul>
                      <li   @click="posiPlaceCK(item.address,item.latitude,item.longitude)" v-for="(item,index) in recent"  :key="index" :value="item.address" v-text="item.address"></li>
                    </ul>
                  </div> -->

                  <label>
                    <div class="fl cb_tit">
                        活动时间 <span>*</span>
                    </div>
                    <div class="fr huodtime" @click="start()">
                      <span class="" v-model="starttimestr" v-text="starttime"></span>
                      <span class="" v-model="endtimestr" v-text="endtime"></span>
                        <img src="@/assets/images/ridas.png" >
                    </div>
                  </label>
                  <label>
                    <div class="fl cb_tit">
                        报名起止时间 <span>*</span>
                    </div>
                    <div class="fr huodtime" @click="bmstart()">
                      <span class="" v-model="bmstarttimestr" v-text="bmstarttime"></span>
                      <span class="" v-model="bmendtimestr" v-text="bmendtime"></span>
                        <img src="@/assets/images/ridas.png" >
                    </div>
                  </label>
                  <label>
                    <div class="fl cb_tit">
                        名额 <span>*</span>
                    </div>


                    <div class="fr cb_nr">
                      <div class="pb_sj_ty" >
                          <input type="text" v-model="mingeinput" placeholder="请输入自定义名额" >
                          <img @click="meselect()" src="@/assets/images/62414.png">
                      </div>
                      <!-- <input type="text" v-model="mingeinput"  placeholder="自定义名额"  @click="meselect()"/> -->
                    </div>
                  </label>

                  <!-- 名额下拉 -->
                  <!-- <div   class="minge" :class="{'mingeactive':ClassTrue}">
                    <ul>
                      <li   @click="mingliCk(item)" v-for="(item,index) in minge"  :key="index" :value="item" v-text="item"></li>
                    </ul>
                  </div> -->

            </div>

            <!-- 更多设置 -->
            <!-- <div class="moreshezhi" @click="moreshezhi()">
              更多设置
            </div>
            <div class="more_sz_cont" ref="moreht" :class="{'moreszcont_active':moreszcont_active_True}">
                <div class="gdhd">
                  <van-cell center title="每周固定活动">
                    <template #right-icon>
                      <van-switch v-model="hdchecked" size="24" />
                    </template>
                  </van-cell>
                </div>
                <div class="zdfabu">
                  <van-cell center title="自动发布设置"  @click="autotit_select_Ck()">
                    <input class="tr" disabled type="text"   v-model="autoname">
                  </van-cell>
                </div>

                <div  class="autotit_select" :class="{'autotit_select_active':AutoStTrue}">
                  <ul>
                    <li v-for="(item,index) in fabutime"   @click="autoNameCk(item.time,index)" :key="index">{{item.time}}</li>
                  </ul>
                </div>
            </div> -->

            <!-- //底部展位 -->
            <div class="creatzhanwei">
            </div>
            <!-- 发布按钮 -->
            <div class="fabu_button fix">
              <div class="">
                <van-button  block @click="activitySend()">发布</van-button>
              </div>
            </div>
            <!-- 开始时间控件 -->
           <van-popup v-model="starttimeshow" position="bottom">
             <van-datetime-picker
               v-model="currentDate"
               type="datetime"
               title="活动开始时间"
               :min-date="minDate"
               :max-date="maxDate"
               @confirm="confirm"
               @cancel="cancel"
             />
           </van-popup>
           <!-- 结束时间控件 -->
          <van-popup v-model="endtimeshow" position="bottom">
            <van-datetime-picker
              v-model="currentDate2"
              type="datetime"
              title="活动结束时间"
              :min-hour="0"
              :max-hour="24"
              @confirm="confirm1"
              @cancel="cancel1"
            />
          </van-popup>
          <!-- 报名开始事件 -->
         <van-popup v-model="bmstarttimeshow" position="bottom">
           <van-datetime-picker
             v-model="currentDate3"
             type="datetime"
             title="报名开始时间"
             :min-date="minDate"
             :max-date="maxDate"
             @confirm="confirm3"
             @cancel="cancel3"
           />
         </van-popup>
         <!-- 报名结束日期 -->
        <van-popup v-model="bmendtimeshow" position="bottom">
          <van-datetime-picker
            v-model="currentDate4"
            type="datetime"
            title="报名结束时间"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm4"
            @cancel="cancel4"
          />
        </van-popup>



        </div>


      <!-- 下拉新增修改2020-7-26 -->
      <van-popup v-model="julebu_Select_show" position="bottom">
      <van-picker title="请选择俱乐部"  value-key="club_name"  show-toolbar  :columns="bmjlb"  @confirm="julebu_onConfirm"  @cancel="julebu_onCancel"   />
      </van-popup>

      <van-popup v-model="bmzg_show" position="bottom">
      <van-picker title="报名资格"  value-key="text"  show-toolbar  :columns="bmzg"  @confirm="bmzg_onConfirm"  @cancel="bmzg_onCancel"   />
      </van-popup>


      <van-popup v-model="dy_bmcs_show" position="bottom">
      <van-picker title="当月报名次数"  value-key="text"  show-toolbar  :columns="bmcs"  @confirm="bmcs_onConfirm"  @cancel="bmcs_onCancel"   />
      </van-popup>


      <van-popup v-model="minge_show" position="bottom">
      <van-picker title="名额"  value-key="text"  show-toolbar  :columns="minge"  @confirm="minge_onConfirm"  @cancel="minge_onCancel"   />
      </van-popup>




    </div>
</template>

<script>
export default {
  data(){
    return{
      // txmap
      latitude: '',
      longitude: '',
      address: '',
      city: '',
      //新增弹框
      julebu_Select_show:false,
      bmzg_show:false,
      dy_bmcs_show:false,
      minge_show:false,

      activityname:'',
      message:'',
      //活动主题
      // mapaddress:localStorage.getItem("mapaddress"),
      mapaddress: this.$route.query.addr,

      value1: 0,
      bmjlb: [],
      zigevalue: 0,
      bm_jlb:"请选择俱乐部",
      bm_jlb_id:"",
      bmjlbTrue:false,
      bm_bmzg_code:'',
      bmzg: [
        { text: '仅限俱乐部会员', value: 0 },
        { text: '全体员工', value: 1 },
      ],
      bm_bmzg_value:'仅限俱乐部会员',
      bmzgTrue:false,
      bm_bmzg:'篮球俱乐部',
      cishuvalue:0,
      bmcs:[],//报名次数
      bmcsTrue:false,
      bm_cishu:"不限",

      //活动时间
       minDate: new Date(),
       maxDate: new Date(2040, 12, 30),
       starttimeshow: false, //开始时间弹窗
       currentDate: new Date(), //开始标准时间
       currentDate2: new Date(), //开始标准时间
       starttimestr:'',
       starttime: "", //开始时间
       starttime1: "", //开始时间时间戳
       endtimestr:'',
       endtime: "", //开始时间
       endtime1: "", //开始时间时间戳
       //选择时间区间
       endtimeshow:false,
       currentTime: '12:00',
       //报名开始时间
       bmstarttimeshow:false,
       currentDate3: new Date(), //开始标准时间
       bmstarttime: "", //开始时间
       bmstarttimestr:"",
       bmstarttime1: "", //开始时间时间戳
       //报名结束时间
       bmendtimeshow:false,
       currentDate4: new Date(), //开始标准时间
       bmendtimestr:'',
       bmendtime: "", //开始时间
       bmendtime1: "", //开始时间时间戳
       minge:[],//名额数组
       ClassTrue:false,
       hdplacepositionTrue:false,
       recent:[],
       mingeinput:'',

       //活动cken
       hdchecked:true,
       checkid_code:'0',
       AutoStTrue:false,
       fabulist:[],
       fabutime:[
         {time:"星期一"},
         {time:"星期二"},
         {time:"星期三"},
         {time:"星期四"},
         {time:"星期五"},
         {time:"星期六"},
         {time:"星期日"},
       ],
       autoname:'星期一',
       //更多收起菜单
       moreszcont_active_True:false,

       //俱乐部管理员
       julebu:[],
       julebu_club_name:'',
       ismenber:'',
       julebuid:'',


    }
   },
   created(){
     let location = this.$route.query.latng; //腾讯地图返回的路由参数
     if(location != null) {
         let arr = location.split(",");
         this.latitude = arr[0]; //拆分分纬度
         this.longitude = arr[1]; //拆分出经度
     }
     var pass_andy={
       lan:this.latitude,
       lat:this.longitude,
       address: this.$route.query.addr
     }
      localStorage.setItem("locData",JSON.stringify(pass_andy))

   },
   mounted(){
      this.get_Clup();

   },
    activated(){
      var acted_dc_info = JSON.parse(localStorage.getItem('dc_info_nr'))
      if(acted_dc_info){
        this.activityname=acted_dc_info.activity_name;
        this.bm_jlb_id=acted_dc_info.club_id;
        this.message=acted_dc_info.comment;
        this.mingeinput=acted_dc_info.member_limit;
        this.bm_cishu=acted_dc_info.monthly_apply_limit;
        this.starttimestr=acted_dc_info.start_time;
        this.endtimestr=acted_dc_info.end_time;
        this.bmstarttimestr=acted_dc_info.apply_start_time;
        this.bmendtimestr=acted_dc_info.apply_end_time;
        this.bm_bmzg_code=acted_dc_info.club_member_only;
        this.checkid_code=acted_dc_info.weekly_rebuild;

        //以下是id判断name
        this.bm_jlb=acted_dc_info.bm_jlb;
        this.bm_bmzg_value=acted_dc_info.bm_bmzg_value;
        this.starttime=acted_dc_info.starttime;
        this.endtime=acted_dc_info.endtime;
        this.bmstarttime=acted_dc_info.bmstarttime;
        this.bmendtime=acted_dc_info.bmendtime;
        //非管理员length<1俱乐部名称
        this.julebu_club_name=acted_dc_info.julebu_club_name;
      }
      else{

      }
      console.log("页面初始化数据");
      console.log(acted_dc_info);
      // alert(1);

    },
    deactivated(){
        // this.mapaddress=localStorage.getItem("mapaddress");
        // this.mapaddress=localStorage.getItem("mapaddress");
    },

   methods:{

    mingliCk(item){
      this.mingeinput=item;
      this.ClassTrue=false;
    },
    autotit_select_Ck(){
      this.AutoStTrue = !this.AutoStTrue;
    },
    positionCk(){
      this.hdplacepositionTrue=!this.hdplacepositionTrue;
    },
    autoNameCk(item,index){
       this.checkid_code=index;
      this.autoname=item;
      this.AutoStTrue=false;
    },
    bm_cishu_Ck(item){
      this.bm_cishu=item;
      this.bmcsTrue=false;
    },
    bm_zg_Ck(item,value){
      // alert(value);
      this.bm_bmzg_value=item;
      this.bmzgTrue=false;
    },
    bm_jlb_Ck(item,id){
      this.bm_jlb=item;
      this.bm_jlb_id=id;
      this.bmjlbTrue=false;
    },
    posiPlaceCK(item1,item2,item3){
      this.mapaddress=item1;
      localStorage.removeItem("locData")
      this.locData=
      {
        longitude:item3,
        latitude:item2,
        address:item1,
      }
      localStorage.setItem("locData",JSON.stringify(this.locData))
      this.hdplacepositionTrue=false;

    },
    moreshezhi(){
      this.moreszcont_active_True = !this.moreszcont_active_True;
    },
    //报名次数

  //////////////////////////////////////////////////////////////////////////// // add new
    //俱乐部picker
    julebus(){
      this.julebu_Select_show=true;
      // this.bmjlbTrue = !this.bmjlbTrue;
    },
    julebu_onConfirm(picker){
        // console.log(picker.club_name)
        // console.log(picker.club_id)
        this.bm_jlb=picker.club_name;
        this.bm_jlb_id=picker.club_id;
        this.julebu_Select_show=false;
    },
    julebu_onCancel(){
        this.julebu_Select_show=false;
    },
      //报名资格picker
    bmzgs(){
      // this.bmzgTrue = !this.bmzgTrue;
      this.bmzg_show=true;
    },
    bmzg_onConfirm(picker){
        this.bm_bmzg_value=picker.text;
        this.bmzg_show=false;
    },
    bmzg_onCancel(){
        this.bmzg_show=false;
    },
    //当月报名次数picker
    bmcss(){
      this.dy_bmcs_show=true;
    },
    bmcs_onConfirm(picker){
      // console.log(picker);
      this.bm_cishu=picker;
      this.dy_bmcs_show=false;
    },
    bmcs_onCancel(){
        this.dy_bmcs_show=false;
    },
    //名额picker
    meselect(){
      this.minge_show = true;
    },
    minge_onConfirm(picker){
      // console.log(picker);
      this.mingeinput=picker;
      this.minge_show=false;
    },
    minge_onCancel(){
        this.minge_show=false;
    },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////




     // 处理控件显示的时间格式
    start() {
      this.starttimeshow = true;
    },
     // 点击确定
    confirm() {
      this.starttimeshow = false;

      this.starttimestr=
      this.currentDate.getFullYear() +
      "-" +
      (Number(this.currentDate.getMonth()) + 1) +
      "-" +
      this.currentDate.getDate() +
      " " +
      this.currentDate.getHours() +
      ":" +
      this.currentDate.getMinutes()+
      ":" +
      this.currentDate.getSeconds();
      // alert(this.starttimestr);
      //展示日期

      if(this.currentDate.getMinutes()<10){
        this.starttime =  this.currentDate.getFullYear() +  "/" +  (Number(this.currentDate.getMonth()) + 1) +  "/" +
          this.currentDate.getDate() +  "/" +  this.currentDate.getHours() +  ":" + "0" + this.currentDate.getMinutes();
      }
      else{
        this.starttime =  this.currentDate.getFullYear() +  "/" +  (Number(this.currentDate.getMonth()) + 1) +  "/" +
          this.currentDate.getDate() +  "/" +  this.currentDate.getHours() +  ":" +  this.currentDate.getMinutes();
      }


        this.starttime1 = new Date(this.currentDate).getTime() / 1000;
        this.endtimeshow=true

    },
    //活动结束时间
    confirm1() {
      this.endtimeshow = false;
      this.endtimestr=
      this.currentDate2.getFullYear() +
      "-" +
      (Number(this.currentDate2.getMonth()) + 1) +
      "-" +
      this.currentDate2.getDate() +
      " " +
      this.currentDate2.getHours() +
      ":" +
      this.currentDate2.getMinutes()+
      ":" +
      this.currentDate2.getSeconds();
      // alert(this.endtimestr);

      if(this.currentDate2.getMinutes()<10){
        this.endtime = "—" + (Number(this.currentDate2.getMonth()) + 1) + "/" +this.currentDate2.getDate() + "/" + this.currentDate2.getHours() +  ":" + '0' + this.currentDate2.getMinutes();
      }
      else{
       this.endtime = "—" +  (Number(this.currentDate2.getMonth()) + 1) + "/" +this.currentDate2.getDate() + "/" + this.currentDate2.getHours() +  ":" +  this.currentDate2.getMinutes();
      }


    },
    bmstart() {
      this.bmstarttimeshow = true;
    },
    //报名开始时间
    confirm3() {
      this.bmstarttimeshow = false;
      this.bmstarttimestr=
      this.currentDate3.getFullYear() +
      "-" +
      (Number(this.currentDate3.getMonth()) + 1) +
      "-" +
      this.currentDate3.getDate() +
      " " +
      this.currentDate3.getHours() +
      ":" +
      this.currentDate3.getMinutes()+
      ":" +
      this.currentDate3.getSeconds();

      // 显示时间
      if(this.currentDate3.getMinutes()<10){
        this.bmstarttime =
        (Number(this.currentDate3.getMonth()) + 1) +
        "/" +
        this.currentDate3.getDate() +
        "/" +
        this.currentDate3.getHours() +
        ":" + '0' +  this.currentDate3.getMinutes();
        }
        else{
          this.bmstarttime =
          (Number(this.currentDate3.getMonth()) + 1) +
          "/" +
          this.currentDate3.getDate() +
          "/" +
          this.currentDate3.getHours() +
          ":" +
          this.currentDate3.getMinutes();
        }

        this.bmstarttime1 = new Date(this.currentDate3).getTime() / 1000;
        this.bmendtimeshow = true;
    },
    confirm4() {
      this.bmendtimeshow = false;

      this.bmendtimestr=
      this.currentDate4.getFullYear() +
      "-" +
      (Number(this.currentDate4.getMonth()) + 1) +
      "-" +
      this.currentDate4.getDate() +
      " " +
      this.currentDate4.getHours() +
      ":" +
      this.currentDate4.getMinutes()+
      ":" +
      this.currentDate4.getSeconds();

      //显示的时间
      if(this.currentDate4.getMinutes()<10){
         this.bmendtime =
        "—" +
        (Number(this.currentDate4.getMonth()) + 1) +
        "/" +
        this.currentDate4.getDate() +
        "/" +
        this.currentDate4.getHours() +
        ":" + '0' +
        this.currentDate4.getMinutes();
        }
        else{
          this.bmendtime =
         "—" +
         (Number(this.currentDate4.getMonth()) + 1) +
         "/" +
         this.currentDate4.getDate() +
         "/" +
         this.currentDate4.getHours() +
         ":" +
         this.currentDate4.getMinutes();
        }
        this.bmendtime1 = new Date(this.currentDate4).getTime() / 1000;
    },
    //点击取消
    cancel(){
        this.starttimeshow = false;
    },
    cancel1(){
      this.endtimeshow = false;
    },
    cancel3(){
        this.bmstarttimeshow = false;
    },
    cancel4(){
      this.bmendtimeshow = false;
    },

    //获取地图地址
     tomap(){
       var dc_info={
         activity_name:this.activityname,
         club_id:this.bm_jlb_id,
         comment:this.message,
         member_limit:this.mingeinput,
         monthly_apply_limit:this.bm_cishu,
         start_time:this.starttimestr,
         end_time:this.endtimestr,
         apply_start_time:this.bmstarttimestr,
         apply_end_time:this.bmendtimestr,
         club_member_only:this.bm_bmzg_code,
         weekly_rebuild:this.checkid_code,
         //以下是id判断name
         bm_jlb:this.bm_jlb,
         bm_bmzg_value:this.bm_bmzg_value,
         starttime:this.starttime,
         endtime:this.endtime,
         bmstarttime:this.bmstarttime,
         bmendtime:this.bmendtime,
         //非管理员length<1俱乐部名称
         julebu_club_name:this.julebu_club_name,
       }
       console.log(dc_info);
       // localStorage.setItem("dc_info_nr",JSON.stringify(this.dc_info))
       localStorage.setItem("dc_info_nr",JSON.stringify(dc_info))
       //拿到缓存之后去map页面
       // this.$router.push({
       //    name:"txmapa"
       //  })
       //获取腾讯地图选址
       if(this.brand_id == null) {
           this.brand_id = 0;
       }
       sessionStorage.setItem("nickname", this.nickname);
       sessionStorage.setItem("tel", this.tel);
       window.location.href="https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=http://www.staffhome.cn/activityCreate/&key=DADBZ-B3ORU-4BVV3-4TKN3-6MEZZ-ZQFWH&referer=画宝汇-微信端"

     },
     //获取地图返回的参数
     getLocation() {
         let location = this.$route.query.latng; //腾讯地图返回的路由参数
         if(location != null) {
             let arr = location.split(",");
             this.latitude = arr[0]; //拆分分纬度
             this.longitude = arr[1]; //拆分出经度
         }

         this.address = this.$route.query.addr; //路由地址
         this.city = this.$route.query.city; //路由城市
     },
     get_Clup(){
       //上拉刷新初始化
       var $this=this;
       var company_id =  localStorage.getItem("company_id");
       var params={
         company:company_id,
         page_sign:this.$route.name,
       }
       console.log(params);

       var qs = require('qs');
       var parm = JSON.stringify(params);
       let url = this.api.userApi.get_zp
       this.axios.post(url+'/'+params.company+'/'+params.page_sign,qs.stringify({params:parm}),)
       .then((res) => {
         console.log(res);
         console.log(res.data.data.pageElementList)
         this.minge=res.data.data.pageElementList.acitvityCreate.detail.member_limit;
         this.bmcs=res.data.data.pageElementList.acitvityCreate.detail.monthly_apply_limit;
         // 俱乐部会员
         // 判断是否超级管理员
         this.ismenber=res.data.data.pageElementList.acitvityCreate.detail.user_club_list.length;
         this.julebu=res.data.data.pageElementList.acitvityCreate.detail.user_club_list[0];
         this.julebu_club_name=this.julebu.club_name;
         console.log(this.julebu_club_name);

         this.bmjlb=res.data.data.pageElementList.acitvityCreate.detail.user_club_list;
         console.log(this.bmjlb);
         this.bm_jlb_id=this.julebu.club_id;
         // this.bm_jlb=res.data.data.pageElementList.acitvityCreate.detail.user_club_list[0].club_name;
         // this.julebuid=this.julebu.club_id;
         this.recent=res.data.data.pageElementList.acitvityCreate.detail.recent_position_list;
       }).catch((error) => {
         console.warn(error)
       })

     },
     // 活动发布提交
     activitySend(){


       this.hdplacepositionTrue=false;
       this.bmzgTrue=false;
       this.bmjlbTrue=false;
       this.ClassTrue=false;
       this.bmcsTrue=false;

       var $this=this;
       var company_id =  localStorage.getItem("company_id");
       // 判断是否俱乐部会员或者所有人
       if(this.bm_bmzg_value=="仅限俱乐部会员"){
         this.bm_bmzg_code=1;
       }
       else{
         this.bm_bmzg_code=0;
       }
       //更多设置判断是否重复
       if(this.hdchecked==false){
         this.checkid_code="-1";
       }
       var params={
         company:company_id,
         activity_name:this.activityname,
         club_id:this.bm_jlb_id,
         comment:this.message,
         member_limit:this.mingeinput,
         monthly_apply_limit:this.bm_cishu,
         start_time:this.starttimestr,
         end_time:this.endtimestr,
         apply_start_time:this.bmstarttimestr,
         apply_end_time:this.bmendtimestr,
         club_member_only:this.bm_bmzg_code,
         checkin:localStorage.getItem("locData"),
         weekly_rebuild:this.checkid_code,
       }

        console.log(params);
       var qs = require('qs');
       // var parm = JSON.stringify(params);
       let url = this.api.userApi.activitySd
       this.axios.post(url,qs.stringify(params),)
       .then((res) => {
         console.log(res);

         // 返回MSG提示
         if(res.data.code==200){

           this.$toast(res.data.msg);
           //清空数据缓存
           localStorage.removeItem("dc_info_nr");
           localStorage.removeItem("mapaddress")
           localStorage.removeItem("locData")
           setTimeout(()=>{
             this.$router.push({
                 name:'managedActivityList'
               })
           },1000)
         }
         else{
           this.$toast(res.data.msg);
         }

       }).catch((error) => {
         console.warn(error)
       })

     }

   }
  }
</script>

<style lang="css" scoped>
</style>

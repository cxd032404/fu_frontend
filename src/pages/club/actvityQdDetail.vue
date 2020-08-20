<template lang="html">
  <div class="container-fluid jingpin_bg">
    <div class="pb_tag_top">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        活动签到
    </div>
    <div class="pb_top_zhanwei"></div>



    <div class="demo-input-suffix" >
        <!-- <el-link type="info">关键词：</el-link><el-input  class="lineinput"   size="mini" v-model="keyword"></el-input><br>
        <el-link type="info">地  区：</el-link><el-input  class="lineinput"  size="mini" v-model="location"></el-input><br>
        <el-link type="info">l n g：</el-link><el-input  class="lineinput"  size="mini" v-model.number="locData.longitude"></el-input><br>
        <el-link type="info">l a t：</el-link><el-input  class="lineinput"  size="mini" v-model.number="locData.latitude"></el-input><br>
        <el-link type="info">地  址：</el-link><el-input  class="lineinput"   size="mini" v-model="locData.address"></el-input> -->
    </div>
    <div class="post_dw_map">


      <div class="post_dw_map_top">
        <input v-model.number="locData.longitude">
        <input v-model.number="locData.latitude">
        <input v-model.number="this.zoom">
        <input v-model.number="locData.address">
      </div>
      <baidu-map
          class="map"
          :dragging="false"
          :scroll-wheel-zoom="true"  @ready="mapReady"
          :center="center"  :autoLocation="true"
          :zoom="zoom"     ak="NI5YPG5rt4bWlt6AmLoFuOIos88uM53C"
          @moving="syncCenterAndZoom"
          @moveend="syncCenterAndZoom"
          @zoomend="syncCenterAndZoom">
           <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="true" @locationSuccess="getLoctionSuccess">
           </bm-geolocation>
          <!-- <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"></bm-marker> -->
            <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: require('@/assets/images/5519.png'), size: {width: 30, height: 30}}"></bm-marker>
      </baidu-map>


    </div>

    <!-- 签到状态 -->
    <!-- // -->
    <div class="jlb_qd_map_ct">
        <p> <span><img :src="qiandao_info.club_icon" alt=""></span> {{qiandao_info.club_name}}</p>
        <p> <span> <img src="@/assets/images/timsss.png" alt=""> </span> {{qiandao_info.time}}</p>
        <p><span><img src="@/assets/images/pos_na.png" alt=""></span>当前位置： <em style="color:#000;">{{locData.address}}</em>  </p>
    </div>
    <div class="map_code">
          <div  v-show="mapcodea" class="map_code_a tc" @click="dianjiqiandao()">
              <div class="map_code_1">
                <div class="map_code_pos">
                  <h3>签到</h3>
                  <p>  {{this.nowTime}}</p>
                </div>
              </div>
              <p><img src="@/assets/images/gsduihao.png" alt="">你已进入有效打卡区域内</p>
          </div>

          <div v-show="mapcodeb" class="map_code_a tc" >
              <div class="map_code_2">
                <div class="map_code_pos">
                  <h3>无法签到</h3>
                  <p>  {{this.nowTime}}</p>
                </div>
              </div>
              <p> <img src="@/assets/images/d.png" alt=""> 管理员设置打卡区域在1km内</p>
          </div>

          <div v-show="mapcodec" class="map_code_a tc">
              <div class="map_code_3">
                <div class="map_code_pos">
                  <h3>签到成功</h3>
                  <p>  {{this.nowTime}}</p>
                </div>
              </div>
              <p><img src="@/assets/images/gsduihao.png" alt=""> 您已进入有效活动时间内</p>
          </div>

    </div>


    </div>
</template>

<script>
import {BaiduMap,BmNavigation,BmView,BmGeolocation,BmCityList,BmMarker} from 'vue-baidu-map'
    export default {
        components: {
            BaiduMap,
            BmNavigation,
            BmView,
            BmGeolocation,
            BmMarker,
            BmCityList
        },
        data () {
            return {
              center: {lng: '0',lat: '0'},
              zoom: 18,
              locData:{
                  longitude:'',
                  latitude:'',
                  address:'',
              },
              timer:null, //定时器名称
              mapcodea:false,
              mapcodeb:false,
              mapcodec:false,
              nowDate: "",    // 当前日期
              nowTime: "",    // 当前时间
              nowWeek: "",     // 当前星期
              temp:{},
              qiandao_info:[],

            }
        },
      mounted() {

          this.getQdao();
          this.getInfo();
          this.currentTime();
          // this.queryInfo();
          this.timer = setInterval(() => {
               setTimeout(this.queryInfo, 0)
           }, 5000)

        },

        created() {

        },
    // 销毁定时器
        beforeDestroy(){
         clearInterval(this.timer);
         this.timer = null;
         //显示当前日期实时更新
         if (this.getDate) {
             console.log("销毁定时器")
             clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
         }
       },
        methods: {
          //vue每隔五分钟刷新下网页获取实时定位
          queryInfo(){
            this.getQdao();
          },
          syncCenterAndZoom (e) {
            const {lng, lat} = e.target.getCenter()
            this.center.lng = lng
            this.center.lat = lat
            // this.zoom = e.target.getZoom()
          },
          mapReady ({ BMap, map }) {
             const _this = this
             // 获取自动定位方法
             var geolocation = new BMap.Geolocation()
             // 获取逆解析方法实例
             this.myGeo = new BMap.Geocoder()

             // 获取自动定位获取的坐标信息
             geolocation.getCurrentPosition(
               function (r) {
                 console.log(r);
                 _this.center = {
                   lng: r.point.lng,
                   lat: r.point.lat
                 }
                 _this.point = {
                   lng: r.point.lng,
                   lat: r.point.lat
                 }

                 //根据坐标获取地址信息
                 var point = new BMap.Point(r.point.lng, r.point.lat);
                 var gc = new BMap.Geocoder();
                 gc.getLocation(point, function (rs) {
                     var addComp = rs.addressComponents;
                     console.log(rs);//地址信息
                     _this.locData.address = rs.address;
                     _this.locData.longitude = rs.point.lng;
                     _this.locData.latitude = rs.point.lat;

                    // _this.temp = rs.point
                     localStorage.setItem("locDataMap",JSON.stringify(_this.locData))

                 });

               },
               { enableHighAccuracy: true }
             )
             //

           },

           //定位成功回调
           getLoctionSuccess(){

           },

           //点击签到提示签到成功
           dianjiqiandao(){
             this.mapcodea=false
             this.mapcodeb=false
             this.mapcodec=true
             this.getQDWay();
             clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
             setTimeout(()=>{
               this.$router.push({ name: 'actvityQd'});
             },1500)
           },
           //获取签到的活动信息

          //获取签到校验
          getQdao(){
            var $this=this;
            var params={
              activity_id:this.$route.params.id,
              position:localStorage.getItem("locDataMap"),
            }
            // return
            var qs = require('qs');
            // var parm =
            let url = this.api.userApi.jlb_qd_map
            this.axios.post(url,qs.stringify(params),)
            .then((res) => {
              //顶部name
              console.log(res);
              if(res.data.code==400){
                this.mapcodeb=true
                this.mapcodea=false
                this.mapcodec=false
              }
              else{
                this.mapcodea=true
                this.mapcodeb=false
                this.mapcodec=false
              }

            }).catch((error) => {
              console.warn(error)
            })
          },

          //获取俱乐部活动信息
          getInfo(){
            var $this=this;
            var params={
              activity_id:this.$route.params.id,
            }
            var qs = require('qs');
            let url = this.api.userApi.get_actinfo
            this.axios.post(url,qs.stringify(params),)
            .then((res) => {
              //签到俱乐部信息
              // alert(res.data.data.club_name);
              console.log(res.data.data);
              this.qiandao_info=res.data.data;
              // this.qiandao_info_club_name=res.data.data.club_name;
              // alert(res.data.data.club_name)
            }).catch((error) => {
              console.warn(error)
            })
          },

          //签到事件
          getQDWay(){
            var $this=this;
            var params={
              activity_id:this.$route.params.id,
              position:localStorage.getItem("locDataMap"),
            }
            // return
            var qs = require('qs');
            // var parm =
            let url = this.api.userApi.act_sucess
            this.axios.post(url,qs.stringify(params),)
            .then((res) => {
              //顶部name
              console.log(res);

            }).catch((error) => {
              console.warn(error)
            })

          },
          //获取当前时间
          currentTime() {
            setInterval(this.getDate, 500);
            },
           getDate: function() {
                var _this = this;
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth() + 1;
                let dd = new Date().getDate();
                let week = new Date().getDay();
                let hh = new Date().getHours();
                let mf =
                    new Date().getMinutes() < 10
                        ? "0" + new Date().getMinutes()
                        : new Date().getMinutes();
                if (week == 1) {
                    this.nowWeek = "星期一";
                } else if (week == 2) {
                    this.nowWeek = "星期二";
                } else if (week == 3) {
                    this.nowWeek = "星期三";
                } else if (week == 4) {
                    this.nowWeek = "星期四";
                } else if (week == 5) {
                    this.nowWeek = "星期五";
                } else if (week == 6) {
                    this.nowWeek = "星期六";
                } else {
                    this.nowWeek = "星期日";
                }
                _this.nowTime = hh + ":" + mf;
                _this.nowDate = yy + "/" + mm + "/" + dd;
            }


        },


    }

</script>
<style>
.map {
  width: 100%;
  height: 100vh;
}
.BMap_cpyCtrl {
   display: none;
 }
.anchorBL {
   display: none;
}
</style>

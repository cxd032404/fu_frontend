<template>
  <div class="container-fluid  jingpin_bg">
      <!-- 点击地图进行搜索 -->
      <div class="pb_tag_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          地图信息
      </div>
      <div class="pb_top_zhanwei"></div>
        <!-- <baidu-map>
          <bm-view class="map"></bm-view>
          <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
        </baidu-map> -->
      <!-- //点击地图出现信息 -->
        <div class="map_top_all container">
          <div class="fl map_input_serch">
            <img src="@/assets/images/sec.png" alt="">
            <input v-on:focus="shuruchange()"  v-model="keyword" type="text" placeholder="请搜索地址..." clearable>
          </div>
          <div class="fr mp_tj" @click="findlocation">
            <span  >提交</span>
          </div>
        </div>

        <div class="demo-input-suffix" >
            <el-link type="info">关键词：</el-link><el-input  class="lineinput"   size="mini" v-model="keyword"></el-input><br>
            <el-link type="info">地  区：</el-link><el-input  class="lineinput"  size="mini" v-model="location"></el-input><br>
            <el-link type="info">l n g：</el-link><el-input  class="lineinput"  size="mini" v-model.number="locData.longitude"></el-input><br>
            <el-link type="info">l a t：</el-link><el-input  class="lineinput"  size="mini" v-model.number="locData.latitude"></el-input><br>
            <el-link type="info">地  址：</el-link><el-input  class="lineinput"   size="mini" v-model="locData.address"></el-input>
        </div>
        <!-- <div slot="footer" class="dialog-footer">
            <el-button type="warning"  size="small" icon="el-icon-close" @click.native="mapVisible = false">取消</el-button>
            <el-button type="primary" size="small" icon="el-icon-check" @click.native="findlocation">保存</el-button>
        </div> -->
        <baidu-map  class="map" :center="center" :zoom="zoom" @ready="handler"
                   :scroll-wheel-zoom="true"
                   @click="clickEvent"
                   ak="NI5YPG5rt4bWlt6AmLoFuOIos88uM53C">
          <!-- //搜索定位 -->

            <bm-local-search v-show="mmselect_map"   class="mmselect_map" :keyword="keyword" :auto-viewport="true"  :location="location" @click="gss"></bm-local-search>
            <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"  :showAddressBar="true" :autoLocation="true" @locationSuccess="getLoctionSuccess" ></bm-geolocation>
            <bm-view :style="{width:'100%',height: this.clientHeight+'px',flex: 1,marginBottom:'-30px'}"></bm-view> -->
            <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="{url: require('@/assets/images/5519.png'), size: {width: 30, height: 30}}"></bm-marker>
        </baidu-map>

  </div>

</template>

<script>
import {BaiduMap,BmNavigation,BmView,BmGeolocation,BmCityList} from 'vue-baidu-map'
    export default {

        components: {
            BaiduMap,
            BmNavigation,
            BmView,
            BmGeolocation,
            BmCityList
        },
        data () {
            return {
              mapaddress:"",
              mmselect_map:true,
              location: '上海',
              keyword: '',
                center: {lng: 121.833138, lat: 39.081725},
                zoom: 50,
                mapVisible:false,
                locData:{
                    longitude:'',
                    latitude:'',
                    address:'',
                },
                clientHeight:document.documentElement.clientHeight-90, // 屏幕高度
                iconUrl:'@/assets/images/posmap.png',
            }
        },
        methods: {
            shuruchange(){
               this.mmselect_map=true;
            },
            handler ({BMap, map}) {
                let _this = this;	// 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    console.log(r);
                    _this.center = {lng: r.longitude, lat: r.latitude};		// 设置center属性值
                    _this.autoLocationPoint = {lng: r.longitude, lat: r.latitude};		// 自定义覆盖物
                    _this.initLocation = true;
                },{enableHighAccuracy: true})

                window.map = map;
            },
            gss(){
              alert(1);

            },
            //点击地图监听
            clickEvent(e){
              // :icon="{url: require('@/assets/images/5519.png'), size: {width: 30, height: 30}
                map.clearOverlays();
                let Icon_0 = new BMap.Icon(require('@/assets/images/5519.png'), new BMap.Size(30, 30), {anchor: new BMap.Size(30, 30),imageSize: new BMap.Size(30, 30)});
                var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat),{icon: Icon_0});
                map.addOverlay(myMarker);
                //用所定位的经纬度查找所在地省市街道等信息
                var point = new BMap.Point(e.point.lng, e.point.lat);
                var gc = new BMap.Geocoder();
                let _this = this;
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    //console.log(rs.address);//地址信息
                    _this.locData.address = rs.address;
                      _this.keyword = rs.address;

                });
                this.locData.longitude = e.point.lng;
                this.locData.latitude = e.point.lat;

               this.mmselect_map=false;
            },

            //定位成功回调
            getLoctionSuccess(point, AddressComponent, marker){


                map.clearOverlays();
                let Icon_0 = new BMap.Icon("@/assets/images/posmap.png", new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(36, 36)});
                var myMarker = new BMap.Marker(new BMap.Point(point.point.lng, point.point.lat),{icon: Icon_0});
                map.addOverlay(myMarker);
                this.locData.longitude = point.point.lng;
                this.locData.latitude = point.point.lat;

            },
            findlocation(){

                this.$emit("findlocdata",this.locData)
                console.log(this.locData)
                this.mapaddress=this.locData.address

                localStorage.setItem("locData",JSON.stringify(this.locData))
                localStorage.setItem("mapaddress",this.mapaddress)
                // localStorage.setItem("mapaddress",this.mapaddress)
                this.mapVisible = false


                setTimeout(()=>{
                  this.$router.push({
                    name:"gdactivityCreate"
                  })
                },1000)

                // this.$router.go(-1)

            },
            mapShow(){
                this.mapVisible = true
            },
        },
        mounted() {
          // alert(1);
        }

    }

</script>
<style>
.map {
  width: 100%;
  position: relative;
  height: 100vh;
}
.BMap_cpyCtrl {
   display: none;
 }
.anchorBL {
   display: none;
}
.demo-input-suffix{width: 95%;margin: 0px auto;margin-bottom: 0px;}
.demo-input-suffix .el-link.el-link--info {
  font-size: 22px;text-align-last:justify;
  color: #000;
  display: inline-block;width: 30%;
  float: left;
  margin-bottom: 10px;
}
.demo-input-suffix .el-input--mini{font-size: 16px;color: #000;margin-bottom: 10px;
border: 1px solid #000;width: 68% !important;margin-top: 0px;}
.mmselect_map{width: 100%;position: absolute;top: 0;width: 70%;background: #fff;overflow: auto;}
.ditumap_mi{height: 100vh;overflow-y: scroll;}
</style>

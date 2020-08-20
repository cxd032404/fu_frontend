<template>
  <div class="container-fluid  ditumap_mi">
      <!-- 点击地图进行搜索 -->
      <div class="pb_tag_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          地图信息
      </div>
      <div class="pb_top_zhanwei"></div>
      <input v-model.number="center.lng">
      <input v-model.number="center.lat">
      <input v-model.number="zoom">
      <baidu-map
          class="map"
          :scroll-wheel-zoom="true"
          :center="center"
          :zoom="zoom"     ak="NI5YPG5rt4bWlt6AmLoFuOIos88uM53C"
          @moving="syncCenterAndZoom"
          @moveend="syncCenterAndZoom"
          @zoomend="syncCenterAndZoom">
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

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
              center: {
                lng: 116.404,
                lat: 39.915
              },
              zoom: 15
            }
        },
        methods: {
          syncCenterAndZoom (e) {
            const {lng, lat} = e.target.getCenter()
            this.center.lng = lng
            this.center.lat = lat
            this.zoom = e.target.getZoom()
          }

        },
        mounted() {
          // alert(1);
        }

    }

</script>
<style>
.map {
  width: 100%;
  height: 300px;
}
</style>

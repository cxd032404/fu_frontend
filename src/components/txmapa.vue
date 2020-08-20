<template lang="html">
  <div class="">
    <input type="text" name="" placeholder="请选择机构位置" v-model="address" @click="toMap">
  </div>
</template>

<script>
export default {
  data() {
    return{
       latitude: '',
       longitude: '',
       address: '',
       city: '',
    }
  },
methods: {
      toMap(){
             if(this.brand_id == null) {
                 this.brand_id = 0;
             }
             sessionStorage.setItem("nickname", this.nickname);
             sessionStorage.setItem("tel", this.tel);
             window.location.href="https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=http://192.168.31.185:8080/activityCreate/&key=DADBZ-B3ORU-4BVV3-4TKN3-6MEZZ-ZQFWH&referer=画宝汇-微信端"
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
  }
}
</script>

<style lang="css" scoped>
</style>

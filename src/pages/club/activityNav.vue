<template lang="html">
  <div class="container-fluid jingpin_bg">
    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
        <!-- {{this.pagename}} -->
        活动报名
    </div>
    <div class="pb_top_zhanwei"></div>
    <div class="gihuod_nav container-fluid">
        <div class="gihuod_nav_a tc">
          <h1>请选择活动类型</h1>
          <!-- <p>请选择俱乐部活动类型，为您更好的服务</p> -->
        </div>

        <div class="gihuod_nav_b container-fluid">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell title="单次活动" clickable @click="godc(radio = '2')">
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            <van-cell title="固定活动" clickable @click="gogd(radio = '1')">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>

            </van-cell-group>
            </van-radio-group>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
         radio: '',
    }
  },
  methods:{
    gogd(){
      setTimeout(()=>{
          this.$router.push({ name: 'gdactivityCreate'});
      },1000)


    },
    godc(){
      setTimeout(()=>{
          this.$router.push({ name: 'activityCreate'});
      },1000)

    }
  }
}
</script>

<style lang="css" scoped>
</style>

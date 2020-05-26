<template lang="html">
  <div class="container-fulid">
      <!-- tag箭头 -->
      <div class="pb_tag_top">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          我的
      </div>
      <div class="activy_jilu" @click="hdjilu()">
          活动记录
      </div>
      <!-- <m-footer></m-footer> -->

    </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  created(){

  },
  mounted() {

  },
  methods: {
    hdjilu(){
      this.$router.push({
          name:'activityrecord'
        })
    }
  }

}
</script>

<style lang="css" scoped>
</style>

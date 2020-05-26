<template lang="html">

    <div class="">
        <div class="head_top_a">
            <van-cell title="单元格" is-link />
        </div>
    </div>
      <!-- <div class="mmms">
        <ul>

          <li  @click="index()"><h2>index</h2></li>
          <li  @click="huodong()"><h2>活动类型1</h2></li>
          <li  @click="paihang()"><h2>排行榜</h2></li>
        </ul>
      </div> -->

</template>

<script>

export default {
  data() {
    return {

    }
  },
  created(){

  },
  watch:{
  },
  mounted() {

  },
  methods: {
    aacc(){
      this.$router.push({
          name:'aacc'
      })
    },
    apply(){
      this.$router.push({
          name:'apply'
      })
    },
    index(){
      this.$router.push({
          name:'index'
      })
    },
    //活动类型1
    huodong(){
      this.$router.push({
          name:'huodongtype'
      })
    },

  }

}
</script>

<style lang="css" scoped>
</style>

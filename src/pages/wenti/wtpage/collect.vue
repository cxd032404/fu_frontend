<template lang="html">
 <div class="container-fluid ">

    <div class="pb_tag_top baise">
      <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          <!-- {{this.pagename}} -->
          藏品共赏
    </div>
    <div class="pb_top_zhanwei"></div>
    <div class="pb_all_info">
      <div class="pb_all_info_nr">
        <img src="@/assets/images/weiks.png">
        <p>活动还没有开始喔~</p>
        <router-link to="/">
        <button  type="button" name="button">返回</button>
        </router-link>
      </div>
    </div>

</div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>

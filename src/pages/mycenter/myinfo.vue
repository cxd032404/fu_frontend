<template lang="html">
    <div class="container-fluid ">
      <div class="pb_tag_top baise">
        <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
          我的消息
      </div>
      <div class="pb_top_zhanwei"></div>



      <div class="pb_all_info">
        <div class="pb_all_info_nr">
          <img src="@/assets/images/info.png">
          <p>你还没有收到通知～</p>
          <router-link to="/my">
          <button  type="button" name="button">返回</button>
          </router-link>
        </div>
      </div>
      <!-- <div class="myinfo_list_p baise">
        <ul>
          <li>
            <h1>
              <span class="fl">新人助手</span>
              <span class="fr">2020/4/15 18:30</span>
            </h1>
            <p>Hi，你终于来啦，欢迎新人来到</p>
          </li>
          <li>
            <h1>
              <span class="fl">系统消息</span>
              <span class="fr">2020/4/15 18:30</span>
            </h1>
            <p>Hi，你终于来啦，欢迎新人来到</p>
          </li>
          <li>
            <h1>
              <span class="fl">签到提醒</span>
              <span class="fr">2020/4/15 18:30</span>
            </h1>
            <p>Hi，你终于来啦，欢迎新人来到</p>
          </li>
        </ul>
      </div> -->


    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>

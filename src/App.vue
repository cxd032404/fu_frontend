<template>
  <div id="app">
    <!-- <router-view/> -->

    <keep-alive>
      <router-view  ref="routerView" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view ref="routerView" v-if="!$route.meta.keepAlive"></router-view>


    <div class="navbar" v-if="flag">
      <div class="navbar__fixed">
        <ul class="navbar__box">
          <li :class="index==1 ? 'active' : ''" @click="tab('/')">
            <div class="icon icon__home"></div>
            <p>首页</p>
          </li>
          <li :class="index==2 ? 'active' : ''" @click="tab('/my')">
            <div class="icon icon__vip"></div>
            <p>我的</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'App',
    data() {
      return {
        index: 1,
        // flag: true
        flag: false
      }
    },
    created() {
    },
    watch: {
      '$route.path': function(newVal, oldVal) {
        let path = this.$route.path;

        if (path == "/") {
          this.index = 1;
          // this.flag = true;
            this.flag = false;
        } else if (path == "/my") {
          this.index = 2;
          // this.flag = true;
            this.flag = false;
        } else {
          this.flag = false;
        }
        if (path == "/order" || path == "/openvip" || path == "/list" || path == "/vipactivation" || path == "/vipactivationgroup" || path == "/vipactivationsingle" || path == "/login") {
          this.index = -1;
          this.flag = true;
        }
      },

    },
    mounted() {
      // console.log(window.SystemConfig.web_url)
      let path = this.$route.path;
      if (path == "/") {
        this.index = 1;
        // this.flag = true;
          this.flag = false;
      } else if (path == "/my") {
        this.index = 2;
        // this.flag = true;
        this.flag = false;
      } else {
        this.flag = false;
      }
      if (path == "/order" || path == "/openvip" || path == "/list" || path == "/vipactivation" || path == "/vipactivationgroup" || path == "/vipactivationsingle" || path == "/login") {
        this.index = -1;
        this.flag = true;
      }

    },
    methods: {

      tab(path) {
        this.$router.push({
          path: path,
        });

        // this.$router.push({
        //   path: path,
        // });
      }
    }
  }
</script>
<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

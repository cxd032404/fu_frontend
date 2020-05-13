<template lang="html">

    <div class="mmms">
      <ul>
        <li  @click="index()"><h2>index</h2></li>
        <li  @click="aacc()"><h2>aacc</h2></li>
        <li  @click="apply()"><h2>apply</h2></li>
      </ul>
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
  watch:{
    $route(to, from) {
       if (to.name == "aacc") {
          this.aacc =   JSON.parse(a.aacc);
           this.filter.is_my = 0;
          this.filter.is_join = 1;
        }
      this.gethome();
    }
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

  }

}
</script>

<style lang="css" scoped>
</style>

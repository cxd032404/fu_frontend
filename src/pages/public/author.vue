<template>
  <div class="">
      <div class="">
          code: {{this.th_code}}
      </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        th_code:''
      }
    },
    mounted() {
      var code = this.$route.query.code;
      localStorage.setItem("code",code)
      this.th_code = localStorage.getItem("code")
      if( !code){
          this.$router.replace('/')
      }
      else{
        this.$router.push({
                path: "/logincode",
              })
      // this.$router.push({
      //   path: "/logintest",
      // })


      }

    },

    methods: {
    }


  }
</script>

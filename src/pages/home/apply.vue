<template lang="html">
  <div class="">
   <m-header></m-header>
    <div class="mjh_pbstyle">
      {{list_data.element_id}}
      {{list_data.detail}}
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      list_data:[],
    }
  },
  created(){

  },
  mounted() {
    this.get_all_data()
  },
  methods: {
    get_all_data(){
      var $this=this;
      var param={
        success:true,
        msg:"ok"
      }
      var qs = require('qs');
      let url = this.api.userApi.getPeople
      this.axios.post(url,qs.stringify(param),)
      .then((res) => {

        var list_data = res.data.data.pageElementList;
        this.list_data = Object.assign([],list_data.apply);
       console.log(this.list_data);

      }).catch((error) => {
        console.warn(error)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>

<template lang="html">
<div class="">
    <m-header></m-header>

    <div class="mjh_pbstyle">
      {{list_data.element_id}}
      <hr>
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
    console.log(JSON.parse(localStorage.getItem('list_data')))
    // this.get_all_data()
  },
  mounted() {

  },
  methods: {
    //   get_all_data(){
    //     var $this=this;
    //     var param={
    //       success:true,
    //       msg:"ok"
    //     }
    //     var qs = require('qs');
    //     let url = this.api.userApi.getPeople
    //     console.log(url)
    //     this.axios.post(url,qs.stringify(param),)
    //     .then((res) => {
    //
    //       var list_data = res.data.data.pageElementList;
    //       this.list_data = Object.assign([],list_data.aacc);
    //      console.log(this.list_data);
    //
    //     }).catch((error) => {
    //       console.warn(error)
    //     })
    // },
  }

}
</script>

<style lang="css" scoped>
</style>

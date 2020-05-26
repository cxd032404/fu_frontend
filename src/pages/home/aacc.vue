<template lang="html">
<div class="">
    <m-header></m-header>

    <div class="mjh_pbstyle">
      <hr>
      <div class="gereninfo">
        <ul>
          <li v-for="item in list_nr"  >
            <img :src="item.img_url">
          </li>
        </ul>
      </div>
    </div>



</div>
</template>

<script>

export default {
  data() {
    return {
      list_nr:[],
    }
  },
  created(){
    // console.log(JSON.parse(localStorage.getItem('list_data')))
    this.get_all_data()
  },
  mounted() {

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
        console.log(url)
        this.axios.post(url,qs.stringify(param),)
        .then((res) => {

          var list_data = res.data.data.pageElementList.pic_2.detail;
          this.list_nr = Object.assign([],list_data);
          console.log(this.list_nr);

        }).catch((error) => {
          console.warn(error)
        })
    },
  }

}
</script>

<style lang="css" scoped>

.gereninfo ul li{width: 33.3%;float: left;padding: 0.1rem;}
</style>

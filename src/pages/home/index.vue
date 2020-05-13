<template>
<div>
    <div class="m_container-fluid">

    <m-header></m-header>

      这里是首页


        <!-- <img :src="listdetail[0].img_url"> -->
        <!-- <div class="pic_img">
            <ul>
              <li v-for="item in listdetail">
                  <h2>{{item.img_jump_url}}</h2>
                <img :src="item.img_url">
              </li>
            </ul>
        </div> -->




    </div>
</div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      // list:[],
      // listdetail:[],
      // pic_9_list:[],
    }
  },

  created(){
      this.get_all_data()
  },
  mounted() {

  },
  watch: {

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
        //将数据对象转换成字符串
         // localStorage.setItem("list_data",JSON.stringify(res.data.data.pageElementList))
          var list_data = res.data.data.pageElementList;
         // this.listdetail =   JSON.parse(a.pic_2.detail);
         // this.pic_9_list =  JSON.parse(a.pic_9.detail);
          console.log(list_data);
        }).catch((error) => {
          console.warn(error)
        })
    },
  }

}
</script>

<style>


</style>

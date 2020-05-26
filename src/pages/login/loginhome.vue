<template lang="html">
  <div class="container-fluid" style="background:rgba(248,248,248,1);min-height:100vh;">
      <div class="container gongh_form">
          <div class="x_qy_gl">
            <p>向企业管理员索要邀请链接，更快速加入</p>
          </div>
          <van-form @submit="onSubmit">
            <van-field
              v-model="company"
              name="公司"
              label="公司"
              placeholder="请输入公司名称"
              disabled

            />
            <van-field
              v-model="codenumber"
              name="工号"
              :class="{active:iscodeShow}"
              label="工号"
              placeholder="请输入工号"
              @change="shurucode()"
                autocomplete="off"
            />

              <van-field
                v-model="username"
                :class="{actives:isnameShow}"
                name="姓名"
                label="姓名"
                placeholder="请输入真实姓名"
                autocomplete="off"
                v-on:focus="shuru()"
                ref="input2"

              />
              <div class="code_ghao" v-model="namevalue">
                <ul>
                  <li @click="addvalue(index)" v-for="(item,index) in namelist" :key="index" :value="item.name" v-text="item.name"></li>
                 </ul>
              </div>

              <!-- @change="shuruname()" -->

              <div  class="gonghao_tj" @click="comenum_tijiao()">
                <van-button round block type="info" native-type="submit">
                  确定
                </van-button>
              </div>
            </van-form>
          <div class="zhengce_chek">
            <van-checkbox v-model="checked" shape="square">我已阅读并接受《用户协议》和《隐私政策》</van-checkbox>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

      searchVal: "",
      company: '',
      codenumber: '',
      username:'',
      company_id:'',
      checked: false,
      iscodeShow:false,
      isnameShow:false,
      namelist:[],
      namevalue:true,

    };
  },
  mounted() {
    // let params = this.$route.params;
    // let company_id = params.company_id;
  },
  computed:{

  },
  created(){
      this.get_Company_data();
      // this.get_user_shenfen();
  },
  watch:{
     username:function(){
        this.shuru();
     },
   },
  methods: {
    addvalue(index){
      // this.current=index
      // this.username=this.namelist[index].value
      // this.$refs.input2.value=this.namelist[index].name;
      this.username=this.namelist[index].name;
      this.namevalue==false;

    },
    shuru(){
      console.log(111111);
      var $this=this;
      var params={
        company_id:this.$route.query.company_id,
        query:this.username,
        page:1,
        page_size:5
      }
      var qs = require('qs');
      var parm = JSON.stringify(params);
      let url = this.api.userApi.hedui_shenfen
      this.axios.post(url+'/'+params.company_id+'/'+params.query+'/'+params.page+'/'+params.page_size,)
      .then((res) => {
        console.log(res.data.data.company_user_list)
        this.namelist =  res.data.data.company_user_list;


      }).catch((error) => {
        console.warn(error)
      })
    },

    shurucode(){
      if (this.codenumber == '' || this.codenumber == undefined || this.codenumber == null){
    //alert("请输入姓名");
        this.iscodeShow=true
        this.$toast("工号输入错误，请重新输入");
      }else {
        this.iscodeShow=false
      }
    },
    shuruname(){
      if (this.username == '' || this.username == undefined || this.username == null){
    //alert("请输入姓名");
        this.isnameShow=true
        this.$toast("姓名输入错误，请重新输入");
      }else {
        this.isnameShow=false
      }
    },
    onSubmit(values) {
      console.log('submit', values);
    },
    get_Company_data(){
      var  Params={
        company_id:this.$route.query.company_id,
      }
     // console.log(Params.company_id);
      var qs = require('qs');
      let url = this.api.userApi.get_Company
      this.axios.post(url,qs.stringify(Params),)
        .then((res) => {
          // console.log(res);
          if (res.data.code==200) {
            this.company=res.data.data.company.company_name;
          }
          else{
            this.$toast(res.data.msg);
          }
        }).catch((error) => {

      })
    },

    comenum_tijiao(){
      let url = this.api.userApi.get_checkou_Company
      var  Params={
        company_id:this.$route.query.company_id,
        worker_id:this.codenumber,
        name:this.username,
      }
      var qs = require('qs');
      this.axios.post(url,qs.stringify(Params),).then((res) => {
        console.log(res.data.data.companyuser);
        this.company_id = res.data.data.companyuser.company_id;
        this.name = res.data.data.companyuser.name;
        this.worker_id = res.data.data.companyuser.worker_id;
        this.mobile = res.data.data.companyuser.mobile;
        localStorage.setItem("company_id", this.$route.query.company_id);
        console.log(this.company_id);
        console.log(this.name);
        console.log(this.worker_id);
        console.log(this.mobile);
        console.log(res);


       if(this.checked==false ){
          this.$toast("请勾选协议并认真阅读协议!");
        }else if(this.checked==true&&this.checked==true ){
            this.$toast("登录成功！");
            setTimeout(()=>{
              this.$router.push({
                path:'/logincode',
                name:'logincode',
                params:{
                  companyuser_id:res.data.data.companyuser.id,
                  mobile:res.data.data.companyuser.mobile,
                }
              })
            },1500)

          }
          else{
            this.$toast("请正确填写工号和姓名!");
          }
      })


    }


  },
};

</script>

<style lang="css" scoped>
</style>

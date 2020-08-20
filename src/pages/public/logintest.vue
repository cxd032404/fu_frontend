<template>
  <div >
    <div class="login">
            15:26
           <h2>登录测试111</h2>
        <div class="tylabel">
            <div class="ty_lt">
                名称选择:
            </div>
            <div class="ty_rt">
              <select  @change="changCompany($event)" >
                <option value="0">不选择</option>
                <option v-for="(item,index) in qy_list"  :key="index" :value="item.company_id" >
                  {{item.company_name}}
                </option>
              </select>
            </div>

        </div>
        <div class="tylabel">
            <div class="ty_lt">
                公司名称:
            </div>
            <div class="ty_rt">
              <input v-model="company_name"  type="text"  placeholder="请输入公司名字">
            </div>
        </div>
        <div class="tylabel">
            <div class="ty_lt">
                APPid:
            </div>
            <div class="ty_rt">
              <input  v-model="appid"  type="text"   placeholder="请输入APPID">
            </div>
        </div>
        <div class="tylabel">
            <div class="ty_lt">
                手机号:
            </div>
            <div class="ty_rt">
              <input v-model="moblie"  type="text"  placeholder="请输入手机号">
            </div>
        </div>
        <div class="tylabel">
            <div class="ty_lt">
                验证码:
            </div>
            <div class="ty_rt">
              <input v-model="yzm"  type="text"   placeholder="请输入验证码">
            </div>
        </div>
        <div class="tylabel">
              <input @click="login()" type="submit"  value="登录">
        </div>
    </div>

    <h2>返回信息</h2>
    <div class="">
      CODE11111111111:{{this.code}}
    </div>
    <div class="">
      {{this.success}}
    </div>



  </div>
</template>

<script>
  export default {
    data() {
      return {
          qy_list:[],
          company_name:'',
          company_id:'0',
          appid:'',
          moblie:'',
          yzm:'',
          //公司名称
          companyListname:'',

          success:'',
          error:'',
          code:window.localStorage.getItem("code"),
      }
    },
    created() {
      this.get_qy_info()

    },
    methods:{
      //获取企业信息
      get_qy_info(){
        var $this=this;
        var qs = require('qs');
        let url = this.api.userApi.getqyinfo
        this.axios.post(url,).then((res) => {
          console.log(res.data.data)
          this.qy_list=res.data.data;
          // this.namevalue=true
          // for (var i = 0; i < res.data.data.length;i++){
          //   this.companyListname.push(res.data.data[i].company_name)
          // }


        }).catch((error) => {
          console.warn(error)
        })
      },
      //城市选择插件
      changCompany(event){
        // console.log(event);
        console.log(event.target.value);
        this.company_id=event.target.value;
      },
      //登录
      login(){

        //
        localStorage.setItem("appid",this.appid);
        //

        var $this=this;
        var  Params={
          // code:this.th_code,
          company_id:this.company_id,
          company_name:this.company_name,
          appid:this.appid,
          mobile:this.moblie,
          logincode:this.yzm,
          code:this.code,
          // companyuser_id:localStorage.getItem("companyuser_id"),
        }
        console.log(Params);
        var qs = require('qs');
        let url = this.api.userApi.getloginNew
        this.axios.post(url,qs.stringify(Params),{headers:{'app_id': window.localStorage.getItem("appid")}})
          .then((res) => {
            console.log(res.data);
            this.success=res.data;

        }).catch((error) => {
            // this.$toast(res.data.msg);
          console.warn(error.data.msg)
        })
      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tylabel{width: 100%;height: auto;overflow: hidden;margin-bottom: 20px;}
  .tylabel input{height: 42px;line-height: 42px;width: 100%;font-size: 20px;display: inline-block;}
  .tylabel select{height: 42px;line-height: 42px;width: 100%;font-size: 20px;display: inline-block;}
  .ty_lt{float: left;width: 30%;text-align: right;line-height:47px;}
  .ty_rt{float: right;width: 65%;text-align: left;}
  .login>h2{font-size: 0.4rem;text-align: center;margin: 20px auto;}

</style>

<template>
    <div class="container-fluid jingpin_bg">

        <div class="pb_tag_top">
          <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
            员工登录
        </div>
          <div class="pb_top_zhanwei"></div>

           <!-- <div class="container">
             测试CODE:{{this.th_code}}
           </div> -->

          <div class="container hjaddlogin">
              <h1>短信验证码登录</h1>
              <p>没有关联企业？<span @click="shanyibu()">立即绑定</span></p>
          </div>

          <!-- {{this.nickname}}
          <img :src="this.userimg" alt=""> -->

        <div class="content_login">
          <div class="content ">
              <van-field v-model="mobile"    placeholder="请输入11位手机号"    clearable  oninput="if(value.length>11)value=value.slice(0,11)" />
              <van-field   v-model="yzm" center  placeholder="请输入6位验证码" oninput="if(value.length>6)value=value.slice(0,6)" >
               <van-button :disabled="flag" slot="button" size="small" type="primary" @click="sendCode">{{ buttonmsg }}</van-button>
               </van-field>

               <van-button  v-if="this.mobile == '' ||  this.yzm == '' "   type="primary" :loading="loading" loading-text="登录..." size="large" :disabled="zhud" >登录</van-button>
               <van-button v-else class="loginactive" type="primary" :loading="loading" loading-text="登录..." size="large" :disabled="zhud" @click="login">登录</van-button>

          </div>
        </div>

    </div>
</template>
<script>

import axios from 'axios'

export default {
    data () {
        return {
            // tel:'',
            // password:'',
            mobile:'',
            yzm:'',
            adminCode:'',
            token: '',
            buttonmsg:'获取验证码',
            flag:false,
            zhud:false,
            loading:false,
            companyuser_id:'',
            code:'',
            th_code: localStorage.getItem("code"),

            nickname:localStorage.getItem("nickname"),
            user_img:localStorage.getItem("userimg"),



        }
    },
    watch: {
				mobile: function(val){
					this.mobile = val.replace(/\D/g, '')
        },
        yzm: function(val){
					this.yzm = val.replace(/\D/g, '')
        }
			},

    computed: {
    },
    created(){
        // this.reallR()
        this.cleartoken();

    },
    mounted() {
      // var code = this.$route.query.code;
      // localStorage.setItem("code",code);
      this.th_code = localStorage.getItem("code")

      this.get_token();

    },


    activated() {
      this.buttonmsg='获取验证码'
      // this.yzm="1"
     },
     deactivated(){
         // alert(1);
         this.buttonmsg='获取验证码'
         // this.yzm="1"
     },
     destroyed() {
       // clear.sendCode();
       window.removeEventListener('resize', this.sendCode)
     },
    methods: {

      get_token(){
        let url = this.api.userApi.getusertoken
        var qs = require('qs');
        this.axios.post(url+'?'+'code='+this.th_code,).then((res) => {
            if(res.data.code==200){
               console.log(res.data.data);
               localStorage.setItem("usertoken", res.data.data.user_token);
               localStorage.setItem("nickname", res.data.data.user_info.nick_name);
               localStorage.setItem("userimg", res.data.data.user_info.user_img);
               console.log(res.data.data.user_info.nick_name)
            }else{
                // this.$toast(res.data.msg);
            }
        })
      },

      shanyibu(){
        this.$router.replace('/loginhome');
      },

      // getluyoucsnhu(){
      //   var  Params={
      //     company_id:this.$route.params.company_id,
      //     name:this.$route.params.name,
      //     worker_id:this.$route.params.worker_id,
      //   }
      //   console.log(11111);
      //   console.log(Params);
      //   console.log(11111);
      //   return
      // },
        // toLogin () {
        //    this.$router.push({
        //        name:'index'
        //      })
        // },

        // api.staffhome.cn/user/wechatCodeLogin?code=0015dDqB1u44ya0bQWsB1qdDqB15dDqs

      // 清楚token
      cleartoken(){
        // localStorage.removeItem('token');
      },
      sendCode () {
            let time = 60
            let timer
            timer = setInterval(()=>{
                time --
                if(time === 0){
                    clearInterval(timer)
                    this.flag=false
                    this.buttonmsg = '获取验证码'
                    return
                }
                this.flag = true
                this.buttonmsg = time + 's'
            },1000)
            this.getCode()
        },
        getCode () {
              let url = this.api.userApi.getsendCode
              var  Params={
                mobile:this.mobile,
              }
              var qs = require('qs');
              this.axios.post(url,qs.stringify(Params),).then((res) => {
                 console.log(res);
                  if(res.data.code==400){
                      this.$toast(res.data.msg);
                  }else{
                      return
                      // this.adminCode = res.data.code
                      // console.log(this.adminCode)
                  }
              })
        },
        login () {
            if (this.mobile === '') {
                this.$toast('请输入手机号！')
                return
            }
            else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
                this.$toast('手机号码格式错误!')
            }
            else if ( this.yzm === ''){
              this.$toast('请输入验证码')
              return
            }
            else if (this.yzm.length !== 6){
                this.$toast('验证码不能低于6位数')
            }
            this.reallR()
        },

        reallR(){
          this.zhud=false
          this.loading=false
          var $this=this;
          // localStorage.setItem("companyuser_id", this.$route.params.companyuser_id);
          if(this.th_code==undefined){
              this.th_code=""
           }
          var  Params={
            code:this.th_code,
            mobile:this.mobile,
            logincode:this.yzm,
            // companyuser_id:this.$route.params.companyuser_id,
            companyuser_id:localStorage.getItem("companyuser_id"),
          }

          console.log(Params);
          var qs = require('qs');
          let url = this.api.userApi.getLogin
          this.axios.post(url,qs.stringify(Params),)
            .then((res) => {
              console.log(res.data);
              if (res.data.code==200) {
                this.zhud=false
                this.loading=false
                localStorage.setItem("token", res.data.data.user_token);
                localStorage.setItem("company_id", res.data.data.user_info.company_id);

                this.$toast("登录成功!");
                localStorage.setItem("companyuser_id",'');
                setTimeout(()=>{
                this.$router.replace('/');
                },1500)
              }
              else if(res.data.code==400){
                  this.$toast(res.data.msg);
              }
              else{

              }

          }).catch((error) => {
              // this.$toast(res.data.msg);
            console.warn(error.data.msg)
          })
        },


    }
}
</script>

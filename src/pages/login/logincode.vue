<template>
    <div class="container-fluid">

        <div class="pb_tag_top">
          <span><a href="javascript:history.go(-1)" class="back"><img src="@/assets/images/arrow-lift.png"></a></span>
            会员登录
        </div>

        <div class="content_login">
          <div class="content ">
              <van-field v-model="mobile"   placeholder="请输入11位手机号"    clearable />
              <van-field   v-model="yzm" center clearable placeholder="请输入6位验证码" >
               <van-button :disabled="flag" slot="button" size="small" type="primary" @click="sendCode">{{ buttonmsg }}</van-button>
               </van-field>
               <van-button type="primary" :loading="loading" loading-text="登录..." size="large" :disabled="zhud" @click="login">登录</van-button>
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

        }
    },
    computed: {
    },
    created(){
        this.reallR()

    },
    methods: {
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
        sendCode () {
            let time = 60
            let timer
            timer = setInterval(()=>{
                time --
                if(time === 0){
                    clearInterval(timer)
                    this.flag=false
                    this.buttonmsg = '点击发送验证码'
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
                  if(res.success == false){
                      this.$toast('验证码错误，请填写验证码!')
                  }else{
                      // this.$toast('验证码输入完成')
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
          var  Params={
            mobile:this.mobile,
            code:this.yzm,
            companyuser_id:this.$route.params.companyuser_id,
          }
          var qs = require('qs');
          let url = this.api.userApi.getLogin
          this.axios.post(url,qs.stringify(Params),)
            .then((res) => {
              console.log(res.data);
              if (res.data.code==200) {
                this.zhud=false
                this.loading=false
                localStorage.setItem("token", res.data.data.user_token);
                this.$toast("登录成功!");

                setTimeout(()=>{
                this.$router.replace('/');
                },1500)

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

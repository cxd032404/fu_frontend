<template>
    <div class="container">
        <header class="header">注册头部</header>
         <div class="content">
             <van-field
                 v-model="tel"
                 placeholder="请输入手机号"
                 :error-message="usertel"

                  clearable
             />
             <van-field
                 v-model="password"
                 type="password"
                 placeholder="请输入密码"
                 :error-message="pass"

                 clearable
             />
             <van-field
                 v-model="sms"
                 center
                 clearable
                 placeholder="请输入短信验证码"
                 :error-message="test"
              >
             <van-button :disabled="flag" slot="button" size="small" type="primary" @click="sendCode">{{ buttonmsg }}</van-button>

             </van-field>
              <van-button type="primary" :loading="loading" loading-text="注册..." size="large" :disabled="zhud" @click="register">注册</van-button>
              <van-divider @click="toLogin">去登录</van-divider>
         </div>
    </div>
</template>
<script>

import axios from 'axios'


export default {
    data () {
        return {
            tel:'',
            password:'',
            sms:'',
            company_user_id:'',
            adminCode:'',
            buttonmsg:'点击发送验证码',
            flag:false,
            zhud:false,
            loading:false
        }
    },
    computed: {
        usertel () {
            if (this.tel === ""){
                return ''
            }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)){
                return '手机号格式错误'
            }else {
                return ''
            }
        },
        pass () {
            if (this.password === ""){
                return ''
            }else if(this.password.length<6){
                return '密码不可小于6位'
            }else {
                return ''
            }
        },
        test () {
            if (this.sms === ""){
                return ''
            }else if(this.sms.length !== 6){
                return '验证码格式错误'
            }else {
                return ''
            }
        }
    },
    methods: {
        toLogin () {
           this.$router.push({
               name:'login'
             })
        },
        sendCode () {
            let time = 20
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
                this.buttonmsg = time + '秒后重新发送'
            },1000)
            this.getCode()
        },
        getCode () {
            if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel) || this.tel===""){
                this.$toast('手机号码输入有误')
            }else{
                axios.get('/user/mobileRegister'+this.tel).then(res=>{
                  console.log(res);
                    // if(res.data.code === 5){
                    //     this.$toast('用户名已注册，请更改')
                    // }else if(res.data === 3){
                    //     this.$toast('验证码错误，请填写正确的验证码')
                    // }else{
                    //     this.adminCode = res.data.code
                    //     console.log(this.adminCode)
                    // }
                })
            }
        },
        register () {
            if (this.tel === '' || this.usertel === '手机号码格式错误') {
                this.$toast('手机号码输入有误')
                return
            }
            if (this.password === '' || this.pass === '密码格式错误，最少为6位') {
                this.$toast('密码输入有误')
                return
            }
            // if (this.sms === '' || this.sms !== this.adminCode) {
            //     this.$toast('验证码输入有误')
            //     return
            // }
            this.reallR()
        },
        reallR () {
          var $this=this;
          this.zhud=true
          this.loading=true

          let param = {
            mobile: this.tel,
            code: this.sms,
            password:this.password,
            company_user_id:this.company_user_id,
          }
          let url = "/login/user/mobileRegister"
          this.axios.post(url,param).then((res) => {
           console.log(res);
            this.zhud=false
            this.loading=false


             if (res.data.code ===1) {
                this.$toast('手机号错误，请填写正确的手机号码')
            } else {
            this.$toast('注册成功')
            }
        })
        }
    }
}
</script>

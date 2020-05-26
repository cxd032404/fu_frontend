<template>
    <div class="container">
        <header class="header">登录头部</header>
         <div class="content">
             <van-field v-model="mobile"   placeholder="请输入手机号"   :error-message="usertel"  clearable />
             <van-field v-model="password" type="password" placeholder="请输入密码" :error-message="pass"   clearable     />
              <van-button type="primary" :loading="loading" loading-text="登录..." size="large" :disabled="zhud" @click="login">登录</van-button>
              <van-divider @click="toRegister">去注册</van-divider>
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
            password:'',
            zhud:false,
            loading:false,

        }
    },
    computed: {
        usertel () {
            if (this.mobile === ""){
                return ''
            }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile)){
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
        }
    },

    created(){
        this.reallR()
    },
    methods: {
        toRegister () {
            this.$router.replace('/register')
        },
        login () {
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

            this.zhud=true
            this.loading=true
            var $this=this;
            var param={
              mobile:this.mobile,
              password:this.password,
            }
            // let url = this.api.userApi.getMologin
            let url = "/login/user/getTest"
            // let url = this.api.userApi.getMologin
            this.axios.post(url,param).then((res) => {

              console.log(res);

            this.zhud=false
            this.loading=false
            if(res.status ===200){

              this.$toast('登录成功')
              localStorage.setItem('isLogin','ok') //登录标识
              // this.$router.back()  //登陆成功返回上一页
              // this.$router.replace('/index')
            }
            else {
                  this.$toast('账号密码错误')
            }
            // if (res.success === 2) {
            //     this.$toast('用户未注册')
            // } else if(res.data === -1){
            //     this.$toast('密码错误')
            // }else if (res.data === 0) {
            //     this.$toast('登录失败')
            // } else {
            // this.$toast('登录成功')
            // localStorage.setItem('isLogin','ok') //登录标识
            // this.$router.back()  //登陆成功返回上一页
            // }
        })
        }
    }
}
</script>

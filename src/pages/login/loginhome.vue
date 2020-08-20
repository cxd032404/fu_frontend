<template lang="html">
  <div class="container-fluid" style="background:rgba(248,248,248,1);min-height:100vh;">
    <div class="yuang_ttto">
        <p>文体之窗</p>
    </div>
      <div class="container gongh_form">
          <div class="x_qy_gl">
            <!-- <p>向企业管理员索要邀请链接，更快速加入</p> -->
          </div>
          <van-form @submit="onSubmit">
            <van-field v-if="this.$route.query.company_id" class="aaa"
              v-model="company "
              name="公司"
              label="公司"
              placeholder="请输入公司名称"
              disabled
            />
            <van-field v-else class="bbb"
              v-model="company"
              name="公司"
              label="公司"
              placeholder="请输入公司名称"
              disabled
              @click="getqynameshow()"
            />
            <!-- 输入监听搜索 -->
               <div class="code_ghao"  v-show="namevalue">
                 <ul>
                   <li @click="addqyname(index)" v-for="(item,index) in qy_list" :key="index" :id="item.company_id" :value="item.company_name" v-text="item.company_name"></li>
                  </ul>
               </div>
            <!-- <van-field
              v-model="codenumber"
              name="工号"
              :class="{active:iscodeShow}"
              label="工号"
              placeholder="请输入工号"
              @change="shurucode()"
                autocomplete="off"
            /> -->
            <!-- <van-field
              v-model="username"
              :class="{actives:isnameShow}"
              name="姓名"
              label="姓名"
              placeholder="请输入真实姓名"
              autocomplete="off"
              v-on:focus="shuru()"
              ref="input2"
            />
             -->
            <van-field  v-model="codenumber"  name="工号"  label="工号"  placeholder="请输入工号"  @change="shurucode()"  autocomplete="off"    />

            <van-field    v-model="username"  name="姓名"  label="姓名"  placeholder="请输入真实姓名"    autocomplete="off"  :formatter="formatter"  />
              <!-- v-on:focus="shuru()" -->
              <!-- <div class="code_ghao" :class="{actives:activeopi}" v-show="namevalue">
                <ul>
                  <li @click="addvalue(index)" v-for="(item,index) in namelist" :key="index" :value="item.name" v-text="item.name"></li>
                 </ul>
              </div> -->
              <!-- @change="shuruname()" -->

              <div v-if="this.username == '' ||  this.codenumber == '' "  class="gonghao_tj "   >
                <van-button round block type="info" native-type="submit">
                  提交
                </van-button>
              </div>
              <div v-else  class="gonghao_tj activeopi"   @click="comenum_tijiao()">
                <van-button round block type="info" native-type="submit" >
                  下一步
                </van-button>
              </div>



            </van-form>
          <div class="zhengce_chek">
            <van-checkbox v-model="checked" shape="square">我已阅读并接受<i @click="xieyi">《隐私政策》</i>和<i @click="user_mi">《用户协议》</i></van-checkbox>
          </div>
      </div>

      <!-- //用户协议隐私政策 -->
      <div class="user_pop">
        <transition name="fade_xy">
          <div class="wt_yinsi" v-if="show_xieyi">
              <div class="wt_yinsinr">
                  <div class="wt_tit">
                    <h1>隐私权保护政策</h1>
                    <p>生效日期：2020年5月16日</p>
                  </div>
                  <div class="wt_ys_nr" v-html="this.zhengce">
                  </div>
                  <div class="wt_ys_btn">
                      <div class="wt_ys_btn_a fl" @click="guanbys()">
                        不同意
                      </div>
                      <div class="wt_ys_btn_a fr" @click="guanbys()">
                        同意
                      </div>
                  </div>
              </div>
          </div>
         </transition>
      </div>
      <div class="user_pop">
        <transition name="fade_xy">
          <div class="wt_yinsi" v-if="show_user">
              <div class="wt_yinsinr">
                  <div class="wt_tit">
                    <h1>用户协议</h1>
                    <p>生效日期：2020年5月16日</p>
                  </div>
                  <div class="wt_ys_nr" v-html="this.user">
                  </div>
                  <div class="wt_ys_btn">
                      <div class="wt_ys_btn_a fl" @click="guanbys()">
                        不同意
                      </div>
                      <div class="wt_ys_btn_a fr" @click="guanbys()">
                        同意
                      </div>
                  </div>
              </div>
          </div>
           </transition>
      </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      bianse:0,
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
      qy_list:[],
      zhengce:[],
      user:[],
      show_xieyi:false,
      show_user:false,
      //
      isactiveopi:false,
      namevalue:false,

    };
  },
  mounted() {
    // let params = this.$route.params;
    // let company_id = params.company_id;
    this.get_Company_data();
    this.get_qy_info();
  },
  computed:{

  },
  created(){

      // this.get_user_shenfen();
  },
  watch:{

     // username:function(){
     //    this.shuru();
     // },
     codenumber:function(){
        this.gonghaoshuru();
     },

   },
  methods: {

    //过滤显示数字
    formatter(value) {
      // 过滤输入的数字
      return value.replace(/\d/g, '');
    },
    getqynameshow(){
      this.namevalue=true;
    },
    //用户协议隐私政策弹窗
   user_mi() {
     this.show_user = true;
   },
    xieyi() {
     this.show_xieyi = true;
   },
   guanbys(){
     this.show_user = false;
     this.show_xieyi = false;
   },
    //模糊搜索点击替换input
    addvalue(index){
      this.username=this.namelist[index].name;
      this.namevalue=false;
    },

    addqyname(index){
      this.company=this.qy_list[index].company_name;
      console.log(this.company.name);
      // this.company.name=this.qy_list[index].company_id;
      this.namevalue=false;
    },
    //判断工号不能为中文
    gonghaoshuru(){
      this.codenumber=this.codenumber.replace(/[\u4e00-\u9fa5]/ig,'')

    },
    // shuru(){
    //   console.log(111111);
    //   var $this=this;
    //   var params={
    //     company_id:this.$route.query.company_id,
    //     query:this.username,
    //     page:1,
    //     page_size:5
    //   }
    //   var qs = require('qs');
    //   var parm = JSON.stringify(params);
    //   let url = this.api.userApi.hedui_shenfen
    //   this.axios.post(url+'/'+params.company_id+'/'+params.query+'/'+params.page+'/'+params.page_size,)
    //   .then((res) => {
    //     console.log(res.data.data.company_user_list)
    //     this.namelist =  res.data.data.company_user_list;
    //   }).catch((error) => {
    //     console.warn(error)
    //   })
    // },


    //获取企业信息
    get_qy_info(){
      var $this=this;



      var params={
        query:this.username,
        page:1,
        page_size:5
      }


      var qs = require('qs');
      var parm = JSON.stringify(params);
      let url = this.api.userApi.getqyinfo
      this.axios.post(url+'/'+params.company_id+'/'+params.query+'/'+params.page+'/'+params.page_size,)
      .then((res) => {
        console.log(res.data.data)
        this.qy_list=res.data.data;
        // this.namevalue=true

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


        // 判断企业全输入然后验证码不显示
        if(this.$route.query.company_id){
          this.company_id=this.$route.query.company_id
        }
        else{
          this.company_id=1
        }
      var  Params={
        company_id:this.company_id,
        privacy:"1",
        user:"1",
      }

      console.log(Params)

     // console.log(Params.company_id);
      var qs = require('qs');
      let url = this.api.userApi.get_Company
      this.axios.post(url,qs.stringify(Params),)
        .then((res) => {

          console.log(res.data);
          // console.log(res.data.data);

          if (res.data.code==200) {
            this.company=res.data.data.company_name;
            //隐私政策
            this.zhengce=res.data.data.protocal.privacy.content;
            //用户协议
            this.user=res.data.data.protocal.user.content;
          }
          else{
            this.$toast(res.data.msg);
          }
        }).catch((error) => {

      })




    },



    //获取用户tokenid


    comenum_tijiao(){


      //判断如果有来源邀请链接就直接给当前内容不然则循环数组去一一匹配

      if(this.$route.query.company_id){
        this.companyid=this.$route.query.company_id;
      }
      else {
        for(var i=0;i<this.qy_list.length;i++){
          // console.log(this.qy_list[i].company_name);
          if(this.qy_list[i].company_name==this.company){
            this.companyid=this.qy_list[i].company_id
            // console.log(this.companyid);
          }
        }
        // this.companyid=this.company;
      }

      let url = this.api.userApi.get_checkou_Company


      var  Params={
        company_id:this.companyid,
        worker_id:this.codenumber,
        name:this.username,
      }


      console.log(Params);

      var qs = require('qs');
      this.axios.post(url,qs.stringify(Params),).then((res) => {

          if(res.data.code==200){


            if(this.checked==false){
              this.$toast("请您阅读并同意接受用户协议和隐私政策!");
            }
            else{

              console.log(res.data.data.companyuser);
              this.company_id = res.data.data.companyuser.company_id;
              this.name = res.data.data.companyuser.name;
              this.worker_id = res.data.data.companyuser.worker_id;
              this.mobile = res.data.data.companyuser.mobile;

              // if(this.$route.query.company_id){
              //     localStorage.setItem("company_id", this.$route.query.company_id);
              // }
              // else{
              //   localStorage.setItem("company_id", this.companyid);
              // }

              localStorage.setItem("user_name",this.username);
              localStorage.setItem("companyuser_id", res.data.data.companyuser.id);
              console.log(this.company_id);
              console.log(this.name);
              console.log(this.worker_id);
              console.log(this.mobile);
              console.log(res);


              this.$toast("提交成功！");

                setTimeout(()=>{
                  this.$router.push({
                    path:'/logincode',
                    name:'logincode',
                    params:{
                      // companyuser_id:res.data.data.companyuser.id,
                      mobile:res.data.data.companyuser.mobile,
                    }
                  })
                },1500)




            }

          }
          else{

            if( this.username == "" && this.codenumber == ""){
              this.$toast("姓名和工号不能为空!");
            }
            else if(this.username == ""){
              this.$toast("姓名不能为空!");
            }
            else if(this.codenumber == ""){
              this.$toast("工号不能为空！！");
            }
            else if(this.checked==false){
              this.$toast("请勾选协议并认真阅读协议!");
            }
            else{
              this.$toast(res.data.msg);
            }



          }
      })


    }


  },
};

</script>

<style lang="css" scoped>
</style>

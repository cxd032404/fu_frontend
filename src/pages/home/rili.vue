<template lang="html">
    <div class="">


      <!-- <van-calendar
        title="日历"
        :poppable="false"
        :show-confirm="false"
        :style="{ height: '500px' }"
        /> -->


        <div class="yuefen">
          <ul>
            <li v-bind:class='{yueActive:index==yuefenTrue}' v-for="(item,index) in yuefen"  :key="index" @click="yuefenCon(index);">
              {{item.name}}
            </li>
          </ul>
        </div>


        <div class="actjis">
          <ul>
            <li v-for="(item,index) in act_list"  :key="index">
              <h1>{{item.activity_name}}</h1>
            </li>
          </ul>
        </div>

        <div class="day">
          <ul>
            <li  v-for="(item,index) in dayslist" :key="index" >
              <div class="pos_rl_a" >{{item}}</div>

              <div class="pos_rl_b" v-for="item2 in arrlist"  v-bind:class='{dayactive:index==item2.date-1}'   @click="posClick(item2.date)" >
                {{item2.date}}
              </div>

            </li>
          </ul>
        </div>



    </div>
</template>

<script>
export default {
  data(){
    return{
      yuefen:[
        {name:'January',id:'1'},
        {name:'February',id:'2'},
        {name:'March',id:'3'},
        {name:'April',id:'4'},
        {name:'May',id:'5'},
        {name:'June',id:'6'},
        {name:'July',id:'7'},
        {name:'August',id:'8'},
        {name:'September',id:'9'},
        {name:'October',id:'10'},
        {name:'November',id:'11'},
        {name:'December',id:'12'},
      ],
      days:[],
      daylth:"1",
      //日期绑定当前天数
      ClassTrue:'-1',
      yuefenTrue:'',
      onmouths:'',
      ondays:'',
      allmh:[],
      dayslist:[],
      //ceshi
      alldaylist:[],
      arrlist:[],
      dayDate:[],
      dayDateS:[],
      act_list:[],
      UserMonthlyActivities:["UserMonthlyActivities"],
      params:{
        month:'',
        company:localStorage.getItem("company_id"),
        page_sign:"clubIndex",
        element_sign_list:[],
      }

    }
  },
  mounted(){
    this.getMouth();
    this.getRlDate();

  },
  methods: {
    //获取当前月份天数

      getMouth(){
        for(var m=1;m<=this.yuefen.length;m++){
            var datas=new Date(2020,m,0).getDate()
            this.allmh=this.allmh.concat(datas);
        }
        //获取每个月天数
        // console.log(this.allmh);
        // var newCa=[]
        for(var n=0;n<this.allmh.length;n++){
           var dayca=[]
            for (var m = 1;m <=this.allmh[n]; m++) {
              dayca.push(m)
            }
            var param={
              allDay:this.allmh[n],
              Mouth:this.yuefen[n],
              arr:dayca
            }
            // console.log(param);
            this.alldaylist.push(param)
        }
          // this.alldaylist=this.alldaylist.concat(this.alldaylist);
          console.log(this.alldaylist)

          //选中当前月份和天数
          var nowData=new Date().getMonth()
          this.yuefenTrue=nowData;
          this.dayslist=this.alldaylist[nowData].arr;
      },
      //点击月份切换当前天数
      yuefenCon(index){
        this.dayslist=this.alldaylist[index].arr;
        this.yuefenTrue=index;
        // alert(index);
        this.params.month=index+1;
        this.params.element_sign_list=this.UserMonthlyActivities;
        this.getRlDate();
        //将活动信息的数据显示为空
        this.act_list=[];

      },
      //绑定当前天数的事件
      // 2020-1-15

     getRlDate(){
       var $this=this;
       var qs = require('qs');
       console.log(this.params);
       var parm = JSON.stringify(this.params);
       let url = this.api.userApi.get_zp
       this.axios.post(url+'/'+this.params.company+'/'+this.params.page_sign,qs.stringify({params:parm}),)
       .then((res) => {
         //顶部name
          this.dayDateS=res.data.data.pageElementList.UserMonthlyActivities.detail.user_monthly_activities.date_data;
          this.arrlist=res.data.data.pageElementList.UserMonthlyActivities.detail.user_monthly_activities.month_activities;
         console.log(res.data.data.pageElementList.UserMonthlyActivities.detail.user_monthly_activities);
         //  //
         //  this.ClassTrue=18;
          // this.ClassTrue=27;

       }).catch((error) => {
         console.warn(error)
       })
     },

     posClick(day){
        //循环
       // this.dayDate=[];
       // for(var i=0;i<this.arrlist.length;i++){
       //   // console.log(this.arrlist[i].activity_name);
       //   if(this.arrlist[i].date==day){
       //     this.dayDate=this.dayDate.concat(this.arrlist[i]);
       //   }
       // }
       // 直接拿下标
        this.act_list=this.dayDateS[day];
        console.log(this.dayDateS[day]);


     }

  }
}
</script>

<style lang="css" scoped>
</style>

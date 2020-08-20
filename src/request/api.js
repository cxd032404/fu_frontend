
const userApi = {
	getPeople: '/page/getPage/3/people',  //首页
	//获取企业信息
	getqyinfo: '/user/getCompanyList',
	//手机号验证码登录
  getLogin: '/user/mobileCodeLogin',
	//发送手机登录短信验证码
  getsendCode: '/user/sendLoginCode',
	//获取userkoen
	getusertoken: '/user/wechatCodeLogin',
	// get_activity_details: '/page/getPage/1/activity_details1',
	get_activity_details: '/page/getPage',
	 // this.axios.post(url+'/'+param.company+'/'+'activity_details'+'1',qs.stringify(param),
	//活动报名
	get_baoming: '/activity/activityApply',
	//提交上传
	get_tijiao: '/list/post',
	//删除操作
	get_del:'/list/source_remove',
	//获取所有getpage
	get_zp:'/page/getPage',
	//点赞
	get_dianzan:'/user/setKudosInc',
	//取消点赞
	get_qx:'/user/setKudosDec',
	//工号提交
	get_codenum:'/search/companyUser',
	//获取企业信息
  get_Company:'/user/getCompany',
	//确认用户身份
  get_checkou_Company:'user/checkoutCompany',
	//专家指导接口
	get_zhuan_jia:'/search/companyUser',
	//活动记录
	get_activityrecord:'/page/getPage/1/activity_log',
	//删除列表文件
	delete_huodong:'/user/setActivityPosts',
	 //核对用户身份
  hedui_shenfen:'/search/companyUser',
	//微信分享接口
	vx_jiekou:'http://ceshi.willie.ink/index/WechatConfig/getPackage',
	//内容点赞
	dianzan_detail:'/user/setKudosInc',
	//微信分享
	getJs:'/wechat/getSignPackage',
	//俱乐部活动发布
	activitySd:'/activity/activityCreate',
	///修改接口
  activityUpd:'/activity/activityUpdate',
	//俱乐部报名
	jlb_bm:'/activity/activityApply',
	//签到功能
	jlb_qd_map:'/activity/checkPositionForCheckin',
	//签到成功
	act_sucess:'/activity/activityCheckin',
	//俱乐部审核离开通过拒绝
	jlb_state:'/club/operateClub',
	//日历
	jlb_rli:'/activity/UserMonthlyActivities',
	//取消活动
	act_cancal:'/activity/activityCancel',
	//活动签到获取活动信息
	get_actinfo:'/activity/activityInfo',
	//获取用户信息
	get_userinfo:'/user/getUserInfo',

	//新的登录接口
	getloginNew:'/user/login',



}
export default {
	userApi
}

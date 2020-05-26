
const userApi = {
	getPeople: '/page/getPage/3/people',  //首页

	//手机号验证码登录
  getLogin: '/user/mobileCodeLogin',

	//发送手机登录短信验证码
  getsendCode: '/user/sendLoginCode',

	//首页接口
	getIndexData: '/page/getPage/1/index',

	//文体汇
	getculture: '/page/getPage/1/culture',

	//xiangqing
	get_activity_details: '/page/getPage/1/activity_details1',

	//活动报名
	get_baoming: '/user/activitySign',

	//提交上传
	get_tijiao: '/list/post',

	//删除操作
	get_del:'/list/source_remove',

	//获取
	get_zp:'/page/getPage',

	//点赞
	get_dianzan:'/user/setKudosInc',
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
		//精品课代码
		jinpin_class:'/page/getPage',
		//精品课详情代码
		jinpin_detail:'/page/getPage',
		//荣誉堂
		rongyu_list:'/page/getPage',
		//
		rongyu_detail:'/page/getPage/1/honor_details',
		//微信分享接口
		vx_jiekou:'http://ceshi.willie.ink/index/WechatConfig/getPackage',

}
export default {
	userApi
}

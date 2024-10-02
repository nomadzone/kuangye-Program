import { get, post, put, del } from './fetch.js';


const http = {
		userLogin: (data)=> post(`/weChat/login`, data),
		posts: (data)=> post(`/v1/posts`, data),
		upload: (data)=> post(`/oss/upload`, data),
		activityAdd: (data)=> post(`/activity/add`, data),
		activityDel: (data)=> get(`/activity/del`, data),
		getUserInfo: ()=> get(`/user/getUserInfo`),
		homeActivityMap: (data)=> get(`/activity/homeActivityMap`, data),
		homeActivity: (data)=> post(`/activity/homeActivity`, data),
		homeNoticeList: (data)=> get(`/notice/list`, data),
		selectWildTogether: (data)=> get(`/activity/selectWildTogether`, data),
		upUserDown: (data)=> get(`/up/userDown`, data),
		getIdentifyUrl:(data) => get('/auth/getAuthUrl', data),
		userUp:(data) => post('/up/userUp', data),
		userDown:(data) => post('/up/userDown', data),
		fansUpdate:(data) => post('/fans/update', data), // 关注和取消 人
		activityDown:(data) => get('/activity/down', data), // 本人下架活动
		activityDel:(data) => get('/activity/del', data), // 本人删除活动
		orderPay:(data) => get('/order/pay', data), // 用户报名成功 发起支付
		orderSuccess:(data) => get('/order/paySuccess', data), // 支付成功 前端感应
		orderCancellation:(data) => get('/order/cancellation', data), // 用户报名成功 发起支付
		orderWallet:(data) => get('/order/wallet', data), // 个人票夹
		activityRefund:(data) => get('/order/refund', data), // 个人取消活动
		userActivity:(data) => get('/userActivity/add', data), // 用户报名添加票夹
		balanceInfo: (data) => get('/balance/info', data), // 个人钱包
		getAddress: (data) => get('/activity/getAddress', data), // 个人钱包
		useActivity: (data) => post('/activity/useActivity', data), // 个人参加的活动
		selectUserInfoActivity: (data) => post('/activity/selectUserInfoActivity', data), // 个人发起的活动
		updateUserInfo: (data) => post('/user/update', data), // 修改个人信息
		userHomeLabel: (data) => get('/sysDictType/userHomeLabel', data), // 首页标签
		preferenceAdd: (data) => post('/preference/add', data), // 添加偏好
		fansFollow: (data) => get('/fans/follow', data), // 关注列表
		fansFans: (data) => get('/fans/fans', data), // 粉丝列表
		// user/getUserInfoOther
		getUserInfoOther: (data) => get('/user/getUserInfoOther', data), // 其他用户信息
	}


export default http
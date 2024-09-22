import { get, post, put, del } from './fetch.js'


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
		orderCancellation:(data) => get('/order/cancellation', data), // 用户报名成功 发起支付
		orderWallet:(data) => get('/order/wallet', data), // 个人票夹
		activityRefund:(data) => get('/order/refund', data), // 个人取消活动
		activityAdd:(data) => get('/userActivity/add', data), // 用户报名添加票夹
		balanceInfo: (data) => get('/balance/info', data), // 个人钱包
		
	}


export default http
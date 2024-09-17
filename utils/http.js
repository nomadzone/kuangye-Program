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
	fansUpdate: (data)=> get(`/fans/update`, data),
	upUserDown: (data)=> get(`/up/userDown`, data),
}


export default http
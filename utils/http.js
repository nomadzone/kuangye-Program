import { get, post, put, del } from './fetch.js'


const http = {
	userLogin: (data)=> post(`/weChat/login`, data),
	posts: (data)=> post(`/v1/posts`, data),
	upload: (data)=> post(`/oss/upload`, data),
	activityAdd: (data)=> post(`/activity/add`, data),
	getUserInfo: ()=> get(`/user/getUserInfo`),
}


export default http
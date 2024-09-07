import { get, post, put, del } from './fetch.js'


const http = {
	userLogin: (code)=> get(`/api/v1/user/login/${code}`),
	posts: (data)=> post(`/api/v1/posts`, data),
	upload: (data)=> post(`/api/oss/upload`, data),
	activityAdd: (data)=> post(`/api/activity/add`, data),
}


export default http
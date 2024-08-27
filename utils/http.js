import { get, post, put, del } from './fetch.js'


const http = {
	userLogin: (code)=> get(`/api/v1/user/login/${code}`),
	posts: (data)=> post(`/api/v1/posts`, data),
}


export default http
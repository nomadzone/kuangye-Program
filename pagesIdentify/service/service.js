import {get, post, put, del} from '@/utils/fetch.js'

const identifyService = {
	// 查询认证状态
	getIdentifyInfo: (data) => get('/auth/getAuthInfo', data)
	
}


export default identifyService
// 找搭子请求层
import {get, post, put, del} from '@/utils/fetch.js'

const partnerService = {
	add: (data) => post('/activity/add', data),
	selectStructure: (data) => get('/activity/selectStructure', data),
}

export default partnerService
// 找搭子请求层
import {get, post, put, del} from '@/utils/fetch.js'

const partnerService = {
	add: (data) => post('/activity/add', data),
}

export default partnerService
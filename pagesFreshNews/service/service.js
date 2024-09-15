// 新鲜事请求层
import {get, post, put, del} from '@/utils/fetch.js'

const freshNewsService = {
	//	发布新鲜事
		add: (data) => post('/activity/add', data),
}

export default freshNewsService
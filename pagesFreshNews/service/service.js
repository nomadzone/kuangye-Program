// 新鲜事请求层
import {get, post, put, del} from '@/utils/fetch.js'

const freshNewsService = {
	//	发布新鲜事
		add: (data) => post('/activity/add', data),
	// 新鲜事详情
		detailInfo: (data) => get('/activity/selectFreshNews',data),
		// 评论列表
		commentList:(data) => get('/comment/fansComment', data),
		// 发表评论
		commentAdd:(data) => post('/comment/add', data)
		
}

export default freshNewsService
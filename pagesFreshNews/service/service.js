// 新鲜事请求层
import {get, post, put, del} from '@/utils/fetch.js'

const freshNewsService = {
	//	发布新鲜事
		add: (data) => post('/activity/add', data),
	// 新鲜事详情
		detailInfo: (data) => get('/activity/selectFreshNews',data),
		// 评论列表
		commentList:(data) => post('/comment/fansComment', data),
		// 发表评论
		commentAdd:(data) => post('/comment/add', data),
		// 修改关注状态
		changeFollowStatus: (data) => post('/fans/update', data),
	
		// 点赞
		addLike:(data) => post('/up/userUp', data),
		
		// 修改点赞状态
		cancelLike:(data) => post('/up/userDown', data),
		// 删除 /activity/del
		deleteFreshNews: (data) => get('/activity/del', data),
		
}

export default freshNewsService
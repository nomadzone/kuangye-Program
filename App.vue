<script>
	import { getWxUserInfo } from './utils/index'
	export default {
		onLaunch: async function() {
			// 写死token
			// uni.setStorageSync('token', 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjY1ODY1MDcsInVzZXJJZCI6ImRkNTBlNjc3LWY1MzktNGE2OS05ZjM3LTU3ZjQ4ZGViYmRkNyJ9.IOND2A7gRET4L1TaklK_BpNbfSI7Y_IPxKF7WBCNJ44')
			const sys = wx.getSystemInfoSync()
			uni.setStorageSync('statusBarHeight', sys.statusBarHeight)
			uni.setStorageSync('navBarHeight', sys.platform == 'android' ? sys.statusBarHeight + 50 : sys.statusBarHeight + 45)
			await getWxUserInfo()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>

<script>
	import { getCode } from './utils/index'
	import http from './utils/http'
	export default {
		onLaunch: async function() {
			const sys = wx.getSystemInfoSync()
			uni.setStorageSync('statusBarHeight', sys.statusBarHeight)
			uni.setStorageSync('navBarHeight', sys.platform == 'android' ? sys.statusBarHeight + 50 : sys.statusBarHeight + 45)
			try {
				const code = await getCode()
				let res = await http.userLogin(code)
				console.log(res)
			} catch(error) {
				console.log('catch', error)
			}
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

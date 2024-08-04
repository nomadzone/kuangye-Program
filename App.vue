<script>
	export default {
		onLaunch: function() {
			const sys = wx.getSystemInfoSync()
			uni.setStorageSync('statusBarHeight', sys.statusBarHeight)
			uni.setStorageSync('navBarHeight', sys.platform == 'android' ? sys.statusBarHeight + 50 : sys.statusBarHeight + 45)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

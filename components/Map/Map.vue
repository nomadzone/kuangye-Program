<template>
	<view class="container">
		<map id="map" longitude="{{longitude}}" latitude="{{latitude}}" scale="16" style="width: 100vw; height: 50vh;"
			show-location markers="{{markers}}" enable-zoom enable-scroll>
		</map>
		<div class="positon">
			<image src="/static/images/location_m.png" mode=""></image>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 0,
				latitude: 0,
				markers: []
			}
		},
		created() {
			this.getUserLocation();
		},
		methods: {
			getUserLocation() {
				const _this = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success: () => {
						_this.getLocation();
					},
					fail: () => {
						uni.showModal({
							title: '授权失败',
							content: '需要获取你的地理位置，请打开授权',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									wx.openSetting({
										success: (settingData) => {
											if (settingData.authSetting[
													"scope.userLocation"]) {
												_this.getLocation();
											}
										}
									});
								}
							}
						});
					}
				});
			},
			getLocation() {
				const _this = this;
				uni.getLocation({
					type: 'gcj02', // 返回可以用于 wx.openLocation 的坐标
					success: (res) => {
						// console.log(res, 'getLocation 定位 gcj02')
						_this.longitude = res.longitude;
						_this.latitude = res.longitude;
					},
					fail: (res)=> {
						console.log(res, 'fail')
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	/* index.wxss */
	.container {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.positon{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 116rpx;
		right: 16rpx;
		width: 80rpx;
		height: 80rpx;
		box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.14);
		border-radius: 50%;
		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
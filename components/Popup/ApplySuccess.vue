<template>
	<view>
		<view class="popup-overlay" v-if="show" @click="onClose">
		</view>
		<view class="popup-content" :class="[show ? 'fade-enter' : 'fade-leave']" v-if="show">
			<view class="header">
				<view class="close" @click="onClose" v-if="isClose">
					 <image src="/static/images/close-white.png" mode=""></image>
				</view>
			</view>
			<image class="qing" src="/static/images/smell.png" mode=""></image>
			<view class="body">
				<Gradual :styles="{position: 'absolute', width: '100%', zIndex: -1, borderRadius: '12px'}" :background="'linear-gradient(to bottom, #fde279, #fefbdb)'" :height="'686rpx'" :zIndex="'98'"/>
				<image class="avator" :src="activityVo?.initiatorUrl" mode="aspectFill"></image>
				<view class="name">
					<text>{{activityVo?.initiatorName }}</text>
					<image v-if="activityVo?.gender == 0" src="/static/images/man-icon.png" mode=""></image>
					<image v-if="activityVo?.gender == 1" src="/static/images/woman-icon.png" mode=""></image>
					<image v-if="activityVo?.isUserStatus == 1" src="/static/images/badge.png" mode=""></image>
					<!-- <image src="/static/images/female.png" mode=""></image> -->
				</view>
				<view class="chart">
					<view>
						<image class="wechat" src="/static/images/wechat-fill-black.png" mode=""></image>
						<text>{{activityVo?.number}}</text>
						<image @click="doCopy" class="copy" src="/static/images/copy-gray.png" mode=""></image>
					</view>
				</view>
				<view class="qcode">
					<image :src="activityVo?.contactphoto" mode="aspectFill"></image>
				</view>
			</view>
			<view class="view">
				<button hover-class="hover" @click="doView">保存到相册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Gradual from '@/components/Navbar/Gradual.vue'
	
	export default {
		components: {
			Gradual,
		},
		props: {
			isClose: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: false
			},
			activityVo: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				visible: false
			}
		},
		watch: {
			show: {
				handler(newValue, oldValue) {
					console.log(newValue, oldValue)
					this.visible = newValue
				},
				immediate: true
			}
		},
		methods: {
			doCopy() {
				wx.setClipboardData({
				  data: this.activityVo?.number,
				  success: function() {
					wx.showToast({
					  title: '复制成功',
					  icon: 'success',
					  duration: 2000
					});
				  }
				});
			},
			onClose() {
				this.$emit('close')
			},
			doView() {
				uni.downloadFile({
					url: this.activityVo?.contactphoto, 
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: (res) => {
								wx.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
									});
									this.$emit('view')
									}
								})
								uni.openDocument({
                                    filePath: res.savedFilePath,
                                    success(res) { },
                                    fail(err) { }
                                })
					}
				})
				
			} 
		}
	}
</script>

<style lang="scss" scoped>
	.popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 95;
	}

	.fade-enter {
		animation: fadeIn .4s;
	}

	.fade-leave {
		animation: fadeIn .2s reverse;
	}

	@keyframes fadeIn {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0);
		}
	}

	.popup-content {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 32rpx;
		width: 100vw;
		background-color: #fff;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
		z-index: 99;
		box-sizing: border-box;
		padding-bottom: 80rpx;
		border-radius: 10px;
		transition: transform 0.3s;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.close {
			image {
				width: 56rpx;
				height: 56rpx;
			}
		}
	}
	.qing {
		position: absolute;
		top: -100rpx;
		left: 50%;
		margin-left: -140rpx;
		width: 280rpx;
		height: 280rpx;
	}
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #222;
		height: 686rpx;
		position: relative;
		margin-top: 68rpx;
		padding: 60rpx 0 0 0;
		box-sizing: border-box;
		.title {
			padding-bottom: 20rpx;
			font-size: 32rpx;
		}
		.avator {
			width:100rpx;
			height: 100rpx;
			border-radius: 12px;
			border: 1px solid #fff;
		}
		.name {
			display: flex;
			padding: 10rpx 0 40rpx 0;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 4rpx;
			}
		}
		.chart {
			padding-bottom: 32rpx;
			> view {
				display: flex;
				gap: 20rpx;
				flex-direction: row;
				align-items: center;
				height: 88rpx;
				background-color: #fff;
				color: #222;
				padding: 0 20rpx;
				border-radius: 48rpx;
			}
			.wechat {
				width: 32rpx;
				height: 32rpx;
			}
			.copy {
				width: 56rpx;
				height: 56rpx;
			}
		}
		.qcode {
			width: 282rpx;
			height: 282rpx;
			image {
				width: 282rpx;
				height: 282rpx;
			}
		}
	}
	.hover {
		opacity: 0.8;
	}
	.view {
		padding: 32rpx 0;
		width: 100%;
		button {
			background-color: #222;
			color: #fff;
			border: 1px solid #222;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 48rpx;
			height: 88rpx;
			&:after {
				display: none;
			}
		}
	}
</style>
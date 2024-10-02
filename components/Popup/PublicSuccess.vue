<template>
	<view>
		<view class="popup-overlay" v-if="show" @click="onClose">
		</view>
		<view class="popup-content" :class="[show ? 'fade-enter' : 'fade-leave']" v-if="show">
			<Gradual :styles="{position: 'absolute', width: '100%', zIndex: -1}" :background="'linear-gradient(to bottom, #FCEBBC, #fff)'" :height="'400rpx'" :zIndex="'98'"/>
			<view class="header">
				<view class="close" @click="onClose" v-if="isClose">
					 <image src="/static/images/close-white.png" mode=""></image>
				</view>
			</view>
			<view class="body">
				<image class="qing" src="/static/images/qing.png" mode=""></image>
				<view class="title">发布成功！</view>
				<view>
					复制下方微信号添加小助手
				</view>
				<view>
					参与创作者计划，获取更多奖励！
				</view>
				<view class="chart">
					<view>
						<image class="wechat" src="/static/images/wechat-fill.png" mode=""></image>
						<text>{{fabuParams?.number}}</text>
						<image @click="doCopy" class="copy" src="/static/images/copy.png" mode=""></image>
					</view>
				</view>
				<view class="view">
					<button hover-class="hover" @click="doView">查看刚发布内容</button>
				</view>
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
			fabuParams: {
				type: Object,
				default: () => ({})
			},
			isClose: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: false
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
				  data: this.fabuParams?.number,
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
				this.$emit('view')
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
		overflow: hidden;
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
	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #222;
		.qing {
			width: 280rpx;
			height: 280rpx;
		}
		.title {
			padding-bottom: 20rpx;
			font-size: 32rpx;
		}
		.chart {
			padding: 48rpx 0;
			> view {
				display: flex;
				gap: 20rpx;
				flex-direction: row;
				align-items: center;
				height: 88rpx;
				background-color: #222;
				color: #fff;
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
		.hover {
			opacity: 0.8;
		}
		.view {
			padding: 32rpx 0;
			width: 100%;
			button {
				background-color: transparent;
				color: #222;
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
	}
</style>
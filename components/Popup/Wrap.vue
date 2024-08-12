<template>
	<view>
		<view class="popup-overlay" v-if="show" @click="handleOverlayClick">
		</view>
		<view class="popup-content" :class="[show ? 'fade-enter' : 'fade-leave']" v-show="show">
			<Gradual :background="'linear-gradient(to bottom, #FFF7E2, #f5f5f5)'" :height="'100rpx'" :zIndex="'98'"/>
			<view class="header">
				<view class="close" @click="handleOverlayClick">
					 <view v-if="isLeft">
						 <image src="../../static/images/close.png" mode=""></image>
					 </view>
				</view>
				<view>{{ title }}</view>
				<view class="save" @click='doSave'>
					<button v-if="rightText">{{ rightText }}</button>
				</view>
			</view>
			<view>
				<slot name="default"></slot>
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
			title: {
				type: String,
				default: ''
			},
			rightText: {
				type: String,
				default: '保存'
			},
			isLeft: {
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
			handleOverlayClick() {
				this.$emit('close')
			},
			doSave() {
				this.$emit('save')
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
			>view {
				width: 46rpx;
				height: 46rpx;
				border-radius: 50%;
				background-color: #F3F3F3;
				display: flex;
				align-items: center;
				justify-content: center;
				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
		.save {
			button {
				font-family: PingFang SC;
				font-size: 24rpx;
				font-weight: 600;
				background-color: #222;
				color: #fff;
				border-radius: 32rpx;
				width: 80rpx;
				height: 50rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0;
				&:after {
					display: none;
				}
			}
		}
	}
</style>
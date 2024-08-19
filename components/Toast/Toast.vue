<template>
	<view>
		<view class="popup-overlay" v-if="show" @click="doCancel">
		</view>
		<view class="popup-content" :class="[show ? 'fade-enter' : 'fade-leave']" v-if="show">
			<view class="popup-body">
				<Gradual :styles="{position: 'absolute', width: '100%', zIndex: 0}" :background="'linear-gradient(to bottom, #E3F7FF, #fff)'" :height="'200rpx'" :zIndex="'98'"/>
				<view class="delete-icon" v-if="isDeleteIcon">
					<image src="../../static/images/failed.png" mode=""></image>
				</view>
				<view class="title" v-if="title" :style="{ paddingBottom: desc ? '24rpx' : '32rpx' }">
					{{ title }}
				</view>
				<view class="desc" v-if="desc">
					{{ desc }}
				</view>
				<view class="opt">
					<view class="button" v-if="isConfirm" :style="{ paddingBottom: !isCancel ? '0' : '24rpx' }">
						<button @click='doConfirm' hover-class="hover">{{ confirmText }}</button>
					</view>
					<view class="button cancel" v-if='isCancel'>
						<button @click='doCancel' hover-class="hover">{{ cancelText }}</button>
					</view>
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
			show: {
				type: Boolean,
				default: false
			},
			isDeleteIcon: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			},
			confirmText: {
				type: String,
				default: '确认'
			},
			isConfirm:  {
				type: Boolean,
				default: true
			},
			 cancelText: {
				type: String,
				default: ' 取消'
			},
			isCancel:  {
				type: Boolean,
				default: true
			},
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
			doConfirm() {
				this.$emit('confirm')
			},
			doCancel() {
				this.$emit('cancel')
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
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
		.popup-body {
			padding: 32rpx;
			width: 580rpx;
			background-color: #fff;
			border-radius: 16rpx;
			overflow: hidden;
			box-sizing: border-box;
			padding: 48rpx;
			border-radius: 10px;
			transition: transform 0.3s;
			position: relative;
		}
		.delete-icon  {
			padding-bottom: 32rpx;
			margin: auto;
			position: relative;
			z-index: 2;
			image {
				width: 96rpx;
				height: 96rpx;
				margin: auto;
				display: block;
			}
		}
		.title {
			position: relative;
			padding-bottom: 32rpx;
			font-weight: 600;
			text-align: center;
			color: #222;
			font-size: 32rpx;
			z-index: 1;
		}
		.desc {
			position: relative;
			padding-bottom: 32rpx;
			text-align: center;
			color: #212121;
			font-size:28rpx;
			z-index: 1;
		}
		.opt {
			padding-top: 32rpx;
			.button:first-child {
				padding-bottom: 24rpx;
			}
			.hover {
				opacity: 0.8;
			}
			button {
				height: 80rpx;
				border-radius: 48rpx;
				background-color: #222;
				border: 1px solid #222;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				&:after {
					display: none;
				}
			}
			.cancel {
				button {
					background-color: #fff;
					color: #222;
				}
			}
		}
	}
</style>